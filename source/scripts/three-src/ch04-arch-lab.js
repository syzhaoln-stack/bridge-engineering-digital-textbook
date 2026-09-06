
    import * as THREE from '../../interactive/vendor/three.module.js';
    import { OrbitControls } from '../../interactive/vendor/controls/OrbitControls.js';

    const __shellCore = (() => {
const DOF_PER_NODE = 6;
const DOF_NAMES = ['ux', 'uy', 'uz', 'rx', 'ry', 'rz'];

const EPS = 1e-12;
const GAUSS = 1 / Math.sqrt(3);

function zeros(rows, cols = rows) {
  return Array.from({ length: rows }, () => new Float64Array(cols));
}

function vecZeros(n) {
  return new Float64Array(n);
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function norm(a) {
  return Math.sqrt(dot(a, a));
}

function normalize(a, label) {
  const n = norm(a);
  if (n < EPS) throw new Error(`${label} has near-zero length`);
  return a.map((v) => v / n);
}

function toPoint(node) {
  return [Number(node.x), Number(node.y ?? 0), Number(node.z ?? 0)];
}

function checkShellInput(nodes, material) {
  if (!Array.isArray(nodes) || nodes.length !== 4) {
    throw new Error('shell4 requires four nodes ordered counter-clockwise');
  }
  for (const [i, node] of nodes.entries()) {
    const p = toPoint(node);
    if (!p.every(Number.isFinite)) throw new Error(`shell4 node ${i} is invalid`);
  }
  const { E, nu, t } = material;
  if (!(E > 0)) throw new Error('shell4 material E must be positive');
  if (!(t > 0)) throw new Error('shell4 thickness t must be positive');
  if (!(nu > -0.999 && nu < 0.499)) {
    throw new Error('shell4 Poisson ratio nu must be between -0.999 and 0.499');
  }
}

/** Build a local right-handed frame. Nodes must be approximately coplanar. */
function shellLocalFrame(nodes, planarityTolerance = 1e-5) {
  const p = nodes.map(toPoint);
  const ex = normalize(sub(p[1], p[0]), 'shell local x axis');
  const normalSeed = cross(sub(p[1], p[0]), sub(p[3], p[0]));
  const ez = normalize(normalSeed, 'shell normal');
  const ey = normalize(cross(ez, ex), 'shell local y axis');
  const edgeLengths = [
    norm(sub(p[1], p[0])), norm(sub(p[2], p[1])),
    norm(sub(p[3], p[2])), norm(sub(p[0], p[3])),
  ];
  const lengthScale = Math.max(...edgeLengths, 1);
  const warping = Math.max(...p.map((point) => Math.abs(dot(sub(point, p[0]), ez))));
  if (warping > planarityTolerance * lengthScale) {
    throw new Error(
      `shell4 is not planar: warping=${warping.toExponential(3)}, ` +
      `limit=${(planarityTolerance * lengthScale).toExponential(3)}`,
    );
  }
  const localXY = p.map((point) => {
    const d = sub(point, p[0]);
    return [dot(d, ex), dot(d, ey)];
  });
  return { origin: p[0], ex, ey, ez, localXY, warping, lengthScale };
}

function q4Shape(xi, eta) {
  return {
    N: new Float64Array([
      0.25 * (1 - xi) * (1 - eta),
      0.25 * (1 + xi) * (1 - eta),
      0.25 * (1 + xi) * (1 + eta),
      0.25 * (1 - xi) * (1 + eta),
    ]),
    dXi: new Float64Array([
      -0.25 * (1 - eta), 0.25 * (1 - eta),
      0.25 * (1 + eta), -0.25 * (1 + eta),
    ]),
    dEta: new Float64Array([
      -0.25 * (1 - xi), -0.25 * (1 + xi),
      0.25 * (1 + xi), 0.25 * (1 - xi),
    ]),
  };
}

/** Return shape data and Cartesian derivatives for a Q4 point. */
function q4Geometry(localXY, xi, eta) {
  const { N, dXi, dEta } = q4Shape(xi, eta);
  let xXi = 0, yXi = 0, xEta = 0, yEta = 0;
  for (let i = 0; i < 4; i++) {
    xXi += dXi[i] * localXY[i][0];
    yXi += dXi[i] * localXY[i][1];
    xEta += dEta[i] * localXY[i][0];
    yEta += dEta[i] * localXY[i][1];
  }
  const detJ = xXi * yEta - yXi * xEta;
  if (!(detJ > EPS)) {
    throw new Error(`shell4 has non-positive Jacobian detJ=${detJ}`);
  }
  const inv00 = yEta / detJ;
  const inv01 = -yXi / detJ;
  const inv10 = -xEta / detJ;
  const inv11 = xXi / detJ;
  const dX = new Float64Array(4);
  const dY = new Float64Array(4);
  for (let i = 0; i < 4; i++) {
    dX[i] = inv00 * dXi[i] + inv01 * dEta[i];
    dY[i] = inv10 * dXi[i] + inv11 * dEta[i];
  }
  return {
    N, dXi, dEta, dX, dY, detJ,
    jacobian: [[xXi, yXi], [xEta, yEta]],
    inverseJacobian: [[inv00, inv01], [inv10, inv11]],
  };
}

function planeStressMatrix(E, nu) {
  const c = E / (1 - nu * nu);
  return [
    new Float64Array([c, c * nu, 0]),
    new Float64Array([c * nu, c, 0]),
    new Float64Array([0, 0, c * (1 - nu) / 2]),
  ];
}

/**
 * Local shell matrices use physical local rotations [rx, ry, rz].
 * Kirchhoff-compatible slopes are betaX=ry and betaY=-rx, so
 * gamma_xz=w,x+ry and gamma_yz=w,y-rx.
 */
function shellStrainMatrices(geometry) {
  const { N, dX, dY } = geometry;
  const Bm = zeros(3, 24);
  const Bb = zeros(3, 24);
  const Bs = zeros(2, 24);
  const Bd = zeros(1, 24);
  for (let i = 0; i < 4; i++) {
    const b = 6 * i;
    Bm[0][b] = dX[i];
    Bm[1][b + 1] = dY[i];
    Bm[2][b] = dY[i];
    Bm[2][b + 1] = dX[i];

    Bb[0][b + 4] = dX[i];
    Bb[1][b + 3] = -dY[i];
    Bb[2][b + 3] = -dX[i];
    Bb[2][b + 4] = dY[i];

    Bs[0][b + 2] = dX[i];
    Bs[0][b + 4] = N[i];
    Bs[1][b + 2] = dY[i];
    Bs[1][b + 3] = -N[i];

    // rz - 0.5*(v,x-u,y): preserves rigid in-plane rotation.
    Bd[0][b] = 0.5 * dY[i];
    Bd[0][b + 1] = -0.5 * dX[i];
    Bd[0][b + 5] = N[i];
  }
  return { Bm, Bb, Bs, Bd };
}

function covariantShearRow(localXY, xi, eta, direction) {
  const geometry = q4Geometry(localXY, xi, eta);
  const { Bs } = shellStrainMatrices(geometry);
  const [[xXi, yXi], [xEta, yEta]] = geometry.jacobian;
  const ax = direction === 'xi' ? xXi : xEta;
  const ay = direction === 'xi' ? yXi : yEta;
  const row = new Float64Array(24);
  for (let i = 0; i < 24; i++) row[i] = ax * Bs[0][i] + ay * Bs[1][i];
  return row;
}

/**
 * MITC4 assumed transverse shear matrix. Covariant shear is sampled at the
 * four midside tying points A(0,-1), B(1,0), C(0,1), D(-1,0), interpolated,
 * then transformed back to the local Cartesian axes at the integration point.
 */
function mitc4ShearMatrix(localXY, xi, eta) {
  const gammaXiA = covariantShearRow(localXY, 0, -1, 'xi');
  const gammaXiC = covariantShearRow(localXY, 0, 1, 'xi');
  const gammaEtaD = covariantShearRow(localXY, -1, 0, 'eta');
  const gammaEtaB = covariantShearRow(localXY, 1, 0, 'eta');
  const assumedXi = new Float64Array(24);
  const assumedEta = new Float64Array(24);
  for (let i = 0; i < 24; i++) {
    assumedXi[i] = 0.5 * ((1 - eta) * gammaXiA[i] + (1 + eta) * gammaXiC[i]);
    assumedEta[i] = 0.5 * ((1 - xi) * gammaEtaD[i] + (1 + xi) * gammaEtaB[i]);
  }
  const geometry = q4Geometry(localXY, xi, eta);
  const [[inv00, inv01], [inv10, inv11]] = geometry.inverseJacobian;
  const Bs = zeros(2, 24);
  for (let i = 0; i < 24; i++) {
    Bs[0][i] = inv00 * assumedXi[i] + inv01 * assumedEta[i];
    Bs[1][i] = inv10 * assumedXi[i] + inv11 * assumedEta[i];
  }
  return Bs;
}

function addBtDB(K, B, D, scale) {
  const n = K.length;
  const m = B.length;
  const DB = zeros(m, n);
  for (let a = 0; a < m; a++) {
    for (let j = 0; j < n; j++) {
      let value = 0;
      for (let b = 0; b < m; b++) value += D[a][b] * B[b][j];
      DB[a][j] = value;
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let value = 0;
      for (let a = 0; a < m; a++) value += B[a][i] * DB[a][j];
      K[i][j] += scale * value;
    }
  }
}

function addOuter(K, row, scale) {
  for (let i = 0; i < row.length; i++) {
    if (row[i] === 0) continue;
    for (let j = 0; j < row.length; j++) {
      if (row[j] !== 0) K[i][j] += scale * row[i] * row[j];
    }
  }
}

function blockTransformation(frame) {
  const T = zeros(24);
  const R = [frame.ex, frame.ey, frame.ez];
  for (let node = 0; node < 4; node++) {
    const base = 6 * node;
    for (let block = 0; block < 2; block++) {
      const offset = base + 3 * block;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) T[offset + i][offset + j] = R[i][j];
      }
    }
  }
  return T;
}

function congruence(Klocal, T) {
  const n = Klocal.length;
  const KT = zeros(n);
  const result = zeros(n);
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      const value = Klocal[i][k];
      if (value === 0) continue;
      for (let j = 0; j < n; j++) KT[i][j] += value * T[k][j];
    }
  }
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      const value = T[k][i];
      if (value === 0) continue;
      for (let j = 0; j < n; j++) result[i][j] += value * KT[k][j];
    }
  }
  return result;
}

function transformVector(T, vector) {
  const result = new Float64Array(T.length);
  for (let i = 0; i < T.length; i++) {
    for (let j = 0; j < vector.length; j++) result[i] += T[i][j] * vector[j];
  }
  return result;
}

function transformVectorTranspose(T, vector) {
  const result = new Float64Array(T.length);
  for (let i = 0; i < T.length; i++) {
    for (let j = 0; j < vector.length; j++) result[i] += T[j][i] * vector[j];
  }
  return result;
}

/** Return the 24x24 stiffness of a planar four-node shell in global axes. */
function shell4Stiffness(nodes, material) {
  checkShellInput(nodes, material);
  const frame = shellLocalFrame(nodes, material.planarityTolerance ?? 1e-5);
  const { E, nu, t } = material;
  const shearCorrection = material.shearCorrection ?? (5 / 6);
  const drillFactor = material.drillFactor ?? 1e-3;
  const D0 = planeStressMatrix(E, nu);
  const G = E / (2 * (1 + nu));
  const Ds = [
    new Float64Array([shearCorrection * G * t, 0]),
    new Float64Array([0, shearCorrection * G * t]),
  ];
  const Klocal = zeros(24);
  const points = [-GAUSS, GAUSS];
  let area = 0;

  for (const xi of points) {
    for (const eta of points) {
      const geometry = q4Geometry(frame.localXY, xi, eta);
      const { Bm, Bb, Bd } = shellStrainMatrices(geometry);
      const Bs = mitc4ShearMatrix(frame.localXY, xi, eta);
      area += geometry.detJ;
      addBtDB(Klocal, Bm, D0, t * geometry.detJ);
      addBtDB(Klocal, Bb, D0, (t ** 3 / 12) * geometry.detJ);
      addBtDB(Klocal, Bs, Ds, geometry.detJ);
      addOuter(Klocal, Bd[0], drillFactor * E * t * geometry.detJ);
    }
  }

  const T = blockTransformation(frame);
  const K = congruence(Klocal, T);
  return {
    K, Klocal, T, frame, area,
    diagnostics: { shearCorrection, shearInterpolation: 'MITC4', drillFactor },
  };
}

/** Consistent pressure load. Positive pressure acts along the element local +z. */
function shell4PressureLoad(nodes, pressure) {
  const frame = shellLocalFrame(nodes);
  const local = new Float64Array(24);
  for (const xi of [-GAUSS, GAUSS]) {
    for (const eta of [-GAUSS, GAUSS]) {
      const geometry = q4Geometry(frame.localXY, xi, eta);
      for (let i = 0; i < 4; i++) local[6 * i + 2] += pressure * geometry.N[i] * geometry.detJ;
    }
  }
  return transformVectorTranspose(blockTransformation(frame), local);
}

/** Invert the Q4 map and return bilinear load weights for a global point. */
function mapPointToShell4(nodes, point, tolerance = 1e-7) {
  const frame = shellLocalFrame(nodes);
  const p = Array.isArray(point) ? point : toPoint(point);
  const delta = sub(p, frame.origin);
  const targetX = dot(delta, frame.ex);
  const targetY = dot(delta, frame.ey);
  const distance = dot(delta, frame.ez);
  let xi = 0, eta = 0;
  let converged = false;
  for (let iteration = 0; iteration < 15; iteration++) {
    const geometry = q4Geometry(frame.localXY, xi, eta);
    let x = 0, y = 0;
    for (let i = 0; i < 4; i++) {
      x += geometry.N[i] * frame.localXY[i][0];
      y += geometry.N[i] * frame.localXY[i][1];
    }
    const rx = x - targetX;
    const ry = y - targetY;
    const [[xXi, yXi], [xEta, yEta]] = geometry.jacobian;
    const det = xXi * yEta - xEta * yXi;
    const dXi = (yEta * rx - xEta * ry) / det;
    const dEta = (-yXi * rx + xXi * ry) / det;
    xi -= dXi;
    eta -= dEta;
    if (Math.hypot(dXi, dEta) < 1e-11) {
      converged = true;
      break;
    }
  }
  const inside = converged && Math.abs(xi) <= 1 + tolerance && Math.abs(eta) <= 1 + tolerance;
  return {
    inside, xi, eta, distance,
    N: q4Shape(xi, eta).N,
    frame,
  };
}

/** Distribute a global force vector at a point to the four translational nodes. */
function shell4PointLoad(nodes, point, force) {
  const mapped = mapPointToShell4(nodes, point);
  if (!mapped.inside) return null;
  const result = new Float64Array(24);
  for (let i = 0; i < 4; i++) {
    result[6 * i] = mapped.N[i] * force[0];
    result[6 * i + 1] = mapped.N[i] * force[1];
    result[6 * i + 2] = mapped.N[i] * force[2];
  }
  return { load: result, mapping: mapped };
}

function multiply(A, vector) {
  const result = new Float64Array(A.length);
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < vector.length; j++) result[i] += A[i][j] * vector[j];
  }
  return result;
}

function vonMisesPlaneStress(stress) {
  const [sx, sy, txy] = stress;
  return Math.sqrt(sx * sx - sx * sy + sy * sy + 3 * txy * txy);
}

/** Recover membrane/bending stresses at 2x2 points and the element center. */
function shell4Response(nodes, material, uGlobal) {
  if (uGlobal.length !== 24) throw new Error('shell4Response expects 24 global DOFs');
  const element = shell4Stiffness(nodes, material);
  return shell4ResponseFromElement(element, material, uGlobal);
}

/** Recover response while reusing already-assembled element geometry. */
function shell4ResponseFromElement(element, material, uGlobal) {
  if (uGlobal.length !== 24) throw new Error('shell4ResponseFromElement expects 24 global DOFs');
  const uLocal = transformVector(element.T, uGlobal);
  const D0 = planeStressMatrix(material.E, material.nu);
  const G = material.E / (2 * (1 + material.nu));
  const shearCorrection = material.shearCorrection ?? (5 / 6);
  const samples = [
    [-GAUSS, -GAUSS], [GAUSS, -GAUSS],
    [GAUSS, GAUSS], [-GAUSS, GAUSS], [0, 0],
  ];
  const points = [];
  let maxVonMises = 0;
  for (const [xi, eta] of samples) {
    const geometry = q4Geometry(element.frame.localXY, xi, eta);
    const { Bm, Bb } = shellStrainMatrices(geometry);
    const Bs = mitc4ShearMatrix(element.frame.localXY, xi, eta);
    const membraneStrain = multiply(Bm, uLocal);
    const curvature = multiply(Bb, uLocal);
    const shearStrain = multiply(Bs, uLocal);
    const topStrain = new Float64Array(3);
    const bottomStrain = new Float64Array(3);
    for (let i = 0; i < 3; i++) {
      topStrain[i] = membraneStrain[i] + 0.5 * material.t * curvature[i];
      bottomStrain[i] = membraneStrain[i] - 0.5 * material.t * curvature[i];
    }
    const topStress = multiply(D0, topStrain);
    const bottomStress = multiply(D0, bottomStrain);
    const transverseShear = new Float64Array([
      shearCorrection * G * shearStrain[0],
      shearCorrection * G * shearStrain[1],
    ]);
    const vonMisesTop = vonMisesPlaneStress(topStress);
    const vonMisesBottom = vonMisesPlaneStress(bottomStress);
    const transverseShearMagnitude = Math.hypot(...transverseShear);
    maxVonMises = Math.max(maxVonMises, vonMisesTop, vonMisesBottom);
    points.push({
      xi, eta, membraneStrain, curvature, shearStrain,
      topStress, bottomStress, transverseShear,
      transverseShearMagnitude, vonMisesTop, vonMisesBottom,
    });
  }
  return { ...element, uLocal, points, center: points[4], maxVonMises };
}

function assembleShellModel(model) {
  const ndof = model.nodes.length * DOF_PER_NODE;
  const K = zeros(ndof);
  const elementData = [];
  for (const element of model.elements) {
    if (element.type && element.type !== 'shell4') continue;
    const indices = element.nodes ?? [element.n1, element.n2, element.n3, element.n4];
    if (indices.length !== 4) throw new Error(`element ${element.id ?? '?'} needs four nodes`);
    const nodes = indices.map((index) => model.nodes[index]);
    const material = model.properties[element.group] ?? model.properties.default;
    if (!material) throw new Error(`no material for shell group ${element.group}`);
    const data = shell4Stiffness(nodes, material);
    const dofs = indices.flatMap((index) =>
      Array.from({ length: DOF_PER_NODE }, (_, d) => DOF_PER_NODE * index + d));
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 24; j++) K[dofs[i]][dofs[j]] += data.K[i][j];
    }
    elementData.push({ element, indices, nodes, material, dofs, ...data });
  }
  return { K, ndof, elementData };
}

function applyNodalLoads(F, loads = []) {
  for (const load of loads) {
    const base = DOF_PER_NODE * load.node;
    const values = [load.fx, load.fy, load.fz, load.mx, load.my, load.mz];
    for (let d = 0; d < DOF_PER_NODE; d++) F[base + d] += Number(values[d] ?? 0);
  }
  return F;
}

function constrainedDofs(supports = []) {
  const fixed = new Set();
  for (const support of supports) {
    const base = DOF_PER_NODE * support.node;
    for (let d = 0; d < DOF_PER_NODE; d++) {
      if (support[DOF_NAMES[d]]) fixed.add(base + d);
    }
  }
  return [...fixed].sort((a, b) => a - b);
}

/** Factor the unconstrained symmetric positive-definite system once. */
function factorConstrainedSystem(K, fixedDofs, pivotTolerance = 1e-13) {
  const fixed = new Set(fixedDofs);
  const free = Array.from({ length: K.length }, (_, i) => i).filter((i) => !fixed.has(i));
  const n = free.length;
  const L = zeros(n);
  let maxDiag = 0;
  for (let i = 0; i < n; i++) maxDiag = Math.max(maxDiag, Math.abs(K[free[i]][free[i]]));
  const floor = Math.max(maxDiag * pivotTolerance, EPS);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = K[free[i]][free[j]];
      for (let k = 0; k < j; k++) sum -= L[i][k] * L[j][k];
      if (i === j) {
        if (!(sum > floor)) {
          throw new Error(`shell system is singular/indefinite at reduced DOF ${i}: ${sum}`);
        }
        L[i][j] = Math.sqrt(sum);
      } else {
        L[i][j] = sum / L[j][j];
      }
    }
  }
  return { L, free, totalDofs: K.length };
}

function solveFactoredSystem(factor, F) {
  const { L, free, totalDofs } = factor;
  const n = free.length;
  const y = new Float64Array(n);
  const x = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    let sum = F[free[i]];
    for (let j = 0; j < i; j++) sum -= L[i][j] * y[j];
    y[i] = sum / L[i][i];
  }
  for (let i = n - 1; i >= 0; i--) {
    let sum = y[i];
    for (let j = i + 1; j < n; j++) sum -= L[j][i] * x[j];
    x[i] = sum / L[i][i];
  }
  const U = new Float64Array(totalDofs);
  for (let i = 0; i < n; i++) U[free[i]] = x[i];
  return U;
}

function elementDisplacements(U, dofs) {
  return Float64Array.from(dofs, (dof) => U[dof]);
}

return { DOF_PER_NODE, DOF_NAMES, zeros, vecZeros, shellLocalFrame, q4Shape, q4Geometry, shellStrainMatrices, mitc4ShearMatrix, transformVector, transformVectorTranspose, shell4Stiffness, shell4PressureLoad, mapPointToShell4, shell4PointLoad, shell4Response, shell4ResponseFromElement, assembleShellModel, applyNodalLoads, constrainedDofs, factorConstrainedSystem, solveFactoredSystem, elementDisplacements };
})();
const { DOF_PER_NODE, DOF_NAMES, zeros, vecZeros, shellLocalFrame, q4Shape, q4Geometry, shellStrainMatrices, mitc4ShearMatrix, transformVector, transformVectorTranspose, shell4Stiffness, shell4PressureLoad, mapPointToShell4, shell4PointLoad, shell4Response, shell4ResponseFromElement, assembleShellModel, applyNodalLoads, constrainedDofs, factorConstrainedSystem, solveFactoredSystem, elementDisplacements } = __shellCore;
    const __frameCore = (() => {
const LINE_DOF_PER_NODE = 6;
const FRAME3D_DOF_NAMES = ['ux', 'uy', 'uz', 'rx', 'ry', 'rz'];
const FRAME3D_FORCE_NAMES = [
  'Fx1', 'Fy1', 'Fz1', 'Mx1', 'My1', 'Mz1',
  'Fx2', 'Fy2', 'Fz2', 'Mx2', 'My2', 'Mz2',
];

const EPS = 1e-12;

function frameZeros(rows, cols = rows) {
  return Array.from({ length: rows }, () => new Float64Array(cols));
}

function toPoint(node) {
  if (Array.isArray(node) || ArrayBuffer.isView(node)) {
    return [Number(node[0]), Number(node[1] ?? 0), Number(node[2] ?? 0)];
  }
  return [Number(node.x), Number(node.y ?? 0), Number(node.z ?? 0)];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function subtract(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scale(a, factor) {
  return [a[0] * factor, a[1] * factor, a[2] * factor];
}

function norm(a) {
  return Math.sqrt(dot(a, a));
}

function normalize(a, label) {
  const length = norm(a);
  if (!(length > EPS)) throw new Error(`${label} has near-zero length`);
  return scale(a, 1 / length);
}

function multiplyMatrixVector(matrix, vector) {
  const result = new Float64Array(matrix.length);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < vector.length; j++) result[i] += matrix[i][j] * vector[j];
  }
  return result;
}

function congruence(localMatrix, transformation) {
  const n = localMatrix.length;
  const localTimesT = frameZeros(n);
  const globalMatrix = frameZeros(n);
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      const value = localMatrix[i][k];
      if (value === 0) continue;
      for (let j = 0; j < n; j++) {
        if (transformation[k][j] !== 0) localTimesT[i][j] += value * transformation[k][j];
      }
    }
  }
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      const value = transformation[k][i];
      if (value === 0) continue;
      for (let j = 0; j < n; j++) globalMatrix[i][j] += value * localTimesT[k][j];
    }
  }
  return globalMatrix;
}

function validateTwoNodes(nodes, label) {
  if (!Array.isArray(nodes) || nodes.length !== 2) {
    throw new Error(`${label} requires exactly two nodes`);
  }
  const points = nodes.map(toPoint);
  if (!points.every((point) => point.every(Number.isFinite))) {
    throw new Error(`${label} node coordinates must be finite`);
  }
  return points;
}

function positive(value, name) {
  if (!(Number(value) > 0)) throw new Error(`${name} must be positive`);
  return Number(value);
}

/**
 * Construct a robust right-handed local frame.
 *
 * `localYReference` expresses a preferred local-y direction in global axes.
 * If it is parallel to the member, the least-aligned global basis is used and
 * `usedFallback` is reported. Pass a deliberate reference for adjacent curved
 * members to keep their section axes continuous.
 */
function frame3dLocalAxes(nodes, localYReference = [0, 1, 0]) {
  const [p1, p2] = validateTwoNodes(nodes, 'frame3dLocalAxes');
  const chord = subtract(p2, p1);
  const length = norm(chord);
  if (!(length > EPS)) throw new Error('frame3d member has near-zero length');
  const ex = scale(chord, 1 / length);
  let reference = toPoint(localYReference);
  if (!reference.every(Number.isFinite) || norm(reference) <= EPS) {
    throw new Error('frame3d localY reference must be a finite non-zero vector');
  }
  let projected = subtract(reference, scale(ex, dot(reference, ex)));
  let usedFallback = false;
  if (norm(projected) <= 1e-10 * Math.max(norm(reference), 1)) {
    const bases = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    reference = bases.reduce((best, candidate) =>
      Math.abs(dot(candidate, ex)) < Math.abs(dot(best, ex)) ? candidate : best);
    projected = subtract(reference, scale(ex, dot(reference, ex)));
    usedFallback = true;
  }
  const ey = normalize(projected, 'frame3d local y axis');
  const ez = normalize(cross(ex, ey), 'frame3d local z axis');
  return { origin: p1, length, ex, ey, ez, usedFallback, localYReference: reference };
}

/** T maps global element DOFs to local DOFs: uLocal = T * uGlobal. */
function frame3dTransformation(axes) {
  const T = frameZeros(12);
  const R = [axes.ex, axes.ey, axes.ez];
  for (let node = 0; node < 2; node++) {
    const nodeBase = 6 * node;
    for (let block = 0; block < 2; block++) {
      const offset = nodeBase + 3 * block;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) T[offset + i][offset + j] = R[i][j];
      }
    }
  }
  return T;
}

/** Build the conventional 12x12 local Euler-Bernoulli space-frame matrix. */
function frame3dLocalStiffness(length, section) {
  const L = positive(length, 'frame3d length');
  const E = positive(section.E, 'frame3d E');
  const G = positive(section.G, 'frame3d G');
  const A = positive(section.A, 'frame3d A');
  const Iy = positive(section.Iy, 'frame3d Iy');
  const Iz = positive(section.Iz, 'frame3d Iz');
  const J = positive(section.J, 'frame3d J');
  const K = frameZeros(12);

  const addPair = (a, b, stiffness) => {
    K[a][a] += stiffness;
    K[a][b] -= stiffness;
    K[b][a] -= stiffness;
    K[b][b] += stiffness;
  };
  addPair(0, 6, E * A / L);
  addPair(3, 9, G * J / L);

  const addBending = (indices, EI, rotationSign) => {
    const [d1, r1, d2, r2] = indices;
    const a = 12 * EI / (L ** 3);
    const b = rotationSign * 6 * EI / (L ** 2);
    const c = 4 * EI / L;
    const d = 2 * EI / L;
    const values = [
      [a, b, -a, b],
      [b, c, -b, d],
      [-a, -b, a, -b],
      [b, d, -b, c],
    ];
    const map = [d1, r1, d2, r2];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) K[map[i]][map[j]] += values[i][j];
    }
  };

  // v bends about +z and rz=dv/dx.
  addBending([1, 5, 7, 11], E * Iz, 1);
  // w bends about +y and ry=-dw/dx.
  addBending([2, 4, 8, 10], E * Iy, -1);
  return K;
}

/** Return local/global stiffness and transformation for a 3D frame member. */
function frame3dStiffness(nodes, section, options = {}) {
  const localY = options.localY ?? section.localY ?? [0, 1, 0];
  const axes = frame3dLocalAxes(nodes, localY);
  const Klocal = frame3dLocalStiffness(axes.length, section);
  const T = frame3dTransformation(axes);
  const K = congruence(Klocal, T);
  return { K, Klocal, T, axes, length: axes.length, section };
}

/**
 * Return a 12x12 global truss stiffness embedded in 6 DOF/node storage.
 * Translational axial terms are active; rotations remain exactly zero.
 */
function truss3dStiffness(nodes, section) {
  const [p1, p2] = validateTwoNodes(nodes, 'truss3dStiffness');
  const chord = subtract(p2, p1);
  const length = norm(chord);
  if (!(length > EPS)) throw new Error('truss3d member has near-zero length');
  const E = positive(section.E, 'truss3d E');
  const A = positive(section.A, 'truss3d A');
  const ex = scale(chord, 1 / length);
  const K = frameZeros(12);
  const coefficient = E * A / length;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const value = coefficient * ex[i] * ex[j];
      K[i][j] += value;
      K[i][6 + j] -= value;
      K[6 + i][j] -= value;
      K[6 + i][6 + j] += value;
    }
  }
  return { K, length, ex, section, nodes: [p1, p2] };
}

function frame3dTransformVector(T, vector) {
  if (vector.length !== 12) throw new Error('frame3d vector must have 12 entries');
  return multiplyMatrixVector(T, vector);
}

function frame3dTransformVectorTranspose(T, vector) {
  if (vector.length !== 12) throw new Error('frame3d vector must have 12 entries');
  const result = new Float64Array(12);
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 12; j++) result[i] += T[j][i] * vector[j];
  }
  return result;
}

/**
 * Normal/torsional stress at local section coordinate (y,z).
 * Section resultants use tension-positive N and the positive-face convention.
 * sigmaX = N/A + My*z/Iy - Mz*y/Iz.
 * `Wt` is optional torsional section modulus; shear from Vy/Vz is not inferred.
 */
function frame3dFiberStress(resultants, section, y = 0, z = 0) {
  const sigmaAxial = resultants.N / section.A;
  const sigmaBendingY = resultants.My * z / section.Iy;
  const sigmaBendingZ = -resultants.Mz * y / section.Iz;
  const sigmaX = sigmaAxial + sigmaBendingY + sigmaBendingZ;
  const tauTorsion = Number(section.Wt) > 0 ? resultants.T / section.Wt : null;
  return { y, z, sigmaX, sigmaAxial, sigmaBendingY, sigmaBendingZ, tauTorsion };
}

function sectionResultantsFromLocalEndForces(qLocal) {
  const from = (offset, sign) => ({
    N: sign * qLocal[offset],
    Vy: sign * qLocal[offset + 1],
    Vz: sign * qLocal[offset + 2],
    T: sign * qLocal[offset + 3],
    My: sign * qLocal[offset + 4],
    Mz: sign * qLocal[offset + 5],
  });
  // Same positive-face convention at x=0 and x=L.
  return { node1: from(0, -1), node2: from(6, 1) };
}

/**
 * Recover local nodal resisting forces and end-section stresses.
 *
 * `equivalentNodalLoadLocal`, when supplied, is an applied consistent member
 * load in local axes and is subtracted: qLocal=Klocal*uLocal-fEquivalent.
 * Raw `qLocal` is ordered by FRAME3D_FORCE_NAMES. `sectionResultants` converts
 * both ends to one positive-face convention. Interior extrema under member
 * loads require load-specific section-force interpolation and are not implied.
 */
function frame3dResponse(nodes, section, uGlobal, options = {}) {
  if (uGlobal.length !== 12) throw new Error('frame3dResponse expects 12 global DOFs');
  const element = options.element ?? frame3dStiffness(nodes, section, options);
  const uLocal = frame3dTransformVector(element.T, uGlobal);
  const qLocal = multiplyMatrixVector(element.Klocal, uLocal);
  const equivalent = options.equivalentNodalLoadLocal;
  if (equivalent) {
    if (equivalent.length !== 12) throw new Error('equivalentNodalLoadLocal must have 12 entries');
    for (let i = 0; i < 12; i++) qLocal[i] -= equivalent[i];
  }
  const qGlobal = frame3dTransformVectorTranspose(element.T, qLocal);
  const sectionResultants = sectionResultantsFromLocalEndForces(qLocal);
  const fibers = section.fibers ?? (
    Number(section.yMax) >= 0 && Number(section.zMax) >= 0
      ? [
          { name: '+y+z', y: section.yMax, z: section.zMax },
          { name: '-y+z', y: -section.yMax, z: section.zMax },
          { name: '-y-z', y: -section.yMax, z: -section.zMax },
          { name: '+y-z', y: section.yMax, z: -section.zMax },
        ]
      : []
  );
  const stresses = {};
  for (const [end, resultants] of Object.entries(sectionResultants)) {
    stresses[end] = fibers.map((fiber, index) => ({
      name: fiber.name ?? `fiber-${index + 1}`,
      ...frame3dFiberStress(resultants, section, fiber.y, fiber.z),
    }));
  }
  return {
    ...element,
    uGlobal: Float64Array.from(uGlobal),
    uLocal,
    qLocal,
    qGlobal,
    forceNames: FRAME3D_FORCE_NAMES,
    sectionResultants,
    stresses,
  };
}

/** Recover extension, tension-positive axial force/stress, and end forces. */
function truss3dResponse(nodes, section, uGlobal, options = {}) {
  if (uGlobal.length !== 12) throw new Error('truss3dResponse expects 12 global DOFs');
  const element = options.element ?? truss3dStiffness(nodes, section);
  const du = [
    uGlobal[6] - uGlobal[0],
    uGlobal[7] - uGlobal[1],
    uGlobal[8] - uGlobal[2],
  ];
  const extension = dot(du, element.ex);
  const strain = extension / element.length;
  const stress = section.E * strain;
  const axialForce = section.A * stress;
  const qGlobal = multiplyMatrixVector(element.K, uGlobal);
  return {
    ...element,
    uGlobal: Float64Array.from(uGlobal),
    extension,
    strain,
    stress,
    axialForce,
    qGlobal,
    tension: axialForce >= 0,
  };
}

function lineElementDofs(nodeIndices) {
  if (!Array.isArray(nodeIndices) || nodeIndices.length !== 2) {
    throw new Error('line element needs two node indices');
  }
  return nodeIndices.flatMap((node) =>
    Array.from({ length: LINE_DOF_PER_NODE }, (_, dof) => LINE_DOF_PER_NODE * node + dof));
}

/** Add an element matrix to any shell-compatible global matrix in place. */
function addLineElementMatrix(K, dofs, elementK, scaleFactor = 1) {
  if (dofs.length !== elementK.length) throw new Error('element DOF/matrix size mismatch');
  for (let i = 0; i < dofs.length; i++) {
    if (!K[dofs[i]]) throw new Error(`global matrix is missing row ${dofs[i]}`);
    for (let j = 0; j < dofs.length; j++) {
      if (dofs[j] >= K.length) throw new Error(`global matrix is missing column ${dofs[j]}`);
      K[dofs[i]][dofs[j]] += scaleFactor * elementK[i][j];
    }
  }
  return K;
}

function elementNodeIndices(element) {
  const indices = element.nodes ?? [element.n1, element.n2];
  if (!Array.isArray(indices) || indices.length !== 2) {
    throw new Error(`line element ${element.id ?? '?'} needs two nodes`);
  }
  return indices;
}

/**
 * Assemble frame3d/truss3d elements into an existing 6-DOF/node global K.
 * This is the primary mixed shell-frame assembly hook.
 */
function assembleFrameTrussInto(K, model) {
  const requiredDofs = model.nodes.length * LINE_DOF_PER_NODE;
  if (!Array.isArray(K) || K.length < requiredDofs) {
    throw new Error(`global matrix needs at least ${requiredDofs} rows`);
  }
  const elementData = [];
  for (const element of model.elements ?? []) {
    const type = (element.type ?? '').toLowerCase();
    if (!['frame3d', 'truss3d'].includes(type)) continue;
    const indices = elementNodeIndices(element);
    const nodes = indices.map((index) => {
      if (!model.nodes[index]) throw new Error(`line element node ${index} does not exist`);
      return model.nodes[index];
    });
    const property = model.properties?.[element.group] ?? model.properties?.default;
    if (!property) throw new Error(`no property for line group ${element.group ?? 'default'}`);
    const data = type === 'frame3d'
      ? frame3dStiffness(nodes, property, { localY: element.localY ?? property.localY })
      : truss3dStiffness(nodes, property);
    const dofs = lineElementDofs(indices);
    addLineElementMatrix(K, dofs, data.K);
    elementData.push({ element, type, indices, nodes, property, dofs, ...data });
  }
  return { K, ndof: K.length, elementData };
}

/** Create a line-only matrix, or reuse a supplied shell/global matrix. */
function assembleFrameTrussModel(model, existingK = null) {
  const ndof = model.nodes.length * LINE_DOF_PER_NODE;
  const K = existingK ?? frameZeros(ndof);
  return assembleFrameTrussInto(K, model);
}

function lineElementDisplacements(U, dofs) {
  return Float64Array.from(dofs, (dof) => U[dof]);
}

return { LINE_DOF_PER_NODE, FRAME3D_DOF_NAMES, FRAME3D_FORCE_NAMES, frameZeros, frame3dLocalAxes, frame3dTransformation, frame3dLocalStiffness, frame3dStiffness, truss3dStiffness, frame3dTransformVector, frame3dTransformVectorTranspose, frame3dFiberStress, frame3dResponse, truss3dResponse, lineElementDofs, addLineElementMatrix, assembleFrameTrussInto, assembleFrameTrussModel, lineElementDisplacements };
})();
const { LINE_DOF_PER_NODE, FRAME3D_DOF_NAMES, FRAME3D_FORCE_NAMES, frameZeros, frame3dLocalAxes, frame3dTransformation, frame3dLocalStiffness, frame3dStiffness, truss3dStiffness, frame3dTransformVector, frame3dTransformVectorTranspose, frame3dFiberStress, frame3dResponse, truss3dResponse, lineElementDofs, addLineElementMatrix, assembleFrameTrussInto, assembleFrameTrussModel, lineElementDisplacements } = __frameCore;
    const __hybridArchModel = (() => {
const HYBRID_FRAME_CORE_STATUS = Object.freeze({
  connected: true,
  formulation: 'MITC4 shell + 3D Euler-Bernoulli frame',
  analysis: 'linear small-displacement quasi-static moving-load influence history',
  structuralSystem: 'deck arch: deck/girders -> spandrel columns -> twin arch ribs -> arch-spring supports',
});

const STEEL_E = 210e9;
const STEEL_G = STEEL_E / (2 * (1 + 0.30));
const FORCE_EPS = 1e-9;

function finite(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function normalizeHybridArchInput(raw = {}) {
  const nx = Math.max(4, Math.round(finite(raw.mesh?.nx, 12)));
  const ny = Math.max(2, Math.round(finite(raw.mesh?.ny ?? raw.mesh?.nz, 4)));
  const length = Math.max(4, finite(raw.bridge?.length, 64));
  const width = Math.max(2, finite(raw.bridge?.width, 10));
  const axleOffsets = (raw.train?.axleOffsets ?? []).map(Number).filter(Number.isFinite);
  return {
    bridge: {
      length,
      width,
      archRise: Math.max(0.5, finite(raw.bridge?.archRise, 12.8)),
      // A strictly positive clearance prevents a zero-length crown column.
      crownClearance: Math.max(0.25, finite(raw.bridge?.crownClearance, 2.5)),
    },
    material: {
      E: Math.max(1e6, finite(raw.material?.E, 34.5e9)),
      nu: clamp(finite(raw.material?.nu, 0.20), -0.95, 0.49),
    },
    sections: {
      archArea: Math.max(1e-4, finite(raw.sections?.archArea, 0.85)),
      deckThickness: Math.max(0.02, finite(raw.sections?.deckThickness, 0.42)),
      columnArea: Math.max(1e-4, finite(raw.sections?.columnArea, 0.22)),
    },
    mesh: { nx, ny },
    train: {
      axleLoad: Math.max(0, finite(raw.train?.axleLoad, 160e3)),
      axleOffsets: axleOffsets.length ? axleOffsets : [1.8, 4.3, 14.2, 16.7],
      trackOffset: clamp(finite(raw.train?.trackOffset, 0), -0.45 * width, 0.45 * width),
      loadSpread: Math.max(0, finite(raw.train?.loadSpread, 0.55)),
    },
    positions: {
      count: Math.max(2, Math.round(finite(raw.positions?.count, 121))),
      headStart: finite(raw.positions?.headStart, -2),
      headEnd: finite(raw.positions?.headEnd, length + Math.max(...axleOffsets, 0) + 2),
    },
  };
}

function scaledSection(base, area, referenceArea) {
  const ratio = area / referenceArea;
  return {
    ...base,
    A: area,
    Iy: base.Iy * ratio * ratio,
    Iz: base.Iz * ratio * ratio,
    J: base.J * ratio * ratio,
    yMax: base.yMax * Math.sqrt(ratio),
    zMax: base.zMax * Math.sqrt(ratio),
    Wt: base.Wt * ratio ** 1.5,
  };
}

function addFrame(elements, id, n1, n2, group, localY = [0, 1, 0], extra = {}) {
  elements.push({ id, type: 'frame3d', nodes: [n1, n2], group, localY, ...extra });
}

function createHybridArchSystem(rawInput = {}) {
  const input = normalizeHybridArchInput(rawInput);
  const {
    length: L,
    width: W,
    archRise: f,
    crownClearance,
  } = input.bridge;
  const deckElevation = f + crownClearance;
  const { nx, ny } = input.mesh;
  const nodes = [];
  const elements = [];
  const deckNodeGrid = Array.from({ length: ny + 1 }, () => Array(nx + 1));
  const node = (x, y, z, meta = {}) => {
    const index = nodes.length;
    const value = Object.assign({ index, x, y, z }, meta);
    nodes.push(value);
    return value;
  };

  // The complete deck subsystem is elevated above the arch crown and has no support.
  for (let j = 0; j <= ny; j++) {
    for (let i = 0; i <= nx; i++) {
      deckNodeGrid[j][i] = node(L * i / nx, -W / 2 + W * j / ny, deckElevation, {
        kind: 'deck', i, j,
      }).index;
    }
  }
  const deckNodeCount = nodes.length;

  const shellElementByCell = Array.from({ length: ny }, () => Array(nx));
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const element = {
        id: `deck-${i}-${j}`,
        type: 'shell4',
        nodes: [
          deckNodeGrid[j][i],
          deckNodeGrid[j][i + 1],
          deckNodeGrid[j + 1][i + 1],
          deckNodeGrid[j + 1][i],
        ],
        group: 'deck',
        cell: [i, j],
      };
      shellElementByCell[j][i] = elements.length;
      elements.push(element);
    }
  }

  // Both arch ribs have independent nodes at every station, including springings.
  // No arch node is shared with the deck: columns are the only load-transfer path.
  const archNodeGrid = [[], []];
  for (let sideIndex = 0; sideIndex < 2; sideIndex++) {
    for (let i = 0; i <= nx; i++) {
      const x = L * i / nx;
      const z = 4 * f * x * (L - x) / (L * L);
      archNodeGrid[sideIndex][i] = node(x, sideIndex === 0 ? -W / 2 : W / 2, z, {
        kind: 'arch', sideIndex, i,
        spring: i === 0 || i === nx,
      }).index;
    }
  }

  // Longitudinal main girders lie in the horizontal deck plane.
  for (let sideIndex = 0; sideIndex < 2; sideIndex++) {
    const j = sideIndex === 0 ? 0 : ny;
    for (let i = 0; i < nx; i++) {
      addFrame(
        elements,
        `girder-${sideIndex}-${i}`,
        deckNodeGrid[j][i],
        deckNodeGrid[j][i + 1],
        'girder',
        [0, 1, 0],
        { sideIndex, station: i },
      );
    }
  }

  // Floor beams share all six nodal DOFs with the shell and main girders.
  for (let i = 0; i <= nx; i++) {
    for (let j = 0; j < ny; j++) {
      addFrame(
        elements,
        `floor-${i}-${j}`,
        deckNodeGrid[j][i],
        deckNodeGrid[j + 1][i],
        'floor',
        [-1, 0, 0],
        { station: i },
      );
    }
  }

  const archElementIds = [];
  for (let sideIndex = 0; sideIndex < 2; sideIndex++) {
    for (let i = 0; i < nx; i++) {
      const id = `arch-${sideIndex}-${i}`;
      addFrame(
        elements,
        id,
        archNodeGrid[sideIndex][i],
        archNodeGrid[sideIndex][i + 1],
        'arch',
        [0, 1, 0],
        { sideIndex, station: i },
      );
      archElementIds.push(id);
    }
  }

  // Spandrel columns are frame members, ordered arch -> deck. Their deck-end
  // global nodal force is therefore qGlobal[6..11], used for transfer closure.
  const columnElementIds = [];
  for (let sideIndex = 0; sideIndex < 2; sideIndex++) {
    const j = sideIndex === 0 ? 0 : ny;
    for (let i = 0; i <= nx; i++) {
      const id = `column-${sideIndex}-${i}`;
      addFrame(
        elements,
        id,
        archNodeGrid[sideIndex][i],
        deckNodeGrid[j][i],
        'column',
        [1, 0, 0],
        { sideIndex, station: i, deckEnd: 1 },
      );
      columnElementIds.push(id);
    }
  }

  // Transverse arch bracing supplies out-of-plane stability below the deck.
  for (let i = 2; i < nx - 1; i += 2) {
    addFrame(
      elements,
      `portal-${i}`,
      archNodeGrid[0][i],
      archNodeGrid[1][i],
      'brace',
      [-1, 0, 0],
      { station: i },
    );
  }

  const properties = {
    deck: {
      E: input.material.E,
      nu: input.material.nu,
      t: input.sections.deckThickness,
      shearCorrection: 5 / 6,
      drillFactor: 1e-3,
    },
    arch: scaledSection({
      E: STEEL_E, G: STEEL_G, A: 0.42,
      Iy: 0.105, Iz: 0.105, J: 0.160,
      yMax: 0.45, zMax: 0.45, Wt: 0.17,
    }, input.sections.archArea, 0.42),
    girder: {
      E: STEEL_E, G: STEEL_G, A: 0.34,
      Iy: 0.080, Iz: 0.120, J: 0.060,
      yMax: 0.28, zMax: 0.42, Wt: 0.070,
    },
    floor: {
      E: STEEL_E, G: STEEL_G, A: 0.20,
      Iy: 0.036, Iz: 0.055, J: 0.025,
      yMax: 0.24, zMax: 0.34, Wt: 0.032,
    },
    column: scaledSection({
      E: STEEL_E, G: STEEL_G, A: 0.22,
      Iy: 0.025, Iz: 0.025, J: 0.012,
      yMax: 0.25, zMax: 0.25, Wt: 0.018,
    }, input.sections.columnArea, 0.22),
    brace: {
      E: STEEL_E, G: STEEL_G, A: 0.10,
      Iy: 0.010, Iz: 0.010, J: 0.006,
      yMax: 0.16, zMax: 0.16, Wt: 0.010,
    },
  };

  const archSpringSupportNodes = [
    archNodeGrid[0][0],
    archNodeGrid[1][0],
    archNodeGrid[0][nx],
    archNodeGrid[1][nx],
  ];
  const supports = [
    { node: archSpringSupportNodes[0], ux: true, uy: true, uz: true },
    { node: archSpringSupportNodes[1], ux: true, uy: true, uz: true },
    { node: archSpringSupportNodes[2], ux: true, uz: true },
    { node: archSpringSupportNodes[3], ux: true, uz: true },
  ];
  const model = { nodes, elements, properties, supports };
  const shell = assembleShellModel(model);
  const line = assembleFrameTrussInto(shell.K, model);
  const fixedDofs = constrainedDofs(supports);
  const factor = factorConstrainedSystem(shell.K, fixedDofs);

  const lineById = new Map(line.elementData.map((item) => [item.element.id, item]));
  const shellByCell = Array.from({ length: ny }, () => Array(nx));
  for (const item of shell.elementData) {
    const [i, j] = item.element.cell;
    shellByCell[j][i] = item;
  }
  const middleNode = deckNodeGrid[Math.round(ny / 2)][Math.round(nx / 2)];
  return {
    input,
    model,
    K: shell.K,
    factor,
    fixedDofs,
    shellElementData: shell.elementData,
    lineElementData: line.elementData,
    topology: {
      nx,
      ny,
      deckElevation,
      deckNodeGrid,
      deckNodeCount,
      archNodeGrid,
      shellByCell,
      archSpringSupportNodes,
      archElementData: archElementIds.map((id) => lineById.get(id)),
      columnElementData: columnElementIds.map((id) => lineById.get(id)),
      middleNode,
    },
  };
}

function addElementLoad(F, dofs, values) {
  for (let i = 0; i < dofs.length; i++) F[dofs[i]] += values[i];
}

function sampleOffsets(halfWidth) {
  if (halfWidth <= 1e-12) return [{ offset: 0, weight: 1 }];
  return [
    { offset: -halfWidth, weight: 0.25 },
    { offset: 0, weight: 0.50 },
    { offset: halfWidth, weight: 0.25 },
  ];
}

function buildMovingLoadVector(system, headPosition) {
  const { input, topology } = system;
  const { length: L, width: W } = input.bridge;
  const { nx, ny, shellByCell, deckElevation } = topology;
  const dx = L / nx;
  const dy = W / ny;
  const F = vecZeros(system.model.nodes.length * 6);
  const active = [];
  const samples = [];
  for (const offset of input.train.axleOffsets) {
    const axleX = headPosition - offset;
    if (axleX < -1e-10 || axleX > L + 1e-10) continue;
    const x = clamp(axleX, 0, L);
    const y = input.train.trackOffset;
    const halfX = Math.min(input.train.loadSpread, x, L - x);
    const halfY = Math.min(0.70 * input.train.loadSpread, y + W / 2, W / 2 - y);
    active.push(x);
    for (const sx of sampleOffsets(halfX)) {
      for (const sy of sampleOffsets(halfY)) {
        const px = clamp(x + sx.offset, 0, L);
        const py = clamp(y + sy.offset, -W / 2, W / 2);
        const i = Math.min(nx - 1, Math.max(0, Math.floor(px / dx)));
        const j = Math.min(ny - 1, Math.max(0, Math.floor((py + W / 2) / dy)));
        const data = shellByCell[j][i];
        const force = -input.train.axleLoad * sx.weight * sy.weight;
        const mapped = shell4PointLoad(
          data.nodes,
          [px, py, deckElevation],
          [0, 0, force],
        );
        if (!mapped) throw new Error(`wheel-load point (${px}, ${py}) missed deck shell ${i},${j}`);
        addElementLoad(F, data.dofs, mapped.load);
        samples.push({ x: px, y: py, z: deckElevation, force });
      }
    }
  }
  return { F, active, samples, head: headPosition };
}

function rangeFromFrames(frames, field) {
  let minimum = Infinity;
  let maximum = -Infinity;
  for (const frame of frames) {
    const value = frame[field];
    const values = Array.isArray(value) || ArrayBuffer.isView(value) ? value : [value];
    for (const item of values) {
      if (item == null) continue;
      minimum = Math.min(minimum, item);
      maximum = Math.max(maximum, item);
    }
  }
  if (!Number.isFinite(minimum)) return { min: 0, max: 0 };
  return { min: minimum, max: maximum };
}

function totalVerticalLoad(F) {
  let total = 0;
  for (let dof = 2; dof < F.length; dof += 6) total += F[dof];
  return total;
}

function recoverHybridArchFrame(system, displacement, loadState) {
  const { topology } = system;
  const deckDisp = new Array(topology.deckNodeCount);
  for (let nodeIndex = 0; nodeIndex < topology.deckNodeCount; nodeIndex++) {
    deckDisp[nodeIndex] = displacement[6 * nodeIndex + 2];
  }

  const stressSum = new Float64Array(topology.deckNodeCount);
  const stressCount = new Uint16Array(topology.deckNodeCount);
  let deckPeakPa = 0;
  for (const data of system.shellElementData) {
    const response = shell4ResponseFromElement(
      data,
      data.material,
      elementDisplacements(displacement, data.dofs),
    );
    deckPeakPa = Math.max(deckPeakPa, response.maxVonMises);
    for (const index of data.indices) {
      stressSum[index] += response.maxVonMises;
      stressCount[index] += 1;
    }
  }
  const deckStress = Array.from(stressSum, (sum, index) =>
    stressCount[index] ? sum / stressCount[index] / 1e6 : 0);

  const archStress = [];
  let archPeakPa = 0;
  let archCompressionPeakN = 0;
  for (const data of topology.archElementData) {
    const response = frame3dResponse(
      data.nodes,
      data.property,
      lineElementDisplacements(displacement, data.dofs),
      { element: data },
    );
    let peak = 0;
    for (const end of Object.values(response.stresses)) {
      for (const fiber of end) peak = Math.max(peak, Math.abs(fiber.sigmaX));
    }
    const axial = 0.5 * (
      response.sectionResultants.node1.N + response.sectionResultants.node2.N
    );
    archCompressionPeakN = Math.max(archCompressionPeakN, -axial, 0);
    archPeakPa = Math.max(archPeakPa, peak);
    archStress.push(peak / 1e6);
  }

  const columnForces = [];
  let columnCompressionPeakN = 0;
  let columnDeckEndVerticalN = 0;
  let columnEndResidualN = 0;
  for (const data of topology.columnElementData) {
    const response = frame3dResponse(
      data.nodes,
      data.property,
      lineElementDisplacements(displacement, data.dofs),
      { element: data },
    );
    const axial = 0.5 * (
      response.sectionResultants.node1.N + response.sectionResultants.node2.N
    );
    columnForces.push(axial / 1e3); // kN; compression is negative.
    columnCompressionPeakN = Math.max(columnCompressionPeakN, -axial, 0);
    columnEndResidualN = Math.max(
      columnEndResidualN,
      Math.abs(response.sectionResultants.node1.N - response.sectionResultants.node2.N),
    );
    columnDeckEndVerticalN += response.qGlobal[8];
  }

  const appliedVerticalN = totalVerticalLoad(loadState.F);
  // Both terms use the same global nodal-force convention and are negative for
  // downward train load, hence a closed transfer path gives +1.
  const transferRatio = Math.abs(appliedVerticalN) <= FORCE_EPS
    ? null
    : columnDeckEndVerticalN / appliedVerticalN;
  const equilibrium = globalEquilibriumCheck(system, displacement, loadState.F);
  const leftRxN = equilibrium.supportReactions
    .filter((reaction) => system.model.nodes[reaction.node].x < 0.5 * system.input.bridge.length)
    .reduce((sum, reaction) => sum + reaction.force[0], 0);
  const rightRxN = equilibrium.supportReactions
    .filter((reaction) => system.model.nodes[reaction.node].x > 0.5 * system.input.bridge.length)
    .reduce((sum, reaction) => sum + reaction.force[0], 0);
  const archHorizontalThrust = 0.5 * (Math.abs(leftRxN) + Math.abs(rightRxN)) / 1e3;
  const appliedForceNorm = vectorNorm(equilibrium.appliedForce);
  const appliedMomentNorm = vectorNorm(equilibrium.appliedMoment);
  const balance = {
    hasAppliedLoad: loadState.active.length > 0,
    appliedForceNorm,
    appliedMomentNorm,
    forceImbalanceNorm: equilibrium.forceImbalanceNorm,
    momentImbalanceNorm: equilibrium.momentImbalanceNorm,
    forceRelativeResidual: appliedForceNorm > FORCE_EPS
      ? equilibrium.forceImbalanceNorm / appliedForceNorm
      : null,
    momentRelativeResidual: appliedMomentNorm > FORCE_EPS
      ? equilibrium.momentImbalanceNorm / appliedMomentNorm
      : null,
    maximumFreeTranslationResidual: equilibrium.maximumFreeTranslationResidual,
    maximumFreeRotationResidual: equilibrium.maximumFreeRotationResidual,
  };
  const middleUzMm = 1e3 * displacement[6 * topology.middleNode + 2];
  const minimumUzMm = 1e3 * Math.min(...deckDisp);
  return {
    head: loadState.head,
    active: loadState.active,
    midDisp: middleUzMm,
    minimumDisp: minimumUzMm,
    deckRawPeak: deckPeakPa / 1e6,
    archPeak: archPeakPa / 1e6,
    deckDisp,
    deckStress,
    archStress,
    archCompressionPeak: archCompressionPeakN / 1e3,
    columnForces,
    columnCompressionPeak: columnCompressionPeakN / 1e3,
    columnEndResidual: columnEndResidualN / 1e3,
    columnDeckEndVertical: columnDeckEndVerticalN / 1e3,
    appliedVerticalLoad: appliedVerticalN / 1e3,
    transferRatio,
    archHorizontalThrust,
    archSpringHorizontalReactions: [leftRxN / 1e3, rightRxN / 1e3],
    balance,
  };
}

function solveHybridArchFrame(system, headPosition) {
  const loadState = buildMovingLoadVector(system, headPosition);
  const displacement = solveFactoredSystem(system.factor, loadState.F);
  return {
    frame: recoverHybridArchFrame(system, displacement, loadState),
    displacement,
    loadState,
  };
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function addVector(target, value) {
  for (let i = 0; i < 3; i++) target[i] += value[i];
}

function vectorNorm(value) {
  return Math.hypot(value[0], value[1], value[2]);
}

function globalEquilibriumCheck(system, displacement, F) {
  const residual = new Float64Array(F.length);
  for (let i = 0; i < system.K.length; i++) {
    let value = -F[i];
    for (let j = 0; j < system.K.length; j++) value += system.K[i][j] * displacement[j];
    residual[i] = value;
  }
  const fixed = new Set(system.fixedDofs);
  const appliedForce = [0, 0, 0];
  const reactionForce = [0, 0, 0];
  const appliedMoment = [0, 0, 0];
  const reactionMoment = [0, 0, 0];
  let maximumFreeTranslationResidual = 0;
  let maximumFreeRotationResidual = 0;
  for (let nodeIndex = 0; nodeIndex < system.model.nodes.length; nodeIndex++) {
    const node = system.model.nodes[nodeIndex];
    const position = [node.x, node.y, node.z];
    const base = 6 * nodeIndex;
    const force = [F[base], F[base + 1], F[base + 2]];
    const moment = [F[base + 3], F[base + 4], F[base + 5]];
    addVector(appliedForce, force);
    addVector(appliedMoment, cross(position, force));
    addVector(appliedMoment, moment);

    const reaction = [0, 0, 0];
    const reactionCouple = [0, 0, 0];
    for (let component = 0; component < 3; component++) {
      if (fixed.has(base + component)) reaction[component] = residual[base + component];
      if (fixed.has(base + 3 + component)) {
        reactionCouple[component] = residual[base + 3 + component];
      }
    }
    addVector(reactionForce, reaction);
    addVector(reactionMoment, cross(position, reaction));
    addVector(reactionMoment, reactionCouple);
    for (let component = 0; component < 3; component++) {
      const translationDof = base + component;
      const rotationDof = base + 3 + component;
      if (!fixed.has(translationDof)) {
        maximumFreeTranslationResidual = Math.max(
          maximumFreeTranslationResidual,
          Math.abs(residual[translationDof]),
        );
      }
      if (!fixed.has(rotationDof)) {
        maximumFreeRotationResidual = Math.max(
          maximumFreeRotationResidual,
          Math.abs(residual[rotationDof]),
        );
      }
    }
  }
  const forceImbalanceVector = appliedForce.map((value, i) => value + reactionForce[i]);
  const momentImbalanceVector = appliedMoment.map((value, i) => value + reactionMoment[i]);
  const supportReactions = system.model.supports.map((support) => {
    const base = 6 * support.node;
    return {
      node: support.node,
      force: [
        fixed.has(base) ? residual[base] : 0,
        fixed.has(base + 1) ? residual[base + 1] : 0,
        fixed.has(base + 2) ? residual[base + 2] : 0,
      ],
      moment: [
        fixed.has(base + 3) ? residual[base + 3] : 0,
        fixed.has(base + 4) ? residual[base + 4] : 0,
        fixed.has(base + 5) ? residual[base + 5] : 0,
      ],
    };
  });
  return {
    appliedForce,
    reactionForce,
    forceImbalanceVector,
    forceImbalanceNorm: vectorNorm(forceImbalanceVector),
    appliedMoment,
    reactionMoment,
    momentImbalanceVector,
    momentImbalanceNorm: vectorNorm(momentImbalanceVector),
    supportReactions,
    appliedZ: appliedForce[2],
    reactionZ: reactionForce[2],
    forceImbalance: forceImbalanceVector[2],
    maximumFreeTranslationResidual,
    maximumFreeRotationResidual,
  };
}

function nextPaint() {
  if (typeof requestAnimationFrame === 'function') {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
  }
  return Promise.resolve();
}

async function solveHybridArchModel(rawInput = {}) {
  const system = createHybridArchSystem(rawInput);
  const frames = [];
  const { count, headStart, headEnd } = system.input.positions;
  let representativeTransfer = null;
  for (let index = 0; index < count; index++) {
    const head = headStart + (headEnd - headStart) * index / (count - 1);
    const solved = solveHybridArchFrame(system, head);
    frames.push(solved.frame);
    if (solved.loadState.active.length) {
      if (
        !representativeTransfer
        || solved.frame.active.length > representativeTransfer.activeAxles
      ) {
        representativeTransfer = {
          head: solved.frame.head,
          activeAxles: solved.frame.active.length,
          appliedVerticalLoadkN: solved.frame.appliedVerticalLoad,
          columnDeckEndVerticalkN: solved.frame.columnDeckEndVertical,
          transferRatio: solved.frame.transferRatio,
          relativeImbalance: Math.abs(solved.frame.transferRatio - 1),
        };
      }
    }
    if (index > 0 && index % 16 === 0) await nextPaint();
  }
  const ranges = {
    deckDisp: rangeFromFrames(frames, 'deckDisp'),
    deckStress: rangeFromFrames(frames, 'deckStress'),
    archStress: rangeFromFrames(frames, 'archStress'),
    columnForces: rangeFromFrames(frames, 'columnForces'),
    archHorizontalThrust: rangeFromFrames(frames, 'archHorizontalThrust'),
  };
  const deckNodeSet = new Set(system.topology.deckNodeGrid.flat());
  const deckSupportCount = system.model.supports.filter((support) =>
    deckNodeSet.has(support.node)).length;
  return {
    frames,
    ranges,
    source: 'hybrid-fem',
    diagnostics: {
      formulation: HYBRID_FRAME_CORE_STATUS.formulation,
      structuralSystem: HYBRID_FRAME_CORE_STATUS.structuralSystem,
      nodes: system.model.nodes.length,
      shellElements: system.shellElementData.length,
      frameElements: system.lineElementData.filter((item) => item.type === 'frame3d').length,
      trussElements: system.lineElementData.filter((item) => item.type === 'truss3d').length,
      columnElements: system.topology.columnElementData.length,
      deckSupportCount,
      archSpringSupportNodes: [...system.topology.archSpringSupportNodes],
      freeDofs: system.factor.free.length,
      fixedDofs: system.fixedDofs.length,
      frameBalance: 'each frame stores its own force/moment balance and free-DOF residual summary',
      representativeTransfer,
      maximumColumnEndResidualkN: Math.max(...frames.map((frame) => frame.columnEndResidual)),
      emptyLoadTransferRatio: null,
      visualStress: 'nodal average of raw element maxima',
      readoutStress: 'raw element/Gauss maximum',
      columnForceConvention: 'kN; compression negative',
      compressionPeakConvention: 'positive kN magnitude',
    },
  };
}

return { HYBRID_FRAME_CORE_STATUS, normalizeHybridArchInput, createHybridArchSystem, buildMovingLoadVector, recoverHybridArchFrame, solveHybridArchFrame, globalEquilibriumCheck, solveHybridArchModel };
})();
const { HYBRID_FRAME_CORE_STATUS, normalizeHybridArchInput, createHybridArchSystem, buildMovingLoadVector, recoverHybridArchFrame, solveHybridArchFrame, globalEquilibriumCheck, solveHybridArchModel } = __hybridArchModel;

    const DEFAULTS = Object.freeze({ archRise:12.8, crownClearance:2.4, ribArea:.85, columnArea:.18, deckThickness:.42, elasticity:34.5, mesh:'12x4', axleLoad:160, bogieSpacing:2.5, trackOffset:0, loadSpread:.55, deformScale:130, playbackRate:1 });
    const params = { ...DEFAULTS };
    const bridge = Object.freeze({ length:64, width:10, railGauge:1.5, ribY:5.0 });
    const state = { analysis:null, frame:0, playing:false, resultMode:'deck-stress', chartMode:'deckDisp', view:'elevation', token:0, lastTick:performance.now(), accumulator:0 };
    const $ = s => document.querySelector(s); const $$ = s => [...document.querySelectorAll(s)];
    const loading = $('#loading'); const toast = $('#toast'); let toastTimer=0;
    function showToast(message){ clearTimeout(toastTimer); toast.textContent=message; toast.classList.add('show'); toastTimer=setTimeout(()=>toast.classList.remove('show'),3200); }
    function setLoading(show,title,detail){ if(title) $('#loading-title').textContent=title; if(detail) $('#loading-detail').textContent=detail; loading.classList.toggle('hidden',!show); }
    function V(x,y,z){ return new THREE.Vector3(x,z,-y); }
    function parseMesh(){ const [nx,ny]=params.mesh.split('x').map(Number); return {nx,ny}; }
    function deckElevation(){ return params.archRise+params.crownClearance; }
    function archZ(x){ return 4*params.archRise*x*(bridge.length-x)/(bridge.length*bridge.length); }
    function axleOffsets(){ const values=[]; for(let car=0;car<3;car++){ const b=1.8+car*17.2; values.push(b,b+params.bogieSpacing,b+12.4,b+12.4+params.bogieSpacing); } return values; }

    const scene = new THREE.Scene(); scene.fog=new THREE.Fog(0xb8c9cb,72,155);
    const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true}); renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap; $('#scene').appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(38,1,.1,260); camera.position.copy(V(32,-74,7.6));
    const controls = new OrbitControls(camera,renderer.domElement); controls.target.copy(V(32,0,7.6)); controls.enableDamping=true; controls.minDistance=28; controls.maxDistance=145; controls.maxPolarAngle=Math.PI*.49;
    scene.add(new THREE.HemisphereLight(0xe7f3f2,0x657977,2.1)); const sun=new THREE.DirectionalLight(0xfff4da,3.2); sun.position.set(-30,55,35); sun.castShadow=true; sun.shadow.mapSize.set(2048,2048); sun.shadow.camera.left=-75;sun.shadow.camera.right=75;sun.shadow.camera.top=55;sun.shadow.camera.bottom=-35; scene.add(sun);

    const world=new THREE.Group(), bridgeGroup=new THREE.Group(), trainGroup=new THREE.Group(), loadGroup=new THREE.Group(); scene.add(world,bridgeGroup,trainGroup,loadGroup);
    let deckGeometry, deckMesh, deckWire, deckNodes=[], archSegments=[], columnMeshes=[], crossMeshes=[];
    const neutralSteel=new THREE.Color(0x315867), neutralDeck=new THREE.Color(0xaebabc), neutralColumn=new THREE.Color(0xb07b43);
    function disposeGroup(group){ while(group.children.length){ const child=group.children.pop(); child.traverse(o=>{ o.geometry?.dispose(); if(Array.isArray(o.material)) o.material.forEach(m=>m.dispose()); else o.material?.dispose(); }); } }
    function cylinderBetween(a,b,r,material,segments=10){ const d=new THREE.Vector3().subVectors(b,a); const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,d.length(),segments),material); mesh.position.copy(a).add(b).multiplyScalar(.5); mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize()); return mesh; }
    function tubeBetween(a,b,r,color){ return cylinderBetween(a,b,r,new THREE.MeshStandardMaterial({color,metalness:.35,roughness:.42}),10); }
    function addWorld(){
      const river=new THREE.Mesh(new THREE.PlaneGeometry(150,70),new THREE.MeshStandardMaterial({color:0x718f94,roughness:.76,metalness:.06})); river.rotation.x=-Math.PI/2; river.position.copy(V(32,0,-1.4)); river.receiveShadow=true; world.add(river);
      const rockMat=new THREE.MeshStandardMaterial({color:0x7c8176,roughness:1}), rockDark=new THREE.MeshStandardMaterial({color:0x626d68,roughness:1});
      for(const side of [-1,1]) for(let i=0;i<7;i++){ const x=side<0?-18+i*3.1:82-i*3.1; const h=12+3*Math.sin(i*.9); const rock=new THREE.Mesh(new THREE.BoxGeometry(8,h,34-i*1.4),i%2?rockMat:rockDark); rock.position.copy(V(x,0,-1.1+h/2)); rock.rotation.y=(i-3)*.035*side; rock.receiveShadow=true;rock.castShadow=true;world.add(rock); }
      const grid=new THREE.GridHelper(150,30,0x58737a,0x8ea2a1); grid.position.copy(V(32,0,-1.28)); grid.material.opacity=.18;grid.material.transparent=true;world.add(grid);
    }
    addWorld();

    function buildDeck(){
      const {nx,ny}=parseMesh(); const positions=[],colors=[],indices=[]; deckNodes=[];
      const deckZ=deckElevation();
      for(let j=0;j<=ny;j++) for(let i=0;i<=nx;i++){ const x=bridge.length*i/nx,y=-bridge.width/2+bridge.width*j/ny,p=V(x,y,deckZ); positions.push(p.x,p.y,p.z); colors.push(neutralDeck.r,neutralDeck.g,neutralDeck.b); deckNodes.push({x,y,z:deckZ}); }
      const id=(i,j)=>j*(nx+1)+i; for(let j=0;j<ny;j++) for(let i=0;i<nx;i++) indices.push(id(i,j),id(i+1,j),id(i+1,j+1),id(i,j),id(i+1,j+1),id(i,j+1));
      deckGeometry=new THREE.BufferGeometry(); deckGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3)); deckGeometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3)); deckGeometry.setIndex(indices); deckGeometry.computeVertexNormals();
      deckMesh=new THREE.Mesh(deckGeometry,new THREE.MeshStandardMaterial({vertexColors:true,side:THREE.DoubleSide,metalness:.08,roughness:.72,polygonOffset:true,polygonOffsetFactor:1})); deckMesh.castShadow=true;deckMesh.receiveShadow=true;bridgeGroup.add(deckMesh);
      deckWire=new THREE.Mesh(deckGeometry,new THREE.MeshBasicMaterial({color:0x304f59,wireframe:true,transparent:true,opacity:.34}));bridgeGroup.add(deckWire);
      const girderColor=0x233f49; for(const y of [-bridge.ribY,bridge.ribY]) bridgeGroup.add(tubeBetween(V(0,y,deckZ-.38),V(64,y,deckZ-.38),.31,girderColor));
      const floorMat=new THREE.MeshStandardMaterial({color:0x4f6970,metalness:.35,roughness:.5}); for(let x=0;x<=64;x+=64/nx) bridgeGroup.add(cylinderBetween(V(x,-5,deckZ-.42),V(x,5,deckZ-.42),.11,floorMat,8));
      const railMat=new THREE.MeshStandardMaterial({color:0x394449,metalness:.82,roughness:.27}); for(const y of [-bridge.railGauge/2,bridge.railGauge/2]) bridgeGroup.add(cylinderBetween(V(0,y,deckZ+.19),V(64,y,deckZ+.19),.055,railMat,10));
      const sleeperMat=new THREE.MeshStandardMaterial({color:0x5d5144,roughness:.9}); for(let x=.5;x<64;x+=1.15){ const s=new THREE.Mesh(new THREE.BoxGeometry(.16,.09,2.45),sleeperMat);s.position.copy(V(x,0,deckZ+.11));bridgeGroup.add(s); }
    }
    function buildArch(){
      archSegments=[];columnMeshes=[];crossMeshes=[]; const nSeg=parseMesh().nx;
      for(const side of [-1,1]) for(let i=0;i<nSeg;i++){ const x0=64*i/nSeg,x1=64*(i+1)/nSeg,xm=(x0+x1)/2; const curve=new THREE.CatmullRomCurve3([V(x0,side*bridge.ribY,archZ(x0)),V(xm,side*bridge.ribY,archZ(xm)),V(x1,side*bridge.ribY,archZ(x1))]); const mat=new THREE.MeshStandardMaterial({color:neutralSteel.clone(),metalness:.46,roughness:.36}); const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,5,.34,12,false),mat);mesh.castShadow=true;bridgeGroup.add(mesh);archSegments.push({mesh,x:xm,side}); }
      const columnRadius=THREE.MathUtils.clamp(Math.sqrt(params.columnArea/Math.PI)*.42,.09,.19), columnMat=()=>new THREE.MeshStandardMaterial({color:neutralColumn.clone(),metalness:.42,roughness:.42});
      for(const side of [-1,1]) for(let i=0;i<=nSeg;i++){ const x=64*i/nSeg; const a=V(x,side*bridge.ribY,archZ(x)+.18),b=V(x,side*bridge.ribY,deckElevation()-.48); const mesh=cylinderBetween(a,b,columnRadius,columnMat(),10);mesh.castShadow=true;bridgeGroup.add(mesh);columnMeshes.push({mesh,x,side,baseRadius:columnRadius}); }
      const braceMat=new THREE.MeshStandardMaterial({color:0x5b747c,metalness:.42,roughness:.42}); for(let i=2;i<nSeg;i+=2){ const x=64*i/nSeg,z=archZ(x); const mesh=cylinderBetween(V(x,-bridge.ribY,z),V(x,bridge.ribY,z),.10,braceMat,8);bridgeGroup.add(mesh);crossMeshes.push(mesh); }
      const footMat=new THREE.MeshStandardMaterial({color:0x6d7d7e,metalness:.2,roughness:.65}); for(const x of [0,64]){ const pedestal=new THREE.Mesh(new THREE.BoxGeometry(4.8,4.2,13),new THREE.MeshStandardMaterial({color:0xc4c3b7,roughness:.9}));pedestal.position.copy(V(x,0,archZ(x)-1.1));pedestal.receiveShadow=true;pedestal.castShadow=true;bridgeGroup.add(pedestal); for(const side of [-1,1]){ const block=new THREE.Mesh(new THREE.BoxGeometry(1.6,1.5,1.6),footMat);block.position.copy(V(x,side*bridge.ribY,archZ(x)-.45));bridgeGroup.add(block); } }
    }
    function buildBridge(){ disposeGroup(bridgeGroup); buildDeck(); buildArch(); }

    function buildTrain(){
      disposeGroup(trainGroup); const bodyMat=new THREE.MeshStandardMaterial({color:0xe7e3d8,metalness:.3,roughness:.34}),stripeMat=new THREE.MeshStandardMaterial({color:0xd65f44,metalness:.2,roughness:.5}),glassMat=new THREE.MeshStandardMaterial({color:0x183945,metalness:.55,roughness:.22}),wheelMat=new THREE.MeshStandardMaterial({color:0x262d30,metalness:.78,roughness:.26});
      const deckZ=deckElevation();
      for(let car=0;car<3;car++){ const group=new THREE.Group(),center=-8.1-car*17.2; const body=new THREE.Mesh(new THREE.BoxGeometry(15.8,1.75,3.05),bodyMat); body.position.copy(V(center,params.trackOffset,deckZ+1.35));body.castShadow=true;group.add(body); const stripe=new THREE.Mesh(new THREE.BoxGeometry(15.9,.16,3.08),stripeMat);stripe.position.copy(V(center,params.trackOffset,deckZ+1.2));group.add(stripe); for(const side of [-1,1]){ const win=new THREE.Mesh(new THREE.BoxGeometry(12.2,.52,.025),glassMat);win.position.copy(V(center,params.trackOffset+side*1.535,deckZ+1.65));group.add(win); } trainGroup.add(group); }
      for(const offset of axleOffsets()){ const axle=cylinderBetween(V(-offset,params.trackOffset-1.05,deckZ+.37),V(-offset,params.trackOffset+1.05,deckZ+.37),.09,wheelMat,12);trainGroup.add(axle); for(const y of [-.83,.83]){ const w=new THREE.Mesh(new THREE.CylinderGeometry(.33,.33,.14,16),wheelMat);w.rotation.x=Math.PI/2;w.position.copy(V(-offset,params.trackOffset+y,deckZ+.37));w.castShadow=true;trainGroup.add(w); } }
    }

    function buildHybridInput(){ return { bridge:{length:bridge.length,width:bridge.width,deckElevation:deckElevation(),archRise:params.archRise,crownClearance:params.crownClearance,ribY:bridge.ribY}, material:{E:params.elasticity*1e9,nu:.2}, sections:{archArea:params.ribArea,columnArea:params.columnArea,deckThickness:params.deckThickness}, columns:{countPerRib:parseMesh().nx+1,compressionNegative:true}, mesh:parseMesh(), train:{axleLoad:params.axleLoad*1e3,axleOffsets:axleOffsets(),trackOffset:params.trackOffset,loadSpread:params.loadSpread}, positions:{count:121,headStart:-2,headEnd:118}, coordinates:{model:'x longitudinal, y transverse, z vertical',three:'V(x,y,z) = (x,z,-y)'} } }
    async function analyze(){
      const token=++state.token; state.playing=false; $('#play-button').textContent='播放'; setLoading(true,'正在分解上承式拱桥梁壳刚度矩阵','MITC4 桥面壳 / 主梁 · 主拱空间梁 · 拱上立柱空间梁柱 · 121 个车位'); await new Promise(r=>setTimeout(r,35));
      try{
        const solved=await solveHybridArchModel(buildHybridInput());
        if(!solved?.frames||solved.frames.length!==121)throw new Error('混合核心必须返回 121 个真实车位；未生成任何预演假数据。');
        if(token!==state.token)return; state.analysis=solved; $('#solver-chip').textContent='上承式拱桥梁壳有限元 · 已求解'; state.frame=Math.min(state.frame,state.analysis.frames.length-1); $('#position-slider').max=120; $('#position-slider').disabled=false; setLoading(false); state.playing=!matchMedia('(prefers-reduced-motion: reduce)').matches; $('#play-button').textContent=state.playing?'暂停':'播放'; updateFrame();
      }catch(error){ console.error(error); if(token!==state.token)return; state.analysis=null; state.playing=false; $('#position-slider').disabled=true; setLoading(true,'真实有限元求解未完成',`${error.message}　页面不会生成预演假数据。`); $('#solver-chip').textContent='等待真实梁壳混合核心'; drawChart(); }
    }
    let scheduleTimer=0; function scheduleAnalysis(rebuild=false){ clearTimeout(scheduleTimer); if(rebuild){ buildBridge(); buildTrain(); } scheduleTimer=setTimeout(analyze,80); }

    function colorRamp(value,min,max){ const t=THREE.MathUtils.clamp((value-min)/Math.max(1e-12,max-min),0,1); const stops=[[0,new THREE.Color(0x143c7d)],[.38,new THREE.Color(0x2ba8b1)],[.7,new THREE.Color(0xe0ca4f)],[1,new THREE.Color(0xcf503f)]]; for(let i=0;i<stops.length-1;i++) if(t<=stops[i+1][0]){ const u=(t-stops[i][0])/(stops[i+1][0]-stops[i][0]); return stops[i][1].clone().lerp(stops[i+1][1],u); } return stops.at(-1)[1].clone(); }
    function clearLoads(){ disposeGroup(loadGroup); }
    function updateLoads(frame){ clearLoads(); loadGroup.visible=$('#toggle-loads').checked; for(const x of frame.active||[]){ const arrow=new THREE.ArrowHelper(new THREE.Vector3(0,-1,0),V(x,params.trackOffset,deckElevation()+4.4),2.6,0xd65f44,.45,.25); loadGroup.add(arrow); } }
    const resultMeta={
      'deck-stress':{title:'相邻单元峰值的节点视觉平滑（非节点外推应力）',unit:'MPa',field:'deckStress',range:'deckStress'},
      'deck-displacement':{title:'桥面竖向位移',unit:'mm',field:'deckDisp',range:'deckDisp'},
      'arch-stress':{title:'主拱应力 |σ|',unit:'MPa',field:'archStress',range:'archStress',absolute:true},
      'column-force':{title:'拱上立柱轴压 |N|（原始压为负）',unit:'kN',field:'columnForces',range:'columnForces',absolute:true},
    };
    function updateFrame(){
      if(!state.analysis)return; const frame=state.analysis.frames[state.frame],meta=resultMeta[state.resultMode],range=state.analysis.ranges[meta.range]; trainGroup.position.x=frame.head; const pos=deckGeometry.getAttribute('position'),colors=deckGeometry.getAttribute('color');
      const deckZ=deckElevation();
      for(let i=0;i<deckNodes.length;i++){ const uz=frame.deckDisp?.[i]; pos.setY(i,deckZ+(Number.isFinite(uz)?uz*params.deformScale:0)); let c=neutralDeck; if(state.resultMode==='deck-stress'&&Number.isFinite(frame.deckStress?.[i])) c=colorRamp(frame.deckStress[i],range.min,range.max); else if(state.resultMode==='deck-displacement'&&Number.isFinite(uz)) c=colorRamp(uz*1000,range.min*1000,range.max*1000); colors.setXYZ(i,c.r,c.g,c.b); }
      pos.needsUpdate=true;colors.needsUpdate=true;deckGeometry.computeVertexNormals(); deckWire.visible=$('#toggle-mesh').checked;
      archSegments.forEach((item,i)=>{ const value=frame.archStress?.[i]; const r=state.analysis.ranges.archStress; item.mesh.material.color.copy(state.resultMode==='arch-stress'&&Number.isFinite(value)?colorRamp(Math.abs(value),0,Math.max(Math.abs(r.min),Math.abs(r.max))):neutralSteel); });
      columnMeshes.forEach((item,i)=>{ const value=frame.columnForces?.[i],r=state.analysis.ranges.columnForces,maxCompression=Math.max(Math.abs(r.min),Math.abs(r.max)); item.mesh.material.color.copy(state.resultMode==='column-force'&&Number.isFinite(value)?colorRamp(Math.abs(value),0,maxCompression):neutralColumn); item.mesh.visible=$('#toggle-columns').checked; const s=state.resultMode==='column-force'&&Number.isFinite(value)?THREE.MathUtils.mapLinear(Math.abs(value),0,maxCompression,.85,1.55):1; item.mesh.scale.set(s,1,s); });
      updateLoads(frame);
      $('#r-disp').textContent=Math.abs(frame.minimumDisp).toFixed(2);
      $('#r-deck').textContent=frame.deckRawPeak.toFixed(3);
      $('#r-arch').textContent=Math.abs(frame.archCompressionPeak).toFixed(0);
      $('#r-column').textContent=Math.abs(frame.columnCompressionPeak).toFixed(0);
      const loaded=(frame.active?.length||0)>0,transferPct=100*frame.transferRatio;
      $('#r-transfer').textContent=loaded?`${transferPct.toFixed(1)}%`:'—';
      $('#closure-bar').style.width=loaded?`${THREE.MathUtils.clamp(transferPct,0,100)}%`:'0%';
      $('#r-thrust').textContent=loaded&&Number.isFinite(frame.archHorizontalThrust)?Math.abs(frame.archHorizontalThrust).toFixed(0):'—';
      const balance=frame.balance;
      $('#balance-loaded').hidden=!loaded;
      $('#balance-empty').hidden=loaded;
      if(loaded&&balance){
        $('#r-force-balance').textContent=Number.isFinite(balance.forceRelativeResidual)?balance.forceRelativeResidual.toExponential(1):'—';
        $('#r-moment-balance').textContent=Number.isFinite(balance.momentRelativeResidual)?balance.momentRelativeResidual.toExponential(1):'—';
        $('#r-free-force-residual').textContent=Number.isFinite(balance.maximumFreeTranslationResidual)?(balance.maximumFreeTranslationResidual/1e3).toExponential(1):'—';
        $('#r-free-moment-residual').textContent=Number.isFinite(balance.maximumFreeRotationResidual)?(balance.maximumFreeRotationResidual/1e3).toExponential(1):'—';
      }
      $('#position-slider').value=state.frame;
      $('#position-readout').textContent=`车头 ${frame.head.toFixed(1)} m`;
      $('#legend-title').textContent=meta.title;$('#legend-unit').textContent=meta.unit; let min=range.min,max=range.max;if(meta.field==='deckDisp'){min*=1000;max*=1000;}if(meta.absolute){max=Math.max(Math.abs(min),Math.abs(max));min=0;} $('#legend-min').textContent=min.toFixed(meta.unit==='kN'?0:1);$('#legend-mid').textContent=((min+max)/2).toFixed(meta.unit==='kN'?0:1);$('#legend-max').textContent=max.toFixed(meta.unit==='kN'?0:1); drawChart();
    }

    const chart=$('#response-chart'); const chartMeta={deckDisp:{value:f=>Math.abs(f.minimumDisp),label:'桥面最大下挠',unit:'mm'},deckStress:{value:f=>f.deckRawPeak,label:'桥面壳原始单元 / 积分点峰值',unit:'MPa'},archCompression:{value:f=>Math.abs(f.archCompressionPeak),label:'主拱最大轴压',unit:'kN'},columnCompression:{value:f=>Math.abs(f.columnCompressionPeak),label:'拱上立柱最大轴压',unit:'kN'}};
    function drawChart(){ const rect=chart.getBoundingClientRect(),dpr=Math.min(devicePixelRatio,2); if(chart.width!==Math.round(rect.width*dpr)||chart.height!==Math.round(rect.height*dpr)){chart.width=Math.round(rect.width*dpr);chart.height=Math.round(rect.height*dpr);} const ctx=chart.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);const w=rect.width,h=rect.height,p={l:48,r:16,t:30,b:23};ctx.clearRect(0,0,w,h);if(!state.analysis){ctx.fillStyle='#647880';ctx.font='11px Microsoft YaHei';ctx.fillText('等待真实梁壳混合核心返回 121 个车位；不生成预演假数据。',p.l,p.t+24);return;}const meta=chartMeta[state.chartMode],values=state.analysis.frames.map(meta.value);let min=Math.min(...values),max=Math.max(...values);if(Math.abs(max-min)<1e-8){min-=1;max+=1;}const pad=(max-min)*.12;min-=pad;max+=pad;ctx.strokeStyle='rgba(23,44,52,.12)';ctx.lineWidth=1;for(let i=0;i<=3;i++){const y=p.t+(h-p.t-p.b)*i/3;ctx.beginPath();ctx.moveTo(p.l,y);ctx.lineTo(w-p.r,y);ctx.stroke();}ctx.fillStyle='#647880';ctx.font='9px Consolas';ctx.fillText(`${meta.label} / ${meta.unit}`,p.l,p.t-9);ctx.textAlign='right';ctx.fillText(max.toFixed(meta.unit==='kN'?0:1),p.l-7,p.t+3);ctx.fillText(min.toFixed(meta.unit==='kN'?0:1),p.l-7,h-p.b);ctx.textAlign='left';ctx.strokeStyle='#d65f44';ctx.lineWidth=2;ctx.beginPath();values.forEach((v,i)=>{const x=p.l+(w-p.l-p.r)*i/(values.length-1),y=p.t+(h-p.t-p.b)*(max-v)/(max-min);i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();const cx=p.l+(w-p.l-p.r)*state.frame/(values.length-1);ctx.strokeStyle='#172c34';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx,p.t);ctx.lineTo(cx,h-p.b);ctx.stroke();ctx.fillStyle='#172c34';ctx.beginPath();ctx.arc(cx,p.t+(h-p.t-p.b)*(max-values[state.frame])/(max-min),3,0,Math.PI*2);ctx.fill(); }

    function setView(name){ const mid=deckElevation()/2,fitDistance=Math.min(140,Math.max(74,36/(Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*Math.max(.55,camera.aspect)))),views={elevation:{p:V(32,-fitDistance,mid),t:V(32,0,mid)},perspective:{p:V(72,-48,mid+14),t:V(32,0,mid)},deck:{p:V(32,0,deckElevation()+52),t:V(32,0,deckElevation())},transfer:{p:V(36,-34,mid+2),t:V(32,0,mid)}}; const v=views[name];camera.position.copy(v.p);controls.target.copy(v.t);controls.update();state.view=name;$$('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===name)); }
    function formatParam(name,v){ const f={archRise:x=>`${(+x).toFixed(1)} m`,crownClearance:x=>`${(+x).toFixed(2)} m`,ribArea:x=>`${(+x).toFixed(2)} m²`,columnArea:x=>`${(+x).toFixed(2)} m²`,deckThickness:x=>`${(+x).toFixed(2)} m`,elasticity:x=>`${(+x).toFixed(1)} GPa`,axleLoad:x=>`${x} kN`,bogieSpacing:x=>`${(+x).toFixed(2)} m`,trackOffset:x=>`${(+x).toFixed(2)} m`,loadSpread:x=>`${(+x).toFixed(2)} m`,deformScale:x=>`${x}×`,playbackRate:x=>`${(+x).toFixed(2)}×`};return f[name]?f[name](v):v; }
    $$('[data-param]').forEach(input=>input.addEventListener('input',()=>{const name=input.dataset.param;params[name]=input.tagName==='SELECT'?input.value:+input.value;const out=$(`[data-output="${name}"]`);if(out)out.textContent=formatParam(name,input.value);if(name==='deformScale'||name==='playbackRate'){ if(name==='deformScale')updateFrame();return;}scheduleAnalysis(input.hasAttribute('data-rebuild'));}));
    $$('.panel-tabs button').forEach(button=>button.addEventListener('click',()=>{$$('.panel-tabs button').forEach(b=>b.classList.toggle('active',b===button));$$('.tab-page').forEach(p=>p.classList.toggle('active',p.dataset.page===button.dataset.tab));}));
    $$('[data-result]').forEach(button=>button.addEventListener('click',()=>{state.resultMode=button.dataset.result;$$('[data-result]').forEach(b=>b.classList.toggle('active',b===button));updateFrame();}));
    $$('[data-chart]').forEach(button=>button.addEventListener('click',()=>{state.chartMode=button.dataset.chart;$$('[data-chart]').forEach(b=>b.classList.toggle('active',b===button));drawChart();}));
    $$('[data-view]').forEach(button=>button.addEventListener('click',()=>setView(button.dataset.view)));
    $('#play-button').addEventListener('click',()=>{if(!state.analysis)return;state.playing=!state.playing;$('#play-button').textContent=state.playing?'暂停':'播放';});
    $('#step-back').addEventListener('click',()=>{if(!state.analysis)return;state.playing=false;state.frame=(state.frame-1+state.analysis.frames.length)%state.analysis.frames.length;$('#play-button').textContent='播放';updateFrame();});
    $('#step-forward').addEventListener('click',()=>{if(!state.analysis)return;state.playing=false;state.frame=(state.frame+1)%state.analysis.frames.length;$('#play-button').textContent='播放';updateFrame();});
    $('#position-slider').addEventListener('input',e=>{if(!state.analysis)return;state.playing=false;state.frame=+e.target.value;$('#play-button').textContent='播放';updateFrame();});
    $('#toggle-mesh').addEventListener('change',updateFrame);$('#toggle-loads').addEventListener('change',updateFrame);$('#toggle-columns').addEventListener('change',updateFrame);
    $('#reset-params').addEventListener('click',()=>{Object.assign(params,DEFAULTS);$$('[data-param]').forEach(input=>{input.value=DEFAULTS[input.dataset.param];const out=$(`[data-output="${input.dataset.param}"]`);if(out)out.textContent=formatParam(input.dataset.param,input.value);});buildBridge();buildTrain();analyze();});
    $('.panel-head').addEventListener('click',e=>{if(innerWidth<=760&&!e.target.closest('button'))$('#control-panel').classList.toggle('open');});

    function resize(){ const host=$('#scene-wrap'),r=host.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/Math.max(1,r.height);camera.updateProjectionMatrix();drawChart(); }
    addEventListener('resize',resize); new ResizeObserver(resize).observe($('#scene-wrap'));
    function loop(now){ requestAnimationFrame(loop);const dt=Math.min(.08,(now-state.lastTick)/1000);state.lastTick=now;if(state.playing&&state.analysis){state.accumulator+=dt*16*params.playbackRate;if(state.accumulator>=1){state.frame=(state.frame+Math.floor(state.accumulator))%state.analysis.frames.length;state.accumulator%=1;updateFrame();}}controls.update();renderer.render(scene,camera);}

    window.archBridgeLab={params,state,bridge,buildHybridInput,analyze,solveCase:solveHybridArchModel,getFrame:()=>state.analysis?.frames[state.frame],coreStatus:()=>HYBRID_FRAME_CORE_STATUS};
    buildBridge();buildTrain();resize();setView('elevation');analyze();requestAnimationFrame(loop);
