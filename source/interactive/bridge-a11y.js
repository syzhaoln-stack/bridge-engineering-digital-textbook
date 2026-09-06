(function () {
  "use strict";

  const style = document.createElement("style");
  style.textContent = `
    input[type="range"], select, button { min-height: 44px; }
    canvas:focus-visible { outline: 3px solid rgba(20,108,148,.34); outline-offset: -3px; }
  `;
  document.head.appendChild(style);

  function textWithoutControl(label) {
    const copy = label.cloneNode(true);
    copy.querySelectorAll("input,select,button,output").forEach(node => node.remove());
    return copy.textContent.replace(/\s+/g, " ").trim();
  }

  document.querySelectorAll("input,select").forEach((control, index) => {
    if (!control.id) control.id = `bridge-control-${index + 1}`;
    let label = document.querySelector(`label[for="${CSS.escape(control.id)}"]`) || control.closest("label");
    if (!label) label = control.closest(".control,.row,.field")?.querySelector("label");
    if (!control.hasAttribute("aria-label") && !control.hasAttribute("aria-labelledby")) {
      const name = label ? textWithoutControl(label) : control.name || control.id;
      if (name) control.setAttribute("aria-label", name);
    }
  });

  const toggleGroups = document.querySelectorAll("[role=tablist],.modebar,.type-grid,.view-targets,.tabs");
  const updateToggleState = group => {
    group.querySelectorAll("button").forEach(button => {
      const selected = button.getAttribute("aria-selected") === "true" || button.classList.contains("active");
      const attribute = button.getAttribute("role") === "tab" ? "aria-selected" : "aria-pressed";
      const value = String(selected);
      if (button.getAttribute(attribute) !== value) button.setAttribute(attribute, value);
    });
  };
  toggleGroups.forEach(group => {
    updateToggleState(group);
    new MutationObserver(() => updateToggleState(group)).observe(group, { subtree: true, attributes: true, attributeFilter: ["class", "aria-selected"] });
  });

  document.querySelectorAll("canvas").forEach(canvas => {
    if (!canvas.hasAttribute("tabindex")) canvas.tabIndex = 0;
    if (!canvas.hasAttribute("role")) canvas.setAttribute("role", "img");
    if (!canvas.hasAttribute("aria-label")) {
      const heading = canvas.closest("section,article,main")?.querySelector("h1,h2,h3")?.textContent.trim();
      canvas.setAttribute("aria-label", heading ? `${heading}三维视图；鼠标或触摸拖动，滚轮缩放` : "桥梁三维视图；鼠标或触摸拖动，滚轮缩放");
    }
    canvas.addEventListener("keydown", event => {
      if (event.key === "Home") {
        const reset = document.querySelector("#reset,#view,[data-view=perspective],[data-view=elevation]");
        if (reset) { event.preventDefault(); reset.click(); }
      }
      if (["+", "=", "-", "_"].includes(event.key)) {
        event.preventDefault();
        canvas.dispatchEvent(new WheelEvent("wheel", { deltaY: ["+", "="].includes(event.key) ? -120 : 120, bubbles: true }));
      }
    });
  });
})();
