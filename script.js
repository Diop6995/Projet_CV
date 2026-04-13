// ===== STATE =====
let cvData = {
  format: 'two-col',
  prenom:'Jean', nom:'Dupont', titre:'Développeur Web Senior', email:'jean.dupont@email.com',
  tel:'+33 6 12 34 56 78', adresse:'Paris, France', linkedin:'linkedin.com/in/jean',
  bio:'Développeur passionné avec 5 ans d\'expérience dans la création d\'applications web modernes. Orienté résultats, j\'aime relever de nouveaux défis techniques.',
  photo: null, photoShape:'circle', photoPos:'left',
  experiences:[
    {id:1,poste:'Développeur Frontend Senior',entreprise:'TechCorp',debut:'2021',fin:'Présent',desc:'Développement d\'interfaces React, optimisation des performances, code review.'},
    {id:2,poste:'Développeur Full Stack',entreprise:'StartupXYZ',debut:'2019',fin:'2021',desc:'Création d\'une plateforme SaaS de A à Z avec Node.js et Vue.'},
  ],
  formations:[
    {id:1,diplome:'Master Informatique',ecole:'Université Paris Saclay',annee:'2019',desc:'Spécialisation en développement logiciel et architecture.'},
    {id:2,diplome:'Licence Informatique',ecole:'IUT Paris',annee:'2017',desc:''},
  ],
  skills:[
    {id:1,nom:'JavaScript',niveau:90},
    {id:2,nom:'React / Vue',niveau:85},
    {id:3,nom:'Node.js',niveau:80},
    {id:4,nom:'CSS / Tailwind',niveau:90},
  ],
  skillDisplay:'bar',
  langues:[
    {id:1,langue:'Français',niveau:'Natif'},
    {id:2,langue:'Anglais',niveau:'Courant'},
    {id:3,langue:'Espagnol',niveau:'Notions'},
  ],
  interests:'Voyage, Photographie, Musique, Lecture',
  projets:[
    {id:1,nom:'Portfolio Personnel',desc:'Site vitrine développé avec React et Three.js.',lien:'github.com/jean/portfolio'},
  ],
  certifications:[
    {id:1,nom:'AWS Certified Developer',organisme:'Amazon Web Services',date:'2022'},
  ],
  references:[],
  colors:{bg:'#ffffff','col-left':'#1e293b','col-right':'#ffffff',text:'#1e293b',subtitle:'#64748b','section-title':'#1e293b',name:'#1e293b',job:'#6c63ff',bar:'#6c63ff',accent:'#6c63ff'},
};
let idCounter = 100;

// ===== THEMES =====
const themes = [
  {name:'Indigo',colors:{bg:'#ffffff','col-left':'#1e293b','col-right':'#ffffff',text:'#1e293b',subtitle:'#64748b','section-title':'#1e293b',name:'#ffffff',job:'#818cf8',bar:'#6c63ff',accent:'#6c63ff'}},
  {name:'Dark',colors:{bg:'#1a1a2e','col-left':'#0f0f1a','col-right':'#1a1a2e',text:'#e2e8f0',subtitle:'#94a3b8','section-title':'#e2e8f0',name:'#f8fafc',job:'#a78bfa',bar:'#7c3aed',accent:'#7c3aed'}},
  {name:'Coral',colors:{bg:'#fff8f5','col-left':'#7f1d1d','col-right':'#fff8f5',text:'#1c1917',subtitle:'#78716c','section-title':'#1c1917',name:'#fef2f2',job:'#fca5a5',bar:'#ef4444',accent:'#ef4444'}},
  {name:'Ocean',colors:{bg:'#f0f9ff','col-left':'#0c4a6e','col-right':'#f0f9ff',text:'#0f172a',subtitle:'#475569','section-title':'#0f172a',name:'#f0f9ff',job:'#7dd3fc',bar:'#0284c7',accent:'#0284c7'}},
  {name:'Forest',colors:{bg:'#f0fdf4','col-left':'#14532d','col-right':'#f0fdf4',text:'#14532d',subtitle:'#6b7280','section-title':'#14532d',name:'#f0fdf4',job:'#86efac',bar:'#16a34a',accent:'#16a34a'}},
  {name:'Gold',colors:{bg:'#fffbeb','col-left':'#78350f','col-right':'#fffbeb',text:'#1c1917',subtitle:'#78716c','section-title':'#1c1917',name:'#fffbeb',job:'#fcd34d',bar:'#d97706',accent:'#d97706'}},
  {name:'Violet',colors:{bg:'#faf5ff','col-left':'#4c1d95','col-right':'#faf5ff',text:'#1e1b4b',subtitle:'#6b7280','section-title':'#1e1b4b',name:'#faf5ff',job:'#c4b5fd',bar:'#7c3aed',accent:'#7c3aed'}},
  {name:'Rose',colors:{bg:'#fff1f2','col-left':'#881337','col-right':'#fff1f2',text:'#1c1917',subtitle:'#9f1239','section-title':'#1c1917',name:'#fff1f2',job:'#fda4af',bar:'#e11d48',accent:'#e11d48'}},
  {name:'Slate',colors:{bg:'#f8fafc','col-left':'#1e293b','col-right':'#f8fafc',text:'#334155',subtitle:'#64748b','section-title':'#334155',name:'#f8fafc',job:'#94a3b8',bar:'#475569',accent:'#475569'}},
  {name:'Warm',colors:{bg:'#fdf8f0','col-left':'#451a03','col-right':'#fdf8f0',text:'#1c0a00',subtitle:'#92400e','section-title':'#1c0a00',name:'#fdf8f0',job:'#fbbf24',bar:'#b45309',accent:'#b45309'}},
];

function initThemeGrid(){
  const g = document.getElementById('theme-grid');
  g.innerHTML = themes.map((t,i)=>`
    <div class="theme-pill" style="background:linear-gradient(135deg,${t.colors['col-left']} 40%,${t.colors.bg} 40%)" title="${t.name}" onclick="applyTheme(${i})">
      <div class="theme-check">✓</div>
    </div>`).join('');
}

function applyTheme(i){
  const t = themes[i];
  cvData.colors = {...t.colors};
  Object.entries(t.colors).forEach(([k,v])=>{
    document.documentElement.style.setProperty(`--cv-${k}`,v);
    const inp = document.getElementById(`color-${k.replace('-','')}`)||document.getElementById(`color-${k}`);
    if(inp) inp.value=v;
  });
  // update all swatch backgrounds
  document.querySelectorAll('.color-swatch').forEach(sw=>{
    const inp = sw.querySelector('input[type=color]');
    if(inp) sw.style.background = inp.value;
  });
  document.querySelectorAll('.theme-pill').forEach((p,j)=>p.classList.toggle('active',j===i));
  renderCV();
  showToast('Thème "'+themes[i].name+'" appliqué');
}

function applyColor(varName, val){
  document.documentElement.style.setProperty(varName, val);
  const key = varName.replace('--cv-','');
  cvData.colors[key] = val;
  renderCV();
}

function updateSwatch(inp){
  inp.parentElement.style.background = inp.value;
}

// ===== PHOTO =====
function handlePhoto(input){
  const file = input.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    cvData.photo = e.target.result;
    document.getElementById('photo-thumb-img').src = cvData.photo;
    document.getElementById('photo-thumb-img').style.display = 'block';
    document.getElementById('photo-thumb-img').previousElementSibling && (document.getElementById('photo-thumb-img').previousElementSibling.style.display='none');
    renderCV();
  };
  reader.readAsDataURL(file);
}

// ===== TABS =====
function switchTab(name){
  document.querySelectorAll('.tab-btn').forEach((b,i)=>b.classList.toggle('active',['design','infos','parcours','skills','extras'][i]===name));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
}

// ===== SECTION CARDS =====
function toggleCard(header){
  header.parentElement.classList.toggle('open');
}

// ===== FORMAT =====
function setFormat(fmt){
  cvData.format = fmt;
  document.querySelectorAll('.fmt-pill').forEach((p,i)=>p.classList.toggle('active',['two-col','classic','modern'][i]===fmt));
  const cv = document.getElementById('cv-preview');
  cv.className = 'cv-'+fmt;
  renderCV();
}

// ===== ZOOM =====
function setZoom(v){
  document.getElementById('preview-wrapper').style.transform = `scale(${v/100})`;
  document.getElementById('zoom-label').textContent = v+'%';
}

// ===== DYNAMIC ITEMS =====
function addItem(type){
  const newId = ++idCounter;
  const data = {id:newId};
  if(type==='exp') cvData.experiences.push({...data,poste:'',entreprise:'',debut:'',fin:'',desc:''});
  if(type==='edu') cvData.formations.push({...data,diplome:'',ecole:'',annee:'',desc:''});
  if(type==='skill') cvData.skills.push({...data,nom:'',niveau:70});
  if(type==='lang') cvData.langues.push({...data,langue:'',niveau:'Courant'});
  if(type==='proj') cvData.projets.push({...data,nom:'',desc:'',lien:''});
  if(type==='cert') cvData.certifications.push({...data,nom:'',organisme:'',date:''});
  if(type==='ref') cvData.references.push({...data,nom:'',contact:''});
  renderItems();
  renderCV();
}

function removeItem(type,id){
  const map={exp:'experiences',edu:'formations',skill:'skills',lang:'langues',proj:'projets',cert:'certifications',ref:'references'};
  cvData[map[type]] = cvData[map[type]].filter(x=>x.id!==id);
  renderItems();
  renderCV();
}

function renderItems(){
  renderExpList();
  renderEduList();
  renderSkillList();
  renderLangList();
  renderProjList();
  renderCertList();
  renderRefList();
}

function itemField(type, id, field, val){
  const map={exp:'experiences',edu:'formations',skill:'skills',lang:'langues',proj:'projets',cert:'certifications',ref:'references'};
  const item = cvData[map[type]].find(x=>x.id===id);
  if(item) item[field]=val;
  renderCV();
}

function renderExpList(){
  document.getElementById('exp-list').innerHTML = cvData.experiences.map(e=>`
  <div class="item-block" data-id="${e.id}" data-type="exp">
    <div class="item-block-actions">
      <button class="icon-btn danger" onclick="removeItem('exp',${e.id})" title="Supprimer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Poste</label><input class="form-input" value="${e.poste}" placeholder="Poste" oninput="itemField('exp',${e.id},'poste',this.value)"></div>
      <div class="form-group"><label class="form-label">Entreprise</label><input class="form-input" value="${e.entreprise}" placeholder="Entreprise" oninput="itemField('exp',${e.id},'entreprise',this.value)"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Début</label><input class="form-input" value="${e.debut}" placeholder="2020" oninput="itemField('exp',${e.id},'debut',this.value)"></div>
      <div class="form-group"><label class="form-label">Fin</label><input class="form-input" value="${e.fin}" placeholder="Présent" oninput="itemField('exp',${e.id},'fin',this.value)"></div>
    </div>
    <div class="form-group"><label class="form-label">Description</label><textarea class="form-input" rows="2" oninput="itemField('exp',${e.id},'desc',this.value)">${e.desc}</textarea></div>
  </div>`).join('');
}

function renderEduList(){
  document.getElementById('edu-list').innerHTML = cvData.formations.map(e=>`
  <div class="item-block">
    <div class="item-block-actions">
      <button class="icon-btn danger" onclick="removeItem('edu',${e.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Diplôme</label><input class="form-input" value="${e.diplome}" placeholder="Master Info." oninput="itemField('edu',${e.id},'diplome',this.value)"></div>
      <div class="form-group"><label class="form-label">Année</label><input class="form-input" value="${e.annee}" placeholder="2020" oninput="itemField('edu',${e.id},'annee',this.value)"></div>
    </div>
    <div class="form-group"><label class="form-label">École</label><input class="form-input" value="${e.ecole}" placeholder="Université..." oninput="itemField('edu',${e.id},'ecole',this.value)"></div>
    <div class="form-group"><label class="form-label">Description</label><textarea class="form-input" rows="2" oninput="itemField('edu',${e.id},'desc',this.value)">${e.desc}</textarea></div>
  </div>`).join('');
}

function renderSkillList(){
  document.getElementById('skill-list').innerHTML = cvData.skills.map(s=>`
  <div class="item-block">
    <div class="item-block-actions">
      <button class="icon-btn danger" onclick="removeItem('skill',${s.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>
    </div>
    <div class="form-row">
      <div class="form-group" style="flex:2"><label class="form-label">Compétence</label><input class="form-input" value="${s.nom}" placeholder="JavaScript" oninput="itemField('skill',${s.id},'nom',this.value)"></div>
      <div class="form-group" style="flex:1"><label class="form-label">Niveau %</label><input class="form-input" type="number" min="0" max="100" value="${s.niveau}" oninput="itemField('skill',${s.id},'niveau',parseInt(this.value)||0)"></div>
    </div>
    <input type="range" min="0" max="100" value="${s.niveau}" oninput="itemField('skill',${s.id},'niveau',parseInt(this.value));this.previousElementSibling.querySelector('input[type=number]').value=this.value" style="width:100%;accent-color:var(--ui-accent)">
  </div>`).join('');
}

function renderLangList(){
  const niveaux=['Natif','Bilingue','Courant','Intermédiaire','Notions'];
  document.getElementById('lang-list').innerHTML = cvData.langues.map(l=>`
  <div class="item-block">
    <div class="item-block-actions">
      <button class="icon-btn danger" onclick="removeItem('lang',${l.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Langue</label><input class="form-input" value="${l.langue}" placeholder="Français" oninput="itemField('lang',${l.id},'langue',this.value)"></div>
      <div class="form-group"><label class="form-label">Niveau</label><select class="form-select" onchange="itemField('lang',${l.id},'niveau',this.value)">${niveaux.map(n=>`<option${l.niveau===n?' selected':''}>${n}</option>`).join('')}</select></div>
    </div>
  </div>`).join('');
}

function renderProjList(){
  document.getElementById('proj-list').innerHTML = cvData.projets.map(p=>`
  <div class="item-block">
    <div class="item-block-actions">
      <button class="icon-btn danger" onclick="removeItem('proj',${p.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>
    </div>
    <div class="form-group"><label class="form-label">Nom du projet</label><input class="form-input" value="${p.nom}" placeholder="Mon projet" oninput="itemField('proj',${p.id},'nom',this.value)"></div>
    <div class="form-group"><label class="form-label">Description</label><textarea class="form-input" rows="2" oninput="itemField('proj',${p.id},'desc',this.value)">${p.desc}</textarea></div>
    <div class="form-group"><label class="form-label">Lien</label><input class="form-input" value="${p.lien}" placeholder="github.com/..." oninput="itemField('proj',${p.id},'lien',this.value)"></div>
  </div>`).join('');
}

function renderCertList(){
  document.getElementById('cert-list').innerHTML = cvData.certifications.map(c=>`
  <div class="item-block">
    <div class="item-block-actions">
      <button class="icon-btn danger" onclick="removeItem('cert',${c.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>
    </div>
    <div class="form-group"><label class="form-label">Certification</label><input class="form-input" value="${c.nom}" placeholder="AWS Certified..." oninput="itemField('cert',${c.id},'nom',this.value)"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Organisme</label><input class="form-input" value="${c.organisme}" placeholder="Amazon..." oninput="itemField('cert',${c.id},'organisme',this.value)"></div>
      <div class="form-group"><label class="form-label">Date</label><input class="form-input" value="${c.date}" placeholder="2023" oninput="itemField('cert',${c.id},'date',this.value)"></div>
    </div>
  </div>`).join('');
}

function renderRefList(){
  document.getElementById('ref-list').innerHTML = cvData.references.map(r=>`
  <div class="item-block">
    <div class="item-block-actions">
      <button class="icon-btn danger" onclick="removeItem('ref',${r.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>
    </div>
    <div class="form-group"><label class="form-label">Nom</label><input class="form-input" value="${r.nom}" placeholder="Marie Martin" oninput="itemField('ref',${r.id},'nom',this.value)"></div>
    <div class="form-group"><label class="form-label">Contact</label><input class="form-input" value="${r.contact}" placeholder="Directrice @ Société" oninput="itemField('ref',${r.id},'contact',this.value)"></div>
  </div>`).join('');
}

// ===== SYNC FORM FIELDS =====
function syncFields(){
  const fields=['prenom','nom','titre','email','tel','adresse','linkedin','bio','interests'];
  fields.forEach(f=>{
    const el=document.getElementById('f-'+f);
    if(el) el.value = cvData[f]||'';
  });
  document.getElementById('skill-display').value = cvData.skillDisplay||'bar';
  document.getElementById('photo-shape').value = cvData.photoShape||'circle';
  document.getElementById('photo-position').value = cvData.photoPos||'left';
  if(cvData.photo){
    document.getElementById('photo-thumb-img').src=cvData.photo;
    document.getElementById('photo-thumb-img').style.display='block';
  }
  // sync colors
  const colorMap = {bg:'color-bg','col-left':'color-left','col-right':'color-right',text:'color-text',subtitle:'color-sub','section-title':'color-sec',name:'color-name',job:'color-job',bar:'color-bar',accent:'color-accent'};
  Object.entries(colorMap).forEach(([k,id])=>{
    const inp=document.getElementById(id);
    if(inp && cvData.colors[k]){inp.value=cvData.colors[k];inp.parentElement.style.background=cvData.colors[k]}
  });
}

function getFieldVal(id){return(document.getElementById(id)||{}).value||''}

// ===== RENDER CV =====
function renderCV(){
  // Read live form fields
  ['prenom','nom','titre','email','tel','adresse','linkedin','bio','interests'].forEach(f=>{
    cvData[f]=getFieldVal('f-'+f);
  });
  cvData.skillDisplay = getFieldVal('skill-display')||cvData.skillDisplay;
  cvData.photoShape = getFieldVal('photo-shape')||cvData.photoShape;
  cvData.photoPos = getFieldVal('photo-position')||cvData.photoPos;

  const fmt = cvData.format;
  if(fmt==='two-col') renderTwoCol();
  else if(fmt==='classic') renderClassic();
  else renderModern();

  autoSave();
}

function photoHTML(cls){
  if(!cvData.photo) return `<div class="${cls}"></div>`;
  const shape = cvData.photoShape;
  const rad = shape==='circle'?'50%':shape==='rounded'?'12px':'0';
  return `<div class="${cls} has-photo"><img src="${cvData.photo}" style="border-radius:${rad}"></div>`;
}

function skillRender(s, fmt){
  const pct = s.niveau||0;
  const display = cvData.skillDisplay;
  if(display==='bar'){
    if(fmt==='left'){
      return `<div class="cv-skill-row"><div class="cv-skill-name">${esc(s.nom)}<span>${pct}%</span></div><div class="cv-skill-bar-bg"><div class="cv-skill-bar-fill" style="width:${pct}%"></div></div></div>`;
    }
    return `<div class="cv-skill-row"><div class="cv-skill-name">${esc(s.nom)}<span>${pct}%</span></div><div class="cv-skill-bar-bg"><div class="cv-skill-bar-fill" style="width:${pct}%"></div></div></div>`;
  }
  if(display==='dots'){
    const filled = Math.round(pct/20);
    const dots = Array.from({length:5},(_, i)=>`<div class="cv-dot${i<filled?' filled':''}"></div>`).join('');
    return `<div class="cv-skill-row"><div class="cv-skill-name" style="display:flex;justify-content:space-between;align-items:center;">${esc(s.nom)}<div class="cv-skill-dots">${dots}</div></div></div>`;
  }
  if(display==='stars'){
    const filled = Math.round(pct/20);
    const stars = Array.from({length:5},(_, i)=>`<span style="color:${i<filled?'var(--cv-bar)':'rgba(128,128,128,0.3)'}">★</span>`).join('');
    return `<div class="cv-skill-row"><div style="display:flex;justify-content:space-between;align-items:center;font-size:.75rem;margin-bottom:6px;color:var(--cv-text)">${esc(s.nom)}<span style="font-size:.85rem">${stars}</span></div></div>`;
  }
  // chip
  return `<span class="cv-skill-chip">${esc(s.nom)}</span>`;
}

function esc(str){
  return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const icons={email:`<svg class="cv-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
phone:`<svg class="cv-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>`,
loc:`<svg class="cv-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
link:`<svg class="cv-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`};

// ===== RENDER FORMAT 1: TWO COL =====
function renderTwoCol(){
  const d = cvData;
  const left = `
    <div class="cv-left">
      ${photoHTML('cv-photo-wrap')}
      <div class="cv-header">
        <div class="cv-name">${esc(d.prenom)} ${esc(d.nom)}</div>
        <div class="cv-job">${esc(d.titre)}</div>
      </div>
      ${d.email||d.tel||d.adresse||d.linkedin?`
      <div class="cv-section-left">
        <div class="cv-sec-title">Contact</div>
        ${d.email?`<div class="cv-contact-item">${icons.email}${esc(d.email)}</div>`:''}
        ${d.tel?`<div class="cv-contact-item">${icons.phone}${esc(d.tel)}</div>`:''}
        ${d.adresse?`<div class="cv-contact-item">${icons.loc}${esc(d.adresse)}</div>`:''}
        ${d.linkedin?`<div class="cv-contact-item">${icons.link}${esc(d.linkedin)}</div>`:''}
      </div>`:''}
      ${d.skills.length?`
      <div class="cv-section-left">
        <div class="cv-sec-title">Compétences</div>
        ${d.skills.map(s=>skillRender(s,'left')).join('')}
      </div>`:''}
      ${d.langues.length?`
      <div class="cv-section-left">
        <div class="cv-sec-title">Langues</div>
        ${d.langues.map(l=>`<div class="cv-lang-row"><span>${esc(l.langue)}</span><span class="cv-lang-level">${esc(l.niveau)}</span></div>`).join('')}
      </div>`:''}
      ${d.interests?`
      <div class="cv-section-left">
        <div class="cv-sec-title">Intérêts</div>
        <div>${d.interests.split(',').map(t=>`<span class="cv-interest-tag">${esc(t.trim())}</span>`).join('')}</div>
      </div>`:''}
    </div>`;

  const right = `
    <div class="cv-right">
      ${d.bio?`
      <div class="cv-section-right">
        <div class="cv-sec-title-r">Profil</div>
        <p class="cv-profile-text">${esc(d.bio)}</p>
      </div>`:''}
      ${d.experiences.length?`
      <div class="cv-section-right">
        <div class="cv-sec-title-r">Expériences</div>
        ${d.experiences.map(e=>`<div class="cv-exp-item">
          <div class="cv-exp-head"><span class="cv-exp-title">${esc(e.poste)}</span><span class="cv-exp-date">${esc(e.debut)}${e.fin?' – '+esc(e.fin):''}</span></div>
          <div class="cv-exp-company">${esc(e.entreprise)}</div>
          ${e.desc?`<div class="cv-exp-desc">${esc(e.desc)}</div>`:''}
        </div>`).join('')}
      </div>`:''}
      ${d.formations.length?`
      <div class="cv-section-right">
        <div class="cv-sec-title-r">Formation</div>
        ${d.formations.map(e=>`<div class="cv-exp-item">
          <div class="cv-exp-head"><span class="cv-exp-title">${esc(e.diplome)}</span><span class="cv-exp-date">${esc(e.annee)}</span></div>
          <div class="cv-exp-company">${esc(e.ecole)}</div>
          ${e.desc?`<div class="cv-exp-desc">${esc(e.desc)}</div>`:''}
        </div>`).join('')}
      </div>`:''}
      ${d.projets.length?`
      <div class="cv-section-right">
        <div class="cv-sec-title-r">Projets</div>
        ${d.projets.map(p=>`<div class="cv-proj-item">
          <div class="cv-proj-name">${esc(p.nom)}</div>
          ${p.desc?`<div class="cv-proj-desc">${esc(p.desc)}</div>`:''}
          ${p.lien?`<span class="cv-proj-link">${esc(p.lien)}</span>`:''}
        </div>`).join('')}
      </div>`:''}
      ${d.certifications.length?`
      <div class="cv-section-right">
        <div class="cv-sec-title-r">Certifications</div>
        ${d.certifications.map(c=>`<div class="cv-cert-item">
          <div><div class="cv-cert-name">${esc(c.nom)}</div><div class="cv-cert-org">${esc(c.organisme)}</div></div>
          <span class="cv-cert-date">${esc(c.date)}</span>
        </div>`).join('')}
      </div>`:''}
      ${d.references.length?`
      <div class="cv-section-right">
        <div class="cv-sec-title-r">Références</div>
        ${d.references.map(r=>`<div class="cv-ref-item">
          <div class="cv-ref-name">${esc(r.nom)}</div>
          <div class="cv-ref-contact">${esc(r.contact)}</div>
        </div>`).join('')}
      </div>`:''}
    </div>`;

  document.getElementById('cv-inner').innerHTML = left + right;
}

// ===== RENDER FORMAT 2: CLASSIC =====
function renderClassic(){
  const d = cvData;
  const contacts = [d.email,d.tel,d.adresse,d.linkedin].filter(Boolean);
  const contactIcons=[icons.email,icons.phone,icons.loc,icons.link];
  const allContacts=[d.email,d.tel,d.adresse,d.linkedin];

  const html = `
    <div class="cv-header">
      ${photoHTML('cv-photo-wrap')}
      <div class="cv-header-info">
        <div class="cv-name">${esc(d.prenom)} ${esc(d.nom)}</div>
        <div class="cv-job">${esc(d.titre)}</div>
        <div class="cv-contact-bar">
          ${allContacts.map((c,i)=>c?`<span class="cv-contact-item">${contactIcons[i]}${esc(c)}</span>`:'').join('')}
        </div>
      </div>
    </div>
    ${d.bio?`<div class="cv-section"><div class="cv-sec-title">Profil</div><p class="cv-profile-text">${esc(d.bio)}</p></div>`:''}
    ${d.experiences.length?`
    <div class="cv-section">
      <div class="cv-sec-title">Expériences professionnelles</div>
      ${d.experiences.map((e,i)=>`<div class="cv-exp-item">
        <div class="cv-exp-timeline">
          <div class="cv-exp-date">${esc(e.debut)}<br>${e.fin?esc(e.fin):''}</div>
          <div class="cv-exp-dot"></div>
          ${i<d.experiences.length-1?'<div class="cv-exp-line"></div>':''}
        </div>
        <div class="cv-exp-body">
          <div class="cv-exp-title">${esc(e.poste)}</div>
          <div class="cv-exp-company">${esc(e.entreprise)}</div>
          ${e.desc?`<div class="cv-exp-desc">${esc(e.desc)}</div>`:''}
        </div>
      </div>`).join('')}
    </div>`:''}
    ${d.formations.length?`
    <div class="cv-section">
      <div class="cv-sec-title">Formation</div>
      ${d.formations.map((e,i)=>`<div class="cv-exp-item">
        <div class="cv-exp-timeline">
          <div class="cv-exp-date">${esc(e.annee)}</div>
          <div class="cv-exp-dot"></div>
          ${i<d.formations.length-1?'<div class="cv-exp-line"></div>':''}
        </div>
        <div class="cv-exp-body">
          <div class="cv-exp-title">${esc(e.diplome)}</div>
          <div class="cv-exp-company">${esc(e.ecole)}</div>
          ${e.desc?`<div class="cv-exp-desc">${esc(e.desc)}</div>`:''}
        </div>
      </div>`).join('')}
    </div>`:''}
    ${d.skills.length?`
    <div class="cv-section">
      <div class="cv-sec-title">Compétences</div>
      ${cvData.skillDisplay==='chip'?`<div class="cv-skills-grid">${d.skills.map(s=>`<span class="cv-skill-chip">${esc(s.nom)}</span>`).join('')}</div>`:d.skills.map(s=>skillRender(s,'right')).join('')}
    </div>`:''}
    ${d.langues.length||d.interests?`
    <div style="display:flex;gap:32px;flex-wrap:wrap">
      ${d.langues.length?`<div class="cv-section" style="flex:1;min-width:140px">
        <div class="cv-sec-title">Langues</div>
        ${d.langues.map(l=>`<div class="cv-lang-row">${icons.link}<span class="cv-lang-name">${esc(l.langue)}</span><span class="cv-lang-level">${esc(l.niveau)}</span></div>`).join('')}
      </div>`:''}
      ${d.interests?`<div class="cv-section" style="flex:1;min-width:140px">
        <div class="cv-sec-title">Intérêts</div>
        <div>${d.interests.split(',').map(t=>`<span class="cv-interest-tag">${esc(t.trim())}</span>`).join('')}</div>
      </div>`:''}
    </div>`:''}
    ${d.certifications.length?`
    <div class="cv-section">
      <div class="cv-sec-title">Certifications</div>
      ${d.certifications.map(c=>`<div class="cv-cert-item">
        <div class="cv-cert-left"><div class="cv-cert-name">${esc(c.nom)}</div><div class="cv-cert-org">${esc(c.organisme)}</div></div>
        <span class="cv-cert-date">${esc(c.date)}</span>
      </div>`).join('')}
    </div>`:''}
    ${d.projets.length?`
    <div class="cv-section">
      <div class="cv-sec-title">Projets</div>
      ${d.projets.map(p=>`<div class="cv-proj-item">
        <div class="cv-proj-name">${esc(p.nom)}</div>
        ${p.desc?`<div class="cv-proj-desc">${esc(p.desc)}</div>`:''}
        ${p.lien?`<span class="cv-proj-link">${esc(p.lien)}</span>`:''}
      </div>`).join('')}
    </div>`:''}
    ${d.references.length?`
    <div class="cv-section">
      <div class="cv-sec-title">Références</div>
      ${d.references.map(r=>`<div class="cv-ref-item">
        <div class="cv-ref-name">${esc(r.nom)}</div>
        <div class="cv-ref-contact">${esc(r.contact)}</div>
      </div>`).join('')}
    </div>`:''}
  `;
  document.getElementById('cv-inner').innerHTML = html;
}

// ===== RENDER FORMAT 3: MODERN =====
function renderModern(){
  const d = cvData;
  const contactIcons=[icons.email,icons.phone,icons.loc,icons.link];
  const allContacts=[d.email,d.tel,d.adresse,d.linkedin];

  const hero = `
    <div class="cv-hero">
      ${photoHTML('cv-photo-wrap')}
      <div class="cv-hero-info">
        <div class="cv-name">${esc(d.prenom)} ${esc(d.nom)}</div>
        <div class="cv-job">${esc(d.titre)}</div>
        <div class="cv-contact-bar">
          ${allContacts.map((c,i)=>c?`<span class="cv-contact-item">${contactIcons[i]}${esc(c)}</span>`:'').join('')}
        </div>
      </div>
    </div>`;

  const bodyLeft = `
    <div class="cv-body-left">
      ${d.skills.length?`
      <div>
        <div class="cv-sec-title-l">Compétences</div>
        ${d.skills.map(s=>skillRender(s,'left')).join('')}
      </div>`:''}
      ${d.langues.length?`
      <div>
        <div class="cv-sec-title-l">Langues</div>
        ${d.langues.map(l=>`<div class="cv-lang-item"><span class="cv-lang-name">${esc(l.langue)}</span><span class="cv-lang-lvl">${esc(l.niveau)}</span></div>`).join('')}
      </div>`:''}
      ${d.interests?`
      <div>
        <div class="cv-sec-title-l">Intérêts</div>
        <div>${d.interests.split(',').map(t=>`<span class="cv-interest-pill">${esc(t.trim())}</span>`).join('')}</div>
      </div>`:''}
      ${d.certifications.length?`
      <div>
        <div class="cv-sec-title-l">Certifications</div>
        ${d.certifications.map(c=>`<div class="cv-cert-item">
          <div class="cv-cert-dot"></div>
          <div><div class="cv-cert-name">${esc(c.nom)}</div><div class="cv-cert-sub">${esc(c.organisme)} · ${esc(c.date)}</div></div>
        </div>`).join('')}
      </div>`:''}
      ${d.references.length?`
      <div>
        <div class="cv-sec-title-l">Références</div>
        ${d.references.map(r=>`<div class="cv-ref-card">
          <div class="cv-ref-icon"></div>
          <div><div class="cv-ref-name">${esc(r.nom)}</div><div class="cv-ref-contact">${esc(r.contact)}</div></div>
        </div>`).join('')}
      </div>`:''}
    </div>`;

  const bodyRight = `
    <div class="cv-body-right">
      ${d.bio?`
      <div>
        <div class="cv-sec-title-r">Profil</div>
        <p class="cv-profile-text">${esc(d.bio)}</p>
      </div>`:''}
      ${d.experiences.length?`
      <div>
        <div class="cv-sec-title-r">Expériences</div>
        ${d.experiences.map(e=>`<div class="cv-exp-card">
          <div class="cv-exp-head"><span class="cv-exp-title">${esc(e.poste)}</span><span class="cv-exp-date">${esc(e.debut)}${e.fin?' – '+esc(e.fin):''}</span></div>
          <div class="cv-exp-company">${esc(e.entreprise)}</div>
          ${e.desc?`<div class="cv-exp-desc">${esc(e.desc)}</div>`:''}
        </div>`).join('')}
      </div>`:''}
      ${d.formations.length?`
      <div>
        <div class="cv-sec-title-r">Formation</div>
        ${d.formations.map(e=>`<div class="cv-exp-card">
          <div class="cv-exp-head"><span class="cv-exp-title">${esc(e.diplome)}</span><span class="cv-exp-date">${esc(e.annee)}</span></div>
          <div class="cv-exp-company">${esc(e.ecole)}</div>
          ${e.desc?`<div class="cv-exp-desc">${esc(e.desc)}</div>`:''}
        </div>`).join('')}
      </div>`:''}
      ${d.projets.length?`
      <div>
        <div class="cv-sec-title-r">Projets</div>
        ${d.projets.map(p=>`<div class="cv-proj-card">
          <div class="cv-proj-name">${esc(p.nom)}</div>
          ${p.desc?`<div class="cv-proj-desc">${esc(p.desc)}</div>`:''}
          ${p.lien?`<span class="cv-proj-link">${esc(p.lien)}</span>`:''}
        </div>`).join('')}
      </div>`:''}
    </div>`;

  document.getElementById('cv-inner').innerHTML = hero + `<div class="cv-body">${bodyLeft}${bodyRight}</div>`;
}

// ===== SAVE / LOAD =====
let saveTimer;
function autoSave(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(()=>localStorage.setItem('cvstudio_data',JSON.stringify(cvData)), 1000);
}

function saveData(){
  localStorage.setItem('cvstudio_data',JSON.stringify(cvData));
  showToast('✓ Sauvegardé avec succès','success');
}

function loadData(){
  try{
    const raw = localStorage.getItem('cvstudio_data');
    if(raw){
      const saved = JSON.parse(raw);
      Object.assign(cvData, saved);
    }
  } catch(e){}
}

// ===== PAYTECH PAYMENT =====
const PAYTECH_API_KEY    = '8bdfb049fbb96c7b431293a09c8790dae70d0f5776b4ab684b1bc1ce01d040b6';
const PAYTECH_API_SECRET = 'ac4447ae626765094c6727b776c3a459f24acc5216cc186a4e82a712be282afa';

function openWaveModal(){
  goToStep1();
  document.getElementById('wave-modal-overlay').classList.add('open');
}

function closeWaveModal(){
  document.getElementById('wave-modal-overlay').classList.remove('open');
}

function goToStep1(){
  document.getElementById('wm-step1').style.display = 'block';
  document.getElementById('wm-step2').style.display = 'none';
  document.getElementById('wm-step3').style.display = 'none';
}

function goToStep2(){
  document.getElementById('wm-step1').style.display = 'none';
  document.getElementById('wm-step2').style.display = 'block';
  document.getElementById('wm-step3').style.display = 'none';
}

function goToStep3(){
  document.getElementById('wm-step1').style.display = 'none';
  document.getElementById('wm-step2').style.display = 'none';
  document.getElementById('wm-step3').style.display = 'block';
}

async function initierPaiement(methodePaiement){
  goToStep2();

  const refCommande = 'CV_' + Date.now();

  const payload = {
    item_name:      'Téléchargement CV PDF - CV Studio',
    item_price:     500,
    currency:       'XOF',
    ref_command:    refCommande,
    command_name:   'CV Studio – Téléchargement PDF',
    env:            'prod',
    success_url:    window.location.href + '?payment=success&ref=' + refCommande,
    cancel_url:     window.location.href + '?payment=cancel',
    ipn_url:        window.location.href,
    target_payment: methodePaiement
  };

  try {
    const response = await fetch('https://paytech.sn/api/payment/request-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API_KEY':    PAYTECH_API_KEY,
        'API_SECRET': PAYTECH_API_SECRET
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if(result.success === 1 && result.redirect_url){
      // Rediriger vers la page de paiement PayTech
      window.location.href = result.redirect_url;
    } else {
      afficherErreur("Erreur PayTech : " + (result.message || JSON.stringify(result)));
    }
  } catch(err) {
    afficherErreur("Erreur réseau. Vérifiez votre connexion et réessayez.");
    console.error(err);
  }
}

function afficherErreur(msg){
  document.getElementById('wm-error-msg').innerHTML = msg.replace(/\n/g,'<br>');
  goToStep3();
}

// Vérifier si retour de PayTech après paiement
function verifierRetourPaiement(){
  const params = new URLSearchParams(window.location.search);
  if(params.get('payment') === 'success'){
    closeWaveModal();
    showToast('✓ Paiement confirmé ! Génération du PDF...', 'success');
    setTimeout(()=> doExportPDF(), 800);
    // Nettoyer l'URL
    window.history.replaceState({}, document.title, window.location.pathname);
  } else if(params.get('payment') === 'cancel'){
    showToast('Paiement annulé.', '');
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

// ===== EXPORT PDF =====
function exportPDF(){
  openWaveModal();
}

async function doExportPDF(){
  showToast('Génération du PDF...');
  const {jsPDF} = window.jspdf;
  const preview = document.getElementById('cv-preview');
  try{
    const canvas = await html2canvas(preview, {scale:2, useCORS:true, allowTaint:true, backgroundColor:'#ffffff'});
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height / canvas.width) * w;
    pdf.addImage(imgData,'PNG',0,0,w,h);
    pdf.save(`CV_${cvData.prenom||'CV'}_${cvData.nom||''}.pdf`);
    showToast('✓ PDF téléchargé !','success');
  } catch(e){
    showToast('Erreur lors de la génération');
    console.error(e);
  }
}

// ===== TOAST =====
function showToast(msg, type=''){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.className='show'+(type?' '+type:'');
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>t.className='',2500);
}

// ===== SIDEBAR TOGGLE (mobile) =====
function toggleSidebar(){
  const sb=document.getElementById('sidebar');
  sb.style.display = sb.style.display==='none'?'flex':'none';
}

// ===== INIT =====
function init(){
  loadData();
  // Apply saved colors
  if(cvData.colors){
    Object.entries(cvData.colors).forEach(([k,v])=>{
      document.documentElement.style.setProperty(`--cv-${k}`,v);
    });
  }
  initThemeGrid();
  syncFields();
  renderItems();
  setFormat(cvData.format||'two-col');
  verifierRetourPaiement();
}

// Print styles
const printStyle=document.createElement('style');
printStyle.textContent=`@media print{#topbar,#sidebar,.zoom-bar{display:none!important}#preview-area{padding:0!important;background:white!important}#preview-wrapper{transform:none!important}#cv-preview{box-shadow:none!important}}`;
document.head.appendChild(printStyle);

window.addEventListener('DOMContentLoaded', init);