// // // import React from "react";
// // // import { Send, Download, Activity } from "lucide-react";
// // // import { Candidate} from "@/services/interfaces/CandidateScreening";


// // // interface AssessmentStats {
// // //   totalSent: number;
// // //   totalCompleted: number;
// // // }

// // // interface OverviewTabProps {
// // //   candidates: Candidate[];
// // //   assessmentStats: AssessmentStats;
// // // }

// // // const OverviewTab: React.FC<OverviewTabProps> = ({ candidates, assessmentStats }) => {
// // //   const completedCount = candidates.filter((c) => c.exam_completed).length;
// // //   const passedCount = candidates.filter((c) => c.exam_completed && c.exam_percentage >= 70).length;

// // //   return (
// // //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //       <div className="bg-white rounded-lg shadow-sm border p-6">
// // //         <h3 className="text-lg font-semibold mb-4 text-gray-600">Assessment Progress</h3>
// // //         <div className="space-y-4">
// // //           <div>
// // //             <p className="text-sm text-gray-600">Sent</p>
// // //             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
// // //               <div className="bg-blue-600 h-2 rounded-full" style={{ width: "100%" }}></div>
// // //             </div>
// // //           </div>

// // //           <div>
// // //             <p className="text-sm text-gray-600 mt-4">Completed</p>
// // //             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
// // //               <div
// // //                 className="bg-green-600 h-2 rounded-full"
// // //                 style={{
// // //                   width:
// // //                     assessmentStats.totalSent > 0
// // //                       ? `${(assessmentStats.totalCompleted / assessmentStats.totalSent) * 100}%`
// // //                       : "0%",
// // //                 }}
// // //               ></div>
// // //             </div>
// // //           </div>

// // //           <div>
// // //             <p className="text-sm text-gray-600 mt-4">Passed (≥70%)</p>
// // //             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
// // //               <div
// // //                 className="bg-yellow-600 h-2 rounded-full"
// // //                 style={{
// // //                   width:
// // //                     assessmentStats.totalSent > 0
// // //                       ? `${(passedCount / assessmentStats.totalSent) * 100}%`
// // //                       : "0%",
// // //                 }}
// // //               ></div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="bg-white rounded-lg shadow-sm border p-6">
// // //         <h3 className="text-lg font-semibold mb-4 text-gray-600">Quick Actions</h3>
// // //         <div className="space-y-3">
// // //           <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
// // //             <div className="flex items-center">
// // //               <Activity className="w-5 h-5 text-blue-600 mr-3" />
// // //               <span className="font-medium text-gray-600">Check Results</span>
// // //             </div>
// // //             <span className="text-sm text-gray-500">{assessmentStats.totalSent - completedCount} pending</span>
// // //           </button>

// // //           <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
// // //             <div className="flex items-center">
// // //               <Send className="w-5 h-5 text-green-600 mr-3" />
// // //               <span className="font-medium text-gray-600">Send Reminders</span>
// // //             </div>
// // //             <span className="text-sm text-gray-500">Bulk action</span>
// // //           </button>

// // //           <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
// // //             <div className="flex items-center">
// // //               <Download className="w-5 h-5 text-purple-600 mr-3" />
// // //               <span className="font-medium text-gray-600">Export Data</span>
// // //             </div>
// // //             <span className="text-sm text-gray-500">CSV format</span>
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default OverviewTab;
// // import React from "react";

// // import { Candidate, AssessmentStats } from "@/services/interfaces/CandidateScreening";

// // interface OverviewTabProps {
// //   candidates: Candidate[];
// //   assessmentStats: AssessmentStats;
// // }

// // const OverviewTab: React.FC<OverviewTabProps> = ({ candidates, assessmentStats }) => {
// //   const completedCount = candidates.filter((c) => c.exam_completed).length;
// //   const passedCount = candidates.filter(
// //     (c) => c.exam_completed && (c.exam_percentage ?? 0) >= 70
// //   ).length;

// //   return (
// //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //       {/* Assessment Progress */}
// //       <div className="bg-white rounded-lg shadow-sm border p-6">
// //         <h3 className="font-semibold mb-4 text-gray-600">
// //           Assessment Progress
// //         </h3>

// //         <div className="space-y-4">
// //           <div>
// //             <p className="text-sm text-gray-600">Sent</p>
// //             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
// //               <div
// //                 className="bg-blue-600 h-2 rounded-full"
// //                 style={{ width: "100%" }}
// //               ></div>
// //             </div>
// //           </div>

// //           <div>
// //             <p className="text-sm text-gray-600">Completed</p>
// //             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
// //               <div
// //                 className="bg-green-600 h-2 rounded-full"
// //                 style={{
// //                   width:
// //                     assessmentStats.totalSent > 0
// //                       ? `${(assessmentStats.totalCompleted / assessmentStats.totalSent) * 100}%`
// //                       : "0%",
// //                 }}
// //               ></div>
// //             </div>
// //           </div>

// //           <div>
// //             <p className="text-sm text-gray-600">Passed (≥70%)</p>
// //             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
// //               <div
// //                 className="bg-yellow-600 h-2 rounded-full"
// //                 style={{
// //                   width: assessmentStats.totalCompleted
// //                     ? `${(passedCount / assessmentStats.totalCompleted) * 100}%`
// //                     : "0%",
// //                 }}
// //               ></div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Candidate Stats */}
// //       <div className="bg-white rounded-lg shadow-sm border p-6">
// //         <h3 className="font-semibold mb-4 text-gray-600">
// //           Candidate Overview
// //         </h3>

// //         <div className="space-y-4">
// //           <div className="flex justify-between">
// //             <span className="text-sm text-gray-600">Total Candidates</span>
// //             <span className="font-medium">{candidates.length}</span>
// //           </div>

// //           <div className="flex justify-between">
// //             <span className="text-sm text-gray-600">Completed</span>
// //             <span className="font-medium">{completedCount}</span>
// //           </div>

// //           <div className="flex justify-between">
// //             <span className="text-sm text-gray-600">Passed</span>
// //             <span className="font-medium">{passedCount}</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OverviewTab;
// import React from "react";
// import { Send, Activity, Download } from "lucide-react";
// import { Candidate, AssessmentStats } from "@/services/interfaces/CandidateScreening";

// interface OverviewTabProps {
//   candidates: Candidate[];
//   assessmentStats: AssessmentStats;
// }

// const OverviewTab: React.FC<OverviewTabProps> = ({ candidates, assessmentStats }) => {
//   const completedCount = candidates.filter((c) => c.exam_completed).length;
//   const passedCount = candidates.filter(
//     (c) => c.exam_completed && (c.exam_percentage ?? 0) >= 70
//   ).length;

//   const completionRate =
//     assessmentStats.totalSent > 0
//       ? (assessmentStats.totalCompleted / assessmentStats.totalSent) * 100
//       : 0;

//   const passRate =
//     assessmentStats.totalCompleted > 0
//       ? (passedCount / assessmentStats.totalCompleted) * 100
//       : 0;

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//       {/* Assessment Progress */}
//       <div className="bg-white rounded-lg shadow-sm border p-6">
//         <h3 className="font-semibold mb-5 text-gray-700">Assessment Progress</h3>

//         <div className="space-y-5">
//           {/* Sent */}
//           <div>
//             <div className="flex justify-between text-sm mb-1">
//               <span className="text-gray-600">Assessments Sent</span>
//               <span className="font-medium text-gray-800">{assessmentStats.totalSent}</span>
//             </div>
//             <div className="w-full bg-gray-100 rounded-full h-2">
//               <div className="bg-blue-500 h-2 rounded-full" style={{ width: "100%" }} />
//             </div>
//           </div>

//           {/* Completed */}
//           <div>
//             <div className="flex justify-between text-sm mb-1">
//               <span className="text-gray-600">Completed</span>
//               <span className="font-medium text-gray-800">
//                 {assessmentStats.totalCompleted} ({completionRate.toFixed(0)}%)
//               </span>
//             </div>
//             <div className="w-full bg-gray-100 rounded-full h-2">
//               <div
//                 className="bg-green-500 h-2 rounded-full transition-all"
//                 style={{ width: `${completionRate}%` }}
//               />
//             </div>
//           </div>

//           {/* Passed */}
//           <div>
//             <div className="flex justify-between text-sm mb-1">
//               <span className="text-gray-600">Passed (≥70%)</span>
//               <span className="font-medium text-gray-800">
//                 {passedCount} ({passRate.toFixed(0)}%)
//               </span>
//             </div>
//             <div className="w-full bg-gray-100 rounded-full h-2">
//               <div
//                 className="bg-yellow-500 h-2 rounded-full transition-all"
//                 style={{ width: `${passRate}%` }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right column: stats + quick actions */}
//       <div className="space-y-4">

//         {/* Candidate Stats */}
//         <div className="bg-white rounded-lg shadow-sm border p-6">
//           <h3 className="font-semibold mb-4 text-gray-700">Candidate Summary</h3>
//           <div className="space-y-3">
//             {[
//               { label: "Total Candidates", value: candidates.length },
//               { label: "Assessment Sent", value: assessmentStats.totalSent },
//               { label: "Completed", value: completedCount },
//               { label: "Passed", value: passedCount },
//               {
//                 label: "Not Yet Sent",
//                 value: candidates.filter((c) => c.status === "Shortlisted" && !c.exam_link_sent).length,
//               },
//             ].map(({ label, value }) => (
//               <div key={label} className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">{label}</span>
//                 <span className="font-semibold text-gray-800">{value}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-white rounded-lg shadow-sm border p-5">
//           <h3 className="font-semibold mb-3 text-gray-700">Quick Actions</h3>
//           <div className="space-y-2">
//             <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//               <div className="flex items-center">
//                 <Activity className="w-4 h-4 text-blue-600 mr-3" />
//                 <span className="text-sm font-medium text-gray-600">Check Results</span>
//               </div>
//               <span className="text-xs text-gray-400">
//                 {assessmentStats.totalSent - completedCount} pending
//               </span>
//             </button>

//             <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//               <div className="flex items-center">
//                 <Send className="w-4 h-4 text-green-600 mr-3" />
//                 <span className="text-sm font-medium text-gray-600">Send Reminders</span>
//               </div>
//               <span className="text-xs text-gray-400">Bulk action</span>
//             </button>

//             <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//               <div className="flex items-center">
//                 <Download className="w-4 h-4 text-purple-600 mr-3" />
//                 <span className="text-sm font-medium text-gray-600">Export Data</span>
//               </div>
//               <span className="text-xs text-gray-400">CSV format</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OverviewTab;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import { Candidate, AssessmentStats } from "@/services/interfaces/CandidateScreening";

interface OverviewTabProps {
  candidates: Candidate[];
  assessmentStats: AssessmentStats;
  onEditSettings?: () => void;
}

const SCORE_BUCKETS = [
  { label: "90–100", min: 90, max: 100, color: "#059669" },
  { label: "70–89",  min: 70, max: 89,  color: "#2563EB" },
  { label: "50–69",  min: 50, max: 69,  color: "#D97706" },
  { label: "Below 50", min: 0, max: 49, color: "#DC2626" },
];

const STAT_DOTS: Record<string, string> = {
  "Not sent":    "#94A3B8",
  "Sent":        "#2563EB",
  "In Progress": "#7C3AED",
  "Passed":      "#059669",
  "Failed":      "#DC2626",
};

const OverviewTab: React.FC<OverviewTabProps> = ({ candidates, assessmentStats, onEditSettings }) => {
  const total     = candidates.length;
  const sent      = candidates.filter(c => c.exam_link_sent).length;
  const completed = candidates.filter(c => c.exam_completed).length;
  const passed    = candidates.filter(c => c.exam_completed && (c.exam_percentage ?? 0) >= 70).length;
  const failed    = candidates.filter(c => c.exam_completed && (c.exam_percentage ?? 0) < 70).length;
  const pending   = candidates.filter(c => !c.exam_link_sent).length;
  const inProg    = candidates.filter(c => c.exam_started && !c.exam_completed).length;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;

  // SVG ring
  const R = 28;
  const circ = 2 * Math.PI * R;
  const dash = (pct / 100) * circ;

  const scores = useMemo(
    () => candidates.filter(c => c.exam_percentage != null).map(c => c.exam_percentage as number),
    [candidates]
  );
  const maxBucket = Math.max(
    ...SCORE_BUCKETS.map(b => scores.filter(s => s >= b.min && s <= b.max).length),
    1
  );

  return (
    <div className="flex flex-col gap-4">

      {/* ── Completion ring card ── */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <span className="text-[13px] font-semibold text-gray-800">Completion Overview</span>
        </div>
        <div className="p-5">
          {/* Ring + label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-[72px] h-[72px] flex-shrink-0">
              <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="36" cy="36" r={R} fill="none" stroke="#F1F5F9" strokeWidth="8" />
                <circle
                  cx="36" cy="36" r={R} fill="none"
                  stroke="#2563EB" strokeWidth="8"
                  strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[15px] font-bold text-gray-900">
                {pct}%
              </div>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 mb-0.5">Completion rate</p>
              <p className="text-[20px] font-bold text-gray-900 leading-none">{pct}%</p>
              <p className="text-[11px] text-gray-400 mt-1">{completed} of {total} submitted</p>
            </div>
          </div>

          {/* Stat rows */}
          {[
            { label: "Not sent",    val: pending  },
            { label: "Sent",        val: sent - inProg - completed },
            { label: "In Progress", val: inProg   },
            { label: "Passed",      val: passed   },
            { label: "Failed",      val: failed   },
          ].map(({ label, val }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-2 text-[12px] text-gray-500">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: STAT_DOTS[label] }} />
                {label}
              </div>
              <span className="text-[13px] font-semibold text-gray-900">{Math.max(val, 0)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Score distribution ── */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <span className="text-[13px] font-semibold text-gray-800">Score Distribution</span>
        </div>
        <div className="p-5 space-y-3">
          {SCORE_BUCKETS.map(b => {
            const cnt = scores.filter(s => s >= b.min && s <= b.max).length;
            const w   = Math.round((cnt / maxBucket) * 100);
            return (
              <div key={b.label} className="flex items-center gap-2.5">
                <span className="text-[12px] text-gray-500 w-[72px] flex-shrink-0">{b.label}</span>
                <div className="flex-1 h-[7px] bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${w}%`, background: b.color }} />
                </div>
                <span className="text-[12px] font-semibold text-gray-900 w-6 text-right flex-shrink-0">{cnt}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Assessment settings ── */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <span className="text-[13px] font-semibold text-gray-800">Assessment Settings</span>
          <button
            onClick={onEditSettings}
            className="text-[12px] font-medium text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="p-5 space-y-0">
          {[
            ["Title",         "Technical Screening Test"],
            ["Duration",      "30 minutes"],
            ["Passing Score", "70%"],
            ["Deadline",      "7 days after sending"],
            ["Questions",     "8 questions"],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
              <span className="text-[12px] text-gray-500">{label}</span>
              <span className="text-[12px] font-semibold text-gray-900">{val}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default OverviewTab;