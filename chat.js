/* Price Gram — المحادثة (يتحمّل من الصفحة، ويشتغل داخل التطبيق بس) */
(function () {
  "use strict";
  var A = window.Android;
  if (!A || !A.get) return;

  var ADMIN = "s8AMLzjwJkRd3VQeORgR1wkt4gi1";
  var ROOM = "gram";
  var V = "10.12.2";
  var CFG = { apiKey: "AIzaSyDoT42mdZUl6VIaPYOYolnlpJtOZf93n7E", authDomain: "price-gram.firebaseapp.com", projectId: "price-gram" };

  /* ---------- icons ---------- */
  var I = {
    chat: '\x3csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\x3cpath d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>\x3c/svg>',
    back: '\x3csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">\x3cpath d="M9 6l6 6-6 6"/>\x3c/svg>',
    send: '\x3csvg viewBox="0 0 24 24" fill="currentColor">\x3cpath d="M3.4 20.4l17.4-7.5a1 1 0 0 0 0-1.8L3.4 3.6a1 1 0 0 0-1.4 1.2L4.3 12l-2.3 7.2a1 1 0 0 0 1.4 1.2z" transform="scale(-1,1) translate(-24,0)"/>\x3c/svg>',
    price: '\x3csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\x3cpath d="M3 17l6-6 4 4 8-8"/>\x3cpath d="M15 7h6v6"/>\x3c/svg>',
    close: '\x3csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">\x3cpath d="M6 6l12 12M18 6L6 18"/>\x3c/svg>',
    reply: '\x3csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\x3cpath d="M14 9l5 5-5 5"/>\x3cpath d="M19 14H10a6 6 0 0 1-6-6V5"/>\x3c/svg>',
    copy: '\x3csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\x3crect x="9" y="9" width="11" height="11" rx="2"/>\x3cpath d="M5 15V6a2 2 0 0 1 2-2h9"/>\x3c/svg>',
    user: '\x3csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\x3ccircle cx="12" cy="8" r="4"/>\x3cpath d="M4 21a8 8 0 0 1 16 0"/>\x3c/svg>',
    trash: '\x3csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\x3cpath d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>\x3c/svg>',
    ban: '\x3csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\x3ccircle cx="12" cy="12" r="9"/>\x3cpath d="M5.6 5.6l12.8 12.8"/>\x3c/svg>',
    edit: '\x3csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\x3cpath d="M4 20h4L19 9l-4-4L4 16v4z"/>\x3c/svg>',
    cam: '\x3csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\x3cpath d="M4 8h3l2-3h6l2 3h3v11H4z"/>\x3ccircle cx="12" cy="13" r="3.5"/>\x3c/svg>'
  };

  var BADGE = '\x3csvg class="pc-vb" viewBox="0 0 24 24" aria-label="موثّق">\x3cpath fill="#1d9bf0" stroke="#fff" stroke-width="1.2" d="M12 1.6l2.5 1.9 3.1-.2 1 3 2.6 1.7-.9 3 .9 3-2.6 1.7-1 3-3.1-.2L12 22.4l-2.5-1.9-3.1.2-1-3-2.6-1.7.9-3-.9-3 2.6-1.7 1-3 3.1.2z"/>\x3cpath fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M8 12.3l2.7 2.7L16.2 9.4"/>\x3c/svg>';
  function vname(uid, name) { return esc(name) + (uid === ADMIN ? BADGE : ""); }

  /* ---------- styles ---------- */
  var css = document.createElement("style");
  css.textContent = [
    ".pc{position:fixed;inset:0;z-index:60;display:flex;flex-direction:column;background:linear-gradient(180deg,#2b95f2 0%,#1f6fdc 45%,#1546b8 100%);color:#fff;font-family:var(--font)}",
    "html[data-theme=dark] .pc{background:linear-gradient(180deg,#14203a 0%,#0b1222 45%,#070b14 100%)}",
    ".pc *{box-sizing:border-box}",
    ".pc-h{display:flex;align-items:center;gap:10px;padding:calc(env(safe-area-inset-top,0px) + 12px) 12px 12px;border-bottom:1px solid rgba(255,255,255,.16)}",
    ".pc-ib{width:40px;height:40px;flex:none;border-radius:50%;border:0;background:rgba(255,255,255,.16);color:#fff;display:grid;place-items:center;cursor:pointer}",
    ".pc-ib svg{width:20px;height:20px}",
    ".pc-ttl{flex:1;min-width:0;display:flex;align-items:center;gap:10px;cursor:pointer}",
    ".pc-ttl b{display:block;font-size:17px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".pc-ttl span{display:block;font-size:13px;color:rgba(255,255,255,.75)}",
    ".pc-av{width:44px;height:44px;flex:none;border-radius:50%;background:rgba(255,255,255,.22);display:grid;place-items:center;font-weight:700;font-size:18px;overflow:hidden;color:#fff}",
    ".pc-av img{width:100%;height:100%;object-fit:cover}",
    ".pc-av.big{width:96px;height:96px;font-size:38px}",
    ".pc-vb{width:1.15em;height:1.15em;vertical-align:-.2em;margin-right:4px;display:inline-block}",
    ".pc-av.sm{width:34px;height:34px;font-size:14px;cursor:pointer}",
    ".pc-row{display:flex;align-items:flex-end;gap:6px;max-width:88%;align-self:flex-end;flex-direction:row-reverse}",
    ".pc-row.mine{align-self:flex-start;flex-direction:row}",
    ".pc-row .pc-m{max-width:100%;align-self:auto}",
    ".pc-row .sp{width:34px;flex:none}",
    ".pc-pin{margin:10px 12px 0;display:flex;align-items:center;justify-content:space-between;gap:8px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:14px;padding:9px 14px;font-size:14px}",
    ".pc-pin b{font-size:17px;direction:ltr}",
    ".pc-pin i{font-style:normal;font-weight:600;direction:ltr}",
    ".pc-list{flex:1;overflow-y:auto;padding:12px 12px 8px;display:flex;flex-direction:column;gap:8px;-webkit-overflow-scrolling:touch}",
    ".pc-m{max-width:82%;padding:8px 12px 6px;border-radius:18px;font-size:16px;line-height:1.6;word-wrap:break-word;white-space:pre-wrap;user-select:none;-webkit-user-select:none;align-self:flex-start;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.18);border-bottom-left-radius:6px}",
    "html[data-theme=dark] .pc-m{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.1)}",
    ".pc-m.me{background:#fff;color:#123a8f;border:0;border-bottom-left-radius:18px;border-bottom-right-radius:6px}",
    "html[data-theme=dark] .pc-m.me{background:#2b6fd6;color:#fff}",
    ".pc-m .n{font-size:13px;font-weight:600;color:#bfe0ff;margin-bottom:1px;cursor:pointer}",
    ".pc-m .t{font-size:11px;opacity:.65;direction:ltr;text-align:left;margin-top:2px}",
    ".pc-m a{color:inherit;text-decoration:underline}",
    ".pc-q{border-right:3px solid #8fd0ff;background:rgba(0,0,0,.12);padding:4px 8px;border-radius:8px;font-size:13px;margin-bottom:4px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}",
    ".pc-m.me .pc-q{background:#e8f1ff;border-color:#1f6fdc;color:#1f4a9c}",
    "html[data-theme=dark] .pc-m.me .pc-q{background:rgba(0,0,0,.18);color:#fff}",
    ".pc-card{display:flex;align-items:center;justify-content:space-between;gap:12px;background:rgba(0,0,0,.14);border-radius:12px;padding:8px 12px;margin:2px 0}",
    ".pc-m.me .pc-card{background:#eaf2ff}",
    "html[data-theme=dark] .pc-m.me .pc-card{background:rgba(0,0,0,.18)}",
    ".pc-card b{font-size:20px;direction:ltr}.pc-card i{font-style:normal;font-weight:600;direction:ltr}",
    ".pc-day{align-self:center;font-size:12px;background:rgba(0,0,0,.18);padding:4px 12px;border-radius:99px;margin:4px 0}",
    ".pc-empty{margin:auto;text-align:center;color:rgba(255,255,255,.8);font-size:15px;line-height:1.8}",
    ".pc-rb{display:flex;align-items:center;gap:10px;margin:0 12px;padding:8px 12px;background:rgba(0,0,0,.18);border-radius:14px 14px 0 0;font-size:14px}",
    ".pc-rb div{flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}",
    ".pc-rb b{display:block;font-size:13px;color:#bfe0ff}",
    ".pc-rb button{border:0;background:none;color:#fff;width:28px;height:28px;display:grid;place-items:center}",
    ".pc-rb svg{width:18px;height:18px}",
    ".pc-bar{display:flex;align-items:flex-end;gap:8px;padding:10px 12px calc(env(safe-area-inset-bottom,0px) + 12px)}",
    ".pc-in{flex:1;min-width:0;max-height:120px;min-height:48px;resize:none;border:0;outline:0;border-radius:24px;padding:12px 16px;font:400 16px/1.5 var(--font);background:#fff;color:#123a8f}",
    "html[data-theme=dark] .pc-in{background:#1b2740;color:#fff}",
    ".pc-send{width:48px;height:48px;flex:none;border-radius:50%;border:0;background:#fff;color:#1f6fdc;display:grid;place-items:center;cursor:pointer}",
    ".pc-send svg{width:22px;height:22px}",
    ".pc-bar .pc-ib{width:48px;height:48px}",
    ".pc-sh{position:fixed;inset:0;z-index:70;background:rgba(5,15,45,.5);display:flex;align-items:flex-end}",
    ".pc-sb{width:100%;max-height:92vh;overflow-y:auto;background:#fff;color:#123a8f;border-radius:24px 24px 0 0;padding:18px 18px calc(env(safe-area-inset-bottom,0px) + 18px)}",
    "html[data-theme=dark] .pc-sb{background:#121c30;color:#fff}",
    ".pc-it{display:flex;align-items:center;gap:14px;width:100%;border:0;background:none;color:inherit;font:500 17px var(--font);padding:14px 6px;cursor:pointer;text-align:right}",
    ".pc-it svg{width:22px;height:22px;flex:none}",
    ".pc-it.r{color:#d93c4a}",
    ".pc-pr{text-align:center}",
    ".pc-pr .pc-av{margin:4px auto 10px;background:#1f6fdc}",
    ".pc-pr h3{margin:0;font-size:22px}",
    ".pc-pr .u{color:#1f6fdc;font-size:15px;direction:ltr;margin-top:2px}",
    "html[data-theme=dark] .pc-pr .u{color:#8fc4ff}",
    ".pc-pr .s{color:#7d90b8;font-size:14px;margin-top:4px}",
    ".pc-bio{margin-top:14px;text-align:right;background:#f1f6ff;border-radius:14px;padding:12px 14px;font-size:15px;line-height:1.7;white-space:pre-wrap;word-wrap:break-word}",
    "html[data-theme=dark] .pc-bio{background:rgba(255,255,255,.06)}",
    ".pc-bio small{display:block;color:#7d90b8;font-size:12px;margin-bottom:2px}",
    ".pc-f{display:block;margin-top:14px;text-align:right}",
    ".pc-f span{display:block;font-size:14px;color:#4a64a0;margin-bottom:6px}",
    "html[data-theme=dark] .pc-f span{color:#9fb3d9}",
    ".pc-f input,.pc-f textarea{width:100%;border:2px solid #d5e2f7;border-radius:14px;padding:12px 14px;font:500 17px var(--font);color:#123a8f;background:#fff;outline:0;resize:none}",
    "html[data-theme=dark] .pc-f input,html[data-theme=dark] .pc-f textarea{background:#0b1222;border-color:#2a3a5c;color:#fff}",
    ".pc-f input:focus,.pc-f textarea:focus{border-color:#1f6fdc}",
    ".pc-f .h{font-size:12px;color:#7d90b8;margin-top:5px}",
    ".pc-f .h.bad{color:#d93c4a}.pc-f .h.ok{color:#12a865}",
    ".pc-u{display:flex;align-items:center;border:2px solid #d5e2f7;border-radius:14px;background:#fff;direction:ltr}",
    "html[data-theme=dark] .pc-u{background:#0b1222;border-color:#2a3a5c}",
    ".pc-u b{padding-left:14px;color:#7d90b8;font-size:17px}",
    ".pc-u input{border:0!important;direction:ltr;text-align:left;padding-left:4px}",
    ".pc-go{width:100%;height:54px;margin-top:18px;border:0;border-radius:16px;background:#1f6fdc;color:#fff;font:600 17px var(--font);cursor:pointer}",
    ".pc-go:disabled{opacity:.55}",
    ".pc-ph{position:relative;width:96px;margin:0 auto}",
    ".pc-ph button{position:absolute;bottom:0;left:0;width:36px;height:36px;border-radius:50%;border:3px solid #fff;background:#1f6fdc;color:#fff;display:grid;place-items:center}",
    ".pc-ph svg{width:18px;height:18px}",
    ".pc-x{position:absolute;top:14px;left:14px}"
  ].join("\n");
  document.head.appendChild(css);

  /* ---------- helpers ---------- */
  function el(h) { var d = document.createElement("div"); d.innerHTML = h.trim(); return d.firstChild; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "\x26amp;", "<": "\x26lt;", ">": "\x26gt;", '"': "\x26quot;", "'": "\x26#39;" }[c]; }); }
  function linkify(s) {
    return esc(s).replace(/(https?:\/\/[^\s<]+|t\.me\/[^\s<]+)/g, function (u) {
      var href = u.indexOf("http") === 0 ? u : "https://" + u;
      return '\x3ca href="' + href + '" data-ext="1">' + u + "\x3c/a>";
    });
  }
  function toast(t) { var e = document.getElementById("toast"); if (!e) return; e.textContent = t; e.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(function () { e.hidden = true; }, 2600); }
  function money(v) { v = +v || 0; return "$" + v.toLocaleString("en-US", { minimumFractionDigits: v < 1 ? 4 : v < 10 ? 3 : 2, maximumFractionDigits: v < 1 ? 4 : v < 10 ? 3 : 2 }); }
  function ms(ts) { return ts && ts.toMillis ? ts.toMillis() : (typeof ts === "number" ? ts : Date.now()); }
  function hm(t) { var d = new Date(t); return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }
  function dayName(t) {
    var d = new Date(t), n = new Date(), y = new Date(Date.now() - 864e5);
    if (d.toDateString() === n.toDateString()) return "اليوم";
    if (d.toDateString() === y.toDateString()) return "أمس";
    return d.getDate() + "/" + (d.getMonth() + 1);
  }
  function seen(t) {
    if (!t) return "آخر ظهور من فترة";
    var s = (Date.now() - t) / 1000;
    if (s < 150) return "متصل الآن";
    if (s < 3600) return "آخر ظهور قبل " + Math.round(s / 60) + " دقيقة";
    if (s < 86400) return "آخر ظهور قبل " + Math.round(s / 3600) + " ساعة";
    return "آخر ظهور " + dayName(t);
  }
  function initial(n) { n = String(n || "?").trim(); return esc(n.charAt(0).toUpperCase() || "?"); }
  function av(photo, name, big) {
    return '\x3cdiv class="pc-av' + (big ? " big" : "") + '">' + (photo ? '\x3cimg src="' + esc(photo) + '" alt="">' : initial(name)) + "\x3c/div>";
  }
  function rav(big) {
    return room.photo ? av(room.photo, "", big) : '\x3cdiv class="pc-av' + (big ? " big" : "") + '" style="background:#fff;color:#1f6fdc">' + I.chat.replace("\x3csvg ", '\x3csvg style="width:' + (big ? 46 : 22) + 'px;height:' + (big ? 46 : 22) + 'px" ') + "\x3c/div>";
  }
  function pickImage(input, size, cb) {
    input.addEventListener("change", function () {
      var file = input.files && input.files[0];
      if (!file) return;
      var img = new Image(), url = URL.createObjectURL(file);
      img.onload = function () {
        var cv = document.createElement("canvas"), s = Math.min(img.width, img.height);
        cv.width = cv.height = size;
        cv.getContext("2d").drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
        URL.revokeObjectURL(url);
        input.value = "";
        cb(cv.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = function () { toast("ما گدرت أفتح الصورة"); };
      img.src = url;
    });
  }
  function priceNow() { var s = window.__pg || {}; return { p: +s.price || 0, pct: +s.pct || 0 }; }

  /* ---------- Firebase (loads only when the chat opens) ---------- */
  var fb = null, me = null, myProfile = null, people = {};
  function boot() {
    if (fb) return fb;
    fb = Promise.all([
      import("https://www.gstatic.com/firebasejs/" + V + "/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/" + V + "/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/" + V + "/firebase-firestore.js")
    ]).then(function (m) {
      var uid = A.get("fb.uid"), rt = A.get("fb.rt"), at = A.get("fb.id");
      if (!uid || !rt) throw new Error("noauth");
      var key = "firebase:authUser:" + CFG.apiKey + ":[DEFAULT]";
      var cur = null;
      try { cur = JSON.parse(localStorage.getItem(key) || "null"); } catch (e) {}
      if (!cur || cur.uid !== uid) {
        localStorage.setItem(key, JSON.stringify({
          uid: uid, emailVerified: false, isAnonymous: true, providerData: [],
          stsTokenManager: { refreshToken: rt, accessToken: at || "", expirationTime: 0 },
          createdAt: String(Date.now()), lastLoginAt: String(Date.now()), apiKey: CFG.apiKey, appName: "[DEFAULT]"
        }));
      }
      var app = m[0].initializeApp(CFG);
      var auth = m[1].initializeAuth(app, { persistence: m[1].browserLocalPersistence });
      var db = m[2].initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
      return auth.authStateReady().then(function () {
        if (!auth.currentUser || auth.currentUser.uid !== uid) throw new Error("uid");
        me = uid;
        return { a: m[1], f: m[2], auth: auth, db: db };
      });
    });
    fb.catch(function () { fb = null; });
    return fb;
  }

  /* ---------- open/close with the phone back button ---------- */
  var stack = [];
  function push(node, onClose) {
    document.body.appendChild(node);
    stack.push({ node: node, onClose: onClose });
    try { history.pushState({ pc: stack.length }, ""); } catch (e) {}
  }
  function popTop() {
    var top = stack.pop();
    if (!top) return;
    if (top.onClose) try { top.onClose(); } catch (e) {}
    if (top.node.parentNode) top.node.parentNode.removeChild(top.node);
  }
  function close() { if (stack.length) { try { history.back(); } catch (e) { popTop(); } } }
  window.addEventListener("popstate", function () { popTop(); });

  /* ---------- header button ---------- */
  var acts = document.querySelector(".top .actions");
  if (acts) {
    var btn = el('\x3cbutton class="icon-btn" id="chatBtn" aria-label="المحادثة">' + I.chat + "\x3c/button>");
    acts.insertBefore(btn, document.getElementById("share"));
    btn.addEventListener("click", openChat);
  }

  /* ---------- profile ---------- */
  function loadMine(c) {
    return c.f.getDoc(c.f.doc(c.db, "users", me)).then(function (s) { myProfile = s.exists() ? s.data() : null; return myProfile; });
  }

  function editProfile(c, first, done) {
    var p = myProfile || {}, photo = p.photo || "";
    var node = el('\x3cdiv class="pc-sh">\x3cdiv class="pc-sb" style="position:relative">' +
      (first ? "" : '\x3cbutton class="pc-ib pc-x" style="background:#eef3fb;color:#123a8f">' + I.close + "\x3c/button>") +
      '\x3cdiv class="pc-pr">\x3ch3 style="margin-top:6px">' + (first ? "أهلاً بيك بالمحادثة" : "ملفك الشخصي") + '\x3c/h3>\x3cdiv class="s">' +
      (first ? "سوّي ملفك حتى يعرفك الناس" : "تگدر تغيّر أي شي") + "\x3c/div>" +
      '\x3cdiv class="pc-ph" style="margin-top:14px">\x3cspan id="pfAv">' + av(photo, p.name || "?", true) + '\x3c/span>\x3cbutton id="pfPh">' + I.cam + "\x3c/button>\x3c/div>" +
      '\x3cinput type="file" id="pfF" accept="image/*" hidden>\x3c/div>' +
      '\x3clabel class="pc-f">\x3cspan>الاسم\x3c/span>\x3cinput id="pfN" maxlength="32" placeholder="اسمك" value="' + esc(p.name || "") + '">\x3c/label>' +
      '\x3clabel class="pc-f">\x3cspan>اسم المستخدم\x3c/span>\x3cdiv class="pc-u">\x3cb>@\x3c/b>\x3cinput id="pfU" maxlength="32" placeholder="username" autocapitalize="off" autocomplete="off" spellcheck="false" value="' + esc(p.user || "") + '">\x3c/div>' +
      '\x3cdiv class="h" id="pfUh">حروف إنكليزية وأرقام و _ ، من 5 حروف أو أكثر\x3c/div>\x3c/label>' +
      '\x3clabel class="pc-f">\x3cspan>البايو\x3c/span>\x3ctextarea id="pfB" rows="3" maxlength="140" placeholder="اكتب شي عنك (اختياري)">' + esc(p.bio || "") + "\x3c/textarea>\x3c/label>" +
      '\x3cbutton class="pc-go" id="pfGo">' + (first ? "ادخل المحادثة" : "حفظ") + "\x3c/button>\x3c/div>\x3c/div>");
    var $n = node.querySelector("#pfN"), $u = node.querySelector("#pfU"), $h = node.querySelector("#pfUh"), $go = node.querySelector("#pfGo");
    var x = node.querySelector(".pc-x");
    if (x) x.addEventListener("click", close);
    var pf = node.querySelector("#pfF");
    node.querySelector("#pfPh").addEventListener("click", function () { pf.click(); });
    pickImage(pf, 192, function (d) { photo = d; node.querySelector("#pfAv").innerHTML = av(photo, "", true); });
    var timer = 0, okUser = !!p.user;
    function check() {
      var u = $u.value.trim().toLowerCase().replace(/^@/, "");
      if ($u.value !== u) $u.value = u;
      okUser = false;
      if (!/^[a-z][a-z0-9_]{4,31}$/.test(u)) {
        $h.className = "h bad";
        $h.textContent = u.length < 5 ? "لازم 5 حروف أو أكثر" : "يبدي بحرف إنكليزي، وبس حروف وأرقام و _";
        return;
      }
      if (u === p.user) { okUser = true; $h.className = "h ok"; $h.textContent = "هذا يوزرك الحالي"; return; }
      $h.className = "h"; $h.textContent = "جاري التحقق...";
      clearTimeout(timer);
      timer = setTimeout(function () {
        c.f.getDoc(c.f.doc(c.db, "usernames", u)).then(function (s) {
          if ($u.value.trim().toLowerCase() !== u) return;
          if (s.exists() && s.data().uid !== me) { $h.className = "h bad"; $h.textContent = "هذا اليوزر مأخوذ"; }
          else { okUser = true; $h.className = "h ok"; $h.textContent = "متاح"; }
        }).catch(function () { $h.className = "h bad"; $h.textContent = "تعذر التحقق"; });
      }, 400);
    }
    $u.addEventListener("input", check);
    $go.addEventListener("click", function () {
      var name = $n.value.trim(), user = $u.value.trim().toLowerCase(), bio = node.querySelector("#pfB").value.trim();
      if (!name) { toast("اكتب اسمك"); return; }
      if (!okUser) { toast("اختار اسم مستخدم متاح"); return; }
      $go.disabled = true;
      var old = p.user;
      c.f.runTransaction(c.db, function (tx) {
        var ref = c.f.doc(c.db, "usernames", user);
        return tx.get(ref).then(function (s) {
          if (s.exists() && s.data().uid !== me) throw new Error("taken");
          if (!s.exists()) tx.set(ref, { uid: me });
          if (old && old !== user) tx.delete(c.f.doc(c.db, "usernames", old));
          tx.set(c.f.doc(c.db, "users", me), { name: name, user: user, bio: bio, photo: photo, last: c.f.serverTimestamp() });
        });
      }).then(function () {
        myProfile = { name: name, user: user, bio: bio, photo: photo };
        people[me] = myProfile;
        toast("تم الحفظ");
        if (first) { stack.pop(); node.parentNode.removeChild(node); if (done) done(); }
        else close();
      }).catch(function (e) {
        $go.disabled = false;
        toast(String(e && e.message) === "taken" ? "هذا اليوزر انأخذ هسه، اختار غيره" : "ما گدرت أحفظ، حاول مرة ثانية");
      });
    });
    push(node);
    if (p.user) check();
  }

  function showProfile(c, uid) {
    var node = el('\x3cdiv class="pc-sh">\x3cdiv class="pc-sb" style="position:relative">\x3cbutton class="pc-ib pc-x" style="background:#eef3fb;color:#123a8f">' + I.close +
      '\x3c/button>\x3cdiv class="pc-pr" id="pv">\x3cdiv style="padding:30px;color:#7d90b8">جاري التحميل...\x3c/div>\x3c/div>\x3c/div>\x3c/div>');
    node.querySelector(".pc-x").addEventListener("click", close);
    node.addEventListener("click", function (e) { if (e.target === node) close(); });
    push(node);
    c.f.getDoc(c.f.doc(c.db, "users", uid)).then(function (s) {
      var u = s.exists() ? s.data() : {};
      var h = av(u.photo, u.name, true) + "\x3ch3>" + vname(uid, u.name || "مستخدم") + "\x3c/h3>" +
        (u.user ? '\x3cdiv class="u">@' + esc(u.user) + "\x3c/div>" : "") +
        '\x3cdiv class="s">' + seen(ms(u.last)) + "\x3c/div>" +
        (u.bio ? '\x3cdiv class="pc-bio">\x3csmall>البايو\x3c/small>' + linkify(u.bio) + "\x3c/div>" : "");
      if (uid === me) h += '\x3cbutton class="pc-go" id="pvEd">تعديل ملفي\x3c/button>';
      if (me === ADMIN && uid !== me) h += '\x3cbutton class="pc-it r" id="pvBan" style="justify-content:center;margin-top:8px">' + I.ban + "حظر هذا الشخص\x3c/button>";
      var pv = node.querySelector("#pv");
      pv.innerHTML = h;
      var ed = pv.querySelector("#pvEd");
      if (ed) ed.addEventListener("click", function () { close(); setTimeout(function () { editProfile(c, false); }, 50); });
      var bn = pv.querySelector("#pvBan");
      if (bn) bn.addEventListener("click", function () { banUser(c, uid, u.name); close(); });
    });
  }

  function banUser(c, uid, name) {
    c.f.setDoc(c.f.doc(c.db, "bans", uid), { name: name || "", ts: c.f.serverTimestamp() })
      .then(function () { toast("تم حظر " + (name || "الشخص")); })
      .catch(function () { toast("ما گدرت أحظره"); });
  }

  /* ---------- room info (photo, name, bio — the developer edits it) ---------- */
  var room = { name: "المحادثة", bio: "", photo: "" };
  function roomTitle() { return room.name || "المحادثة"; }

  function showRoomInfo(c, online) {
    var node = el('\x3cdiv class="pc-sh">\x3cdiv class="pc-sb" style="position:relative">\x3cbutton class="pc-ib pc-x" style="background:#eef3fb;color:#123a8f">' + I.close + '\x3c/button>\x3cdiv class="pc-pr" id="ri">\x3c/div>\x3c/div>\x3c/div>');
    node.querySelector(".pc-x").addEventListener("click", close);
    node.addEventListener("click", function (e) { if (e.target === node) close(); });
    function render() {
      var h = rav(true) + "\x3ch3>" + esc(roomTitle()) + "\x3c/h3>" +
        '\x3cdiv class="s">' + (online ? online + " متصل الآن" : "محادثة عامة") + "\x3c/div>" +
        (room.bio ? '\x3cdiv class="pc-bio">\x3csmall>الوصف\x3c/small>' + linkify(room.bio) + "\x3c/div>" : "") +
        '\x3cbutton class="pc-it" id="riMe">' + I.user + "ملفي الشخصي\x3c/button>";
      if (me === ADMIN) h += '\x3cbutton class="pc-it" id="riEd">' + I.edit + "تعديل المحادثة (صورة، اسم، وصف)\x3c/button>";
      var ri = node.querySelector("#ri");
      ri.innerHTML = h;
      ri.querySelector("#riMe").addEventListener("click", function () { close(); setTimeout(function () { showProfile(c, me); }, 50); });
      var ed = ri.querySelector("#riEd");
      if (ed) ed.addEventListener("click", function () { close(); setTimeout(function () { editRoom(c); }, 50); });
    }
    render();
    push(node);
  }

  function editRoom(c) {
    var photo = room.photo || "";
    var node = el('\x3cdiv class="pc-sh">\x3cdiv class="pc-sb" style="position:relative">\x3cbutton class="pc-ib pc-x" style="background:#eef3fb;color:#123a8f">' + I.close + "\x3c/button>" +
      '\x3cdiv class="pc-pr">\x3ch3 style="margin:6px 0 14px">تعديل المحادثة\x3c/h3>\x3cdiv class="pc-ph">\x3cspan id="erAv">' + (photo ? av(photo, "", true) : rav(true)) + '\x3c/span>\x3cbutton id="erPh">' + I.cam + "\x3c/button>\x3c/div>" +
      '\x3cinput type="file" id="erF" accept="image/*" hidden>\x3c/div>' +
      '\x3clabel class="pc-f">\x3cspan>اسم المحادثة\x3c/span>\x3cinput id="erN" maxlength="40" value="' + esc(room.name || "المحادثة") + '">\x3c/label>' +
      '\x3clabel class="pc-f">\x3cspan>الوصف (البايو)\x3c/span>\x3ctextarea id="erB" rows="4" maxlength="300" placeholder="اكتب وصف للمحادثة">' + esc(room.bio || "") + "\x3c/textarea>\x3c/label>" +
      '\x3cbutton class="pc-it r" id="erDel" style="justify-content:center">' + I.trash + "شيل الصورة\x3c/button>" +
      '\x3cbutton class="pc-go" id="erGo">حفظ\x3c/button>\x3c/div>\x3c/div>');
    node.querySelector(".pc-x").addEventListener("click", close);
    var f = node.querySelector("#erF");
    node.querySelector("#erPh").addEventListener("click", function () { f.click(); });
    node.querySelector("#erDel").addEventListener("click", function () { photo = ""; node.querySelector("#erAv").innerHTML = '\x3cdiv class="pc-av big" style="background:#e8f1ff;color:#1f6fdc">' + I.chat.replace("\x3csvg ", '\x3csvg style="width:46px;height:46px" ') + "\x3c/div>"; });
    pickImage(f, 256, function (d) { photo = d; node.querySelector("#erAv").innerHTML = av(photo, "", true); });
    node.querySelector("#erGo").addEventListener("click", function () {
      var b = this;
      b.disabled = true;
      var data = { name: node.querySelector("#erN").value.trim() || "المحادثة", bio: node.querySelector("#erB").value.trim(), photo: photo };
      c.f.setDoc(c.f.doc(c.db, "rooms", ROOM), data).then(function () { toast("تم حفظ المحادثة"); close(); })
        .catch(function () { b.disabled = false; toast("ما گدرت أحفظ"); });
    });
    push(node);
  }

  /* ---------- message menu (long press) ---------- */
  function menu(c, m, onReply) {
    var mine = m.uid === me, adm = me === ADMIN;
    var h = '\x3cdiv class="pc-sh">\x3cdiv class="pc-sb">' +
      '\x3cbutton class="pc-it" data-a="reply">' + I.reply + "رد\x3c/button>" +
      '\x3cbutton class="pc-it" data-a="copy">' + I.copy + "نسخ\x3c/button>" +
      '\x3cbutton class="pc-it" data-a="prof">' + I.user + "عرض ملف " + esc(m.name || "المرسل") + "\x3c/button>" +
      (mine || adm ? '\x3cbutton class="pc-it r" data-a="del">' + I.trash + "حذف الرسالة\x3c/button>" : "") +
      (adm && !mine ? '\x3cbutton class="pc-it r" data-a="ban">' + I.ban + "حظر " + esc(m.name || "المرسل") + "\x3c/button>" : "") +
      "\x3c/div>\x3c/div>";
    var node = el(h);
    node.addEventListener("click", function (e) {
      if (e.target === node) { close(); return; }
      var b = e.target.closest("[data-a]");
      if (!b) return;
      var a = b.getAttribute("data-a");
      close();
      setTimeout(function () {
        if (a === "reply") onReply(m);
        else if (a === "copy") { try { navigator.clipboard.writeText(m.text || ""); toast("انسخت"); } catch (er) {} }
        else if (a === "prof") showProfile(c, m.uid);
        else if (a === "del") c.f.deleteDoc(c.f.doc(c.db, "rooms", ROOM, "messages", m.id)).then(function () { toast("انحذفت"); }).catch(function () { toast("ما گدرت أحذفها"); });
        else if (a === "ban") banUser(c, m.uid, m.name);
      }, 60);
    });
    push(node);
  }

  /* ---------- the chat screen ---------- */
  var opening = false;
  function openChat() {
    if (opening) return;
    opening = true;
    toast("جاري فتح المحادثة...");
    boot().then(function (c) {
      return loadMine(c).then(function (p) {
        opening = false;
        document.getElementById("toast").hidden = true;
        if (!p || !p.user) editProfile(c, true, function () { room_(c); });
        else room_(c);
      });
    }).catch(function () {
      opening = false;
      toast("ما گدرت أفتح المحادثة، تأكد من النت وحاول مرة ثانية");
    });
  }

  function room_(c) {
    var F = c.f, db = c.db;
    var node = el('\x3cdiv class="pc">' +
      '\x3cdiv class="pc-h">\x3cbutton class="pc-ib" id="rcB">' + I.back + '\x3c/button>' +
      '\x3cdiv class="pc-ttl" id="rcT">\x3cspan id="rcAv">' + rav() + '\x3c/span>\x3cdiv style="min-width:0">\x3cb id="rcN">' + esc(roomTitle()) + '\x3c/b>\x3cspan id="rcS">محادثة عامة\x3c/span>\x3c/div>\x3c/div>\x3c/div>' +
      '\x3cdiv class="pc-pin" id="rcP">\x3cspan>السعر الحالي\x3c/span>\x3cb>—\x3c/b>\x3ci>\x3c/i>\x3c/div>' +
      '\x3cdiv class="pc-list" id="rcL">\x3cdiv class="pc-empty">جاري تحميل الرسائل...\x3c/div>\x3c/div>' +
      '\x3cdiv class="pc-rb" id="rcR" hidden>\x3cdiv>\x3cb>\x3c/b>\x3cspan>\x3c/span>\x3c/div>\x3cbutton id="rcRx">' + I.close + "\x3c/button>\x3c/div>" +
      '\x3cdiv class="pc-bar">\x3cbutton class="pc-ib" id="rcPr" aria-label="شارك السعر">' + I.price + '\x3c/button>' +
      '\x3ctextarea class="pc-in" id="rcI" rows="1" placeholder="اكتب رسالة...">\x3c/textarea>' +
      '\x3cbutton class="pc-send" id="rcSend" aria-label="إرسال">' + I.send + "\x3c/button>\x3c/div>\x3c/div>");
    var $l = node.querySelector("#rcL"), $i = node.querySelector("#rcI"), $r = node.querySelector("#rcR");
    var replyTo = null, msgs = [], online = 0, unsubs = [], timers = [];

    function pin() {
      var p = priceNow(), pe = node.querySelector("#rcP");
      if (!p.p) return;
      pe.querySelector("b").textContent = money(p.p);
      var i = pe.querySelector("i");
      i.textContent = (p.pct >= 0 ? "▲ +" : "▼ ") + p.pct.toFixed(2) + "%";
      i.style.color = p.pct >= 0 ? "var(--up)" : "var(--down)";
    }
    pin();
    timers.push(setInterval(pin, 2000));

    function setRoom() {
      node.querySelector("#rcN").textContent = roomTitle();
      node.querySelector("#rcAv").innerHTML = rav();
      node.querySelector("#rcS").textContent = online ? online + " متصل الآن" : "محادثة عامة";
    }

    var asking = {};
    function person(uid) {
      if (people[uid] || asking[uid]) return people[uid];
      asking[uid] = 1;
      F.getDoc(F.doc(db, "users", uid)).then(function (s) { people[uid] = s.exists() ? s.data() : {}; render(); }).catch(function () {});
      return null;
    }
    function render() {
      if (!msgs.length) { $l.innerHTML = '\x3cdiv class="pc-empty">ما بيها رسائل بعد\x3cbr>كون أول واحد يكتب\x3c/div>'; return; }
      var atBottom = $l.scrollHeight - $l.scrollTop - $l.clientHeight < 120;
      var h = "", lastDay = "";
      msgs.forEach(function (m, idx) {
        var t = ms(m.ts), d = dayName(t);
        if (d !== lastDay) { h += '\x3cdiv class="pc-day">' + d + "\x3c/div>"; lastDay = d; }
        var mine = m.uid === me, nx = msgs[idx + 1], pv = msgs[idx - 1];
        var firstOfGroup = !pv || pv.uid !== m.uid || dayName(ms(pv.ts)) !== d;
        var lastOfGroup = !nx || nx.uid !== m.uid || dayName(ms(nx.ts)) !== d;
        var pp = (mine ? myProfile : person(m.uid)) || {};
        h += '\x3cdiv class="pc-row' + (mine ? " mine" : "") + '">' + (lastOfGroup ? '\x3cspan data-u="' + esc(m.uid) + '">' + av(pp.photo, pp.name || m.name, false).replace('class="pc-av"', 'class="pc-av sm"') + "\x3c/span>" : '\x3cspan class="sp">\x3c/span>');
        h += '\x3cdiv class="pc-m' + (mine ? " me" : "") + '" data-id="' + esc(m.id) + '">' +
          (mine || !firstOfGroup ? "" : '\x3cdiv class="n" data-u="' + esc(m.uid) + '">' + vname(m.uid, m.name || "مستخدم") + "\x3c/div>") +
          (m.rep ? '\x3cdiv class="pc-q">' + esc(m.rep.name || "") + ": " + esc(m.rep.text || "") + "\x3c/div>" : "") +
          (m.price ? '\x3cdiv class="pc-card">\x3cspan>سعر GRAM\x3c/span>\x3cb>' + money(m.price) + '\x3c/b>\x3ci style="color:' + ((m.pct || 0) >= 0 ? "#12a865" : "#d93c4a") + '">' + ((m.pct || 0) >= 0 ? "▲ +" : "▼ ") + (+m.pct || 0).toFixed(2) + "%\x3c/i>\x3c/div>" : "") +
          (m.text ? linkify(m.text) : "") +
          '\x3cdiv class="t">' + hm(t) + "\x3c/div>\x3c/div>\x3c/div>";
      });
      $l.innerHTML = h;
      if (atBottom || render.first) { $l.scrollTop = $l.scrollHeight; render.first = false; }
    }
    render.first = true;

    /* live messages */
    var q = F.query(F.collection(db, "rooms", ROOM, "messages"), F.orderBy("ts", "desc"), F.limit(60));
    unsubs.push(F.onSnapshot(q, function (snap) {
      msgs = snap.docs.map(function (d) { var x = d.data(); x.id = d.id; return x; }).reverse();
      render();
    }, function () { $l.innerHTML = '\x3cdiv class="pc-empty">ما گدرت أحمّل الرسائل\x3c/div>'; }));

    /* room info */
    unsubs.push(F.onSnapshot(F.doc(db, "rooms", ROOM), function (s) {
      if (s.exists()) { var d = s.data(); room = { name: d.name || "المحادثة", bio: d.bio || "", photo: d.photo || "" }; }
      setRoom();
    }, function () {}));

    /* online now + my last seen */
    function heartbeat() {
      F.updateDoc(F.doc(db, "users", me), { last: F.serverTimestamp() }).catch(function () {});
      F.getCountFromServer(F.query(F.collection(db, "users"), F.where("last", ">", F.Timestamp.fromMillis(Date.now() - 150000))))
        .then(function (r) { online = r.data().count; setRoom(); }).catch(function () {});
    }
    heartbeat();
    timers.push(setInterval(heartbeat, 60000));

    /* taps */
    node.querySelector("#rcB").addEventListener("click", close);
    node.querySelector("#rcT").addEventListener("click", function () { showRoomInfo(c, online); });
    node.querySelector("#rcRx").addEventListener("click", function () { replyTo = null; $r.hidden = true; });
    $l.addEventListener("click", function (e) {
      var a = e.target.closest("a[data-ext]");
      if (a) { e.preventDefault(); try { A.openUrl(a.href); } catch (er) {} return; }
      var n = e.target.closest("[data-u]");
      if (n) showProfile(c, n.getAttribute("data-u"));
    });
    var pressT = 0;
    function findMsg(target) {
      var b = target.closest(".pc-m");
      if (!b) return null;
      var id = b.getAttribute("data-id");
      for (var i = 0; i < msgs.length; i++) if (msgs[i].id === id) return msgs[i];
      return null;
    }
    function doReply(m) {
      replyTo = { id: m.id, name: m.name || "", text: (m.text || (m.price ? "سعر GRAM " + money(m.price) : "")).slice(0, 90) };
      $r.querySelector("b").textContent = "رد على " + (m.name || "");
      $r.querySelector("span").textContent = replyTo.text;
      $r.hidden = false;
      $i.focus();
    }
    $l.addEventListener("touchstart", function (e) {
      var m = findMsg(e.target);
      if (!m) return;
      pressT = setTimeout(function () { pressT = 0; try { navigator.vibrate && navigator.vibrate(15); } catch (er) {} menu(c, m, doReply); }, 450);
    }, { passive: true });
    ["touchend", "touchmove", "touchcancel"].forEach(function (ev) { $l.addEventListener(ev, function () { clearTimeout(pressT); }, { passive: true }); });
    $l.addEventListener("contextmenu", function (e) { var m = findMsg(e.target); if (m) { e.preventDefault(); menu(c, m, doReply); } });

    $i.addEventListener("input", function () { $i.style.height = "auto"; $i.style.height = Math.min(120, $i.scrollHeight) + "px"; });

    function send(extra) {
      var text = $i.value.trim();
      if (!text && !extra) return;
      var data = { uid: me, name: (myProfile && myProfile.name) || "", user: (myProfile && myProfile.user) || "", text: text, ts: F.serverTimestamp(), rep: replyTo || null };
      if (extra) { data.price = extra.p; data.pct = extra.pct; }
      $i.value = ""; $i.style.height = "auto";
      replyTo = null; $r.hidden = true;
      $l.scrollTop = $l.scrollHeight;
      F.addDoc(F.collection(db, "rooms", ROOM, "messages"), data).catch(function (e) {
        var msg = String(e && e.code || "");
        if (msg.indexOf("permission") >= 0) toast("ما تگدر ترسل بهالمحادثة");
        else toast("ما وصلت الرسالة، تأكد من النت");
        if (text) $i.value = text;
      });
    }
    node.querySelector("#rcSend").addEventListener("click", function () { send(null); });
    node.querySelector("#rcPr").addEventListener("click", function () {
      var p = priceNow();
      if (!p.p) { toast("انتظر يوصل السعر"); return; }
      send({ p: p.p, pct: p.pct });
    });

    push(node, function () {
      unsubs.forEach(function (u) { try { u(); } catch (e) {} });
      timers.forEach(clearInterval);
    });
    setRoom();
  }
})();
