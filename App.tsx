import { useState, useReducer, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════
   SMARTCYCLE NEXUS — HYPER-SINGULARITY EDITION
   Aesthetic: Biopunk Luminescent · Deep space + living organism
   Fonts: Syne (display) · Azeret Mono (data) · Outfit (UI)
   Palette: Midnight void · Phosphor cyan · Pulse violet · Ember gold
   Unforgettable: 3D rotating part sphere + drag-and-drop widgets
   ═══════════════════════════════════════════════════════════════════ */

const CSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Azeret+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Outfit:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* Void palette */
      --void:       #050810;
      --deep:       #080d1a;
      --surface:    #0d1528;
      --panel:      #111e35;
      --panel2:     #162545;
      --edge:       rgba(99,214,255,0.08);
      --edge2:      rgba(99,214,255,0.15);
      /* Phosphor cyan — primary accent */
      --cyan:       #63d6ff;
      --cyan2:      #29b6f6;
      --cyan-glow:  rgba(99,214,255,0.25);
      --cyan-dim:   rgba(99,214,255,0.06);
      /* Pulse violet */
      --violet:     #c084fc;
      --violet2:    #a855f7;
      --violet-glow:rgba(192,132,252,0.2);
      /* Ember gold */
      --gold:       #fbbf24;
      --gold-dim:   rgba(251,191,36,0.1);
      /* Bio-green */
      --bio:        #34d399;
      --bio-glow:   rgba(52,211,153,0.2);
      /* Alert red */
      --alert:      #f87171;
      --alert-dim:  rgba(248,113,113,0.1);
      /* Text */
      --t1: #e8f4ff;
      --t2: #8bacc8;
      --t3: #4a6b8a;
      --t4: #2a4060;
      /* Fonts */
      --syne:   'Syne', sans-serif;
      --mono:   'Azeret Mono', monospace;
      --ui:     'Outfit', sans-serif;
    }

    html, body {
      background: var(--void);
      color: var(--t1);
      font-family: var(--ui);
      font-size: 13px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      cursor: default;
    }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--void); }
    ::-webkit-scrollbar-thumb { background: var(--edge2); border-radius: 2px; }

    /* ── ANIMATIONS ── */
    @keyframes float {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      33%      { transform: translateY(-8px) rotate(0.5deg); }
      66%      { transform: translateY(4px) rotate(-0.3deg); }
    }
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 var(--cyan-glow); }
      70%  { box-shadow: 0 0 0 16px transparent; }
      100% { box-shadow: 0 0 0 0 transparent; }
    }
    @keyframes slide-up {
      from { transform: translateY(20px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    @keyframes slide-right {
      from { transform: translateX(-16px); opacity: 0; }
      to   { transform: translateX(0);     opacity: 1; }
    }
    @keyframes glow-pulse {
      0%,100% { opacity: 0.6; }
      50%     { opacity: 1; }
    }
    @keyframes shimmer {
      0%   { background-position: -800px 0; }
      100% { background-position:  800px 0; }
    }
    @keyframes orbit {
      from { transform: rotate(0deg) translateX(40px) rotate(0deg); }
      to   { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
    }
    @keyframes ticker {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes scan-beam {
      0%,100% { top: 5%; opacity: 0.8; }
      50%     { top: 90%; opacity: 1; }
    }
    @keyframes data-stream {
      from { transform: translateY(0); opacity: 1; }
      to   { transform: translateY(-24px); opacity: 0; }
    }
    @keyframes bg-grid {
      from { background-position: 0 0; }
      to   { background-position: 40px 40px; }
    }
    @keyframes border-glow {
      0%,100% { border-color: var(--edge); }
      50%     { border-color: var(--edge2); }
    }
    @keyframes spin-3d {
      from { transform: rotateY(0deg); }
      to   { transform: rotateY(360deg); }
    }

    /* UTILITY */
    .reveal { animation: slide-up 0.5s cubic-bezier(0.16,1,0.3,1) both; }
    .reveal2 { animation: slide-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
    .reveal3 { animation: slide-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.2s both; }

    /* ── GRID BACKGROUND ── */
    .grid-bg {
      background-image:
        linear-gradient(rgba(99,214,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99,214,255,0.03) 1px, transparent 1px);
      background-size: 40px 40px;
      animation: bg-grid 8s linear infinite;
    }

    /* ── GLASS PANELS ── */
    .glass {
      background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
      border: 1px solid var(--edge);
      backdrop-filter: blur(12px);
      border-radius: 12px;
      animation: border-glow 4s ease infinite;
    }
    .glass-bright {
      background: linear-gradient(135deg, rgba(99,214,255,0.06), rgba(99,214,255,0.02));
      border: 1px solid var(--edge2);
      backdrop-filter: blur(16px);
      border-radius: 12px;
    }
    .glass-violet {
      background: linear-gradient(135deg, rgba(192,132,252,0.06), rgba(192,132,252,0.01));
      border: 1px solid rgba(192,132,252,0.15);
      border-radius: 12px;
    }
    .glass-bio {
      background: linear-gradient(135deg, rgba(52,211,153,0.06), rgba(52,211,153,0.01));
      border: 1px solid rgba(52,211,153,0.15);
      border-radius: 12px;
    }
    .glass-gold {
      background: linear-gradient(135deg, rgba(251,191,36,0.06), rgba(251,191,36,0.01));
      border: 1px solid rgba(251,191,36,0.15);
      border-radius: 12px;
    }
    .glass-alert {
      background: linear-gradient(135deg, rgba(248,113,113,0.06), rgba(248,113,113,0.01));
      border: 1px solid rgba(248,113,113,0.2);
      border-radius: 12px;
    }

    /* ── SKELETON ── */
    .skel {
      background: linear-gradient(90deg, var(--panel) 25%, var(--panel2) 50%, var(--panel) 75%);
      background-size: 800px 100%;
      animation: shimmer 1.6s infinite linear;
      border-radius: 6px;
    }

    /* ── TAG/BADGE ── */
    .tag {
      font-family: var(--mono); font-size: 9px; letter-spacing: 0.14em;
      text-transform: uppercase; padding: 3px 8px; border-radius: 4px;
      border: 1px solid; display: inline-flex; align-items: center; gap: 4px;
    }
    .tag-cyan   { background: var(--cyan-dim);   color: var(--cyan);   border-color: rgba(99,214,255,0.25); }
    .tag-violet { background: var(--violet-glow); color: var(--violet); border-color: rgba(192,132,252,0.3); }
    .tag-bio    { background: var(--bio-glow);    color: var(--bio);    border-color: rgba(52,211,153,0.3); }
    .tag-gold   { background: var(--gold-dim);    color: var(--gold);   border-color: rgba(251,191,36,0.3); }
    .tag-alert  { background: var(--alert-dim);   color: var(--alert);  border-color: rgba(248,113,113,0.3); }
    .tag-dim    { background: rgba(255,255,255,0.04); color: var(--t2); border-color: var(--edge); }

    /* ── BUTTONS ── */
    .btn {
      font-family: var(--ui); font-weight: 500; font-size: 12px;
      padding: 9px 20px; border-radius: 8px; border: 1px solid;
      cursor: pointer; display: inline-flex; align-items: center; gap: 7px;
      transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
      position: relative; overflow: hidden;
    }
    .btn::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.05), transparent);
      opacity: 0; transition: opacity 0.2s;
    }
    .btn:hover::before { opacity: 1; }
    .btn:hover { transform: translateY(-2px); }
    .btn:active { transform: translateY(0); }
    .btn-cyan {
      background: linear-gradient(135deg, rgba(99,214,255,0.15), rgba(99,214,255,0.05));
      color: var(--cyan); border-color: rgba(99,214,255,0.3);
      box-shadow: 0 0 20px rgba(99,214,255,0.1);
    }
    .btn-cyan:hover { box-shadow: 0 0 30px rgba(99,214,255,0.25); }
    .btn-solid {
      background: linear-gradient(135deg, var(--cyan2), #1e90c8);
      color: var(--void); border-color: transparent; font-weight: 600;
      box-shadow: 0 4px 24px rgba(99,214,255,0.3);
    }
    .btn-solid:hover { box-shadow: 0 6px 32px rgba(99,214,255,0.5); }
    .btn-violet {
      background: var(--violet-glow); color: var(--violet);
      border-color: rgba(192,132,252,0.3);
    }
    .btn-ghost {
      background: transparent; color: var(--t2); border-color: var(--edge);
    }
    .btn-ghost:hover { background: var(--cyan-dim); color: var(--t1); border-color: var(--edge2); }

    /* ── NAV ── */
    .nav-item {
      font-family: var(--ui); font-size: 12px; font-weight: 500;
      padding: 7px 14px; border-radius: 6px; cursor: pointer;
      color: var(--t3); transition: all 0.18s ease; white-space: nowrap;
      display: flex; align-items: center; gap: 7px;
    }
    .nav-item:hover  { background: var(--cyan-dim); color: var(--t2); }
    .nav-item.active { background: var(--cyan-dim); color: var(--cyan); }
    .nav-item .nav-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: transparent; transition: background 0.18s;
    }
    .nav-item.active .nav-dot { background: var(--cyan); box-shadow: 0 0 6px var(--cyan); }

    /* ── PROGRESS ── */
    .progress-track { height: 3px; background: var(--panel2); border-radius: 2px; overflow: hidden; }
    .progress-fill {
      height: 100%; border-radius: 2px;
      background: linear-gradient(90deg, var(--cyan2), var(--cyan));
      box-shadow: 0 0 8px var(--cyan-glow);
      transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
    }

    /* ── INPUT ── */
    .inp {
      font-family: var(--mono); font-size: 11px;
      background: var(--deep); border: 1px solid var(--edge);
      color: var(--t1); padding: 9px 12px; border-radius: 8px;
      outline: none; transition: all 0.2s; width: 100%;
    }
    .inp:focus { border-color: var(--cyan); box-shadow: 0 0 0 3px var(--cyan-dim); }
    .inp::placeholder { color: var(--t4); }

    /* ── DATA ROW ── */
    .row {
      display: grid; align-items: center;
      border-bottom: 1px solid rgba(99,214,255,0.04);
      padding: 10px 0; transition: all 0.15s;
    }
    .row:hover { background: var(--cyan-dim); padding-left: 8px; padding-right: 8px; margin: 0 -8px; border-radius: 6px; border-color: transparent; }
    .row:last-child { border-bottom: none; }

    /* ── UPLOAD ── */
    .dropzone {
      border: 1.5px dashed var(--edge2); border-radius: 12px;
      background: var(--deep); transition: all 0.25s;
      cursor: pointer; position: relative; overflow: hidden;
    }
    .dropzone:hover, .dropzone.active {
      border-color: var(--cyan); background: var(--cyan-dim);
      box-shadow: 0 0 30px rgba(99,214,255,0.08);
    }

    /* ── SCAN OVERLAY ── */
    .scan-line {
      position: absolute; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--cyan), transparent);
      box-shadow: 0 0 12px var(--cyan), 0 0 24px var(--cyan-glow);
      animation: scan-beam 2s ease-in-out infinite;
      pointer-events: none;
    }

    /* ── 3D CANVAS WRAPPER ── */
    .ar-canvas-wrap {
      border-radius: 12px; overflow: hidden;
      background: radial-gradient(ellipse at center, #0a1a35 0%, var(--void) 70%);
      position: relative;
    }
    .ar-hud {
      position: absolute; inset: 0; pointer-events: none;
      background:
        linear-gradient(to right, rgba(99,214,255,0.05) 1px, transparent 1px),
        linear-gradient(rgba(99,214,255,0.05) 1px, transparent 1px);
      background-size: 32px 32px;
    }
    .ar-corner {
      position: absolute; width: 18px; height: 18px;
      border-color: var(--cyan); border-style: solid;
    }
    .ar-tl { top: 12px; left: 12px; border-width: 2px 0 0 2px; border-radius: 2px 0 0 0; }
    .ar-tr { top: 12px; right: 12px; border-width: 2px 2px 0 0; border-radius: 0 2px 0 0; }
    .ar-bl { bottom: 12px; left: 12px; border-width: 0 0 2px 2px; border-radius: 0 0 0 2px; }
    .ar-br { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; border-radius: 0 0 2px 0; }

    /* ── WIDGET CARD (draggable) ── */
    .widget {
      border-radius: 12px; padding: 18px;
      cursor: grab; user-select: none;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .widget:hover { box-shadow: 0 8px 40px rgba(99,214,255,0.12); }
    .widget.dragging { cursor: grabbing; transform: scale(1.02); box-shadow: 0 16px 60px rgba(99,214,255,0.2); z-index: 100; opacity: 0.9; }

    /* ── TICKER ── */
    .ticker-outer { overflow: hidden; }
    .ticker-inner { display: flex; animation: ticker 35s linear infinite; width: max-content; }
    .ticker-inner:hover { animation-play-state: paused; }

    /* ── LIVE DOT ── */
    .live {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--bio); box-shadow: 0 0 8px var(--bio);
      animation: glow-pulse 2s ease infinite;
    }

    /* ── BLOCKCHAIN VIZ ── */
    .chain-block {
      border-radius: 8px; padding: 10px 14px;
      font-family: var(--mono); font-size: 10px;
      border: 1px solid var(--edge);
      background: var(--panel);
      position: relative; transition: all 0.2s;
    }
    .chain-block:hover { border-color: var(--cyan); box-shadow: 0 0 16px var(--cyan-dim); }
    .chain-connector {
      width: 24px; height: 2px; background: linear-gradient(90deg, var(--t4), var(--cyan));
      align-self: center; flex-shrink: 0;
    }

    /* ── VOICE RING ── */
    .voice-ring {
      width: 72px; height: 72px; border-radius: 50%;
      border: 2px solid var(--cyan);
      box-shadow: 0 0 0 0 var(--cyan-glow);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.3s;
      background: var(--cyan-dim);
      animation: pulse-ring 2s ease infinite;
    }
    .voice-ring:hover { box-shadow: 0 0 40px var(--cyan-glow); transform: scale(1.08); }
    .voice-ring.active { background: rgba(99,214,255,0.2); border-color: var(--bio); box-shadow: 0 0 30px var(--bio-glow); }

    /* ── TOGGLE ── */
    .tog { width: 40px; height: 22px; border-radius: 11px; border: 1px solid var(--edge); background: var(--panel); position: relative; cursor: pointer; transition: all 0.2s; }
    .tog.on { background: var(--cyan-dim); border-color: var(--cyan); }
    .tog-thumb { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: var(--t3); transition: transform 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
    .tog.on .tog-thumb { transform: translateX(18px); background: var(--cyan); box-shadow: 0 0 8px var(--cyan-glow); }

    /* ── MINI GRAPH (CSS bars) ── */
    .mini-bars { display: flex; align-items: flex-end; gap: 2px; height: 32px; }
    .mini-bar { flex: 1; border-radius: 2px; transition: height 0.5s ease; }

    /* ── ORBIT PARTICLES ── */
    .orbit-container { position: relative; width: 120px; height: 120px; }
    .orbit-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 32px; height: 32px; border-radius: 50%; background: radial-gradient(circle, var(--cyan), var(--cyan2)); box-shadow: 0 0 20px var(--cyan-glow); display: flex; align-items: center; justify-content: center; }
    .orbiter { position: absolute; width: 8px; height: 8px; border-radius: 50%; top: 50%; left: 50%; margin: -4px; animation: orbit 3s linear infinite; }

    /* ── FULLSCREEN SANDBOX ── */
    .sandbox-bar { display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: rgba(0,0,0,0.4); border-bottom: 1px solid var(--edge); border-radius: 12px 12px 0 0; backdrop-filter: blur(8px); }
    .sandbox-dot { width: 11px; height: 11px; border-radius: 50%; }
  `}</style>
);

/* ═══════════════════ DATA ═══════════════════ */
const DATA = {
  ticker: [
    "AMZN ▲ iPhone 15 Charger  ▲4.2%  $24.99",
    "EBAY ▼ Bosch Drill Chuck  ▼3.1%  $44.00 · 12 sold/24h",
    "RECALL › Samsung S22 Battery  CPSC-2024-0341",
    "RESTOCK › Best Buy [1.2km] › Samsung SSD 990 Pro · QTY 8",
    "FRAUD › Fake AirPods Pro · Guangzhou origin detected",
    "TREND › EV Battery Cells ▲41% 30d demand · APAC/EU",
    "WARRANTY › Dell XPS 15 SN-44921 › EXPIRES 14 DAYS",
  ],

  kpis: [
    { id:"val",  label:"Portfolio Value",    val:"$284,792", delta:"+2.3%", color:"var(--bio)",    trend:[180,190,185,196,200,194,202,210] },
    { id:"war",  label:"Active Warranties",  val:"1,847",    delta:"3 critical", color:"var(--alert)",  trend:[1820,1830,1842,1840,1848,1845,1847,1850] },
    { id:"sc",   label:"Scans Today",        val:"3,291",    delta:"+18%", color:"var(--cyan)",   trend:[2100,2400,2650,2800,3000,3150,3291,3310] },
    { id:"fr",   label:"Fraud Prevented",    val:"$187K",    delta:"47 items", color:"var(--violet)", trend:[150,158,162,172,178,183,187,190] },
  ],

  part: {
    name: "Bosch GBH 18V-28 SDS Chuck Assembly",
    sku: "BOSCH-2607001168",
    brand: "Bosch Professional",
    confidence: 97,
    compatible: ["GBH 18V-28","GBH 18V-EC","GBH 24 VRE"],
    listings: [
      { src:"Amazon",    flag:"🇺🇸", price:44.99, ship:"Free 2d",    avail:"IN STOCK", rating:4.7, savings:0 },
      { src:"AliExpress",flag:"🇨🇳", price:18.50, ship:"$7.99 18d", avail:"IN STOCK", rating:4.2, savings:58 },
      { src:"eBay",      flag:"🌐",  price:38.00, ship:"$5.99 4d",  avail:"USED-GOOD",rating:4.4, savings:14 },
      { src:"Walmart",   flag:"🇺🇸", price:49.50, ship:"Free 3d",   avail:"LOW STOCK", rating:4.1, savings:0 },
    ],
  },

  warranties: [
    { icon:"💻", product:"Dell XPS 15 9530",   days:14,  status:"CRITICAL", exp:"2025-02-28" },
    { icon:"🔧", product:"Bosch GBH 18V-28",   days:60,  status:"WARN",     exp:"2025-04-15" },
    { icon:"📺", product:"LG OLED C2 65\"",     days:158, status:"OK",       exp:"2025-07-22" },
    { icon:"📱", product:"iPhone 14 Pro",       days:206, status:"OK",       exp:"2025-09-08" },
    { icon:"🌀", product:"Dyson V15 Detect",    days:697, status:"OK",       exp:"2027-01-14" },
  ],

  inventory: [
    { store:"Best Buy Downtown",    dist:"1.2km", stock:"IN STOCK", qty:4,  price:79.99, eta:"Now" },
    { store:"Micro Center",         dist:"3.4km", stock:"IN STOCK", qty:12, price:74.99, eta:"Now" },
    { store:"Walmart Supercenter",  dist:"2.8km", stock:"LOW",      qty:1,  price:71.99, eta:"Now" },
    { store:"Target Express",       dist:"4.7km", stock:"OUT",      qty:0,  price:82.99, eta:"3d" },
  ],

  blockchain: [
    { id:"0x4f2a", type:"SCAN",      ts:"14:32:01", hash:"0x4f2a…3d81", status:"CONFIRMED" },
    { id:"0x8c91", type:"WARRANTY",  ts:"14:31:47", hash:"0x8c91…aa23", status:"CONFIRMED" },
    { id:"0xe3b1", type:"AUTH",      ts:"14:28:12", hash:"0xe3b1…5f90", status:"CONFIRMED" },
  ],

  forecast: [
    { part:"EV Battery Modules",  demand:94, trend:"+41%", risk:"LOW" },
    { part:"iPhone 15 Screens",   demand:88, trend:"+55%", risk:"LOW" },
    { part:"HVAC Compressors",    demand:78, trend:"+18%", risk:"MED" },
    { part:"GPU Cooling Fans",    demand:72, trend:"+29%", risk:"LOW" },
    { part:"Brake Calipers (EV)", demand:61, trend:"+7%",  risk:"MED" },
  ],

  notifications: [
    { id:1, type:"CRITICAL", msg:"Dell XPS 15 warranty expires in 14 days", t:"2m", icon:"🔴" },
    { id:2, type:"WARN",     msg:"Samsung S22 recall — battery swelling",    t:"15m", icon:"🟡" },
    { id:3, type:"INFO",     msg:"Best Buy restocked Samsung 990 Pro SSD",   t:"1h",  icon:"🟢" },
    { id:4, type:"INFO",     msg:"AliExpress price drop: Bosch chuck −11%",  t:"2h",  icon:"🔵" },
  ],

  upgrades10: [
    "Deploy YOLOv8 nano model via ONNX Runtime Web for <50ms on-device part detection",
    "Integrate Amazon PA-API 5.0 with AWS Signature v4 for real-time inventory + pricing",
    "Implement WebXR AR.js overlay: 3D .glTF part model on live phone camera feed",
    "Add federated learning: aggregate anonymised scans to retrain models without PII exposure",
    "Build multi-supplier negotiation bot: GPT-4o powered email drafter for bulk procurement",
    "Implement cross-border duty calculator: HS code lookup + import tax for 50 countries",
    "Add blockchain warranty NFT: Polygon smart contract with ERC-1155 standard",
    "Build drag-and-drop dashboard persistence: save widget layout to Supabase per user",
    "Integrate Stripe Connect escrow for peer-to-peer P2P part sales with buyer protection",
    "Add IoT telemetry bridge: receive MQTT events from connected workshop equipment",
  ],

  features100: Array.from({length:100}, (_,i) => [
    "Real-time 3D part model generation from 2D photos via NeRF/Gaussian Splatting",
    "LiDAR scan → part geometry → CNC machining file export (.STL/.STEP)",
    "AI negotiation bot: auto-negotiate supplier bulk pricing via email",
    "Predictive maintenance: vibration analysis via phone microphone + FFT",
    "Carbon footprint score per purchase: gCO₂e estimate from manufacturing + shipping",
    "Community parts library: crowdsourced 3D models for legacy/discontinued parts",
    "Insurance integration: auto-generate replacement cost claim documents",
    "Satellite demand forecasting: correlate weather/events with regional part demand",
    "Voice-first mode: fully hands-free operation via Web Speech API",
    "Fleet management: bulk warranty + maintenance tracking for 10,000+ assets",
    "AR digital twin: maintain virtual model of every product you own",
    "Supplier scorecard: delivery rate, quality defect rate, dispute resolution time",
    "Smart reorder: auto-purchase when stock drops below threshold via Shopify API",
    "Cross-platform browser extension: scan products while browsing any website",
    "WhatsApp bot: send product photo, receive valuation + source links",
    "Marketplace arbitrage finder: buy low on AliExpress, sell high on eBay",
    "AI-generated repair manuals for any part using GPT-4o + diagram generation",
    "Dynamic warranty extension marketplace: buy extended coverage from multiple providers",
    "QR code generator for physical warranty cards with secure JWT deep links",
    "Real-time competitor pricing alerts: notify when Amazon price changes >5%",
    "3D print file repository: upload scanned part → auto-generate printable mesh",
    "Customs declaration auto-fill: extract part details → pre-fill HS code forms",
    "Enterprise ERP sync: bidirectional SAP/Oracle connector via REST + webhooks",
    "Predictive stock crash alerts: ML model flags likely out-of-stock 7 days ahead",
    "AI-powered dispute resolution: mediate buyer-seller conflicts via GPT-4o",
    "Gamified repair challenges: earn XP for DIY repairs verified by photo proof",
    "Social proof overlay: show how many users own/rated the same part",
    "Bulk invoice processing: forward 100 receipts → extract + categorise automatically",
    "Smart contract warranty: auto-trigger claim payout when failure condition met",
    "Geospatial demand heatmap: choropleth map of part shortages by zip code",
    "Personalized depreciation curves: per-product type + condition + region",
    "OEM vs aftermarket A/B testing: track failure rate by part source over time",
    "Multi-currency invoice generation: export to 150 currencies with live FX rates",
    "AI video repair tutorial generation: stitch together YouTube clips for specific repairs",
    "Supplier risk scoring: geopolitical, logistics, financial health composite index",
    "Tool lending network: list your spare tools for neighbours to borrow",
    "IoT predictive failure: integrate with smart appliance APIs for pre-emptive alerts",
    "Hazardous material flagging: auto-detect restricted shipping items (Li-ion, etc.)",
    "Multi-language AI chatbot: support 40+ languages via GPT-4o translation",
    "Affiliate link auto-insertion: monetise recommendations with Amazon/eBay affiliate",
    "Bulk parts liquidation auction: sell surplus inventory to highest bidder",
    "Neural style transfer: visualise parts in different finishes/colours",
    "Warranty registry for gifts: gift-giver registers warranty on behalf of recipient",
    "Real-time stock scraping: Playwright headless for stores without official APIs",
    "Dark pool sourcing: access manufacturer overstock channels via B2B API",
    "Physics simulation: test part fit tolerance via WebAssembly physics engine",
    "Crowdsourced recall reporting: community flags potential safety issues",
    "Dealer network map: authorised service centres overlaid on Google Maps",
    "Predictive shipping delays: ML model trained on carrier performance data",
    "Subscription management: track recurring maintenance consumables (filters, oils)",
    "AI-powered SEO listing: optimise eBay/Shopify titles for search ranking",
    "Reverse image search: find exact part from photo across all supplier catalogues",
    "Digital receipt vault: encrypted cloud storage for all purchase records",
    "Brand authentication API partnerships: direct Rolex/Apple/Nike DB access",
    "Temperature-sensitive shipping alerts: flag parts requiring cold-chain logistics",
    "AI disassembly guide: step-by-step teardown instructions for any product",
    "Parts compatibility graph: visual relationship map of interchangeable parts",
    "Crowdfunded repair fund: pool resources for expensive communal equipment repairs",
    "Automated regulatory compliance: CE/FCC/UL certification status per part",
    "Peer-to-peer warranty trading: sell unused warranty months to others",
    "AI price negotiation simulator: train users to negotiate with suppliers",
    "Smart home integration: Alexa/Google skill for inventory queries",
    "Micro-fulfillment network: connect individual part holders for hyperlocal delivery",
    "Supply chain resilience score: rate supplier diversification per critical part",
    "Biometric auth: Face ID/fingerprint for high-value transaction approval",
    "AI contract review: scan supplier T&Cs for unfavorable warranty clauses",
    "Real-time port congestion alerts: predict shipping delays from supply chain data",
    "Digital passport for products: immutable history from manufacture to current owner",
    "Thermal imaging stub: detect hidden defects via FLIR camera integration",
    "Marketplace ban detection: flag sellers with high dispute/negative feedback rate",
    "Battery health estimator: estimate remaining Li-ion cycles from usage pattern",
    "Machine learning price anchoring: suggest list price based on anchoring psychology",
    "Enterprise white-label: fully rebrandable platform for OEM/dealer networks",
    "API rate limit management: intelligent queuing across 20+ marketplace APIs",
    "Automated tax calculation: VAT/GST/sales tax per jurisdiction with Avalara",
    "Augmented packaging verification: scan outer box to verify unboxed product",
    "Split shipment optimiser: combine multi-source orders to minimise shipping cost",
    "Real-time translation of foreign marketplace listings (AliExpress/Taobao)",
    "AI-generated product descriptions for legally compliant listings in 10 markets",
    "Collective bargaining: aggregate buyer demand for volume discount from suppliers",
    "Intelligent spam filter for marketplace messages: prioritise urgent buyer requests",
    "Automated Google Merchant feed generation for product catalogue",
    "Cross-marketplace inventory sync: prevent overselling across 5 platforms simultaneously",
    "AI-powered returns optimization: decide repair vs replace vs resell for returned parts",
    "Warranty void detection: identify if product has been tampered (void sticker analysis)",
    "Supplier lead time optimiser: dynamically select fastest source given current conditions",
    "Environmental compliance checker: RoHS/REACH compliance status per component",
    "Blockchain provenance trail: full chain of custody from manufacturer to current owner",
    "Loyalty program engine: points for scans, verified sales, reviews, referrals",
    "Dynamic insurance pricing: real-time premium calculation based on product risk profile",
    "Automated eBay feedback management: respond to reviews with AI-generated replies",
    "3D warehouse visualisation: interactive map of physical inventory storage locations",
    "Intelligent catalog deduplication: merge duplicate SKUs across supplier databases",
    "Predictive catalog expansion: AI suggests new part categories based on scan patterns",
    "Live auction sniping assistant: alert + auto-bid in final seconds of eBay auctions",
    "Emotional sentiment analysis on product reviews to extract quality signals",
    "AI-powered onboarding: personalised setup flow based on user role and industry",
    "Sustainability scorecard: rate platforms by eco-packaging + carbon offset programs",
    "Real-time market liquidity index: how quickly a part category trades on secondhand",
  ][i % 100]),
};

/* ═══════════════════ STATE ═══════════════════ */
const INIT = {
  view: "SANDBOX",
  scanning: false, scanPct: 0, scanPhase: "", scanDone: false,
  uploadImg: null, arMode: false, arRotate: 0,
  voiceActive: false, voiceText: "",
  dark: true, lang: "EN",
  showNotif: false, showSearch: false,
  dragWidget: null,
  widgets: [
    { id:"kpi",      title:"Live KPIs",         col:1, row:1 },
    { id:"scanner",  title:"Part Scanner",      col:2, row:1 },
    { id:"market",   title:"Marketplace",       col:1, row:2 },
    { id:"warranty", title:"Warranty Guard",    col:2, row:2 },
  ],
  xp: 2840, level: 7, streak: 12,
  blockchain: DATA.blockchain,
};

function reducer(s, a) {
  switch (a.type) {
    case "VIEW":      return { ...s, view: a.v, scanDone: false, uploadImg: null, scanPct: 0 };
    case "SCAN_START":return { ...s, scanning: true, scanDone: false, scanPct: 0, scanPhase: "Initialising AI pipeline…" };
    case "SCAN_PROG": return { ...s, scanPct: a.p, scanPhase: a.phase };
    case "SCAN_DONE": return { ...s, scanning: false, scanDone: true, scanPct: 100, xp: s.xp + 50 };
    case "SCAN_IMG":  return { ...s, uploadImg: a.url };
    case "SCAN_CLR":  return { ...s, scanDone: false, uploadImg: null, scanPct: 0, scanning: false };
    case "AR":        return { ...s, arMode: !s.arMode };
    case "AR_ROT":    return { ...s, arRotate: a.deg };
    case "VOICE":     return { ...s, voiceActive: !s.voiceActive, voiceText: !s.voiceActive ? "Listening…" : "" };
    case "VOICE_TXT": return { ...s, voiceText: a.text };
    case "DARK":      return { ...s, dark: !s.dark };
    case "NOTIF":     return { ...s, showNotif: !s.showNotif };
    case "SEARCH":    return { ...s, showSearch: !s.showSearch };
    case "LANG":      return { ...s, lang: a.v };
    case "DRAG_START":return { ...s, dragWidget: a.id };
    case "DRAG_END":  return { ...s, dragWidget: null };
    default:          return s;
  }
}

/* ═══════════════════ SCAN PIPELINE ═══════════════════ */
function useScan(dispatch) {
  return useCallback(() => {
    dispatch({ type: "SCAN_START" });
    const steps = [
      { p: 12, phase: "Extracting visual features (CNN Layer 1–5)…"   },
      { p: 28, phase: "Running ResNet-101 classification…"             },
      { p: 44, phase: "Querying Amazon PA-API + eBay Finding API…"     },
      { p: 60, phase: "Cross-referencing OEM & aftermarket databases…" },
      { p: 76, phase: "Anomaly & counterfeit detection…"               },
      { p: 90, phase: "Generating AR overlay mesh…"                    },
      { p: 100, phase: "Compiling full intelligence report…"           },
    ];
    steps.forEach(({ p, phase }, i) => {
      setTimeout(() => {
        dispatch({ type: "SCAN_PROG", p, phase });
        if (p === 100) setTimeout(() => dispatch({ type: "SCAN_DONE" }), 400);
      }, i * 420);
    });
  }, [dispatch]);
}

/* ═══════════════════ MICRO COMPONENTS ═══════════════════ */
const Glow = ({ c = "var(--cyan)", blur = 40, op = 0.15 }) => (
  <div style={{ position: "absolute", inset: "-20%", borderRadius: "50%", background: c, filter: `blur(${blur}px)`, opacity: op, pointerEvents: "none" }} />
);

const Chip = ({ children, v = "cyan" }) => {
  const map = { cyan:"tag-cyan", violet:"tag-violet", bio:"tag-bio", gold:"tag-gold", alert:"tag-alert", dim:"tag-dim" };
  return <span className={`tag ${map[v]}`}>{children}</span>;
};

const LiveDot = ({ color = "var(--bio)" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <div className="live" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
    <span style={{ fontFamily: "var(--mono)", fontSize: 9, color, letterSpacing: "0.12em" }}>LIVE</span>
  </div>
);

const MiniSpark = ({ data, color = "var(--cyan)", w = 70, h = 24 }) => {
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - mn) / rng) * h}`).join(" ");
  const area = `0,${h} ${pts.split(" ").join(" ")} ${w},${h}`;
  const id = `sg${Math.random().toString(36).slice(2,6)}`;
  return (
    <svg width={w} height={h} style={{ overflow: "visible", display: "block" }}>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${id})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
};

const Ring = ({ v, c, size = 52, label }) => {
  const r = 18, circ = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 44 44" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
          <circle cx="22" cy="22" r={r} fill="none" stroke={c} strokeWidth="4"
            strokeDasharray={circ} strokeDashoffset={circ * (1 - v / 100)} strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.2s ease", filter: `drop-shadow(0 0 6px ${c})` }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 11, color: c }}>{v}%</div>
      </div>
      {label && <span style={{ fontFamily: "var(--mono)", fontSize: 8, color: "var(--t3)", letterSpacing: "0.1em" }}>{label}</span>}
    </div>
  );
};

/* ═══════════════════ 3D AR PART VIEWER ═══════════════════ */
function ARPartViewer({ active, rotation }) {
  const [autoRot, setAutoRot] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setAutoRot(r => (r + 0.8) % 360), 50);
    return () => clearInterval(t);
  }, [active]);

  const rot = active ? autoRot : rotation;
  const x = Math.cos((rot * Math.PI) / 180) * 30;
  const z = Math.sin((rot * Math.PI) / 180) * 30;
  const faces = [
    { bg: "linear-gradient(135deg, rgba(99,214,255,0.4), rgba(99,214,255,0.1))", transform: `translateZ(30px)`, label: "FRONT" },
    { bg: "linear-gradient(135deg, rgba(99,214,255,0.25), rgba(99,214,255,0.05))", transform: `rotateY(90deg) translateZ(30px)`, label: "RIGHT" },
    { bg: "linear-gradient(135deg, rgba(99,214,255,0.2), rgba(99,214,255,0.04))", transform: `rotateY(180deg) translateZ(30px)`, label: "BACK" },
    { bg: "linear-gradient(135deg, rgba(99,214,255,0.25), rgba(99,214,255,0.05))", transform: `rotateY(-90deg) translateZ(30px)`, label: "LEFT" },
    { bg: "linear-gradient(135deg, rgba(192,132,252,0.25), rgba(192,132,252,0.05))", transform: `rotateX(90deg) translateZ(30px)`, label: "TOP" },
    { bg: "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.04))", transform: `rotateX(-90deg) translateZ(30px)`, label: "BTM" },
  ];

  return (
    <div className="ar-canvas-wrap" style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="ar-hud" />
      {["tl","tr","bl","br"].map(p => <div key={p} className={`ar-corner ar-${p}`} />)}
      {/* CSS 3D cube as stand-in for actual Three.js model */}
      <div style={{ perspective: "500px", perspectiveOrigin: "center center" }}>
        <div style={{ width: 60, height: 60, position: "relative", transformStyle: "preserve-3d", transform: `rotateX(25deg) rotateY(${rot}deg)`, transition: active ? "none" : "transform 0.3s ease" }}>
          {faces.map((f, i) => (
            <div key={i} style={{
              position: "absolute", inset: 0,
              background: f.bg,
              border: "1px solid rgba(99,214,255,0.3)",
              transform: f.transform,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 7, fontFamily: "var(--mono)", color: "rgba(99,214,255,0.6)",
              backdropFilter: "blur(4px)",
            }}>{f.label}</div>
          ))}
        </div>
      </div>
      {/* HUD overlays */}
      <div style={{ position: "absolute", top: 12, left: 48, fontFamily: "var(--mono)", fontSize: 9, color: "var(--cyan)", opacity: 0.8 }}>
        BOSCH-SDS-CHUCK
      </div>
      <div style={{ position: "absolute", bottom: 12, right: 48, fontFamily: "var(--mono)", fontSize: 9, color: "var(--bio)", opacity: 0.8 }}>
        FIT: ✓ COMPATIBLE
      </div>
      <div style={{ position: "absolute", top: 12, right: 48 }}>
        <Chip v="cyan">AR ACTIVE</Chip>
      </div>
      {/* Orbit particles */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
        {[0, 120, 240].map((startDeg, i) => (
          <div key={i} className="orbiter" style={{ animationDelay: `${i * -1}s`, animationDuration: `${3 + i}s`, background: ["var(--cyan)","var(--violet)","var(--bio)"][i], boxShadow: `0 0 6px ${["var(--cyan)","var(--violet)","var(--bio)"][i]}`, transform: `rotate(${startDeg}deg) translateX(50px) rotate(-${startDeg}deg)` }} />
        ))}
      </div>
      {!active && (
        <div style={{ position: "absolute", bottom: 12, left: 12, fontFamily: "var(--mono)", fontSize: 8, color: "var(--t3)" }}>
          DRAG TO ROTATE · SCROLL TO ZOOM
        </div>
      )}
    </div>
  );
}

/* ═══════════════════ SCANNER MODULE ═══════════════════ */
function ScannerPanel({ s, dispatch }) {
  const runScan = useScan(dispatch);
  const [drag, setDrag] = useState(false);
  const rangeRef = useRef();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* AR Viewer */}
      <div className="glass">
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--edge)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t2)", letterSpacing: "0.12em" }}>AR PART VIEWER</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-violet" style={{ padding: "5px 12px", fontSize: 10 }} onClick={() => dispatch({ type: "AR" })}>
              {s.arMode ? "⏹ Stop AR" : "▶ Launch AR"}
            </button>
          </div>
        </div>
        <ARPartViewer active={s.arMode} rotation={s.arRotate} />
        {!s.arMode && (
          <div style={{ padding: "8px 14px", borderTop: "1px solid var(--edge)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t3)", minWidth: 50 }}>ROTATE</span>
            <input ref={rangeRef} type="range" min={0} max={359} defaultValue={0} style={{ flex: 1, accentColor: "var(--cyan)" }}
              onChange={e => dispatch({ type: "AR_ROT", deg: +e.target.value })} />
          </div>
        )}
      </div>

      {/* Upload / Scan */}
      {!s.scanDone && (
        <div>
          <label className={`dropzone ${drag ? "active" : ""}`} style={{ display: "block", padding: "32px 20px", textAlign: "center" }}
            onDragOver={e => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) { const r = new FileReader(); r.onload = ev => { dispatch({ type: "SCAN_IMG", url: ev.target.result }); runScan(); }; r.readAsDataURL(f); }}}>
            {s.uploadImg ? (
              <div style={{ position: "relative", display: "inline-block" }}>
                <img src={s.uploadImg} alt="" style={{ maxHeight: 160, borderRadius: 8, opacity: s.scanning ? 0.6 : 1 }} />
                {s.scanning && <div className="scan-line" />}
              </div>
            ) : (
              <>
                <div style={{ fontSize: 28, marginBottom: 10, opacity: 0.4 }}>📷</div>
                <p style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)", letterSpacing: "0.08em" }}>
                  DROP IMAGE · CLICK · TAKE PHOTO<br />
                  <span style={{ fontSize: 9, color: "var(--t4)" }}>JPG · PNG · WEBP · MP4 · OBJ · STL</span>
                </p>
              </>
            )}
            <input type="file" accept="image/*" style={{ display: "none" }}
              onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = ev => { dispatch({ type: "SCAN_IMG", url: ev.target.result }); runScan(); }; r.readAsDataURL(f); }}} />
          </label>

          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="btn btn-solid" style={{ flex: 1, justifyContent: "center" }} onClick={runScan}>
              ⚡ Run Demo Scan
            </button>
            <button className="btn btn-ghost" onClick={() => dispatch({ type: "SCAN_CLR" })}>Clear</button>
          </div>
        </div>
      )}

      {/* Progress */}
      {s.scanning && (
        <div className="glass" style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--cyan)" }}>{s.scanPhase}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)" }}>{s.scanPct}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${s.scanPct}%` }} />
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            {["CNN","Classify","Market","OEM DB","Anti-Fake","AR Mesh","Report"].map((step, i) => {
              const done = s.scanPct > i * 14;
              return (
                <div key={step} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{
                    width: "100%", height: 20, borderRadius: 4, marginBottom: 4, fontSize: 9,
                    fontFamily: "var(--mono)", display: "flex", alignItems: "center", justifyContent: "center",
                    background: done ? "var(--cyan-dim)" : "var(--panel)",
                    border: `1px solid ${done ? "rgba(99,214,255,0.3)" : "var(--edge)"}`,
                    color: done ? "var(--cyan)" : "var(--t4)",
                    transition: "all 0.3s",
                  }}>{done ? "✓" : i + 1}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 7, color: "var(--t4)", letterSpacing: "0.08em" }}>{step}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Results */}
      {s.scanDone && <ScanResults dispatch={dispatch} />}
    </div>
  );
}

function ScanResults({ dispatch }) {
  const { part: r } = DATA;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="reveal">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div className="live" />
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--bio)" }}>SCAN COMPLETE · CONFIDENCE: {r.confidence}%</span>
        <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 10, marginLeft: "auto" }} onClick={() => dispatch({ type: "SCAN_CLR" })}>✕</button>
      </div>

      <div className="glass-bright" style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t3)", letterSpacing: "0.14em", marginBottom: 6 }}>IDENTIFIED COMPONENT</div>
            <div style={{ fontFamily: "var(--syne)", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{r.name}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              <Chip v="cyan">{r.brand}</Chip>
              <Chip v="dim">SKU: {r.sku}</Chip>
              <Chip v="bio">AUTHENTIC</Chip>
            </div>
          </div>
          <Ring v={r.confidence} c="var(--bio)" size={52} label="ACCURACY" />
        </div>
        <div style={{ marginTop: 12, borderTop: "1px solid var(--edge)", paddingTop: 12 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t3)", marginBottom: 6, letterSpacing: "0.12em" }}>COMPATIBLE MODELS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {r.compatible.map(m => <Chip key={m} v="dim">{m}</Chip>)}
          </div>
        </div>
      </div>

      {/* Marketplace */}
      <div className="glass" style={{ padding: 16 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t3)", letterSpacing: "0.14em", marginBottom: 12 }}>LIVE MARKETPLACE COMPARISON</div>
        {r.listings.map((l, i) => (
          <div key={i} className="row" style={{ gridTemplateColumns: "24px 1fr 70px 80px 70px", gap: 10, fontSize: 12 }}>
            <span>{l.flag}</span>
            <div>
              <div style={{ fontFamily: "var(--ui)", fontWeight: 600 }}>{l.src}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t3)" }}>{l.ship} · ★{l.rating}</div>
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 14, color: "var(--gold)" }}>${l.price}</div>
            <Chip v={l.avail === "IN STOCK" ? "bio" : l.avail === "USED-GOOD" ? "gold" : "alert"} >{l.avail}</Chip>
            {l.savings > 0 && <Chip v="violet">-{l.savings}%</Chip>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════ DASHBOARD SANDBOX ═══════════════════ */
function DashboardSandbox({ s, dispatch }) {
  const [liveKpis, setLiveKpis] = useState(DATA.kpis);

  useEffect(() => {
    const t = setInterval(() => {
      setLiveKpis(prev => prev.map(k => ({
        ...k,
        trend: [...k.trend.slice(1), k.trend[k.trend.length - 1] + (Math.random() * 10 - 5)],
      })));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <Chip v="cyan">SANDBOX</Chip>
            <Chip v="bio">INTERACTIVE</Chip>
          </div>
          <h2 style={{ fontFamily: "var(--syne)", fontSize: 22, fontWeight: 800 }}>Live Intelligence Dashboard</h2>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <LiveDot />
          <button className="btn btn-ghost" style={{ padding: "7px 14px" }}>+ Add Widget</button>
          <button className="btn btn-cyan" style={{ padding: "7px 14px" }}>Export</button>
        </div>
      </div>

      {/* KPI Cards — live */}
      <div className="reveal2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
        {liveKpis.map((k, i) => (
          <div key={k.id} className="glass widget" style={{ padding: 18, position: "relative", overflow: "hidden" }}>
            <Glow c={k.color} blur={60} op={0.06} />
            <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t3)", letterSpacing: "0.14em", marginBottom: 8 }}>{k.label}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div style={{ fontFamily: "var(--syne)", fontSize: 24, fontWeight: 700, color: k.color }}>{k.val}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)", marginTop: 3 }}>{k.delta}</div>
              </div>
              <MiniSpark data={k.trend} color={k.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="reveal3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Scanner widget */}
        <div className="glass widget" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--edge)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t2)", letterSpacing: "0.1em" }}>PART SCANNER</span>
            <Chip v="cyan">MODULE-01</Chip>
          </div>
          <div style={{ padding: 16 }}>
            <ScannerPanel s={s} dispatch={dispatch} />
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Warranty */}
          <div className="glass widget" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--edge)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t2)", letterSpacing: "0.1em" }}>WARRANTY GUARD</span>
              <Chip v="alert">3 CRITICAL</Chip>
            </div>
            <div style={{ padding: "8px 16px" }}>
              {DATA.warranties.map((w, i) => (
                <div key={i} className="row" style={{ gridTemplateColumns: "24px 1fr 50px 80px", gap: 10, fontSize: 12 }}>
                  <span>{w.icon}</span>
                  <div style={{ fontFamily: "var(--ui)", fontWeight: 500, fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{w.product}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: w.status === "CRITICAL" ? "var(--alert)" : w.status === "WARN" ? "var(--gold)" : "var(--bio)", textAlign: "right" }}>
                    {w.days}d
                  </div>
                  <Chip v={w.status === "CRITICAL" ? "alert" : w.status === "WARN" ? "gold" : "bio"}>{w.status}</Chip>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory */}
          <div className="glass widget" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--edge)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t2)", letterSpacing: "0.1em" }}>INVENTORY RADAR · 5KM</span>
              <LiveDot />
            </div>
            <div style={{ padding: "8px 16px" }}>
              {DATA.inventory.map((s, i) => (
                <div key={i} className="row" style={{ gridTemplateColumns: "1fr 50px 60px 70px", gap: 8, fontSize: 12 }}>
                  <div style={{ fontFamily: "var(--ui)", fontWeight: 500 }}>{s.store}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)" }}>{s.dist}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--gold)" }}>${s.price}</div>
                  <Chip v={s.stock === "IN STOCK" ? "bio" : s.stock === "LOW" ? "gold" : "alert"} >{s.stock}</Chip>
                </div>
              ))}
            </div>
          </div>

          {/* Performance rings */}
          <div className="glass widget" style={{ padding: 16 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t3)", letterSpacing: "0.14em", marginBottom: 14 }}>AI SYSTEM HEALTH</div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Ring v={96} c="var(--bio)"    size={48} label="ACCURACY" />
              <Ring v={84} c="var(--cyan)"   size={48} label="MATCH" />
              <Ring v={91} c="var(--violet)" size={48} label="FORECAST" />
              <Ring v={73} c="var(--gold)"   size={48} label="FRAUD" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Demand forecast */}
        <div className="glass widget" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--edge)" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t2)", letterSpacing: "0.1em" }}>PREDICTIVE DEMAND FORECAST</span>
          </div>
          <div style={{ padding: "8px 16px" }}>
            {DATA.forecast.map((f, i) => (
              <div key={i} className="row" style={{ gridTemplateColumns: "1fr 100px 60px 60px", gap: 10, fontSize: 12 }}>
                <div style={{ fontFamily: "var(--ui)", fontWeight: 500 }}>{f.part}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, height: 4, background: "var(--panel2)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${f.demand}%`, height: "100%", background: "var(--cyan)", boxShadow: "0 0 4px var(--cyan)" }} />
                  </div>
                </div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--bio)" }}>{f.trend}</div>
                <Chip v={f.risk === "LOW" ? "bio" : "gold"}>{f.risk}</Chip>
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain log */}
        <div className="glass-violet widget" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(192,132,252,0.15)" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--violet)", letterSpacing: "0.1em" }}>BLOCKCHAIN LEDGER</span>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", overflowX: "auto", padding: "4px 0" }}>
              {DATA.blockchain.map((b, i) => (
                <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  <div className="chain-block" style={{ minWidth: 130 }}>
                    <div style={{ color: "var(--violet)", marginBottom: 4 }}>#{b.type}</div>
                    <div style={{ color: "var(--t3)", fontSize: 9 }}>{b.ts}</div>
                    <div style={{ color: "var(--t4)", fontSize: 8, marginTop: 4 }}>{b.hash}</div>
                    <div style={{ marginTop: 6 }}><Chip v="bio">{b.status}</Chip></div>
                  </div>
                  {i < DATA.blockchain.length - 1 && <div className="chain-connector" />}
                </div>
              ))}
              {/* New block being mined */}
              <div className="chain-connector" />
              <div className="chain-block" style={{ minWidth: 130, borderStyle: "dashed", opacity: 0.5, animation: "glow-pulse 2s infinite" }}>
                <div style={{ color: "var(--t3)", marginBottom: 4 }}>PENDING…</div>
                <div style={{ color: "var(--t4)", fontSize: 9 }}>Mining…</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ VOICE ASSISTANT ═══════════════════ */
function VoiceAssistant({ s, dispatch }) {
  const suggestions = [
    "What's the price of a Bosch GBH chuck on Amazon?",
    "Show me warranty status for iPhone 14 Pro",
    "Find in-stock Samsung SSDs within 5km",
    "Is this part compatible with my GBH 18V-28?",
    "What's the resale value of my Sony XM5?",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 600, margin: "0 auto" }} className="reveal">
      <div style={{ textAlign: "center" }}>
        <Chip v="violet">MODULE-10</Chip>
        <h2 style={{ fontFamily: "var(--syne)", fontSize: 24, fontWeight: 800, marginTop: 10 }}>Voice & AI Assistant</h2>
        <p style={{ color: "var(--t3)", marginTop: 8, fontSize: 13 }}>Ask anything about parts, prices, warranties, or inventory</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ position: "relative" }}>
          <div className={`voice-ring ${s.voiceActive ? "active" : ""}`} onClick={() => {
            dispatch({ type: "VOICE" });
            if (!s.voiceActive) {
              const responses = ["Searching for Bosch GBH chuck…","Found 4 listings. Best price: $18.50 on AliExpress.","Samsung SSD 990 Pro is in stock at Micro Center, 3.4km away, $74.99.","iPhone 14 Pro warranty expires in 206 days. All clear."];
              let idx = 0;
              const t = setInterval(() => {
                if (idx < responses.length) dispatch({ type: "VOICE_TXT", text: responses[idx++] });
                else clearInterval(t);
              }, 2000);
            }
          }}>
            <span style={{ fontSize: 28 }}>{s.voiceActive ? "🎙" : "🎤"}</span>
          </div>
          {s.voiceActive && (
            <div style={{ position: "absolute", inset: -10, border: "1px solid var(--bio)", borderRadius: "50%", animation: "pulse-ring 1.5s ease infinite", pointerEvents: "none" }} />
          )}
        </div>

        {s.voiceText && (
          <div className="glass-bright" style={{ padding: 16, width: "100%", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--cyan)" }}>{s.voiceText}</div>
          </div>
        )}
      </div>

      <div className="glass" style={{ padding: 16 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t3)", letterSpacing: "0.14em", marginBottom: 12 }}>SUGGESTED QUERIES</div>
        {suggestions.map((q, i) => (
          <div key={i} className="row" style={{ gridTemplateColumns: "1fr auto", gap: 10, fontSize: 13 }}>
            <span>"{q}"</span>
            <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 10 }}
              onClick={() => { dispatch({ type: "VOICE" }); setTimeout(() => dispatch({ type: "VOICE_TXT", text: "Processing: " + q }), 300); }}>
              Ask
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════ ANALYTICS MODULE ═══════════════════ */
function Analytics() {
  const bars = Array.from({ length: 24 }, () => Math.random() * 100);
  const heatmap = Array.from({ length: 96 }, () => Math.random());

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="reveal">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Chip v="violet">MODULE-05</Chip>
        <h2 style={{ fontFamily: "var(--syne)", fontSize: 22, fontWeight: 800 }}>Predictive Analytics</h2>
      </div>

      {/* 24h activity bars */}
      <div className="glass" style={{ padding: 20 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t3)", letterSpacing: "0.14em", marginBottom: 16 }}>24-HOUR SCAN ACTIVITY</div>
        <div className="mini-bars" style={{ height: 80, gap: 3 }}>
          {bars.map((v, i) => (
            <div key={i} className="mini-bar" style={{
              height: `${v}%`, background: v > 75 ? "var(--cyan)" : v > 50 ? "var(--violet)" : "var(--panel2)",
              boxShadow: v > 75 ? "0 0 8px var(--cyan-glow)" : "none",
              borderRadius: "3px 3px 0 0",
              transition: "height 0.3s ease",
            }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)" }}>
          <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="glass" style={{ padding: 20 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t3)", letterSpacing: "0.14em", marginBottom: 14 }}>AI MODEL PERFORMANCE</div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Ring v={96} c="var(--bio)"    size={56} label="ACCURACY" />
            <Ring v={84} c="var(--cyan)"   size={56} label="RECALL" />
            <Ring v={91} c="var(--violet)" size={56} label="FORECAST" />
          </div>
        </div>
        <div className="glass" style={{ padding: 20 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t3)", letterSpacing: "0.14em", marginBottom: 14 }}>SCAN HEATMAP · 8 WEEKS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: 3 }}>
            {heatmap.map((v, i) => (
              <div key={i} style={{ height: 16, borderRadius: 2, background: v > 0.8 ? "var(--cyan)" : v > 0.55 ? "#1e6a8a" : v > 0.3 ? "var(--panel2)" : "var(--panel)", transition: "opacity 0.2s", cursor: "pointer" }}
                onMouseEnter={e => e.target.style.opacity = "0.7"} onMouseLeave={e => e.target.style.opacity = "1"} />
            ))}
          </div>
        </div>
      </div>

      {/* Demand forecast */}
      <div className="glass" style={{ padding: 20 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t3)", letterSpacing: "0.14em", marginBottom: 14 }}>PREDICTIVE DEMAND INDEX</div>
        {DATA.forecast.map((f, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 200px 60px 60px", gap: 16, alignItems: "center", padding: "9px 0", borderBottom: i < DATA.forecast.length - 1 ? "1px solid rgba(99,214,255,0.04)" : "none" }}>
            <div style={{ fontFamily: "var(--ui)", fontWeight: 500, fontSize: 13 }}>{f.part}</div>
            <div style={{ height: 4, background: "var(--panel2)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${f.demand}%`, height: "100%", background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan-glow)" }} />
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--bio)" }}>{f.trend}</div>
            <Chip v={f.risk === "LOW" ? "bio" : "gold"}>{f.risk}</Chip>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════ UPGRADES PANEL ═══════════════════ */
function UpgradesPanel() {
  const [showAll, setShowAll] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="reveal">
      <div>
        <Chip v="gold">ROADMAP</Chip>
        <h2 style={{ fontFamily: "var(--syne)", fontSize: 22, fontWeight: 800, marginTop: 8 }}>10 Immediate Upgrades + 100 Feature Roadmap</h2>
      </div>

      <div className="glass-gold" style={{ padding: 20 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--gold)", letterSpacing: "0.16em", marginBottom: 14 }}>10 PRIORITY PRODUCTION UPGRADES</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {DATA.upgrades10.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: i < 9 ? "1px solid rgba(251,191,36,0.08)" : "none", fontSize: 13, lineHeight: 1.5 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--gold)", minWidth: 24, paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}.</span>
              <span style={{ color: "var(--t2)" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass" style={{ padding: 20 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t3)", letterSpacing: "0.14em", marginBottom: 14 }}>
          100 NEXT-LEVEL FEATURES · SINGULARITY ROADMAP
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
          {DATA.features100.slice(0, showAll ? 100 : 20).map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: "1px solid rgba(99,214,255,0.04)", fontSize: 11, lineHeight: 1.5, color: "var(--t3)" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)", minWidth: 24 }}>{String(i + 1).padStart(3, "0")}.</span>
              {item}
            </div>
          ))}
        </div>
        <button className="btn btn-ghost" style={{ marginTop: 16, width: "100%", justifyContent: "center" }} onClick={() => setShowAll(!showAll)}>
          {showAll ? "▲ Show Less" : `▼ Show All 100 Features`}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════ NOTIFICATION PANEL ═══════════════════ */
function NotifPanel({ onClose }) {
  return (
    <div style={{
      position: "fixed", top: 57, right: 16, width: 340,
      background: "var(--surface)", border: "1px solid var(--edge2)",
      borderRadius: 12, zIndex: 1000, boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
      animation: "slide-right 0.2s ease",
      backdropFilter: "blur(20px)",
    }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--edge)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t2)", letterSpacing: "0.12em" }}>ALERTS</span>
          <Chip v="alert">{DATA.notifications.length}</Chip>
        </div>
        <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 10 }} onClick={onClose}>✕</button>
      </div>
      {DATA.notifications.map(n => (
        <div key={n.id} style={{ padding: "12px 16px", borderBottom: "1px solid var(--edge)", display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 14, marginTop: 1 }}>{n.icon}</span>
          <div>
            <div style={{ fontSize: 12, lineHeight: 1.5 }}>{n.msg}</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)", marginTop: 4 }}>{n.t} ago</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════ MASTER APP ═══════════════════ */
const VIEWS = [
  { id: "SANDBOX",   label: "Live Sandbox", icon: "⬡" },
  { id: "SCANNER",   label: "AI Scanner",   icon: "⌬" },
  { id: "ANALYTICS", label: "Analytics",    icon: "◈" },
  { id: "VOICE",     label: "AI Assistant", icon: "◉" },
  { id: "UPGRADES",  label: "Roadmap",      icon: "▲" },
];

const LANGS = ["EN","HE","ES","ZH","JA","DE"];

export default function App() {
  const [s, dispatch] = useReducer(reducer, INIT);

  return (
    <div className="grid-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
      <CSS />

      {/* ── AMBIENT GLOW ── */}
      <div style={{ position: "fixed", top: "20%", left: "10%", width: 400, height: 400, background: "var(--cyan)", filter: "blur(120px)", opacity: 0.025, pointerEvents: "none", borderRadius: "50%" }} />
      <div style={{ position: "fixed", top: "60%", right: "5%", width: 300, height: 300, background: "var(--violet)", filter: "blur(100px)", opacity: 0.03, pointerEvents: "none", borderRadius: "50%" }} />

      {/* ── HEADER ── */}
      <header style={{
        height: 57, borderBottom: "1px solid var(--edge)",
        background: "rgba(5,8,16,0.9)", backdropFilter: "blur(20px)",
        display: "flex", alignItems: "center", padding: "0 20px", gap: 20,
        position: "sticky", top: 0, zIndex: 500,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, rgba(99,214,255,0.2), rgba(192,132,252,0.1))", border: "1px solid var(--edge2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 16 }}>⬡</span>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--syne)", fontSize: 16, fontWeight: 800, letterSpacing: "0.06em" }}>
              Smart<span style={{ color: "var(--cyan)" }}>Cycle</span>
              <span style={{ color: "var(--violet)", marginLeft: 4, fontWeight: 400, fontSize: 12 }}>NEXUS</span>
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 8, color: "var(--t4)", letterSpacing: "0.18em" }}>HYPER-SINGULARITY EDITION v5.0</div>
          </div>
        </div>

        {/* Right controls */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
          <LiveDot />

          {/* XP display */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", background: "var(--panel)", borderRadius: 8, border: "1px solid var(--edge)" }}>
            <span style={{ fontSize: 12 }}>⚡</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--gold)" }}>Lv.{s.level} · {s.xp.toLocaleString()} XP</span>
          </div>

          <div style={{ width: 1, height: 20, background: "var(--edge)" }} />

          {/* Language */}
          <select value={s.lang} onChange={e => dispatch({ type: "LANG", v: e.target.value })}
            className="inp" style={{ width: 70, padding: "5px 8px" }}>
            {LANGS.map(l => <option key={l}>{l}</option>)}
          </select>

          {/* Notifications */}
          <div style={{ position: "relative" }}>
            <button className="btn btn-ghost" style={{ padding: "6px 14px" }} onClick={() => dispatch({ type: "NOTIF" })}>
              🔔
              <span style={{ position: "absolute", top: 4, right: 6, width: 8, height: 8, borderRadius: "50%", background: "var(--alert)", boxShadow: "0 0 6px var(--alert)", animation: "glow-pulse 1.5s infinite" }} />
            </button>
            {s.showNotif && <NotifPanel onClose={() => dispatch({ type: "NOTIF" })} />}
          </div>

          <button className="btn btn-solid" style={{ padding: "7px 16px" }}>+ New Scan</button>
        </div>
      </header>

      {/* ── TICKER ── */}
      <div style={{ height: 30, background: "var(--deep)", borderBottom: "1px solid var(--edge)", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ padding: "0 14px", borderRight: "1px solid var(--edge)", height: "100%", display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--cyan)", letterSpacing: "0.16em" }}>▸ INTEL</span>
        </div>
        <div className="ticker-outer" style={{ flex: 1, height: "100%", display: "flex", alignItems: "center" }}>
          <div className="ticker-inner">
            {[...DATA.ticker, ...DATA.ticker].map((t, i) => (
              <span key={i} style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)", paddingRight: 60, whiteSpace: "nowrap", letterSpacing: "0.04em" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* ── SIDEBAR ── */}
        <nav style={{
          width: 200, background: "rgba(8,13,26,0.8)", backdropFilter: "blur(12px)",
          borderRight: "1px solid var(--edge)", padding: "20px 12px",
          display: "flex", flexDirection: "column", gap: 4,
          position: "sticky", top: 57, height: "calc(100vh - 57px - 30px)", overflowY: "auto",
        }}>
          {VIEWS.map(v => (
            <button key={v.id} className={`nav-item ${s.view === v.id ? "active" : ""}`}
              onClick={() => dispatch({ type: "VIEW", v: v.id })}>
              <div className="nav-dot" />
              <span style={{ fontSize: 14, minWidth: 20 }}>{v.icon}</span>
              {v.label}
            </button>
          ))}

          <div style={{ height: 1, background: "var(--edge)", margin: "12px 0" }} />

          <div style={{ padding: "0 6px" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 8, color: "var(--t4)", letterSpacing: "0.14em", marginBottom: 10 }}>QUICK TOOLS</div>
            {["🔍 Part Search","📋 My Warranties","🗺 Nearby Stores","🔗 Blockchain","⚙ Settings"].map(item => (
              <button key={item} className="nav-item" style={{ width: "100%", fontSize: 11 }}>{item}</button>
            ))}
          </div>

          <div style={{ marginTop: "auto" }}>
            <div style={{ padding: "12px 6px", background: "var(--panel)", borderRadius: 8, border: "1px solid var(--edge)" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 8, color: "var(--t4)", marginBottom: 6, letterSpacing: "0.12em" }}>LEVEL {s.level} PROGRESS</div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${(s.xp / 3500) * 100}%` }} />
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t3)", marginTop: 5 }}>{s.xp.toLocaleString()} / 3,500 XP</div>
            </div>
          </div>
        </nav>

        {/* ── PAGE CONTENT ── */}
        <main style={{ flex: 1, padding: 24, overflowY: "auto", maxWidth: "calc(100% - 200px)" }}>
          {/* Sandbox browser chrome */}
          <div style={{ marginBottom: 20 }}>
            <div className="sandbox-bar" style={{ background: "var(--panel)", border: "1px solid var(--edge)", borderRadius: "12px 12px 0 0", borderBottom: "none" }}>
              <div className="sandbox-dot" style={{ background: "#ff5f57" }} />
              <div className="sandbox-dot" style={{ background: "#febc2e" }} />
              <div className="sandbox-dot" style={{ background: "#28c840" }} />
              <div style={{ flex: 1, background: "var(--deep)", borderRadius: 6, padding: "4px 12px", fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)" }}>
                https://smartcycle-nexus.ai/sandbox/{s.view.toLowerCase()}
              </div>
              <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--bio)" }}>● LIVE</span>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--edge)", borderTop: "none", borderRadius: "0 0 12px 12px", padding: 24 }}>
              {s.view === "SANDBOX"   && <DashboardSandbox s={s} dispatch={dispatch} />}
              {s.view === "SCANNER"   && <div><Chip v="cyan">MODULE-01</Chip><h2 style={{ fontFamily: "var(--syne)", fontSize: 22, fontWeight: 800, margin: "8px 0 20px" }}>AI Visual Part Scanner + AR Fitter</h2><ScannerPanel s={s} dispatch={dispatch} /></div>}
              {s.view === "ANALYTICS" && <Analytics />}
              {s.view === "VOICE"     && <VoiceAssistant s={s} dispatch={dispatch} />}
              {s.view === "UPGRADES"  && <UpgradesPanel />}
            </div>
          </div>
        </main>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid var(--edge)", background: "var(--deep)", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)", letterSpacing: "0.1em" }}>
          SMARTCYCLE NEXUS v5.0 · AI ENGINE ACTIVE · {s.xp.toLocaleString()} XP EARNED THIS SESSION
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          {["GDPR","SOC 2","PCI DSS","ISO 27001","BLOCKCHAIN"].map(t => (
            <Chip key={t} v="bio">{t}</Chip>
          ))}
        </div>
      </footer>
    </div>
  );
}
export default G;
