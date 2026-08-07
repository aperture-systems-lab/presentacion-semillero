const pestanas = [...document.querySelectorAll('[role="tab"]')];

const aClave = (pestana) => pestana.id.replace(/^tab-/, "");

function activar(id, conHash = true) {
  for (const pestana of pestanas) {
    const suya = pestana.id === id;
    const vista = document.getElementById(pestana.getAttribute("aria-controls"));

    pestana.setAttribute("aria-selected", String(suya));
    pestana.tabIndex = suya ? 0 : -1;
    vista.hidden = !suya;

    if (suya && conHash) history.replaceState(null, "", `#${aClave(pestana)}`);
  }
}

for (const pestana of pestanas) {
  pestana.addEventListener("click", () => activar(pestana.id));

  pestana.addEventListener("keydown", (ev) => {
    const salto = { ArrowRight: 1, ArrowLeft: -1 }[ev.key];
    if (!salto) return;

    ev.preventDefault();
    const i = pestanas.indexOf(pestana);
    const destino = pestanas[(i + salto + pestanas.length) % pestanas.length];
    activar(destino.id);
    destino.focus();
  });
}

const pedida = pestanas.find((p) => aClave(p) === location.hash.slice(1));
activar((pedida ?? pestanas[0]).id, false);
