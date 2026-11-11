/* Price Gram — المحادثة + الأزرار السفلية (تشتغل داخل التطبيق بس) */
(function () {
  "use strict";
  var A = window.Android;
  if (!A || !A.get) return;

  var ADMIN = "s8AMLzjwJkRd3VQeORgR1wkt4gi1";
  var ROOM = "gram";
  var V = "10.12.2";
  var CFG = { apiKey: "AIzaSyDoT42mdZUl6VIaPYOYolnlpJtOZf93n7E", authDomain: "price-gram.firebaseapp.com", projectId: "price-gram" };
  var NAVH = 64;

  /* ---------- icons ---------- */
  function svg(d, extra) { return '\x3csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' + (extra || "") + ">" + d + "\x3c/svg>"; }
  var I = {
    price: svg('\x3cpath d="M3 17l6-6 4 4 8-8"/>\x3cpath d="M15 7h6v6"/>'),
    chat: svg('\x3cpath d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>'),
    user: svg('\x3ccircle cx="12" cy="8" r="4"/>\x3cpath d="M4 21a8 8 0 0 1 16 0"/>'),
    more: '\x3csvg viewBox="0 0 24 24" fill="currentColor">\x3ccircle cx="12" cy="5" r="2"/>\x3ccircle cx="12" cy="12" r="2"/>\x3ccircle cx="12" cy="19" r="2"/>\x3c/svg>',
    send: '\x3csvg viewBox="0 0 24 24" fill="currentColor">\x3cpath d="M20.6 20.4L3.2 12.9a1 1 0 0 1 0-1.8L20.6 3.6a1 1 0 0 1 1.4 1.2L19.7 12l2.3 7.2a1 1 0 0 1-1.4 1.2z"/>\x3c/svg>',
    close: svg('\x3cpath d="M6 6l12 12M18 6L6 18"/>'),
    reply: svg('\x3cpath d="M10 9L5 14l5 5"/>\x3cpath d="M5 14h9a6 6 0 0 0 6-6V5"/>'),
    copy: svg('\x3crect x="9" y="9" width="11" height="11" rx="2"/>\x3cpath d="M5 15V6a2 2 0 0 1 2-2h9"/>'),
    trash: svg('\x3cpath d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
    ban: svg('\x3ccircle cx="12" cy="12" r="9"/>\x3cpath d="M5.6 5.6l12.8 12.8"/>'),
    edit: svg('\x3cpath d="M4 20h4L19 9l-4-4L4 16v4z"/>'),
    cam: svg('\x3cpath d="M4 8h3l2-3h6l2 3h3v11H4z"/>\x3ccircle cx="12" cy="13" r="3.5"/>'),
    pin: svg('\x3cpath d="M12 17v5"/>\x3cpath d="M8 3h8l-1 6 3 4H6l3-4z"/>'),
    bell: svg('\x3cpath d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/>\x3cpath d="M10 20a2 2 0 0 0 4 0"/>'),
    gear: svg('\x3ccircle cx="12" cy="12" r="3"/>\x3cpath d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>'),
    share: svg('\x3ccircle cx="18" cy="5" r="3"/>\x3ccircle cx="6" cy="12" r="3"/>\x3ccircle cx="18" cy="19" r="3"/>\x3cpath d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>'),
    tool: svg('\x3cpath d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>'),
    info: svg('\x3ccircle cx="12" cy="12" r="9"/>\x3cpath d="M12 11v6M12 7.5v.5"/>'),
    down: svg('\x3cpath d="M6 9l6 6 6-6"/>', ' stroke-width="2.4"'),
    clock: svg('\x3ccircle cx="12" cy="12" r="8"/>\x3cpath d="M12 8v4l3 2"/>'),
    tick: svg('\x3cpath d="M4 12.5l5 5L20 7"/>', ' stroke-width="2.4"'),
    verify: svg('\x3cpath d="M12 2l2.5 1.9 3.1-.2 1 3 2.6 1.7-.9 3 .9 3-2.6 1.7-1 3-3.1-.2L12 22l-2.5-1.9-3.1.2-1-3-2.6-1.7.9-3-.9-3 2.6-1.7 1-3 3.1.2z"/>\x3cpath d="M8.5 12.2l2.4 2.4 4.6-4.8"/>')
  };
  var BADGE = '\x3csvg class="pc-vb" viewBox="0 0 24 24" aria-label="موثّق">\x3cpath fill="#1d9bf0" stroke="#fff" stroke-width="1.2" d="M12 1.6l2.5 1.9 3.1-.2 1 3 2.6 1.7-.9 3 .9 3-2.6 1.7-1 3-3.1-.2L12 22.4l-2.5-1.9-3.1.2-1-3-2.6-1.7.9-3-.9-3 2.6-1.7 1-3 3.1.2z"/>\x3cpath fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M8 12.3l2.7 2.7L16.2 9.4"/>\x3c/svg>';
  var COLORS = ["#ff7a7a", "#ffb35c", "#5fd4a8", "#62b8ff", "#b48cff", "#f08ab5", "#5fd1e0"];

  /* ---------- styles ---------- */
  var css = document.createElement("style");
  css.textContent = [
    "body{padding-bottom:calc(env(safe-area-inset-bottom,0px) + " + (NAVH + 30) + "px)!important}",
    ".pc-ns,.pc-ns *{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}",
    ".pc-ns input,.pc-ns textarea{-webkit-user-select:text;user-select:text;-webkit-touch-callout:default}",
    /* bottom nav */
    ".pc-nav{position:fixed;left:0;right:0;bottom:0;z-index:55;height:calc(" + NAVH + "px + env(safe-area-inset-bottom,0px));padding-bottom:env(safe-area-inset-bottom,0px);display:flex;justify-content:space-around;align-items:center;background:rgba(14,22,40,.97);border-top:1px solid rgba(255,255,255,.08);font-family:var(--font)}",
    ".pc-nav button{flex:1;height:100%;border:0;background:none;color:#8592ad;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font:500 12px var(--font);position:relative;cursor:pointer}",
    ".pc-nav button i{display:grid;place-items:center;width:58px;height:32px;border-radius:16px;transition:background .2s}",
    ".pc-nav button svg{width:24px;height:24px}",
    ".pc-nav button.on{color:#4ea4ff}",
    ".pc-nav button.on i{background:rgba(78,164,255,.15)}",
    ".pc-nb{position:absolute;top:6px;left:calc(50% - 30px);min-width:20px;height:20px;padding:0 6px;border-radius:10px;background:#4ea4ff;color:#fff;font:700 11px/20px var(--font);border:2px solid #0e1628}",
    /* panels */
    ".pc-pn{position:fixed;left:0;right:0;top:0;bottom:calc(" + NAVH + "px + env(safe-area-inset-bottom,0px));z-index:50;display:flex;flex-direction:column;background:#0b1222;color:#fff;font-family:var(--font)}",
    ".pc-pn *{box-sizing:border-box}",
    ".pc-h{display:flex;align-items:center;gap:10px;padding:calc(env(safe-area-inset-top,0px) + 10px) 12px 10px;background:#111a2d;border-bottom:1px solid rgba(255,255,255,.06)}",
    ".pc-ttl{flex:1;min-width:0;display:flex;align-items:center;gap:10px;cursor:pointer}",
    ".pc-ttl b{display:block;font-size:17px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".pc-ttl span{display:block;font-size:13px;color:#8fa6d1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".pc-ib{width:40px;height:40px;flex:none;border-radius:50%;border:0;background:transparent;color:#c9d6f0;display:grid;place-items:center;cursor:pointer}",
    ".pc-ib svg{width:22px;height:22px}",
    ".pc-av{width:44px;height:44px;flex:none;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:18px;overflow:hidden;color:#fff}",
    ".pc-av img{width:100%;height:100%;object-fit:cover}",
    ".pc-av.big{width:104px;height:104px;font-size:42px}",
    ".pc-av.sm{width:34px;height:34px;font-size:14px;cursor:pointer}",
    ".pc-vb{width:1.1em;height:1.1em;vertical-align:-.18em;margin-right:4px;display:inline-block}",
    ".pc-pin{display:flex;align-items:center;gap:10px;padding:7px 14px;background:#111a2d;border-bottom:1px solid rgba(255,255,255,.06);font-size:14px;cursor:pointer;min-height:48px}",
    ".pc-pin>i{width:3px;align-self:stretch;background:#4ea4ff;border-radius:2px;flex:none}",
    ".pc-pin .tx{flex:1;min-width:0}",
    ".pc-pin .tx b{display:block;color:#4ea4ff;font-size:13px}",
    ".pc-pin .tx span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#dfe8fb}",
    ".pc-pin .pr{direction:ltr;font-weight:700;font-size:15px;white-space:nowrap}",
    ".pc-pin .pr em{font-style:normal;font-size:12px;margin-left:5px}",
    ".pc-wall{flex:1;position:relative;overflow:hidden;background-color:#0d1526;background-image:radial-gradient(circle at 20% 30%,rgba(78,164,255,.07) 0 2px,transparent 3px),radial-gradient(circle at 70% 65%,rgba(78,164,255,.05) 0 2px,transparent 3px),linear-gradient(45deg,transparent 48%,rgba(255,255,255,.022) 49% 51%,transparent 52%);background-size:60px 60px,84px 84px,46px 46px}",
    ".pc-list{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;padding:10px 10px 12px;display:flex;flex-direction:column;gap:4px;-webkit-overflow-scrolling:touch}",
    ".pc-row{display:flex;align-items:flex-end;gap:6px;max-width:86%;align-self:flex-end;flex-direction:row-reverse;transition:transform .2s;margin-top:2px}",
    ".pc-row.mine{align-self:flex-start;flex-direction:row}",
    ".pc-row.gs{margin-top:8px}",
    ".pc-row .sp{width:34px;flex:none}",
    ".pc-m{min-width:70px;max-width:100%;padding:6px 11px 4px;border-radius:17px;font-size:16px;line-height:1.55;word-wrap:break-word;white-space:pre-wrap;background:#1e2a42;color:#fff}",
    ".pc-row:not(.mine) .pc-m.tl{border-bottom-left-radius:5px}",
    ".pc-row.mine .pc-m{background:#3a6fd8}",
    ".pc-row.mine .pc-m.tl{border-bottom-right-radius:5px}",
    ".pc-m .n{font-size:14px;font-weight:700;margin-bottom:1px;cursor:pointer}",
    ".pc-m .t{font-size:11px;opacity:.7;direction:ltr;text-align:left;margin-top:1px;display:flex;align-items:center;gap:3px}",
    ".pc-m .t svg{width:14px;height:14px}",
    ".pc-m a{color:#9fd0ff;text-decoration:underline}",
    ".pc-row.mine .pc-m a{color:#fff}",
    ".pc-q{border-right:3px solid currentColor;padding:3px 8px;border-radius:6px;background:rgba(255,255,255,.08);font-size:13px;margin:2px 0 4px;overflow:hidden}",
    ".pc-q b{display:block;font-size:12.5px}",
    ".pc-q span{display:block;color:#dfe8fb;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".pc-card{display:flex;align-items:center;justify-content:space-between;gap:14px;background:rgba(0,0,0,.2);border-radius:11px;padding:7px 11px;margin:3px 0}",
    ".pc-card b{font-size:19px;direction:ltr}.pc-card em{font-style:normal;font-weight:700;direction:ltr;font-size:13px}",
    ".pc-day{align-self:center;font-size:12px;background:rgba(0,0,0,.35);padding:3px 12px;border-radius:99px;margin:8px 0 4px}",
    ".pc-empty{margin:auto;text-align:center;color:#8fa6d1;font-size:15px;line-height:1.9}",
    ".pc-hl .pc-m{box-shadow:0 0 0 2px #4ea4ff}",
    ".pc-sw{position:absolute;right:10px;width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.4);color:#fff;display:grid;place-items:center;opacity:0;pointer-events:none}",
    ".pc-sw svg{width:18px;height:18px}",
    ".pc-dn{position:absolute;left:12px;bottom:12px;width:46px;height:46px;border-radius:50%;border:0;background:#1e2a42;color:#c9d6f0;display:grid;place-items:center;box-shadow:0 4px 14px rgba(0,0,0,.4);cursor:pointer}",
    ".pc-dn svg{width:22px;height:22px}",
    ".pc-dn span{position:absolute;top:-8px;min-width:20px;padding:0 6px;height:20px;border-radius:10px;background:#4ea4ff;color:#fff;font:700 11px/20px var(--font)}",
    ".pc-rb{display:flex;align-items:center;gap:10px;padding:8px 14px;background:#111a2d;border-top:1px solid rgba(255,255,255,.06);font-size:14px}",
    ".pc-rb>svg{width:22px;height:22px;color:#4ea4ff;flex:none}",
    ".pc-rb div{flex:1;min-width:0;border-right:3px solid #4ea4ff;padding-right:8px}",
    ".pc-rb b{display:block;font-size:13px;color:#4ea4ff}",
    ".pc-rb span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#c9d6f0}",
    ".pc-bar{display:flex;align-items:flex-end;gap:8px;padding:8px 10px;background:#111a2d}",
    ".pc-inw{flex:1;min-width:0;display:flex;align-items:flex-end;background:#1a2438;border-radius:22px}",
    ".pc-in{flex:1;min-width:0;max-height:120px;min-height:44px;resize:none;border:0;outline:0;background:none;padding:11px 16px;font:400 16px/1.4 var(--font);color:#fff}",
    ".pc-in::placeholder{color:#7f8ca8}",
    ".pc-inw .pc-ib{width:44px;height:44px;color:#7f8ca8}",
    ".pc-send{width:44px;height:44px;flex:none;border-radius:50%;border:0;background:#4ea4ff;color:#fff;display:grid;place-items:center;cursor:pointer}",
    ".pc-send svg{width:21px;height:21px}",
    ".pc-load{margin:auto;color:#8fa6d1;font-size:15px;text-align:center;line-height:2}",
    /* me tab */
    ".pc-me{flex:1;overflow-y:auto;padding:calc(env(safe-area-inset-top,0px) + 24px) 16px 24px;text-align:center}",
    ".pc-me h2{margin:4px 0 0;font-size:24px}",
    ".pc-me .u{color:#4ea4ff;direction:ltr;margin-top:2px;font-size:15px}",
    ".pc-me .s{color:#8fa6d1;font-size:13px;margin-top:3px}",
    ".pc-grp{margin-top:18px;background:#121c30;border:1px solid rgba(255,255,255,.06);border-radius:18px;text-align:right;overflow:hidden}",
    ".pc-it{display:flex;align-items:center;gap:14px;width:100%;border:0;background:none;color:#fff;font:500 16px var(--font);padding:14px 16px;cursor:pointer;text-align:right;border-bottom:1px solid rgba(255,255,255,.06)}",
    ".pc-it:last-child{border-bottom:0}",
    ".pc-it svg{width:22px;height:22px;flex:none;color:#4ea4ff}",
    ".pc-it small{display:block;color:#8fa6d1;font-size:12.5px;font-weight:400;margin-top:1px}",
    ".pc-it.r,.pc-it.r svg{color:#ff6b78}",
    ".pc-it .v{margin-right:auto;color:#8fa6d1;font-size:13px;font-weight:400}",
    /* sheets */
    ".pc-sh{position:fixed;inset:0;z-index:70;background:rgba(0,0,0,.55);display:flex;align-items:flex-end;font-family:var(--font)}",
    ".pc-sb{width:100%;max-height:92vh;overflow-y:auto;background:#151f33;color:#fff;border-radius:22px 22px 0 0;padding:10px 0 calc(env(safe-area-inset-bottom,0px) + 10px);position:relative}",
    ".pc-sb .grab{width:40px;height:4px;border-radius:2px;background:rgba(255,255,255,.2);margin:0 auto 6px}",
    ".pc-sb .pc-it{padding:15px 22px}",
    ".pc-pad{padding:8px 20px 6px}",
    ".pc-pr{text-align:center}",
    ".pc-pr .pc-av{margin:6px auto 10px}",
    ".pc-pr h3{margin:0;font-size:22px}",
    ".pc-pr .u{color:#4ea4ff;font-size:15px;direction:ltr;margin-top:2px}",
    ".pc-pr .s{color:#8fa6d1;font-size:13.5px;margin-top:3px}",
    ".pc-bio{margin-top:14px;text-align:right;background:#1b2740;border-radius:14px;padding:11px 14px;font-size:15px;line-height:1.7;white-space:pre-wrap;word-wrap:break-word}",
    ".pc-bio small{display:block;color:#8fa6d1;font-size:12px;margin-bottom:2px}",
    ".pc-bio a{color:#7cc0ff}",
    ".pc-f{display:block;margin-top:14px;text-align:right}",
    ".pc-f span{display:block;font-size:14px;color:#9fb3d9;margin-bottom:6px}",
    ".pc-f input,.pc-f textarea{width:100%;border:2px solid #2a3a5c;border-radius:14px;padding:12px 14px;font:500 17px var(--font);color:#fff;background:#0f1729;outline:0;resize:none;box-sizing:border-box}",
    ".pc-f input:focus,.pc-f textarea:focus{border-color:#4ea4ff}",
    ".pc-f .h{font-size:12.5px;color:#8fa6d1;margin-top:5px}",
    ".pc-f .h.bad{color:#ff6b78}.pc-f .h.ok{color:#5fe3a1}",
    ".pc-u{display:flex;align-items:center;border:2px solid #2a3a5c;border-radius:14px;background:#0f1729;direction:ltr}",
    ".pc-u b{padding-left:14px;color:#8fa6d1;font-size:17px}",
    ".pc-u input{border:0!important;direction:ltr;text-align:left;padding-left:4px}",
    ".pc-go{width:100%;height:54px;margin-top:18px;border:0;border-radius:16px;background:#4ea4ff;color:#fff;font:600 17px var(--font);cursor:pointer}",
    ".pc-go:disabled{opacity:.55}",
    ".pc-ph{position:relative;width:104px;margin:0 auto}",
    ".pc-ph button{position:absolute;bottom:0;left:0;width:36px;height:36px;border-radius:50%;border:3px solid #151f33;background:#4ea4ff;color:#fff;display:grid;place-items:center}",
    ".pc-ph svg{width:18px;height:18px}",
    ".pc-x{position:absolute;top:12px;left:12px;background:#1f2b44!important}",
    ".pc-tg{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:14px;background:#1b2740;border-radius:14px;padding:12px 14px;text-align:right}",
    ".pc-tg b{font-size:15px}.pc-tg small{display:block;color:#8fa6d1;font-size:12px}",
    ".pc-sw2{width:50px;height:30px;border-radius:15px;border:0;background:#2a3a5c;position:relative;flex:none;cursor:pointer}",
    ".pc-sw2 i{position:absolute;top:3px;right:3px;width:24px;height:24px;border-radius:50%;background:#fff;transition:right .2s}",
    ".pc-sw2.on{background:#4ea4ff}.pc-sw2.on i{right:23px}"
  ].join("\n");
  document.head.appendChild(css);

  /* ---------- helpers ---------- */
  function el(h) { var d = document.createElement("div"); d.innerHTML = h.trim(); return d.firstChild; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "\x26amp;", "<": "\x26lt;", ">": "\x26gt;", '"': "\x26quot;", "'": "\x26#39;" }[c]; }); }
  function linkify(s) {
    return esc(s).replace(/(https?:\/\/[^\s<]+|t\.me\/[^\s<]+)/g, function (u) {
      return '\x3ca href="' + (u.indexOf("http") === 0 ? u : "https://" + u) + '" data-ext="1">' + u + "\x3c/a>";
    });
  }
  function toast(t) { var e = document.getElementById("toast"); if (!e) return; e.textContent = t; e.hidden = false; e.style.zIndex = 90; clearTimeout(toast.t); toast.t = setTimeout(function () { e.hidden = true; }, 2600); }
  function money(v) { v = +v || 0; var d = v < 1 ? 4 : v < 10 ? 3 : 2; return "$" + v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function pct(v) { v = +v || 0; return (v >= 0 ? "▲ +" : "▼ ") + v.toFixed(2) + "%"; }
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
    if (s < 3600) return "آخر ظهور قبل " + Math.max(1, Math.round(s / 60)) + " دقيقة";
    if (s < 86400) return "آخر ظهور قبل " + Math.round(s / 3600) + " ساعة";
    return "آخر ظهور " + dayName(t);
  }
  function color(uid) { var h = 0; uid = String(uid || ""); for (var i = 0; i < uid.length; i++) h = (h * 31 + uid.charCodeAt(i)) | 0; return COLORS[Math.abs(h) % COLORS.length]; }
  function av(photo, name, size, uid) {
    var cls = "pc-av" + (size ? " " + size : "");
    if (photo) return '\x3cdiv class="' + cls + '">\x3cimg src="' + esc(photo) + '" alt="">\x3c/div>';
    var n = String(name || "?").trim();
    return '\x3cdiv class="' + cls + '" style="background:' + color(uid || n) + '">' + esc(n.charAt(0).toUpperCase() || "?") + "\x3c/div>";
  }
  function roomAv(size) {
    if (room.photo) return av(room.photo, "", size);
    var px = size === "big" ? 48 : 22;
    return '\x3cdiv class="pc-av' + (size ? " " + size : "") + '" style="background:linear-gradient(135deg,#2b95f2,#1546b8)">' + I.chat.replace("\x3csvg ", '\x3csvg style="width:' + px + "px;height:" + px + 'px" ') + "\x3c/div>";
  }
  function isVer(uid) { return uid === ADMIN || !!badges[uid]; }
  function vname(uid, name) { return esc(name) + (isVer(uid) ? BADGE : ""); }
  function priceNow() { var s = window.__pg || {}; return { p: +s.price || 0, pct: +s.pct || 0 }; }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
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

  /* ---------- state ---------- */
  var C = null, me = null, myProfile = null, people = {}, badges = {};
  var room = { name: "المحادثة", bio: "", photo: "", verified: false, pin: null };
  var msgs = [], lastRead = +(lsGet("pc.read") || 0), members = 0, online = 0;
  var tab = "price", chatUI = null, meUI = null;

  /* ---------- Firebase ---------- */
  var booting = null;
  function boot() {
    if (booting) return booting;
    booting = Promise.all([
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
        C = { f: m[2], db: db };
        return C.f.getDoc(C.f.doc(db, "users", me)).then(function (s) {
          myProfile = s.exists() ? s.data() : null;
          if (myProfile) { people[me] = myProfile; lsSet("pc.joined", "1"); }
          live();
          return C;
        });
      });
    });
    booting.catch(function () { booting = null; });
    return booting;
  }

  /* live data: messages, room info, verified badges */
  function live() {
    var F = C.f, db = C.db;
    F.onSnapshot(F.query(F.collection(db, "rooms", ROOM, "messages"), F.orderBy("ts", "desc"), F.limit(80)), { includeMetadataChanges: true }, function (snap) {
      msgs = snap.docs.map(function (d) { var x = d.data(); x.id = d.id; x._p = d.metadata.hasPendingWrites; return x; }).reverse();
      if (chatUI) chatUI.render();
      unread();
    }, function () {});
    F.onSnapshot(F.doc(db, "rooms", ROOM), function (s) {
      var d = s.exists() ? s.data() : {};
      room = { name: d.name || "المحادثة", bio: d.bio || "", photo: d.photo || "", verified: !!d.verified, pin: d.pin || null };
      if (chatUI) chatUI.head();
    }, function () {});
    F.onSnapshot(F.collection(db, "badges"), function (s) {
      badges = {};
      s.docs.forEach(function (d) { badges[d.id] = 1; });
      if (chatUI) { chatUI.render(); chatUI.head(); }
      if (meUI) meUI.render();
    }, function () {});
    stats();
    setInterval(function () { if (tab !== "price") stats(); }, 60000);
  }
  function stats() {
    var F = C.f, db = C.db;
    if (myProfile) F.updateDoc(F.doc(db, "users", me), { last: F.serverTimestamp() }).catch(function () {});
    F.getCountFromServer(F.collection(db, "users")).then(function (r) { members = r.data().count; if (chatUI) chatUI.head(); }).catch(function () {});
    F.getCountFromServer(F.query(F.collection(db, "users"), F.where("last", ">", F.Timestamp.fromMillis(Date.now() - 150000))))
      .then(function (r) { online = r.data().count; if (chatUI) chatUI.head(); }).catch(function () {});
  }
  function unread() {
    var n = 0;
    msgs.forEach(function (m) { if (m.uid !== me && ms(m.ts) > lastRead) n++; });
    var b = nav.querySelector(".pc-nb");
    if (n && tab !== "chat") { b.hidden = false; b.textContent = n > 99 ? "99+" : n; } else b.hidden = true;
  }
  function markRead() {
    if (!msgs.length) return;
    var t = ms(msgs[msgs.length - 1].ts);
    if (t > lastRead) { lastRead = t; lsSet("pc.read", String(t)); }
    unread();
  }
  function person(uid, cb) {
    if (people[uid]) return people[uid];
    if (people[uid] === undefined && C) {
      people[uid] = null;
      C.f.getDoc(C.f.doc(C.db, "users", uid)).then(function (s) { people[uid] = s.exists() ? s.data() : {}; if (cb) cb(); }).catch(function () { delete people[uid]; });
    }
    return null;
  }

  /* ---------- sheets + phone back button ---------- */
  var stack = [];
  function push(node, onClose) {
    node.classList.add("pc-ns");
    document.body.appendChild(node);
    stack.push({ node: node, onClose: onClose });
    try { history.pushState({ pc: 1 }, ""); } catch (e) {}
  }
  function popTop() {
    var top = stack.pop();
    if (!top) return;
    if (top.onClose) try { top.onClose(); } catch (e) {}
    if (top.node.parentNode) top.node.parentNode.removeChild(top.node);
  }
  function close() { if (stack.length) { try { history.back(); } catch (e) { popTop(); } } }
  window.addEventListener("popstate", function () {
    if (stack.length) popTop();
    else if (tab !== "price") setTab("price", true);
  });
  function sheet(inner, withX) {
    var node = el('\x3cdiv class="pc-sh">\x3cdiv class="pc-sb">' + (withX ? '\x3cbutton class="pc-ib pc-x">' + I.close + "\x3c/button>" : '\x3cdiv class="grab">\x3c/div>') + inner + "\x3c/div>\x3c/div>");
    var t0 = Date.now();
    /* the finger lifting after a long press must not tap anything in the new sheet */
    node.addEventListener("click", function (e) { if (Date.now() - t0 < 500) { e.stopPropagation(); e.preventDefault(); } }, true);
    node.addEventListener("click", function (e) { if (e.target === node) close(); });
    var x = node.querySelector(".pc-x");
    if (x) x.addEventListener("click", close);
    return node;
  }

  /* ---------- bottom nav ---------- */
  var nav = el('\x3cnav class="pc-nav pc-ns">' +
    '\x3cbutton data-t="price" class="on">\x3ci>' + I.price + "\x3c/i>السعر\x3c/button>" +
    '\x3cbutton data-t="chat">\x3ci>' + I.chat + '\x3c/i>المحادثة\x3cspan class="pc-nb" hidden>\x3c/span>\x3c/button>' +
    '\x3cbutton data-t="me">\x3ci>' + I.user + "\x3c/i>ملفي\x3c/button>\x3c/nav>");
  document.body.appendChild(nav);
  nav.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-t]");
    if (!b) return;
    var t = b.getAttribute("data-t");
    if (t === tab) { if (t === "chat" && chatUI) chatUI.bottom(); return; }
    if (t === "price") { try { history.back(); } catch (er) { setTab("price", true); } return; }
    setTab(t, false);
  });
  function setTab(t, fromPop) {
    var was = tab;
    tab = t;
    [].forEach.call(nav.querySelectorAll("button"), function (b) { b.classList.toggle("on", b.getAttribute("data-t") === t); });
    if (chatUI) chatUI.node.hidden = t !== "chat";
    if (meUI) meUI.node.hidden = t !== "me";
    if (t !== "price" && was === "price" && !fromPop) { try { history.pushState({ pcTab: 1 }, ""); } catch (e) {} }
    if (t === "chat") openChat();
    if (t === "me") openMe();
    unread();
  }
  function goPrice(sel) {
    if (tab !== "price") { try { history.back(); } catch (e) { setTab("price", true); } }
    setTimeout(function () {
      var x = sel && document.querySelector(sel);
      if (x) { var s = x.closest("section") || x; s.scrollIntoView({ behavior: "smooth", block: "start" }); }
    }, 250);
  }
  /* the old header chat button is not needed anymore */
  var oldBtn = document.getElementById("chatBtn");
  if (oldBtn) oldBtn.remove();
  if (lsGet("pc.joined") === "1") setTimeout(function () { boot().catch(function () {}); }, 2500);

  /* ---------- profile: edit ---------- */
  function editProfile(first, done) {
    var F = C.f, db = C.db, p = myProfile || {}, photo = p.photo || "";
    var node = sheet('\x3cdiv class="pc-pad">\x3cdiv class="pc-pr">\x3ch3 style="margin:8px 0 2px">' + (first ? "أهلاً بيك" : "تعديل الملف") + '\x3c/h3>\x3cdiv class="s">' +
      (first ? "سوّي ملفك حتى يعرفك الناس بالمحادثة" : "تگدر تغيّر أي شي") + "\x3c/div>" +
      '\x3cdiv class="pc-ph" style="margin-top:14px">\x3cspan id="pfAv">' + av(photo, p.name || "?", "big", me) + '\x3c/span>\x3cbutton id="pfPh">' + I.cam + "\x3c/button>\x3c/div>" +
      '\x3cinput type="file" id="pfF" accept="image/*" hidden>\x3c/div>' +
      '\x3clabel class="pc-f">\x3cspan>الاسم\x3c/span>\x3cinput id="pfN" maxlength="32" placeholder="اسمك" value="' + esc(p.name || "") + '">\x3c/label>' +
      '\x3clabel class="pc-f">\x3cspan>اسم المستخدم\x3c/span>\x3cdiv class="pc-u">\x3cb>@\x3c/b>\x3cinput id="pfU" maxlength="32" placeholder="username" autocapitalize="off" autocomplete="off" spellcheck="false" value="' + esc(p.user || "") + '">\x3c/div>' +
      '\x3cdiv class="h" id="pfUh">حروف إنكليزية وأرقام و _ ، من 5 حروف أو أكثر\x3c/div>\x3c/label>' +
      '\x3clabel class="pc-f">\x3cspan>البايو\x3c/span>\x3ctextarea id="pfB" rows="3" maxlength="140" placeholder="اكتب شي عنك (اختياري)">' + esc(p.bio || "") + "\x3c/textarea>\x3c/label>" +
      '\x3cbutton class="pc-go" id="pfGo">' + (first ? "ادخل المحادثة" : "حفظ") + "\x3c/button>\x3c/div>", !first);
    var $n = node.querySelector("#pfN"), $u = node.querySelector("#pfU"), $h = node.querySelector("#pfUh"), $go = node.querySelector("#pfGo");
    var pf = node.querySelector("#pfF");
    node.querySelector("#pfPh").addEventListener("click", function () { pf.click(); });
    pickImage(pf, 192, function (d) { photo = d; node.querySelector("#pfAv").innerHTML = av(photo, "", "big"); });
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
        F.getDoc(F.doc(db, "usernames", u)).then(function (s) {
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
      F.runTransaction(db, function (tx) {
        var ref = F.doc(db, "usernames", user);
        return tx.get(ref).then(function (s) {
          if (s.exists() && s.data().uid !== me) throw new Error("taken");
          if (!s.exists()) tx.set(ref, { uid: me });
          if (old && old !== user) tx.delete(F.doc(db, "usernames", old));
          tx.set(F.doc(db, "users", me), { name: name, user: user, bio: bio, photo: photo, last: F.serverTimestamp() });
        });
      }).then(function () {
        myProfile = { name: name, user: user, bio: bio, photo: photo, last: Date.now() };
        people[me] = myProfile;
        lsSet("pc.joined", "1");
        toast("تم الحفظ");
        if (chatUI) chatUI.render();
        if (meUI) meUI.render();
        close();
        if (done) setTimeout(done, 80);
      }).catch(function (e) {
        $go.disabled = false;
        toast(String(e && e.message) === "taken" ? "هذا اليوزر انأخذ هسه، اختار غيره" : "ما گدرت أحفظ، حاول مرة ثانية");
      });
    });
    push(node);
    if (p.user) check();
  }

  /* ---------- profile: view ---------- */
  function showProfile(uid) {
    var F = C.f, db = C.db;
    var node = sheet('\x3cdiv class="pc-pad">\x3cdiv class="pc-pr" id="pv">\x3cdiv class="pc-load" style="padding:30px">جاري التحميل...\x3c/div>\x3c/div>\x3c/div>', true);
    push(node);
    function draw(u) {
      var h = av(u.photo, u.name, "big", uid) + "\x3ch3>" + vname(uid, u.name || "مستخدم") + "\x3c/h3>" +
        (u.user ? '\x3cdiv class="u">@' + esc(u.user) + "\x3c/div>" : "") +
        '\x3cdiv class="s">' + seen(ms(u.last)) + "\x3c/div>" +
        (u.bio ? '\x3cdiv class="pc-bio">\x3csmall>البايو\x3c/small>' + linkify(u.bio) + "\x3c/div>" : "") + "\x3c/div>";
      var acts = "";
      if (uid === me) acts += '\x3cbutton class="pc-it" data-a="edit">' + I.edit + "تعديل ملفي\x3c/button>";
      if (me === ADMIN && uid !== ADMIN) {
        acts += '\x3cbutton class="pc-it" data-a="ver">' + I.verify + (badges[uid] ? "سحب علامة التوثيق" : "منح علامة التوثيق") + "\x3c/button>";
        acts += '\x3cbutton class="pc-it r" data-a="ban">' + I.ban + "حظر هذا الشخص\x3c/button>";
      }
      var pv = node.querySelector("#pv");
      pv.innerHTML = h;
      if (acts) pv.insertAdjacentHTML("afterend", '\x3cdiv class="pc-grp" style="margin-top:16px">' + acts + "\x3c/div>");
      node.querySelector(".pc-pad").addEventListener("click", function (e) {
        var b = e.target.closest("[data-a]");
        if (b) {
          var a = b.getAttribute("data-a");
          if (a === "edit") { close(); setTimeout(function () { editProfile(false); }, 80); }
          else if (a === "ver") { setBadge(uid, !badges[uid], u.name); close(); }
          else if (a === "ban") { banUser(uid, u.name); close(); }
          return;
        }
        var l = e.target.closest("a[data-ext]");
        if (l) { e.preventDefault(); try { A.openUrl(l.href); } catch (er) {} }
      });
    }
    F.getDoc(F.doc(db, "users", uid)).then(function (s) { var u = s.exists() ? s.data() : {}; people[uid] = u; draw(u); })
      .catch(function () { node.querySelector("#pv").innerHTML = '\x3cdiv class="pc-load">ما گدرت أجيب الملف\x3c/div>'; });
  }

  function setBadge(uid, on, name) {
    var F = C.f, ref = F.doc(C.db, "badges", uid);
    (on ? F.setDoc(ref, { ts: F.serverTimestamp() }) : F.deleteDoc(ref))
      .then(function () { toast(on ? "انمنحت علامة التوثيق لـ " + (name || "الشخص") : "انسحبت علامة التوثيق"); })
      .catch(function () { toast("ما گدرت أغيّر التوثيق"); });
  }
  function banUser(uid, name) {
    var F = C.f;
    F.setDoc(F.doc(C.db, "bans", uid), { name: name || "", ts: F.serverTimestamp() })
      .then(function () { toast("تم حظر " + (name || "الشخص")); })
      .catch(function () { toast("ما گدرت أحظره"); });
  }

  /* ---------- room info + edit (developer) ---------- */
  function roomInfo() {
    var h = '\x3cdiv class="pc-pad">\x3cdiv class="pc-pr">' + roomAv("big") + "\x3ch3>" + esc(room.name) + (room.verified ? BADGE : "") + "\x3c/h3>" +
      '\x3cdiv class="s">' + members.toLocaleString("en-US") + " عضوًا، " + online.toLocaleString("en-US") + " متصلاً\x3c/div>" +
      (room.bio ? '\x3cdiv class="pc-bio">\x3csmall>الوصف\x3c/small>' + linkify(room.bio) + "\x3c/div>" : "") + "\x3c/div>" +
      '\x3cdiv class="pc-grp" style="margin-top:16px">' +
      (me === ADMIN ? '\x3cbutton class="pc-it" data-a="edit">' + I.edit + "تعديل المحادثة\x3csmall style=\"margin-right:auto\">الصورة · الاسم · الوصف · التوثيق\x3c/small>\x3c/button>" : "") +
      '\x3cbutton class="pc-it" data-a="me">' + I.user + "ملفي الشخصي\x3c/button>\x3c/div>\x3c/div>";
    var node = sheet(h, true);
    node.addEventListener("click", function (e) {
      var b = e.target.closest("[data-a]");
      if (b) {
        var a = b.getAttribute("data-a");
        close();
        setTimeout(function () { if (a === "edit") editRoom(); else showProfile(me); }, 80);
        return;
      }
      var l = e.target.closest("a[data-ext]");
      if (l) { e.preventDefault(); try { A.openUrl(l.href); } catch (er) {} }
    });
    push(node);
  }

  function editRoom() {
    var F = C.f, photo = room.photo || "", ver = !!room.verified;
    var node = sheet('\x3cdiv class="pc-pad">\x3cdiv class="pc-pr">\x3ch3 style="margin:8px 0 14px">تعديل المحادثة\x3c/h3>' +
      '\x3cdiv class="pc-ph">\x3cspan id="erAv">' + roomAv("big") + '\x3c/span>\x3cbutton id="erPh">' + I.cam + "\x3c/button>\x3c/div>" +
      '\x3cinput type="file" id="erF" accept="image/*" hidden>\x3c/div>' +
      '\x3clabel class="pc-f">\x3cspan>اسم المحادثة\x3c/span>\x3cinput id="erN" maxlength="40" value="' + esc(room.name) + '">\x3c/label>' +
      '\x3clabel class="pc-f">\x3cspan>الوصف (البايو)\x3c/span>\x3ctextarea id="erB" rows="4" maxlength="400" placeholder="اكتب وصف للمحادثة">' + esc(room.bio) + "\x3c/textarea>\x3c/label>" +
      '\x3cdiv class="pc-tg">\x3cdiv>\x3cb>علامة التوثيق\x3c/b>\x3csmall>تبين يم اسم المحادثة\x3c/small>\x3c/div>\x3cbutton class="pc-sw2' + (ver ? " on" : "") + '" id="erV">\x3ci>\x3c/i>\x3c/button>\x3c/div>' +
      '\x3cbutton class="pc-it r" id="erDel" style="justify-content:center;margin-top:8px">' + I.trash + "شيل الصورة\x3c/button>" +
      '\x3cbutton class="pc-go" id="erGo">حفظ\x3c/button>\x3c/div>', true);
    var f = node.querySelector("#erF");
    node.querySelector("#erPh").addEventListener("click", function () { f.click(); });
    pickImage(f, 256, function (d) { photo = d; node.querySelector("#erAv").innerHTML = av(photo, "", "big"); });
    node.querySelector("#erDel").addEventListener("click", function () { photo = ""; var keep = room.photo; room.photo = ""; node.querySelector("#erAv").innerHTML = roomAv("big"); room.photo = keep; });
    node.querySelector("#erV").addEventListener("click", function () { ver = !ver; this.classList.toggle("on", ver); });
    node.querySelector("#erGo").addEventListener("click", function () {
      var b = this;
      b.disabled = true;
      F.setDoc(F.doc(C.db, "rooms", ROOM), {
        name: node.querySelector("#erN").value.trim() || "المحادثة", bio: node.querySelector("#erB").value.trim(), photo: photo, verified: ver
      }, { merge: true }).then(function () { toast("تم حفظ المحادثة"); close(); })
        .catch(function () { b.disabled = false; toast("ما گدرت أحفظ"); });
    });
    push(node);
  }

  /* ---------- long-press menu ---------- */
  function msgMenu(m, onReply) {
    var mine = m.uid === me, adm = me === ADMIN, pinned = room.pin && room.pin.id === m.id;
    var h = '\x3cbutton class="pc-it" data-a="reply">' + I.reply + "رد\x3c/button>" +
      (m.text ? '\x3cbutton class="pc-it" data-a="copy">' + I.copy + "نسخ النص\x3c/button>" : "") +
      (adm ? '\x3cbutton class="pc-it" data-a="pin">' + I.pin + (pinned ? "إلغاء التثبيت" : "تثبيت الرسالة") + "\x3c/button>" : "") +
      '\x3cbutton class="pc-it" data-a="prof">' + I.user + "ملف " + esc(m.name || "المرسل") + "\x3c/button>" +
      (adm && !mine ? '\x3cbutton class="pc-it" data-a="ver">' + I.verify + (badges[m.uid] ? "سحب التوثيق" : "منح التوثيق") + "\x3c/button>" : "") +
      (mine || adm ? '\x3cbutton class="pc-it r" data-a="del">' + I.trash + "حذف الرسالة\x3c/button>" : "") +
      (adm && !mine ? '\x3cbutton class="pc-it r" data-a="ban">' + I.ban + "حظر " + esc(m.name || "المرسل") + "\x3c/button>" : "");
    var node = sheet(h, false);
    node.addEventListener("click", function (e) {
      var b = e.target.closest("[data-a]");
      if (!b) return;
      var a = b.getAttribute("data-a"), F = C.f;
      close();
      setTimeout(function () {
        if (a === "reply") onReply(m);
        else if (a === "copy") { try { navigator.clipboard.writeText(m.text || ""); toast("انسخ النص"); } catch (er) {} }
        else if (a === "prof") showProfile(m.uid);
        else if (a === "ver") setBadge(m.uid, !badges[m.uid], m.name);
        else if (a === "pin") F.setDoc(F.doc(C.db, "rooms", ROOM), { pin: pinned ? null : { id: m.id, name: m.name || "", text: (m.text || (m.price ? "سعر GRAM " + money(m.price) : "")).slice(0, 140) } }, { merge: true })
          .then(function () { toast(pinned ? "انلغى التثبيت" : "انثبتت الرسالة"); }).catch(function () { toast("ما گدرت أثبتها"); });
        else if (a === "del") F.deleteDoc(F.doc(C.db, "rooms", ROOM, "messages", m.id)).then(function () { toast("انحذفت"); }).catch(function () { toast("ما گدرت أحذفها"); });
        else if (a === "ban") banUser(m.uid, m.name);
      }, 80);
    });
    push(node);
  }

  /* ---------- chat tab ---------- */
  function openChat() {
    if (!chatUI) buildChat();
    chatUI.node.hidden = false;
    if (!C) {
      chatUI.loading("جاري فتح المحادثة...");
      boot().then(function () { readyChat(); }).catch(function () { chatUI.loading("ما گدرت أفتح المحادثة\x3cbr>تأكد من النت وارجع افتحها"); });
    } else readyChat();
  }
  function readyChat() {
    if (!myProfile || !myProfile.user) {
      chatUI.loading("سوّي ملفك حتى تگدر تحچي بالمحادثة");
      editProfile(true, function () { chatUI.ready(); });
    } else chatUI.ready();
    stats();
  }

  function buildChat() {
    var node = el('\x3cdiv class="pc-pn pc-ns" hidden>' +
      '\x3cdiv class="pc-h">\x3cdiv class="pc-ttl" id="cT">\x3cspan id="cAv">\x3c/span>\x3cdiv style="min-width:0">\x3cb id="cN">\x3c/b>\x3cspan id="cS">\x3c/span>\x3c/div>\x3c/div>' +
      '\x3cbutton class="pc-ib" id="cM" aria-label="خيارات">' + I.more + "\x3c/button>\x3c/div>" +
      '\x3cdiv class="pc-pin" id="cP">\x3ci>\x3c/i>\x3cdiv class="tx">\x3cb>\x3c/b>\x3cspan>\x3c/span>\x3c/div>\x3cdiv class="pr">\x3c/div>\x3c/div>' +
      '\x3cdiv class="pc-wall">\x3cdiv class="pc-list" id="cL">\x3c/div>\x3cdiv class="pc-sw" id="cSw">' + I.reply + '\x3c/div>\x3cbutton class="pc-dn" id="cD" hidden>' + I.down + "\x3cspan hidden>\x3c/span>\x3c/button>\x3c/div>" +
      '\x3cdiv class="pc-rb" id="cR" hidden>' + I.reply + '\x3cdiv>\x3cb>\x3c/b>\x3cspan>\x3c/span>\x3c/div>\x3cbutton class="pc-ib" id="cRx">' + I.close + "\x3c/button>\x3c/div>" +
      '\x3cdiv class="pc-bar">\x3cdiv class="pc-inw">\x3ctextarea class="pc-in" id="cI" rows="1" placeholder="الرسالة">\x3c/textarea>' +
      '\x3cbutton class="pc-ib" id="cPr" aria-label="شارك السعر">' + I.price + "\x3c/button>\x3c/div>" +
      '\x3cbutton class="pc-send" id="cSend" aria-label="إرسال">' + I.send + "\x3c/button>\x3c/div>\x3c/div>");
    document.body.appendChild(node);
    var $l = node.querySelector("#cL"), $i = node.querySelector("#cI"), $r = node.querySelector("#cR"), $d = node.querySelector("#cD"), $sw = node.querySelector("#cSw");
    var isReady = false, replyTo = null, newWhileUp = 0, lastCount = 0;

    function atBottom() { return $l.scrollHeight - $l.scrollTop - $l.clientHeight < 80; }
    function bottom() { $l.scrollTop = $l.scrollHeight; newWhileUp = 0; downBtn(); markRead(); }
    function downBtn() {
      $d.hidden = atBottom();
      var s = $d.querySelector("span");
      s.hidden = !newWhileUp;
      s.textContent = newWhileUp;
    }
    $l.addEventListener("scroll", function () { if (atBottom()) { newWhileUp = 0; markRead(); } downBtn(); }, { passive: true });
    $d.addEventListener("click", function () { $l.scrollTo({ top: $l.scrollHeight, behavior: "smooth" }); newWhileUp = 0; setTimeout(markRead, 400); });

    function head() {
      node.querySelector("#cAv").innerHTML = roomAv();
      node.querySelector("#cN").innerHTML = esc(room.name) + (room.verified ? BADGE : "");
      node.querySelector("#cS").textContent = members ? members.toLocaleString("en-US") + " عضوًا، " + online.toLocaleString("en-US") + " متصلاً" : "محادثة عامة";
      pin();
    }
    function pin() {
      var P = node.querySelector("#cP"), p = priceNow();
      P.querySelector("b").textContent = room.pin ? "رسالة مثبتة" : "السعر الحالي";
      P.querySelector(".tx span").textContent = room.pin ? (room.pin.name ? room.pin.name + ": " : "") + room.pin.text : "GRAM / USDT";
      P.querySelector(".pr").innerHTML = p.p ? money(p.p) + '\x3cem style="color:' + (p.pct >= 0 ? "#5fe3a1" : "#ff8a95") + '">' + pct(p.pct) + "\x3c/em>" : "—";
    }
    setInterval(function () { if (tab === "chat") pin(); }, 2000);

    function render() {
      if (!isReady) return;
      if (!msgs.length) { $l.innerHTML = '\x3cdiv class="pc-empty">ما بيها رسائل بعد\x3cbr>كون أول واحد يكتب\x3c/div>'; return; }
      var wasBottom = atBottom() || !lastCount;
      var added = msgs.length - lastCount;
      var h = "", lastDay = "";
      msgs.forEach(function (m, i) {
        var t = ms(m.ts), d = dayName(t), pv = msgs[i - 1], nx = msgs[i + 1];
        if (d !== lastDay) { h += '\x3cdiv class="pc-day">' + d + "\x3c/div>"; lastDay = d; }
        var first = !pv || pv.uid !== m.uid || dayName(ms(pv.ts)) !== d;
        var last = !nx || nx.uid !== m.uid || dayName(ms(nx.ts)) !== d;
        var mine = m.uid === me, pp = (mine ? myProfile : person(m.uid, render)) || {};
        var nc = color(m.uid);
        h += '\x3cdiv class="pc-row' + (mine ? " mine" : "") + (first ? " gs" : "") + '" data-id="' + esc(m.id) + '">' +
          (last ? '\x3cspan data-u="' + esc(m.uid) + '">' + av(pp.photo, pp.name || m.name, "sm", m.uid) + "\x3c/span>" : '\x3cspan class="sp">\x3c/span>') +
          '\x3cdiv class="pc-m' + (last ? " tl" : "") + '">' +
          (!mine && first ? '\x3cdiv class="n" data-u="' + esc(m.uid) + '" style="color:' + nc + '">' + vname(m.uid, m.name || "مستخدم") + "\x3c/div>" : "") +
          (m.rep ? '\x3cdiv class="pc-q" data-j="' + esc(m.rep.id || "") + '" style="color:' + (mine ? "#d6e6ff" : color(m.rep.uid || m.rep.name)) + '">\x3cb>' + esc(m.rep.name || "") + "\x3c/b>\x3cspan>" + esc(m.rep.text || "") + "\x3c/span>\x3c/div>" : "") +
          (m.price ? '\x3cdiv class="pc-card">\x3cspan>سعر GRAM\x3c/span>\x3cb>' + money(m.price) + '\x3c/b>\x3cem style="color:' + ((m.pct || 0) >= 0 ? "#5fe3a1" : "#ff8a95") + '">' + pct(m.pct) + "\x3c/em>\x3c/div>" : "") +
          (m.text ? linkify(m.text) : "") +
          '\x3cdiv class="t">' + hm(t) + (mine ? (m._p ? I.clock : I.tick) : "") + "\x3c/div>\x3c/div>\x3c/div>";
      });
      $l.innerHTML = h;
      if (wasBottom) { $l.scrollTop = $l.scrollHeight; if (tab === "chat") markRead(); }
      else if (added > 0 && lastCount) newWhileUp += added;
      lastCount = msgs.length;
      downBtn();
    }

    function loading(t) { isReady = false; $l.innerHTML = '\x3cdiv class="pc-load">' + t + "\x3c/div>"; }
    function ready() { isReady = true; lastCount = 0; head(); render(); setTimeout(bottom, 50); }

    function findMsg(target) {
      var r = target.closest(".pc-row");
      if (!r) return null;
      var id = r.getAttribute("data-id");
      for (var i = 0; i < msgs.length; i++) if (msgs[i].id === id) return msgs[i];
      return null;
    }
    function doReply(m) {
      replyTo = { id: m.id, uid: m.uid, name: m.name || "", text: (m.text || (m.price ? "سعر GRAM " + money(m.price) : "")).slice(0, 90) };
      $r.querySelector("b").textContent = "رد على " + (m.name || "");
      $r.querySelector("span").textContent = replyTo.text;
      $r.hidden = false;
      $i.focus();
    }
    function jump(id) {
      var r = $l.querySelector('.pc-row[data-id="' + (window.CSS && CSS.escape ? CSS.escape(id) : id) + '"]');
      if (!r) { toast("الرسالة قديمة وما موجودة"); return; }
      r.scrollIntoView({ behavior: "smooth", block: "center" });
      r.classList.add("pc-hl");
      setTimeout(function () { r.classList.remove("pc-hl"); }, 1400);
    }

    /* taps */
    node.querySelector("#cT").addEventListener("click", function () { if (C) roomInfo(); });
    node.querySelector("#cM").addEventListener("click", function () { if (C) roomInfo(); });
    node.querySelector("#cP").addEventListener("click", function () { if (room.pin) jump(room.pin.id); });
    node.querySelector("#cRx").addEventListener("click", function () { replyTo = null; $r.hidden = true; });
    $l.addEventListener("click", function (e) {
      var a = e.target.closest("a[data-ext]");
      if (a) { e.preventDefault(); try { A.openUrl(a.href); } catch (er) {} return; }
      var q = e.target.closest(".pc-q[data-j]");
      if (q && q.getAttribute("data-j")) { jump(q.getAttribute("data-j")); return; }
      var n = e.target.closest("[data-u]");
      if (n) showProfile(n.getAttribute("data-u"));
    });

    /* swipe left to reply + long press menu */
    var tr = null;
    $l.addEventListener("touchstart", function (e) {
      var row = e.target.closest(".pc-row");
      if (!row) return;
      var t0 = e.touches[0];
      tr = { row: row, x: t0.clientX, y: t0.clientY, mode: null, dx: 0 };
      tr.lp = setTimeout(function () {
        if (!tr || tr.mode) return;
        var m = findMsg(row);
        tr = null;
        if (m) { try { navigator.vibrate && navigator.vibrate(15); } catch (er) {} msgMenu(m, doReply); }
      }, 450);
    }, { passive: true });
    $l.addEventListener("touchmove", function (e) {
      if (!tr) return;
      var t = e.touches[0], dx = tr.x - t.clientX, dy = t.clientY - tr.y;
      if (!tr.mode) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        clearTimeout(tr.lp);
        tr.mode = Math.abs(dx) > Math.abs(dy) && dx > 0 ? "swipe" : "scroll";
        if (tr.mode === "swipe") tr.row.style.transition = "none";
      }
      if (tr.mode !== "swipe") return;
      e.preventDefault();
      tr.dx = Math.max(0, Math.min(90, dx));
      tr.row.style.transform = "translateX(" + (-tr.dx) + "px)";
      var rb = tr.row.getBoundingClientRect(), wb = $l.getBoundingClientRect();
      $sw.style.top = (rb.top - wb.top + rb.height / 2 - 17) + "px";
      $sw.style.opacity = Math.min(1, tr.dx / 60);
      if (tr.dx >= 60 && !tr.buzz) { tr.buzz = 1; try { navigator.vibrate && navigator.vibrate(10); } catch (er) {} }
    }, { passive: false });
    function endTouch() {
      if (!tr) return;
      clearTimeout(tr.lp);
      if (tr.mode === "swipe") {
        tr.row.style.transition = "";
        tr.row.style.transform = "";
        $sw.style.opacity = 0;
        if (tr.dx >= 60) { var m = findMsg(tr.row); if (m) doReply(m); }
      }
      tr = null;
    }
    $l.addEventListener("touchend", endTouch, { passive: true });
    $l.addEventListener("touchcancel", endTouch, { passive: true });
    $l.addEventListener("contextmenu", function (e) { e.preventDefault(); });

    $i.addEventListener("input", function () { $i.style.height = "auto"; $i.style.height = Math.min(120, $i.scrollHeight) + "px"; });

    function send(extra) {
      if (!C || !isReady) return;
      var F = C.f, text = $i.value.trim();
      if (!text && !extra) return;
      var data = { uid: me, name: (myProfile && myProfile.name) || "", user: (myProfile && myProfile.user) || "", text: text, ts: F.serverTimestamp(), rep: replyTo || null };
      if (extra) { data.price = extra.p; data.pct = extra.pct; }
      $i.value = ""; $i.style.height = "auto";
      replyTo = null; $r.hidden = true;
      F.addDoc(F.collection(C.db, "rooms", ROOM, "messages"), data).catch(function (e) {
        toast(String(e && e.code || "").indexOf("permission") >= 0 ? "ما تگدر ترسل بهالمحادثة" : "ما وصلت الرسالة، تأكد من النت");
        if (text && !$i.value) $i.value = text;
      });
      setTimeout(bottom, 30);
    }
    node.querySelector("#cSend").addEventListener("click", function () { send(null); $i.focus(); });
    node.querySelector("#cPr").addEventListener("click", function () {
      var p = priceNow();
      if (!p.p) { toast("انتظر يوصل السعر"); return; }
      send(p);
    });

    chatUI = { node: node, render: render, head: head, loading: loading, ready: ready, bottom: bottom };
  }

  /* ---------- me tab ---------- */
  function openMe() {
    if (!meUI) buildMe();
    meUI.node.hidden = false;
    meUI.render();
    if (!C) boot().then(function () { meUI.render(); }).catch(function () { meUI.render(true); });
  }
  function buildMe() {
    var node = el('\x3cdiv class="pc-pn pc-ns" hidden>\x3cdiv class="pc-me" id="mB">\x3c/div>\x3c/div>');
    document.body.appendChild(node);
    var $b = node.querySelector("#mB");
    function alertsCount() { try { return (JSON.parse(A.get("alerts") || "[]") || []).length; } catch (e) { return 0; } }
    function render(err) {
      var p = myProfile, h = "";
      if (!C) h = '\x3cdiv class="pc-load" style="padding-top:40px">' + (err ? "ما گدرت أتصل، تأكد من النت" : "جاري التحميل...") + "\x3c/div>";
      else if (!p || !p.user) h = '\x3cdiv style="padding-top:20px">' + av("", "?", "big", me).replace('class="pc-av big"', 'class="pc-av big" style="margin:0 auto;background:#2a3a5c"') +
        '\x3ch2 style="margin-top:12px">ما عندك ملف بعد\x3c/h2>\x3cdiv class="s">سوّي ملفك حتى تحچي بالمحادثة\x3c/div>\x3cbutton class="pc-go" data-a="edit" style="max-width:320px">سوّي ملفي\x3c/button>\x3c/div>';
      else h = '\x3cdiv class="pc-pr" data-a="view" style="cursor:pointer">' + av(p.photo, p.name, "big", me).replace('class="pc-av big"', 'class="pc-av big" style="margin:0 auto 10px"') +
        "\x3ch2>" + vname(me, p.name) + '\x3c/h2>\x3cdiv class="u">@' + esc(p.user) + '\x3c/div>\x3cdiv class="s">متصل الآن\x3c/div>\x3c/div>';
      var n = alertsCount();
      h += '\x3cdiv class="pc-grp">' +
        (p && p.user ? '\x3cbutton class="pc-it" data-a="edit">' + I.edit + "\x3cdiv>تعديل الملف\x3csmall>الاسم · اليوزر · البايو · الصورة\x3c/small>\x3c/div>\x3c/button>" : "") +
        '\x3cbutton class="pc-it" data-a="alerts">' + I.bell + "\x3cdiv>التنبيهات\x3c/div>" + (n ? '\x3cspan class="v">' + n + " فعّالة\x3c/span>" : "") + "\x3c/button>" +
        '\x3cbutton class="pc-it" data-a="settings">' + I.gear + "\x3cdiv>الإعدادات\x3csmall>المظهر · الصوت · الإيقاف الليلي\x3c/small>\x3c/div>\x3c/button>" +
        '\x3cbutton class="pc-it" data-a="share">' + I.share + "\x3cdiv>شارك التطبيق\x3c/div>\x3c/button>" +
        (me === ADMIN || A.get("fb.uid") === ADMIN ? '\x3cbutton class="pc-it" data-a="dev">' + I.tool + "\x3cdiv>لوحة المطوّر\x3csmall>تبين لك بس\x3c/small>\x3c/div>\x3c/button>" : "") +
        "\x3c/div>";
      $b.innerHTML = h;
    }
    $b.addEventListener("click", function (e) {
      var b = e.target.closest("[data-a]");
      if (!b) return;
      var a = b.getAttribute("data-a");
      if (a === "edit") { if (C) editProfile(!(myProfile && myProfile.user)); }
      else if (a === "view") { if (C) showProfile(me); }
      else if (a === "alerts") goPrice("#alList");
      else if (a === "settings") goPrice("#themeSeg");
      else if (a === "dev") goPrice("#devCard");
      else if (a === "share") { var s = document.getElementById("share"); if (s) s.click(); }
    });
    meUI = { node: node, render: render };
  }
})();
