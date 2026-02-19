import { useState, useReducer, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   SMARTCYCLE NEXUS — SINGULARITY EDITION 
   Aesthetic: Luxury editorial · Swiss precision · Bloomberg meets Patek Philippe 
   Fonts: Playfair Display (display) · DM Mono (data) · Source Serif 4 (body)
   Palette: Ivory/cream canvas · Deep ink · Vermillion alert · Viridian signal
   ═══════════════════════════════════════════════════════════════════════════ */

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --canvas:     #f7f4ef;
      --canvas2:    #f0ebe2;
      --canvas3:    #e8e1d4;
      --ink:        #1a1714;
      --ink2:       #3d3830;
      --ink3:       #6b6256;
      --ink4:       #9c9085;
      --ink5:       #c5bdb1;
      --rule:       rgba(26,23,20,0.12);
      --rule2:      rgba(26,23,20,0.06);
      --vermillion: #c0392b;
      --verm-bg:    rgba(192,57,43,0.08);
      --viridian:   #1a6b4a;
      --vird-bg:    rgba(26,107,74,0.08);
      --gold:       #8b6914;
      --gold-bg:    rgba(139,105,20,0.08);
      --sapphire:   #1a3d6b;
      --saph-bg:    rgba(26,61,107,0.08);
      --shabbat:    #4a2d8a;
      --ff-disp:    'Playfair Display', Georgia, serif;
      --ff-mono:    'DM Mono', 'Courier New', monospace;
      --ff-body:    'Source Serif 4', Georgia, serif;
      --shadow:     0 1px 3px rgba(26,23,20,0.08), 0 4px 16px rgba(26,23,20,0.05);
      --shadow-lg:  0 2px 8px rgba(26,23,20,0.1), 0 16px 48px rgba(26,23,20,0.08);
    }

    html, body {
      background: var(--canvas);
      color: var(--ink);
      font-family: var(--ff-body);
      font-size: 14px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--canvas2); }
    ::-webkit-scrollbar-thumb { background: var(--ink5); border-radius: 2px; }

    /* ── ANIMATIONS ── */
    @keyframes reveal-up {
      from { transform: translateY(12px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    @keyframes reveal-right {
      from { transform: translateX(-8px); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    @keyframes fade {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes shimmer {
      0%   { background-position: -600px 0; }
      100% { background-position:  600px 0; }
    }
    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.5; transform: scale(0.85); }
    }
    @keyframes scan-sweep {
      0%   { top: 0%; opacity: 1; }
      90%  { top: 95%; opacity: 1; }
      100% { top: 95%; opacity: 0; }
    }
    @keyframes ticker-scroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes progress-in {
      from { width: 0; }
    }
    @keyframes count-up {
      from { opacity: 0; transform: translateY(4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shabbat-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(74,45,138,0.2); }
      50%       { box-shadow: 0 0 0 8px rgba(74,45,138,0); }
    }

    .reveal  { animation: reveal-up 0.45s cubic-bezier(0.22,1,0.36,1) forwards; }
    .reveal2 { animation: reveal-up 0.45s cubic-bezier(0.22,1,0.36,1) 0.08s both; }
    .reveal3 { animation: reveal-up 0.45s cubic-bezier(0.22,1,0.36,1) 0.16s both; }
    .faded   { animation: fade 0.3s ease forwards; }

    /* ── SKELETON ── */
    .skeleton {
      background: linear-gradient(90deg, var(--canvas2) 25%, var(--canvas3) 50%, var(--canvas2) 75%);
      background-size: 600px 100%;
      animation: shimmer 1.4s infinite linear;
      border-radius: 2px;
    }

    /* ── CARD ── */
    .card {
      background: white;
      border: 1px solid var(--rule);
      border-radius: 3px;
      box-shadow: var(--shadow);
    }
    .card-canvas { background: var(--canvas2); border: 1px solid var(--rule); border-radius: 3px; }
    .card-inset { background: var(--canvas); border: 1px solid var(--rule2); border-radius: 2px; }

    /* ── TYPOGRAPHY ── */
    .display      { font-family: var(--ff-disp); }
    .mono         { font-family: var(--ff-mono); }
    .serif        { font-family: var(--ff-body); }
    .display-xl   { font-family: var(--ff-disp); font-size: clamp(24px,4vw,42px); font-weight: 700; line-height: 1.1; }
    .display-lg   { font-family: var(--ff-disp); font-size: clamp(18px,2.5vw,28px); font-weight: 600; line-height: 1.2; }
    .display-md   { font-family: var(--ff-disp); font-size: 18px; font-weight: 600; }
    .label        { font-family: var(--ff-mono); font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink4); }
    .data-lg      { font-family: var(--ff-mono); font-size: clamp(22px,3vw,36px); font-weight: 500; letter-spacing: -0.02em; }
    .data-md      { font-family: var(--ff-mono); font-size: 16px; font-weight: 400; }
    .data-sm      { font-family: var(--ff-mono); font-size: 11px; }

    /* ── RULE ELEMENTS ── */
    .hairline-h { height: 1px; background: var(--rule); }
    .hairline-v { width: 1px; background: var(--rule); }
    .thick-rule { height: 3px; background: var(--ink); border-radius: 1px; }

    /* ── BADGE ── */
    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-family: var(--ff-mono); font-size: 9px;
      letter-spacing: 0.12em; text-transform: uppercase;
      padding: 3px 8px; border-radius: 1px; border: 1px solid;
    }
    .badge-ink      { background: var(--ink);       color: white;          border-color: var(--ink); }
    .badge-verm     { background: var(--verm-bg);   color: var(--vermillion); border-color: var(--vermillion); }
    .badge-vird     { background: var(--vird-bg);   color: var(--viridian);   border-color: var(--viridian); }
    .badge-gold     { background: var(--gold-bg);   color: var(--gold);       border-color: var(--gold); }
    .badge-saph     { background: var(--saph-bg);   color: var(--sapphire);   border-color: var(--sapphire); }
    .badge-canvas   { background: var(--canvas2);   color: var(--ink2);       border-color: var(--rule); }
    .badge-shabbat  { background: rgba(74,45,138,0.1); color: var(--shabbat); border-color: var(--shabbat); animation: shabbat-pulse 2.5s infinite; }

    /* ── BUTTON ── */
    .btn {
      display: inline-flex; align-items: center; gap: 7px;
      font-family: var(--ff-mono); font-size: 10px;
      letter-spacing: 0.12em; text-transform: uppercase;
      padding: 9px 18px; border-radius: 2px;
      border: 1px solid; cursor: pointer;
      transition: all 0.18s cubic-bezier(0.4,0,0.2,1);
      white-space: nowrap;
    }
    .btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.12); }
    .btn:active { transform: translateY(0); }
    .btn-primary  { background: var(--ink);       color: white;         border-color: var(--ink); }
    .btn-verm     { background: var(--verm-bg);   color: var(--vermillion); border-color: var(--vermillion); }
    .btn-vird     { background: var(--vird-bg);   color: var(--viridian);   border-color: var(--viridian); }
    .btn-ghost    { background: transparent;      color: var(--ink3);   border-color: var(--rule); }
    .btn-ghost:hover { background: var(--canvas2); color: var(--ink); border-color: var(--ink4); }
    .btn-gold     { background: var(--gold-bg);   color: var(--gold);   border-color: var(--gold); }

    /* ── NAV ── */
    .nav-pill {
      font-family: var(--ff-mono); font-size: 10px;
      letter-spacing: 0.12em; text-transform: uppercase;
      padding: 7px 14px; border-radius: 1px;
      cursor: pointer; color: var(--ink3);
      border-bottom: 2px solid transparent;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .nav-pill:hover  { color: var(--ink); border-bottom-color: var(--ink4); }
    .nav-pill.active { color: var(--ink); border-bottom-color: var(--ink); }

    /* ── INPUT ── */
    .input-field {
      font-family: var(--ff-mono); font-size: 12px;
      background: white; border: 1px solid var(--rule);
      color: var(--ink); padding: 9px 13px; border-radius: 2px;
      outline: none; transition: border-color 0.2s, box-shadow 0.2s;
      width: 100%;
    }
    .input-field:focus { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(26,23,20,0.06); }
    .input-field::placeholder { color: var(--ink5); }

    /* ── TABLE ── */
    .data-row {
      display: grid; align-items: center;
      border-bottom: 1px solid var(--rule2);
      padding: 10px 0; transition: background 0.15s;
    }
    .data-row:hover { background: var(--canvas2); padding-left: 4px; padding-right: 4px; margin: 0 -4px; }
    .data-row:last-child { border-bottom: none; }

    /* ── UPLOAD ZONE ── */
    .upload-zone {
      border: 1.5px dashed var(--ink5); background: var(--canvas2);
      border-radius: 3px; cursor: pointer;
      transition: all 0.2s ease;
    }
    .upload-zone:hover, .upload-zone.active {
      border-color: var(--ink); background: var(--canvas3);
    }

    /* ── PROGRESS ── */
    .progress-track { height: 2px; background: var(--canvas2); border-radius: 1px; overflow: hidden; }
    .progress-fill  { height: 100%; background: var(--ink); border-radius: 1px; transition: width 0.5s cubic-bezier(0.4,0,0.2,1); }
    .progress-vird  { height: 100%; background: var(--viridian); border-radius: 1px; transition: width 0.5s ease; }

    /* ── SCAN SWEEP LINE ── */
    .scan-container { position: relative; overflow: hidden; }
    .scan-line {
      position: absolute; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--vermillion), transparent);
      animation: scan-sweep 1.8s ease-in-out infinite;
      pointer-events: none;
    }

    /* ── SPARKLINE ── */
    .live-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--viridian); animation: pulse-dot 2s ease infinite;
    }

    /* ── SHABBAT MODE ── */
    .shabbat-overlay {
      position: fixed; inset: 0; z-index: 2000;
      background: rgba(74,45,138,0.97);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      color: white; font-family: var(--ff-disp); text-align: center;
    }

    /* ── TOOLTIP ── */
    .tooltip-wrap { position: relative; }
    .tooltip {
      position: absolute; bottom: calc(100% + 6px); left: 50%;
      transform: translateX(-50%);
      background: var(--ink); color: white;
      font-family: var(--ff-mono); font-size: 9px;
      letter-spacing: 0.1em; text-transform: uppercase;
      padding: 5px 9px; border-radius: 2px;
      white-space: nowrap; pointer-events: none;
      opacity: 0; transition: opacity 0.15s;
    }
    .tooltip-wrap:hover .tooltip { opacity: 1; }

    /* ── TICKER ── */
    .ticker-outer { overflow: hidden; position: relative; }
    .ticker-inner { display: flex; animation: ticker-scroll 40s linear infinite; width: max-content; }
    .ticker-inner:hover { animation-play-state: paused; }

    /* ── GAMIFICATION ── */
    .xp-bar { height: 4px; background: var(--canvas3); border-radius: 2px; overflow: hidden; }
    .xp-fill { height: 100%; background: linear-gradient(90deg, var(--gold), var(--vermillion)); animation: progress-in 1.2s ease; }

    /* ── SWITCH TOGGLE ── */
    .toggle-track {
      width: 36px; height: 20px; border-radius: 10px;
      background: var(--canvas3); border: 1px solid var(--rule);
      position: relative; cursor: pointer; transition: background 0.2s;
    }
    .toggle-track.on { background: var(--ink); }
    .toggle-thumb {
      position: absolute; top: 2px; left: 2px;
      width: 14px; height: 14px; border-radius: 50%;
      background: white; transition: transform 0.2s cubic-bezier(0.4,0,0.2,1);
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    .toggle-track.on .toggle-thumb { transform: translateX(16px); }

    /* ── SECTION DIVIDER ── */
    .section-header {
      display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px;
    }
    .section-num { font-family: var(--ff-mono); font-size: 11px; color: var(--ink4); }
  `}</style>
);

/* ══════════════════════════ DATA LAYER ══════════════════════════ */

const INTEL = {
  tickers: [
    "AMZN › HVAC Compressor R410A  ▲ 8.2%  $219.99",
    "EBAY › BMW E90 Alternator  ▼ 3.1%  $127.50  ·  12 sold/24h",
    "RECALL ALERT › Samsung Galaxy S22 › Battery Swelling Issue  ·  File: CPSC-2024-0341",
    "ALIEX › iPhone 14 LCD Assembly  ▼ 11.4%  $44.20  ·  ETA 18d",
    "RESTOCK › Micro Center [3.4 km]  ›  Samsung 990 Pro SSD  ·  QTY 8",
    "FRAUD › High-quality Rolex Submariner counterfeit ring detected  ·  Origin: Shenzhen",
    "TREND › EV Battery Module Cells  ▲ 41% demand  ·  30-day forecast",
    "WARRANTY › Dell XPS 15 · SN-44921  ›  EXPIRES IN 14 DAYS",
  ],

  kpis: [
    { id: "equity",    label: "Portfolio Equity",   value: "$284,792", delta: "+2.3%",  color: "var(--viridian)", trend: [180,190,185,196,200,194,202] },
    { id: "warr",      label: "Active Warranties",  value: "1,847",    delta: "3 critical", color: "var(--vermillion)", trend: [1820,1830,1842,1840,1848,1845,1847] },
    { id: "scans",     label: "Scans Today",        value: "3,291",    delta: "+18%",   color: "var(--sapphire)", trend: [2100,2400,2650,2800,3000,3150,3291] },
    { id: "fraud",     label: "Fraud Prevented",    value: "$187K",    delta: "47 items", color: "var(--gold)", trend: [150,158,162,172,178,183,187] },
  ],

  parts: {
    name: "Bosch GBH 18V-28 SDS Drill Chuck Assembly",
    sku: "BOSCH-1615-610-034",
    brand: "Bosch Professional",
    model: "GBH 18V-28",
    material: "Hardened Tool Steel — Grade 8.8",
    confidence: 96,
    compatible: ["GBH 18V-28", "GBH 18V-EC", "GBH 24 VRE", "GBH 2-28 DFV"],
    listings: [
      { src: "Amazon",    flag: "🇺🇸", price: 44.99, ship: "Free Prime 2d", avail: "IN STOCK", rating: 4.7, reviews: 1842, savings: null },
      { src: "AliExpress",flag: "🇨🇳", price: 18.50, ship: "$7.99 · 18d",   avail: "IN STOCK", rating: 4.2, reviews: 394,  savings: 59 },
      { src: "eBay",      flag: "🌐", price: 38.00, ship: "$5.99 · 4d",    avail: "USED-GOOD", rating: 4.4, reviews: 76,   savings: 14 },
      { src: "Alibaba",   flag: "🏭", price: 12.80, ship: "MOQ×10 · 25d",  avail: "BULK ONLY", rating: 4.1, reviews: 229,  savings: 71 },
    ],
    alternatives: [
      { name: "Makita HR2631FT Chuck Assy", price: "$41.00", badge: "OEM Compatible" },
      { name: "DeWalt DT7894 SDS Adapter",  price: "$39.50", badge: "Aftermarket" },
      { name: "Generic SDS+ Fit Kit",        price: "$14.99", badge: "Budget" },
    ],
    arSteps: ["Remove chuck guard ring", "Unscrew retaining bolt (M6 Left-hand thread)", "Extract old chuck", "Insert new chuck — align keyway", "Torque bolt to 18 Nm"],
  },

  valuation: {
    product: "Sony WH-1000XM5 Wireless Headphones",
    condition: 8.5,
    msrp: 349,
    estimated: 195,
    range: [168, 225],
    depreciation: 44,
    platforms: [
      { name: "eBay",      est: 215, fee: 12, net: 189, demand: 87, velocity: "4.2/day" },
      { name: "Facebook",  est: 195, fee: 0,  net: 195, demand: 74, velocity: "1.8/day" },
      { name: "Mercari",   est: 205, fee: 10, net: 184, demand: 68, velocity: "2.1/day" },
      { name: "Swappa",    est: 210, fee: 5,  net: 199, demand: 55, velocity: "0.9/day" },
    ],
    forecast: [195,192,196,191,189,193,197,200,196,194,198,202],
    hashtags: ["#headphones", "#sony", "#xm5", "#wireless", "#openbox"],
  },

  warranties: [
    { icon: "💻", product: "Dell XPS 15 9530",      serial: "SN-44921",  expiry: "2025-02-28", days: 14,  status: "CRITICAL", coverage: "Premium Support+" },
    { icon: "🔧", product: "Bosch GBH 18V-28",      serial: "SN-BX2241", expiry: "2025-04-15", days: 60,  status: "WARN",     coverage: "2yr Manufacturer" },
    { icon: "📺", product: "LG OLED C2 65\"",        serial: "LG-C2-881", expiry: "2025-07-22", days: 158, status: "OK",       coverage: "3yr Extended" },
    { icon: "📱", product: "iPhone 14 Pro",          serial: "AP-F1V41",  expiry: "2025-09-08", days: 206, status: "OK",       coverage: "AppleCare+" },
    { icon: "🌀", product: "Dyson V15 Detect",       serial: "DY-V15-11", expiry: "2027-01-14", days: 697, status: "OK",       coverage: "5yr Dyson" },
  ],

  inventory: [
    { store: "Micro Center", dist: "3.4 km", stock: "IN STOCK", qty: 12, price: "$74.99", eta: "Now",  chain: "Micro Center" },
    { store: "Best Buy Downtown", dist: "1.2 km", stock: "IN STOCK", qty: 4, price: "$79.99", eta: "Now", chain: "Best Buy" },
    { store: "Walmart Supercenter", dist: "2.8 km", stock: "LOW", qty: 1, price: "$71.99", eta: "Now",   chain: "Walmart" },
    { store: "Target Express", dist: "4.7 km", stock: "OUT",      qty: 0, price: "$82.99", eta: "3 days",chain: "Target" },
  ],

  forecast: [
    { part: "EV Battery Modules",    demand: 94, trend: "+41%", region: "NA / EU" },
    { part: "iPhone 15 Screens",     demand: 88, trend: "+55%", region: "NA" },
    { part: "HVAC Compressors",      demand: 78, trend: "+18%", region: "GLOBAL" },
    { part: "GPU Cooling Fans",      demand: 72, trend: "+29%", region: "APAC" },
    { part: "Brake Calipers (EV)",   demand: 61, trend: "+7%",  region: "EU" },
  ],

  counterfeit: {
    product: "Nike Air Jordan 1 Retro OG 'Chicago'",
    score: 94,
    verdict: "LIKELY AUTHENTIC",
    risk: "LOW",
    points: [
      { check: "Logo Embossing Depth",     result: "PASS",   score: 97 },
      { check: "Font Kerning Consistency", result: "PASS",   score: 95 },
      { check: "Stitching Thread Count",   result: "PASS",   score: 91 },
      { check: "Hologram Refraction",      result: "PASS",   score: 93 },
      { check: "Serial Number Format",     result: "⚠ MINOR", score: 82 },
      { check: "Sole Material Density",    result: "PASS",   score: 96 },
    ],
  },

  gamification: { level: 7, xp: 2840, nextXp: 3500, rank: "Certified Analyst", points: 2840, scans: 142, verifications: 38, reportsSubmitted: 4 },
};

/* ══════════════════════════ HELPERS ══════════════════════════════ */

const isShabbat = () => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  // Friday after 17:30 → Saturday after nightfall (~20:30 simplified)
  return (day === 5 && hour >= 17) || (day === 6 && hour < 21);
};

const fmt = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 0 });
const fmtPct = (n) => (n > 0 ? "+" : "") + n + "%";

/* ══════════════════════════ STATE MACHINE ══════════════════════════ */

const init = {
  view: "OVERVIEW",
  isScanning: false,
  scanProgress: 0,
  scanPhase: "",
  scanResult: null,
  uploadedImg: null,
  shabbatMode: false,
  darkMode: false,
  lang: "EN",
  notifications: [
    { id: 1, sev: "CRITICAL", msg: "Dell XPS 15 warranty expires in 14 days", t: "2m" },
    { id: 2, sev: "WARN",     msg: "Samsung Galaxy S22 recall detected",       t: "15m" },
    { id: 3, sev: "INFO",     msg: "Micro Center restocked Samsung 990 Pro",   t: "1h" },
  ],
  showNotif: false,
  arMode: false,
  xp: INTEL.gamification.xp,
};

function reducer(s, a) {
  switch (a.type) {
    case "VIEW":       return { ...s, view: a.p, scanResult: null, scanProgress: 0, isScanning: false, uploadedImg: null };
    case "SCAN_START": return { ...s, isScanning: true, scanProgress: 0, scanResult: null, scanPhase: "Extracting visual features…" };
    case "SCAN_PROG":  return { ...s, scanProgress: a.p, scanPhase: a.phase };
    case "SCAN_DONE":  return { ...s, isScanning: false, scanProgress: 100, scanResult: a.result, xp: s.xp + 50 };
    case "SCAN_IMG":   return { ...s, uploadedImg: a.url };
    case "SCAN_CLR":   return { ...s, scanResult: null, uploadedImg: null, scanProgress: 0 };
    case "SHABBAT":    return { ...s, shabbatMode: !s.shabbatMode };
    case "DARK":       return { ...s, darkMode: !s.darkMode };
    case "NOTIF":      return { ...s, showNotif: !s.showNotif };
    case "AR":         return { ...s, arMode: !s.arMode };
    case "LANG":       return { ...s, lang: a.p };
    default:           return s;
  }
}

/* ══════════════════════════ MICRO COMPONENTS ══════════════════════ */

const Hairline = () => <div className="hairline-h" />;
const ThickRule = () => <div className="thick-rule" style={{ marginBottom: 16 }} />;

const Label = ({ children, style }) => (
  <div className="label" style={{ marginBottom: 6, ...style }}>{children}</div>
);

const LiveDot = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <div className="live-dot" />
    <span className="label" style={{ color: "var(--viridian)", margin: 0 }}>Live</span>
  </div>
);

const StatusDot = ({ status }) => {
  const c = { CRITICAL: "var(--vermillion)", WARN: "var(--gold)", OK: "var(--viridian)", INFO: "var(--sapphire)" };
  return (
    <span style={{
      display: "inline-block", width: 7, height: 7, borderRadius: "50%",
      background: c[status] || "var(--ink5)",
      boxShadow: `0 0 4px ${c[status]}50`,
      animation: status === "CRITICAL" ? "pulse-dot 1.8s infinite" : "none",
    }} />
  );
};

const Toggle = ({ on, onToggle, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={onToggle}>
    <div className={`toggle-track ${on ? "on" : ""}`}>
      <div className="toggle-thumb" />
    </div>
    <span className="label" style={{ margin: 0, color: on ? "var(--ink)" : "var(--ink4)" }}>{label}</span>
  </div>
);

/* ══════════════════════════ SVG SPARKLINE ══════════════════════════ */
const Spark = ({ data, color = "var(--viridian)", w = 80, h = 28 }) => {
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  const pts = data.map((v, i) => `${(i/(data.length-1))*w},${h-((v-mn)/rng)*h}`).join(" ");
  const area = `0,${h} ${pts} ${w},${h}`;
  return (
    <svg width={w} height={h} style={{ overflow: "visible", display: "block" }}>
      <defs>
        <linearGradient id={`sg${color.replace(/[^a-z]/gi,"")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#sg${color.replace(/[^a-z]/gi,"")})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
};

/* ══════════════════════════ SVG RING CHART ══════════════════════════ */
const Ring = ({ value, color, size = 56, label }) => {
  const r = 20, c = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 48 48" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="24" cy="24" r={r} fill="none" stroke="var(--canvas2)" strokeWidth="5" />
          <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="5"
            strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color }}>{value}%</span>
        </div>
      </div>
      {label && <Label style={{ textAlign: "center", marginBottom: 0 }}>{label}</Label>}
    </div>
  );
};

/* ══════════════════════════ INLINE SVG LINE CHART ══════════════════ */
const LineChart = ({ datasets, labels }) => {
  const W = 480, H = 110;
  const allV = datasets.flatMap(d => d.v);
  const mn = Math.min(...allV) * 0.93, mx = Math.max(...allV) * 1.04, rng = mx - mn;
  const tx = i => (i / (labels.length - 1)) * W;
  const ty = v => H - ((v - mn) / rng) * H;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} style={{ overflow: "visible" }}>
      {[0,.33,.66,1].map(f => (
        <line key={f} x1={0} y1={ty(mn+f*rng)} x2={W} y2={ty(mn+f*rng)}
          stroke="var(--rule)" strokeWidth="1" strokeDasharray="4 4" />
      ))}
      {labels.map((l, i) => (
        <text key={i} x={tx(i)} y={H + 16} fill="var(--ink4)" fontSize="9"
          fontFamily="var(--ff-mono)" textAnchor="middle" letterSpacing="0.08em">{l}</text>
      ))}
      {datasets.map(ds => {
        const pts = ds.v.map((v, i) => `${tx(i)},${ty(v)}`).join(" ");
        const area = `0,${H} ${pts.split(" ").join(" ")} ${W},${H}`;
        return (
          <g key={ds.name}>
            <defs>
              <linearGradient id={`lc-${ds.name}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={ds.c} stopOpacity="0.14" />
                <stop offset="100%" stopColor={ds.c} stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={area} fill={`url(#lc-${ds.name})`} />
            <polyline points={pts} fill="none" stroke={ds.c} strokeWidth="1.5" strokeLinejoin="round" />
            {ds.v.map((v, i) => <circle key={i} cx={tx(i)} cy={ty(v)} r="2.5" fill="white" stroke={ds.c} strokeWidth="1.5" />)}
          </g>
        );
      })}
    </svg>
  );
};

/* ══════════════════════════ SKELETON LOADER ═══════════════════════ */
const Skeleton = ({ h = 16, w = "100%", style }) => (
  <div className="skeleton" style={{ height: h, width: w, ...style }} />
);
const SkeletonBlock = () => (
  <div className="card" style={{ padding: 20 }}>
    <Skeleton h={10} w="40%" style={{ marginBottom: 14 }} />
    <Skeleton h={28} w="60%" style={{ marginBottom: 10 }} />
    <Skeleton h={10} w="80%" style={{ marginBottom: 6 }} />
    <Skeleton h={10} w="65%" />
  </div>
);

/* ══════════════════════════ SCAN PIPELINE ══════════════════════════ */
function useScanPipeline(dispatch) {
  const run = useCallback((resultFactory) => {
    dispatch({ type: "SCAN_START" });
    const phases = [
      { p: 14, phase: "Extracting visual features…"     },
      { p: 30, phase: "Running CNN classification…"      },
      { p: 48, phase: "Querying marketplace APIs…"       },
      { p: 64, phase: "Cross-referencing OEM databases…" },
      { p: 80, phase: "Calculating compatibility matrix…"},
      { p: 94, phase: "Compiling results…"               },
    ];
    phases.forEach(({ p, phase }, i) => {
      setTimeout(() => dispatch({ type: "SCAN_PROG", p, phase }), i * 380);
    });
    setTimeout(() => dispatch({ type: "SCAN_DONE", result: resultFactory() }), phases.length * 380 + 300);
  }, [dispatch]);
  return run;
}

/* ══════════════════════════ SCANNER MODULE ════════════════════════ */
function ScannerModule({ state, dispatch, moduleKey }) {
  const runScan = useScanPipeline(dispatch);
  const [drag, setDrag] = useState(false);

  const configs = {
    PARTS: {
      num: "01", title: "Hyper-Intelligent Part Scanner",
      desc: "Upload an image, video frame, or 3D scan of any broken component. The AI pipeline identifies brand, model, specs, compatibility, and sources it across global marketplaces.",
      placeholder: "Drag & drop part image · Click to browse · JPEG / PNG / WEBP / PDF / MP4",
      result: () => ({ type: "PARTS", ...INTEL.parts }),
      badge: "AI VISION",
      badgeVariant: "badge-saph",
    },
    COUNTERFEIT: {
      num: "05", title: "Brand Integrity & Anti-Counterfeit",
      desc: "Scan logos, holograms, QR codes, or serial numbers. Multi-model AI cross-references manufacturer databases and global counterfeit intelligence networks.",
      placeholder: "Upload logo · Hologram · QR Code · Serial Number label",
      result: () => ({ type: "COUNTERFEIT", ...INTEL.counterfeit }),
      badge: "INTEGRITY AI",
      badgeVariant: "badge-verm",
    },
    VALUATION: {
      num: "02", title: "Dynamic Price Optimizer",
      desc: "Photograph any product. AI estimates fair market value, forecasts 7/30/90-day price trajectory, and recommends optimal resale platform with listing strategy.",
      placeholder: "Upload product photo for instant valuation",
      result: () => ({ type: "VALUATION", ...INTEL.valuation }),
      badge: "PRICE AI",
      badgeVariant: "badge-gold",
    },
    WARRANTY: {
      num: "04", title: "Warranty & Recall Guard",
      desc: "Scan receipts, invoices, or packaging. OCR extracts purchase date, warranty period, and auto-registers with manufacturer recall databases.",
      placeholder: "Upload receipt · Invoice · Product packaging",
      result: () => ({ type: "WARRANTY", ...INTEL.warranties[0] }),
      badge: "OCR + DB",
      badgeVariant: "badge-verd",
    },
    INVENTORY: {
      num: "03", title: "Hyper-Local Inventory Radar",
      desc: "Scans 5km radius for in-stock availability across physical retailers, warehouses, and online suppliers with real-time pricing and routing.",
      placeholder: "Upload product barcode, QR, or type product name",
      result: () => ({ type: "INVENTORY" }),
      badge: "GEO + MAPS",
      badgeVariant: "badge-vird",
    },
  };
  const cfg = configs[moduleKey];

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => dispatch({ type: "SCAN_IMG", url: e.target.result });
    reader.readAsDataURL(file);
    runScan(cfg.result);
  };

  return (
    <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Module header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span className="section-num">{cfg.num} —</span>
          <span className={`badge ${cfg.badgeVariant || "badge-saph"}`}>{cfg.badge}</span>
          {state.isScanning && <span className="badge badge-gold" style={{ animation: "pulse-dot 1s infinite" }}>PROCESSING</span>}
        </div>
        <h2 className="display-lg">{cfg.title}</h2>
        <p style={{ color: "var(--ink3)", marginTop: 8, fontSize: 13, maxWidth: 580 }}>{cfg.desc}</p>
      </div>

      {/* Upload area */}
      {!state.scanResult && (
        <>
          <label
            className={`upload-zone ${drag ? "active" : ""}`}
            style={{ display: "block", padding: "48px 32px", textAlign: "center", position: "relative" }}
            onDragOver={e => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
          >
            {state.uploadedImg ? (
              <div className="scan-container" style={{ display: "inline-block" }}>
                <img src={state.uploadedImg} alt="" style={{ maxHeight: 220, maxWidth: "100%", borderRadius: 2, display: "block", opacity: state.isScanning ? 0.75 : 1 }} />
                {state.isScanning && <div className="scan-line" />}
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 28, marginBottom: 12, opacity: 0.4 }}>⬆</div>
                <p style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: "var(--ink4)", letterSpacing: "0.08em" }}>{cfg.placeholder}</p>
                <p style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: "var(--ink5)", marginTop: 8 }}>Max 50 MB · Supports 3D .OBJ · Video keyframe extraction</p>
              </div>
            )}
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
          </label>

          {/* Demo trigger */}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-primary" onClick={() => runScan(cfg.result)}>
              <span>▶</span> Run Demo Scan
            </button>
            <button className="btn btn-ghost" onClick={() => dispatch({ type: "SCAN_CLR" })}>
              Clear
            </button>
          </div>
        </>
      )}

      {/* Scan progress */}
      {state.isScanning && (
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span className="label" style={{ margin: 0, color: "var(--ink2)" }}>{state.scanPhase}</span>
            <span className="label" style={{ margin: 0 }}>{state.scanProgress}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${state.scanProgress}%` }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6, marginTop: 16 }}>
            {["Vision","Classify","Markets","OEM DB","Compat","Report"].map((s, i) => (
              <div key={s} style={{ textAlign: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", margin: "0 auto 5px",
                  background: state.scanProgress > i * 17 ? "var(--ink)" : "var(--canvas2)",
                  border: `1px solid ${state.scanProgress > i * 17 ? "var(--ink)" : "var(--rule)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: state.scanProgress > i * 17 ? "white" : "var(--ink4)",
                  fontSize: 9, fontFamily: "var(--ff-mono)",
                  transition: "all 0.3s ease"
                }}>{state.scanProgress > i * 17 ? "✓" : i + 1}</div>
                <Label style={{ fontSize: 8, margin: 0 }}>{s}</Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {state.isScanning && state.scanProgress < 50 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <SkeletonBlock />
          <SkeletonBlock />
        </div>
      )}

      {/* Results */}
      {state.scanResult && (
        <div className="reveal">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <StatusDot status="OK" />
              <span className="label" style={{ margin: 0, color: "var(--viridian)" }}>Scan complete · {new Date().toLocaleTimeString()}</span>
            </div>
            <button className="btn btn-ghost" style={{ padding: "5px 12px" }} onClick={() => dispatch({ type: "SCAN_CLR" })}>✕ Clear</button>
          </div>
          <ScanResults result={state.scanResult} arMode={state.arMode} dispatch={dispatch} />
          <ImprovementsPanel moduleKey={moduleKey} />
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════ SCAN RESULTS ═══════════════════════════ */
function ScanResults({ result, arMode, dispatch }) {
  if (result.type === "PARTS") return <PartsResult r={result} arMode={arMode} dispatch={dispatch} />;
  if (result.type === "COUNTERFEIT") return <CounterfeitResult r={result} />;
  if (result.type === "VALUATION") return <ValuationResult r={result} />;
  if (result.type === "WARRANTY") return <WarrantyResult r={result} />;
  if (result.type === "INVENTORY") return <InventoryResult />;
  return null;
}

function PartsResult({ r, arMode, dispatch }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* ID card */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <Label>Identified Component</Label>
            <h3 className="display-md" style={{ marginBottom: 10 }}>{r.name}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              <span className="badge badge-ink">Brand: {r.brand}</span>
              <span className="badge badge-canvas">Model: {r.model}</span>
              <span className="badge badge-saph">SKU: {r.sku}</span>
              <span className="badge badge-canvas">Material: {r.material}</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <Label>AI Confidence</Label>
            <Ring value={r.confidence} color="var(--viridian)" size={52} />
          </div>
        </div>
        <Hairline />
        <div style={{ marginTop: 14 }}>
          <Label>Compatible With</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {r.compatible.map(m => <span key={m} className="badge badge-canvas">{m}</span>)}
          </div>
        </div>
      </div>

      {/* Marketplace table */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <Label>Marketplace Comparison</Label>
          <LiveDot />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "20px 1fr 80px 100px 60px 80px", gap: 10, marginBottom: 8, padding: "0 0 8px", borderBottom: "1px solid var(--rule)" }}>
          {["","Source","Price","Shipping","Stock","Rating"].map(h => (
            <Label key={h} style={{ margin: 0 }}>{h}</Label>
          ))}
        </div>
        {r.listings.map((l, i) => (
          <div key={i} className="data-row" style={{ gridTemplateColumns: "20px 1fr 80px 100px 60px 80px", gap: 10 }}>
            <span>{l.flag}</span>
            <div>
              <div style={{ fontFamily: "var(--ff-body)", fontWeight: 600, fontSize: 13 }}>{l.src}</div>
              <div className="data-sm" style={{ color: "var(--ink4)" }}>{l.reviews.toLocaleString()} reviews</div>
            </div>
            <div className="data-md" style={{ color: "var(--ink)" }}>${l.price}</div>
            <div className="data-sm" style={{ color: "var(--ink3)" }}>{l.ship}</div>
            <span className={`badge ${l.avail === "IN STOCK" ? "badge-vird" : l.avail === "USED-GOOD" ? "badge-gold" : "badge-canvas"}`} style={{ fontSize: 8 }}>
              {l.avail}
            </span>
            <div className="data-sm">★ {l.rating}</div>
          </div>
        ))}
      </div>

      {/* Alternatives */}
      <div className="card" style={{ padding: 20 }}>
        <Label>OEM & Aftermarket Alternatives</Label>
        {r.alternatives.map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: i < r.alternatives.length - 1 ? "1px solid var(--rule2)" : "none" }}>
            <div style={{ fontFamily: "var(--ff-body)", fontSize: 13 }}>{a.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="badge badge-canvas">{a.badge}</span>
              <span className="data-sm" style={{ color: "var(--ink)" }}>{a.price}</span>
            </div>
          </div>
        ))}
      </div>

      {/* AR Installation Guide */}
      <div className="card" style={{ padding: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <Label>AR Repair & Installation Guide</Label>
          <button className="btn btn-gold" style={{ padding: "6px 14px" }} onClick={() => dispatch({ type: "AR" })}>
            {arMode ? "◈ AR Active" : "◈ Launch AR"}
          </button>
        </div>
        {arMode ? (
          <div style={{ background: "var(--canvas2)", borderRadius: 2, padding: "20px 16px", textAlign: "center", border: "1px dashed var(--gold)" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📷</div>
            <p style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: "var(--gold)", letterSpacing: "0.1em" }}>AR MODE ACTIVE — Point camera at the part location</p>
            <p style={{ fontSize: 12, color: "var(--ink4)", marginTop: 6 }}>In production: WebXR + AR.js overlay renders 3D model</p>
          </div>
        ) : (
          <ol style={{ paddingLeft: 20 }}>
            {r.arSteps.map((step, i) => (
              <li key={i} style={{ fontFamily: "var(--ff-body)", fontSize: 13, padding: "5px 0", borderBottom: i < r.arSteps.length - 1 ? "1px solid var(--rule2)" : "none", color: "var(--ink2)" }}>
                <span className="data-sm" style={{ color: "var(--ink4)", marginRight: 8 }}>STEP {String(i+1).padStart(2,"0")}</span>
                {step}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

function CounterfeitResult({ r }) {
  const verdictColor = r.score > 85 ? "var(--viridian)" : r.score > 65 ? "var(--gold)" : "var(--vermillion)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <Ring value={r.score} color={verdictColor} size={68} label="AUTHENTICITY" />
          <div>
            <Label>Verdict</Label>
            <div className="display-lg" style={{ color: verdictColor }}>{r.verdict}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <span className={`badge ${r.risk === "LOW" ? "badge-vird" : r.risk === "MEDIUM" ? "badge-gold" : "badge-verm"}`}>RISK: {r.risk}</span>
              <span className="badge badge-canvas">{r.product.split(" ").slice(0,3).join(" ")}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: 20 }}>
        <Label>Verification Matrix · 6 Checkpoints</Label>
        {r.points.map((p, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "70px 1fr 1fr 36px", gap: 12, alignItems: "center", padding: "9px 0", borderBottom: i < r.points.length - 1 ? "1px solid var(--rule2)" : "none" }}>
            <span className="data-sm" style={{ color: p.result === "PASS" ? "var(--viridian)" : "var(--gold)" }}>{p.result}</span>
            <span style={{ fontSize: 13 }}>{p.check}</span>
            <div className="progress-track"><div className="progress-vird" style={{ width: `${p.score}%`, background: p.result === "PASS" ? "var(--viridian)" : "var(--gold)" }} /></div>
            <span className="data-sm" style={{ color: "var(--ink4)", textAlign: "right" }}>{p.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ValuationResult({ r }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="card" style={{ padding: 20 }}>
        <Label>Market Valuation · {r.product}</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 12 }}>
          {[
            { label: "Estimated Value", val: `$${r.estimated}`, color: "var(--ink)" },
            { label: "Fair Range",      val: `$${r.range[0]}–$${r.range[1]}`, color: "var(--ink3)" },
            { label: "Depreciation",   val: `-${r.depreciation}%`, color: "var(--vermillion)" },
          ].map(i => (
            <div key={i.label}>
              <Label>{i.label}</Label>
              <div className="data-lg" style={{ color: i.color }}>{i.val}</div>
            </div>
          ))}
        </div>
        <Hairline />
        <div style={{ marginTop: 16 }}>
          <Label>7-Day Price Forecast</Label>
          <Spark data={r.forecast.slice(0,7)} color="var(--sapphire)" w={300} h={36} />
        </div>
      </div>
      <div className="card" style={{ padding: 20 }}>
        <Label>Platform Strategy & Fee Analysis</Label>
        {r.platforms.map((p, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 60px 40px 80px 1fr 70px", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: i < r.platforms.length - 1 ? "1px solid var(--rule2)" : "none" }}>
            <span style={{ fontFamily: "var(--ff-body)", fontWeight: 600, fontSize: 13 }}>{p.name}</span>
            <span className="data-sm" style={{ color: "var(--ink)" }}>${p.est}</span>
            <span className="data-sm" style={{ color: "var(--ink4)" }}>{p.fee}% fee</span>
            <span className="data-sm" style={{ color: "var(--viridian)" }}>Net ${p.net}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ height: 3, flex: 1, background: "var(--canvas2)", borderRadius: 1, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${p.demand}%`, background: "var(--sapphire)", borderRadius: 1 }} />
              </div>
            </div>
            <span className="data-sm" style={{ color: "var(--ink4)", textAlign: "right" }}>{p.velocity}</span>
          </div>
        ))}
        <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
          <Label style={{ marginBottom: 0, marginRight: 6 }}>Suggested Tags</Label>
          {r.hashtags.map(h => <span key={h} className="badge badge-canvas">{h}</span>)}
        </div>
      </div>
    </div>
  );
}

function WarrantyResult({ r }) {
  const isCrit = r.days < 30;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="card" style={{ padding: 20, borderColor: isCrit ? "var(--vermillion)" : "var(--rule)", borderWidth: isCrit ? 2 : 1 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 22 }}>{r.icon}</span>
          <div>
            <Label>Warranty Record</Label>
            <h3 className="display-md">{r.product}</h3>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          <div>
            <Label>Days Remaining</Label>
            <div className="data-lg" style={{ color: isCrit ? "var(--vermillion)" : "var(--viridian)", animation: isCrit ? "pulse-dot 2s infinite" : "none" }}>
              {r.days}
            </div>
          </div>
          <div><Label>Expires</Label><div className="data-md">{r.expiry}</div></div>
          <div><Label>Serial</Label><div className="data-sm" style={{ color: "var(--ink3)" }}>{r.serial}</div></div>
        </div>
        <Hairline />
        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Label>Coverage</Label>
            <div style={{ fontSize: 13 }}>{r.coverage}</div>
          </div>
          {isCrit && (
            <button className="btn btn-verm">⚠ File Claim Now</button>
          )}
        </div>
      </div>
    </div>
  );
}

function InventoryResult() {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Label>Nearby Inventory · 5 km Radius</Label>
        <LiveDot />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 100px 60px 70px", gap: 10, marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid var(--rule)" }}>
        {["Store","Distance","Price","Stock","ETA"].map(h => <Label key={h} style={{ margin: 0 }}>{h}</Label>)}
      </div>
      {INTEL.inventory.map((s, i) => (
        <div key={i} className="data-row" style={{ gridTemplateColumns: "1fr 70px 100px 60px 70px", gap: 10 }}>
          <div>
            <div style={{ fontFamily: "var(--ff-body)", fontWeight: 600, fontSize: 13 }}>{s.store}</div>
            <div className="data-sm" style={{ color: "var(--ink4)" }}>{s.chain}</div>
          </div>
          <span className="data-sm" style={{ color: "var(--ink3)" }}>{s.dist}</span>
          <span className="data-md">{s.price}</span>
          <span className={`badge ${s.stock === "IN STOCK" ? "badge-vird" : s.stock === "LOW" ? "badge-gold" : "badge-verm"}`} style={{ fontSize: 8 }}>{s.stock}</span>
          <span className="data-sm" style={{ color: "var(--ink3)" }}>{s.eta}</span>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════ IMPROVEMENTS PANEL ════════════════════ */
const UPGRADES = {
  PARTS: [
    "Serve a fine-tuned YOLOv8 model via ONNX Runtime Web for on-device part detection (no server round-trip)",
    "Integrate Amazon PA-API 5.0 with AWS Signature v4 for legally compliant real-time pricing",
    "Add WebXR/AR.js integration: overlay 3D .glTF part model on live camera feed for fit-check",
    "Build OpenCV.js preprocessing pipeline: auto-crop, denoise, and normalize before inference",
    "Implement multi-image stitching for 360° part views using WebGL + Three.js",
    "Add video keyframe extraction: sample 1 frame/sec from uploaded video for multi-angle scan",
    "Cache marketplace results in Redis (15-min TTL) with stale-while-revalidate pattern",
    "Build SKU auto-generator using brand + model + material + dimensions with GS1 barcode output",
    "Integrate PartSelect, RockAuto, and RealOEM APIs for appliance/auto/BMW vertical expansion",
    "Implement supplier trust scoring (0–100) using historical delivery, return rates, and review velocity",
    "Add batch ZIP upload: process 50 parts simultaneously via Bull.js async queue + webhook callback",
    "Build AI-generated listing title + description using GPT-4o with platform-specific SEO tuning",
    "Add material spectrometry stub: integrate with Olympus handheld XRF via BLE for metal ID",
    "Implement 3D point cloud processing with Open3D.js for LiDAR scans from iPhone Pro",
    "Add cross-listing automation: one click pushes to eBay + Amazon + Shopify via unified API",
    "Build dark-web monitoring integration to detect stolen part serials being listed illegally",
    "Implement demand-weighted pricing: adjust your sale price dynamically based on real-time market velocity",
    "Add IoT integration: connect to workshop inventory systems via MQTT for live stock sync",
    "Build carbon footprint module: compare CO₂ cost of new vs second-hand for sustainability scoring",
    "Implement federated learning: aggregate anonymised scan data to continuously retrain models without exposing PII",
  ],
  COUNTERFEIT: [
    "Train ResNet-101 on 5M+ authentic product images per brand category using PyTorch",
    "Add NFC/RFID scanning via Web NFC API (Android Chrome) for chip-embedded authenticity chips",
    "Build Polygon blockchain certificate registry: NFT-based ownership proof for high-value items",
    "Integrate Entrupy API for physical luxury goods authentication via microscopic image analysis",
    "Add dynamic hologram analysis: record 3-second video, extract refraction pattern via optical flow",
    "Build crowd-sourced counterfeit reporting: community flags + reward points for verified reports",
    "Implement darkweb scraping: monitor Tor marketplaces for counterfeit supply chains",
    "Add font-fingerprint analysis: measure kerning, weight, and DPI deviation vs authentic specimens",
    "Create DMCA auto-report tool: one click files IP complaint to Amazon/eBay/AliExpress platforms",
    "Integrate INTERPOL's Intellectual Property Crime database for real-time risk scoring",
    "Build browser extension: auto-scan listing images on product pages before checkout",
    "Add QR code deep-link verification: scan links to manufacturer portal with signed JWT tokens",
    "Implement spectrogram ink analysis: UV/IR reflection fingerprinting for label verification",
    "Create verified supplier whitelist with API integration to reduce false-positive counterfeit flags",
    "Build video deepfake detector for product demo videos (GAN artifact detection via CNN)",
    "Add geolocation origin probability: flag items shipped from high-risk manufacture regions",
    "Implement adversarial robustness testing: ensure model resists FGSM attacks on input images",
    "Build manufacturer API bridge: direct query to Nike, Apple, Louis Vuitton authenticity APIs",
    "Add microprint detection: zoom + sharpen pipeline to read sub-millimetre serial text on labels",
    "Create counterfeit analytics dashboard: trend by brand, SKU, origin region, and detection confidence",
  ],
  VALUATION: [
    "Train LSTM on 5 years of eBay/Amazon/Mercari sold listings for per-SKU depreciation curves",
    "Build AI condition grader: upload 6 photos → auto-grade 1–10 with damage detection overlay",
    "Implement cross-currency valuation with live Forex rates (ECB API) + import duty calculation",
    "Add seasonal demand weighting: amplify valuations during peak gifting seasons per product category",
    "Build eBay/Shopify listing auto-creation: one-click draft with AI photo-optimised title + description",
    "Integrate Stripe Connect for in-app peer-to-peer sales with escrow and buyer protection",
    "Add price alert system: push/email/WhatsApp when market rises X% above your set target price",
    "Build bulk estate valuation mode: upload 100-item CSV → batch AI valuation report in PDF",
    "Implement reverse auction feature: set your floor price, let buyers bid up in real-time",
    "Add provenance scoring: items with original receipts + serial verified → 15% premium factor",
    "Build predictive obsolescence: alert when a product category is approaching end-of-sale",
    "Integrate Google Trends API to correlate search demand spikes with price forecast boost",
    "Add platform arbitrage detection: flag when eBay UK price is 40% above eBay US for same SKU",
    "Implement VAT/GST/sales-tax net calculator for accurate international resale projections",
    "Build photography quality scorer: AI rates listing photo quality and suggests re-shoots",
    "Add data export: full valuation history in Excel/CSV/JSON with API webhook for ERP sync",
    "Implement social proof aggregation: pull Reddit, Twitter/X sentiment for luxury goods pricing",
    "Build auto-pricing bot: list at max, auto-reduce by 3% every 7 days until sale or floor hit",
    "Add insurance valuation certificate generation: PDF with QR code for claims documentation",
    "Create B2B liquidation module: bulk valuation + channel routing for business asset disposal",
  ],
  WARRANTY: [
    "Integrate AWS Textract for 99.5%+ OCR accuracy on crumpled, photographed, or faded receipts",
    "Build Apple Wallet / Google Wallet pass generation for digital warranty cards with QR expiry",
    "Implement daily CPSC + EU RAPEX recall database sync via cron job with Elasticsearch indexing",
    "Create manufacturer API bridge: direct warranty status query for Dell, Apple, LG, Samsung",
    "Build AI claim assistant chatbot: GPT-4o powered step-by-step claim filing for each manufacturer",
    "Add multi-device household sharing: family members can view shared warranty portfolio",
    "Generate insurance-ready PDF export: timestamped warranty records with digital signature",
    "Build predictive failure model: flag products with high historical failure rates near expiry",
    "Implement smart calendar sync: add expiry events to Apple Calendar, Google Calendar, Outlook",
    "Add WhatsApp + Telegram bot: query your warranty status via chat command from any device",
    "Build B2B fleet module: manage 10,000+ asset warranties for enterprise IT/logistics teams",
    "Implement receipt inbox: forward email receipts to receipts@smartcycle.com for auto-parsing",
    "Add multi-currency purchase price tracking for accurate insurance replacement value in local FX",
    "Create warranty gap analysis: identify products without extended coverage + upsell comparison",
    "Build supplier recall API: auto-notify affected users within 2 hours of new recall publication",
    "Implement blockchain warranty record: immutable ownership history on Polygon for resale proof",
    "Add IoT device telemetry integration: receive error codes from smart devices as warranty events",
    "Build legal jurisdiction mapping: display applicable consumer rights per country of purchase",
    "Create warranty transfer flow: when reselling, transfer warranty to buyer with one-click",
    "Implement AI-powered dispute assistant: draft manufacturer complaint letters automatically",
  ],
  INVENTORY: [
    "Integrate Google Places API (New) with Nearby Search for real-time retailer discovery by category",
    "Build Best Buy / Walmart / Target API integrations for authorised inventory checking",
    "Add crowdsourced stock updates: users confirm/deny in-store availability for community accuracy",
    "Implement Google Maps Directions API for optimal multi-stop pickup routing",
    "Build geofencing alerts: push notification when entering 500m of an in-stock store",
    "Add OpenStreetMap + Overpass API for offline fallback inventory route planning",
    "Create delivery ETA comparison: Amazon Same-Day vs Instacart vs DoorDash per product",
    "Build warehouse API integration: connect with ShipBob, Flexport for B2B bulk sourcing",
    "Implement supply/demand heatmaps: choropleth map by city showing shortage/surplus per SKU",
    "Add Telegram/WhatsApp bot: instant stock query — reply with 'STOCK Samsung SSD' to get results",
    "Build POS scraper: use Playwright headless to check real-time store inventory for ungated APIs",
    "Implement auto-alert subscription: notify when a watched item restocks at any store in radius",
    "Add import cost calculator: show customs duty + shipping + tax for international sourcing",
    "Build B2B procurement API: enterprise clients query multi-supplier stock via single GraphQL call",
    "Implement predictive restock prediction: ML model estimates when OUT stores will replenish",
    "Add RFID reader integration: workshop POS systems push live inventory changes via MQTT",
    "Create spare parts mutual aid: list your unused parts for neighbours to borrow or buy",
    "Build logistics optimiser: if sourcing 5+ parts, bundle shipment from single supplier to save shipping",
    "Add store pricing anomaly detection: alert when a retailer price exceeds MSRP by 20%+",
    "Implement waiting list feature: join a queue; when item restocks, first in line gets notified",
  ],
  OVERVIEW: [], ANALYTICS: [],
};

function ImprovementsPanel({ moduleKey }) {
  const [open, setOpen] = useState(false);
  const items = UPGRADES[moduleKey] || [];
  if (!items.length) return null;
  return (
    <div style={{ marginTop: 24 }}>
      <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "space-between" }} onClick={() => setOpen(!open)}>
        <span>20 Actionable Upgrades — {moduleKey} Module</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="card-canvas" style={{ padding: 20, marginTop: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: "1px solid var(--rule2)", fontSize: 12, color: "var(--ink2)", lineHeight: 1.5, alignItems: "flex-start" }}>
                <span className="data-sm" style={{ color: "var(--ink4)", minWidth: 22, paddingTop: 1 }}>{String(i+1).padStart(2,"0")}.</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════ OVERVIEW DASHBOARD ════════════════════ */
function Overview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }} className="reveal">
      {/* Warranty Watchlist */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div><ThickRule /><h3 className="display-md">Warranty Watchlist</h3></div>
          <span className="badge badge-canvas">{INTEL.warranties.length} Tracked</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 80px 100px 100px", gap: 10, marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid var(--rule)" }}>
          {["","Product","Days","Expires","Status"].map(h => <Label key={h} style={{ margin: 0 }}>{h}</Label>)}
        </div>
        {INTEL.warranties.map((w, i) => (
          <div key={i} className="data-row" style={{ gridTemplateColumns: "28px 1fr 80px 100px 100px", gap: 10, alignItems: "center", animationDelay: `${i*0.05}s` }}>
            <span style={{ fontSize: 18 }}>{w.icon}</span>
            <div>
              <div style={{ fontFamily: "var(--ff-body)", fontWeight: 600, fontSize: 13 }}>{w.product}</div>
              <div className="data-sm" style={{ color: "var(--ink4)" }}>{w.coverage}</div>
            </div>
            <div className="data-md" style={{ color: w.status === "CRITICAL" ? "var(--vermillion)" : w.status === "WARN" ? "var(--gold)" : "var(--viridian)", animation: w.status === "CRITICAL" ? "pulse-dot 1.8s infinite" : "none" }}>
              {w.days}d
            </div>
            <div className="data-sm" style={{ color: "var(--ink3)" }}>{w.expiry}</div>
            <span className={`badge ${w.status === "CRITICAL" ? "badge-verm" : w.status === "WARN" ? "badge-gold" : "badge-vird"}`}>{w.status}</span>
          </div>
        ))}
      </div>

      {/* Demand Forecast */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ marginBottom: 16 }}><ThickRule /><h3 className="display-md">Predictive Demand Forecast</h3></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 70px 70px", gap: 10, marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid var(--rule)" }}>
          {["Part Category","Demand Index","30d Trend","Region"].map(h => <Label key={h} style={{ margin: 0 }}>{h}</Label>)}
        </div>
        {INTEL.forecast.map((f, i) => (
          <div key={i} className="data-row" style={{ gridTemplateColumns: "1fr 1fr 70px 70px", gap: 10, alignItems: "center" }}>
            <div style={{ fontFamily: "var(--ff-body)", fontSize: 13 }}>{f.part}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 4, background: "var(--canvas2)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${f.demand}%`, height: "100%", background: "var(--sapphire)", borderRadius: 2 }} />
              </div>
              <span className="data-sm" style={{ minWidth: 28 }}>{f.demand}</span>
            </div>
            <span className="data-sm" style={{ color: "var(--viridian)" }}>{f.trend}</span>
            <span className="badge badge-canvas" style={{ fontSize: 8 }}>{f.region}</span>
          </div>
        ))}
      </div>

      {/* Inventory Summary */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ marginBottom: 16 }}><ThickRule /><h3 className="display-md">Live Inventory Radar · 5 km</h3></div>
        {INTEL.inventory.map((s, i) => (
          <div key={i} className="data-row" style={{ gridTemplateColumns: "1fr 60px 80px 80px 60px", gap: 10, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--ff-body)", fontWeight: 600, fontSize: 13 }}>{s.store}</div>
              <div className="data-sm" style={{ color: "var(--ink4)" }}>Samsung 990 Pro SSD · 1TB</div>
            </div>
            <span className="data-sm" style={{ color: "var(--ink3)" }}>{s.dist}</span>
            <span className="data-md">{s.price}</span>
            <span className={`badge ${s.stock === "IN STOCK" ? "badge-vird" : s.stock === "LOW" ? "badge-gold" : "badge-verm"}`} style={{ fontSize: 8 }}>{s.stock}</span>
            <span className="data-sm" style={{ color: "var(--ink3)" }}>{s.eta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════ ANALYTICS DASHBOARD ═══════════════════ */
function Analytics() {
  const { gamification: g } = INTEL;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }} className="reveal">
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span className="section-num">07 —</span>
          <span className="badge badge-saph">AI ANALYTICS</span>
        </div>
        <h2 className="display-lg">Analytics Command Centre</h2>
      </div>

      {/* Performance rings */}
      <div className="card" style={{ padding: 20 }}>
        <Label>AI System Performance Indicators</Label>
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 20, marginTop: 12 }}>
          <Ring value={96} color="var(--viridian)"    size={64} label="SCAN ACC." />
          <Ring value={84} color="var(--sapphire)"   size={64} label="MATCH RATE" />
          <Ring value={73} color="var(--gold)"        size={64} label="AUTH DETECT" />
          <Ring value={91} color="var(--vermillion)"  size={64} label="FORECAST" />
          <Ring value={67} color="var(--ink)"         size={64} label="FRAUD BLOCK" />
        </div>
      </div>

      {/* Price chart */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <Label>Global Price Index — 6 Month Trend</Label>
          <div style={{ display: "flex", gap: 16 }}>
            {[{n:"Amazon",c:"var(--vermillion)"},{n:"eBay",c:"var(--sapphire)"},{n:"AliExpress",c:"var(--viridian)"}].map(d => (
              <div key={d.n} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 16, height: 2, background: d.c, borderRadius: 1 }} />
                <span className="data-sm" style={{ color: "var(--ink3)" }}>{d.n}</span>
              </div>
            ))}
          </div>
        </div>
        <LineChart
          datasets={[
            { name:"Amazon",    c:"var(--vermillion)", v:[189,185,195,178,182,188] },
            { name:"eBay",      c:"var(--sapphire)",   v:[165,172,168,160,175,180] },
            { name:"AliExpress",c:"var(--viridian)",   v:[120,118,125,115,122,119] },
          ]}
          labels={["Oct","Nov","Dec","Jan","Feb","Mar"]}
        />
      </div>

      {/* Gamification */}
      <div className="card" style={{ padding: 20 }}>
        <ThickRule />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <div>
            <h3 className="display-md">{g.rank}</h3>
            <p style={{ fontSize: 12, color: "var(--ink3)", marginTop: 3 }}>Level {g.level} · {(g.nextXp - g.xp).toLocaleString()} XP to Level {g.level + 1}</p>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {[
              { label: "Total XP", val: g.points.toLocaleString() },
              { label: "Scans",    val: g.scans },
              { label: "Verified", val: g.verifications },
              { label: "Reports",  val: g.reportsSubmitted },
            ].map(({ label, val }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div className="data-md">{val}</div>
                <Label style={{ margin: 0 }}>{label}</Label>
              </div>
            ))}
          </div>
        </div>
        <Label>XP Progress</Label>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${(g.xp / g.nextXp) * 100}%` }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
          <span className="data-sm" style={{ color: "var(--ink4)" }}>{g.xp.toLocaleString()} XP</span>
          <span className="data-sm" style={{ color: "var(--ink4)" }}>{g.nextXp.toLocaleString()} XP</span>
        </div>
        <Hairline />
        <div style={{ marginTop: 14 }}>
          <Label>Achievement Badges</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["🔍 First Scan","⚡ Speed Scanner","🛡 Fraud Fighter","📋 Warranty Master","🌏 Global Sourcer"].map(b => (
              <span key={b} className="badge badge-gold">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="card" style={{ padding: 20 }}>
        <Label>Scan Activity Heatmap · 12 Weeks</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4, marginTop: 12 }}>
          {Array.from({ length: 84 }, (_, i) => {
            const v = Math.random();
            const bg = v > 0.85 ? "var(--ink)" : v > 0.6 ? "var(--sapphire)" : v > 0.35 ? "#9ab5d6" : "var(--canvas2)";
            return <div key={i} title={`${Math.round(v * 40)} scans`} style={{ height: 18, background: bg, borderRadius: 2, transition: "opacity 0.2s", cursor: "pointer" }} onMouseEnter={e => e.target.style.opacity = 0.7} onMouseLeave={e => e.target.style.opacity = 1} />;
          })}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════ SHABBAT OVERLAY ═══════════════════════ */
function ShabbatOverlay({ onDismiss }) {
  return (
    <div className="shabbat-overlay" onClick={onDismiss}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>✡</div>
      <h2 style={{ fontFamily: "var(--ff-disp)", fontSize: 32, marginBottom: 12 }}>Shabbat Shalom</h2>
      <p style={{ fontFamily: "var(--ff-body)", fontSize: 16, opacity: 0.8, maxWidth: 360, marginBottom: 24, lineHeight: 1.7 }}>
        SmartCycle Nexus is observing Shabbat. Transactions and scanning are paused until nightfall. Read-only mode is available.
      </p>
      <span className="badge badge-shabbat">Shabbat Mode Active</span>
      <p style={{ marginTop: 24, fontFamily: "var(--ff-mono)", fontSize: 11, opacity: 0.5, letterSpacing: "0.12em" }}>
        CLICK ANYWHERE TO ENTER READ-ONLY MODE
      </p>
    </div>
  );
}

/* ══════════════════════════ NOTIFICATION PANEL ════════════════════ */
function NotifPanel({ notifs, onClose }) {
  return (
    <div style={{
      position: "fixed", top: 57, right: 0, width: 340,
      background: "white", border: "1px solid var(--rule)",
      borderTop: "none", zIndex: 1000, boxShadow: "0 2px 8px rgba(26,23,20,0.1), 0 16px 48px rgba(26,23,20,0.08)",
      animation: "reveal-right 0.2s ease",
    }}>
      <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--rule)" }}>
        <span className="label" style={{ margin: 0 }}>System Alerts · {notifs.length} New</span>
        <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 10 }} onClick={onClose}>✕</button>
      </div>
      {notifs.map(n => (
        <div key={n.id} style={{ padding: "12px 16px", borderBottom: "1px solid var(--rule2)", display: "flex", gap: 10 }}>
          <StatusDot status={n.sev === "CRITICAL" ? "CRITICAL" : n.sev === "WARN" ? "WARN" : "INFO"} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, lineHeight: 1.5 }}>{n.msg}</div>
            <div className="data-sm" style={{ color: "var(--ink4)", marginTop: 3 }}>{n.t} ago</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════ MAIN APP ══════════════════════════════ */
const MODULES = [
  { id: "OVERVIEW",    label: "Overview",     num: "00" },
  { id: "PARTS",       label: "Parts Scanner",num: "01" },
  { id: "VALUATION",   label: "Valuator",     num: "02" },
  { id: "INVENTORY",   label: "Inventory",    num: "03" },
  { id: "WARRANTY",    label: "Warranty",     num: "04" },
  { id: "COUNTERFEIT", label: "Authenticity", num: "05" },
  { id: "ANALYTICS",   label: "Analytics",    num: "07" },
];

export default function SmartCycleNexus() {
  const [s, dispatch] = useReducer(reducer, init);

  // Live KPI ticking
  const [kpis, setKpis] = useState(INTEL.kpis);
  useEffect(() => {
    const t = setInterval(() => {
      setKpis(prev => prev.map(k => ({
        ...k,
        trend: [...k.trend.slice(1), k.trend[k.trend.length - 1] + (Math.random() * 6 - 3)],
      })));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  // Shabbat auto-detect
  useEffect(() => {
    if (isShabbat() && !s.shabbatMode) dispatch({ type: "SHABBAT" });
  }, []);

  const isScanModule = ["PARTS","COUNTERFEIT","VALUATION","WARRANTY","INVENTORY"].includes(s.view);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <G />

      {/* Shabbat overlay */}
      {s.shabbatMode && <ShabbatOverlay onDismiss={() => dispatch({ type: "SHABBAT" })} />}

      {/* ── HEADER ── */}
      <header style={{
        height: 57, borderBottom: "1px solid var(--rule)",
        background: "white", display: "flex", alignItems: "center",
        padding: "0 24px", gap: 24, position: "sticky", top: 0, zIndex: 500,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span className="display-xl" style={{ fontSize: 18, letterSpacing: "0.05em" }}>SmartCycle</span>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: "var(--ink4)", letterSpacing: "0.2em", paddingBottom: 1 }}>NEXUS</span>
        </div>
        <div style={{ width: 1, height: 24, background: "var(--rule)" }} />
        <span className="label" style={{ margin: 0, color: "var(--ink4)" }}>Global Parts Intelligence OS · v4.2</span>

        {/* Right controls */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
          <LiveDot />
          <div style={{ width: 1, height: 20, background: "var(--rule)" }} />
          <Toggle on={s.shabbatMode} onToggle={() => dispatch({ type: "SHABBAT" })} label="Shabbat" />
          <div style={{ position: "relative" }}>
            <button className="btn btn-ghost" style={{ padding: "6px 14px" }} onClick={() => dispatch({ type: "NOTIF" })}>
              Alerts
              {s.notifications.length > 0 && (
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, borderRadius: "50%", background: "var(--vermillion)", color: "white", fontSize: 9, fontFamily: "var(--ff-mono)", marginLeft: 4 }}>
                  {s.notifications.length}
                </span>
              )}
            </button>
            {s.showNotif && <NotifPanel notifs={s.notifications} onClose={() => dispatch({ type: "NOTIF" })} />}
          </div>

          {/* Language selector */}
          <select
            value={s.lang}
            onChange={e => dispatch({ type: "LANG", p: e.target.value })}
            className="input-field"
            style={{ width: 70, padding: "5px 8px" }}
          >
            {["EN","HE","FR","DE","ES","ZH","JA"].map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
      </header>

      {/* ── INTEL TICKER ── */}
      <div style={{ height: 32, background: "var(--canvas2)", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10, padding: "0 16px", color: "var(--ink4)", letterSpacing: "0.15em", borderRight: "1px solid var(--rule)", height: "100%", display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
          INTEL
        </div>
        <div className="ticker-outer" style={{ flex: 1, height: "100%", display: "flex", alignItems: "center" }}>
          <div className="ticker-inner">
            {[...INTEL.tickers, ...INTEL.tickers].map((t, i) => (
              <span key={i} style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: "var(--ink3)", paddingRight: 64, whiteSpace: "nowrap", letterSpacing: "0.04em" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── KPI BAR ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderBottom: "1px solid var(--rule)", background: "white" }}>
        {kpis.map((k, i) => (
          <div key={k.id} style={{ padding: "16px 24px", borderRight: i < kpis.length - 1 ? "1px solid var(--rule)" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <Label>{k.label}</Label>
                <div className="data-lg" style={{ color: "var(--ink)", animation: "count-up 0.5s ease" }}>{k.value}</div>
                <div className="data-sm" style={{ color: k.color, marginTop: 3 }}>{k.delta}</div>
              </div>
              <Spark data={k.trend} color={k.color} w={64} h={28} />
            </div>
          </div>
        ))}
      </div>

      {/* ── NAV ── */}
      <nav style={{ background: "white", borderBottom: "1px solid var(--rule)", padding: "0 24px", display: "flex", alignItems: "center", overflow: "auto" }}>
        {MODULES.map(m => (
          <button key={m.id} className={`nav-pill ${s.view === m.id ? "active" : ""}`}
            onClick={() => dispatch({ type: "VIEW", p: m.id })}>
            <span style={{ color: "var(--ink5)", marginRight: 5 }}>{m.num}</span>
            {m.label}
          </button>
        ))}
      </nav>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, maxWidth: 1100, width: "100%", margin: "0 auto", padding: "32px 24px", alignSelf: "stretch" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
          <span className="data-sm" style={{ color: "var(--ink5)" }}>Nexus</span>
          <span className="data-sm" style={{ color: "var(--ink5)" }}>›</span>
          <span className="data-sm" style={{ color: "var(--ink3)" }}>{MODULES.find(m => m.id === s.view)?.label}</span>
        </div>

        {s.view === "OVERVIEW"  && <Overview />}
        {s.view === "ANALYTICS" && <Analytics />}
        {isScanModule && (
          <ScannerModule state={s} dispatch={dispatch} moduleKey={s.view} />
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid var(--rule)", background: "white", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="label" style={{ margin: 0 }}>
          SmartCycle Nexus v4.2 · {INTEL.gamification.scans} scans today · AI pipeline active
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          {["GDPR","SOC 2","PCI DSS","ISO 27001"].map(t => (
            <span key={t} className="badge badge-vird" style={{ fontSize: 8 }}>{t}</span>
          ))}
          {s.shabbatMode && <span className="badge badge-shabbat">SHABBAT MODE</span>}
        </div>
      </footer>
    </div>
  );
}
