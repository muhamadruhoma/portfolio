let lang="en", active="All";
const $=s=>document.querySelector(s);
function t(x){return x?.[lang]??x??""}
function renderFilters(){
  const cats=["All",...new Set(works.map(w=>w.category))];
  $("#filters").innerHTML=cats.map(c=>`<button class="filter ${c===active?"active":""}" data-cat="${c}">${c}</button>`).join("");
  document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{active=b.dataset.cat;renderFilters();renderWorks()});
}
function renderWorks(){
  const list=active==="All"?works:works.filter(w=>w.category===active);
  $("#worksGrid").innerHTML=list.map(w=>`
    <article class="work" onclick="openWork(${w.id})">
      <div class="work-img">${w.image?`<img src="${w.image}" alt="${t(w.title)}" loading="lazy">`:"NO IMAGE YET"}</div>
      <div class="work-info"><small>${w.category}</small><h3>${t(w.title)}</h3><p>${t(w.description)}</p></div>
    </article>`).join("");
}
function renderServices(){
  $("#servicesGrid").innerHTML=services.map(s=>`<div class="service"><h3>${t(s.title)}</h3><p class="price">${t(s.price)}</p></div>`).join("");
}
function openWork(id){
  const w=works.find(x=>x.id===id); if(!w)return;
  $("#modalContent").innerHTML=`<div class="modal-inner">${w.image?`<img src="${w.image}" alt="${t(w.title)}">`:""}<p class="eyebrow">${w.category}</p><h2>${t(w.title)}</h2><p class="lead">${t(w.description)}</p></div>`;
  $("#modal").classList.add("show");
}
$("#closeModal").onclick=()=>$("#modal").classList.remove("show");
$("#modal").onclick=e=>{if(e.target.id==="modal")$("#modal").classList.remove("show")};
const texts={
  en:{navWork:"Work",navAbout:"About",navServices:"Services",navContact:"Contact",eyebrow:"FREELANCE CREATIVE",heroText:"Art, design, video and game creation — collected in one place.",viewWork:"View Work",contactMe:"Contact",selectedWork:"SELECTED WORK",myWorks:"My Works",about:"ABOUT ME",aboutTitle:"Creative work without one box.",aboutText:"I'm Muhamad Ruhoma, a freelancer working across illustration, design, editing and game-related projects.",statFields:"Creative fields",statIdeas:"Ideas to build",services:"SERVICES",servicesTitle:"What I can create",contact:"CONTACT",contactTitle:"Have a project in mind?",whatsapp:"Message on WhatsApp"},
  ar:{navWork:"الأعمال",navAbout:"عني",navServices:"الخدمات",navContact:"تواصل",eyebrow:"مستقل ومبدع",heroText:"رسم وتصميم ومونتاج وتطوير ألعاب — كل أعمالي في مكان واحد.",viewWork:"شاهد الأعمال",contactMe:"تواصل معي",selectedWork:"أعمال مختارة",myWorks:"أعمالي",about:"عني",aboutTitle:"إبداع في أكثر من مجال.",aboutText:"أنا محمد رُحومة، مستقل أعمل في الرسم والتصميم والمونتاج والمشاريع المتعلقة بالألعاب.",statFields:"مجالات إبداعية",statIdeas:"أفكار قابلة للتنفيذ",services:"الخدمات",servicesTitle:"ماذا أستطيع أن أصنع؟",contact:"تواصل",contactTitle:"عندك مشروع في بالك؟",whatsapp:"تواصل عبر واتساب"}
};
function applyLang(){
  document.documentElement.lang=lang; document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  document.querySelectorAll("[data-i18n]").forEach(el=>el.textContent=texts[lang][el.dataset.i18n]);
  $("#langBtn").textContent=lang==="en"?"AR":"EN"; renderFilters();renderWorks();renderServices();
}
$("#langBtn").onclick=()=>{lang=lang==="en"?"ar":"en";applyLang()};
$("#themeBtn").onclick=()=>document.body.classList.toggle("light");
$("#waBtn").href="https://wa.me/"+siteConfig.whatsapp;
$("#year").textContent=new Date().getFullYear();
renderFilters();renderWorks();renderServices();
