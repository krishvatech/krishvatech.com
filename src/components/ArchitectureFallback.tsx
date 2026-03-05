import React from "react";

export default function ArchitectureFallback() {
  return (
    <div className="edge-datacenter-fallback" role="img" aria-label="Edge AI architecture fallback diagram">
      <svg viewBox="0 0 1200 420" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="nodeFill" x1="0" x2="1">
            <stop offset="0%" stopColor="#0f192d" />
            <stop offset="100%" stopColor="#101d33" />
          </linearGradient>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#76B900" opacity="0.8" />
          </marker>
        </defs>

        <rect x="0" y="0" width="1200" height="420" fill="#0B0F19" />

        {[120, 300, 480, 660, 840, 1020].map((x) => (
          <line key={`v-${x}`} x1={x} y1={20} x2={x} y2={400} stroke="#1d2b48" strokeOpacity="0.3" />
        ))}
        {[90, 180, 270, 360].map((y) => (
          <line key={`h-${y}`} x1={20} y1={y} x2={1180} y2={y} stroke="#1d2b48" strokeOpacity="0.28" />
        ))}

        <g fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="18" fill="#E8EEFB" textAnchor="middle">
          <rect x="80" y="145" width="170" height="70" rx="12" fill="url(#nodeFill)" stroke="#3b5c91" />
          <text x="165" y="187">Camera Sources</text>

          <rect x="300" y="145" width="170" height="70" rx="12" fill="url(#nodeFill)" stroke="#3b5c91" />
          <text x="385" y="187">RTSP Ingest</text>

          <rect x="520" y="145" width="180" height="70" rx="12" fill="url(#nodeFill)" stroke="#76B900" />
          <text x="610" y="187">Jetson Racks</text>

          <rect x="760" y="145" width="180" height="70" rx="12" fill="url(#nodeFill)" stroke="#76B900" />
          <text x="850" y="187">DeepStream + TensorRT</text>

          <rect x="990" y="145" width="150" height="70" rx="12" fill="url(#nodeFill)" stroke="#3b5c91" />
          <text x="1065" y="187">Dashboard</text>
        </g>

        {[
          [250, 180, 300, 180],
          [470, 180, 520, 180],
          [700, 180, 760, 180],
          [940, 180, 990, 180],
        ].map((line, idx) => (
          <line
            key={`flow-${idx}`}
            x1={line[0]}
            y1={line[1]}
            x2={line[2]}
            y2={line[3]}
            stroke="#76B900"
            strokeWidth="2"
            strokeOpacity="0.72"
            markerEnd="url(#arrow)"
          />
        ))}

        <text
          x="600"
          y="275"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="16"
          fill="#AFC2E7"
        >
          WebGL is unavailable on this device. Showing static architecture diagram.
        </text>
      </svg>
    </div>
  );
}
