/* Pip Player — retro click-wheel music player card for Home Assistant + Music Assistant.
* Own brand. Not affiliated with, or endorsed by, any other company.
* By Tim Wilkinson (0xwilko). MIT licence. https://github.com/0xwilko/pip-player-card */
(() => {
const TAG = 'pip-player-card';
if (customElements.get(TAG)) return;
const VERSION = '1.10.1';

const P = {
play: 'M8 5v14l11-7z',
pause: 'M7 5h3.6v14H7zm6.4 0H17v14h-3.6z',
wPrev: 'M4 6h2.2v12H4zm3 6 6.5-6v12zm6 0 6.5-6v12z',
wNext: 'M17.8 6H20v12h-2.2zM17 12l-6.5 6V6zm-6 0-6.5 6V6z',
wPlay: 'M2.5 6v12l7.5-6zM13 6h3.2v12H13zm5.3 0h3.2v12h-3.2z',
shuffle: 'M14.83,13.41L13.42,14.82L16.55,17.95L14.5,20H20V14.5L17.96,16.54L14.83,13.41M14.5,4L16.54,6.04L4,18.59L5.41,20L17.96,7.46L20,9.5V4M10.59,9.17L5.41,4L4,5.41L9.17,10.58L10.59,9.17Z',
repeat: 'M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z',
repeatOne: 'M13,15V9H12L10,10V11H11.5V15M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z',
lock: 'M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z',
speaker: 'M12,12A3,3 0 0,0 9,15A3,3 0 0,0 12,18A3,3 0 0,0 15,15A3,3 0 0,0 12,12M12,20A5,5 0 0,1 7,15A5,5 0 0,1 12,10A5,5 0 0,1 17,15A5,5 0 0,1 12,20M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8C10.89,8 10,7.1 10,6C10,4.89 10.89,4 12,4M17,2H7C5.89,2 5,2.89 5,4V20A2,2 0 0,0 7,22H17A2,2 0 0,0 19,20V4C19,2.89 18.1,2 17,2Z',
playlist: 'M15,6H3V8H15V6M15,10H3V12H15V10M3,16H11V14H3V16M17,6V14.18C16.69,14.07 16.35,14 16,14A3,3 0 0,0 13,17A3,3 0 0,0 16,20A3,3 0 0,0 19,17V8H22V6H17Z',
note: 'M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z',
radio: 'M20,6A2,2 0 0,1 22,8V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V8C2,7.15 2.53,6.42 3.28,6.13L15.71,1L16.47,2.83L8.83,6H20M20,8H4V12H16V10H18V12H20V8M7,14A3,3 0 0,0 4,17A3,3 0 0,0 7,20A3,3 0 0,0 10,17A3,3 0 0,0 7,14Z',
volLow: 'M7,9V15H11L16,20V4L11,9H7Z',
volHigh: 'M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z',
chevron: 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z',
search: 'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z',
off: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M4,12A8,8 0 0,1 12,4C13.85,4 15.55,4.63 16.9,5.69L5.69,16.9C4.63,15.55 4,13.85 4,12M12,20C10.15,20 8.45,19.37 7.1,18.31L18.31,7.1C19.37,8.45 20,10.15 20,12A8,8 0 0,1 12,20Z',
};
const ic = (d, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
const GITHUB = 'https://github.com/0xwilko';
const LINKS = {
github: 'https://github.com/0xwilko',
forum: 'https://community.home-assistant.io/u/0xwilko',
web: 'https://twilkinsondata.com',
discord: 'https://discord.com/users/1346380954897354782',
};
// version history, newest first - add an entry with every new version
const CHANGES = [
['1.10.1','22 Nov 2026',['If Spotify is already playing on another speaker, Pip Player says which one and lets you play here or move the music here.','Home Assistant’s grey error bar no longer pops up over the player.']],
['1.10.0','22 Nov 2026',['Options screen in the card editor, so you can set everything without YAML.']],
['1.9.1','22 Nov 2026',['Black finish restyled in graphite so it matches the silver player.','Tells you plainly when Music Assistant is not set up yet.']],
['1.9.0', '22 Nov 2026', ['Published on GitHub for HACS and the Marketplace.', 'Album art only loads from safe web addresses.']],
['1.8.1', '22 Nov 2026', ['Discord on the About page now opens the profile.']],
['1.8.0', '22 Nov 2026', ['About page with the maker and links.', 'This version history.']],
['1.7.0', '22 Nov 2026', ['Search songs, artists, albums and playlists.', 'Search inside any playlist.', 'Speak your search with the keyboard mic.']],
['1.6.0', '22 Nov 2026', ['Clicker on by default and saved to your login.', 'New silver Pip Player logo.', 'Maker badge that opens GitHub.', 'Tap the screen to play or pause.']],
['1.1 – 1.5', '21–22 Nov 2026', ['Hold switch became the admin lock.', 'Whole player run from the wheel.', 'Fills the screen and stays put.', 'Full-screen mode with a power button.', 'Curved, shaded silver body.', 'Hold MENU to jump to the main menu.', 'Skipping or picking a song waits for Play.', 'Add Bluetooth speaker option for admins.']],
['1.0.0', '21 Nov 2026', ['First release: click wheel, playlists, radio, speakers, shuffle, repeat, volume and seek.']],
];
const IMG = {
ch: 'data:image/webp;base64,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',
tx: 'data:image/webp;base64,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',
inf: 'data:image/webp;base64,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',
};

const norm = (s) => [...String(s || '').normalize('NFD')].filter((c) => c.charCodeAt(0) < 768 || c.charCodeAt(0) > 879).join('').replace(/['’`]/g, '').toLowerCase();
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (s) => {
if (!isFinite(s) || s < 0) s = 0;
s = Math.floor(s);
const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(x).padStart(2, '0');
};
const junk = (t) => !t || /^(no desc|unknown|none|-)$/i.test(String(t).trim());
const isRadio = (a) => /:\/\/radio\/|radiobrowser/i.test(a.media_content_id || '');

// CSS sizes written as "Nu" scale with the card width (1u = 1% of the device width).
const CSS = `
:host{display:block}
*{box-sizing:border-box}
ha-card{background:none;border:none;box-shadow:none;overflow:visible;padding:8px 6px 8px}
.wrap{--u:3.4px;margin:0 auto;font-family:"Helvetica Neue",Helvetica,Arial,system-ui,sans-serif;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none}
.body{position:relative;padding:7u 6u 4.2u;border-radius:9u;outline:none;touch-action:none;
background:repeating-linear-gradient(90deg,rgba(255,255,255,.11) 0 1px,rgba(0,0,0,.028) 1px 2px,rgba(255,255,255,0) 2px 3px),
linear-gradient(165deg,#f5f6f8 0%,#dadde1 28%,#c5c9cf 56%,#d8dbdf 80%,#eef0f2 100%);
box-shadow:inset 0 1px 0 rgba(255,255,255,.95),inset 0 -2px 3px rgba(0,0,0,.16),inset 0 0 0 1px rgba(0,0,0,.07),0 14px 28px rgba(0,0,0,.26),0 3px 6px rgba(0,0,0,.18)}
.body::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:inset 0 0 1u rgba(0,0,0,.45),inset 0 0 3.6u rgba(0,0,0,.2),inset 3.4u 0 4.2u -2u rgba(0,0,0,.3),inset -3.4u 0 4.2u -2u rgba(0,0,0,.3),inset 0 1.8u 2.2u -.6u rgba(255,255,255,.85),inset 0 -2.8u 3.8u -1u rgba(0,0,0,.38)}
.body:focus-visible{box-shadow:0 0 0 3px #4a90e2,0 14px 28px rgba(0,0,0,.26)}
.holdlbl{position:absolute;top:2.1u;right:22u;font-size:2.3u;font-weight:700;letter-spacing:.12em;color:rgba(0,0,0,.36);text-shadow:0 1px 0 rgba(255,255,255,.7)}
.hold{position:absolute;top:1.6u;right:8u;width:12.5u;height:3.8u;padding:0;border:none;border-radius:1.9u;cursor:pointer;
background:linear-gradient(#b9bdc3,#9ea3aa);box-shadow:inset 0 1px 2px rgba(0,0,0,.4),0 1px 0 rgba(255,255,255,.8);transition:background .15s}
.hold .knob{position:absolute;top:.45u;left:.5u;width:6.2u;height:2.9u;border-radius:1.45u;background:linear-gradient(#ffffff,#d3d6da);box-shadow:0 1px 2px rgba(0,0,0,.4);transition:left .15s}
.held .hold{background:linear-gradient(#f5a04a,#d9731a)}
.held .hold .knob{left:5.8u}
.bezel{border-radius:2.8u;padding:1.5u;background:linear-gradient(#202124,#0b0b0c);box-shadow:inset 0 0 0 1px rgba(255,255,255,.07),0 1px 0 rgba(255,255,255,.75),0 -1px 0 rgba(0,0,0,.18)}
.screen{position:relative;height:var(--sh,60u);border-radius:1.2u;overflow:hidden;background:#fff;color:#111;display:flex;flex-direction:column}
.screen::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:5;background:linear-gradient(152deg,rgba(255,255,255,.30) 0%,rgba(255,255,255,.06) 30%,rgba(255,255,255,0) 31%)}
.hdr{flex:none;height:7.4u;display:flex;align-items:center;padding:0 2u;gap:1u;background:linear-gradient(#fdfdfd,#d6d9dd);border-bottom:1px solid #a4a9b0;font-size:3.5u;font-weight:700;color:#1c1c1c}
.hdr .l,.hdr .r{width:13u;display:flex;align-items:center;gap:.8u}
.hdr .r{justify-content:flex-end}
.hdr .t{flex:1;min-width:0;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hdr svg{width:3.6u;height:3.6u;fill:#2b2b2b;flex:none}
.view{flex:1;min-height:0;position:relative}
.list{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y;scrollbar-width:thin;scrollbar-color:#9aa3ad #eef0f2}
.list::-webkit-scrollbar{width:1.6u}
.list::-webkit-scrollbar-track{background:#eef0f2;border-left:1px solid #d5d9de}
.list::-webkit-scrollbar-thumb{background:linear-gradient(90deg,#b9c2cc,#8e99a5);border-radius:1u}
.row{height:7.4u;display:flex;align-items:center;padding:0 2.4u 0 2.8u;font-size:4.2u;font-weight:600;color:#111;white-space:nowrap;cursor:pointer}
.row .lbl{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}
.row .val{flex:none;max-width:46%;overflow:hidden;text-overflow:ellipsis;margin-left:2u;font-size:3.7u;font-weight:500;color:#686d74}
.row svg{flex:none;width:4.2u;height:4.2u;fill:#7b8189;margin-left:1u}
.row.sel{background:linear-gradient(#62aef6,#1f6fd8);color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,.18)}
.row.sel .val{color:#eaf3ff}
.row.sel svg{fill:#fff}
.row.dis{color:#9aa0a7;cursor:default}
.row.sel.dis{color:#e4eefc}
.row.info,.row.sel.info{background:none;color:#3a3f45;font-weight:500;font-size:3.6u;text-shadow:none;cursor:default}
.row.hd,.row.sel.hd{height:5.4u;font-size:2.9u;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#5f6670;background:linear-gradient(#eff1f4,#e1e4e8);border-top:1px solid #d3d7dc;border-bottom:1px solid #d3d7dc}
.row.txt,.row.sel.txt{height:auto;white-space:normal;line-height:1.35;padding-top:1.2u;padding-bottom:1.2u;font-size:3.4u;font-weight:500;color:#2f3439;background:none;text-shadow:none;cursor:default}
.row.txt .lbl{white-space:normal}
.row.logo,.row.sel.logo{height:auto;justify-content:center;gap:1.8u;padding:2.6u 0 1.4u;background:none}
.row.logo img{display:block;width:auto}
.row.logo .l-ch{height:9u}
.row.logo .l-tx{height:4.6u}
.sbox{display:none;position:absolute;left:0;right:0;top:0;height:8.6u;align-items:center;gap:1.4u;padding:0 2u;background:linear-gradient(#f6f7f9,#e3e6ea);border-bottom:1px solid #c1c7ce;z-index:2}
.sbox svg{width:4.2u;height:4.2u;fill:#6b7179;flex:none}
.sin{flex:1;min-width:0;height:6.2u;border:1px solid #b3b9c1;border-radius:3.1u;padding:0 2.6u;font-family:inherit;font-weight:600;font-size:max(16px,3.8u);color:#111;background:#fff;outline:none;-webkit-appearance:none;appearance:none;-webkit-user-select:text;user-select:text;box-shadow:inset 0 1px 2px rgba(0,0,0,.12)}
.sin:focus{border-color:#3d8ae6;box-shadow:0 0 0 2px rgba(61,138,230,.25)}
.sin::-webkit-search-cancel-button{display:none}
.sclr{display:none;flex:none;width:5u;height:5u;border:none;border-radius:50%;padding:0;background:#aeb4bc;color:#fff;font-size:3.6u;font-weight:700;line-height:5u;text-align:center;cursor:pointer}
.sbox.has .sclr{display:block}
.view.searching .sbox{display:flex}
.view.searching .list{top:8.6u}
.np{position:absolute;inset:0;display:flex;flex-direction:column;padding:3u 3u 2.6u}
.np-top{flex:1;min-height:0;display:flex;gap:3u}
.art{flex:none;width:29u;height:29u;border-radius:.8u;background:linear-gradient(135deg,#eceff3,#c9ced6);box-shadow:0 1px 3px rgba(0,0,0,.35);position:relative}
.np:not(.tall) .art{-webkit-box-reflect:below 1px linear-gradient(transparent 62%,rgba(255,255,255,.28))}
.art img{width:100%;height:100%;object-fit:cover;border-radius:.8u;display:block;background:#fff}
.art .ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.art .ph svg{width:13u;height:13u;fill:#9aa3ae}
.meta{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:1.2u;padding-bottom:3u}
.ti{font-size:4.5u;font-weight:700;color:#111;white-space:nowrap;overflow:hidden}
.ti span{display:inline-block;padding-right:4u}
.ti.mq span{animation:pipmq var(--mqd,8s) linear infinite}
@keyframes pipmq{0%,18%{transform:translateX(0)}82%,100%{transform:translateX(var(--mqx,0))}}
.ar,.al{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ar{font-size:3.9u;font-weight:600;color:#333}
.al{font-size:3.5u;color:#6c727a}
.np-bot{flex:none}
.bar{position:relative;height:2.6u;border-radius:1.3u;border:1px solid #8f96a0;background:linear-gradient(#f1f3f5,#cfd4da);overflow:visible}
.fill{position:absolute;left:0;top:0;bottom:0;border-radius:1.3u;background:linear-gradient(#8cc3f5,#2a7cd6);width:0}
.knob2{position:absolute;top:50%;width:3.2u;height:3.2u;margin:-1.6u 0 0 -1.6u;background:#fff;border:1px solid #6d7580;transform:rotate(45deg);display:none;box-shadow:0 1px 2px rgba(0,0,0,.3)}
.seek .knob2{display:block}
.seek .fill{background:linear-gradient(#ffd28a,#e58a1f)}
.times{display:flex;justify-content:space-between;align-items:center;margin-top:1.3u;font-size:3.2u;font-weight:600;color:#4b5058;font-variant-numeric:tabular-nums}
.times .mid{font-size:2.8u;letter-spacing:.08em;color:#2a7cd6;font-weight:700}
.volrow{display:none;align-items:center;gap:1.6u}
.volrow svg{width:4.4u;height:4.4u;fill:#4b5058;flex:none}
.volrow .bar{flex:1}
.np.vol .volrow{display:flex}
.np.vol .prog{display:none}
.live{display:flex;align-items:center;justify-content:center;gap:1.4u;height:6.2u;font-size:3.2u;font-weight:700;letter-spacing:.14em;color:#c62828}
.live i{width:1.8u;height:1.8u;border-radius:50%;background:#e53935;box-shadow:0 0 0 .6u rgba(229,57,53,.18)}
.ready{display:none;align-items:center;justify-content:center;gap:1.2u;height:6.2u;font-size:3.3u;font-weight:700;letter-spacing:.06em;color:#2a7cd6}
.ready svg{width:3.8u;height:3.8u;fill:currentColor;animation:pipblink 1.2s ease-in-out infinite}
@keyframes pipblink{50%{opacity:.3}}
.np.staged .ready{display:flex}
.msg{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;gap:1.6u;text-align:center;padding:4u;color:#333}
.msg svg{width:12u;height:12u;fill:#a3abb5}
.msg b{font-size:4.6u}
.msg span{font-size:3.5u;color:#6c727a}
.np.empty .np-top,.np.empty .np-bot{visibility:hidden}
.np.empty .msg{display:flex}
.toast{position:absolute;left:50%;bottom:3u;transform:translateX(-50%);z-index:6;max-width:84%;padding:1.6u 3.4u;border-radius:2.4u;background:rgba(20,22,26,.86);color:#fff;font-size:3.4u;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:1.4u;opacity:0;transition:opacity .2s;pointer-events:none}
.toast.on{opacity:1}
.toast svg{width:3.6u;height:3.6u;fill:#fff;flex:none}
.splash{position:absolute;inset:0;z-index:7;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2u;transition:opacity .45s}
.splash .s-ch{height:17u;width:auto}
.splash .s-tx{height:5.6u;width:auto}
.splash.gone{opacity:0;pointer-events:none}
.wheel{position:relative;width:66u;height:66u;margin:6.4u auto 0;border-radius:50%;touch-action:none;cursor:grab;
background:radial-gradient(circle at 50% 36%,#ffffff 0%,#f4f5f7 46%,#e3e6ea 100%);
box-shadow:inset 0 1px 1px rgba(255,255,255,.95),inset 0 -1px 2px rgba(0,0,0,.12),0 0 0 1px rgba(0,0,0,.10),0 1px 0 rgba(255,255,255,.85)}
.wheel:active{cursor:grabbing}
.g{position:absolute;color:#a5aab1;transition:color .08s,fill .08s;pointer-events:none}
.g svg{width:6.4u;height:6.4u;fill:#a5aab1;display:block}
.g-menu{top:5.6u;left:0;right:0;text-align:center;font-size:3.7u;font-weight:700;letter-spacing:.1em}
.g-prev{left:4.6u;top:50%;transform:translateY(-50%)}
.g-next{right:4.6u;top:50%;transform:translateY(-50%)}
.g-play{bottom:4.6u;left:50%;transform:translateX(-50%)}
.wheel.p-menu .g-menu,.wheel.p-prev .g-prev svg,.wheel.p-next .g-next svg,.wheel.p-play .g-play svg{color:#4a4f56;fill:#4a4f56}
.center{position:absolute;left:50%;top:50%;width:24u;height:24u;margin:-12u 0 0 -12u;padding:0;border:none;border-radius:50%;cursor:pointer;
background:radial-gradient(circle at 50% 32%,#fbfbfc,#e3e6ea);box-shadow:0 0 0 1px rgba(0,0,0,.10),inset 0 1px 1px #fff,0 1px 2px rgba(0,0,0,.14)}
.center:active,.center.p{background:radial-gradient(circle at 50% 40%,#e8eaee,#d3d7dc)}
.brand{display:flex;align-items:center;justify-content:center;gap:1.3u;margin-top:3.8u;font-size:3u;font-weight:700;letter-spacing:.1em;color:rgba(0,0,0,.36);text-shadow:0 1px 0 rgba(255,255,255,.7)}
.brand .b-ch{height:4.2u;width:auto}
.brand .b-tx{height:3.1u;width:auto}
.maker{position:absolute;top:1.2u;left:50%;transform:translateX(-50%);height:4.6u;padding:0 1.2u;display:flex;align-items:center;border-radius:1u;cursor:pointer}
.maker img{height:3.6u;width:auto;display:block;opacity:.92;filter:drop-shadow(0 1px 0 rgba(255,255,255,.65))}
.maker:active img{opacity:.55}
.nomaker .maker{display:none}
.ctl{margin-top:3.5u;padding:10px 12px;border-radius:16px;background:#f6f7f8;color:#111;box-shadow:0 2px 10px rgba(0,0,0,.16),inset 0 0 0 1px rgba(0,0,0,.05);display:grid;gap:7px}
.fld{display:flex;align-items:center;gap:10px;min-width:0}
.fld > svg{width:20px;height:20px;fill:#5d636b;flex:none}
select{flex:1;min-width:0;height:36px;font-size:16px;font-family:inherit;color:#111;background-color:#fff;border:1px solid #c8cdd3;border-radius:10px;padding:0 34px 0 11px;
-webkit-appearance:none;appearance:none;text-overflow:ellipsis;
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23555' d='M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 9px center;background-size:20px}
select:disabled{color:#8a9097;background-color:#eef0f2}
.vol input{flex:1;min-width:0;-webkit-appearance:none;appearance:none;height:26px;background:transparent;margin:0}
.vol input::-webkit-slider-runnable-track{height:5px;border-radius:3px;background:linear-gradient(90deg,#2a7cd6 0 var(--p,0%),#cdd2d8 var(--p,0%) 100%)}
.vol input::-moz-range-track{height:5px;border-radius:3px;background:#cdd2d8}
.vol input::-moz-range-progress{height:5px;border-radius:3px;background:#2a7cd6}
.vol input::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;margin-top:-7.5px;border-radius:50%;background:#fff;border:1px solid #b5bbc2;box-shadow:0 1px 3px rgba(0,0,0,.3)}
.vol input::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:#fff;border:1px solid #b5bbc2;box-shadow:0 1px 3px rgba(0,0,0,.3)}
.pct{width:42px;text-align:right;font-size:14px;font-weight:700;color:#333;font-variant-numeric:tabular-nums}
.pills{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.pill{height:34px;display:flex;align-items:center;justify-content:center;gap:6px;border-radius:17px;border:1px solid #c8cdd3;background:#fff;color:#222;font-family:inherit;font-size:14px;font-weight:600;line-height:1;cursor:pointer;padding:0 6px}
.pill svg{width:17px;height:17px;fill:currentColor;flex:none}
.pill.on{background:linear-gradient(#62aef6,#1f6fd8);border-color:#1f6fd8;color:#fff}
.pill:disabled,.vol input:disabled{opacity:.45;cursor:default}
.blocked .ctl{opacity:.55}
.noctl .ctl{display:none}
.np.tall .np-top{flex-direction:column;align-items:center;gap:2.6u}
.np.tall .art{width:var(--art,40u);height:var(--art,40u);-webkit-box-reflect:none}
.np.tall .art .ph svg{width:18u;height:18u}
.np.tall .meta{width:100%;flex:none;text-align:center;padding-bottom:0;gap:1.1u}
.np.tall .ti{font-size:5u}
.np.tall .ar{font-size:4.2u}
.np.tall .al{font-size:3.7u}
.safe{position:absolute;width:0;height:env(safe-area-inset-bottom,0px);visibility:hidden;pointer-events:none}
.safet{position:absolute;width:0;height:env(safe-area-inset-top,0px);visibility:hidden;pointer-events:none}
.exit{position:absolute;top:1.1u;left:8u;width:4.8u;height:4.8u;padding:0;border:none;border-radius:50%;cursor:pointer;display:none;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 32%,#ffffff 0%,#dfe2e6 55%,#bcc1c7 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.95),0 0 0 1px rgba(0,0,0,.14),0 1px 2px rgba(0,0,0,.35);color:#b8323f}
.exit svg{width:3.1u;height:3.1u;fill:currentColor}
.exit:active{background:radial-gradient(circle at 50% 45%,#d6d9dd,#b0b5bb);box-shadow:inset 0 1px 2px rgba(0,0,0,.35),0 0 0 1px rgba(0,0,0,.14)}
.powering .screen::before{content:"";position:absolute;inset:0;z-index:8;background:#000;animation:pipoff .3s ease-in forwards}
@keyframes pipoff{from{opacity:0}to{opacity:1}}
.hasexit .exit{display:flex}
.black .exit{background:radial-gradient(circle at 50% 32%,#5c5e62 0%,#3a3c3f 60%,#26272a 100%);color:#e2505c;box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 0 0 1px rgba(0,0,0,.5),0 1px 2px rgba(0,0,0,.5)}
/* Black finish */
.black .body{background:repeating-linear-gradient(90deg,rgba(255,255,255,.045) 0 1px,rgba(0,0,0,.06) 1px 2px,rgba(255,255,255,0) 2px 3px),
linear-gradient(165deg,#64676c 0%,#3b3d41 28%,#26282b 56%,#35373b 80%,#55585d 100%);
box-shadow:inset 0 1px 0 rgba(255,255,255,.42),inset 0 -2px 3px rgba(0,0,0,.45),inset 0 0 0 1px rgba(255,255,255,.14),0 0 0 1px rgba(0,0,0,.6),0 14px 28px rgba(0,0,0,.45),0 3px 6px rgba(0,0,0,.3)}
.black .body::after{box-shadow:inset 0 0 1u rgba(0,0,0,.6),inset 0 0 3.6u rgba(0,0,0,.3),inset 3.4u 0 4.2u -2u rgba(0,0,0,.42),inset -3.4u 0 4.2u -2u rgba(0,0,0,.42),inset 0 1.8u 2.2u -.6u rgba(255,255,255,.3),inset 0 -2.8u 3.8u -1u rgba(0,0,0,.5)}
.black .holdlbl{color:rgba(255,255,255,.45);text-shadow:0 -1px 0 rgba(0,0,0,.6)}
.black .bezel{box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),0 1px 0 rgba(255,255,255,.22),0 -1px 0 rgba(0,0,0,.4)}
.black .wheel{background:radial-gradient(circle at 50% 36%,#303236 0%,#212225 46%,#151618 100%);box-shadow:inset 0 1px 1px rgba(255,255,255,.18),inset 0 -1px 2px rgba(0,0,0,.5),0 0 0 1px rgba(0,0,0,.55),0 1px 0 rgba(255,255,255,.16)}
.black .g{color:#a2a8af}.black .g svg{fill:#a2a8af}
.black .wheel.p-menu .g-menu,.black .wheel.p-prev .g-prev svg,.black .wheel.p-next .g-next svg,.black .wheel.p-play .g-play svg{color:#e6e8eb;fill:#e6e8eb}
.black .center{background:radial-gradient(circle at 50% 32%,#3c3e42,#1c1d20);box-shadow:0 0 0 1px rgba(0,0,0,.6),inset 0 1px 1px rgba(255,255,255,.16),0 1px 0 rgba(255,255,255,.1)}
.black .center:active,.black .center.p{background:radial-gradient(circle at 50% 40%,#2a2c2f,#1d1e20)}
.black .brand{color:rgba(255,255,255,.45);text-shadow:0 -1px 0 rgba(0,0,0,.6)}
.black .hold{background:linear-gradient(#1c1d20,#33353a);box-shadow:inset 0 1px 2px rgba(0,0,0,.7),0 1px 0 rgba(255,255,255,.16)}
.black.held .hold{background:linear-gradient(#f5a04a,#d9731a)}
.black .hold .knob{background:linear-gradient(#8d9198,#5b5f65);box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 1px 2px rgba(0,0,0,.6)}

.black .ctl{background:#1f2023;color:#f1f2f3;box-shadow:0 2px 10px rgba(0,0,0,.35),inset 0 0 0 1px rgba(255,255,255,.06)}
.black .fld > svg{fill:#a9afb6}
.black select{color:#f1f2f3;background-color:#2b2c30;border-color:#3d3f44;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23bbb' d='M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z'/%3E%3C/svg%3E")}
.black select:disabled{color:#7d838a;background-color:#26272a}
.black select option{color:#111;background:#fff}
.black .pct{color:#e6e8eb}
.black .pill{background:#2b2c30;border-color:#3d3f44;color:#eceef0}
.black .pill.on{background:linear-gradient(#62aef6,#1f6fd8);border-color:#1f6fd8;color:#fff}
.black .vol input::-webkit-slider-runnable-track{background:linear-gradient(90deg,#4a9bec 0 var(--p,0%),#44474d var(--p,0%) 100%)}
`.replace(/(-?\d*\.?\d+)u\b/g, 'calc(var(--u) * $1)');

class PipPlayerCard extends HTMLElement {
constructor() {
super();
this.attachShadow({ mode: 'open' });
this._stack = null;
this._cache = {};
this._mode = 'volume';
this._volLocal = null;
this._seekLocal = null;
this._overlayUntil = 0;
this._selPl = '';
this._sres = {};
this._names = {};
}

static getStubConfig() { return { finish: 'silver' }; }

static getConfigElement() { return document.createElement(TAG + '-editor'); }

setConfig(config) {
if (!config || typeof config !== 'object') throw new Error('Pip Player: invalid configuration');
this._config = Object.assign({ finish: 'silver', volume_step: 2, seek_step: 5, clicker: true, splash: true, max_width: 340, controls: false, fit_screen: false }, config);
this._key = 'pip-player:' + (config.storage_key || 'default');
this._localHold = !!this._ls('hold');
if (this._built) { this._applyWidth(); this._render(); }
}

set hass(h) {
const old = this._hass;
this._hass = h;
this._loadPrefs();
if (!this._built) { this._build(); this._render(); return; }
if (!old) { this._render(); return; }
const ids = this._playerIds();
if (this._config.lock_entity) ids.push(this._config.lock_entity);
if (ids.some((e) => old.states[e] !== h.states[e])) this._render();
}

/* ---------- Hold switch / admin lock ----------
* With lock_entity set, the Hold switch IS the shared admin lock (an input_boolean):
* only admins can move it; while it is on, non-admins can browse but not control.
* Without lock_entity it is a plain per-device hold that freezes every control. */
_isAdmin() {
const u = this._hass && this._hass.user;
if (!u) return false;
const ids = this._config.admin_ids;
return Array.isArray(ids) && ids.length ? ids.includes(u.id) : !!u.is_admin;
}
_lockOn() {
const e = this._config.lock_entity;
const st = e && this._hass.states[e];
return !!st && st.state === 'on';
}
_holdOn() { return this._config.lock_entity ? this._lockOn() : !!this._localHold; }
_frozen() { return !this._config.lock_entity && !!this._localHold; }
_blocked() { return this._frozen() || (this._lockOn() && !this._isAdmin()); }

getCardSize() { return 14; }
getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }

connectedCallback() {
clearInterval(this._timer);
this._timer = setInterval(() => { this._render(); if (this._config && this._config.fit_screen) this._applyWidth(); }, 1000);
if (this._onResize) {
window.addEventListener('resize', this._onResize);
setTimeout(() => { if (this._config && this._config.fit_screen) { try { window.scrollTo(0, 0); } catch (e) { /* ignore */ } } this._onResize(); }, 250);
}
}
disconnectedCallback() {
clearInterval(this._timer);
this._timer = null;
if (this._onResize) window.removeEventListener('resize', this._onResize);
}

/* ---------- storage & settings ---------- */
_ls(k, v) {
try {
const key = this._key + ':' + k;
if (v === undefined) { const r = localStorage.getItem(key); return r === null ? undefined : JSON.parse(r); }
localStorage.setItem(key, JSON.stringify(v));
} catch (e) { /* storage unavailable */ }
return undefined;
}
/* Settings are saved against the signed-in HA user on the server (frontend user data),
* so they survive Home Assistant restarts, page reloads and app cache clears.
* A local copy is kept so the card starts with the right settings straight away. */
_prefKey() { return 'pip-player' + (this._config.storage_key ? '-' + this._config.storage_key : ''); }
_pref(k) { if (!this._prefs) this._prefs = this._ls('prefs') || {}; return this._prefs[k]; }
_setPref(k, v) {
if (!this._prefs) this._prefs = this._ls('prefs') || {};
this._prefs = Object.assign({}, this._prefs, { [k]: v });
this._prefsDirty = true;
this._ls('prefs', this._prefs);
const h = this._hass;
if (h && h.callWS) h.callWS({ type: 'frontend/set_user_data', key: this._prefKey(), value: this._prefs }).catch(() => { /* kept locally */ });
}
_loadPrefs() {
const h = this._hass;
if (this._prefsAsked || !h || !h.callWS) return;
this._prefsAsked = true;
h.callWS({ type: 'frontend/get_user_data', key: this._prefKey() }).then((r) => {
const v = r && r.value;
if (!v || typeof v !== 'object') return;
this._prefs = this._prefsDirty ? Object.assign({}, v, this._prefs) : Object.assign({}, v);
this._ls('prefs', this._prefs);
this._render();
}).catch(() => { /* older HA: local copy only */ });
}
_clicker() { const v = this._pref('clicker'); return v === undefined ? this._config.clicker !== false : !!v; }
_finish() { const v = this._pref('finish'); return (v || this._config.finish) === 'black' ? 'black' : 'silver'; }
_ctlOn() { const v = this._pref('controls'); return v === undefined ? !!this._config.controls : !!v; }

/* ---------- players ---------- */
_playerIds() {
const list = this._config.players;
if (Array.isArray(list) && list.length) return list.map((p) => (typeof p === 'string' ? p : p && p.entity)).filter(Boolean);
const h = this._hass;
return Object.values(h.entities || {})
.filter((e) => e.platform === 'music_assistant' && e.entity_id.startsWith('media_player.') && !e.hidden)
.map((e) => e.entity_id);
}
_players() {
const h = this._hass;
const list = this._config.players;
const names = {};
if (Array.isArray(list)) list.forEach((p) => { if (p && typeof p === 'object' && p.entity && p.name) names[p.entity] = p.name; });
return this._playerIds().map((e) => {
const st = h.states[e];
return { entity: e, st, name: names[e] || (st && st.attributes.friendly_name) || e, ok: !!st && st.state !== 'unavailable' };
}).filter((p) => p.st);
}
_current() {
const ps = this._players();
let e = this._player || this._ls('player') || this._config.default_player;
if (!ps.find((p) => p.entity === e)) e = (ps.find((p) => p.ok) || ps[0] || {}).entity;
this._player = e;
return ps.find((p) => p.entity === e) || null;
}
_state() { return this._player ? this._hass.states[this._player] : null; }
_ok(st) { return !!st && st.state !== 'unavailable'; }
_hasMedia(st = this._state()) {
if (!this._ok(st)) return false;
const a = st.attributes;
return ['playing', 'paused', 'buffering'].includes(st.state) || !!a.media_title || !!a.media_content_id;
}
_browseEntity() {
const cur = this._state();
if (this._ok(cur)) return this._player;
const p = this._players().find((x) => x.ok);
return p ? p.entity : null;
}

/* ---------- data ---------- */
async _load(kind, type, force) {
const c = this._cache[kind];
if (c && !force && (c.loading || (c.items && Date.now() - c.t < 15 * 60000))) return c;
const entry = { loading: true, t: Date.now(), items: c ? c.items : null, error: null };
this._cache[kind] = entry;
this._render();
try {
const ent = this._browseEntity();
if (!ent) throw new Error('No speaker available');
const r = await this._hass.callWS({ type: 'media_player/browse_media', entity_id: ent, media_content_id: kind, media_content_type: type });
entry.items = (r.children || []).filter((i) => i.can_play || i.can_expand)
.map((i) => ({ title: String(i.title || '').trim() || 'Untitled', id: i.media_content_id, type: i.media_content_type, thumb: i.thumbnail || '' }));
} catch (e) {
entry.error = (e && e.message) || String(e);
console.warn('[pip-player] browse failed', kind, e);
}
entry.loading = false;
entry.t = Date.now();
this._render();
return entry;
}
_need(kind, type) {
const c = this._cache[kind];
if (!c || (!c.loading && ((!c.items && !c.error) || (c.items && Date.now() - c.t > 15 * 60000)))) this._load(kind, type);
return this._cache[kind];
}
_plType(pid) {
const pl = ((this._cache.playlists && this._cache.playlists.items) || []).find((x) => x.id === pid);
return pl ? pl.type : (String(pid).includes('://playlist/') ? 'playlist' : 'music');
}
_title(pid) {
const pl = ((this._cache.playlists && this._cache.playlists.items) || []).find((x) => x.id === pid);
return pl ? pl.title : (this._names[pid] || '');
}
_from(pid) {
const p = String(pid);
if (p.startsWith('q:')) return 'Search';
if (p.startsWith('ar:')) return this._title(p.slice(3));
return this._title(p);
}
_isSearch(id) { return id === 'search' || String(id).startsWith('ps:'); }
/* ---------- search ----------
* Uses Music Assistant's own search (your library first, then Spotify etc.).
* Falls back to the speaker's media search if no Music Assistant entry is found. */
async _massSearch(data) {
const h = this._hass;
const ids = [];
if (this._config.mass_entry_id) ids.push(this._config.mass_entry_id);
if (this._massId && !ids.includes(this._massId)) ids.push(this._massId);
for (const e of [this._player].concat(this._playerIds())) {
const en = e && h.entities && h.entities[e];
const d = en && h.devices && h.devices[en.device_id];
if (d) [d.primary_config_entry].concat(d.config_entries || []).forEach((x) => { if (x && !ids.includes(x)) ids.push(x); });
if (ids.length >= 6) break;
}
for (const id of ids) {
try {
const r = await h.callWS({ type: 'call_service', domain: 'music_assistant', service: 'search', service_data: Object.assign({ config_entry_id: id }, data), return_response: true });
this._massId = id;
return this._normRes((r && r.response) || {});
} catch (e) {
// a wrong entry id just means try the next one; anything else is a real failure
if (!/entry|not found|config/i.test((e && e.message) || '')) throw e;
}
}
const ent = this._browseEntity();
if (!ent) throw new Error('No speaker available');
const r = await h.callWS({ type: 'call_service', domain: 'media_player', service: 'search_media', service_data: { search_query: data.name }, target: { entity_id: ent }, return_response: true });
return this._fromBrowse(((r && r.response && r.response[ent]) || {}).result || []);
}
_normRes(x) {
const names = (a) => (a || []).map((p) => p && p.name).filter(Boolean);
const pic = (o) => {
const i = o && o.image;
if (typeof i === 'string') return i;
if (i && typeof i.path === 'string' && /^https?:/.test(i.path)) return i.path;
return o && o.album ? pic(o.album) : '';
};
return {
tracks: (x.tracks || []).map((t) => { const ar = names(t.artists).join(', '); return { name: t.name, artist: names(t.artists)[0] || '', artists: ar, title: (ar ? ar + ' - ' : '') + t.name, id: t.uri, uri: t.uri, thumb: pic(t) }; }),
artists: (x.artists || []).map((a) => ({ name: a.name, uri: a.uri })),
albums: (x.albums || []).map((a) => ({ name: a.name, artist: names(a.artists)[0] || '', artists: names(a.artists).join(', '), uri: a.uri })),
playlists: (x.playlists || []).map((p) => ({ name: p.name, uri: p.uri })),
};
}
_fromBrowse(list) {
const out = { tracks: [], artists: [], albums: [], playlists: [] };
list.forEach((c) => {
const t = String(c.title || '');
const id = c.media_content_id;
if (c.media_class === 'track') { const p = t.split(' - '); const ar = p.length > 1 ? p.shift() : ''; out.tracks.push({ name: p.join(' - '), artist: ar, artists: ar, title: t, id, uri: id, thumb: c.thumbnail || '' }); }
else if (c.media_class === 'artist') out.artists.push({ name: t, uri: id });
else if (c.media_class === 'album') out.albums.push({ name: t, artist: '', artists: '', uri: id });
else if (c.media_class === 'playlist') out.playlists.push({ name: t, uri: id });
});
return out;
}
_runSearch(q) {
q = String(q || '').trim();
if (q.length < 2) return;
const k = q.toLowerCase();
const old = this._sres[k];
if (old && (old.loading || (old.res && Date.now() - old.t < 10 * 60000))) return;
const entry = this._sres[k] = { loading: true, t: Date.now(), res: null, error: null };
this._render();
this._massSearch({ name: q, media_type: ['track', 'artist', 'album', 'playlist'], limit: 12 }).then((r) => {
entry.res = r;
this._cache['q:' + k] = { items: r.tracks, t: Date.now() };
r.artists.concat(r.albums, r.playlists).forEach((x) => { this._names[x.uri] = x.name; });
}).catch((err) => { entry.error = (err && err.message) || String(err); console.warn('[pip-player] search failed', err); })
.finally(() => { entry.loading = false; entry.t = Date.now(); this._render(); });
}
_artist(uri, name) {
const k = 'ar:' + uri;
let c = this._cache[k];
if (c && (c.loading || c.items)) return c;
c = this._cache[k] = { loading: true, t: Date.now(), items: null, albums: [] };
const same = (x) => !name || norm(x.artists).includes(norm(name));
this._massSearch({ name, artist: name, media_type: ['track', 'album'], limit: 25 }).then((r) => {
c.items = r.tracks.filter(same);
c.albums = r.albums.filter(same);
}).catch((err) => { c.error = (err && err.message) || String(err); })
.finally(() => { c.loading = false; this._render(); });
return c;
}

/* ---------- actions ---------- */
_svc(domain, service, data = {}, entity, retry) {
if (this._blocked()) { this._held(); return Promise.resolve(false); }
const e = entity || this._player;
const st = e && this._hass.states[e];
if (!this._ok(st)) { this._toast('Speaker offline'); return Promise.resolve(false); }
// false = Pip Player shows its own message instead of Home Assistant's grey error bar
return this._hass.callService(domain, service, data, { entity_id: e }, false)
.then(() => true)
.catch((err) => {
console.warn('[pip-player]', domain + '.' + service, err);
if (retry !== null && this._inUse(err)) {
this._busy(err, e, retry || (() => this._svc(domain, service === 'media_play_pause' ? 'media_play' : service, data, e)));
} else this._toast("Couldn't do that");
return false;
});
}
async _play(mediaId, retry) {
this._toast('Loading…', 1400);
this._showNP();
return this._svc('music_assistant', 'play_media', { media_id: mediaId, enqueue: 'replace' }, undefined, retry);
}
async _playPlaylist(pid, shuffle) {
await this._svc('media_player', 'shuffle_set', { shuffle: !!shuffle });
return this._play(pid, () => this._playPlaylist(pid, shuffle));
}
/* ---------- music service in use ----------
* Some music services (Spotify) can only stream to one speaker at a time per account.
* Music Assistant refuses a second stream; Pip Player then says which speaker has it
* and offers to stop it and play here, or move its music here. */
_inUse(err) {
return /simultaneous stream|concurrent source stream|is already playing on/i.test(String((err && err.message) || err || ''));
}
_nameOf(e) {
const p = this._players().find((x) => x.entity === e);
const st = this._hass.states[e];
return String((p && p.name) || (st && st.attributes.friendly_name) || e).replace(/ @ .*$/, '').trim();
}
_holder(prov, here, named) {
const h = this._hass;
const ids = Object.values(h.entities || {})
.filter((x) => x.platform === 'music_assistant' && x.entity_id.startsWith('media_player.'))
.map((x) => x.entity_id);
this._playerIds().forEach((x) => { if (!ids.includes(x)) ids.push(x); });
const sts = ids.filter((x) => x !== here).map((x) => h.states[x]).filter(Boolean);
if (named) {
const n = norm(named);
const hit = sts.find((s) => norm(this._nameOf(s.entity_id)) === n || norm(s.attributes.friendly_name) === n);
if (hit) return hit.entity_id;
}
const live = sts.filter((s) => ['playing', 'buffering'].includes(s.state) && !isRadio(s.attributes));
const key = norm(prov).split(' ')[0];
const uses = live.filter((s) => key && String(s.attributes.media_content_id || '').toLowerCase().includes(key));
const grp = (s) => (s.attributes.mass_player_type === 'group' ? 1 : 0);
const pick = (uses.length ? uses : live).slice().sort((a, b) => grp(b) - grp(a))[0];
return pick ? pick.entity_id : null;
}
_busy(err, here, retry) {
const msg = String((err && err.message) || err || '').trim();
let m = msg.match(/^(.+?) is already playing on (.+?)[.]?$/i);
const named = m ? m[2] : '';
let prov = m ? m[1] : '';
if (!prov) { m = msg.match(/^(.+?) has reached its limit/i); prov = m ? m[1] : ''; }
prov = String(prov).trim().slice(0, 24) || 'Music';
this._busyInfo = { prov, here, retry, other: this._holder(prov, here, named) };
clearTimeout(this._toastT);
if (this._el) this._el.toast.classList.remove('on');
const top = this._top();
if (top.id === 'busy') top.sel = 0;
else this._stack.push({ id: 'busy', sel: 0 });
this._scrollSel = true;
this._render();
}
_busyDone() {
this._busyInfo = null;
if (this._top().id === 'busy') this._stack.pop();
this._scrollSel = true;
this._render();
}
async _busyHere() {
// stop the other speaker, then do again what was asked for here
const b = this._busyInfo;
this._busyDone();
if (!b || !b.other) return;
if (this._blocked()) return this._held();
this._toast('Stopping ' + this._nameOf(b.other) + '…', 2500);
await this._quiet('media_stop', {}, b.other);
await this._waitState(b.other, (s) => !['playing', 'buffering'].includes(s.state), 4000);
await new Promise((r) => setTimeout(r, 600));
if (b.retry) b.retry();
}
async _busyMove() {
// Music Assistant stops the other speaker and carries on its song here
const b = this._busyInfo;
this._busyDone();
if (!b || !b.other) return;
this._staged = null;
this._toast('Moving the music here…', 2000);
const ok = await this._svc('music_assistant', 'transfer_queue', { source_player: b.other, auto_play: true }, b.here, null);
if (ok) this._showNP();
}
_playTrack(pid, i) {
// choosing a song only gets it ready - nothing plays until play is pressed
const items = (this._cache[pid] && this._cache[pid].items) || [];
const t = items[i];
if (!t) return;
if (this._blocked()) return this._held();
const st = this._state();
if (st && st.state === 'playing') this._quiet('media_pause', {}, this._player);
this._staged = { pid, i, t, from: this._from(pid), at: Date.now() };
this._mode = 'volume';
this._showNP();
}
async _startTrack(pid, i) {
const items = (this._cache[pid] && this._cache[pid].items) || [];
const t = items[i];
if (!t) return;
const ok = await this._play(t.id, () => this._startTrack(pid, i));
const rest = String(pid).startsWith('q:') ? [] : items.slice(i + 1, i + 200).map((x) => x.id);
if (ok && rest.length) this._svc('music_assistant', 'play_media', { media_id: rest, enqueue: 'add' });
}
_toggleShuffle() {
const a = (this._state() || {}).attributes || {};
this._svc('media_player', 'shuffle_set', { shuffle: !a.shuffle });
}
_cycleRepeat() {
const r = ((this._state() || {}).attributes || {}).repeat || 'off';
this._svc('media_player', 'repeat_set', { repeat: { off: 'all', all: 'one', one: 'off' }[r] || 'all' });
}
_setPlayer(e, fromMenu) {
this._player = e;
this._staged = null;
this._ls('player', e);
this._volLocal = null;
this._seekLocal = null;
this._mode = 'volume';
if (fromMenu) {
if (this._hasMedia()) this._showNP();
else this._stack = [{ id: 'main', sel: 3 }];
}
this._render();
}
_vol() {
const st = this._state();
if (this._volLocal !== null && Date.now() < this._volUntil) return this._volLocal;
this._volLocal = null;
return this._ok(st) ? +(st.attributes.volume_level || 0) : 0;
}
_volBy(d) {
if (this._blocked()) return this._held();
if (!this._ok(this._state())) return this._toast('Speaker offline');
const v = Math.max(0, Math.min(1, Math.round((this._vol() + d) * 100) / 100));
this._setVol(v);
this._overlayUntil = Date.now() + 1600;
this._render();
}
_setVol(v) {
this._volLocal = v;
this._volUntil = Date.now() + 2500;
this._volPending = v;
if (this._volTimer) return;
this._volTimer = setTimeout(() => {
this._volTimer = null;
this._svc('media_player', 'volume_set', { volume_level: this._volPending });
}, 140);
}
_canSeek(st = this._state()) {
if (!this._ok(st)) return false;
const a = st.attributes;
return !isRadio(a) && +a.media_duration > 0 && ((a.supported_features || 0) & 2) === 2;
}
_pos(st) {
const a = st.attributes;
let p = +a.media_position || 0;
if (st.state === 'playing' && a.media_position_updated_at) p += (Date.now() - Date.parse(a.media_position_updated_at)) / 1000;
const d = +a.media_duration || 0;
return d ? Math.min(Math.max(p, 0), d) : Math.max(p, 0);
}
_seekBy(d) {
if (this._blocked()) return this._held();
const st = this._state();
if (!this._canSeek(st)) return;
const dur = +st.attributes.media_duration;
const p = Math.max(0, Math.min(dur - 1, (this._seekLocal !== null ? this._seekLocal : this._pos(st)) + d));
this._seekLocal = p;
this._modeTouch();
clearTimeout(this._seekTimer);
this._seekTimer = setTimeout(() => {
this._svc('media_player', 'media_seek', { seek_position: Math.round(p) });
setTimeout(() => { this._seekLocal = null; }, 1500);
}, 450);
this._render();
}
_modeTouch() {
clearTimeout(this._modeTimer);
this._modeTimer = setTimeout(() => { this._mode = 'volume'; this._render(); }, 4000);
}
_toggleHold() {
const lockEnt = this._config.lock_entity;
if (lockEnt) {
if (!this._isAdmin()) { this._toast('Only an admin can move Hold', 1500, true); return; }
if (!this._hass.states[lockEnt]) { this._toast('Lock helper not found'); return; }
const on = this._lockOn();
this._clickSound();
this._hass.callService('input_boolean', on ? 'turn_off' : 'turn_on', {}, { entity_id: lockEnt }, false)
.then(() => this._toast(on ? 'Released – anyone can play' : 'Locked – admins only', 1700, !on))
.catch((err) => { console.warn('[pip-player] lock', err); this._toast("Couldn't change the lock"); });
return;
}
this._localHold = !this._localHold;
this._ls('hold', this._localHold);
this._clickSound();
this._toast(this._localHold ? 'Hold is on' : 'Hold is off', 1000, this._localHold);
this._render();
}

/* ---------- navigation ---------- */
_top() { return this._stack[this._stack.length - 1]; }
_push(id) {
this._stack.push({ id, sel: 0, q: '' });
this._scrollSel = true;
if (this._isSearch(id)) {
// phones only show the keyboard if this happens during the tap itself
const el = this._el;
el.view.classList.add('searching');
el.sin.value = '';
el.sin._for = this._top();
el.sbox.classList.remove('has');
try { el.sin.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
}
this._render();
}
_showNP() {
if (this._top().id !== 'np') this._stack.push({ id: 'np' });
this._render();
}
_openMenu(id) {
this._stack = [{ id: 'main', sel: ['playlists', 'search', 'radio', 'speakers'].indexOf(id) + 1 }, { id, sel: 0 }];
this._scrollSel = true;
this._render();
}
_noMass() {
const h = this._hass;
if (!h) return false;
const list = this._config.players;
if (Array.isArray(list) && list.length) return false;
if (!Object.keys(h.entities || {}).length) return false;
return !this._playerIds().length;
}
_menu(id) {
const st = this._state();
const a = (st && st.attributes) || {};
const retry = (kind, type) => () => this._load(kind, type, true);
const listOr = (c, kind, type, map) => {
if (!c || (c.loading && !c.items)) return [{ label: 'Loading…', dis: true }];
if (c.error && !c.items) return [{ label: "Couldn't load – try again", act: retry(kind, type) }];
if (!c.items.length) return [{ label: 'Nothing here', dis: true }];
return c.items.map(map);
};
if (id === 'main' && this._noMass()) {
const txt = (label) => ({ label, info: true, txt: true });
return { title: 'Pip Player', items: [
{ label: 'Pip Player', info: true, logo: true },
txt('Pip Player needs Music Assistant to play your music.'),
txt('Install the Music Assistant app and add the Music Assistant integration, then add your speakers. Pip Player finds them by itself.'),
{ label: 'How to set it up', act: () => { try { window.open('https://www.music-assistant.io/get-started/', '_blank', 'noopener,noreferrer'); } catch (e) { /* ignore */ } } },
{ label: 'Settings', push: 'settings' },
] };
}
if (id === 'main') {
return { title: 'Pip Player', items: [
{ label: 'Now Playing', np: true },
{ label: 'Playlists', push: 'playlists' },
{ label: 'Search', push: 'search' },
{ label: 'Radio', push: 'radio' },
{ label: 'Speakers', push: 'speakers' },
{ label: 'Shuffle', val: a.shuffle ? 'On' : 'Off', act: () => this._toggleShuffle() },
{ label: 'Repeat', val: { off: 'Off', all: 'All', one: 'One' }[a.repeat || 'off'] || 'Off', act: () => this._cycleRepeat() },
{ label: 'Settings', push: 'settings' },
] };
}
if (id === 'playlists') {
const c = this._need('playlists', 'music_assistant');
return { title: 'Playlists', items: listOr(c, 'playlists', 'music_assistant', (it) => ({ label: it.title, push: 'pl:' + it.id })) };
}
if (id.startsWith('pl:') || id.startsWith('al:')) {
const pid = id.slice(3);
const album = id.startsWith('al:');
const type = album ? 'album' : this._plType(pid);
const c = this._need(pid, type);
const head = [
{ label: 'Play All', act: () => this._playPlaylist(pid, false) },
{ label: 'Shuffle All', act: () => this._playPlaylist(pid, true) },
].concat(album ? [] : [{ label: 'Search this playlist', push: 'ps:' + pid }]);
return { title: this._title(pid) || (album ? 'Album' : 'Playlist'), items: head.concat(listOr(c, pid, type, (it, i) => ({ label: it.title, act: () => this._playTrack(pid, i) }))) };
}
if (id === 'search') {
const q = (this._top().q || '').trim();
const info = (label) => ({ label, info: true });
const hd = (label) => ({ label, info: true, hd: true });
if (q.length < 2) return { title: 'Search', items: [info('Type a song, artist or album.'), info('Or tap the mic on the keyboard'), info('and say it.')] };
const c = this._sres[q.toLowerCase()];
if (!c || (c.loading && !c.res)) return { title: 'Search', items: [{ label: 'Searching…', dis: true }] };
if (c.error && !c.res) return { title: 'Search', items: [{ label: "Couldn't search – try again", act: () => { delete this._sres[q.toLowerCase()]; this._runSearch(q); } }] };
const r = c.res;
const key = 'q:' + q.toLowerCase();
const items = [];
if (r.tracks.length) { items.push(hd('Songs')); r.tracks.forEach((t, i) => items.push({ label: t.name, val: t.artist, act: () => this._playTrack(key, i) })); }
if (r.artists.length) { items.push(hd('Artists')); r.artists.forEach((x) => items.push({ label: x.name, push: 'ar:' + x.uri })); }
if (r.albums.length) { items.push(hd('Albums')); r.albums.forEach((x) => items.push({ label: x.name, val: x.artist, push: 'al:' + x.uri })); }
if (r.playlists.length) { items.push(hd('Playlists')); r.playlists.forEach((x) => items.push({ label: x.name, push: 'pl:' + x.uri })); }
return { title: 'Search', items: items.length ? items : [info('No results.')] };
}
if (id.startsWith('ps:')) {
const pid = id.slice(3);
const type = this._plType(pid);
const c = this._need(pid, type);
const title = this._title(pid) || 'Playlist';
const info = (label) => ({ label, info: true });
if (!c || !c.items) return { title, items: [c && c.error ? { label: "Couldn't load – try again", act: () => this._load(pid, type, true) } : { label: 'Loading…', dis: true }] };
const words = norm(this._top().q).split(' ').filter(Boolean);
if (!words.length) return { title, items: [info('Type to search ' + c.items.length + ' songs.'), info('Or tap the mic on the keyboard.')] };
const hits = [];
c.items.forEach((t, i) => { const s = norm(t.title); if (words.every((w) => s.includes(w))) hits.push({ label: t.title, act: () => this._playTrack(pid, i) }); });
return { title, items: hits.length ? hits.slice(0, 300) : [info('No matching songs.')] };
}
if (id.startsWith('ar:')) {
const uri = id.slice(3);
const name = this._title(uri) || 'Artist';
const c = this._artist(uri, name);
const hd = (label) => ({ label, info: true, hd: true });
const items = [
{ label: 'Play All', act: () => this._playPlaylist(uri, false) },
{ label: 'Shuffle All', act: () => this._playPlaylist(uri, true) },
];
if (c.loading && !c.items) items.push({ label: 'Loading…', dis: true });
else if (c.error && !c.items) items.push({ label: "Couldn't load – try again", act: () => { delete this._cache[id]; this._render(); } });
else {
if (c.items.length) { items.push(hd('Songs')); c.items.forEach((t, i) => items.push({ label: t.name, act: () => this._playTrack(id, i) })); }
if (c.albums.length) { items.push(hd('Albums')); c.albums.forEach((x) => { this._names[x.uri] = x.name; items.push({ label: x.name, push: 'al:' + x.uri }); }); }
}
return { title: name, items };
}
if (id === 'radio') {
const c = this._need('radio', 'music_assistant');
return { title: 'Radio', items: listOr(c, 'radio', 'music_assistant', (it) => ({ label: it.title, val: a.media_content_id === it.id ? '♪' : '', act: () => this._play(it.id) })) };
}
if (id === 'speakers') {
return { title: 'Speakers', items: this._players().map((p) => ({
label: p.name, val: p.entity === this._player ? '✓' : (p.ok ? '' : 'Offline'), dis: !p.ok, act: () => this._setPlayer(p.entity, true),
})) };
}
if (id === 'bt') {
// admins only: find a Bluetooth speaker app on the Home Assistant box
this._btCheck();
const b = this._bt;
const info = (label) => ({ label, info: true });
if (!b || b.loading) return { title: 'Bluetooth', items: [info('Looking for a Bluetooth app…')] };
if (b.apps.length) {
return { title: 'Bluetooth', items: b.apps.map((a) => ({ label: 'Open ' + a.name, val: a.state === 'started' ? '' : 'Stopped', act: () => this._openApp(a.slug) }))
.concat([info('Pair your speaker there,'), info('then pick it in Speakers.')]) };
}
return { title: 'Bluetooth', items: [info('No Bluetooth app found.'), info('Install one of these apps:'), info('• Sendspin Bluetooth Bridge'), info('• Bluetooth Audio Manager'), info('Pair your speaker in the app,'), info('then pick it in Speakers.')] };
}
if (id === 'ver') {
const hd = (label) => ({ label, info: true, hd: true });
const txt = (label) => ({ label, info: true, txt: true });
const items = [];
CHANGES.forEach(([v, d, list]) => { items.push(hd(v + ' · ' + d)); list.forEach((t) => items.push(txt('• ' + t))); });
return { title: 'Version ' + VERSION, read: true, items };
}
if (id === 'about') {
const hd = (label) => ({ label, info: true, hd: true });
const txt = (label) => ({ label, info: true, txt: true });
const go = (url) => () => { try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) { /* ignore */ } };
return { title: 'About', items: [
{ label: 'Pip Player', info: true, logo: true },
txt('Version ' + VERSION + '. Created by Tim Wilkinson (0xwilko).'),
txt('Inspired by the click-wheel music players of the 2000s, when one wheel and a thumb ran your whole music collection.'),
txt('It began as my own home-made music page in Home Assistant and grew into a player I wanted to share.'),
txt('From a ZX81 and BASIC to Home Assistant and AI, I still build things for the fun of it.'),
hd('Find me'),
{ label: 'GitHub', val: '0xwilko', act: go(LINKS.github) },
{ label: 'Home Assistant forum', val: '0xwilko', act: go(LINKS.forum) },
{ label: 'Discord', val: '0xwilko', act: LINKS.discord ? go(LINKS.discord) : () => this._toast('Discord: 0xwilko', 2500) },
{ label: 'Website', val: 'twilkinsondata.com', act: go(LINKS.web) },
txt('Own brand. Not affiliated with, or endorsed by, any other company.'),
] };
}
if (id === 'busy') {
const b = this._busyInfo;
const txt = (label) => ({ label, info: true, txt: true });
if (!b) return { title: '', items: [{ label: 'OK', act: () => this._busyDone() }] };
const title = b.prov + ' in use';
if (!b.other) {
return { title, items: [
txt(b.prov + ' is already playing on another speaker. It can only play on one at a time.'),
txt('Stop it there, then press play again.'),
{ label: 'OK', act: () => this._busyDone() },
] };
}
const who = this._nameOf(b.other);
return { title, items: [
txt(b.prov + ' is already playing on ' + who + '. It can only play on one speaker at a time.'),
{ label: 'Play here', act: () => this._busyHere() },
{ label: 'Move it here', act: () => this._busyMove() },
{ label: 'Cancel', act: () => this._busyDone() },
txt('Play here stops ' + who + '. Move it here carries on its song on this speaker.'),
] };
}
if (id === 'settings') {
return { title: 'Settings', items: [
{ label: 'Clicker', val: this._clicker() ? 'On' : 'Off', act: () => this._setPref('clicker', !this._clicker()) },
{ label: 'Finish', val: this._finish() === 'black' ? 'Black' : 'Silver', act: () => this._setPref('finish', this._finish() === 'black' ? 'silver' : 'black') },
{ label: 'Controls panel', val: this._ctlOn() ? 'On' : 'Off', act: () => this._setPref('controls', !this._ctlOn()) },
...(this._isAdmin() ? [{ label: 'Add Bluetooth speaker', push: 'bt' }] : []),
{ label: 'About', push: 'about' },
{ label: 'Version', val: VERSION, push: 'ver' },
] };
}
return { title: '', items: [] };
}
_activate(i) {
const top = this._top();
const m = this._menu(top.id);
const it = m.items[i];
top.sel = i;
if (!it || it.dis || it.info) { this._render(); return; }
if (it.np) {
if (this._hasMedia()) this._showNP();
else this._toast('Nothing playing');
return;
}
if (it.push) return this._push(it.push);
if (it.act) it.act();
this._render();
}

/* ---------- input ---------- */
_tick(dir) {
if (this._frozen()) return this._held();
const top = this._top();
if (top.id === 'np') {
if (this._blocked()) return this._held();
this._clickSound();
if (this._mode === 'seek') return this._seekBy(dir * this._config.seek_step);
return this._volBy((dir * this._config.volume_step) / 100);
}
const mm = this._menu(top.id);
if (mm.read) { this._el.list.scrollTop += dir * Math.max(30, this._el.list.clientHeight * 0.3); this._clickSound(); return; }
const items = mm.items;
const n = items.length;
if (!n) return;
const now = Date.now();
const gap = now - (this._lastTick || 0);
this._lastTick = now;
const mult = n > 20 && gap >= 8 && gap < 30 ? 3 : n > 20 && gap >= 8 && gap < 50 ? 2 : 1;
let s = Math.max(0, Math.min(n - 1, (top.sel || 0) + dir * mult));
while (items[s] && items[s].info && s + dir >= 0 && s + dir < n) s += dir;
if (items[s] && items[s].info) s = top.sel || 0;
if (s !== top.sel) { top.sel = s; this._clickSound(); this._scrollSel = true; this._render(); }
}
_press(zone) {
if (this._frozen()) return this._held();
const top = this._top();
const inMenu = top.id !== 'np';
if (this._blocked() && (zone === 'play' || (!inMenu && (zone === 'prev' || zone === 'next')))) return this._held();
this._clickSound();
this._flashZone(zone);
// in the menus the wheel does all the navigating: back = MENU, forward = select
if (inMenu && zone === 'prev') zone = 'menu';
if (inMenu && zone === 'next') zone = 'center';
if (zone === 'menu') {
if (top.id === 'np') { this._mode = 'volume'; this._staged = null; }
if (this._stack.length > 1) this._stack.pop();
else if (this._hasMedia()) this._stack.push({ id: 'np' });
this._scrollSel = true;
this._render();
} else if (zone === 'prev' || zone === 'next') {
const dir = zone === 'next' ? 1 : -1;
if (this._staged) this._moveStaged(dir);
else this._skip(dir);
} else if (zone === 'play') {
if (this._staged) { const sg = this._staged; this._staged = null; this._startTrack(sg.pid, sg.i); }
else this._svc('media_player', 'media_play_pause');
}
else if (zone === 'center') {
if (top.id === 'np') {
if (this._canSeek()) {
this._mode = this._mode === 'seek' ? 'volume' : 'seek';
if (this._mode === 'seek') this._modeTouch();
this._render();
}
} else this._activate(top.sel || 0);
}
}
_moveStaged(dir) {
const sg = this._staged;
const items = (this._cache[sg.pid] && this._cache[sg.pid].items) || [];
const i = Math.max(0, Math.min(items.length - 1, sg.i + dir));
if (i !== sg.i && items[i]) { sg.i = i; sg.t = items[i]; sg.at = Date.now(); }
this._render();
}
_quiet(service, data, e) {
return this._hass.callService('media_player', service, data || {}, { entity_id: e }, false).then(() => true).catch((err) => { this._qErr = err; return false; });
}
_waitState(e, test, ms) {
return new Promise((resolve) => {
const t0 = Date.now();
const iv = setInterval(() => {
const s = this._hass.states[e];
if ((s && test(s)) || Date.now() - t0 > ms) { clearInterval(iv); resolve(); }
}, 100);
});
}
async _skip(dir) {
// move to the next/previous track but leave it paused until play is pressed
if (this._blocked()) return this._held();
const e = this._player;
const st = this._state();
if (!this._ok(st)) return this._toast('Speaker offline');
if (this._skipping) return;
this._skipping = true;
const a = st.attributes;
const canMute = ((a.supported_features || 0) & 8) === 8 && !a.is_volume_muted;
try {
if (st.state === 'playing') {
await this._quiet('media_pause', {}, e);
await this._waitState(e, (s) => s.state !== 'playing', 2500);
}
if (canMute) await this._quiet('volume_mute', { is_volume_muted: true }, e);
const ok = await this._quiet(dir > 0 ? 'media_next_track' : 'media_previous_track', {}, e);
if (!ok) {
// the song may already have moved on, so after stopping the other speaker just ask for play
if (this._inUse(this._qErr)) this._busy(this._qErr, e, () => this._toast('Now press play', 1500));
else this._toast("Couldn't do that");
}
else {
await this._waitState(e, (s) => s.state === 'playing', 4000);
await this._quiet('media_pause', {}, e);
await this._waitState(e, (s) => s.state !== 'playing', 2500);
}
} finally {
if (canMute) await this._quiet('volume_mute', { is_volume_muted: false }, e);
this._skipping = false;
}
}
_btCheck() {
if (this._bt && (this._bt.loading || Date.now() - this._bt.t < 60000)) return;
this._bt = { loading: true, t: Date.now(), apps: [] };
this._hass.callWS({ type: 'supervisor/api', endpoint: '/addons', method: 'get' })
.then((r) => {
const list = (r && (r.addons || r)) || [];
this._bt.apps = (Array.isArray(list) ? list : [])
.filter((a) => /bluetooth|sendspin/i.test((a.name || '') + ' ' + (a.slug || '')) && /audio|speaker|bridge|sendspin/i.test((a.name || '') + ' ' + (a.slug || '')))
.map((a) => ({ slug: a.slug, name: a.name, state: a.state }));
})
.catch(() => { this._bt.apps = []; })
.finally(() => { this._bt.loading = false; this._bt.t = Date.now(); this._render(); });
}
_openApp(slug) {
this._clickSound();
const panel = this._hass.panels && Object.values(this._hass.panels).find((p) => p.url_path === slug);
const path = panel ? '/' + slug : '/config/app/' + slug + '/info';
window.history.pushState(null, '', path);
window.dispatchEvent(new CustomEvent('location-changed', { detail: { replace: false } }));
}
_home() {
if (this._frozen()) return this._held();
this._clickSound();
this._flashZone('menu');
this._mode = 'volume';
this._stack = [{ id: 'main', sel: (this._stack[0] && this._stack[0].sel) || 0 }];
this._scrollSel = true;
this._toast('Main menu', 700);
this._render();
}
_exit() {
if (this._exiting) return;
this._exiting = true;
this._clickSound();
this._el.wrap.classList.add('powering');
setTimeout(() => { this._exiting = false; this._el.wrap.classList.remove('powering'); this._leave(); }, 320);
}
_leave() {
const go = (p) => { window.history.pushState(null, '', p); window.dispatchEvent(new CustomEvent('location-changed', { detail: { replace: false } })); };
if (this._config.exit_path) { go(this._config.exit_path); return; }
const here = window.location.href;
window.history.back();
setTimeout(() => { if (window.location.href === here) go('/'); }, 400);
}
_held() { this._toast(this._config.lock_entity ? 'Locked by admin' : 'Hold is on', 1200, true); }
_flashZone(zone) {
const w = this._el.wheel;
if (zone === 'center') {
this._el.center.classList.add('p');
setTimeout(() => this._el.center.classList.remove('p'), 140);
return;
}
w.classList.add('p-' + zone);
setTimeout(() => w.classList.remove('p-' + zone), 160);
}
_audio() {
const C = window.AudioContext || window.webkitAudioContext;
return C ? (this._ac || (this._ac = new C())) : null;
}
// phones only allow sound after a real touch: wake the audio on the first one
_audioUnlock() {
if (!this._clicker()) return;
try {
const ctx = this._audio();
if (!ctx || ctx.state === 'running') return;
ctx.resume();
const s = ctx.createBufferSource();
s.buffer = ctx.createBuffer(1, 1, 22050);
s.connect(ctx.destination);
s.start(0);
} catch (e) { /* no audio */ }
}
// iPhone has no vibrate(): toggling a hidden switch gives a light tap on iOS 18+
_tap() {
try {
let l = this._hap;
if (!l) {
l = this._hap = document.createElement('label');
l.setAttribute('aria-hidden', 'true');
l.style.cssText = 'position:fixed;left:-99px;top:0;width:1px;height:1px;opacity:0;overflow:hidden;pointer-events:none';
const i = document.createElement('input');
i.type = 'checkbox';
i.setAttribute('switch', '');
i.tabIndex = -1;
l.appendChild(i);
this.shadowRoot.appendChild(l);
}
l.click();
} catch (e) { /* ignore */ }
}
_clickSound() {
if (!this._clicker()) return;
try {
const ctx = this._audio();
if (ctx) {
if (ctx.state !== 'running') ctx.resume();
const t = ctx.currentTime;
const o = ctx.createOscillator();
const g = ctx.createGain();
o.type = 'square';
o.frequency.setValueAtTime(1800, t);
g.gain.setValueAtTime(0.0001, t);
g.gain.exponentialRampToValueAtTime(0.045, t + 0.001);
g.gain.exponentialRampToValueAtTime(0.0001, t + 0.012);
o.connect(g);
g.connect(ctx.destination);
o.start(t);
o.stop(t + 0.016);
}
} catch (e) { /* no audio */ }
try { if (navigator.vibrate) navigator.vibrate(3); else if (/iP(hone|ad|od)/.test(navigator.userAgent)) this._tap(); } catch (e) { /* ignore */ }
}
_ang(e) { return (Math.atan2(e.clientY - this._wc.y, e.clientX - this._wc.x) * 180) / Math.PI; }
_zone(a) {
if (a > -135 && a <= -45) return 'menu';
if (a > -45 && a <= 45) return 'next';
if (a > 45 && a <= 135) return 'play';
return 'prev';
}
_bind() {
const el = this._el;
const w = el.wheel;
w.addEventListener('pointerdown', (e) => {
if (e.button > 0 || e.target === el.center) return;
const r = w.getBoundingClientRect();
this._wc = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
const a = this._ang(e);
const d = { id: e.pointerId, last: a, acc: 0, start: a, armed: false, ticked: false, long: false };
this._drag = d;
// hold MENU to jump straight back to the main menu
if (this._zone(a) === 'menu') d.lp = setTimeout(() => { if (this._drag === d && !d.armed) { d.long = true; this._home(); } }, 650);
try { w.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
e.preventDefault();
});
w.addEventListener('pointermove', (e) => {
const d = this._drag;
if (!d || d.id !== e.pointerId) return;
const a = this._ang(e);
let da = a - d.last;
if (da > 180) da -= 360;
if (da < -180) da += 360;
d.last = a;
d.acc += da;
e.preventDefault();
// dead zone: a press with a wobbly finger must not count as turning
if (!d.armed) { if (Math.abs(d.acc) < 9) return; d.armed = true; clearTimeout(d.lp); }
const STEP = 12;
while (d.acc >= STEP) { d.acc -= STEP; d.ticked = true; this._tick(1); }
while (d.acc <= -STEP) { d.acc += STEP; d.ticked = true; this._tick(-1); }
});
const end = (e) => {
const d = this._drag;
if (!d || d.id !== e.pointerId) return;
this._drag = null;
clearTimeout(d.lp);
if (e.type === 'pointerup' && !d.armed && !d.long) this._press(this._zone(d.start));
};
w.addEventListener('pointerup', end);
w.addEventListener('pointercancel', end);
w.addEventListener('wheel', (e) => {
e.preventDefault();
const step = e.deltaMode === 1 ? 1 : 40;
this._wacc = (this._wacc || 0) + (e.deltaY || e.deltaX);
const inv = this._top().id === 'np' ? -1 : 1;
while (this._wacc >= step) { this._wacc -= step; this._tick(inv); }
while (this._wacc <= -step) { this._wacc += step; this._tick(-inv); }
}, { passive: false });
el.center.addEventListener('click', (e) => { e.stopPropagation(); this._press('center'); });
el.hold.addEventListener('click', () => this._toggleHold());
el.exit.addEventListener('click', () => this._exit());
el.np.addEventListener('click', () => { if (this._top().id === 'np') this._press('play'); });
const wake = () => this._audioUnlock();
el.body.addEventListener('touchend', wake, { passive: true });
el.body.addEventListener('pointerup', wake);
const sin = el.sin;
sin.addEventListener('input', () => {
const top = this._top();
if (!this._isSearch(top.id)) return;
top.q = sin.value;
top.sel = 0;
this._scrollSel = true;
el.sbox.classList.toggle('has', !!sin.value);
clearTimeout(this._sT);
if (top.id === 'search') this._sT = setTimeout(() => this._runSearch(top.q), 350);
this._render();
});
sin.addEventListener('keydown', (e) => {
// typing must not reach the wheel's keyboard shortcuts (or Home Assistant's)
e.stopPropagation();
if (e.key !== 'Enter') return;
e.preventDefault();
const top = this._top();
if (top.id === 'search') { clearTimeout(this._sT); this._runSearch(top.q); }
sin.blur();
});
sin.addEventListener('focus', () => { this._typing = true; });
sin.addEventListener('blur', () => {
this._typing = false;
setTimeout(() => { if (this._config.fit_screen) { try { window.scrollTo(0, 0); } catch (e) { /* ignore */ } } this._applyWidth(); }, 350);
});
el.sclr.addEventListener('pointerdown', (e) => e.preventDefault());
el.sclr.addEventListener('click', () => { sin.value = ''; sin.dispatchEvent(new Event('input')); sin.focus(); });
el.list.addEventListener('click', (e) => {
const row = e.target.closest('.row');
if (!row) return;
if (this._frozen()) return this._held();
this._clickSound();
this._activate(+row.dataset.i);
});
el.body.addEventListener('keydown', (e) => {
const np = this._top().id === 'np';
const map = {
ArrowDown: () => this._tick(np ? -1 : 1), ArrowUp: () => this._tick(np ? 1 : -1),
Enter: () => this._press('center'), Escape: () => this._press('menu'), Backspace: () => this._press('menu'),
' ': () => this._press('play'), ArrowRight: () => this._press('next'), ArrowLeft: () => this._press('prev'),
};
if (map[e.key]) { e.preventDefault(); map[e.key](); }
});
el.spk.addEventListener('change', () => this._setPlayer(el.spk.value, false));
el.pl.addEventListener('change', () => {
this._selPl = el.pl.value;
if (this._selPl) this._load(this._selPl, this._plType(this._selPl));
this._render();
});
el.tr.addEventListener('change', () => {
const v = el.tr.value;
const pid = this._selPl;
if (!pid || v === '') return;
if (v === '__all') this._playPlaylist(pid, false);
else if (v === '__shuf') this._playPlaylist(pid, true);
else this._playTrack(pid, +v);
if (v.startsWith('__')) el.tr.value = '';
});
el.vol.addEventListener('input', () => {
const v = +el.vol.value / 100;
this._sliding = true;
el.pct.textContent = Math.round(v * 100) + '%';
el.vol.style.setProperty('--p', el.vol.value + '%');
this._setVol(v);
});
el.vol.addEventListener('change', () => { this._sliding = false; });
el.pRadio.addEventListener('click', () => { this._openMenu('radio'); });
el.pShuf.addEventListener('click', () => this._toggleShuffle());
el.pRep.addEventListener('click', () => this._cycleRepeat());
}

/* ---------- build & render ---------- */
_build() {
this._built = true;
const root = this.shadowRoot;
root.innerHTML = `<style>${CSS}</style>
<ha-card>
<div class="wrap">
<div class="body" tabindex="0" aria-label="Pip Player">
<span class="holdlbl">HOLD</span>
<button class="hold" type="button" aria-label="Hold switch"><span class="knob"></span></button>
<a class="maker" href="${GITHUB}" target="_blank" rel="noopener noreferrer" title="Made by 0xwilko - GitHub" aria-label="Made by 0xwilko - GitHub"><img src="${IMG.inf}" alt=""></a>
<button class="exit" type="button" aria-label="Back" title="Back">${ic('M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13')}</button>
<div class="bezel"><div class="screen">
<div class="hdr"><span class="l"></span><span class="t"></span><span class="r"></span></div>
<div class="view">
<div class="sbox">${ic(P.search)}<input class="sin" type="search" enterkeyhint="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="Search"><button class="sclr" type="button" aria-label="Clear">×</button></div>
<div class="list" role="listbox"></div>
<div class="np">
<div class="np-top">
<div class="art"><div class="ph">${ic(P.note)}</div><img alt="" referrerpolicy="no-referrer"></div>
<div class="meta"><div class="ti"><span></span></div><div class="ar"></div><div class="al"></div></div>
</div>
<div class="np-bot">
<div class="prog"><div class="bar pbar"><div class="fill"></div><div class="knob2"></div></div>
<div class="times"><span class="el"></span><span class="mid"></span><span class="rm"></span></div></div>
<div class="livebox live"><i></i>LIVE</div>
<div class="ready">${ic(P.play)}<span>Press play</span></div>
<div class="volrow">${ic(P.volLow)}<div class="bar"><div class="fill vfill"></div></div>${ic(P.volHigh)}</div>
</div>
<div class="msg"></div>
</div>
</div>
<div class="toast"></div>
<div class="splash"><img class="s-ch" src="${IMG.ch}" alt=""><img class="s-tx" src="${IMG.tx}" alt="Pip Player"></div>
</div></div>
<div class="wheel" role="group" aria-label="Click wheel">
<span class="g g-menu">MENU</span>
<span class="g g-prev">${ic(P.wPrev)}</span>
<span class="g g-next">${ic(P.wNext)}</span>
<span class="g g-play">${ic(P.wPlay)}</span>
<button class="center" type="button" aria-label="Select"></button>
</div>
<div class="brand"><img class="b-ch" src="${IMG.ch}" alt=""><img class="b-tx" src="${IMG.tx}" alt="Pip Player"></div>
</div>
<div class="safe"></div><div class="safet"></div>
<div class="ctl">
<label class="fld">${ic(P.speaker)}<select class="s-spk" aria-label="Speaker"></select></label>
<label class="fld">${ic(P.playlist)}<select class="s-pl" aria-label="Playlist"></select></label>
<label class="fld">${ic(P.note)}<select class="s-tr" aria-label="Track"></select></label>
<div class="fld vol">${ic(P.volLow)}<input class="s-vol" type="range" min="0" max="100" step="1" aria-label="Volume"><span class="pct">0%</span></div>
<div class="pills">
<button class="pill p-radio" type="button">${ic(P.radio)}Radio</button>
<button class="pill p-shuf" type="button">${ic(P.shuffle)}Shuffle</button>
<button class="pill p-rep" type="button">${ic(P.repeat)}<span>Repeat</span></button>
</div>
</div>
</div>
</ha-card>`;
const q = (s) => root.querySelector(s);
this._el = {
wrap: q('.wrap'), body: q('.body'), hold: q('.hold'), hdrL: q('.hdr .l'), hdrT: q('.hdr .t'), hdrR: q('.hdr .r'),
list: q('.list'), view: q('.view'), sbox: q('.sbox'), sin: q('.sin'), sclr: q('.sclr'), np: q('.np'), img: q('.art img'), ph: q('.art .ph'), ti: q('.ti'), tiS: q('.ti span'), ar: q('.ar'), al: q('.al'),
prog: q('.prog'), pbar: q('.pbar'), fill: q('.pbar .fill'), knob: q('.knob2'), el: q('.times .el'), mid: q('.times .mid'), rm: q('.times .rm'),
live: q('.livebox'), vfill: q('.vfill'), msg: q('.msg'), toast: q('.toast'), splash: q('.splash'),
wheel: q('.wheel'), center: q('.center'), spk: q('.s-spk'), pl: q('.s-pl'), tr: q('.s-tr'), vol: q('.s-vol'), pct: q('.pct'),
pRadio: q('.p-radio'), pShuf: q('.p-shuf'), pRep: q('.p-rep'), ctl: q('.ctl'), safe: q('.safe'), safet: q('.safet'), exit: q('.exit'), card: q('ha-card'),
};
this._el.img.addEventListener('error', () => {
const im = this._el.img;
im._ci = (im._ci || 0) + 1;
if (im._cands && im._ci < im._cands.length) { im.src = im._cands[im._ci]; return; }
im.style.visibility = 'hidden';
this._el.ph.style.display = '';
});
this._el.img.addEventListener('load', () => { this._el.img.style.visibility = ''; this._el.ph.style.display = 'none'; });
this._applyWidth();
try {
this._ro = new ResizeObserver(() => this._applyWidth());
this._ro.observe(this);
} catch (e) { /* older browser: fixed scale */ }
this._onResize = () => this._applyWidth();
window.addEventListener('resize', this._onResize);
if (this._config.fit_screen) {
setTimeout(() => { try { window.scrollTo(0, 0); } catch (e) { /* ignore */ } this._applyWidth(); }, 250);
this._el.body.addEventListener('touchmove', (e) => { if (!e.composedPath().includes(this._el.list)) e.preventDefault(); }, { passive: false });
}
this._bind();
this._current();
this._stack = this._hasMedia() && ['playing', 'paused', 'buffering'].includes((this._state() || {}).state)
? [{ id: 'main', sel: 0 }, { id: 'np' }] : [{ id: 'main', sel: 0 }];
if (this._config.splash) setTimeout(() => this._el.splash.classList.add('gone'), 1100);
else this._el.splash.classList.add('gone');
// warm the caches quietly so menus open instantly
setTimeout(() => { this._load('playlists', 'music_assistant'); this._load('radio', 'music_assistant'); }, 400);
}
_applyWidth() {
if (!this._el || this._typing) return;
const el = this._el;
const max = +this._config.max_width || 340;
const hostW = (this.getBoundingClientRect().width || max + 12) - 12;
let u = Math.min(hostW, max) / 100;
let sh = 60;
if (this._config.fit_screen) {
// size the player to the visible screen so it never needs scrolling
const fixed = 7 + 3 + 6.4 + 66 + 3.8 + 4.2 + 4.2;
const top = this.getBoundingClientRect().top + (window.scrollY || 0);
const safe = el.safe ? el.safe.offsetHeight : 0;
// header hidden (kiosk): keep clear of the phone's status bar / camera notch
const topPad = top < 4 && el.safet ? el.safet.offsetHeight : 0;
const padTop = (8 + topPad) + 'px';
if (el.card && el.card.style.paddingTop !== padTop) el.card.style.paddingTop = padTop;
const ctl = this._ctlOn() && el.ctl ? el.ctl.offsetHeight + 14 : 0;
const avail = window.innerHeight - top - 24 - topPad - safe - ctl;
if (avail > 200) {
sh = avail / u - fixed;
if (sh < 56) { u = avail / (fixed + 56); sh = 56; }
sh = Math.min(sh, 100);
}
}
const art = Math.max(26, Math.min(46, sh - 52));
const set = (k, v) => { if (el.wrap.style.getPropertyValue(k) !== v) el.wrap.style.setProperty(k, v); };
set('max-width', Math.round(u * 100) + 'px');
set('--u', u.toFixed(3) + 'px');
set('--sh', (sh * u).toFixed(1) + 'px');
set('--art', (art * u).toFixed(1) + 'px');
el.np.classList.toggle('tall', sh >= 72);
}
_toast(msg, ms = 1500, lock = false) {
const t = this._el && this._el.toast;
if (!t) return;
t.innerHTML = (lock ? ic(P.lock) : '') + `<span>${esc(msg)}</span>`;
t.classList.add('on');
clearTimeout(this._toastT);
this._toastT = setTimeout(() => t.classList.remove('on'), ms);
}
_render() {
if (!this._built || !this._hass || this._raf) return;
this._raf = requestAnimationFrame(() => {
this._raf = null;
try { this._draw(); } catch (e) { console.error('[pip-player] render error', e); }
});
}
_setHTML(node, html) { if (node._h !== html) { node._h = html; node.innerHTML = html; } }
_draw() {
const el = this._el;
const cur = this._current();
const st = this._state();
const a = (st && st.attributes) || {};
const ok = this._ok(st);
const fin = this._finish();
el.wrap.classList.toggle('black', fin === 'black');
el.wrap.classList.toggle('silver', fin !== 'black');
el.wrap.classList.toggle('held', this._holdOn());
el.wrap.classList.toggle('blocked', this._blocked());
el.wrap.classList.toggle('hasexit', !!this._config.exit_button);
el.wrap.classList.toggle('nomaker', this._config.maker === false);
const noctl = !this._ctlOn();
if (el.wrap.classList.contains('noctl') !== noctl) { el.wrap.classList.toggle('noctl', noctl); setTimeout(() => this._applyWidth(), 0); }
el.hold.setAttribute('aria-pressed', this._holdOn() ? 'true' : 'false');
el.hold.title = this._config.lock_entity
? (this._holdOn() ? 'Locked – admins only' : 'Unlocked') + (this._isAdmin() ? '' : ' (admin only)')
: 'Hold';
const top = this._top();
const onNP = top.id === 'np';
const srch = this._isSearch(top.id);
el.view.classList.toggle('searching', srch);
if (srch) {
if (el.sin._for !== top) { el.sin._for = top; el.sin.value = top.q || ''; }
const ph = top.id === 'search' ? 'Songs, artists, albums' : 'Search ' + (this._title(top.id.slice(3)) || 'playlist');
if (el.sin.placeholder !== ph) el.sin.placeholder = ph;
el.sbox.classList.toggle('has', !!el.sin.value);
} else if (this.shadowRoot.activeElement === el.sin) el.sin.blur();
if (onNP && !this._hasMedia(st) && ok) { /* keep NP but it will show the empty message */ }

// header
const stIcon = !ok ? '' : (this._staged && onNP) ? ic(P.pause) : st.state === 'playing' ? ic(P.play) : st.state === 'paused' ? ic(P.pause) : '';
this._setHTML(el.hdrL, stIcon);
el.hdrT.textContent = onNP ? (cur ? cur.name : 'No speaker') : this._menu(top.id).title;
let r = '';
if (ok && a.shuffle) r += ic(P.shuffle);
if (ok && a.repeat && a.repeat !== 'off') r += ic(a.repeat === 'one' ? P.repeatOne : P.repeat);
if (this._holdOn()) r += ic(P.lock);
this._setHTML(el.hdrR, r);

// body view
el.list.style.display = onNP ? 'none' : '';
el.np.style.display = onNP ? '' : 'none';
if (onNP) this._drawNP(cur, st, a, ok);
else this._drawList(top);

this._drawControls(cur, st, a, ok);
}
_drawList(top) {
const el = this._el;
const m = this._menu(top.id);
if (top.sel >= m.items.length) top.sel = Math.max(0, m.items.length - 1);
if (m.items[top.sel] && m.items[top.sel].info) { const j = m.items.findIndex((x) => !x.info); if (j >= 0) top.sel = j; }
const html = m.items.map((it, i) => `<div class="row${i === top.sel ? ' sel' : ''}${it.dis ? ' dis' : ''}${it.info ? ' info' : ''}${it.hd ? ' hd' : ''}${it.txt ? ' txt' : ''}${it.logo ? ' logo' : ''}" data-i="${i}" role="option" aria-selected="${i === top.sel}">${it.logo ? `<img class="l-ch" src="${IMG.ch}" alt=""><img class="l-tx" src="${IMG.tx}" alt="Pip Player">` : `<span class="lbl">${esc(it.label)}</span>`}${it.val ? `<span class="val">${esc(it.val)}</span>` : ''}${it.push ? ic(P.chevron) : ''}</div>`).join('');
const changedMenu = el.list._menuId !== top.id;
el.list._menuId = top.id;
this._setHTML(el.list, html);
if (changedMenu) el.list.scrollTop = 0;
if (this._scrollSel || changedMenu) {
this._scrollSel = false;
const row = el.list.children[top.sel];
if (row) {
const t = row.offsetTop, b = t + row.offsetHeight;
if (t < el.list.scrollTop) el.list.scrollTop = t;
else if (b > el.list.scrollTop + el.list.clientHeight) el.list.scrollTop = b - el.list.clientHeight;
}
}
}
_drawNP(cur, st, a, ok) {
const el = this._el;
const has = this._hasMedia(st);
let sg = ok ? this._staged : null;
// someone started music elsewhere: drop the waiting song
if (sg && st.state === 'playing' && Date.now() - sg.at > 4000) { this._staged = null; sg = null; }
el.np.classList.toggle('staged', !!sg);
el.np.classList.toggle('empty', !ok || (!has && !sg));
if (!ok || (!has && !sg)) {
this._setHTML(el.msg, !st ? `${ic(P.off)}<b>No speaker</b><span>Pick one in Speakers</span>`
: !ok ? `${ic(P.off)}<b>Speaker offline</b><span>${esc(cur ? cur.name : '')}</span>`
: `${ic(P.note)}<b>Nothing playing</b><span>Press MENU to choose music</span>`);
return;
}
const radio = !sg && isRadio(a);
let title = junk(a.media_title) ? '' : a.media_title;
let artist = junk(a.media_artist) ? '' : a.media_artist;
let third = junk(a.media_album_name) ? '' : a.media_album_name;
if (sg) {
const parts = String(sg.t.title).split(' - ');
artist = parts.length > 1 ? parts.shift() : '';
title = parts.join(' - ');
third = sg.from || '';
}
if (radio) {
const station = third || a.media_channel || '';
if (!title) { title = station || 'Radio'; third = 'Live radio'; }
else third = station;
}
if (!title) title = 'Unknown track';
if (el.tiS.textContent !== title) {
el.tiS.textContent = title;
el.ti.classList.remove('mq');
requestAnimationFrame(() => {
const over = el.tiS.scrollWidth - el.ti.clientWidth;
if (over > 4) {
el.ti.style.setProperty('--mqx', -over + 'px');
el.ti.style.setProperty('--mqd', Math.max(6, over / 18 + 4).toFixed(1) + 's');
el.ti.classList.add('mq');
}
});
}
el.ar.textContent = artist;
el.al.textContent = third;
const fix = (p) => (p && p.startsWith('/') && this._hass.hassUrl ? this._hass.hassUrl(p) : p);
const okUrl = (p) => { const s = String(p).toLowerCase(); return s.startsWith('https:') || s.startsWith('http:') || s.startsWith('data:image/') || s.startsWith('/'); };
const cands = (sg ? [sg.t.thumb] : [a.entity_picture_local, a.entity_picture]).filter(Boolean).map(fix).filter(okUrl).filter((p, i, arr) => arr.indexOf(p) === i);
const key = cands.join('|');
if (el.img._key !== key) {
el.img._key = key;
el.img._cands = cands;
el.img._ci = 0;
if (cands.length) { el.img.src = cands[0]; } else { el.img.removeAttribute('src'); el.img.style.visibility = 'hidden'; el.ph.style.display = ''; }
}
// bottom area
const showVol = !sg && Date.now() < this._overlayUntil;
el.np.classList.toggle('vol', showVol);
const dur = +a.media_duration || 0;
const live = radio || !dur;
el.prog.style.display = sg || showVol || live ? 'none' : '';
el.live.style.display = !sg && !showVol && live ? '' : 'none';
if (showVol) el.vfill.style.width = Math.round(this._vol() * 100) + '%';
if (!live) {
const pos = this._seekLocal !== null ? this._seekLocal : this._pos(st);
const pct = dur ? Math.min(100, (pos / dur) * 100) : 0;
el.fill.style.width = pct + '%';
el.knob.style.left = pct + '%';
el.pbar.classList.toggle('seek', this._mode === 'seek');
el.el.textContent = fmt(pos);
el.rm.textContent = '-' + fmt(dur - pos);
el.mid.textContent = this._mode === 'seek' ? 'SCRUB' : '';
}
}
_drawControls(cur, st, a, ok) {
const el = this._el;
const held = this._blocked();
// speakers
const ps = this._players();
const spkHtml = ps.map((p) => `<option value="${esc(p.entity)}"${p.ok ? '' : ' disabled'}>${esc(p.name)}${p.ok ? '' : ' (offline)'}</option>`).join('');
this._setHTML(el.spk, spkHtml);
if (cur && el.spk.value !== cur.entity) el.spk.value = cur.entity;
el.spk.disabled = held;
// playlists
const pc = this._cache.playlists;
const plItems = (pc && pc.items) || [];
const plHtml = `<option value="">${pc && pc.loading && !pc.items ? 'Loading playlists…' : 'Choose a playlist'}</option>` +
plItems.map((p) => `<option value="${esc(p.id)}">${esc(p.title)}</option>`).join('');
this._setHTML(el.pl, plHtml);
if (el.pl.value !== this._selPl) el.pl.value = this._selPl;
el.pl.disabled = held || !plItems.length;
// tracks
let trHtml;
const tc = this._selPl ? this._cache[this._selPl] : null;
if (!this._selPl) trHtml = '<option value="">Choose a playlist first</option>';
else if (!tc || (tc.loading && !tc.items)) trHtml = '<option value="">Loading tracks…</option>';
else if (tc.error && !tc.items) trHtml = "<option value=\"\">Couldn't load tracks</option>";
else {
trHtml = '<option value="">Choose a track</option><option value="__all">▶ Play all</option><option value="__shuf">⤮ Shuffle all</option>' +
tc.items.map((t, i) => `<option value="${i}">${esc(t.title)}</option>`).join('');
}
const prevTr = el.tr.value;
this._setHTML(el.tr, trHtml);
if (el.tr.value !== prevTr && [...el.tr.options].some((o) => o.value === prevTr)) el.tr.value = prevTr;
el.tr.disabled = held || !(tc && tc.items && tc.items.length);
// volume
if (!this._sliding) {
const v = Math.round(this._vol() * 100);
if (+el.vol.value !== v) el.vol.value = v;
el.vol.style.setProperty('--p', v + '%');
el.pct.textContent = (ok ? v : 0) + '%';
}
el.vol.disabled = held || !ok;
// pills
const radio = ok && isRadio(a) && ['playing', 'paused', 'buffering'].includes(st.state);
el.pRadio.classList.toggle('on', radio);
el.pShuf.classList.toggle('on', ok && !!a.shuffle);
const rep = ok ? a.repeat || 'off' : 'off';
el.pRep.classList.toggle('on', rep !== 'off');
this._setHTML(el.pRep, `${ic(rep === 'one' ? P.repeatOne : P.repeat)}<span>${rep === 'one' ? 'Repeat 1' : 'Repeat'}</span>`);
[el.pRadio, el.pShuf, el.pRep].forEach((b) => { b.disabled = held || !ok; });
}
}

/* ---------- card editor (point-and-click options) ---------- */
const ED_DEF = { finish: 'silver', fit_screen: false, max_width: 340, splash: true, maker: true, clicker: true, controls: false, exit_button: false, volume_step: 2, seek_step: 5 };
const ED_OPT = ['default_player', 'exit_path', 'lock_entity', 'storage_key', 'mass_entry_id'];
const ED_MASS = { integration: 'music_assistant', domain: 'media_player' };
const ED_SCHEMA = [
{ name: 'players', selector: { entity: { multiple: true, filter: ED_MASS } } },
{ name: 'default_player', selector: { entity: { filter: ED_MASS } } },
{ name: '', type: 'expandable', title: 'Look', icon: 'mdi:palette-outline', schema: [
{ name: 'finish', selector: { select: { mode: 'dropdown', options: [{ value: 'silver', label: 'Silver' }, { value: 'black', label: 'Black (graphite)' }] } } },
{ name: '', type: 'grid', schema: [
{ name: 'fit_screen', selector: { boolean: {} } },
{ name: 'max_width', selector: { number: { min: 240, max: 900, step: 10, mode: 'box', unit_of_measurement: 'px' } } },
] },
{ name: '', type: 'grid', schema: [
{ name: 'splash', selector: { boolean: {} } },
{ name: 'maker', selector: { boolean: {} } },
] },
] },
{ name: '', type: 'expandable', title: 'Sound and wheel', icon: 'mdi:volume-high', schema: [
{ name: '', type: 'grid', schema: [
{ name: 'clicker', selector: { boolean: {} } },
{ name: 'controls', selector: { boolean: {} } },
] },
{ name: '', type: 'grid', schema: [
{ name: 'volume_step', selector: { number: { min: 1, max: 10, step: 1, mode: 'box', unit_of_measurement: '%' } } },
{ name: 'seek_step', selector: { number: { min: 1, max: 30, step: 1, mode: 'box', unit_of_measurement: 's' } } },
] },
] },
{ name: '', type: 'expandable', title: 'Power button', icon: 'mdi:power', schema: [
{ name: 'exit_button', selector: { boolean: {} } },
{ name: 'exit_path', selector: { text: {} } },
] },
{ name: '', type: 'expandable', title: 'Hold switch lock', icon: 'mdi:lock-outline', schema: [
{ name: 'lock_entity', selector: { entity: { filter: { domain: 'input_boolean' } } } },
] },
{ name: '', type: 'expandable', title: 'Advanced', icon: 'mdi:cog-outline', schema: [
{ name: 'storage_key', selector: { text: {} } },
{ name: 'mass_entry_id', selector: { config_entry: { integration: 'music_assistant' } } },
] },
];
const ED_LABEL = {
players: 'Speakers',
default_player: 'Start on this speaker',
finish: 'Finish',
fit_screen: 'Fit the screen',
max_width: 'Widest size',
splash: 'Show the logo when opening',
maker: 'Show the maker badge',
clicker: 'Click sounds',
controls: 'Classic control panel',
volume_step: 'Volume per wheel click',
seek_step: 'Seconds per click when scrubbing',
exit_button: 'Show the power button',
exit_path: 'Page the power button opens',
lock_entity: 'Admin lock helper',
storage_key: 'Settings name',
mass_entry_id: 'Music Assistant entry',
};
const ED_HELP = {
players: 'Leave empty to use every Music Assistant speaker.',
finish: 'Each person can still change this in MENU, Settings.',
fit_screen: 'For a full-screen phone page.',
clicker: 'Each person can still change this in MENU, Settings.',
exit_path: 'Leave empty to go back. Example: /lovelace/0',
lock_entity: 'A toggle helper. Leave empty for a simple lock. With a helper, only admins can move the Hold switch.',
storage_key: 'Only needed if you use more than one Pip Player.',
mass_entry_id: 'Only needed if search cannot find Music Assistant.',
};

class PipPlayerEditor extends HTMLElement {
setConfig(config) {
this._config = Object.assign({}, config || {});
this._render();
}
set hass(hass) {
this._hass = hass;
this._render();
}
connectedCallback() { this._render(); }
async _loadForm() {
if (this._loading) return;
this._loading = true;
try {
const helpers = window.loadCardHelpers ? await window.loadCardHelpers() : null;
const card = helpers ? await helpers.createCardElement({ type: 'entities', entities: [] }) : null;
if (card && card.constructor && card.constructor.getConfigElement) await card.constructor.getConfigElement();
} catch (e) { /* ignore */ }
await Promise.race([customElements.whenDefined('ha-form'), new Promise((r) => setTimeout(r, 4000))]);
this._loaded = true;
this._render();
}
_data() {
const c = this._config || {};
const d = Object.assign({}, ED_DEF, c);
d.players = Array.isArray(c.players) ? c.players.map((p) => (typeof p === 'string' ? p : p && p.entity)).filter(Boolean) : [];
return d;
}
_render() {
if (!this._config || !this._hass || !this.isConnected) return;
if (!customElements.get('ha-form')) {
if (this._loaded) this.textContent = 'Options need a newer Home Assistant. Use Show code editor instead.';
else this._loadForm();
return;
}
if (!this._form) {
this.textContent = '';
const f = document.createElement('ha-form');
f.computeLabel = (s) => ED_LABEL[s.name] || s.name;
f.computeHelper = (s) => ED_HELP[s.name] || '';
f.addEventListener('value-changed', (ev) => this._changed(ev));
this.appendChild(f);
this._form = f;
}
this._form.hass = this._hass;
this._form.schema = ED_SCHEMA;
this._form.data = this._data();
}
_changed(ev) {
ev.stopPropagation();
const v = Object.assign({}, (ev.detail && ev.detail.value) || {});
const old = this._config || {};
const out = Object.assign({}, old);
const names = {};
if (Array.isArray(old.players)) old.players.forEach((p) => { if (p && typeof p === 'object' && p.entity && p.name) names[p.entity] = p.name; });
const pl = Array.isArray(v.players) ? v.players.filter(Boolean) : [];
if (pl.length) out.players = pl.map((e) => (names[e] ? { entity: e, name: names[e] } : e));
else delete out.players;
Object.keys(v).forEach((k) => {
if (k === 'players') return;
const val = v[k];
if (val === undefined || val === null || val === '' || (k in ED_DEF && val === ED_DEF[k])) delete out[k];
else out[k] = val;
});
ED_OPT.forEach((k) => { if (!(k in v) || v[k] === '' || v[k] == null) delete out[k]; });
this._config = out;
this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: out }, bubbles: true, composed: true }));
}
}

if (!customElements.get(TAG + '-editor')) customElements.define(TAG + '-editor', PipPlayerEditor);

customElements.define(TAG, PipPlayerCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: TAG, name: 'Pip Player', description: 'Retro click-wheel music player for Music Assistant', preview: false, documentationURL: 'https://github.com/0xwilko/pip-player-card' });
console.info('%c PIP PLAYER %c v' + VERSION + ' ', 'background:#d7263d;color:#fff;font-weight:700;border-radius:3px 0 0 3px', 'background:#333;color:#fff;border-radius:0 3px 3px 0');
})();
