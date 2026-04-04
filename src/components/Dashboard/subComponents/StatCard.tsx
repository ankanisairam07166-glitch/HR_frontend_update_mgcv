// import React from "react";
// import type { LucideIcon } from "lucide-react";

// type Props = {
//   title: string;
//   value: string | number;
//   change?: number;
//   icon: LucideIcon;
//   color: string; // e.g. "bg-blue-600"
//   subtitle?: string;
//   loading?: boolean;
// };

// const StatCard: React.FC<Props> = ({ title, value, change, icon: Icon, color, subtitle, loading }) => (
//   <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//     <div className="flex items-center justify-between mb-4">
//       <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
//       <div className={`p-2 rounded-lg ${color}`}>
//         <Icon className="w-5 h-5 text-white" />
//       </div>
//     </div>
//     <div className="flex items-baseline">
//       {loading ? (
//         <div className="animate-pulse bg-gray-200 h-8 w-16 rounded" />
//       ) : (
//         <p className="text-3xl font-bold text-gray-900">{value}</p>
//       )}
//       {change !== undefined && !loading && (
//         <span className={`ml-2 text-sm font-medium ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
//           {change >= 0 ? "+" : ""}
//           {change}%
//         </span>
//       )}
//     </div>
//     {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
//   </div>
// );

// export default StatCard;
"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  accentColor: string;   // hex, e.g. "#2563EB"
  iconBg: string;        // hex, e.g. "#2563EB"
  subtitle?: string;
  loading?: boolean;
};

const StatCard: React.FC<Props> = ({
  title,
  value,
  change,
  icon: Icon,
  accentColor,
  iconBg,
  subtitle,
  loading,
}) => (
  <div
    style={{
      background: "#ffffff",
      border: "0.5px solid rgba(0,0,0,0.08)",
      borderRadius: 14,
      padding: "20px 22px",
      position: "relative",
      overflow: "hidden",
      transition: "box-shadow 0.15s",
    }}
    onMouseEnter={e =>
      ((e.currentTarget as HTMLDivElement).style.boxShadow =
        "0 2px 12px rgba(0,0,0,0.06)")
    }
    onMouseLeave={e =>
      ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")
    }
  >
    {/* Left accent bar */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 3,
        height: "100%",
        background: accentColor,
        borderRadius: "14px 0 0 14px",
      }}
    />

    {/* Title + icon row */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#64748B",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </span>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={16} color="#ffffff" strokeWidth={2} />
      </div>
    </div>

    {/* Value + change */}
    <div style={{ display: "flex", alignItems: "baseline", gap: 8, lineHeight: 1 }}>
      {loading ? (
        <div
          style={{
            width: 70,
            height: 28,
            borderRadius: 6,
            background:
              "linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)",
            backgroundSize: "200px 100%",
            animation: "shimmer 1.2s infinite linear",
          }}
        />
      ) : (
        <span
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: "#0F172A",
            letterSpacing: "-1.5px",
          }}
        >
          {value}
        </span>
      )}
      {change !== undefined && !loading && (
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: change >= 0 ? "#059669" : "#DC2626",
          }}
        >
          {change >= 0 ? "+" : ""}
          {change}%
        </span>
      )}
    </div>

    {/* Subtitle */}
    {subtitle && (
      <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 5 }}>{subtitle}</p>
    )}

    <style>{`
      @keyframes shimmer {
        0%   { background-position: -200px 0 }
        100% { background-position:  200px 0 }
      }
    `}</style>
  </div>
);

export default StatCard;