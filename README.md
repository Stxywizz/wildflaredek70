# 🔥 WILDFLARE: Wildfire & Environmental Risk Intelligence Hub

> **Fact-Based Environmental Engineering Web Application**  
> ระบบเฝ้าระวังและคำนวณดัชนีความเสี่ยงไฟป่าและมลพิษทางอากาศเชิงวิศวกรรมสิ่งแวดล้อมแบบเรียลไทม์

---

## 🎯 วัตถุประสงค์ของโครงงาน (Project Overview)
**WILDFLARE** พัฒนาขึ้นเพื่อเป็นระบบสนับสนุนการตัดสินใจและเฝ้าระวังความเสี่ยงไฟป่า (Wildfire Risk Intelligence) โดยประมวลผลจากตัวแปรทางกายภาพและอุตุนิยมวิทยาจริง ได้แก่:
- **อุณหภูมิพื้นผิว ($T$, °C)**
- **ความชื้นสัมพัทธ์ ($RH$, %)**
- **ความเร็วลม ($W$, km/h)**
- **ความเข้มข้นฝุ่นละอองขนาดไม่เกิน 2.5 ไมครอน ($\text{PM}_{2.5}$, $\mu\text{g/m}^3$)**
- **ค่าแรงดันไอพร่องในบรรยากาศ (Vapor Pressure Deficit: $VPD$, kPa)**

---

## 🧮 โมเดลสมการคำนวณความเสี่ยงไฟป่า (Risk Calculation Core)

ระบบคำนวณค่าดัชนีความเสี่ยงไฟป่า (**Wildfire Risk Index: WRI**, $0\text{–}100\%$) จากสมการถ่วงน้ำหนักตัวแปรทางกายภาพ 4 มิติ:

$$\text{WRI} = 0.40(I_{RH}) + 0.30(I_T) + 0.20(I_W) + 0.10(I_{PM})$$

พร้อมคำนวณค่า **Vapor Pressure Deficit ($VPD$)** ตามสมการของ Tetens เพื่อวัดพลังการดึงความชื้นออกจากเชื้อเพลิงใบไม้แห้ง:

$$e_s = 0.61078 \times \exp\left(\frac{17.27 \times T}{T + 237.3}\right) \text{ kPa}, \quad VPD = e_s \times \left(1 - \frac{RH}{100}\right)$$

---

## 🎓 ผู้จัดทำและที่ปรึกษาโครงงาน (Project Credits)

- **ผู้จัดทำ:** นายประพล ป้อมตรี  
  *บทบาท: ออกแบบ UI / เขียนโปรแกรม / วิเคราะห์ข้อมูล*
- **โรงเรียน:** โรงเรียนสวนกุหลาบวิทยาลัย รังสิต (ชั้นมัธยมศึกษาปีที่ 6)
- **ที่ปรึกษา:** นายธีรวงศ์ ปวิชพงศ์กุล  
  *นักศึกษาคณะวิศวกรรมศาสตร์ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง*

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
- **Frontend Structure & Styling:** HTML5, Tailwind CSS, Custom Glassmorphism UI (รองรับ Desktop, Tablet, iPad และ Smartphone)
- **Geospatial Engine:** Leaflet.js (Esri World Satellite Imagery & Dark Tactical OpenStreetMap)
- **Real-time Environmental API:** Open-Meteo Weather Forecast API & Air Quality ($\text{PM}_{2.5}$) API
