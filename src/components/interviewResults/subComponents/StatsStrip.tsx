// // import React from "react";
// // import { Users, PlayCircle, CheckCircle, Target, Award, Clock } from "lucide-react";

// // const Card: React.FC<{ title: string; value: React.ReactNode; icon: any }> = ({ title, value, icon: Icon }) => (
// //   <div className="rounded-lg border bg-white p-4 shadow-sm">
// //     <div className="flex items-center justify-between">
// //       <div>
// //         <p className="text-sm text-gray-600">{title}</p>
// //         <p className="text-2xl font-bold">{value}</p>
// //       </div>
// //       <Icon className="h-8 w-8 text-blue-600" />
// //     </div>
// //   </div>
// // );

// // const StatsStrip: React.FC<{
// //   total: number;
// //   inProgress: number;
// //   completed: number;
// //   avgScore: number;
// //   passRate: number;
// //   pending: number;
// // }> = ({ total, inProgress, completed, avgScore, passRate, pending }) => {
// //   return (
// //     <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-6 text-gray-500">
// //       <Card title="Total" value={total} icon={Users} />
// //       <Card title="In Progress" value={inProgress} icon={PlayCircle} />
// //       <Card title="Completed" value={completed} icon={CheckCircle} />
// //       <Card title="Avg Score" value={`${avgScore.toFixed(1)}%`} icon={Target} />
// //       <Card title="Pass Rate" value={`${passRate.toFixed(1)}%`} icon={Award} />
// //       <Card title="Pending" value={pending} icon={Clock} />
// //     </div>
// //   );
// // };

// // export default StatsStrip;

// import React from "react";
// import { Users, PlayCircle, CheckCircle, Target, Award, Clock, LucideIcon } from "lucide-react";

// const Card: React.FC<{ title: string; value: React.ReactNode; icon: LucideIcon }> = ({ title, value, icon: Icon }) => (
//   <div className="rounded-lg border bg-white p-4 shadow-sm">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-sm text-gray-600">{title}</p>
//         <p className="text-2xl font-bold">{value}</p>
//       </div>
//       <Icon className="h-8 w-8 text-blue-600" />
//     </div>
//   </div>
// );

// const StatsStrip: React.FC<{
//   total: number;
//   inProgress: number;
//   completed: number;
//   avgScore: number;
//   passRate: number;
//   pending: number;
// }> = ({ total, inProgress, completed, avgScore, passRate, pending }) => {
//   return (
//     <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-6 text-gray-500">
//       <Card title="Total" value={total} icon={Users} />
//       <Card title="In Progress" value={inProgress} icon={PlayCircle} />
//       <Card title="Completed" value={completed} icon={CheckCircle} />
//       <Card title="Avg Score" value={`${avgScore.toFixed(1)}%`} icon={Target} />
//       <Card title="Pass Rate" value={`${passRate.toFixed(1)}%`} icon={Award} />
//       <Card title="Pending" value={pending} icon={Clock} />
//     </div>
//   );
// };

// export default StatsStrip;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

interface StatsStripProps {
  total: number;
  offerExtended: number;
  avgScore: number;
  pendingDecision: number;
  upcomingToday: number;
  offerRate: number;
}

const CARDS = [
  { key: "total",          label: "Total Interviews",  sub: "All rounds combined",     bar: "#2563EB" },
  { key: "offerExtended",  label: "Offer Extended",    sub: "of completed",            bar: "#059669" },
  { key: "avgScore",       label: "Avg Score",         sub: "Out of 100",              bar: "#D97706" },
  { key: "pendingDecision",label: "Pending Decision",  sub: "Awaiting",                bar: "#7C3AED" },
  { key: "upcomingToday",  label: "Upcoming Today",    sub: "Scheduled",               bar: "#0D9488" },
] as const;

const StatsStrip: React.FC<StatsStripProps> = ({
  total, offerExtended, avgScore, pendingDecision, upcomingToday, offerRate,
}) => {
  const vals: Record<string, string | number> = {
    total,
    offerExtended,
    avgScore: avgScore ? Math.round(avgScore) : "—",
    pendingDecision,
    upcomingToday,
  };
  const chips: Record<string, { label: string; color: string; bg: string }> = {
    offerExtended:   { label: offerRate + "% offer rate", color: "#059669", bg: "#ECFDF5" },
    pendingDecision: { label: pendingDecision > 0 ? "Needs decision" : "All decided", color: "#D97706", bg: "#FFFBEB" },
    upcomingToday:   { label: upcomingToday + " today", color: "#2563EB", bg: "#EFF6FF" },
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
      {CARDS.map(({ key, label, sub, bar }) => {
        const chip = chips[key];
        return (
          <div
            key={key}
            className="relative bg-white border border-gray-100 rounded-xl px-4 py-4 overflow-hidden hover:shadow-sm transition-shadow"
          >
            <div className="absolute top-0 left-0 w-[3px] h-full rounded-l-xl" style={{ background: bar }} />
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-2">{label}</p>
            <p className="text-[28px] font-semibold text-gray-900 leading-none tracking-tight">{vals[key]}</p>
            <div className="mt-1.5 flex items-center gap-1.5">
              {chip ? (
                <span
                  className="inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: chip.bg, color: chip.color }}
                >
                  {chip.label}
                </span>
              ) : (
                <span className="text-[11px] text-gray-400">{sub}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsStrip;