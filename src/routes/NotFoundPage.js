import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Mail, Briefcase, Settings, User } from "lucide-react";
import PageShell from "./PageShell";

const NODES = [
  { id: 0, x: 15, y: 20, label: "google.com" },
  { id: 1, x: 75, y: 10, label: "github.com" },
  { id: 2, x: 88, y: 55, label: "reddit.com" },
  { id: 3, x: 60, y: 85, label: "twitter.com" },
  { id: 4, x: 20, y: 78, label: "wikipedia.org" },
  { id: 5, x: 45, y: 30, label: "404 ?" },
  { id: 6, x: 10, y: 50, label: "youtube.com" },
  { id: 7, x: 80, y: 30, label: "npm.js" },
  { id: 8, x: 35, y: 65, label: "stack overflow" },
];

const EDGES = [
  [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [6, 5], [7, 5], [8, 5],
  [0, 6], [1, 7], [2, 3], [3, 8], [4, 8], [0, 4],
];

const Packet = ({ from, to, nodes, color, delay, duration }) => {
  const f = nodes[from];
  const t = nodes[to];
  return (
    <circle r="3" fill={color} opacity="0.85">
      <animateMotion
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        calcMode="linear"
      >
        <mpath>
          <animate
            attributeName="d"
            from={`M${f.x},${f.y} L${t.x},${t.y}`}
            to={`M${f.x},${f.y} L${t.x},${t.y}`}
          />
        </mpath>
      </animateMotion>
      <animateMotion
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        path={`M${f.x} ${f.y} L${t.x} ${t.y}`}
      />
    </circle>
  );
};

const WebGraph = () => {
  const [hovered, setHovered] = useState(null);

  const packets = [
    { from: 0, to: 5, color: "#f97316", delay: 0, duration: 2.4 },
    { from: 1, to: 5, color: "#fb923c", delay: 0.6, duration: 2.1 },
    { from: 2, to: 5, color: "#fbbf24", delay: 1.2, duration: 2.8 },
    { from: 3, to: 5, color: "#f97316", delay: 0.3, duration: 2.5 },
    { from: 6, to: 5, color: "#fb923c", delay: 1.8, duration: 2.2 },
    { from: 7, to: 5, color: "#fbbf24", delay: 0.9, duration: 1.9 },
    { from: 4, to: 5, color: "#f97316", delay: 1.5, duration: 2.6 },
    { from: 8, to: 5, color: "#fb923c", delay: 0.1, duration: 2.3 },
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 24px rgba(249,115,22,0.15))" }}
    >
      <defs>
        <radialGradient id="glow404" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
        <filter id="blur404">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      {/* Glow at 404 node */}
      <circle cx="45" cy="30" r="12" fill="url(#glow404)" filter="url(#blur404)" />

      {/* Edges */}
      {EDGES.map(([a, b], i) => {
        const na = NODES[a], nb = NODES[b];
        const is404 = a === 5 || b === 5;
        return (
          <line
            key={i}
            x1={na.x} y1={na.y}
            x2={nb.x} y2={nb.y}
            stroke={is404 ? "#f9731640" : "#6b728030"}
            strokeWidth={is404 ? "0.4" : "0.25"}
            strokeDasharray={is404 ? "0.8 1.2" : "none"}
          />
        );
      })}

      {/* Packets */}
      {packets.map((p, i) => (
        <Packet key={i} {...p} nodes={NODES} />
      ))}

      {/* Nodes */}
      {NODES.map((n) => {
        const is404 = n.id === 5;
        const isHov = hovered === n.id;
        return (
          <g key={n.id} onMouseEnter={() => setHovered(n.id)} onMouseLeave={() => setHovered(null)}>
            <circle
              cx={n.x} cy={n.y}
              r={is404 ? 4.5 : isHov ? 2.8 : 2}
              fill={is404 ? "#f97316" : "#1f2937"}
              stroke={is404 ? "#fbbf24" : isHov ? "#f97316" : "#374151"}
              strokeWidth={is404 ? "0.8" : "0.4"}
              style={{ transition: "r 0.2s, fill 0.2s" }}
            >
              {is404 && (
                <animate attributeName="r" values="4.5;5.5;4.5" dur="2s" repeatCount="indefinite" />
              )}
            </circle>
            {(isHov || is404) && (
              <text
                x={n.x}
                y={n.y - (is404 ? 6.5 : 3.5)}
                textAnchor="middle"
                fontSize={is404 ? "3.5" : "2.8"}
                fill={is404 ? "#f97316" : "#9ca3af"}
                fontFamily="monospace"
                fontWeight={is404 ? "bold" : "normal"}
              >
                {n.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

const GlitchText = ({ text }) => {
  return (
    <span className="relative inline-block select-none" aria-label={text}>
      <span
        className="relative z-10"
        style={{
          fontFamily: "'Courier New', monospace",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          color: "#111827",
        }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          fontFamily: "'Courier New', monospace",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          color: "#f97316",
          animation: "glitch1 3.5s infinite",
          clipPath: "polygon(0 30%, 100% 30%, 100% 55%, 0 55%)",
        }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          fontFamily: "'Courier New', monospace",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          color: "#3b82f6",
          animation: "glitch2 3.5s infinite",
          clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
        }}
      >
        {text}
      </span>
    </span>
  );
};

const TerminalLine = ({ text, delay, color = "#86efac" }) => {
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t1);
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      setTyped(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 22);
    return () => clearInterval(interval);
  }, [visible, text]);

  if (!visible) return null;
  return (
    <div style={{ color, fontFamily: "monospace", fontSize: "13px", lineHeight: "1.8" }}>
      {typed}
      {typed.length < text.length && (
        <span style={{ animation: "blink 1s infinite", color: "#f97316" }}>█</span>
      )}
    </div>
  );
};

const NotFoundPage = () => {
  const navigate = useNavigate();

  const onNavigate = (key) => {
    if (key === "home") navigate("/");
    else navigate(`/${key}`);
  };

  const navLinks = [
    { to: "/services", icon: <Settings size={16} />, label: "Services", sub: "What I offer", accent: "#f97316", bg: "#fff7ed" },
    { to: "/skills", icon: <User size={16} />, label: "Skills", sub: "Tools & stack", accent: "#d97706", bg: "#fffbeb" },
    { to: "/projects", icon: <Briefcase size={16} />, label: "Projects", sub: "Selected work", accent: "#be123c", bg: "#fff1f2" },
    { to: "/contact", icon: <Mail size={16} />, label: "Contact", sub: "Let's talk", accent: "#0e7490", bg: "#ecfeff" },
  ];

  return (
    <>
      <style>{`
        @keyframes glitch1 {
          0%, 90%, 100% { transform: translate(0); opacity: 0; }
          92% { transform: translate(-3px, 1px); opacity: 0.7; }
          94% { transform: translate(3px, -1px); opacity: 0.7; }
          96% { transform: translate(-2px, 2px); opacity: 0.7; }
          98% { transform: translate(0); opacity: 0; }
        }
        @keyframes glitch2 {
          0%, 88%, 100% { transform: translate(0); opacity: 0; }
          90% { transform: translate(2px, -2px); opacity: 0.6; }
          92% { transform: translate(-3px, 1px); opacity: 0.6; }
          94% { transform: translate(1px, 2px); opacity: 0.6; }
          96% { transform: translate(0); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.6s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.6s 0.25s ease both; }
        .fade-up-3 { animation: fadeUp 0.6s 0.4s ease both; }
        .fade-up-4 { animation: fadeUp 0.6s 0.55s ease both; }
        .nav-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
        .nav-card { transition: transform 0.2s, box-shadow 0.2s; }
      `}</style>

      <PageShell activeSection="home" onNavigate={onNavigate}>
        <section className="min-h-[calc(100vh-72px)] flex items-center px-4 sm:px-8 py-12"
          style={{ background: "linear-gradient(135deg, #fafafa 0%, #fff7ed 50%, #fafafa 100%)" }}>
          <div className="w-full max-w-5xl mx-auto">

            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden border border-orange-100"
              style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)" }}>

              {/* Scanline overlay */}
              <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-3xl opacity-[0.03]">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} style={{ height: "2px", background: "#000", marginBottom: "4px" }} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                {/* Left: Graph visualization */}
                <div className="fade-up relative flex flex-col items-center justify-center p-8 lg:p-10 lg:border-r border-orange-100"
                  style={{ minHeight: "380px" }}>
                  <div className="text-lg font-mono text-orange-600 mb-4 tracking-widest uppercase opacity-70">
                    routing packets 
                  </div>
                  <div className="w-full" style={{ maxWidth: "360px", animation: "float 4s ease-in-out infinite" }}>
                    <WebGraph />
                  </div>
                  {/* <div className="text-xs font-mono text-gray-400 mt-4 text-center">
                    all roads lead to <span style={{ color: "#f97316" }}>nowhere</span>
                  </div> */}
                </div>

                {/* Right: Content */}
                <div className="flex flex-col justify-center p-8 lg:p-10">
                  <div className="fade-up-1">
                    {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-6"
                      style={{ background: "#111827", color: "#f97316", letterSpacing: "0.08em" }}>
                      <span style={{ color: "#86efac" }}>$</span> traceroute {window?.location?.pathname ?? "/???"}
                    </div> */}
                  </div>

                  <div className="fade-up-2 mb-2" style={{ fontSize: "clamp(72px, 12vw, 108px)", lineHeight: 1 }}>
                    <GlitchText text="404" />
                  </div>

                  <div className="fade-up-2 mb-6">
                    <p style={{ fontFamily: "'Courier New', monospace", fontSize: "18px", color: "#374151", fontWeight: 600 }}>
                      lost in the web
                    </p>
                    {/* <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, marginTop: "8px" }}>
                      The URL you requested doesn't resolve to any known handler.
                      Packets are bouncing around the network, looking for you.
                    </p> */}
                  </div>

                  {/* Terminal */}
                  <div className="fade-up-3 rounded-2xl overflow-hidden mb-6 border border-gray-800"
                    style={{ background: "#0d1117" }}>
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      <span className="ml-2 text-xs font-mono text-gray-500">traceroute</span>
                    </div>
                    <div className="px-4 py-4 space-y-0">
                      <TerminalLine text="$ traceroute mystery.url" delay={300} color="#9ca3af" />
                      <TerminalLine text="  1  router.local (10.0.0.1)   1ms" delay={900} color="#9ca3af" />
                      <TerminalLine text="  2  isp.gateway (203.x.x.1)  12ms" delay={1400} color="#9ca3af" />
                      <TerminalLine text="  3  * * * request timed out" delay={1900} color="#fbbf24" />
                      <TerminalLine text="  4  * * * request timed out" delay={2500} color="#fbbf24" />
                      <TerminalLine text="  → destination host unreachable" delay={3100} color="#f87171" />
                      <TerminalLine text="  ✓ known routes: /, /services, /projects..." delay={3800} color="#86efac" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="fade-up-4 flex gap-3">
                    <button
                      onClick={() => navigate(-1)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm font-semibold border transition-all hover:bg-gray-50"
                      style={{ borderColor: "#d1d5db", color: "#374151" }}
                    >
                      <ArrowLeft size={15} /> back
                    </button>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm font-bold text-white transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #f97316, #be123c)" }}
                    >
                      <Home size={15} /> home
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom nav strip */}
              <div className="border-t border-orange-100 px-8 py-5">
                <div className="text-xs font-mono text-gray-400 mb-4 uppercase tracking-widest">known endpoints</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="nav-card flex items-center gap-3 p-3 rounded-xl border"
                      style={{ background: link.bg, borderColor: `${link.accent}25` }}
                    >
                      <div className="shrink-0" style={{ color: link.accent }}>{link.icon}</div>
                      <div>
                        <div className="font-mono font-bold text-gray-900 text-sm leading-none mb-0.5">{link.label}</div>
                        <div className="text-xs text-gray-500">{link.sub}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>
      </PageShell>
    </>
  );
};

export default NotFoundPage;