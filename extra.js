/* extra.js : ajoute tout seul le CSS, l'icône, le manifest et les meta SEO, puis les fonctions en plus */
(function () {
  var h = document.head;
  function add(t, a) { var e = document.createElement(t); for (var k in a) e.setAttribute(k, a[k]); h.appendChild(e); }
  if (!document.querySelector('link[href="extra.css"]')) add("link", { rel: "stylesheet", href: "extra.css" });
  if (!document.querySelector('link[rel="icon"]')) add("link", { rel: "icon", href: "favicon.svg", type: "image/svg+xml" });
  if (!document.querySelector('link[rel="manifest"]')) add("link", { rel: "manifest", href: "site.webmanifest" });
  if (!document.querySelector('meta[name="theme-color"]')) add("meta", { name: "theme-color", content: "#165c38" });
  if (!document.querySelector('meta[name="description"]')) add("meta", { name: "description", content: "Dakhla Review : signalez les problèmes de propreté à Dakhla depuis votre téléphone et suivez-les jusqu’au nettoyage." });
})();

/* nav, progression, chiffres, mini-carte, FAQ, retour en haut */
(function () {
  var T = {
    fr: {
      title: "Dakhla Review — Connecter les citoyens et le terrain", top: "Haut de page",
      nav: ["Vision", "Démo", "Étapes", "Confidentialité", "FAQ"],
      st: ["gestes pour signaler", "étapes de suivi", "langues", "mot de passe"],
      faq: "Questions fréquentes",
      q: [
        ["L’application est-elle gratuite ?", "Oui, c’est une application gratuite pour les habitants de Dakhla."],
        ["Faut-il un mot de passe ?", "Non. Vous vous connectez avec un code à 6 chiffres reçu par e-mail, sans mot de passe ni numéro de carte d’identité."],
        ["Mon nom est-il visible ?", "Non. Les agents qui examinent les signalements ne voient pas votre nom."],
        ["Ma position est-elle suivie ?", "Non. Elle n’est utilisée qu’au moment de l’envoi, jamais en arrière-plan."],
        ["Que devient mon signalement si je supprime mon compte ?", "Il reste, sans rien qui vous identifie, pour être traité jusqu’au bout."]
      ]
    },
    en: {
      title: "Dakhla Review — Connecting citizens and the field", top: "Back to top",
      nav: ["Vision", "Demo", "Steps", "Privacy", "FAQ"],
      st: ["steps to report", "tracking stages", "languages", "password"],
      faq: "Frequently asked questions",
      q: [
        ["Is the app free?", "Yes, it is a free app for Dakhla residents."],
        ["Do I need a password?", "No. You sign in with a 6-digit code sent to your email: no password, no ID card number."],
        ["Is my name visible?", "No. Staff who review reports don’t see your name."],
        ["Is my location tracked?", "No. It is used only when you send a report, never in the background."],
        ["What happens to my reports if I delete my account?", "They stay, with nothing that identifies you, so they can be completed."]
      ]
    },
    ar: {
      title: "Dakhla Review — ربط المواطنين بالميدان", top: "العودة للأعلى",
      nav: ["الرؤية", "التجربة", "الخطوات", "الخصوصية", "أسئلة شائعة"],
      st: ["خطوات للتبليغ", "مراحل للتتبع", "لغات", "كلمة مرور"],
      faq: "أسئلة شائعة",
      q: [
        ["هل التطبيق مجاني؟", "نعم، تطبيق مجاني لسكان الداخلة."],
        ["هل أحتاج إلى كلمة مرور؟", "لا. الدخول برمز من 6 أرقام يصل إلى بريدك الإلكتروني، بلا كلمة مرور وبلا رقم بطاقة التعريف."],
        ["هل يظهر اسمي؟", "لا. من يراجع البلاغات لا يرى اسمك."],
        ["هل يتم تتبع موقعي؟", "لا. يُستعمل موقعك فقط عند إرسال البلاغ، ولا يُتتبَّع في الخلفية."],
        ["ماذا يحدث لبلاغاتي إذا حذفت حسابي؟", "تبقى دون أي معلومة تدل عليك، حتى تُكمَل معالجتها."]
      ]
    }
  };
  var IDS = ["vision", "demo-lab", "how", "privacy", "faq"];
  var NUMS = [3, 4, 3, 0];
  var $ = function (s) { return document.querySelector(s); };

  // ids manquants
  var S = document.querySelectorAll(".wrap > section");
  if (S[2]) S[2].id = "how";
  if (S[4]) S[4].id = "privacy";

  // barre de progression + bouton haut
  var bar = document.createElement("div"); bar.className = "pbar"; document.body.appendChild(bar);
  var top = document.createElement("button"); top.className = "to-top"; top.type = "button";
  top.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 4v14m0 0l-6-6m6 6l6-6"/></svg>';
  top.onclick = function () { window.scrollTo({ top: 0, behavior: "smooth" }); };
  document.body.appendChild(top);

  // nav
  var nav = document.createElement("nav"); nav.className = "nav-links";
  IDS.forEach(function (id) { var a = document.createElement("a"); a.href = "#" + id; nav.appendChild(a); });
  var head = $("header"); head.insertBefore(nav, head.querySelector(".controls"));

  // bande de chiffres
  var stats = document.createElement("div"); stats.className = "stats";
  NUMS.forEach(function () { stats.innerHTML += '<div class="stat"><b>0</b><span></span></div>'; });
  var hero = $(".hero"); hero.parentNode.insertBefore(stats, hero.nextSibling);
  var counted = false;
  function count() {
    counted = true;
    stats.querySelectorAll("b").forEach(function (b, i) {
      var n = NUMS[i], t0 = performance.now();
      (function f(t) {
        var p = Math.min((t - t0) / 900, 1);
        b.textContent = Math.round(n * p);
        if (p < 1) requestAnimationFrame(f);
      })(t0);
    });
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e, o) { if (e[0].isIntersecting && !counted) { count(); o.disconnect(); } }, { threshold: 0.4 }).observe(stats);
  } else { count(); }

  // FAQ
  var faq = document.createElement("section"); faq.id = "faq";
  faq.innerHTML = '<h2></h2><div class="faq"></div>';
  var dl = $("#download"); dl.parentNode.insertBefore(faq, dl);

  function apply() {
    var l = document.documentElement.lang; var d = T[l] || T.fr;
    document.title = d.title; top.setAttribute("aria-label", d.top);
    nav.querySelectorAll("a").forEach(function (a, i) { a.textContent = d.nav[i]; });
    stats.querySelectorAll("span").forEach(function (s, i) { s.textContent = d.st[i]; });
    faq.querySelector("h2").textContent = d.faq;
    faq.querySelector(".faq").innerHTML = d.q.map(function (x) {
      return "<details><summary>" + x[0] + "</summary><p>" + x[1] + "</p></details>";
    }).join("");
  }
  new MutationObserver(apply).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  apply();

  // scroll : progression, lien actif, bouton haut
  function onScroll() {
    var h = document.documentElement, y = window.scrollY, max = h.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    top.classList.toggle("show", y > 700);
    var cur = "";
    IDS.forEach(function (id) { var s = document.getElementById(id); if (s && s.getBoundingClientRect().top < 160) cur = id; });
    nav.querySelectorAll("a").forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + cur); });
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // mini-carte dans la vue Responsable
  function addMap() {
    if (simMode !== "authority") return;
    var p = document.querySelector("#sim-body .sim-panel"); if (!p) return;
    var d = D[document.documentElement.lang] || D.fr;
    var m = document.createElement("div"); m.className = "mini-map"; m.setAttribute("aria-hidden", "true");
    m.innerHTML = demoReports.map(function (r) {
      var x = 34 + ((r.id * 37) % 58), y = 14 + ((r.id * 53) % 66);
      return '<span class="pin ' + (r.resolved ? "done" : "open") + '" style="left:' + x + "%;top:" + y + '%"></span>';
    }).join("") +
      '<div class="map-legend"><span><i style="background:#d97706"></i>' + d.badge_open + '</span><span><i style="background:var(--g2)"></i>' + d.badge_done + "</span></div>";
    p.insertBefore(m, p.children[1]);
  }
  var r0 = renderSim;
  renderSim = function () { r0(); addMap(); };
  renderSim();
})();

/* langue auto, ticker, barre mobile, bloc partenaires, partage */
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var L = {
    fr: { pt: "Vous représentez une partie concernée ?", pp: "Dakhla Review fournit des signalements géolocalisés, structurés et classés par type de problème. Écrivez-nous pour en discuter.", pb: "Nous contacter", sub: "Dakhla Review — demande d’information", tk: "Signalez :", sh: "Partager l’application", ok: "Lien copié", ttl: "Dakhla Review" },
    en: { pt: "Do you represent a concerned party?", pp: "Dakhla Review provides geolocated, structured reports sorted by type of problem. Write to us to talk about it.", pb: "Contact us", sub: "Dakhla Review — information request", tk: "Report:", sh: "Share the app", ok: "Link copied", ttl: "Dakhla Review" },
    ar: { pt: "هل تمثل جهة معنية؟", pp: "يوفّر Dakhla Review بلاغات محددة جغرافياً ومنظمة ومصنفة حسب نوع المشكل. راسلنا لنتحدث عن ذلك.", pb: "تواصل معنا", sub: "Dakhla Review — طلب معلومات", tk: "بلّغ عن:", sh: "شارك التطبيق", ok: "تم نسخ الرابط", ttl: "Dakhla Review" }
  };
  var lang = function () { return L[document.documentElement.lang] ? document.documentElement.lang : "fr"; };
  var MAIL = "contact@example.com";

  // langue du navigateur à la première visite
  var saved = null; try { saved = localStorage.getItem("dr-lang"); } catch (e) {}
  if (!saved) { var nl = (navigator.language || "fr").slice(0, 2); if (L[nl] && nl !== "fr") setLang(nl); }

  // ticker dans le hero
  var tk = document.createElement("div"); tk.className = "ticker";
  tk.innerHTML = "<span></span><b></b>";
  var bd = $(".badges"); bd.parentNode.insertBefore(tk, bd.nextSibling);
  var ti = 0, tb = tk.querySelector("b");
  function tick() { var d = D[lang()]; tb.textContent = d.types[ti % d.types.length]; }
  setInterval(function () {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    tb.classList.add("out");
    setTimeout(function () { ti++; tick(); tb.classList.remove("out"); }, 300);
  }, 2200);

  // bloc partenaires (avant Télécharger)
  var pa = document.createElement("section"); pa.id = "partners"; pa.style.paddingTop = "10px";
  pa.innerHTML = '<div class="partner"><div><h2></h2><p></p></div><a class="btn alt"></a></div>';
  var dl = $("#download"); dl.parentNode.insertBefore(pa, dl);

  // bouton partager dans le CTA
  var sh = document.createElement("button"); sh.type = "button"; sh.className = "share";
  var last = dl.querySelector(".cta > p:last-child"); last.parentNode.appendChild(sh);
  sh.onclick = function () {
    var d = L[lang()], u = location.href.split("#")[0];
    if (navigator.share) { navigator.share({ title: d.ttl, url: u }).catch(function () {}); return; }
    try { navigator.clipboard.writeText(u).then(function () { sh.textContent = d.ok; setTimeout(txt, 1800); }); } catch (e) {}
  };

  // barre de téléchargement mobile
  var mb = document.createElement("div"); mb.className = "mbar";
  mb.innerHTML = '<a class="btn" href="#download"><svg class="i"><use href="#i-dl"/></svg><span></span></a>';
  document.body.appendChild(mb);
  addEventListener("scroll", function () {
    var r = dl.getBoundingClientRect();
    mb.classList.toggle("show", scrollY > 600 && r.top > innerHeight * 0.8);
  }, { passive: true });

  function txt() {
    var d = L[lang()];
    pa.querySelector("h2").textContent = d.pt;
    pa.querySelector("p").textContent = d.pp;
    var a = pa.querySelector("a"); a.textContent = d.pb;
    a.href = "mailto:" + MAIL + "?subject=" + encodeURIComponent(d.sub);
    tk.querySelector("span").textContent = d.tk; tick();
    sh.textContent = d.sh;
    mb.querySelector("span").textContent = D[lang()].dl_b;
  }
  new MutationObserver(txt).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  txt();
})();

/* lien de pied de page vers la page confidentialité */
(function () {
  var f = document.querySelector("footer"); if (!f) return;
  var N = { fr: "Confidentialité", en: "Privacy", ar: "الخصوصية" };
  var a = document.createElement("a"); a.href = "confidentialite.html"; a.style.cssText = "color:inherit;margin-inline-start:12px;font-weight:700";
  f.appendChild(a);
  function t() { a.textContent = "· " + (N[document.documentElement.lang] || N.fr); }
  new MutationObserver(t).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] }); t();
})();

/* lien d'évitement, flèches clavier, tracker au scroll, étapes↔téléphone, galerie */
(function () {
  var $ = function (s) { return document.querySelector(s); }, $$ = function (s) { return document.querySelectorAll(s); };
  var lang = function () { return document.documentElement.lang || "fr"; };
  var G = {
    fr: { skip: "Aller au contenu", h: "Aperçu de l’application", alt: "Capture d’écran de l’application" },
    en: { skip: "Skip to content", h: "App preview", alt: "App screenshot" },
    ar: { skip: "انتقل إلى المحتوى", h: "لمحة عن التطبيق", alt: "لقطة شاشة من التطبيق" }
  };
  var g = function () { return G[lang()] || G.fr; };

  // lien d'évitement
  var hr = $(".hero"), wrap = hr ? hr.parentNode : $("main");
  if (wrap && !wrap.id) wrap.id = "main";
  var sk = document.createElement("a"); sk.className = "skip"; sk.href = "#" + (wrap ? wrap.id : "vision");
  document.body.insertBefore(sk, document.body.firstChild);

  // flèches clavier sur les étapes de suivi
  var st = $("#stages");
  if (st) st.addEventListener("keydown", function (e) {
    var k = e.key; if (k !== "ArrowRight" && k !== "ArrowLeft") return;
    var b = Array.prototype.slice.call(st.children), i = b.indexOf(document.activeElement); if (i < 0) return;
    var rtl = document.documentElement.dir === "rtl", step = (k === "ArrowRight") !== rtl ? 1 : -1;
    var n = b[(i + step + b.length) % b.length]; n.focus(); n.click(); e.preventDefault();
  });

  // le suivi démarre quand la section devient visible
  var tr = $(".track");
  if (tr && "IntersectionObserver" in window) {
    var started = false;
    new IntersectionObserver(function (en, o) {
      if (en[0].isIntersecting && !started) { started = true; cur = 0; paint(); run(); o.disconnect(); }
    }, { threshold: 0.35 }).observe(tr);
  }

  // les étapes allument la bonne tuile du téléphone (photo, lieu, envoi)
  var tiles = [$(".pt.c"), $(".phone .pt.b:nth-child(5)"), $(".pt.w")];
  $$(".step").forEach(function (s, i) {
    function on() { tiles.forEach(function (t) { t && t.classList.remove("lit"); }); if (tiles[i]) tiles[i].classList.add("lit"); s.classList.add("hl"); }
    function off() { if (tiles[i]) tiles[i].classList.remove("lit"); s.classList.remove("hl"); }
    s.addEventListener("mouseenter", on); s.addEventListener("mouseleave", off);
    s.tabIndex = 0; s.addEventListener("focus", on); s.addEventListener("blur", off);
  });

  // galerie : s'affiche seulement si des captures existent dans /shots (1.png … 6.png)
  var found = [], pending = 6;
  for (var n = 1; n <= 6; n++) (function (n) {
    var im = new Image(); im.src = "shots/" + n + ".png";
    im.onload = function () { found[n] = im.src; done(); }; im.onerror = done;
  })(n);
  function done() {
    if (--pending) return;
    var list = found.filter(Boolean); if (!list.length) return;
    var s = document.createElement("section"); s.id = "apercu";
    s.innerHTML = '<h2></h2><div class="gal"></div>';
    s.querySelector(".gal").innerHTML = list.map(function (u) { return '<figure><img src="' + u + '" alt="" loading="lazy"></figure>'; }).join("");
    var how = document.getElementById("how"); how.parentNode.insertBefore(s, how.nextSibling);
    labels();
  }
  function labels() {
    var h = $("#apercu h2"); if (h) h.textContent = g().h;
    $$("#apercu img").forEach(function (i) { i.alt = g().alt; });
  }
  function all() { sk.textContent = g().skip; labels(); }
  new MutationObserver(all).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] }); all();
})();
