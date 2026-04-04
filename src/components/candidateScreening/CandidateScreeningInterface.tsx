// // "use client";

// // import React, { useEffect, useMemo, useState } from "react";
// // import { RefreshCw, CheckCircle, Calendar, Send, Users } from "lucide-react";
// // import { useSearchParams } from "next/navigation";

// // // ⬇️ Removed: import Navbar from "@/components/navbar/Navbar";

// // import FilterBar from "./subComponents/Filterbar";
// // import CandidateCard from "./subComponents/Candidatecard";
// // import CandidateListSkeleton from "./subComponents/candidates_Skeleton";
// // import CandidateDetails from "./subComponents/Candidate_Details";

// // import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// // import {
// //   getJobs,
// //   getCandidates,
// //   sendAssessmentReminder as sendAssessmentReminderThunk,
// // } from "@/services/redux/thunk/candidateThunk";
// // import { setSelectedJobId, clearMessage } from "@/services/redux/slice/candidateSlice";

// // import type { Candidate, Job, StatusInfo } from "@/services/interfaces/CandidateScreening";

// // /* ----------------------------- Status helpers ---------------------------- */
// // export const STATUS_MAP: Record<string, StatusInfo> = {
// //   Hired: { color: "bg-green-100 text-green-800", icon: CheckCircle, priority: 8 },
// //   "Interview Scheduled": { color: "bg-blue-100 text-blue-800", icon: Calendar, priority: 7 },
// //   "Assessment Passed": { color: "bg-green-100 text-green-800", icon: CheckCircle, priority: 6 },
// //   "Assessment Failed": { color: "bg-red-100 text-red-800", icon: CheckCircle, priority: 5 },
// //   "Assessment In Progress": { color: "bg-yellow-100 text-yellow-800", icon: Calendar, priority: 4 },
// //   "Assessment Sent": { color: "bg-blue-100 text-blue-800", icon: Send, priority: 3 },
// //   "Assessment Expired": { color: "bg-gray-100 text-gray-800", icon: Calendar, priority: 2 },
// //   Shortlisted: { color: "bg-green-100 text-green-800", icon: CheckCircle, priority: 2 },
// //   Rejected: { color: "bg-red-100 text-red-800", icon: CheckCircle, priority: 1 },
// //   "Under Review": { color: "bg-gray-100 text-gray-800", icon: Calendar, priority: 0 },
// // };

// // const getDisplayStatus = (c: Candidate): string => {
// //   if (c?.final_status === "Hired") return "Hired";
// //   if (c?.interview_scheduled) return "Interview Scheduled";
// //   if (c?.exam_completed) return (c?.exam_percentage ?? 0) >= 70 ? "Assessment Passed" : "Assessment Failed";
// //   if (c?.exam_started) return "Assessment In Progress";
// //   if (c?.exam_link_sent) return c?.link_expired ? "Assessment Expired" : "Assessment Sent";
// //   if (c?.status === "Shortlisted") return "Shortlisted";
// //   if (c?.status === "Rejected" || c?.final_status === "Rejected After Exam") return "Rejected";
// //   return "Under Review";
// // };
// // const getCandidateStatusInfo = (c: Candidate): StatusInfo =>
// //   STATUS_MAP[getDisplayStatus(c)] ?? STATUS_MAP["Under Review"];
// // const getScoreColor = (s = 0) =>
// //   s >= 85 ? "text-green-600" : s >= 70 ? "text-yellow-600" : "text-red-600";

// // /* --------------------------------- Page --------------------------------- */
// // export default function CandidateScreeningInterface() {
// //   const dispatch = useAppDispatch();
// //   const params = useSearchParams();
// //   const jobIdFromUrl = params.get("job_id");

// //   const {
// //     jobs,
// //     candidates,
// //     candidatesLoading,
// //     error,
// //     lastFetchTime,
// //     selectedJobId,
// //     message,
// //   } = useAppSelector((s) => s.candidate);

// //   const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [filterStatus, setFilterStatus] = useState<string>("all");
// //   const [sortBy, setSortBy] = useState("score_desc");

// //   useEffect(() => {
// //     dispatch(getJobs());
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (jobIdFromUrl && jobs.length) {
// //       const found = jobs.find((j) => String(j.id) === String(jobIdFromUrl));
// //       if (found) dispatch(setSelectedJobId(found.id));
// //     }
// //   }, [jobIdFromUrl, jobs, dispatch]);

// //   useEffect(() => {
// //     dispatch(getCandidates(selectedJobId ?? undefined));
// //   }, [dispatch, selectedJobId]);

// //   useEffect(() => {
// //     // eslint-disable-next-line react-hooks/set-state-in-effect
// //     if (candidates.length && !selectedCandidate) setSelectedCandidate(candidates[0]);
// //   }, [candidates, selectedCandidate]);

// //   const selectedJob: Job | null = useMemo(
// //     () => (selectedJobId ? jobs.find((j) => String(j.id) === String(selectedJobId)) ?? null : null),
// //     [jobs, selectedJobId]
// //   );

// //   const processedCandidates = useMemo(
// //     () =>
// //       candidates.map((c) => ({
// //         ...c,
// //         displayStatus: getDisplayStatus(c),
// //         displayScore: c?.ats_score || 0,
// //         scoreColor: getScoreColor(c?.ats_score || 0),
// //         statusInfo: getCandidateStatusInfo(c),
// //       })),
// //     [candidates]
// //   );

// //   const filteredCandidates = useMemo(() => {
// //     let filtered = processedCandidates;

// //     if (searchTerm) {
// //       const q = searchTerm.toLowerCase();
// //       filtered = filtered.filter(
// //         (c) =>
// //           c.name?.toLowerCase().includes(q) ||
// //           c.email?.toLowerCase().includes(q) ||
// //           c.job_title?.toLowerCase().includes(q)
// //       );
// //     }

// //     if (filterStatus !== "all") {
// //       filtered = filtered.filter((c) => {
// //         switch (filterStatus) {
// //           case "shortlisted":
// //             return c.status === "Shortlisted";
// //           case "assessment_pending":
// //             return c.exam_link_sent && !c.exam_completed && !c.link_expired;
// //           case "assessment_completed":
// //             return c.exam_completed;
// //           case "interview_scheduled":
// //             return c.interview_scheduled;
// //           case "rejected":
// //             return c.status === "Rejected" || c.final_status === "Rejected After Exam";
// //           default:
// //             return true;
// //         }
// //       });
// //     }

// //     return filtered.sort((a, b) => {
// //       switch (sortBy) {
// //         case "score_desc":
// //           return (b.ats_score || 0) - (a.ats_score || 0);
// //         case "score_asc":
// //           return (a.ats_score || 0) - (b.ats_score || 0);
// //         case "date_desc":
// //           return +new Date(b.processed_date || 0) - +new Date(a.processed_date || 0);
// //         case "date_asc":
// //           return +new Date(a.processed_date || 0) - +new Date(b.processed_date || 0);
// //         case "name":
// //           return (a.name || "").localeCompare(b.name || "");
// //         case "status":
// //           return (b.statusInfo?.priority || 0) - (a.statusInfo?.priority || 0);
// //         default:
// //           return 0;
// //       }
// //     });
// //   }, [processedCandidates, searchTerm, filterStatus, sortBy]);

// //   const refreshData = async () => {
// //     await dispatch(getJobs()).unwrap();
// //     await dispatch(getCandidates(selectedJobId ?? undefined)).unwrap();
// //   };

// //   const sendAssessmentReminder = async (candidateId: string | number) => {
// //     await dispatch(sendAssessmentReminderThunk(candidateId)).unwrap();
// //     setTimeout(() => dispatch(clearMessage()), 3000);
// //     dispatch(getCandidates(selectedJobId ?? undefined));
// //   };

// //   return (
// //     <div className="flex min-h-screen flex-col bg-gray-50">
// //       {/* ⬇️ Removed: <Navbar /> */}

// //       <main className="flex-grow p-6">
// //         <div className="mb-6 flex items-center justify-between space-x-6">
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-900">Candidate Screening</h1>
// //             {selectedJob && (
// //               <div className="mt-1 flex items-center space-x-6">
// //                 <p className="text-gray-600">
// //                   {selectedJob.title} • {selectedJob.location} • {filteredCandidates.length} candidates
// //                 </p>
// //                 {lastFetchTime && (
// //                   <span className="text-xs text-gray-500">
// //                     Updated: {new Date(lastFetchTime).toLocaleTimeString()}
// //                   </span>
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           <div className="flex items-center">
// //             <button
// //               onClick={refreshData}
// //               className="rounded-lg border border-gray-300 p-2 text-gray-600 transition-colors hover:bg-gray-100"
// //               title="Refresh"
// //             >
// //               <RefreshCw className="h-4 w-4" />
// //             </button>
// //           </div>
// //         </div>

// //         {message && (
// //           <div className="mb-4 flex items-center rounded-lg bg-green-100 p-4 text-green-700">
// //             <CheckCircle className="mr-2 h-5 w-5" />
// //             {message}
// //           </div>
// //         )}

// //         {error && <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">Error: {error}</div>}

// //         <FilterBar
// //           jobs={jobs}
// //           selectedJob={selectedJob}
// //           onJobChange={(job: Job | null) => dispatch(setSelectedJobId(job?.id ?? null))}
// //           searchTerm={searchTerm}
// //           onSearchChange={setSearchTerm}
// //           filterStatus={filterStatus}
// //           onFilterStatusChange={setFilterStatus}
// //           sortBy={sortBy}
// //           onSortChange={setSortBy}
// //         />

// //         <div className="flex flex-col gap-6 lg:flex-row">
// //           {/* Candidate list */}
// //           <div className="lg:w-1/2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
// //             <div className="border-b border-gray-200 p-4">
// //               <div className="flex items-center justify-between">
// //                 <h2 className="font-medium text-gray-700">Candidates</h2>
// //                 <span className="text-sm text-gray-500">
// //                   {filteredCandidates.length} of {candidates.length}
// //                 </span>
// //               </div>
// //             </div>

// //             <div className="max-h-[calc(100vh-300px)] divide-y divide-gray-200 overflow-y-auto">
// //               {candidatesLoading === "pending" ? (
// //                 <CandidateListSkeleton />
// //               ) : filteredCandidates.length === 0 ? (
// //                 <div className="p-8 text-center text-gray-500">
// //                   <Users className="mx-auto mb-3 h-12 w-12 text-gray-300" />
// //                   <p className="text-lg font-medium">No candidates found</p>
// //                   <p className="mt-1">
// //                     {candidates.length === 0
// //                       ? "Try adjusting your filters"
// //                       : "Try adjusting your search or filters"}
// //                   </p>
// //                 </div>
// //               ) : (
// //                 filteredCandidates.map((c) => (
// //                   <CandidateCard
// //                     key={c.id}
// //                     candidate={c}
// //                     isSelected={selectedCandidate?.id === c.id}
// //                     onClick={() => setSelectedCandidate(c)}
// //                   />
// //                 ))
// //               )}
// //             </div>
// //           </div>

// //         {/* Candidate details */}
// //           <div className="lg:w-1/2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
// //             <div className="border-b border-gray-200 p-4">
// //               <h2 className="font-medium text-gray-700">Candidate Details</h2>
// //             </div>
// //             <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
// //               <CandidateDetails
// //                 candidate={selectedCandidate}
// //                 onSendReminder={(id) => sendAssessmentReminder(id)}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
// "use client";

// import React, { useEffect, useMemo, useState, useCallback } from "react";
// import { useSearchParams } from "next/navigation";
// import { RefreshCw, CheckCircle } from "lucide-react";

// import CandidateCard        from "./subComponents/Candidatecard";
// import CandidateListSkeleton from "./subComponents/candidates_Skeleton";
// import CandidateDetails     from "./subComponents/Candidate_Details";

// import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// import {
//   getJobs,
//   getCandidates,
//   sendAssessmentReminder as sendAssessmentReminderThunk,
// } from "@/services/redux/thunk/candidateThunk";
// import { setSelectedJobId, clearMessage } from "@/services/redux/slice/candidateSlice";
// import type { Candidate, Job, StatusInfo } from "@/services/interfaces/CandidateScreening";

// /* ─────────────────────────────────────────────────────────────────────────────
//    STATUS HELPERS  (same logic as HTML version)
// ───────────────────────────────────────────────────────────────────────────── */
// export const STATUS_MAP: Record<string, StatusInfo & { label: string; cls: string }> = {
//   Shortlisted:            { label: "Shortlisted",          cls: "pill-shortlisted", color: "pill-shortlisted", icon: CheckCircle, priority: 7 },
//   "Assessment Sent":      { label: "Assessment Pending",   cls: "pill-assessment",  color: "pill-assessment",  icon: CheckCircle, priority: 6 },
//   "Assessment In Progress":{ label:"Assessment Pending",   cls: "pill-assessment",  color: "pill-assessment",  icon: CheckCircle, priority: 5 },
//   "Assessment Passed":    { label: "Assessment Done",      cls: "pill-assessed",    color: "pill-assessed",    icon: CheckCircle, priority: 4 },
//   "Assessment Failed":    { label: "Assessment Done",      cls: "pill-assessed",    color: "pill-assessed",    icon: CheckCircle, priority: 3 },
//   "Assessment Expired":   { label: "Assessment Pending",   cls: "pill-assessment",  color: "pill-assessment",  icon: CheckCircle, priority: 2 },
//   "Interview Scheduled":  { label: "Interview Scheduled",  cls: "pill-interview",   color: "pill-interview",   icon: CheckCircle, priority: 8 },
//   Hired:                  { label: "Hired",                cls: "pill-hired",       color: "pill-hired",       icon: CheckCircle, priority: 9 },
//   Rejected:               { label: "Rejected",             cls: "pill-rejected",    color: "pill-rejected",    icon: CheckCircle, priority: 1 },
//   "Under Review":         { label: "Applied",              cls: "pill-applied",     color: "pill-applied",     icon: CheckCircle, priority: 0 },
// };

// export function getDisplayStatus(c: Candidate): string {
//   if (c?.final_status === "Hired")        return "Hired";
//   if (c?.interview_scheduled)             return "Interview Scheduled";
//   if (c?.exam_completed)                  return (c?.exam_percentage ?? 0) >= 70 ? "Assessment Passed" : "Assessment Failed";
//   if (c?.exam_started)                    return "Assessment In Progress";
//   if (c?.exam_link_sent)                  return c?.link_expired ? "Assessment Expired" : "Assessment Sent";
//   if (c?.status === "Shortlisted")        return "Shortlisted";
//   if (c?.status === "Rejected" || c?.final_status === "Rejected After Exam") return "Rejected";
//   return "Under Review";
// }

// export function getCandidateStatusInfo(c: Candidate) {
//   return STATUS_MAP[getDisplayStatus(c)] ?? STATUS_MAP["Under Review"];
// }

// const getScoreColor = (s = 0) =>
//   s >= 85 ? "#059669" : s >= 70 ? "#D97706" : "#DC2626";

// /* ─────────────────────────────────────────────────────────────────────────────
//    FILTER CHIP DEFINITIONS  (matches HTML filter chips exactly)
// ───────────────────────────────────────────────────────────────────────────── */
// const FILTER_CHIPS = [
//   { label: "All",                  value: "all" },
//   { label: "Shortlisted",          value: "shortlisted" },
//   { label: "Assessment Pending",   value: "assessment_pending" },
//   { label: "Assessment Done",      value: "assessment_done" },
//   { label: "Interview Scheduled",  value: "interview" },
//   { label: "Hired",                value: "hired" },
//   { label: "Rejected",             value: "rejected" },
// ];

// /* ─────────────────────────────────────────────────────────────────────────────
//    GLOBAL STYLES  (injected once — identical to HTML version CSS)
// ───────────────────────────────────────────────────────────────────────────── */
// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   :root {
//     --font: 'DM Sans', sans-serif;
//     --accent: #2563EB; --accent-light: #EFF6FF; --accent-mid: #BFDBFE;
//     --green: #059669;  --green-light: #ECFDF5;
//     --amber: #D97706;  --amber-light: #FFFBEB;
//     --red: #DC2626;    --red-light: #FEF2F2;
//     --purple: #7C3AED; --purple-light: #F5F3FF;
//     --teal: #0D9488;   --teal-light: #F0FDFA;
//     --bg: #F8FAFC; --surface: #FFFFFF;
//     --border: rgba(0,0,0,0.08); --border-md: rgba(0,0,0,0.14);
//     --text-1: #0F172A; --text-2: #64748B; --text-3: #94A3B8;
//     --r: 10px; --r-lg: 14px; --r-xl: 18px;
//   }
//   body { font-family: var(--font); background: var(--bg); color: var(--text-1); }

//   /* scrollbar */
//   ::-webkit-scrollbar { width: 4px; }
//   ::-webkit-scrollbar-thumb { background: var(--border-md); border-radius: 4px; }

//   /* topbar */
//   .cs-topbar { display:flex; align-items:center; justify-content:space-between; padding:0 32px; height:60px; background:var(--surface); border-bottom:0.5px solid var(--border-md); position:sticky; top:0; z-index:50; }
//   .cs-brand  { display:flex; align-items:center; gap:12px; text-decoration:none; cursor:pointer; }
//   .cs-brand-icon { width:34px; height:34px; background:var(--accent); border-radius:8px; display:flex; align-items:center; justify-content:center; }
//   .cs-brand-icon svg { width:17px; height:17px; fill:none; stroke:#fff; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
//   .cs-brand-name { font-size:15px; font-weight:600; color:var(--text-1); letter-spacing:-0.3px; }
//   .cs-brand-sub  { font-size:11px; color:var(--text-2); margin-top:1px; }
//   .cs-nav { display:flex; gap:2px; }
//   .cs-nav-link { font-size:13px; font-weight:500; padding:7px 14px; border-radius:8px; color:var(--text-2); text-decoration:none; transition:all .14s; border:none; background:transparent; cursor:pointer; font-family:var(--font); }
//   .cs-nav-link:hover { background:var(--bg); color:var(--text-1); }
//   .cs-nav-link.active { background:var(--accent-light); color:var(--accent); }

//   /* buttons */
//   .cs-btn { font-family:var(--font); font-size:13px; font-weight:500; border-radius:8px; padding:8px 16px; cursor:pointer; transition:all .15s; border:0.5px solid var(--border-md); background:var(--surface); color:var(--text-1); }
//   .cs-btn:hover { background:#F1F5F9; }
//   .cs-btn-primary { background:var(--accent); color:#fff; border-color:transparent; }
//   .cs-btn-primary:hover { background:#1D4ED8; }
//   .cs-btn-icon { width:36px; height:36px; padding:0; display:flex; align-items:center; justify-content:center; border-radius:8px; border:0.5px solid var(--border-md); background:var(--surface); cursor:pointer; }
//   .cs-btn-icon:hover { background:#F1F5F9; }

//   /* page wrap — exact split layout from HTML */
//   .cs-page-wrap { display:grid; grid-template-columns:380px 1fr; height:calc(100vh - 60px); overflow:hidden; }

//   /* left panel */
//   .cs-list-panel { display:flex; flex-direction:column; border-right:0.5px solid var(--border-md); background:var(--surface); overflow:hidden; }
//   .cs-list-head  { padding:16px 16px 0; border-bottom:0.5px solid var(--border); }
//   .cs-list-title-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
//   .cs-list-title { font-size:15px; font-weight:600; color:var(--text-1); }
//   .cs-list-count { font-size:12px; color:var(--text-2); background:var(--bg); padding:3px 9px; border-radius:20px; border:0.5px solid var(--border); }

//   /* search */
//   .cs-search-wrap { position:relative; margin-bottom:10px; }
//   .cs-search-wrap svg { position:absolute; left:11px; top:50%; transform:translateY(-50%); width:15px; height:15px; stroke:var(--text-3); fill:none; stroke-width:2; stroke-linecap:round; pointer-events:none; }
//   .cs-search { width:100%; padding:9px 12px 9px 34px; font-size:13px; font-family:var(--font); color:var(--text-1); background:var(--bg); border:0.5px solid var(--border); border-radius:9px; outline:none; transition:border-color .14s; }
//   .cs-search:focus { border-color:var(--accent-mid); background:var(--surface); }
//   .cs-search::placeholder { color:var(--text-3); }

//   /* filter chips */
//   .cs-filter-row { display:flex; gap:6px; overflow-x:auto; padding-bottom:12px; scrollbar-width:none; }
//   .cs-filter-row::-webkit-scrollbar { display:none; }
//   .cs-chip { flex-shrink:0; font-size:12px; font-weight:500; padding:5px 12px; border-radius:20px; border:0.5px solid var(--border); background:var(--surface); color:var(--text-2); cursor:pointer; transition:all .13s; white-space:nowrap; font-family:var(--font); }
//   .cs-chip:hover { border-color:var(--accent-mid); color:var(--accent); }
//   .cs-chip.active { background:var(--accent); color:#fff; border-color:transparent; }

//   /* sort row */
//   .cs-sort-row { display:flex; align-items:center; justify-content:space-between; padding:10px 16px; border-bottom:0.5px solid var(--border); }
//   .cs-sort-label { font-size:11px; color:var(--text-3); font-weight:500; text-transform:uppercase; letter-spacing:.5px; }
//   .cs-sort-select { font-size:12px; font-family:var(--font); color:var(--text-2); background:transparent; border:none; outline:none; cursor:pointer; }

//   /* candidate list */
//   .cs-cand-list { flex:1; overflow-y:auto; padding:6px 8px; }

//   /* candidate card */
//   .cs-cand-card { display:flex; align-items:flex-start; gap:12px; padding:12px 10px; border-radius:10px; cursor:pointer; transition:background .12s; border:0.5px solid transparent; margin-bottom:2px; }
//   .cs-cand-card:hover { background:var(--bg); }
//   .cs-cand-card.selected { background:var(--accent-light); border-color:var(--accent-mid); }
//   .cs-avatar { width:40px; height:40px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:600; }
//   .cs-cand-info { flex:1; min-width:0; }
//   .cs-cand-name { font-size:13px; font-weight:600; color:var(--text-1); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
//   .cs-cand-role { font-size:12px; color:var(--text-2); margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
//   .cs-cand-meta { display:flex; align-items:center; gap:8px; margin-top:6px; }
//   .cs-cand-right { display:flex; flex-direction:column; align-items:flex-end; gap:6px; flex-shrink:0; }
//   .cs-score-badge { font-size:12px; font-weight:600; padding:2px 8px; border-radius:6px; min-width:38px; text-align:center; }
//   .cs-score-hi  { background:var(--green-light); color:var(--green); }
//   .cs-score-mid { background:var(--amber-light); color:var(--amber); }
//   .cs-score-lo  { background:var(--red-light);   color:var(--red);   }
//   .cs-cand-date { font-size:11px; color:var(--text-3); }

//   /* pills */
//   .cs-pill { display:inline-flex; align-items:center; gap:4px; font-size:10px; font-weight:600; padding:2px 7px; border-radius:20px; white-space:nowrap; }
//   .pill-shortlisted { background:var(--accent-light); color:var(--accent); }
//   .pill-assessment  { background:var(--amber-light);  color:var(--amber);  }
//   .pill-assessed    { background:var(--teal-light);   color:var(--teal);   }
//   .pill-interview   { background:var(--purple-light); color:var(--purple); }
//   .pill-hired       { background:var(--green-light);  color:var(--green);  }
//   .pill-rejected    { background:var(--red-light);    color:var(--red);    }
//   .pill-applied     { background:#F1F5F9;             color:var(--text-2); }

//   /* empty list */
//   .cs-list-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:10px; padding:40px 20px; text-align:center; }
//   .cs-list-empty svg { width:40px; height:40px; stroke:var(--text-3); fill:none; stroke-width:1.2; stroke-linecap:round; margin-bottom:4px; }
//   .cs-list-empty-title { font-size:14px; font-weight:600; color:var(--text-1); }
//   .cs-list-empty-sub   { font-size:12px; color:var(--text-2); line-height:1.6; }

//   /* right panel */
//   .cs-detail-panel { background:var(--bg); overflow-y:auto; display:flex; flex-direction:column; }

//   /* empty detail */
//   .cs-detail-empty { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; padding:60px 40px; text-align:center; }
//   .cs-detail-empty svg { width:56px; height:56px; stroke:var(--text-3); fill:none; stroke-width:1; stroke-linecap:round; margin-bottom:4px; }
//   .cs-detail-empty-title { font-size:16px; font-weight:600; color:var(--text-1); }
//   .cs-detail-empty-sub   { font-size:13px; color:var(--text-2); line-height:1.65; max-width:280px; }

//   /* spinner */
//   @keyframes spin { to { transform:rotate(360deg); } }
//   .cs-spinner { width:18px; height:18px; border-radius:50%; border:2px solid var(--accent-mid); border-top-color:var(--accent); animation:spin .7s linear infinite; }
//   .cs-loading-wrap { display:flex; align-items:center; justify-content:center; gap:10px; padding:40px; color:var(--text-2); font-size:13px; }

//   /* notifications */
//   .cs-notif { display:flex; align-items:center; justify-content:space-between; padding:11px 16px; border-radius:10px; border:0.5px solid; margin-bottom:10px; font-size:13px; font-weight:500; }
//   .cs-notif.warn { background:var(--amber-light); border-color:#FCD34D; color:#92400E; }
//   .cs-notif.info { background:var(--accent-light); border-color:var(--accent-mid); color:#1E40AF; }
//   .cs-notif-btn { font-size:12px; font-weight:500; border:none; border-radius:8px; padding:5px 12px; cursor:pointer; }
//   .cs-notif.warn .cs-notif-btn { background:#D97706; color:#fff; }
//   .cs-notif.info .cs-notif-btn { background:var(--accent); color:#fff; }
// `;

// /* ─────────────────────────────────────────────────────────────────────────────
//    HELPERS
// ───────────────────────────────────────────────────────────────────────────── */
// function avatarStyle(name: string): { background: string; color: string } {
//   const palettes: [string, string][] = [
//     ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
//     ["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],
//     ["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"],
//   ];
//   let h = 0;
//   for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
//   const [background, color] = palettes[Math.abs(h) % palettes.length];
//   return { background, color };
// }

// function initials(name: string): string {
//   return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
// }

// function scoreBadgeCls(s: number): string {
//   return s >= 80 ? "cs-score-badge cs-score-hi"
//        : s >= 60 ? "cs-score-badge cs-score-mid"
//        : "cs-score-badge cs-score-lo";
// }

// function relDate(str: string): string {
//   if (!str) return "";
//   const diff = Math.round((Date.now() - new Date(str).getTime()) / 86_400_000);
//   if (diff === 0) return "Today";
//   if (diff === 1) return "Yesterday";
//   if (diff < 7)  return `${diff}d ago`;
//   if (diff < 30) return `${Math.round(diff / 7)}w ago`;
//   return `${Math.round(diff / 30)}mo ago`;
// }

// /* ─────────────────────────────────────────────────────────────────────────────
//    CANDIDATE CARD INNER  (matches HTML .cand-card exactly)
// ───────────────────────────────────────────────────────────────────────────── */
// const CandidateCardInner: React.FC<{
//   candidate: Candidate & { displayStatus: string; displayScore: number; statusInfo: ReturnType<typeof getCandidateStatusInfo> };
//   isSelected: boolean;
//   onClick: () => void;
// }> = React.memo(({ candidate, isSelected, onClick }) => {
//   if (!candidate) return null;

//   const av  = avatarStyle(candidate.name ?? "");
//   const ini = initials(candidate.name ?? "?");
//   const st  = candidate.statusInfo;
//   const applied = candidate.processed_date || "";

//   return (
//     <div
//       className={`cs-cand-card${isSelected ? " selected" : ""}`}
//       onClick={onClick}
//     >
//       {/* Avatar */}
//       <div className="cs-avatar" style={av}>{ini}</div>

//       {/* Info */}
//       <div className="cs-cand-info">
//         <div className="cs-cand-name">{candidate.name}</div>
//         <div className="cs-cand-role">
//           {candidate.job_title || "—"}
//         </div>
//         <div className="cs-cand-meta">
//           <span className={`cs-pill ${st.cls}`}>{st.label}</span>
//           <span className="cs-cand-date">{relDate(applied)}</span>
//         </div>
//       </div>

//       {/* Right: score + location */}
//       <div className="cs-cand-right">
//         <span className={scoreBadgeCls(candidate.displayScore)}>
//           {candidate.displayScore > 0 ? candidate.displayScore.toFixed(0) : "—"}
//         </span>
//         <span className="cs-cand-date">{(candidate as any).location || ""}</span>
//       </div>
//     </div>
//   );
// });
// CandidateCardInner.displayName = "CandidateCardInner";

// /* ─────────────────────────────────────────────────────────────────────────────
//    MAIN PAGE
// ───────────────────────────────────────────────────────────────────────────── */
// export default function CandidateScreeningInterface() {
//   const dispatch     = useAppDispatch();
//   const params       = useSearchParams();
//   const jobIdFromUrl = params.get("job_id");

//   const {
//     jobs, candidates, candidatesLoading,
//     error, lastFetchTime, selectedJobId, message,
//   } = useAppSelector((s) => s.candidate);

//   const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
//   const [searchTerm,   setSearchTerm]   = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [sortBy,       setSortBy]       = useState("score_desc");

//   // Fetch jobs once on mount
//   useEffect(() => { dispatch(getJobs()); }, [dispatch]);

//   // Sync job_id from URL
//   useEffect(() => {
//     if (jobIdFromUrl && jobs.length) {
//       const found = jobs.find(j => String(j.id) === String(jobIdFromUrl));
//       if (found) dispatch(setSelectedJobId(found.id));
//     }
//   }, [jobIdFromUrl, jobs, dispatch]);

//   // Fetch candidates when job changes
//   useEffect(() => {
//     dispatch(getCandidates(selectedJobId ?? undefined));
//   }, [dispatch, selectedJobId]);

//   // Auto-select first candidate
//   useEffect(() => {
//     if (candidates.length && !selectedCandidate) setSelectedCandidate(candidates[0]);
//   }, [candidates]);

//   const selectedJob: Job | null = useMemo(
//     () => selectedJobId ? jobs.find(j => String(j.id) === String(selectedJobId)) ?? null : null,
//     [jobs, selectedJobId]
//   );

//   // Enrich candidates with display fields
//   const processedCandidates = useMemo(
//     () => candidates.map(c => ({
//       ...c,
//       displayStatus: getDisplayStatus(c),
//       displayScore:  c?.ats_score ?? 0,
//       scoreColor:    getScoreColor(c?.ats_score ?? 0),
//       statusInfo:    getCandidateStatusInfo(c),
//     })),
//     [candidates]
//   );

//   // Filter + sort
//   const filteredCandidates = useMemo(() => {
//     let list = processedCandidates;

//     // Search
//     if (searchTerm) {
//       const q = searchTerm.toLowerCase();
//       list = list.filter(c =>
//         c.name?.toLowerCase().includes(q) ||
//         c.email?.toLowerCase().includes(q) ||
//         c.job_title?.toLowerCase().includes(q)
//       );
//     }

//     // Status filter — matches HTML chip values exactly
//     if (filterStatus !== "all") {
//       list = list.filter(c => {
//         const ds = c.displayStatus;
//         switch (filterStatus) {
//           case "shortlisted":         return ds === "Shortlisted";
//           case "assessment_pending":  return ds === "Assessment Sent" || ds === "Assessment In Progress" || ds === "Assessment Expired";
//           case "assessment_done":     return ds === "Assessment Passed" || ds === "Assessment Failed";
//           case "interview":           return ds === "Interview Scheduled";
//           case "hired":               return ds === "Hired";
//           case "rejected":            return ds === "Rejected";
//           default:                    return true;
//         }
//       });
//     }

//     // Sort
//     return [...list].sort((a, b) => {
//       switch (sortBy) {
//         case "score_desc": return (b.ats_score ?? 0) - (a.ats_score ?? 0);
//         case "score_asc":  return (a.ats_score ?? 0) - (b.ats_score ?? 0);
//         case "date_desc":  return +new Date(b.processed_date ?? 0) - +new Date(a.processed_date ?? 0);
//         case "date_asc":   return +new Date(a.processed_date ?? 0) - +new Date(b.processed_date ?? 0);
//         case "name_asc":   return (a.name ?? "").localeCompare(b.name ?? "");
//         default:           return 0;
//       }
//     });
//   }, [processedCandidates, searchTerm, filterStatus, sortBy]);

//   const refreshData = useCallback(async () => {
//     await dispatch(getJobs()).unwrap();
//     await dispatch(getCandidates(selectedJobId ?? undefined)).unwrap();
//   }, [dispatch, selectedJobId]);

//   const sendAssessmentReminder = useCallback(async (id: string | number) => {
//     await dispatch(sendAssessmentReminderThunk(id)).unwrap();
//     setTimeout(() => dispatch(clearMessage()), 3000);
//     dispatch(getCandidates(selectedJobId ?? undefined));
//   }, [dispatch, selectedJobId]);

//   const isLoading = candidatesLoading === "pending";

//   return (
//     <>
//       {/* Inject global CSS (identical to HTML version) */}
//       <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

//       {/* ── Topbar ── */}
//       <div className="cs-topbar">
//         <a className="cs-brand" href="/dashboard">
//           <div className="cs-brand-icon">
//             <svg viewBox="0 0 24 24">
//               <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
//               <circle cx="9" cy="7" r="4"/>
//               <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
//               <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
//             </svg>
//           </div>
//           <div>
//             <div className="cs-brand-name">HR Automation</div>
//             <div className="cs-brand-sub">Recruitment Suite</div>
//           </div>
//         </a>

//         <nav className="cs-nav">
//           <a className="cs-nav-link" href="/dashboard">Dashboard</a>
//           <button className="cs-nav-link active">Candidates</button>
//           <button className="cs-nav-link">Jobs</button>
//           <a className="cs-nav-link" href="/assessments">Assessments</a>
//           <a className="cs-nav-link" href="/interview-results">Interviews</a>
//         </nav>

//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <button className="cs-btn">Export CSV</button>
//           <button className="cs-btn cs-btn-primary">+ Add Candidate</button>
//           <button className="cs-btn-icon" onClick={refreshData} title="Refresh">
//             <RefreshCw size={15} color="#64748B" />
//           </button>
//         </div>
//       </div>

//       {/* ── Split layout ── */}
//       <div className="cs-page-wrap">

//         {/* ══ LEFT: Candidate list ══ */}
//         <div className="cs-list-panel">

//           {/* List head */}
//           <div className="cs-list-head">
//             <div className="cs-list-title-row">
//               <span className="cs-list-title">Candidates</span>
//               <span className="cs-list-count">
//                 {filteredCandidates.length} of {candidates.length}
//               </span>
//             </div>

//             {/* Search */}
//             <div className="cs-search-wrap">
//               <svg viewBox="0 0 24 24">
//                 <circle cx="11" cy="11" r="8"/>
//                 <line x1="21" y1="21" x2="16.65" y2="16.65"/>
//               </svg>
//               <input
//                 className="cs-search"
//                 type="text"
//                 placeholder="Search by name, role, email…"
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* Job selector (bonus over HTML — keeps full context) */}
//             {jobs.length > 0 && (
//               <div style={{ marginBottom: 10 }}>
//                 <select
//                   value={selectedJobId ?? ""}
//                   onChange={e => {
//                     const job = jobs.find(j => String(j.id) === e.target.value);
//                     dispatch(setSelectedJobId(job?.id ?? null));
//                   }}
//                   style={{
//                     width: "100%", fontSize: 12, fontFamily: "inherit",
//                     color: "var(--text-2)", background: "var(--bg)",
//                     border: "0.5px solid var(--border)", borderRadius: 9,
//                     padding: "7px 10px", outline: "none", cursor: "pointer",
//                   }}
//                 >
//                   <option value="">All Jobs</option>
//                   {jobs.map(j => (
//                     <option key={j.id} value={j.id}>{j.title} ({j.location})</option>
//                   ))}
//                 </select>
//               </div>
//             )}

//             {/* Filter chips — exact match to HTML */}
//             <div className="cs-filter-row">
//               {FILTER_CHIPS.map(chip => (
//                 <button
//                   key={chip.value}
//                   className={`cs-chip${filterStatus === chip.value ? " active" : ""}`}
//                   onClick={() => setFilterStatus(chip.value)}
//                 >
//                   {chip.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Sort row */}
//           <div className="cs-sort-row">
//             <span className="cs-sort-label">Sort by</span>
//             <select
//               className="cs-sort-select"
//               value={sortBy}
//               onChange={e => setSortBy(e.target.value)}
//             >
//               <option value="score_desc">Score (High to Low)</option>
//               <option value="score_asc">Score (Low to High)</option>
//               <option value="date_desc">Date (Newest First)</option>
//               <option value="date_asc">Date (Oldest First)</option>
//               <option value="name_asc">Name (A–Z)</option>
//             </select>
//           </div>

//           {/* Notifications inside list panel */}
//           {message && (
//             <div className="cs-notif info" style={{ margin: "8px 12px 0" }}>
//               {message}
//             </div>
//           )}
//           {error && (
//             <div className="cs-notif warn" style={{ margin: "8px 12px 0" }}>
//               {error}
//             </div>
//           )}

//           {/* Candidate list */}
//           <div className="cs-cand-list">
//             {isLoading ? (
//               <div className="cs-loading-wrap">
//                 <div className="cs-spinner" />
//                 Loading candidates…
//               </div>
//             ) : filteredCandidates.length === 0 ? (
//               <div className="cs-list-empty">
//                 <svg viewBox="0 0 24 24">
//                   <circle cx="11" cy="11" r="8"/>
//                   <line x1="21" y1="21" x2="16.65" y2="16.65"/>
//                 </svg>
//                 <div className="cs-list-empty-title">No candidates found</div>
//                 <div className="cs-list-empty-sub">
//                   Try adjusting your filters or search query.
//                 </div>
//               </div>
//             ) : (
//               filteredCandidates.map(c => (
//                 <CandidateCardInner
//                   key={c.id}
//                   candidate={c as any}
//                   isSelected={selectedCandidate?.id === c.id}
//                   onClick={() => setSelectedCandidate(c)}
//                 />
//               ))
//             )}
//           </div>
//         </div>

//         {/* ══ RIGHT: Detail panel ══ */}
//         <div className="cs-detail-panel">
//           {selectedCandidate ? (
//             <CandidateDetails
//               candidate={{
//                 ...selectedCandidate,
//                 displayStatus: getDisplayStatus(selectedCandidate),
//                 displayScore:  selectedCandidate.ats_score ?? 0,
//                 scoreColor:    getScoreColor(selectedCandidate.ats_score ?? 0),
//                 statusInfo:    getCandidateStatusInfo(selectedCandidate),
//               } as any}
//               onSendReminder={sendAssessmentReminder}
//             />
//           ) : (
//             <div className="cs-detail-empty">
//               <svg viewBox="0 0 24 24">
//                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//                 <circle cx="12" cy="7" r="4"/>
//                 <path d="M23 21v-2a4 4 0 0 0-2-3.87"/>
//                 <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
//               </svg>
//               <div className="cs-detail-empty-title">Select a candidate</div>
//               <div className="cs-detail-empty-sub">
//                 Choose a candidate from the list to view their full profile,
//                 scores, and recruitment timeline.
//               </div>
//             </div>
//           )}
//         </div>

//       </div>
//     </>
//   );
// }
"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { RefreshCw, CheckCircle } from "lucide-react";

import CandidateDetails      from "./subComponents/Candidate_Details";

import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import {
  getJobs,
  getCandidates,
  sendAssessmentReminder as sendAssessmentReminderThunk,
} from "@/services/redux/thunk/candidateThunk";
import { setSelectedJobId, clearMessage } from "@/services/redux/slice/candidateSlice";
import type { Candidate, Job, StatusInfo } from "@/services/interfaces/CandidateScreening";

/* ── STATUS HELPERS ──────────────────────────────────────────────────────── */
export const STATUS_MAP: Record<string, StatusInfo & { label: string; cls: string }> = {
  Shortlisted:             { label: "Shortlisted",         cls: "pill-shortlisted", color: "pill-shortlisted", icon: CheckCircle, priority: 7 },
  "Assessment Sent":       { label: "Assessment Pending",  cls: "pill-assessment",  color: "pill-assessment",  icon: CheckCircle, priority: 6 },
  "Assessment In Progress":{ label: "Assessment Pending",  cls: "pill-assessment",  color: "pill-assessment",  icon: CheckCircle, priority: 5 },
  "Assessment Passed":     { label: "Assessment Done",     cls: "pill-assessed",    color: "pill-assessed",    icon: CheckCircle, priority: 4 },
  "Assessment Failed":     { label: "Assessment Done",     cls: "pill-assessed",    color: "pill-assessed",    icon: CheckCircle, priority: 3 },
  "Assessment Expired":    { label: "Assessment Pending",  cls: "pill-assessment",  color: "pill-assessment",  icon: CheckCircle, priority: 2 },
  "Interview Scheduled":   { label: "Interview Scheduled", cls: "pill-interview",   color: "pill-interview",   icon: CheckCircle, priority: 8 },
  Hired:                   { label: "Hired",               cls: "pill-hired",       color: "pill-hired",       icon: CheckCircle, priority: 9 },
  Rejected:                { label: "Rejected",            cls: "pill-rejected",    color: "pill-rejected",    icon: CheckCircle, priority: 1 },
  "Under Review":          { label: "Applied",             cls: "pill-applied",     color: "pill-applied",     icon: CheckCircle, priority: 0 },
};

export function getDisplayStatus(c: Candidate): string {
  if (c?.final_status === "Hired")        return "Hired";
  if (c?.interview_scheduled)             return "Interview Scheduled";
  if (c?.exam_completed)                  return (c?.exam_percentage ?? 0) >= 70 ? "Assessment Passed" : "Assessment Failed";
  if (c?.exam_started)                    return "Assessment In Progress";
  if (c?.exam_link_sent)                  return c?.link_expired ? "Assessment Expired" : "Assessment Sent";
  if (c?.status === "Shortlisted")        return "Shortlisted";
  if (c?.status === "Rejected" || c?.final_status === "Rejected After Exam") return "Rejected";
  return "Under Review";
}

export function getCandidateStatusInfo(c: Candidate) {
  return STATUS_MAP[getDisplayStatus(c)] ?? STATUS_MAP["Under Review"];
}

const getScoreColor = (s = 0) =>
  s >= 85 ? "#059669" : s >= 70 ? "#D97706" : "#DC2626";

/* ── FILTER CHIPS ────────────────────────────────────────────────────────── */
const FILTER_CHIPS = [
  { label: "All",                 value: "all"                },
  { label: "Shortlisted",         value: "shortlisted"        },
  { label: "Assessment Pending",  value: "assessment_pending" },
  { label: "Assessment Done",     value: "assessment_done"    },
  { label: "Interview Scheduled", value: "interview"          },
  { label: "Hired",               value: "hired"              },
  { label: "Rejected",            value: "rejected"           },
];

/* ── GLOBAL CSS (no topbar styles) ───────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --font: 'DM Sans', sans-serif;
    --accent: #2563EB; --accent-light: #EFF6FF; --accent-mid: #BFDBFE;
    --green: #059669;  --green-light: #ECFDF5;
    --amber: #D97706;  --amber-light: #FFFBEB;
    --red: #DC2626;    --red-light: #FEF2F2;
    --purple: #7C3AED; --purple-light: #F5F3FF;
    --teal: #0D9488;   --teal-light: #F0FDFA;
    --bg: #F8FAFC; --surface: #FFFFFF;
    --border: rgba(0,0,0,0.08); --border-md: rgba(0,0,0,0.14);
    --text-1: #0F172A; --text-2: #64748B; --text-3: #94A3B8;
    --r: 10px; --r-lg: 14px; --r-xl: 18px;
  }
  body { font-family: var(--font); background: var(--bg); color: var(--text-1); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: var(--border-md); border-radius: 4px; }

  /* ── page header (title row + action buttons) ── */
  .cs-page-header { display:flex; align-items:center; justify-content:space-between; padding:18px 24px 0; background:var(--surface); border-bottom:0.5px solid var(--border-md); }
  .cs-page-title  { font-size:20px; font-weight:600; color:var(--text-1); letter-spacing:-0.4px; }
  .cs-page-sub    { font-size:12px; color:var(--text-2); margin-top:2px; }
  .cs-header-actions { display:flex; align-items:center; gap:8px; padding-bottom:14px; }

  /* buttons */
  .cs-btn { font-family:var(--font); font-size:13px; font-weight:500; border-radius:8px; padding:8px 16px; cursor:pointer; transition:all .15s; border:0.5px solid var(--border-md); background:var(--surface); color:var(--text-1); }
  .cs-btn:hover { background:#F1F5F9; }
  .cs-btn-primary { background:var(--accent); color:#fff; border-color:transparent; }
  .cs-btn-primary:hover { background:#1D4ED8; }
  .cs-btn-icon { width:36px; height:36px; padding:0; display:flex; align-items:center; justify-content:center; border-radius:8px; border:0.5px solid var(--border-md); background:var(--surface); cursor:pointer; }
  .cs-btn-icon:hover { background:#F1F5F9; }

  /* split layout — fills space below the layout navbar + page header */
  .cs-page-wrap { display:grid; grid-template-columns:380px 1fr; height:calc(100vh - 120px); overflow:hidden; }

  /* left panel */
  .cs-list-panel  { display:flex; flex-direction:column; border-right:0.5px solid var(--border-md); background:var(--surface); overflow:hidden; }
  .cs-list-head   { padding:16px 16px 0; border-bottom:0.5px solid var(--border); }
  .cs-list-title-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
  .cs-list-title  { font-size:15px; font-weight:600; color:var(--text-1); }
  .cs-list-count  { font-size:12px; color:var(--text-2); background:var(--bg); padding:3px 9px; border-radius:20px; border:0.5px solid var(--border); }

  /* search */
  .cs-search-wrap { position:relative; margin-bottom:10px; }
  .cs-search-wrap svg { position:absolute; left:11px; top:50%; transform:translateY(-50%); width:15px; height:15px; stroke:var(--text-3); fill:none; stroke-width:2; stroke-linecap:round; pointer-events:none; }
  .cs-search { width:100%; padding:9px 12px 9px 34px; font-size:13px; font-family:var(--font); color:var(--text-1); background:var(--bg); border:0.5px solid var(--border); border-radius:9px; outline:none; transition:border-color .14s; }
  .cs-search:focus { border-color:var(--accent-mid); background:var(--surface); }
  .cs-search::placeholder { color:var(--text-3); }

  /* filter chips */
  .cs-filter-row { display:flex; gap:6px; overflow-x:auto; padding-bottom:12px; scrollbar-width:none; }
  .cs-filter-row::-webkit-scrollbar { display:none; }
  .cs-chip { flex-shrink:0; font-size:12px; font-weight:500; padding:5px 12px; border-radius:20px; border:0.5px solid var(--border); background:var(--surface); color:var(--text-2); cursor:pointer; transition:all .13s; white-space:nowrap; font-family:var(--font); }
  .cs-chip:hover { border-color:var(--accent-mid); color:var(--accent); }
  .cs-chip.active { background:var(--accent); color:#fff; border-color:transparent; }

  /* sort row */
  .cs-sort-row { display:flex; align-items:center; justify-content:space-between; padding:10px 16px; border-bottom:0.5px solid var(--border); }
  .cs-sort-label { font-size:11px; color:var(--text-3); font-weight:500; text-transform:uppercase; letter-spacing:.5px; }
  .cs-sort-select { font-size:12px; font-family:var(--font); color:var(--text-2); background:transparent; border:none; outline:none; cursor:pointer; }

  /* candidate list */
  .cs-cand-list { flex:1; overflow-y:auto; padding:6px 8px; }

  /* candidate card */
  .cs-cand-card { display:flex; align-items:flex-start; gap:12px; padding:12px 10px; border-radius:10px; cursor:pointer; transition:background .12s; border:0.5px solid transparent; margin-bottom:2px; }
  .cs-cand-card:hover { background:var(--bg); }
  .cs-cand-card.selected { background:var(--accent-light); border-color:var(--accent-mid); }
  .cs-avatar { width:40px; height:40px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:600; }
  .cs-cand-info { flex:1; min-width:0; }
  .cs-cand-name { font-size:13px; font-weight:600; color:var(--text-1); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .cs-cand-role { font-size:12px; color:var(--text-2); margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .cs-cand-meta { display:flex; align-items:center; gap:8px; margin-top:6px; }
  .cs-cand-right { display:flex; flex-direction:column; align-items:flex-end; gap:6px; flex-shrink:0; }
  .cs-score-badge { font-size:12px; font-weight:600; padding:2px 8px; border-radius:6px; min-width:38px; text-align:center; }
  .cs-score-hi  { background:var(--green-light); color:var(--green); }
  .cs-score-mid { background:var(--amber-light); color:var(--amber); }
  .cs-score-lo  { background:var(--red-light);   color:var(--red);   }
  .cs-cand-date { font-size:11px; color:var(--text-3); }

  /* status pills */
  .cs-pill { display:inline-flex; align-items:center; gap:4px; font-size:10px; font-weight:600; padding:2px 7px; border-radius:20px; white-space:nowrap; }
  .pill-shortlisted { background:var(--accent-light); color:var(--accent); }
  .pill-assessment  { background:var(--amber-light);  color:var(--amber);  }
  .pill-assessed    { background:var(--teal-light);   color:var(--teal);   }
  .pill-interview   { background:var(--purple-light); color:var(--purple); }
  .pill-hired       { background:var(--green-light);  color:var(--green);  }
  .pill-rejected    { background:var(--red-light);    color:var(--red);    }
  .pill-applied     { background:#F1F5F9;             color:var(--text-2); }

  /* empty states */
  .cs-list-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:10px; padding:40px 20px; text-align:center; }
  .cs-list-empty svg { width:40px; height:40px; stroke:var(--text-3); fill:none; stroke-width:1.2; stroke-linecap:round; margin-bottom:4px; }
  .cs-list-empty-title { font-size:14px; font-weight:600; color:var(--text-1); }
  .cs-list-empty-sub   { font-size:12px; color:var(--text-2); line-height:1.6; }
  .cs-detail-panel { background:var(--bg); overflow-y:auto; display:flex; flex-direction:column; }
  .cs-detail-empty { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; padding:60px 40px; text-align:center; }
  .cs-detail-empty svg { width:56px; height:56px; stroke:var(--text-3); fill:none; stroke-width:1; stroke-linecap:round; margin-bottom:4px; }
  .cs-detail-empty-title { font-size:16px; font-weight:600; color:var(--text-1); }
  .cs-detail-empty-sub   { font-size:13px; color:var(--text-2); line-height:1.65; max-width:280px; }

  /* spinner */
  @keyframes spin { to { transform:rotate(360deg); } }
  .cs-spinner { width:18px; height:18px; border-radius:50%; border:2px solid var(--accent-mid); border-top-color:var(--accent); animation:spin .7s linear infinite; }
  .cs-loading-wrap { display:flex; align-items:center; justify-content:center; gap:10px; padding:40px; color:var(--text-2); font-size:13px; }

  /* notifications */
  .cs-notif { display:flex; align-items:center; justify-content:space-between; padding:11px 16px; border-radius:10px; border:0.5px solid; margin-bottom:10px; font-size:13px; font-weight:500; }
  .cs-notif.warn { background:var(--amber-light); border-color:#FCD34D; color:#92400E; }
  .cs-notif.info { background:var(--accent-light); border-color:var(--accent-mid); color:#1E40AF; }
`;

/* ── HELPERS ─────────────────────────────────────────────────────────────── */
function avatarStyle(name: string): { background: string; color: string } {
  const palettes: [string, string][] = [
    ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
    ["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],
    ["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"],
  ];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  const [background, color] = palettes[Math.abs(h) % palettes.length];
  return { background, color };
}
function initials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}
function scoreBadgeCls(s: number) {
  return s >= 80 ? "cs-score-badge cs-score-hi"
       : s >= 60 ? "cs-score-badge cs-score-mid"
       :           "cs-score-badge cs-score-lo";
}
function relDate(str: string) {
  if (!str) return "";
  const diff = Math.round((Date.now() - new Date(str).getTime()) / 86_400_000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7)  return `${diff}d ago`;
  if (diff < 30) return `${Math.round(diff / 7)}w ago`;
  return `${Math.round(diff / 30)}mo ago`;
}

/* ── CANDIDATE CARD ──────────────────────────────────────────────────────── */
const CandidateCardInner: React.FC<{
  candidate: Candidate & { displayStatus: string; displayScore: number; statusInfo: ReturnType<typeof getCandidateStatusInfo> };
  isSelected: boolean;
  onClick: () => void;
}> = React.memo(({ candidate, isSelected, onClick }) => {
  if (!candidate) return null;
  const av  = avatarStyle(candidate.name ?? "");
  const ini = initials(candidate.name ?? "?");
  const st  = candidate.statusInfo;
  return (
    <div className={`cs-cand-card${isSelected ? " selected" : ""}`} onClick={onClick}>
      <div className="cs-avatar" style={av}>{ini}</div>
      <div className="cs-cand-info">
        <div className="cs-cand-name">{candidate.name}</div>
        <div className="cs-cand-role">{candidate.job_title || "—"}</div>
        <div className="cs-cand-meta">
          <span className={`cs-pill ${st.cls}`}>{st.label}</span>
          <span className="cs-cand-date">{relDate(candidate.processed_date || "")}</span>
        </div>
      </div>
      <div className="cs-cand-right">
        <span className={scoreBadgeCls(candidate.displayScore)}>
          {candidate.displayScore > 0 ? candidate.displayScore.toFixed(0) : "—"}
        </span>
        <span className="cs-cand-date">{(candidate as any).location || ""}</span>
      </div>
    </div>
  );
});
CandidateCardInner.displayName = "CandidateCardInner";

/* ── MAIN PAGE ───────────────────────────────────────────────────────────── */
export default function CandidateScreeningInterface() {
  const dispatch     = useAppDispatch();
  const params       = useSearchParams();
  const jobIdFromUrl = params.get("job_id");

  const {
    jobs, candidates, candidatesLoading,
    error, selectedJobId, message,
  } = useAppSelector((s) => s.candidate);

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [searchTerm,   setSearchTerm]   = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy,       setSortBy]       = useState("score_desc");

  useEffect(() => { dispatch(getJobs()); }, [dispatch]);

  useEffect(() => {
    if (jobIdFromUrl && jobs.length) {
      const found = jobs.find(j => String(j.id) === String(jobIdFromUrl));
      if (found) dispatch(setSelectedJobId(found.id));
    }
  }, [jobIdFromUrl, jobs, dispatch]);

  useEffect(() => {
    dispatch(getCandidates(selectedJobId ?? undefined));
  }, [dispatch, selectedJobId]);

  useEffect(() => {
    if (candidates.length && !selectedCandidate) setSelectedCandidate(candidates[0]);
  }, [candidates]);  // eslint-disable-line

  const selectedJob: Job | null = useMemo(
    () => selectedJobId ? jobs.find(j => String(j.id) === String(selectedJobId)) ?? null : null,
    [jobs, selectedJobId]
  );

  const processedCandidates = useMemo(
    () => candidates.map(c => ({
      ...c,
      displayStatus: getDisplayStatus(c),
      displayScore:  c?.ats_score ?? 0,
      scoreColor:    getScoreColor(c?.ats_score ?? 0),
      statusInfo:    getCandidateStatusInfo(c),
    })),
    [candidates]
  );

  const filteredCandidates = useMemo(() => {
    let list = processedCandidates;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(c =>
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.job_title?.toLowerCase().includes(q)
      );
    }
    if (filterStatus !== "all") {
      list = list.filter(c => {
        const ds = c.displayStatus;
        switch (filterStatus) {
          case "shortlisted":        return ds === "Shortlisted";
          case "assessment_pending": return ["Assessment Sent","Assessment In Progress","Assessment Expired"].includes(ds);
          case "assessment_done":    return ["Assessment Passed","Assessment Failed"].includes(ds);
          case "interview":          return ds === "Interview Scheduled";
          case "hired":              return ds === "Hired";
          case "rejected":           return ds === "Rejected";
          default:                   return true;
        }
      });
    }
    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "score_desc": return (b.ats_score ?? 0) - (a.ats_score ?? 0);
        case "score_asc":  return (a.ats_score ?? 0) - (b.ats_score ?? 0);
        case "date_desc":  return +new Date(b.processed_date ?? 0) - +new Date(a.processed_date ?? 0);
        case "date_asc":   return +new Date(a.processed_date ?? 0) - +new Date(b.processed_date ?? 0);
        case "name_asc":   return (a.name ?? "").localeCompare(b.name ?? "");
        default:           return 0;
      }
    });
  }, [processedCandidates, searchTerm, filterStatus, sortBy]);

  const refreshData = useCallback(async () => {
    await dispatch(getJobs()).unwrap();
    await dispatch(getCandidates(selectedJobId ?? undefined)).unwrap();
  }, [dispatch, selectedJobId]);

  const sendAssessmentReminder = useCallback(async (id: string | number) => {
    await dispatch(sendAssessmentReminderThunk(id)).unwrap();
    setTimeout(() => dispatch(clearMessage()), 3000);
    dispatch(getCandidates(selectedJobId ?? undefined));
  }, [dispatch, selectedJobId]);

  const isLoading = candidatesLoading === "pending";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* ── Page header (title + action buttons) — no topbar/navbar here ── */}
      <div className="cs-page-header">
        <div style={{ paddingBottom: 14 }}>
          <h1 className="cs-page-title">Candidate Screening</h1>
          {selectedJob && (
            <p className="cs-page-sub">
              {selectedJob.title} · {selectedJob.location} · {filteredCandidates.length} candidates
            </p>
          )}
        </div>

        {/* Action buttons — same as what was in the old topbar */}
        <div className="cs-header-actions">
          <button className="cs-btn">Export CSV</button>
          <button className="cs-btn cs-btn-primary">+ Add Candidate</button>
          <button className="cs-btn-icon" onClick={refreshData} title="Refresh">
            <RefreshCw size={15} color="#64748B" />
          </button>
        </div>
      </div>

      {/* ── Split layout ── */}
      <div className="cs-page-wrap">

        {/* ══ LEFT: Candidate list ══ */}
        <div className="cs-list-panel">
          <div className="cs-list-head">
            <div className="cs-list-title-row">
              <span className="cs-list-title">Candidates</span>
              <span className="cs-list-count">
                {filteredCandidates.length} of {candidates.length}
              </span>
            </div>

            {/* Search */}
            <div className="cs-search-wrap">
              <svg viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className="cs-search"
                type="text"
                placeholder="Search by name, role, email…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Job selector */}
            {jobs.length > 0 && (
              <div style={{ marginBottom: 10 }}>
                <select
                  value={selectedJobId ?? ""}
                  onChange={e => {
                    const job = jobs.find(j => String(j.id) === e.target.value);
                    dispatch(setSelectedJobId(job?.id ?? null));
                  }}
                  style={{
                    width: "100%", fontSize: 12, fontFamily: "inherit",
                    color: "var(--text-2)", background: "var(--bg)",
                    border: "0.5px solid var(--border)", borderRadius: 9,
                    padding: "7px 10px", outline: "none", cursor: "pointer",
                  }}
                >
                  <option value="">All Jobs</option>
                  {jobs.map(j => (
                    <option key={j.id} value={j.id}>{j.title} ({j.location})</option>
                  ))}
                </select>
              </div>
            )}

            {/* Filter chips */}
            <div className="cs-filter-row">
              {FILTER_CHIPS.map(chip => (
                <button
                  key={chip.value}
                  className={`cs-chip${filterStatus === chip.value ? " active" : ""}`}
                  onClick={() => setFilterStatus(chip.value)}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort row */}
          <div className="cs-sort-row">
            <span className="cs-sort-label">Sort by</span>
            <select
              className="cs-sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="score_desc">Score (High to Low)</option>
              <option value="score_asc">Score (Low to High)</option>
              <option value="date_desc">Date (Newest First)</option>
              <option value="date_asc">Date (Oldest First)</option>
              <option value="name_asc">Name (A–Z)</option>
            </select>
          </div>

          {/* Inline notifications */}
          {message && (
            <div className="cs-notif info" style={{ margin: "8px 12px 0" }}>{message}</div>
          )}
          {error && (
            <div className="cs-notif warn" style={{ margin: "8px 12px 0" }}>{error}</div>
          )}

          {/* List */}
          <div className="cs-cand-list">
            {isLoading ? (
              <div className="cs-loading-wrap">
                <div className="cs-spinner" />
                Loading candidates…
              </div>
            ) : filteredCandidates.length === 0 ? (
              <div className="cs-list-empty">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <div className="cs-list-empty-title">No candidates found</div>
                <div className="cs-list-empty-sub">Try adjusting your filters or search query.</div>
              </div>
            ) : (
              filteredCandidates.map(c => (
                <CandidateCardInner
                  key={c.id}
                  candidate={c as any}
                  isSelected={selectedCandidate?.id === c.id}
                  onClick={() => setSelectedCandidate(c)}
                />
              ))
            )}
          </div>
        </div>

        {/* ══ RIGHT: Detail panel ══ */}
        <div className="cs-detail-panel">
          {selectedCandidate ? (
            <CandidateDetails
              candidate={{
                ...selectedCandidate,
                displayStatus: getDisplayStatus(selectedCandidate),
                displayScore:  selectedCandidate.ats_score ?? 0,
                scoreColor:    getScoreColor(selectedCandidate.ats_score ?? 0),
                statusInfo:    getCandidateStatusInfo(selectedCandidate),
              } as any}
              onSendReminder={sendAssessmentReminder}
            />
          ) : (
            <div className="cs-detail-empty">
              <svg viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <div className="cs-detail-empty-title">Select a candidate</div>
              <div className="cs-detail-empty-sub">
                Choose a candidate from the list to view their full profile,
                scores, and recruitment timeline.
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
}