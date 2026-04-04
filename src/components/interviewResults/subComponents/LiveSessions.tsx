// // import React from "react";
// // import { Activity, CircleDot } from "lucide-react";
// // import { InterviewCandidate } from "@/services/api/interviewResultsAPI";

// // const LiveSessions: React.FC<{
// //   candidates: InterviewCandidate[];
// //   liveStatuses: Record<number, any>;
// //   onOpen: (id: number) => void;
// // }> = ({ candidates, liveStatuses, onOpen }) => {
// //   const live = candidates.filter((c) => c && liveStatuses[c.id]);

// //   if (!live.length) return null;

// //   return (
// //     <div className="mb-6">
// //       <h3 className="mb-3 flex items-center text-lg font-semibold">
// //         <Activity className="mr-2 h-5 w-5 text-blue-600" />
// //         Live Interview Sessions
// //       </h3>
// //       <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
// //         {live.map((c) => {
// //           const s = liveStatuses[c.id];
// //           return (
// //             <div key={c.id} className="rounded-lg border bg-white p-4 shadow-sm">
// //               <div className="mb-3 flex items-start justify-between">
// //                 <div>
// //                   <button
// //                     className="font-semibold text-gray-900 hover:text-blue-600"
// //                     onClick={() => onOpen(c.id)}
// //                   >
// //                     {c.name}
// //                   </button>
// //                   <p className="text-sm text-gray-600">{c.job_title}</p>
// //                 </div>
// //                 <CircleDot className={`h-4 w-4 ${s.is_active ? "text-green-600 animate-pulse" : "text-gray-400"}`} />
// //               </div>

// //               <div className="space-y-2">
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-gray-600">Progress:</span>
// //                   <span className="font-medium">{(s.progress ?? 0).toFixed(0)}%</span>
// //                 </div>
// //                 <div className="h-2 w-full rounded-full bg-gray-200">
// //                   <div
// //                     className="h-2 rounded-full bg-blue-600 transition-all"
// //                     style={{ width: `${s.progress ?? 0}%` }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LiveSessions;

// import React from "react";
// import { Activity, CircleDot } from "lucide-react";

// // Minimal local shape used by this component.
// // Swap this for a shared export when you add one.
// type InterviewCandidate = {
//   id: number;
//   name: string;
//   email?: string | null;
//   job_title?: string | null;

//   interview_started_at?: string | null;
//   interview_completed_at?: string | null;
//   interview_ai_analysis_status?: "processing" | string | null;
// };

// type LiveStatus = {
//   progress?: number;
//   started_at?: string;
//   // add anything else you surface (e.g., room, duration, etc.)
// };

// const LiveSessions: React.FC<{
//   candidates: InterviewCandidate[];
//   liveStatuses: Record<number, LiveStatus | undefined>;onOpen?: (id: number) => void;
// }> = ({ candidates, liveStatuses }) => {
//   // “Live” = has a live status entry, or started but not completed.
//   const live = candidates.filter((c) => {
//     const s = liveStatuses[c.id];
//     const started = !!c.interview_started_at && !c.interview_completed_at;
//     const hasLive = !!s && (s.progress ?? 0) >= 0;
//     return started || hasLive;
//   });

//   return (
//     <div className="rounded-lg border bg-white shadow-sm">
//       <div className="flex items-center justify-between border-b p-4">
//         <div className="flex items-center gap-2">
//           <Activity className="h-5 w-5 text-green-600" />
//           <h3 className="text-lg font-semibold">Live Sessions</h3>
//         </div>
//         <span className="text-sm text-gray-500">{live.length} active</span>
//       </div>

//       {live.length === 0 ? (
//         <div className="p-6 text-center text-gray-500">No sessions are live right now</div>
//       ) : (
//         <ul className="divide-y">
//           {live.map((c) => {
//             const s = liveStatuses[c.id];
//             const progress = Math.max(0, Math.min(100, Math.round(s?.progress ?? 0)));

//             return (
//               <li key={c.id} className="flex items-center justify-between p-4">
//                 <div className="min-w-0">
//                   <div className="flex items-center gap-2">
//                     <CircleDot className="h-4 w-4 text-green-600" />
//                     <span className="truncate font-medium text-gray-900">{c.name}</span>
//                   </div>
//                   <div className="truncate text-sm text-gray-500">
//                     {c.job_title ?? "—"} {c.email ? `• ${c.email}` : ""}
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="w-40">
//                     <div className="h-2 w-full rounded-full bg-gray-200">
//                       <div
//                         className="h-2 rounded-full bg-green-600 transition-all"
//                         style={{ width: `${progress}%` }}
//                       />
//                     </div>
//                     <div className="mt-1 text-right text-xs text-gray-500">{progress}%</div>
//                   </div>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default LiveSessions;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import type { InterviewRow, Verdict } from "./CandidatesTable";

interface LiveSessionsProps {
  results: InterviewRow[];
}

// ── helpers ───────────────────────────────────────────────────────────────────
function barColor(sc: number) { return sc >= 75 ? "#059669" : sc >= 55 ? "#D97706" : "#DC2626"; }

const VERDICT_COLOR: Record<Verdict, string> = {
  offer_extended: "#059669",
  next_round:     "#2563EB",
  on_hold:        "#D97706",
  rejected:       "#DC2626",
  pending:        "#94A3B8",
};
const VERDICT_LABEL: Record<Verdict, string> = {
  offer_extended: "Offer Extended",
  next_round:     "Next Round",
  on_hold:        "On Hold",
  rejected:       "Rejected",
  pending:        "Pending",
};

const UPCOMING = [
  { name: "Riya Kapoor",  role: "ML Engineer",      time: "10:00", ampm: "AM", type: "Technical", by: "Rahul M",    round: "R2"    },
  { name: "Nikhil Gupta", role: "Python Developer", time: "11:30", ampm: "AM", type: "HR Round",  by: "Preethi S",  round: "Final" },
  { name: "Asha Iyer",    role: "UX Designer",       time: "2:00",  ampm: "PM", type: "Technical", by: "Sanjay N",   round: "R1"    },
  { name: "Kiran Das",    role: "Data Scientist",    time: "4:30",  ampm: "PM", type: "Technical", by: "Deepa K",    round: "R2"    },
];

const ACTIVITY = [
  { icon: "check",    color: "#059669", text: ["Lakshmi Nair", " received an offer for Senior Software Engineer"],  time: "2h ago"  },
  { icon: "calendar", color: "#2563EB", text: ["Interview scheduled for ", "Riya Kapoor", " — ML Engineer R2"],     time: "3h ago"  },
  { icon: "x",        color: "#DC2626", text: ["Rohit Kumar", " marked as rejected for Medical Coding"],            time: "5h ago"  },
  { icon: "star",     color: "#D97706", text: ["Kiran Mehta", " scored 91/100 in Final round interview"],          time: "Yesterday"},
  { icon: "clock",    color: "#7C3AED", text: ["Vikram Singh", " moved to On Hold — pending final review"],        time: "Yesterday"},
  { icon: "check",    color: "#059669", text: ["Arjun Sharma", " passed R1 — moved to Round 2"],                   time: "2d ago"  },
];

// ── Icon SVG paths ─────────────────────────────────────────────────────────────
const ICON_PATH: Record<string, string> = {
  check:    "M20 6 9 17 4 12",
  calendar: "M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
  x:        "M18 6 6 18M6 6l12 12",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  clock:    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2",
};

function FeedIcon({ icon, color }: { icon: string; color: string }) {
  return (
    <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: color + "18", border: `0.5px solid ${color}30` }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color}
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={ICON_PATH[icon]} />
      </svg>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
const LiveSessions: React.FC<LiveSessionsProps> = ({ results }) => {
  const total  = results.length;
  const offers = results.filter(r => r.verdict === "offer_extended").length;
  const offerRate = total > 0 ? Math.round((offers / total) * 100) : 0;

  // SVG ring
  const R = 29, circ = 2 * Math.PI * R;
  const dash = (offerRate / 100) * circ;

  const verdictCounts: Record<Verdict, number> = {
    offer_extended: 0, next_round: 0, on_hold: 0, rejected: 0, pending: 0,
  };
  results.forEach(r => { if (verdictCounts[r.verdict] !== undefined) verdictCounts[r.verdict]++; });

  // Criteria averages from all results
  const CRITERIA = ["Technical Skills","Communication","Problem Solving","Cultural Fit","Leadership Potential"];
  const criteriaAvgs = CRITERIA.map(k => {
    const vals = results.filter(r => r.criteria?.[k] != null).map(r => r.criteria![k] as number);
    return { key: k, avg: vals.length ? Math.round(vals.reduce((a,b)=>a+b,0)/vals.length) : 0 };
  });
  const maxAvg = Math.max(...criteriaAvgs.map(c => c.avg), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* ── Verdict overview ring ── */}
      <Card title="Verdict Overview">
        {/* Ring */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <div style={{ position: "relative", width: 74, height: 74, flexShrink: 0 }}>
            <svg width="74" height="74" viewBox="0 0 74 74" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="37" cy="37" r={R} fill="none" stroke="#F1F5F9" strokeWidth="9" />
              <circle cx="37" cy="37" r={R} fill="none" stroke="#059669" strokeWidth="9"
                strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`} strokeLinecap="round" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
                          justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#0F172A" }}>
              {offerRate}%
            </div>
          </div>
          <div>
            <p style={{ fontSize: 11, color: "#64748B", marginBottom: 3 }}>Offer rate</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#059669", letterSpacing: "-.8px", lineHeight: 1 }}>
              {offerRate}%
            </p>
            <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 3 }}>{offers} offers from {total} interviews</p>
          </div>
        </div>

        {/* Verdict stat rows */}
        {(["offer_extended","next_round","on_hold","rejected","pending"] as Verdict[]).map(v => (
          <div key={v} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                                padding: "9px 0", borderBottom: "0.5px solid rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#64748B" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: VERDICT_COLOR[v], flexShrink: 0 }} />
              {VERDICT_LABEL[v]}
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{verdictCounts[v]}</span>
          </div>
        ))}
      </Card>

      {/* ── Score by criteria ── */}
      <Card title="Avg Score by Criteria">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {criteriaAvgs.map(c => (
            <div key={c.key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <p style={{ fontSize: 11, color: "#64748B", width: 130, flexShrink: 0 }}>{c.key}</p>
              <div style={{ flex: 1, height: 7, background: "#F1F5F9", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.round((c.avg/maxAvg)*100)}%`,
                              background: barColor(c.avg), borderRadius: 4, transition: "width .5s" }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", width: 28, textAlign: "right" }}>
                {c.avg}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Upcoming interviews ── */}
      <Card title="Upcoming Interviews" action="View all">
        <div>
          {UPCOMING.map((u, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
                                   borderBottom: i < UPCOMING.length-1 ? "0.5px solid rgba(0,0,0,0.06)" : "none" }}>
              <div style={{ textAlign: "center", flexShrink: 0, width: 44 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{u.time}</p>
                <p style={{ fontSize: 10, color: "#94A3B8", textTransform: "uppercase" }}>{u.ampm}</p>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#0F172A", whiteSpace: "nowrap",
                             overflow: "hidden", textOverflow: "ellipsis" }}>{u.name}</p>
                <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{u.role} · {u.type} · {u.round}</p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 20,
                             background: "#EFF6FF", color: "#2563EB", flexShrink: 0 }}>{u.by}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Recent activity ── */}
      <Card title="Recent Activity">
        <div>
          {ACTIVITY.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "11px 0",
                                   borderBottom: i < ACTIVITY.length-1 ? "0.5px solid rgba(0,0,0,0.06)" : "none" }}>
              <FeedIcon icon={a.icon} color={a.color} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, color: "#0F172A", lineHeight: 1.55 }}>
                  {Array.isArray(a.text)
                    ? a.text.map((t, ti) => ti % 2 === 0
                        ? <span key={ti}>{t}</span>
                        : <strong key={ti}>{t}</strong>)
                    : a.text}
                </p>
                <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};

// ── Reusable card shell ────────────────────────────────────────────────────────
const Card: React.FC<{ title: string; action?: string; children: React.ReactNode }> = ({ title, action, children }) => (
  <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 14, overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 20px", borderBottom: "0.5px solid rgba(0,0,0,0.06)" }}>
      <p style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{title}</p>
      {action && (
        <button style={{ fontSize: 13, fontWeight: 500, color: "#2563EB", background: "transparent",
                         border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 8 }}>
          {action}
        </button>
      )}
    </div>
    <div style={{ padding: "16px 20px" }}>{children}</div>
  </div>
);

export default LiveSessions;