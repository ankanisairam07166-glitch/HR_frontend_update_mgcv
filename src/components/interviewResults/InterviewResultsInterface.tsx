// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";

// // import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// // // import { useRouter } from "next/navigation";
// // import { Clock, RefreshCw } from "lucide-react";
// // import StatsStrip from "./subComponents/StatsStrip";
// // import LiveSessions from "./subComponents/LiveSessions";
// // import CandidatesTable from "./subComponents/CandidatesTable";

// // import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// // import {
// //   fetchInterviewResults,
// //   fetchInterviewStats,
// //   submitInterviewFeedback,
// //   exportInterviewCsv,
// // } from "@/services/redux/thunk/interviewThunk";
// // import type { InterviewResult } from "@/services/interfaces/interview.interface";

// // const POLL_MS = 5000;
// // const AUTO_REFRESH_MS = 30000;
// // const REALTIME_MS = 5000;

// // const InterviewResultsInterface: React.FC = () => {
// //   // const router = useRouter();
// //   const dispatch = useAppDispatch();

// //   // ----- Redux state (slice: interview) -----
// //   const { results,loading, exporting, lastCsv, error } = useAppSelector(
// //     (s) => s.interview
// //   );

// //   // ----- Local UI state -----
// //   const [mounted, setMounted] = useState(false); // for hydration-safe clock
// //   const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
// //   const [autoRefresh, setAutoRefresh] = useState(true);
// //   const [search, setSearch] = useState("");

// //   // “live” demo state you had earlier
// //   const [liveStatuses] = useState<Record<number, any>>({});
// //   const [processingIds] = useState<Set<number>>(new Set());
// //   const retryRef = useRef(0);
// //   const pollingRef = useRef<any>(null);
// //   const autoRefreshRef = useRef<any>(null);
// //   const realtimeRef = useRef<any>(null);

// //   // ---------- lifecycle ----------
// //   // eslint-disable-next-line react-hooks/set-state-in-effect
// //   useEffect(() => setMounted(true), []);

// //   const refreshAll = useCallback(
// //     async (silent = false) => {
// //       if (!silent) {
// //         // let the slice drive the main loading; no local spinner needed
// //       }
// //       // load both stats and results
// //       await Promise.all([
// //         dispatch(fetchInterviewStats({})).unwrap().catch(() => {}),
// //         dispatch(fetchInterviewResults({ page: 1, page_size: 200 })).unwrap().catch(() => {}),
// //       ]);
// //       setLastRefresh(new Date());
// //     },
// //     [dispatch]
// //   );

// //   useEffect(() => {
// //     // eslint-disable-next-line react-hooks/set-state-in-effect
// //     refreshAll();
// //   }, [refreshAll]);

// //   // ---------- effects: timers ----------
// //   useEffect(() => {
// //     if (pollingRef.current) clearInterval(pollingRef.current);
// //     pollingRef.current = setInterval(() => {
// //       // you can compute “active” candidates from results
// //       const active = results.filter(
// //         (c) => c.completed_at == null && c.scheduled_at != null
// //       );
// //       if (!active.length) return;
// //       // If you later add a live-status API thunk, dispatch it here and update local state.
// //       // setLiveStatuses((prev) => ({ ...prev, ...incoming }));
// //     }, POLL_MS);
// //     return () => clearInterval(pollingRef.current);
// //   }, [results]);

// //   useEffect(() => {
// //     if (realtimeRef.current) clearInterval(realtimeRef.current);
// //     realtimeRef.current = setInterval(() => {
// //       // place to dispatch a “poll updates” thunk if you add one
// //       // implement backoff via retryRef if needed
// //     }, REALTIME_MS * Math.pow(2, Math.min(retryRef.current, 3)));
// //     return () => clearInterval(realtimeRef.current);
// //   }, []);

// //   useEffect(() => {
// //     if (autoRefreshRef.current) clearInterval(autoRefreshRef.current);
// //     if (autoRefresh) {
// //       autoRefreshRef.current = setInterval(() => refreshAll(true), AUTO_REFRESH_MS);
// //     }
// //     return () => clearInterval(autoRefreshRef.current);
// //   }, [autoRefresh, refreshAll]);

// //   // ---------- derived ----------
// //   const filtered: InterviewResult[] = useMemo(() => {
// //     const q = (search || "").toLowerCase();
// //     if (!q) return results;
// //     return results.filter(
// //       (r) =>
// //         r.candidate_name?.toLowerCase().includes(q) ||
// //         r.job_title?.toLowerCase().includes(q) ||
// //         String(r.id).includes(q)
// //     );
// //   }, [results, search]);

// //   const top = useMemo(() => {
// //     const total = filtered.length;
// //     const completed = filtered.filter((c) => c.completed_at).length;
// //     const inProgress = filtered.filter((c) => !c.completed_at && c.scheduled_at).length;
// //     const withScore = filtered.filter((c) => Number.isFinite(c.score));
// //     const avg = withScore.reduce((s, c) => s + (c.score || 0), 0) / (withScore.length || 1);
// //     const pass =
// //       (withScore.filter((c) => (c.score || 0) >= 70).length / (withScore.length || 1)) * 100;
// //     const pending = filtered.filter((c) => c.completed_at && !Number.isFinite(c.score)).length;
// //     return { total, completed, inProgress, avg, pass, pending };
// //   }, [filtered]);

// //   // ---------- actions ----------
// //   const handleExport = () => dispatch(exportInterviewCsv({}));

// //   const handleFeedback = async (resultId: number) => {
// //     const notes = prompt("Add feedback notes:");
// //     if (!notes) return;
// //     await dispatch(
// //       submitInterviewFeedback({
// //         result_id: resultId,
// //         feedback: { interviewer: "You", score: 0, notes },
// //       })
// //     ).unwrap();
// //     refreshAll(true);
// //   };

// //   // download CSV when slice provides blob
// //   useEffect(() => {
// //     if (!lastCsv) return;
// //     const url = URL.createObjectURL(lastCsv);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = "interview_results.csv";
// //     a.click();
// //     URL.revokeObjectURL(url);
// //   }, [lastCsv]);

// //   // ---------- UI ----------
// //   return (
// //     <div className="min-h-screen p-6 bg-white">
// //         {/* header */}
// //         <div className="mb-6 flex items-center justify-between">
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-900">Interview Results</h1>
// //             <p className="mt-1 text-gray-600">Click a candidate to view detailed analysis</p>
// //             {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
// //           </div>
// //           <div className="flex items-center gap-3">
// //             {/* Hydration-safe clock */}
// //             {mounted && lastRefresh && (
// //               <div className="flex items-center text-sm text-gray-500" suppressHydrationWarning>
// //                 <Clock className="mr-1 h-4 w-4" />
// //                 Last updated: {lastRefresh.toLocaleTimeString()}
// //               </div>
// //             )}
// //             <button
// //               onClick={() => refreshAll()}
// //               disabled={loading}
// //               className="flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-100 disabled:opacity-60"
// //             >
// //               <RefreshCw className={`mr-1 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
// //               Refresh
// //             </button>
// //             <label className="flex cursor-pointer items-center text-sm text-gray-600">
// //               <input
// //                 type="checkbox"
// //                 className="mr-2"
// //                 checked={autoRefresh}
// //                 onChange={(e) => setAutoRefresh(e.target.checked)}
// //               />
// //               Auto-refresh
// //             </label>
// //           </div>
// //         </div>

// //         {/* top stats */}
// //         <StatsStrip
// //           total={top.total}
// //           inProgress={top.inProgress}
// //           completed={top.completed}
// //           avgScore={Number.isFinite(top.avg) ? top.avg : 0}
// //           passRate={Number.isFinite(top.pass) ? top.pass : 0}
// //           pending={top.pending}
// //         />

// //         {/* optional live sessions (kept for UI parity) */}
// //         {Object.keys(liveStatuses).length > 0 && (
// //           <LiveSessions candidates={results as any} liveStatuses={liveStatuses} onOpen={() => {}} />
// //         )}

// //         {/* table */}
// //         <CandidatesTable
// //           loading={loading && results.length === 0}
// //           candidates={filtered as any}
// //           search={search}
// //           setSearch={setSearch}
// //           processingIds={processingIds}
// //           liveStatuses={liveStatuses}
// //           onOpen={(id) => handleFeedback(id)} // or open a details modal if you have one
// //           onExport={async () => { await handleExport(); }}
// //           exporting={exporting}
// //         />
// //     </div>
// //   );
// // };

// // export default InterviewResultsInterface;
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { RefreshCw } from "lucide-react";

// import StatsStrip        from "./subComponents/StatsStrip";
// import CandidatesTable   from "./subComponents/CandidatesTable";
// import CandidateDetailsModal from "./subComponents/CandidateDetailsModal";
// import LiveSessions      from "./subComponents/LiveSessions";

// import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// import {
//   fetchInterviewResults,
//   fetchInterviewStats,
//   exportInterviewCsv,
// } from "@/services/redux/thunk/interviewThunk";

// import type { InterviewRow, Verdict } from "./subComponents/CandidatesTable";

// const AUTO_REFRESH_MS = 30_000;

// // ── Demo data factory (used when API is not available) ────────────────────────
// const NAMES        = ["Arjun Sharma","Priya Reddy","Kiran Mehta","Sneha Patel","Rohit Kumar","Lakshmi Nair","Vikram Singh","Ananya Rao","Deepak Verma","Meera Krishnan","Ravi Teja","Kavya Nair","Suresh Babu","Divya Menon","Aditya Kumar"];
// const ROLES        = ["Junior Python Developer","Data Science","Web Developer","Python Developer","Medical Coding","Senior Software Engineer","Product Manager","UX Designer","Frontend Developer","ML Engineer"];
// const INTERVIEWERS = ["Rahul Mehta","Preethi Sharma","Sanjay Nair","Deepa Krishnan","Arun Reddy"];
// const DEPTS        = ["AI/ML","Engineering","Product","Design","Health Care"];
// const VERDICTS     = ["offer_extended","offer_extended","next_round","on_hold","rejected","pending","offer_extended","rejected","next_round","offer_extended","pending","rejected","offer_extended","on_hold","next_round"] as Verdict[];
// const ROUNDS       = ["R1","R1","R2","R1","R1","Final","R2","R1","Final","R2","R1","R2","Final","R1","R2"];

// function makeDemoData(): InterviewRow[] {
//   return NAMES.map((name, i) => {
//     const verdict = VERDICTS[i];
//     const score   = verdict === "offer_extended" ? 78 + Math.round(Math.random()*18)
//                   : verdict === "next_round"     ? 65 + Math.round(Math.random()*15)
//                   : verdict === "on_hold"        ? 60 + Math.round(Math.random()*12)
//                   : verdict === "rejected"       ? 30 + Math.round(Math.random()*25)
//                   : null;
//     const daysAgo = Math.round(Math.random() * 20);
//     const date    = new Date(Date.now() - daysAgo * 86400000).toISOString();
//     return {
//       id:          String(i + 1),
//       name,
//       email:       name.toLowerCase().replace(" ", ".") + "@email.com",
//       role:        ROLES[i % ROLES.length],
//       dept:        DEPTS[i % DEPTS.length],
//       interviewer: INTERVIEWERS[i % INTERVIEWERS.length],
//       round:       ROUNDS[i],
//       date,
//       verdict,
//       score,
//       duration:    35 + Math.round(Math.random() * 25),
//       criteria: {
//         "Technical Skills":     score ? Math.min(100, Math.round(score * 1.05)) : null,
//         "Communication":        score ? Math.min(100, Math.round(score * 0.93)) : null,
//         "Problem Solving":      score ? Math.min(100, Math.round(score * 0.98)) : null,
//         "Cultural Fit":         score ? Math.min(100, Math.round(score * 0.90)) : null,
//         "Leadership Potential": score ? Math.min(100, Math.round(score * 0.88)) : null,
//       } as Record<string, number | null>,
//       feedback: verdict === "offer_extended"
//         ? "Outstanding candidate. Demonstrated strong technical depth and excellent communication. Highly recommend proceeding with an offer."
//         : verdict === "rejected"
//         ? "Candidate lacked sufficient technical proficiency. Communication was acceptable but problem-solving was below expectations."
//         : verdict === "next_round"
//         ? "Promising candidate. Technical skills are solid. Recommend a second round with a senior engineer."
//         : verdict === "on_hold"
//         ? "Good candidate but we have stronger profiles currently. Keeping on hold pending final decisions."
//         : "Interview completed. Evaluation in progress.",
//     };
//   });
// }

// // ── Map raw Redux results to InterviewRow ────────────────────────────────────
// function mapResult(r: any, i: number): InterviewRow {
//   return {
//     id:          String(r.id ?? i),
//     name:        r.candidate_name ?? r.name ?? "Unknown",
//     email:       r.email ?? "",
//     role:        r.job_title ?? r.role ?? "",
//     dept:        r.department ?? r.dept ?? "",
//     interviewer: r.interviewer ?? r.interviewer_name ?? "—",
//     round:       r.round ?? r.interview_round ?? "R1",
//     date:        r.date ?? r.interview_date ?? r.created_at ?? "",
//     verdict:     (r.verdict ?? r.status ?? "pending") as Verdict,
//     score:       r.score != null ? Number(r.score) : null,
//     duration:    r.duration ?? null,
//     criteria:    r.criteria ?? {},
//     feedback:    r.feedback ?? r.comments ?? "No feedback recorded.",
//   };
// }

// // ─────────────────────────────────────────────────────────────────────────────
// const InterviewResultsInterface: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { results: rawResults, loading, exporting, lastCsv, error } =
//     useAppSelector((s: any) => s.interview ?? {});

//   const [rows,          setRows]          = useState<InterviewRow[]>([]);
//   const [search,        setSearch]        = useState("");
//   const [autoRefresh,   setAutoRefresh]   = useState(true);
//   const [lastRefresh,   setLastRefresh]   = useState<Date | null>(null);
//   const [selectedId,    setSelectedId]    = useState<string | null>(null);
//   const [mounted,       setMounted]       = useState(false);

//   useEffect(() => setMounted(true), []);

//   // ── Load / refresh ────────────────────────────────────────────────────────
//   const refreshAll = useCallback(async (silent = false) => {
//     try {
//       await Promise.all([
//         dispatch(fetchInterviewStats({})).unwrap().catch(() => {}),
//         dispatch(fetchInterviewResults({ page: 1, page_size: 200 })).unwrap().catch(() => {}),
//       ]);
//       setLastRefresh(new Date());
//     } catch {
//       // fallback to demo data already set
//     }
//   }, [dispatch]);

//   useEffect(() => { refreshAll(); }, [refreshAll]);

//   // Auto-refresh
//   useEffect(() => {
//     if (!autoRefresh) return;
//     const id = setInterval(() => refreshAll(true), AUTO_REFRESH_MS);
//     return () => clearInterval(id);
//   }, [autoRefresh, refreshAll]);

//   // Map raw results → rows, fallback to demo data
//   useEffect(() => {
//     if (Array.isArray(rawResults) && rawResults.length > 0) {
//       setRows(rawResults.map(mapResult));
//     } else if (!loading) {
//       setRows(makeDemoData());
//     }
//   }, [rawResults, loading]);

//   // CSV download
//   useEffect(() => {
//     if (!lastCsv) return;
//     const url = URL.createObjectURL(lastCsv);
//     const a = document.createElement("a");
//     a.href = url; a.download = "interview_results.csv"; a.click();
//     URL.revokeObjectURL(url);
//   }, [lastCsv]);

//   // ── Derived ───────────────────────────────────────────────────────────────
//   const filtered = useMemo(() => {
//     const q = search.toLowerCase();
//     if (!q) return rows;
//     return rows.filter(r =>
//       r.name.toLowerCase().includes(q) ||
//       r.role.toLowerCase().includes(q) ||
//       r.interviewer.toLowerCase().includes(q)
//     );
//   }, [rows, search]);

//   const stats = useMemo(() => {
//     const offers   = rows.filter(r => r.verdict === "offer_extended").length;
//     const pending  = rows.filter(r => r.verdict === "pending").length;
//     const scores   = rows.filter(r => r.score != null).map(r => r.score as number);
//     const avg      = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
//     const offerRate= rows.length > 0 ? Math.round((offers / rows.length) * 100) : 0;
//     return { total: rows.length, offerExtended: offers, avgScore: avg, pendingDecision: pending,
//              upcomingToday: 4, offerRate };
//   }, [rows]);

//   const selectedCandidate = useMemo(() =>
//     rows.find(r => r.id === selectedId) ?? null, [rows, selectedId]);

//   // ── Verdict actions ───────────────────────────────────────────────────────
//   const updateVerdict = (id: string, verdict: Verdict) => {
//     setRows(prev => prev.map(r => r.id === id ? { ...r, verdict } : r));
//   };

//   // ─────────────────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div style={{ maxWidth: 1240, margin: "0 auto", padding: "28px 32px 64px" }}>

//         {/* ── Page header ── */}
//         <div className="flex items-start justify-between mb-6">
//           <div>
//             <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight">Interview Results</h1>
//             <p className="text-[13px] text-gray-400 mt-1 leading-relaxed">
//               Track all interview outcomes, scores, and hiring decisions across every job position
//             </p>
//             {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
//           </div>
//           <div className="flex items-center gap-3 flex-shrink-0">
//             {mounted && lastRefresh && (
//               <span className="text-[12px] text-gray-400" suppressHydrationWarning>
//                 Updated: {lastRefresh.toLocaleTimeString()}
//               </span>
//             )}
//             <label className="flex items-center gap-1.5 text-[12px] text-gray-500 cursor-pointer">
//               <input type="checkbox" checked={autoRefresh}
//                 onChange={e => setAutoRefresh(e.target.checked)} className="w-3.5 h-3.5 accent-blue-600" />
//               Auto-refresh
//             </label>
//             <button
//               onClick={() => refreshAll()}
//               disabled={loading}
//               className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
//             >
//               <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
//               Refresh
//             </button>
//             <button
//               onClick={() => dispatch(exportInterviewCsv({}))}
//               disabled={exporting}
//               className="px-3.5 py-2 text-[13px] font-medium bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
//             >
//               {exporting ? "Exporting…" : "Export Results"}
//             </button>
//             <button className="px-3.5 py-2 text-[13px] font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//               + Schedule Interview
//             </button>
//           </div>
//         </div>

//         {/* ── KPI strip ── */}
//         <StatsStrip {...stats} />

//         {/* ── Two-column layout ── */}
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 18, alignItems: "start" }}>

//           {/* Left: results table with filter bar */}
//           <CandidatesTable
//             candidates={filtered}
//             loading={loading && rows.length === 0}
//             search={search}
//             setSearch={setSearch}
//             onOpen={id => setSelectedId(id)}
//             onExtendOffer={id => updateVerdict(id, "offer_extended")}
//             onScheduleNext={id => alert("Schedule next round for " + rows.find(r=>r.id===id)?.name)}
//             onAddVerdict={id => {
//               const v = prompt("Enter verdict:\n(offer_extended / next_round / on_hold / rejected)");
//               if (v && ["offer_extended","next_round","on_hold","rejected"].includes(v.trim())) {
//                 updateVerdict(id, v.trim() as Verdict);
//               }
//             }}
//             exporting={exporting}
//             onExport={() => dispatch(exportInterviewCsv({}))}
//           />

//           {/* Right: sidebar with ring, criteria, upcoming, activity */}
//           <LiveSessions results={rows} />
//         </div>
//       </div>

//       {/* ── Slide-in detail drawer ── */}
//       <CandidateDetailsModal
//         candidate={selectedCandidate}
//         onClose={() => setSelectedId(null)}
//         onExtendOffer={id => { updateVerdict(id, "offer_extended"); setSelectedId(null); }}
//         onReject={id     => { updateVerdict(id, "rejected");       setSelectedId(null); }}
//         onScheduleNext={id => { alert("Schedule next round for " + rows.find(r=>r.id===id)?.name); setSelectedId(null); }}
//       />
//     </div>
//   );
// };

// export default InterviewResultsInterface;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

import StatsStrip            from "./subComponents/StatsStrip";
import CandidatesTable       from "./subComponents/CandidatesTable";
import CandidateDetailsModal from "./subComponents/CandidateDetailsModal";
import LiveSessions          from "./subComponents/LiveSessions";

import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import {
  fetchInterviewResults,
  fetchInterviewStats,
  exportInterviewCsv,
} from "@/services/redux/thunk/interviewThunk";

import type { InterviewRow, Verdict } from "./subComponents/CandidatesTable";

const AUTO_REFRESH_MS = 30_000;

// ── Demo data factory ─────────────────────────────────────────────────────────
const NAMES        = ["Arjun Sharma","Priya Reddy","Kiran Mehta","Sneha Patel","Rohit Kumar","Lakshmi Nair","Vikram Singh","Ananya Rao","Deepak Verma","Meera Krishnan","Ravi Teja","Kavya Nair","Suresh Babu","Divya Menon","Aditya Kumar"];
const ROLES        = ["Junior Python Developer","Data Science","Web Developer","Python Developer","Medical Coding","Senior Software Engineer","Product Manager","UX Designer","Frontend Developer","ML Engineer"];
const INTERVIEWERS = ["Rahul Mehta","Preethi Sharma","Sanjay Nair","Deepa Krishnan","Arun Reddy"];
const DEPTS        = ["AI/ML","Engineering","Product","Design","Health Care"];
const VERDICTS     = ["offer_extended","offer_extended","next_round","on_hold","rejected","pending","offer_extended","rejected","next_round","offer_extended","pending","rejected","offer_extended","on_hold","next_round"] as Verdict[];
const ROUNDS       = ["R1","R1","R2","R1","R1","Final","R2","R1","Final","R2","R1","R2","Final","R1","R2"];

function makeDemoData(): InterviewRow[] {
  return NAMES.map((name, i) => {
    const verdict = VERDICTS[i];
    const score   = verdict === "offer_extended" ? 78 + Math.round(Math.random()*18)
                  : verdict === "next_round"     ? 65 + Math.round(Math.random()*15)
                  : verdict === "on_hold"        ? 60 + Math.round(Math.random()*12)
                  : verdict === "rejected"       ? 30 + Math.round(Math.random()*25)
                  : null;
    const daysAgo = Math.round(Math.random() * 20);
    const date    = new Date(Date.now() - daysAgo * 86400000).toISOString();
    return {
      id: String(i + 1), name,
      email: name.toLowerCase().replace(" ", ".") + "@email.com",
      role: ROLES[i % ROLES.length], dept: DEPTS[i % DEPTS.length],
      interviewer: INTERVIEWERS[i % INTERVIEWERS.length],
      round: ROUNDS[i], date, verdict, score,
      duration: 35 + Math.round(Math.random() * 25),
      criteria: {
        "Technical Skills":     score ? Math.min(100, Math.round(score * 1.05)) : null,
        "Communication":        score ? Math.min(100, Math.round(score * 0.93)) : null,
        "Problem Solving":      score ? Math.min(100, Math.round(score * 0.98)) : null,
        "Cultural Fit":         score ? Math.min(100, Math.round(score * 0.90)) : null,
        "Leadership Potential": score ? Math.min(100, Math.round(score * 0.88)) : null,
      } as Record<string, number | null>,
      feedback: verdict === "offer_extended"
        ? "Outstanding candidate. Demonstrated strong technical depth and excellent communication."
        : verdict === "rejected"
        ? "Candidate lacked sufficient technical proficiency for the role."
        : verdict === "next_round"
        ? "Promising candidate. Recommend a second round with a senior engineer."
        : verdict === "on_hold"
        ? "Good candidate but we have stronger profiles currently. Keeping on hold."
        : "Interview completed. Evaluation in progress.",
    };
  });
}

function mapResult(r: any, i: number): InterviewRow {
  return {
    id: String(r.id ?? i), name: r.candidate_name ?? r.name ?? "Unknown",
    email: r.email ?? "", role: r.job_title ?? r.role ?? "",
    dept: r.department ?? r.dept ?? "",
    interviewer: r.interviewer ?? r.interviewer_name ?? "—",
    round: r.round ?? r.interview_round ?? "R1",
    date: r.date ?? r.interview_date ?? r.created_at ?? "",
    verdict: (r.verdict ?? r.status ?? "pending") as Verdict,
    score: r.score != null ? Number(r.score) : null,
    duration: r.duration ?? null,
    criteria: r.criteria ?? {},
    feedback: r.feedback ?? r.comments ?? "No feedback recorded.",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
const InterviewResultsInterface: React.FC = () => {
  const dispatch = useAppDispatch();
  const router   = useRouter();
  const { results: rawResults, loading, exporting, lastCsv, error } =
    useAppSelector((s: any) => s.interview ?? {});

  const [rows,          setRows]          = useState<InterviewRow[]>([]);
  const [search,        setSearch]        = useState("");
  const [autoRefresh,   setAutoRefresh]   = useState(true);
  const [lastRefresh,   setLastRefresh]   = useState<Date | null>(null);
  const [selectedId,    setSelectedId]    = useState<string | null>(null);
  const [mounted,       setMounted]       = useState(false);


  useEffect(() => setMounted(true), []);

  const refreshAll = useCallback(async (silent = false) => {
    try {
      await Promise.all([
        dispatch(fetchInterviewStats({})).unwrap().catch(() => {}),
        dispatch(fetchInterviewResults({ page: 1, page_size: 200 })).unwrap().catch(() => {}),
      ]);
      setLastRefresh(new Date());
    } catch {}
  }, [dispatch]);

  useEffect(() => { refreshAll(); }, [refreshAll]);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => refreshAll(true), AUTO_REFRESH_MS);
    return () => clearInterval(id);
  }, [autoRefresh, refreshAll]);

  useEffect(() => {
    if (Array.isArray(rawResults) && rawResults.length > 0) {
      setRows(rawResults.map(mapResult));
    } else if (!loading) {
      setRows(makeDemoData());
    }
  }, [rawResults, loading]);

  useEffect(() => {
    if (!lastCsv) return;
    const url = URL.createObjectURL(lastCsv);
    const a = document.createElement("a");
    a.href = url; a.download = "interview_results.csv"; a.click();
    URL.revokeObjectURL(url);
  }, [lastCsv]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return rows;
    return rows.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.role.toLowerCase().includes(q) ||
      r.interviewer.toLowerCase().includes(q)
    );
  }, [rows, search]);

  const stats = useMemo(() => {
    const offers    = rows.filter(r => r.verdict === "offer_extended").length;
    const pending   = rows.filter(r => r.verdict === "pending").length;
    const scores    = rows.filter(r => r.score != null).map(r => r.score as number);
    const avg       = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
    const offerRate = rows.length > 0 ? Math.round((offers / rows.length) * 100) : 0;
    return { total: rows.length, offerExtended: offers, avgScore: avg,
             pendingDecision: pending, upcomingToday: 4, offerRate };
  }, [rows]);

  const selectedCandidate = useMemo(() =>
    rows.find(r => r.id === selectedId) ?? null, [rows, selectedId]);

  const updateVerdict = (id: string, verdict: Verdict) =>
    setRows(prev => prev.map(r => r.id === id ? { ...r, verdict } : r));

  return (
    <div className="min-h-screen bg-gray-50">
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "28px 32px 64px" }}>

        {/* ── Page header ── */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight">Interview Results</h1>
            <p className="text-[13px] text-gray-400 mt-1 leading-relaxed">
              Track all interview outcomes, scores, and hiring decisions across every job position
            </p>
            {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {mounted && lastRefresh && (
              <span className="text-[12px] text-gray-400" suppressHydrationWarning>
                Updated: {lastRefresh.toLocaleTimeString()}
              </span>
            )}
            <label className="flex items-center gap-1.5 text-[12px] text-gray-500 cursor-pointer">
              <input type="checkbox" checked={autoRefresh}
                onChange={e => setAutoRefresh(e.target.checked)} className="w-3.5 h-3.5 accent-blue-600" />
              Auto-refresh
            </label>
            <button
              onClick={() => refreshAll()}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={() => dispatch(exportInterviewCsv({}))}
              disabled={exporting}
              className="px-3.5 py-2 text-[13px] font-medium bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              {exporting ? "Exporting…" : "Export Results"}
            </button>

            <button
              onClick={() => router.push("/scheduler")}
              className="px-3.5 py-2 text-[13px] font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Schedule Interview
            </button>
          </div>
        </div>

        {/* ── KPI strip ── */}
        <StatsStrip {...stats} />

        {/* ── Two-column layout ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 18, alignItems: "start" }}>
          <CandidatesTable
            candidates={filtered}
            loading={loading && rows.length === 0}
            search={search}
            setSearch={setSearch}
            onOpen={id => setSelectedId(id)}
            onExtendOffer={id => updateVerdict(id, "offer_extended")}
            onScheduleNext={id => {
              router.push("/scheduler");
            }}
            onAddVerdict={id => {
              const v = prompt("Enter verdict:\n(offer_extended / next_round / on_hold / rejected)");
              if (v && ["offer_extended","next_round","on_hold","rejected"].includes(v.trim())) {
                updateVerdict(id, v.trim() as Verdict);
              }
            }}
            exporting={exporting}
            onExport={() => dispatch(exportInterviewCsv({}))}
          />

          <LiveSessions results={rows} />
        </div>
      </div>

      {/* ── Candidate detail drawer ── */}
      <CandidateDetailsModal
        candidate={selectedCandidate}
        onClose={() => setSelectedId(null)}
        onExtendOffer={id => { updateVerdict(id, "offer_extended"); setSelectedId(null); }}
        onReject={id     => { updateVerdict(id, "rejected");       setSelectedId(null); }}
        onScheduleNext={id => {
          setSelectedId(null);
          router.push("/scheduler");
        }}
      />
    </div>
  );
};

export default InterviewResultsInterface;