
    import * as THREE from '../../interactive/vendor/three.module.js';
    import { OrbitControls } from '../../interactive/vendor/controls/OrbitControls.js';

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


    const DEFAULTS = Object.freeze({
      thickness: 0.35,
      elasticity: 34.5,
      mesh: '18x6',
      axleLoad: 160,
      bogieSpacing: 2.5,
      trackOffset: 0,
      loadSpread: 0.55,
      deformScale: 100,
      playbackRate: 1,
    });

    const params = { ...DEFAULTS };
    const bridge = { length: 42, width: 10, poisson: 0.2, railGauge: 1.5 };
    const state = {
      analysis: null,
      frame: 0,
      playing: !matchMedia('(prefers-reduced-motion: reduce)').matches,
      resultMode: 'stress',
      chartMode: 'midspan',
      analysisToken: 0,
      lastTick: performance.now(),
      frameAccumulator: 0,
      activeView: 'perspective',
    };

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => [...document.querySelectorAll(selector)];
    const loading = $('#loading');
    const toast = $('#toast');
    let toastTimer = 0;

    function showToast(message) {
      clearTimeout(toastTimer);
      toast.textContent = message;
      toast.classList.add('show');
      toastTimer = setTimeout(() => toast.classList.remove('show'), 3400);
    }

    function setLoading(show, title = '正在计算', detail = '') {
      $('#loading-title').textContent = title;
      if (detail) $('#loading-detail').textContent = detail;
      loading.classList.toggle('hidden', !show);
    }

    function parseMesh(mesh) {
      const [nx, ny] = mesh.split('x').map(Number);
      return { nx, ny };
    }

    function createPlateModel() {
      const { nx, ny } = parseMesh(params.mesh);
      const nodes = [];
      const elements = [];
      const nodeId = (i, j) => j * (nx + 1) + i;
      for (let j = 0; j <= ny; j++) {
        for (let i = 0; i <= nx; i++) {
          nodes.push({
            id: nodeId(i, j),
            x: bridge.length * i / nx,
            y: -bridge.width / 2 + bridge.width * j / ny,
            z: 0,
          });
        }
      }
      for (let j = 0; j < ny; j++) {
        for (let i = 0; i < nx; i++) {
          elements.push({
            id: elements.length,
            type: 'shell4',
            group: 'deck',
            cell: { i, j },
            nodes: [nodeId(i, j), nodeId(i + 1, j), nodeId(i + 1, j + 1), nodeId(i, j + 1)],
          });
        }
      }
      const spanDivisions = nx / 3;
      const supports = nodes.map((node) => {
        const i = node.id % (nx + 1);
        return {
          node: node.id,
          ux: true,
          uy: true,
          uz: i % spanDivisions === 0,
          rz: true,
        };
      });
      return {
        nodes, elements, supports, nx, ny, nodeId,
        properties: {
          deck: {
            E: params.elasticity * 1e9,
            nu: bridge.poisson,
            t: params.thickness,
            drillFactor: 1e-3,
          },
        },
      };
    }

    function axleOffsets() {
      const offsets = [];
      const carPitch = 17.5;
      for (let car = 0; car < 3; car++) {
        const base = 2.0 + car * carPitch;
        offsets.push(base, base + params.bogieSpacing, base + 12.4, base + 12.4 + params.bogieSpacing);
      }
      return offsets;
    }

    function addPointLoadRegular(F, model, x, y, loadZ) {
      if (x < -1e-9 || x > bridge.length + 1e-9 || y < -bridge.width / 2 || y > bridge.width / 2) return false;
      const dx = bridge.length / model.nx;
      const dy = bridge.width / model.ny;
      const i = Math.min(model.nx - 1, Math.max(0, Math.floor(Math.min(x, bridge.length - 1e-10) / dx)));
      const j = Math.min(model.ny - 1, Math.max(0, Math.floor(Math.min(y + bridge.width / 2, bridge.width - 1e-10) / dy)));
      const x0 = i * dx;
      const y0 = -bridge.width / 2 + j * dy;
      const xi = 2 * (x - x0) / dx - 1;
      const eta = 2 * (y - y0) / dy - 1;
      const shape = q4Shape(xi, eta).N;
      const ids = [model.nodeId(i, j), model.nodeId(i + 1, j), model.nodeId(i + 1, j + 1), model.nodeId(i, j + 1)];
      for (let n = 0; n < 4; n++) F[DOF_PER_NODE * ids[n] + 2] += shape[n] * loadZ;
      return true;
    }

    function addWheelPatch(F, model, x, y, force) {
      if (x < 0 || x > bridge.length) return;
      const s = params.loadSpread;
      const halfX = Math.max(0, Math.min(0.5 * s, x, bridge.length - x));
      const halfY = Math.max(0, Math.min(0.35 * s, y + bridge.width / 2, bridge.width / 2 - y));
      const longitudinal = [[-1, .25], [0, .5], [1, .25]];
      const transverse = [[-1, .25], [0, .5], [1, .25]];
      const samples = [];
      let weightSum = 0;
      for (const [lx, wx] of longitudinal) {
        for (const [ly, wy] of transverse) {
          const sx = x + lx * halfX;
          const sy = y + ly * halfY;
          const weight = wx * wy;
          samples.push({ x: sx, y: sy, weight });
          weightSum += weight;
        }
      }
      for (const sample of samples) addPointLoadRegular(F, model, sample.x, sample.y, force * sample.weight / weightSum);
    }

    function buildFrameLoad(model, head) {
      const F = vecZeros(model.nodes.length * DOF_PER_NODE);
      const activeAxles = [];
      const railYs = [params.trackOffset - bridge.railGauge / 2, params.trackOffset + bridge.railGauge / 2];
      for (const offset of axleOffsets()) {
        const x = head - offset;
        if (x < 0 || x > bridge.length) continue;
        activeAxles.push(x);
        for (const y of railYs) addWheelPatch(F, model, x, y, -params.axleLoad * 1000 / 2);
      }
      return { F, activeAxles, railYs };
    }

    function recoverFrame(assembled, U) {
      const nodeStress = new Float64Array(assembled.ndof / DOF_PER_NODE);
      const nodeWeight = new Uint16Array(nodeStress.length);
      let maxStress = 0;
      let maxDisp = 0;
      for (let node = 0; node < nodeStress.length; node++) {
        maxDisp = Math.max(maxDisp, Math.abs(U[DOF_PER_NODE * node + 2]));
      }
      for (const data of assembled.elementData) {
        const response = shell4ResponseFromElement(data, data.material, elementDisplacements(U, data.dofs));
        maxStress = Math.max(maxStress, response.maxVonMises);
        for (const node of data.indices) {
          nodeStress[node] += response.maxVonMises;
          nodeWeight[node]++;
        }
      }
      for (let i = 0; i < nodeStress.length; i++) nodeStress[i] /= Math.max(nodeWeight[i], 1);
      return { nodeStress, maxStress, maxDisp };
    }

    async function analyze() {
      const token = ++state.analysisToken;
      state.playing = false;
      syncPlayButton();
      setLoading(true, '正在组装板壳刚度矩阵', `${params.mesh} 单元网格 · 预计算移动轴列全部车位`);
      await new Promise((resolve) => requestAnimationFrame(resolve));
      try {
        const model = createPlateModel();
        const assembled = assembleShellModel(model);
        const factor = factorConstrainedSystem(assembled.K, constrainedDofs(model.supports));
        const offsets = axleOffsets();
        const headMin = -4;
        const headMax = bridge.length + Math.max(...offsets) + 4;
        const frameCount = 101;
        const frames = [];
        let stressMax = 0;
        let dispMax = 0;
        const midI = Math.round(model.nx / 2);
        const midJ = Math.max(0, Math.min(model.ny, Math.round((params.trackOffset + bridge.width / 2) / bridge.width * model.ny)));
        const midNode = model.nodeId(midI, midJ);

        for (let frame = 0; frame < frameCount; frame++) {
          if (token !== state.analysisToken) return;
          const ratio = frame / (frameCount - 1);
          const head = headMin + ratio * (headMax - headMin);
          const load = buildFrameLoad(model, head);
          const U = solveFactoredSystem(factor, load.F);
          const recovered = recoverFrame(assembled, U);
          stressMax = Math.max(stressMax, recovered.maxStress);
          dispMax = Math.max(dispMax, recovered.maxDisp);
          frames.push({
            head,
            U,
            F: load.F,
            activeAxles: load.activeAxles,
            railYs: load.railYs,
            nodeStress: recovered.nodeStress,
            maxStress: recovered.maxStress,
            maxDisp: recovered.maxDisp,
            midspan: U[DOF_PER_NODE * midNode + 2],
          });
          if (frame > 0 && frame % 20 === 0) {
            $('#loading-detail').textContent = `已求解 ${frame} / ${frameCount - 1} 个车位 · 色标将在全时程内固定`;
            await new Promise((resolve) => requestAnimationFrame(resolve));
          }
        }
        if (token !== state.analysisToken) return;
        state.analysis = { model, assembled, factor, frames, stressMax, dispMax, headMin, headMax };
        state.frame = Math.min(state.frame, frameCount - 1);
        rebuildBridgeScene(model);
        updateFrame(state.frame);
        loading.classList.add('hidden');
        state.playing = !matchMedia('(prefers-reduced-motion: reduce)').matches;
        syncPlayButton();
        $('#model-status').textContent = `准静态 · MITC4 平壳 · ${model.elements.length} 单元 · 非车桥耦合`;
      } catch (error) {
        console.error(error);
        setLoading(true, '计算未完成', error.message);
        $('#model-status').textContent = '模型错误 · 请查看控制台';
      }
    }

    const sceneHost = $('#scene');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbacacc);
    scene.fog = new THREE.Fog(0xbacacc, 72, 150);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 260);
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    sceneHost.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = .065;
    controls.maxPolarAngle = Math.PI * .49;
    controls.minDistance = 18;
    controls.maxDistance = 120;

    scene.add(new THREE.HemisphereLight(0xeaf5f4, 0x4d5d52, 1.5));
    const sun = new THREE.DirectionalLight(0xfff6df, 2.2);
    sun.position.set(18, 42, 28);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -55;
    sun.shadow.camera.right = 55;
    sun.shadow.camera.top = 35;
    sun.shadow.camera.bottom = -35;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x93b8c8, .75);
    fill.position.set(-25, 15, -25);
    scene.add(fill);

    const bridgeGroup = new THREE.Group();
    const infrastructureGroup = new THREE.Group();
    const trainGroup = new THREE.Group();
    const loadGroup = new THREE.Group();
    scene.add(infrastructureGroup, bridgeGroup, trainGroup, loadGroup);
    let deckGeometry = null;
    let deckMesh = null;
    let wireMesh = null;
    let originalMesh = null;
    let railGroup = null;

    function clearGroup(group) {
      while (group.children.length) {
        const child = group.children.pop();
        child.traverse((object) => {
          object.geometry?.dispose?.();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose?.());
          else object.material?.dispose?.();
        });
      }
    }

    function addLandscape() {
      const river = new THREE.Mesh(
        new THREE.PlaneGeometry(180, 100),
        new THREE.MeshStandardMaterial({ color: 0x496f78, roughness: .28, metalness: .12 }),
      );
      river.rotation.x = -Math.PI / 2;
      river.position.set(bridge.length / 2, -5.2, 0);
      river.receiveShadow = true;
      infrastructureGroup.add(river);

      const grid = new THREE.GridHelper(130, 26, 0x71898a, 0x809393);
      grid.position.set(bridge.length / 2, -5.12, 0);
      grid.material.opacity = .18;
      grid.material.transparent = true;
      infrastructureGroup.add(grid);

      const bankMat = new THREE.MeshStandardMaterial({ color: 0x778175, roughness: .96 });
      for (const x of [-18, bridge.length + 18]) {
        const bank = new THREE.Mesh(new THREE.BoxGeometry(35, 9, 90), bankMat);
        bank.position.set(x, -3.6, 0);
        bank.receiveShadow = true;
        infrastructureGroup.add(bank);
      }
      const supportMat = new THREE.MeshStandardMaterial({ color: 0xb5b3a8, roughness: .82 });
      for (const x of [0, bridge.length / 3, 2 * bridge.length / 3, bridge.length]) {
        const pier = new THREE.Mesh(new THREE.BoxGeometry(2.6, 8, bridge.width + 2), supportMat);
        pier.position.set(x, -3.8, 0);
        pier.castShadow = pier.receiveShadow = true;
        infrastructureGroup.add(pier);
        const bearing = new THREE.Mesh(new THREE.BoxGeometry(3.4, .35, bridge.width + 1), new THREE.MeshStandardMaterial({ color: 0x3e484a, roughness: .55 }));
        bearing.position.set(x, .02, 0);
        infrastructureGroup.add(bearing);
      }
    }

    addLandscape();

    function buildTrain() {
      clearGroup(trainGroup);
      const bodyGeo = new THREE.CapsuleGeometry(1.35, 13.8, 5, 14);
      bodyGeo.rotateZ(Math.PI / 2);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0xe8ece9, roughness: .33, metalness: .18 });
      const glassMat = new THREE.MeshStandardMaterial({ color: 0x263a44, roughness: .22, metalness: .35 });
      const stripeMat = new THREE.MeshStandardMaterial({ color: 0x315f79, roughness: .4, metalness: .1 });
      const wheelGeo = new THREE.CylinderGeometry(.36, .36, .24, 16);
      wheelGeo.rotateX(Math.PI / 2);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x22292b, roughness: .7, metalness: .55 });
      for (let car = 0; car < 3; car++) {
        const carGroup = new THREE.Group();
        const center = -(car * 17.5 + 9.45);
        carGroup.position.x = center;
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.scale.set(1, 1, 1.05);
        body.castShadow = true;
        carGroup.add(body);
        for (const side of [-1, 1]) {
          const windows = new THREE.Mesh(new THREE.BoxGeometry(10.4, .55, .05), glassMat);
          windows.position.set(0, .25, side * 1.37);
          carGroup.add(windows);
          const stripe = new THREE.Mesh(new THREE.BoxGeometry(14.4, .11, .06), stripeMat);
          stripe.position.set(0, -.52, side * 1.38);
          carGroup.add(stripe);
        }
        for (const wx of [-7.45, -4.95, 4.95, 7.45]) {
          for (const wz of [-1.15, 1.15]) {
            const wheel = new THREE.Mesh(wheelGeo, wheelMat);
            wheel.position.set(wx, -1.15, wz);
            wheel.castShadow = true;
            carGroup.add(wheel);
          }
        }
        trainGroup.add(carGroup);
      }
      trainGroup.position.y = 1.82;
    }

    function elementIndices(model) {
      const indices = [];
      for (const element of model.elements) {
        const [a, b, c, d] = element.nodes;
        indices.push(a, b, c, a, c, d);
      }
      return indices;
    }

    function rebuildBridgeScene(model) {
      clearGroup(bridgeGroup);
      const positions = new Float32Array(model.nodes.length * 3);
      const colors = new Float32Array(model.nodes.length * 3);
      deckGeometry = new THREE.BufferGeometry();
      deckGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      deckGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      deckGeometry.setIndex(elementIndices(model));
      deckGeometry.computeVertexNormals();
      deckMesh = new THREE.Mesh(deckGeometry, new THREE.MeshStandardMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
        roughness: .62,
        metalness: .04,
      }));
      deckMesh.castShadow = deckMesh.receiveShadow = true;
      bridgeGroup.add(deckMesh);

      wireMesh = new THREE.Mesh(deckGeometry, new THREE.MeshBasicMaterial({
        color: 0x172329,
        wireframe: true,
        transparent: true,
        opacity: .26,
        depthWrite: false,
      }));
      wireMesh.renderOrder = 2;
      bridgeGroup.add(wireMesh);

      const originalGeometry = deckGeometry.clone();
      const originalPositions = originalGeometry.getAttribute('position');
      model.nodes.forEach((node, i) => originalPositions.setXYZ(i, node.x, .24, -node.y));
      originalPositions.needsUpdate = true;
      originalMesh = new THREE.Mesh(originalGeometry, new THREE.MeshBasicMaterial({
        color: 0xf1f3ef,
        wireframe: true,
        transparent: true,
        opacity: .42,
      }));
      bridgeGroup.add(originalMesh);

      railGroup = new THREE.Group();
      const railGeo = new THREE.BoxGeometry(bridge.length + 1, .12, .10);
      const railMat = new THREE.MeshStandardMaterial({ color: 0x313b3f, roughness: .34, metalness: .72 });
      for (const y of [-bridge.railGauge / 2, bridge.railGauge / 2]) {
        const rail = new THREE.Mesh(railGeo, railMat);
        rail.position.set(bridge.length / 2, .43, -y);
        rail.castShadow = true;
        railGroup.add(rail);
      }
      const sleeperGeo = new THREE.BoxGeometry(.18, .09, 2.45);
      const sleeperMat = new THREE.MeshStandardMaterial({ color: 0x59615f, roughness: .76 });
      for (let x = .4; x < bridge.length; x += 1.2) {
        const sleeper = new THREE.Mesh(sleeperGeo, sleeperMat);
        sleeper.position.set(x, .35, 0);
        sleeper.castShadow = true;
        railGroup.add(sleeper);
      }
      bridgeGroup.add(railGroup);
      setView(state.activeView, false);
    }

    const colorStops = [
      [0, new THREE.Color('#143b82')],
      [.38, new THREE.Color('#20aeb5')],
      [.7, new THREE.Color('#e0d550')],
      [1, new THREE.Color('#d74e42')],
    ];

    function resultColor(ratio, target = new THREE.Color()) {
      const r = Math.max(0, Math.min(1, ratio));
      for (let i = 0; i < colorStops.length - 1; i++) {
        const [aT, aC] = colorStops[i];
        const [bT, bC] = colorStops[i + 1];
        if (r <= bT) return target.copy(aC).lerp(bC, (r - aT) / (bT - aT));
      }
      return target.copy(colorStops.at(-1)[1]);
    }

    function updateLoads(frame) {
      clearGroup(loadGroup);
      loadGroup.visible = $('#toggle-loads').checked;
      const material = new THREE.MeshBasicMaterial({ color: 0xdf9a2f });
      for (const x of frame.activeAxles) {
        for (const y of frame.railYs) {
          const arrow = new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(x, 3.2, -y), 2.35, 0xdf9a2f, .35, .2);
          loadGroup.add(arrow);
          const dot = new THREE.Mesh(new THREE.SphereGeometry(.11, 10, 8), material);
          dot.position.set(x, .55, -y);
          loadGroup.add(dot);
        }
      }
    }

    function updateFrame(index) {
      const analysis = state.analysis;
      if (!analysis || !deckGeometry) return;
      state.frame = Math.max(0, Math.min(analysis.frames.length - 1, Math.round(index)));
      const frame = analysis.frames[state.frame];
      const position = deckGeometry.getAttribute('position');
      const color = deckGeometry.getAttribute('color');
      const tmpColor = new THREE.Color();
      const scale = params.deformScale;
      analysis.model.nodes.forEach((node, i) => {
        const base = DOF_PER_NODE * i;
        const ux = frame.U[base];
        const uy = frame.U[base + 1];
        const uz = frame.U[base + 2];
        position.setXYZ(i, node.x + ux * scale, .24 + uz * scale, -(node.y + uy * scale));
        const ratio = state.resultMode === 'stress'
          ? frame.nodeStress[i] / Math.max(analysis.stressMax, 1)
          : Math.abs(uz) / Math.max(analysis.dispMax, 1e-15);
        resultColor(ratio, tmpColor);
        color.setXYZ(i, tmpColor.r, tmpColor.g, tmpColor.b);
      });
      position.needsUpdate = true;
      color.needsUpdate = true;
      deckGeometry.computeVertexNormals();
      trainGroup.position.x = frame.head;
      trainGroup.position.z = -params.trackOffset;
      if (railGroup) railGroup.position.z = -params.trackOffset;
      updateLoads(frame);
      wireMesh.visible = $('#toggle-mesh').checked;
      originalMesh.visible = $('#toggle-original').checked;

      $('#metric-disp').textContent = (frame.maxDisp * 1000).toFixed(2);
      $('#metric-stress').textContent = (frame.maxStress / 1e6).toFixed(2);
      $('#metric-axles').textContent = frame.activeAxles.length;
      $('#position-slider').value = state.frame;
      $('#position-slider').max = analysis.frames.length - 1;
      $('#position-readout').textContent = `车头 ${frame.head.toFixed(1)} m`;
      if (state.resultMode === 'stress') {
        $('#legend-title').textContent = '表面 von Mises（单元峰值·节点平滑）';
        $('#legend-max').textContent = `${(analysis.stressMax / 1e6).toFixed(2)} MPa`;
      } else {
        $('#legend-title').textContent = '竖向位移绝对值';
        $('#legend-max').textContent = `${(analysis.dispMax * 1000).toFixed(2)} mm`;
      }
      drawChart();
    }

    function setView(view, animate = true) {
      state.activeView = view;
      $$('.viewbar button').forEach((button) => button.classList.toggle('active', button.dataset.view === view));
      const target = new THREE.Vector3(bridge.length / 2, -1.0, 0);
      const positions = {
        perspective: new THREE.Vector3(54, 26, 27),
        side: new THREE.Vector3(bridge.length / 2, 10, 46),
        top: new THREE.Vector3(bridge.length / 2, 52, .01),
      };
      const destination = positions[view] || positions.perspective;
      if (!animate) {
        camera.position.copy(destination);
        controls.target.copy(target);
        controls.update();
        return;
      }
      const start = camera.position.clone();
      const startTarget = controls.target.clone();
      const startTime = performance.now();
      const duration = 420;
      function tween(now) {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = 1 - (1 - t) ** 3;
        camera.position.lerpVectors(start, destination, eased);
        controls.target.lerpVectors(startTarget, target, eased);
        if (t < 1) requestAnimationFrame(tween);
      }
      requestAnimationFrame(tween);
    }

    const chart = $('#response-chart');
    const chartCtx = chart.getContext('2d');

    function drawChart() {
      const analysis = state.analysis;
      if (!analysis) return;
      const rect = chart.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio, 2);
      chart.width = Math.max(1, Math.round(rect.width * dpr));
      chart.height = Math.max(1, Math.round(rect.height * dpr));
      chartCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = rect.width;
      const h = rect.height;
      const pad = { left: 48, right: 18, top: 27, bottom: 24 };
      chartCtx.clearRect(0, 0, w, h);
      const series = analysis.frames.map((frame) => state.chartMode === 'midspan' ? frame.midspan * 1000 : frame.maxStress / 1e6);
      let min = Math.min(0, ...series);
      let max = Math.max(0, ...series);
      if (Math.abs(max - min) < 1e-12) { min -= 1; max += 1; }
      const range = max - min;
      min -= range * .08;
      max += range * .08;
      const xOf = (i) => pad.left + i / (series.length - 1) * (w - pad.left - pad.right);
      const yOf = (value) => pad.top + (max - value) / (max - min) * (h - pad.top - pad.bottom);

      chartCtx.strokeStyle = 'rgba(24,33,38,.11)';
      chartCtx.lineWidth = 1;
      chartCtx.font = '10px Consolas, monospace';
      chartCtx.fillStyle = '#607079';
      for (let i = 0; i <= 4; i++) {
        const y = pad.top + i / 4 * (h - pad.top - pad.bottom);
        chartCtx.beginPath(); chartCtx.moveTo(pad.left, y); chartCtx.lineTo(w - pad.right, y); chartCtx.stroke();
        const value = max - i / 4 * (max - min);
        chartCtx.fillText(value.toFixed(state.chartMode === 'midspan' ? 2 : 1), 4, y + 3);
      }
      chartCtx.beginPath();
      series.forEach((value, i) => i ? chartCtx.lineTo(xOf(i), yOf(value)) : chartCtx.moveTo(xOf(i), yOf(value)));
      chartCtx.strokeStyle = '#31596a';
      chartCtx.lineWidth = 1.8;
      chartCtx.stroke();

      const cursorX = xOf(state.frame);
      chartCtx.beginPath(); chartCtx.moveTo(cursorX, pad.top); chartCtx.lineTo(cursorX, h - pad.bottom);
      chartCtx.strokeStyle = '#df9a2f'; chartCtx.lineWidth = 1.5; chartCtx.stroke();
      chartCtx.beginPath(); chartCtx.arc(cursorX, yOf(series[state.frame]), 3.5, 0, Math.PI * 2);
      chartCtx.fillStyle = '#df9a2f'; chartCtx.fill();
      chartCtx.fillStyle = '#607079';
      chartCtx.fillText(state.chartMode === 'midspan' ? 'mm' : 'MPa', 5, 15);
      chartCtx.textAlign = 'center';
      chartCtx.fillText(`车头位置 ${analysis.frames[state.frame].head.toFixed(1)} m`, cursorX, h - 5);
      chartCtx.textAlign = 'left';
    }

    function syncPlayButton() {
      $('#play-button').textContent = state.playing ? '暂停' : '播放';
    }

    function scheduleAnalysis() {
      const token = ++state.analysisToken;
      clearTimeout(scheduleAnalysis.timer);
      scheduleAnalysis.timer = setTimeout(() => {
        if (token === state.analysisToken) analyze();
      }, 180);
    }

    function formatParam(key, value) {
      const units = {
        thickness: `${Number(value).toFixed(2)} m`,
        elasticity: `${Number(value).toFixed(1)} GPa`,
        axleLoad: `${Number(value).toFixed(0)} kN`,
        bogieSpacing: `${Number(value).toFixed(2)} m`,
        trackOffset: `${Number(value).toFixed(2)} m`,
        loadSpread: `${Number(value).toFixed(2)} m`,
        deformScale: `${Number(value).toFixed(0)}×`,
        playbackRate: `${Number(value).toFixed(2).replace(/0$/, '')}×`,
      };
      return units[key] ?? value;
    }

    function syncParameterUI() {
      $$('[data-param]').forEach((input) => {
        input.value = params[input.dataset.param];
        const output = document.querySelector(`[data-output="${input.dataset.param}"]`);
        if (output) output.textContent = formatParam(input.dataset.param, input.value);
      });
    }

    $$('[data-param]').forEach((input) => {
      const eventName = input.tagName === 'SELECT' ? 'change' : 'input';
      input.addEventListener(eventName, () => {
        const key = input.dataset.param;
        params[key] = input.tagName === 'SELECT' ? input.value : Number(input.value);
        const output = document.querySelector(`[data-output="${key}"]`);
        if (output) output.textContent = formatParam(key, input.value);
        if (input.hasAttribute('data-analysis')) scheduleAnalysis();
        else updateFrame(state.frame);
      });
    });

    $$('.panel-tabs button').forEach((button) => button.addEventListener('click', () => {
      $$('.panel-tabs button').forEach((item) => item.classList.toggle('active', item === button));
      $$('.tab-page').forEach((page) => page.classList.toggle('active', page.dataset.page === button.dataset.tab));
    }));
    $$('.viewbar button').forEach((button) => button.addEventListener('click', () => setView(button.dataset.view)));
    $$('[data-result]').forEach((button) => button.addEventListener('click', () => {
      state.resultMode = button.dataset.result;
      $$('[data-result]').forEach((item) => item.classList.toggle('active', item === button));
      updateFrame(state.frame);
    }));
    $$('[data-chart]').forEach((button) => button.addEventListener('click', () => {
      state.chartMode = button.dataset.chart;
      $$('[data-chart]').forEach((item) => item.classList.toggle('active', item === button));
      drawChart();
    }));
    $('#toggle-mesh').addEventListener('change', () => updateFrame(state.frame));
    $('#toggle-loads').addEventListener('change', () => updateFrame(state.frame));
    $('#toggle-original').addEventListener('change', () => updateFrame(state.frame));
    $('#position-slider').addEventListener('input', (event) => { state.playing = false; syncPlayButton(); updateFrame(Number(event.target.value)); });
    $('#play-button').addEventListener('click', () => { state.playing = !state.playing; syncPlayButton(); });
    $('#step-back').addEventListener('click', () => { state.playing = false; syncPlayButton(); updateFrame(state.frame - 1); });
    $('#step-forward').addEventListener('click', () => { state.playing = false; syncPlayButton(); updateFrame(state.frame + 1); });
    $('#reset-params').addEventListener('click', () => {
      Object.assign(params, DEFAULTS);
      syncParameterUI();
      showToast('已恢复推荐参数，正在重新计算');
      analyze();
    });
    $('#mobile-panel-handle').addEventListener('click', (event) => {
      if (innerWidth <= 760 && !event.target.closest('button')) $('#control-panel').classList.toggle('open');
    });

    function resize() {
      const rect = sceneHost.getBoundingClientRect();
      renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false);
      camera.aspect = Math.max(1, rect.width) / Math.max(1, rect.height);
      camera.updateProjectionMatrix();
      drawChart();
    }
    addEventListener('resize', resize);

    function animationLoop(now) {
      requestAnimationFrame(animationLoop);
      controls.update();
      if (state.playing && state.analysis) {
        const delta = Math.min(.08, (now - state.lastTick) / 1000);
        state.frameAccumulator += delta * 16 * params.playbackRate;
        if (state.frameAccumulator >= 1) {
          const advance = Math.floor(state.frameAccumulator);
          state.frameAccumulator -= advance;
          updateFrame((state.frame + advance) % state.analysis.frames.length);
        }
      }
      state.lastTick = now;
      renderer.render(scene, camera);
    }

    window.bridgeLab = {
      get params() { return { ...params }; },
      get frame() { return state.frame; },
      get analysis() { return state.analysis; },
      play() { state.playing = true; syncPlayButton(); },
      pause() { state.playing = false; syncPlayButton(); },
      setFrame(value) { updateFrame(value); },
      analyze,
      setView,
    };

    syncParameterUI();
    buildTrain();
    resize();
    setView('perspective', false);
    requestAnimationFrame(animationLoop);
    analyze();
