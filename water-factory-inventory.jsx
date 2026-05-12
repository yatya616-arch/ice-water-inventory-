import { useState, useEffect } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#070d1a",
  surface: "#0d1525",
  card: "#111e30",
  cardHover: "#162440",
  border: "#1a2e4a",
  borderLight: "#1e3a5f",
  accent: "#0ea5e9",
  accentDark: "#0369a1",
  accentGlow: "rgba(14,165,233,0.12)",
  success: "#10b981",
  successGlow: "rgba(16,185,129,0.12)",
  warning: "#f59e0b",
  warningGlow: "rgba(245,158,11,0.12)",
  danger: "#ef4444",
  dangerGlow: "rgba(239,68,68,0.12)",
  text: "#e2e8f0",
  textMuted: "#64748b",
  textDim: "#94a3b8",
};

const inputStyle = {
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  padding: "10px 14px",
  color: C.text,
  fontSize: 14,
  fontFamily: "inherit",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
};

const btnPrimary = {
  background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`,
  border: "none", borderRadius: 9, padding: "10px 20px",
  color: "#fff", fontSize: 14, fontWeight: 700,
  fontFamily: "inherit", cursor: "pointer",
};

const btnSuccess = {
  ...btnPrimary,
  background: `linear-gradient(135deg, ${C.success}, #059669)`,
};

const btnDanger = {
  ...btnPrimary,
  background: `linear-gradient(135deg, ${C.danger}, #b91c1c)`,
  padding: "7px 14px", fontSize: 12,
};

const btnGhost = {
  background: C.surface, border: `1px solid ${C.border}`,
  borderRadius: 8, padding: "9px 18px", color: C.textDim,
  fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
};

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const INITIAL_MATERIALS = [
  { id: "m1", name: "كبسولة ١.٥ لتر", unit: "كبسولة", line: "bottles" },
  { id: "m2", name: "كبسولة ٥٠٠ مل", unit: "كبسولة", line: "bottles" },
  { id: "m3", name: "كبسولة ٢٠٠ مل طويل", unit: "كبسولة", line: "bottles" },
  { id: "m4", name: "كبسولة ٢٠٠ مل طابة", unit: "كبسولة", line: "bottles" },
  { id: "m5", name: "ليبل ١.٥ لتر", unit: "قطعة", line: "bottles" },
  { id: "m6", name: "ليبل ٥٠٠ مل", unit: "قطعة", line: "bottles" },
  { id: "m7", name: "ليبل ٢٠٠ مل طويل", unit: "قطعة", line: "bottles" },
  { id: "m8", name: "ليبل ٢٠٠ مل طابة", unit: "قطعة", line: "bottles" },
  { id: "m9", name: "شرنق كبير", unit: "متر", line: "bottles" },
  { id: "m10", name: "شرنق صغير", unit: "متر", line: "bottles" },
  { id: "m11", name: "غطاء صيني (١.٥ل)", unit: "قطعة", line: "bottles" },
  { id: "m12", name: "غطاء عادي", unit: "قطعة", line: "bottles" },
  { id: "m13", name: "كرتون قواطع", unit: "كرتونة", line: "bottles" },
  { id: "m14", name: "زوايا عبوات", unit: "قطعة", line: "bottles" },
  { id: "m15", name: "كاسات", unit: "كاسة", line: "cups" },
  { id: "m16", name: "متلايز", unit: "قطعة", line: "cups" },
  { id: "m17", name: "كرتون كاسات ٦٠", unit: "كرتونة", line: "cups" },
  { id: "m18", name: "كرتون كاسات ٤٠", unit: "كرتونة", line: "cups" },
  { id: "m19", name: "سترتش", unit: "رول", line: "cups" },
  { id: "m20", name: "زوايا كاسات", unit: "قطعة", line: "cups" },
];

const INITIAL_PRODUCTS = [
  {
    id: "p1", name: "١.٥ لتر", line: "bottles", perPallet: 672, icon: "🍶",
    materials: { m1: 1, m5: 1, m9: 1, m11: 1, m13: 1, m14: 1 }
  },
  {
    id: "p2", name: "٥٠٠ مل", line: "bottles", perPallet: 1800, icon: "💧",
    materials: { m2: 1, m6: 1, m10: 1, m12: 1, m13: 1, m14: 1 }
  },
  {
    id: "p3", name: "٢٠٠ مل طويل", line: "bottles", perPallet: 3840, icon: "🥤",
    materials: { m3: 1, m7: 1, m10: 1, m12: 1, m13: 1, m14: 1 }
  },
  {
    id: "p4", name: "٢٠٠ مل طابة", line: "bottles", perPallet: 2800, icon: "🫙",
    materials: { m4: 1, m8: 1, m9: 1, m12: 1, m13: 1, m14: 1 }
  },
  {
    id: "p5", name: "كاسات ٦٠", line: "cups", perPallet: 3240, icon: "☕",
    materials: { m15: 1, m16: 1, m17: 1, m19: 1, m20: 1 }
  },
  {
    id: "p6", name: "كاسات ٤٠", line: "cups", perPallet: 3360, icon: "🥛",
    materials: { m15: 1, m16: 1, m18: 1, m19: 1, m20: 1 }
  },
];

const INITIAL_STOCK = Object.fromEntries(INITIAL_MATERIALS.map(m => [m.id, 0]));
const INITIAL_FINISHED = Object.fromEntries(INITIAL_PRODUCTS.map(p => [p.id, 0]));

// ─── TABS ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "dashboard", label: "لوحة التحكم", icon: "◈" },
  { id: "incoming", label: "الوارد", icon: "↓" },
  { id: "production", label: "الإنتاج", icon: "⚙" },
  { id: "stock", label: "المخزون", icon: "▦" },
  { id: "reports", label: "التقارير", icon: "≡" },
  { id: "settings", label: "الإعدادات", icon: "⚙" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function today() {
  return new Date().toLocaleDateString("ar-SA");
}

function uid() {
  return "x" + Math.random().toString(36).slice(2, 9);
}

function Badge({ children, color, glow }) {
  return (
    <span style={{
      background: glow || color + "22",
      color: color,
      borderRadius: 6,
      padding: "3px 10px",
      fontSize: 12,
      fontWeight: 700,
    }}>{children}</span>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      ...style,
    }}>{children}</div>
  );
}

function SectionTitle({ title, sub }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{title}</h2>
      {sub && <p style={{ margin: "4px 0 0", color: C.textMuted, fontSize: 13 }}>{sub}</p>}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [stock, setStock] = useState(INITIAL_STOCK);
  const [finished, setFinished] = useState(INITIAL_FINISHED);
  const [incomingLog, setIncomingLog] = useState([]);
  const [productionLog, setProductionLog] = useState([]);
  const [materialSuppliers, setMaterialSuppliers] = useState({});
  const [productionWasteLog, setProductionWasteLog] = useState([]);

  // Sync stock when materials change (add new keys)
  useEffect(() => {
    setStock(prev => {
      const next = { ...prev };
      materials.forEach(m => { if (!(m.id in next)) next[m.id] = 0; });
      return next;
    });
  }, [materials]);

  useEffect(() => {
    setFinished(prev => {
      const next = { ...prev };
      products.forEach(p => { if (!(p.id in next)) next[p.id] = 0; });
      return next;
    });
  }, [products]);

  function addIncoming(materialId, qty, note, supplier, measurementUnit) {
    const mat = materials.find(m => m.id === materialId);
    setStock(prev => ({ ...prev, [materialId]: (prev[materialId] || 0) + qty }));
    setMaterialSuppliers(prev => ({ ...prev, [materialId]: supplier }));
    setIncomingLog(prev => [{
      id: uid(), date: today(), materialId,
      materialName: mat?.name, qty, note, supplier, measurementUnit
    }, ...prev]);
  }

  function addProduction(productId, pallets, actualUsed = null) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return null;
    const units = prod.perPallet * pallets;
    const consumed = {};
    const waste = {};
    const productionWaste = {};

    Object.entries(prod.materials).forEach(([matId, perUnit]) => {
      const calculated = units * perUnit;
      consumed[matId] = calculated;
      const actual = actualUsed && actualUsed[matId] ? Number(actualUsed[matId]) : calculated;
      waste[matId] = Math.max(0, actual - calculated);
      productionWaste[matId] = waste[matId];
    });

    // Deduct from stock (using actual amounts if provided)
    setStock(prev => {
      const next = { ...prev };
      Object.entries(prod.materials).forEach(([matId, perUnit]) => {
        const actual = actualUsed && actualUsed[matId] ? Number(actualUsed[matId]) : consumed[matId];
        next[matId] = Math.max(0, (next[matId] || 0) - actual);
      });
      return next;
    });

    // Add to finished
    setFinished(prev => ({ ...prev, [productId]: (prev[productId] || 0) + pallets }));

    // Record waste
    if (actualUsed && Object.values(productionWaste).some(w => w > 0)) {
      setProductionWasteLog(prev => [{
        id: uid(), date: today(), productId,
        productName: prod.name, pallets, waste: productionWaste, consumed, actualUsed,
      }, ...prev]);
    }

    const entry = {
      id: uid(), date: today(), productId,
      productName: prod.name, pallets, units, consumed, waste, actualUsed,
    };
    setProductionLog(prev => [entry, ...prev]);
    return entry;
  }

  const props = { materials, setMaterials, products, setProducts, stock, finished, incomingLog, productionLog, addIncoming, addProduction, materialSuppliers, productionWasteLog };

  return (
    <div style={{
      minHeight: "100vh", background: C.bg, color: C.text,
      fontFamily: "'Tajawal','Cairo',sans-serif", direction: "rtl",
    }}>
      {/* Header */}
      <div style={{
        background: C.surface, borderBottom: `1px solid ${C.border}`,
        padding: "0 28px", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 64,
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 30px rgba(0,0,0,0.5)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40,
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`,
            borderRadius: 11, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 22,
            boxShadow: `0 0 20px ${C.accentGlow}`,
          }}>💧</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>نظام إدارة المخزون</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>ICE WATER</div>
          </div>
        </div>
        <div style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 8, padding: "6px 16px", fontSize: 13, color: C.textDim,
        }}>{today()}</div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        {/* Sidebar */}
        <div style={{
          width: 210, background: C.surface,
          borderLeft: `1px solid ${C.border}`,
          padding: "20px 0", display: "flex", flexDirection: "column", gap: 2,
          flexShrink: 0,
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 22px",
              background: tab === t.id ? C.accentGlow : "transparent",
              border: "none",
              borderRight: `3px solid ${tab === t.id ? C.accent : "transparent"}`,
              color: tab === t.id ? C.accent : C.textMuted,
              cursor: "pointer", fontSize: 14, fontFamily: "inherit",
              fontWeight: tab === t.id ? 700 : 400,
              transition: "all 0.18s", textAlign: "right",
            }}>
              <span style={{ fontSize: 17, minWidth: 22, opacity: tab === t.id ? 1 : 0.6 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 28, overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}>
          {tab === "dashboard" && <Dashboard {...props} />}
          {tab === "incoming" && <IncomingPage {...props} />}
          {tab === "production" && <ProductionPage {...props} />}
          {tab === "stock" && <StockPage {...props} />}
          {tab === "reports" && <ReportsPage {...props} />}
          {tab === "settings" && <SettingsPage {...props} />}
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ stock, finished, products, materials, productionLog, incomingLog, productionWasteLog }) {
  const totalFinishedPallets = Object.values(finished).reduce((a, b) => a + b, 0);
  const todayProd = productionLog.filter(p => p.date === today());
  const todayPallets = todayProd.reduce((a, p) => a + p.pallets, 0);

  const lowStock = materials.filter(m => {
    const qty = stock[m.id] || 0;
    return qty === 0;
  }).length;

  const todayWaste = productionWasteLog.filter(w => w.date === today());
  const totalTodayWaste = todayWaste.reduce((sum, w) => {
    return sum + Object.values(w.waste).reduce((a, b) => a + b, 0);
  }, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <SectionTitle title="لوحة التحكم" sub="نظرة عامة على المصنع" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
        {[
          { label: "مشاتيح اليوم", value: todayPallets, sub: "مجموع الخطين", color: C.accent, icon: "⚙" },
          { label: "مخزون جاهز", value: totalFinishedPallets, sub: "مشتاح جاهز للشحن", color: C.success, icon: "▦" },
          { label: "عمليات إنتاج", value: productionLog.length, sub: "إجمالي مسجلة", color: C.textDim, icon: "📋" },
          { label: "مواد نفدت", value: lowStock, sub: "تحتاج تأمين", color: lowStock > 0 ? C.danger : C.success, icon: "⚠" },
          { label: "تالف اليوم", value: totalTodayWaste, sub: "وحدة تالفة", color: totalTodayWaste > 0 ? C.danger : C.success, icon: "⛔" },
        ].map((s, i) => (
          <Card key={i} style={{ padding: "20px 22px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -15, left: -5, fontSize: 70, opacity: 0.04 }}>{s.icon}</div>
            <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 34, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.textDim, marginTop: 4 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card style={{ padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>آخر الإنتاج</h3>
          {productionLog.length === 0 ? (
            <div style={{ color: C.textMuted, fontSize: 13, textAlign: "center", padding: "20px 0" }}>لا يوجد إنتاج مسجل بعد</div>
          ) : productionLog.slice(0, 5).map(p => (
            <div key={p.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 14px", background: C.surface, borderRadius: 10,
              fontSize: 13, marginBottom: 8,
            }}>
              <div>
                <div style={{ fontWeight: 600 }}>{p.productName}</div>
                <div style={{ color: C.textMuted, fontSize: 11 }}>{p.date} • {p.units.toLocaleString()} وحدة</div>
              </div>
              <Badge color={C.accent}>{p.pallets} مشتاح</Badge>
            </div>
          ))}
        </Card>

        <Card style={{ padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>المنتجات الجاهزة</h3>
          {products.map(p => (
            <div key={p.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "9px 14px", background: C.surface, borderRadius: 10,
              fontSize: 13, marginBottom: 8,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>{p.icon}</span><span>{p.name}</span>
              </div>
              <span style={{ fontWeight: 700, color: C.success }}>{finished[p.id] || 0} مشتاح</span>
            </div>
          ))}
        </Card>

        <Card style={{ padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>⛔ المواد التالفة من الإنتاج</h3>
          {productionWasteLog.length === 0 ? (
            <div style={{ color: C.textMuted, fontSize: 13, textAlign: "center", padding: "20px 0" }}>لا توجد مواد تالفة مسجلة</div>
          ) : productionWasteLog.slice(0, 5).map(w => (
            <div key={w.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 14px", background: C.surface, borderRadius: 10,
              fontSize: 13, marginBottom: 8,
            }}>
              <div>
                <div style={{ fontWeight: 600 }}>{w.productName}</div>
                <div style={{ color: C.textMuted, fontSize: 11 }}>{w.date}</div>
              </div>
              <Badge color={C.danger}>{Object.values(w.waste).reduce((a, b) => a + b, 0)} وحدة</Badge>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── INCOMING ─────────────────────────────────────────────────────────────────
function IncomingPage({ materials, addIncoming, incomingLog }) {
  const [matId, setMatId] = useState("");
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");
  const [supplier, setSupplier] = useState("");
  const [measurementUnit, setMeasurementUnit] = useState("");
  const [saved, setSaved] = useState(false);

  const bottleMats = materials.filter(m => m.line === "bottles");
  const cupMats = materials.filter(m => m.line === "cups");

  function handleSave() {
    if (!matId || !qty || Number(qty) <= 0 || !measurementUnit) return;
    addIncoming(matId, Number(qty), note, supplier, measurementUnit);
    setMatId(""); setQty(""); setNote(""); setSupplier(""); setMeasurementUnit("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <SectionTitle title="إضافة وارد للمخزن" sub="تسجيل المواد الخام الداخلة" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card style={{ padding: 24 }}>
          <h3 style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 700 }}>إدخال وارد جديد</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 6 }}>المادة الخام</label>
              <select value={matId} onChange={e => setMatId(e.target.value)} style={inputStyle}>
                <option value="">-- اختر المادة --</option>
                <optgroup label="مواد خط العبوات">
                  {bottleMats.map(m => <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>)}
                </optgroup>
                <optgroup label="مواد خط الكاسات">
                  {cupMats.map(m => <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>)}
                </optgroup>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 6 }}>الكمية</label>
              <input type="number" value={qty} onChange={e => setQty(e.target.value)} placeholder="أدخل الكمية" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 6 }}>وحدة القياس</label>
              <select value={measurementUnit} onChange={e => setMeasurementUnit(e.target.value)} style={inputStyle}>
                <option value="">-- اختر وحدة --</option>
                <option value="عدد">عدد</option>
                <option value="رول">رول</option>
                <option value="كرتونة">كرتونة</option>
                <option value="متر">متر</option>
                <option value="كاسة">كاسة</option>
                <option value="قطعة">قطعة</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 6 }}>المورد</label>
              <input type="text" value={supplier} onChange={e => setSupplier(e.target.value)} placeholder="اسم المورد أو الشركة" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 6 }}>ملاحظات (اختياري)</label>
              <input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="رقم فاتورة، ملاحظات..." style={inputStyle} />
            </div>
            <button onClick={handleSave} style={{ ...btnPrimary, marginTop: 4, padding: "12px" }}>
              {saved ? "✓ تم الحفظ!" : "✓ حفظ الوارد"}
            </button>
          </div>
        </Card>

        <Card style={{ padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>آخر الواردات</h3>
          {incomingLog.length === 0 ? (
            <div style={{ color: C.textMuted, fontSize: 13, textAlign: "center", padding: "30px 0" }}>لا يوجد واردات مسجلة</div>
          ) : incomingLog.slice(0, 8).map(r => (
            <div key={r.id} style={{
              background: C.surface, borderRadius: 10, padding: "11px 12px",
              marginBottom: 8, fontSize: 12,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{r.materialName}</div>
                <span style={{ color: C.success, fontWeight: 700 }}>+{r.qty} {r.measurementUnit}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: C.textMuted, fontSize: 11 }}>
                <span>{r.date}</span>
                {r.supplier && <span>المورد: {r.supplier}</span>}
              </div>
              {r.note && <div style={{ color: C.textDim, fontSize: 10, marginTop: 4 }}>📝 {r.note}</div>}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── PRODUCTION ───────────────────────────────────────────────────────────────
function ProductionPage({ products, materials, stock, addProduction, productionWasteLog }) {
  const [line, setLine] = useState("bottles");
  const [prodId, setProdId] = useState("");
  const [pallets, setPallets] = useState("");
  const [actualUsed, setActualUsed] = useState({});
  const [lastEntry, setLastEntry] = useState(null);
  const [showActualUsage, setShowActualUsage] = useState(false);

  const lineProducts = products.filter(p => p.line === line);
  const selectedProd = products.find(p => p.id === prodId);
  const units = selectedProd && pallets ? selectedProd.perPallet * Number(pallets) : 0;

  function calcConsumption() {
    if (!selectedProd || !pallets) return [];
    return Object.entries(selectedProd.materials).map(([matId, perUnit]) => {
      const mat = materials.find(m => m.id === matId);
      const calculated = units * perUnit;
      const actual = actualUsed[matId] ? Number(actualUsed[matId]) : calculated;
      const productionWaste = Math.max(0, actual - calculated);
      return { matId, name: mat?.name, unit: mat?.unit, calculated, actual, productionWaste };
    });
  }

  function handleRegister() {
    if (!prodId || !pallets || Number(pallets) <= 0) return;
    const actualToUse = showActualUsage ? actualUsed : null;
    const entry = addProduction(prodId, Number(pallets), actualToUse);
    setLastEntry(entry);
    setProdId(""); setPallets(""); setActualUsed({}); setShowActualUsage(false);
  }

  const consumption = calcConsumption();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <SectionTitle title="تسجيل الإنتاج" sub="إدخال المشاتيح المنتجة وحساب الاستهلاك والتالف" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card style={{ padding: 24 }}>
          {/* Line toggle */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {[{ id: "bottles", label: "خط العبوات" }, { id: "cups", label: "خط الكاسات" }].map(l => (
              <button key={l.id} onClick={() => { setLine(l.id); setProdId(""); setActualUsed({}); }} style={{
                flex: 1, padding: "10px",
                background: line === l.id ? C.accent : C.surface,
                border: `1px solid ${line === l.id ? C.accent : C.border}`,
                borderRadius: 8, color: line === l.id ? "#fff" : C.textMuted,
                fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer",
              }}>{l.label}</button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 6 }}>الصنف</label>
              <select value={prodId} onChange={e => { setProdId(e.target.value); setActualUsed({}); }} style={inputStyle}>
                <option value="">-- اختر الصنف --</option>
                {lineProducts.map(p => <option key={p.id} value={p.id}>{p.icon} {p.name} ({p.perPallet.toLocaleString()} وحدة/مشتاح)</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 6 }}>عدد المشاتيح المنتجة</label>
              <input type="number" value={pallets} onChange={e => setPallets(e.target.value)} placeholder="أدخل عدد المشاتيح" style={inputStyle} />
            </div>
            {units > 0 && (
              <div style={{ background: C.accentGlow, border: `1px solid ${C.borderLight}`, borderRadius: 10, padding: 14, fontSize: 13 }}>
                <div style={{ color: C.textDim, marginBottom: 6, fontWeight: 700 }}>إجمالي الوحدات المحسوبة:</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: C.accent }}>{units.toLocaleString()} وحدة</div>
              </div>
            )}

            {/* Toggle for actual usage */}
            {units > 0 && (
              <div>
                <button
                  onClick={() => setShowActualUsage(!showActualUsage)}
                  style={{
                    width: "100%", padding: "10px",
                    background: showActualUsage ? C.warningGlow : C.surface,
                    border: `1px solid ${showActualUsage ? C.warning : C.border}`,
                    borderRadius: 8, color: showActualUsage ? C.warning : C.textDim,
                    fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer",
                  }}
                >
                  {showActualUsage ? "✓ إدخال المواد الفعلية المستخدمة" : "+ إدخال المواد الفعلية (حساب التالف)"}
                </button>
              </div>
            )}

            <button onClick={handleRegister} style={{ ...btnSuccess, padding: "12px", marginTop: 4 }}>
              ⚙ تسجيل الإنتاج وخصم المخزون
            </button>
          </div>
        </Card>

        {/* Consumption and actual usage preview */}
        <Card style={{ padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>
            {showActualUsage ? "📊 المواد الفعلية المستخدمة" : "معاينة الاستهلاك المحسوب"}
          </h3>
          {consumption.length === 0 ? (
            <div style={{ color: C.textMuted, fontSize: 13, textAlign: "center", padding: "30px 0" }}>
              اختر صنفاً وعدد مشاتيح
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {consumption.map((row, i) => (
                <div key={i} style={{
                  background: C.surface, borderRadius: 10, padding: "14px", fontSize: 12,
                }}>
                  <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 13 }}>{row.name}</div>
                  
                  {showActualUsage ? (
                    // Input for actual usage
                    <div>
                      <label style={{ fontSize: 11, color: C.textDim, display: "block", marginBottom: 4 }}>
                        المحسوب: {row.calculated} {row.unit}
                      </label>
                      <input
                        type="number"
                        value={actualUsed[row.matId] || row.calculated}
                        onChange={e => setActualUsed(prev => ({ ...prev, [row.matId]: e.target.value }))}
                        style={{ ...inputStyle, fontSize: 13, padding: "8px 10px" }}
                      />
                      {actualUsed[row.matId] && Number(actualUsed[row.matId]) > row.calculated && (
                        <div style={{ marginTop: 6, padding: "6px 8px", background: C.dangerGlow, borderRadius: 6, fontSize: 11, color: C.danger, fontWeight: 600 }}>
                          ⚠️ تالف: {(Number(actualUsed[row.matId]) - row.calculated)} {row.unit}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Display calculated
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: C.textDim }}>
                        المحسوب: <span style={{ color: C.accent, fontWeight: 700 }}>{row.calculated.toLocaleString()}</span>
                      </span>
                      <span style={{ color: C.textDim }}>({row.unit})</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card style={{ padding: 20 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>📋 سجل المواد التالفة من الإنتاج</h3>
        {productionWasteLog.length === 0 ? (
          <div style={{ color: C.textMuted, fontSize: 13, textAlign: "center", padding: "30px 0" }}>لا توجد مواد تالفة مسجلة</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {productionWasteLog.slice(0, 10).map(entry => (
              <div key={entry.id} style={{
                background: C.surface, borderRadius: 10, padding: "12px 14px",
                border: `1px solid ${C.borderLight}`, fontSize: 12,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{entry.productName}</div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: C.textMuted }}>{entry.date}</span>
                    <Badge color={C.accent}>{entry.pallets} مشتاح</Badge>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {Object.entries(entry.waste).map(([matId, wasteQty]) => {
                    if (wasteQty <= 0) return null;
                    const mat = materials.find(m => m.id === matId);
                    const calculated = entry.consumed[matId];
                    const actual = entry.actualUsed[matId];
                    return (
                      <div key={matId} style={{
                        background: C.card, borderRadius: 8, padding: "8px 10px",
                        border: `1px solid ${C.dangerGlow}`, fontSize: 11,
                      }}>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>{mat?.name}</div>
                        <div style={{ color: C.textMuted, fontSize: 10 }}>
                          محسوب: {calculated} • فعلي: {actual}
                        </div>
                        <div style={{ marginTop: 4, color: C.danger, fontWeight: 700 }}>
                          تالف: {wasteQty} {mat?.unit}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── STOCK ────────────────────────────────────────────────────────────────────
function StockPage({ materials, products, stock, finished, materialSuppliers }) {
  function getLevel(qty) {
    if (qty === 0) return "danger";
    if (qty < 100) return "warning";
    return "ok";
  }
  const levelColor = { ok: C.success, warning: C.warning, danger: C.danger };
  const levelLabel = { ok: "✓ جيد", warning: "⚠ منخفض", danger: "✗ نفد" };

  const bottleMats = materials.filter(m => m.line === "bottles");
  const cupMats = materials.filter(m => m.line === "cups");

  function MatTable({ mats, title }) {
    return (
      <Card style={{ overflow: "hidden", marginBottom: 20 }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}`, fontWeight: 700, fontSize: 14 }}>{title}</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: C.surface }}>
              {["المادة", "الكمية", "الوحدة", "المورد", "الحالة"].map(h => (
                <th key={h} style={{ padding: "10px 18px", textAlign: "right", color: C.textMuted, fontWeight: 600, fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mats.map(m => {
              const qty = stock[m.id] || 0;
              const level = getLevel(qty);
              const supplier = materialSuppliers[m.id];
              return (
                <tr key={m.id} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td style={{ padding: "11px 18px", fontWeight: 600 }}>{m.name}</td>
                  <td style={{ padding: "11px 18px", fontWeight: 700, color: levelColor[level] }}>{qty.toLocaleString()}</td>
                  <td style={{ padding: "11px 18px", color: C.textDim }}>{m.unit}</td>
                  <td style={{ padding: "11px 18px", fontSize: 12 }}>{supplier ? <Badge color={C.accent}>{supplier}</Badge> : <span style={{ opacity: 0.5, color: C.textDim }}>-</span>}</td>
                  <td style={{ padding: "11px 18px" }}>
                    <Badge color={levelColor[level]}>{levelLabel[level]}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <SectionTitle title="المخزون الحالي" sub="مواد خام ومنتجات جاهزة" />
      <MatTable mats={bottleMats} title="مواد خط العبوات" />
      <MatTable mats={cupMats} title="مواد خط الكاسات" />

      <Card style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}`, fontWeight: 700, fontSize: 14 }}>المنتجات الجاهزة</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: C.surface }}>
              {["الصنف", "الخط", "المشاتيح", "إجمالي الوحدات"].map(h => (
                <th key={h} style={{ padding: "10px 18px", textAlign: "right", color: C.textMuted, fontWeight: 600, fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderTop: `1px solid ${C.border}` }}>
                <td style={{ padding: "11px 18px", fontWeight: 600 }}>{p.icon} {p.name}</td>
                <td style={{ padding: "11px 18px", color: C.textDim }}>{p.line === "bottles" ? "عبوات" : "كاسات"}</td>
                <td style={{ padding: "11px 18px", fontWeight: 700, color: C.accent }}>{finished[p.id] || 0}</td>
                <td style={{ padding: "11px 18px", color: C.textDim }}>{((finished[p.id] || 0) * p.perPallet).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─── REPORTS ──────────────────────────────────────────────────────────────────
function ReportsPage({ productionLog, incomingLog, materials, products }) {
  const [period, setPeriod] = useState("daily");

  const logs = productionLog;
  const totalPallets = logs.reduce((a, p) => a + p.pallets, 0);
  const totalUnits = logs.reduce((a, p) => a + p.units, 0);

  // Aggregate consumption per material
  const consumptionMap = {};
  logs.forEach(entry => {
    Object.entries(entry.consumed).forEach(([matId, qty]) => {
      consumptionMap[matId] = (consumptionMap[matId] || 0) + qty;
    });
  });

  const productionByProduct = {};
  logs.forEach(entry => {
    productionByProduct[entry.productId] = (productionByProduct[entry.productId] || 0) + entry.pallets;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <SectionTitle title="التقارير" sub="ملخص الإنتاج والاستهلاك" />

      <div style={{ display: "flex", gap: 10 }}>
        {[{ id: "daily", label: "يومي" }, { id: "weekly", label: "أسبوعي" }, { id: "monthly", label: "شهري" }].map(p => (
          <button key={p.id} onClick={() => setPeriod(p.id)} style={{
            padding: "9px 22px",
            background: period === p.id ? C.accent : C.card,
            border: `1px solid ${period === p.id ? C.accent : C.border}`,
            borderRadius: 8, color: period === p.id ? "#fff" : C.textMuted,
            fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}>{p.label}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card style={{ padding: 22 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>ملخص الإنتاج</h3>
          {[
            { label: "إجمالي المشاتيح", value: totalPallets, color: C.accent },
            { label: "إجمالي الوحدات", value: totalUnits.toLocaleString(), color: C.text },
            { label: "عدد عمليات الإنتاج", value: logs.length, color: C.textDim },
          ].map((r, i, arr) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              padding: "11px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
              fontSize: 14,
            }}>
              <span style={{ color: C.textDim }}>{r.label}</span>
              <span style={{ fontWeight: 700, color: r.color }}>{r.value}</span>
            </div>
          ))}

          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 13, color: C.textDim, fontWeight: 700, marginBottom: 10 }}>إنتاج حسب الصنف:</div>
            {products.map(p => (
              <div key={p.id} style={{
                display: "flex", justifyContent: "space-between",
                padding: "8px 0", borderBottom: `1px solid ${C.border}`,
                fontSize: 13,
              }}>
                <span>{p.icon} {p.name}</span>
                <span style={{ fontWeight: 700, color: C.accent }}>{productionByProduct[p.id] || 0} مشتاح</span>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: 22 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>استهلاك المواد الخام</h3>
          {Object.keys(consumptionMap).length === 0 ? (
            <div style={{ color: C.textMuted, fontSize: 13, textAlign: "center", padding: "30px 0" }}>لا يوجد بيانات بعد</div>
          ) : Object.entries(consumptionMap).map(([matId, qty], i, arr) => {
            const mat = materials.find(m => m.id === matId);
            return (
              <div key={matId} style={{
                display: "flex", justifyContent: "space-between",
                padding: "9px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
                fontSize: 13,
              }}>
                <span style={{ color: C.textDim }}>{mat?.name}</span>
                <span style={{ fontWeight: 700, color: C.danger }}>{qty.toLocaleString()} {mat?.unit}</span>
              </div>
            );
          })}

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button style={{ ...btnGhost, flex: 1 }}>🖨 طباعة</button>
            <button style={{ ...btnGhost, flex: 1 }}>💾 حفظ PDF</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function SettingsPage({ materials, setMaterials, products, setProducts }) {
  const [settingsTab, setSettingsTab] = useState("materials");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionTitle title="الإعدادات" sub="إدارة المواد الخام والمنتجات وربطها" />

      <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
        {[{ id: "materials", label: "المواد الخام" }, { id: "products", label: "المنتجات" }].map(t => (
          <button key={t.id} onClick={() => setSettingsTab(t.id)} style={{
            padding: "9px 22px",
            background: settingsTab === t.id ? C.accent : C.card,
            border: `1px solid ${settingsTab === t.id ? C.accent : C.border}`,
            borderRadius: 8, color: settingsTab === t.id ? "#fff" : C.textMuted,
            fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}>{t.label}</button>
        ))}
      </div>

      {settingsTab === "materials" && <MaterialsSettings materials={materials} setMaterials={setMaterials} />}
      {settingsTab === "products" && <ProductsSettings products={products} setProducts={setProducts} materials={materials} />}
    </div>
  );
}

function MaterialsSettings({ materials, setMaterials }) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [line, setLine] = useState("bottles");

  function addMaterial() {
    if (!name.trim() || !unit.trim()) return;
    setMaterials(prev => [...prev, { id: uid(), name: name.trim(), unit: unit.trim(), line }]);
    setName(""); setUnit("");
  }

  function deleteMaterial(id) {
    setMaterials(prev => prev.filter(m => m.id !== id));
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <Card style={{ padding: 22 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>إضافة مادة جديدة</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 5 }}>اسم المادة</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="مثال: كبسولة ١.٥ لتر" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 5 }}>وحدة القياس</label>
            <input value={unit} onChange={e => setUnit(e.target.value)} placeholder="مثال: كبسولة، رول، قطعة" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 5 }}>الخط</label>
            <select value={line} onChange={e => setLine(e.target.value)} style={inputStyle}>
              <option value="bottles">خط العبوات</option>
              <option value="cups">خط الكاسات</option>
            </select>
          </div>
          <button onClick={addMaterial} style={{ ...btnPrimary, padding: "11px" }}>+ إضافة مادة</button>
        </div>
      </Card>

      <Card style={{ padding: 20, maxHeight: 500, overflowY: "auto" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>المواد الحالية ({materials.length})</h3>
        {materials.map(m => (
          <div key={m.id} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "9px 12px", background: C.surface, borderRadius: 9,
            marginBottom: 7, fontSize: 13,
          }}>
            <div>
              <div style={{ fontWeight: 600 }}>{m.name}</div>
              <div style={{ color: C.textMuted, fontSize: 11 }}>{m.unit} • {m.line === "bottles" ? "عبوات" : "كاسات"}</div>
            </div>
            <button onClick={() => deleteMaterial(m.id)} style={btnDanger}>حذف</button>
          </div>
        ))}
      </Card>
    </div>
  );
}

function ProductsSettings({ products, setProducts, materials }) {
  const [name, setName] = useState("");
  const [line, setLine] = useState("bottles");
  const [perPallet, setPerPallet] = useState("");
  const [icon, setIcon] = useState("💧");
  const [selMats, setSelMats] = useState({});
  const [editId, setEditId] = useState(null);

  const lineMats = materials.filter(m => m.line === line);

  function toggleMat(id) {
    setSelMats(prev => ({ ...prev, [id]: prev[id] ? undefined : 1 }));
  }

  function setMatQty(id, val) {
    setSelMats(prev => ({ ...prev, [id]: Number(val) }));
  }

  function saveProduct() {
    if (!name.trim() || !perPallet) return;
    const mats = Object.fromEntries(Object.entries(selMats).filter(([, v]) => v > 0));
    if (editId) {
      setProducts(prev => prev.map(p => p.id === editId ? { ...p, name: name.trim(), line, perPallet: Number(perPallet), icon, materials: mats } : p));
      setEditId(null);
    } else {
      setProducts(prev => [...prev, { id: uid(), name: name.trim(), line, perPallet: Number(perPallet), icon, materials: mats }]);
    }
    setName(""); setPerPallet(""); setSelMats({});
  }

  function startEdit(p) {
    setEditId(p.id); setName(p.name); setLine(p.line);
    setPerPallet(p.perPallet); setIcon(p.icon); setSelMats({ ...p.materials });
  }

  function deleteProduct(id) {
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <Card style={{ padding: 22 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>{editId ? "تعديل منتج" : "إضافة منتج جديد"}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 5 }}>اسم الصنف</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="مثال: ١.٥ لتر" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 5 }}>أيقونة</label>
              <input value={icon} onChange={e => setIcon(e.target.value)} style={{ ...inputStyle, width: 60, textAlign: "center", fontSize: 20 }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 5 }}>الخط</label>
            <select value={line} onChange={e => { setLine(e.target.value); setSelMats({}); }} style={inputStyle}>
              <option value="bottles">خط العبوات</option>
              <option value="cups">خط الكاسات</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 5 }}>وحدات في المشتاح</label>
            <input type="number" value={perPallet} onChange={e => setPerPallet(e.target.value)} placeholder="مثال: 672" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: C.textDim, display: "block", marginBottom: 8 }}>المواد الخام (وحدة لكل عبوة/كاسة)</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 200, overflowY: "auto" }}>
              {lineMats.map(m => (
                <div key={m.id} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: selMats[m.id] ? C.accentGlow : C.surface,
                  border: `1px solid ${selMats[m.id] ? C.accent : C.border}`,
                  borderRadius: 8, padding: "8px 12px",
                }}>
                  <input type="checkbox" checked={!!selMats[m.id]} onChange={() => toggleMat(m.id)} style={{ accentColor: C.accent }} />
                  <span style={{ flex: 1, fontSize: 13 }}>{m.name}</span>
                  {selMats[m.id] !== undefined && (
                    <input
                      type="number"
                      value={selMats[m.id] || ""}
                      onChange={e => setMatQty(m.id, e.target.value)}
                      style={{ ...inputStyle, width: 60, padding: "4px 8px", fontSize: 12 }}
                      placeholder="كمية"
                    />
                  )}
                  <span style={{ fontSize: 11, color: C.textMuted }}>{m.unit}</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={saveProduct} style={{ ...btnPrimary, padding: "11px" }}>
            {editId ? "✓ حفظ التعديلات" : "+ إضافة منتج"}
          </button>
          {editId && <button onClick={() => { setEditId(null); setName(""); setPerPallet(""); setSelMats({}); }} style={{ ...btnGhost, padding: "9px" }}>إلغاء</button>}
        </div>
      </Card>

      <Card style={{ padding: 20, maxHeight: 600, overflowY: "auto" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>المنتجات الحالية ({products.length})</h3>
        {products.map(p => (
          <div key={p.id} style={{
            background: C.surface, borderRadius: 10, padding: "12px 14px",
            marginBottom: 10, fontSize: 13,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{p.icon} {p.name}</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => startEdit(p)} style={{ ...btnGhost, padding: "5px 12px", fontSize: 12 }}>تعديل</button>
                <button onClick={() => deleteProduct(p.id)} style={btnDanger}>حذف</button>
              </div>
            </div>
            <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 6 }}>
              {p.line === "bottles" ? "عبوات" : "كاسات"} • {p.perPallet.toLocaleString()} وحدة/مشتاح
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {Object.keys(p.materials).map(matId => {
                const mat = materials.find(m => m.id === matId);
                return mat ? <Badge key={matId} color={C.accent}>{mat.name}</Badge> : null;
              })}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
