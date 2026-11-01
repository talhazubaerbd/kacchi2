// Kacchi & Plants — shared behaviour for every page
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Highlight the current page in the menu
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach(a => {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
  });

  // Mobile menu
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

  // Count-up numbers (final values are already in the HTML)
  if (!reduce) {
    document.querySelectorAll("[data-count]").forEach((el, i) => {
      const end = +el.dataset.count;
      if (end <= 1) return;
      let t0 = null;
      const tick = t => {
        if (!t0) t0 = t;
        const k = Math.min(1, (t - t0 - i * 150) / 1100);
        if (k > 0) el.textContent = Math.max(1, Math.round(end * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      el.textContent = "1";
      requestAnimationFrame(tick);
    });
  }

  // Steam rising over the hero dish
  const c = document.getElementById("steam");
  if (c && !reduce) {
    const ctx = c.getContext("2d");
    let w, h;
    const size = () => { const r = c.getBoundingClientRect(); w = c.width = r.width; h = c.height = r.height; };
    size(); addEventListener("resize", size);
    const spawn = () => ({ x: w * (0.58 + Math.random() * 0.3), y: h * (0.75 + Math.random() * 0.2), r: 30 + Math.random() * 50, vy: 0.35 + Math.random() * 0.45, vx: (Math.random() - 0.4) * 0.25, life: 0, max: 380 + Math.random() * 260 });
    const puffs = Array.from({ length: 26 }, () => { const p = spawn(); p.life = Math.random() * p.max; return p; });
    (function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of puffs) {
        p.life++; p.y -= p.vy; p.x += p.vx + Math.sin(p.life / 40) * 0.25; p.r += 0.12;
        const a = Math.sin(Math.PI * (p.life / p.max)) * 0.16;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `rgba(255,248,232,${a})`); g.addColorStop(1, "rgba(255,248,232,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        if (p.life >= p.max) Object.assign(p, spawn());
      }
      requestAnimationFrame(frame);
    })();
  }

  // Dum steps: one open at a time
  const stepBtns = document.querySelectorAll(".steps button");
  stepBtns.forEach(btn => btn.addEventListener("click", () => {
    stepBtns.forEach(b => b.setAttribute("aria-expanded", b === btn));
  }));

  // Plant passport with filters
  const grid = document.getElementById("plant-grid");
  if (grid) {
    const PLANTS = [
      { name: "Rice", bn: "চাল", sci: "Oryza sativa", fam: "Poaceae · grass family", part: "Grain", origin: "South & SE Asia", img: "rice", role: "The body of the dish; holds the aroma of meat, ghee and spice.", use: "Celebrated at Nabanna, the Bengali festival of the new harvest." },
      { name: "Cardamom", bn: "এলাচ", sci: "Elettaria cardamomum", fam: "Zingiberaceae · ginger family", part: "Fruit & seed", origin: "South & SE Asia", img: "cardamom", role: "Floral, cooling fragrance in the rice.", use: "Chewed after meals to aid digestion." },
      { name: "Cinnamon", bn: "দারুচিনি", sci: "Cinnamomum spp.", fam: "Lauraceae · laurel family", part: "Bark", origin: "South & SE Asia", img: "cinnamon", role: "Sweet, woody warmth from the inner bark.", use: "A warming spice in winter home remedies." },
      { name: "Clove", bn: "লবঙ্গ", sci: "Syzygium aromaticum", fam: "Myrtaceae · myrtle family", part: "Flower bud", origin: "Maluku Islands", img: "clove", role: "Strong, warm aroma from a dried flower bud.", use: "Pressed on the gum for toothache." },
      { name: "Onion", bn: "পেঁয়াজ", sci: "Allium cepa", fam: "Amaryllidaceae · onion family", part: "Bulb", origin: "Central & West Asia", img: "onion", role: "Fried into crisp beresta for sweetness and color.", use: "A daily kitchen staple across Bangladesh." },
      { name: "Garlic", bn: "রসুন", sci: "Allium sativum", fam: "Amaryllidaceae · onion family", part: "Bulb", origin: "Central & West Asia", img: "garlic", role: "Savory base of the marinade paste.", use: "Folk remedy against infections." },
      { name: "Ginger", bn: "আদা", sci: "Zingiber officinale", fam: "Zingiberaceae · ginger family", part: "Rhizome", origin: "South & SE Asia", img: "ginger", role: "Warmth and freshness in the marinade.", use: "Ginger tea for nausea and colds." },
      { name: "Potato", bn: "আলু", sci: "Solanum tuberosum", fam: "Solanaceae · nightshade family", part: "Tuber", origin: "The Americas", img: "potato", role: "Soaks up meat juices and spice; a Dhaka signature.", use: "Arrived in South Asia with Portuguese traders." }
    ];
    grid.innerHTML = PLANTS.map(p => `
      <article class="plant" data-part="${p.part}" data-origin="${p.origin}">
        <div class="top"><img src="assets/img/p-${p.img}.jpg" alt="${p.name}" loading="lazy">
          <div><span class="part">${p.part}</span><h3>${p.name}</h3><span class="bn" lang="bn">${p.bn}</span></div></div>
        <span class="sci">${p.sci}</span>
        <dl><dt>Family</dt><dd>${p.fam}</dd><dt>Origin</dt><dd>${p.origin}</dd><dt>In kacchi</dt><dd>${p.role}</dd></dl>
        <p class="use">${p.use}</p>
      </article>`).join("");

    const state = { part: "All", origin: "All" };
    const apply = () => grid.querySelectorAll(".plant").forEach(card => {
      const ok = (state.part === "All" || card.dataset.part === state.part) && (state.origin === "All" || card.dataset.origin === state.origin);
      card.classList.toggle("dim", !ok);
    });
    const buildChips = (id, key, values) => {
      const box = document.getElementById(id);
      ["All", ...values].forEach(v => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "chip"; b.textContent = v;
        b.id = `chip-${key}-${v.replace(/\W+/g, "-").toLowerCase()}`;
        b.setAttribute("aria-pressed", v === "All");
        b.addEventListener("click", () => {
          state[key] = v;
          box.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === b));
          apply();
        });
        box.appendChild(b);
      });
    };
    buildChips("f-part", "part", [...new Set(PLANTS.map(p => p.part))]);
    buildChips("f-origin", "origin", [...new Set(PLANTS.map(p => p.origin))]);
  }

  // Gallery lightbox
  const items = [...document.querySelectorAll(".gallery button")];
  const box = document.querySelector(".lightbox");
  if (items.length && box) {
    const img = box.querySelector("img"), cap = box.querySelector("figcaption");
    let i = 0;
    const show = n => {
      i = (n + items.length) % items.length;
      const src = items[i].querySelector("img");
      img.src = src.src; img.alt = src.alt; cap.textContent = items[i].dataset.caption || src.alt;
    };
    const open = n => { show(n); box.classList.add("open"); box.querySelector(".close").focus(); };
    const close = () => { box.classList.remove("open"); items[i].focus(); };
    items.forEach((b, n) => b.addEventListener("click", () => open(n)));
    box.querySelector(".close").addEventListener("click", close);
    box.querySelector(".prev").addEventListener("click", () => show(i - 1));
    box.querySelector(".next").addEventListener("click", () => show(i + 1));
    box.addEventListener("click", e => { if (e.target === box) close(); });
    document.addEventListener("keydown", e => {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(i - 1);
      if (e.key === "ArrowRight") show(i + 1);
    });
  }
})();
