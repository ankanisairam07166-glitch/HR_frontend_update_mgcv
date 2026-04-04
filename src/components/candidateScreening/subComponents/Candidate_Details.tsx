// // // "use client";

// // // import React from "react";
// // // import { Eye, Send, Calendar, Download, Mail } from "lucide-react";
// // // import { useRouter } from "next/navigation";
// // // import { Candidate } from "@/services/interfaces/CandidateScreening";

// // // interface CandidateDetailsProps {
// // //   candidate: Candidate | null;
// // //   onSendReminder?: (candidateId: string | number) => void;
// // // }

// // // const CandidateDetails: React.FC<CandidateDetailsProps> = ({ candidate, onSendReminder }) => {
// // //   const router = useRouter();

// // //   if (!candidate) {
// // //     return (
// // //       <div className="p-8 text-center text-gray-500">
// // //         <Eye className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// // //         <p className="text-lg font-medium">Select a candidate to view details</p>
// // //         <p className="text-sm mt-1">Choose a candidate from the list to see their information</p>
// // //       </div>
// // //     );
// // //   }

// // //   const StatusIcon = candidate.statusInfo?.icon;

// // //   return (
// // //     <div className="p-6">
// // //       {/* Header */}
// // //       <div className="flex items-start justify-between mb-6">
// // //         <div className="flex items-center space-x-4">
// // //           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-medium">
// // //             {candidate.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
// // //           </div>

// // //           <div>
// // //             <h2 className="text-xl font-semibold text-gray-900">{candidate.name}</h2>
// // //             <p className="text-gray-500">{candidate.job_title}</p>
// // //             <div className="flex items-center space-x-3 mt-2">
// // //               <a href={`mailto:${candidate.email}`} className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
// // //                 <Mail className="w-3 h-3 mr-1" />
// // //                 {candidate.email}
// // //               </a>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="text-center">
// // //           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-blue-100 bg-white">
// // //             <div>
// // //               <div className={`text-2xl font-bold ${candidate.scoreColor}`}>
// // //                 {(candidate.displayScore ?? 0).toFixed(0)}
// // //               </div>
// // //               <div className="text-xs text-gray-500">ATS Score</div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Status */}
// // //       <div className="mb-6 p-4 bg-gray-50 rounded-lg">
// // //         <div className="flex items-center justify-between">
// // //           <div>
// // //             <p className="text-sm text-gray-600 mb-1">Current Status</p>
// // //             {StatusIcon && (
// // //               <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${candidate.statusInfo?.color}`}>
// // //                 <StatusIcon className="w-4 h-4 mr-1.5" />
// // //                 {candidate.displayStatus}
// // //               </span>
// // //             )}
// // //           </div>
// // //           <div className="text-right">
// // //             <p className="text-sm text-gray-600 mb-1">Applied</p>
// // //             <p className="font-medium">
// // //               {candidate.processed_date ? new Date(candidate.processed_date).toLocaleDateString() : "—"}
// // //             </p>
// // //           </div>
// // //         </div>

// // //         {candidate.exam_completed && (
// // //           <div className="mt-4 pt-4 border-t border-gray-200">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-sm text-gray-600">Assessment Score</p>
// // //                 <p className={`text-lg font-semibold ${(candidate.exam_percentage ?? 0) >= 70 ? "text-green-600" : "text-red-600"}`}>
// // //                   {candidate.exam_percentage?.toFixed(0)}%
// // //                 </p>
// // //               </div>
// // //               <div className="text-right">
// // //                 <p className="text-sm text-gray-600">Completed</p>
// // //                 <p className="font-medium">{candidate.exam_completed ? "Yes" : "No"}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {candidate.interview_scheduled && (
// // //           <div className="mt-4 pt-4 border-t border-gray-200">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-sm text-gray-600">Interview Status</p>
// // //                 <p className="text-green-600 font-medium">Scheduled</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Actions */}
// // //       <div className="space-y-3">
// // //         {candidate.resume_path && (
// // //           <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
// // //             <Download className="w-4 h-4 mr-2" />
// // //             Download Resume
// // //           </button>
// // //         )}

// // //         {candidate.exam_link_sent && !candidate.exam_completed && !candidate.link_expired && onSendReminder && (
// // //           <button
// // //             onClick={() => onSendReminder(candidate.id)}
// // //             className="w-full flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
// // //           >
// // //             <Send className="w-4 h-4 mr-2" />
// // //             Send Assessment Reminder
// // //           </button>
// // //         )}

// // //         {candidate.exam_completed && (candidate.exam_percentage ?? 0) >= 70 && !candidate.interview_scheduled && (
// // //           <button
// // //             onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}
// // //             className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
// // //           >
// // //             <Calendar className="w-4 h-4 mr-2" />
// // //             Schedule Interview
// // //           </button>
// // //         )}

// // //         <button
// // //           onClick={() => router.push(`/candidates/${candidate.id}`)} 
// // //           className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// // //         >
// // //           <Eye className="w-4 h-4 mr-2" />
// // //           View Full Profile
// // //         </button>
// // //       </div>

// // //       {/* Additional Info */}
// // //       <div className="mt-6 pt-6 border-t border-gray-200">
// // //         <h3 className="text-sm font-medium text-gray-700 mb-3">Additional Information</h3>
// // //         <div className="space-y-2">
// // //           <div className="flex items-center justify-between text-sm">
// // //             <span className="text-gray-600">Job ID</span>
// // //             <span className="font-medium">{candidate.job_id}</span>
// // //           </div>
// // //           <div className="flex items-center justify-between text-sm">
// // //             <span className="text-gray-600">Candidate ID</span>
// // //             <span className="font-medium">{candidate.id}</span>
// // //           </div>
// // //           {candidate.status && (
// // //             <div className="flex items-center justify-between text-sm">
// // //               <span className="text-gray-600">Initial Status</span>
// // //               <span className="font-medium">{candidate.status}</span>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default React.memo(CandidateDetails);
// // "use client";

// // import React from "react";
// // import {
// //   Eye, Send, Calendar, Download, Mail,
// //   CheckCircle, XCircle, AlertTriangle,
// //   ThumbsUp, ThumbsDown, Clock, Info,
// // } from "lucide-react";
// // import { useRouter } from "next/navigation";
// // import { Candidate } from "@/services/interfaces/CandidateScreening";

// // interface CandidateDetailsProps {
// //   candidate: Candidate | null;
// //   onSendReminder?: (candidateId: string | number) => void;
// // }

// // // ── Shortlist reasons ─────────────────────────────────────────────────────────
// // function getShortlistReasons(c: Candidate): string[] {
// //   const reasons: string[] = [];
// //   const score = c?.ats_score ?? 0;

// //   if (score >= 85)
// //     reasons.push(`Excellent ATS score of ${score.toFixed(0)}/100 — top 10% of applicants`);
// //   else if (score >= 70)
// //     reasons.push(`Strong ATS score of ${score.toFixed(0)}/100 — meets the shortlist threshold`);
// //   else if (score >= 60)
// //     reasons.push(`Acceptable ATS score of ${score.toFixed(0)}/100 — manually reviewed and approved`);

// //   if (c?.exam_completed && (c?.exam_percentage ?? 0) >= 70)
// //     reasons.push(`Passed assessment with ${c.exam_percentage?.toFixed(0)}% — above the 70% pass mark`);

// //   if (c?.interview_scheduled)
// //     reasons.push("Interview scheduled — progressed through all screening stages");

// //   if (c?.final_status === "Hired")
// //     reasons.push("Offer accepted — candidate successfully hired");

// //   if (reasons.length === 0)
// //     reasons.push("Met minimum qualification criteria set for this job role");

// //   return reasons;
// // }

// // // ── Rejection — each point has a headline + 2–3 specific feedback bullets ────
// // interface RejectionPoint {
// //   headline: string;       // shown with ✗ or ℹ icon
// //   feedback: string[];     // detail bullets shown indented below the headline
// //   isJourney?: boolean;    // greyed context row — what happened before this stage
// // }

// // function getRejectionPoints(c: Candidate): RejectionPoint[] {
// //   const points: RejectionPoint[] = [];
// //   const score = c?.ats_score ?? 0;
// //   const exam  = c?.exam_percentage ?? 0;

// //   // ── Screened out at ATS — never reached assessment ────────────────────────
// //   if (!c?.exam_link_sent) {
// //     const gap = Math.max(70 - score, 0).toFixed(0);
// //     points.push({
// //       headline: score < 60
// //         ? `Low ATS score: ${score.toFixed(0)}/100 — minimum threshold is 60`
// //         : `ATS score ${score.toFixed(0)}/100 — below the shortlist cut-off of 70`,
// //       feedback: [
// //         `Score is ${gap} points below the shortlist threshold of 70`,
// //         "Resume keywords and experience don't closely match the job description",
// //         "Profile was filtered out at the automated screening stage before any manual review",
// //       ],
// //     });
// //     return points;
// //   }

// //   // ── Was shortlisted by ATS first — show as a greyed journey context row ──
// //   if (score >= 70) {
// //     points.push({
// //       headline: `Initially shortlisted — ATS score ${score.toFixed(0)}/100 met the threshold`,
// //       feedback: [],
// //       isJourney: true,
// //     });
// //   } else if (score >= 60) {
// //     points.push({
// //       headline: `Initially reviewed — ATS score ${score.toFixed(0)}/100 passed minimum screening`,
// //       feedback: [],
// //       isJourney: true,
// //     });
// //   }

// //   // ── Assessment link expired ───────────────────────────────────────────────
// //   if (c?.link_expired && !c?.exam_completed) {
// //     points.push({
// //       headline: "Assessment not completed — invitation link expired",
// //       feedback: [
// //         "Candidate received the assessment link but did not open or submit the test",
// //         "Assessment links have a fixed validity window — once expired they cannot be reused",
// //         "HR can decide whether to resend the link or close this application",
// //       ],
// //     });
// //     return points;
// //   }

// //   // ── Failed assessment ─────────────────────────────────────────────────────
// //   if (c?.exam_completed && exam < 70) {
// //     const gap = (70 - exam).toFixed(0);
// //     const severity =
// //       exam < 40
// //         ? "Very low score — significant gaps in core skills required for this role"
// //         : exam < 55
// //         ? "Score indicates partial understanding but insufficient depth in key technical areas"
// //         : `Score is close to the pass mark — candidate shows some ability but fell ${gap}% short`;

// //     points.push({
// //       headline: `Failed assessment: scored ${exam.toFixed(0)}% — required pass mark is 70%`,
// //       feedback: [
// //         `Achieved ${exam.toFixed(0)}% against the 70% pass mark — ${gap}% below the minimum`,
// //         severity,
// //         "Strong ATS resume score but technical skills were not demonstrated at the required level in the test",
// //       ],
// //     });
// //   }

// //   // ── Rejected after assessment by HR ──────────────────────────────────────
// //   if (c?.final_status === "Rejected After Exam") {
// //     points.push({
// //       headline: "Did not meet post-assessment criteria for the next stage",
// //       feedback: [
// //         "Overall evaluation after the assessment did not clear the bar set for this role",
// //         "Profile assessed holistically — skills, experience, and assessment result considered together",
// //         "HR review determined the candidate is not a strong enough fit at this stage",
// //       ],
// //     });
// //   }

// //   return points;
// // }

// // // ─── Component ────────────────────────────────────────────────────────────────
// // const CandidateDetails: React.FC<CandidateDetailsProps> = ({ candidate, onSendReminder }) => {
// //   const router = useRouter();

// //   if (!candidate) {
// //     return (
// //       <div className="p-8 text-center text-gray-500">
// //         <Eye className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// //         <p className="text-lg font-medium">Select a candidate to view details</p>
// //         <p className="text-sm mt-1">Choose a candidate from the list to see their information</p>
// //       </div>
// //     );
// //   }

// //   const StatusIcon = candidate.statusInfo?.icon;

// //   // Final outcome always wins — never show both panels at once
// //   const isFinallyRejected =
// //     candidate.status === "Rejected" ||
// //     candidate.final_status === "Rejected After Exam" ||
// //     (candidate.exam_completed && (candidate.exam_percentage ?? 0) < 70) ||
// //     (candidate.link_expired && !candidate.exam_completed);

// //   const isShortlisted = !isFinallyRejected && (
// //     candidate.status === "Shortlisted" ||
// //     candidate.interview_scheduled ||
// //     candidate.final_status === "Hired"
// //   );

// //   const isRejected = isFinallyRejected;

// //   const shortlistReasons  = isShortlisted ? getShortlistReasons(candidate) : [];
// //   const rejectionPoints   = isRejected    ? getRejectionPoints(candidate)   : [];

// //   return (
// //     <div className="p-6">

// //       {/* ── Header ── */}
// //       <div className="flex items-start justify-between mb-6">
// //         <div className="flex items-center space-x-4">
// //           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-medium flex-shrink-0">
// //             {candidate.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
// //           </div>
// //           <div>
// //             <h2 className="text-xl font-semibold text-gray-900">{candidate.name}</h2>
// //             <p className="text-gray-500">{candidate.job_title}</p>
// //             <a href={`mailto:${candidate.email}`} className="text-sm text-blue-600 hover:text-blue-700 flex items-center mt-2">
// //               <Mail className="w-3 h-3 mr-1" />
// //               {candidate.email}
// //             </a>
// //           </div>
// //         </div>
// //         <div className="text-center flex-shrink-0">
// //           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-blue-100 bg-white">
// //             <div>
// //               <div className={`text-2xl font-bold ${candidate.scoreColor}`}>
// //                 {(candidate.displayScore ?? 0).toFixed(0)}
// //               </div>
// //               <div className="text-xs text-gray-500">ATS Score</div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ── Current Status ── */}
// //       <div className="mb-4 p-4 bg-gray-50 rounded-lg">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <p className="text-sm text-gray-600 mb-1">Current Status</p>
// //             {StatusIcon && (
// //               <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${candidate.statusInfo?.color}`}>
// //                 <StatusIcon className="w-4 h-4 mr-1.5" />
// //                 {candidate.displayStatus}
// //               </span>
// //             )}
// //           </div>
// //           <div className="text-right">
// //             <p className="text-sm text-gray-600 mb-1">Applied</p>
// //             <p className="font-medium">
// //               {candidate.processed_date ? new Date(candidate.processed_date).toLocaleDateString() : "—"}
// //             </p>
// //           </div>
// //         </div>

// //         {candidate.exam_completed && (
// //           <div className="mt-4 pt-4 border-t border-gray-200">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm text-gray-600">Assessment Score</p>
// //                 <p className={`text-lg font-semibold ${(candidate.exam_percentage ?? 0) >= 70 ? "text-green-600" : "text-red-600"}`}>
// //                   {candidate.exam_percentage?.toFixed(0)}%
// //                 </p>
// //               </div>
// //               <div className="text-right">
// //                 <p className="text-sm text-gray-600">Completed</p>
// //                 <p className="font-medium">Yes</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {candidate.interview_scheduled && (
// //           <div className="mt-4 pt-4 border-t border-gray-200">
// //             <p className="text-sm text-gray-600">Interview Status</p>
// //             <p className="text-green-600 font-medium">Scheduled</p>
// //           </div>
// //         )}
// //       </div>

// //       {/* ── ✅ Why Shortlisted ── */}
// //       {isShortlisted && (
// //         <div className="mb-4 rounded-lg border border-green-200 bg-green-50 overflow-hidden">
// //           <div className="flex items-center gap-2 px-4 py-2.5 bg-green-100 border-b border-green-200">
// //             <ThumbsUp className="w-4 h-4 text-green-700 flex-shrink-0" />
// //             <span className="text-sm font-semibold text-green-800">Why Shortlisted</span>
// //           </div>
// //           <ul className="px-4 py-3 space-y-2">
// //             {shortlistReasons.map((reason, i) => (
// //               <li key={i} className="flex items-start gap-2 text-sm text-green-800">
// //                 <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
// //                 <span>{reason}</span>
// //               </li>
// //             ))}
// //           </ul>
// //           <div className="px-4 pb-3">
// //             <div className="flex items-center justify-between text-xs text-green-700 mb-1">
// //               <span>ATS Score</span>
// //               <span className="font-semibold">{(candidate.ats_score ?? 0).toFixed(0)} / 100</span>
// //             </div>
// //             <div className="w-full h-2 bg-green-200 rounded-full overflow-hidden">
// //               <div className="h-2 bg-green-500 rounded-full transition-all"
// //                 style={{ width: `${Math.min(candidate.ats_score ?? 0, 100)}%` }} />
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ── ❌ Why Rejected ── */}
// //       {isRejected && (
// //         <div className="mb-4 rounded-lg border border-red-200 bg-red-50 overflow-hidden">

// //           <div className="flex items-center gap-2 px-4 py-2.5 bg-red-100 border-b border-red-200">
// //             <ThumbsDown className="w-4 h-4 text-red-700 flex-shrink-0" />
// //             <span className="text-sm font-semibold text-red-800">Why Rejected</span>
// //           </div>

// //           <div className="px-4 py-3 space-y-3">
// //             {rejectionPoints.map((pt, i) => (
// //               <div key={i}>
// //                 {/* ── Headline row ── */}
// //                 {pt.isJourney ? (
// //                   /* Greyed journey context — "what happened before" */
// //                   <div className="flex items-start gap-2 text-xs text-red-400 italic mb-1">
// //                     <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
// //                     <span>{pt.headline}</span>
// //                   </div>
// //                 ) : (
// //                   <div className="flex items-start gap-2 text-sm font-medium text-red-800">
// //                     <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
// //                     <span>{pt.headline}</span>
// //                   </div>
// //                 )}

// //                 {/* ── Feedback bullets indented under the headline ── */}
// //                 {pt.feedback.length > 0 && (
// //                   <ul className="mt-1.5 ml-6 space-y-1">
// //                     {pt.feedback.map((fb, j) => (
// //                       <li key={j} className="flex items-start gap-1.5 text-xs text-red-700">
// //                         <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
// //                         <span>{fb}</span>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 )}
// //               </div>
// //             ))}
// //           </div>

// //           {/* ATS score bar */}
// //           <div className="px-4 pb-3 pt-2 border-t border-red-200">
// //             <div className="flex items-center justify-between text-xs text-red-700 mb-1">
// //               <span>ATS Score</span>
// //               <span className="font-semibold">{(candidate.ats_score ?? 0).toFixed(0)} / 100</span>
// //             </div>
// //             <div className="w-full h-2 bg-red-200 rounded-full overflow-hidden">
// //               <div className="h-2 bg-red-400 rounded-full transition-all"
// //                 style={{ width: `${Math.min(candidate.ats_score ?? 0, 100)}%` }} />
// //             </div>
// //             <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
// //               <AlertTriangle className="w-3 h-3 flex-shrink-0" />
// //               Minimum required score: 70 / 100
// //             </p>
// //           </div>
// //         </div>
// //       )}

// //       {/* Assessment Expired notice — fallback if not caught above */}
// //       {candidate.link_expired && !candidate.exam_completed && !isRejected && (
// //         <div className="mb-4 flex items-start gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3">
// //           <Clock className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
// //           <div>
// //             <p className="text-sm font-medium text-yellow-800">Assessment link expired</p>
// //             <p className="text-xs text-yellow-700 mt-0.5">
// //               The candidate did not complete the assessment before the deadline.
// //             </p>
// //           </div>
// //         </div>
// //       )}

// //       {/* ── Actions ── */}
// //       <div className="space-y-3">
// //         {candidate.resume_path && (
// //           <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
// //             <Download className="w-4 h-4 mr-2" />
// //             Download Resume
// //           </button>
// //         )}

// //         {candidate.exam_link_sent && !candidate.exam_completed && !candidate.link_expired && onSendReminder && (
// //           <button
// //             onClick={() => onSendReminder(candidate.id)}
// //             className="w-full flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
// //           >
// //             <Send className="w-4 h-4 mr-2" />
// //             Send Assessment Reminder
// //           </button>
// //         )}

// //         {candidate.exam_completed && (candidate.exam_percentage ?? 0) >= 70 && !candidate.interview_scheduled && (
// //           <button
// //             onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}
// //             className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
// //           >
// //             <Calendar className="w-4 h-4 mr-2" />
// //             Schedule Interview
// //           </button>
// //         )}

// //         <button
// //           onClick={() => router.push(`/candidates/${candidate.id}`)}
// //           className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //         >
// //           <Eye className="w-4 h-4 mr-2" />
// //           View Full Profile
// //         </button>
// //       </div>

// //       {/* ── Additional Info ── */}
// //       <div className="mt-6 pt-6 border-t border-gray-200">
// //         <h3 className="text-sm font-medium text-gray-700 mb-3">Additional Information</h3>
// //         <div className="space-y-2">
// //           <div className="flex items-center justify-between text-sm">
// //             <span className="text-gray-600">Job ID</span>
// //             <span className="font-medium">{candidate.job_id}</span>
// //           </div>
// //           <div className="flex items-center justify-between text-sm">
// //             <span className="text-gray-600">Candidate ID</span>
// //             <span className="font-medium">{candidate.id}</span>
// //           </div>
// //           {candidate.status && (
// //             <div className="flex items-center justify-between text-sm">
// //               <span className="text-gray-600">Initial Status</span>
// //               <span className="font-medium">{candidate.status}</span>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default React.memo(CandidateDetails);
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
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Eye, Send, Calendar, Download, Mail } from "lucide-react";
import { Candidate } from "@/services/interfaces/CandidateScreening";

/* ─────────────────────────────────────────────────────────────────────────────
   STYLES — mirror the HTML detail panel CSS exactly
───────────────────────────────────────────────────────────────────────────── */
const DETAIL_CSS = `
  .cd-content { padding:24px; display:flex; flex-direction:column; gap:16px; }

  /* hero card */
  .cd-hero { background:var(--surface); border:0.5px solid var(--border); border-radius:var(--r-xl); padding:24px; }
  .cd-hero-top { display:flex; align-items:flex-start; gap:16px; margin-bottom:20px; }
  .cd-hero-avatar { width:60px; height:60px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700; }
  .cd-hero-info { flex:1; min-width:0; }
  .cd-hero-name { font-size:18px; font-weight:600; color:var(--text-1); letter-spacing:-0.3px; }
  .cd-hero-role { font-size:13px; color:var(--text-2); margin-top:3px; }
  .cd-hero-badges { display:flex; gap:8px; margin-top:8px; flex-wrap:wrap; }
  .cd-hero-actions { display:flex; gap:8px; flex-shrink:0; }
  .cd-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .cd-info-item { background:var(--bg); border-radius:9px; padding:12px 14px; }
  .cd-info-label { font-size:10px; font-weight:600; color:var(--text-3); text-transform:uppercase; letter-spacing:.5px; margin-bottom:4px; }
  .cd-info-value { font-size:13px; font-weight:500; color:var(--text-1); }
  .cd-info-value a { color:var(--accent); text-decoration:none; }

  /* score card */
  .cd-score-card { background:var(--surface); border:0.5px solid var(--border); border-radius:var(--r-lg); padding:20px; }
  .cd-score-ring-wrap { display:flex; align-items:center; gap:16px; margin:14px 0 20px; padding-bottom:20px; border-bottom:0.5px solid var(--border); }
  .cd-score-ring { position:relative; width:70px; height:70px; flex-shrink:0; }
  .cd-score-ring svg { transform:rotate(-90deg); }
  .cd-score-ring-num { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:700; color:var(--text-1); }
  .cd-score-ring-info { flex:1; }
  .cd-score-ring-label { font-size:12px; color:var(--text-2); margin-bottom:4px; }
  .cd-score-ring-big   { font-size:22px; font-weight:700; letter-spacing:-1px; line-height:1; }
  .cd-score-ring-sub   { font-size:11px; color:var(--text-3); margin-top:3px; }
  .cd-score-row { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
  .cd-score-row:last-child { margin-bottom:0; }
  .cd-score-lbl { font-size:12px; color:var(--text-2); width:130px; flex-shrink:0; }
  .cd-score-bar-wrap { flex:1; height:6px; background:var(--bg); border-radius:4px; overflow:hidden; }
  .cd-score-bar-fill { height:100%; border-radius:4px; transition:width .6s ease; }
  .cd-score-num { font-size:12px; font-weight:600; color:var(--text-1); width:30px; text-align:right; flex-shrink:0; }

  /* timeline card */
  .cd-tl-card { background:var(--surface); border:0.5px solid var(--border); border-radius:var(--r-lg); padding:20px; }
  .cd-tl { display:flex; flex-direction:column; margin-top:14px; }
  .cd-tl-item { display:flex; gap:14px; position:relative; }
  .cd-tl-item:not(:last-child)::before { content:''; position:absolute; left:15px; top:30px; width:1px; height:calc(100% - 8px); background:var(--border-md); }
  .cd-tl-dot { width:30px; height:30px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; background:var(--bg); border:0.5px solid var(--border); margin-top:2px; position:relative; z-index:1; }
  .cd-tl-dot svg { width:13px; height:13px; fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
  .cd-tl-dot.done    { background:var(--green-light); border-color:#BBF7D0; }
  .cd-tl-dot.done svg { stroke:var(--green); }
  .cd-tl-dot.active  { background:var(--accent-light); border-color:var(--accent-mid); }
  .cd-tl-dot.active svg { stroke:var(--accent); }
  .cd-tl-dot.pending svg { stroke:var(--text-3); }
  .cd-tl-body  { flex:1; padding-bottom:20px; }
  .cd-tl-title { font-size:13px; font-weight:600; color:var(--text-1); }
  .cd-tl-sub   { font-size:12px; color:var(--text-2); margin-top:2px; }
  .cd-tl-date  { font-size:11px; color:var(--text-3); margin-top:3px; }

  /* notes card */
  .cd-notes-card { background:var(--surface); border:0.5px solid var(--border); border-radius:var(--r-lg); padding:20px; }
  .cd-notes-head { display:flex; align-items:center; justify-content:space-between; }
  .cd-notes-list { display:flex; flex-direction:column; gap:10px; margin-top:14px; }
  .cd-note-item { background:var(--bg); border-radius:9px; padding:12px 14px; }
  .cd-note-hd   { display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }
  .cd-note-author { font-size:12px; font-weight:600; color:var(--text-1); }
  .cd-note-date   { font-size:11px; color:var(--text-3); }
  .cd-note-text   { font-size:12px; color:var(--text-2); line-height:1.6; }

  /* action buttons */
  .cd-btn { font-family:var(--font); font-size:13px; font-weight:500; border-radius:8px; padding:8px 14px; cursor:pointer; transition:all .15s; border:0.5px solid var(--border-md); background:var(--surface); color:var(--text-1); display:flex; align-items:center; justify-content:center; gap:8px; width:100%; }
  .cd-btn:hover { background:#F1F5F9; }
  .cd-btn-primary { background:var(--accent); color:#fff; border-color:transparent; }
  .cd-btn-primary:hover { background:#1D4ED8; }
  .cd-btn-green { background:var(--green); color:#fff; border-color:transparent; }
  .cd-btn-green:hover { background:#047857; }
  .cd-btn-outline-blue { background:var(--surface); color:var(--accent); border-color:var(--accent); }
  .cd-btn-outline-blue:hover { background:var(--accent-light); }
  .cd-btn-sm { padding:6px 12px; font-size:12px; }
  .cd-btn-danger  { background:var(--red-light);   color:var(--red);   border-color:transparent; }
  .cd-btn-success { background:var(--green-light);  color:var(--green); border-color:transparent; }

  .cd-section-title { font-size:13px; font-weight:600; color:var(--text-1); }

  /* shortlisted panel */
  .cd-shortlist-panel { border-radius:10px; overflow:hidden; border:0.5px solid #BBF7D0; }
  .cd-shortlist-head  { display:flex; align-items:center; gap:8px; padding:10px 14px; background:var(--green-light); border-bottom:0.5px solid #BBF7D0; font-size:13px; font-weight:600; color:#065F46; }
  .cd-shortlist-body  { padding:12px 14px; background:var(--surface); }

  /* rejected panel */
  .cd-reject-panel { border-radius:10px; overflow:hidden; border:0.5px solid #FECACA; }
  .cd-reject-head  { display:flex; align-items:center; gap:8px; padding:10px 14px; background:var(--red-light); border-bottom:0.5px solid #FECACA; font-size:13px; font-weight:600; color:#991B1B; }
  .cd-reject-body  { padding:12px 14px; background:var(--surface); }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   TIMELINE DATA  (same stages as HTML TIMELINE_STAGES)
───────────────────────────────────────────────────────────────────────────── */
const TIMELINE_STAGES = [
  { key: "applied",     label: "Application Received", icon: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></> },
  { key: "screening",   label: "Resume Screened",       icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></> },
  { key: "shortlisted", label: "Shortlisted",           icon: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></> },
  { key: "assessment",  label: "Assessment Sent",       icon: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></> },
  { key: "interview",   label: "Interview Scheduled",   icon: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></> },
  { key: "hired",       label: "Offer Extended",        icon: <><polyline points="20 6 9 17 4 12"/></> },
];

const STATUS_ORDER = ["applied","screening","shortlisted","assessment","assessment_done","interview","hired"];
const STATUS_STAGE_MAP: Record<string, string> = {
  applied: "applied", shortlisted: "shortlisted",
  assessment_pending: "assessment", assessment_done: "assessment",
  interview: "interview", hired: "hired", rejected: "shortlisted",
};

function stageReached(status: string) {
  const cur = STATUS_STAGE_MAP[status] || "applied";
  return (key: string) => STATUS_ORDER.indexOf(key) <= STATUS_ORDER.indexOf(cur);
}

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

function formatDate(str: string): string {
  if (!str) return "—";
  const d = new Date(str);
  return isNaN(d.getTime()) ? str : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function scoreBarColor(s: number): string {
  return s >= 80 ? "#059669" : s >= 60 ? "#D97706" : "#DC2626";
}

function getShortlistReasons(c: Candidate): string[] {
  const reasons: string[] = [];
  const score = c?.ats_score ?? 0;
  if (score >= 85)      reasons.push(`Excellent ATS score of ${score.toFixed(0)}/100 — top 10% of applicants`);
  else if (score >= 70) reasons.push(`Strong ATS score of ${score.toFixed(0)}/100 — meets the shortlist threshold`);
  else if (score >= 60) reasons.push(`Acceptable ATS score of ${score.toFixed(0)}/100 — manually reviewed and approved`);
  if (c?.exam_completed && (c?.exam_percentage ?? 0) >= 70)
    reasons.push(`Passed assessment with ${c.exam_percentage?.toFixed(0)}% — above the 70% pass mark`);
  if (c?.interview_scheduled) reasons.push("Interview scheduled — progressed through all screening stages");
  if (c?.final_status === "Hired") reasons.push("Offer accepted — candidate successfully hired");
  if (!reasons.length) reasons.push("Met minimum qualification criteria set for this job role");
  return reasons;
}

interface RejectionPoint { headline: string; feedback: string[]; isJourney?: boolean; }

function getRejectionPoints(c: Candidate): RejectionPoint[] {
  const points: RejectionPoint[] = [];
  const score = c?.ats_score ?? 0;
  const exam  = c?.exam_percentage ?? 0;

  if (!c?.exam_link_sent) {
    const gap = Math.max(70 - score, 0).toFixed(0);
    points.push({
      headline: score < 60
        ? `Low ATS score: ${score.toFixed(0)}/100 — minimum threshold is 60`
        : `ATS score ${score.toFixed(0)}/100 — below the shortlist cut-off of 70`,
      feedback: [
        `Score is ${gap} points below the shortlist threshold of 70`,
        "Resume keywords and experience don't closely match the job description",
        "Profile filtered out at automated screening before manual review",
      ],
    });
    return points;
  }

  if (score >= 70) points.push({ headline: `Initially shortlisted — ATS score ${score.toFixed(0)}/100 met the threshold`, feedback: [], isJourney: true });
  else if (score >= 60) points.push({ headline: `Initially reviewed — ATS score ${score.toFixed(0)}/100 passed minimum screening`, feedback: [], isJourney: true });

  if (c?.link_expired && !c?.exam_completed) {
    points.push({ headline: "Assessment not completed — invitation link expired", feedback: ["Candidate received the link but did not submit the test","Links have a fixed validity window — once expired they cannot be reused","HR can decide whether to resend the link or close this application"] });
    return points;
  }

  if (c?.exam_completed && exam < 70) {
    const gap = (70 - exam).toFixed(0);
    const severity = exam < 40 ? "Very low score — significant gaps in core skills required for this role"
      : exam < 55 ? "Partial understanding but insufficient depth in key technical areas"
      : `Close to pass mark — ${gap}% short of the required threshold`;
    points.push({ headline: `Failed assessment: scored ${exam.toFixed(0)}% — required pass mark is 70%`, feedback: [`Achieved ${exam.toFixed(0)}% against the 70% pass mark — ${gap}% below the minimum`, severity, "Strong ATS resume score but technical skills not demonstrated at the required level"] });
  }

  if (c?.final_status === "Rejected After Exam") {
    points.push({ headline: "Did not meet post-assessment criteria for the next stage", feedback: ["Overall evaluation after assessment did not clear the bar set for this role","Skills, experience, and assessment result considered together holistically","HR review determined the candidate is not a strong enough fit at this stage"] });
  }

  return points;
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROPS
───────────────────────────────────────────────────────────────────────────── */
interface Props {
  candidate: (Candidate & {
    displayStatus?: string;
    displayScore?: number;
    scoreColor?: string;
    statusInfo?: { label: string; cls: string; color: string; priority: number; icon: React.ElementType };
  }) | null;
  onSendReminder?: (id: string | number) => void;
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
const CandidateDetails: React.FC<Props> = ({ candidate, onSendReminder }) => {
  const router = useRouter();

  if (!candidate) {
    return (
      <div className="cs-detail-empty">
        <svg viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <div className="cs-detail-empty-title">Select a candidate</div>
        <div className="cs-detail-empty-sub">
          Choose a candidate from the list to view their full profile, scores, and recruitment timeline.
        </div>
      </div>
    );
  }

  /* ── Derived values ── */
  const st      = candidate.statusInfo;
  const score   = candidate.ats_score ?? 0;
  const reached = stageReached(candidate.status?.toLowerCase?.() ?? "applied");
  const av      = avatarStyle(candidate.name ?? "");
  const ini     = initials(candidate.name ?? "?");

  const isFinallyRejected =
    candidate.status === "Rejected" ||
    candidate.final_status === "Rejected After Exam" ||
    (candidate.exam_completed && (candidate.exam_percentage ?? 0) < 70) ||
    (candidate.link_expired && !candidate.exam_completed);

  const isShortlisted = !isFinallyRejected && (
    candidate.status === "Shortlisted" ||
    candidate.interview_scheduled ||
    candidate.final_status === "Hired"
  );

  const shortlistReasons = isShortlisted ? getShortlistReasons(candidate) : [];
  const rejectionPoints  = isFinallyRejected ? getRejectionPoints(candidate) : [];

  /* Score breakdown — same formula as HTML version */
  const breakdown = [
    { label: "Technical Skills", val: Math.min(100, Math.round(score * 1.05)) },
    { label: "Communication",    val: Math.min(100, Math.round(score * 0.92)) },
    { label: "Problem Solving",  val: Math.min(100, Math.round(score * 0.98)) },
    { label: "Cultural Fit",     val: Math.min(100, Math.round(score * 0.88)) },
    { label: "Experience Match", val: Math.min(100, Math.round(score * 1.02)) },
  ];

  /* Score ring */
  const radius    = 28;
  const circ      = 2 * Math.PI * radius;
  const dash      = (score / 100) * circ;
  const ringColor = score >= 80 ? "#059669" : score >= 60 ? "#D97706" : "#DC2626";

  /* Skills */
  const skills: string[] = (candidate as any).skills ?? [];

  /* Notes */
  const notes: { author: string; date: string; text: string }[] = (candidate as any).notes ?? [];

  /* Status string for display */
  const statusCls = st?.cls ?? "pill-applied";
  const statusLabel = st?.label ?? "Applied";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DETAIL_CSS }} />
      <div className="cd-content">

        {/* ── Hero card ── */}
        <div className="cd-hero">
          <div className="cd-hero-top">
            {/* Avatar */}
            <div className="cd-hero-avatar" style={av}>{ini}</div>

            {/* Info */}
            <div className="cd-hero-info">
              <div className="cd-hero-name">{candidate.name}</div>
              <div className="cd-hero-role">
                {candidate.job_title || ""}{" · "}{(candidate as any).dept || ""}{" · "}{(candidate as any).location || ""}
              </div>
              <div className="cd-hero-badges">
                <span className={`cs-pill ${statusCls}`}>{statusLabel}</span>
                {(candidate as any).exp && (
                  <span className="cs-pill pill-applied">{(candidate as any).exp} exp</span>
                )}
              </div>
            </div>

            {/* Action buttons (same logic as HTML) */}
            <div className="cd-hero-actions">
              {candidate.status !== "Rejected" && candidate.status !== "Hired" && (
                <>
                  <button className="cd-btn cd-btn-danger cd-btn-sm">Reject</button>
                  <button
                    className="cd-btn cd-btn-success cd-btn-sm"
                    onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}
                  >
                    Schedule Interview
                  </button>
                </>
              )}
              {candidate.status === "Shortlisted" && (
                <button className="cd-btn cd-btn-primary cd-btn-sm">Send Assessment</button>
              )}
            </div>
          </div>

          {/* Info grid */}
          <div className="cd-info-grid">
            <div className="cd-info-item">
              <div className="cd-info-label">Email</div>
              <div className="cd-info-value">
                <a href={`mailto:${candidate.email}`}>{candidate.email || "—"}</a>
              </div>
            </div>
            <div className="cd-info-item">
              <div className="cd-info-label">Phone</div>
              <div className="cd-info-value">{(candidate as any).phone || "—"}</div>
            </div>
            <div className="cd-info-item">
              <div className="cd-info-label">Applied</div>
              <div className="cd-info-value">
                {formatDate(candidate.processed_date ?? (candidate as any).applied ?? "")}
              </div>
            </div>
            <div className="cd-info-item">
              <div className="cd-info-label">Department</div>
              <div className="cd-info-value">{(candidate as any).dept || (candidate as any).department || "—"}</div>
            </div>
            {skills.length > 0 && (
              <div className="cd-info-item" style={{ gridColumn: "1/-1" }}>
                <div className="cd-info-label">Skills</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
                  {skills.map(s => (
                    <span
                      key={s}
                      style={{ fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 20, background: "var(--bg)", border: "0.5px solid var(--border)", color: "var(--text-2)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Why Shortlisted ── */}
        {isShortlisted && (
          <div className="cd-shortlist-panel">
            <div className="cd-shortlist-head">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
              Why Shortlisted
            </div>
            <div className="cd-shortlist-body">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {shortlistReasons.map((r, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#065F46" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}><polyline points="20 6 9 17 4 12"/></svg>
                    {r}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--green)", marginBottom: 4 }}>
                  <span>ATS Score</span>
                  <span style={{ fontWeight: 600 }}>{score.toFixed(0)} / 100</span>
                </div>
                <div style={{ height: 6, background: "var(--green-light)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(score, 100)}%`, background: "var(--green)", borderRadius: 4 }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Why Rejected ── */}
        {isFinallyRejected && (
          <div className="cd-reject-panel">
            <div className="cd-reject-head">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
              Why Rejected
            </div>
            <div className="cd-reject-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {rejectionPoints.map((pt, i) => (
                <div key={i}>
                  {pt.isJourney ? (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 11, color: "var(--text-3)", fontStyle: "italic" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      {pt.headline}
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, fontWeight: 500, color: "#991B1B" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                      {pt.headline}
                    </div>
                  )}
                  {pt.feedback.length > 0 && (
                    <ul style={{ marginTop: 6, marginLeft: 22, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                      {pt.feedback.map((fb, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 11, color: "#B91C1C" }}>
                          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--red)", flexShrink: 0, marginTop: 5 }} />
                          {fb}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <div style={{ paddingTop: 10, borderTop: "0.5px solid #FECACA" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--red)", marginBottom: 4 }}>
                  <span>ATS Score</span>
                  <span style={{ fontWeight: 600 }}>{score.toFixed(0)} / 100</span>
                </div>
                <div style={{ height: 6, background: "var(--red-light)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(score, 100)}%`, background: "#F87171", borderRadius: 4 }} />
                </div>
                <p style={{ fontSize: 11, color: "var(--red)", marginTop: 6 }}>⚠ Minimum required score: 70 / 100</p>
              </div>
            </div>
          </div>
        )}

        {/* ── AI Match Score card ── */}
        <div className="cd-score-card">
          <div className="cd-section-title">AI Match Score</div>
          <div className="cd-score-ring-wrap">
            <div className="cd-score-ring">
              <svg width="70" height="70" viewBox="0 0 70 70">
                <circle cx="35" cy="35" r={radius} fill="none" stroke="var(--bg)" strokeWidth="7"/>
                <circle
                  cx="35" cy="35" r={radius} fill="none"
                  stroke={ringColor} strokeWidth="7"
                  strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="cd-score-ring-num">{score}</div>
            </div>
            <div className="cd-score-ring-info">
              <div className="cd-score-ring-label">Overall match score</div>
              <div className="cd-score-ring-big" style={{ color: ringColor }}>{score}/100</div>
              <div className="cd-score-ring-sub">
                {score >= 80 ? "Strong match" : score >= 60 ? "Good match" : "Weak match"}
              </div>
            </div>
          </div>

          {breakdown.map(b => (
            <div key={b.label} className="cd-score-row">
              <div className="cd-score-lbl">{b.label}</div>
              <div className="cd-score-bar-wrap">
                <div className="cd-score-bar-fill" style={{ width: `${b.val}%`, background: scoreBarColor(b.val) }} />
              </div>
              <div className="cd-score-num">{b.val}</div>
            </div>
          ))}
        </div>

        {/* ── Recruitment Timeline ── */}
        <div className="cd-tl-card">
          <div className="cd-section-title">Recruitment Timeline</div>
          <div className="cd-tl">
            {TIMELINE_STAGES.map(s => {
              const isDone   = reached(s.key) && candidate.status !== "rejected";
              const isActive = !isDone && s.key === (
                (candidate.status === "assessment_pending" || candidate.status?.toLowerCase() === "assessment_pending")
                  ? "assessment" : (candidate.status?.toLowerCase() ?? "applied")
              );
              const dotCls = isDone ? "done" : isActive ? "active" : "pending";
              return (
                <div key={s.key} className="cd-tl-item">
                  <div className={`cd-tl-dot ${dotCls}`}>
                    <svg viewBox="0 0 24 24">{s.icon}</svg>
                  </div>
                  <div className="cd-tl-body">
                    <div className="cd-tl-title">{s.label}</div>
                    <div className="cd-tl-sub">{isDone ? "Completed" : isActive ? "In progress" : "Pending"}</div>
                    {isDone && (
                      <div className="cd-tl-date">
                        {formatDate(candidate.processed_date ?? (candidate as any).applied ?? "")}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Notes & Feedback ── */}
        <div className="cd-notes-card">
          <div className="cd-notes-head">
            <span className="cd-section-title">Notes &amp; Feedback</span>
            <button className="cd-btn cd-btn-sm" style={{ width: "auto" }}>+ Add Note</button>
          </div>
          <div className="cd-notes-list">
            {notes.length === 0 ? (
              <div style={{ fontSize: 12, color: "var(--text-3)", textAlign: "center", padding: "16px 0" }}>
                No notes yet
              </div>
            ) : (
              notes.map((n, i) => (
                <div key={i} className="cd-note-item">
                  <div className="cd-note-hd">
                    <span className="cd-note-author">{n.author}</span>
                    <span className="cd-note-date">{n.date}</span>
                  </div>
                  <div className="cd-note-text">{n.text}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Actions ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {candidate.resume_path && (
            <button className="cd-btn">
              <Download size={15} />
              Download Resume
            </button>
          )}
          {candidate.exam_link_sent && !candidate.exam_completed && !candidate.link_expired && onSendReminder && (
            <button className="cd-btn cd-btn-outline-blue" onClick={() => onSendReminder(candidate.id)}>
              <Send size={15} />
              Send Assessment Reminder
            </button>
          )}
          {candidate.exam_completed && (candidate.exam_percentage ?? 0) >= 70 && !candidate.interview_scheduled && (
            <button className="cd-btn cd-btn-green" onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}>
              <Calendar size={15} />
              Schedule Interview
            </button>
          )}
          <button className="cd-btn cd-btn-primary" onClick={() => router.push(`/candidates/${candidate.id}`)}>
            <Eye size={15} />
            View Full Profile
          </button>
        </div>

        {/* ── Additional Info ── */}
        <div style={{ paddingTop: 16, borderTop: "0.5px solid var(--border)" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-1)", marginBottom: 12 }}>Additional Information</p>
          {[
            { label: "Job ID",        value: candidate.job_id },
            { label: "Candidate ID",  value: candidate.id },
            { label: "Initial Status",value: candidate.status },
          ].filter(r => r.value).map(r => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "7px 0", borderBottom: "0.5px solid var(--border)" }}>
              <span style={{ color: "var(--text-2)" }}>{r.label}</span>
              <span style={{ fontWeight: 500 }}>{r.value}</span>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default React.memo(CandidateDetails);