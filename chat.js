(function () {
"use strict";
var A = window.Android;
if (!A || !A.get) return;
var ADMIN = "s8AMLzjwJkRd3VQeORgR1wkt4gi1";
var ROOM = "gram";
var V = "10.12.2";
var CFG = { apiKey: "AIzaSyDoT42mdZUl6VIaPYOYolnlpJtOZf93n7E", authDomain: "price-gram.firebaseapp.com", projectId: "price-gram" };
var NAVH = 64;
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
tick2: svg('\x3cpath d="M2 12.5l5 5L18 7"/>\x3cpath d="M11 16.5l1 1L23 7"/>', ' stroke-width="2.2"'),
tick: svg('\x3cpath d="M4 12.5l5 5L20 7"/>', ' stroke-width="2.4"'),
verify: svg('\x3cpath d="M12 2l2.5 1.9 3.1-.2 1 3 2.6 1.7-.9 3 .9 3-2.6 1.7-1 3-3.1-.2L12 22l-2.5-1.9-3.1.2-1-3-2.6-1.7.9-3-.9-3 2.6-1.7 1-3 3.1.2z"/>\x3cpath d="M8.5 12.2l2.4 2.4 4.6-4.8"/>')
};
var BADGE = '\x3csvg class="pc-vb" viewBox="0 0 24 24" aria-label="موثّق">\x3cpath fill="#1d9bf0" stroke="#fff" stroke-width="1.2" d="M12 1.6l2.5 1.9 3.1-.2 1 3 2.6 1.7-.9 3 .9 3-2.6 1.7-1 3-3.1-.2L12 22.4l-2.5-1.9-3.1.2-1-3-2.6-1.7.9-3-.9-3 2.6-1.7 1-3 3.1.2z"/>\x3cpath fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M8 12.3l2.7 2.7L16.2 9.4"/>\x3c/svg>';
var PCOL = [
["#3a3f48", "#14161a", "#c9d1dc", "رمادي"], ["#2f6fd6", "#0d2552", "#62b8ff", "أزرق"], ["#1a9fc4", "#0a3d50", "#5fd1e0", "سماوي"],
["#1f9a66", "#0a3d28", "#5fd4a8", "أخضر"], ["#7558f0", "#24175e", "#b48cff", "بنفسجي"], ["#d84d8f", "#4f1330", "#f08ab5", "وردي"],
["#e9822a", "#5a2a08", "#ffb35c", "برتقالي"], ["#de3f48", "#4f1014", "#ff7a7a", "أحمر"],
["#1c1c1e", "#000000", "#ffffff", "أسود"]
];
var BLACK = 8; /* developer only */
function pcol(u) { var i = u && typeof u.color === "number" ? u.color : -1; return PCOL[i] || null; }
function headBg(u) {
var c = pcol(u) || PCOL[0];
return "background:radial-gradient(circle at 50% 18%," + c[0] + " 0,transparent 62%),radial-gradient(circle,rgba(255,255,255,.07) 0 2.5px,transparent 3px) 0 0/34px 34px," + "linear-gradient(180deg," + c[0] + "," + c[1] + ")";
}
var COLORS = ["#ff7a7a", "#ffb35c", "#5fd4a8", "#62b8ff", "#b48cff", "#f08ab5", "#5fd1e0"];
var css = document.createElement("style");
css.textContent = [
"body{padding-bottom:calc(env(safe-area-inset-bottom,0px) + " + (NAVH + 40) + "px)!important}",
"#live{display:none!important}",
"body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}",
"input,textarea{-webkit-user-select:text;user-select:text;-webkit-touch-callout:default}",
".pc-ns,.pc-ns *{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}",
".pc-ns input,.pc-ns textarea{-webkit-user-select:text;user-select:text;-webkit-touch-callout:default}",
".pc-nav{position:fixed;left:12px;right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 10px);z-index:55;height:" + NAVH + "px;padding:5px;display:flex;align-items:stretch;gap:4px;background:#1b2335;border:1px solid rgba(255,255,255,.08);border-radius:34px;box-shadow:0 8px 28px rgba(0,0,0,.45);font-family:var(--font)}",
".pc-navbg{position:fixed;left:0;right:0;bottom:0;height:calc(env(safe-area-inset-bottom,0px) + " + (NAVH + 20) + "px);z-index:54;background:linear-gradient(180deg,rgba(11,18,34,0),#0b1222 55%);pointer-events:none}",
"html.pc-tabbed body{overflow:hidden!important}",
"html.pc-tabbed .wrap,html.pc-tabbed .banner{visibility:hidden!important}",
".pc-nav button{flex:1;border:0;border-radius:28px;background:none;color:#c9d3e6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;font:600 12.5px var(--font);position:relative;cursor:pointer;transition:background .2s}",
".pc-nav button i{display:grid;place-items:center;height:26px}",
".pc-nav button svg{width:24px;height:24px}",
".pc-nav button i .pc-av{width:26px;height:26px;font-size:12px}",
".pc-nav button.on{color:#5aaeff;background:#2a3753}",
".pc-nb{position:absolute;top:2px;left:calc(50% - 28px);min-width:20px;height:20px;padding:0 6px;border-radius:10px;background:#4ea4ff;color:#fff;font:700 11px/20px var(--font);border:2px solid #0e1628}",
".pc-pn{position:fixed;left:0;right:0;top:0;bottom:calc(" + (NAVH + 20) + "px + env(safe-area-inset-bottom,0px));z-index:50;display:flex;flex-direction:column;background:#0b1222;color:#fff;font-family:var(--font)}",
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
".pc-wall{flex:1;position:relative;overflow:hidden;background:#0d1526 url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='84' height='84'%3E%3Cg fill='%234ea4ff' fill-opacity='.07'%3E%3Ccircle cx='17' cy='25' r='2'/%3E%3Ccircle cx='59' cy='55' r='2'/%3E%3C/g%3E%3Cpath d='M0 84L84 0' stroke='%23fff' stroke-opacity='.025'/%3E%3C/svg%3E\")}",
".pc-list{will-change:scroll-position}",
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
".pc-me{flex:1;overflow-y:auto;padding-bottom:24px;background:#0f1726}",
".pc-hd{position:relative;padding:calc(env(safe-area-inset-top,0px) + 14px) 16px 16px;text-align:center}",
".pc-hd .tb{display:flex;justify-content:space-between;align-items:center;height:48px}",
".pc-hd .tb .pc-ib{width:48px;height:48px;background:rgba(0,0,0,.25);color:#fff}",
".pc-hd .pc-av.xl{width:124px;height:124px;font-size:50px;margin:-30px auto 0;box-shadow:0 6px 24px rgba(0,0,0,.35)}",
".pc-hd h2{margin:14px 0 0;font-size:27px;font-weight:700}",
".pc-hd .s{color:rgba(255,255,255,.72);font-size:15px;margin-top:3px}",
".pc-acts{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px}",
".pc-acts button{border:0;border-radius:20px;background:rgba(255,255,255,.12);color:#fff;padding:13px 4px 11px;display:flex;flex-direction:column;align-items:center;gap:6px;font:600 14px var(--font);cursor:pointer}",
".pc-acts svg{width:26px;height:26px}",
".pc-chips{display:flex;justify-content:center;gap:8px;margin-top:12px;flex-wrap:wrap}",
".pc-chips button{border:0;border-radius:99px;background:rgba(255,255,255,.12);color:#fff;height:36px;padding:0 14px;display:flex;align-items:center;gap:8px;font:600 14px var(--font);cursor:pointer}",
".pc-chips i{width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,.8)}",
".pc-chips svg{width:16px;height:16px}",
".pc-card2{margin:14px 12px 0;background:#1b2335;border-radius:22px;padding:6px 18px;text-align:right}",
".pc-row2{padding:12px 0;border-bottom:1px solid rgba(255,255,255,.06)}",
".pc-row2:last-child{border-bottom:0}",
".pc-row2 b{display:block;font-size:17px;font-weight:500;line-height:1.6;word-wrap:break-word;white-space:pre-wrap}",
".pc-row2 b.ltr{direction:ltr;text-align:right;color:#5aaeff}",
".pc-row2 b a{color:#5aaeff;text-decoration:none}",
".pc-row2 small{display:block;color:#8592ad;font-size:13.5px;margin-top:1px}",
".pc-card2 .pc-it{padding:14px 0;border-bottom:1px solid rgba(255,255,255,.06)}",
".pc-card2 .pc-it:last-child{border-bottom:0}",
".pc-cols{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;padding:10px 22px 6px}",
".pc-cols button{border:0;background:none;color:#c9d3e6;display:flex;flex-direction:column;align-items:center;gap:6px;font:500 13px var(--font);cursor:pointer}",
".pc-cols i{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;border:3px solid transparent}",
".pc-cols button.on i{border-color:#fff}",
".pc-cols svg{width:24px;height:24px;color:#fff}",
".pc-m .tx{font-size:var(--pcfs,16px)}",
".pc-m .ed{font-style:normal;opacity:.75;margin-left:2px}",
".pc-m .mn{color:#7cc0ff;font-weight:600;direction:ltr;unicode-bidi:isolate}",
".pc-row.mine .pc-m .mn{color:#fff;text-decoration:underline}",
".pc-rx{display:flex;flex-wrap:wrap;gap:5px;margin:5px 0 1px}",
".pc-rx button{border:0;height:28px;padding:0 9px;border-radius:14px;background:rgba(255,255,255,.12);color:#fff;font:600 13px var(--font);display:flex;align-items:center;gap:4px;cursor:pointer}",
".pc-rx button.on{background:#4ea4ff}",
".pc-row.mine .pc-rx button{background:rgba(255,255,255,.2)}",
".pc-row.mine .pc-rx button.on{background:#fff;color:#1f4fae}",
".pc-sys{align-self:center;font-size:13px;background:rgba(0,0,0,.35);padding:5px 14px;border-radius:99px;margin:6px 0;text-align:center;cursor:pointer}",
".pc-emo{display:flex;justify-content:space-around;padding:6px 14px 10px;border-bottom:1px solid rgba(255,255,255,.06)}",
".pc-emo button{border:0;background:#1f2b44;width:50px;height:50px;border-radius:50%;font-size:26px;cursor:pointer}",
".pc-emo button.on{background:#4ea4ff}",
".pc-sug{max-height:210px;overflow-y:auto;background:#111a2d;border-top:1px solid rgba(255,255,255,.06)}",
".pc-sug button{display:flex;align-items:center;gap:10px;width:100%;border:0;background:none;color:#fff;padding:8px 14px;font:500 15px var(--font);text-align:right;cursor:pointer}",
".pc-sug button small{color:#8fa6d1;direction:ltr;margin-right:auto}",
".pc-sug .pc-av{width:36px;height:36px;font-size:15px}",
".pc-mem{display:flex;align-items:center;gap:12px;width:100%;border:0;background:none;color:#fff;padding:9px 0;font:500 16px var(--font);text-align:right;cursor:pointer;border-bottom:1px solid rgba(255,255,255,.06)}",
".pc-mem:last-child{border-bottom:0}",
".pc-mem .pc-av{width:44px;height:44px}",
".pc-mem small{display:block;color:#8fa6d1;font-size:13px;font-weight:400}",
".pc-mem small.on{color:#5aaeff}",
".pc-fs{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:8px 18px 4px}",
".pc-fs button{border:2px solid #2a3a5c;border-radius:16px;background:#1b2740;color:#fff;padding:14px 4px;font-family:var(--font);cursor:pointer}",
".pc-fs button.on{border-color:#4ea4ff;background:#203458}",
".pc-sb .pc-hd{border-radius:22px 22px 0 0;margin-top:-10px;padding-top:18px}",
".pc-sb .pc-hd .pc-av.xl{margin-top:0;width:104px;height:104px}",
".pc-grp{margin-top:18px;background:#121c30;border:1px solid rgba(255,255,255,.06);border-radius:18px;text-align:right;overflow:hidden}",
".pc-it{display:flex;align-items:center;gap:14px;width:100%;border:0;background:none;color:#fff;font:500 16px var(--font);padding:14px 16px;cursor:pointer;text-align:right;border-bottom:1px solid rgba(255,255,255,.06)}",
".pc-it:last-child{border-bottom:0}",
".pc-it svg{width:22px;height:22px;flex:none;color:#4ea4ff}",
".pc-it small{display:block;color:#8fa6d1;font-size:12.5px;font-weight:400;margin-top:1px}",
".pc-it.r,.pc-it.r svg{color:#ff6b78}",
".pc-it .v{margin-right:auto;color:#8fa6d1;font-size:13px;font-weight:400}",
".pc-sh{position:fixed;inset:0;z-index:70;background:rgba(0,0,0,.55);display:flex;align-items:flex-end;font-family:var(--font);animation:pcFade .16s ease-out}",
".pc-sh .pc-sb{animation:pcUp .22s cubic-bezier(.2,.8,.2,1)}",
".pc-pn:not([hidden]){animation:pcFade .14s ease-out}",
"@keyframes pcFade{from{opacity:0}to{opacity:1}}",
"@keyframes pcUp{from{transform:translateY(40%)}to{transform:none}}",
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
function el(h) { var d = document.createElement("div"); d.innerHTML = h.trim(); return d.firstChild; }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "\x26amp;", "<": "\x26lt;", ">": "\x26gt;", '"': "\x26quot;", "'": "\x26#39;" }[c]; }); }
function richText(s) {
return linkify(s).replace(/(^|[\s(])@([a-zA-Z][a-zA-Z0-9_]{4,31})/g, function (all, pre, u) { return pre + '\x3cspan class="mn" data-mu="' + u.toLowerCase() + '">@' + u + "\x3c/span>"; });
}
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
var blobs = {};
function pic(d) {
if (!d || d.indexOf("data:") !== 0) return d;
if (blobs[d]) return blobs[d];
try {
var p = d.indexOf(","), bin = atob(d.slice(p + 1)), arr = new Uint8Array(bin.length);
for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
blobs[d] = URL.createObjectURL(new Blob([arr], { type: d.slice(5, d.indexOf(";")) }));
} catch (e) { blobs[d] = d; }
return blobs[d];
}
function av(photo, name, size, uid) {
var cls = "pc-av" + (size ? " " + size : "");
if (photo) return '\x3cdiv class="' + cls + '">\x3cimg src="' + esc(pic(photo)) + '" alt="" decoding="async">\x3c/div>';
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
var C = null, me = null, myProfile = null, people = {}, badges = {};
var room = { name: "المحادثة", bio: "", photo: "", verified: false, pin: null, hideMembers: false };
var msgs = [], lastRead = +(lsGet("pc.read") || 0), members = 0, online = 0;
var tab = "price", chatUI = null, meUI = null, othersRead = 0, readSent = 0, readTimer = 0;
var allUsers = [], usersAt = 0, typing = {}, REACTS = ["👍", "❤️", "🔥", "😂", "😮", "😢"];
var FS = { s: 14, m: 16, l: 19 };
function applyFont() { document.documentElement.style.setProperty("--pcfs", (FS[lsGet("pc.fs") || "m"] || 16) + "px"); }
function notifSet() { var n = (myProfile && myProfile.notif) || {}; return { all: !!n.all, reply: n.reply !== false, react: !!n.react }; }
function loadUsers(force) {
if (!C || (!force && Date.now() - usersAt < 120000)) return Promise.resolve(allUsers);
usersAt = Date.now();
var F = C.f;
return F.getDocs(F.query(F.collection(C.db, "users"), F.orderBy("last", "desc"), F.limit(300))).then(function (s) {
allUsers = s.docs.map(function (d) { var u = d.data(); u.id = d.id; people[d.id] = u; return u; }).filter(function (u) { return u.user; });
return allUsers;
}).catch(function () { return allUsers; });
}
function byUser(name) {
name = String(name || "").toLowerCase();
for (var i = 0; i < allUsers.length; i++) if (allUsers[i].user === name) return allUsers[i];
return null;
}
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
navMe();
live();
return C;
});
});
});
booting.catch(function () { booting = null; });
return booting;
}
function live() {
var F = C.f, db = C.db;
F.onSnapshot(F.query(F.collection(db, "rooms", ROOM, "messages"), F.orderBy("ts", "desc"), F.limit(80)), { includeMetadataChanges: true }, function (snap) {
msgs = snap.docs.map(function (d) { var x = d.data(); x.id = d.id; x._p = d.metadata.hasPendingWrites; return x; }).reverse();
if (chatUI) chatUI.render();
unread();
}, function () {});
F.onSnapshot(F.doc(db, "rooms", ROOM), function (s) {
var d = s.exists() ? s.data() : {};
room = { name: d.name || "المحادثة", bio: d.bio || "", photo: d.photo || "", verified: !!d.verified, pin: d.pin || null, hideMembers: !!d.hideMembers };
if (chatUI) chatUI.head();
}, function () {});
F.onSnapshot(F.collection(db, "badges"), function (s) {
badges = {};
s.docs.forEach(function (d) { badges[d.id] = 1; });
if (chatUI) { chatUI.render(); chatUI.head(); }
if (meUI) meUI.render();
}, function () {});
F.onSnapshot(F.collection(db, "rooms", ROOM, "typing"), function (s) {
typing = {};
s.docs.forEach(function (d) { if (d.id !== me) typing[d.id] = d.data(); });
if (chatUI) chatUI.head();
}, function () {});
setInterval(function () { if (chatUI && tab === "chat") chatUI.head(); }, 2500);
F.onSnapshot(F.query(F.collection(db, "users"), F.orderBy("readAt", "desc"), F.limit(3)), function (s) {
var mx = 0;
s.docs.forEach(function (d) { if (d.id !== me) mx = Math.max(mx, +d.data().readAt || 0); });
if (mx !== othersRead) { othersRead = mx; if (chatUI) chatUI.render(); }
}, function () {});
stats();
setInterval(function () { if (tab !== "price") stats(true); }, 60000);
}
var statsAt = 0;
function stats(force) {
if (!force && Date.now() - statsAt < 45000) return;
statsAt = Date.now();
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
if (C && myProfile && t > readSent) {
clearTimeout(readTimer);
readTimer = setTimeout(function () {
readSent = t;
C.f.updateDoc(C.f.doc(C.db, "users", me), { readAt: t }).catch(function () { readSent = 0; });
}, 1200);
}
}
function person(uid, cb) {
if (people[uid]) return people[uid];
if (people[uid] === undefined && C) {
people[uid] = null;
C.f.getDoc(C.f.doc(C.db, "users", uid)).then(function (s) { people[uid] = s.exists() ? s.data() : {}; if (cb) cb(); }).catch(function () { delete people[uid]; });
}
return null;
}
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
node.addEventListener("click", function (e) { if (Date.now() - t0 < 500) { e.stopPropagation(); e.preventDefault(); } }, true);
node.addEventListener("click", function (e) { if (e.target === node) close(); });
var x = node.querySelector(".pc-x");
if (x) x.addEventListener("click", close);
return node;
}
var nav = el('\x3cnav class="pc-nav pc-ns">' +
'\x3cbutton data-t="me">\x3ci>' + I.user + "\x3c/i>ملفي\x3c/button>" +
'\x3cbutton data-t="chat">\x3ci>' + I.chat + '\x3c/i>المحادثة\x3cspan class="pc-nb" hidden>\x3c/span>\x3c/button>' +
'\x3cbutton data-t="price" class="on">\x3ci>' + I.price + "\x3c/i>السعر\x3c/button>\x3c/nav>");
applyFont();
document.body.appendChild(el('\x3cdiv class="pc-navbg">\x3c/div>'));
document.body.appendChild(nav);
function navMe() {
var i = nav.querySelector('button[data-t="me"] i');
i.innerHTML = myProfile && myProfile.photo ? av(myProfile.photo, "", "") : I.user;
}
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
document.documentElement.classList.toggle("pc-tabbed", t !== "price");
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
var oldBtn = document.getElementById("chatBtn");
if (oldBtn) oldBtn.remove();
if (lsGet("pc.joined") === "1") setTimeout(function () { boot().catch(function () {}); }, 2500);
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
tx.set(F.doc(db, "users", me), { name: name, user: user, bio: bio, photo: photo, color: typeof p.color === "number" ? p.color : 0, notif: p.notif || { all: false, reply: true, react: false }, last: F.serverTimestamp() });
});
}).then(function () {
myProfile = { name: name, user: user, bio: bio, photo: photo, color: typeof p.color === "number" ? p.color : 0, notif: p.notif || { all: false, reply: true, react: false }, last: Date.now() };
people[me] = myProfile;
lsSet("pc.joined", "1");
navMe();
toast("تم الحفظ");
if (chatUI) chatUI.render();
if (meUI) meUI.render();
close();
if (first) F.addDoc(F.collection(db, "rooms", ROOM, "messages"), { uid: me, name: name, user: user, type: "join", text: "", ts: F.serverTimestamp() }).catch(function () {});
if (done) setTimeout(done, 80);
}).catch(function (e) {
$go.disabled = false;
toast(String(e && e.message) === "taken" ? "هذا اليوزر انأخذ هسه، اختار غيره" : "ما گدرت أحفظ، حاول مرة ثانية");
});
});
push(node);
if (p.user) check();
}
function showProfile(uid) {
var F = C.f, db = C.db;
var node = sheet('\x3cdiv id="pv">\x3cdiv class="pc-load" style="padding:40px">جاري التحميل...\x3c/div>\x3c/div>', true);
push(node);
function draw(u) {
var h = '\x3cdiv class="pc-hd" style="' + headBg(u) + '">' + av(u.photo, u.name, "xl", uid) +
"\x3ch2>" + vname(uid, u.name || "مستخدم") + '\x3c/h2>\x3cdiv class="s">' + seen(ms(u.last)) + "\x3c/div>\x3c/div>" +
'\x3cdiv class="pc-card2">' +
(u.user ? '\x3cdiv class="pc-row2">\x3cb class="ltr">@' + esc(u.user) + "\x3c/b>\x3csmall>اسم المستخدم\x3c/small>\x3c/div>" : "") +
(u.bio ? '\x3cdiv class="pc-row2">\x3cb>' + linkify(u.bio) + "\x3c/b>\x3csmall>النبذة\x3c/small>\x3c/div>" : "") + "\x3c/div>";
var acts = "";
if (uid === me) acts += '\x3cbutton class="pc-it" data-a="edit">' + I.edit + "تعديل ملفي\x3c/button>";
if (me === ADMIN && uid !== ADMIN) {
acts += '\x3cbutton class="pc-it" data-a="ver">' + I.verify + (badges[uid] ? "سحب علامة التوثيق" : "منح علامة التوثيق") + "\x3c/button>";
acts += '\x3cbutton class="pc-it r" data-a="ban">' + I.ban + "حظر هذا الشخص\x3c/button>";
}
if (acts) h += '\x3cdiv class="pc-card2">' + acts + "\x3c/div>";
var pv = node.querySelector("#pv");
pv.innerHTML = h;
pv.addEventListener("click", function (e) {
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
function roomInfo() {
var h = '\x3cdiv class="pc-pad">\x3cdiv class="pc-pr">' + roomAv("big") + "\x3ch3>" + esc(room.name) + (room.verified ? BADGE : "") + "\x3c/h3>" +
'\x3cdiv class="s">' + members.toLocaleString("en-US") + " عضوًا، " + online.toLocaleString("en-US") + " متصلاً\x3c/div>" +
(room.bio ? '\x3cdiv class="pc-bio">\x3csmall>الوصف\x3c/small>' + linkify(room.bio) + "\x3c/div>" : "") + "\x3c/div>" +
'\x3cdiv class="pc-grp" style="margin-top:16px">' +
(me === ADMIN ? '\x3cbutton class="pc-it" data-a="edit">' + I.edit + "تعديل المحادثة\x3csmall style=\"margin-right:auto\">الصورة · الاسم · الوصف · التوثيق\x3c/small>\x3c/button>" : "") +
'\x3cbutton class="pc-it" data-a="me">' + I.user + "ملفي الشخصي\x3c/button>\x3c/div>" +
(!room.hideMembers || me === ADMIN ? '\x3cdiv class="pc-grp" style="margin-top:14px;padding:4px 16px">\x3cdiv style="color:#8fa6d1;font-size:13.5px;padding:10px 0 4px">الأعضاء' + (room.hideMembers ? " · مخفية عن الناس" : "") + '\x3c/div>\x3cdiv id="riM">\x3cdiv class="pc-load" style="padding:14px">جاري التحميل...\x3c/div>\x3c/div>\x3c/div>' : "") +
"\x3c/div>";
var node = sheet(h, true);
if (!room.hideMembers || me === ADMIN) loadUsers(true).then(function () {
var box = node.querySelector("#riM");
if (!box) return;
box.innerHTML = allUsers.map(function (u) {
var sn = seen(ms(u.last));
return '\x3cbutton class="pc-mem" data-u="' + esc(u.id) + '">' + av(u.photo, u.name, "", u.id) + "\x3cdiv>\x3cb>" + vname(u.id, u.name || "") + "\x3c/b>\x3csmall" + (sn === "متصل الآن" ? ' class="on"' : "") + ">" + sn + "\x3c/small>\x3c/div>\x3c/button>";
}).join("") || '\x3cdiv class="pc-load" style="padding:14px">ما بيها أعضاء بعد\x3c/div>';
});
node.addEventListener("click", function (e) {
var b = e.target.closest("[data-a]");
if (b) {
var a = b.getAttribute("data-a");
close();
setTimeout(function () { if (a === "edit") editRoom(); else showProfile(me); }, 80);
return;
}
var mb = e.target.closest(".pc-mem[data-u]");
if (mb) { var id = mb.getAttribute("data-u"); close(); setTimeout(function () { showProfile(id); }, 80); return; }
var l = e.target.closest("a[data-ext]");
if (l) { e.preventDefault(); try { A.openUrl(l.href); } catch (er) {} }
});
push(node);
}
function editRoom() {
var F = C.f, photo = room.photo || "", ver = !!room.verified, hideM = !!room.hideMembers;
var node = sheet('\x3cdiv class="pc-pad">\x3cdiv class="pc-pr">\x3ch3 style="margin:8px 0 14px">تعديل المحادثة\x3c/h3>' +
'\x3cdiv class="pc-ph">\x3cspan id="erAv">' + roomAv("big") + '\x3c/span>\x3cbutton id="erPh">' + I.cam + "\x3c/button>\x3c/div>" +
'\x3cinput type="file" id="erF" accept="image/*" hidden>\x3c/div>' +
'\x3clabel class="pc-f">\x3cspan>اسم المحادثة\x3c/span>\x3cinput id="erN" maxlength="40" value="' + esc(room.name) + '">\x3c/label>' +
'\x3clabel class="pc-f">\x3cspan>الوصف (البايو)\x3c/span>\x3ctextarea id="erB" rows="4" maxlength="400" placeholder="اكتب وصف للمحادثة">' + esc(room.bio) + "\x3c/textarea>\x3c/label>" +
'\x3cdiv class="pc-tg">\x3cdiv>\x3cb>علامة التوثيق\x3c/b>\x3csmall>تبين يم اسم المحادثة\x3c/small>\x3c/div>\x3cbutton class="pc-sw2' + (ver ? " on" : "") + '" id="erV">\x3ci>\x3c/i>\x3c/button>\x3c/div>' +
'\x3cdiv class="pc-tg">\x3cdiv>\x3cb>إخفاء الأعضاء\x3c/b>\x3csmall>الناس ما يشوفون قائمة الأعضاء، وانت تشوفها\x3c/small>\x3c/div>\x3cbutton class="pc-sw2' + (hideM ? " on" : "") + '" id="erH">\x3ci>\x3c/i>\x3c/button>\x3c/div>' +
'\x3cbutton class="pc-it r" id="erDel" style="justify-content:center;margin-top:8px">' + I.trash + "شيل الصورة\x3c/button>" +
'\x3cbutton class="pc-go" id="erGo">حفظ\x3c/button>\x3c/div>', true);
var f = node.querySelector("#erF");
node.querySelector("#erPh").addEventListener("click", function () { f.click(); });
pickImage(f, 256, function (d) { photo = d; node.querySelector("#erAv").innerHTML = av(photo, "", "big"); });
node.querySelector("#erDel").addEventListener("click", function () { photo = ""; var keep = room.photo; room.photo = ""; node.querySelector("#erAv").innerHTML = roomAv("big"); room.photo = keep; });
node.querySelector("#erV").addEventListener("click", function () { ver = !ver; this.classList.toggle("on", ver); });
node.querySelector("#erH").addEventListener("click", function () { hideM = !hideM; this.classList.toggle("on", hideM); });
node.querySelector("#erGo").addEventListener("click", function () {
var b = this;
b.disabled = true;
F.setDoc(F.doc(C.db, "rooms", ROOM), {
name: node.querySelector("#erN").value.trim() || "المحادثة", bio: node.querySelector("#erB").value.trim(), photo: photo, verified: ver, hideMembers: hideM
}, { merge: true }).then(function () { toast("تم حفظ المحادثة"); close(); })
.catch(function () { b.disabled = false; toast("ما گدرت أحفظ"); });
});
push(node);
}
function msgMenu(m, onReply) {
var mine = m.uid === me, adm = me === ADMIN, pinned = room.pin && room.pin.id === m.id;
var h = '\x3cdiv class="pc-emo">' + REACTS.map(function (e) { return '\x3cbutton data-e="' + e + '"' + (m.re && m.re[me] === e ? ' class="on"' : "") + ">" + e + "\x3c/button>"; }).join("") + "\x3c/div>" +
'\x3cbutton class="pc-it" data-a="reply">' + I.reply + "رد\x3c/button>" +
(mine && m.text ? '\x3cbutton class="pc-it" data-a="edit">' + I.edit + "تعديل\x3c/button>" : "") +
(m.text ? '\x3cbutton class="pc-it" data-a="copy">' + I.copy + "نسخ النص\x3c/button>" : "") +
(adm ? '\x3cbutton class="pc-it" data-a="pin">' + I.pin + (pinned ? "إلغاء التثبيت" : "تثبيت الرسالة") + "\x3c/button>" : "") +
'\x3cbutton class="pc-it" data-a="prof">' + I.user + "ملف " + esc(m.name || "المرسل") + "\x3c/button>" +
(adm && !mine ? '\x3cbutton class="pc-it" data-a="ver">' + I.verify + (badges[m.uid] ? "سحب التوثيق" : "منح التوثيق") + "\x3c/button>" : "") +
(mine || adm ? '\x3cbutton class="pc-it r" data-a="del">' + I.trash + "حذف الرسالة\x3c/button>" : "") +
(adm && !mine ? '\x3cbutton class="pc-it r" data-a="ban">' + I.ban + "حظر " + esc(m.name || "المرسل") + "\x3c/button>" : "");
var node = sheet(h, false);
node.addEventListener("click", function (e) {
var eb = e.target.closest("[data-e]");
if (eb) { var em = eb.getAttribute("data-e"); close(); setTimeout(function () { chatUI.react(m, em); }, 60); return; }
var b = e.target.closest("[data-a]");
if (!b) return;
var a = b.getAttribute("data-a"), F = C.f;
close();
setTimeout(function () {
if (a === "reply") onReply(m);
else if (a === "edit") chatUI.edit(m);
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
'\x3cdiv class="pc-sug" id="cG" hidden>\x3c/div>' +
'\x3cdiv class="pc-rb" id="cR" hidden>\x3cspan id="cRi">\x3c/span>\x3cdiv>\x3cb>\x3c/b>\x3cspan>\x3c/span>\x3c/div>\x3cbutton class="pc-ib" id="cRx">' + I.close + "\x3c/button>\x3c/div>" +
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
var now = Date.now(), who = Object.keys(typing).filter(function (u) { return now - ms(typing[u].ts) < 6000; });
var S = node.querySelector("#cS");
if (who.length) { S.textContent = who.length === 1 ? (typing[who[0]].name || "شخص") + " يكتب الآن..." : who.length + " يكتبون الآن..."; S.style.color = "#5aaeff"; }
else { S.textContent = members ? members.toLocaleString("en-US") + " عضوًا، " + online.toLocaleString("en-US") + " متصلاً" : "محادثة عامة"; S.style.color = ""; }
pin();
}
function pin() {
var P = node.querySelector("#cP"), p = priceNow();
P.querySelector("b").textContent = room.pin ? "رسالة مثبتة" : "السعر الحالي";
P.querySelector(".tx span").textContent = room.pin ? (room.pin.name ? room.pin.name + ": " : "") + room.pin.text : "GRAM / USDT";
P.querySelector(".pr").innerHTML = p.p ? money(p.p) + '\x3cem style="color:' + (p.pct >= 0 ? "#5fe3a1" : "#ff8a95") + '">' + pct(p.pct) + "\x3c/em>" : "—";
}
setInterval(function () { if (tab === "chat") pin(); }, 2000);
var rq = 0, nodes = {};
function render() {
if (rq) return;
rq = requestAnimationFrame(function () { rq = 0; draw(); });
}
function draw() {
if (!isReady) return;
if (!msgs.length) { nodes = {}; $l.innerHTML = '\x3cdiv class="pc-empty">ما بيها رسائل بعد\x3cbr>كون أول واحد يكتب\x3c/div>'; return; }
var wasBottom = atBottom() || !lastCount;
var added = msgs.length - lastCount;
var items = [], lastDay = "", h;
function add(k, html) { items.push([k, html]); }
msgs.forEach(function (m, i) {
var t = ms(m.ts), d = dayName(t), pv = msgs[i - 1], nx = msgs[i + 1];
if (d !== lastDay) { add("d" + d, '\x3cdiv class="pc-day">' + d + "\x3c/div>"); lastDay = d; }
if (m.type === "join") { add(m.id, '\x3cdiv class="pc-sys" data-u="' + esc(m.uid) + '">' + vname(m.uid, m.name || "عضو") + " انضم للمحادثة\x3c/div>"); return; }
if (pv && pv.type === "join") pv = null;
if (nx && nx.type === "join") nx = null;
var first = !pv || pv.uid !== m.uid || dayName(ms(pv.ts)) !== d;
var last = !nx || nx.uid !== m.uid || dayName(ms(nx.ts)) !== d;
var mine = m.uid === me, pp = (mine ? myProfile : person(m.uid, render)) || {};
var nc = (pcol(pp) || [0, 0, color(m.uid)])[2];
h = '\x3cdiv class="pc-row' + (mine ? " mine" : "") + (first ? " gs" : "") + '" data-id="' + esc(m.id) + '">' +
(last ? '\x3cspan data-u="' + esc(m.uid) + '">' + av(pp.photo, pp.name || m.name, "sm", m.uid) + "\x3c/span>" : '\x3cspan class="sp">\x3c/span>') +
'\x3cdiv class="pc-m' + (last ? " tl" : "") + '">' +
(!mine && first ? '\x3cdiv class="n" data-u="' + esc(m.uid) + '" style="color:' + nc + '">' + vname(m.uid, m.name || "مستخدم") + "\x3c/div>" : "") +
(m.rep ? '\x3cdiv class="pc-q" data-j="' + esc(m.rep.id || "") + '" style="color:' + (mine ? "#d6e6ff" : color(m.rep.uid || m.rep.name)) + '">\x3cb>' + esc(m.rep.name || "") + "\x3c/b>\x3cspan>" + esc(m.rep.text || "") + "\x3c/span>\x3c/div>" : "") +
(m.price ? '\x3cdiv class="pc-card">\x3cspan>سعر GRAM\x3c/span>\x3cb>' + money(m.price) + '\x3c/b>\x3cem style="color:' + ((m.pct || 0) >= 0 ? "#5fe3a1" : "#ff8a95") + '">' + pct(m.pct) + "\x3c/em>\x3c/div>" : "") +
(m.text ? '\x3cspan class="tx">' + richText(m.text) + "\x3c/span>" : "") +
reacts(m) +
'\x3cdiv class="t">' + (m.edited ? '\x3ci class="ed">معدّلة\x3c/i>' : "") + hm(t) + (mine ? (m._p ? I.clock : (othersRead >= ms(m.ts) ? I.tick2 : I.tick)) : "") + "\x3c/div>\x3c/div>\x3c/div>";
add(m.id, h);
});
var fresh = {}, cur = $l.firstChild;
if (cur && !cur.getAttribute) cur = null;
if (cur && (cur.className === "pc-load" || cur.className === "pc-empty")) { $l.innerHTML = ""; cur = null; }
items.forEach(function (it) {
var c = nodes[it[0]], n;
if (c && c.h === it[1]) n = c.n; else n = el(it[1]);
fresh[it[0]] = { h: it[1], n: n };
if (n === cur) cur = cur.nextSibling;
else $l.insertBefore(n, cur);
});
while (cur) { var nxn = cur.nextSibling; $l.removeChild(cur); cur = nxn; }
nodes = fresh;
if (wasBottom) { $l.scrollTop = $l.scrollHeight; if (tab === "chat") markRead(); }
else if (added > 0 && lastCount) newWhileUp += added;
lastCount = msgs.length;
downBtn();
}
function reacts(m) {
var r = m.re || {}, cnt = {}, order = [];
Object.keys(r).forEach(function (u) { var e = r[u]; if (!cnt[e]) { cnt[e] = 0; order.push(e); } cnt[e]++; });
if (!order.length) return "";
return '\x3cdiv class="pc-rx">' + order.map(function (e) {
return '\x3cbutton data-r="' + esc(e) + '"' + (r[me] === e ? ' class="on"' : "") + ">" + e + " " + cnt[e] + "\x3c/button>";
}).join("") + "\x3c/div>";
}
function loading(t) { isReady = false; nodes = {}; $l.innerHTML = '\x3cdiv class="pc-load">' + t + "\x3c/div>"; }
function ready() {
if (isReady) { head(); setTimeout(function () { if (atBottom()) markRead(); }, 50); return; }
isReady = true; lastCount = 0; head(); draw(); setTimeout(bottom, 30);
}
function findMsg(target) {
var r = target.closest(".pc-row");
if (!r) return null;
var id = r.getAttribute("data-id");
for (var i = 0; i < msgs.length; i++) if (msgs[i].id === id) return msgs[i];
return null;
}
var editing = null;
function doEdit(m) {
editing = m; replyTo = null;
node.querySelector("#cRi").innerHTML = I.edit;
$r.querySelector("b").textContent = "تعديل الرسالة";
$r.querySelector("span").textContent = m.text || "";
$r.hidden = false;
$i.value = m.text || "";
$i.dispatchEvent(new Event("input"));
$i.focus();
}
function react(m, e) {
var F = C.f, upd = {};
upd["re." + me] = (m.re && m.re[me] === e) ? F.deleteField() : e;
F.updateDoc(F.doc(C.db, "rooms", ROOM, "messages", m.id), upd).catch(function () { toast("ما گدرت أضيف التفاعل"); });
}
function doReply(m) {
editing = null;
node.querySelector("#cRi").innerHTML = I.reply;
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
node.querySelector("#cT").addEventListener("click", function () { if (C) roomInfo(); });
node.querySelector("#cM").addEventListener("click", function () { if (C) roomInfo(); });
node.querySelector("#cP").addEventListener("click", function () { if (room.pin) jump(room.pin.id); });
node.querySelector("#cRx").addEventListener("click", function () { if (editing) { $i.value = ""; $i.style.height = "auto"; } replyTo = null; editing = null; $r.hidden = true; });
$l.addEventListener("click", function (e) {
var a = e.target.closest("a[data-ext]");
if (a) { e.preventDefault(); try { A.openUrl(a.href); } catch (er) {} return; }
var rb = e.target.closest(".pc-rx button[data-r]");
if (rb) { var mm = findMsg(rb); if (mm) react(mm, rb.getAttribute("data-r")); return; }
var mu = e.target.closest("[data-mu]");
if (mu) { var uu = byUser(mu.getAttribute("data-mu")); if (uu) showProfile(uu.id); else loadUsers(true).then(function () { var u2 = byUser(mu.getAttribute("data-mu")); if (u2) showProfile(u2.id); else toast("ما لگيت هذا اليوزر"); }); return; }
var q = e.target.closest(".pc-q[data-j]");
if (q && q.getAttribute("data-j")) { jump(q.getAttribute("data-j")); return; }
var n = e.target.closest("[data-u]");
if (n) showProfile(n.getAttribute("data-u"));
});
var tr = null;
function rowAt(y) {
var rows = $l.querySelectorAll(".pc-row");
for (var i = 0; i < rows.length; i++) { var r = rows[i].getBoundingClientRect(); if (y >= r.top - 3 && y <= r.bottom + 3) return rows[i]; }
return null;
}
$l.addEventListener("touchstart", function (e) {
var t0 = e.touches[0], onRow = e.target.closest(".pc-row"), row = onRow || rowAt(t0.clientY);
if (!row) return;
tr = { row: row, x: t0.clientX, y: t0.clientY, mode: null, dx: 0 };
if (onRow) tr.lp = setTimeout(function () {
if (!tr || tr.mode) return;
var m = findMsg(row);
tr = null;
if (m) { msgMenu(m, doReply); }
}, 480);
}, { passive: true });
$l.addEventListener("touchmove", function (e) {
if (!tr) return;
var t = e.touches[0], dx = tr.x - t.clientX, dy = t.clientY - tr.y;
if (!tr.mode) {
if (Math.abs(dx) < 7 && Math.abs(dy) < 7) return;
clearTimeout(tr.lp);
tr.mode = dx > 0 && Math.abs(dx) > Math.abs(dy) * 1.2 ? "swipe" : "scroll";
if (tr.mode === "swipe") { tr.row.style.transition = "none"; tr.x = t.clientX + 7; dx = 7; }
}
if (tr.mode !== "swipe") return;
e.preventDefault();
dx = Math.max(0, dx);
tr.dx = dx < 80 ? dx : Math.min(150, 80 + (dx - 80) * 0.45);
tr.row.style.transform = "translateX(" + (-tr.dx) + "px)";
var rb = tr.row.getBoundingClientRect(), wb = $l.getBoundingClientRect();
$sw.style.top = (rb.top - wb.top + rb.height / 2 - 17) + "px";
$sw.style.opacity = Math.min(1, tr.dx / 70);
$sw.style.transform = "scale(" + (tr.dx >= 70 ? 1.1 : 0.8 + tr.dx / 350) + ")";
}, { passive: false });
function endTouch() {
if (!tr) return;
clearTimeout(tr.lp);
if (tr.mode === "swipe") {
tr.row.style.transition = "transform .22s ease-out";
tr.row.style.transform = "";
$sw.style.opacity = 0;
if (tr.dx >= 70) { var m = findMsg(tr.row); if (m) doReply(m); }
}
tr = null;
}
$l.addEventListener("touchend", endTouch, { passive: true });
$l.addEventListener("touchcancel", endTouch, { passive: true });
$l.addEventListener("contextmenu", function (e) { e.preventDefault(); });
var $g = node.querySelector("#cG"), typed = 0;
function mentionQuery() {
var v = $i.value.slice(0, $i.selectionStart || $i.value.length), mt = v.match(/(^|\s)@([a-zA-Z0-9_]*)$/);
return mt ? mt[2].toLowerCase() : null;
}
function suggest() {
var q = mentionQuery();
if (q === null) { $g.hidden = true; return; }
loadUsers().then(function () {
var list = allUsers.filter(function (u) { return u.id !== me && (u.user.indexOf(q) === 0 || String(u.name || "").toLowerCase().indexOf(q) >= 0); }).slice(0, 30);
if (!list.length || mentionQuery() === null) { $g.hidden = true; return; }
$g.innerHTML = list.map(function (u) {
return '\x3cbutton data-pick="' + esc(u.user) + '">' + av(u.photo, u.name, "", u.id) + "\x3cspan>" + vname(u.id, u.name || "") + "\x3c/span>\x3csmall>@" + esc(u.user) + "\x3c/small>\x3c/button>";
}).join("");
$g.hidden = false;
});
}
$g.addEventListener("click", function (e) {
var b = e.target.closest("[data-pick]");
if (!b) return;
var pos = $i.selectionStart || $i.value.length, before = $i.value.slice(0, pos).replace(/@([a-zA-Z0-9_]*)$/, "@" + b.getAttribute("data-pick") + " ");
$i.value = before + $i.value.slice(pos);
$g.hidden = true;
$i.focus();
try { $i.setSelectionRange(before.length, before.length); } catch (er) {}
});
$i.addEventListener("input", function () {
$i.style.height = "auto"; $i.style.height = Math.min(120, $i.scrollHeight) + "px";
suggest();
if (C && myProfile && $i.value.trim() && Date.now() - typed > 4000) {
typed = Date.now();
C.f.setDoc(C.f.doc(C.db, "rooms", ROOM, "typing", me), { name: myProfile.name || "", ts: C.f.serverTimestamp() }).catch(function () {});
}
});
function send(extra) {
if (!C || !isReady) return;
var F = C.f, text = $i.value.trim();
$g.hidden = true;
if (editing && !extra) {
if (!text) return;
var em = editing;
editing = null; $r.hidden = true; $i.value = ""; $i.style.height = "auto";
if (text !== em.text) F.updateDoc(F.doc(C.db, "rooms", ROOM, "messages", em.id), { text: text, edited: true }).catch(function () { toast("ما گدرت أعدّلها"); });
return;
}
if (!text && !extra) return;
typed = 0;
F.deleteDoc(F.doc(C.db, "rooms", ROOM, "typing", me)).catch(function () {});
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
chatUI = { node: node, render: render, head: head, loading: loading, ready: ready, bottom: bottom, reply: doReply, edit: doEdit, react: react };
}
function openMe() {
if (!meUI) buildMe();
meUI.node.hidden = false;
meUI.render();
if (!C) boot().then(function () { meUI.render(); }).catch(function () { meUI.render(true); });
}
function buildMe() {
var node = el('\x3cdiv class="pc-pn pc-ns" hidden>\x3cdiv class="pc-me" id="mB">\x3c/div>\x3cinput type="file" id="mF" accept="image/*" hidden>\x3c/div>');
document.body.appendChild(node);
var $b = node.querySelector("#mB"), $f = node.querySelector("#mF");
pickImage($f, 192, function (d) {
if (!C || !myProfile) return;
C.f.updateDoc(C.f.doc(C.db, "users", me), { photo: d }).then(function () {
myProfile.photo = d; people[me] = myProfile; render(); navMe(); if (chatUI) chatUI.render(); toast("تم تغيير الصورة");
}).catch(function () { toast("ما گدرت أحفظ الصورة"); });
});
function alertsCount() { try { return (JSON.parse(A.get("alerts") || "[]") || []).length; } catch (e) { return 0; } }
function render(err) {
var p = myProfile, h;
if (!C) h = '\x3cdiv class="pc-load" style="padding-top:60px">' + (err ? "ما گدرت أتصل، تأكد من النت" : "جاري التحميل...") + "\x3c/div>";
else if (!p || !p.user) h = '\x3cdiv class="pc-hd" style="' + headBg(null) + ';padding-bottom:30px">\x3cdiv class="tb">\x3c/div>' + av("", "?", "xl", me).replace('class="pc-av xl"', 'class="pc-av xl" style="background:#2a3a5c"') +
'\x3ch2>ما عندك ملف بعد\x3c/h2>\x3cdiv class="s">سوّي ملفك حتى تحچي بالمحادثة\x3c/div>\x3cbutton class="pc-go" data-a="edit" style="max-width:320px">سوّي ملفي\x3c/button>\x3c/div>';
else {
var c = pcol(p) || PCOL[0], n = alertsCount();
h = '\x3cdiv class="pc-hd" style="' + headBg(p) + '">' +
'\x3cdiv class="tb">\x3cbutton class="pc-ib" data-a="menu">' + I.more + "\x3c/button>\x3cspan>\x3c/span>\x3c/div>" +
'\x3cspan data-a="view">' + av(p.photo, p.name, "xl", me) + "\x3c/span>" +
"\x3ch2>" + vname(me, p.name) + '\x3c/h2>\x3cdiv class="s">متصل\x3c/div>' +
'\x3cdiv class="pc-acts">' +
'\x3cbutton data-a="settings">' + I.gear + "الإعدادات\x3c/button>" +
'\x3cbutton data-a="edit">' + I.edit + "تعديل البيانات\x3c/button>" +
'\x3cbutton data-a="photo">' + I.cam + "تعيين صورة\x3c/button>\x3c/div>" +
'\x3cdiv class="pc-chips">' +
'\x3cbutton data-a="color">\x3ci style="background:' + c[0] + '">\x3c/i>لون الملف\x3c/button>' +
'\x3cbutton data-a="alerts">' + I.bell + "التنبيهات" + (n ? " " + n : "") + "\x3c/button>\x3c/div>\x3c/div>" +
'\x3cdiv class="pc-card2">' +
'\x3cdiv class="pc-row2">\x3cb class="ltr">@' + esc(p.user) + "\x3c/b>\x3csmall>اسم المستخدم\x3c/small>\x3c/div>" +
(p.bio ? '\x3cdiv class="pc-row2">\x3cb>' + linkify(p.bio) + "\x3c/b>\x3csmall>النبذة\x3c/small>\x3c/div>" : '\x3cdiv class="pc-row2" data-a="edit">\x3cb style="color:#5aaeff">أضف نبذة عنك\x3c/b>\x3csmall>النبذة\x3c/small>\x3c/div>') +
"\x3c/div>" +
(function () {
var ns = notifSet();
function tg(k, t, sub) { return '\x3cdiv class="pc-tg" style="background:none;margin:0;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.06);border-radius:0">\x3cdiv>\x3cb>' + t + "\x3c/b>\x3csmall>" + sub + '\x3c/small>\x3c/div>\x3cbutton class="pc-sw2' + (ns[k] ? " on" : "") + '" data-n="' + k + '">\x3ci>\x3c/i>\x3c/button>\x3c/div>'; }
return '\x3cdiv class="pc-card2">\x3cdiv style="color:#8592ad;font-size:13.5px;padding:10px 0 0">إشعارات المحادثة\x3c/div>' +
tg("all", "كل رسائل المحادثة", "إشعار بكل رسالة جديدة") + tg("reply", "الردود والذكر", "لما أحد يرد عليك أو يذكر @يوزرك") + tg("react", "التفاعلات", "لما أحد يتفاعل على رسالتك") + "\x3c/div>";
})() +
'\x3cdiv class="pc-card2">' +
'\x3cbutton class="pc-it" data-a="font">' + I.edit + '\x3cdiv>حجم الخط\x3c/div>\x3cspan class="v">' + ({ s: "صغير", m: "متوسط", l: "كبير" }[lsGet("pc.fs") || "m"]) + "\x3c/span>\x3c/button>" +
'\x3cbutton class="pc-it" data-a="share">' + I.share + "\x3cdiv>شارك التطبيق\x3c/div>\x3c/button>" +
(me === ADMIN ? '\x3cbutton class="pc-it" data-a="dev">' + I.tool + "\x3cdiv>لوحة المطوّر\x3csmall>تبين لك بس\x3c/small>\x3c/div>\x3c/button>" : "") +
"\x3c/div>";
}
$b.innerHTML = h;
}
$b.addEventListener("click", function (e) {
var nb = e.target.closest("[data-n]");
if (nb && C && myProfile) {
var k = nb.getAttribute("data-n"), ns = notifSet();
ns[k] = !ns[k];
nb.classList.toggle("on", ns[k]);
myProfile.notif = ns;
C.f.updateDoc(C.f.doc(C.db, "users", me), { notif: ns }).catch(function () { toast("ما گدرت أحفظ"); });
return;
}
var l = e.target.closest("a[data-ext]");
if (l) { e.preventDefault(); try { A.openUrl(l.href); } catch (er) {} return; }
var b = e.target.closest("[data-a]");
if (!b) return;
var a = b.getAttribute("data-a");
if (a === "edit") { if (C) editProfile(!(myProfile && myProfile.user)); }
else if (a === "view") { if (C) showProfile(me); }
else if (a === "photo") $f.click();
else if (a === "color") colorSheet();
else if (a === "font") fontSheet();
else if (a === "alerts") goPrice("#alList");
else if (a === "settings") goPrice("#themeSeg");
else if (a === "dev") goPrice("#devCard");
else if (a === "share") { var s = document.getElementById("share"); if (s) s.click(); }
else if (a === "menu") {
var mn = sheet('\x3cbutton class="pc-it" data-m="edit">' + I.edit + "تعديل البيانات\x3c/button>" +
'\x3cbutton class="pc-it" data-m="color">' + I.gear + "لون الملف\x3c/button>" +
'\x3cbutton class="pc-it" data-m="share">' + I.share + "شارك التطبيق\x3c/button>", false);
mn.addEventListener("click", function (ev) {
var m = ev.target.closest("[data-m]");
if (!m) return;
var k = m.getAttribute("data-m");
close();
setTimeout(function () {
if (k === "edit") editProfile(false);
else if (k === "color") colorSheet();
else { var s = document.getElementById("share"); if (s) s.click(); }
}, 80);
});
push(mn);
}
});
function fontSheet() {
var cur = lsGet("pc.fs") || "m";
var fsN = sheet('\x3cdiv class="pc-pad" style="text-align:center">\x3ch3 style="margin:4px 0 2px;font-size:20px">حجم الخط\x3c/h3>\x3cdiv style="color:#8fa6d1;font-size:13.5px">حجم كتابة الرسائل بالمحادثة\x3c/div>\x3c/div>' +
'\x3cdiv class="pc-fs">' + ["s", "m", "l"].map(function (k) {
return '\x3cbutton data-f="' + k + '"' + (k === cur ? ' class="on"' : "") + '>\x3cdiv style="font-size:' + FS[k] + 'px;font-weight:600">أهلاً\x3c/div>\x3cdiv style="font-size:13px;color:#8fa6d1;margin-top:4px">' + { s: "صغير", m: "متوسط", l: "كبير" }[k] + "\x3c/div>\x3c/button>";
}).join("") + "\x3c/div>", false);
fsN.addEventListener("click", function (ev) {
var b = ev.target.closest("[data-f]");
if (!b) return;
lsSet("pc.fs", b.getAttribute("data-f"));
applyFont();
close();
render();
});
push(fsN);
}
function colorSheet() {
if (!C || !myProfile) return;
var cur = typeof myProfile.color === "number" ? myProfile.color : 0;
var h = '\x3cdiv class="pc-pad" style="text-align:center">\x3ch3 style="margin:4px 0 2px;font-size:20px">لون الملف\x3c/h3>\x3cdiv style="color:#8fa6d1;font-size:13.5px">يبين بملفك، وبلون اسمك بالمحادثة\x3c/div>\x3c/div>\x3cdiv class="pc-cols">';
PCOL.forEach(function (c, i) {
if (i === BLACK && me !== ADMIN) return;
h += '\x3cbutton data-c="' + i + '"' + (i === cur ? ' class="on"' : "") + '>\x3ci style="background:linear-gradient(180deg,' + c[0] + "," + c[1] + ')">' + (i === cur ? I.tick : "") + "\x3c/i>" + c[3] + "\x3c/button>";
});
var cs = sheet(h + "\x3c/div>", false);
cs.addEventListener("click", function (ev) {
var b = ev.target.closest("[data-c]");
if (!b) return;
var i = +b.getAttribute("data-c");
close();
C.f.updateDoc(C.f.doc(C.db, "users", me), { color: i }).then(function () {
myProfile.color = i; people[me] = myProfile; render(); if (chatUI) chatUI.render();
}).catch(function () { toast("ما گدرت أحفظ اللون"); });
});
push(cs);
}
meUI = { node: node, render: render };
}
})();
