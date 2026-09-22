"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Mail, Briefcase, Settings, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import PageShell from "@/components/PageShell";
import notFoundJson from "@/data/not-found/not-found.json";

interface GraphNode {
  id: number;
  x: number;
  y: number;
  label: string;
}

interface PacketProps {
  from: number;
  to: number;
  nodes: GraphNode[];
  color: string;
  delay: number;
  duration: number;
}

const NODES = notFoundJson.nodes;
const EDGES = notFoundJson.edges;

const Packet = ({ from, to, nodes, color, delay, duration }: PacketProps) => {
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
  const [hovered, setHovered] = useState<number | null>(null);

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
      {notFoundJson.packets.map((p, i) => (
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

const GlitchText = ({ text }: { text: string }) => {
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

const TerminalLine = ({ text, delay, color = "#86efac" }: { text: string; delay: number; color?: string }) => {
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
  const router = useRouter();

  const iconMap: Record<string, LucideIcon> = { Settings, User, Briefcase, Mail };

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

      <PageShell activeSection="home">
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
                    {notFoundJson.graphLabel}
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
                    <GlitchText text={notFoundJson.code} />
                  </div>

                  <div className="fade-up-2 mb-6">
                    <p style={{ fontFamily: "'Courier New', monospace", fontSize: "18px", color: "#374151", fontWeight: 600 }}>
                      {notFoundJson.message}
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
                      <span className="ml-2 text-xs font-mono text-gray-500">{notFoundJson.terminalTitle}</span>
                    </div>
                    <div className="px-4 py-4 space-y-0">
                      {notFoundJson.terminalLines.map((line) => <TerminalLine key={line.text} {...line} />)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="fade-up-4 flex gap-3">
                    <button
                      onClick={() => router.back()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm font-semibold border transition-all hover:bg-gray-50"
                      style={{ borderColor: "#d1d5db", color: "#374151" }}
                    >
                      <ArrowLeft size={15} /> back
                    </button>
                    <Link
                      href="/"
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
                <div className="text-xs font-mono text-gray-400 mb-4 uppercase tracking-widest">{notFoundJson.navTitle}</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {notFoundJson.navLinks.map((link) => {
                    const Icon = iconMap[link.icon];
                    return (
                    <Link
                      key={link.to}
                      href={link.to}
                      className="nav-card flex items-center gap-3 p-3 rounded-xl border"
                      style={{ background: link.bg, borderColor: `${link.accent}25` }}
                    >
                      <div className="shrink-0" style={{ color: link.accent }}><Icon size={16} /></div>
                      <div>
                        <div className="font-mono font-bold text-gray-900 text-sm leading-none mb-0.5">{link.label}</div>
                        <div className="text-xs text-gray-500">{link.sub}</div>
                      </div>
                    </Link>
                    );
                  })}
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
