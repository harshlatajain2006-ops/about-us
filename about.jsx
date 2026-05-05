import { useState, useEffect, useRef } from "react";

// ─── Placeholder avatar SVG ───────────────────────────────────────────────────
const AvatarPlaceholder = ({ name, size = 120 }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id={`grad-${name}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#00C4A0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#052823" stopOpacity="1" />
        </radialGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#grad-${name})`} />
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill="none" stroke="#00C4A0" strokeWidth="1.5" strokeOpacity="0.5" />
      <text
        x={size / 2}
        y={size / 2 + 7}
        textAnchor="middle"
        fill="#00C4A0"
        fontSize={size * 0.28}
        fontFamily="Inter, sans-serif"
        fontWeight="600"
      >
        {initials}
      </text>
    </svg>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const MISSION_POINTS = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#00C4A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Innovation First",
    desc: "We push the boundaries of what's possible, constantly reimagining how technology can serve people better.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#00C4A0" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="#00C4A0" strokeWidth="1.8" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#00C4A0" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Community Driven",
    desc: "Every decision is made with our community at the center — building for people, with people.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#00C4A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Trust & Integrity",
    desc: "We operate with full transparency, holding ourselves accountable to the highest ethical standards.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="#00C4A0" strokeWidth="1.8" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#00C4A0" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Global Impact",
    desc: "Our solutions are designed to scale across borders, creating meaningful change at every level.",
  },
];

const STATS = [
  { value: "5+", label: "Years of Excellence" },
  { value: "200+", label: "Projects Delivered" },
  { value: "50K+", label: "Users Impacted" },
  { value: "30+", label: "Team Members" },
];

const TEAM = [
  {
    name: "Batuk Sharma",
    role: "Founder",
    bio: "Batuk is a visionary leader with 8+ years in tech startups. He drives ABC's strategic direction and has a passion for building communities that create real-world impact.",
    skills: ["Strategy", "Leadership", "Vision"],
  },
  {
    name: "Shrajik Patil",
    role: "Founder",
    bio: " Shrajik is the technical backbone of ABC. With expertise in full-stack development and AI/ML, she architects systems that are both powerful and elegant.",
    skills: ["Full-Stack", "AI/ML", "Architecture"],
  },
  {
    name: "Sandesh Ratnawat",
    role: "Founder",
    bio: "Sandesh shapes everything users see and feel. His design philosophy merges aesthetics with function, ensuring every interaction feels intentional and delightful.",
    skills: ["UI/UX", "Branding", "Motion"],
  },
  {
    name: "Shivangi Savita",
    role: "Founder",
    bio: " Shivangi keeps the gears turning. She streamlines processes across teams and ensures projects are delivered on time with exceptional quality.",
    skills: ["Operations", "Agile", "Scaling"],
  }
];

const JOURNEY = [
  { year: "2019", title: "The Spark", desc: "ABC was born from a late-night hackathon idea — few friends determined to solve a real problem." },
  { year: "2020", title: "First Launch", desc: "Launched our MVP with 500 early adopters. The response was beyond anything we imagined." },
  { year: "2021", title: "Series A", desc: "Secured Series A funding and expanded our team from 5 to 20 passionate builders." },
  { year: "2022", title: "Global Reach", desc: "Crossed 25,000 users across 15 countries. Opened our second office in Bangalore." },
  { year: "2023", title: "Product Pivot", desc: "Relaunched with a completely redesigned product suite based on deep community feedback." },
  { year: "2024", title: "Today & Beyond", desc: "50K+ users, 30+ team members, and a mission stronger than ever. The best is yet to come." },
];

// ─── useInView hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ tag, title, subtitle }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ textAlign: "center", marginBottom: "60px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)" }}>
      <span style={{ display: "inline-block", background: "rgba(0,196,160,0.12)", border: "1px solid rgba(0,196,160,0.3)", color: "#00C4A0", padding: "6px 18px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
        {tag}
      </span>
      <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 16px", lineHeight: 1.1, fontFamily: "'Inter', sans-serif" }}>
        {title}
      </h2>
      {subtitle && <p style={{ color: "#A0AAAA", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>{subtitle}</p>}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AboutUs() {
  const [activeTeam, setActiveTeam] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  const styles = {
    // Global
    page: {
      background: "#000000",
      color: "#FFFFFF",
      fontFamily: "'Inter', sans-serif",
      overflowX: "hidden",
    },
    section: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "100px 24px",
    },

    // ── Hero ──
    heroWrap: {
      position: "relative",
      background: "linear-gradient(160deg, #052823 0%, #000000 60%)",
      padding: "120px 24px 100px",
      textAlign: "center",
      overflow: "hidden",
    },
    heroGlow: {
      position: "absolute", top: "-120px", left: "50%", transform: "translateX(-50%)",
      width: "700px", height: "700px",
      background: "radial-gradient(circle, rgba(0,196,160,0.12) 0%, transparent 70%)",
      pointerEvents: "none",
    },
    heroGrid: {
      position: "absolute", inset: 0, opacity: 0.04,
      backgroundImage: "linear-gradient(rgba(0,196,160,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,160,1) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
      pointerEvents: "none",
    },
    heroBadge: {
      display: "inline-flex", alignItems: "center", gap: "8px",
      background: "rgba(0,196,160,0.1)", border: "1px solid rgba(0,196,160,0.25)",
      borderRadius: "100px", padding: "8px 20px", marginBottom: "28px",
      color: "#00C4A0", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
    heroDot: { width: "8px", height: "8px", borderRadius: "50%", background: "#00C4A0", animation: "pulse 2s infinite" },
    heroTitle: {
      fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 800,
      margin: "0 0 24px", lineHeight: 1.05,
      background: "linear-gradient(135deg, #FFFFFF 0%, #41FFD2 60%, #00C4A0 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    },
    heroSubtitle: {
      fontSize: "1.15rem", color: "#A0AAAA", maxWidth: "620px",
      margin: "0 auto 48px", lineHeight: 1.75,
    },
    heroScroll: {
      display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
      color: "#A0AAAA", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase",
    },
    scrollLine: {
      width: "1px", height: "48px",
      background: "linear-gradient(to bottom, #00C4A0, transparent)",
      animation: "scrollAnim 1.5s ease-in-out infinite",
    },

    // ── Stats ──
    statsGrid: {
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px",
      margin: "0 auto", maxWidth: "900px",
    },
    statCard: (hovered) => ({
      background: hovered ? "rgba(0,196,160,0.08)" : "#141919",
      border: `1px solid ${hovered ? "#00C4A0" : "rgba(0,196,160,0.15)"}`,
      borderRadius: "16px", padding: "32px 20px", textAlign: "center",
      cursor: "default", transition: "all 0.3s ease",
      transform: hovered ? "translateY(-4px)" : "none",
      boxShadow: hovered ? "0 0 30px rgba(0,196,160,0.15)" : "none",
    }),
    statValue: { fontSize: "2.8rem", fontWeight: 800, color: "#41FFD2", lineHeight: 1, marginBottom: "8px" },
    statLabel: { fontSize: "0.85rem", color: "#A0AAAA", fontWeight: 500 },

    // ── Mission Cards ──
    missionGrid: {
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px",
    },

    // ── Timeline ──
    timeline: { position: "relative", paddingLeft: "32px" },
    timelineLine: {
      position: "absolute", left: "11px", top: "8px", bottom: "8px",
      width: "2px", background: "linear-gradient(to bottom, #00C4A0, transparent)",
    },

    // ── Team Grid ──
    teamGrid: {
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px",
    },
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        @keyframes scrollAnim { 0%,100%{opacity:0;transform:translateY(-8px)} 50%{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <div style={styles.heroWrap}>
        <div style={styles.heroGlow} />
        <div style={styles.heroGrid} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={styles.heroBadge}>
            <span style={styles.heroDot} />
            About Us
          </div>
          <h1 style={styles.heroTitle}>
            We Are Building<br />The Future, Together
          </h1>
          <p style={styles.heroSubtitle}>
            ABC is more than a company — it's a movement. We're a team of passionate innovators,
            designers, and dreamers on a mission to reshape how technology serves humanity.
          </p>
          <div style={styles.heroScroll}>
            <div style={styles.scrollLine} />
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(180deg, #052823 0%, #000000 100%)", padding: "80px 24px" }}>
        <div style={styles.statsGrid}>
          {STATS.map((s, i) => (
            <StatsCard key={i} s={s} i={i} />
          ))}
        </div>
      </div>

      {/* ── WHO WE ARE ────────────────────────────────────────────────────────── */}
      <div style={{ ...styles.section, paddingBottom: "60px" }}>
        <SectionHeader tag="Our Story" title="Who We Are" subtitle="A collective of builders, thinkers, and creators united by a single belief: technology should empower, not overwhelm." />
        <WhoWeAre />
      </div>

      {/* ── MISSION & VALUES ──────────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(135deg, #052823 0%, #000000 100%)", padding: "100px 0" }}>
        <div style={styles.section}>
          <SectionHeader tag="Our Foundation" title="Mission & Values" subtitle="Our values aren't posters on a wall. They're the principles that drive every line of code, every design decision, and every conversation." />
          <div style={styles.missionGrid}>
            {MISSION_POINTS.map((m, i) => (
              <MissionCard key={i} m={m} i={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── JOURNEY ───────────────────────────────────────────────────────────── */}
      <div style={styles.section}>
        <SectionHeader tag="Our Timeline" title="The ABC Journey" subtitle="From a late-night idea to thousands of users — here's how we got here." />
        <div style={styles.timeline}>
          <div style={styles.timelineLine} />
          {JOURNEY.map((j, i) => (
            <TimelineItem key={i} j={j} i={i} />
          ))}
        </div>
      </div>

      {/* ── CORE TEAM ─────────────────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(180deg, #052823 0%, #000000 100%)", padding: "100px 0" }}>
        <div style={styles.section}>
          <SectionHeader tag="The People" title="Meet Our Core Team" subtitle="The brilliant humans behind ABC — each bringing unique superpowers to build something extraordinary." />
          <div style={styles.teamGrid}>
            {TEAM.map((member, i) => (
              <TeamCard key={i} member={member} i={i} active={activeTeam === i} onClick={() => setActiveTeam(activeTeam === i ? null : i)} />
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <CTASection />
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatsCard({ s, i }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(0,196,160,0.08)" : "#141919",
        border: `1px solid ${hovered ? "#00C4A0" : "rgba(0,196,160,0.15)"}`,
        borderRadius: "16px", padding: "32px 20px", textAlign: "center",
        cursor: "default", transition: "all 0.3s ease",
        transform: inView ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(20px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${i * 0.1}s`,
        boxShadow: hovered ? "0 0 30px rgba(0,196,160,0.15)" : "none",
      }}
    >
      <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "#41FFD2", lineHeight: 1, marginBottom: "8px" }}>{s.value}</div>
      <div style={{ fontSize: "0.85rem", color: "#A0AAAA", fontWeight: 500 }}>{s.label}</div>
    </div>
  );
}

function WhoWeAre() {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center",
        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div>
        <p style={{ color: "#A0AAAA", lineHeight: 1.9, fontSize: "1.02rem", marginBottom: "20px" }}>
          ABC started as a bold idea between a few college friends who believed that the way people
          interact with technology needed a radical rethink. Not just better tools — but a fundamentally
          different relationship between humans and the digital world.
        </p>
        <p style={{ color: "#A0AAAA", lineHeight: 1.9, fontSize: "1.02rem", marginBottom: "32px" }}>
          Today, we're a team of 30+ passionate individuals spanning engineering, design, operations,
          and community — working from three cities, united by one mission.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["Purpose-Driven", "Open Source Values", "Remote-First", "Inclusive"].map((tag) => (
            <span key={tag} style={{ background: "rgba(0,196,160,0.1)", border: "1px solid rgba(0,196,160,0.25)", color: "#00C4A0", padding: "6px 16px", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 600 }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* Visual panel */}
      <div style={{ position: "relative" }}>
        <div style={{
          background: "linear-gradient(135deg, #052823, #141919)",
          border: "1px solid rgba(0,196,160,0.2)",
          borderRadius: "24px", padding: "40px",
          boxShadow: "0 0 60px rgba(0,196,160,0.08)",
        }}>
          <svg width="100%" viewBox="0 0 360 260" fill="none">
            <defs>
              <radialGradient id="whoGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00C4A0" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#00C4A0" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="180" cy="130" r="100" fill="url(#whoGlow)" />
            <circle cx="180" cy="130" r="80" stroke="#00C4A0" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 6" />
            <circle cx="180" cy="130" r="50" stroke="#00C4A0" strokeWidth="1" strokeOpacity="0.35" />
            <circle cx="180" cy="130" r="20" fill="#00C4A0" fillOpacity="0.15" stroke="#00C4A0" strokeWidth="1.5" />
            <text x="180" y="135" textAnchor="middle" fill="#41FFD2" fontSize="13" fontWeight="700" fontFamily="Inter">ABC</text>
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 180 + 80 * Math.cos(rad);
              const y = 130 + 80 * Math.sin(rad);
              const lx = 180 + 55 * Math.cos(rad);
              const ly = 130 + 55 * Math.sin(rad);
              const labels = ["Build", "Design", "Grow", "Scale", "Lead", "Care"];
              return (
                <g key={i}>
                  <line x1={lx} y1={ly} x2={x} y2={y} stroke="#00C4A0" strokeWidth="1" strokeOpacity="0.4" />
                  <circle cx={x} cy={y} r="14" fill="#141919" stroke="#00C4A0" strokeWidth="1.5" />
                  <text x={x} y={y + 4} textAnchor="middle" fill="#00C4A0" fontSize="7.5" fontFamily="Inter" fontWeight="600">{labels[i]}</text>
                </g>
              );
            })}
          </svg>
        </div>
        {/* Glow badge */}
        <div style={{ position: "absolute", bottom: "-16px", right: "24px", background: "#00C4A0", color: "#000", padding: "10px 20px", borderRadius: "100px", fontSize: "0.78rem", fontWeight: 700 }}>
          Est. 2019 🚀
        </div>
      </div>
    </div>
  );
}

function MissionCard({ m, i }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "linear-gradient(135deg, rgba(0,196,160,0.08), rgba(5,40,35,0.5))" : "#141919",
        border: `1px solid ${hovered ? "#00C4A0" : "rgba(0,196,160,0.12)"}`,
        borderRadius: "20px", padding: "36px 28px",
        transition: "all 0.35s ease",
        transform: inView ? (hovered ? "translateY(-6px)" : "translateY(0)") : "translateY(28px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${i * 0.12}s`,
        boxShadow: hovered ? "0 12px 40px rgba(0,196,160,0.12)" : "none",
      }}
    >
      <div style={{ marginBottom: "20px", width: "52px", height: "52px", background: "rgba(0,196,160,0.1)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(0,196,160,0.2)" }}>
        {m.icon}
      </div>
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "12px" }}>{m.title}</h3>
      <p style={{ color: "#A0AAAA", lineHeight: 1.75, fontSize: "0.92rem" }}>{m.desc}</p>
    </div>
  );
}

function TimelineItem({ j, i }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        display: "flex", gap: "24px", marginBottom: "40px", paddingLeft: "8px",
        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-20px)",
        transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
        transitionDelay: `${i * 0.1}s`,
      }}
    >
      <div style={{ position: "relative", flexShrink: 0, marginTop: "4px" }}>
        <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#141919", border: "2px solid #00C4A0", boxShadow: "0 0 12px rgba(0,196,160,0.4)", marginLeft: "-3px" }} />
      </div>
      <div style={{ background: "#141919", border: "1px solid rgba(0,196,160,0.15)", borderRadius: "16px", padding: "24px 28px", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
          <span style={{ background: "rgba(0,196,160,0.12)", border: "1px solid rgba(0,196,160,0.3)", color: "#00C4A0", padding: "4px 14px", borderRadius: "100px", fontSize: "0.78rem", fontWeight: 700 }}>{j.year}</span>
          <h3 style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "1rem" }}>{j.title}</h3>
        </div>
        <p style={{ color: "#A0AAAA", lineHeight: 1.7, fontSize: "0.92rem" }}>{j.desc}</p>
      </div>
    </div>
  );
}

function TeamCard({ member, i, active, onClick }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: active ? "linear-gradient(135deg, rgba(0,196,160,0.1), #141919)" : "#141919",
        border: `1px solid ${active || hovered ? "#00C4A0" : "rgba(0,196,160,0.12)"}`,
        borderRadius: "24px", padding: "36px 28px",
        cursor: "pointer", transition: "all 0.35s ease",
        transform: inView ? (hovered ? "translateY(-6px)" : "translateY(0)") : "translateY(30px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${i * 0.1}s`,
        boxShadow: active ? "0 0 40px rgba(0,196,160,0.15)" : hovered ? "0 8px 30px rgba(0,196,160,0.1)" : "none",
      }}
    >
      {/* Avatar */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ borderRadius: "50%", overflow: "hidden", border: `2px solid ${active || hovered ? "#00C4A0" : "rgba(0,196,160,0.3)"}`, transition: "border-color 0.3s" }}>
          <AvatarPlaceholder name={member.name} size={80} />
        </div>
        <div style={{ background: "rgba(0,196,160,0.1)", border: "1px solid rgba(0,196,160,0.25)", borderRadius: "100px", padding: "5px 12px" }}>
          <span style={{ color: "#00C4A0", fontSize: "0.7rem", fontWeight: 600 }}>{active ? "▲ Less" : "▼ More"}</span>
        </div>
      </div>

      <h3 style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "1.1rem", marginBottom: "4px" }}>{member.name}</h3>
      <p style={{ color: "#00C4A0", fontSize: "0.85rem", fontWeight: 600, marginBottom: "16px" }}>{member.role}</p>

      {/* Bio — expanded on click */}
      <div style={{
        maxHeight: active ? "200px" : "0", overflow: "hidden",
        transition: "max-height 0.4s ease", marginBottom: active ? "16px" : "0",
      }}>
        <p style={{ color: "#A0AAAA", lineHeight: 1.75, fontSize: "0.9rem", paddingBottom: "4px" }}>{member.bio}</p>
      </div>

      {/* Skills */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
        {member.skills.map((skill) => (
          <span key={skill} style={{ background: "rgba(0,196,160,0.08)", border: "1px solid rgba(0,196,160,0.2)", color: "#41FFD2", padding: "4px 12px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 600 }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function CTASection() {
  const [ref, inView] = useInView();
  return (
    <div style={{ padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,196,160,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div ref={ref} style={{ position: "relative", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.8s ease" }}>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: "16px" }}>
          Want to be part of the story?
        </h2>
        <p style={{ color: "#A0AAAA", fontSize: "1.05rem", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          We're always looking for passionate people who want to build something that matters. Come join us.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ background: "#00C4A0", color: "#000000", border: "none", borderRadius: "12px", padding: "14px 36px", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", transition: "all 0.25s ease", fontFamily: "Inter, sans-serif" }}
            onMouseEnter={(e) => { e.target.style.background = "#41FFD2"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.background = "#00C4A0"; e.target.style.transform = "none"; }}>
            View Open Roles
          </button>
          <button style={{ background: "transparent", color: "#00C4A0", border: "1.5px solid #00C4A0", borderRadius: "12px", padding: "14px 36px", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", transition: "all 0.25s ease", fontFamily: "Inter, sans-serif" }}
            onMouseEnter={(e) => { e.target.style.background = "rgba(0,196,160,0.08)"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.transform = "none"; }}>
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
}