const SVG = "http://www.w3.org/2000/svg";
const ANCHO = 120;
const ALTO = 52;

function lienzo() {
  const svg = document.createElementNS(SVG, "svg");
  svg.setAttribute("viewBox", `0 0 ${ANCHO} ${ALTO}`);
  return svg;
}

function nodo(nombre, atributos) {
  const el = document.createElementNS(SVG, nombre);
  for (const [clave, valor] of Object.entries(atributos)) {
    el.setAttribute(clave, String(valor));
  }
  return el;
}

function vitrinaDS() {
  const svg = lienzo();

  const PUNTOS = [
    [16, 39], [25, 41], [34, 34], [43, 33], [51, 28],
    [60, 30], [69, 22], [78, 21], [88, 15], [99, 13], [107, 10],
  ];

  const [X1, Y1, X2, Y2] = [12, 43, 111, 9];
  const pendiente = (Y2 - Y1) / (X2 - X1);
  const enLaRecta = (x) => Y1 + pendiente * (x - X1);

  svg.append(nodo("line", { class: "eje", x1: 9, y1: 47, x2: 115, y2: 47 }));
  svg.append(nodo("line", { class: "eje", x1: 9, y1: 47, x2: 9, y2: 5 }));

  for (const [cx, cy] of PUNTOS) {
    svg.append(nodo("line", { class: "residuo", x1: cx, y1: cy, x2: cx, y2: enLaRecta(cx) }));
  }

  svg.append(nodo("line", { class: "ajuste", x1: X1, y1: Y1, x2: X2, y2: Y2 }));

  PUNTOS.forEach(([cx, cy], i) => {
    const punto = nodo("circle", { class: "punto", cx, cy, r: 2.5 });
    punto.style.animationDelay = `${i * 0.09}s`;
    svg.append(punto);
  });

  return svg;
}

function vitrinaIA() {
  const svg = lienzo();

  const CAPAS = [2, 4, 4, 2];
  const X = [12, 44, 76, 108];
  const SEPARACION = 11.5;
  const RADIO = 4.2;

  const PASO = 0.5;

  const alturas = (cuantos) =>
    Array.from(
      { length: cuantos },
      (_, i) => ALTO / 2 + (i - (cuantos - 1) / 2) * SEPARACION
    );

  const puntos = CAPAS.map((cuantos, c) =>
    alturas(cuantos).map((y) => [X[c], y])
  );

  puntos.slice(0, -1).forEach((capa, c) => {
    for (const [x1, y1] of capa) {
      for (const [x2, y2] of puntos[c + 1]) {
        const sinapsis = nodo("line", { class: "sinapsis", x1, y1, x2, y2 });

        sinapsis.style.animationDelay = `${(c * PASO + 0.15).toFixed(2)}s`;
        svg.append(sinapsis);
      }
    }
  });

  puntos.forEach((capa, c) => {
    for (const [cx, cy] of capa) {
      const neurona = nodo("circle", { class: "neurona", cx, cy, r: RADIO });
      neurona.style.animationDelay = `${(c * PASO).toFixed(2)}s`;
      svg.append(neurona);
    }
  });

  return svg;
}

function vitrinaHPC() {
  const svg = lienzo();

  const CHIPS = 3;
  const LADO = 30;
  const HUECO = 9;
  const PATAS = 4;
  const LARGO_PATA = 4;

  const REJILLA = 3;
  const NUCLEO = 4;
  const SEPARACION = 1;

  const y0 = (ALTO - LADO) / 2;
  const x0 = (ANCHO - (CHIPS * LADO + (CHIPS - 1) * HUECO)) / 2;

  for (let n = 0; n < CHIPS; n++) {
    const x = x0 + n * (LADO + HUECO);

    for (let p = 0; p < PATAS; p++) {
      const desp = 6 + p * 6;

      svg.append(nodo("line", { class: "pata", x1: x - LARGO_PATA, y1: y0 + desp, x2: x, y2: y0 + desp }));
      svg.append(nodo("line", { class: "pata", x1: x + LADO, y1: y0 + desp, x2: x + LADO + LARGO_PATA, y2: y0 + desp }));
      svg.append(nodo("line", { class: "pata", x1: x + desp, y1: y0 - LARGO_PATA, x2: x + desp, y2: y0 }));
      svg.append(nodo("line", { class: "pata", x1: x + desp, y1: y0 + LADO, x2: x + desp, y2: y0 + LADO + LARGO_PATA }));
    }

    svg.append(nodo("rect", { class: "encapsulado", x, y: y0, width: LADO, height: LADO }));

    const lienzoDie = REJILLA * NUCLEO + (REJILLA - 1) * SEPARACION;
    const dieX = x + (LADO - lienzoDie) / 2;
    const dieY = y0 + (LADO - lienzoDie) / 2;

    svg.append(nodo("rect", {
      class: "dado",
      x: dieX - 2,
      y: dieY - 2,
      width: lienzoDie + 4,
      height: lienzoDie + 4,
    }));

    for (let f = 0; f < REJILLA; f++) {
      for (let c = 0; c < REJILLA; c++) {
        const nucleo = nodo("rect", {
          class: "nucleo",
          x: dieX + c * (NUCLEO + SEPARACION),
          y: dieY + f * (NUCLEO + SEPARACION),
          width: NUCLEO,
          height: NUCLEO,
        });

        nucleo.style.animationDelay = `${n * 0.3 + (f + c) * 0.13}s`;
        svg.append(nucleo);
      }
    }
  }

  return svg;
}

const VITRINAS = { ds: vitrinaDS, ia: vitrinaIA, hpc: vitrinaHPC };

export function construirVitrina(clave) {
  return VITRINAS[clave]?.() ?? null;
}

for (const caja of document.querySelectorAll(".viz")) {

  if (caja.querySelector("svg")) continue;

  const svg = construirVitrina(caja.dataset.viz);
  if (svg) caja.append(svg);
}
