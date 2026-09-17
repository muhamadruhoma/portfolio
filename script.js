let lang=localStorage.getItem("mr-lang")||"en";
let theme=localStorage.getItem("mr-theme")||"dark";
let active="All";

const $=s=>document.querySelector(s);
const text=x=>x?.[lang]??x??"";

const tr={
en:{navWork:"Work",navServices:"Services",navAbout:"About",navContact:"Contact",heroLabel:"FREELANCE CREATIVE",heroText:"Art, design, video and game creation — made to feel like something.",seeWork:"SEE MY WORK",contactLink:"Get in touch ↗",workLabel:"WORK",workTitle:"Selected work",servicesLabel:"SERVICES",servicesTitle:"Things I can build",aboutLabel:"ABOUT",aboutTitle:"More than one discipline.",aboutText:"I'm Muhamad Ruhoma, a freelancer working across illustration, graphic design, video editing and game creation. I like turning ideas into finished visual work.",statFields:"Creative fields",statIdeas:"Ideas to explore",contactLabel:"CONTACT",ctaTitle:"Have a project<br><i>in mind?</i>",ctaText:"Tell me what you're building and let's turn the idea into something real.",footer:"Freelance creative · Egypt"},
ar:{navWork:"الأعمال",navServices:"الخدمات",navAbout:"عني",navContact:"تواصل",heroLabel:"مستقل ومبدع",heroText:"رسم وتصميم ومونتاج وتطوير ألعاب — أعمال بلمسة واضحة ومختلفة.",seeWork:"شاهد أعمالي",contactLink:"تواصل معي ↗",workLabel:"الأعمال",workTitle:"أعمال مختارة",servicesLabel:"الخدمات",servicesTitle:"أشياء أستطيع تنفيذها",aboutLabel:"عني",aboutTitle:"أكثر من مجرد مجال واحد.",aboutText:"أنا محمد رُحومة، مستقل أعمل في الرسم والتصميم الجرافيكي والمونتاج وتطوير الألعاب. أحب تحويل الأفكار إلى أعمال بصرية مكتملة.",statFields:"مجالات إبداعية",statIdeas:"أفكار قابلة للتنفيذ",contactLabel:"تواصل",ctaTitle:"عندك مشروع<br><i>في بالك؟</i>",ctaText:"احكي لي عن المشروع، ونحوّل الفكرة إلى شيء حقيقي.",footer:"مستقل ومبدع · مصر"}
};

function applyText(){
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  document.querySelectorAll("[data-t]").forEach(el=>el.innerHTML=tr[lang][el.dataset.t]||"");
  $("#lang").textContent=lang==="en"?"AR":"EN";
}
function renderFilters(){
  const cats=["All",...new Set(works.map(w=>w.category))];
  $("#filters").innerHTML=cats.map(c=>`<button class="filter ${c===active?"active":""}" data-cat="${c}">${c==="All"?(lang==="ar"?"الكل":"All"):c}</button>`).join("");
  document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{active=b.dataset.cat;renderFilters();renderWorks();observeReveals()});
}
function renderWorks(){
  const list=active==="All"?works:works.filter(w=>w.category===active);
  $("#works").innerHTML=list.map((w,i)=>`
  <article class="work reveal" data-id="${works.indexOf(w)}">
    <div class="work-media">${w.image?`<img loading="lazy" src="${w.image}" alt="${text(w.title)}">`:`<span>${lang==="ar"?"أضف صورة العمل":"ADD WORK IMAGE"}</span>`}</div>
    <div class="work-info"><div class="work-cat">${w.category}</div><h3>${text(w.title)}</h3><p>${text(w.description)}</p></div>
  </article>`).join("");
  document.querySelectorAll(".work").forEach(el=>el.onclick=()=>openWork(Number(el.dataset.id)));
}
function renderServices(){
  $("#servicesGrid").innerHTML=services.map((s,i)=>`<div class="service reveal"><span class="service-no">0${i+1}</span><h3>${text(s.title)}</h3><span class="service-price">${text(s.price)}</span></div>`).join("");
}
function openWork(i){
  const w=works[i]; if(!w)return;
  $("#modalBody").innerHTML=`${w.image?`<img src="${w.image}" alt="${text(w.title)}">`:""}<div class="work-cat">${w.category}</div><h2>${text(w.title)}</h2><p>${text(w.description)}</p>`;
  $("#modal").classList.add("open");$("#modal").setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
}
function closeModal(){$("#modal").classList.remove("open");$("#modal").setAttribute("aria-hidden","true");document.body.style.overflow=""}
function observeReveals(){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
}
function setTheme(){
  document.body.classList.toggle("light",theme==="light");
  $("#theme").textContent=theme==="light"?"☾":"☼";
  localStorage.setItem("mr-theme",theme);
}
$("#lang").onclick=()=>{lang=lang==="en"?"ar":"en";localStorage.setItem("mr-lang",lang);applyText();renderFilters();renderWorks();renderServices();observeReveals()};
$("#theme").onclick=()=>{theme=theme==="dark"?"light":"dark";setTheme()};
$("#menu").onclick=()=>$("#mobileNav").classList.toggle("open");
document.querySelectorAll("#mobileNav a").forEach(a=>a.onclick=()=>$("#mobileNav").classList.remove("open"));
$("#close").onclick=closeModal;$("#modal").onclick=e=>{if(e.target===e.currentTarget)closeModal()};
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
$("#whatsapp").href="https://wa.me/"+siteConfig.whatsapp;
$("#year").textContent=new Date().getFullYear();

if(matchMedia("(pointer:fine)").matches){
  const dot=$(".cursor-dot"),ring=$(".cursor-ring");let x=0,y=0,rx=0,ry=0;
  addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY;dot.style.left=x+"px";dot.style.top=y+"px"});
  function cursorLoop(){rx+=(x-rx)*.16;ry+=(y-ry)*.16;ring.style.left=rx+"px";ring.style.top=ry+"px";requestAnimationFrame(cursorLoop)}cursorLoop();
  document.addEventListener("mouseover",e=>{if(e.target.closest("a,button,.work"))ring.classList.add("hover")});
  document.addEventListener("mouseout",e=>{if(e.target.closest("a,button,.work"))ring.classList.remove("hover")});
}
applyText();setTheme();renderFilters();renderWorks();renderServices();observeReveals();
