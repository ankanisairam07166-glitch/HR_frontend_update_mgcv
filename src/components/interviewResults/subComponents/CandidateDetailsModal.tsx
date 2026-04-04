// // import React, { useMemo, useState } from "react";
// // import { X, Mail, Phone, MapPin, Video, FileText, CheckCircle, ChevronRight, BarChart, MessageSquare } from "lucide-react";
// // import {
// //   ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis, BarChart as ReBar, Bar,
// //   RadialBarChart, RadialBar
// // } from "recharts";

// // const formatDuration = (seconds?: number) => {
// //   const s = Number.isFinite(seconds as number) ? Number(seconds) : 0;
// //   const h = Math.floor(s / 3600);
// //   const m = Math.floor((s % 3600) / 60);
// //   const sec = s % 60;
// //   return h ? `${h}h ${m}m ${sec}s` : m ? `${m}m ${sec}s` : `${sec}s`;
// // };

// // const CandidateDetailsModal: React.FC<{
// //   details: any; // { candidate, analysis, qa_data, progress }
// //   onClose: () => void;
// // }> = ({ details, onClose }) => {
// //   const [tab, setTab] = useState<"overview" | "analysis" | "qa" | "progress">("overview");
// //   const c = details?.candidate;

// //   const skillsData = useMemo(
// //     () => [
// //       { skill: "Technical", score: c?.interview_ai_technical_score || 0 },
// //       { skill: "Communication", score: c?.interview_ai_communication_score || 0 },
// //       { skill: "Problem Solving", score: c?.interview_ai_problem_solving_score || 0 },
// //       { skill: "Cultural Fit", score: c?.interview_ai_cultural_fit_score || 0 },
// //     ],
// //     [c]
// //   );

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
// //       <div className="max-h-[95vh] w-full max-w-6xl overflow-hidden rounded-lg bg-white">
// //         {/* header */}
// //         <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
// //           <div className="flex items-start justify-between">
// //             <div>
// //               <h2 className="mb-2 text-2xl font-bold">{c?.name}</h2>
// //               <div className="flex flex-wrap items-center gap-4 text-blue-100">
// //                 {c?.email && (
// //                   <span className="flex items-center">
// //                     <Mail className="mr-1 h-4 w-4" /> {c.email}
// //                   </span>
// //                 )}
// //                 {c?.phone && (
// //                   <span className="flex items-center">
// //                     <Phone className="mr-1 h-4 w-4" /> {c.phone}
// //                   </span>
// //                 )}
// //                 {c?.location && (
// //                   <span className="flex items-center">
// //                     <MapPin className="mr-1 h-4 w-4" /> {c.location}
// //                   </span>
// //                 )}
// //               </div>
// //               {c?.job_title && <div className="mt-2 rounded-full bg-white/20 px-3 py-1 text-sm">{c.job_title}</div>}
// //             </div>
// //             <button onClick={onClose} className="text-white/80 transition-colors hover:text-white">
// //               <X className="h-6 w-6" />
// //             </button>
// //           </div>
// //         </div>

// //         {/* tabs */}
// //         <div className="border-b bg-gray-50">
// //           <div className="flex gap-1 p-1">
// //             {(["overview", "analysis", "qa", "progress"] as const).map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium ${
// //                   tab === t ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
// //                 }`}
// //               >
// //                 {t[0].toUpperCase() + t.slice(1)}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* content */}
// //         <div className="max-h-[calc(95vh-280px)] overflow-y-auto p-6">
// //           {tab === "overview" && (
// //             <div className="space-y-6">
// //               <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
// //                 <div className="rounded-lg border bg-white p-4">
// //                   <p className="mb-1 text-sm text-gray-600">Interview Status</p>
// //                   <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
// //                     {c?.interview_completed_at
// //                       ? "Completed"
// //                       : c?.interview_started_at
// //                       ? "In Progress"
// //                       : c?.interview_scheduled
// //                       ? "Scheduled"
// //                       : "Not Scheduled"}
// //                   </span>
// //                 </div>
// //                 <div className="rounded-lg border bg-white p-4">
// //                   <p className="mb-1 text-sm text-gray-600">Overall Score</p>
// //                   <p className="text-2xl font-bold">{c?.interview_ai_score != null ? `${Math.round(c.interview_ai_score)}%` : "—"}</p>
// //                 </div>
// //                 <div className="rounded-lg border bg-white p-4">
// //                   <p className="mb-1 text-sm text-gray-600">Questions Answered</p>
// //                   <p className="text-2xl font-bold">
// //                     {c?.interview_questions_answered}/{c?.interview_total_questions ?? "—"}
// //                   </p>
// //                 </div>
// //                 <div className="rounded-lg border bg-white p-4">
// //                   <p className="mb-1 text-sm text-gray-600">Duration</p>
// //                   <p className="text-2xl font-bold">{formatDuration(c?.interview_duration)}</p>
// //                 </div>
// //               </div>

// //               {c?.interview_ai_score != null && (
// //                 <div className="rounded-lg border bg-white p-6">
// //                   <h3 className="mb-4 text-lg font-semibold">Skills Assessment</h3>
// //                   <ResponsiveContainer width="100%" height={300}>
// //                     <ReBar data={skillsData}>
// //                       <CartesianGrid strokeDasharray="3 3" />
// //                       <XAxis dataKey="skill" />
// //                       <YAxis domain={[0, 100]} />
// //                       <Tooltip />
// //                       <Bar dataKey="score" fill="#3B82F6" />
// //                     </ReBar>
// //                   </ResponsiveContainer>
// //                 </div>
// //               )}

// //               {(c?.strengths?.length || c?.weaknesses?.length) && (
// //                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
// //                   {c?.strengths?.length ? (
// //                     <div className="rounded-lg border border-green-200 bg-green-50 p-6">
// //                       <h3 className="mb-3 text-lg font-semibold text-green-800">Strengths</h3>
// //                       <ul className="space-y-2">
// //                         {c.strengths!.map((s: string, i: number) => (
// //                           <li key={i} className="flex items-start">
// //                             <CheckCircle className="mr-2 mt-0.5 h-5 w-5 text-green-600" />
// //                             <span className="text-gray-700">{s}</span>
// //                           </li>
// //                         ))}
// //                       </ul>
// //                     </div>
// //                   ) : null}

// //                   {c?.weaknesses?.length ? (
// //                     <div className="rounded-lg border border-red-200 bg-red-50 p-6">
// //                       <h3 className="mb-3 text-lg font-semibold text-red-800">Areas for Improvement</h3>
// //                       <ul className="space-y-2">
// //                         {c.weaknesses!.map((w: string, i: number) => (
// //                           <li key={i} className="flex items-start">
// //                             <ChevronRight className="mr-2 mt-0.5 h-5 w-5 text-red-600" />
// //                             <span className="text-gray-700">{w}</span>
// //                           </li>
// //                         ))}
// //                       </ul>
// //                     </div>
// //                   ) : null}
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {tab === "analysis" && (
// //             <div className="space-y-6">
// //               {c?.interview_ai_overall_feedback || details?.analysis?.overall_feedback ? (
// //                 <>
// //                   <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
// //                     <h3 className="mb-3 text-lg font-semibold text-blue-800">AI Analysis</h3>
// //                     <p className="whitespace-pre-line text-gray-700">
// //                       {c?.interview_ai_overall_feedback || details?.analysis?.overall_feedback}
// //                     </p>
// //                   </div>

// //                   {(c?.recommendations?.length || details?.analysis?.recommendations?.length) && (
// //                     <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
// //                       <h3 className="mb-3 text-lg font-semibold text-yellow-800">Recommendations</h3>
// //                       <ul className="space-y-2">
// //                         {(c?.recommendations || details?.analysis?.recommendations || []).map(
// //                           (r: string, i: number) => (
// //                             <li key={i} className="flex items-start">
// //                               <ChevronRight className="mr-2 mt-0.5 h-5 w-5 text-yellow-600" />
// //                               <span className="text-gray-700">{r}</span>
// //                             </li>
// //                           )
// //                         )}
// //                       </ul>
// //                     </div>
// //                   )}

// //                   <div
// //                     className={`rounded-lg p-4 ${
// //                       (c?.interview_ai_score ?? 0) >= 70
// //                         ? "border border-green-200 bg-green-50"
// //                         : "border border-red-200 bg-red-50"
// //                     }`}
// //                   >
// //                     <p className="text-lg font-semibold">
// //                       Final Decision:{" "}
// //                       {details?.analysis?.final_status ??
// //                         ((c?.interview_ai_score ?? 0) >= 70 ? "Recommended" : "Not Recommended")}
// //                     </p>
// //                   </div>
// //                 </>
// //               ) : (
// //                 <div className="py-12 text-center text-gray-500">
// //                   <BarChart className="mx-auto mb-3 h-12 w-12 text-gray-300" />
// //                   <p>No analysis available yet</p>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {tab === "qa" && (
// //             <div className="space-y-4">
// //               {details?.qa_data?.qa_pairs?.length ? (
// //                 details.qa_data.qa_pairs.map((qa: any, i: number) => (
// //                   <div key={i} className="rounded-lg border bg-white p-4">
// //                     <p className="mb-2 font-semibold text-blue-700">Question {i + 1}:</p>
// //                     <p className="text-gray-800">{qa.question}</p>
// //                     <p className="mt-3 font-semibold text-green-700">Answer:</p>
// //                     <p className="text-gray-800">
// //                       {qa.answer || <span className="italic text-red-500">No answer provided</span>}
// //                     </p>
// //                     {qa.score != null && (
// //                       <p className="mt-2 text-sm text-gray-600">Score: {qa.score}/10</p>
// //                     )}
// //                   </div>
// //                 ))
// //               ) : (
// //                 <div className="py-12 text-center text-gray-500">
// //                   <MessageSquare className="mx-auto mb-3 h-12 w-12 text-gray-300" />
// //                   <p>No Q&A data available</p>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {tab === "progress" && (
// //             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
// //               <div className="rounded-lg border bg-white p-6">
// //                 <h3 className="mb-4 text-lg font-semibold">Interview Progress</h3>
// //                 <ResponsiveContainer width="100%" height={220}>
// //                   <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[{ name: "Progress", value: c?.interview_progress || 0, fill: "#3B82F6" }]}>
// //                     <RadialBar dataKey="value" cornerRadius={10} />
// //                     <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">
// //                       {Math.round(c?.interview_progress || 0)}%
// //                     </text>
// //                   </RadialBarChart>
// //                 </ResponsiveContainer>
// //               </div>

// //               <div className="rounded-lg border bg-white p-6">
// //                 <h3 className="mb-4 text-lg font-semibold">Interview Timeline</h3>
// //                 <div className="space-y-3 text-sm">
// //                   {c?.interview_scheduled && (
// //                     <div>• Scheduled: {c.interview_date ? new Date(c.interview_date).toLocaleString() : "—"}</div>
// //                   )}
// //                   {c?.interview_started_at && <div>• Started: {new Date(c.interview_started_at).toLocaleString()}</div>}
// //                   {c?.interview_completed_at && <div>• Completed: {new Date(c.interview_completed_at).toLocaleString()}</div>}
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* footer */}
// //         <div className="bg-gray-50 p-6">
// //           <div className="flex items-center justify-between">
// //             <div className="flex gap-3">
// //               {c?.interview_recording_url && (
// //                 <a
// //                   href={c.interview_recording_url}
// //                   target="_blank"
// //                   rel="noreferrer"
// //                   className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
// //                 >
// //                   <Video className="mr-2 inline h-4 w-4" />
// //                   View Recording
// //                 </a>
// //               )}
// //               {c?.resume_url && (
// //                 <a
// //                   href={c.resume_url}
// //                   target="_blank"
// //                   rel="noreferrer"
// //                   className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
// //                 >
// //                   <FileText className="mr-2 inline h-4 w-4" />
// //                   View Resume
// //                 </a>
// //               )}
// //             </div>
// //             <button onClick={onClose} className="rounded-lg bg-gray-600 px-6 py-2 text-white hover:bg-gray-700">
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CandidateDetailsModal;
// import React, { useMemo, useState } from "react";
// import { X, Mail, Phone, MapPin, Video, FileText, CheckCircle, ChevronRight, BarChart, MessageSquare } from "lucide-react";
// import {
//   ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis, BarChart as ReBar, Bar,
//   RadialBarChart, RadialBar
// } from "recharts";

// // Type definitions
// interface QAPair {
//   question: string;
//   answer?: string;
//   score?: number;
// }

// interface Candidate {
//   name?: string;
//   email?: string;
//   phone?: string;
//   location?: string;
//   job_title?: string;
//   interview_completed_at?: string;
//   interview_started_at?: string;
//   interview_scheduled?: boolean;
//   interview_date?: string;
//   interview_ai_score?: number;
//   interview_questions_answered?: number;
//   interview_total_questions?: number;
//   interview_duration?: number;
//   interview_ai_technical_score?: number;
//   interview_ai_communication_score?: number;
//   interview_ai_problem_solving_score?: number;
//   interview_ai_cultural_fit_score?: number;
//   interview_progress?: number;
//   interview_ai_overall_feedback?: string;
//   interview_recording_url?: string;
//   resume_url?: string;
//   strengths?: string[];
//   weaknesses?: string[];
//   recommendations?: string[];
// }

// interface Analysis {
//   overall_feedback?: string;
//   recommendations?: string[];
//   final_status?: string;
// }

// interface QAData {
//   qa_pairs?: QAPair[];
// }

// interface CandidateDetails {
//   candidate?: Candidate;
//   analysis?: Analysis;
//   qa_data?: QAData;
//   progress?: number;
// }

// interface CandidateDetailsModalProps {
//   details: CandidateDetails;
//   onClose: () => void;
// }

// const formatDuration = (seconds?: number) => {
//   const s = Number.isFinite(seconds as number) ? Number(seconds) : 0;
//   const h = Math.floor(s / 3600);
//   const m = Math.floor((s % 3600) / 60);
//   const sec = s % 60;
//   return h ? `${h}h ${m}m ${sec}s` : m ? `${m}m ${sec}s` : `${sec}s`;
// };

// const CandidateDetailsModal: React.FC<CandidateDetailsModalProps> = ({ details, onClose }) => {
//   const [tab, setTab] = useState<"overview" | "analysis" | "qa" | "progress">("overview");
//   const c = details?.candidate;

//   const skillsData = useMemo(
//     () => [
//       { skill: "Technical", score: c?.interview_ai_technical_score || 0 },
//       { skill: "Communication", score: c?.interview_ai_communication_score || 0 },
//       { skill: "Problem Solving", score: c?.interview_ai_problem_solving_score || 0 },
//       { skill: "Cultural Fit", score: c?.interview_ai_cultural_fit_score || 0 },
//     ],
//     [c]
//   );

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="max-h-[95vh] w-full max-w-6xl overflow-hidden rounded-lg bg-white">
//         {/* header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
//           <div className="flex items-start justify-between">
//             <div>
//               <h2 className="mb-2 text-2xl font-bold">{c?.name}</h2>
//               <div className="flex flex-wrap items-center gap-4 text-blue-100">
//                 {c?.email && (
//                   <span className="flex items-center">
//                     <Mail className="mr-1 h-4 w-4" /> {c.email}
//                   </span>
//                 )}
//                 {c?.phone && (
//                   <span className="flex items-center">
//                     <Phone className="mr-1 h-4 w-4" /> {c.phone}
//                   </span>
//                 )}
//                 {c?.location && (
//                   <span className="flex items-center">
//                     <MapPin className="mr-1 h-4 w-4" /> {c.location}
//                   </span>
//                 )}
//               </div>
//               {c?.job_title && <div className="mt-2 rounded-full bg-white/20 px-3 py-1 text-sm">{c.job_title}</div>}
//             </div>
//             <button onClick={onClose} className="text-white/80 transition-colors hover:text-white">
//               <X className="h-6 w-6" />
//             </button>
//           </div>
//         </div>

//         {/* tabs */}
//         <div className="border-b bg-gray-50">
//           <div className="flex gap-1 p-1">
//             {(["overview", "analysis", "qa", "progress"] as const).map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium ${
//                   tab === t ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
//                 }`}
//               >
//                 {t[0].toUpperCase() + t.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* content */}
//         <div className="max-h-[calc(95vh-280px)] overflow-y-auto p-6">
//           {tab === "overview" && (
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
//                 <div className="rounded-lg border bg-white p-4">
//                   <p className="mb-1 text-sm text-gray-600">Interview Status</p>
//                   <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
//                     {c?.interview_completed_at
//                       ? "Completed"
//                       : c?.interview_started_at
//                       ? "In Progress"
//                       : c?.interview_scheduled
//                       ? "Scheduled"
//                       : "Not Scheduled"}
//                   </span>
//                 </div>
//                 <div className="rounded-lg border bg-white p-4">
//                   <p className="mb-1 text-sm text-gray-600">Overall Score</p>
//                   <p className="text-2xl font-bold">{c?.interview_ai_score != null ? `${Math.round(c.interview_ai_score)}%` : "—"}</p>
//                 </div>
//                 <div className="rounded-lg border bg-white p-4">
//                   <p className="mb-1 text-sm text-gray-600">Questions Answered</p>
//                   <p className="text-2xl font-bold">
//                     {c?.interview_questions_answered}/{c?.interview_total_questions ?? "—"}
//                   </p>
//                 </div>
//                 <div className="rounded-lg border bg-white p-4">
//                   <p className="mb-1 text-sm text-gray-600">Duration</p>
//                   <p className="text-2xl font-bold">{formatDuration(c?.interview_duration)}</p>
//                 </div>
//               </div>

//               {c?.interview_ai_score != null && (
//                 <div className="rounded-lg border bg-white p-6">
//                   <h3 className="mb-4 text-lg font-semibold">Skills Assessment</h3>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <ReBar data={skillsData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="skill" />
//                       <YAxis domain={[0, 100]} />
//                       <Tooltip />
//                       <Bar dataKey="score" fill="#3B82F6" />
//                     </ReBar>
//                   </ResponsiveContainer>
//                 </div>
//               )}

//               {(c?.strengths?.length || c?.weaknesses?.length) && (
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   {c?.strengths?.length ? (
//                     <div className="rounded-lg border border-green-200 bg-green-50 p-6">
//                       <h3 className="mb-3 text-lg font-semibold text-green-800">Strengths</h3>
//                       <ul className="space-y-2">
//                         {c.strengths!.map((s: string, i: number) => (
//                           <li key={i} className="flex items-start">
//                             <CheckCircle className="mr-2 mt-0.5 h-5 w-5 text-green-600" />
//                             <span className="text-gray-700">{s}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ) : null}

//                   {c?.weaknesses?.length ? (
//                     <div className="rounded-lg border border-red-200 bg-red-50 p-6">
//                       <h3 className="mb-3 text-lg font-semibold text-red-800">Areas for Improvement</h3>
//                       <ul className="space-y-2">
//                         {c.weaknesses!.map((w: string, i: number) => (
//                           <li key={i} className="flex items-start">
//                             <ChevronRight className="mr-2 mt-0.5 h-5 w-5 text-red-600" />
//                             <span className="text-gray-700">{w}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ) : null}
//                 </div>
//               )}
//             </div>
//           )}

//           {tab === "analysis" && (
//             <div className="space-y-6">
//               {c?.interview_ai_overall_feedback || details?.analysis?.overall_feedback ? (
//                 <>
//                   <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
//                     <h3 className="mb-3 text-lg font-semibold text-blue-800">AI Analysis</h3>
//                     <p className="whitespace-pre-line text-gray-700">
//                       {c?.interview_ai_overall_feedback || details?.analysis?.overall_feedback}
//                     </p>
//                   </div>

//                   {(c?.recommendations?.length || details?.analysis?.recommendations?.length) && (
//                     <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
//                       <h3 className="mb-3 text-lg font-semibold text-yellow-800">Recommendations</h3>
//                       <ul className="space-y-2">
//                         {(c?.recommendations || details?.analysis?.recommendations || []).map(
//                           (r: string, i: number) => (
//                             <li key={i} className="flex items-start">
//                               <ChevronRight className="mr-2 mt-0.5 h-5 w-5 text-yellow-600" />
//                               <span className="text-gray-700">{r}</span>
//                             </li>
//                           )
//                         )}
//                       </ul>
//                     </div>
//                   )}

//                   <div
//                     className={`rounded-lg p-4 ${
//                       (c?.interview_ai_score ?? 0) >= 70
//                         ? "border border-green-200 bg-green-50"
//                         : "border border-red-200 bg-red-50"
//                     }`}
//                   >
//                     <p className="text-lg font-semibold">
//                       Final Decision:{" "}
//                       {details?.analysis?.final_status ??
//                         ((c?.interview_ai_score ?? 0) >= 70 ? "Recommended" : "Not Recommended")}
//                     </p>
//                   </div>
//                 </>
//               ) : (
//                 <div className="py-12 text-center text-gray-500">
//                   <BarChart className="mx-auto mb-3 h-12 w-12 text-gray-300" />
//                   <p>No analysis available yet</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {tab === "qa" && (
//             <div className="space-y-4">
//               {details?.qa_data?.qa_pairs?.length ? (
//                 details.qa_data.qa_pairs.map((qa: QAPair, i: number) => (
//                   <div key={i} className="rounded-lg border bg-white p-4">
//                     <p className="mb-2 font-semibold text-blue-700">Question {i + 1}:</p>
//                     <p className="text-gray-800">{qa.question}</p>
//                     <p className="mt-3 font-semibold text-green-700">Answer:</p>
//                     <p className="text-gray-800">
//                       {qa.answer || <span className="italic text-red-500">No answer provided</span>}
//                     </p>
//                     {qa.score != null && (
//                       <p className="mt-2 text-sm text-gray-600">Score: {qa.score}/10</p>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <div className="py-12 text-center text-gray-500">
//                   <MessageSquare className="mx-auto mb-3 h-12 w-12 text-gray-300" />
//                   <p>No Q&A data available</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {tab === "progress" && (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="rounded-lg border bg-white p-6">
//                 <h3 className="mb-4 text-lg font-semibold">Interview Progress</h3>
//                 <ResponsiveContainer width="100%" height={220}>
//                   <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[{ name: "Progress", value: c?.interview_progress || 0, fill: "#3B82F6" }]}>
//                     <RadialBar dataKey="value" cornerRadius={10} />
//                     <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">
//                       {Math.round(c?.interview_progress || 0)}%
//                     </text>
//                   </RadialBarChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="rounded-lg border bg-white p-6">
//                 <h3 className="mb-4 text-lg font-semibold">Interview Timeline</h3>
//                 <div className="space-y-3 text-sm">
//                   {c?.interview_scheduled && (
//                     <div>• Scheduled: {c.interview_date ? new Date(c.interview_date).toLocaleString() : "—"}</div>
//                   )}
//                   {c?.interview_started_at && <div>• Started: {new Date(c.interview_started_at).toLocaleString()}</div>}
//                   {c?.interview_completed_at && <div>• Completed: {new Date(c.interview_completed_at).toLocaleString()}</div>}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* footer */}
//         <div className="bg-gray-50 p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex gap-3">
//               {c?.interview_recording_url && (
//                 <a
//                   href={c.interview_recording_url}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
//                 >
//                   <Video className="mr-2 inline h-4 w-4" />
//                   View Recording
//                 </a>
//               )}
//               {c?.resume_url && (
//                 <a
//                   href={c.resume_url}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
//                 >
//                   <FileText className="mr-2 inline h-4 w-4" />
//                   View Resume
//                 </a>
//               )}
//             </div>
//             <button onClick={onClose} className="rounded-lg bg-gray-600 px-6 py-2 text-white hover:bg-gray-700">
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CandidateDetailsModal;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { InterviewRow, Verdict } from "./CandidatesTable";

interface CandidateDetailsModalProps {
  candidate: InterviewRow | null;
  onClose: () => void;
  onExtendOffer?: (id: string) => void;
  onReject?: (id: string) => void;
  onScheduleNext?: (id: string) => void;
}

// ── helpers ───────────────────────────────────────────────────────────────────
function fmtDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" });
}

function barColor(sc: number) {
  return sc >= 75 ? "#059669" : sc >= 55 ? "#D97706" : "#DC2626";
}

const VERDICT_DISPLAY: Record<Verdict, { label: string; color: string }> = {
  offer_extended: { label: "Offer Extended", color: "#059669" },
  next_round:     { label: "Next Round",     color: "#2563EB" },
  on_hold:        { label: "On Hold",        color: "#D97706" },
  rejected:       { label: "Rejected",       color: "#DC2626" },
  pending:        { label: "Pending Decision", color: "#94A3B8" },
};

// ── component ─────────────────────────────────────────────────────────────────
const CandidateDetailsModal: React.FC<CandidateDetailsModalProps> = ({
  candidate, onClose, onExtendOffer, onReject, onScheduleNext,
}) => {
  // Lock body scroll
  useEffect(() => {
    if (!candidate) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [candidate]);

  // Esc to close
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  if (!candidate) return null;

  const vd     = VERDICT_DISPLAY[candidate.verdict] ?? VERDICT_DISPLAY.pending;
  const score  = candidate.score;
  const criteria = candidate.criteria ?? {};

  const drawerContent = (
    // Backdrop
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.35)", zIndex: 9999,
               display: "flex", justifyContent: "flex-end" }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Drawer */}
      <div style={{ width: 520, maxWidth: "92vw", background: "#fff", height: "100%",
                    overflowY: "auto", borderLeft: "0.5px solid rgba(0,0,0,0.12)",
                    display: "flex", flexDirection: "column", animation: "drawerIn .22s ease" }}>
        <style>{`
          @keyframes drawerIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        `}</style>

        {/* ── Sticky header ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "20px 24px", borderBottom: "0.5px solid rgba(0,0,0,0.08)",
                      position: "sticky", top: 0, background: "#fff", zIndex: 2 }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#0F172A" }}>
            {candidate.name} — Interview Details
          </p>
          <button onClick={onClose}
            style={{ width: 30, height: 30, borderRadius: "50%", background: "#F8FAFC",
                     border: "0.5px solid rgba(0,0,0,0.10)", cursor: "pointer",
                     display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
            <X size={16} />
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ flex: 1, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Verdict hero */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: "#F8FAFC", borderRadius: 12, padding: "16px 18px" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase",
                           letterSpacing: ".5px", marginBottom: 6 }}>Final Verdict</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: vd.color, letterSpacing: "-.5px" }}>
                {vd.label}
              </p>
              <p style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                {candidate.round} · {fmtDate(candidate.date)}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {candidate.verdict !== "offer_extended" && onExtendOffer && (
                <button onClick={() => { onExtendOffer(candidate.id); onClose(); }}
                  style={{ padding: "6px 14px", fontSize: 12, fontWeight: 500, background: "#ECFDF5",
                           color: "#059669", border: "none", borderRadius: 8, cursor: "pointer" }}>
                  Extend Offer
                </button>
              )}
              {candidate.verdict === "offer_extended" && (
                <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20,
                               background: "#ECFDF5", color: "#059669" }}>Offer Sent ✓</span>
              )}
              {candidate.verdict !== "rejected" && onReject && (
                <button onClick={() => { onReject(candidate.id); onClose(); }}
                  style={{ padding: "6px 14px", fontSize: 12, fontWeight: 500, background: "#FEF2F2",
                           color: "#DC2626", border: "none", borderRadius: 8, cursor: "pointer" }}>
                  Reject
                </button>
              )}
            </div>
          </div>

          {/* Candidate info grid */}
          <Section title="Candidate Info">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                ["Name",           candidate.name],
                ["Role Applied",   candidate.role],
                ["Department",     candidate.dept],
                ["Email",          candidate.email],
                ["Interviewer",    candidate.interviewer],
                ["Duration",       candidate.duration ? candidate.duration + " minutes" : "—"],
                ["Round",          candidate.round],
                ["Interview Date", fmtDate(candidate.date)],
              ].map(([label, val]) => (
                <div key={label} style={{ background: "#F8FAFC", borderRadius: 9, padding: "11px 14px" }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase",
                               letterSpacing: ".4px", marginBottom: 4 }}>{label}</p>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#0F172A" }}>
                    {label === "Email"
                      ? <a href={`mailto:${val}`} style={{ color: "#2563EB", textDecoration: "none" }}>{val}</a>
                      : val || "—"}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Score breakdown */}
          <Section title="Score Breakdown">
            <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#F8FAFC",
                          borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
              <p style={{ fontSize: 36, fontWeight: 700, letterSpacing: -2, lineHeight: 1,
                          color: barColor(score ?? 0) }}>{score ?? "—"}</p>
              <div>
                <p style={{ fontSize: 12, color: "#64748B" }}>Overall Score</p>
                <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>Out of 100 · Passing threshold: 60</p>
              </div>
            </div>

            {/* Criteria bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(criteria).map(([key, val]) => {
                const v = val ?? 0;
                return (
                  <div key={key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <p style={{ fontSize: 12, color: "#64748B", width: 140, flexShrink: 0 }}>{key}</p>
                    <div style={{ flex: 1, height: 6, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${v}%`, background: barColor(v), borderRadius: 3, transition: "width .5s ease" }} />
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", width: 28, textAlign: "right" }}>{v || "—"}</p>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Feedback */}
          <Section title="Interviewer Feedback">
            <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "14px 16px",
                          borderLeft: "3px solid #2563EB" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", marginBottom: 8 }}>
                {candidate.interviewer} · {candidate.round}
              </p>
              <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.65 }}>
                {candidate.feedback || "No feedback recorded."}
              </p>
            </div>
          </Section>

        </div>

        {/* ── Footer ── */}
        <div style={{ padding: "16px 24px", borderTop: "0.5px solid rgba(0,0,0,0.08)",
                      display: "flex", gap: 10 }}>
          <button onClick={onClose}
            style={{ padding: "8px 18px", fontSize: 13, fontWeight: 500, background: "#fff",
                     border: "0.5px solid rgba(0,0,0,0.12)", borderRadius: 8, cursor: "pointer", color: "#374151" }}>
            Close
          </button>
          {candidate.verdict === "next_round" && onScheduleNext && (
            <button onClick={() => { onScheduleNext(candidate.id); onClose(); }}
              style={{ padding: "8px 18px", fontSize: 13, fontWeight: 600, background: "#2563EB",
                       color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>
              Schedule Next Round →
            </button>
          )}
          {candidate.verdict === "offer_extended" && (
            <button style={{ padding: "8px 18px", fontSize: 13, fontWeight: 500, background: "#ECFDF5",
                             color: "#059669", border: "none", borderRadius: 8, cursor: "pointer" }}>
              View Offer Letter
            </button>
          )}
          {candidate.verdict === "pending" && (
            <button style={{ padding: "8px 18px", fontSize: 13, fontWeight: 600, background: "#2563EB",
                             color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>
              Record Verdict
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(drawerContent, document.body) : null;
};

// ── small section wrapper ──────────────────────────────────────────────────────
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    <p style={{ fontSize: 12, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase",
                letterSpacing: ".5px" }}>{title}</p>
    {children}
  </div>
);

export default CandidateDetailsModal;