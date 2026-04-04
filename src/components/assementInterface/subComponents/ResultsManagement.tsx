// // // import React, { useState } from "react";
// // // import {
// // //   RefreshCw,
// // //   Download,
// // //   AlertCircle,
// // //   CheckCircle,
// // //   Clock,
// // //   Eye,
// // //   Target,
// // //   TrendingUp,
// // //   Users,
// // //   Settings,
// // // } from "lucide-react";

// // // interface ResultsManagementProps {
// // //   selectedJob: any;
// // //   candidates: any[];
// // //   onRefreshCandidates: () => void;
// // // }

// // // const ResultsManagement: React.FC<ResultsManagementProps> = ({
// // //   selectedJob,
// // //   candidates,
// // //   onRefreshCandidates,
// // // }) => {
// // //   const [scrapingStatus, setScrapingStatus] = useState("");
// // //   const [isScrapingLoading, setIsScrapingLoading] = useState(false);
// // //   const [showManualProcessModal, setShowManualProcessModal] = useState(false);
// // //   const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
// // //   const [automationSettings, setAutomationSettings] = useState({
// // //     enabled: false,
// // //     checkInterval: 30,
// // //     autoProcess: true,
// // //   });

// // //   // --- Pure logic only, no API calls ---

// // //   const getPendingAssessments = () =>
// // //     candidates.filter(
// // //       (c) =>
// // //         c.exam_link_sent &&
// // //         !c.exam_completed &&
// // //         !c.link_expired &&
// // //         c.assessment_invite_link
// // //     );

// // //   const getRecentCompletions = () =>
// // //     candidates
// // //       .filter((c) => c.exam_completed)
// // //       .sort(
// // //         (a, b) =>
// // //           new Date(b.exam_completed_date).getTime() -
// // //           new Date(a.exam_completed_date).getTime()
// // //       )
// // //       .slice(0, 5);

// // //   const getAssessmentMetrics = () => {
// // //     const pending = getPendingAssessments();
// // //     const completed = candidates.filter((c) => c.exam_completed);
// // //     const passed = completed.filter((c) => c.exam_percentage >= 70);
// // //     const avgScore =
// // //       completed.length > 0
// // //         ? (
// // //             completed.reduce((sum, c) => sum + (c.exam_percentage || 0), 0) /
// // //             completed.length
// // //           ).toFixed(1)
// // //         : 0;

// // //     return {
// // //       pending: pending.length,
// // //       completed: completed.length,
// // //       passed: passed.length,
// // //       passRate:
// // //         completed.length > 0
// // //           ? ((passed.length / completed.length) * 100).toFixed(1)
// // //           : 0,
// // //       avgScore,
// // //     };
// // //   };

// // //   // Placeholder for backend triggers — now just simulate UI response
// // //   const handleScrapeAssessment = (assessmentName: string) => {
// // //     if (!assessmentName) {
// // //       setScrapingStatus("❌ Please select a job first");
// // //       return;
// // //     }
// // //     setIsScrapingLoading(true);
// // //     setScrapingStatus(`🔍 Checking results for "${assessmentName}"...`);

// // //     setTimeout(() => {
// // //       setScrapingStatus("✅ Results check simulated successfully!");
// // //       setIsScrapingLoading(false);
// // //       setTimeout(() => setScrapingStatus(""), 4000);
// // //     }, 1500);
// // //   };

// // //   const handleScrapeAllPending = () => {
// // //     setIsScrapingLoading(true);
// // //     setScrapingStatus("🔍 Checking all pending assessments...");
// // //     setTimeout(() => {
// // //       setScrapingStatus("✅ Simulated: All pending results updated!");
// // //       setIsScrapingLoading(false);
// // //       setTimeout(() => setScrapingStatus(""), 4000);
// // //     }, 2000);
// // //   };

// // //   const handleManualProcess = (candidateEmail: string, score: string, total: string) => {
// // //     setScrapingStatus(`✅ Manually processed ${candidateEmail} (${score}/${total})`);
// // //     onRefreshCandidates();
// // //     setShowManualProcessModal(false);
// // //     setTimeout(() => setScrapingStatus(""), 4000);
// // //   };

// // //   const metrics = getAssessmentMetrics();
// // //   const pendingAssessments = getPendingAssessments();
// // //   const recentCompletions = getRecentCompletions();

// // //   // --- Manual Process Modal ---
// // //   const ManualProcessModal = () => {
// // //     const [score, setScore] = useState("");
// // //     const [totalQuestions, setTotalQuestions] = useState("100");

// // //     const handleSubmit = (e: React.FormEvent) => {
// // //       e.preventDefault();
// // //       handleManualProcess(selectedCandidate.email, score, totalQuestions);
// // //     };

// // //     return (
// // //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //         <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
// // //           <h3 className="text-lg font-semibold mb-4">
// // //             Manual Process: {selectedCandidate?.name}
// // //           </h3>
// // //           <form onSubmit={handleSubmit}>
// // //             <div className="mb-4">
// // //               <label className="block text-sm font-medium mb-2">
// // //                 Score (correct answers)
// // //               </label>
// // //               <input
// // //                 type="number"
// // //                 value={score}
// // //                 onChange={(e) => setScore(e.target.value)}
// // //                 className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 required
// // //               />
// // //             </div>
// // //             <div className="mb-4">
// // //               <label className="block text-sm font-medium mb-2">
// // //                 Total Questions
// // //               </label>
// // //               <input
// // //                 type="number"
// // //                 value={totalQuestions}
// // //                 onChange={(e) => setTotalQuestions(e.target.value)}
// // //                 className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 required
// // //               />
// // //             </div>
// // //             <div className="mb-4 p-3 bg-gray-50 rounded">
// // //               <p className="text-sm text-gray-600">
// // //                 <strong>Percentage:</strong>{" "}
// // //                 {score && totalQuestions
// // //                   ? ((+score / +totalQuestions) * 100).toFixed(1)
// // //                   : 0}
// // //                 %
// // //               </p>
// // //               <p className="text-xs text-gray-500 mt-1">
// // //                 Candidates scoring ≥70% will be scheduled for interviews
// // //               </p>
// // //             </div>
// // //             <div className="flex gap-2">
// // //               <button
// // //                 type="submit"
// // //                 className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // //               >
// // //                 Process Result
// // //               </button>
// // //               <button
// // //                 type="button"
// // //                 onClick={() => setShowManualProcessModal(false)}
// // //                 className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
// // //               >
// // //                 Cancel
// // //               </button>
// // //             </div>
// // //           </form>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div className="space-y-6">
// // //       {/* Status message */}
// // //       {scrapingStatus && (
// // //         <div
// // //           className={`p-4 rounded-lg border flex items-center ${
// // //             scrapingStatus.includes("❌")
// // //               ? "bg-red-50 border-red-200 text-red-700"
// // //               : scrapingStatus.includes("✅")
// // //               ? "bg-green-50 border-green-200 text-green-700"
// // //               : "bg-blue-50 border-blue-200 text-blue-700"
// // //           }`}
// // //         >
// // //           <div className="flex items-center">
// // //             {scrapingStatus.includes("🔍") && (
// // //               <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
// // //             )}
// // //             {scrapingStatus.includes("✅") && (
// // //               <CheckCircle className="w-5 h-5 mr-2" />
// // //             )}
// // //             {scrapingStatus.includes("❌") && (
// // //               <AlertCircle className="w-5 h-5 mr-2" />
// // //             )}
// // //             <span>{scrapingStatus}</span>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Quick Stats */}
// // //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // //         {[
// // //           { label: "Pending Results", value: metrics.pending, color: "orange", icon: Clock },
// // //           { label: "Completed", value: metrics.completed, color: "green", icon: CheckCircle },
// // //           { label: "Pass Rate", value: `${metrics.passRate}%`, color: "blue", icon: Target },
// // //           { label: "Avg Score", value: `${metrics.avgScore}%`, color: "purple", icon: TrendingUp },
// // //         ].map((stat, i) => {
// // //           const Icon = stat.icon;
// // //           return (
// // //             <div key={i} className="bg-white p-4 rounded-lg shadow-sm border text-gray-600">
// // //               <div className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="text-sm text-gray-600">{stat.label}</p>
// // //                   <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
// // //                 </div>
// // //                 <Icon className={`w-8 h-8 text-${stat.color}-600`} />
// // //               </div>
// // //             </div>
// // //           );
// // //         })}
// // //       </div>

// // //       {/* Main Actions */}
// // //       <div className="bg-white rounded-lg shadow-sm border p-6">
// // //         <div className="flex items-center justify-between mb-4">
// // //           <h3 className="text-lg font-semibold text-gray-600">Results Management</h3>
// // //           <div className="flex items-center space-x-3">
// // //             <button
// // //               onClick={() => selectedJob && handleScrapeAssessment(selectedJob.title)}
// // //               disabled={!selectedJob || isScrapingLoading}
// // //               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
// // //             >
// // //               <Eye className="w-4 h-4 mr-2" />
// // //               {isScrapingLoading ? "Checking..." : "Check Results"}
// // //             </button>
// // //             <button
// // //               onClick={handleScrapeAllPending}
// // //               disabled={isScrapingLoading || pendingAssessments.length === 0}
// // //               className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
// // //             >
// // //               <RefreshCw className={`w-4 h-4 mr-2 ${isScrapingLoading ? "animate-spin" : ""}`} />
// // //               Check All Pending
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {!selectedJob ? (
// // //           <div className="text-center py-8 text-gray-500">
// // //             <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// // //             <p>Select a job position to manage assessment results</p>
// // //           </div>
// // //         ) : (
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //             {/* Pending assessments */}
// // //             <div>
// // //               <h4 className="font-medium mb-3">
// // //                 Pending Assessments ({pendingAssessments.length})
// // //               </h4>
// // //               <div className="space-y-3 max-h-64 overflow-y-auto">
// // //                 {pendingAssessments.length === 0 ? (
// // //                   <p className="text-gray-500 text-sm">No pending assessments</p>
// // //                 ) : (
// // //                   pendingAssessments.map((c) => (
// // //                     <div key={c.id} className="border rounded p-3">
// // //                       <div className="flex justify-between items-start">
// // //                         <div>
// // //                           <p className="font-medium">{c.name}</p>
// // //                           <p className="text-sm text-gray-500">{c.email}</p>
// // //                           <p className="text-xs text-gray-400">
// // //                             Sent:{" "}
// // //                             {c.exam_link_sent_date
// // //                               ? new Date(c.exam_link_sent_date).toLocaleDateString()
// // //                               : "N/A"}
// // //                           </p>
// // //                         </div>
// // //                         <div className="flex space-x-2">
// // //                           <button
// // //                             onClick={() => {
// // //                               setSelectedCandidate(c);
// // //                               setShowManualProcessModal(true);
// // //                             }}
// // //                             className="text-blue-600 hover:text-blue-700 text-sm"
// // //                           >
// // //                             Manual Process
// // //                           </button>
// // //                           {c.assessment_invite_link && (
// // //                             <a
// // //                               href={c.assessment_invite_link}
// // //                               target="_blank"
// // //                               rel="noopener noreferrer"
// // //                               className="text-green-600 hover:text-green-700 text-sm"
// // //                             >
// // //                               View
// // //                             </a>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* Recent Completions */}
// // //             <div>
// // //               <h4 className="font-medium mb-3">
// // //                 Recent Completions ({recentCompletions.length})
// // //               </h4>
// // //               <div className="space-y-3 max-h-64 overflow-y-auto">
// // //                 {recentCompletions.length === 0 ? (
// // //                   <p className="text-gray-500 text-sm">No completed assessments</p>
// // //                 ) : (
// // //                   recentCompletions.map((c) => (
// // //                     <div key={c.id} className="border rounded p-3">
// // //                       <div className="flex justify-between items-start">
// // //                         <div>
// // //                           <p className="font-medium">{c.name}</p>
// // //                           <p className="text-sm text-gray-500">{c.email}</p>
// // //                           <div className="flex items-center space-x-2 mt-1">
// // //                             <span
// // //                               className={`px-2 py-1 rounded text-xs ${
// // //                                 c.exam_percentage >= 70
// // //                                   ? "bg-green-100 text-green-700"
// // //                                   : "bg-red-100 text-red-700"
// // //                               }`}
// // //                             >
// // //                               {c.exam_percentage?.toFixed(0)}%
// // //                             </span>
// // //                             <span className="text-xs text-gray-400">
// // //                               {c.exam_completed_date
// // //                                 ? new Date(c.exam_completed_date).toLocaleDateString()
// // //                                 : "N/A"}
// // //                             </span>
// // //                           </div>
// // //                         </div>
// // //                         <div className="text-right">
// // //                           <p className="text-sm font-medium">
// // //                             {c.final_status || "Processing..."}
// // //                           </p>
// // //                           {c.exam_feedback && (
// // //                             <p className="text-xs text-gray-500 mt-1 max-w-32 truncate">
// // //                               {c.exam_feedback}
// // //                             </p>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Automation Settings */}
// // //       <div className="bg-white rounded-lg shadow-sm border p-6">
// // //         <div className="flex items-center justify-between mb-4 ">
// // //           <h3 className="text-lg font-semibold flex items-center text-gray-600">
// // //             <Settings className="w-5 h-5 mr-2 text-gray-600" />
// // //             Automation Settings
// // //           </h3>
// // //         </div>
// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
// // //           {/* Auto-check toggle */}
// // //           <div className="flex items-center justify-between p-3 border rounded">
// // //             <div>
// // //               <p className="font-medium">Auto-Check Results</p>
// // //               <p className="text-sm text-gray-500">
// // //                 Automatically check for new results
// // //               </p>
// // //             </div>
// // //             <input
// // //               type="checkbox"
// // //               checked={automationSettings.enabled}
// // //               onChange={(e) =>
// // //                 setAutomationSettings({
// // //                   ...automationSettings,
// // //                   enabled: e.target.checked,
// // //                 })
// // //               }
// // //             />
// // //           </div>

// // //           {/* Interval selection */}
// // //           <div className="p-3 border rounded">
// // //             <label className="block font-medium mb-2">Check Interval</label>
// // //             <select
// // //               value={automationSettings.checkInterval}
// // //               onChange={(e) =>
// // //                 setAutomationSettings({
// // //                   ...automationSettings,
// // //                   checkInterval: parseInt(e.target.value),
// // //                 })
// // //               }
// // //               className="w-full border rounded px-3 py-2 text-sm"
// // //             >
// // //               <option value="15">Every 15 minutes</option>
// // //               <option value="30">Every 30 minutes</option>
// // //               <option value="60">Every hour</option>
// // //               <option value="120">Every 2 hours</option>
// // //             </select>
// // //           </div>

// // //           {/* Auto-process toggle */}
// // //           <div className="flex items-center justify-between p-3 border rounded">
// // //             <div>
// // //               <p className="font-medium">Auto-Process</p>
// // //               <p className="text-sm text-gray-500">
// // //                 Send emails automatically
// // //               </p>
// // //             </div>
// // //             <input
// // //               type="checkbox"
// // //               checked={automationSettings.autoProcess}
// // //               onChange={(e) =>
// // //                 setAutomationSettings({
// // //                   ...automationSettings,
// // //                   autoProcess: e.target.checked,
// // //                 })
// // //               }
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {showManualProcessModal && selectedCandidate && <ManualProcessModal />}
// // //     </div>
// // //   );
// // // };

// // // export default ResultsManagement;

// // // import React, { useState } from "react";
// // // import {
// // //   RefreshCw,
// // //   Download,
// // //   AlertCircle,
// // //   CheckCircle,
// // //   Clock,
// // //   Eye,
// // //   Target,
// // //   TrendingUp,
// // //   Users,
// // //   Settings,
// // // } from "lucide-react";

// // // interface ResultsManagementProps {
// // //   selectedJob: any;
// // //   candidates: any[];
// // //   onRefreshCandidates: () => void;
// // // }

// // // const ResultsManagement: React.FC<ResultsManagementProps> = ({
// // //   selectedJob,
// // //   candidates,
// // //   onRefreshCandidates,
// // // }) => {
// // //   const [scrapingStatus, setScrapingStatus] = useState("");
// // //   const [isScrapingLoading, setIsScrapingLoading] = useState(false);
// // //   const [showManualProcessModal, setShowManualProcessModal] = useState(false);
// // //   const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

// // //   // New modal state for choosing Testlify / Criteria results
// // //   const [showResultTypeModal, setShowResultTypeModal] = useState(false);

// // //   const [automationSettings, setAutomationSettings] = useState({
// // //     enabled: false,
// // //     checkInterval: 30,
// // //     autoProcess: true,
// // //   });

// // //   // --- Pure Logic ---
// // //   const getPendingAssessments = () =>
// // //     candidates.filter(
// // //       (c) =>
// // //         c.exam_link_sent &&
// // //         !c.exam_completed &&
// // //         !c.link_expired &&
// // //         c.assessment_invite_link
// // //     );

// // //   const getRecentCompletions = () =>
// // //     candidates
// // //       .filter((c) => c.exam_completed)
// // //       .sort(
// // //         (a, b) =>
// // //           new Date(b.exam_completed_date).getTime() -
// // //           new Date(a.exam_completed_date).getTime()
// // //       )
// // //       .slice(0, 5);

// // //   const getAssessmentMetrics = () => {
// // //     const pending = getPendingAssessments();
// // //     const completed = candidates.filter((c) => c.exam_completed);
// // //     const passed = completed.filter((c) => c.exam_percentage >= 70);
// // //     const avgScore =
// // //       completed.length > 0
// // //         ? (
// // //             completed.reduce((sum, c) => sum + (c.exam_percentage || 0), 0) /
// // //             completed.length
// // //           ).toFixed(1)
// // //         : 0;

// // //     return {
// // //       pending: pending.length,
// // //       completed: completed.length,
// // //       passed: passed.length,
// // //       passRate:
// // //         completed.length > 0
// // //           ? ((passed.length / completed.length) * 100).toFixed(1)
// // //           : 0,
// // //       avgScore,
// // //     };
// // //   };

// // //   // --- Scrape Simulations ---
// // //   const handleScrapeAssessment = (assessmentType: string) => {
// // //     if (!assessmentType) {
// // //       setScrapingStatus("❌ Please select a job first");
// // //       return;
// // //     }

// // //     setIsScrapingLoading(true);
// // //     setScrapingStatus(`🔍 Checking ${assessmentType}...`);

// // //     setTimeout(() => {
// // //       setScrapingStatus(`✅ ${assessmentType} updated successfully!`);
// // //       setIsScrapingLoading(false);

// // //       setTimeout(() => setScrapingStatus(""), 4000);
// // //     }, 1500);
// // //   };

// // //   const handleScrapeAllPending = () => {
// // //     setIsScrapingLoading(true);
// // //     setScrapingStatus("🔍 Checking all pending assessments...");
// // //     setTimeout(() => {
// // //       setScrapingStatus("✅ Simulated: All pending results updated!");
// // //       setIsScrapingLoading(false);
// // //       setTimeout(() => setScrapingStatus(""), 4000);
// // //     }, 2000);
// // //   };

// // //   const handleManualProcess = (candidateEmail: string, score: string, total: string) => {
// // //     setScrapingStatus(`✅ Manually processed ${candidateEmail} (${score}/${total})`);
// // //     onRefreshCandidates();
// // //     setShowManualProcessModal(false);
// // //     setTimeout(() => setScrapingStatus(""), 4000);
// // //   };

// // //   const metrics = getAssessmentMetrics();
// // //   const pendingAssessments = getPendingAssessments();
// // //   const recentCompletions = getRecentCompletions();

// // //   // --- Result Selection Modal ---
// // //   const ResultTypeModal = () => (
// // //     <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50">
// // //       <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg ">
// // //         <h2 className="text-lg font-semibold mb-4 text-gray-700">
// // //           Select Result Source
// // //         </h2>

// // //         <div className="space-y-4">

// // //           <button
// // //             className="w-full p-4 border rounded-lg hover:bg-gray-50 text-left"
// // //             onClick={() => {
// // //               setShowResultTypeModal(false);
// // //               handleScrapeAssessment("Testlify Results");
// // //             }}
// // //           >
// // //             <p className="font-medium text-blue-600">Testlify Results</p>
// // //             <p className="text-sm text-gray-500">Fetch & update Testlify assessment results</p>
// // //           </button>

// // //           <button
// // //             className="w-full p-4 border rounded-lg hover:bg-gray-50 text-left"
// // //             onClick={() => {
// // //               setShowResultTypeModal(false);
// // //               handleScrapeAssessment("Criteria Results");
// // //             }}
// // //           >
// // //             <p className="font-medium text-green-600 ">Criteria Results</p>
// // //             <p className="text-sm text-gray-500">Fetch & update Criteria assessment results</p>
// // //           </button>
// // //         </div>

// // //         <button
// // //           className="mt-4 w-full py-2 bg-blue-600 rounded"
// // //           onClick={() => setShowResultTypeModal(false)}
// // //         >
// // //           Cancel
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );

// // //   // --- Manual Process Modal ---
// // //   const ManualProcessModal = () => {
// // //     const [score, setScore] = useState("");
// // //     const [totalQuestions, setTotalQuestions] = useState("100");

// // //     const handleSubmit = (e: React.FormEvent) => {
// // //       e.preventDefault();
// // //       handleManualProcess(selectedCandidate.email, score, totalQuestions);
// // //     };

// // //     return (
// // //       <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center z-50">

// // //         <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
// // //           <h3 className="text-lg font-semibold mb-4">
// // //             Manual Process: {selectedCandidate?.name}
// // //           </h3>
// // //           <form onSubmit={handleSubmit}>
// // //             <div className="mb-4">
// // //               <label className="block text-sm font-medium mb-2">
// // //                 Score (correct answers)
// // //               </label>
// // //               <input
// // //                 type="number"
// // //                 value={score}
// // //                 onChange={(e) => setScore(e.target.value)}
// // //                 className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 required
// // //               />
// // //             </div>
// // //             <div className="mb-4">
// // //               <label className="block text-sm font-medium mb-2">
// // //                 Total Questions
// // //               </label>
// // //               <input
// // //                 type="number"
// // //                 value={totalQuestions}
// // //                 onChange={(e) => setTotalQuestions(e.target.value)}
// // //                 className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 required
// // //               />
// // //             </div>
// // //             <div className="mb-4 p-3 bg-gray-50 rounded">
// // //               <p className="text-sm text-gray-600">
// // //                 <strong>Percentage:</strong>{" "}
// // //                 {score && totalQuestions
// // //                   ? ((+score / +totalQuestions) * 100).toFixed(1)
// // //                   : 0}
// // //                 %
// // //               </p>
// // //               <p className="text-xs text-gray-500 mt-1">
// // //                 Candidates scoring ≥70% will be scheduled for interviews
// // //               </p>
// // //             </div>
// // //             <div className="flex gap-2">
// // //               <button
// // //                 type="submit"
// // //                 className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // //               >
// // //                 Process Result
// // //               </button>
// // //               <button
// // //                 type="button"
// // //                 onClick={() => setShowManualProcessModal(false)}
// // //                 className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
// // //               >
// // //                 Cancel
// // //               </button>
// // //             </div>
// // //           </form>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div className="space-y-6">
// // //       {/* Status message */}
// // //       {scrapingStatus && (
// // //         <div
// // //           className={`p-4 rounded-lg border flex items-center ${
// // //             scrapingStatus.includes("❌")
// // //               ? "bg-red-50 border-red-200 text-red-700"
// // //               : scrapingStatus.includes("✅")
// // //               ? "bg-green-50 border-green-200 text-green-700"
// // //               : "bg-blue-50 border-blue-200 text-blue-700"
// // //           }`}
// // //         >
// // //           <div className="flex items-center">
// // //             {scrapingStatus.includes("🔍") && (
// // //               <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
// // //             )}
// // //             {scrapingStatus.includes("✅") && (
// // //               <CheckCircle className="w-5 h-5 mr-2" />
// // //             )}
// // //             {scrapingStatus.includes("❌") && (
// // //               <AlertCircle className="w-5 h-5 mr-2" />
// // //             )}
// // //             <span>{scrapingStatus}</span>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Quick Stats */}
// // //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // //         {[
// // //           { label: "Pending Results", value: metrics.pending, color: "orange", icon: Clock },
// // //           { label: "Completed", value: metrics.completed, color: "green", icon: CheckCircle },
// // //           { label: "Pass Rate", value: `${metrics.passRate}%`, color: "blue", icon: Target },
// // //           { label: "Avg Score", value: `${metrics.avgScore}%`, color: "purple", icon: TrendingUp },
// // //         ].map((stat, i) => {
// // //           const Icon = stat.icon;
// // //           return (
// // //             <div key={i} className="bg-white p-4 rounded-lg shadow-sm border text-gray-600">
// // //               <div className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="text-sm text-gray-600">{stat.label}</p>
// // //                   <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
// // //                 </div>
// // //                 <Icon className={`w-8 h-8 text-${stat.color}-600`} />
// // //               </div>
// // //             </div>
// // //           );
// // //         })}
// // //       </div>

// // //       {/* Main Actions */}
// // //       <div className="bg-white rounded-lg shadow-sm border p-6">
// // //         <div className="flex items-center justify-between mb-4">
// // //           <h3 className="text-lg font-semibold text-gray-600">Results Management</h3>
// // //           <div className="flex items-center space-x-3">
// // //             <button
// // //               onClick={() => selectedJob && setShowResultTypeModal(true)}
// // //               disabled={!selectedJob || isScrapingLoading}
// // //               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
// // //             >
// // //               <Eye className="w-4 h-4 mr-2" />
// // //               {isScrapingLoading ? "Checking..." : "Check Results"}
// // //             </button>

// // //             <button
// // //               onClick={handleScrapeAllPending}
// // //               disabled={isScrapingLoading || pendingAssessments.length === 0}
// // //               className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
// // //             >
// // //               <RefreshCw className={`w-4 h-4 mr-2 ${isScrapingLoading ? "animate-spin" : ""}`} />
// // //               Check All Pending
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {!selectedJob ? (
// // //           <div className="text-center py-8 text-gray-500">
// // //             <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// // //             <p>Select a job position to manage assessment results</p>
// // //           </div>
// // //         ) : (
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //             {/* Pending assessments */}
// // //             <div>
// // //               <h4 className="font-medium mb-3">
// // //                 Pending Assessments ({pendingAssessments.length})
// // //               </h4>
// // //               <div className="space-y-3 max-h-64 overflow-y-auto">
// // //                 {pendingAssessments.length === 0 ? (
// // //                   <p className="text-gray-500 text-sm">No pending assessments</p>
// // //                 ) : (
// // //                   pendingAssessments.map((c) => (
// // //                     <div key={c.id} className="border rounded p-3">
// // //                       <div className="flex justify-between items-start">
// // //                         <div>
// // //                           <p className="font-medium">{c.name}</p>
// // //                           <p className="text-sm text-gray-500">{c.email}</p>
// // //                           <p className="text-xs text-gray-400">
// // //                             Sent:{" "}
// // //                             {c.exam_link_sent_date
// // //                               ? new Date(c.exam_link_sent_date).toLocaleDateString()
// // //                               : "N/A"}
// // //                           </p>
// // //                         </div>
// // //                         <div className="flex space-x-2">
// // //                           <button
// // //                             onClick={() => {
// // //                               setSelectedCandidate(c);
// // //                               setShowManualProcessModal(true);
// // //                             }}
// // //                             className="text-blue-600 hover:text-blue-700 text-sm"
// // //                           >
// // //                             Manual Process
// // //                           </button>
// // //                           {c.assessment_invite_link && (
// // //                             <a
// // //                               href={c.assessment_invite_link}
// // //                               target="_blank"
// // //                               rel="noopener noreferrer"
// // //                               className="text-green-600 hover:text-green-700 text-sm"
// // //                             >
// // //                               View
// // //                             </a>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* Recent completions */}
// // //             <div>
// // //               <h4 className="font-medium mb-3">
// // //                 Recent Completions ({recentCompletions.length})
// // //               </h4>
// // //               <div className="space-y-3 max-h-64 overflow-y-auto">
// // //                 {recentCompletions.length === 0 ? (
// // //                   <p className="text-gray-500 text-sm">No completed assessments</p>
// // //                 ) : (
// // //                   recentCompletions.map((c) => (
// // //                     <div key={c.id} className="border rounded p-3">
// // //                       <div className="flex justify-between items-start">
// // //                         <div>
// // //                           <p className="font-medium">{c.name}</p>
// // //                           <p className="text-sm text-gray-500">{c.email}</p>
// // //                           <div className="flex items-center space-x-2 mt-1">
// // //                             <span
// // //                               className={`px-2 py-1 rounded text-xs ${
// // //                                 c.exam_percentage >= 70
// // //                                   ? "bg-green-100 text-green-700"
// // //                                   : "bg-red-100 text-red-700"
// // //                               }`}
// // //                             >
// // //                               {c.exam_percentage?.toFixed(0)}%
// // //                             </span>
// // //                             <span className="text-xs text-gray-400">
// // //                               {c.exam_completed_date
// // //                                 ? new Date(c.exam_completed_date).toLocaleDateString()
// // //                                 : "N/A"}
// // //                             </span>
// // //                           </div>
// // //                         </div>
// // //                         <div className="text-right">
// // //                           <p className="text-sm font-medium">
// // //                             {c.final_status || "Processing..."}
// // //                           </p>
// // //                           {c.exam_feedback && (
// // //                             <p className="text-xs text-gray-500 mt-1 max-w-32 truncate">
// // //                               {c.exam_feedback}
// // //                             </p>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Automation Settings */}
// // //       <div className="bg-white rounded-lg shadow-sm border p-6">
// // //         <div className="flex items-center justify-between mb-4 ">
// // //           <h3 className="text-lg font-semibold flex items-center text-gray-600">
// // //             <Settings className="w-5 h-5 mr-2 text-gray-600" />
// // //             Automation Settings
// // //           </h3>
// // //         </div>
// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
// // //           <div className="flex items-center justify-between p-3 border rounded">
// // //             <div>
// // //               <p className="font-medium">Auto-Check Results</p>
// // //               <p className="text-sm text-gray-500">
// // //                 Automatically check for new results
// // //               </p>
// // //             </div>
// // //             <input
// // //               type="checkbox"
// // //               checked={automationSettings.enabled}
// // //               onChange={(e) =>
// // //                 setAutomationSettings({
// // //                   ...automationSettings,
// // //                   enabled: e.target.checked,
// // //                 })
// // //               }
// // //             />
// // //           </div>

// // //           <div className="p-3 border rounded">
// // //             <label className="block font-medium mb-2">Check Interval</label>
// // //             <select
// // //               value={automationSettings.checkInterval}
// // //               onChange={(e) =>
// // //                 setAutomationSettings({
// // //                   ...automationSettings,
// // //                   checkInterval: parseInt(e.target.value),
// // //                 })
// // //               }
// // //               className="w-full border rounded px-3 py-2 text-sm"
// // //             >
// // //               <option value="15">Every 15 minutes</option>
// // //               <option value="30">Every 30 minutes</option>
// // //               <option value="60">Every hour</option>
// // //               <option value="120">Every 2 hours</option>
// // //             </select>
// // //           </div>

// // //           <div className="flex items-center justify-between p-3 border rounded">
// // //             <div>
// // //               <p className="font-medium">Auto-Process</p>
// // //               <p className="text-sm text-gray-500">
// // //                 Send emails automatically
// // //               </p>
// // //             </div>
// // //             <input
// // //               type="checkbox"
// // //               checked={automationSettings.autoProcess}
// // //               onChange={(e) =>
// // //                 setAutomationSettings({
// // //                   ...automationSettings,
// // //                   autoProcess: e.target.checked,
// // //                 })
// // //               }
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Modals */}
// // //       {showManualProcessModal && selectedCandidate && <ManualProcessModal />}
// // //       {showResultTypeModal && <ResultTypeModal />}
// // //     </div>
// // //   );
// // // };

// // // export default ResultsManagement;

// // // ResultsManagement.tsx
// // // src/components/assementInterface/subComponents/ResultsManagement.tsx
// // "use client";

// // import React, { useMemo, useState, useCallback } from "react";
// // import {
// //   RefreshCw,
// //   AlertCircle,
// //   CheckCircle,
// //   Eye,
// //   Users,
// //   Settings,
// // } from "lucide-react";

// // // NOTE: adjust this import if your Job type lives elsewhere.
// // // You previously used: "@/components/recruitmentForm/subComponents/types"
// // // keep whichever is correct for your project structure.
// // import { Job } from "@/components/recruitmentForm/subComponents/types";

// // // Import the shared Candidate type and AssessmentResultRow
// // import { Candidate, AssessmentResultRow } from "@/services/interfaces/CandidateScreening";

// // interface ResultsManagementProps {
// //   selectedJob: Job | null;
// //   candidates: Candidate[];
// //   onRefreshCandidates: () => void;
// // }

// // type ResultSource = "overall" | "testlify" | "criteria";
// // type InternalTab = "overview" | "results" | "pending" | "completed" | "notsent" | "expired";

// // const ResultsManagement: React.FC<ResultsManagementProps> = ({
// //   selectedJob,
// //   candidates,
// //   onRefreshCandidates,
// // }) => {
// //   // UI states
// //   const [scrapingStatus, setScrapingStatus] = useState("");
// //   const [isScrapingLoading, setIsScrapingLoading] = useState(false);
// //   const [showManualProcessModal, setShowManualProcessModal] = useState(false);
// //   const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
// //   const [showResultTypeModal, setShowResultTypeModal] = useState(false);

// //   // New controls: result source and inner tab
// //   const [resultSource, setResultSource] = useState<ResultSource>("overall");
// //   const [activeTab, setActiveTab] = useState<InternalTab>("overview");

// //   const [automationSettings, setAutomationSettings] = useState({
// //     enabled: false,
// //     checkInterval: 30,
// //     autoProcess: true,
// //   });

// //   // -------------------------
// //   // Helper - abstract candidate -> assessment retrieval
// //   // Memoized with useCallback to ensure stable references
// //   // -------------------------
// //   const getAssessmentRows = useCallback((c: Candidate): AssessmentResultRow[] => {
// //     // Prefer canonical 'assessment_results' array if present
// //     if (Array.isArray(c.assessment_results) && c.assessment_results.length > 0) {
// //       return c.assessment_results;
// //     }

// //     // Fallback to legacy fields: build rows for testlify & criteria if present
// //     const rows: AssessmentResultRow[] = [];

// //     if (
// //       typeof c.testlify_score !== "undefined" ||
// //       typeof c.testlify_completed !== "undefined" ||
// //       c.testlify_invite_link
// //     ) {
// //       rows.push({
// //         type: "testlify",
// //         score: typeof c.testlify_score === "number" ? c.testlify_score : undefined,
// //         completed: !!c.testlify_completed,
// //         invite_link: c.testlify_invite_link ?? null,
// //         completed_date: c.testlify_completed_date ?? null,
// //         feedback: c.exam_feedback ?? null,
// //       });
// //     }

// //     if (
// //       typeof c.criteria_score !== "undefined" ||
// //       typeof c.criteria_completed !== "undefined" ||
// //       c.criteria_invite_link
// //     ) {
// //       rows.push({
// //         type: "criteria",
// //         score: typeof c.criteria_score === "number" ? c.criteria_score : undefined,
// //         completed: !!c.criteria_completed,
// //         invite_link: c.criteria_invite_link ?? null,
// //         completed_date: c.criteria_completed_date ?? null,
// //         feedback: c.exam_feedback ?? null,
// //       });
// //     }

// //     return rows;
// //   }, []);

// //   // get assessment row for a given candidate and type
// //   const getRowForType = useCallback(
// //     (c: Candidate, type: "testlify" | "criteria") => {
// //       const rows = getAssessmentRows(c);
// //       return rows.find((r) => (r.type || "").toLowerCase() === type) ?? null;
// //     },
// //     [getAssessmentRows]
// //   );

// //   // -------------------------
// //   // Filtering helpers based on selected "resultSource" and inner tab
// //   // Memoized with useCallback to ensure stable references
// //   // -------------------------
// //   const isPendingForType = useCallback(
// //     (c: Candidate, type?: ResultSource) => {
// //       if (type === "overall" || !type) {
// //         // pending if any invite sent and not completed & not expired
// //         return (
// //           (c.exam_link_sent || getAssessmentRows(c).some((r) => r.invite_link)) &&
// //           !(c.exam_completed || getAssessmentRows(c).some((r) => r.completed)) &&
// //           !c.link_expired
// //         );
// //       }

// //       // testlify or criteria
// //       const row = getRowForType(c, type === "testlify" ? "testlify" : "criteria");
// //       if (!row) return false;
// //       return !!row.invite_link && !row.completed && !c.link_expired;
// //     },
// //     [getAssessmentRows, getRowForType]
// //   );

// //   const isCompletedForType = useCallback(
// //     (c: Candidate, type?: ResultSource) => {
// //       if (type === "overall" || !type) {
// //         const completedGeneric = !!c.exam_completed || getAssessmentRows(c).some((r) => r.completed);
// //         return completedGeneric;
// //       }
// //       const row = getRowForType(c, type === "testlify" ? "testlify" : "criteria");
// //       return !!row && !!row.completed;
// //     },
// //     [getAssessmentRows, getRowForType]
// //   );

// //   const isNotSentForType = useCallback(
// //     (c: Candidate, type?: ResultSource) => {
// //       if (type === "overall" || !type) {
// //         return !(c.exam_link_sent || getAssessmentRows(c).some((r) => r.invite_link));
// //       }
// //       const row = getRowForType(c, type === "testlify" ? "testlify" : "criteria");
// //       return !row || !row.invite_link;
// //     },
// //     [getAssessmentRows, getRowForType]
// //   );

// //   const isExpiredForType = useCallback(
// //     (c: Candidate, type?: ResultSource) => {
// //       if (type === "overall" || !type) {
// //         return !!c.link_expired;
// //       }
// //       const row = getRowForType(c, type === "testlify" ? "testlify" : "criteria");
// //       return !!c.link_expired && !!row;
// //     },
// //     [getRowForType]
// //   );

// //   // -------------------------
// //   // Metrics calculation per source
// //   // Memoized with useCallback to ensure stable reference
// //   // -------------------------
// //   const metricsFor = useCallback(
// //     (type: ResultSource) => {
// //       const relevant = candidates.filter((c) =>
// //         type === "overall" ? true : !!getRowForType(c, type === "testlify" ? "testlify" : "criteria")
// //       );

// //       const pending = relevant.filter((c) => isPendingForType(c, type)).length;
// //       const completedList = relevant.filter((c) => isCompletedForType(c, type));
// //       const completed = completedList.length;
// //       const passed = completedList.filter((c) => {
// //         if (type === "overall") return (c.exam_percentage ?? 0) >= 70;
// //         const row = getRowForType(c, type === "testlify" ? "testlify" : "criteria");
// //         return (row?.score ?? 0) >= 70;
// //       }).length;

// //       const avgScore =
// //         completed > 0
// //           ? (
// //               completedList.reduce((sum, c) => {
// //                 if (type === "overall") return sum + (c.exam_percentage ?? 0);
// //                 const row = getRowForType(c, type === "testlify" ? "testlify" : "criteria");
// //                 return sum + (row?.score ?? 0);
// //               }, 0) / completed
// //             ).toFixed(1)
// //           : "0";

// //       const passRate = completed > 0 ? ((passed / completed) * 100).toFixed(1) : "0";

// //       return {
// //         pending,
// //         completed,
// //         passed,
// //         avgScore,
// //         passRate,
// //         total: relevant.length,
// //       };
// //     },
// //     [candidates, getRowForType, isPendingForType, isCompletedForType]
// //   );

// //   const metrics = useMemo(() => metricsFor(resultSource), [metricsFor, resultSource]);

// //   // -------------------------
// //   // Lists used by UI based on activeTab & resultSource
// //   // -------------------------
// //   const filteredCandidates = useMemo(() => {
// //     switch (activeTab) {
// //       case "overview":
// //         return candidates;
// //       case "results":
// //         return candidates.filter((c) => isCompletedForType(c, resultSource));
// //       case "pending":
// //         return candidates.filter((c) => isPendingForType(c, resultSource));
// //       case "completed":
// //         return candidates.filter((c) => isCompletedForType(c, resultSource));
// //       case "notsent":
// //         return candidates.filter((c) => isNotSentForType(c, resultSource));
// //       case "expired":
// //         return candidates.filter((c) => isExpiredForType(c, resultSource));
// //       default:
// //         return candidates;
// //     }
// //   }, [candidates, activeTab, resultSource, isCompletedForType, isPendingForType, isNotSentForType, isExpiredForType]);

// //   // -------------------------
// //   // Scraping / Simulation handlers
// //   // -------------------------
// //   const handleScrapeAssessment = (assessmentType: "Testlify Results" | "Criteria Results") => {
// //     if (!selectedJob) {
// //       setScrapingStatus("❌ Please select a job first");
// //       setTimeout(() => setScrapingStatus(""), 4000);
// //       return;
// //     }
// //     setIsScrapingLoading(true);
// //     setScrapingStatus(`🔍 Checking ${assessmentType}...`);

// //     // TODO: call real backend API to fetch given type results
// //     setTimeout(() => {
// //       setScrapingStatus(`✅ ${assessmentType} updated successfully!`);
// //       setIsScrapingLoading(false);
// //       onRefreshCandidates();
// //       setTimeout(() => setScrapingStatus(""), 3500);
// //     }, 1400);
// //   };

// //   const handleScrapeAllPending = () => {
// //     if (!selectedJob) {
// //       setScrapingStatus("❌ Please select a job first");
// //       setTimeout(() => setScrapingStatus(""), 4000);
// //       return;
// //     }
// //     setIsScrapingLoading(true);
// //     setScrapingStatus("🔍 Checking all pending assessments...");
// //     setTimeout(() => {
// //       setScrapingStatus("✅ Simulated: All pending results updated!");
// //       setIsScrapingLoading(false);
// //       onRefreshCandidates();
// //       setTimeout(() => setScrapingStatus(""), 3500);
// //     }, 1600);
// //   };

// //   const handleManualProcess = (candidateEmail: string, score: string, total: string) => {
// //     setScrapingStatus(`✅ Manually processed ${candidateEmail} (${score}/${total})`);
// //     setShowManualProcessModal(false);
// //     onRefreshCandidates();
// //     setTimeout(() => setScrapingStatus(""), 3000);
// //   };

// //   // -------------------------
// //   // UI components: Modals
// //   // -------------------------
// //   const ResultTypeModal: React.FC = () => (
// //     <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50">
// //       <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg ">
// //         <h2 className="text-lg font-semibold mb-4 text-gray-700">Select Result Source</h2>
// //         <div className="space-y-4">
// //           <button
// //             className="w-full p-4 border rounded-lg hover:bg-gray-50 text-left"
// //             onClick={() => {
// //               setShowResultTypeModal(false);
// //               handleScrapeAssessment("Testlify Results");
// //             }}
// //           >
// //             <p className="font-medium text-blue-600">Testlify Results</p>
// //             <p className="text-sm text-gray-500">Fetch & update Testlify assessment results</p>
// //           </button>

// //           <button
// //             className="w-full p-4 border rounded-lg hover:bg-gray-50 text-left"
// //             onClick={() => {
// //               setShowResultTypeModal(false);
// //               handleScrapeAssessment("Criteria Results");
// //             }}
// //           >
// //             <p className="font-medium text-green-600 ">Criteria Results</p>
// //             <p className="text-sm text-gray-500">Fetch & update Criteria assessment results</p>
// //           </button>
// //         </div>

// //         <button className="mt-4 w-full py-2 bg-blue-600 rounded text-white" onClick={() => setShowResultTypeModal(false)}>
// //           Cancel
// //         </button>
// //       </div>
// //     </div>
// //   );

// //   const ManualProcessModal: React.FC = () => {
// //     const [score, setScore] = useState("");
// //     const [totalQuestions, setTotalQuestions] = useState("100");

// //     const handleSubmit = (e: React.FormEvent) => {
// //       e.preventDefault();
// //       if (!selectedCandidate) return;
// //       handleManualProcess(selectedCandidate.email ?? "", score, totalQuestions);
// //     };

// //     return (
// //       <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center z-50">
// //         <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
// //           <h3 className="text-lg font-semibold mb-4">Manual Process: {selectedCandidate?.name}</h3>
// //           <form onSubmit={handleSubmit}>
// //             <div className="mb-4">
// //               <label className="block text-sm font-medium mb-2">Score (correct answers)</label>
// //               <input type="number" value={score} onChange={(e) => setScore(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
// //             </div>
// //             <div className="mb-4">
// //               <label className="block text-sm font-medium mb-2">Total Questions</label>
// //               <input type="number" value={totalQuestions} onChange={(e) => setTotalQuestions(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
// //             </div>
// //             <div className="mb-4 p-3 bg-gray-50 rounded">
// //               <p className="text-sm text-gray-600">
// //                 <strong>Percentage:</strong>{" "}
// //                 {score && totalQuestions ? ((+score / +totalQuestions) * 100).toFixed(1) : "0"}%
// //               </p>
// //               <p className="text-xs text-gray-500 mt-1">Candidates scoring ≥70% will be scheduled for interviews</p>
// //             </div>
// //             <div className="flex gap-2">
// //               <button type="submit" className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Process Result</button>
// //               <button type="button" onClick={() => setShowManualProcessModal(false)} className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // -------------------------
// //   // Render
// //   // -------------------------
// //   return (
// //     <div className="space-y-6">
// //       {/* Status */}
// //       {scrapingStatus && (
// //         <div className={`p-4 rounded-lg border flex items-center ${scrapingStatus.includes("❌") ? "bg-red-50 border-red-200 text-red-700" : scrapingStatus.includes("✅") ? "bg-green-50 border-green-200 text-green-700" : "bg-blue-50 border-blue-200 text-blue-700"}`}>
// //           <div className="flex items-center">
// //             {scrapingStatus.includes("🔍") && <RefreshCw className="w-5 h-5 mr-2 animate-spin" />}
// //             {scrapingStatus.includes("✅") && <CheckCircle className="w-5 h-5 mr-2" />}
// //             {scrapingStatus.includes("❌") && <AlertCircle className="w-5 h-5 mr-2" />}
// //             <span>{scrapingStatus}</span>
// //           </div>
// //         </div>
// //       )}

// //       {/* Result Source selector */}
// //       <div className="flex items-center gap-4">
// //         <div className="flex items-center gap-2">
// //           <label className="text-sm text-gray-600">Result Source:</label>
// //           <select value={resultSource} onChange={(e) => { setResultSource(e.target.value as ResultSource); setActiveTab("overview"); }} className="border rounded px-3 py-1 text-sm text-gray-600">
// //             <option value="testlify">Testlify</option>
// //             <option value="criteria">Criteria</option>
// //           </select>
// //         </div>
// //       </div>

// //       {/* Inner tabs */}
// //       <div className="bg-white rounded-lg shadow-sm border p-6">
// //         <div className="flex items-center justify-between mb-4">
// //           <div className="flex gap-2">
// //             {(["overview","results","pending","completed","notsent","expired"] as InternalTab[]).map((t) => (
// //               <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-2 rounded ${activeTab===t ? "bg-blue-600 text-white" : "text-gray-600 bg-gray-50"}`}>
// //                 {t.charAt(0).toUpperCase() + t.slice(1)}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="flex items-center space-x-3">
// //             <button onClick={() => setShowResultTypeModal(true)} disabled={!selectedJob || isScrapingLoading} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
// //               <Eye className="w-4 h-4 mr-2" />
// //               {isScrapingLoading ? "Checking..." : "Check Results"}
// //             </button>

// //             <button onClick={handleScrapeAllPending} disabled={isScrapingLoading} className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
// //               <RefreshCw className={`w-4 h-4 mr-2 ${isScrapingLoading ? "animate-spin" : ""}`} />
// //               Check All Pending
// //             </button>
// //           </div>
// //         </div>

// //         {/* Content area */}
// //         {!selectedJob ? (
// //           <div className="text-center py-10 text-gray-500">
// //             <Users className="w-14 h-14 mx-auto mb-3 text-gray-300" />
// //             <p>Select a job to manage assessment results</p>
// //           </div>
// //         ) : (
// //           <div>
// //             {/* When 'results' or lists show */}
// //             <div className="space-y-4">
// //               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                 {/* Left: candidate list */}
// //                 <div>
// //                   <h4 className="font-medium mb-3 text-gray-600">
// //                     {activeTab === "overview" ? "All Candidates" : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} (${filteredCandidates.length})`}
// //                   </h4>

// //                   <div className="overflow-y-auto max-h-80 space-y-3">
// //                     {filteredCandidates.length === 0 ? (
// //                       <p className="text-gray-500 text-sm">No candidates found</p>
// //                     ) : (
// //                       filteredCandidates.map((c) => {
// //                         const testlifyRow = getRowForType(c, "testlify");
// //                         const criteriaRow = getRowForType(c, "criteria");

// //                         const testlifyPct = testlifyRow?.score ?? (c.testlify_score ?? null);
// //                         const criteriaPct = criteriaRow?.score ?? (c.criteria_score ?? null);

// //                         return (
// //                           <div key={String(c.id)} className="border rounded p-3 flex justify-between items-start">
// //                             <div>
// //                               <p className="font-medium">{c.name}</p>
// //                               <p className="text-sm text-gray-500">{c.email}</p>
// //                               <p className="text-xs text-gray-400 mt-1">
// //                                 Sent: {testlifyRow?.invite_link ?? criteriaRow?.invite_link ?? (c.exam_link_sent_date ?? "N/A")}
// //                               </p>
// //                             </div>

// //                             <div className="text-right flex flex-col items-end gap-2">
// //                               <div className="text-sm">
// //                                 <div className="text-xs text-gray-400">Testlify</div>
// //                                 <div className={`font-semibold ${typeof testlifyPct === "number" ? (testlifyPct >= 70 ? "text-green-600" : "text-red-600") : "text-gray-500"}`}>
// //                                   {typeof testlifyPct === "number" ? `${Math.round(testlifyPct)}%` : "—"}
// //                                 </div>
// //                               </div>

// //                               <div className="text-sm">
// //                                 <div className="text-xs text-gray-400">Criteria</div>
// //                                 <div className={`font-semibold ${typeof criteriaPct === "number" ? (criteriaPct >= 70 ? "text-green-600" : "text-red-600") : "text-gray-500"}`}>
// //                                   {typeof criteriaPct === "number" ? `${Math.round(criteriaPct)}%` : "—"}
// //                                 </div>
// //                               </div>

// //                               <div className="flex gap-2 mt-2">
// //                                 <button onClick={() => { setSelectedCandidate(c); setShowManualProcessModal(true); }} className="text-blue-600 hover:text-blue-700 text-sm">Manual Process</button>
// //                                 {(testlifyRow?.invite_link || criteriaRow?.invite_link || c.exam_link_sent) && (
// //                                   <a href={testlifyRow?.invite_link ?? criteriaRow?.invite_link ?? undefined} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 text-sm">View</a>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           </div>
// //                         );
// //                       })
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Right: recent completions or summary */}
// //                 <div>
// //                   <h4 className="font-medium mb-3 text-gray-600">Summary</h4>
// //                   <div className="space-y-3">
// //                     <div className="p-4 border rounded bg-white">
// //                       <p className="text-sm text-gray-500">Pending</p>
// //                       <p className="text-2xl font-bold text-gray-600">{metrics.pending}</p>
// //                     </div>

// //                     <div className="p-4 border rounded bg-white">
// //                       <p className="text-sm text-gray-500">Completed</p>
// //                       <p className="text-2xl font-bold text-gray-600">{metrics.completed}</p>
// //                     </div>

// //                     <div className="p-4 border rounded bg-white">
// //                       <p className="text-sm text-gray-500">Avg Score</p>
// //                       <p className="text-2xl font-bold text-gray-600">{metrics.avgScore}%</p>
// //                       <p className="text-xs text-gray-600 mt-1">{metrics.passRate}% pass rate</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* If activeTab === results show a richer table view */}
// //               {activeTab === "results" && filteredCandidates.length > 0 && (
// //                 <div className="mt-4 bg-white border rounded p-4">
// //                   <table className="w-full text-left text-sm">
// //                     <thead>
// //                       <tr>
// //                         <th className="py-2">Candidate</th>
// //                         <th className="py-2">Email</th>
// //                         <th className="py-2">Testlify Result</th>
// //                         <th className="py-2">Criteria Result</th>
// //                         <th className="py-2">Status</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {filteredCandidates.map((c) => {
// //                         const t = getRowForType(c, "testlify");
// //                         const cr = getRowForType(c, "criteria");
// //                         const tPct = typeof t?.score === "number" ? `${Math.round(t.score)}%` : typeof c.testlify_score === "number" ? `${Math.round(c.testlify_score)}%` : "—";
// //                         const crPct = typeof cr?.score === "number" ? `${Math.round(cr.score)}%` : typeof c.criteria_score === "number" ? `${Math.round(c.criteria_score)}%` : "—";
// //                         const status = (resultSource === "overall" ? (c.final_status ?? (c.exam_completed ? "Completed" : "Pending")) : ((resultSource === "testlify" ? (t?.completed ? "Completed" : "Pending") : (cr?.completed ? "Completed" : "Pending"))));

// //                         return (
// //                           <tr key={String(c.id)} className="border-t">
// //                             <td className="py-2">{c.name}</td>
// //                             <td className="py-2">{c.email}</td>
// //                             <td className="py-2">{tPct}</td>
// //                             <td className="py-2">{crPct}</td>
// //                             <td className="py-2">{status}</td>
// //                           </tr>
// //                         );
// //                       })}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Automation Settings */}
// //       <div className="bg-white rounded-lg shadow-sm border p-6">
// //         <div className="flex items-center justify-between mb-4 ">
// //           <h3 className="text-lg font-semibold flex items-center text-gray-600"><Settings className="w-5 h-5 mr-2 text-gray-600" />Automation Settings</h3>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
// //           <div className="flex items-center justify-between p-3 border rounded">
// //             <div>
// //               <p className="font-medium">Auto-Check Results</p>
// //               <p className="text-sm text-gray-500">Automatically check for new results</p>
// //             </div>
// //             <input type="checkbox" checked={automationSettings.enabled} onChange={(e) => setAutomationSettings({ ...automationSettings, enabled: e.target.checked })} />
// //           </div>

// //           <div className="p-3 border rounded">
// //             <label className="block font-medium mb-2">Check Interval</label>
// //             <select value={automationSettings.checkInterval} onChange={(e) => setAutomationSettings({ ...automationSettings, checkInterval: parseInt(e.target.value) })} className="w-full border rounded px-3 py-2 text-sm">
// //               <option value={15}>Every 15 minutes</option>
// //               <option value={30}>Every 30 minutes</option>
// //               <option value={60}>Every hour</option>
// //               <option value={120}>Every 2 hours</option>
// //             </select>
// //           </div>

// //           <div className="flex items-center justify-between p-3 border rounded">
// //             <div>
// //               <p className="font-medium">Auto-Process</p>
// //               <p className="text-sm text-gray-500">Send emails automatically</p>
// //             </div>
// //             <input type="checkbox" checked={automationSettings.autoProcess} onChange={(e) => setAutomationSettings({ ...automationSettings, autoProcess: e.target.checked })} />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Modals */}
// //       {showManualProcessModal && selectedCandidate && <ManualProcessModal />}
// //       {showResultTypeModal && <ResultTypeModal />}
// //     </div>
// //   );
// // };

// // export default ResultsManagement;
// "use client";

// import React, { useMemo, useState } from "react";
// import {
//   RefreshCw,
//   CheckCircle,
//   AlertCircle,
//   Clock,
//   Target,
//   TrendingUp,
//   Users,
//   Settings,
//   ExternalLink,
//   Calendar,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { Candidate, Job } from "@/services/interfaces/CandidateScreening";

// interface ResultsManagementProps {
//   selectedJob: Job | null;
//   candidates: Candidate[];
//   onRefreshCandidates: () => void;
// }

// // ─── Manual Process Modal ──────────────────────────────────────────────────────
// interface ManualProcessModalProps {
//   candidate: Candidate;
//   onClose: () => void;
//   onProcessed: (msg: string) => void;
// }

// const ManualProcessModal: React.FC<ManualProcessModalProps> = ({ candidate, onClose, onProcessed }) => {
//   const [score, setScore] = useState("");
//   const [totalQuestions, setTotalQuestions] = useState("100");

//   const percentage =
//     score && totalQuestions ? ((+score / +totalQuestions) * 100).toFixed(1) : "0";

//   const handleSubmit = () => {
//     if (!score || !totalQuestions) return;
//     onProcessed(`✅ Manually processed ${candidate.email} — ${score}/${totalQuestions} (${percentage}%)`);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4 shadow-xl">
//         <h3 className="text-lg font-semibold mb-1 text-gray-800">Manual Process</h3>
//         <p className="text-sm text-gray-500 mb-4">{candidate.name} — {candidate.email}</p>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Score (correct answers)</label>
//           <input
//             type="number"
//             min="0"
//             value={score}
//             onChange={(e) => setScore(e.target.value)}
//             className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//             placeholder="e.g. 75"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Total Questions</label>
//           <input
//             type="number"
//             min="1"
//             value={totalQuestions}
//             onChange={(e) => setTotalQuestions(e.target.value)}
//             className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//           />
//         </div>

//         <div className="mb-5 p-3 bg-gray-50 rounded-lg border">
//           <p className="text-sm text-gray-600">
//             <strong>Percentage:</strong> {percentage}%
//           </p>
//           <p className="text-xs text-gray-400 mt-1">Candidates scoring ≥70% will be eligible for interviews</p>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={handleSubmit}
//             disabled={!score}
//             className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//           >
//             Process Result
//           </button>
//           <button
//             onClick={onClose}
//             className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Main Component ────────────────────────────────────────────────────────────
// const ResultsManagement: React.FC<ResultsManagementProps> = ({
//   selectedJob,
//   candidates,
//   onRefreshCandidates,
// }) => {
//   const router = useRouter();
//   const [statusMsg, setStatusMsg] = useState("");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
//   const [showManualModal, setShowManualModal] = useState(false);
//   const [automationSettings, setAutomationSettings] = useState({
//     enabled: false,
//     checkInterval: 30,
//     autoProcess: true,
//   });

//   // ── Derived metrics ──────────────────────────────────────────────────────────
//   const metrics = useMemo(() => {
//     const pending = candidates.filter(
//       (c) => c.exam_link_sent && !c.exam_completed && !c.link_expired
//     );
//     const completed = candidates.filter((c) => c.exam_completed);
//     const passed = completed.filter((c) => (c.exam_percentage ?? 0) >= 70);
//     const avgScore =
//       completed.length > 0
//         ? (completed.reduce((s, c) => s + (c.exam_percentage ?? 0), 0) / completed.length).toFixed(1)
//         : "0";
//     const passRate =
//       completed.length > 0 ? ((passed.length / completed.length) * 100).toFixed(1) : "0";

//     return { pending: pending.length, completed: completed.length, passed: passed.length, avgScore, passRate };
//   }, [candidates]);

//   const pendingCandidates = useMemo(
//     () => candidates.filter((c) => c.exam_link_sent && !c.exam_completed && !c.link_expired),
//     [candidates]
//   );

//   const recentCompletions = useMemo(
//     () =>
//       candidates
//         .filter((c) => c.exam_completed)
//         .sort((a, b) => +new Date(b.exam_completed_date ?? 0) - +new Date(a.exam_completed_date ?? 0))
//         .slice(0, 8),
//     [candidates]
//   );

//   const allCompleted = useMemo(
//     () =>
//       candidates
//         .filter((c) => c.exam_completed)
//         .sort((a, b) => +new Date(b.exam_completed_date ?? 0) - +new Date(a.exam_completed_date ?? 0)),
//     [candidates]
//   );

//   // ── Handlers ─────────────────────────────────────────────────────────────────
//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     setStatusMsg("🔍 Refreshing assessment results...");
//     onRefreshCandidates();
//     setTimeout(() => {
//       setIsRefreshing(false);
//       setStatusMsg("✅ Results refreshed successfully!");
//       setTimeout(() => setStatusMsg(""), 4000);
//     }, 1500);
//   };

//   const handleManualProcessed = (msg: string) => {
//     setStatusMsg(msg);
//     onRefreshCandidates();
//     setTimeout(() => setStatusMsg(""), 5000);
//   };

//   const showModal = (c: Candidate) => {
//     setSelectedCandidate(c);
//     setShowManualModal(true);
//   };

//   // ── Status message style ──────────────────────────────────────────────────────
//   const statusStyle = statusMsg.includes("❌")
//     ? "bg-red-50 border-red-200 text-red-700"
//     : statusMsg.includes("✅")
//     ? "bg-green-50 border-green-200 text-green-700"
//     : "bg-blue-50 border-blue-200 text-blue-700";

//   // ─────────────────────────────────────────────────────────────────────────────
//   return (
//     <div className="space-y-6">

//       {/* Status message */}
//       {statusMsg && (
//         <div className={`p-4 rounded-lg border flex items-center gap-2 ${statusStyle}`}>
//           {statusMsg.includes("🔍") && <RefreshCw className="w-4 h-4 animate-spin" />}
//           {statusMsg.includes("✅") && <CheckCircle className="w-4 h-4" />}
//           {statusMsg.includes("❌") && <AlertCircle className="w-4 h-4" />}
//           <span>{statusMsg}</span>
//         </div>
//       )}

//       {/* Quick Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {[
//           { label: "Pending Results", value: metrics.pending, icon: Clock, color: "text-orange-600 bg-orange-50" },
//           { label: "Completed", value: metrics.completed, icon: CheckCircle, color: "text-green-600 bg-green-50" },
//           { label: "Pass Rate", value: `${metrics.passRate}%`, icon: Target, color: "text-blue-600 bg-blue-50" },
//           { label: "Avg Score", value: `${metrics.avgScore}%`, icon: TrendingUp, color: "text-purple-600 bg-purple-50" },
//         ].map(({ label, value, icon: Icon, color }) => (
//           <div key={label} className="bg-white p-4 rounded-lg shadow-sm border">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">{label}</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
//               </div>
//               <div className={`p-2 rounded-lg ${color}`}>
//                 <Icon className="w-5 h-5" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Results Management Panel */}
//       <div className="bg-white rounded-lg shadow-sm border p-6">
//         <div className="flex items-center justify-between mb-5">
//           <h3 className="text-lg font-semibold text-gray-700">Results Management</h3>
//           <button
//             onClick={handleRefresh}
//             disabled={isRefreshing || !selectedJob}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
//           >
//             <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
//             {isRefreshing ? "Refreshing..." : "Refresh Results"}
//           </button>
//         </div>

//         {!selectedJob ? (
//           <div className="text-center py-10 text-gray-500">
//             <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//             <p>Select a job to manage assessment results</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//             {/* ── Left: Pending Assessments ── */}
//             <div>
//               <h4 className="font-medium mb-3 text-gray-600 flex items-center gap-2">
//                 <Clock className="w-4 h-4 text-orange-500" />
//                 Pending Assessments ({pendingCandidates.length})
//               </h4>

//               <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
//                 {pendingCandidates.length === 0 ? (
//                   <div className="text-center py-6 text-gray-400 border rounded-lg bg-gray-50">
//                     <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
//                     <p className="text-sm">No pending assessments</p>
//                   </div>
//                 ) : (
//                   pendingCandidates.map((c) => (
//                     <div key={c.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <p className="font-medium text-gray-800">{c.name}</p>
//                           <p className="text-sm text-gray-500">{c.email}</p>
//                           <p className="text-xs text-gray-400 mt-1">
//                             Sent: {c.exam_link_sent_date
//                               ? new Date(c.exam_link_sent_date).toLocaleDateString()
//                               : "N/A"}
//                           </p>
//                         </div>
//                         <div className="flex gap-2 ml-2 flex-shrink-0">
//                           <button
//                             onClick={() => showModal(c)}
//                             className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
//                           >
//                             Manual
//                           </button>
//                           {c.assessment_invite_link && (
//                             <a
//                               href={c.assessment_invite_link}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-xs px-2 py-1 rounded bg-green-50 text-green-600 hover:bg-green-100 transition-colors flex items-center gap-1"
//                             >
//                               <ExternalLink className="w-3 h-3" />
//                               View
//                             </a>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>

//             {/* ── Right: Recent Completions ── */}
//             <div>
//               <h4 className="font-medium mb-3 text-gray-600 flex items-center gap-2">
//                 <CheckCircle className="w-4 h-4 text-green-500" />
//                 Recent Completions ({recentCompletions.length})
//               </h4>

//               <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
//                 {recentCompletions.length === 0 ? (
//                   <div className="text-center py-6 text-gray-400 border rounded-lg bg-gray-50">
//                     <Clock className="w-8 h-8 mx-auto mb-2 text-gray-300" />
//                     <p className="text-sm">No completed assessments yet</p>
//                   </div>
//                 ) : (
//                   recentCompletions.map((c) => {
//                     const pct = c.exam_percentage ?? 0;
//                     const passed = pct >= 70;
//                     return (
//                       <div key={c.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
//                         <div className="flex justify-between items-start">
//                           <div className="flex-1 min-w-0">
//                             <p className="font-medium text-gray-800 truncate">{c.name}</p>
//                             <p className="text-sm text-gray-500 truncate">{c.email}</p>
//                             <p className="text-xs text-gray-400 mt-1">
//                               {c.exam_completed_date
//                                 ? new Date(c.exam_completed_date).toLocaleDateString()
//                                 : ""}
//                             </p>
//                           </div>
//                           <div className="text-right ml-3 flex-shrink-0">
//                             <span className={`inline-block px-2 py-1 rounded text-sm font-semibold ${passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
//                               {pct.toFixed(0)}%
//                             </span>
//                             <p className="text-xs text-gray-500 mt-1">{passed ? "Passed" : "Failed"}</p>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Full Results Table */}
//       {selectedJob && allCompleted.length > 0 && (
//         <div className="bg-white rounded-lg shadow-sm border p-6">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">
//             All Assessment Results ({allCompleted.length})
//           </h3>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left">
//               <thead>
//                 <tr className="border-b bg-gray-50">
//                   <th className="py-3 px-4 font-medium text-gray-600">Candidate</th>
//                   <th className="py-3 px-4 font-medium text-gray-600">Email</th>
//                   <th className="py-3 px-4 font-medium text-gray-600">Score</th>
//                   <th className="py-3 px-4 font-medium text-gray-600">Completed</th>
//                   <th className="py-3 px-4 font-medium text-gray-600">Result</th>
//                   <th className="py-3 px-4 font-medium text-gray-600">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {allCompleted.map((c) => {
//                   const pct = c.exam_percentage ?? 0;
//                   const passed = pct >= 70;
//                   return (
//                     <tr key={c.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="py-3 px-4 font-medium text-gray-800">{c.name}</td>
//                       <td className="py-3 px-4 text-gray-500">{c.email}</td>
//                       <td className="py-3 px-4">
//                         <span className={`font-semibold ${passed ? "text-green-600" : "text-red-600"}`}>
//                           {pct.toFixed(0)}%
//                         </span>
//                       </td>
//                       <td className="py-3 px-4 text-gray-500">
//                         {c.exam_completed_date
//                           ? new Date(c.exam_completed_date).toLocaleDateString()
//                           : "—"}
//                       </td>
//                       <td className="py-3 px-4">
//                         <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
//                           {passed ? "✓ Passed" : "✗ Failed"}
//                         </span>
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="flex items-center gap-2">
//                           {c.assessment_invite_link && (
//                             <a
//                               href={c.assessment_invite_link}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-blue-600 hover:text-blue-800"
//                               title="View Assessment"
//                             >
//                               <ExternalLink className="w-4 h-4" />
//                             </a>
//                           )}
//                           {passed && !c.interview_scheduled && (
//                             <button
//                               onClick={() => router.push(`/scheduler?candidate_id=${c.id}`)}
//                               className="text-green-600 hover:text-green-800"
//                               title="Schedule Interview"
//                             >
//                               <Calendar className="w-4 h-4" />
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Automation Settings */}
//       <div className="bg-white rounded-lg shadow-sm border p-6">
//         <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700 mb-4">
//           <Settings className="w-5 h-5 text-gray-500" />
//           Automation Settings
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div>
//               <p className="font-medium text-sm">Auto-Check Results</p>
//               <p className="text-xs text-gray-500 mt-0.5">Automatically check for new results</p>
//             </div>
//             <input
//               type="checkbox"
//               checked={automationSettings.enabled}
//               onChange={(e) => setAutomationSettings({ ...automationSettings, enabled: e.target.checked })}
//               className="w-4 h-4 accent-blue-600"
//             />
//           </div>

//           <div className="p-4 border rounded-lg">
//             <label className="block font-medium text-sm mb-2">Check Interval</label>
//             <select
//               value={automationSettings.checkInterval}
//               onChange={(e) => setAutomationSettings({ ...automationSettings, checkInterval: parseInt(e.target.value) })}
//               className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//             >
//               <option value={15}>Every 15 minutes</option>
//               <option value={30}>Every 30 minutes</option>
//               <option value={60}>Every hour</option>
//               <option value={120}>Every 2 hours</option>
//             </select>
//           </div>

//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div>
//               <p className="font-medium text-sm">Auto-Process</p>
//               <p className="text-xs text-gray-500 mt-0.5">Send emails automatically</p>
//             </div>
//             <input
//               type="checkbox"
//               checked={automationSettings.autoProcess}
//               onChange={(e) => setAutomationSettings({ ...automationSettings, autoProcess: e.target.checked })}
//               className="w-4 h-4 accent-blue-600"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Manual Process Modal */}
//       {showManualModal && selectedCandidate && (
//         <ManualProcessModal
//           candidate={selectedCandidate}
//           onClose={() => setShowManualModal(false)}
//           onProcessed={handleManualProcessed}
//         />
//       )}
//     </div>
//   );
// };

// export default ResultsManagement;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo, useState } from "react";
import {
  RefreshCw, CheckCircle, AlertCircle, Clock, Target, TrendingUp,
  Users, Settings, ExternalLink, Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Candidate, Job } from "@/services/interfaces/CandidateScreening";

interface ResultsManagementProps {
  selectedJob: Job | null;
  candidates: Candidate[];
  onRefreshCandidates: () => void;
}

// ── Manual Process Modal ──────────────────────────────────────────────────────
const ManualProcessModal: React.FC<{
  candidate: Candidate;
  onClose: () => void;
  onProcessed: (msg: string) => void;
}> = ({ candidate, onClose, onProcessed }) => {
  const [score, setScore]                 = useState("");
  const [totalQuestions, setTotalQuestions] = useState("100");
  const pct = score && totalQuestions ? ((+score / +totalQuestions) * 100).toFixed(1) : "0";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl border border-gray-100">
        <h3 className="text-[15px] font-semibold text-gray-900 mb-0.5">Manual Process</h3>
        <p className="text-sm text-gray-400 mb-5">{candidate.name} — {candidate.email}</p>

        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Score (correct answers)</label>
        <input type="number" min="0" value={score} onChange={e => setScore(e.target.value)} placeholder="e.g. 75"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 mb-4 text-gray-700" />

        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Total Questions</label>
        <input type="number" min="1" value={totalQuestions} onChange={e => setTotalQuestions(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 mb-4 text-gray-700" />

        <div className="mb-5 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600"><strong>Percentage:</strong> {pct}%</p>
          <p className="text-xs text-gray-400 mt-0.5">Candidates scoring ≥70% will be eligible for interview</p>
        </div>

        <div className="flex gap-3">
          <button disabled={!score} onClick={() => { onProcessed(`✅ Processed ${candidate.name} (${pct}%)`); onClose(); }}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
            Process Result
          </button>
          <button onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main ─────────────────────────────────────────────────────────────────────
const ResultsManagement: React.FC<ResultsManagementProps> = ({
  selectedJob, candidates, onRefreshCandidates,
}) => {
  const router = useRouter();
  const [statusMsg, setStatusMsg]         = useState("");
  const [isRefreshing, setIsRefreshing]   = useState(false);
  const [selCandidate, setSelCandidate]   = useState<Candidate | null>(null);
  const [showModal, setShowModal]         = useState(false);
  const [automation, setAutomation]       = useState({ enabled: false, interval: 30, autoProcess: true });

  const metrics = useMemo(() => {
    const completed = candidates.filter(c => c.exam_completed);
    const passed    = completed.filter(c => (c.exam_percentage ?? 0) >= 70);
    const pending   = candidates.filter(c => c.exam_link_sent && !c.exam_completed && !c.link_expired);
    const avgScore  = completed.length
      ? (completed.reduce((s, c) => s + (c.exam_percentage ?? 0), 0) / completed.length).toFixed(1)
      : "0";
    return {
      pending:  pending.length,
      completed: completed.length,
      passRate: completed.length ? ((passed.length / completed.length) * 100).toFixed(1) : "0",
      avgScore,
    };
  }, [candidates]);

  const pendingList    = useMemo(() => candidates.filter(c => c.exam_link_sent && !c.exam_completed && !c.link_expired), [candidates]);
  const completedList  = useMemo(() => [...candidates.filter(c => c.exam_completed)].sort((a, b) => +new Date(b.exam_completed_date ?? 0) - +new Date(a.exam_completed_date ?? 0)), [candidates]);
  const recentList     = completedList.slice(0, 8);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setStatusMsg("🔍 Refreshing results...");
    onRefreshCandidates();
    setTimeout(() => { setIsRefreshing(false); setStatusMsg("✅ Results refreshed!"); setTimeout(() => setStatusMsg(""), 4000); }, 1500);
  };

  const statusCls = statusMsg.includes("❌") ? "bg-red-50 border-red-200 text-red-700"
    : statusMsg.includes("✅") ? "bg-green-50 border-green-200 text-green-700"
    : "bg-blue-50 border-blue-200 text-blue-700";

  return (
    <div className="space-y-5">

      {statusMsg && (
        <div className={`flex items-center gap-2 p-3 rounded-lg border text-sm ${statusCls}`}>
          {statusMsg.includes("🔍") && <RefreshCw className="w-4 h-4 animate-spin flex-shrink-0" />}
          {statusMsg.includes("✅") && <CheckCircle className="w-4 h-4 flex-shrink-0" />}
          {statusMsg.includes("❌") && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          <span>{statusMsg}</span>
        </div>
      )}

      {/* ── Quick stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Pending Results", value: metrics.pending,   Icon: Clock,     cls: "text-orange-600 bg-orange-50" },
          { label: "Completed",       value: metrics.completed, Icon: CheckCircle, cls: "text-green-600 bg-green-50"  },
          { label: "Pass Rate",       value: `${metrics.passRate}%`, Icon: Target,  cls: "text-blue-600 bg-blue-50"   },
          { label: "Avg Score",       value: `${metrics.avgScore}%`, Icon: TrendingUp, cls: "text-purple-600 bg-purple-50" },
        ].map(({ label, value, Icon, cls }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
              </div>
              <div className={`p-2 rounded-lg ${cls}`}><Icon className="w-4 h-4" /></div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Results management panel ── */}
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[14px] font-semibold text-gray-800">Results Management</h3>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || !selectedJob}
            className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Results"}
          </button>
        </div>

        {!selectedJob ? (
          <div className="flex flex-col items-center py-10 text-gray-400 gap-2">
            <Users className="w-10 h-10 text-gray-200" />
            <p className="text-sm">Select a job to manage results</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Pending */}
            <div>
              <h4 className="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-orange-500" />
                Pending ({pendingList.length})
              </h4>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {pendingList.length === 0 ? (
                  <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <CheckCircle className="w-7 h-7 mx-auto mb-1.5 text-green-400" />
                    <p className="text-xs text-gray-400">No pending assessments</p>
                  </div>
                ) : pendingList.map(c => (
                  <div key={c.id} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                        <p className="text-xs text-gray-400 truncate">{c.email}</p>
                        <p className="text-[11px] text-gray-300 mt-0.5">
                          Sent: {c.exam_link_sent_date ? new Date(c.exam_link_sent_date).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button onClick={() => { setSelCandidate(c); setShowModal(true); }}
                          className="text-[11px] font-medium px-2 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                          Manual
                        </button>
                        {c.assessment_invite_link && (
                          <a href={c.assessment_invite_link} target="_blank" rel="noopener noreferrer"
                            className="text-[11px] font-medium px-2 py-1 rounded bg-green-50 text-green-600 hover:bg-green-100 transition-colors flex items-center gap-1">
                            <ExternalLink className="w-2.5 h-2.5" /> View
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent completions */}
            <div>
              <h4 className="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Recent Completions ({recentList.length})
              </h4>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {recentList.length === 0 ? (
                  <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <Clock className="w-7 h-7 mx-auto mb-1.5 text-gray-300" />
                    <p className="text-xs text-gray-400">No completed assessments yet</p>
                  </div>
                ) : recentList.map(c => {
                  const pct    = c.exam_percentage ?? 0;
                  const passed = pct >= 70;
                  return (
                    <div key={c.id} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                          <p className="text-xs text-gray-400 truncate">{c.email}</p>
                          <p className="text-[11px] text-gray-300 mt-0.5">
                            {c.exam_completed_date ? new Date(c.exam_completed_date).toLocaleDateString() : ""}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className={`inline-block px-2 py-0.5 rounded text-sm font-semibold ${passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {pct.toFixed(0)}%
                          </span>
                          <p className="text-[11px] text-gray-400 mt-0.5">{passed ? "Passed" : "Failed"}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Full results table ── */}
      {selectedJob && completedList.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h3 className="text-[14px] font-semibold text-gray-800 mb-4">All Assessment Results ({completedList.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Candidate", "Email", "Score", "Completed", "Result", "Actions"].map(h => (
                    <th key={h} className="px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {completedList.map(c => {
                  const pct    = c.exam_percentage ?? 0;
                  const passed = pct >= 70;
                  return (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{c.email}</td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${passed ? "text-green-600" : "text-red-600"}`}>{pct.toFixed(0)}%</span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {c.exam_completed_date ? new Date(c.exam_completed_date).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {passed ? "✓ Passed" : "✗ Failed"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {c.assessment_invite_link && (
                            <a href={c.assessment_invite_link} target="_blank" rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-600 transition-colors"><ExternalLink className="w-4 h-4" /></a>
                          )}
                          {passed && !c.interview_scheduled && (
                            <button onClick={() => router.push(`/scheduler?candidate_id=${c.id}`)}
                              className="text-green-500 hover:text-green-700 transition-colors"><Calendar className="w-4 h-4" /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Automation settings ── */}
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <h3 className="text-[14px] font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Settings className="w-4 h-4 text-gray-400" /> Automation Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-700">Auto-Check Results</p>
              <p className="text-xs text-gray-400 mt-0.5">Automatically check for new results</p>
            </div>
            <input type="checkbox" checked={automation.enabled}
              onChange={e => setAutomation({ ...automation, enabled: e.target.checked })}
              className="w-4 h-4 accent-blue-600" />
          </div>
          <div className="p-4 border border-gray-100 rounded-xl">
            <label className="block text-sm font-medium text-gray-700 mb-2">Check Interval</label>
            <select value={automation.interval}
              onChange={e => setAutomation({ ...automation, interval: +e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-300 text-gray-600">
              <option value={15}>Every 15 minutes</option>
              <option value={30}>Every 30 minutes</option>
              <option value={60}>Every hour</option>
              <option value={120}>Every 2 hours</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-700">Auto-Process</p>
              <p className="text-xs text-gray-400 mt-0.5">Send emails automatically</p>
            </div>
            <input type="checkbox" checked={automation.autoProcess}
              onChange={e => setAutomation({ ...automation, autoProcess: e.target.checked })}
              className="w-4 h-4 accent-blue-600" />
          </div>
        </div>
      </div>

      {showModal && selCandidate && (
        <ManualProcessModal
          candidate={selCandidate}
          onClose={() => setShowModal(false)}
          onProcessed={msg => { setStatusMsg(msg); onRefreshCandidates(); setTimeout(() => setStatusMsg(""), 5000); }}
        />
      )}
    </div>
  );
};

export default ResultsManagement;