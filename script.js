const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let currentLang = localStorage.getItem("lang") || "en";

const translations = {
  en:{
    "nav.home":"Home","nav.categories":"Categories","nav.about":"About","nav.contact":"Contact",
    "hero.eyebrow":"Freelancer • Artist • Designer • Creator","hero.text":"I create visual work across art, design, branding, video and digital experiences.","hero.work":"Explore my work","hero.contact":"Contact me","scroll":"Scroll to explore",
    "intro.eyebrow":"One person. Many disciplines.","intro.title":"A portfolio built around making things.","intro.text":"From drawings and portraits to branding, thumbnails, game assets and video editing — this is a home for the work I create as a freelancer.",
    "categories.eyebrow":"Categories","categories.title":"What I do","categories.sub":"Choose a category to explore services and selected work.",
    "work.eyebrow":"Selected work","work.title":"Recent projects","work.all":"View all →",
    "about.eyebrow":"About me","about.title":"Freelancer, not a team.","about.text":"I'm Muhamad Ruhoma, a freelance creative working across multiple visual disciplines. I like learning, experimenting and turning ideas into finished pieces.",
    "services.eyebrow":"Services","services.title":"Available for projects","services.sub":"Services, offers and prices can be updated as the portfolio grows.",
    "contact.eyebrow":"Contact","contact.title":"Have an idea? Let's talk.","contact.text":"For commissions, freelance work or questions, contact me through one of the channels below.",
    "footer":"Built as a freelance portfolio."
  },
  ar:{
    "nav.home":"الرئيسية","nav.categories":"التصنيفات","nav.about":"عني","nav.contact":"تواصل",
    "hero.eyebrow":"فريلانسر • فنان • مصمم • صانع محتوى","hero.text":"أصنع أعمالًا بصرية في الرسم والتصميم والبراندنج والفيديو والتجارب الرقمية.","hero.work":"استكشف أعمالي","hero.contact":"تواصل معي","scroll":"اسحب للاستكشاف",
    "intro.eyebrow":"شخص واحد. مجالات كثيرة.","intro.title":"Portfolio مبني حول صناعة الأشياء.","intro.text":"من الرسم والبورتريه إلى البراندنج والثمبنيلز وأصول الألعاب والمونتاج — هنا مكان الأعمال التي أصنعها كفريلانسر.",
    "categories.eyebrow":"التصنيفات","categories.title":"ماذا أقدم؟","categories.sub":"اختر تصنيفًا لاستكشاف الخدمات وبعض الأعمال.",
    "work.eyebrow":"أعمال مختارة","work.title":"مشاريع مختارة","work.all":"عرض الكل ←",
    "about.eyebrow":"عني","about.title":"فريلانسر، مش تيم.","about.text":"أنا محمد رحومة، فريلانسر أعمل في مجالات بصرية متعددة. أحب التعلم والتجربة وتحويل الأفكار إلى أعمال مكتملة.",
    "services.eyebrow":"الخدمات","services.title":"متاح للمشاريع","services.sub":"يمكن تعديل الخدمات والعروض والأسعار مع نمو الـPortfolio.",
    "contact.eyebrow":"تواصل","contact.title":"عندك فكرة؟ لنتكلم.","contact.text":"للطلبات أو العمل الحر أو الاستفسارات، تواصل معي من خلال إحدى الوسائل التالية.",
    "footer":"موقع Portfolio للفريلانس."
  }
};

function render(){
  $("#categoryGrid").innerHTML = portfolioData.categories.map((c,i)=>`
    <article class="category-card" data-category="${c.name}">
      <span class="category-number">${c.icon}</span>
      <h3>${c.name}</h3><p>${c.desc}</p>
    </article>`).join("");

  $("#workGrid").innerHTML = portfolioData.projects.map((p,i)=>`
    <article class="work-card" data-project="${i}">
      <div class="work-image">${p.media ? `<img src="${p.media}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover">` : `<span>${String(i+1).padStart(2,"0")}</span>`}</div>
      <div class="work-info"><span>${p.category}</span><h3>${p.title}</h3></div>
    </article>`).join("");

  $("#serviceList").innerHTML = portfolioData.services.map((s,i)=>`
    <article class="service"><span class="service-num">${String(i+1).padStart(2,"0")}</span><div><h3>${s.title}</h3><p>${s.desc}</p></div><strong class="service-price">${s.price}</strong></article>`).join("");

  $("#contactLinks").innerHTML = portfolioData.contacts.map(c=>`<a class="contact-link" href="${c.url}" target="${c.url.startsWith("http") ? "_blank":"_self"}" rel="noopener">${c.icon} &nbsp; ${c.label}</a>`).join("");

  $$(".work-card").forEach(card=>card.addEventListener("click",()=>openProject(+card.dataset.project)));
  $$(".category-card").forEach(card=>card.addEventListener("click",()=>filterCategory(card.dataset.category)));
  $$(".reveal").forEach(el=>observer.observe(el));
}

function filterCategory(category){
  const cards=$$(".work-card");
  let found=false;
  cards.forEach(card=>{
    const p=portfolioData.projects[+card.dataset.project];
    const show=p.category===category;
    card.style.display=show?"block":"none"; if(show) found=true;
  });
  $("#categories").scrollIntoView({behavior:"smooth"});
  if(!found) $("#workGrid").innerHTML=`<div style="grid-column:1/-1;padding:50px 0;color:#777">No projects added to ${category} yet.</div>`;
}
function openProject(i){
  const p=portfolioData.projects[i];
  $("#modalCategory").textContent=p.category;
  $("#modalTitle").textContent=p.title;
  $("#modalDescription").textContent=p.description;
  $("#modalMedia").innerHTML=p.media ? `<div class="modal-media"><img src="${p.media}" alt="${p.title}" style="max-width:100%;max-height:70vh;object-fit:contain"></div>` : `<div class="modal-media"><span style="font:700 90px 'Space Grotesk';color:#333">${String(i+1).padStart(2,"0")}</span></div>`;
  $("#projectModal").classList.add("open"); $("#projectModal").setAttribute("aria-hidden","false");
}
function closeModal(){ $("#projectModal").classList.remove("open"); $("#projectModal").setAttribute("aria-hidden","true"); }
$$("[data-close-modal]").forEach(x=>x.addEventListener("click",closeModal));
$("#allWorkBtn").addEventListener("click",()=>{ $$(".work-card").forEach(c=>c.style.display="block"); $("#workGrid").innerHTML=portfolioData.projects.map((p,i)=>`
<article class="work-card" data-project="${i}"><div class="work-image">${p.media?`<img src="${p.media}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover">`:`<span>${String(i+1).padStart(2,"0")}</span>`}</div><div class="work-info"><span>${p.category}</span><h3>${p.title}</h3></div></article>`).join(""); $$(".work-card").forEach(c=>c.addEventListener("click",()=>openProject(+c.dataset.project))); $("#workGrid").scrollIntoView({behavior:"smooth"});});
$("#menuBtn").addEventListener("click",()=>{$("#mobileMenu").classList.add("open");$("#mobileMenu").setAttribute("aria-hidden","false")});
$("#menuClose").addEventListener("click",()=>{$("#mobileMenu").classList.remove("open");$("#mobileMenu").setAttribute("aria-hidden","true")});
$$(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>$("#mobileMenu").classList.remove("open")));

function setLang(lang){
  currentLang=lang; localStorage.setItem("lang",lang);
  document.documentElement.lang=lang; document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  $("[data-i18n]") && $$("[data-i18n]").forEach(el=>{const t=translations[lang][el.dataset.i18n];if(t)el.textContent=t});
  $("#langToggle").textContent=lang==="en"?"AR":"EN";
}
$("#langToggle").addEventListener("click",()=>setLang(currentLang==="en"?"ar":"en"));
$("#themeToggle").addEventListener("click",()=>{
  const light=document.body.classList.toggle("light");
  if(light){document.documentElement.style.setProperty("--bg","#f4f2ed");document.documentElement.style.setProperty("--surface","#fff");document.documentElement.style.setProperty("--surface2","#eee");document.documentElement.style.setProperty("--text","#111");document.documentElement.style.setProperty("--muted","#666");document.documentElement.style.setProperty("--line","rgba(0,0,0,.12)");}
  else{document.documentElement.style.setProperty("--bg","#080808");document.documentElement.style.setProperty("--surface","#111");document.documentElement.style.setProperty("--surface2","#171717");document.documentElement.style.setProperty("--text","#f4f2ed");document.documentElement.style.setProperty("--muted","#9c9a95");document.documentElement.style.setProperty("--line","rgba(255,255,255,.12)");}
});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.08});
window.addEventListener("mousemove",e=>{const d=$(".cursor-dot"),r=$(".cursor-ring"); if(d){d.style.left=e.clientX+"px";d.style.top=e.clientY+"px"} if(r){r.style.left=e.clientX+"px";r.style.top=e.clientY+"px"}});
document.addEventListener("DOMContentLoaded",()=>{render();setLang(currentLang);$("#year").textContent=new Date().getFullYear();});
