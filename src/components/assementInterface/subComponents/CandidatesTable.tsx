// // // // import React from "react";
// // // // import { Award, CheckCircle, XCircle, AlertCircle, Send, Calendar, ExternalLink } from "lucide-react";
// // // // import { useRouter } from "next/navigation";
// // // // // import { useNavigate } from "react-router-dom";

// // // // interface CandidatesTableProps {
// // // //   candidates: any[];
// // // //   activeTab: string;
// // // //   selectedJob: any;
// // // // }

// // // // const CandidatesTable: React.FC<CandidatesTableProps> = ({ candidates, activeTab }) => {
// // // //   const router = useRouter();

// // // //   const getStatusDisplay = (candidate: any) => {
// // // //     if (candidate.exam_completed) {
// // // //       const passed = candidate.exam_percentage >= 70;
// // // //       return {
// // // //         text: passed ? "Passed" : "Failed",
// // // //         color: passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
// // // //         icon: passed ? CheckCircle : XCircle,
// // // //       };
// // // //     }
// // // //     if (candidate.link_expired) {
// // // //       return { text: "Expired", color: "bg-gray-100 text-gray-800", icon: AlertCircle };
// // // //     }
// // // //     if (candidate.exam_started) {
// // // //       return { text: "In Progress", color: "bg-blue-100 text-blue-800", icon: AlertCircle };
// // // //     }
// // // //     if (candidate.exam_link_sent) {
// // // //       return { text: "Sent", color: "bg-yellow-100 text-yellow-800", icon: Send };
// // // //     }
// // // //     return { text: "Not Sent", color: "bg-gray-100 text-gray-800", icon: AlertCircle };
// // // //   };

// // // //   const getTimeRemaining = (candidate: any) => {
// // // //     if (!candidate.exam_link_sent_date || candidate.exam_completed || candidate.link_expired) return null;
// // // //     const sentDate = new Date(candidate.exam_link_sent_date);
// // // //     const expiryDate = new Date(sentDate.getTime() + 48 * 60 * 60 * 1000);
// // // //     const now = new Date();
// // // //     const hoursRemaining = Math.max(0, Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60)));
// // // //     if (hoursRemaining <= 0) return "Expired";
// // // //     if (hoursRemaining <= 6) return `${hoursRemaining}h remaining`;
// // // //     if (hoursRemaining <= 24) return `${hoursRemaining}h remaining`;
// // // //     return `${Math.floor(hoursRemaining / 24)}d remaining`;
// // // //   };

// // // //   const filteredCandidates = candidates.filter((candidate) => {
// // // //     switch (activeTab) {
// // // //       case "pending":
// // // //         return candidate.exam_link_sent && !candidate.exam_completed && !candidate.link_expired;
// // // //       case "completed":
// // // //         return candidate.exam_completed;
// // // //       case "expired":
// // // //         return candidate.exam_link_sent && !candidate.exam_completed && candidate.link_expired;
// // // //       case "not_sent":
// // // //         return candidate.status === "Shortlisted" && !candidate.exam_link_sent;
// // // //       default:
// // // //         return false;
// // // //     }
// // // //   });

// // // //   return (
// // // //     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// // // //       <div className="overflow-x-auto">
// // // //         <table className="min-w-full divide-y divide-gray-200">
// // // //           <thead className="bg-gray-50">
// // // //             <tr>
// // // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
// // // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
// // // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ATS Score</th>
// // // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent Date</th>
// // // //               {activeTab === "completed" && (
// // // //                 <>
// // // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// // // //                     Assessment Score
// // // //                   </th>
// // // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Taken</th>
// // // //                 </>
// // // //               )}
// // // //               {activeTab === "pending" && (
// // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Remaining</th>
// // // //               )}
// // // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
// // // //             </tr>
// // // //           </thead>

// // // //           <tbody className="bg-white divide-y divide-gray-200">
// // // //             {filteredCandidates.length === 0 ? (
// // // //               <tr>
// // // //                 <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
// // // //                   <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// // // //                   <p className="text-lg font-medium">No candidates found</p>
// // // //                 </td>
// // // //               </tr>
// // // //             ) : (
// // // //               filteredCandidates.map((candidate) => {
// // // //                 const status = getStatusDisplay(candidate);
// // // //                 const StatusIcon = status.icon;
// // // //                 const timeRemaining = getTimeRemaining(candidate);

// // // //                 return (
// // // //                   <tr key={candidate.id} className="hover:bg-gray-50">
// // // //                     <td className="px-6 py-4">
// // // //                       <div>
// // // //                         <p className="font-medium text-gray-900">{candidate.name}</p>
// // // //                         <p className="text-sm text-gray-500">{candidate.email}</p>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // //                       <span
// // // //                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
// // // //                       >
// // // //                         <StatusIcon className="w-3 h-3 mr-1" />
// // // //                         {status.text}
// // // //                       </span>
// // // //                     </td>
// // // //                     <td className="px-6 py-4 text-sm">
// // // //                       <span
// // // //                         className={`font-medium ${
// // // //                           candidate.ats_score >= 70 ? "text-green-600" : "text-red-600"
// // // //                         }`}
// // // //                       >
// // // //                         {candidate.ats_score?.toFixed(0)}%
// // // //                       </span>
// // // //                     </td>
// // // //                     <td className="px-6 py-4 text-sm text-gray-500">
// // // //                       {candidate.exam_link_sent_date
// // // //                         ? new Date(candidate.exam_link_sent_date).toLocaleDateString()
// // // //                         : "—"}
// // // //                     </td>
// // // //                     {activeTab === "completed" && (
// // // //                       <>
// // // //                         <td className="px-6 py-4 text-sm">
// // // //                           <span
// // // //                             className={`font-medium ${
// // // //                               candidate.exam_percentage >= 70 ? "text-green-600" : "text-red-600"
// // // //                             }`}
// // // //                           >
// // // //                             {candidate.exam_percentage?.toFixed(0)}%
// // // //                           </span>
// // // //                         </td>
// // // //                         <td className="px-6 py-4 text-sm text-gray-500">
// // // //                           {candidate.exam_time_taken ? `${candidate.exam_time_taken}m` : "—"}
// // // //                         </td>
// // // //                       </>
// // // //                     )}
// // // //                     {activeTab === "pending" && (
// // // //                       <td className="px-6 py-4 text-sm">
// // // //                         {timeRemaining && (
// // // //                           <span
// // // //                             className={`${
// // // //                               timeRemaining.includes("h") && parseInt(timeRemaining) <= 6
// // // //                                 ? "text-red-600 font-medium"
// // // //                                 : "text-gray-500"
// // // //                             }`}
// // // //                           >
// // // //                             {timeRemaining}
// // // //                           </span>
// // // //                         )}
// // // //                       </td>
// // // //                     )}
// // // //                     <td className="px-6 py-4 text-sm">
// // // //                       <div className="flex items-center space-x-2">
// // // //                         {candidate.assessment_invite_link && (
// // // //                           <a
// // // //                             href={candidate.assessment_invite_link}
// // // //                             target="_blank"
// // // //                             rel="noopener noreferrer"
// // // //                             className="text-blue-600 hover:text-blue-900"
// // // //                           >
// // // //                             <ExternalLink className="w-4 h-4" />
// // // //                           </a>
// // // //                         )}
// // // //                         {candidate.exam_completed && candidate.exam_percentage >= 70 && !candidate.interview_scheduled && (
// // // //                           <button
// // // //                             onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}
// // // //                             className="text-green-600 hover:text-green-900"
// // // //                             title="Schedule Interview"
// // // //                           >
// // // //                             <Calendar className="w-4 h-4" />
// // // //                           </button>
// // // //                         )}
// // // //                       </div>
// // // //                     </td>
// // // //                   </tr>
// // // //                 );
// // // //               })
// // // //             )}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CandidatesTable; 

// // // import React from "react";
// // // import { Award, CheckCircle, XCircle, AlertCircle, Send, Calendar, ExternalLink } from "lucide-react";
// // // import { useRouter } from "next/navigation";
// // // import type { Candidate, Job } from "@/services/interfaces/CandidateScreening";

// // // // Define the CandidatesTableProps interface with proper types
// // // interface CandidatesTableProps {
// // //   candidates: Candidate[];
// // //   activeTab: string;
// // //   selectedJob: Job | null;  // This is assuming selectedJob is of type Job, or null if no job is selected
// // // }

// // // const CandidatesTable: React.FC<CandidatesTableProps> = ({ candidates, activeTab }) => {
// // //   const router = useRouter();

// // //   // Helper function to get the candidate's status display
// // //   const getStatusDisplay = (candidate: Candidate) => {
// // //     if (candidate.exam_completed) {
// // //       const passed = (candidate.exam_percentage ?? 0) >= 70;
// // //       return {
// // //         text: passed ? "Passed" : "Failed",
// // //         color: passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
// // //         icon: passed ? CheckCircle : XCircle,
// // //       };
// // //     }
// // //     if (candidate.link_expired) {
// // //       return { text: "Expired", color: "bg-gray-100 text-gray-800", icon: AlertCircle };
// // //     }
// // //     if (candidate.exam_started) {
// // //       return { text: "In Progress", color: "bg-blue-100 text-blue-800", icon: AlertCircle };
// // //     }
// // //     if (candidate.exam_link_sent) {
// // //       return { text: "Sent", color: "bg-yellow-100 text-yellow-800", icon: Send };
// // //     }
// // //     return { text: "Not Sent", color: "bg-gray-100 text-gray-800", icon: AlertCircle };
// // //   };

// // //   // Helper function to calculate the time remaining for a candidate's exam
// // //   const getTimeRemaining = (candidate: Candidate) => {
// // //     if (!candidate.exam_link_sent_date || candidate.exam_completed || candidate.link_expired) return null;
// // //     const sentDate = new Date(candidate.exam_link_sent_date);
// // //     const expiryDate = new Date(sentDate.getTime() + 48 * 60 * 60 * 1000);  // Adding 48 hours
// // //     const now = new Date();
// // //     const hoursRemaining = Math.max(0, Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60)));
// // //     if (hoursRemaining <= 0) return "Expired";
// // //     if (hoursRemaining <= 6) return `${hoursRemaining}h remaining`;
// // //     if (hoursRemaining <= 24) return `${hoursRemaining}h remaining`;
// // //     return `${Math.floor(hoursRemaining / 24)}d remaining`;
// // //   };

// // //   // Filter candidates based on the selected tab (pending, completed, expired, not_sent)
// // //   const filteredCandidates = candidates.filter((candidate: Candidate) => {
// // //     switch (activeTab) {
// // //       case "pending":
// // //         return candidate.exam_link_sent && !candidate.exam_completed && !candidate.link_expired;
// // //       case "completed":
// // //         return candidate.exam_completed;
// // //       case "expired":
// // //         return candidate.exam_link_sent && !candidate.exam_completed && candidate.link_expired;
// // //       case "not_sent":
// // //         return candidate.status === "Shortlisted" && !candidate.exam_link_sent;
// // //       default:
// // //         return false;
// // //     }
// // //   });

// // //   return (
// // //     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// // //       <div className="overflow-x-auto">
// // //         <table className="min-w-full divide-y divide-gray-200">
// // //           <thead className="bg-gray-50">
// // //             <tr>
// // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
// // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
// // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ATS Score</th>
// // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent Date</th>
// // //               {activeTab === "completed" && (
// // //                 <>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// // //                     Assessment Score
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Taken</th>
// // //                 </>
// // //               )}
// // //               {activeTab === "pending" && (
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Remaining</th>
// // //               )}
// // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody className="bg-white divide-y divide-gray-200">
// // //             {filteredCandidates.length === 0 ? (
// // //               <tr>
// // //                 <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
// // //                   <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// // //                   <p className="text-lg font-medium">No candidates found</p>
// // //                 </td>
// // //               </tr>
// // //             ) : (
// // //               filteredCandidates.map((candidate: Candidate) => {
// // //                 const status = getStatusDisplay(candidate);
// // //                 const StatusIcon = status.icon;
// // //                 const timeRemaining = getTimeRemaining(candidate);

// // //                 return (
// // //                   <tr key={candidate.id} className="hover:bg-gray-50">
// // //                     <td className="px-6 py-4">
// // //                       <div>
// // //                         <p className="font-medium text-gray-900">{candidate.name}</p>
// // //                         <p className="text-sm text-gray-500">{candidate.email}</p>
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <span
// // //                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
// // //                       >
// // //                         <StatusIcon className="w-3 h-3 mr-1" />
// // //                         {status.text}
// // //                       </span>
// // //                     </td>
// // //                     <td className="px-6 py-4 text-sm">
// // //                       <span
// // //                         className={`font-medium ${
// // //                           candidate.exam_percentage && candidate.exam_percentage >= 70 ? "text-green-600" : "text-red-600"
// // //                         }`}
// // //                       >
// // //                         {candidate.ats_score?.toFixed(0)}%
// // //                       </span>
// // //                     </td>
// // //                     <td className="px-6 py-4 text-sm text-gray-500">
// // //                       {candidate.exam_link_sent_date
// // //                         ? new Date(candidate.exam_link_sent_date).toLocaleDateString()
// // //                         : "—"}
// // //                     </td>
// // //                     {activeTab === "completed" && (
// // //                       <>
// // //                         <td className="px-6 py-4 text-sm">
// // //                           <span
// // //                             className={`font-medium ${
// // //                               candidate.exam_percentage && candidate.exam_percentage >= 70 ? "text-green-600" : "text-red-600"
// // //                             }`}
// // //                           >
// // //                             {candidate.exam_percentage?.toFixed(0)}%
// // //                           </span>
// // //                         </td>
// // //                         <td className="px-6 py-4 text-sm text-gray-500">
// // //                           {candidate.exam_time_taken ? `${candidate.exam_time_taken}m` : "—"}
// // //                         </td>
// // //                       </>
// // //                     )}
// // //                     {activeTab === "pending" && (
// // //                       <td className="px-6 py-4 text-sm">
// // //                         {timeRemaining && (
// // //                           <span
// // //                             className={`${
// // //                               timeRemaining.includes("h") && parseInt(timeRemaining) <= 6
// // //                                 ? "text-red-600 font-medium"
// // //                                 : "text-gray-500"
// // //                             }`}
// // //                           >
// // //                             {timeRemaining}
// // //                           </span>
// // //                         )}
// // //                       </td>
// // //                     )}
// // //                     <td className="px-6 py-4 text-sm">
// // //                       <div className="flex items-center space-x-2">
// // //                         {candidate.assessment_invite_link && (
// // //                           <a
// // //                             href={candidate.assessment_invite_link}
// // //                             target="_blank"
// // //                             rel="noopener noreferrer"
// // //                             className="text-blue-600 hover:text-blue-900"
// // //                           >
// // //                             <ExternalLink className="w-4 h-4" />
// // //                           </a>
// // //                         )}
// // //                         {candidate.exam_completed && candidate.exam_percentage != null && candidate.exam_percentage >= 70 && !candidate.interview_scheduled && (
// // //                           <button
// // //                             onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}
// // //                             className="text-green-600 hover:text-green-900"
// // //                             title="Schedule Interview"
// // //                           >
// // //                             <Calendar className="w-4 h-4" />
// // //                           </button>
// // //                         )}
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 );
// // //               })
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CandidatesTable;
// // import React from "react";
// // import { Award, CheckCircle, XCircle, AlertCircle, Send, Calendar, ExternalLink } from "lucide-react";
// // import { useRouter } from "next/navigation";
// // import { Candidate, Job } from "@/services/interfaces/CandidateScreening";

// // interface CandidatesTableProps {
// //   candidates: Candidate[];
// //   activeTab: string;
// //   selectedJob: Job | null;
// // }

// // const getStatusDisplay = (candidate: Candidate) => {
// //   if (candidate.exam_completed) {
// //     const passed = (candidate.exam_percentage ?? 0) >= 70;
// //     return {
// //       text: passed ? "Passed" : "Failed",
// //       color: passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
// //       icon: passed ? CheckCircle : XCircle,
// //     };
// //   }
// //   if (candidate.link_expired)
// //     return { text: "Expired", color: "bg-gray-100 text-gray-800", icon: AlertCircle };
// //   if (candidate.exam_started)
// //     return { text: "In Progress", color: "bg-blue-100 text-blue-800", icon: AlertCircle };
// //   if (candidate.exam_link_sent)
// //     return { text: "Sent", color: "bg-yellow-100 text-yellow-800", icon: Send };
// //   return { text: "Not Sent", color: "bg-gray-100 text-gray-800", icon: AlertCircle };
// // };

// // const getTimeRemaining = (candidate: Candidate): string | null => {
// //   if (!candidate.exam_link_sent_date || candidate.exam_completed || candidate.link_expired)
// //     return null;
// //   const deadline = new Date(candidate.exam_link_sent_date).getTime() + 48 * 60 * 60 * 1000;
// //   const hoursLeft = Math.max(0, Math.floor((deadline - Date.now()) / (1000 * 60 * 60)));
// //   if (hoursLeft <= 0) return "Expired";
// //   if (hoursLeft < 24) return `${hoursLeft}h remaining`;
// //   return `${Math.floor(hoursLeft / 24)}d remaining`;
// // };

// // const CandidatesTable: React.FC<CandidatesTableProps> = ({ candidates, activeTab }) => {
// //   const router = useRouter();

// //   const filtered = candidates.filter((c) => {
// //     switch (activeTab) {
// //       case "pending":
// //         return c.exam_link_sent && !c.exam_completed && !c.link_expired;
// //       case "completed":
// //         return c.exam_completed;
// //       case "expired":
// //         return c.exam_link_sent && !c.exam_completed && c.link_expired;
// //       case "not_sent":
// //         return c.status === "Shortlisted" && !c.exam_link_sent;
// //       default:
// //         return false;
// //     }
// //   });

// //   return (
// //     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// //       <div className="overflow-x-auto">
// //         <table className="min-w-full divide-y divide-gray-200">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Candidate
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Status
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 ATS Score
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Sent Date
// //               </th>

// //               {/* Single domain: Assessment Score only when completed */}
// //               {activeTab === "completed" && (
// //                 <>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Assessment Score
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Time Taken
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Completed
// //                   </th>
// //                 </>
// //               )}

// //               {activeTab === "pending" && (
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Time Remaining
// //                 </th>
// //               )}

// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Actions
// //               </th>
// //             </tr>
// //           </thead>

// //           <tbody className="bg-white divide-y divide-gray-200">
// //             {filtered.length === 0 ? (
// //               <tr>
// //                 <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
// //                   <Award className="w-10 h-10 mx-auto mb-3 text-gray-300" />
// //                   <p className="text-base font-medium">No candidates found</p>
// //                   <p className="text-sm text-gray-400 mt-1">
// //                     No candidates match the <strong>{activeTab}</strong> filter
// //                   </p>
// //                 </td>
// //               </tr>
// //             ) : (
// //               filtered.map((candidate) => {
// //                 const status = getStatusDisplay(candidate);
// //                 const StatusIcon = status.icon;
// //                 const timeRemaining = getTimeRemaining(candidate);
// //                 const atsScore = candidate.ats_score ?? 0;
// //                 const examPct = candidate.exam_percentage ?? 0;

// //                 return (
// //                   <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">

// //                     {/* Candidate */}
// //                     <td className="px-6 py-4">
// //                       <p className="font-medium text-gray-900">{candidate.name}</p>
// //                       <p className="text-sm text-gray-500">{candidate.email}</p>
// //                     </td>

// //                     {/* Status badge */}
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
// //                         <StatusIcon className="w-3 h-3 mr-1" />
// //                         {status.text}
// //                       </span>
// //                     </td>

// //                     {/* ATS Score */}
// //                     <td className="px-6 py-4 text-sm">
// //                       <span className={`font-medium ${atsScore >= 70 ? "text-green-600" : "text-red-600"}`}>
// //                         {atsScore.toFixed(0)}
// //                       </span>
// //                       <span className="text-gray-400">/100</span>
// //                     </td>

// //                     {/* Sent date */}
// //                     <td className="px-6 py-4 text-sm text-gray-500">
// //                       {candidate.exam_link_sent_date
// //                         ? new Date(candidate.exam_link_sent_date).toLocaleDateString()
// //                         : "—"}
// //                     </td>

// //                     {/* Assessment score (completed tab only) — SINGLE DOMAIN */}
// //                     {activeTab === "completed" && (
// //                       <>
// //                         <td className="px-6 py-4 text-sm">
// //                           <span className={`font-semibold ${examPct >= 70 ? "text-green-600" : "text-red-600"}`}>
// //                             {examPct.toFixed(0)}%
// //                           </span>
// //                         </td>
// //                         <td className="px-6 py-4 text-sm text-gray-500">
// //                           {candidate.exam_time_taken ? `${candidate.exam_time_taken}m` : "—"}
// //                         </td>
// //                         <td className="px-6 py-4 text-sm text-gray-500">
// //                           {candidate.exam_completed_date
// //                             ? new Date(candidate.exam_completed_date).toLocaleDateString()
// //                             : "—"}
// //                         </td>
// //                       </>
// //                     )}

// //                     {/* Time remaining (pending tab only) */}
// //                     {activeTab === "pending" && (
// //                       <td className="px-6 py-4 text-sm">
// //                         {timeRemaining ? (
// //                           <span className={
// //                             timeRemaining.includes("h") && parseInt(timeRemaining) <= 6
// //                               ? "text-red-600 font-medium"
// //                               : "text-gray-500"
// //                           }>
// //                             {timeRemaining}
// //                           </span>
// //                         ) : "—"}
// //                       </td>
// //                     )}

// //                     {/* Actions */}
// //                     <td className="px-6 py-4 text-sm">
// //                       <div className="flex items-center gap-3">
// //                         {candidate.assessment_invite_link && (
// //                           <a
// //                             href={candidate.assessment_invite_link}
// //                             target="_blank"
// //                             rel="noopener noreferrer"
// //                             className="text-blue-600 hover:text-blue-800"
// //                             title="View Assessment"
// //                           >
// //                             <ExternalLink className="w-4 h-4" />
// //                           </a>
// //                         )}
// //                         {candidate.exam_completed &&
// //                           examPct >= 70 &&
// //                           !candidate.interview_scheduled && (
// //                             <button
// //                               onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}
// //                               className="text-green-600 hover:text-green-800"
// //                               title="Schedule Interview"
// //                             >
// //                               <Calendar className="w-4 h-4" />
// //                             </button>
// //                           )}
// //                       </div>
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
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React from "react";
// import { Calendar, ExternalLink, Users } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { Candidate, Job } from "@/services/interfaces/CandidateScreening";

// interface CandidatesTableProps {
//   candidates: Candidate[];
//   activeTab: string;
//   selectedJob: Job | null;
//   onSendAssessment?: (id: string | number) => void;
//   onResendAssessment?: (id: string | number) => void;
// }

// // ── Colour helpers ──────────────────────────────────────────────────────────
// const AVATAR_PALETTES = [
//   ["#EFF6FF", "#2563EB"], ["#F0FDF4", "#16A34A"], ["#FFF7ED", "#EA580C"],
//   ["#FAF5FF", "#7C3AED"], ["#F0FDFA", "#0D9488"], ["#FFFBEB", "#D97706"],
// ];
// function avatarColors(name: string): [string, string] {
//   let h = 0;
//   for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
//   return AVATAR_PALETTES[Math.abs(h) % AVATAR_PALETTES.length] as [string, string];
// }
// function initials(name: string) {
//   return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
// }
// function relDate(iso?: string | null) {
//   if (!iso) return "";
//   const diff = Math.round((Date.now() - new Date(iso).getTime()) / 86400000);
//   if (diff === 0) return "Today";
//   if (diff === 1) return "Yesterday";
//   if (diff < 7)  return diff + "d ago";
//   return Math.round(diff / 7) + "w ago";
// }

// // ── Status pill ──────────────────────────────────────────────────────────────
// type PillVariant = "pending" | "sent" | "started" | "done" | "passed" | "failed" | "expired" | "not_sent";
// const PILL: Record<PillVariant, { bg: string; text: string; label: string }> = {
//   pending:  { bg: "#FFFBEB", text: "#D97706", label: "Pending"     },
//   sent:     { bg: "#EFF6FF", text: "#2563EB", label: "Sent"        },
//   started:  { bg: "#F5F3FF", text: "#7C3AED", label: "In Progress" },
//   done:     { bg: "#F0FDFA", text: "#0D9488", label: "Submitted"   },
//   passed:   { bg: "#ECFDF5", text: "#059669", label: "Passed"      },
//   failed:   { bg: "#FEF2F2", text: "#DC2626", label: "Failed"      },
//   expired:  { bg: "#F8FAFC", text: "#64748B", label: "Expired"     },
//   not_sent: { bg: "#F8FAFC", text: "#64748B", label: "Not Sent"    },
// };

// function getVariant(c: Candidate): PillVariant {
//   if (c.exam_completed) return (c.exam_percentage ?? 0) >= 70 ? "passed" : "failed";
//   if (c.link_expired)   return "expired";
//   if (c.exam_started)   return "started";
//   if (c.exam_link_sent) return "sent";
//   return "not_sent";
// }

// function StatusPill({ variant }: { variant: PillVariant }) {
//   const { bg, text, label } = PILL[variant];
//   return (
//     <span
//       className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
//       style={{ background: bg, color: text }}
//     >
//       {label}
//     </span>
//   );
// }

// function ScoreChip({ score }: { score: number | null | undefined }) {
//   if (score == null) return <span className="inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-gray-100 text-gray-400">—</span>;
//   const [bg, text] = score >= 70 ? ["#ECFDF5", "#059669"] : score >= 50 ? ["#FFFBEB", "#D97706"] : ["#FEF2F2", "#DC2626"];
//   return (
//     <span className="inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-lg" style={{ background: bg, color: text }}>
//       {score}
//     </span>
//   );
// }

// // ── Questions pane (static for now) ─────────────────────────────────────────
// const DEMO_QUESTIONS = [
//   { num: 1, text: "Write a Python function to find the second largest element in a list without sorting.", type: "Coding",    marks: 10, time: "8 min" },
//   { num: 2, text: "What is the difference between a shallow copy and a deep copy? Provide examples.",       type: "Theory",    marks: 5,  time: "5 min" },
//   { num: 3, text: "Explain the concept of decorators and demonstrate their use with a practical example.", type: "Coding",    marks: 8,  time: "7 min" },
//   { num: 4, text: "Given a list, return all pairs that sum to a target value. Optimise for O(n) time.",    type: "Algorithm", marks: 12, time: "10 min" },
//   { num: 5, text: "What are Python generators? When would you use them over a list comprehension?",        type: "Theory",    marks: 5,  time: "4 min" },
// ];
// const TYPE_COLORS: Record<string, [string, string]> = {
//   Coding:    ["#EFF6FF", "#2563EB"],
//   Theory:    ["#F0FDF4", "#16A34A"],
//   Algorithm: ["#FAF5FF", "#7C3AED"],
//   SQL:       ["#FFF7ED", "#EA580C"],
// };

// function QuestionsPane() {
//   return (
//     <div className="p-5">
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <p className="text-sm font-semibold text-gray-800">Technical Screening Test</p>
//           <p className="text-xs text-gray-400 mt-0.5">5 questions · 30 min · 40 marks</p>
//         </div>
//         <button className="text-xs font-semibold px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//           Regenerate with AI
//         </button>
//       </div>
//       <div className="space-y-2">
//         {DEMO_QUESTIONS.map(q => {
//           const [bg, fg] = TYPE_COLORS[q.type] ?? ["#F8FAFC", "#64748B"];
//           return (
//             <div key={q.num} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
//               <div className="flex items-start gap-2 mb-1.5">
//                 <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mt-0.5 flex-shrink-0">Q{q.num}</span>
//                 <p className="text-[13px] font-medium text-gray-800 flex-1 leading-snug">{q.text}</p>
//                 <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: bg, color: fg }}>{q.type}</span>
//               </div>
//               <div className="flex gap-3 text-[11px] text-gray-400 ml-5">
//                 <span>{q.marks} marks</span>
//                 <span>{q.time}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ── Main table ───────────────────────────────────────────────────────────────
// const CandidatesTable: React.FC<CandidatesTableProps> = ({
//   candidates, activeTab, onSendAssessment, onResendAssessment,
// }) => {
//   const router = useRouter();

//   if (activeTab === "questions") return <QuestionsPane />;

//   const filtered =
//     activeTab === "all"       ? candidates
//     : activeTab === "pending"  ? candidates.filter(c => c.exam_link_sent && !c.exam_completed && !c.link_expired)
//     : activeTab === "completed"? candidates.filter(c => c.exam_completed)
//     : candidates;

//   if (filtered.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-14 px-6 text-center gap-3">
//         <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
//           <Users className="w-6 h-6 text-blue-500" />
//         </div>
//         <p className="text-[15px] font-semibold text-gray-800">No candidates here</p>
//         <p className="text-sm text-gray-400 max-w-[260px] leading-relaxed">
//           No candidates match the <strong>{activeTab}</strong> filter for this job.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-[13px]">
//         <thead>
//           <tr className="border-b border-gray-100">
//             {["Candidate", "Status", "Score", "Time Taken", "Last Update", "Action"].map(h => (
//               <th key={h} className="px-4 py-2.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.map(c => {
//             const variant  = getVariant(c);
//             const [bg, fg] = avatarColors(c.name ?? "?");
//             return (
//               <tr
//                 key={c.id}
//                 className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
//               >
//                 {/* Candidate */}
//                 <td className="px-4 py-3">
//                   <div className="flex items-center gap-2.5">
//                     <div
//                       className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
//                       style={{ background: bg, color: fg }}
//                     >
//                       {initials(c.name ?? "?")}
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">{c.name}</p>
//                       <p className="text-[11px] text-gray-400">{c.email}</p>
//                     </div>
//                   </div>
//                 </td>

//                 {/* Status */}
//                 <td className="px-4 py-3"><StatusPill variant={variant} /></td>

//                 {/* Score */}
//                 <td className="px-4 py-3"><ScoreChip score={c.ats_score} /></td>

//                 {/* Time taken */}
//                 <td className="px-4 py-3 text-gray-400 text-[12px]">
//                   {(c as any).exam_time_taken ? (c as any).exam_time_taken + "m" : "—"}
//                 </td>

//                 {/* Last update */}
//                 <td className="px-4 py-3 text-gray-400 text-[12px]">
//                   {relDate(c.exam_completed ? (c as any).exam_completed_date : (c as any).exam_link_sent_date)}
//                 </td>

//                 {/* Action */}
//                 <td className="px-4 py-3">
//                   <div className="flex items-center gap-3">
//                     {variant === "not_sent" && onSendAssessment && (
//                       <button
//                         onClick={() => onSendAssessment(c.id)}
//                         className="text-[12px] font-medium text-blue-600 hover:opacity-70 transition-opacity"
//                       >
//                         Send
//                       </button>
//                     )}
//                     {(variant === "sent" || variant === "started") && onResendAssessment && (
//                       <button
//                         onClick={() => onResendAssessment(c.id)}
//                         className="text-[12px] font-medium text-blue-600 hover:opacity-70 transition-opacity"
//                       >
//                         Resend
//                       </button>
//                     )}
//                     {variant === "passed" && !c.interview_scheduled && (
//                       <button
//                         onClick={() => router.push(`/scheduler?candidate_id=${c.id}`)}
//                         className="text-[12px] font-medium text-green-600 hover:opacity-70 transition-opacity flex items-center gap-1"
//                       >
//                         <Calendar className="w-3 h-3" /> Schedule
//                       </button>
//                     )}
//                     {variant === "failed" && (
//                       <button className="text-[12px] font-medium text-red-500 hover:opacity-70 transition-opacity">
//                         Reject
//                       </button>
//                     )}
//                     {c.assessment_invite_link && (
//                       <a
//                         href={c.assessment_invite_link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-gray-400 hover:text-blue-600 transition-colors"
//                       >
//                         <ExternalLink className="w-3.5 h-3.5" />
//                       </a>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CandidatesTable;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Calendar, ExternalLink, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Candidate, Job } from "@/services/interfaces/CandidateScreening";

interface CandidatesTableProps {
  candidates: Candidate[];
  activeTab: string;
  selectedJob: Job | null;
  onSendAssessment?: (id: string | number) => void;
  onResendAssessment?: (id: string | number) => void;
}

// ── Colour helpers ────────────────────────────────────────────────────────────
const AVATAR_PALETTES = [
  ["#EFF6FF", "#2563EB"], ["#F0FDF4", "#16A34A"], ["#FFF7ED", "#EA580C"],
  ["#FAF5FF", "#7C3AED"], ["#F0FDFA", "#0D9488"], ["#FFFBEB", "#D97706"],
];
function avatarColors(name: string): [string, string] {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  return AVATAR_PALETTES[Math.abs(h) % AVATAR_PALETTES.length] as [string, string];
}
function initials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}
function relDate(iso?: string | null) {
  if (!iso) return "";
  const diff = Math.round((Date.now() - new Date(iso).getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return diff + "d ago";
  return Math.round(diff / 7) + "w ago";
}
function fmtDate(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ── Status pill ───────────────────────────────────────────────────────────────
type PillVariant = "pending" | "sent" | "started" | "done" | "passed" | "failed" | "expired" | "not_sent";
const PILL: Record<PillVariant, { bg: string; text: string; label: string }> = {
  pending:  { bg: "#FFFBEB", text: "#D97706", label: "Pending"     },
  sent:     { bg: "#EFF6FF", text: "#2563EB", label: "Sent"        },
  started:  { bg: "#F5F3FF", text: "#7C3AED", label: "In Progress" },
  done:     { bg: "#F0FDFA", text: "#0D9488", label: "Submitted"   },
  passed:   { bg: "#ECFDF5", text: "#059669", label: "Passed"      },
  failed:   { bg: "#FEF2F2", text: "#DC2626", label: "Failed"      },
  expired:  { bg: "#F8FAFC", text: "#64748B", label: "Expired"     },
  not_sent: { bg: "#F8FAFC", text: "#64748B", label: "Not Sent"    },
};

function getVariant(c: Candidate): PillVariant {
  if (c.exam_completed) return (c.exam_percentage ?? 0) >= 70 ? "passed" : "failed";
  if (c.link_expired)   return "expired";
  if (c.exam_started)   return "started";
  if (c.exam_link_sent) return "sent";
  return "not_sent";
}

function StatusPill({ variant }: { variant: PillVariant }) {
  const { bg, text, label } = PILL[variant];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
      style={{ background: bg, color: text }}
    >
      {label}
    </span>
  );
}

function ScoreChip({ score }: { score: number | null | undefined }) {
  if (score == null)
    return <span className="inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-gray-100 text-gray-400">—</span>;
  const [bg, text] =
    score >= 70 ? ["#ECFDF5", "#059669"] : score >= 50 ? ["#FFFBEB", "#D97706"] : ["#FEF2F2", "#DC2626"];
  return (
    <span className="inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-lg" style={{ background: bg, color: text }}>
      {score}
    </span>
  );
}

// ── Result Modal ──────────────────────────────────────────────────────────────
// Matches the HTML version exactly: backdrop blur, rounded-2xl modal,
// labelled rows, close button, Schedule Interview action when passed.
const ResultModal: React.FC<{ candidate: Candidate; onClose: () => void }> = ({ candidate, onClose }) => {
  const router  = useRouter();
  const variant = getVariant(candidate);
  const pill    = PILL[variant];
  const passed  = variant === "passed";
  const examPct = candidate.exam_percentage ?? null;

  // result label
  const resultLabel = passed
    ? <span style={{ color: "#059669", fontWeight: 600 }}>Pass</span>
    : variant === "failed"
    ? <span style={{ color: "#DC2626", fontWeight: 600 }}>Fail</span>
    : <span style={{ color: "#94A3B8" }}>—</span>;

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    /* ── Backdrop ── */
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.4)" }}
    >
      {/* ── Modal ── */}
      <div
        className="bg-white w-full max-w-[520px] rounded-2xl overflow-hidden"
        style={{ border: "0.5px solid rgba(0,0,0,0.1)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}
        >
          <h2 className="text-[15px] font-semibold text-gray-900">
            {candidate.name} — Assessment Result
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
            style={{ border: "0.5px solid rgba(0,0,0,0.1)" }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body — rows */}
        <div className="px-6 py-2">
          {[
            {
              label: "Status",
              value: (
                <span
                  className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                  style={{ background: pill.bg, color: pill.text }}
                >
                  {pill.label}
                </span>
              ),
            },
            {
              label: "Score",
              value: <ScoreChip score={candidate.ats_score} />,
            },
            {
              label: "Time Taken",
              value: (
                <span className="text-[13px] font-semibold text-gray-900">
                  {(candidate as any).exam_time_taken ? `${(candidate as any).exam_time_taken} minutes` : "—"}
                </span>
              ),
            },
            {
              label: "Sent On",
              value: (
                <span className="text-[13px] font-semibold text-gray-900">
                  {fmtDate((candidate as any).exam_link_sent_date)}
                </span>
              ),
            },
            {
              label: "Completed On",
              value: (
                <span className="text-[13px] font-semibold text-gray-900">
                  {fmtDate((candidate as any).exam_completed_date)}
                </span>
              ),
            },
            {
              label: "Pass Threshold",
              value: <span className="text-[13px] font-semibold text-gray-900">70%</span>,
            },
            {
              label: "Assessment Score",
              value: (
                <span
                  className="text-[13px] font-semibold"
                  style={{ color: examPct != null ? (examPct >= 70 ? "#059669" : "#DC2626") : "#94A3B8" }}
                >
                  {examPct != null ? `${examPct.toFixed(0)}%` : "—"}
                </span>
              ),
            },
            {
              label: "Result",
              value: <span className="text-[13px]">{resultLabel}</span>,
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between py-3"
              style={{ borderBottom: "0.5px solid rgba(0,0,0,0.06)" }}
            >
              <span className="text-[13px] text-gray-500">{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 px-6 py-4"
          style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors"
            style={{ border: "0.5px solid rgba(0,0,0,0.12)" }}
          >
            Close
          </button>

          {/* Only show when candidate passed and interview not yet scheduled */}
          {passed && !candidate.interview_scheduled && (
            <button
              onClick={() => {
                onClose();
                router.push(`/scheduler?candidate_id=${candidate.id}`);
              }}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule Interview →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Questions pane ────────────────────────────────────────────────────────────
const DEMO_QUESTIONS = [
  { num: 1, text: "Write a Python function to find the second largest element in a list without sorting.", type: "Coding",    marks: 10, time: "8 min" },
  { num: 2, text: "What is the difference between a shallow copy and a deep copy? Provide examples.",       type: "Theory",    marks: 5,  time: "5 min" },
  { num: 3, text: "Explain the concept of decorators and demonstrate their use with a practical example.", type: "Coding",    marks: 8,  time: "7 min" },
  { num: 4, text: "Given a list, return all pairs that sum to a target value. Optimise for O(n) time.",    type: "Algorithm", marks: 12, time: "10 min" },
  { num: 5, text: "What are Python generators? When would you use them over a list comprehension?",        type: "Theory",    marks: 5,  time: "4 min" },
];
const TYPE_COLORS: Record<string, [string, string]> = {
  Coding:    ["#EFF6FF", "#2563EB"],
  Theory:    ["#F0FDF4", "#16A34A"],
  Algorithm: ["#FAF5FF", "#7C3AED"],
  SQL:       ["#FFF7ED", "#EA580C"],
};

function QuestionsPane() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-800">Technical Screening Test</p>
          <p className="text-xs text-gray-400 mt-0.5">5 questions · 30 min · 40 marks</p>
        </div>
        <button className="text-xs font-semibold px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Regenerate with AI
        </button>
      </div>
      <div className="space-y-2">
        {DEMO_QUESTIONS.map(q => {
          const [bg, fg] = TYPE_COLORS[q.type] ?? ["#F8FAFC", "#64748B"];
          return (
            <div key={q.num} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
              <div className="flex items-start gap-2 mb-1.5">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mt-0.5 flex-shrink-0">
                  Q{q.num}
                </span>
                <p className="text-[13px] font-medium text-gray-800 flex-1 leading-snug">{q.text}</p>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: bg, color: fg }}
                >
                  {q.type}
                </span>
              </div>
              <div className="flex gap-3 text-[11px] text-gray-400 ml-5">
                <span>{q.marks} marks</span>
                <span>{q.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
const CandidatesTable: React.FC<CandidatesTableProps> = ({
  candidates,
  activeTab,
  onSendAssessment,
  onResendAssessment,
}) => {
  const router = useRouter();

  // ── Modal state — which candidate row was clicked ──────────────────────────
  const [modalCandidate, setModalCandidate] = useState<Candidate | null>(null);

  if (activeTab === "questions") return <QuestionsPane />;

  const filtered =
    activeTab === "all"
      ? candidates
      : activeTab === "pending"
      ? candidates.filter(c => c.exam_link_sent && !c.exam_completed && !c.link_expired)
      : activeTab === "completed"
      ? candidates.filter(c => c.exam_completed)
      : candidates;

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 px-6 text-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
          <Users className="w-6 h-6 text-blue-500" />
        </div>
        <p className="text-[15px] font-semibold text-gray-800">No candidates here</p>
        <p className="text-sm text-gray-400 max-w-[260px] leading-relaxed">
          No candidates match the <strong>{activeTab}</strong> filter for this job.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-100">
              {["Candidate", "Status", "Score", "Time Taken", "Last Update", "Action"].map(h => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const variant  = getVariant(c);
              const [bg, fg] = avatarColors(c.name ?? "?");

              return (
                <tr
                  key={c.id}
                  /* ✅ clicking the row opens the result modal */
                  onClick={() => setModalCandidate(c)}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {/* Candidate */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                        style={{ background: bg, color: fg }}
                      >
                        {initials(c.name ?? "?")}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{c.name}</p>
                        <p className="text-[11px] text-gray-400">{c.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <StatusPill variant={variant} />
                  </td>

                  {/* ATS Score chip */}
                  <td className="px-4 py-3">
                    <ScoreChip score={c.ats_score} />
                  </td>

                  {/* Time taken */}
                  <td className="px-4 py-3 text-gray-400 text-[12px]">
                    {(c as any).exam_time_taken ? `${(c as any).exam_time_taken}m` : "—"}
                  </td>

                  {/* Last update */}
                  <td className="px-4 py-3 text-gray-400 text-[12px]">
                    {relDate(
                      c.exam_completed
                        ? (c as any).exam_completed_date
                        : (c as any).exam_link_sent_date
                    )}
                  </td>

                  {/* Action buttons — stopPropagation so they don't also open the modal */}
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-3">
                      {variant === "not_sent" && onSendAssessment && (
                        <button
                          onClick={() => onSendAssessment(c.id)}
                          className="text-[12px] font-medium text-blue-600 hover:opacity-70 transition-opacity"
                        >
                          Send
                        </button>
                      )}
                      {(variant === "sent" || variant === "started") && onResendAssessment && (
                        <button
                          onClick={() => onResendAssessment(c.id)}
                          className="text-[12px] font-medium text-blue-600 hover:opacity-70 transition-opacity"
                        >
                          Resend
                        </button>
                      )}
                      {variant === "passed" && !c.interview_scheduled && (
                        <button
                          onClick={() => router.push(`/scheduler?candidate_id=${c.id}`)}
                          className="text-[12px] font-medium text-green-600 hover:opacity-70 transition-opacity flex items-center gap-1"
                        >
                          <Calendar className="w-3 h-3" />
                          Schedule Interview
                        </button>
                      )}
                      {variant === "failed" && (
                        <button className="text-[12px] font-medium text-red-500 hover:opacity-70 transition-opacity">
                          Reject
                        </button>
                      )}
                      {c.assessment_invite_link && (
                        <a
                          href={c.assessment_invite_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ✅ Result Modal — renders when a row is clicked */}
      {modalCandidate && (
        <ResultModal
          candidate={modalCandidate}
          onClose={() => setModalCandidate(null)}
        />
      )}
    </>
  );
};

export default CandidatesTable;