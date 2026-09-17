const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
let lang=localStorage.getItem('mr-lang')||'en'; let active='all';
const t={en:{work:'Selected work',services:'Services'},ar:{work:'أعمال مختارة',services:'الخدمات'}};
function catName(id){const c=PORTFOLIO.categories.find(x=>x.id===id);return c?(lang==='ar'?c.ar:c.en):id}
function renderFilters(){
  $('#filters').innerHTML=PORTFOLIO.categories.map(c=>`<button class="filter ${c.id===active?'active':''}" data-cat="${c.id}">${lang==='ar'?c.ar:c.en}</button>`).join('');
  $$('.filter').forEach(b=>b.onclick=()=>{active=b.dataset.cat;renderFilters();renderWorks()});
}
function renderWorks(){
  const list=active==='all'?PORTFOLIO.works:PORTFOLIO.works.filter(w=>w.category===active);
  $('#workGrid').innerHTML=list.map((w,i)=>`<article class="work-card reveal-in" data-i="${PORTFOLIO.works.indexOf(w)}"><div class="work-image"><img src="${w.image}" alt="${w.title}" loading="lazy"><span>↗</span></div><div class="work-meta"><div><small>${catName(w.category)}</small><h3>${w.title}</h3></div><b>${String(i+1).padStart(2,'0')}</b></div></article>`).join('') || '<p class="empty">No work in this category yet.</p>';
  $$('.work-card').forEach(c=>c.onclick=()=>openModal(PORTFOLIO.works[+c.dataset.i]));
}
function renderServices(){ $('#servicesGrid').innerHTML=PORTFOLIO.services.map((s,i)=>`<article class="service"><span>${String(i+1).padStart(2,'0')}</span><h3>${s.name}</h3><p>${s.text}</p><a href="#contact">Request service ↘</a></article>`).join('') }
function renderSkills(){ $('#skills').innerHTML=PORTFOLIO.skills.map(x=>`<span>${x}</span>`).join('') }
function renderContacts(){ $('#contacts').innerHTML=PORTFOLIO.contacts.map(c=>`<a class="contact-item" href="${c.href}" target="${c.href.startsWith('http')?'_blank':'_self'}" rel="noreferrer"><span>${c.label}</span><b>${c.value}</b><i>↗</i></a>`).join('') }
function openModal(w){$('#modalCat').textContent=catName(w.category)+' / '+w.type;$('#modalTitle').textContent=w.title;$('#modalDesc').textContent=w.description;$('#modalImage').innerHTML=`<img src="${w.image}" alt="${w.title}">`;$('#modalLink').style.display=w.link?'inline-flex':'none';if(w.link)$('#modalLink').href=w.link;$('#modal').classList.add('open');document.body.classList.add('locked')}
function closeModal(){$('#modal').classList.remove('open');document.body.classList.remove('locked')}
function setLang(){document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';$('#lang').textContent=lang==='en'?'AR':'EN';localStorage.setItem('mr-lang',lang)}
$('#lang').onclick=()=>{lang=lang==='en'?'ar':'en';setLang();renderFilters();renderWorks()};
$('#theme').onclick=()=>{document.body.classList.toggle('light');localStorage.setItem('mr-theme',document.body.classList.contains('light')?'light':'dark')};
if(localStorage.getItem('mr-theme')==='light')document.body.classList.add('light');
$('#menu').onclick=()=>$('#nav').classList.toggle('open');$$('#nav a').forEach(a=>a.onclick=()=>$('#nav').classList.remove('open'));$$('[data-close]').forEach(x=>x.onclick=closeModal);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
$('#year').textContent=new Date().getFullYear();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.08});$$('.reveal').forEach(x=>io.observe(x));
setLang();renderFilters();renderWorks();renderServices();renderSkills();renderContacts();
