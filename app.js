const DEFAULT_PRODUCTS = [
 {id:"demo1",name:"iPhone 15",category:"Celulares",price:3999.99,description:"128GB • Novo • Consulte os acessórios inclusos",image:"",featured:true},
 {id:"demo2",name:"iPhone 14",category:"Celulares",price:3799.99,description:"128GB • Novo • Consulte disponibilidade",image:"",featured:true},
 {id:"demo3",name:"Samsung Galaxy A55",category:"Celulares",price:2299.99,description:"256GB • Consulte cores e disponibilidade",image:"",featured:true},
 {id:"demo4",name:"PlayStation 5",category:"Games",price:4200,description:"PlayStation 5 • Consulte versões disponíveis",image:"",featured:true},
 {id:"demo5",name:"Fone Bluetooth",category:"Acessórios",price:89.90,description:"Som sem fio para o dia a dia",image:"",featured:false},
 {id:"demo6",name:"Caixa de som Bluetooth",category:"Eletrônicos",price:199.90,description:"Consulte modelos e potência",image:"",featured:false}
];
const key="redCelularProductsV1";
let products=readProducts(), activeCategory="Todos";
function readProducts(){try{const p=JSON.parse(localStorage.getItem(key));return Array.isArray(p)?p:DEFAULT_PRODUCTS}catch{return DEFAULT_PRODUCTS}}
function saveProducts(p){localStorage.setItem(key,JSON.stringify(p))}
function money(n){return Number(n||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
function waUrl(product){const cfg=window.RED_CELULAR_CONFIG||{};const phone=(cfg.whatsapp||"").replace(/\D/g,"");let msg=product?`Olá, Red Celular! Tenho interesse no produto: ${product.name} — ${money(product.price)}. Está disponível?`:"Olá, Red Celular! Gostaria de conhecer o catálogo.";return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`}
function setupWhats(){const a=document.getElementById("headerWhats"),b=document.getElementById("bottomWhats");a.href=b.href=waUrl();if(!window.RED_CELULAR_CONFIG?.whatsapp||window.RED_CELULAR_CONFIG.whatsapp==="5564999999999"){a.title=b.title="Configure o número da loja em config.js";}}
function categories(){return ["Todos",...new Set(products.map(p=>p.category).filter(Boolean))]}
function renderCategories(){const list=categories();document.getElementById("categories").innerHTML=list.map(c=>`<button class="${c===activeCategory?"active":""}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join("");document.getElementById("chips").innerHTML=list.map(c=>`<button class="${c===activeCategory?"active":""}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join("");document.querySelectorAll("[data-cat]").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.cat;renderCategories();renderProducts()}))}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderProducts(){const q=document.getElementById("search").value.trim().toLowerCase();const filtered=products.filter(p=>(activeCategory==="Todos"||p.category===activeCategory)&&`${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q));document.getElementById("productCount").textContent=`${filtered.length} produto(s)`;document.getElementById("empty").classList.toggle("hidden",filtered.length>0);document.getElementById("productGrid").innerHTML=filtered.map(p=>`<article class="product-card"><div class="product-image">${p.image?`<img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">`:`<div class="product-placeholder">▯</div>`}</div><div class="product-info"><span class="product-category">${escapeHtml(p.category||"Produtos")}</span><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.description||"Consulte disponibilidade na loja.")}</p><div class="price">${money(p.price)}</div><a class="buy" href="${waUrl(p)}" target="_blank" rel="noopener">◉ Pedir pelo WhatsApp</a></div></article>`).join("")}
document.getElementById("search").addEventListener("input",renderProducts);document.getElementById("searchBtn").addEventListener("click",renderProducts);setupWhats();renderCategories();renderProducts();
