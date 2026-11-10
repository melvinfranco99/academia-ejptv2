/* Academia eJPTv2 → OSCP · lógica compartida */
(function(){
  const ROOT = document.documentElement.dataset.root || "";
  const MODS = [
    {g:"Empieza aquí"},
    {u:"index.html",t:"🏠 Inicio y ruta"},
    {u:"modulos/como-estudiar.html",t:"🧭 Cómo usar esta web + laboratorio"},
    {g:"Nivel 0 · Bases"},
    {u:"modulos/00-fundamentos.html",t:"00 · Informática desde cero"},
    {u:"modulos/01-redes.html",t:"01 · Redes (TCP/IP, OSI, IPs)"},
    {u:"modulos/02-linux.html",t:"02 · Linux para pentesters"},
    {u:"modulos/03-windows.html",t:"03 · Windows para pentesters"},
    {g:"Nivel 1 · eJPTv2"},
    {u:"modulos/04-metodologia.html",t:"04 · Metodología y ética"},
    {u:"modulos/05-reconocimiento.html",t:"05 · Reconocimiento pasivo"},
    {u:"modulos/06-escaneo.html",t:"06 · Escaneo con Nmap"},
    {u:"modulos/07-enumeracion.html",t:"07 · Enumeración de servicios"},
    {u:"modulos/08-web.html",t:"08 · Ataques web"},
    {u:"modulos/09-explotacion.html",t:"09 · Explotación y Metasploit"},
    {u:"modulos/10-passwords.html",t:"10 · Contraseñas y hashes"},
    {u:"modulos/11-postexplotacion.html",t:"11 · Post-explotación y privesc Linux"},
    {u:"modulos/12-windows-privesc.html",t:"12 · Privesc Windows"},
    {u:"modulos/13-pivoting.html",t:"13 · Pivoting"},
    {g:"Nivel 2 · Hacia OSCP"},
    {u:"modulos/14-active-directory.html",t:"14 · Active Directory"},
    {u:"modulos/15-reportes.html",t:"15 · Cómo escribir el reporte"},
    {u:"modulos/16-examen.html",t:"16 · Estrategia de examen"},
    {g:"Recursos"},
    {u:"glosario.html",t:"📖 Glosario (200+ términos)"},
    {u:"cheatsheet.html",t:"⚡ Chuleta de comandos"},
    {u:"examen-final.html",t:"🎯 Simulacro final"},
    {u:"laboratorios.html",t:"🧪 Laboratorios guiados"},
  ];
  const here = location.pathname.replace(/\/$/,"/index.html");
  const isActive = u => here.endsWith("/"+u) || (u==="index.html" && /\/(index\.html)?$/.test(location.pathname) && !location.pathname.includes("/modulos/"));
  const done = JSON.parse(safeGet("done")||"{}");

  function safeGet(k){try{return localStorage.getItem("ejpt_"+k)}catch(e){return null}}
  function safeSet(k,v){try{localStorage.setItem("ejpt_"+k,v)}catch(e){}}

  // theme
  const th = safeGet("theme"); if(th) document.documentElement.dataset.theme = th;

  // topbar + sidebar
  const top = document.createElement("header");
  top.className="topbar";
  top.innerHTML = `<button class="btn-icon" id="menuBtn" aria-label="Menú">☰</button>
    <a class="brand" href="${ROOT}index.html">🛡️ Academia <span>eJPTv2</span> → OSCP</a>
    <div class="spacer"></div>
    <a class="btn-icon" href="${ROOT}glosario.html" style="text-decoration:none">📖 Glosario</a>
    <button class="btn-icon" id="themeBtn" aria-label="Tema">🌓</button>`;
  document.body.prepend(top);
  const side = document.querySelector(".sidebar");
  if(side){
    side.innerHTML = MODS.map(m=> m.g ? `<h4>${m.g}</h4>` :
      `<a href="${ROOT}${m.u}" class="${isActive(m.u)?"active":""}">${m.t}${done[m.u]?'<span class="done">✔</span>':""}</a>`).join("");
  }
  document.getElementById("menuBtn").onclick=()=>side&&side.classList.toggle("open");
  document.getElementById("themeBtn").onclick=()=>{
    const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
    const nx = cur==="dark"?"light":"dark"; document.documentElement.dataset.theme=nx; safeSet("theme",nx);
  };

  // pager + mark done
  const pages = MODS.filter(m=>m.u);
  const idx = pages.findIndex(m=>isActive(m.u));
  const main = document.querySelector("main");
  if(main && idx>=0 && pages[idx].u.startsWith("modulos/")){
    const md = document.createElement("div"); md.className="mark-done";
    const key = pages[idx].u;
    md.innerHTML = `<button class="btn ${done[key]?"sec":""}" id="doneBtn">${done[key]?"✔ Tema completado (pulsa para desmarcar)":"Marcar tema como completado"}</button>`;
    main.appendChild(md);
    md.querySelector("button").onclick=()=>{ if(done[key]) delete done[key]; else done[key]=1; safeSet("done",JSON.stringify(done)); location.reload(); };
  }
  if(main && idx>=0){
    const p = pages[idx-1], n = pages[idx+1];
    const pg = document.createElement("nav"); pg.className="pager";
    pg.innerHTML = (p?`<a href="${ROOT}${p.u}"><small>← Anterior</small>${p.t}</a>`:"<span></span>")+
                   (n?`<a href="${ROOT}${n.u}" style="text-align:right"><small>Siguiente →</small>${n.t}</a>`:"");
    main.appendChild(pg);
  }

  // progress on home
  const bar = document.getElementById("progressBar");
  if(bar){
    const total = pages.filter(m=>m.u.startsWith("modulos/")).length;
    const n = Object.keys(done).length;
    bar.style.width = Math.round(n/total*100)+"%";
    const lbl = document.getElementById("progressLbl"); if(lbl) lbl.textContent = `${n} de ${total} temas completados`;
  }

  // TOC
  const toc = document.querySelector(".toc");
  if(toc && main){
    const hs = main.querySelectorAll("h2");
    let html = "<b>En esta página</b>";
    hs.forEach((h,i)=>{ if(!h.id) h.id="s"+i; html += `<a href="#${h.id}">${h.textContent}</a>`; });
    toc.innerHTML = html;
  }

  // copy buttons
  document.querySelectorAll("pre").forEach(pre=>{
    const b = document.createElement("button"); b.className="copy"; b.textContent="Copiar";
    b.onclick=()=>{
      const txt = pre.innerText.replace(/^Copiar\n?/,"").replace(/\nCopiar$/,"");
      navigator.clipboard && navigator.clipboard.writeText(pre.dataset.copy || txt.replace(/Copiar$/,"").trim()).then(()=>{b.textContent="¡Copiado!";setTimeout(()=>b.textContent="Copiar",1300)});
    };
    pre.appendChild(b);
  });

  // quizzes: <script type="application/json" data-quiz="Título">[{q,o:[],a,e}]</script>
  document.querySelectorAll('script[data-quiz]').forEach((s,qi)=>{
    let data; try{data=JSON.parse(s.textContent)}catch(e){console.error("quiz",e);return}
    const box = document.createElement("div"); box.className="quiz";
    box.innerHTML = `<h3>📝 ${s.dataset.quiz}</h3><p class="lead" style="font-size:.92rem">Elige una respuesta en cada pregunta. Verás la corrección y la explicación al momento.</p>`;
    let score=0, answered=0;
    data.forEach((it,i)=>{
      const q = document.createElement("div"); q.className="q";
      q.innerHTML = `<p class="qt">${i+1}. ${it.q}</p>` + it.o.map((o,j)=>
        `<label><input type="radio" name="q${qi}_${i}" value="${j}">${o}</label>`).join("") +
        `<div class="exp"></div>`;
      q.querySelectorAll("input").forEach(inp=>inp.onchange=()=>{
        if(q.classList.contains("answered")) return;
        q.classList.add("answered"); answered++;
        const v=+inp.value, labels=q.querySelectorAll("label");
        labels[it.a].classList.add("ok");
        if(v===it.a){score++} else labels[v].classList.add("bad");
        q.querySelectorAll("input").forEach(x=>x.disabled=true);
        q.querySelector(".exp").innerHTML = (v===it.a?"✅ <b>¡Correcto!</b> ":"❌ <b>Incorrecto.</b> ")+ (it.e||"");
        res.textContent = `Puntuación: ${score} / ${data.length}` + (answered===data.length ? (score/data.length>=.7?"  🎉 ¡Aprobado! (≥70%)":"  🔁 Repasa el tema y vuelve a intentarlo") : "");
      });
      box.appendChild(q);
    });
    const res = document.createElement("div"); res.className="result"; box.appendChild(res);
    const rb = document.createElement("button"); rb.className="btn sec"; rb.textContent="🔄 Reiniciar cuestionario"; rb.style.marginTop="10px";
    rb.onclick=()=>{box.querySelectorAll(".q").forEach(q=>{q.classList.remove("answered");q.querySelectorAll("input").forEach(x=>{x.disabled=false;x.checked=false});q.querySelectorAll("label").forEach(l=>l.className="")});score=0;answered=0;res.textContent="";};
    box.appendChild(rb);
    s.after(box);
  });
})();
