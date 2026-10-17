/**
 * WILDFLARE: Wildfire & Environmental Risk Intelligence Hub
 * Core Engineering Calculation, Real-Time Open-Meteo Telemetry & API-Key-Free Leaflet Map Engine
 */

// ============================================================================
// 1. MONITORING STATIONS & HOTSPOT DATASET
// ============================================================================
const MONITORING_STATIONS = [
  {
    id: "chiangmai",
    name: "ดอยสุเทพ-ปุย (เชียงใหม่)",
    region: "ภาคเหนือตอนบน",
    lat: 18.8048,
    lng: 98.9215,
    radiusMeters: 22000,
    fallback: { temp: 35.4, rh: 28, wind: 19.5, pm25: 68.2 },
  },
  {
    id: "maehongson",
    name: "ปาย-แม่สะเรียง (แม่ฮ่องสอน)",
    region: "ภาคเหนือฝั่งตะวันตก",
    lat: 19.3582,
    lng: 98.4405,
    radiusMeters: 25000,
    fallback: { temp: 37.8, rh: 22, wind: 24.0, pm25: 94.5 },
  },
  {
    id: "chiangrai",
    name: "ภูชี้ฟ้า-เวียงแก่น (เชียงราย)",
    region: "ภาคเหนือตอนบน",
    lat: 19.8510,
    lng: 100.4540,
    radiusMeters: 23000,
    fallback: { temp: 34.0, rh: 31, wind: 21.2, pm25: 76.0 },
  },
  {
    id: "lampang",
    name: "ดอยขุนตาล (ลำปาง-ลำพูน)",
    region: "ภาคเหนือตอนล่าง",
    lat: 18.4965,
    lng: 99.2660,
    radiusMeters: 21000,
    fallback: { temp: 36.5, rh: 26, wind: 16.8, pm25: 62.4 },
  },
  {
    id: "kanchanaburi",
    name: "เขตรักษาพันธุ์สัตว์ป่าสลักพระ (กาญจนบุรี)",
    region: "ภาคตะวันตก",
    lat: 14.2500,
    lng: 99.1800,
    radiusMeters: 24000,
    fallback: { temp: 36.9, rh: 33, wind: 18.0, pm25: 51.0 },
  },
  {
    id: "khaoyai",
    name: "อุทยานแห่งชาติเขาใหญ่ (นครราชสีมา)",
    region: "ภาคตะวันออกเฉียงเหนือ",
    lat: 14.4390,
    lng: 101.3720,
    radiusMeters: 22000,
    fallback: { temp: 30.2, rh: 54, wind: 14.0, pm25: 29.5 },
  },
  {
    id: "bangkok",
    name: "สถานีกลางกรุงเทพมหานคร (เขตเมือง)",
    region: "ภาคกลาง",
    lat: 13.7563,
    lng: 100.5018,
    radiusMeters: 18000,
    fallback: { temp: 33.5, rh: 62, wind: 11.5, pm25: 38.0 },
  },
];

// Simulated Satellite VIIRS Thermal Hotspots (จุดความร้อนดาวเทียม)
const ACTIVE_HOTSPOTS = [
  { id: "HS-101", area: "ป่าสงวนแห่งชาติแม่แตง เชียงใหม่", lat: 19.1245, lng: 98.8840, frp: 42.6, tempK: 348.2, confidence: 94 },
  { id: "HS-102", area: "อุทยานแห่งชาติดอยสุเทพ-ปุย เชียงใหม่", lat: 18.8310, lng: 98.8950, frp: 29.4, tempK: 336.5, confidence: 88 },
  { id: "HS-103", area: "เขตป่าปาย-ปางมะผ้า แม่ฮ่องสอน", lat: 19.4820, lng: 98.2910, frp: 61.8, tempK: 361.0, confidence: 98 },
  { id: "HS-104", area: "ป่าแม่สะเรียง แม่ฮ่องสอน", lat: 18.2150, lng: 97.9420, frp: 48.2, tempK: 352.1, confidence: 92 },
  { id: "HS-105", area: "ดอยผาหม่น เวียงแก่น เชียงราย", lat: 19.9120, lng: 100.5110, frp: 37.9, tempK: 341.8, confidence: 90 },
  { id: "HS-106", area: "ป่าแม่เมาะ-ขุนตาล ลำปาง", lat: 18.3910, lng: 99.6450, frp: 33.5, tempK: 339.4, confidence: 86 },
  { id: "HS-107", area: "เขตรักษาพันธุ์สัตว์ป่าสลักพระ กาญจนบุรี", lat: 14.3120, lng: 99.1250, frp: 44.1, tempK: 349.0, confidence: 93 },
  { id: "HS-108", area: "ป่าทุ่งใหญ่นเรศวร ตาก-กาญจนบุรี", lat: 15.2840, lng: 98.8910, frp: 27.0, tempK: 333.2, confidence: 84 },
  { id: "HS-109", area: "แนวรอยต่อป่าดอยอินทนนท์ เชียงใหม่", lat: 18.5680, lng: 98.5230, frp: 39.2, tempK: 344.7, confidence: 91 },
];

// ============================================================================
// 2. APPLICATION STATE
// ============================================================================
const state = {
  selectedStationId: "chiangmai",
  stationName: "ดอยสุเทพ-ปุย (เชียงใหม่)",
  lat: 18.8048,
  lng: 98.9215,
  isSimulationMode: false,
  isSatelliteLayer: true, // Default to Satellite Hybrid (100% API-key free & clear!)
  showHotspots: true,
  showZones: true,
  liveTelemetry: {
    temp: 34.2,
    rh: 32,
    wind: 18.5,
    pm25: 58.5,
  },
  currentParams: {
    temp: 34.2,
    rh: 32,
    wind: 18.5,
    pm25: 58.5,
  },
  credits: {
    devName: "ระบุชื่อผู้จัดทำโครงงาน",
    devRole: "นักเรียนระดับชั้นมัธยมศึกษาตอนปลาย",
    advisorName: "ระบุชื่ออาจารย์ที่ปรึกษา",
    schoolName: "ระบุชื่อโรงเรียน / สถานศึกษา",
  },
};

// Leaflet Map References
let map = null;
let darkOsmTileLayer = null;
let satelliteGroupLayer = null;
let selectedMarker = null;
let selectedDynamicZoneCircle = null;
let stationCirclesLayerGroup = null;
let hotspotsLayerGroup = null;

// ============================================================================
// 3. ENGINEERING RISK CALCULATION CORE (FACT-BASED MODEL)
// ============================================================================
function calculateWildfireRisk({ temp, rh, wind, pm25 }) {
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  // 1. Saturation Vapor Pressure (es) & Vapor Pressure Deficit (VPD in kPa) - Tetens Equation
  const es = 0.61078 * Math.exp((17.27 * temp) / (temp + 237.3));
  const ea = es * (rh / 100);
  const vpd = Math.max(0, es - ea);

  // 2. Sub-index 1: Relative Humidity Deficit Index (I_RH: 0-100, Weight 40%)
  const i_rh = clamp(((95 - rh) / 80) * 100, 0, 100);

  // 3. Sub-index 2: Surface Temperature Index (I_T: 0-100, Weight 30%)
  const i_temp = clamp(((temp - 15) / 28) * 100, 0, 100);

  // 4. Sub-index 3: Wind Spread Velocity Index (I_W: 0-100, Weight 20%)
  const i_wind = clamp((wind / 45) * 100, 0, 100);

  // 5. Sub-index 4: Particulate Matter Biomass Smoke Indicator (I_PM: 0-100, Weight 10%)
  const i_pm = clamp(((pm25 - 10) / 110) * 100, 0, 100);

  // Weighted Composite Score
  const rhWeighted = 0.40 * i_rh;
  const tempWeighted = 0.30 * i_temp;
  const windWeighted = 0.20 * i_wind;
  const pmWeighted = 0.10 * i_pm;

  const totalScore = clamp(rhWeighted + tempWeighted + windWeighted + pmWeighted, 0, 100);

  // Classify Risk Level (Green / Yellow / Red)
  let levelKey = "LOW";
  let levelLabel = "ปลอดภัย (ความเสี่ยงต่ำ)";
  let colorHex = "#10b981"; // Emerald
  let badgeClass = "bg-emerald-500/20 text-emerald-300 border-emerald-400/40";
  let engineeringAdvice =
    "สภาวะความชื้นในอากาศและเชื้อเพลิงธรรมชาติอยู่ในเกณฑ์ปลอดภัย โอกาสเกิดการปะทุของไฟป่าต่ำ แนะนำคงการตรวจการณ์ตามรอบปกติ";

  if (totalScore >= 70) {
    levelKey = "CRITICAL";
    levelLabel = "วิกฤตเสี่ยงไฟป่าสูง";
    colorHex = "#f43f5e"; // Rose/Red
    badgeClass = "bg-rose-500/20 text-rose-300 border-rose-400/40";
    engineeringAdvice =
      "⚠️ เตือนภัยระดับวิกฤต (สีแดง): ค่าแรงดันไอพร่อง (VPD) สูงและอากาศแห้งจัด เชื้อเพลิงใบไม้แห้งพร้อมติดไฟและลุกลามอย่างรวดเร็วตามความเร็วลม ห้ามเผาเด็ดขาดและเตรียมชุดปฏิบัติการระงับเหตุทันที";
  } else if (totalScore >= 40) {
    levelKey = "WATCH";
    levelLabel = "เฝ้าระวังพิเศษ";
    colorHex = "#fbbf24"; // Amber/Yellow
    badgeClass = "bg-amber-500/20 text-amber-300 border-amber-400/40";
    engineeringAdvice =
      "⚡ ระดับเฝ้าระวัง (สีเหลือง): ความชื้นสัมพัทธ์เริ่มลดต่ำลงและอุณหภูมิสะสมตัวสูงขึ้น เชื้อเพลิงขนาดเล็กเริ่มแห้ง ควรจัดทำแนวกันไฟและเฝ้าระวังจุดความร้อนบริเวณรอยต่อป่าไม้";
  }

  return {
    totalScore: Number(totalScore.toFixed(1)),
    vpd: Number(vpd.toFixed(2)),
    subIndices: {
      i_rh: Number(i_rh.toFixed(1)),
      i_temp: Number(i_temp.toFixed(1)),
      i_wind: Number(i_wind.toFixed(1)),
      i_pm: Number(i_pm.toFixed(1)),
    },
    weighted: {
      rh: Number(rhWeighted.toFixed(1)),
      temp: Number(tempWeighted.toFixed(1)),
      wind: Number(windWeighted.toFixed(1)),
      pm: Number(pmWeighted.toFixed(1)),
    },
    levelKey,
    levelLabel,
    colorHex,
    badgeClass,
    engineeringAdvice,
  };
}

// ============================================================================
// 4. REAL-TIME OPEN-METEO WEATHER & AIR QUALITY API FETCHER
// ============================================================================
async function fetchEnvironmentalData(lat, lng, fallbackData = null) {
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lng.toFixed(4)}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;
  const airUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat.toFixed(4)}&longitude=${lng.toFixed(4)}&current=pm2_5`;

  try {
    const [weatherRes, airRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(airUrl),
    ]);

    if (!weatherRes.ok) throw new Error("Weather API HTTP error");
    const weatherJson = await weatherRes.json();
    const airJson = airRes.ok ? await airRes.json() : null;

    const temp = weatherJson?.current?.temperature_2m ?? (fallbackData?.temp || 33.5);
    const rh = weatherJson?.current?.relative_humidity_2m ?? (fallbackData?.rh || 42);
    const wind = weatherJson?.current?.wind_speed_10m ?? (fallbackData?.wind || 15.0);
    const pm25 = airJson?.current?.pm2_5 ?? (fallbackData?.pm25 || 45.0);

    return {
      temp: Number(Number(temp).toFixed(1)),
      rh: Math.round(Number(rh)),
      wind: Number(Number(wind).toFixed(1)),
      pm25: Number(Number(pm25).toFixed(1)),
      isLiveApi: true,
    };
  } catch {
    return {
      temp: fallbackData?.temp ?? 34.2,
      rh: fallbackData?.rh ?? 32,
      wind: fallbackData?.wind ?? 18.5,
      pm25: fallbackData?.pm25 ?? 58.5,
      isLiveApi: false,
    };
  }
}

// ============================================================================
// 5. COORDINATE FORMATTING HELPER (DECIMAL -> DMS)
// ============================================================================
function toDMS(deg, isLat) {
  const absolute = Math.abs(deg);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(1);
  const direction = isLat ? (deg >= 0 ? "N" : "S") : (deg >= 0 ? "E" : "W");
  return `${degrees}°${String(minutes).padStart(2, "0")}'${seconds}"${direction}`;
}

// ============================================================================
// 6. LEAFLET INTERACTIVE MAP INITIALIZATION (100% API-KEY FREE)
// ============================================================================
function initMap() {
  map = L.map("map", {
    center: [state.lat, state.lng],
    zoom: 7,
    zoomControl: true,
  });

  // 1. Satellite Hybrid Layer (Esri World Imagery + Boundaries & Places Overlay - NO API KEY REQUIRED)
  const esriSatellite = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri, USGS, NOAA",
      maxZoom: 18,
    }
  );
  const esriLabels = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 18,
      opacity: 0.85,
    }
  );
  satelliteGroupLayer = L.layerGroup([esriSatellite, esriLabels]);

  // 2. Dark Tactical Layer (Official OpenStreetMap with Dark CSS Filter - NO API KEY REQUIRED)
  darkOsmTileLayer = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      className: "dark-tactical-tiles",
    }
  );

  // Add default Satellite Hybrid Layer
  satelliteGroupLayer.addTo(map);

  stationCirclesLayerGroup = L.layerGroup().addTo(map);
  hotspotsLayerGroup = L.layerGroup().addTo(map);

  renderStationZoneCircles();
  renderHotspots();
  updateSelectedMapMarker();

  // Map Click Handler -> Pick any coordinate
  map.on("click", async (e) => {
    const { lat, lng } = e.latlng;
    state.selectedStationId = null;
    renderPresetButtons();
    await selectCoordinate(
      lat,
      lng,
      `พิกัดที่เลือก (${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E)`,
      null,
      false
    );
  });
}

function renderStationZoneCircles() {
  stationCirclesLayerGroup.clearLayers();
  if (!state.showZones) return;

  MONITORING_STATIONS.forEach((st) => {
    const risk = calculateWildfireRisk(st.fallback);
    const circle = L.circle([st.lat, st.lng], {
      radius: st.radiusMeters,
      color: risk.colorHex,
      weight: 2,
      fillColor: risk.colorHex,
      fillOpacity: 0.22,
    });

    circle.bindTooltip(
      `<div class="text-xs font-sans"><strong>${st.name}</strong><br/>ความเสี่ยงพื้นฐาน: ${risk.totalScore}% (${risk.levelLabel})</div>`,
      { sticky: true }
    );

    circle.on("click", (ev) => {
      L.DomEvent.stopPropagation(ev);
      selectStationById(st.id);
    });

    circle.addTo(stationCirclesLayerGroup);
  });
}

function renderHotspots() {
  hotspotsLayerGroup.clearLayers();
  document.getElementById("hotspot-count-badge").textContent = ACTIVE_HOTSPOTS.length;

  if (!state.showHotspots) return;

  ACTIVE_HOTSPOTS.forEach((hs) => {
    const icon = L.divIcon({
      className: "custom-hotspot-icon",
      html: `
        <div class="hotspot-marker">
          <div class="hotspot-marker-pulse"></div>
          <div class="hotspot-marker-core"></div>
        </div>
      `,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    const marker = L.marker([hs.lat, hs.lng], { icon });
    marker.bindPopup(`
      <div class="p-1 space-y-2 min-w-[215px] font-sans">
        <div class="flex items-center justify-between border-b border-slate-700 pb-1.5">
          <span class="text-[11px] font-mono text-orange-400 font-bold">🔥 HOTSPOT #${hs.id}</span>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">Conf: ${hs.confidence}%</span>
        </div>
        <div class="text-xs font-semibold text-white">${hs.area}</div>
        <div class="text-[11px] font-mono text-slate-300 space-y-0.5">
          <div>พิกัด: ${hs.lat.toFixed(4)}°N, ${hs.lng.toFixed(4)}°E</div>
          <div>พลังงานความร้อน (FRP): <span class="text-amber-300">${hs.frp} MW</span></div>
          <div>อุณหภูมิพื้นผิว: <span class="text-rose-300">${hs.tempK} K</span></div>
        </div>
        <button
          onclick="window.inspectHotspot('${hs.id}')"
          class="w-full mt-1 py-1.5 px-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs transition-all"
        >
          วิเคราะห์ความเสี่ยงจุดนี้
        </button>
      </div>
    `);

    marker.addTo(hotspotsLayerGroup);
  });
}

window.inspectHotspot = async function (hotspotId) {
  const hs = ACTIVE_HOTSPOTS.find((h) => h.id === hotspotId);
  if (!hs) return;
  map.closePopup();
  state.selectedStationId = null;
  renderPresetButtons();
  await selectCoordinate(
    hs.lat,
    hs.lng,
    `จุดความร้อน ${hs.id}: ${hs.area}`,
    { temp: 38.5, rh: 23, wind: 22.0, pm25: 92.0 },
    true
  );
};

function updateSelectedMapMarker() {
  if (!map) return;

  const risk = calculateWildfireRisk(state.currentParams);

  if (selectedMarker) {
    selectedMarker.setLatLng([state.lat, state.lng]);
  } else {
    const pinIcon = L.divIcon({
      className: "custom-selected-pin",
      html: `<div class="selected-node-pin"></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
    selectedMarker = L.marker([state.lat, state.lng], {
      icon: pinIcon,
      zIndexOffset: 1000,
    }).addTo(map);
  }

  if (selectedDynamicZoneCircle) {
    selectedDynamicZoneCircle.setLatLng([state.lat, state.lng]);
    selectedDynamicZoneCircle.setStyle({
      color: risk.colorHex,
      fillColor: risk.colorHex,
    });
  } else {
    selectedDynamicZoneCircle = L.circle([state.lat, state.lng], {
      radius: 16000,
      color: risk.colorHex,
      weight: 2.5,
      dashArray: "6, 6",
      fillColor: risk.colorHex,
      fillOpacity: 0.28,
    }).addTo(map);
  }
}

// ============================================================================
// 7. UI RENDERING & SYNCHRONIZATION
// ============================================================================
function renderPresetButtons() {
  const container = document.getElementById("station-presets");
  container.innerHTML = "";

  MONITORING_STATIONS.forEach((st) => {
    const isSelected = st.id === state.selectedStationId;
    const btn = document.createElement("button");
    btn.className = isSelected
      ? "px-3.5 py-1.5 rounded-full text-xs font-display font-medium bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all whitespace-nowrap"
      : "px-3.5 py-1.5 rounded-full text-xs font-display font-medium bg-slate-900/90 text-slate-300 border border-slate-700/80 hover:border-cyan-400/50 hover:text-white transition-all whitespace-nowrap";
    btn.textContent = st.name;
    btn.addEventListener("click", () => selectStationById(st.id));
    container.appendChild(btn);
  });
}

function updateUI() {
  const { temp, rh, wind, pm25 } = state.currentParams;
  const risk = calculateWildfireRisk(state.currentParams);

  // 1. Update Hero Card
  document.getElementById("hero-station-name").textContent = state.stationName;
  const heroScoreEl = document.getElementById("hero-risk-score");
  heroScoreEl.textContent = `${risk.totalScore}% (${risk.levelLabel})`;
  heroScoreEl.style.color = risk.colorHex;
  document.getElementById("hero-temp-rh").textContent = `${temp.toFixed(1)} °C / ${rh}% RH`;
  document.getElementById("hero-pm25").textContent = `${pm25.toFixed(1)} µg/m³`;
  document.getElementById("hero-coords").textContent = `${state.lat.toFixed(4)}°N, ${state.lng.toFixed(4)}°E`;

  // 2. Update Mode Pill
  const modeDot = document.getElementById("mode-dot");
  const modeText = document.getElementById("mode-text");
  const heroBadge = document.getElementById("hero-api-badge");
  if (state.isSimulationMode) {
    modeDot.className = "w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0";
    modeText.textContent = "โหมด: จำลองปรับค่าตัวแปร (Simulation)";
    heroBadge.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-400/30 shrink-0";
    heroBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span><span>จำลองตัวแปร</span>`;
  } else {
    modeDot.className = "w-2 h-2 rounded-full bg-emerald-400 shrink-0";
    modeText.textContent = "โหมด: ข้อมูลจริงเรียลไทม์ (Live API)";
    heroBadge.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 shrink-0";
    heroBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span><span>ออนไลน์</span>`;
  }

  // 3. Update Risk Gauge & Core Card
  const circumference = 2 * Math.PI * 50; // 314.16
  const offset = circumference - (risk.totalScore / 100) * circumference;
  const gaugeCircle = document.getElementById("risk-gauge-circle");
  gaugeCircle.style.strokeDashoffset = offset.toFixed(2);
  gaugeCircle.setAttribute("stroke", risk.colorHex);

  document.getElementById("risk-score-number").textContent = risk.totalScore.toFixed(1);
  document.getElementById("risk-vpd-tag").textContent = `VPD: ${risk.vpd} kPa`;

  const riskBadgePill = document.getElementById("risk-badge-pill");
  riskBadgePill.className = `px-3 py-1 rounded-full text-xs font-display font-semibold border whitespace-nowrap ${risk.badgeClass}`;
  riskBadgePill.textContent = risk.levelLabel;

  // Factor Bars
  document.getElementById("factor-rh-score").textContent = `${risk.weighted.rh.toFixed(1)} / 40`;
  document.getElementById("factor-rh-bar").style.width = `${risk.subIndices.i_rh}%`;

  document.getElementById("factor-temp-score").textContent = `${risk.weighted.temp.toFixed(1)} / 30`;
  document.getElementById("factor-temp-bar").style.width = `${risk.subIndices.i_temp}%`;

  document.getElementById("factor-wind-score").textContent = `${risk.weighted.wind.toFixed(1)} / 20`;
  document.getElementById("factor-wind-bar").style.width = `${risk.subIndices.i_wind}%`;

  document.getElementById("factor-pm-score").textContent = `${risk.weighted.pm.toFixed(1)} / 10`;
  document.getElementById("factor-pm-bar").style.width = `${risk.subIndices.i_pm}%`;

  document.getElementById("risk-interpretation-box").textContent = risk.engineeringAdvice;

  // 4. Update Sliders & Labels
  document.getElementById("slider-temp").value = temp;
  document.getElementById("slider-temp-val").textContent = `${temp.toFixed(1)} °C`;

  document.getElementById("slider-rh").value = rh;
  document.getElementById("slider-rh-val").textContent = `${rh} %`;

  document.getElementById("slider-wind").value = wind;
  document.getElementById("slider-wind-val").textContent = `${wind.toFixed(1)} km/h`;

  document.getElementById("slider-pm25").value = pm25;
  document.getElementById("slider-pm25-val").textContent = `${pm25.toFixed(1)} µg/m³`;

  // 5. Update 4 Telemetry Cards
  document.getElementById("card-temp-value").textContent = temp.toFixed(1);
  document.getElementById("card-temp-status").textContent =
    temp >= 36
      ? "🔥 อุณหภูมิสูงจัด เร่งการอบความร้อนเชื้อเพลิง"
      : temp >= 30
      ? "☀️ อากาศร้อนปานกลาง เอื้อต่อการระเหยน้ำ"
      : "🌿 อุณหภูมิอยู่ในเกณฑ์ปกติ การสะสมความร้อนต่ำ";

  document.getElementById("card-rh-value").textContent = rh;
  document.getElementById("card-rh-status").textContent =
    rh < 35
      ? "⚠️ อากาศแห้งวิกฤต (<35%) ใบไม้แห้งติดไฟง่าย"
      : rh < 55
      ? "⚡ ความชื้นปานกลาง เริ่มสูญเสียความชื้นเชื้อเพลิง"
      : "💧 ความชื้นสูง ช่วยชะลอการปะทุของไฟป่า";

  document.getElementById("card-wind-value").textContent = wind.toFixed(1);
  document.getElementById("card-wind-status").textContent =
    wind >= 25
      ? "💨 ลมแรงมาก เสี่ยงเกิดลูกไฟปลิวข้ามแนวกันไฟ"
      : wind >= 12
      ? "🍃 ลมพัดปานกลาง เติมออกซิเจนหนุนหน้าไฟ"
      : "🫧 ลมสงบ อัตราการลุกลามของแนวไฟต่ำ";

  document.getElementById("card-pm25-value").textContent = pm25.toFixed(1);
  const pmStatusEl = document.getElementById("card-pm25-status");
  if (pm25 > 75) {
    pmStatusEl.className = "text-xs text-rose-400 mt-2 font-medium";
    pmStatusEl.textContent = "🚨 เกินเกณฑ์วิกฤต (>75 µg/m³) มีการเผาไหม้หนาแน่น";
  } else if (pm25 > 37.5) {
    pmStatusEl.className = "text-xs text-amber-300 mt-2";
    pmStatusEl.textContent = "⚠️ เริ่มมีผลกระทบต่อสุขภาพ (>37.5 µg/m³)";
  } else {
    pmStatusEl.className = "text-xs text-emerald-400 mt-2";
    pmStatusEl.textContent = "✅ คุณภาพอากาศอยู่ในเกณฑ์ดี-ปานกลาง";
  }

  // 6. Update Map Footer & Emergency Dispatch Coordinates
  const decStr = `${state.lat.toFixed(6)}, ${state.lng.toFixed(6)}`;
  const dmsStr = `${toDMS(state.lat, true)} ${toDMS(state.lng, false)}`;

  document.getElementById("map-footer-location").textContent = state.stationName;
  document.getElementById("map-footer-gps").textContent = `LAT: ${state.lat.toFixed(6)} | LNG: ${state.lng.toFixed(6)}`;

  document.getElementById("emg-station-name").textContent = state.stationName;
  document.getElementById("emg-decimal-coords").textContent = decStr;
  document.getElementById("emg-dms-coords").textContent = dmsStr;
  document.getElementById("btn-open-gmaps").href = `https://www.google.com/maps?q=${state.lat.toFixed(6)},${state.lng.toFixed(6)}`;

  updateSelectedMapMarker();
}

// ============================================================================
// 8. STATION & COORDINATE SELECTION WORKFLOW
// ============================================================================
async function selectStationById(stationId) {
  const st = MONITORING_STATIONS.find((s) => s.id === stationId);
  if (!st) return;

  state.selectedStationId = st.id;
  renderPresetButtons();
  await selectCoordinate(st.lat, st.lng, st.name, st.fallback, true);
}

async function selectCoordinate(lat, lng, labelName, fallbackData = null, panMap = true) {
  state.lat = lat;
  state.lng = lng;
  state.stationName = labelName;
  state.isSimulationMode = false;

  if (panMap && map) {
    map.flyTo([lat, lng], 9, { duration: 1.0 });
  }

  const telemetry = await fetchEnvironmentalData(lat, lng, fallbackData);
  state.liveTelemetry = {
    temp: telemetry.temp,
    rh: telemetry.rh,
    wind: telemetry.wind,
    pm25: telemetry.pm25,
  };
  state.currentParams = { ...state.liveTelemetry };

  const now = new Date();
  document.getElementById("hero-updated-time").textContent = now.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  updateUI();
}

// ============================================================================
// 9. EVENT LISTENERS & INITIALIZATION
// ============================================================================
function attachEventListeners() {
  // Mobile Navigation Menu
  const mobileBtn = document.getElementById("btn-mobile-menu");
  const mobilePanel = document.getElementById("mobile-menu-panel");
  mobileBtn.addEventListener("click", () => {
    mobilePanel.classList.toggle("hidden");
  });
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => mobilePanel.classList.add("hidden"));
  });

  // Sliders for What-If Simulation
  const sliders = [
    { id: "slider-temp", key: "temp" },
    { id: "slider-rh", key: "rh" },
    { id: "slider-wind", key: "wind" },
    { id: "slider-pm25", key: "pm25" },
  ];

  sliders.forEach(({ id, key }) => {
    const el = document.getElementById(id);
    el.addEventListener("input", (e) => {
      state.isSimulationMode = true;
      state.currentParams[key] = Number(e.target.value);
      updateUI();
    });
  });

  // Scenario Buttons
  document.querySelectorAll(".scenario-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const scenario = btn.getAttribute("data-scenario");
      state.isSimulationMode = true;
      if (scenario === "crisis") {
        state.currentParams = { temp: 41.0, rh: 18, wind: 28.0, pm25: 135.0 };
      } else if (scenario === "windy") {
        state.currentParams = { temp: 35.5, rh: 29, wind: 38.0, pm25: 72.0 };
      } else if (scenario === "rainy") {
        state.currentParams = { temp: 25.0, rh: 82, wind: 8.5, pm25: 16.0 };
      }
      updateUI();
    });
  });

  // Reset to Live API Button
  document.getElementById("btn-reset-live").addEventListener("click", () => {
    state.isSimulationMode = false;
    state.currentParams = { ...state.liveTelemetry };
    updateUI();
  });

  // Refresh API Button
  document.getElementById("btn-refresh-api").addEventListener("click", async () => {
    await selectCoordinate(state.lat, state.lng, state.stationName, state.liveTelemetry, false);
  });

  // Map Overlay Toggles
  document.getElementById("btn-toggle-hotspots").addEventListener("click", () => {
    state.showHotspots = !state.showHotspots;
    renderHotspots();
  });

  document.getElementById("btn-toggle-zones").addEventListener("click", () => {
    state.showZones = !state.showZones;
    renderStationZoneCircles();
  });

  // Switch between Satellite Hybrid & Dark Tactical Map (Both 100% API-key free)
  document.getElementById("btn-toggle-satellite").addEventListener("click", () => {
    state.isSatelliteLayer = !state.isSatelliteLayer;
    const label = document.getElementById("map-style-label");
    if (state.isSatelliteLayer) {
      map.removeLayer(darkOsmTileLayer);
      satelliteGroupLayer.addTo(map);
      label.textContent = "สลับเป็นแผนที่มืด";
    } else {
      map.removeLayer(satelliteGroupLayer);
      darkOsmTileLayer.addTo(map);
      label.textContent = "สลับเป็นภาพดาวเทียม";
    }
  });

  // Geolocation Button
  document.getElementById("btn-locate-me").addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("เบราว์เซอร์ของคุณไม่รองรับการดึงพิกัด GPS");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        state.selectedStationId = null;
        renderPresetButtons();
        await selectCoordinate(latitude, longitude, "ตำแหน่งปัจจุบันของคุณ (GPS)", null, true);
      },
      () => {
        alert("ไม่สามารถเข้าถึงตำแหน่ง GPS ได้ กรุณาอนุญาตการเข้าถึงตำแหน่ง หรือแตะเลือกจุดบนแผนที่โดยตรง");
      }
    );
  });

  // Copy Emergency Incident Report Button
  document.getElementById("btn-copy-report").addEventListener("click", async () => {
    const risk = calculateWildfireRisk(state.currentParams);
    const { temp, rh, wind, pm25 } = state.currentParams;
    const reportText = [
      "🚨 [WILDFLARE RISK REPORT]",
      `พื้นที่: ${state.stationName}`,
      `พิกัด GPS (WGS84): ${state.lat.toFixed(6)}, ${state.lng.toFixed(6)}`,
      `ดัชนีความเสี่ยงไฟป่า (WRI): ${risk.totalScore}% — ${risk.levelLabel}`,
      `พารามิเตอร์: อุณหภูมิ ${temp.toFixed(1)}°C | ความชื้นสัมพัทธ์ ${rh}% | ลม ${wind.toFixed(1)} km/h | PM2.5 ${pm25.toFixed(1)} µg/m³ | VPD ${risk.vpd} kPa`,
      `แผนที่: https://www.google.com/maps?q=${state.lat.toFixed(6)},${state.lng.toFixed(6)}`,
      `สายด่วนแจ้งเหตุไฟป่า กรมอุทยานฯ: 1362`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(reportText);
      const btnText = document.getElementById("copy-btn-text");
      btnText.textContent = "คัดลอกพิกัดสำเร็จ! ✓";
      setTimeout(() => {
        btnText.textContent = "คัดลอกพิกัดแจ้งเหตุ";
      }, 2500);
    } catch {
      alert(reportText);
    }
  });

  // Formula Modal Controls
  const formulaModal = document.getElementById("formula-modal");
  const openFormulaModal = () => {
    formulaModal.classList.remove("hidden");
    formulaModal.classList.add("flex");
  };
  const closeFormulaModal = () => {
    formulaModal.classList.add("hidden");
    formulaModal.classList.remove("flex");
  };
  document.getElementById("btn-open-formula-modal").addEventListener("click", openFormulaModal);
  document.getElementById("btn-close-formula-modal").addEventListener("click", closeFormulaModal);
  document.getElementById("btn-close-formula-modal-bottom").addEventListener("click", closeFormulaModal);
  formulaModal.addEventListener("click", (e) => {
    if (e.target === formulaModal) closeFormulaModal();
  });
}

// Initialize App on DOM Ready
document.addEventListener("DOMContentLoaded", async () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  renderPresetButtons();
  initMap();
  attachEventListeners();
  await selectStationById("chiangmai");
});
