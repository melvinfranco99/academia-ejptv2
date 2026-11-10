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
    {g:"Ampliación opcional"},
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
    <a class="brand" href="${ROOT}index.html">🛡️ Academia <span>eJPTv2</span></a>
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

  // ---- VÍDEOS -------------------------------------------------------------
  // Vídeo principal verificado por módulo (yt) o búsqueda (q).
  const PRIMARY = {
    "modulos/como-estudiar.html":{q:"instalar kali linux virtualbox laboratorio hacking español",t:"Montar tu laboratorio de hacking paso a paso"},
    "modulos/00-fundamentos.html":{yt:"3Kq1MIfTWCE",t:"Curso completo de hacking ético para principiantes (freeCodeCamp · The Cyber Mentor)"},
    "modulos/01-redes.html":{yt:"p3vaaD9pn9I",t:"Redes para hackers: protocolos, puertos y TCP/IP (Hacker Joe)"},
    "modulos/02-linux.html":{q:"comandos linux terminal para hacking principiantes español",t:"Linux desde cero para pentesting"},
    "modulos/03-windows.html":{q:"powershell cmd para pentesting windows básico español",t:"Windows y PowerShell para pentesters"},
    "modulos/04-metodologia.html":{yt:"3Kq1MIfTWCE",t:"Fases de un test de penetración (curso completo)"},
    "modulos/05-reconocimiento.html":{q:"reconocimiento osint footprinting pentesting theharvester español",t:"Reconocimiento y OSINT"},
    "modulos/06-escaneo.html":{yt:"Xm8HTHxT7J0",t:"Nmap: tutorial y comandos para principiantes (Hack The Box)"},
    "modulos/07-enumeracion.html":{q:"enumeración servicios smb enum4linux pentesting español",t:"Enumeración de servicios"},
    "modulos/08-web.html":{yt:"cx6Xs3F_1Uc",t:"Inyección SQL para principiantes (Loi Liang Yang)"},
    "modulos/09-explotacion.html":{q:"metasploit para principiantes reverse shell español",t:"Explotación con Metasploit"},
    "modulos/10-passwords.html":{q:"crackear contraseñas john hashcat hydra tutorial español",t:"Ataques a contraseñas (John, Hashcat, Hydra)"},
    "modulos/11-postexplotacion.html":{yt:"zkzZnkxRP0A",t:"Escalada de privilegios en Linux (Red Team Series)"},
    "modulos/12-windows-privesc.html":{q:"windows privilege escalation winpeas tutorial beginners",t:"Escalada de privilegios en Windows"},
    "modulos/13-pivoting.html":{q:"pivoting proxychains chisel ligolo tutorial pentesting",t:"Pivoting a redes internas"},
    "modulos/14-active-directory.html":{q:"active directory pentesting bloodhound kerberoasting español",t:"Hacking de Active Directory"},
    "modulos/15-reportes.html":{q:"como escribir reporte pentest oscp report writing",t:"Cómo redactar el reporte"},
    "modulos/16-examen.html":{q:"eJPTv2 exam review tips como aprobar",t:"Cómo es el examen eJPTv2 y cómo aprobarlo"}
  };
  const ytSearch = q => "https://www.youtube.com/results?search_query="+encodeURIComponent(q);
  function facade(yt,title){
    const d=document.createElement("figure"); d.className="ytbox";
    d.innerHTML=`<div class="ytfacade" data-id="${yt}" role="button" tabindex="0" aria-label="Reproducir: ${title}">
        <img loading="lazy" src="https://i.ytimg.com/vi/${yt}/hqdefault.jpg" alt="">
        <span class="ytplay">▶</span></div>
      <figcaption>🎥 ${title} · <a href="https://www.youtube.com/watch?v=${yt}" target="_blank" rel="noopener">ver en YouTube</a></figcaption>`;
    const f=d.querySelector(".ytfacade");
    const load=()=>{ f.outerHTML=`<div class="ytframe"><iframe src="https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0" title="${title}" allow="accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`; };
    f.addEventListener("click",load); f.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")load();});
    return d;
  }
  function searchCard(q,title){
    const a=document.createElement("a"); a.className="ytcard"; a.href=ytSearch(q); a.target="_blank"; a.rel="noopener";
    a.innerHTML=`<span class="ytplay sm">▶</span><span><b>Vídeos sobre:</b> ${title}<br><small>Abre una búsqueda con los mejores vídeos actuales de este tema</small></span><span class="ytarrow">↗</span>`;
    return a;
  }
  if(main && idx>=0){
    const cur = pages[idx].u;
    // 1) vídeo principal tras la entradilla
    const prim = PRIMARY[cur];
    if(prim){
      const anchor = main.querySelector(".lead") || main.querySelector("h1");
      if(anchor){
        const block = prim.yt ? facade(prim.yt,prim.t) : (()=>{const w=document.createElement("div");w.appendChild(searchCard(prim.q,prim.t));return w;})();
        anchor.insertAdjacentElement("afterend", block);
      }
    }
    // 2) tarjeta de vídeo bajo cada sección (salvo meta-secciones)
    if(cur.startsWith("modulos/")){
      const topic = (document.title.split("· Academia")[0]||"").replace(/^\s*\d+\s*·\s*/,"").trim();
      const skip = /evaluaci|ejercici|v[ií]deos|pr[aá]ctica|soluci/i;
      main.querySelectorAll("h2").forEach(h=>{
        const t=h.textContent.replace(/^[\d.\s]+/,"").trim();
        if(skip.test(t)) return;
        const q = t+" "+topic+" pentesting tutorial";
        h.insertAdjacentElement("afterend", searchCard(q, t));
      });
    }
  }

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
