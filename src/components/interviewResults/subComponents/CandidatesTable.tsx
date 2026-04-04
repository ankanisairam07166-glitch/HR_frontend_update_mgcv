// // import React from "react";
// // import { Loader, MessageSquare, Video, AlertCircle, CheckCircle, XCircle, PlayCircle, Clock } from "lucide-react";
// // import { InterviewCandidate } from "@/services/api/interviewResultsAPI";

// // function getStatus(c: InterviewCandidate) {
// //   if (!c) return { text: "Unknown", color: "bg-gray-100 text-gray-800", Icon: AlertCircle };
// //   if (c.interview_ai_analysis_status === "processing")
// //     return { text: "Analyzing...", color: "bg-purple-100 text-purple-800", Icon: Clock };

// //   const hasData =
// //     c.interview_scheduled ||
// //     c.interview_started_at ||
// //     c.interview_completed_at ||
// //     c.interview_ai_score != null ||
// //     c.interview_token;

// //   if (!hasData) return { text: "Not Scheduled", color: "bg-gray-100 text-gray-800", Icon: XCircle };
// //   if (c.interview_completed_at) {
// //     if (c.interview_ai_score != null) {
// //       return c.interview_ai_score >= 70
// //         ? { text: "Passed", color: "bg-green-100 text-green-800", Icon: CheckCircle }
// //         : { text: "Failed", color: "bg-red-100 text-red-800", Icon: XCircle };
// //     }
// //     return { text: "Pending Analysis", color: "bg-yellow-100 text-yellow-800", Icon: Clock };
// //   }
// //   if (c.interview_started_at && !c.interview_completed_at)
// //     return { text: "In Progress", color: "bg-blue-100 text-blue-800", Icon: PlayCircle };
// //   if (c.interview_scheduled && !c.interview_started_at)
// //     return { text: "Scheduled", color: "bg-yellow-100 text-yellow-800", Icon: Clock };

// //   return { text: "Unknown", color: "bg-gray-100 text-gray-800", Icon: AlertCircle };
// // }

// // const CandidatesTable: React.FC<{
// //   loading: boolean;
// //   candidates: InterviewCandidate[];
// //   search: string;
// //   setSearch: (v: string) => void;
// //   processingIds: Set<number>;
// //   liveStatuses: Record<number, any>;
// //   onOpen: (id: number) => void;
// // }> = ({ loading, candidates, search, setSearch, processingIds, liveStatuses, onOpen }) => {
// //   return (
// //     <div className="rounded-lg border bg-white shadow-sm">
// //       <div className="border-b p-4">
// //         <div className="flex items-center justify-between">
// //           <h3 className="text-lg font-semibold">All Candidates</h3>
// //           <input
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             placeholder="Search candidates..."
// //             className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //         </div>
// //       </div>

// //       <div className="overflow-x-auto">
// //         <table className="min-w-full divide-y divide-gray-200">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
// //                 Candidate
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
// //                 Position
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
// //                 Status
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
// //                 Progress
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
// //                 Score
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
// //                 Actions
// //               </th>
// //             </tr>
// //           </thead>

// //           <tbody className="divide-y divide-gray-200 bg-white">
// //             {loading && candidates.length === 0 ? (
// //               <tr>
// //                 <td colSpan={6} className="px-6 py-8 text-center">
// //                   <Loader className="mx-auto h-8 w-8 animate-spin text-blue-600" />
// //                   <p className="mt-2 text-gray-500">Loading…</p>
// //                 </td>
// //               </tr>
// //             ) : candidates.length === 0 ? (
// //               <tr>
// //                 <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
// //                   <Video className="mx-auto mb-3 h-12 w-12 text-gray-300" />
// //                   <p>No interview results found</p>
// //                 </td>
// //               </tr>
// //             ) : (
// //               candidates.map((c) => {
// //                 const st = getStatus(c);
// //                 const busy = processingIds.has(c.id);
// //                 const live = liveStatuses[c.id];

// //                 return (
// //                   <tr key={c.id} className="transition-colors hover:bg-gray-50">
// //                     <td className="whitespace-nowrap px-6 py-4">
// //                       <button
// //                         className="text-left font-medium text-gray-900 hover:text-blue-600"
// //                         onClick={() => onOpen(c.id)}
// //                       >
// //                         {c.name}
// //                       </button>
// //                       <div className="text-sm text-gray-500">{c.email}</div>
// //                     </td>
// //                     <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
// //                       {c.job_title}
// //                     </td>
// //                     <td className="whitespace-nowrap px-6 py-4">
// //                       <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${st.color}`}>
// //                         <st.Icon className="mr-1 h-3 w-3" />
// //                         {busy ? "Analyzing…" : st.text}
// //                       </span>
// //                     </td>
// //                     <td className="whitespace-nowrap px-6 py-4">
// //                       <div className="flex items-center">
// //                         <div className="mr-2 h-2 w-24 rounded-full bg-gray-200">
// //                           <div
// //                             className="h-2 rounded-full bg-blue-600 transition-all"
// //                             style={{ width: `${live?.progress ?? c.interview_progress ?? 0}%` }}
// //                           />
// //                         </div>
// //                         <span className="text-sm text-gray-600">
// //                           {(live?.progress ?? c.interview_progress ?? 0) as number}%
// //                         </span>
// //                       </div>
// //                     </td>
// //                     <td className="whitespace-nowrap px-6 py-4">
// //                       {c.interview_ai_score != null ? (
// //                         <span
// //                           className={`text-sm font-medium ${
// //                             (c.interview_ai_score || 0) >= 70 ? "text-green-600" : "text-red-600"
// //                           }`}
// //                         >
// //                           {Math.round(c.interview_ai_score!)}%
// //                         </span>
// //                       ) : (
// //                         <span className="text-sm text-gray-500">—</span>
// //                       )}
// //                     </td>
// //                     <td className="whitespace-nowrap px-6 py-4 text-sm">
// //                       <button
// //                         onClick={() => onOpen(c.id)}
// //                         className="text-blue-600 transition-colors hover:text-blue-900"
// //                       >
// //                         View Details
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 );
// //               })
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CandidatesTable;

// import React from "react";
// import {
//   Loader,
//   Video,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   PlayCircle,
//   Clock,
// } from "lucide-react";

// // Local minimal shape used by this component.
// // Replace with an import from your shared interfaces when available.
// type InterviewCandidate = {
//   id: number;
//   name: string;
//   email: string;
//   job_title: string;

//   interview_ai_analysis_status?: "processing" | string | null;
//   interview_scheduled?: boolean | null;
//   interview_started_at?: string | null;
//   interview_completed_at?: string | null;
//   interview_ai_score?: number | null;
//   interview_token?: string | null;
//   interview_progress?: number | null;
// };

// function getStatus(c: InterviewCandidate) {
//   if (!c) return { text: "Unknown", color: "bg-gray-100 text-gray-800", Icon: AlertCircle };
//   if (c.interview_ai_analysis_status === "processing")
//     return { text: "Analyzing...", color: "bg-purple-100 text-purple-800", Icon: Clock };

//   const hasData =
//     c.interview_scheduled ||
//     c.interview_started_at ||
//     c.interview_completed_at ||
//     c.interview_ai_score != null ||
//     c.interview_token;

//   if (!hasData) return { text: "Not Scheduled", color: "bg-gray-100 text-gray-800", Icon: XCircle };
//   if (c.interview_completed_at) {
//     if (c.interview_ai_score != null) {
//       return c.interview_ai_score >= 70
//         ? { text: "Passed", color: "bg-green-100 text-green-800", Icon: CheckCircle }
//         : { text: "Failed", color: "bg-red-100 text-red-800", Icon: XCircle };
//     }
//     return { text: "Pending Analysis", color: "bg-yellow-100 text-yellow-800", Icon: Clock };
//   }
//   if (c.interview_started_at && !c.interview_completed_at)
//     return { text: "In Progress", color: "bg-blue-100 text-blue-800", Icon: PlayCircle };
//   if (c.interview_scheduled && !c.interview_started_at)
//     return { text: "Scheduled", color: "bg-yellow-100 text-yellow-800", Icon: Clock };

//   return { text: "Unknown", color: "bg-gray-100 text-gray-800", Icon: AlertCircle };
// }

// type CandidatesTableProps = {
//   loading: boolean;
//   candidates: InterviewCandidate[];
//   search: string;
//   setSearch: (v: string) => void;
//   processingIds: Set<number>;
//   liveStatuses: Record<number, { progress?: number } | undefined>;
//   onOpen: (id: number) => void | Promise<void>;
//   onExport?: () => void | Promise<void>;
//   exporting?: boolean;
// };

// const CandidatesTable: React.FC<CandidatesTableProps> = ({
//   loading,
//   candidates,
//   search,
//   setSearch,
//   processingIds,
//   liveStatuses,
//   onOpen,
//   onExport,
//   exporting,
// }) => {
//   return (
//     <div className="rounded-lg border bg-white shadow-sm">
//       <div className="border-b p-4">
//         <div className="flex items-center justify-between gap-3">
//           <h3 className="text-lg font-semibold text-gray-900">All Candidates</h3>
//           <div className="flex items-center gap-2">
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search candidates..."
//               className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
//             />
//             {onExport && (
//               <button
//                 type="button"
//                 onClick={() => onExport()}
//                 disabled={!!exporting}
//                 aria-busy={exporting ? true : undefined}
//                 className="rounded-md border px-3 py-1 text-sm text-blue-700 hover:bg-blue-50 disabled:opacity-60"
//               >
//                 {exporting ? "Exporting…" : "Export CSV"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Candidate</th>
//               <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Position</th>
//               <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Progress</th>
//               <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Score</th>
//               <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-200 bg-white">
//             {loading && candidates.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="px-6 py-8 text-center">
//                   <Loader className="mx-auto h-8 w-8 animate-spin text-blue-600" />
//                   <p className="mt-2 text-gray-500">Loading…</p>
//                 </td>
//               </tr>
//             ) : candidates.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
//                   <Video className="mx-auto mb-3 h-12 w-12 text-gray-300" />
//                   <p>No interview results found</p>
//                 </td>
//               </tr>
//             ) : (
//               candidates.map((c) => {
//                 const st = getStatus(c);
//                 const busy = processingIds.has(c.id);
//                 const live = liveStatuses[c.id];

//                 return (
//                   <tr key={c.id} className="transition-colors hover:bg-gray-50">
//                     <td className="whitespace-nowrap px-6 py-4">
//                       <button
//                         className="text-left font-medium text-gray-900 hover:text-blue-600"
//                         onClick={() => onOpen(c.id)}
//                       >
//                         {c.name}
//                       </button>
//                       <div className="text-sm text-gray-500">{c.email}</div>
//                     </td>
//                     <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{c.job_title}</td>
//                     <td className="whitespace-nowrap px-6 py-4">
//                       <span
//                         className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${st.color}`}
//                       >
//                         <st.Icon className="mr-1 h-3 w-3" />
//                         {busy ? "Analyzing…" : st.text}
//                       </span>
//                     </td>
//                     <td className="whitespace-nowrap px-6 py-4">
//                       <div className="flex items-center">
//                         <div className="mr-2 h-2 w-24 rounded-full bg-gray-200">
//                           <div
//                             className="h-2 rounded-full bg-blue-600 transition-all"
//                             style={{ width: `${live?.progress ?? c.interview_progress ?? 0}%` }}
//                           />
//                         </div>
//                         <span className="text-sm text-gray-600">
//                           {(live?.progress ?? c.interview_progress ?? 0) as number}%
//                         </span>
//                       </div>
//                     </td>
//                     <td className="whitespace-nowrap px-6 py-4">
//                       {c.interview_ai_score != null ? (
//                         <span
//                           className={`text-sm font-medium ${
//                             (c.interview_ai_score || 0) >= 70 ? "text-green-600" : "text-red-600"
//                           }`}
//                         >
//                           {Math.round(c.interview_ai_score!)}%
//                         </span>
//                       ) : (
//                         <span className="text-sm text-gray-500">—</span>
//                       )}
//                     </td>
//                     <td className="whitespace-nowrap px-6 py-4 text-sm">
//                       <button
//                         onClick={() => onOpen(c.id)}
//                         className="text-blue-600 transition-colors hover:text-blue-900"
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CandidatesTable;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useMemo } from "react";
import { Search, Calendar } from "lucide-react";

export type Verdict = "offer_extended" | "next_round" | "on_hold" | "rejected" | "pending";

export interface InterviewRow {
  id: string;
  name: string;
  email: string;
  role: string;
  dept: string;
  interviewer: string;
  round: string;
  date: string;
  verdict: Verdict;
  score: number | null;
  duration?: number | null;
  criteria?: Record<string, number | null>;
  feedback?: string;
}

interface CandidatesTableProps {
  candidates: InterviewRow[];
  loading?: boolean;
  search: string;
  setSearch: (v: string) => void;
  onOpen: (id: string) => void;
  onExtendOffer?: (id: string) => void;
  onScheduleNext?: (id: string) => void;
  onAddVerdict?: (id: string) => void;
  exporting?: boolean;
  onExport?: () => void;
}

// ── helpers ───────────────────────────────────────────────────────────────────
const AVATAR_PALETTES = [
  ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
  ["#FAF5FF","#7C3AED"],["#F0FDFA","#0D9488"],["#FFFBEB","#D97706"],
];
function avatarColors(name: string): [string,string] {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  return AVATAR_PALETTES[Math.abs(h) % AVATAR_PALETTES.length] as [string,string];
}
function initials(n: string) { return n.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase(); }
function relDate(iso?: string) {
  if (!iso) return "—";
  const diff = Math.round((Date.now() - new Date(iso).getTime()) / 86400000);
  return diff === 0 ? "Today" : diff === 1 ? "Yesterday" : diff < 7 ? diff+"d ago" : Math.round(diff/7)+"w ago";
}

const VERDICT_PILL: Record<Verdict, { bg: string; text: string; label: string }> = {
  offer_extended: { bg: "#ECFDF5", text: "#059669", label: "Offer Extended" },
  next_round:     { bg: "#EFF6FF", text: "#2563EB", label: "Next Round"     },
  on_hold:        { bg: "#FFFBEB", text: "#D97706", label: "On Hold"        },
  rejected:       { bg: "#FEF2F2", text: "#DC2626", label: "Rejected"       },
  pending:        { bg: "#F1F5F9", text: "#94A3B8", label: "Pending"        },
};

function VerdictPill({ verdict }: { verdict: Verdict }) {
  const { bg, text, label } = VERDICT_PILL[verdict] ?? VERDICT_PILL.pending;
  return (
    <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{ background: bg, color: text }}>{label}</span>
  );
}

function ScorePill({ score }: { score: number | null | undefined }) {
  if (score == null) return <span className="inline-flex text-[13px] font-bold px-3 py-1 rounded-lg bg-gray-100 text-gray-400">—</span>;
  const [bg, text] = score >= 75 ? ["#ECFDF5","#059669"] : score >= 55 ? ["#FFFBEB","#D97706"] : ["#FEF2F2","#DC2626"];
  return (
    <span className="inline-flex text-[13px] font-bold px-3 py-1 rounded-lg" style={{ background: bg, color: text }}>{score}</span>
  );
}

const VERDICT_FILTERS: { key: Verdict | "all"; label: string }[] = [
  { key: "all",            label: "All"            },
  { key: "offer_extended", label: "Offer Extended" },
  { key: "next_round",     label: "Next Round"     },
  { key: "on_hold",        label: "On Hold"        },
  { key: "rejected",       label: "Rejected"       },
  { key: "pending",        label: "Pending"        },
];

const ROUND_BTNS = [
  { key: "all",   label: "All Rounds" },
  { key: "R1",    label: "Round 1"   },
  { key: "R2",    label: "Round 2"   },
  { key: "Final", label: "Final"     },
];

// ── Main component ────────────────────────────────────────────────────────────
const CandidatesTable: React.FC<CandidatesTableProps> = ({
  candidates, loading, search, setSearch, onOpen,
  onExtendOffer, onScheduleNext, onAddVerdict, exporting, onExport,
}) => {
  const [activeVerdict, setActiveVerdict] = useState<Verdict | "all">("all");
  const [activeRound,   setActiveRound]   = useState("all");
  const [sortBy,        setSortBy]        = useState("date_desc");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = candidates.filter(r => {
      const mf = activeVerdict === "all" || r.verdict === activeVerdict;
      const mr = activeRound   === "all" || r.round   === activeRound;
      const ms = !q || r.name.toLowerCase().includes(q)
                   || r.role.toLowerCase().includes(q)
                   || r.interviewer.toLowerCase().includes(q);
      return mf && mr && ms;
    });
    if (sortBy === "date_desc")  list = [...list].sort((a,b) => +new Date(b.date) - +new Date(a.date));
    if (sortBy === "date_asc")   list = [...list].sort((a,b) => +new Date(a.date) - +new Date(b.date));
    if (sortBy === "score_desc") list = [...list].sort((a,b) => (b.score??0) - (a.score??0));
    if (sortBy === "score_asc")  list = [...list].sort((a,b) => (a.score??0) - (b.score??0));
    if (sortBy === "name_asc")   list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }, [candidates, activeVerdict, activeRound, search, sortBy]);

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">

      {/* ── Filter bar ── */}
      <div className="flex flex-wrap items-center gap-2.5 px-4 py-3 border-b border-gray-100">
        {/* Verdict chips */}
        <div className="flex flex-wrap gap-1.5">
          {VERDICT_FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveVerdict(f.key as any)}
              className="text-[12px] font-medium px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap"
              style={activeVerdict === f.key
                ? { background: "#2563EB", color: "#fff", borderColor: "transparent" }
                : { background: "#fff", color: "#64748B", borderColor: "rgba(0,0,0,0.1)" }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200 flex-shrink-0" />

        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search candidate, role, interviewer…"
            className="w-full pl-8 pr-3 py-1.5 text-[13px] bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-300 focus:bg-white transition-colors"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="text-[12px] text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
        >
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
          <option value="score_desc">Score High–Low</option>
          <option value="score_asc">Score Low–High</option>
          <option value="name_asc">Name A–Z</option>
        </select>
      </div>

      {/* ── Card header: title + round filter ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div>
          <p className="text-[14px] font-semibold text-gray-900">Interview Results</p>
          <p className="text-[12px] text-gray-400 mt-0.5">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-1.5">
          {ROUND_BTNS.map(b => (
            <button
              key={b.key}
              onClick={() => setActiveRound(b.key)}
              className="text-[12px] font-medium px-3 py-1.5 rounded-lg border transition-all"
              style={activeRound === b.key
                ? { background: "#EFF6FF", color: "#2563EB", borderColor: "#BFDBFE" }
                : { background: "#fff", color: "#64748B", borderColor: "rgba(0,0,0,0.1)" }
              }
            >
              {b.label}
            </button>
          ))}
          {onExport && (
            <button
              onClick={onExport}
              disabled={exporting}
              className="ml-2 text-[12px] font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {exporting ? "Exporting…" : "Export"}
            </button>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div className="flex items-center justify-center gap-2.5 py-12 text-gray-400 text-[13px]">
          <div className="w-4 h-4 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
          Loading interview results…
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-[15px] font-semibold text-gray-800">No results found</p>
          <p className="text-[13px] text-gray-400">Try changing your filters or search query.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {/* Column headers */}
          <div
            className="grid items-center px-5 py-2.5 border-b border-gray-100 bg-gray-50"
            style={{ gridTemplateColumns: "2fr 1.2fr 80px 1fr 1fr 90px auto" }}
          >
            {["Candidate","Role · Round","Score","Verdict","Interviewer","Date",""].map(h => (
              <div key={h} className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{h}</div>
            ))}
          </div>

          {filtered.map(r => {
            const [bg, fg] = avatarColors(r.name);
            return (
              <div
                key={r.id}
                onClick={() => onOpen(r.id)}
                className="grid items-center px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer last:border-0"
                style={{ gridTemplateColumns: "2fr 1.2fr 80px 1fr 1fr 90px auto" }}
              >
                {/* Candidate */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                    style={{ background: bg, color: fg }}>{initials(r.name)}</div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-gray-900 truncate">{r.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{r.dept}</p>
                  </div>
                </div>

                {/* Role · Round */}
                <div>
                  <p className="text-[12px] text-gray-700 truncate">{r.role}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{r.round}</p>
                </div>

                {/* Score */}
                <div><ScorePill score={r.score} /></div>

                {/* Verdict */}
                <div><VerdictPill verdict={r.verdict} /></div>

                {/* Interviewer */}
                <p className="text-[12px] text-gray-600 truncate">{r.interviewer}</p>

                {/* Date */}
                <p className="text-[12px] text-gray-500">{relDate(r.date)}</p>

                {/* Action */}
                <div onClick={e => e.stopPropagation()}>
                  {r.verdict === "next_round" && onScheduleNext && (
                    <button onClick={() => onScheduleNext(r.id)}
                      className="text-[12px] font-medium text-blue-600 hover:opacity-70 transition-opacity whitespace-nowrap">
                      Schedule R+1
                    </button>
                  )}
                  {r.verdict === "pending" && onAddVerdict && (
                    <button onClick={() => onAddVerdict(r.id)}
                      className="text-[12px] font-medium text-blue-600 hover:opacity-70 transition-opacity whitespace-nowrap">
                      Add Verdict
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CandidatesTable;