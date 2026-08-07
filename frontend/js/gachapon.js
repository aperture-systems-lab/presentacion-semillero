const SVG = "http://www.w3.org/2000/svg";

const ANCHO = 200;
const ALTO = 292;

const DOMO = { cx: 100, cy: 86, r: 66 };
const SALIDA = { x: 100, y: 158 };
const BANDEJA_Y = 204;
const RADIO_CAPSULA = 10;

const ARRANQUE = 600;
const ENTRE_CAPSULAS = 420;
const CAIDA = 1150;
const POSADO = 600;
const REVUELO = 700;
const PREMIO = 900;

function nodo(nombre, atributos) {
  const el = document.createElementNS(SVG, nombre);
  for (const [clave, valor] of Object.entries(atributos)) {
    el.setAttribute(clave, String(valor));
  }
  return el;
}

function degradado(id, tipo, atributos, paradas) {
  const grad = nodo(tipo === "radial" ? "radialGradient" : "linearGradient",
                    { id, ...atributos });
  for (const [offset, color, opacidad] of paradas) {
    grad.append(nodo("stop", {
      offset, "stop-color": color, "stop-opacity": opacidad ?? 1,
    }));
  }
  return grad;
}

function materiales() {
  const defs = nodo("defs", {});

  defs.append(degradado("gachaMetal", "linear", { x1: 0, y1: 0, x2: 1, y2: 1 }, [
    ["0%", "#16334a"], ["40%", "#0b1a28"], ["100%", "#040a12"],
  ]));
  defs.append(degradado("gachaCromo", "linear", { x1: 0, y1: 0, x2: 0, y2: 1 }, [
    ["0%", "#ffffff", 0.28], ["45%", "#7fe4f0", 0.30], ["100%", "#04080c", 0.55],
  ]));
  defs.append(degradado("gachaCristal", "radial", { cx: "34%", cy: "24%", r: "86%" }, [
    ["0%", "#ffffff", 0.16], ["48%", "#29c5d6", 0.05], ["100%", "#04080c", 0.42],
  ]));
  defs.append(degradado("gachaHueco", "linear", { x1: 0, y1: 0, x2: 0, y2: 1 }, [
    ["0%", "#01050a"], ["100%", "#0a1622"],
  ]));

  defs.append(degradado("gachaMesa", "linear", { x1: 0, y1: 0, x2: 0, y2: 1 }, [
    ["0%", "#0d2233"], ["45%", "#153045"], ["100%", "#1b4258"],
  ]));

  defs.append(degradado("gachaSombra", "radial", { cx: "50%", cy: "50%", r: "50%" }, [
    ["0%", "#000000", 0.55], ["60%", "#000000", 0.28], ["100%", "#000000", 0],
  ]));

  const recorte = nodo("clipPath", { id: "gachaVidrio" });
  recorte.append(nodo("circle", { cx: DOMO.cx, cy: DOMO.cy, r: DOMO.r }));
  defs.append(recorte);

  return defs;
}

function capsula(cx, cy, r, clave, clase) {
  const grupo = nodo("g", { class: clase, "data-tema": clave });
  grupo.append(nodo("circle", { class: "cap-cuerpo", cx, cy, r }));
  grupo.append(nodo("path", {
    class: "cap-tapa",
    d: `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z`,
  }));
  grupo.append(nodo("circle", {
    class: "cap-brillo", cx: cx - r * 0.34, cy: cy - r * 0.42, r: r * 0.2,
  }));
  return grupo;
}

const APILADO = [
  [-43, -17], [-21, -36], [2, -23], [25, -35], [45, -7],
  [-48, 12], [-25, -2], [0, 7], [23, 0], [46, 18],
  [-36, 33], [-13, 23], [10, 30], [33, 25], [-3, 45],
  [20, 48], [-30, -30], [33, -25],
];

export function crearGachapon(caja, categorias, cuantas, eventos = {}) {
  let activas = [...categorias];
  const { alCaer, alSalir } = eventos;

  const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

  let girando = false;
  const relojes = [];

  const espera = (fn, ms) => { relojes.push(setTimeout(fn, ms)); };

  const svg = nodo("svg", { viewBox: `0 0 ${ANCHO} ${ALTO}`, class: "gacha-svg" });
  svg.append(materiales());

  const MESA = { fondoY: 240, frenteY: 270, fondoX: [4, 196], frenteX: [-34, 234] };

  const enMesa = (t, p) => {
    const fondo = MESA.fondoX[0] + t * (MESA.fondoX[1] - MESA.fondoX[0]);
    const frente = MESA.frenteX[0] + t * (MESA.frenteX[1] - MESA.frenteX[0]);
    return [fondo + (frente - fondo) * p, MESA.fondoY + (MESA.frenteY - MESA.fondoY) * p];
  };

  for (const x of [50, 140]) {
    svg.append(nodo("rect", {
      class: "gacha-mesa-pata atras", x, y: 266, width: 10, height: 52, rx: 2,
    }));
  }

  svg.append(nodo("polygon", {
    class: "gacha-mesa-tapa",
    points: [enMesa(0, 0), enMesa(1, 0), enMesa(1, 1), enMesa(0, 1)]
      .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" "),
  }));

  const rejilla = nodo("g", { class: "gacha-mesa-rejilla" });
  for (let i = 1; i < 6; i++) {
    const [x1, y1] = enMesa(i / 6, 0);
    const [x2, y2] = enMesa(i / 6, 1);
    rejilla.append(nodo("line", { x1, y1, x2, y2 }));
  }
  for (const p of [0.38, 0.72]) {
    const [x1, y1] = enMesa(0, p);
    const [x2, y2] = enMesa(1, p);
    rejilla.append(nodo("line", { x1, y1, x2, y2 }));
  }
  svg.append(rejilla);

  svg.append(nodo("rect", {
    class: "gacha-mesa-canto",
    x: MESA.frenteX[0], y: MESA.frenteY, width: MESA.frenteX[1] - MESA.frenteX[0], height: 12,
  }));

  svg.append(nodo("line", {
    class: "gacha-mesa-filo",
    x1: MESA.frenteX[0] + 4, y1: MESA.frenteY + 1,
    x2: MESA.frenteX[1] - 4, y2: MESA.frenteY + 1,
  }));

  for (const t of [0.1, 0.9]) {
    const [x] = enMesa(t, 1);
    svg.append(nodo("rect", {
      class: "gacha-mesa-pata", x: x - 8, y: 282, width: 16, height: 86, rx: 2,
    }));
  }

  svg.append(nodo("ellipse", {
    class: "gacha-mesa-sombra", cx: 100, cy: 249, rx: 98, ry: 9,
  }));

  svg.append(nodo("rect", {
    class: "gacha-pie", x: 14, y: 234, width: 172, height: 14, rx: 5,
  }));
  svg.append(nodo("rect", {
    class: "gacha-cuerpo", x: 22, y: 118, width: 156, height: 118, rx: 12,
  }));

  svg.append(nodo("rect", {
    class: "gacha-boca", x: 38, y: 178, width: 124, height: 44, rx: 9,
  }));

  svg.append(nodo("rect", {
    class: "gacha-visera", x: 38, y: 178, width: 124, height: 6, rx: 3,
  }));

  const huecos = Array.from({ length: cuantas }, (_, i) => {
    const paso = 92 / Math.max(cuantas - 1, 1);
    return 54 + i * paso;
  });
  const huecosEl = huecos.map((x) => {
    const el = nodo("circle", {
      class: "gacha-hueco", cx: x, cy: BANDEJA_Y, r: RADIO_CAPSULA,
    });
    svg.append(el);
    return el;
  });

  svg.append(nodo("circle", {
    class: "gacha-domo", cx: DOMO.cx, cy: DOMO.cy, r: DOMO.r,
  }));

  const dentro = nodo("g", { class: "gacha-dentro" });
  APILADO.forEach(([dx, dy], i) => {
    const bola = capsula(
      DOMO.cx + dx, DOMO.cy + dy, RADIO_CAPSULA,
      activas[i % activas.length], "gacha-bola"
    );
    bola.style.setProperty("--t", `${5.5 + (i % 5) * 0.7}s`);
    bola.style.setProperty("--d", `${(i % 7) * -0.9}s`);
    dentro.append(bola);
  });
  svg.append(dentro);

  const sueltas = nodo("g", { class: "gacha-sueltas" });
  svg.append(sueltas);

  const vidrio = nodo("g", { "clip-path": "url(#gachaVidrio)" });
  vidrio.append(nodo("ellipse", {
    class: "gacha-reflejo", cx: 74, cy: 50, rx: 24, ry: 15,
    transform: "rotate(-32 74 50)",
  }));
  const sesgo = nodo("g", { transform: `rotate(18 ${DOMO.cx} ${DOMO.cy})` });
  sesgo.append(nodo("rect", {
    class: "gacha-destello", x: 6, y: 6, width: 22, height: 170,
  }));
  vidrio.append(sesgo);
  svg.append(vidrio);

  svg.append(nodo("circle", {
    class: "gacha-aro", cx: DOMO.cx, cy: DOMO.cy, r: DOMO.r,
  }));

  const luces = nodo("g", { class: "gacha-luces" });
  const CUANTAS_LUCES = 11;
  for (let i = 0; i < CUANTAS_LUCES; i++) {

    const grados = 196 + (148 / (CUANTAS_LUCES - 1)) * i;
    const rad = (grados * Math.PI) / 180;
    const bombilla = nodo("circle", {
      class: "gacha-luz",
      cx: DOMO.cx + Math.cos(rad) * (DOMO.r + 11),
      cy: DOMO.cy + Math.sin(rad) * (DOMO.r + 11),
      r: 3.2,
    });
    bombilla.style.animationDelay = `${i * 0.13}s`;
    luces.append(bombilla);
  }
  svg.append(luces);

  svg.append(nodo("rect", {
    class: "gacha-collar", x: 54, y: 142, width: 92, height: 20, rx: 8,
  }));
  svg.append(nodo("rect", {
    class: "gacha-collar-filo", x: 60, y: 145, width: 80, height: 3, rx: 1.5,
  }));

  caja.append(svg);

  function vaciarHuecos() {
    for (const el of huecosEl) {
      el.removeAttribute("data-tema");
      el.classList.remove("lleno");
    }
  }

  function accionar() {
    if (girando) return;
    girando = true;

    const elegidas = Array.from(
      { length: cuantas },
      () => activas[Math.floor(Math.random() * activas.length)]
    );

    const ritmo = menosMovimiento.matches ? 0.3 : 1;

    svg.classList.add("girando", "revuelo");
    espera(() => svg.classList.remove("revuelo"), REVUELO * ritmo);
    sueltas.innerHTML = "";
    vaciarHuecos();

    elegidas.forEach((clave, i) => {
      const cap = capsula(SALIDA.x, SALIDA.y, RADIO_CAPSULA, clave, "gacha-suelta");

      const [ox, oy] = APILADO[(i * 5 + 3) % APILADO.length];
      cap.style.setProperty("--ox", DOMO.cx + ox - SALIDA.x);
      cap.style.setProperty("--oy", DOMO.cy + oy - SALIDA.y);
      cap.style.setProperty("--dx", huecos[i] - SALIDA.x);
      cap.style.setProperty("--dy", BANDEJA_Y - SALIDA.y);

      const retardo = (ARRANQUE + i * ENTRE_CAPSULAS) * ritmo;
      cap.style.animationDelay = `${retardo / 1000}s`;
      sueltas.append(cap);

      espera(() => {
        huecosEl[i]?.setAttribute("data-tema", clave);
        huecosEl[i]?.classList.add("lleno");

        svg.classList.add("tumbo");
        espera(() => svg.classList.remove("tumbo"), 220);

        alCaer?.(clave, i);
      }, retardo + CAIDA * ritmo);
    });

    const llena = (ARRANQUE + (cuantas - 1) * ENTRE_CAPSULAS + CAIDA) * ritmo;
    espera(() => {
      svg.classList.add("premio");
      espera(() => svg.classList.remove("premio"), PREMIO * ritmo);
    }, llena);

    espera(() => {
      girando = false;
      svg.classList.remove("girando", "revuelo", "tumbo", "premio");
      alSalir?.(elegidas);
    }, llena + (POSADO + PREMIO) * ritmo);
  }

  function reiniciar() {
    for (const reloj of relojes.splice(0)) clearTimeout(reloj);
    girando = false;
    svg.classList.remove("girando", "revuelo", "tumbo", "premio");
    sueltas.innerHTML = "";
    vaciarHuecos();
  }

  function usarCategorias(claves) {
    if (!claves.length) return;
    activas = [...claves];
    [...dentro.children].forEach((bola, i) => {
      bola.dataset.tema = activas[i % activas.length];
    });
  }

  return { accionar, girando: () => girando, reiniciar, usarCategorias };
}
