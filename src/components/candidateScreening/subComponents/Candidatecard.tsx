// // import React from "react";
// // import { Candidate } from "@/services/interfaces/CandidateScreening";

// // interface CandidateCardProps {
// //   candidate: Candidate;
// //   isSelected: boolean;
// //   onClick: () => void;
// // }

// // const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, isSelected, onClick }) => {
// //   const StatusIcon = candidate.statusInfo?.icon;
// //   const daysSinceProcessed = candidate?.processed_date
// //     // eslint-disable-next-line react-hooks/purity
// //     ? Math.floor((Date.now() - new Date(candidate.processed_date).getTime()) / (1000 * 60 * 60 * 24))
// //     : 0;

// //   return (
// //     <div
// //       className={`p-4 cursor-pointer transition-all border-l-4 ${
// //         isSelected
// //           ? "bg-blue-50 border-blue-500 shadow-md"
// //           : "hover:bg-gray-50 border-transparent hover:border-gray-300"
// //       }`}
// //       onClick={onClick}
// //     >
// //       <div className="flex items-start justify-between">
// //         <div className="flex items-start space-x-3 flex-1">
// //           {/* Avatar */}
// //           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium flex-shrink-0">
// //             {candidate.name
// //               ?.split(" ")
// //               .map((n: string) => n[0])
// //               .join("")
// //               .toUpperCase()
// //               .slice(0, 2)}
// //           </div>

// //           {/* Candidate Info */}
// //           <div className="flex-1 min-w-0">
// //             <h3 className="font-medium text-gray-900 truncate">{candidate.name}</h3>
// //             <p className="text-sm text-gray-500 truncate">{candidate.email}</p>
// //             <p className="text-xs text-gray-400 mt-1">
// //               {candidate.job_title} • Applied {daysSinceProcessed}d ago
// //             </p>
// //           </div>
// //         </div>

// //         {/* Score and Status */}
// //         <div className="flex flex-col items-end ml-4">
// //           <div className="flex items-center space-x-1 mb-2">
// //             <span className={`text-lg font-bold ${candidate.scoreColor}`}>
// //               {(candidate.displayScore ?? 0).toFixed(0)}
// //             </span>
// //             <span className="text-sm text-gray-500">/100</span>
// //           </div>

// //           {StatusIcon && (
// //             <span
// //               className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${candidate.statusInfo?.color}`}
// //             >
// //               <StatusIcon className="w-3 h-3 mr-1" />
// //               {candidate.displayStatus}
// //             </span>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default React.memo(CandidateCard);
// import React from "react";
// import { Candidate } from "@/services/interfaces/CandidateScreening";

// // ── Design tokens ─────────────────────────────────────────────────────────────
// const T = {
//   accent:  "#2563EB", accentL: "#EFF6FF", accentM: "#BFDBFE",
//   green:   "#059669", greenL:  "#ECFDF5",
//   amber:   "#D97706", amberL:  "#FFFBEB",
//   red:     "#DC2626", redL:    "#FEF2F2",
//   t1: "#0F172A", t2: "#64748B", t3: "#94A3B8",
//   border:  "rgba(0,0,0,0.08)", borderMd: "rgba(0,0,0,0.14)",
//   bg:      "#F8FAFC", surface: "#ffffff",
// } as const;

// // ── Avatar color palette keyed from name ──────────────────────────────────────
// function avatarStyle(name: string): { bg: string; fg: string } {
//   const palettes: [string, string][] = [
//     ["#EFF6FF", "#2563EB"], ["#F0FDF4", "#16A34A"], ["#FFF7ED", "#EA580C"],
//     ["#FAF5FF", "#7C3AED"], ["#FFF1F2", "#E11D48"], ["#F0FDFA", "#0D9488"],
//     ["#FFFBEB", "#D97706"], ["#FDF4FF", "#A21CAF"],
//   ];
//   let h = 0;
//   for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
//   const [bg, fg] = palettes[Math.abs(h) % palettes.length];
//   return { bg, fg };
// }

// // ── Score chip colour ─────────────────────────────────────────────────────────
// function scoreStyle(score: number): { bg: string; color: string } {
//   if (score >= 80) return { bg: T.greenL, color: T.green };
//   if (score >= 60) return { bg: T.amberL, color: T.amber };
//   return { bg: T.redL, color: T.red };
// }

// // ── Status pill colour ────────────────────────────────────────────────────────
// // Extracted as a standalone typed function — avoids TS "expression too complex"
// // errors that occur when long ternary chains are written directly inside JSX
// // style props (which is what caused the red underlines you saw).
// function statusPillStyle(tailwindColor: string): { background: string; color: string } {
//   if (tailwindColor.includes("green"))  return { background: T.greenL,  color: T.green  };
//   if (tailwindColor.includes("blue"))   return { background: T.accentL, color: T.accent };
//   if (tailwindColor.includes("red"))    return { background: T.redL,    color: T.red    };
//   if (tailwindColor.includes("yellow")) return { background: T.amberL,  color: T.amber  };
//   return { background: "#F1F5F9", color: T.t2 };
// }

// // ── Props ─────────────────────────────────────────────────────────────────────
// interface CandidateCardProps {
//   candidate: Candidate;
//   isSelected: boolean;
//   onClick: () => void;
// }

// const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, isSelected, onClick }) => {
//   const StatusIcon = candidate.statusInfo?.icon;
//   const initials   = candidate.name
//     ?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) ?? "??";
//   const avatar     = avatarStyle(candidate.name ?? "");
//   const scoreChip  = scoreStyle(candidate.displayScore ?? 0);

//   // ✅ Computed BEFORE JSX — TypeScript resolves the type of pillStyle easily
//   const pillStyle  = statusPillStyle(candidate.statusInfo?.color ?? "");

//   const daysSince  = candidate?.processed_date
//     ? Math.floor((Date.now() - new Date(candidate.processed_date).getTime()) / 86_400_000)
//     : 0;

//   return (
//     <div
//       onClick={onClick}
//       style={{
//         display: "flex", alignItems: "flex-start", gap: 12,
//         padding: "12px 10px", borderRadius: 10,
//         cursor: "pointer", transition: "background 0.12s",
//         border: `0.5px solid ${isSelected ? T.accentM : "transparent"}`,
//         background: isSelected ? T.accentL : T.surface,
//         marginBottom: 2,
//       }}
//       onMouseEnter={e => {
//         if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = T.bg;
//       }}
//       onMouseLeave={e => {
//         if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = T.surface;
//       }}
//     >
//       {/* Avatar */}
//       <div style={{
//         width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         fontSize: 14, fontWeight: 700,
//         background: avatar.bg, color: avatar.fg,
//       }}>
//         {initials}
//       </div>

//       {/* Info */}
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <p style={{
//           fontSize: 13, fontWeight: 600, color: T.t1, margin: 0,
//           whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
//         }}>
//           {candidate.name}
//         </p>
//         <p style={{
//           fontSize: 11, color: T.t2, marginTop: 2,
//           whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
//         }}>
//           {candidate.email}
//         </p>
//         <p style={{ fontSize: 10, color: T.t3, marginTop: 3 }}>
//           {candidate.job_title} · Applied {daysSince}d ago
//         </p>

//         {/* Status pill — uses pre-computed pillStyle, no inline ternary chain */}
//         {StatusIcon && (
//           <span style={{
//             display: "inline-flex", alignItems: "center", gap: 4,
//             fontSize: 10, fontWeight: 600, padding: "2px 8px",
//             borderRadius: 20, marginTop: 6,
//             background: pillStyle.background,
//             color:      pillStyle.color,
//           }}>
//             <StatusIcon size={10} />
//             {candidate.displayStatus}
//           </span>
//         )}
//       </div>

//       {/* Score chip */}
//       <div style={{
//         flexShrink: 0, display: "flex",
//         flexDirection: "column", alignItems: "flex-end", gap: 4,
//       }}>
//         <span style={{
//           fontSize: 13, fontWeight: 700, padding: "3px 9px",
//           borderRadius: 7, minWidth: 40, textAlign: "center",
//           background: scoreChip.bg, color: scoreChip.color,
//         }}>
//           {(candidate.displayScore ?? 0).toFixed(0)}
//         </span>
//         <span style={{ fontSize: 10, color: T.t3 }}>/100</span>
//       </div>
//     </div>
//   );
// };

// export default React.memo(CandidateCard);
import React from "react";
import type { LucideIcon } from "lucide-react";
import { Candidate } from "@/services/interfaces/CandidateScreening";

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  accent:  "#2563EB", accentL: "#EFF6FF", accentM: "#BFDBFE",
  green:   "#059669", greenL:  "#ECFDF5",
  amber:   "#D97706", amberL:  "#FFFBEB",
  red:     "#DC2626", redL:    "#FEF2F2",
  t1: "#0F172A", t2: "#64748B", t3: "#94A3B8",
  border:  "rgba(0,0,0,0.08)", borderMd: "rgba(0,0,0,0.14)",
  bg:      "#F8FAFC", surface: "#ffffff",
} as const;

// ── Avatar color palette keyed from name ──────────────────────────────────────
function avatarStyle(name: string): { bg: string; fg: string } {
  const palettes: [string, string][] = [
    ["#EFF6FF", "#2563EB"], ["#F0FDF4", "#16A34A"], ["#FFF7ED", "#EA580C"],
    ["#FAF5FF", "#7C3AED"], ["#FFF1F2", "#E11D48"], ["#F0FDFA", "#0D9488"],
    ["#FFFBEB", "#D97706"], ["#FDF4FF", "#A21CAF"],
  ];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  const [bg, fg] = palettes[Math.abs(h) % palettes.length];
  return { bg, fg };
}

// ── Score chip colour ─────────────────────────────────────────────────────────
function scoreStyle(score: number): { bg: string; color: string } {
  if (score >= 80) return { bg: T.greenL, color: T.green };
  if (score >= 60) return { bg: T.amberL, color: T.amber };
  return { bg: T.redL, color: T.red };
}

// ── Status pill colour ────────────────────────────────────────────────────────
// Extracted as a standalone typed function — avoids TS "expression too complex"
// errors that occur when long ternary chains are written directly inside JSX
// style props.
function statusPillStyle(tailwindColor: string): { background: string; color: string } {
  if (tailwindColor.includes("green"))  return { background: T.greenL,  color: T.green  };
  if (tailwindColor.includes("blue"))   return { background: T.accentL, color: T.accent };
  if (tailwindColor.includes("red"))    return { background: T.redL,    color: T.red    };
  if (tailwindColor.includes("yellow")) return { background: T.amberL,  color: T.amber  };
  return { background: "#F1F5F9", color: T.t2 };
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onClick: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, isSelected, onClick }) => {

  // ✅ Null guard — if candidate is null/undefined don't render anything
  if (!candidate) return null;

  // ✅ FIX: cast statusInfo.icon to LucideIcon so TypeScript knows it
  //    accepts size, color, strokeWidth etc.
  //    Without this cast TS infers the icon as a generic React component
  //    that only has className — so size={10} causes the build error.
  const StatusIcon = candidate.statusInfo?.icon as LucideIcon | undefined;

  const initials  = candidate.name
    ?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) ?? "??";
  const avatar    = avatarStyle(candidate.name ?? "");
  const scoreChip = scoreStyle(candidate.displayScore ?? 0);
  const pillStyle = statusPillStyle(candidate.statusInfo?.color ?? "");

  const daysSince = candidate.processed_date
    ? Math.floor((Date.now() - new Date(candidate.processed_date).getTime()) / 86_400_000)
    : 0;

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex", alignItems: "flex-start", gap: 12,
        padding: "12px 10px", borderRadius: 10,
        cursor: "pointer", transition: "background 0.12s",
        border: `0.5px solid ${isSelected ? T.accentM : "transparent"}`,
        background: isSelected ? T.accentL : T.surface,
        marginBottom: 2,
      }}
      onMouseEnter={e => {
        if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = T.bg;
      }}
      onMouseLeave={e => {
        if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = T.surface;
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, fontWeight: 700,
        background: avatar.bg, color: avatar.fg,
      }}>
        {initials}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 13, fontWeight: 600, color: T.t1, margin: 0,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {candidate.name}
        </p>
        <p style={{
          fontSize: 11, color: T.t2, marginTop: 2,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {candidate.email}
        </p>
        <p style={{ fontSize: 10, color: T.t3, marginTop: 3 }}>
          {candidate.job_title} · Applied {daysSince}d ago
        </p>

        {/* Status pill — StatusIcon is now LucideIcon, so size={10} is valid */}
        {StatusIcon && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            fontSize: 10, fontWeight: 600, padding: "2px 8px",
            borderRadius: 20, marginTop: 6,
            background: pillStyle.background,
            color:      pillStyle.color,
          }}>
            <StatusIcon size={10} />
            {candidate.displayStatus}
          </span>
        )}
      </div>

      {/* Score chip */}
      <div style={{
        flexShrink: 0, display: "flex",
        flexDirection: "column", alignItems: "flex-end", gap: 4,
      }}>
        <span style={{
          fontSize: 13, fontWeight: 700, padding: "3px 9px",
          borderRadius: 7, minWidth: 40, textAlign: "center",
          background: scoreChip.bg, color: scoreChip.color,
        }}>
          {(candidate.displayScore ?? 0).toFixed(0)}
        </span>
        <span style={{ fontSize: 10, color: T.t3 }}>/100</span>
      </div>
    </div>
  );
};

export default React.memo(CandidateCard);