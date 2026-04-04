// // // import React from "react";
// // // import { Send, CheckCircle, BarChart, Award } from "lucide-react";
// // // import { Job } from "@/services/interfaces/Assessmentinterface";


// // // interface StatsCardsProps {
// // //   selectedJob: Job;
// // // }

// // // const StatsCards: React.FC<StatsCardsProps> = ({ selectedJob }) => {
// // //   const stats = {
// // //     totalSent: 10,
// // //     totalCompleted: 6,
// // //     avgScore: 82.5,
// // //     passRate: 70,
// // //   };

// // //   const cards = [
// // //     { label: "Total Sent", value: stats.totalSent, icon: Send, color: "text-blue-600" },
// // //     { label: "Completed", value: stats.totalCompleted, icon: CheckCircle, color: "text-green-600" },
// // //     { label: "Average Score", value: `${stats.avgScore}%`, icon: BarChart, color: "text-purple-600" },
// // //     { label: "Pass Rate", value: `${stats.passRate}%`, icon: Award, color: "text-yellow-600" },
// // //   ];

// // //   return (
// // //     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
// // //       {cards.map(({ label, value, icon: Icon, color }) => (
// // //         <div key={label} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-sm text-gray-600">{label}</p>
// // //               <p className="text-2xl font-bold text-gray-900">{value}</p>
// // //             </div>
// // //             <Icon className={`w-8 h-8 ${color}`} />
// // //           </div>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // export default StatsCards;
// // import React from "react";

// // export interface StatsCardsProps {
// //   stats: {
// //     totalSent: number;
// //     totalCompleted: number;
// //     avgScore: number;
// //     passRate: number;
// //   };
// // }

// // const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
// //   const data = [
// //     { label: "Assessments Sent", value: stats.totalSent },
// //     { label: "Completed", value: stats.totalCompleted },
// //     { label: "Average Score", value: `${stats.avgScore}%` },
// //     { label: "Pass Rate", value: `${stats.passRate}%` },
// //   ];

// //   return (
// //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
// //       {data.map((item) => (
// //         <div
// //           key={item.label}
// //           className="bg-white border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center"
// //         >
// //           <p className="text-sm text-gray-500">{item.label}</p>
// //           <p className="text-2xl font-bold text-gray-900">{item.value}</p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default StatsCards;
// // ─── StatsCards.tsx ───────────────────────────────────────────────────────────
// import React from "react";
// import { Send, CheckCircle, BarChart2, Award } from "lucide-react";

// export interface AssessmentStats {
//   totalSent: number;
//   totalCompleted: number;
//   avgScore: number;
//   passRate: number;
// }

// interface StatsCardsProps {
//   stats: AssessmentStats;
// }

// const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
//   const cards = [
//     { label: "Assessments Sent",  value: stats.totalSent,              icon: Send,        color: "text-blue-600",   bg: "bg-blue-50"   },
//     { label: "Completed",         value: stats.totalCompleted,          icon: CheckCircle, color: "text-green-600",  bg: "bg-green-50"  },
//     { label: "Average Score",     value: `${stats.avgScore.toFixed(1)}%`, icon: BarChart2, color: "text-purple-600", bg: "bg-purple-50" },
//     { label: "Pass Rate",         value: `${stats.passRate.toFixed(1)}%`, icon: Award,    color: "text-yellow-600", bg: "bg-yellow-50" },
//   ];

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//       {cards.map(({ label, value, icon: Icon, color, bg }) => (
//         <div key={label} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">{label}</p>
//               <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
//             </div>
//             <div className={`p-2 rounded-lg ${bg}`}>
//               <Icon className={`w-5 h-5 ${color}`} />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StatsCards;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

export interface AssessmentStats {
  totalSent: number;
  totalPending: number;
  totalCompleted: number;
  passRate: number;
  avgScore: number;
}

interface StatsCardsProps {
  stats: AssessmentStats;
}

const CARDS = [
  { key: "totalSent",       label: "Total Sent",  sub: "Assessments dispatched", bar: "#2563EB" },
  { key: "totalPending",    label: "Pending",     sub: "Awaiting response",       bar: "#D97706" },
  { key: "totalCompleted",  label: "Completed",   sub: "Results ready",           bar: "#059669" },
  { key: "passRate",        label: "Pass Rate",   sub: "of completed",            bar: "#7C3AED" },
  { key: "avgScore",        label: "Avg Score",   sub: "out of 100",              bar: "#0D9488" },
] as const;

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
    {CARDS.map(({ key, label, sub, bar }) => {
      const raw = stats[key as keyof AssessmentStats];
      const value =
        key === "passRate" ? `${Number(raw).toFixed(0)}%`
        : key === "avgScore" ? (raw ? String(Math.round(Number(raw))) : "—")
        : raw;

      return (
        <div
          key={key}
          className="relative bg-white border border-gray-100 rounded-xl px-4 py-4 overflow-hidden hover:shadow-sm transition-shadow"
        >
          {/* coloured left bar */}
          <div
            className="absolute top-0 left-0 w-[3px] h-full rounded-l-xl"
            style={{ background: bar }}
          />
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-2">{label}</p>
          <p className="text-[26px] font-semibold text-gray-900 leading-none tracking-tight">{value ?? "—"}</p>
          <p className="text-[11px] text-gray-400 mt-1">{sub}</p>
        </div>
      );
    })}
  </div>
);

export default StatsCards;