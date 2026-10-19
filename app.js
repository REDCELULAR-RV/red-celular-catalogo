
const key = "redCelularProductsV1";
let products = [];
let activeCategory = "Todos";

function money(n) {
  return Number(n || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

function waUrl(product) {
  const cfg = window.RED_CELULAR_CONFIG || {};
  const phone = (cfg.whatsapp || "").replace(/\D/g, "");
  const msg = product
    ? `Olá, Red Celular! Tenho interesse no produto: ${product.name} — ${money(product.price)}. Está disponível?`
    : "Olá, Red Celular! Gostaria de conhecer o catálogo.";

  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

function setupWhats() {
  const a = document.getElementById("headerWhats");
  const b = document.getElementById("bottomWhats");

  if (a && b) {
    a.href = b.href = waUrl();

    if (!window.RED_CELULAR_CONFIG?.whatsapp ||
        window.RED_CELULAR_CONFIG.whatsapp === "5564999999999") {
      a.title = b.title = "Configure o número da loja em config.js";
    }
  }
}

function categories() {
  return ["Todos", ...new Set(
    products.map(p => p.category).filter(Boolean)
  )];
}

function renderCategories() {
  const list = categories();

  document.getElementById("categories").innerHTML = list
    .map(c => `<button class="${c === activeCategory ? "active" : ""}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`)
    .join("");

  document.getElementById("chips").innerHTML = list
    .map(c => `<button class="${c === activeCategory ? "active" : ""}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`)
    .join("");

  document.querySelectorAll("[data-cat]").forEach(b => {
    b.addEventListener("click", () => {
      activeCategory = b.dataset.cat;
      renderCategories();
      renderProducts();
    });
  });
}

function renderProducts() {
  const q = document.getElementById("search").value.trim().toLowerCase();

  const filtered = products.filter(p =>
    (activeCategory === "Todos" || p.category === activeCategory) &&
    `${p.name} ${p.description || ""} ${p.category || ""}`
      .toLowerCase().includes(q)
  );

  document.getElementById("productCount").textContent =
    `${filtered.length} produto(s)`;

  document.getElementById("empty").classList.toggle(
    "hidden", filtered.length > 0
  );

  document.getElementById("productGrid").innerHTML = filtered.map(p => {
    const image = p.image
      ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : "";

    return `
      <article class="product-card">
        <div class="product-image">
          ${image}
          <div class="product-placeholder" style="${p.image ? "display:none" : "display:flex"}">▯</div>
        </div>
        <div class="product-info">
          <span class="product-category">${escapeHtml(p.category || "Produtos")}</span>
          <h3>${escapeHtml(p.name)}</h3>
          <p>${escapeHtml(p.description || "Consulte disponibilidade na loja.")}</p>
          <div class="price">${money(p.price)}</div>
          <a class="buy" href="${waUrl(p)}" target="_blank" rel="noopener">◉ Pedir pelo WhatsApp</a>
        </div>
      </article>
    `;
  }).join("");
}

async function loadProducts() {
  const empty = document.getElementById("empty");

  try {
    const response = await fetch("./products.json");

    if (!response.ok) {
      throw new Error("Erro HTTP " + response.status);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("O arquivo products.json precisa conter uma lista.");
    }

    products = data;
    renderCategories();
    renderProducts();
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    empty.textContent = "Não foi possível carregar os produtos. Tente novamente mais tarde.";
    empty.classList.remove("hidden");
  }
}

document.getElementById("search").addEventListener("input", renderProducts);
document.getElementById("searchBtn").addEventListener("click", renderProducts);

setupWhats();
loadProducts();
