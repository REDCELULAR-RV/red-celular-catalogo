const KEY="redCelularProductsV1";
const DEFAULT_PRODUCTS=[{id:"demo1",name:"iPhone 15",category:"Celulares",price:3999.99,description:"128GB • Novo • Consulte os acessórios inclusos",image:"",featured:true},{id:"demo2",name:"iPhone 14",category:"Celulares",price:3799.99,description:"128GB • Novo • Consulte disponibilidade",image:"",featured:true},{id:"demo3",name:"Samsung Galaxy A55",category:"Celulares",price:2299.99,description:"256GB • Consulte cores e disponibilidade",image:"",featured:true},{id:"demo4",name:"PlayStation 5",category:"Games",price:4200,description:"PlayStation 5 • Consulte versões disponíveis",image:"",featured:true},{id:"demo5",name:"Fone Bluetooth",category:"Acessórios",price:89.9,description:"Som sem fio para o dia a dia",image:"",featured:false},{id:"demo6",name:"Caixa de som Bluetooth",category:"Eletrônicos",price:199.9,description:"Consulte modelos e potência",image:"",featured:false}];
let products=read(), pendingImage="";
function read(){try{let x=JSON.parse(localStorage.getItem(KEY));return Array.isArray(x)?x:DEFAULT_PRODUCTS}catch{return DEFAULT_PRODUCTS}}
function save(){localStorage.setItem(KEY,JSON.stringify(products))}
function money(n){return Number(n||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function render(){let q=document.getElementById("filter").value.toLowerCase();let items=products.filter(p=>(p.name+" "+p.category).toLowerCase().includes(q));document.getElementById("productList").innerHTML=items.length?items.map(p=>`<div class="product-row"><div class="thumb">${p.image?`<img src="${p.image}" alt="">`:"▯"}</div><div><div class="row-title">${esc(p.name)}</div><div class="row-meta">${esc(p.category)} • ${money(p.price)}</div></div><div class="row-actions"><button data-edit="${p.id}">Editar</button><button class="delete" data-delete="${p.id}">Excluir</button></div></div>`).join(""):`<div class="empty-list">Nenhum produto encontrado.</div>`;document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>edit(b.dataset.edit));document.querySelectorAll("[data-delete]").forEach(b=>b.onclick=()=>del(b.dataset.delete))}
function clearForm(){document.getElementById("productForm").reset();document.getElementById("id").value="";pendingImage="";document.getElementById("imagePreview").textContent="Prévia da imagem";document.getElementById("formTitle").textContent="Adicionar produto"}
function edit(id){const p=products.find(x=>x.id===id);if(!p)return;document.getElementById("id").value=p.id;document.getElementById("name").value=p.name;document.getElementById("category").value=p.category;document.getElementById("price").value=p.price;document.getElementById("description").value=p.description||"";pendingImage=p.image||"";showPreview(pendingImage);document.getElementById("formTitle").textContent="Editar produto";document.querySelector(".form-panel").scrollIntoView({behavior:"smooth",block:"start"})}
function del(id){const p=products.find(x=>x.id===id);if(p&&confirm(`Excluir "${p.name}" do catálogo?`)){products=products.filter(x=>x.id!==id);save();render();if(document.getElementById("id").value===id)clearForm()}}
function showPreview(src){const el=document.getElementById("imagePreview");el.innerHTML=src?`<img src="${src}" alt="Prévia">`:"Prévia da imagem"}
document.getElementById("imageFile").addEventListener("change",e=>{const f=e.target.files[0];if(!f)return;if(f.size>1200000){alert("A imagem precisa ter até 1,2 MB. Redimensione ou comprima a foto antes de enviar.");e.target.value="";return}const r=new FileReader();r.onload=()=>{pendingImage=r.result;showPreview(pendingImage)};r.readAsDataURL(f)});
document.getElementById("productForm").addEventListener("submit",e=>{e.preventDefault();const id=document.getElementById("id").value||("p"+Date.now());const p={id,name:document.getElementById("name").value.trim(),category:document.getElementById("category").value,price:Number(document.getElementById("price").value),description:document.getElementById("description").value.trim(),image:pendingImage};if(!p.name||!Number.isFinite(p.price)||p.price<0){alert("Confira o nome e o preço.");return}const i=products.findIndex(x=>x.id===id);if(i>=0)products[i]=p;else products.unshift(p);save();render();clearForm();alert("Produto salvo neste navegador!")});
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("newBtn");

  if (btn) {
    btn.addEventListener("click", function () {
      clearForm();

      const painel = document.querySelector(".form-panel");
      if (painel) {
        painel.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }
});document.getElementById("cancelBtn").onclick=clearForm;document.getElementById("filter").oninput=render;
document.getElementById("exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify(products,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="red-celular-backup.json";a.click();URL.revokeObjectURL(a.href)};
document.getElementById("importFile").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const data=JSON.parse(r.result);if(!Array.isArray(data)||!confirm("Importar vai substituir a lista atual. Continuar?"))return;products=data;save();render();clearForm();alert("Backup importado.")}catch{alert("Arquivo JSON inválido.")}};r.readAsText(f);e.target.value=""};
document.getElementById("resetBtn").onclick=()=>{if(confirm("Restaurar os produtos de demonstração? Isso substitui a lista atual neste navegador.")){products=DEFAULT_PRODUCTS;save();render();clearForm()}};
render();
