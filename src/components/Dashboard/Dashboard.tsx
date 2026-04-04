// // // // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // // // "use client";

// // // // // import React, { useCallback, useEffect, useMemo, useState } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";

// // // // // import { RefreshCw, Users, Target, Clock, Bell, AlertCircle} from "lucide-react";

// // // // // import StatCard from "./subComponents/StatCard";
// // // // // import PipelineRunner from "./subComponents/PipelineRunner";

// // // // // import {
// // // // //   ResponsiveContainer,
// // // // //   CartesianGrid,
// // // // //   Tooltip,
// // // // //   XAxis,
// // // // //   YAxis,
// // // // //   BarChart,
// // // // //   Bar,
// // // // //   LineChart,
// // // // //   Line,
// // // // //   Legend,
// // // // //   Cell,
// // // // // } from "recharts";

// // // // // import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// // // // // const Dashboard: React.FC = () => {
// // // // //   const router = useRouter();
// // // // //   const dispatch = useAppDispatch();
// // // // //   const { jobs, candidates, recruitmentData, loading } = useAppSelector((state) => state.dashboard);  
// // // // //   const [refreshing, setRefreshing] = useState(false);
// // // // //   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
// // // // //   const [selectedTimeRange, setSelectedTimeRange] =useState<"week" | "month" | "quarter" | "year">("month");
// // // // //   const [notifications, setNotifications] = useState<any[]>([]);
// // // // //   const [pipelineStatus, setPipelineStatus] = useState<Record<string, any>>({});
// // // // //   const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

// // // // //   const fetchAll = useCallback(
// // // // //     async (force = false) => {
// // // // //       if (force) setRefreshing(true);
// // // // //       try {
// // // // //         await dispatch(dashboardRefreshAll()).unwrap();
// // // // //         setLastFetchTime(new Date());
// // // // //       } finally {
// // // // //         setRefreshing(false);
// // // // //       }
// // // // //     },
// // // // //     [dispatch]
// // // // //   );

// // // // //   useEffect(() => {
// // // // //     fetchAll();
// // // // //     const id = setInterval(() => fetchAll(true), 120000);
// // // // //     return () => clearInterval(id);
// // // // //   }, [fetchAll, selectedTimeRange]);

// // // // //   const stats = useMemo(() => {
// // // // //     const total = candidates.length;
// // // // //     const shortlisted = candidates.filter((c: { status: string }) => c?.status === "Shortlisted").length;
// // // // //     const interviews = candidates.filter((c: { interview_scheduled: any }) => c?.interview_scheduled).length;
// // // // //     const assessmentsSent = candidates.filter((c: { exam_link_sent: any }) => c?.exam_link_sent).length;
// // // // //     const assessmentsCompleted = candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length;
// // // // //     const hires = candidates.filter((c: { final_status: string }) => c?.final_status === "Hired").length;
// // // // //     const pendingAssessments = candidates.filter(
// // // // //       (c) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// // // // //     ).length;

// // // // //     const now = new Date();
// // // // //     const pendingInterviews = candidates.filter((c: { interview_date: string | number | Date; interview_scheduled: any }) => {
// // // // //       if (!c?.interview_date) return false;
// // // // //       return c?.interview_scheduled && new Date(c.interview_date) > now;
// // // // //     }).length;

// // // // //     const timeToHire = (() => {
// // // // //       const hired = candidates.filter((c: { final_status: string; processed_date: any }) => c?.final_status === "Hired" && c?.processed_date);
// // // // //       if (!hired.length) return 0;
// // // // //       const totalDays = hired.reduce((acc: number, c: { processed_date: string | number | Date }) => {
// // // // //         const start = new Date(c.processed_date).getTime();
// // // // //         const days = Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24));
// // // // //         return acc + Math.max(days, 0);
// // // // //       }, 0);
// // // // //       return Math.round(totalDays / hired.length);
// // // // //     })();

// // // // //     return {
// // // // //       totalApplications: total,
// // // // //       activeInterviews: interviews,
// // // // //       timeToHire,
// // // // //       activeAssessments: pendingAssessments,
// // // // //       shortlistRate: total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
// // // // //       assessmentCompletionRate:
// // // // //         assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
// // // // //       totalHires: hires,
// // // // //       pendingActions: pendingAssessments + pendingInterviews,
// // // // //     };
// // // // //   }, [candidates]);

// // // // //   useEffect(() => {
// // // // //     const outs: any[] = [];
// // // // //     const pendingAssessments = candidates.filter(
// // // // //       (c: { exam_link_sent: any; exam_completed: any; link_expired: any }) =>
// // // // //         c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// // // // //     );
// // // // //     if (pendingAssessments.length) {
// // // // //       outs.push({
// // // // //         id: 1,
// // // // //         type: "warning",
// // // // //         message: `${pendingAssessments.length} candidates have pending assessments`,
// // // // //         action: "View Candidates",
// // // // //         route: "/candidates",
// // // // //       });
// // // // //     }
// // // // //     const upcomingToday = candidates.filter((c: { interview_date: string | number | Date }) => {
// // // // //       if (!c?.interview_date) return false;
// // // // //       const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / (1000 * 60 * 60);
// // // // //       return diffHrs > 0 && diffHrs < 24;
// // // // //     });
// // // // //     if (upcomingToday.length) {
// // // // //       outs.push({
// // // // //         id: 2,
// // // // //         type: "info",
// // // // //         message: `${upcomingToday.length} interviews scheduled for today`,
// // // // //         action: "View Schedule",
// // // // //         route: "/scheduler",
// // // // //       });
// // // // //     }
// // // // //     setNotifications(outs);
// // // // //   }, [candidates]);

// // // // //   const pipelineStages = useMemo(
// // // // //     () => [
// // // // //       { name: "Applied", value: candidates.length, color: "#3B82F6" },
// // // // //       { name: "Screened", value: candidates.filter((c: { ats_score: number }) => c?.ats_score > 0).length, color: "#10B981" },
// // // // //       { name: "Shortlisted", value: candidates.filter((c: { status: string }) => c?.status === "Shortlisted").length, color: "#F59E0B" },
// // // // //       { name: "Assessment", value: candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length, color: "#8B5CF6" },
// // // // //       { name: "Interview", value: candidates.filter((c: { interview_scheduled: any }) => c?.interview_scheduled).length, color: "#EF4444" },
// // // // //       { name: "Hired", value: candidates.filter((c: { final_status: string }) => c?.final_status === "Hired").length, color: "#059669" },
// // // // //     ],
// // // // //     [candidates]
// // // // //   );

// // // // //   const assessmentMetrics = useMemo(
// // // // //     () => [
// // // // //       { name: "Sent", value: candidates.filter((c: { exam_link_sent: any }) => c?.exam_link_sent).length },
// // // // //       { name: "Started", value: candidates.filter((c: { exam_started: any }) => c?.exam_started).length },
// // // // //       { name: "Completed", value: candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length },
// // // // //       { name: "Passed", value: candidates.filter((c: { exam_percentage: number }) => c?.exam_percentage >= 70).length },
// // // // //     ],
// // // // //     [candidates]
// // // // //   );

// // // // //   const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

// // // // //   if (loading && !lastFetchTime) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
// // // // //           <p className="mt-4 text-gray-600">Loading dashboard...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen p-6 bg-white">
// // // // //         <div className="flex items-center justify-between mb-6">
// // // // //           <div>
// // // // //             <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
// // // // //             <div className="flex items-center mt-1 space-x-4">
// // // // //               <p className="text-gray-600">Welcome back! Here&apos;s your recruitment overview</p>
// // // // //               {lastFetchTime && (
// // // // //                 <span className="text-xs text-gray-500">
// // // // //                   Last updated: {lastFetchTime.toLocaleTimeString()}
// // // // //                 </span>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>
// // // // //           <div className="flex items-center space-x-3">
// // // // //             <button
// // // // //               onClick={handleRefresh}
// // // // //               disabled={refreshing}
// // // // //               className="p-2 border border-gray-500 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-gray-500"
// // // // //               title="Refresh Data"
// // // // //             >
// // // // //               <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
// // // // //             </button>
// // // // //             <select
// // // // //               value={selectedTimeRange}
// // // // //               onChange={(e) => setSelectedTimeRange(e.target.value as any)}
// // // // //               className="border rounded-lg px-4 py-2 text-sm text-gray-500"
// // // // //             >
// // // // //               <option value="week">This Week</option>
// // // // //               <option value="month">This Month</option>
// // // // //               <option value="quarter">This Quarter</option>
// // // // //               <option value="year">This Year</option>
// // // // //             </select>
// // // // //             <button
// // // // //               onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// // // // //               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// // // // //             >
// // // // //               New Pipeline
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Notifications */}
// // // // //         {notifications.length > 0 && (
// // // // //           <div className="mb-6 space-y-2">
// // // // //             {notifications.map((n) => (
// // // // //               <div
// // // // //                 key={n.id}
// // // // //                 className={`p-4 rounded-lg border flex items-center justify-between ${
// // // // //                   n.type === "warning" ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200"
// // // // //                 }`}
// // // // //               >
// // // // //                 <div className="flex items-center">
// // // // //                   <AlertCircle
// // // // //                     className={`w-5 h-5 mr-3 ${n.type === "warning" ? "text-yellow-600" : "text-blue-600"}`}
// // // // //                   />
// // // // //                   <span className={n.type === "warning" ? "text-yellow-800" : "text-blue-800"}>
// // // // //                     {n.message}
// // // // //                   </span>
// // // // //                 </div>
// // // // //                 <button
// // // // //                   onClick={() => router.push(n.route)}
// // // // //                   className={`px-3 py-1 rounded text-sm font-medium ${
// // // // //                     n.type === "warning"
// // // // //                       ? "bg-yellow-600 text-white hover:bg-yellow-700"
// // // // //                       : "bg-blue-600 text-white hover:bg-blue-700"
// // // // //                   }`}
// // // // //                 >
// // // // //                   {n.action}
// // // // //                 </button>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Stats */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // //           <StatCard
// // // // //             title="Total Applications"
// // // // //             value={stats.totalApplications}
// // // // //             change={12.5}
// // // // //             icon={Users}
// // // // //             color="bg-blue-600"
// // // // //             subtitle="All time applications"
// // // // //             loading={loading}
// // // // //           />
// // // // //           <StatCard
// // // // //             title="Shortlist Rate"
// // // // //             value={`${stats.shortlistRate}%`}
// // // // //             change={5.2}
// // // // //             icon={Target}
// // // // //             color="bg-green-600"
// // // // //             subtitle="Candidates shortlisted"
// // // // //             loading={loading}
// // // // //           />
// // // // //           <StatCard
// // // // //             title="Time-to-Hire"
// // // // //             value={`${stats.timeToHire}d`}
// // // // //             change={-8.3}
// // // // //             icon={Clock}
// // // // //             color="bg-yellow-600"
// // // // //             subtitle="Average days to hire"
// // // // //             loading={loading}
// // // // //           />
// // // // //           <StatCard
// // // // //             title="Pending Actions"
// // // // //             value={stats.pendingActions}
// // // // //             icon={Bell}
// // // // //             color="bg-purple-600"
// // // // //             subtitle="Requires attention"
// // // // //             loading={loading}
// // // // //           />
// // // // //         </div>

// // // // //         {/* Charts */}
// // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
// // // // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // // // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Pipeline</h3>
// // // // //             <ResponsiveContainer width="100%" height={300}>
// // // // //               <BarChart data={pipelineStages}>
// // // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // // //                 <XAxis dataKey="name" />
// // // // //                 <YAxis />
// // // // //                 <Tooltip />
// // // // //                 <Bar dataKey="value" fill="#3B82F6">
// // // // //                   {pipelineStages.map((e, i) => (
// // // // //                     <Cell key={i} fill={e.color} />
// // // // //                   ))}
// // // // //                 </Bar>
// // // // //               </BarChart>
// // // // //             </ResponsiveContainer>
// // // // //           </div>

// // // // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // // // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Activity</h3>
// // // // //             <ResponsiveContainer width="100%" height={300}>
// // // // //               <LineChart data={recruitmentData}>
// // // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // // //                 <XAxis dataKey="date" /> {/* change to "month" if your API provides that */}
// // // // //                 <YAxis />
// // // // //                 <Tooltip />
// // // // //                 <Legend />
// // // // //                 <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
// // // // //                 <Line type="monotone" dataKey="interviews" stroke="#10B981" strokeWidth={2} />
// // // // //                 <Line type="monotone" dataKey="hires" stroke="#EF4444" strokeWidth={2} />
// // // // //               </LineChart>
// // // // //             </ResponsiveContainer>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Jobs table */}
// // // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
// // // // //           <div className="p-6 border-b border-gray-200 flex items-center justify-between">
// // // // //             <h3 className="text-lg font-semibold text-gray-700">Active Job Positions</h3>
// // // // //             <button
// // // // //               onClick={() => router.push("/candidates")}
// // // // //               className="text-blue-600 hover:text-blue-700 text-sm font-medium"
// // // // //             >
// // // // //               View All Candidates →
// // // // //             </button>
// // // // //           </div>
// // // // //           <div className="overflow-x-auto">
// // // // //             <table className="w-full">
// // // // //               <thead>
// // // // //                 <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
// // // // //                   <th className="px-6 py-3">Position</th>
// // // // //                   <th className="px-6 py-3">Department</th>
// // // // //                   <th className="px-6 py-3">Location</th>
// // // // //                   <th className="px-6 py-3">Applications</th>
// // // // //                   <th className="px-6 py-3">Shortlisted</th>
// // // // //                   <th className="px-6 py-3">In Progress</th>
// // // // //                   <th className="px-6 py-3">Status</th>
// // // // //                   <th className="px-6 py-3">Actions</th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody className="divide-y divide-gray-200">
// // // // //                 {jobs.length === 0 ? (
// // // // //                   <tr>
// // // // //                     <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
// // // // //                       <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// // // // //                       <p className="text-lg font-medium">No job positions found</p>
// // // // //                       <p className="mt-1">Start a new recruitment pipeline to begin</p>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ) : (
// // // // //                   jobs.map((job: any) => {
// // // // //                     const jobCandidates = candidates.filter((c: { job_id: any }) => c?.job_id === job.id);
// // // // //                     const shortlisted = jobCandidates.filter((c: { status: string }) => c?.status === "Shortlisted").length;
// // // // //                     const inProgress = jobCandidates.filter(
// // // // //                       (c: { exam_link_sent: any; interview_scheduled: any }) => c?.exam_link_sent || c?.interview_scheduled
// // // // //                     ).length;

// // // // //                     return (
// // // // //                       <tr key={job.id} className="hover:bg-gray-50">
// // // // //                         <td className="px-6 py-4">
// // // // //                           <div className="text-sm font-medium text-gray-900">{job.title}</div>
// // // // //                         </td>
// // // // //                         <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
// // // // //                         <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
// // // // //                         <td className="px-6 py-4">
// // // // //                           <span className="text-sm font-medium text-gray-900">
// // // // //                             {jobCandidates.length}
// // // // //                           </span>
// // // // //                         </td>
// // // // //                         <td className="px-6 py-4">
// // // // //                           <span className="text-sm font-medium text-green-600">{shortlisted}</span>
// // // // //                         </td>
// // // // //                         <td className="px-6 py-4">
// // // // //                           <span className="text-sm font-medium text-blue-600">{inProgress}</span>
// // // // //                         </td>
// // // // //                         <td className="px-6 py-4">
// // // // //                           <span className="inline-flex px-2 py-1 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
// // // // //                             Active
// // // // //                           </span>
// // // // //                         </td>
// // // // //                         <td className="px-6 py-4 text-sm">
// // // // //                           <div className="flex space-x-2">
// // // // //                             <button
// // // // //                               onClick={() => router.push(`/candidates?job_id=${job.id}`)}
// // // // //                               className="text-blue-600 hover:text-blue-900 font-medium"
// // // // //                             >
// // // // //                               View
// // // // //                             </button>
// // // // //                             <button
// // // // //                               onClick={() => setSelectedPipelineJob(job)}
// // // // //                               className="text-green-600 hover:text-green-900 font-medium"
// // // // //                             >
// // // // //                               Run Pipeline
// // // // //                             </button>
// // // // //                           </div>
// // // // //                         </td>
// // // // //                       </tr>
// // // // //                     );
// // // // //                   })
// // // // //                 )}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Assessment metrics + Quick actions */}
// // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // // // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Assessment Metrics</h3>
// // // // //             <ResponsiveContainer width="100%" height={200}>
// // // // //               <BarChart data={assessmentMetrics}>
// // // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // // //                 <XAxis dataKey="name" />
// // // // //                 <YAxis />
// // // // //                 <Tooltip />
// // // // //                 <Bar dataKey="value" fill="#8B5CF6" />
// // // // //               </BarChart>
// // // // //             </ResponsiveContainer>
// // // // //             <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
// // // // //               <div>
// // // // //                 <p className="text-gray-500">Completion Rate</p>
// // // // //                 <p className="text-xl font-semibold text-gray-500">{stats.assessmentCompletionRate}%</p>
// // // // //               </div>
// // // // //               <div>
// // // // //                 <p className="text-gray-500">Pass Rate</p>
// // // // //                 <p className="text-xl font-semibold text-gray-500">
// // // // //                   {candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length > 0
// // // // //                     ? (
// // // // //                         (candidates.filter((c: { exam_percentage: number }) => c?.exam_percentage >= 70).length /
// // // // //                           candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length) *
// // // // //                         100
// // // // //                       ).toFixed(1)
// // // // //                     : 0}
// // // // //                   %
// // // // //                 </p>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>

// // // // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // // // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
// // // // //             <div className="space-y-3">
// // // // //               <button
// // // // //                 onClick={() => router.push("/assessments")}
// // // // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // // // //               >
// // // // //                 <span className="font-medium text-gray-700">Manage Assessments</span>
// // // // //                 <span className="text-sm text-gray-500">{stats.activeAssessments} pending</span>
// // // // //               </button>

// // // // //               <button
// // // // //                 onClick={() => router.push("/scheduler")}
// // // // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // // // //               >
// // // // //                 <span className="font-medium text-gray-700">Schedule Interviews</span>
// // // // //                 <span className="text-sm text-gray-500">{stats.activeInterviews} scheduled</span>
// // // // //               </button>

// // // // //               <button
// // // // //                 onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// // // // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // // // //               >
// // // // //                 <span className="font-medium text-gray-700">Start New Recruitment</span>
// // // // //                 <span className="text-sm text-gray-500">Run pipeline</span>
// // // // //               </button>

// // // // //               <button
// // // // //                 onClick={() => router.push("/candidates")}
// // // // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // // // //               >
// // // // //                 <span className="font-medium text-gray-700">View All Candidates</span>
// // // // //                 <span className="text-sm text-gray-500">{candidates.length} total</span>
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //       {selectedPipelineJob && (
// // // // //         <PipelineRunner
// // // // //           job={selectedPipelineJob}
// // // // //           onPipelineStart={() =>
// // // // //             setPipelineStatus((p) => ({
// // // // //               ...p,
// // // // //               [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
// // // // //             }))
// // // // //           }
// // // // //           onPipelineComplete={() => {
// // // // //             fetchAll(true);
// // // // //             setPipelineStatus((p) => ({
// // // // //               ...p,
// // // // //               [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
// // // // //             }));
// // // // //           }}
// // // // //           onClose={() => setSelectedPipelineJob(null)}
// // // // //         />
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Dashboard;
// // // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // // "use client";

// // // // import React, { useCallback, useEffect, useMemo, useState } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";

// // // // import { RefreshCw, Users, Target, Clock, Bell, AlertCircle} from "lucide-react";

// // // // import StatCard from "./subComponents/StatCard";
// // // // import PipelineRunner from "./subComponents/PipelineRunner";
// // // // import RecruitmentJourney from "./subComponents/RecruitmentJourney";

// // // // import {
// // // //   ResponsiveContainer,
// // // //   CartesianGrid,
// // // //   Tooltip,
// // // //   XAxis,
// // // //   YAxis,
// // // //   BarChart,
// // // //   Bar,
// // // //   LineChart,
// // // //   Line,
// // // //   Legend,
// // // //   Cell,
// // // // } from "recharts";

// // // // import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// // // // const Dashboard: React.FC = () => {
// // // //   const router = useRouter();
// // // //   const dispatch = useAppDispatch();
// // // //   const { jobs, candidates, recruitmentData, loading } = useAppSelector((state) => state.dashboard);  
// // // //   const [refreshing, setRefreshing] = useState(false);
// // // //   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
// // // //   const [selectedTimeRange, setSelectedTimeRange] =useState<"week" | "month" | "quarter" | "year">("month");
// // // //   const [notifications, setNotifications] = useState<any[]>([]);
// // // //   const [pipelineStatus, setPipelineStatus] = useState<Record<string, any>>({});
// // // //   const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

// // // //   const fetchAll = useCallback(
// // // //     async (force = false) => {
// // // //       if (force) setRefreshing(true);
// // // //       try {
// // // //         await dispatch(dashboardRefreshAll()).unwrap();
// // // //         setLastFetchTime(new Date());
// // // //       } finally {
// // // //         setRefreshing(false);
// // // //       }
// // // //     },
// // // //     [dispatch]
// // // //   );

// // // //   useEffect(() => {
// // // //     fetchAll();
// // // //     const id = setInterval(() => fetchAll(true), 120000);
// // // //     return () => clearInterval(id);
// // // //   }, [fetchAll, selectedTimeRange]);

// // // //   const stats = useMemo(() => {
// // // //     const total = candidates.length;
// // // //     const shortlisted = candidates.filter((c: { status: string }) => c?.status === "Shortlisted").length;
// // // //     const interviews = candidates.filter((c: { interview_scheduled: any }) => c?.interview_scheduled).length;
// // // //     const assessmentsSent = candidates.filter((c: { exam_link_sent: any }) => c?.exam_link_sent).length;
// // // //     const assessmentsCompleted = candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length;
// // // //     const hires = candidates.filter((c: { final_status: string }) => c?.final_status === "Hired").length;
// // // //     const pendingAssessments = candidates.filter(
// // // //       (c) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// // // //     ).length;

// // // //     const now = new Date();
// // // //     const pendingInterviews = candidates.filter((c: { interview_date: string | number | Date; interview_scheduled: any }) => {
// // // //       if (!c?.interview_date) return false;
// // // //       return c?.interview_scheduled && new Date(c.interview_date) > now;
// // // //     }).length;

// // // //     const timeToHire = (() => {
// // // //       const hired = candidates.filter((c: { final_status: string; processed_date: any }) => c?.final_status === "Hired" && c?.processed_date);
// // // //       if (!hired.length) return 0;
// // // //       const totalDays = hired.reduce((acc: number, c: { processed_date: string | number | Date }) => {
// // // //         const start = new Date(c.processed_date).getTime();
// // // //         const days = Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24));
// // // //         return acc + Math.max(days, 0);
// // // //       }, 0);
// // // //       return Math.round(totalDays / hired.length);
// // // //     })();

// // // //     return {
// // // //       totalApplications: total,
// // // //       activeInterviews: interviews,
// // // //       timeToHire,
// // // //       activeAssessments: pendingAssessments,
// // // //       shortlistRate: total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
// // // //       assessmentCompletionRate:
// // // //         assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
// // // //       totalHires: hires,
// // // //       pendingActions: pendingAssessments + pendingInterviews,
// // // //     };
// // // //   }, [candidates]);

// // // //   useEffect(() => {
// // // //     const outs: any[] = [];
// // // //     const pendingAssessments = candidates.filter(
// // // //       (c: { exam_link_sent: any; exam_completed: any; link_expired: any }) =>
// // // //         c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// // // //     );
// // // //     if (pendingAssessments.length) {
// // // //       outs.push({
// // // //         id: 1,
// // // //         type: "warning",
// // // //         message: `${pendingAssessments.length} candidates have pending assessments`,
// // // //         action: "View Candidates",
// // // //         route: "/candidates",
// // // //       });
// // // //     }
// // // //     const upcomingToday = candidates.filter((c: { interview_date: string | number | Date }) => {
// // // //       if (!c?.interview_date) return false;
// // // //       const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / (1000 * 60 * 60);
// // // //       return diffHrs > 0 && diffHrs < 24;
// // // //     });
// // // //     if (upcomingToday.length) {
// // // //       outs.push({
// // // //         id: 2,
// // // //         type: "info",
// // // //         message: `${upcomingToday.length} interviews scheduled for today`,
// // // //         action: "View Schedule",
// // // //         route: "/scheduler",
// // // //       });
// // // //     }
// // // //     setNotifications(outs);
// // // //   }, [candidates]);

// // // //   const pipelineStages = useMemo(
// // // //     () => [
// // // //       { name: "Applied", value: candidates.length, color: "#3B82F6" },
// // // //       { name: "Screened", value: candidates.filter((c: { ats_score: number }) => c?.ats_score > 0).length, color: "#10B981" },
// // // //       { name: "Shortlisted", value: candidates.filter((c: { status: string }) => c?.status === "Shortlisted").length, color: "#F59E0B" },
// // // //       { name: "Assessment", value: candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length, color: "#8B5CF6" },
// // // //       { name: "Interview", value: candidates.filter((c: { interview_scheduled: any }) => c?.interview_scheduled).length, color: "#EF4444" },
// // // //       { name: "Hired", value: candidates.filter((c: { final_status: string }) => c?.final_status === "Hired").length, color: "#059669" },
// // // //     ],
// // // //     [candidates]
// // // //   );

// // // //   const assessmentMetrics = useMemo(
// // // //     () => [
// // // //       { name: "Sent", value: candidates.filter((c: { exam_link_sent: any }) => c?.exam_link_sent).length },
// // // //       { name: "Started", value: candidates.filter((c: { exam_started: any }) => c?.exam_started).length },
// // // //       { name: "Completed", value: candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length },
// // // //       { name: "Passed", value: candidates.filter((c: { exam_percentage: number }) => c?.exam_percentage >= 70).length },
// // // //     ],
// // // //     [candidates]
// // // //   );

// // // //   const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

// // // //   if (loading && !lastFetchTime) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
// // // //           <p className="mt-4 text-gray-600">Loading dashboard...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen p-6 bg-white">
// // // //         <div className="flex items-center justify-between mb-6">
// // // //           <div>
// // // //             <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
// // // //             <div className="flex items-center mt-1 space-x-4">
// // // //               <p className="text-gray-600">Welcome back! Here&apos;s your recruitment overview</p>
// // // //               {lastFetchTime && (
// // // //                 <span className="text-xs text-gray-500">
// // // //                   Last updated: {lastFetchTime.toLocaleTimeString()}
// // // //                 </span>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //           <div className="flex items-center space-x-3">
// // // //             <button
// // // //               onClick={handleRefresh}
// // // //               disabled={refreshing}
// // // //               className="p-2 border border-gray-500 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-gray-500"
// // // //               title="Refresh Data"
// // // //             >
// // // //               <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
// // // //             </button>
// // // //             <select
// // // //               value={selectedTimeRange}
// // // //               onChange={(e) => setSelectedTimeRange(e.target.value as any)}
// // // //               className="border rounded-lg px-4 py-2 text-sm text-gray-500"
// // // //             >
// // // //               <option value="week">This Week</option>
// // // //               <option value="month">This Month</option>
// // // //               <option value="quarter">This Quarter</option>
// // // //               <option value="year">This Year</option>
// // // //             </select>
// // // //             <button
// // // //               onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// // // //               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// // // //             >
// // // //               New Pipeline
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Notifications */}
// // // //         {notifications.length > 0 && (
// // // //           <div className="mb-6 space-y-2">
// // // //             {notifications.map((n) => (
// // // //               <div
// // // //                 key={n.id}
// // // //                 className={`p-4 rounded-lg border flex items-center justify-between ${
// // // //                   n.type === "warning" ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200"
// // // //                 }`}
// // // //               >
// // // //                 <div className="flex items-center">
// // // //                   <AlertCircle
// // // //                     className={`w-5 h-5 mr-3 ${n.type === "warning" ? "text-yellow-600" : "text-blue-600"}`}
// // // //                   />
// // // //                   <span className={n.type === "warning" ? "text-yellow-800" : "text-blue-800"}>
// // // //                     {n.message}
// // // //                   </span>
// // // //                 </div>
// // // //                 <button
// // // //                   onClick={() => router.push(n.route)}
// // // //                   className={`px-3 py-1 rounded text-sm font-medium ${
// // // //                     n.type === "warning"
// // // //                       ? "bg-yellow-600 text-white hover:bg-yellow-700"
// // // //                       : "bg-blue-600 text-white hover:bg-blue-700"
// // // //                   }`}
// // // //                 >
// // // //                   {n.action}
// // // //                 </button>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         )}

// // // //         {/* ── Recruitment Journey Stepper ── */}
// // // //         <RecruitmentJourney
// // // //           currentStep={(() => {
// // // //             // Auto-derive active step from live candidate/job data
// // // //             if (candidates.filter((c: any) => c?.interview_scheduled).length > 0) return 4;
// // // //             if (candidates.filter((c: any) => c?.ats_score > 0).length > 0) return 3;
// // // //             if (candidates.filter((c: any) => c?.exam_link_sent).length > 0) return 2;
// // // //             if (jobs.length > 0) return 1;
// // // //             return 0;
// // // //           })()}
// // // //           onStepClick={(route) => router.push(route)}
// // // //         />

// // // //         {/* Stats */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // //           <StatCard
// // // //             title="Total Applications"
// // // //             value={stats.totalApplications}
// // // //             change={12.5}
// // // //             icon={Users}
// // // //             color="bg-blue-600"
// // // //             subtitle="All time applications"
// // // //             loading={loading}
// // // //           />
// // // //           <StatCard
// // // //             title="Shortlist Rate"
// // // //             value={`${stats.shortlistRate}%`}
// // // //             change={5.2}
// // // //             icon={Target}
// // // //             color="bg-green-600"
// // // //             subtitle="Candidates shortlisted"
// // // //             loading={loading}
// // // //           />
// // // //           <StatCard
// // // //             title="Time-to-Hire"
// // // //             value={`${stats.timeToHire}d`}
// // // //             change={-8.3}
// // // //             icon={Clock}
// // // //             color="bg-yellow-600"
// // // //             subtitle="Average days to hire"
// // // //             loading={loading}
// // // //           />
// // // //           <StatCard
// // // //             title="Pending Actions"
// // // //             value={stats.pendingActions}
// // // //             icon={Bell}
// // // //             color="bg-purple-600"
// // // //             subtitle="Requires attention"
// // // //             loading={loading}
// // // //           />
// // // //         </div>

// // // //         {/* Charts */}
// // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
// // // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Pipeline</h3>
// // // //             <ResponsiveContainer width="100%" height={300}>
// // // //               <BarChart data={pipelineStages}>
// // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // //                 <XAxis dataKey="name" />
// // // //                 <YAxis />
// // // //                 <Tooltip />
// // // //                 <Bar dataKey="value" fill="#3B82F6">
// // // //                   {pipelineStages.map((e, i) => (
// // // //                     <Cell key={i} fill={e.color} />
// // // //                   ))}
// // // //                 </Bar>
// // // //               </BarChart>
// // // //             </ResponsiveContainer>
// // // //           </div>

// // // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Activity</h3>
// // // //             <ResponsiveContainer width="100%" height={300}>
// // // //               <LineChart data={recruitmentData}>
// // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // //                 <XAxis dataKey="date" /> {/* change to "month" if your API provides that */}
// // // //                 <YAxis />
// // // //                 <Tooltip />
// // // //                 <Legend />
// // // //                 <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
// // // //                 <Line type="monotone" dataKey="interviews" stroke="#10B981" strokeWidth={2} />
// // // //                 <Line type="monotone" dataKey="hires" stroke="#EF4444" strokeWidth={2} />
// // // //               </LineChart>
// // // //             </ResponsiveContainer>
// // // //           </div>
// // // //         </div>

// // // //         {/* Jobs table */}
// // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
// // // //           <div className="p-6 border-b border-gray-200 flex items-center justify-between">
// // // //             <h3 className="text-lg font-semibold text-gray-700">Active Job Positions</h3>
// // // //             <button
// // // //               onClick={() => router.push("/candidates")}
// // // //               className="text-blue-600 hover:text-blue-700 text-sm font-medium"
// // // //             >
// // // //               View All Candidates →
// // // //             </button>
// // // //           </div>
// // // //           <div className="overflow-x-auto">
// // // //             <table className="w-full">
// // // //               <thead>
// // // //                 <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
// // // //                   <th className="px-6 py-3">Position</th>
// // // //                   <th className="px-6 py-3">Department</th>
// // // //                   <th className="px-6 py-3">Location</th>
// // // //                   <th className="px-6 py-3">Applications</th>
// // // //                   <th className="px-6 py-3">Shortlisted</th>
// // // //                   <th className="px-6 py-3">In Progress</th>
// // // //                   <th className="px-6 py-3">Status</th>
// // // //                   <th className="px-6 py-3">Actions</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody className="divide-y divide-gray-200">
// // // //                 {jobs.length === 0 ? (
// // // //                   <tr>
// // // //                     <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
// // // //                       <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// // // //                       <p className="text-lg font-medium">No job positions found</p>
// // // //                       <p className="mt-1">Start a new recruitment pipeline to begin</p>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ) : (
// // // //                   jobs.map((job: any) => {
// // // //                     const jobCandidates = candidates.filter((c: { job_id: any }) => c?.job_id === job.id);
// // // //                     const shortlisted = jobCandidates.filter((c: { status: string }) => c?.status === "Shortlisted").length;
// // // //                     const inProgress = jobCandidates.filter(
// // // //                       (c: { exam_link_sent: any; interview_scheduled: any }) => c?.exam_link_sent || c?.interview_scheduled
// // // //                     ).length;

// // // //                     return (
// // // //                       <tr key={job.id} className="hover:bg-gray-50">
// // // //                         <td className="px-6 py-4">
// // // //                           <div className="text-sm font-medium text-gray-900">{job.title}</div>
// // // //                         </td>
// // // //                         <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
// // // //                         <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
// // // //                         <td className="px-6 py-4">
// // // //                           <span className="text-sm font-medium text-gray-900">
// // // //                             {jobCandidates.length}
// // // //                           </span>
// // // //                         </td>
// // // //                         <td className="px-6 py-4">
// // // //                           <span className="text-sm font-medium text-green-600">{shortlisted}</span>
// // // //                         </td>
// // // //                         <td className="px-6 py-4">
// // // //                           <span className="text-sm font-medium text-blue-600">{inProgress}</span>
// // // //                         </td>
// // // //                         <td className="px-6 py-4">
// // // //                           <span className="inline-flex px-2 py-1 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
// // // //                             Active
// // // //                           </span>
// // // //                         </td>
// // // //                         <td className="px-6 py-4 text-sm">
// // // //                           <div className="flex space-x-2">
// // // //                             <button
// // // //                               onClick={() => router.push(`/candidates?job_id=${job.id}`)}
// // // //                               className="text-blue-600 hover:text-blue-900 font-medium"
// // // //                             >
// // // //                               View
// // // //                             </button>
// // // //                             <button
// // // //                               onClick={() => setSelectedPipelineJob(job)}
// // // //                               className="text-green-600 hover:text-green-900 font-medium"
// // // //                             >
// // // //                               Run Pipeline
// // // //                             </button>
// // // //                           </div>
// // // //                         </td>
// // // //                       </tr>
// // // //                     );
// // // //                   })
// // // //                 )}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         </div>

// // // //         {/* Assessment metrics + Quick actions */}
// // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Assessment Metrics</h3>
// // // //             <ResponsiveContainer width="100%" height={200}>
// // // //               <BarChart data={assessmentMetrics}>
// // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // //                 <XAxis dataKey="name" />
// // // //                 <YAxis />
// // // //                 <Tooltip />
// // // //                 <Bar dataKey="value" fill="#8B5CF6" />
// // // //               </BarChart>
// // // //             </ResponsiveContainer>
// // // //             <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
// // // //               <div>
// // // //                 <p className="text-gray-500">Completion Rate</p>
// // // //                 <p className="text-xl font-semibold text-gray-500">{stats.assessmentCompletionRate}%</p>
// // // //               </div>
// // // //               <div>
// // // //                 <p className="text-gray-500">Pass Rate</p>
// // // //                 <p className="text-xl font-semibold text-gray-500">
// // // //                   {candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length > 0
// // // //                     ? (
// // // //                         (candidates.filter((c: { exam_percentage: number }) => c?.exam_percentage >= 70).length /
// // // //                           candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length) *
// // // //                         100
// // // //                       ).toFixed(1)
// // // //                     : 0}
// // // //                   %
// // // //                 </p>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
// // // //             <div className="space-y-3">
// // // //               <button
// // // //                 onClick={() => router.push("/assessments")}
// // // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // // //               >
// // // //                 <span className="font-medium text-gray-700">Manage Assessments</span>
// // // //                 <span className="text-sm text-gray-500">{stats.activeAssessments} pending</span>
// // // //               </button>

// // // //               <button
// // // //                 onClick={() => router.push("/scheduler")}
// // // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // // //               >
// // // //                 <span className="font-medium text-gray-700">Schedule Interviews</span>
// // // //                 <span className="text-sm text-gray-500">{stats.activeInterviews} scheduled</span>
// // // //               </button>

// // // //               <button
// // // //                 onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// // // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // // //               >
// // // //                 <span className="font-medium text-gray-700">Start New Recruitment</span>
// // // //                 <span className="text-sm text-gray-500">Run pipeline</span>
// // // //               </button>

// // // //               <button
// // // //                 onClick={() => router.push("/candidates")}
// // // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // // //               >
// // // //                 <span className="font-medium text-gray-700">View All Candidates</span>
// // // //                 <span className="text-sm text-gray-500">{candidates.length} total</span>
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //       {selectedPipelineJob && (
// // // //         <PipelineRunner
// // // //           job={selectedPipelineJob}
// // // //           onPipelineStart={() =>
// // // //             setPipelineStatus((p) => ({
// // // //               ...p,
// // // //               [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
// // // //             }))
// // // //           }
// // // //           onPipelineComplete={() => {
// // // //             fetchAll(true);
// // // //             setPipelineStatus((p) => ({
// // // //               ...p,
// // // //               [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
// // // //             }));
// // // //           }}
// // // //           onClose={() => setSelectedPipelineJob(null)}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Dashboard;
// // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // "use client";

// // // import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// // // import {
// // //   RefreshCw, Users, Target, Clock, Bell, AlertCircle, CheckCircle, X,
// // // } from "lucide-react";
// // // import StatCard from "./subComponents/StatCard";
// // // import PipelineRunner from "./subComponents/PipelineRunner";
// // // import {
// // //   ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis,
// // //   BarChart, Bar, LineChart, Line, Legend, Cell,
// // // } from "recharts";
// // // import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// // // // ─── Types ────────────────────────────────────────────────────────────────────

// // // interface PipelineAlert {
// // //   id: number;
// // //   jobTitle: string;
// // //   candidateCount: number;
// // //   time: string;
// // //   read: boolean;
// // // }

// // // // ─── Bell Dropdown Component ──────────────────────────────────────────────────

// // // const BellAlertDropdown: React.FC<{
// // //   alerts: PipelineAlert[];
// // //   onClearAll: () => void;
// // //   onClose: () => void;
// // // }> = ({ alerts, onClearAll, onClose }) => (
// // //   <div
// // //     className="absolute right-0 top-12 z-50 w-80 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden"
// // //     style={{ animation: "fadeSlideDown 0.18s ease" }}
// // //   >
// // //     <style>{`
// // //       @keyframes fadeSlideDown {
// // //         from { opacity: 0; transform: translateY(-8px); }
// // //         to   { opacity: 1; transform: translateY(0); }
// // //       }
// // //     `}</style>

// // //     {/* Header */}
// // //     <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
// // //       <span className="text-sm font-semibold text-gray-800">Pipeline Alerts</span>
// // //       <div className="flex items-center gap-3">
// // //         {alerts.length > 0 && (
// // //           <button
// // //             onClick={onClearAll}
// // //             className="text-xs text-blue-600 hover:text-blue-800 font-medium"
// // //           >
// // //             Clear all
// // //           </button>
// // //         )}
// // //         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
// // //           <X className="w-4 h-4" />
// // //         </button>
// // //       </div>
// // //     </div>

// // //     {/* Alert list */}
// // //     <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
// // //       {alerts.length === 0 ? (
// // //         <div className="px-4 py-8 text-center">
// // //           <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
// // //           <p className="text-sm text-gray-400">No alerts yet.</p>
// // //           <p className="text-xs text-gray-400 mt-1">Run a pipeline to see results here.</p>
// // //         </div>
// // //       ) : (
// // //         alerts.map((alert) => (
// // //           <div
// // //             key={alert.id}
// // //             className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
// // //           >
// // //             {/* Green check icon */}
// // //             <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
// // //               <CheckCircle className="w-4 h-4 text-green-600" />
// // //             </div>

// // //             {/* Content */}
// // //             <div className="flex-1 min-w-0">
// // //               <p className="text-sm font-medium text-gray-900">Pipeline completed</p>
// // //               <p className="text-xs text-blue-600 font-medium mt-0.5 truncate">
// // //                 {alert.jobTitle}
// // //               </p>
// // //               <p className="text-xs text-gray-500 mt-0.5">
// // //                 <span className="font-semibold text-gray-700">{alert.candidateCount}</span>{" "}
// // //                 candidates processed
// // //               </p>
// // //               <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
// // //             </div>

// // //             {/* Unread dot */}
// // //             {!alert.read && (
// // //               <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
// // //             )}
// // //           </div>
// // //         ))
// // //       )}
// // //     </div>
// // //   </div>
// // // );

// // // // ─── Main Dashboard ───────────────────────────────────────────────────────────

// // // const Dashboard: React.FC = () => {
// // //   const router   = useRouter();
// // //   const dispatch = useAppDispatch();
// // //   const { jobs, candidates, recruitmentData, loading } = useAppSelector(
// // //     (state) => state.dashboard
// // //   );

// // //   const [refreshing, setRefreshing]                   = useState(false);
// // //   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
// // //   const [selectedTimeRange, setSelectedTimeRange]     = useState<"week" | "month" | "quarter" | "year">("month");
// // //   const [notifications, setNotifications]             = useState<any[]>([]);
// // //   const [pipelineStatus, setPipelineStatus]           = useState<Record<string, any>>({});
// // //   const [lastFetchTime, setLastFetchTime]             = useState<Date | null>(null);

// // //   // ── Bell alert state ────────────────────────────────────────────────────────
// // //   const [pipelineAlerts, setPipelineAlerts] = useState<PipelineAlert[]>([]);
// // //   const [bellOpen, setBellOpen]             = useState(false);
// // //   const alertIdRef                          = useRef(0);
// // //   const bellRef                             = useRef<HTMLDivElement>(null);

// // //   const unreadCount = pipelineAlerts.filter((a) => !a.read).length;

// // //   // Close dropdown on outside click
// // //   useEffect(() => {
// // //     const handler = (e: MouseEvent) => {
// // //       if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
// // //         setBellOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handler);
// // //     return () => document.removeEventListener("mousedown", handler);
// // //   }, []);

// // //   const addPipelineAlert = useCallback((jobTitle: string, candidateCount: number) => {
// // //     const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
// // //     setPipelineAlerts((prev) => [
// // //       { id: ++alertIdRef.current, jobTitle, candidateCount, time, read: false },
// // //       ...prev,
// // //     ]);
// // //   }, []);

// // //   const clearAllAlerts = useCallback(() => {
// // //     setPipelineAlerts([]);
// // //     setBellOpen(false);
// // //   }, []);

// // //   const openBell = useCallback(() => {
// // //     setBellOpen((o) => !o);
// // //     // mark all read when opened
// // //     setPipelineAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
// // //   }, []);

// // //   // ── Data fetching ───────────────────────────────────────────────────────────
// // //   const fetchAll = useCallback(
// // //     async (force = false) => {
// // //       if (force) setRefreshing(true);
// // //       try {
// // //         await dispatch(dashboardRefreshAll()).unwrap();
// // //         setLastFetchTime(new Date());
// // //       } finally {
// // //         setRefreshing(false);
// // //       }
// // //     },
// // //     [dispatch]
// // //   );

// // //   useEffect(() => {
// // //     fetchAll();
// // //     const id = setInterval(() => fetchAll(true), 120000);
// // //     return () => clearInterval(id);
// // //   }, [fetchAll, selectedTimeRange]);

// // //   // ── Stats ───────────────────────────────────────────────────────────────────
// // //   const stats = useMemo(() => {
// // //     const total              = candidates.length;
// // //     const shortlisted        = candidates.filter((c: any) => c?.status === "Shortlisted").length;
// // //     const interviews         = candidates.filter((c: any) => c?.interview_scheduled).length;
// // //     const assessmentsSent    = candidates.filter((c: any) => c?.exam_link_sent).length;
// // //     const assessmentsCompleted = candidates.filter((c: any) => c?.exam_completed).length;
// // //     const hires              = candidates.filter((c: any) => c?.final_status === "Hired").length;
// // //     const pendingAssessments = candidates.filter(
// // //       (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// // //     ).length;
// // //     const now = new Date();
// // //     const pendingInterviews = candidates.filter((c: any) => {
// // //       if (!c?.interview_date) return false;
// // //       return c?.interview_scheduled && new Date(c.interview_date) > now;
// // //     }).length;
// // //     const timeToHire = (() => {
// // //       const hired = candidates.filter((c: any) => c?.final_status === "Hired" && c?.processed_date);
// // //       if (!hired.length) return 0;
// // //       const total = hired.reduce((acc: number, c: any) => {
// // //         const days = Math.floor((Date.now() - new Date(c.processed_date).getTime()) / 86400000);
// // //         return acc + Math.max(days, 0);
// // //       }, 0);
// // //       return Math.round(total / hired.length);
// // //     })();
// // //     return {
// // //       totalApplications: total,
// // //       activeInterviews: interviews,
// // //       timeToHire,
// // //       activeAssessments: pendingAssessments,
// // //       shortlistRate: total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
// // //       assessmentCompletionRate:
// // //         assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
// // //       totalHires: hires,
// // //       pendingActions: pendingAssessments + pendingInterviews,
// // //     };
// // //   }, [candidates]);

// // //   // ── Notification banners ────────────────────────────────────────────────────
// // //   useEffect(() => {
// // //     const outs: any[] = [];
// // //     const pendingAssessments = candidates.filter(
// // //       (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// // //     );
// // //     if (pendingAssessments.length) {
// // //       outs.push({
// // //         id: 1, type: "warning",
// // //         message: `${pendingAssessments.length} candidates have pending assessments`,
// // //         action: "View Candidates", route: "/candidates",
// // //       });
// // //     }
// // //     const upcomingToday = candidates.filter((c: any) => {
// // //       if (!c?.interview_date) return false;
// // //       const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / 3600000;
// // //       return diffHrs > 0 && diffHrs < 24;
// // //     });
// // //     if (upcomingToday.length) {
// // //       outs.push({
// // //         id: 2, type: "info",
// // //         message: `${upcomingToday.length} interviews scheduled for today`,
// // //         action: "View Schedule", route: "/scheduler",
// // //       });
// // //     }
// // //     setNotifications(outs);
// // //   }, [candidates]);

// // //   const pipelineStages = useMemo(() => [
// // //     { name: "Applied",     value: candidates.length, color: "#3B82F6" },
// // //     { name: "Screened",    value: candidates.filter((c: any) => c?.ats_score > 0).length, color: "#10B981" },
// // //     { name: "Shortlisted", value: candidates.filter((c: any) => c?.status === "Shortlisted").length, color: "#F59E0B" },
// // //     { name: "Assessment",  value: candidates.filter((c: any) => c?.exam_completed).length, color: "#8B5CF6" },
// // //     { name: "Interview",   value: candidates.filter((c: any) => c?.interview_scheduled).length, color: "#EF4444" },
// // //     { name: "Hired",       value: candidates.filter((c: any) => c?.final_status === "Hired").length, color: "#059669" },
// // //   ], [candidates]);

// // //   const assessmentMetrics = useMemo(() => [
// // //     { name: "Sent",      value: candidates.filter((c: any) => c?.exam_link_sent).length },
// // //     { name: "Started",   value: candidates.filter((c: any) => c?.exam_started).length },
// // //     { name: "Completed", value: candidates.filter((c: any) => c?.exam_completed).length },
// // //     { name: "Passed",    value: candidates.filter((c: any) => c?.exam_percentage >= 70).length },
// // //   ], [candidates]);

// // //   const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

// // //   if (loading && !lastFetchTime) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
// // //           <p className="mt-4 text-gray-600">Loading dashboard...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen p-6 bg-white">

// // //       {/* ── Top bar ── */}
// // //       <div className="flex items-center justify-between mb-6">
// // //         <div>
// // //           <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
// // //           <div className="flex items-center mt-1 space-x-4">
// // //             <p className="text-gray-500 text-sm">
// // //               Welcome back! Here&apos;s your recruitment overview
// // //             </p>
// // //             {lastFetchTime && (
// // //               <span className="text-xs text-gray-500">
// // //                 Last updated: {lastFetchTime.toLocaleTimeString()}
// // //               </span>
// // //             )}
// // //           </div>
// // //         </div>

// // //         <div className="flex items-center space-x-3">
// // //           {/* Refresh */}
// // //           <button
// // //             onClick={handleRefresh}
// // //             disabled={refreshing}
// // //             className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-gray-500"
// // //             title="Refresh Data"
// // //           >
// // //             <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
// // //           </button>

// // //           {/* Time range */}
// // //           <select
// // //             value={selectedTimeRange}
// // //             onChange={(e) => setSelectedTimeRange(e.target.value as any)}
// // //             className="border rounded-lg px-4 py-2 text-sm text-gray-500"
// // //           >
// // //             <option value="week">This Week</option>
// // //             <option value="month">This Month</option>
// // //             <option value="quarter">This Quarter</option>
// // //             <option value="year">This Year</option>
// // //           </select>

// // //           {/* ── Bell icon ── */}
// // //           <div className="relative" ref={bellRef}>
// // //             <button
// // //               onClick={openBell}
// // //               className="relative p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors"
// // //               title="Pipeline Alerts"
// // //             >
// // //               <Bell className="w-5 h-5" />
// // //               {unreadCount > 0 && (
// // //                 <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
// // //                   {unreadCount > 9 ? "9+" : unreadCount}
// // //                 </span>
// // //               )}
// // //             </button>

// // //             {bellOpen && (
// // //               <BellAlertDropdown
// // //                 alerts={pipelineAlerts}
// // //                 onClearAll={clearAllAlerts}
// // //                 onClose={() => setBellOpen(false)}
// // //               />
// // //             )}
// // //           </div>

// // //           {/* New Pipeline */}
// // //           <button
// // //             onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// // //             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-sm"
// // //           >
// // //             New Pipeline
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* ── Notification banners ── */}
// // //       {notifications.length > 0 && (
// // //         <div className="mb-6 space-y-2">
// // //           {notifications.map((n) => (
// // //             <div
// // //               key={n.id}
// // //               className={`p-4 rounded-lg border flex items-center justify-between ${
// // //                 n.type === "warning"
// // //                   ? "bg-yellow-50 border-yellow-200"
// // //                   : "bg-blue-50 border-blue-200"
// // //               }`}
// // //             >
// // //               <div className="flex items-center">
// // //                 <AlertCircle
// // //                   className={`w-5 h-5 mr-3 ${
// // //                     n.type === "warning" ? "text-yellow-600" : "text-blue-600"
// // //                   }`}
// // //                 />
// // //                 <span className={n.type === "warning" ? "text-yellow-800" : "text-blue-800"}>
// // //                   {n.message}
// // //                 </span>
// // //               </div>
// // //               <button
// // //                 onClick={() => router.push(n.route)}
// // //                 className={`px-3 py-1 rounded text-sm font-medium ${
// // //                   n.type === "warning"
// // //                     ? "bg-yellow-600 text-white hover:bg-yellow-700"
// // //                     : "bg-blue-600 text-white hover:bg-blue-700"
// // //                 }`}
// // //               >
// // //                 {n.action}
// // //               </button>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}

// // //       {/* ── Stats ── */}
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //         <StatCard title="Total Applications" value={stats.totalApplications} change={12.5}  icon={Users}  color="bg-blue-600"   subtitle="All time applications"  loading={loading} />
// // //         <StatCard title="Shortlist Rate"     value={`${stats.shortlistRate}%`} change={5.2} icon={Target} color="bg-green-600"  subtitle="Candidates shortlisted" loading={loading} />
// // //         <StatCard title="Time-to-Hire"       value={`${stats.timeToHire}d`}   change={-8.3} icon={Clock}  color="bg-yellow-600" subtitle="Average days to hire"   loading={loading} />
// // //         <StatCard title="Pending Actions"    value={stats.pendingActions}                   icon={Bell}   color="bg-purple-600" subtitle="Requires attention"      loading={loading} />
// // //       </div>

// // //       {/* ── Charts ── */}
// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
// // //         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // //           <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Pipeline</h3>
// // //           <ResponsiveContainer width="100%" height={300}>
// // //             <BarChart data={pipelineStages}>
// // //               <CartesianGrid strokeDasharray="3 3" />
// // //               <XAxis dataKey="name" />
// // //               <YAxis />
// // //               <Tooltip />
// // //               <Bar dataKey="value" fill="#3B82F6">
// // //                 {pipelineStages.map((e, i) => <Cell key={i} fill={e.color} />)}
// // //               </Bar>
// // //             </BarChart>
// // //           </ResponsiveContainer>
// // //         </div>
// // //         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // //           <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Activity</h3>
// // //           <ResponsiveContainer width="100%" height={300}>
// // //             <LineChart data={recruitmentData}>
// // //               <CartesianGrid strokeDasharray="3 3" />
// // //               <XAxis dataKey="date" />
// // //               <YAxis />
// // //               <Tooltip />
// // //               <Legend />
// // //               <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
// // //               <Line type="monotone" dataKey="interviews"   stroke="#10B981" strokeWidth={2} />
// // //               <Line type="monotone" dataKey="hires"        stroke="#EF4444" strokeWidth={2} />
// // //             </LineChart>
// // //           </ResponsiveContainer>
// // //         </div>
// // //       </div>

// // //       {/* ── Jobs table ── */}
// // //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
// // //         <div className="p-6 border-b border-gray-200 flex items-center justify-between">
// // //           <h3 className="text-lg font-semibold text-gray-700">Active Job Positions</h3>
// // //           <button
// // //             onClick={() => router.push("/candidates")}
// // //             className="text-blue-600 hover:text-blue-700 text-sm font-medium"
// // //           >
// // //             View All Candidates →
// // //           </button>
// // //         </div>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full">
// // //             <thead>
// // //               <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
// // //                 <th className="px-6 py-3">Position</th>
// // //                 <th className="px-6 py-3">Department</th>
// // //                 <th className="px-6 py-3">Location</th>
// // //                 <th className="px-6 py-3">Applications</th>
// // //                 <th className="px-6 py-3">Shortlisted</th>
// // //                 <th className="px-6 py-3">In Progress</th>
// // //                 <th className="px-6 py-3">Status</th>
// // //                 <th className="px-6 py-3">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="divide-y divide-gray-200">
// // //               {jobs.length === 0 ? (
// // //                 <tr>
// // //                   <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
// // //                     <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// // //                     <p className="text-lg font-medium">No job positions found</p>
// // //                     <p className="mt-1">Start a new recruitment pipeline to begin</p>
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 jobs.map((job: any) => {
// // //                   const jobCandidates = candidates.filter((c: any) => c?.job_id === job.id);
// // //                   const shortlisted   = jobCandidates.filter((c: any) => c?.status === "Shortlisted").length;
// // //                   const inProgress    = jobCandidates.filter(
// // //                     (c: any) => c?.exam_link_sent || c?.interview_scheduled
// // //                   ).length;
// // //                   return (
// // //                     <tr key={job.id} className="hover:bg-gray-50">
// // //                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
// // //                       <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
// // //                       <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
// // //                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{jobCandidates.length}</td>
// // //                       <td className="px-6 py-4 text-sm font-medium text-green-600">{shortlisted}</td>
// // //                       <td className="px-6 py-4 text-sm font-medium text-blue-600">{inProgress}</td>
// // //                       <td className="px-6 py-4">
// // //                         <span className="inline-flex px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
// // //                           Active
// // //                         </span>
// // //                       </td>
// // //                       <td className="px-6 py-4 text-sm">
// // //                         <div className="flex space-x-2">
// // //                           <button
// // //                             onClick={() => router.push(`/candidates?job_id=${job.id}`)}
// // //                             className="text-blue-600 hover:text-blue-900 font-medium"
// // //                           >
// // //                             View
// // //                           </button>
// // //                           <button
// // //                             onClick={() => setSelectedPipelineJob(job)}
// // //                             className="text-green-600 hover:text-green-900 font-medium"
// // //                           >
// // //                             Run Pipeline
// // //                           </button>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   );
// // //                 })
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>

// // //       {/* ── Assessment metrics + Quick actions ── */}
// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // //           <h3 className="text-lg font-semibold mb-4 text-gray-700">Assessment Metrics</h3>
// // //           <ResponsiveContainer width="100%" height={200}>
// // //             <BarChart data={assessmentMetrics}>
// // //               <CartesianGrid strokeDasharray="3 3" />
// // //               <XAxis dataKey="name" />
// // //               <YAxis />
// // //               <Tooltip />
// // //               <Bar dataKey="value" fill="#8B5CF6" />
// // //             </BarChart>
// // //           </ResponsiveContainer>
// // //           <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
// // //             <div>
// // //               <p className="text-gray-500">Completion Rate</p>
// // //               <p className="text-xl font-semibold text-gray-700">{stats.assessmentCompletionRate}%</p>
// // //             </div>
// // //             <div>
// // //               <p className="text-gray-500">Pass Rate</p>
// // //               <p className="text-xl font-semibold text-gray-700">
// // //                 {candidates.filter((c: any) => c?.exam_completed).length > 0
// // //                   ? (
// // //                       (candidates.filter((c: any) => c?.exam_percentage >= 70).length /
// // //                         candidates.filter((c: any) => c?.exam_completed).length) * 100
// // //                     ).toFixed(1)
// // //                   : 0}%
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // //           <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
// // //           <div className="space-y-3">
// // //             <button
// // //               onClick={() => router.push("/assessments")}
// // //               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // //             >
// // //               <span className="font-medium text-gray-700">Manage Assessments</span>
// // //               <span className="text-sm text-gray-500">{stats.activeAssessments} pending</span>
// // //             </button>
// // //             <button
// // //               onClick={() => router.push("/scheduler")}
// // //               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // //             >
// // //               <span className="font-medium text-gray-700">Schedule Interviews</span>
// // //               <span className="text-sm text-gray-500">{stats.activeInterviews} scheduled</span>
// // //             </button>
// // //             <button
// // //               onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// // //               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // //             >
// // //               <span className="font-medium text-gray-700">Start New Recruitment</span>
// // //               <span className="text-sm text-gray-500">Run pipeline</span>
// // //             </button>
// // //             <button
// // //               onClick={() => router.push("/candidates")}
// // //               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // //             >
// // //               <span className="font-medium text-gray-700">View All Candidates</span>
// // //               <span className="text-sm text-gray-500">{candidates.length} total</span>
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* ── Pipeline Runner Modal ── */}
// // //       {selectedPipelineJob && (
// // //         <PipelineRunner
// // //           job={selectedPipelineJob}
// // //           onPipelineStart={() =>
// // //             setPipelineStatus((p) => ({
// // //               ...p,
// // //               [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
// // //             }))
// // //           }
// // //           onPipelineComplete={() => {
// // //             fetchAll(true).then(() => {
// // //               const jobCandidates = candidates.filter(
// // //                 (c: any) => String(c?.job_id) === String(selectedPipelineJob.id)
// // //               );
// // //               // ✅ Add bell alert with job title + candidate count
// // //               addPipelineAlert(selectedPipelineJob.title, jobCandidates.length);
// // //               setPipelineStatus((p) => ({
// // //                 ...p,
// // //                 [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
// // //               }));
// // //             });
// // //           }}
// // //           onClose={() => setSelectedPipelineJob(null)}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";

// // import React, {
// //   useCallback,
// //   useEffect,
// //   useMemo,
// //   useRef,
// //   useState,
// // } from "react";
// // import { useRouter } from "next/navigation";
// // import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// // import {
// //   RefreshCw,
// //   Users,
// //   Target,
// //   Clock,
// //   Bell,
// //   AlertCircle,
// //   CheckCircle,
// //   X,
// //   UserCheck,
// //   UserX,
// //   TrendingUp,
// //   PlayCircle,
// //   CalendarDays,
// //   LayoutDashboard,
// // } from "lucide-react";
// // import StatCard        from "./subComponents/StatCard";
// // import PipelineRunner  from "./subComponents/PipelineRunner";
// // import RecruitmentJourney from "./subComponents/RecruitmentJourney";
// // import {
// //   ResponsiveContainer,
// //   CartesianGrid,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// //   BarChart,
// //   Bar,
// //   LineChart,
// //   Line,
// //   Legend,
// //   Cell,
// // } from "recharts";
// // import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// // // ── Design tokens ─────────────────────────────────────────────────────────────
// // const T = {
// //   accent:   "#2563EB",
// //   accentL:  "#EFF6FF",
// //   accentM:  "#BFDBFE",
// //   green:    "#059669",
// //   greenL:   "#ECFDF5",
// //   amber:    "#D97706",
// //   amberL:   "#FFFBEB",
// //   red:      "#DC2626",
// //   redL:     "#FEF2F2",
// //   purple:   "#7C3AED",
// //   purpleL:  "#F5F3FF",
// //   t1:       "#0F172A",
// //   t2:       "#64748B",
// //   t3:       "#94A3B8",
// //   border:   "rgba(0,0,0,0.08)",
// //   borderMd: "rgba(0,0,0,0.14)",
// //   bg:       "#F8FAFC",
// //   surface:  "#ffffff",
// //   r:        10,
// //   rl:       14,
// //   rxl:      18,
// // } as const;

// // // ── Types ─────────────────────────────────────────────────────────────────────
// // interface PipelineAlert {
// //   id: number;
// //   jobTitle: string;
// //   candidateCount: number;
// //   shortlisted: number;
// //   notShortlisted: number;
// //   time: string;
// //   read: boolean;
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // Sub-component: PipelineResultToast
// // // Stays on screen until HR clicks X — no auto-dismiss
// // // ─────────────────────────────────────────────────────────────────────────────
// // const PipelineResultToast: React.FC<{
// //   toasts: PipelineAlert[];
// //   onDismiss: (id: number) => void;
// // }> = ({ toasts, onDismiss }) => {
// //   if (!toasts.length) return null;

// //   return (
// //     <div
// //       style={{
// //         position: "fixed",
// //         bottom: 24,
// //         right: 24,
// //         zIndex: 80,
// //         display: "flex",
// //         flexDirection: "column",
// //         gap: 12,
// //         maxWidth: 340,
// //         width: "100%",
// //       }}
// //     >
// //       <style>{`
// //         @keyframes toastIn {
// //           from { opacity:0; transform:translateX(40px) }
// //           to   { opacity:1; transform:translateX(0) }
// //         }
// //       `}</style>

// //       {toasts.map(toast => (
// //         <div
// //           key={toast.id}
// //           style={{
// //             background: T.surface,
// //             borderRadius: 14,
// //             boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
// //             border: `0.5px solid ${T.borderMd}`,
// //             overflow: "hidden",
// //             animation: "toastIn 0.25s ease",
// //           }}
// //         >
// //           {/* Green header */}
// //           <div
// //             style={{
// //               background: "#059669",
// //               padding: "10px 16px",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "space-between",
// //             }}
// //           >
// //             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// //               <CheckCircle size={15} color="#fff" />
// //               <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
// //                 Pipeline Completed
// //               </span>
// //             </div>
// //             <button
// //               onClick={() => onDismiss(toast.id)}
// //               style={{
// //                 background: "none", border: "none", cursor: "pointer",
// //                 color: "rgba(255,255,255,0.7)", display: "flex",
// //                 padding: 2, transition: "color 0.12s",
// //               }}
// //               onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = "#fff")}
// //               onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)")}
// //             >
// //               <X size={13} />
// //             </button>
// //           </div>

// //           {/* Body */}
// //           <div style={{ padding: "13px 15px" }}>
// //             <p
// //               style={{
// //                 fontSize: 13, fontWeight: 600, color: T.t1,
// //                 marginBottom: 10,
// //                 whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
// //               }}
// //             >
// //               {toast.jobTitle}
// //             </p>

// //             {/* Counts grid */}
// //             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
// //               {/* Shortlisted */}
// //               <div
// //                 style={{
// //                   borderRadius: 9, padding: "10px 12px",
// //                   background: T.greenL, border: "0.5px solid #BBF7D0",
// //                   display: "flex", alignItems: "center", gap: 8,
// //                 }}
// //               >
// //                 <UserCheck size={14} color={T.green} style={{ flexShrink: 0 }} />
// //                 <div>
// //                   <p style={{ fontSize: 10, fontWeight: 500, color: T.green }}>Shortlisted</p>
// //                   <p style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: "#065F46" }}>
// //                     {toast.shortlisted}
// //                   </p>
// //                 </div>
// //               </div>

// //               {/* Not shortlisted */}
// //               <div
// //                 style={{
// //                   borderRadius: 9, padding: "10px 12px",
// //                   background: T.redL, border: "0.5px solid #FECACA",
// //                   display: "flex", alignItems: "center", gap: 8,
// //                 }}
// //               >
// //                 <UserX size={14} color={T.red} style={{ flexShrink: 0 }} />
// //                 <div>
// //                   <p style={{ fontSize: 10, fontWeight: 500, color: T.red }}>Not Shortlisted</p>
// //                   <p style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: "#991B1B" }}>
// //                     {toast.notShortlisted}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Footer */}
// //             <div
// //               style={{
// //                 display: "flex", alignItems: "center", justifyContent: "space-between",
// //                 paddingTop: 8, borderTop: `0.5px solid ${T.border}`,
// //               }}
// //             >
// //               <span style={{ fontSize: 11, color: T.t2 }}>
// //                 Total processed:{" "}
// //                 <strong style={{ color: T.t1 }}>{toast.candidateCount}</strong>
// //               </span>
// //               <span style={{ fontSize: 10, color: T.t3 }}>{toast.time}</span>
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // // ─────────────────────────────────────────────────────────────────────────────
// // // Sub-component: BellAlertDropdown
// // // ─────────────────────────────────────────────────────────────────────────────
// // const BellAlertDropdown: React.FC<{
// //   alerts: PipelineAlert[];
// //   onClearAll: () => void;
// //   onClose: () => void;
// // }> = ({ alerts, onClearAll, onClose }) => (
// //   <div
// //     style={{
// //       position: "absolute", right: 0, top: 44,
// //       width: 320,
// //       background: T.surface,
// //       border: `0.5px solid ${T.borderMd}`,
// //       borderRadius: 14,
// //       boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
// //       overflow: "hidden",
// //       zIndex: 60,
// //       animation: "fadeDown 0.18s ease",
// //     }}
// //   >
// //     <style>{`
// //       @keyframes fadeDown {
// //         from { opacity:0; transform:translateY(-8px) }
// //         to   { opacity:1; transform:translateY(0) }
// //       }
// //     `}</style>

// //     {/* Header */}
// //     <div
// //       style={{
// //         display: "flex", alignItems: "center", justifyContent: "space-between",
// //         padding: "12px 16px",
// //         borderBottom: `0.5px solid ${T.border}`,
// //       }}
// //     >
// //       <span style={{ fontSize: 13, fontWeight: 600, color: T.t1 }}>
// //         Pipeline Alerts
// //       </span>
// //       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //         {alerts.length > 0 && (
// //           <button
// //             onClick={onClearAll}
// //             style={{
// //               fontSize: 12, color: T.accent, fontWeight: 500,
// //               background: "none", border: "none", cursor: "pointer",
// //             }}
// //           >
// //             Clear all
// //           </button>
// //         )}
// //         <button
// //           onClick={onClose}
// //           style={{
// //             background: "none", border: "none", cursor: "pointer",
// //             color: T.t3, display: "flex",
// //           }}
// //         >
// //           <X size={15} />
// //         </button>
// //       </div>
// //     </div>

// //     {/* Alert list */}
// //     <div style={{ maxHeight: 288, overflowY: "auto" }}>
// //       {alerts.length === 0 ? (
// //         <div style={{ padding: "28px 16px", textAlign: "center" }}>
// //           <Bell
// //             size={30}
// //             color={T.t3}
// //             style={{ margin: "0 auto 8px", display: "block" }}
// //           />
// //           <p style={{ fontSize: 13, color: T.t2, fontWeight: 500 }}>No alerts yet</p>
// //           <p style={{ fontSize: 11, color: T.t3, marginTop: 3 }}>
// //             Run a pipeline to see results here.
// //           </p>
// //         </div>
// //       ) : (
// //         alerts.map(alert => (
// //           <div
// //             key={alert.id}
// //             style={{
// //               display: "flex", gap: 12,
// //               padding: "12px 16px",
// //               borderBottom: `0.5px solid ${T.border}`,
// //               transition: "background 0.12s",
// //             }}
// //             onMouseEnter={e =>
// //               ((e.currentTarget as HTMLDivElement).style.background = T.bg)
// //             }
// //             onMouseLeave={e =>
// //               ((e.currentTarget as HTMLDivElement).style.background = T.surface)
// //             }
// //           >
// //             <div
// //               style={{
// //                 width: 32, height: 32, borderRadius: "50%",
// //                 background: T.greenL, border: "0.5px solid #BBF7D0",
// //                 display: "flex", alignItems: "center", justifyContent: "center",
// //                 flexShrink: 0, marginTop: 1,
// //               }}
// //             >
// //               <CheckCircle size={14} color={T.green} />
// //             </div>
// //             <div style={{ flex: 1 }}>
// //               <p style={{ fontSize: 13, fontWeight: 600, color: T.t1, margin: 0 }}>
// //                 Pipeline Completed
// //               </p>
// //               <p style={{ fontSize: 11, color: T.t2, marginTop: 2, lineHeight: 1.4 }}>
// //                 {alert.jobTitle} &mdash; {alert.shortlisted} shortlisted,{" "}
// //                 {alert.notShortlisted} not shortlisted ({alert.candidateCount} total)
// //               </p>
// //               <p style={{ fontSize: 10, color: T.t3, marginTop: 3 }}>{alert.time}</p>
// //             </div>
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   </div>
// // );

// // // ─────────────────────────────────────────────────────────────────────────────
// // // Main Dashboard
// // // ─────────────────────────────────────────────────────────────────────────────
// // const Dashboard: React.FC = () => {
// //   const router   = useRouter();
// //   const dispatch = useAppDispatch();
// //   const { jobs, candidates, recruitmentData, loading } = useAppSelector(
// //     (state: any) => state.dashboard
// //   );

// //   const [refreshing, setRefreshing]               = useState(false);
// //   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
// //   const [selectedTimeRange, setSelectedTimeRange] = useState<"week" | "month" | "quarter" | "year">("month");
// //   const [notifications, setNotifications]         = useState<any[]>([]);
// //   const [pipelineStatus, setPipelineStatus]       = useState<Record<string, any>>({});
// //   const [lastFetchTime, setLastFetchTime]         = useState<Date | null>(null);
// //   const [bellOpen, setBellOpen]                   = useState(false);
// //   const [pipelineAlerts, setPipelineAlerts]       = useState<PipelineAlert[]>([]);
// //   const [resultToasts, setResultToasts]           = useState<PipelineAlert[]>([]);
// //   const bellRef = useRef<HTMLDivElement>(null);

// //   // ── Data fetch (auto-refresh every 2 min) ─────────────────────────────────
// //   const fetchAll = useCallback(
// //     async (force = false) => {
// //       if (force) setRefreshing(true);
// //       try {
// //         await dispatch(dashboardRefreshAll()).unwrap();
// //         setLastFetchTime(new Date());
// //       } finally {
// //         setRefreshing(false);
// //       }
// //     },
// //     [dispatch]
// //   );

// //   useEffect(() => {
// //     fetchAll();
// //     const id = setInterval(() => fetchAll(true), 120_000);
// //     return () => clearInterval(id);
// //   }, [fetchAll, selectedTimeRange]);

// //   // ── Stats (useMemo — mirrors original computation exactly) ─────────────────
// //   const stats = useMemo(() => {
// //     const total              = candidates.length;
// //     const shortlisted        = candidates.filter((c: any) => c?.status === "Shortlisted").length;
// //     const interviews         = candidates.filter((c: any) => c?.interview_scheduled).length;
// //     const assessmentsSent    = candidates.filter((c: any) => c?.exam_link_sent).length;
// //     const assessmentsCompleted = candidates.filter((c: any) => c?.exam_completed).length;
// //     const hires              = candidates.filter((c: any) => c?.final_status === "Hired").length;
// //     const pendingAssessments = candidates.filter(
// //       (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// //     ).length;

// //     const now = new Date();
// //     const pendingInterviews = candidates.filter((c: any) => {
// //       if (!c?.interview_date) return false;
// //       return c?.interview_scheduled && new Date(c.interview_date) > now;
// //     }).length;

// //     const timeToHire = (() => {
// //       const hired = candidates.filter(
// //         (c: any) => c?.final_status === "Hired" && c?.processed_date
// //       );
// //       if (!hired.length) return 0;
// //       const totalDays = hired.reduce((acc: number, c: any) => {
// //         const start = new Date(c.processed_date).getTime();
// //         const days  = Math.floor((Date.now() - start) / 86_400_000);
// //         return acc + Math.max(days, 0);
// //       }, 0);
// //       return Math.round(totalDays / hired.length);
// //     })();

// //     return {
// //       totalApplications:        total,
// //       activeInterviews:         interviews,
// //       timeToHire,
// //       activeAssessments:        pendingAssessments,
// //       shortlistRate:            total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
// //       assessmentCompletionRate: assessmentsSent > 0
// //         ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1)
// //         : 0,
// //       assessmentPassRate: assessmentsCompleted > 0
// //         ? (
// //             (candidates.filter((c: any) => c?.exam_percentage >= 70).length /
// //               assessmentsCompleted) *
// //             100
// //           ).toFixed(1)
// //         : 0,
// //       totalHires:     hires,
// //       pendingActions: pendingAssessments + pendingInterviews,
// //     };
// //   }, [candidates]);

// //   // ── Current journey step (derived from live data) ──────────────────────────
// //   const currentJourneyStep = useMemo(() => {
// //     if (stats.totalHires > 0 || stats.activeInterviews > 0) return 4;
// //     if (stats.activeAssessments > 0) return 3;
// //     if (parseFloat(String(stats.shortlistRate)) > 0) return 2;
// //     if (jobs.length > 0) return 1;
// //     return 0;
// //   }, [stats, jobs]);

// //   // ── Pipeline stages for bar chart ─────────────────────────────────────────
// //   const pipelineStages = useMemo(
// //     () => [
// //       { name: "Applied",     value: candidates.length,                                              color: "#3B82F6" },
// //       { name: "Screened",    value: candidates.filter((c: any) => c?.ats_score > 0).length,         color: "#10B981" },
// //       { name: "Shortlisted", value: candidates.filter((c: any) => c?.status === "Shortlisted").length, color: "#F59E0B" },
// //       { name: "Assessment",  value: candidates.filter((c: any) => c?.exam_completed).length,        color: "#8B5CF6" },
// //       { name: "Interview",   value: candidates.filter((c: any) => c?.interview_scheduled).length,   color: "#EF4444" },
// //       { name: "Hired",       value: candidates.filter((c: any) => c?.final_status === "Hired").length, color: "#059669" },
// //     ],
// //     [candidates]
// //   );

// //   // ── Assessment bar chart data ──────────────────────────────────────────────
// //   const assessmentMetrics = useMemo(
// //     () => [
// //       { name: "Sent",      value: candidates.filter((c: any) => c?.exam_link_sent).length },
// //       { name: "Started",   value: candidates.filter((c: any) => c?.exam_started).length },
// //       { name: "Completed", value: candidates.filter((c: any) => c?.exam_completed).length },
// //       { name: "Passed",    value: candidates.filter((c: any) => c?.exam_percentage >= 70).length },
// //     ],
// //     [candidates]
// //   );

// //   // ── Notification banners (pending assessments / today's interviews) ────────
// //   useEffect(() => {
// //     const outs: any[] = [];
// //     const pendingAssessments = candidates.filter(
// //       (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// //     );
// //     if (pendingAssessments.length) {
// //       outs.push({
// //         id: 1, type: "warning",
// //         message: `${pendingAssessments.length} candidates have pending assessments`,
// //         action: "View Candidates", route: "/candidates",
// //       });
// //     }
// //     const upcomingToday = candidates.filter((c: any) => {
// //       if (!c?.interview_date) return false;
// //       const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / 3_600_000;
// //       return diffHrs > 0 && diffHrs < 24;
// //     });
// //     if (upcomingToday.length) {
// //       outs.push({
// //         id: 2, type: "info",
// //         message: `${upcomingToday.length} interviews scheduled for today`,
// //         action: "View Schedule", route: "/scheduler",
// //       });
// //     }
// //     setNotifications(outs);
// //   }, [candidates]);

// //   // ── Bell helpers ──────────────────────────────────────────────────────────
// //   const unreadCount = pipelineAlerts.filter(a => !a.read).length;

// //   const openBell = () => {
// //     setBellOpen(prev => !prev);
// //     setPipelineAlerts(prev => prev.map(a => ({ ...a, read: true })));
// //   };

// //   // Close bell on outside click
// //   useEffect(() => {
// //     const handler = (e: MouseEvent) => {
// //       if (bellOpen && bellRef.current && !bellRef.current.contains(e.target as Node)) {
// //         setBellOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handler);
// //     return () => document.removeEventListener("mousedown", handler);
// //   }, [bellOpen]);

// //   const addPipelineAlert = (jobTitle: string, shortlisted: number, notShortlisted: number) => {
// //     const id   = Date.now();
// //     const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
// //     const alert: PipelineAlert = {
// //       id, jobTitle,
// //       candidateCount: shortlisted + notShortlisted,
// //       shortlisted, notShortlisted,
// //       time, read: false,
// //     };
// //     setPipelineAlerts(prev => [alert, ...prev]);
// //     setResultToasts(prev => [alert, ...prev]);
// //   };

// //   const clearAllAlerts = () => setPipelineAlerts([]);
// //   const dismissToast   = (id: number) =>
// //     setResultToasts(prev => prev.filter(t => t.id !== id));

// //   const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

// //   // ── Loading splash ────────────────────────────────────────────────────────
// //   if (loading && !lastFetchTime) {
// //     return (
// //       <div
// //         style={{
// //           minHeight: "100vh", background: T.bg,
// //           display: "flex", alignItems: "center", justifyContent: "center",
// //         }}
// //       >
// //         <div style={{ textAlign: "center" }}>
// //           <div
// //             style={{
// //               width: 48, height: 48, borderRadius: "50%",
// //               border: `3px solid ${T.accentM}`,
// //               borderTopColor: T.accent,
// //               animation: "spin 0.7s linear infinite",
// //               margin: "0 auto 16px",
// //             }}
// //           />
// //           <p style={{ color: T.t2, fontSize: 14 }}>Loading dashboard...</p>
// //         </div>
// //         <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
// //       </div>
// //     );
// //   }

// //   // ═══════════════════════════════════════════════════════════════════════════
// //   // RENDER
// //   // ═══════════════════════════════════════════════════════════════════════════
// //   return (
// //     <div style={{ background: T.bg, minHeight: "100vh" }}>

// //       {/* ── Topbar ─────────────────────────────────────────────────────────── */}
// //       <div
// //         style={{
// //           display: "flex", alignItems: "center", justifyContent: "space-between",
// //           padding: "0 32px", height: 60,
// //           background: T.surface,
// //           borderBottom: `0.5px solid ${T.borderMd}`,
// //           position: "sticky", top: 0, zIndex: 40,
// //         }}
// //       >
// //         {/* Brand */}
// //         <div
// //           style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
// //           onClick={() => router.push("/dashboard")}
// //         >
// //           <div
// //             style={{
// //               width: 34, height: 34, background: T.accent,
// //               borderRadius: 8,
// //               display: "flex", alignItems: "center", justifyContent: "center",
// //             }}
// //           >
// //             <LayoutDashboard size={16} color="#fff" strokeWidth={2} />
// //           </div>
// //           <div>
// //             <div style={{ fontSize: 15, fontWeight: 600, color: T.t1, letterSpacing: "-0.3px" }}>
// //               HR Automation
// //             </div>
// //             <div style={{ fontSize: 11, color: T.t2, marginTop: 1 }}>Recruitment Suite</div>
// //           </div>
// //         </div>

// //         {/* Nav links */}
// //         <nav style={{ display: "flex", gap: 2 }}>
// //           {[
// //             { label: "Dashboard",   route: "/dashboard"        },
// //             { label: "Candidates",  route: "/candidates"       },
// //             { label: "Jobs",        route: "/jobs"             },
// //             { label: "Assessments", route: "/assessments"      },
// //             { label: "Interviews",  route: "/interview-results"},
// //           ].map(n => (
// //             <button
// //               key={n.route}
// //               onClick={() => router.push(n.route)}
// //               style={{
// //                 fontSize: 13, fontWeight: 500, padding: "7px 14px",
// //                 borderRadius: 8, border: "none",
// //                 cursor: "pointer", fontFamily: "inherit",
// //                 color: n.route === "/dashboard" ? T.accent : T.t2,
// //                 background: n.route === "/dashboard" ? T.accentL : "transparent",
// //                 transition: "all 0.14s",
// //               } as React.CSSProperties}
// //             >
// //               {n.label}
// //             </button>
// //           ))}
// //         </nav>

// //         {/* Right controls */}
// //         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// //           {/* Refresh */}
// //           <button
// //             onClick={handleRefresh}
// //             disabled={refreshing}
// //             title="Refresh data"
// //             style={{
// //               width: 36, height: 36, padding: 0,
// //               display: "flex", alignItems: "center", justifyContent: "center",
// //               borderRadius: 8, border: `0.5px solid ${T.borderMd}`,
// //               background: T.surface, cursor: "pointer",
// //               transition: "background 0.14s",
// //               opacity: refreshing ? 0.5 : 1,
// //             }}
// //           >
// //             <RefreshCw
// //               size={15}
// //               color={T.t2}
// //               style={{ animation: refreshing ? "spin 0.7s linear infinite" : "none" }}
// //             />
// //           </button>

// //           {/* Time range */}
// //           <select
// //             value={selectedTimeRange}
// //             onChange={e => setSelectedTimeRange(e.target.value as any)}
// //             style={{
// //               fontSize: 13, fontFamily: "inherit", color: T.t2,
// //               background: T.surface, border: `0.5px solid ${T.borderMd}`,
// //               borderRadius: 8, padding: "7px 12px", outline: "none", cursor: "pointer",
// //             }}
// //           >
// //             <option value="week">This Week</option>
// //             <option value="month">This Month</option>
// //             <option value="quarter">This Quarter</option>
// //             <option value="year">This Year</option>
// //           </select>

// //           {/* Bell */}
// //           <div style={{ position: "relative" }} ref={bellRef}>
// //             <button
// //               onClick={openBell}
// //               title="Pipeline Alerts"
// //               style={{
// //                 width: 36, height: 36,
// //                 display: "flex", alignItems: "center", justifyContent: "center",
// //                 border: `0.5px solid ${T.borderMd}`, borderRadius: 8,
// //                 background: T.surface, cursor: "pointer", position: "relative",
// //                 transition: "background 0.14s",
// //               }}
// //             >
// //               <Bell size={16} color={T.t2} />
// //               {unreadCount > 0 && (
// //                 <span
// //                   style={{
// //                     position: "absolute", top: -5, right: -5,
// //                     minWidth: 16, height: 16, padding: "0 3px",
// //                     background: T.red, color: "#fff",
// //                     fontSize: 10, fontWeight: 700, borderRadius: 20,
// //                     display: "flex", alignItems: "center", justifyContent: "center",
// //                     border: `2px solid ${T.surface}`,
// //                   }}
// //                 >
// //                   {unreadCount > 9 ? "9+" : unreadCount}
// //                 </span>
// //               )}
// //             </button>

// //             {bellOpen && (
// //               <BellAlertDropdown
// //                 alerts={pipelineAlerts}
// //                 onClearAll={clearAllAlerts}
// //                 onClose={() => setBellOpen(false)}
// //               />
// //             )}
// //           </div>

// //           {/* New Pipeline */}
// //           <button
// //             onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// //             style={{
// //               padding: "8px 16px", fontSize: 13, fontWeight: 500,
// //               background: T.accent, color: "#fff", border: "none",
// //               borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
// //               transition: "background 0.15s",
// //             }}
// //             onMouseEnter={e =>
// //               ((e.currentTarget as HTMLButtonElement).style.background = "#1D4ED8")
// //             }
// //             onMouseLeave={e =>
// //               ((e.currentTarget as HTMLButtonElement).style.background = T.accent)
// //             }
// //           >
// //             New Pipeline
// //           </button>

// //           {/* Last updated */}
// //           {lastFetchTime && (
// //             <span style={{ fontSize: 11, color: T.t3, marginLeft: 4 }}>
// //               Updated {lastFetchTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
// //             </span>
// //           )}
// //         </div>
// //       </div>

// //       {/* ── Page body ──────────────────────────────────────────────────────── */}
// //       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px 64px" }}>

// //         {/* ── Notification banners ── */}
// //         {notifications.length > 0 && (
// //           <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
// //             {notifications.map(n => (
// //               <div
// //                 key={n.id}
// //                 style={{
// //                   display: "flex", alignItems: "center", justifyContent: "space-between",
// //                   padding: "11px 16px", borderRadius: 10,
// //                   border: `0.5px solid ${n.type === "warning" ? "#FCD34D" : T.accentM}`,
// //                   background: n.type === "warning" ? T.amberL : T.accentL,
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     display: "flex", alignItems: "center", gap: 10,
// //                     fontSize: 13, fontWeight: 500,
// //                     color: n.type === "warning" ? "#92400E" : "#1E40AF",
// //                   }}
// //                 >
// //                   <AlertCircle size={15} />
// //                   {n.message}
// //                 </div>
// //                 <button
// //                   onClick={() => router.push(n.route)}
// //                   style={{
// //                     padding: "5px 12px", fontSize: 12, fontWeight: 500,
// //                     border: "none", borderRadius: 8, cursor: "pointer",
// //                     fontFamily: "inherit",
// //                     background: n.type === "warning" ? T.amber : T.accent,
// //                     color: "#fff",
// //                   }}
// //                 >
// //                   {n.action}
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* ── RecruitmentJourney ── */}
// //         <RecruitmentJourney
// //           currentStep={currentJourneyStep}
// //           onStepClick={(route) => router.push(route)}
// //         />

// //         {/* ── Page title ── */}
// //         <div style={{ marginBottom: 22 }}>
// //           <h1
// //             style={{
// //               fontSize: 22, fontWeight: 600, color: T.t1,
// //               letterSpacing: "-0.5px", margin: 0,
// //             }}
// //           >
// //             Recruitment Dashboard
// //           </h1>
// //           <p style={{ fontSize: 13, color: T.t2, marginTop: 3 }}>
// //             Welcome back! Here&apos;s your recruitment overview
// //           </p>
// //         </div>

// //         {/* ── StatCards (4) ── */}
// //         <div
// //           style={{
// //             display: "grid", gridTemplateColumns: "repeat(4,1fr)",
// //             gap: 14, marginBottom: 26,
// //           }}
// //         >
// //           <StatCard
// //             title="Total Applications"
// //             value={stats.totalApplications}
// //             change={12.5}
// //             icon={Users}
// //             accentColor="#2563EB"
// //             iconBg="#2563EB"
// //             subtitle="All time applications"
// //             loading={loading}
// //           />
// //           <StatCard
// //             title="Shortlist Rate"
// //             value={`${stats.shortlistRate}%`}
// //             change={5.2}
// //             icon={Target}
// //             accentColor="#059669"
// //             iconBg="#059669"
// //             subtitle="Candidates shortlisted"
// //             loading={loading}
// //           />
// //           <StatCard
// //             title="Time-to-Hire"
// //             value={`${stats.timeToHire}d`}
// //             change={-8.3}
// //             icon={Clock}
// //             accentColor="#D97706"
// //             iconBg="#D97706"
// //             subtitle="Average days to hire"
// //             loading={loading}
// //           />
// //           <StatCard
// //             title="Pending Actions"
// //             value={stats.pendingActions}
// //             icon={Bell}
// //             accentColor="#7C3AED"
// //             iconBg="#7C3AED"
// //             subtitle="Requires attention"
// //             loading={loading}
// //           />
// //         </div>

// //         {/* ── Charts row ── */}
// //         <div
// //           style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 22 }}
// //         >
// //           {/* Pipeline bar chart */}
// //           <div
// //             style={{
// //               background: T.surface, border: `0.5px solid ${T.border}`,
// //               borderRadius: T.rl, overflow: "hidden",
// //             }}
// //           >
// //             <div
// //               style={{
// //                 display: "flex", alignItems: "center", justifyContent: "space-between",
// //                 padding: "15px 20px", borderBottom: `0.5px solid ${T.border}`,
// //               }}
// //             >
// //               <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
// //                 Recruitment Pipeline
// //               </span>
// //             </div>
// //             <div style={{ padding: "14px 18px 18px" }}>
// //               <ResponsiveContainer width="100%" height={240}>
// //                 <BarChart data={pipelineStages}>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
// //                   <XAxis dataKey="name" tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
// //                   <YAxis tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
// //                   <Tooltip
// //                     contentStyle={{
// //                       background: T.surface, border: `0.5px solid ${T.borderMd}`,
// //                       borderRadius: 10, fontSize: 12,
// //                     }}
// //                   />
// //                   <Bar dataKey="value" radius={[6, 6, 0, 0]}>
// //                     {pipelineStages.map((entry, i) => (
// //                       <Cell key={i} fill={entry.color} />
// //                     ))}
// //                   </Bar>
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>

// //           {/* Activity line chart */}
// //           <div
// //             style={{
// //               background: T.surface, border: `0.5px solid ${T.border}`,
// //               borderRadius: T.rl, overflow: "hidden",
// //             }}
// //           >
// //             <div
// //               style={{
// //                 display: "flex", alignItems: "center", justifyContent: "space-between",
// //                 padding: "15px 20px", borderBottom: `0.5px solid ${T.border}`,
// //               }}
// //             >
// //               <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
// //                 Recruitment Activity
// //               </span>
// //             </div>
// //             <div style={{ padding: "14px 18px 18px" }}>
// //               <ResponsiveContainer width="100%" height={240}>
// //                 <LineChart data={recruitmentData}>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
// //                   <XAxis dataKey="date" tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
// //                   <YAxis tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
// //                   <Tooltip
// //                     contentStyle={{
// //                       background: T.surface, border: `0.5px solid ${T.borderMd}`,
// //                       borderRadius: 10, fontSize: 12,
// //                     }}
// //                   />
// //                   <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: T.t2 }} />
// //                   <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
// //                   <Line type="monotone" dataKey="interviews"   stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
// //                   <Line type="monotone" dataKey="hires"        stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ── Pipeline stage strip ── */}
// //         <div
// //           style={{
// //             display: "flex", alignItems: "center", justifyContent: "space-between",
// //             marginBottom: 11,
// //           }}
// //         >
// //           <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>Pipeline Stages</span>
// //           <span style={{ fontSize: 12, color: T.t2 }}>Live candidate counts by stage</span>
// //         </div>
// //         <div style={{ display: "flex", marginBottom: 8 }}>
// //           {pipelineStages.map((stage, i) => {
// //             const maxV = Math.max(...pipelineStages.map(s => s.value), 1);
// //             const pct  = Math.round((stage.value / maxV) * 100);
// //             const isFirst = i === 0;
// //             const isLast  = i === pipelineStages.length - 1;
// //             return (
// //               <div
// //                 key={stage.name}
// //                 style={{
// //                   flex: 1,
// //                   padding: "13px 15px",
// //                   background: T.surface,
// //                   border: `0.5px solid ${T.border}`,
// //                   borderLeft: i > 0 ? "none" : `0.5px solid ${T.border}`,
// //                   borderRadius: isFirst
// //                     ? "10px 0 0 10px"
// //                     : isLast
// //                     ? "0 10px 10px 0"
// //                     : 0,
// //                   position: "relative",
// //                   cursor: "pointer",
// //                   transition: "background 0.14s",
// //                 }}
// //                 onMouseEnter={e =>
// //                   ((e.currentTarget as HTMLDivElement).style.background = "#F8FAFC")
// //                 }
// //                 onMouseLeave={e =>
// //                   ((e.currentTarget as HTMLDivElement).style.background = T.surface)
// //                 }
// //                 onClick={() => router.push(`/candidates?stage=${stage.name.toLowerCase()}`)}
// //               >
// //                 <div style={{ fontSize: 11, fontWeight: 600, color: T.t2, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>
// //                   {stage.name}
// //                 </div>
// //                 <div style={{ fontSize: 26, fontWeight: 600, color: T.t1, letterSpacing: "-1px", lineHeight: 1 }}>
// //                   {stage.value}
// //                 </div>
// //                 <div style={{ height: 3, background: "#E2E8F0", marginTop: 9, borderRadius: 2, overflow: "hidden" }}>
// //                   <div style={{ height: "100%", width: `${pct}%`, background: stage.color, borderRadius: 2, transition: "width 0.6s ease" }} />
// //                 </div>
// //                 {!isLast && (
// //                   <div
// //                     style={{
// //                       position: "absolute", right: -9, top: "50%",
// //                       transform: "translateY(-50%)",
// //                       width: 17, height: 30,
// //                       background: T.surface, border: `0.5px solid ${T.border}`,
// //                       borderRadius: "0 6px 6px 0",
// //                       display: "flex", alignItems: "center", justifyContent: "center",
// //                       zIndex: 2, fontSize: 10, color: T.t3, pointerEvents: "none",
// //                     }}
// //                   >
// //                     ›
// //                   </div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>
// //         <p style={{ fontSize: 11, color: T.t3, textAlign: "center", marginBottom: 22 }}>
// //           Click any stage to filter candidates
// //         </p>

// //         {/* ── Active Jobs table ── */}
// //         <div
// //           style={{
// //             background: T.surface,
// //             border: `0.5px solid ${T.border}`,
// //             borderRadius: T.rl,
// //             overflow: "hidden",
// //             marginBottom: 20,
// //           }}
// //         >
// //           <div
// //             style={{
// //               display: "flex", alignItems: "center", justifyContent: "space-between",
// //               padding: "15px 20px", borderBottom: `0.5px solid ${T.border}`,
// //             }}
// //           >
// //             <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
// //               Active Job Positions
// //               {jobs.length > 0 && (
// //                 <span
// //                   style={{
// //                     fontSize: 12, fontWeight: 500,
// //                     background: T.accentL, color: T.accent,
// //                     padding: "2px 9px", borderRadius: 20, marginLeft: 8,
// //                   }}
// //                 >
// //                   {jobs.length} active
// //                 </span>
// //               )}
// //             </span>
// //             <button
// //               onClick={() => router.push("/candidates")}
// //               style={{
// //                 fontSize: 13, fontWeight: 500, color: T.accent,
// //                 background: "none", border: "none", cursor: "pointer",
// //                 fontFamily: "inherit",
// //               }}
// //             >
// //               View All Candidates →
// //             </button>
// //           </div>

// //           <div style={{ overflowX: "auto" }}>
// //             <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
// //               <thead>
// //                 <tr style={{ borderBottom: `0.5px solid ${T.borderMd}` }}>
// //                   {["Position", "Department", "Location", "Applications", "Shortlisted", "In Progress", "Status", "Actions"].map(h => (
// //                     <th
// //                       key={h}
// //                       style={{
// //                         padding: "10px 16px", textAlign: "left",
// //                         fontSize: 11, fontWeight: 600, color: T.t3,
// //                         textTransform: "uppercase", letterSpacing: "0.5px",
// //                         whiteSpace: "nowrap",
// //                       }}
// //                     >
// //                       {h}
// //                     </th>
// //                   ))}
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {jobs.length === 0 ? (
// //                   <tr>
// //                     <td colSpan={8}>
// //                       <div
// //                         style={{
// //                           display: "flex", flexDirection: "column",
// //                           alignItems: "center", justifyContent: "center",
// //                           padding: "56px 28px", textAlign: "center", gap: 8,
// //                         }}
// //                       >
// //                         <div
// //                           style={{
// //                             width: 56, height: 56, borderRadius: 16,
// //                             background: T.accentL,
// //                             display: "flex", alignItems: "center", justifyContent: "center",
// //                             marginBottom: 6,
// //                           }}
// //                         >
// //                           <TrendingUp size={26} color={T.accent} strokeWidth={1.5} />
// //                         </div>
// //                         <p style={{ fontSize: 15, fontWeight: 600, color: T.t1, margin: 0 }}>
// //                           No job positions found
// //                         </p>
// //                         <p style={{ fontSize: 13, color: T.t2, margin: 0 }}>
// //                           Start a new recruitment pipeline to begin
// //                         </p>
// //                         <button
// //                           onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// //                           style={{
// //                             marginTop: 4, padding: "8px 16px",
// //                             background: T.accent, color: "#fff",
// //                             border: "none", borderRadius: 8,
// //                             fontSize: 13, fontWeight: 500, cursor: "pointer",
// //                           }}
// //                         >
// //                           Start New Pipeline →
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   jobs.map((job: any) => {
// //                     const jobCandidates = candidates.filter((c: any) => c?.job_id === job.id);
// //                     const shortlisted   = jobCandidates.filter((c: any) => c?.status === "Shortlisted").length;
// //                     const inProgress    = jobCandidates.filter(
// //                       (c: any) => c?.exam_link_sent || c?.interview_scheduled
// //                     ).length;
// //                     return (
// //                       <tr
// //                         key={job.id}
// //                         style={{
// //                           borderBottom: `0.5px solid ${T.border}`,
// //                           transition: "background 0.12s",
// //                         }}
// //                         onMouseEnter={e =>
// //                           ((e.currentTarget as HTMLTableRowElement).style.background = "#F8FAFC")
// //                         }
// //                         onMouseLeave={e =>
// //                           ((e.currentTarget as HTMLTableRowElement).style.background = T.surface)
// //                         }
// //                       >
// //                         <td style={{ padding: "13px 16px", fontWeight: 500, color: T.t1 }}>
// //                           {job.title}
// //                         </td>
// //                         <td style={{ padding: "13px 16px", color: T.t2 }}>{job.department}</td>
// //                         <td style={{ padding: "13px 16px", color: T.t2 }}>{job.location}</td>
// //                         <td style={{ padding: "13px 16px", fontWeight: 500, color: T.t1, textAlign: "center" }}>
// //                           {jobCandidates.length}
// //                         </td>
// //                         <td
// //                           style={{ padding: "13px 16px", fontWeight: 600, color: T.accent, textAlign: "center", cursor: "pointer" }}
// //                           onClick={() => router.push(`/candidates?job_id=${job.id}&stage=shortlisted`)}
// //                         >
// //                           {shortlisted}
// //                         </td>
// //                         <td
// //                           style={{ padding: "13px 16px", fontWeight: 600, color: T.accent, textAlign: "center", cursor: "pointer" }}
// //                           onClick={() => router.push(`/candidates?job_id=${job.id}&stage=in_progress`)}
// //                         >
// //                           {inProgress}
// //                         </td>
// //                         <td style={{ padding: "13px 16px" }}>
// //                           <span
// //                             style={{
// //                               display: "inline-flex",
// //                               fontSize: 11, fontWeight: 600, padding: "3px 10px",
// //                               borderRadius: 20,
// //                               background: "#ECFDF5", color: "#059669",
// //                             }}
// //                           >
// //                             Active
// //                           </span>
// //                         </td>
// //                         <td style={{ padding: "13px 16px", whiteSpace: "nowrap" }}>
// //                           <button
// //                             onClick={() => router.push(`/candidates?job_id=${job.id}`)}
// //                             style={{
// //                               fontSize: 12, fontWeight: 500, color: T.accent,
// //                               background: "none", border: "none", cursor: "pointer",
// //                               fontFamily: "inherit", padding: 0, marginRight: 12,
// //                               transition: "opacity 0.12s",
// //                             }}
// //                           >
// //                             View
// //                           </button>
// //                           <button
// //                             onClick={() => setSelectedPipelineJob(job)}
// //                             style={{
// //                               fontSize: 12, fontWeight: 500, color: T.green,
// //                               background: "none", border: "none", cursor: "pointer",
// //                               fontFamily: "inherit", padding: 0,
// //                               transition: "opacity 0.12s",
// //                             }}
// //                           >
// //                             Run Pipeline
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     );
// //                   })
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>

// //         {/* ── Bottom grid: Assessment metrics + Quick Actions ── */}
// //         <div
// //           style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 20 }}
// //         >
// //           {/* Assessment metrics */}
// //           <div
// //             style={{
// //               background: T.surface, border: `0.5px solid ${T.border}`,
// //               borderRadius: T.rl, overflow: "hidden",
// //             }}
// //           >
// //             <div
// //               style={{
// //                 display: "flex", alignItems: "center", justifyContent: "space-between",
// //                 padding: "15px 20px", borderBottom: `0.5px solid ${T.border}`,
// //               }}
// //             >
// //               <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
// //                 Assessment Metrics
// //               </span>
// //               <button
// //                 onClick={() => router.push("/assessments")}
// //                 style={{
// //                   fontSize: 13, fontWeight: 500, color: T.accent,
// //                   background: "none", border: "none", cursor: "pointer",
// //                   fontFamily: "inherit",
// //                 }}
// //               >
// //                 View details →
// //               </button>
// //             </div>
// //             <div style={{ padding: "15px 18px" }}>
// //               {/* Completion + Pass rate boxes */}
// //               <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
// //                 {[
// //                   { label: "Completion Rate", value: `${stats.assessmentCompletionRate}%`, color: T.accent },
// //                   { label: "Pass Rate",        value: `${stats.assessmentPassRate}%`,       color: T.green },
// //                 ].map(m => (
// //                   <div
// //                     key={m.label}
// //                     style={{
// //                       flex: 1, padding: 12, textAlign: "center",
// //                       background: T.bg, borderRadius: 9,
// //                       border: `0.5px solid ${T.border}`,
// //                     }}
// //                   >
// //                     <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.5px", color: m.color }}>
// //                       {m.value}
// //                     </div>
// //                     <div style={{ fontSize: 11, color: T.t2, marginTop: 2, fontWeight: 500 }}>
// //                       {m.label}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Assessment bar chart */}
// //               <ResponsiveContainer width="100%" height={160}>
// //                 <BarChart data={assessmentMetrics} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
// //                   <XAxis dataKey="name" tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
// //                   <YAxis tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
// //                   <Tooltip
// //                     contentStyle={{
// //                       background: T.surface, border: `0.5px solid ${T.borderMd}`,
// //                       borderRadius: 10, fontSize: 12,
// //                     }}
// //                   />
// //                   <Bar dataKey="value" fill="#8B5CF6" radius={[5, 5, 0, 0]} />
// //                 </BarChart>
// //               </ResponsiveContainer>

// //               {/* Insight */}
// //               <div
// //                 style={{
// //                   marginTop: 12, fontSize: 12, color: T.t2, lineHeight: 1.55,
// //                   padding: "10px 14px",
// //                   background: T.accentL,
// //                   borderRadius: 8,
// //                   borderLeft: `3px solid ${T.accent}`,
// //                 }}
// //               >
// //                 {parseFloat(String(stats.assessmentCompletionRate)) > 0
// //                     ? `${stats.assessmentCompletionRate}% completion · ${stats.assessmentPassRate}% pass rate`
// //                     : "Assessment data will appear once candidates complete tests."}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Quick actions */}
// //           <div
// //             style={{
// //               background: T.surface, border: `0.5px solid ${T.border}`,
// //               borderRadius: T.rl, overflow: "hidden",
// //             }}
// //           >
// //             <div
// //               style={{ padding: "15px 20px", borderBottom: `0.5px solid ${T.border}` }}
// //             >
// //               <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
// //                 Quick Actions
// //               </span>
// //             </div>
// //             <div style={{ padding: 18 }}>
// //               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
// //                 {[
// //                   {
// //                     label: "New Pipeline",
// //                     sub: "Run pipeline",
// //                     color: T.accentL,
// //                     stroke: T.accent,
// //                     icon: <PlayCircle size={15} />,
// //                     onClick: () => jobs.length > 0 && setSelectedPipelineJob(jobs[0]),
// //                   },
// //                   {
// //                     label: "Manage Assessments",
// //                     sub: `${stats.activeAssessments} pending`,
// //                     color: "#ECFDF5",
// //                     stroke: T.green,
// //                     icon: <Target size={15} />,
// //                     onClick: () => router.push("/assessments"),
// //                   },
// //                   {
// //                     label: "Schedule Interviews",
// //                     sub: `${stats.activeInterviews} scheduled`,
// //                     color: "#FFFBEB",
// //                     stroke: T.amber,
// //                     icon: <CalendarDays size={15} />,
// //                     onClick: () => router.push("/scheduler"),
// //                   },
// //                   {
// //                     label: "View All Candidates",
// //                     sub: `${candidates.length} total`,
// //                     color: "#F5F3FF",
// //                     stroke: T.purple,
// //                     icon: <Users size={15} />,
// //                     onClick: () => router.push("/candidates"),
// //                   },
// //                 ].map(qa => (
// //                   <button
// //                     key={qa.label}
// //                     onClick={qa.onClick}
// //                     style={{
// //                       background: T.bg,
// //                       border: `0.5px solid ${T.border}`,
// //                       borderRadius: 10, padding: 14,
// //                       cursor: "pointer", transition: "all 0.14s",
// //                       textAlign: "left", fontFamily: "inherit", width: "100%",
// //                     }}
// //                     onMouseEnter={e => {
// //                       const el = e.currentTarget as HTMLButtonElement;
// //                       el.style.borderColor = T.borderMd;
// //                       el.style.background  = "#EEF2F7";
// //                     }}
// //                     onMouseLeave={e => {
// //                       const el = e.currentTarget as HTMLButtonElement;
// //                       el.style.borderColor = T.border;
// //                       el.style.background  = T.bg;
// //                     }}
// //                   >
// //                     <div
// //                       style={{
// //                         width: 32, height: 32, borderRadius: 8,
// //                         background: qa.color,
// //                         display: "flex", alignItems: "center", justifyContent: "center",
// //                         marginBottom: 8, color: qa.stroke,
// //                       }}
// //                     >
// //                       {qa.icon}
// //                     </div>
// //                     <div style={{ fontSize: 13, fontWeight: 600, color: T.t1, marginBottom: 2 }}>
// //                       {qa.label}
// //                     </div>
// //                     <div style={{ fontSize: 11, color: T.t2 }}>{qa.sub}</div>
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ── PipelineRunner modal ── */}
// //       {selectedPipelineJob && (
// //         <PipelineRunner
// //           job={selectedPipelineJob}
// //           onPipelineStart={() =>
// //             setPipelineStatus(p => ({
// //               ...p,
// //               [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
// //             }))
// //           }
// //           onPipelineComplete={() => {
// //             fetchAll(true).then(() => {
// //               const jobCandidates = candidates.filter(
// //                 (c: any) => String(c?.job_id) === String(selectedPipelineJob.id)
// //               );
// //               const shortlisted = jobCandidates.filter(
// //                 (c: any) => c?.status === "Shortlisted"
// //               ).length;
// //               addPipelineAlert(
// //                 selectedPipelineJob.title,
// //                 shortlisted,
// //                 jobCandidates.length - shortlisted
// //               );
// //               setPipelineStatus(p => ({
// //                 ...p,
// //                 [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
// //               }));
// //             });
// //           }}
// //           onClose={() => setSelectedPipelineJob(null)}
// //         />
// //       )}

// //       {/* ── Persistent result toasts ── */}
// //       <PipelineResultToast toasts={resultToasts} onDismiss={dismissToast} />

// //       <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
// //     </div>
// //   );
// // };

// // export default Dashboard;
// // // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // // "use client";

// // // // import React, { useCallback, useEffect, useMemo, useState } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";

// // // // import { RefreshCw, Users, Target, Clock, Bell, AlertCircle} from "lucide-react";

// // // // import StatCard from "./subComponents/StatCard";
// // // // import PipelineRunner from "./subComponents/PipelineRunner";

// // // // import {
// // // //   ResponsiveContainer,
// // // //   CartesianGrid,
// // // //   Tooltip,
// // // //   XAxis,
// // // //   YAxis,
// // // //   BarChart,
// // // //   Bar,
// // // //   LineChart,
// // // //   Line,
// // // //   Legend,
// // // //   Cell,
// // // // } from "recharts";

// // // // import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// // // // const Dashboard: React.FC = () => {
// // // //   const router = useRouter();
// // // //   const dispatch = useAppDispatch();
// // // //   const { jobs, candidates, recruitmentData, loading } = useAppSelector((state) => state.dashboard);  
// // // //   const [refreshing, setRefreshing] = useState(false);
// // // //   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
// // // //   const [selectedTimeRange, setSelectedTimeRange] =useState<"week" | "month" | "quarter" | "year">("month");
// // // //   const [notifications, setNotifications] = useState<any[]>([]);
// // // //   const [pipelineStatus, setPipelineStatus] = useState<Record<string, any>>({});
// // // //   const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

// // // //   const fetchAll = useCallback(
// // // //     async (force = false) => {
// // // //       if (force) setRefreshing(true);
// // // //       try {
// // // //         await dispatch(dashboardRefreshAll()).unwrap();
// // // //         setLastFetchTime(new Date());
// // // //       } finally {
// // // //         setRefreshing(false);
// // // //       }
// // // //     },
// // // //     [dispatch]
// // // //   );

// // // //   useEffect(() => {
// // // //     fetchAll();
// // // //     const id = setInterval(() => fetchAll(true), 120000);
// // // //     return () => clearInterval(id);
// // // //   }, [fetchAll, selectedTimeRange]);

// // // //   const stats = useMemo(() => {
// // // //     const total = candidates.length;
// // // //     const shortlisted = candidates.filter((c: { status: string }) => c?.status === "Shortlisted").length;
// // // //     const interviews = candidates.filter((c: { interview_scheduled: any }) => c?.interview_scheduled).length;
// // // //     const assessmentsSent = candidates.filter((c: { exam_link_sent: any }) => c?.exam_link_sent).length;
// // // //     const assessmentsCompleted = candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length;
// // // //     const hires = candidates.filter((c: { final_status: string }) => c?.final_status === "Hired").length;
// // // //     const pendingAssessments = candidates.filter(
// // // //       (c) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// // // //     ).length;

// // // //     const now = new Date();
// // // //     const pendingInterviews = candidates.filter((c: { interview_date: string | number | Date; interview_scheduled: any }) => {
// // // //       if (!c?.interview_date) return false;
// // // //       return c?.interview_scheduled && new Date(c.interview_date) > now;
// // // //     }).length;

// // // //     const timeToHire = (() => {
// // // //       const hired = candidates.filter((c: { final_status: string; processed_date: any }) => c?.final_status === "Hired" && c?.processed_date);
// // // //       if (!hired.length) return 0;
// // // //       const totalDays = hired.reduce((acc: number, c: { processed_date: string | number | Date }) => {
// // // //         const start = new Date(c.processed_date).getTime();
// // // //         const days = Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24));
// // // //         return acc + Math.max(days, 0);
// // // //       }, 0);
// // // //       return Math.round(totalDays / hired.length);
// // // //     })();

// // // //     return {
// // // //       totalApplications: total,
// // // //       activeInterviews: interviews,
// // // //       timeToHire,
// // // //       activeAssessments: pendingAssessments,
// // // //       shortlistRate: total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
// // // //       assessmentCompletionRate:
// // // //         assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
// // // //       totalHires: hires,
// // // //       pendingActions: pendingAssessments + pendingInterviews,
// // // //     };
// // // //   }, [candidates]);

// // // //   useEffect(() => {
// // // //     const outs: any[] = [];
// // // //     const pendingAssessments = candidates.filter(
// // // //       (c: { exam_link_sent: any; exam_completed: any; link_expired: any }) =>
// // // //         c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// // // //     );
// // // //     if (pendingAssessments.length) {
// // // //       outs.push({
// // // //         id: 1,
// // // //         type: "warning",
// // // //         message: `${pendingAssessments.length} candidates have pending assessments`,
// // // //         action: "View Candidates",
// // // //         route: "/candidates",
// // // //       });
// // // //     }
// // // //     const upcomingToday = candidates.filter((c: { interview_date: string | number | Date }) => {
// // // //       if (!c?.interview_date) return false;
// // // //       const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / (1000 * 60 * 60);
// // // //       return diffHrs > 0 && diffHrs < 24;
// // // //     });
// // // //     if (upcomingToday.length) {
// // // //       outs.push({
// // // //         id: 2,
// // // //         type: "info",
// // // //         message: `${upcomingToday.length} interviews scheduled for today`,
// // // //         action: "View Schedule",
// // // //         route: "/scheduler",
// // // //       });
// // // //     }
// // // //     setNotifications(outs);
// // // //   }, [candidates]);

// // // //   const pipelineStages = useMemo(
// // // //     () => [
// // // //       { name: "Applied", value: candidates.length, color: "#3B82F6" },
// // // //       { name: "Screened", value: candidates.filter((c: { ats_score: number }) => c?.ats_score > 0).length, color: "#10B981" },
// // // //       { name: "Shortlisted", value: candidates.filter((c: { status: string }) => c?.status === "Shortlisted").length, color: "#F59E0B" },
// // // //       { name: "Assessment", value: candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length, color: "#8B5CF6" },
// // // //       { name: "Interview", value: candidates.filter((c: { interview_scheduled: any }) => c?.interview_scheduled).length, color: "#EF4444" },
// // // //       { name: "Hired", value: candidates.filter((c: { final_status: string }) => c?.final_status === "Hired").length, color: "#059669" },
// // // //     ],
// // // //     [candidates]
// // // //   );

// // // //   const assessmentMetrics = useMemo(
// // // //     () => [
// // // //       { name: "Sent", value: candidates.filter((c: { exam_link_sent: any }) => c?.exam_link_sent).length },
// // // //       { name: "Started", value: candidates.filter((c: { exam_started: any }) => c?.exam_started).length },
// // // //       { name: "Completed", value: candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length },
// // // //       { name: "Passed", value: candidates.filter((c: { exam_percentage: number }) => c?.exam_percentage >= 70).length },
// // // //     ],
// // // //     [candidates]
// // // //   );

// // // //   const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

// // // //   if (loading && !lastFetchTime) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
// // // //           <p className="mt-4 text-gray-600">Loading dashboard...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen p-6 bg-white">
// // // //         <div className="flex items-center justify-between mb-6">
// // // //           <div>
// // // //             <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
// // // //             <div className="flex items-center mt-1 space-x-4">
// // // //               <p className="text-gray-600">Welcome back! Here&apos;s your recruitment overview</p>
// // // //               {lastFetchTime && (
// // // //                 <span className="text-xs text-gray-500">
// // // //                   Last updated: {lastFetchTime.toLocaleTimeString()}
// // // //                 </span>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //           <div className="flex items-center space-x-3">
// // // //             <button
// // // //               onClick={handleRefresh}
// // // //               disabled={refreshing}
// // // //               className="p-2 border border-gray-500 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-gray-500"
// // // //               title="Refresh Data"
// // // //             >
// // // //               <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
// // // //             </button>
// // // //             <select
// // // //               value={selectedTimeRange}
// // // //               onChange={(e) => setSelectedTimeRange(e.target.value as any)}
// // // //               className="border rounded-lg px-4 py-2 text-sm text-gray-500"
// // // //             >
// // // //               <option value="week">This Week</option>
// // // //               <option value="month">This Month</option>
// // // //               <option value="quarter">This Quarter</option>
// // // //               <option value="year">This Year</option>
// // // //             </select>
// // // //             <button
// // // //               onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// // // //               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// // // //             >
// // // //               New Pipeline
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Notifications */}
// // // //         {notifications.length > 0 && (
// // // //           <div className="mb-6 space-y-2">
// // // //             {notifications.map((n) => (
// // // //               <div
// // // //                 key={n.id}
// // // //                 className={`p-4 rounded-lg border flex items-center justify-between ${
// // // //                   n.type === "warning" ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200"
// // // //                 }`}
// // // //               >
// // // //                 <div className="flex items-center">
// // // //                   <AlertCircle
// // // //                     className={`w-5 h-5 mr-3 ${n.type === "warning" ? "text-yellow-600" : "text-blue-600"}`}
// // // //                   />
// // // //                   <span className={n.type === "warning" ? "text-yellow-800" : "text-blue-800"}>
// // // //                     {n.message}
// // // //                   </span>
// // // //                 </div>
// // // //                 <button
// // // //                   onClick={() => router.push(n.route)}
// // // //                   className={`px-3 py-1 rounded text-sm font-medium ${
// // // //                     n.type === "warning"
// // // //                       ? "bg-yellow-600 text-white hover:bg-yellow-700"
// // // //                       : "bg-blue-600 text-white hover:bg-blue-700"
// // // //                   }`}
// // // //                 >
// // // //                   {n.action}
// // // //                 </button>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         )}

// // // //         {/* Stats */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // //           <StatCard
// // // //             title="Total Applications"
// // // //             value={stats.totalApplications}
// // // //             change={12.5}
// // // //             icon={Users}
// // // //             color="bg-blue-600"
// // // //             subtitle="All time applications"
// // // //             loading={loading}
// // // //           />
// // // //           <StatCard
// // // //             title="Shortlist Rate"
// // // //             value={`${stats.shortlistRate}%`}
// // // //             change={5.2}
// // // //             icon={Target}
// // // //             color="bg-green-600"
// // // //             subtitle="Candidates shortlisted"
// // // //             loading={loading}
// // // //           />
// // // //           <StatCard
// // // //             title="Time-to-Hire"
// // // //             value={`${stats.timeToHire}d`}
// // // //             change={-8.3}
// // // //             icon={Clock}
// // // //             color="bg-yellow-600"
// // // //             subtitle="Average days to hire"
// // // //             loading={loading}
// // // //           />
// // // //           <StatCard
// // // //             title="Pending Actions"
// // // //             value={stats.pendingActions}
// // // //             icon={Bell}
// // // //             color="bg-purple-600"
// // // //             subtitle="Requires attention"
// // // //             loading={loading}
// // // //           />
// // // //         </div>

// // // //         {/* Charts */}
// // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
// // // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Pipeline</h3>
// // // //             <ResponsiveContainer width="100%" height={300}>
// // // //               <BarChart data={pipelineStages}>
// // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // //                 <XAxis dataKey="name" />
// // // //                 <YAxis />
// // // //                 <Tooltip />
// // // //                 <Bar dataKey="value" fill="#3B82F6">
// // // //                   {pipelineStages.map((e, i) => (
// // // //                     <Cell key={i} fill={e.color} />
// // // //                   ))}
// // // //                 </Bar>
// // // //               </BarChart>
// // // //             </ResponsiveContainer>
// // // //           </div>

// // // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Activity</h3>
// // // //             <ResponsiveContainer width="100%" height={300}>
// // // //               <LineChart data={recruitmentData}>
// // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // //                 <XAxis dataKey="date" /> {/* change to "month" if your API provides that */}
// // // //                 <YAxis />
// // // //                 <Tooltip />
// // // //                 <Legend />
// // // //                 <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
// // // //                 <Line type="monotone" dataKey="interviews" stroke="#10B981" strokeWidth={2} />
// // // //                 <Line type="monotone" dataKey="hires" stroke="#EF4444" strokeWidth={2} />
// // // //               </LineChart>
// // // //             </ResponsiveContainer>
// // // //           </div>
// // // //         </div>

// // // //         {/* Jobs table */}
// // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
// // // //           <div className="p-6 border-b border-gray-200 flex items-center justify-between">
// // // //             <h3 className="text-lg font-semibold text-gray-700">Active Job Positions</h3>
// // // //             <button
// // // //               onClick={() => router.push("/candidates")}
// // // //               className="text-blue-600 hover:text-blue-700 text-sm font-medium"
// // // //             >
// // // //               View All Candidates →
// // // //             </button>
// // // //           </div>
// // // //           <div className="overflow-x-auto">
// // // //             <table className="w-full">
// // // //               <thead>
// // // //                 <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
// // // //                   <th className="px-6 py-3">Position</th>
// // // //                   <th className="px-6 py-3">Department</th>
// // // //                   <th className="px-6 py-3">Location</th>
// // // //                   <th className="px-6 py-3">Applications</th>
// // // //                   <th className="px-6 py-3">Shortlisted</th>
// // // //                   <th className="px-6 py-3">In Progress</th>
// // // //                   <th className="px-6 py-3">Status</th>
// // // //                   <th className="px-6 py-3">Actions</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody className="divide-y divide-gray-200">
// // // //                 {jobs.length === 0 ? (
// // // //                   <tr>
// // // //                     <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
// // // //                       <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// // // //                       <p className="text-lg font-medium">No job positions found</p>
// // // //                       <p className="mt-1">Start a new recruitment pipeline to begin</p>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ) : (
// // // //                   jobs.map((job: any) => {
// // // //                     const jobCandidates = candidates.filter((c: { job_id: any }) => c?.job_id === job.id);
// // // //                     const shortlisted = jobCandidates.filter((c: { status: string }) => c?.status === "Shortlisted").length;
// // // //                     const inProgress = jobCandidates.filter(
// // // //                       (c: { exam_link_sent: any; interview_scheduled: any }) => c?.exam_link_sent || c?.interview_scheduled
// // // //                     ).length;

// // // //                     return (
// // // //                       <tr key={job.id} className="hover:bg-gray-50">
// // // //                         <td className="px-6 py-4">
// // // //                           <div className="text-sm font-medium text-gray-900">{job.title}</div>
// // // //                         </td>
// // // //                         <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
// // // //                         <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
// // // //                         <td className="px-6 py-4">
// // // //                           <span className="text-sm font-medium text-gray-900">
// // // //                             {jobCandidates.length}
// // // //                           </span>
// // // //                         </td>
// // // //                         <td className="px-6 py-4">
// // // //                           <span className="text-sm font-medium text-green-600">{shortlisted}</span>
// // // //                         </td>
// // // //                         <td className="px-6 py-4">
// // // //                           <span className="text-sm font-medium text-blue-600">{inProgress}</span>
// // // //                         </td>
// // // //                         <td className="px-6 py-4">
// // // //                           <span className="inline-flex px-2 py-1 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
// // // //                             Active
// // // //                           </span>
// // // //                         </td>
// // // //                         <td className="px-6 py-4 text-sm">
// // // //                           <div className="flex space-x-2">
// // // //                             <button
// // // //                               onClick={() => router.push(`/candidates?job_id=${job.id}`)}
// // // //                               className="text-blue-600 hover:text-blue-900 font-medium"
// // // //                             >
// // // //                               View
// // // //                             </button>
// // // //                             <button
// // // //                               onClick={() => setSelectedPipelineJob(job)}
// // // //                               className="text-green-600 hover:text-green-900 font-medium"
// // // //                             >
// // // //                               Run Pipeline
// // // //                             </button>
// // // //                           </div>
// // // //                         </td>
// // // //                       </tr>
// // // //                     );
// // // //                   })
// // // //                 )}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         </div>

// // // //         {/* Assessment metrics + Quick actions */}
// // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Assessment Metrics</h3>
// // // //             <ResponsiveContainer width="100%" height={200}>
// // // //               <BarChart data={assessmentMetrics}>
// // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // //                 <XAxis dataKey="name" />
// // // //                 <YAxis />
// // // //                 <Tooltip />
// // // //                 <Bar dataKey="value" fill="#8B5CF6" />
// // // //               </BarChart>
// // // //             </ResponsiveContainer>
// // // //             <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
// // // //               <div>
// // // //                 <p className="text-gray-500">Completion Rate</p>
// // // //                 <p className="text-xl font-semibold text-gray-500">{stats.assessmentCompletionRate}%</p>
// // // //               </div>
// // // //               <div>
// // // //                 <p className="text-gray-500">Pass Rate</p>
// // // //                 <p className="text-xl font-semibold text-gray-500">
// // // //                   {candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length > 0
// // // //                     ? (
// // // //                         (candidates.filter((c: { exam_percentage: number }) => c?.exam_percentage >= 70).length /
// // // //                           candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length) *
// // // //                         100
// // // //                       ).toFixed(1)
// // // //                     : 0}
// // // //                   %
// // // //                 </p>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
// // // //             <div className="space-y-3">
// // // //               <button
// // // //                 onClick={() => router.push("/assessments")}
// // // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // // //               >
// // // //                 <span className="font-medium text-gray-700">Manage Assessments</span>
// // // //                 <span className="text-sm text-gray-500">{stats.activeAssessments} pending</span>
// // // //               </button>

// // // //               <button
// // // //                 onClick={() => router.push("/scheduler")}
// // // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // // //               >
// // // //                 <span className="font-medium text-gray-700">Schedule Interviews</span>
// // // //                 <span className="text-sm text-gray-500">{stats.activeInterviews} scheduled</span>
// // // //               </button>

// // // //               <button
// // // //                 onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// // // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // // //               >
// // // //                 <span className="font-medium text-gray-700">Start New Recruitment</span>
// // // //                 <span className="text-sm text-gray-500">Run pipeline</span>
// // // //               </button>

// // // //               <button
// // // //                 onClick={() => router.push("/candidates")}
// // // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // // //               >
// // // //                 <span className="font-medium text-gray-700">View All Candidates</span>
// // // //                 <span className="text-sm text-gray-500">{candidates.length} total</span>
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //       {selectedPipelineJob && (
// // // //         <PipelineRunner
// // // //           job={selectedPipelineJob}
// // // //           onPipelineStart={() =>
// // // //             setPipelineStatus((p) => ({
// // // //               ...p,
// // // //               [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
// // // //             }))
// // // //           }
// // // //           onPipelineComplete={() => {
// // // //             fetchAll(true);
// // // //             setPipelineStatus((p) => ({
// // // //               ...p,
// // // //               [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
// // // //             }));
// // // //           }}
// // // //           onClose={() => setSelectedPipelineJob(null)}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Dashboard;
// // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // "use client";

// // // import React, { useCallback, useEffect, useMemo, useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";

// // // import { RefreshCw, Users, Target, Clock, Bell, AlertCircle} from "lucide-react";

// // // import StatCard from "./subComponents/StatCard";
// // // import PipelineRunner from "./subComponents/PipelineRunner";
// // // import RecruitmentJourney from "./subComponents/RecruitmentJourney";

// // // import {
// // //   ResponsiveContainer,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   XAxis,
// // //   YAxis,
// // //   BarChart,
// // //   Bar,
// // //   LineChart,
// // //   Line,
// // //   Legend,
// // //   Cell,
// // // } from "recharts";

// // // import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// // // const Dashboard: React.FC = () => {
// // //   const router = useRouter();
// // //   const dispatch = useAppDispatch();
// // //   const { jobs, candidates, recruitmentData, loading } = useAppSelector((state) => state.dashboard);  
// // //   const [refreshing, setRefreshing] = useState(false);
// // //   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
// // //   const [selectedTimeRange, setSelectedTimeRange] =useState<"week" | "month" | "quarter" | "year">("month");
// // //   const [notifications, setNotifications] = useState<any[]>([]);
// // //   const [pipelineStatus, setPipelineStatus] = useState<Record<string, any>>({});
// // //   const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

// // //   const fetchAll = useCallback(
// // //     async (force = false) => {
// // //       if (force) setRefreshing(true);
// // //       try {
// // //         await dispatch(dashboardRefreshAll()).unwrap();
// // //         setLastFetchTime(new Date());
// // //       } finally {
// // //         setRefreshing(false);
// // //       }
// // //     },
// // //     [dispatch]
// // //   );

// // //   useEffect(() => {
// // //     fetchAll();
// // //     const id = setInterval(() => fetchAll(true), 120000);
// // //     return () => clearInterval(id);
// // //   }, [fetchAll, selectedTimeRange]);

// // //   const stats = useMemo(() => {
// // //     const total = candidates.length;
// // //     const shortlisted = candidates.filter((c: { status: string }) => c?.status === "Shortlisted").length;
// // //     const interviews = candidates.filter((c: { interview_scheduled: any }) => c?.interview_scheduled).length;
// // //     const assessmentsSent = candidates.filter((c: { exam_link_sent: any }) => c?.exam_link_sent).length;
// // //     const assessmentsCompleted = candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length;
// // //     const hires = candidates.filter((c: { final_status: string }) => c?.final_status === "Hired").length;
// // //     const pendingAssessments = candidates.filter(
// // //       (c) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// // //     ).length;

// // //     const now = new Date();
// // //     const pendingInterviews = candidates.filter((c: { interview_date: string | number | Date; interview_scheduled: any }) => {
// // //       if (!c?.interview_date) return false;
// // //       return c?.interview_scheduled && new Date(c.interview_date) > now;
// // //     }).length;

// // //     const timeToHire = (() => {
// // //       const hired = candidates.filter((c: { final_status: string; processed_date: any }) => c?.final_status === "Hired" && c?.processed_date);
// // //       if (!hired.length) return 0;
// // //       const totalDays = hired.reduce((acc: number, c: { processed_date: string | number | Date }) => {
// // //         const start = new Date(c.processed_date).getTime();
// // //         const days = Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24));
// // //         return acc + Math.max(days, 0);
// // //       }, 0);
// // //       return Math.round(totalDays / hired.length);
// // //     })();

// // //     return {
// // //       totalApplications: total,
// // //       activeInterviews: interviews,
// // //       timeToHire,
// // //       activeAssessments: pendingAssessments,
// // //       shortlistRate: total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
// // //       assessmentCompletionRate:
// // //         assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
// // //       totalHires: hires,
// // //       pendingActions: pendingAssessments + pendingInterviews,
// // //     };
// // //   }, [candidates]);

// // //   useEffect(() => {
// // //     const outs: any[] = [];
// // //     const pendingAssessments = candidates.filter(
// // //       (c: { exam_link_sent: any; exam_completed: any; link_expired: any }) =>
// // //         c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// // //     );
// // //     if (pendingAssessments.length) {
// // //       outs.push({
// // //         id: 1,
// // //         type: "warning",
// // //         message: `${pendingAssessments.length} candidates have pending assessments`,
// // //         action: "View Candidates",
// // //         route: "/candidates",
// // //       });
// // //     }
// // //     const upcomingToday = candidates.filter((c: { interview_date: string | number | Date }) => {
// // //       if (!c?.interview_date) return false;
// // //       const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / (1000 * 60 * 60);
// // //       return diffHrs > 0 && diffHrs < 24;
// // //     });
// // //     if (upcomingToday.length) {
// // //       outs.push({
// // //         id: 2,
// // //         type: "info",
// // //         message: `${upcomingToday.length} interviews scheduled for today`,
// // //         action: "View Schedule",
// // //         route: "/scheduler",
// // //       });
// // //     }
// // //     setNotifications(outs);
// // //   }, [candidates]);

// // //   const pipelineStages = useMemo(
// // //     () => [
// // //       { name: "Applied", value: candidates.length, color: "#3B82F6" },
// // //       { name: "Screened", value: candidates.filter((c: { ats_score: number }) => c?.ats_score > 0).length, color: "#10B981" },
// // //       { name: "Shortlisted", value: candidates.filter((c: { status: string }) => c?.status === "Shortlisted").length, color: "#F59E0B" },
// // //       { name: "Assessment", value: candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length, color: "#8B5CF6" },
// // //       { name: "Interview", value: candidates.filter((c: { interview_scheduled: any }) => c?.interview_scheduled).length, color: "#EF4444" },
// // //       { name: "Hired", value: candidates.filter((c: { final_status: string }) => c?.final_status === "Hired").length, color: "#059669" },
// // //     ],
// // //     [candidates]
// // //   );

// // //   const assessmentMetrics = useMemo(
// // //     () => [
// // //       { name: "Sent", value: candidates.filter((c: { exam_link_sent: any }) => c?.exam_link_sent).length },
// // //       { name: "Started", value: candidates.filter((c: { exam_started: any }) => c?.exam_started).length },
// // //       { name: "Completed", value: candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length },
// // //       { name: "Passed", value: candidates.filter((c: { exam_percentage: number }) => c?.exam_percentage >= 70).length },
// // //     ],
// // //     [candidates]
// // //   );

// // //   const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

// // //   if (loading && !lastFetchTime) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
// // //           <p className="mt-4 text-gray-600">Loading dashboard...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen p-6 bg-white">
// // //         <div className="flex items-center justify-between mb-6">
// // //           <div>
// // //             <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
// // //             <div className="flex items-center mt-1 space-x-4">
// // //               <p className="text-gray-600">Welcome back! Here&apos;s your recruitment overview</p>
// // //               {lastFetchTime && (
// // //                 <span className="text-xs text-gray-500">
// // //                   Last updated: {lastFetchTime.toLocaleTimeString()}
// // //                 </span>
// // //               )}
// // //             </div>
// // //           </div>
// // //           <div className="flex items-center space-x-3">
// // //             <button
// // //               onClick={handleRefresh}
// // //               disabled={refreshing}
// // //               className="p-2 border border-gray-500 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-gray-500"
// // //               title="Refresh Data"
// // //             >
// // //               <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
// // //             </button>
// // //             <select
// // //               value={selectedTimeRange}
// // //               onChange={(e) => setSelectedTimeRange(e.target.value as any)}
// // //               className="border rounded-lg px-4 py-2 text-sm text-gray-500"
// // //             >
// // //               <option value="week">This Week</option>
// // //               <option value="month">This Month</option>
// // //               <option value="quarter">This Quarter</option>
// // //               <option value="year">This Year</option>
// // //             </select>
// // //             <button
// // //               onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// // //               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// // //             >
// // //               New Pipeline
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Notifications */}
// // //         {notifications.length > 0 && (
// // //           <div className="mb-6 space-y-2">
// // //             {notifications.map((n) => (
// // //               <div
// // //                 key={n.id}
// // //                 className={`p-4 rounded-lg border flex items-center justify-between ${
// // //                   n.type === "warning" ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200"
// // //                 }`}
// // //               >
// // //                 <div className="flex items-center">
// // //                   <AlertCircle
// // //                     className={`w-5 h-5 mr-3 ${n.type === "warning" ? "text-yellow-600" : "text-blue-600"}`}
// // //                   />
// // //                   <span className={n.type === "warning" ? "text-yellow-800" : "text-blue-800"}>
// // //                     {n.message}
// // //                   </span>
// // //                 </div>
// // //                 <button
// // //                   onClick={() => router.push(n.route)}
// // //                   className={`px-3 py-1 rounded text-sm font-medium ${
// // //                     n.type === "warning"
// // //                       ? "bg-yellow-600 text-white hover:bg-yellow-700"
// // //                       : "bg-blue-600 text-white hover:bg-blue-700"
// // //                   }`}
// // //                 >
// // //                   {n.action}
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}

// // //         {/* ── Recruitment Journey Stepper ── */}
// // //         <RecruitmentJourney
// // //           currentStep={(() => {
// // //             // Auto-derive active step from live candidate/job data
// // //             if (candidates.filter((c: any) => c?.interview_scheduled).length > 0) return 4;
// // //             if (candidates.filter((c: any) => c?.ats_score > 0).length > 0) return 3;
// // //             if (candidates.filter((c: any) => c?.exam_link_sent).length > 0) return 2;
// // //             if (jobs.length > 0) return 1;
// // //             return 0;
// // //           })()}
// // //           onStepClick={(route) => router.push(route)}
// // //         />

// // //         {/* Stats */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //           <StatCard
// // //             title="Total Applications"
// // //             value={stats.totalApplications}
// // //             change={12.5}
// // //             icon={Users}
// // //             color="bg-blue-600"
// // //             subtitle="All time applications"
// // //             loading={loading}
// // //           />
// // //           <StatCard
// // //             title="Shortlist Rate"
// // //             value={`${stats.shortlistRate}%`}
// // //             change={5.2}
// // //             icon={Target}
// // //             color="bg-green-600"
// // //             subtitle="Candidates shortlisted"
// // //             loading={loading}
// // //           />
// // //           <StatCard
// // //             title="Time-to-Hire"
// // //             value={`${stats.timeToHire}d`}
// // //             change={-8.3}
// // //             icon={Clock}
// // //             color="bg-yellow-600"
// // //             subtitle="Average days to hire"
// // //             loading={loading}
// // //           />
// // //           <StatCard
// // //             title="Pending Actions"
// // //             value={stats.pendingActions}
// // //             icon={Bell}
// // //             color="bg-purple-600"
// // //             subtitle="Requires attention"
// // //             loading={loading}
// // //           />
// // //         </div>

// // //         {/* Charts */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
// // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Pipeline</h3>
// // //             <ResponsiveContainer width="100%" height={300}>
// // //               <BarChart data={pipelineStages}>
// // //                 <CartesianGrid strokeDasharray="3 3" />
// // //                 <XAxis dataKey="name" />
// // //                 <YAxis />
// // //                 <Tooltip />
// // //                 <Bar dataKey="value" fill="#3B82F6">
// // //                   {pipelineStages.map((e, i) => (
// // //                     <Cell key={i} fill={e.color} />
// // //                   ))}
// // //                 </Bar>
// // //               </BarChart>
// // //             </ResponsiveContainer>
// // //           </div>

// // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Activity</h3>
// // //             <ResponsiveContainer width="100%" height={300}>
// // //               <LineChart data={recruitmentData}>
// // //                 <CartesianGrid strokeDasharray="3 3" />
// // //                 <XAxis dataKey="date" /> {/* change to "month" if your API provides that */}
// // //                 <YAxis />
// // //                 <Tooltip />
// // //                 <Legend />
// // //                 <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
// // //                 <Line type="monotone" dataKey="interviews" stroke="#10B981" strokeWidth={2} />
// // //                 <Line type="monotone" dataKey="hires" stroke="#EF4444" strokeWidth={2} />
// // //               </LineChart>
// // //             </ResponsiveContainer>
// // //           </div>
// // //         </div>

// // //         {/* Jobs table */}
// // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
// // //           <div className="p-6 border-b border-gray-200 flex items-center justify-between">
// // //             <h3 className="text-lg font-semibold text-gray-700">Active Job Positions</h3>
// // //             <button
// // //               onClick={() => router.push("/candidates")}
// // //               className="text-blue-600 hover:text-blue-700 text-sm font-medium"
// // //             >
// // //               View All Candidates →
// // //             </button>
// // //           </div>
// // //           <div className="overflow-x-auto">
// // //             <table className="w-full">
// // //               <thead>
// // //                 <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
// // //                   <th className="px-6 py-3">Position</th>
// // //                   <th className="px-6 py-3">Department</th>
// // //                   <th className="px-6 py-3">Location</th>
// // //                   <th className="px-6 py-3">Applications</th>
// // //                   <th className="px-6 py-3">Shortlisted</th>
// // //                   <th className="px-6 py-3">In Progress</th>
// // //                   <th className="px-6 py-3">Status</th>
// // //                   <th className="px-6 py-3">Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody className="divide-y divide-gray-200">
// // //                 {jobs.length === 0 ? (
// // //                   <tr>
// // //                     <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
// // //                       <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// // //                       <p className="text-lg font-medium">No job positions found</p>
// // //                       <p className="mt-1">Start a new recruitment pipeline to begin</p>
// // //                     </td>
// // //                   </tr>
// // //                 ) : (
// // //                   jobs.map((job: any) => {
// // //                     const jobCandidates = candidates.filter((c: { job_id: any }) => c?.job_id === job.id);
// // //                     const shortlisted = jobCandidates.filter((c: { status: string }) => c?.status === "Shortlisted").length;
// // //                     const inProgress = jobCandidates.filter(
// // //                       (c: { exam_link_sent: any; interview_scheduled: any }) => c?.exam_link_sent || c?.interview_scheduled
// // //                     ).length;

// // //                     return (
// // //                       <tr key={job.id} className="hover:bg-gray-50">
// // //                         <td className="px-6 py-4">
// // //                           <div className="text-sm font-medium text-gray-900">{job.title}</div>
// // //                         </td>
// // //                         <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
// // //                         <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
// // //                         <td className="px-6 py-4">
// // //                           <span className="text-sm font-medium text-gray-900">
// // //                             {jobCandidates.length}
// // //                           </span>
// // //                         </td>
// // //                         <td className="px-6 py-4">
// // //                           <span className="text-sm font-medium text-green-600">{shortlisted}</span>
// // //                         </td>
// // //                         <td className="px-6 py-4">
// // //                           <span className="text-sm font-medium text-blue-600">{inProgress}</span>
// // //                         </td>
// // //                         <td className="px-6 py-4">
// // //                           <span className="inline-flex px-2 py-1 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
// // //                             Active
// // //                           </span>
// // //                         </td>
// // //                         <td className="px-6 py-4 text-sm">
// // //                           <div className="flex space-x-2">
// // //                             <button
// // //                               onClick={() => router.push(`/candidates?job_id=${job.id}`)}
// // //                               className="text-blue-600 hover:text-blue-900 font-medium"
// // //                             >
// // //                               View
// // //                             </button>
// // //                             <button
// // //                               onClick={() => setSelectedPipelineJob(job)}
// // //                               className="text-green-600 hover:text-green-900 font-medium"
// // //                             >
// // //                               Run Pipeline
// // //                             </button>
// // //                           </div>
// // //                         </td>
// // //                       </tr>
// // //                     );
// // //                   })
// // //                 )}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </div>

// // //         {/* Assessment metrics + Quick actions */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Assessment Metrics</h3>
// // //             <ResponsiveContainer width="100%" height={200}>
// // //               <BarChart data={assessmentMetrics}>
// // //                 <CartesianGrid strokeDasharray="3 3" />
// // //                 <XAxis dataKey="name" />
// // //                 <YAxis />
// // //                 <Tooltip />
// // //                 <Bar dataKey="value" fill="#8B5CF6" />
// // //               </BarChart>
// // //             </ResponsiveContainer>
// // //             <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
// // //               <div>
// // //                 <p className="text-gray-500">Completion Rate</p>
// // //                 <p className="text-xl font-semibold text-gray-500">{stats.assessmentCompletionRate}%</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-gray-500">Pass Rate</p>
// // //                 <p className="text-xl font-semibold text-gray-500">
// // //                   {candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length > 0
// // //                     ? (
// // //                         (candidates.filter((c: { exam_percentage: number }) => c?.exam_percentage >= 70).length /
// // //                           candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length) *
// // //                         100
// // //                       ).toFixed(1)
// // //                     : 0}
// // //                   %
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
// // //             <div className="space-y-3">
// // //               <button
// // //                 onClick={() => router.push("/assessments")}
// // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // //               >
// // //                 <span className="font-medium text-gray-700">Manage Assessments</span>
// // //                 <span className="text-sm text-gray-500">{stats.activeAssessments} pending</span>
// // //               </button>

// // //               <button
// // //                 onClick={() => router.push("/scheduler")}
// // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // //               >
// // //                 <span className="font-medium text-gray-700">Schedule Interviews</span>
// // //                 <span className="text-sm text-gray-500">{stats.activeInterviews} scheduled</span>
// // //               </button>

// // //               <button
// // //                 onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // //               >
// // //                 <span className="font-medium text-gray-700">Start New Recruitment</span>
// // //                 <span className="text-sm text-gray-500">Run pipeline</span>
// // //               </button>

// // //               <button
// // //                 onClick={() => router.push("/candidates")}
// // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // //               >
// // //                 <span className="font-medium text-gray-700">View All Candidates</span>
// // //                 <span className="text-sm text-gray-500">{candidates.length} total</span>
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //       {selectedPipelineJob && (
// // //         <PipelineRunner
// // //           job={selectedPipelineJob}
// // //           onPipelineStart={() =>
// // //             setPipelineStatus((p) => ({
// // //               ...p,
// // //               [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
// // //             }))
// // //           }
// // //           onPipelineComplete={() => {
// // //             fetchAll(true);
// // //             setPipelineStatus((p) => ({
// // //               ...p,
// // //               [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
// // //             }));
// // //           }}
// // //           onClose={() => setSelectedPipelineJob(null)}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";

// // import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// // import {
// //   RefreshCw, Users, Target, Clock, Bell, AlertCircle, CheckCircle, X,
// // } from "lucide-react";
// // import StatCard from "./subComponents/StatCard";
// // import PipelineRunner from "./subComponents/PipelineRunner";
// // import {
// //   ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis,
// //   BarChart, Bar, LineChart, Line, Legend, Cell,
// // } from "recharts";
// // import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// // // ─── Types ────────────────────────────────────────────────────────────────────

// // interface PipelineAlert {
// //   id: number;
// //   jobTitle: string;
// //   candidateCount: number;
// //   time: string;
// //   read: boolean;
// // }

// // // ─── Bell Dropdown Component ──────────────────────────────────────────────────

// // const BellAlertDropdown: React.FC<{
// //   alerts: PipelineAlert[];
// //   onClearAll: () => void;
// //   onClose: () => void;
// // }> = ({ alerts, onClearAll, onClose }) => (
// //   <div
// //     className="absolute right-0 top-12 z-50 w-80 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden"
// //     style={{ animation: "fadeSlideDown 0.18s ease" }}
// //   >
// //     <style>{`
// //       @keyframes fadeSlideDown {
// //         from { opacity: 0; transform: translateY(-8px); }
// //         to   { opacity: 1; transform: translateY(0); }
// //       }
// //     `}</style>

// //     {/* Header */}
// //     <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
// //       <span className="text-sm font-semibold text-gray-800">Pipeline Alerts</span>
// //       <div className="flex items-center gap-3">
// //         {alerts.length > 0 && (
// //           <button
// //             onClick={onClearAll}
// //             className="text-xs text-blue-600 hover:text-blue-800 font-medium"
// //           >
// //             Clear all
// //           </button>
// //         )}
// //         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
// //           <X className="w-4 h-4" />
// //         </button>
// //       </div>
// //     </div>

// //     {/* Alert list */}
// //     <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
// //       {alerts.length === 0 ? (
// //         <div className="px-4 py-8 text-center">
// //           <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
// //           <p className="text-sm text-gray-400">No alerts yet.</p>
// //           <p className="text-xs text-gray-400 mt-1">Run a pipeline to see results here.</p>
// //         </div>
// //       ) : (
// //         alerts.map((alert) => (
// //           <div
// //             key={alert.id}
// //             className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
// //           >
// //             {/* Green check icon */}
// //             <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
// //               <CheckCircle className="w-4 h-4 text-green-600" />
// //             </div>

// //             {/* Content */}
// //             <div className="flex-1 min-w-0">
// //               <p className="text-sm font-medium text-gray-900">Pipeline completed</p>
// //               <p className="text-xs text-blue-600 font-medium mt-0.5 truncate">
// //                 {alert.jobTitle}
// //               </p>
// //               <p className="text-xs text-gray-500 mt-0.5">
// //                 <span className="font-semibold text-gray-700">{alert.candidateCount}</span>{" "}
// //                 candidates processed
// //               </p>
// //               <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
// //             </div>

// //             {/* Unread dot */}
// //             {!alert.read && (
// //               <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
// //             )}
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   </div>
// // );

// // // ─── Main Dashboard ───────────────────────────────────────────────────────────

// // const Dashboard: React.FC = () => {
// //   const router   = useRouter();
// //   const dispatch = useAppDispatch();
// //   const { jobs, candidates, recruitmentData, loading } = useAppSelector(
// //     (state) => state.dashboard
// //   );

// //   const [refreshing, setRefreshing]                   = useState(false);
// //   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
// //   const [selectedTimeRange, setSelectedTimeRange]     = useState<"week" | "month" | "quarter" | "year">("month");
// //   const [notifications, setNotifications]             = useState<any[]>([]);
// //   const [pipelineStatus, setPipelineStatus]           = useState<Record<string, any>>({});
// //   const [lastFetchTime, setLastFetchTime]             = useState<Date | null>(null);

// //   // ── Bell alert state ────────────────────────────────────────────────────────
// //   const [pipelineAlerts, setPipelineAlerts] = useState<PipelineAlert[]>([]);
// //   const [bellOpen, setBellOpen]             = useState(false);
// //   const alertIdRef                          = useRef(0);
// //   const bellRef                             = useRef<HTMLDivElement>(null);

// //   const unreadCount = pipelineAlerts.filter((a) => !a.read).length;

// //   // Close dropdown on outside click
// //   useEffect(() => {
// //     const handler = (e: MouseEvent) => {
// //       if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
// //         setBellOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handler);
// //     return () => document.removeEventListener("mousedown", handler);
// //   }, []);

// //   const addPipelineAlert = useCallback((jobTitle: string, candidateCount: number) => {
// //     const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
// //     setPipelineAlerts((prev) => [
// //       { id: ++alertIdRef.current, jobTitle, candidateCount, time, read: false },
// //       ...prev,
// //     ]);
// //   }, []);

// //   const clearAllAlerts = useCallback(() => {
// //     setPipelineAlerts([]);
// //     setBellOpen(false);
// //   }, []);

// //   const openBell = useCallback(() => {
// //     setBellOpen((o) => !o);
// //     // mark all read when opened
// //     setPipelineAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
// //   }, []);

// //   // ── Data fetching ───────────────────────────────────────────────────────────
// //   const fetchAll = useCallback(
// //     async (force = false) => {
// //       if (force) setRefreshing(true);
// //       try {
// //         await dispatch(dashboardRefreshAll()).unwrap();
// //         setLastFetchTime(new Date());
// //       } finally {
// //         setRefreshing(false);
// //       }
// //     },
// //     [dispatch]
// //   );

// //   useEffect(() => {
// //     fetchAll();
// //     const id = setInterval(() => fetchAll(true), 120000);
// //     return () => clearInterval(id);
// //   }, [fetchAll, selectedTimeRange]);

// //   // ── Stats ───────────────────────────────────────────────────────────────────
// //   const stats = useMemo(() => {
// //     const total              = candidates.length;
// //     const shortlisted        = candidates.filter((c: any) => c?.status === "Shortlisted").length;
// //     const interviews         = candidates.filter((c: any) => c?.interview_scheduled).length;
// //     const assessmentsSent    = candidates.filter((c: any) => c?.exam_link_sent).length;
// //     const assessmentsCompleted = candidates.filter((c: any) => c?.exam_completed).length;
// //     const hires              = candidates.filter((c: any) => c?.final_status === "Hired").length;
// //     const pendingAssessments = candidates.filter(
// //       (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// //     ).length;
// //     const now = new Date();
// //     const pendingInterviews = candidates.filter((c: any) => {
// //       if (!c?.interview_date) return false;
// //       return c?.interview_scheduled && new Date(c.interview_date) > now;
// //     }).length;
// //     const timeToHire = (() => {
// //       const hired = candidates.filter((c: any) => c?.final_status === "Hired" && c?.processed_date);
// //       if (!hired.length) return 0;
// //       const total = hired.reduce((acc: number, c: any) => {
// //         const days = Math.floor((Date.now() - new Date(c.processed_date).getTime()) / 86400000);
// //         return acc + Math.max(days, 0);
// //       }, 0);
// //       return Math.round(total / hired.length);
// //     })();
// //     return {
// //       totalApplications: total,
// //       activeInterviews: interviews,
// //       timeToHire,
// //       activeAssessments: pendingAssessments,
// //       shortlistRate: total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
// //       assessmentCompletionRate:
// //         assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
// //       totalHires: hires,
// //       pendingActions: pendingAssessments + pendingInterviews,
// //     };
// //   }, [candidates]);

// //   // ── Notification banners ────────────────────────────────────────────────────
// //   useEffect(() => {
// //     const outs: any[] = [];
// //     const pendingAssessments = candidates.filter(
// //       (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// //     );
// //     if (pendingAssessments.length) {
// //       outs.push({
// //         id: 1, type: "warning",
// //         message: `${pendingAssessments.length} candidates have pending assessments`,
// //         action: "View Candidates", route: "/candidates",
// //       });
// //     }
// //     const upcomingToday = candidates.filter((c: any) => {
// //       if (!c?.interview_date) return false;
// //       const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / 3600000;
// //       return diffHrs > 0 && diffHrs < 24;
// //     });
// //     if (upcomingToday.length) {
// //       outs.push({
// //         id: 2, type: "info",
// //         message: `${upcomingToday.length} interviews scheduled for today`,
// //         action: "View Schedule", route: "/scheduler",
// //       });
// //     }
// //     setNotifications(outs);
// //   }, [candidates]);

// //   const pipelineStages = useMemo(() => [
// //     { name: "Applied",     value: candidates.length, color: "#3B82F6" },
// //     { name: "Screened",    value: candidates.filter((c: any) => c?.ats_score > 0).length, color: "#10B981" },
// //     { name: "Shortlisted", value: candidates.filter((c: any) => c?.status === "Shortlisted").length, color: "#F59E0B" },
// //     { name: "Assessment",  value: candidates.filter((c: any) => c?.exam_completed).length, color: "#8B5CF6" },
// //     { name: "Interview",   value: candidates.filter((c: any) => c?.interview_scheduled).length, color: "#EF4444" },
// //     { name: "Hired",       value: candidates.filter((c: any) => c?.final_status === "Hired").length, color: "#059669" },
// //   ], [candidates]);

// //   const assessmentMetrics = useMemo(() => [
// //     { name: "Sent",      value: candidates.filter((c: any) => c?.exam_link_sent).length },
// //     { name: "Started",   value: candidates.filter((c: any) => c?.exam_started).length },
// //     { name: "Completed", value: candidates.filter((c: any) => c?.exam_completed).length },
// //     { name: "Passed",    value: candidates.filter((c: any) => c?.exam_percentage >= 70).length },
// //   ], [candidates]);

// //   const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

// //   if (loading && !lastFetchTime) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
// //           <p className="mt-4 text-gray-600">Loading dashboard...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen p-6 bg-white">

// //       {/* ── Top bar ── */}
// //       <div className="flex items-center justify-between mb-6">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
// //           <div className="flex items-center mt-1 space-x-4">
// //             <p className="text-gray-500 text-sm">
// //               Welcome back! Here&apos;s your recruitment overview
// //             </p>
// //             {lastFetchTime && (
// //               <span className="text-xs text-gray-500">
// //                 Last updated: {lastFetchTime.toLocaleTimeString()}
// //               </span>
// //             )}
// //           </div>
// //         </div>

// //         <div className="flex items-center space-x-3">
// //           {/* Refresh */}
// //           <button
// //             onClick={handleRefresh}
// //             disabled={refreshing}
// //             className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-gray-500"
// //             title="Refresh Data"
// //           >
// //             <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
// //           </button>

// //           {/* Time range */}
// //           <select
// //             value={selectedTimeRange}
// //             onChange={(e) => setSelectedTimeRange(e.target.value as any)}
// //             className="border rounded-lg px-4 py-2 text-sm text-gray-500"
// //           >
// //             <option value="week">This Week</option>
// //             <option value="month">This Month</option>
// //             <option value="quarter">This Quarter</option>
// //             <option value="year">This Year</option>
// //           </select>

// //           {/* ── Bell icon ── */}
// //           <div className="relative" ref={bellRef}>
// //             <button
// //               onClick={openBell}
// //               className="relative p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors"
// //               title="Pipeline Alerts"
// //             >
// //               <Bell className="w-5 h-5" />
// //               {unreadCount > 0 && (
// //                 <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
// //                   {unreadCount > 9 ? "9+" : unreadCount}
// //                 </span>
// //               )}
// //             </button>

// //             {bellOpen && (
// //               <BellAlertDropdown
// //                 alerts={pipelineAlerts}
// //                 onClearAll={clearAllAlerts}
// //                 onClose={() => setBellOpen(false)}
// //               />
// //             )}
// //           </div>

// //           {/* New Pipeline */}
// //           <button
// //             onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// //             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-sm"
// //           >
// //             New Pipeline
// //           </button>
// //         </div>
// //       </div>

// //       {/* ── Notification banners ── */}
// //       {notifications.length > 0 && (
// //         <div className="mb-6 space-y-2">
// //           {notifications.map((n) => (
// //             <div
// //               key={n.id}
// //               className={`p-4 rounded-lg border flex items-center justify-between ${
// //                 n.type === "warning"
// //                   ? "bg-yellow-50 border-yellow-200"
// //                   : "bg-blue-50 border-blue-200"
// //               }`}
// //             >
// //               <div className="flex items-center">
// //                 <AlertCircle
// //                   className={`w-5 h-5 mr-3 ${
// //                     n.type === "warning" ? "text-yellow-600" : "text-blue-600"
// //                   }`}
// //                 />
// //                 <span className={n.type === "warning" ? "text-yellow-800" : "text-blue-800"}>
// //                   {n.message}
// //                 </span>
// //               </div>
// //               <button
// //                 onClick={() => router.push(n.route)}
// //                 className={`px-3 py-1 rounded text-sm font-medium ${
// //                   n.type === "warning"
// //                     ? "bg-yellow-600 text-white hover:bg-yellow-700"
// //                     : "bg-blue-600 text-white hover:bg-blue-700"
// //                 }`}
// //               >
// //                 {n.action}
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* ── Stats ── */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //         <StatCard title="Total Applications" value={stats.totalApplications} change={12.5}  icon={Users}  color="bg-blue-600"   subtitle="All time applications"  loading={loading} />
// //         <StatCard title="Shortlist Rate"     value={`${stats.shortlistRate}%`} change={5.2} icon={Target} color="bg-green-600"  subtitle="Candidates shortlisted" loading={loading} />
// //         <StatCard title="Time-to-Hire"       value={`${stats.timeToHire}d`}   change={-8.3} icon={Clock}  color="bg-yellow-600" subtitle="Average days to hire"   loading={loading} />
// //         <StatCard title="Pending Actions"    value={stats.pendingActions}                   icon={Bell}   color="bg-purple-600" subtitle="Requires attention"      loading={loading} />
// //       </div>

// //       {/* ── Charts ── */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
// //         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// //           <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Pipeline</h3>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <BarChart data={pipelineStages}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="name" />
// //               <YAxis />
// //               <Tooltip />
// //               <Bar dataKey="value" fill="#3B82F6">
// //                 {pipelineStages.map((e, i) => <Cell key={i} fill={e.color} />)}
// //               </Bar>
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>
// //         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// //           <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Activity</h3>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <LineChart data={recruitmentData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="date" />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
// //               <Line type="monotone" dataKey="interviews"   stroke="#10B981" strokeWidth={2} />
// //               <Line type="monotone" dataKey="hires"        stroke="#EF4444" strokeWidth={2} />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>

// //       {/* ── Jobs table ── */}
// //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
// //         <div className="p-6 border-b border-gray-200 flex items-center justify-between">
// //           <h3 className="text-lg font-semibold text-gray-700">Active Job Positions</h3>
// //           <button
// //             onClick={() => router.push("/candidates")}
// //             className="text-blue-600 hover:text-blue-700 text-sm font-medium"
// //           >
// //             View All Candidates →
// //           </button>
// //         </div>
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead>
// //               <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
// //                 <th className="px-6 py-3">Position</th>
// //                 <th className="px-6 py-3">Department</th>
// //                 <th className="px-6 py-3">Location</th>
// //                 <th className="px-6 py-3">Applications</th>
// //                 <th className="px-6 py-3">Shortlisted</th>
// //                 <th className="px-6 py-3">In Progress</th>
// //                 <th className="px-6 py-3">Status</th>
// //                 <th className="px-6 py-3">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {jobs.length === 0 ? (
// //                 <tr>
// //                   <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
// //                     <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// //                     <p className="text-lg font-medium">No job positions found</p>
// //                     <p className="mt-1">Start a new recruitment pipeline to begin</p>
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 jobs.map((job: any) => {
// //                   const jobCandidates = candidates.filter((c: any) => c?.job_id === job.id);
// //                   const shortlisted   = jobCandidates.filter((c: any) => c?.status === "Shortlisted").length;
// //                   const inProgress    = jobCandidates.filter(
// //                     (c: any) => c?.exam_link_sent || c?.interview_scheduled
// //                   ).length;
// //                   return (
// //                     <tr key={job.id} className="hover:bg-gray-50">
// //                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
// //                       <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
// //                       <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
// //                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{jobCandidates.length}</td>
// //                       <td className="px-6 py-4 text-sm font-medium text-green-600">{shortlisted}</td>
// //                       <td className="px-6 py-4 text-sm font-medium text-blue-600">{inProgress}</td>
// //                       <td className="px-6 py-4">
// //                         <span className="inline-flex px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
// //                           Active
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4 text-sm">
// //                         <div className="flex space-x-2">
// //                           <button
// //                             onClick={() => router.push(`/candidates?job_id=${job.id}`)}
// //                             className="text-blue-600 hover:text-blue-900 font-medium"
// //                           >
// //                             View
// //                           </button>
// //                           <button
// //                             onClick={() => setSelectedPipelineJob(job)}
// //                             className="text-green-600 hover:text-green-900 font-medium"
// //                           >
// //                             Run Pipeline
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* ── Assessment metrics + Quick actions ── */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// //           <h3 className="text-lg font-semibold mb-4 text-gray-700">Assessment Metrics</h3>
// //           <ResponsiveContainer width="100%" height={200}>
// //             <BarChart data={assessmentMetrics}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="name" />
// //               <YAxis />
// //               <Tooltip />
// //               <Bar dataKey="value" fill="#8B5CF6" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //           <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
// //             <div>
// //               <p className="text-gray-500">Completion Rate</p>
// //               <p className="text-xl font-semibold text-gray-700">{stats.assessmentCompletionRate}%</p>
// //             </div>
// //             <div>
// //               <p className="text-gray-500">Pass Rate</p>
// //               <p className="text-xl font-semibold text-gray-700">
// //                 {candidates.filter((c: any) => c?.exam_completed).length > 0
// //                   ? (
// //                       (candidates.filter((c: any) => c?.exam_percentage >= 70).length /
// //                         candidates.filter((c: any) => c?.exam_completed).length) * 100
// //                     ).toFixed(1)
// //                   : 0}%
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// //           <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
// //           <div className="space-y-3">
// //             <button
// //               onClick={() => router.push("/assessments")}
// //               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// //             >
// //               <span className="font-medium text-gray-700">Manage Assessments</span>
// //               <span className="text-sm text-gray-500">{stats.activeAssessments} pending</span>
// //             </button>
// //             <button
// //               onClick={() => router.push("/scheduler")}
// //               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// //             >
// //               <span className="font-medium text-gray-700">Schedule Interviews</span>
// //               <span className="text-sm text-gray-500">{stats.activeInterviews} scheduled</span>
// //             </button>
// //             <button
// //               onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// //               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// //             >
// //               <span className="font-medium text-gray-700">Start New Recruitment</span>
// //               <span className="text-sm text-gray-500">Run pipeline</span>
// //             </button>
// //             <button
// //               onClick={() => router.push("/candidates")}
// //               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// //             >
// //               <span className="font-medium text-gray-700">View All Candidates</span>
// //               <span className="text-sm text-gray-500">{candidates.length} total</span>
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ── Pipeline Runner Modal ── */}
// //       {selectedPipelineJob && (
// //         <PipelineRunner
// //           job={selectedPipelineJob}
// //           onPipelineStart={() =>
// //             setPipelineStatus((p) => ({
// //               ...p,
// //               [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
// //             }))
// //           }
// //           onPipelineComplete={() => {
// //             fetchAll(true).then(() => {
// //               const jobCandidates = candidates.filter(
// //                 (c: any) => String(c?.job_id) === String(selectedPipelineJob.id)
// //               );
// //               // ✅ Add bell alert with job title + candidate count
// //               addPipelineAlert(selectedPipelineJob.title, jobCandidates.length);
// //               setPipelineStatus((p) => ({
// //                 ...p,
// //                 [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
// //               }));
// //             });
// //           }}
// //           onClose={() => setSelectedPipelineJob(null)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// import {
//   RefreshCw,
//   Users,
//   Target,
//   Clock,
//   Bell,
//   AlertCircle,
//   CheckCircle,
//   X,
//   UserCheck,
//   UserX,
//   TrendingUp,
//   PlayCircle,
//   CalendarDays,
//   LayoutDashboard,
// } from "lucide-react";
// import StatCard        from "./subComponents/StatCard";
// import PipelineRunner  from "./subComponents/PipelineRunner";
// import RecruitmentJourney from "./subComponents/RecruitmentJourney";
// import {
//   ResponsiveContainer,
//   CartesianGrid,
//   Tooltip,
//   XAxis,
//   YAxis,
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   Legend,
//   Cell,
// } from "recharts";
// import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// // ── Design tokens ─────────────────────────────────────────────────────────────
// const T = {
//   accent:   "#2563EB",
//   accentL:  "#EFF6FF",
//   accentM:  "#BFDBFE",
//   green:    "#059669",
//   greenL:   "#ECFDF5",
//   amber:    "#D97706",
//   amberL:   "#FFFBEB",
//   red:      "#DC2626",
//   redL:     "#FEF2F2",
//   purple:   "#7C3AED",
//   purpleL:  "#F5F3FF",
//   t1:       "#0F172A",
//   t2:       "#64748B",
//   t3:       "#94A3B8",
//   border:   "rgba(0,0,0,0.08)",
//   borderMd: "rgba(0,0,0,0.14)",
//   bg:       "#F8FAFC",
//   surface:  "#ffffff",
//   r:        10,
//   rl:       14,
//   rxl:      18,
// } as const;

// // ── Types ─────────────────────────────────────────────────────────────────────
// interface PipelineAlert {
//   id: number;
//   jobTitle: string;
//   candidateCount: number;
//   shortlisted: number;
//   notShortlisted: number;
//   time: string;
//   read: boolean;
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Sub-component: PipelineResultToast
// // Stays on screen until HR clicks X — no auto-dismiss
// // ─────────────────────────────────────────────────────────────────────────────
// const PipelineResultToast: React.FC<{
//   toasts: PipelineAlert[];
//   onDismiss: (id: number) => void;
// }> = ({ toasts, onDismiss }) => {
//   if (!toasts.length) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: 24,
//         right: 24,
//         zIndex: 80,
//         display: "flex",
//         flexDirection: "column",
//         gap: 12,
//         maxWidth: 340,
//         width: "100%",
//       }}
//     >
//       <style>{`
//         @keyframes toastIn {
//           from { opacity:0; transform:translateX(40px) }
//           to   { opacity:1; transform:translateX(0) }
//         }
//       `}</style>

//       {toasts.map(toast => (
//         <div
//           key={toast.id}
//           style={{
//             background: T.surface,
//             borderRadius: 14,
//             boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
//             border: `0.5px solid ${T.borderMd}`,
//             overflow: "hidden",
//             animation: "toastIn 0.25s ease",
//           }}
//         >
//           {/* Green header */}
//           <div
//             style={{
//               background: "#059669",
//               padding: "10px 16px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <CheckCircle size={15} color="#fff" />
//               <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
//                 Pipeline Completed
//               </span>
//             </div>
//             <button
//               onClick={() => onDismiss(toast.id)}
//               style={{
//                 background: "none", border: "none", cursor: "pointer",
//                 color: "rgba(255,255,255,0.7)", display: "flex",
//                 padding: 2, transition: "color 0.12s",
//               }}
//               onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = "#fff")}
//               onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)")}
//             >
//               <X size={13} />
//             </button>
//           </div>

//           {/* Body */}
//           <div style={{ padding: "13px 15px" }}>
//             <p
//               style={{
//                 fontSize: 13, fontWeight: 600, color: T.t1,
//                 marginBottom: 10,
//                 whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
//               }}
//             >
//               {toast.jobTitle}
//             </p>

//             {/* Counts grid */}
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
//               {/* Shortlisted */}
//               <div
//                 style={{
//                   borderRadius: 9, padding: "10px 12px",
//                   background: T.greenL, border: "0.5px solid #BBF7D0",
//                   display: "flex", alignItems: "center", gap: 8,
//                 }}
//               >
//                 <UserCheck size={14} color={T.green} style={{ flexShrink: 0 }} />
//                 <div>
//                   <p style={{ fontSize: 10, fontWeight: 500, color: T.green }}>Shortlisted</p>
//                   <p style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: "#065F46" }}>
//                     {toast.shortlisted}
//                   </p>
//                 </div>
//               </div>

//               {/* Not shortlisted */}
//               <div
//                 style={{
//                   borderRadius: 9, padding: "10px 12px",
//                   background: T.redL, border: "0.5px solid #FECACA",
//                   display: "flex", alignItems: "center", gap: 8,
//                 }}
//               >
//                 <UserX size={14} color={T.red} style={{ flexShrink: 0 }} />
//                 <div>
//                   <p style={{ fontSize: 10, fontWeight: 500, color: T.red }}>Not Shortlisted</p>
//                   <p style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: "#991B1B" }}>
//                     {toast.notShortlisted}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div
//               style={{
//                 display: "flex", alignItems: "center", justifyContent: "space-between",
//                 paddingTop: 8, borderTop: `0.5px solid ${T.border}`,
//               }}
//             >
//               <span style={{ fontSize: 11, color: T.t2 }}>
//                 Total processed:{" "}
//                 <strong style={{ color: T.t1 }}>{toast.candidateCount}</strong>
//               </span>
//               <span style={{ fontSize: 10, color: T.t3 }}>{toast.time}</span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Sub-component: BellAlertDropdown
// // ─────────────────────────────────────────────────────────────────────────────
// const BellAlertDropdown: React.FC<{
//   alerts: PipelineAlert[];
//   onClearAll: () => void;
//   onClose: () => void;
// }> = ({ alerts, onClearAll, onClose }) => (
//   <div
//     style={{
//       position: "absolute", right: 0, top: 44,
//       width: 320,
//       background: T.surface,
//       border: `0.5px solid ${T.borderMd}`,
//       borderRadius: 14,
//       boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
//       overflow: "hidden",
//       zIndex: 60,
//       animation: "fadeDown 0.18s ease",
//     }}
//   >
//     <style>{`
//       @keyframes fadeDown {
//         from { opacity:0; transform:translateY(-8px) }
//         to   { opacity:1; transform:translateY(0) }
//       }
//     `}</style>

//     {/* Header */}
//     <div
//       style={{
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         padding: "12px 16px",
//         borderBottom: `0.5px solid ${T.border}`,
//       }}
//     >
//       <span style={{ fontSize: 13, fontWeight: 600, color: T.t1 }}>
//         Pipeline Alerts
//       </span>
//       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//         {alerts.length > 0 && (
//           <button
//             onClick={onClearAll}
//             style={{
//               fontSize: 12, color: T.accent, fontWeight: 500,
//               background: "none", border: "none", cursor: "pointer",
//             }}
//           >
//             Clear all
//           </button>
//         )}
//         <button
//           onClick={onClose}
//           style={{
//             background: "none", border: "none", cursor: "pointer",
//             color: T.t3, display: "flex",
//           }}
//         >
//           <X size={15} />
//         </button>
//       </div>
//     </div>

//     {/* Alert list */}
//     <div style={{ maxHeight: 288, overflowY: "auto" }}>
//       {alerts.length === 0 ? (
//         <div style={{ padding: "28px 16px", textAlign: "center" }}>
//           <Bell
//             size={30}
//             color={T.t3}
//             style={{ margin: "0 auto 8px", display: "block" }}
//           />
//           <p style={{ fontSize: 13, color: T.t2, fontWeight: 500 }}>No alerts yet</p>
//           <p style={{ fontSize: 11, color: T.t3, marginTop: 3 }}>
//             Run a pipeline to see results here.
//           </p>
//         </div>
//       ) : (
//         alerts.map(alert => (
//           <div
//             key={alert.id}
//             style={{
//               display: "flex", gap: 12,
//               padding: "12px 16px",
//               borderBottom: `0.5px solid ${T.border}`,
//               transition: "background 0.12s",
//             }}
//             onMouseEnter={e =>
//               ((e.currentTarget as HTMLDivElement).style.background = T.bg)
//             }
//             onMouseLeave={e =>
//               ((e.currentTarget as HTMLDivElement).style.background = T.surface)
//             }
//           >
//             <div
//               style={{
//                 width: 32, height: 32, borderRadius: "50%",
//                 background: T.greenL, border: "0.5px solid #BBF7D0",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 flexShrink: 0, marginTop: 1,
//               }}
//             >
//               <CheckCircle size={14} color={T.green} />
//             </div>
//             <div style={{ flex: 1 }}>
//               <p style={{ fontSize: 13, fontWeight: 600, color: T.t1, margin: 0 }}>
//                 Pipeline Completed
//               </p>
//               <p style={{ fontSize: 11, color: T.t2, marginTop: 2, lineHeight: 1.4 }}>
//                 {alert.jobTitle} &mdash; {alert.shortlisted} shortlisted,{" "}
//                 {alert.notShortlisted} not shortlisted ({alert.candidateCount} total)
//               </p>
//               <p style={{ fontSize: 10, color: T.t3, marginTop: 3 }}>{alert.time}</p>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   </div>
// );

// // ─────────────────────────────────────────────────────────────────────────────
// // Main Dashboard
// // ─────────────────────────────────────────────────────────────────────────────
// const Dashboard: React.FC = () => {
//   const router   = useRouter();
//   const dispatch = useAppDispatch();
//   const { jobs, candidates, recruitmentData, loading } = useAppSelector(
//     (state: any) => state.dashboard
//   );

//   const [refreshing, setRefreshing]               = useState(false);
//   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
//   const [selectedTimeRange, setSelectedTimeRange] = useState<"week" | "month" | "quarter" | "year">("month");
//   const [notifications, setNotifications]         = useState<any[]>([]);
//   const [pipelineStatus, setPipelineStatus]       = useState<Record<string, any>>({});
//   const [lastFetchTime, setLastFetchTime]         = useState<Date | null>(null);
//   const [bellOpen, setBellOpen]                   = useState(false);
//   const [pipelineAlerts, setPipelineAlerts]       = useState<PipelineAlert[]>([]);
//   const [resultToasts, setResultToasts]           = useState<PipelineAlert[]>([]);
//   const bellRef = useRef<HTMLDivElement>(null);

//   // ── Data fetch (auto-refresh every 2 min) ─────────────────────────────────
//   const fetchAll = useCallback(
//     async (force = false) => {
//       if (force) setRefreshing(true);
//       try {
//         await dispatch(dashboardRefreshAll()).unwrap();
//         setLastFetchTime(new Date());
//       } finally {
//         setRefreshing(false);
//       }
//     },
//     [dispatch]
//   );

//   useEffect(() => {
//     fetchAll();
//     const id = setInterval(() => fetchAll(true), 120_000);
//     return () => clearInterval(id);
//   }, [fetchAll, selectedTimeRange]);

//   // ── Stats (useMemo — mirrors original computation exactly) ─────────────────
//   const stats = useMemo(() => {
//     const total              = candidates.length;
//     const shortlisted        = candidates.filter((c: any) => c?.status === "Shortlisted").length;
//     const interviews         = candidates.filter((c: any) => c?.interview_scheduled).length;
//     const assessmentsSent    = candidates.filter((c: any) => c?.exam_link_sent).length;
//     const assessmentsCompleted = candidates.filter((c: any) => c?.exam_completed).length;
//     const hires              = candidates.filter((c: any) => c?.final_status === "Hired").length;
//     const pendingAssessments = candidates.filter(
//       (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
//     ).length;

//     const now = new Date();
//     const pendingInterviews = candidates.filter((c: any) => {
//       if (!c?.interview_date) return false;
//       return c?.interview_scheduled && new Date(c.interview_date) > now;
//     }).length;

//     const timeToHire = (() => {
//       const hired = candidates.filter(
//         (c: any) => c?.final_status === "Hired" && c?.processed_date
//       );
//       if (!hired.length) return 0;
//       const totalDays = hired.reduce((acc: number, c: any) => {
//         const start = new Date(c.processed_date).getTime();
//         const days  = Math.floor((Date.now() - start) / 86_400_000);
//         return acc + Math.max(days, 0);
//       }, 0);
//       return Math.round(totalDays / hired.length);
//     })();

//     return {
//       totalApplications:        total,
//       activeInterviews:         interviews,
//       timeToHire,
//       activeAssessments:        pendingAssessments,
//       shortlistRate:            total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
//       assessmentCompletionRate: assessmentsSent > 0
//         ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1)
//         : 0,
//       assessmentPassRate: assessmentsCompleted > 0
//         ? (
//             (candidates.filter((c: any) => c?.exam_percentage >= 70).length /
//               assessmentsCompleted) *
//             100
//           ).toFixed(1)
//         : 0,
//       totalHires:     hires,
//       pendingActions: pendingAssessments + pendingInterviews,
//     };
//   }, [candidates]);

//   // ── Current journey step (derived from live data) ──────────────────────────
//   const currentJourneyStep = useMemo(() => {
//     if (stats.totalHires > 0 || stats.activeInterviews > 0) return 4;
//     if (stats.activeAssessments > 0) return 3;
//     if (parseFloat(String(stats.shortlistRate)) > 0) return 2;
//     if (jobs.length > 0) return 1;
//     return 0;
//   }, [stats, jobs]);

//   // ── Pipeline stages for bar chart ─────────────────────────────────────────
//   const pipelineStages = useMemo(
//     () => [
//       { name: "Applied",     value: candidates.length,                                              color: "#3B82F6" },
//       { name: "Screened",    value: candidates.filter((c: any) => c?.ats_score > 0).length,         color: "#10B981" },
//       { name: "Shortlisted", value: candidates.filter((c: any) => c?.status === "Shortlisted").length, color: "#F59E0B" },
//       { name: "Assessment",  value: candidates.filter((c: any) => c?.exam_completed).length,        color: "#8B5CF6" },
//       { name: "Interview",   value: candidates.filter((c: any) => c?.interview_scheduled).length,   color: "#EF4444" },
//       { name: "Hired",       value: candidates.filter((c: any) => c?.final_status === "Hired").length, color: "#059669" },
//     ],
//     [candidates]
//   );

//   // ── Assessment bar chart data ──────────────────────────────────────────────
//   const assessmentMetrics = useMemo(
//     () => [
//       { name: "Sent",      value: candidates.filter((c: any) => c?.exam_link_sent).length },
//       { name: "Started",   value: candidates.filter((c: any) => c?.exam_started).length },
//       { name: "Completed", value: candidates.filter((c: any) => c?.exam_completed).length },
//       { name: "Passed",    value: candidates.filter((c: any) => c?.exam_percentage >= 70).length },
//     ],
//     [candidates]
//   );

//   // ── Notification banners (pending assessments / today's interviews) ────────
//   useEffect(() => {
//     const outs: any[] = [];
//     const pendingAssessments = candidates.filter(
//       (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
//     );
//     if (pendingAssessments.length) {
//       outs.push({
//         id: 1, type: "warning",
//         message: `${pendingAssessments.length} candidates have pending assessments`,
//         action: "View Candidates", route: "/candidates",
//       });
//     }
//     const upcomingToday = candidates.filter((c: any) => {
//       if (!c?.interview_date) return false;
//       const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / 3_600_000;
//       return diffHrs > 0 && diffHrs < 24;
//     });
//     if (upcomingToday.length) {
//       outs.push({
//         id: 2, type: "info",
//         message: `${upcomingToday.length} interviews scheduled for today`,
//         action: "View Schedule", route: "/scheduler",
//       });
//     }
//     setNotifications(outs);
//   }, [candidates]);

//   // ── Bell helpers ──────────────────────────────────────────────────────────
//   const unreadCount = pipelineAlerts.filter(a => !a.read).length;

//   const openBell = () => {
//     setBellOpen(prev => !prev);
//     setPipelineAlerts(prev => prev.map(a => ({ ...a, read: true })));
//   };

//   // Close bell on outside click
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (bellOpen && bellRef.current && !bellRef.current.contains(e.target as Node)) {
//         setBellOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [bellOpen]);

//   const addPipelineAlert = (jobTitle: string, shortlisted: number, notShortlisted: number) => {
//     const id   = Date.now();
//     const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     const alert: PipelineAlert = {
//       id, jobTitle,
//       candidateCount: shortlisted + notShortlisted,
//       shortlisted, notShortlisted,
//       time, read: false,
//     };
//     setPipelineAlerts(prev => [alert, ...prev]);
//     setResultToasts(prev => [alert, ...prev]);
//   };

//   const clearAllAlerts = () => setPipelineAlerts([]);
//   const dismissToast   = (id: number) =>
//     setResultToasts(prev => prev.filter(t => t.id !== id));

//   const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

//   // ── Loading splash ────────────────────────────────────────────────────────
//   if (loading && !lastFetchTime) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh", background: T.bg,
//           display: "flex", alignItems: "center", justifyContent: "center",
//         }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <div
//             style={{
//               width: 48, height: 48, borderRadius: "50%",
//               border: `3px solid ${T.accentM}`,
//               borderTopColor: T.accent,
//               animation: "spin 0.7s linear infinite",
//               margin: "0 auto 16px",
//             }}
//           />
//           <p style={{ color: T.t2, fontSize: 14 }}>Loading dashboard...</p>
//         </div>
//         <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
//       </div>
//     );
//   }

//   // ═══════════════════════════════════════════════════════════════════════════
//   // RENDER
//   // ═══════════════════════════════════════════════════════════════════════════
//   return (
//     <div style={{ background: T.bg, minHeight: "100vh" }}>

//       {/* ── Page body ──────────────────────────────────────────────────────── */}
//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px 64px" }}>

//         {/* ── Notification banners ── */}
//         {notifications.length > 0 && (
//           <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
//             {notifications.map(n => (
//               <div
//                 key={n.id}
//                 style={{
//                   display: "flex", alignItems: "center", justifyContent: "space-between",
//                   padding: "11px 16px", borderRadius: 10,
//                   border: `0.5px solid ${n.type === "warning" ? "#FCD34D" : T.accentM}`,
//                   background: n.type === "warning" ? T.amberL : T.accentL,
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex", alignItems: "center", gap: 10,
//                     fontSize: 13, fontWeight: 500,
//                     color: n.type === "warning" ? "#92400E" : "#1E40AF",
//                   }}
//                 >
//                   <AlertCircle size={15} />
//                   {n.message}
//                 </div>
//                 <button
//                   onClick={() => router.push(n.route)}
//                   style={{
//                     padding: "5px 12px", fontSize: 12, fontWeight: 500,
//                     border: "none", borderRadius: 8, cursor: "pointer",
//                     fontFamily: "inherit",
//                     background: n.type === "warning" ? T.amber : T.accent,
//                     color: "#fff",
//                   }}
//                 >
//                   {n.action}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ── RecruitmentJourney ── */}
//         <RecruitmentJourney
//           currentStep={currentJourneyStep}
//           onStepClick={(route) => router.push(route)}
//         />

//         {/* ── Page title + controls ── */}
//         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
//           <div>
//             <h1
//               style={{
//                 fontSize: 22, fontWeight: 600, color: T.t1,
//                 letterSpacing: "-0.5px", margin: 0,
//               }}
//             >
//               Recruitment Dashboard
//             </h1>
//             <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 3 }}>
//               <p style={{ fontSize: 13, color: T.t2, margin: 0 }}>
//                 Welcome back! Here&apos;s your recruitment overview
//               </p>
//               {lastFetchTime && (
//                 <span style={{ fontSize: 11, color: T.t3 }}>
//                   Last updated: {lastFetchTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Right controls */}
//           <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
//             {/* Refresh */}
//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               title="Refresh data"
//               style={{
//                 width: 36, height: 36, padding: 0,
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 borderRadius: 8, border: `0.5px solid ${T.borderMd}`,
//                 background: T.surface, cursor: "pointer",
//                 transition: "background 0.14s",
//                 opacity: refreshing ? 0.5 : 1,
//               }}
//             >
//               <RefreshCw
//                 size={15}
//                 color={T.t2}
//                 style={{ animation: refreshing ? "spin 0.7s linear infinite" : "none" }}
//               />
//             </button>

//             {/* Time range */}
//             <select
//               value={selectedTimeRange}
//               onChange={e => setSelectedTimeRange(e.target.value as any)}
//               style={{
//                 fontSize: 13, fontFamily: "inherit", color: T.t2,
//                 background: T.surface, border: `0.5px solid ${T.borderMd}`,
//                 borderRadius: 8, padding: "7px 12px", outline: "none", cursor: "pointer",
//               }}
//             >
//               <option value="week">This Week</option>
//               <option value="month">This Month</option>
//               <option value="quarter">This Quarter</option>
//               <option value="year">This Year</option>
//             </select>

//             {/* Bell */}
//             <div style={{ position: "relative" }} ref={bellRef}>
//               <button
//                 onClick={openBell}
//                 title="Pipeline Alerts"
//                 style={{
//                   width: 36, height: 36,
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   border: `0.5px solid ${T.borderMd}`, borderRadius: 8,
//                   background: T.surface, cursor: "pointer", position: "relative",
//                   transition: "background 0.14s",
//                 }}
//               >
//                 <Bell size={16} color={T.t2} />
//                 {unreadCount > 0 && (
//                   <span
//                     style={{
//                       position: "absolute", top: -5, right: -5,
//                       minWidth: 16, height: 16, padding: "0 3px",
//                       background: T.red, color: "#fff",
//                       fontSize: 10, fontWeight: 700, borderRadius: 20,
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       border: `2px solid ${T.surface}`,
//                     }}
//                   >
//                     {unreadCount > 9 ? "9+" : unreadCount}
//                   </span>
//                 )}
//               </button>

//               {bellOpen && (
//                 <BellAlertDropdown
//                   alerts={pipelineAlerts}
//                   onClearAll={clearAllAlerts}
//                   onClose={() => setBellOpen(false)}
//                 />
//               )}
//             </div>

//             {/* New Pipeline */}
//             <button
//               onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
//               style={{
//                 padding: "8px 16px", fontSize: 13, fontWeight: 500,
//                 background: T.accent, color: "#fff", border: "none",
//                 borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
//                 transition: "background 0.15s",
//               }}
//               onMouseEnter={e =>
//                 ((e.currentTarget as HTMLButtonElement).style.background = "#1D4ED8")
//               }
//               onMouseLeave={e =>
//                 ((e.currentTarget as HTMLButtonElement).style.background = T.accent)
//               }
//             >
//               New Pipeline
//             </button>
//           </div>
//         </div>

//         {/* ── StatCards (4) ── */}
//         <div
//           style={{
//             display: "grid", gridTemplateColumns: "repeat(4,1fr)",
//             gap: 14, marginBottom: 26,
//           }}
//         >
//           <StatCard
//             title="Total Applications"
//             value={stats.totalApplications}
//             change={12.5}
//             icon={Users}
//             accentColor="#2563EB"
//             iconBg="#2563EB"
//             subtitle="All time applications"
//             loading={loading}
//           />
//           <StatCard
//             title="Shortlist Rate"
//             value={`${stats.shortlistRate}%`}
//             change={5.2}
//             icon={Target}
//             accentColor="#059669"
//             iconBg="#059669"
//             subtitle="Candidates shortlisted"
//             loading={loading}
//           />
//           <StatCard
//             title="Time-to-Hire"
//             value={`${stats.timeToHire}d`}
//             change={-8.3}
//             icon={Clock}
//             accentColor="#D97706"
//             iconBg="#D97706"
//             subtitle="Average days to hire"
//             loading={loading}
//           />
//           <StatCard
//             title="Pending Actions"
//             value={stats.pendingActions}
//             icon={Bell}
//             accentColor="#7C3AED"
//             iconBg="#7C3AED"
//             subtitle="Requires attention"
//             loading={loading}
//           />
//         </div>

//         {/* ── Charts row ── */}
//         <div
//           style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 22 }}
//         >
//           {/* Pipeline bar chart */}
//           <div
//             style={{
//               background: T.surface, border: `0.5px solid ${T.border}`,
//               borderRadius: T.rl, overflow: "hidden",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex", alignItems: "center", justifyContent: "space-between",
//                 padding: "15px 20px", borderBottom: `0.5px solid ${T.border}`,
//               }}
//             >
//               <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
//                 Recruitment Pipeline
//               </span>
//             </div>
//             <div style={{ padding: "14px 18px 18px" }}>
//               <ResponsiveContainer width="100%" height={240}>
//                 <BarChart data={pipelineStages}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
//                   <XAxis dataKey="name" tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
//                   <YAxis tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
//                   <Tooltip
//                     contentStyle={{
//                       background: T.surface, border: `0.5px solid ${T.borderMd}`,
//                       borderRadius: 10, fontSize: 12,
//                     }}
//                   />
//                   <Bar dataKey="value" radius={[6, 6, 0, 0]}>
//                     {pipelineStages.map((entry, i) => (
//                       <Cell key={i} fill={entry.color} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Activity line chart */}
//           <div
//             style={{
//               background: T.surface, border: `0.5px solid ${T.border}`,
//               borderRadius: T.rl, overflow: "hidden",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex", alignItems: "center", justifyContent: "space-between",
//                 padding: "15px 20px", borderBottom: `0.5px solid ${T.border}`,
//               }}
//             >
//               <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
//                 Recruitment Activity
//               </span>
//             </div>
//             <div style={{ padding: "14px 18px 18px" }}>
//               <ResponsiveContainer width="100%" height={240}>
//                 <LineChart data={recruitmentData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
//                   <XAxis dataKey="date" tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
//                   <YAxis tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
//                   <Tooltip
//                     contentStyle={{
//                       background: T.surface, border: `0.5px solid ${T.borderMd}`,
//                       borderRadius: 10, fontSize: 12,
//                     }}
//                   />
//                   <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: T.t2 }} />
//                   <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
//                   <Line type="monotone" dataKey="interviews"   stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
//                   <Line type="monotone" dataKey="hires"        stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* ── Pipeline stage strip ── */}
//         <div
//           style={{
//             display: "flex", alignItems: "center", justifyContent: "space-between",
//             marginBottom: 11,
//           }}
//         >
//           <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>Pipeline Stages</span>
//           <span style={{ fontSize: 12, color: T.t2 }}>Live candidate counts by stage</span>
//         </div>
//         <div style={{ display: "flex", marginBottom: 8 }}>
//           {pipelineStages.map((stage, i) => {
//             const maxV = Math.max(...pipelineStages.map(s => s.value), 1);
//             const pct  = Math.round((stage.value / maxV) * 100);
//             const isFirst = i === 0;
//             const isLast  = i === pipelineStages.length - 1;
//             return (
//               <div
//                 key={stage.name}
//                 style={{
//                   flex: 1,
//                   padding: "13px 15px",
//                   background: T.surface,
//                   border: `0.5px solid ${T.border}`,
//                   borderLeft: i > 0 ? "none" : `0.5px solid ${T.border}`,
//                   borderRadius: isFirst
//                     ? "10px 0 0 10px"
//                     : isLast
//                     ? "0 10px 10px 0"
//                     : 0,
//                   position: "relative",
//                   cursor: "pointer",
//                   transition: "background 0.14s",
//                 }}
//                 onMouseEnter={e =>
//                   ((e.currentTarget as HTMLDivElement).style.background = "#F8FAFC")
//                 }
//                 onMouseLeave={e =>
//                   ((e.currentTarget as HTMLDivElement).style.background = T.surface)
//                 }
//                 onClick={() => router.push(`/candidates?stage=${stage.name.toLowerCase()}`)}
//               >
//                 <div style={{ fontSize: 11, fontWeight: 600, color: T.t2, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>
//                   {stage.name}
//                 </div>
//                 <div style={{ fontSize: 26, fontWeight: 600, color: T.t1, letterSpacing: "-1px", lineHeight: 1 }}>
//                   {stage.value}
//                 </div>
//                 <div style={{ height: 3, background: "#E2E8F0", marginTop: 9, borderRadius: 2, overflow: "hidden" }}>
//                   <div style={{ height: "100%", width: `${pct}%`, background: stage.color, borderRadius: 2, transition: "width 0.6s ease" }} />
//                 </div>
//                 {!isLast && (
//                   <div
//                     style={{
//                       position: "absolute", right: -9, top: "50%",
//                       transform: "translateY(-50%)",
//                       width: 17, height: 30,
//                       background: T.surface, border: `0.5px solid ${T.border}`,
//                       borderRadius: "0 6px 6px 0",
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       zIndex: 2, fontSize: 10, color: T.t3, pointerEvents: "none",
//                     }}
//                   >
//                     ›
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//         <p style={{ fontSize: 11, color: T.t3, textAlign: "center", marginBottom: 22 }}>
//           Click any stage to filter candidates
//         </p>

//         {/* ── Active Jobs table ── */}
//         <div
//           style={{
//             background: T.surface,
//             border: `0.5px solid ${T.border}`,
//             borderRadius: T.rl,
//             overflow: "hidden",
//             marginBottom: 20,
//           }}
//         >
//           <div
//             style={{
//               display: "flex", alignItems: "center", justifyContent: "space-between",
//               padding: "15px 20px", borderBottom: `0.5px solid ${T.border}`,
//             }}
//           >
//             <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
//               Active Job Positions
//               {jobs.length > 0 && (
//                 <span
//                   style={{
//                     fontSize: 12, fontWeight: 500,
//                     background: T.accentL, color: T.accent,
//                     padding: "2px 9px", borderRadius: 20, marginLeft: 8,
//                   }}
//                 >
//                   {jobs.length} active
//                 </span>
//               )}
//             </span>
//             <button
//               onClick={() => router.push("/candidates")}
//               style={{
//                 fontSize: 13, fontWeight: 500, color: T.accent,
//                 background: "none", border: "none", cursor: "pointer",
//                 fontFamily: "inherit",
//               }}
//             >
//               View All Candidates →
//             </button>
//           </div>

//           <div style={{ overflowX: "auto" }}>
//             <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
//               <thead>
//                 <tr style={{ borderBottom: `0.5px solid ${T.borderMd}` }}>
//                   {["Position", "Department", "Location", "Applications", "Shortlisted", "In Progress", "Status", "Actions"].map(h => (
//                     <th
//                       key={h}
//                       style={{
//                         padding: "10px 16px", textAlign: "left",
//                         fontSize: 11, fontWeight: 600, color: T.t3,
//                         textTransform: "uppercase", letterSpacing: "0.5px",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {jobs.length === 0 ? (
//                   <tr>
//                     <td colSpan={8}>
//                       <div
//                         style={{
//                           display: "flex", flexDirection: "column",
//                           alignItems: "center", justifyContent: "center",
//                           padding: "56px 28px", textAlign: "center", gap: 8,
//                         }}
//                       >
//                         <div
//                           style={{
//                             width: 56, height: 56, borderRadius: 16,
//                             background: T.accentL,
//                             display: "flex", alignItems: "center", justifyContent: "center",
//                             marginBottom: 6,
//                           }}
//                         >
//                           <TrendingUp size={26} color={T.accent} strokeWidth={1.5} />
//                         </div>
//                         <p style={{ fontSize: 15, fontWeight: 600, color: T.t1, margin: 0 }}>
//                           No job positions found
//                         </p>
//                         <p style={{ fontSize: 13, color: T.t2, margin: 0 }}>
//                           Start a new recruitment pipeline to begin
//                         </p>
//                         <button
//                           onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
//                           style={{
//                             marginTop: 4, padding: "8px 16px",
//                             background: T.accent, color: "#fff",
//                             border: "none", borderRadius: 8,
//                             fontSize: 13, fontWeight: 500, cursor: "pointer",
//                           }}
//                         >
//                           Start New Pipeline →
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   jobs.map((job: any) => {
//                     const jobCandidates = candidates.filter((c: any) => c?.job_id === job.id);
//                     const shortlisted   = jobCandidates.filter((c: any) => c?.status === "Shortlisted").length;
//                     const inProgress    = jobCandidates.filter(
//                       (c: any) => c?.exam_link_sent || c?.interview_scheduled
//                     ).length;
//                     return (
//                       <tr
//                         key={job.id}
//                         style={{
//                           borderBottom: `0.5px solid ${T.border}`,
//                           transition: "background 0.12s",
//                         }}
//                         onMouseEnter={e =>
//                           ((e.currentTarget as HTMLTableRowElement).style.background = "#F8FAFC")
//                         }
//                         onMouseLeave={e =>
//                           ((e.currentTarget as HTMLTableRowElement).style.background = T.surface)
//                         }
//                       >
//                         <td style={{ padding: "13px 16px", fontWeight: 500, color: T.t1 }}>
//                           {job.title}
//                         </td>
//                         <td style={{ padding: "13px 16px", color: T.t2 }}>{job.department}</td>
//                         <td style={{ padding: "13px 16px", color: T.t2 }}>{job.location}</td>
//                         <td style={{ padding: "13px 16px", fontWeight: 500, color: T.t1, textAlign: "center" }}>
//                           {jobCandidates.length}
//                         </td>
//                         <td
//                           style={{ padding: "13px 16px", fontWeight: 600, color: T.accent, textAlign: "center", cursor: "pointer" }}
//                           onClick={() => router.push(`/candidates?job_id=${job.id}&stage=shortlisted`)}
//                         >
//                           {shortlisted}
//                         </td>
//                         <td
//                           style={{ padding: "13px 16px", fontWeight: 600, color: T.accent, textAlign: "center", cursor: "pointer" }}
//                           onClick={() => router.push(`/candidates?job_id=${job.id}&stage=in_progress`)}
//                         >
//                           {inProgress}
//                         </td>
//                         <td style={{ padding: "13px 16px" }}>
//                           <span
//                             style={{
//                               display: "inline-flex",
//                               fontSize: 11, fontWeight: 600, padding: "3px 10px",
//                               borderRadius: 20,
//                               background: "#ECFDF5", color: "#059669",
//                             }}
//                           >
//                             Active
//                           </span>
//                         </td>
//                         <td style={{ padding: "13px 16px", whiteSpace: "nowrap" }}>
//                           <button
//                             onClick={() => router.push(`/candidates?job_id=${job.id}`)}
//                             style={{
//                               fontSize: 12, fontWeight: 500, color: T.accent,
//                               background: "none", border: "none", cursor: "pointer",
//                               fontFamily: "inherit", padding: 0, marginRight: 12,
//                               transition: "opacity 0.12s",
//                             }}
//                           >
//                             View
//                           </button>
//                           <button
//                             onClick={() => setSelectedPipelineJob(job)}
//                             style={{
//                               fontSize: 12, fontWeight: 500, color: T.green,
//                               background: "none", border: "none", cursor: "pointer",
//                               fontFamily: "inherit", padding: 0,
//                               transition: "opacity 0.12s",
//                             }}
//                           >
//                             Run Pipeline
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* ── Bottom grid: Assessment metrics + Quick Actions ── */}
//         <div
//           style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 20 }}
//         >
//           {/* Assessment metrics */}
//           <div
//             style={{
//               background: T.surface, border: `0.5px solid ${T.border}`,
//               borderRadius: T.rl, overflow: "hidden",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex", alignItems: "center", justifyContent: "space-between",
//                 padding: "15px 20px", borderBottom: `0.5px solid ${T.border}`,
//               }}
//             >
//               <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
//                 Assessment Metrics
//               </span>
//               <button
//                 onClick={() => router.push("/assessments")}
//                 style={{
//                   fontSize: 13, fontWeight: 500, color: T.accent,
//                   background: "none", border: "none", cursor: "pointer",
//                   fontFamily: "inherit",
//                 }}
//               >
//                 View details →
//               </button>
//             </div>
//             <div style={{ padding: "15px 18px" }}>
//               {/* Completion + Pass rate boxes */}
//               <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
//                 {[
//                   { label: "Completion Rate", value: `${stats.assessmentCompletionRate}%`, color: T.accent },
//                   { label: "Pass Rate",        value: `${stats.assessmentPassRate}%`,       color: T.green },
//                 ].map(m => (
//                   <div
//                     key={m.label}
//                     style={{
//                       flex: 1, padding: 12, textAlign: "center",
//                       background: T.bg, borderRadius: 9,
//                       border: `0.5px solid ${T.border}`,
//                     }}
//                   >
//                     <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.5px", color: m.color }}>
//                       {m.value}
//                     </div>
//                     <div style={{ fontSize: 11, color: T.t2, marginTop: 2, fontWeight: 500 }}>
//                       {m.label}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Assessment bar chart */}
//               <ResponsiveContainer width="100%" height={160}>
//                 <BarChart data={assessmentMetrics} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
//                   <XAxis dataKey="name" tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
//                   <YAxis tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
//                   <Tooltip
//                     contentStyle={{
//                       background: T.surface, border: `0.5px solid ${T.borderMd}`,
//                       borderRadius: 10, fontSize: 12,
//                     }}
//                   />
//                   <Bar dataKey="value" fill="#8B5CF6" radius={[5, 5, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>

//               {/* Insight */}
//               <div
//                 style={{
//                   marginTop: 12, fontSize: 12, color: T.t2, lineHeight: 1.55,
//                   padding: "10px 14px",
//                   background: T.accentL,
//                   borderRadius: 8,
//                   borderLeft: `3px solid ${T.accent}`,
//                 }}
//               >
//                 {parseFloat(String(stats.assessmentCompletionRate)) > 0
//                     ? `${stats.assessmentCompletionRate}% completion · ${stats.assessmentPassRate}% pass rate`
//                     : "Assessment data will appear once candidates complete tests."}
//               </div>
//             </div>
//           </div>

//           {/* Quick actions */}
//           <div
//             style={{
//               background: T.surface, border: `0.5px solid ${T.border}`,
//               borderRadius: T.rl, overflow: "hidden",
//             }}
//           >
//             <div
//               style={{ padding: "15px 20px", borderBottom: `0.5px solid ${T.border}` }}
//             >
//               <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
//                 Quick Actions
//               </span>
//             </div>
//             <div style={{ padding: 18 }}>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//                 {[
//                   {
//                     label: "New Pipeline",
//                     sub: "Run pipeline",
//                     color: T.accentL,
//                     stroke: T.accent,
//                     icon: <PlayCircle size={15} />,
//                     onClick: () => jobs.length > 0 && setSelectedPipelineJob(jobs[0]),
//                   },
//                   {
//                     label: "Manage Assessments",
//                     sub: `${stats.activeAssessments} pending`,
//                     color: "#ECFDF5",
//                     stroke: T.green,
//                     icon: <Target size={15} />,
//                     onClick: () => router.push("/assessments"),
//                   },
//                   {
//                     label: "Schedule Interviews",
//                     sub: `${stats.activeInterviews} scheduled`,
//                     color: "#FFFBEB",
//                     stroke: T.amber,
//                     icon: <CalendarDays size={15} />,
//                     onClick: () => router.push("/scheduler"),
//                   },
//                   {
//                     label: "View All Candidates",
//                     sub: `${candidates.length} total`,
//                     color: "#F5F3FF",
//                     stroke: T.purple,
//                     icon: <Users size={15} />,
//                     onClick: () => router.push("/candidates"),
//                   },
//                 ].map(qa => (
//                   <button
//                     key={qa.label}
//                     onClick={qa.onClick}
//                     style={{
//                       background: T.bg,
//                       border: `0.5px solid ${T.border}`,
//                       borderRadius: 10, padding: 14,
//                       cursor: "pointer", transition: "all 0.14s",
//                       textAlign: "left", fontFamily: "inherit", width: "100%",
//                     }}
//                     onMouseEnter={e => {
//                       const el = e.currentTarget as HTMLButtonElement;
//                       el.style.borderColor = T.borderMd;
//                       el.style.background  = "#EEF2F7";
//                     }}
//                     onMouseLeave={e => {
//                       const el = e.currentTarget as HTMLButtonElement;
//                       el.style.borderColor = T.border;
//                       el.style.background  = T.bg;
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: 32, height: 32, borderRadius: 8,
//                         background: qa.color,
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         marginBottom: 8, color: qa.stroke,
//                       }}
//                     >
//                       {qa.icon}
//                     </div>
//                     <div style={{ fontSize: 13, fontWeight: 600, color: T.t1, marginBottom: 2 }}>
//                       {qa.label}
//                     </div>
//                     <div style={{ fontSize: 11, color: T.t2 }}>{qa.sub}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── PipelineRunner modal ── */}
//       {selectedPipelineJob && (
//         <PipelineRunner
//           job={selectedPipelineJob}
//           onPipelineStart={() =>
//             setPipelineStatus(p => ({
//               ...p,
//               [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
//             }))
//           }
//           onPipelineComplete={() => {
//             fetchAll(true).then(() => {
//               const jobCandidates = candidates.filter(
//                 (c: any) => String(c?.job_id) === String(selectedPipelineJob.id)
//               );
//               const shortlisted = jobCandidates.filter(
//                 (c: any) => c?.status === "Shortlisted"
//               ).length;
//               addPipelineAlert(
//                 selectedPipelineJob.title,
//                 shortlisted,
//                 jobCandidates.length - shortlisted
//               );
//               setPipelineStatus(p => ({
//                 ...p,
//                 [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
//               }));
//             });
//           }}
//           onClose={() => setSelectedPipelineJob(null)}
//         />
//       )}

//       {/* ── Persistent result toasts ── */}
//       <PipelineResultToast toasts={resultToasts} onDismiss={dismissToast} />

//       <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
//     </div>
//   );
// };

// export default Dashboard;
// // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // "use client";

// // // import React, { useCallback, useEffect, useMemo, useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";

// // // import { RefreshCw, Users, Target, Clock, Bell, AlertCircle} from "lucide-react";

// // // import StatCard from "./subComponents/StatCard";
// // // import PipelineRunner from "./subComponents/PipelineRunner";

// // // import {
// // //   ResponsiveContainer,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   XAxis,
// // //   YAxis,
// // //   BarChart,
// // //   Bar,
// // //   LineChart,
// // //   Line,
// // //   Legend,
// // //   Cell,
// // // } from "recharts";

// // // import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// // // const Dashboard: React.FC = () => {
// // //   const router = useRouter();
// // //   const dispatch = useAppDispatch();
// // //   const { jobs, candidates, recruitmentData, loading } = useAppSelector((state) => state.dashboard);  
// // //   const [refreshing, setRefreshing] = useState(false);
// // //   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
// // //   const [selectedTimeRange, setSelectedTimeRange] =useState<"week" | "month" | "quarter" | "year">("month");
// // //   const [notifications, setNotifications] = useState<any[]>([]);
// // //   const [pipelineStatus, setPipelineStatus] = useState<Record<string, any>>({});
// // //   const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

// // //   const fetchAll = useCallback(
// // //     async (force = false) => {
// // //       if (force) setRefreshing(true);
// // //       try {
// // //         await dispatch(dashboardRefreshAll()).unwrap();
// // //         setLastFetchTime(new Date());
// // //       } finally {
// // //         setRefreshing(false);
// // //       }
// // //     },
// // //     [dispatch]
// // //   );

// // //   useEffect(() => {
// // //     fetchAll();
// // //     const id = setInterval(() => fetchAll(true), 120000);
// // //     return () => clearInterval(id);
// // //   }, [fetchAll, selectedTimeRange]);

// // //   const stats = useMemo(() => {
// // //     const total = candidates.length;
// // //     const shortlisted = candidates.filter((c: { status: string }) => c?.status === "Shortlisted").length;
// // //     const interviews = candidates.filter((c: { interview_scheduled: any }) => c?.interview_scheduled).length;
// // //     const assessmentsSent = candidates.filter((c: { exam_link_sent: any }) => c?.exam_link_sent).length;
// // //     const assessmentsCompleted = candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length;
// // //     const hires = candidates.filter((c: { final_status: string }) => c?.final_status === "Hired").length;
// // //     const pendingAssessments = candidates.filter(
// // //       (c) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// // //     ).length;

// // //     const now = new Date();
// // //     const pendingInterviews = candidates.filter((c: { interview_date: string | number | Date; interview_scheduled: any }) => {
// // //       if (!c?.interview_date) return false;
// // //       return c?.interview_scheduled && new Date(c.interview_date) > now;
// // //     }).length;

// // //     const timeToHire = (() => {
// // //       const hired = candidates.filter((c: { final_status: string; processed_date: any }) => c?.final_status === "Hired" && c?.processed_date);
// // //       if (!hired.length) return 0;
// // //       const totalDays = hired.reduce((acc: number, c: { processed_date: string | number | Date }) => {
// // //         const start = new Date(c.processed_date).getTime();
// // //         const days = Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24));
// // //         return acc + Math.max(days, 0);
// // //       }, 0);
// // //       return Math.round(totalDays / hired.length);
// // //     })();

// // //     return {
// // //       totalApplications: total,
// // //       activeInterviews: interviews,
// // //       timeToHire,
// // //       activeAssessments: pendingAssessments,
// // //       shortlistRate: total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
// // //       assessmentCompletionRate:
// // //         assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
// // //       totalHires: hires,
// // //       pendingActions: pendingAssessments + pendingInterviews,
// // //     };
// // //   }, [candidates]);

// // //   useEffect(() => {
// // //     const outs: any[] = [];
// // //     const pendingAssessments = candidates.filter(
// // //       (c: { exam_link_sent: any; exam_completed: any; link_expired: any }) =>
// // //         c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// // //     );
// // //     if (pendingAssessments.length) {
// // //       outs.push({
// // //         id: 1,
// // //         type: "warning",
// // //         message: `${pendingAssessments.length} candidates have pending assessments`,
// // //         action: "View Candidates",
// // //         route: "/candidates",
// // //       });
// // //     }
// // //     const upcomingToday = candidates.filter((c: { interview_date: string | number | Date }) => {
// // //       if (!c?.interview_date) return false;
// // //       const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / (1000 * 60 * 60);
// // //       return diffHrs > 0 && diffHrs < 24;
// // //     });
// // //     if (upcomingToday.length) {
// // //       outs.push({
// // //         id: 2,
// // //         type: "info",
// // //         message: `${upcomingToday.length} interviews scheduled for today`,
// // //         action: "View Schedule",
// // //         route: "/scheduler",
// // //       });
// // //     }
// // //     setNotifications(outs);
// // //   }, [candidates]);

// // //   const pipelineStages = useMemo(
// // //     () => [
// // //       { name: "Applied", value: candidates.length, color: "#3B82F6" },
// // //       { name: "Screened", value: candidates.filter((c: { ats_score: number }) => c?.ats_score > 0).length, color: "#10B981" },
// // //       { name: "Shortlisted", value: candidates.filter((c: { status: string }) => c?.status === "Shortlisted").length, color: "#F59E0B" },
// // //       { name: "Assessment", value: candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length, color: "#8B5CF6" },
// // //       { name: "Interview", value: candidates.filter((c: { interview_scheduled: any }) => c?.interview_scheduled).length, color: "#EF4444" },
// // //       { name: "Hired", value: candidates.filter((c: { final_status: string }) => c?.final_status === "Hired").length, color: "#059669" },
// // //     ],
// // //     [candidates]
// // //   );

// // //   const assessmentMetrics = useMemo(
// // //     () => [
// // //       { name: "Sent", value: candidates.filter((c: { exam_link_sent: any }) => c?.exam_link_sent).length },
// // //       { name: "Started", value: candidates.filter((c: { exam_started: any }) => c?.exam_started).length },
// // //       { name: "Completed", value: candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length },
// // //       { name: "Passed", value: candidates.filter((c: { exam_percentage: number }) => c?.exam_percentage >= 70).length },
// // //     ],
// // //     [candidates]
// // //   );

// // //   const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

// // //   if (loading && !lastFetchTime) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
// // //           <p className="mt-4 text-gray-600">Loading dashboard...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen p-6 bg-white">
// // //         <div className="flex items-center justify-between mb-6">
// // //           <div>
// // //             <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
// // //             <div className="flex items-center mt-1 space-x-4">
// // //               <p className="text-gray-600">Welcome back! Here&apos;s your recruitment overview</p>
// // //               {lastFetchTime && (
// // //                 <span className="text-xs text-gray-500">
// // //                   Last updated: {lastFetchTime.toLocaleTimeString()}
// // //                 </span>
// // //               )}
// // //             </div>
// // //           </div>
// // //           <div className="flex items-center space-x-3">
// // //             <button
// // //               onClick={handleRefresh}
// // //               disabled={refreshing}
// // //               className="p-2 border border-gray-500 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-gray-500"
// // //               title="Refresh Data"
// // //             >
// // //               <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
// // //             </button>
// // //             <select
// // //               value={selectedTimeRange}
// // //               onChange={(e) => setSelectedTimeRange(e.target.value as any)}
// // //               className="border rounded-lg px-4 py-2 text-sm text-gray-500"
// // //             >
// // //               <option value="week">This Week</option>
// // //               <option value="month">This Month</option>
// // //               <option value="quarter">This Quarter</option>
// // //               <option value="year">This Year</option>
// // //             </select>
// // //             <button
// // //               onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// // //               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// // //             >
// // //               New Pipeline
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Notifications */}
// // //         {notifications.length > 0 && (
// // //           <div className="mb-6 space-y-2">
// // //             {notifications.map((n) => (
// // //               <div
// // //                 key={n.id}
// // //                 className={`p-4 rounded-lg border flex items-center justify-between ${
// // //                   n.type === "warning" ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200"
// // //                 }`}
// // //               >
// // //                 <div className="flex items-center">
// // //                   <AlertCircle
// // //                     className={`w-5 h-5 mr-3 ${n.type === "warning" ? "text-yellow-600" : "text-blue-600"}`}
// // //                   />
// // //                   <span className={n.type === "warning" ? "text-yellow-800" : "text-blue-800"}>
// // //                     {n.message}
// // //                   </span>
// // //                 </div>
// // //                 <button
// // //                   onClick={() => router.push(n.route)}
// // //                   className={`px-3 py-1 rounded text-sm font-medium ${
// // //                     n.type === "warning"
// // //                       ? "bg-yellow-600 text-white hover:bg-yellow-700"
// // //                       : "bg-blue-600 text-white hover:bg-blue-700"
// // //                   }`}
// // //                 >
// // //                   {n.action}
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}

// // //         {/* Stats */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //           <StatCard
// // //             title="Total Applications"
// // //             value={stats.totalApplications}
// // //             change={12.5}
// // //             icon={Users}
// // //             color="bg-blue-600"
// // //             subtitle="All time applications"
// // //             loading={loading}
// // //           />
// // //           <StatCard
// // //             title="Shortlist Rate"
// // //             value={`${stats.shortlistRate}%`}
// // //             change={5.2}
// // //             icon={Target}
// // //             color="bg-green-600"
// // //             subtitle="Candidates shortlisted"
// // //             loading={loading}
// // //           />
// // //           <StatCard
// // //             title="Time-to-Hire"
// // //             value={`${stats.timeToHire}d`}
// // //             change={-8.3}
// // //             icon={Clock}
// // //             color="bg-yellow-600"
// // //             subtitle="Average days to hire"
// // //             loading={loading}
// // //           />
// // //           <StatCard
// // //             title="Pending Actions"
// // //             value={stats.pendingActions}
// // //             icon={Bell}
// // //             color="bg-purple-600"
// // //             subtitle="Requires attention"
// // //             loading={loading}
// // //           />
// // //         </div>

// // //         {/* Charts */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
// // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Pipeline</h3>
// // //             <ResponsiveContainer width="100%" height={300}>
// // //               <BarChart data={pipelineStages}>
// // //                 <CartesianGrid strokeDasharray="3 3" />
// // //                 <XAxis dataKey="name" />
// // //                 <YAxis />
// // //                 <Tooltip />
// // //                 <Bar dataKey="value" fill="#3B82F6">
// // //                   {pipelineStages.map((e, i) => (
// // //                     <Cell key={i} fill={e.color} />
// // //                   ))}
// // //                 </Bar>
// // //               </BarChart>
// // //             </ResponsiveContainer>
// // //           </div>

// // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Activity</h3>
// // //             <ResponsiveContainer width="100%" height={300}>
// // //               <LineChart data={chartData}>
// // //                 <CartesianGrid strokeDasharray="3 3" />
// // //                 <XAxis dataKey="date" /> {/* change to "month" if your API provides that */}
// // //                 <YAxis />
// // //                 <Tooltip />
// // //                 <Legend />
// // //                 <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
// // //                 <Line type="monotone" dataKey="interviews" stroke="#10B981" strokeWidth={2} />
// // //                 <Line type="monotone" dataKey="hires" stroke="#EF4444" strokeWidth={2} />
// // //               </LineChart>
// // //             </ResponsiveContainer>
// // //           </div>
// // //         </div>

// // //         {/* Jobs table */}
// // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
// // //           <div className="p-6 border-b border-gray-200 flex items-center justify-between">
// // //             <h3 className="text-lg font-semibold text-gray-700">Active Job Positions</h3>
// // //             <button
// // //               onClick={() => router.push("/candidates")}
// // //               className="text-blue-600 hover:text-blue-700 text-sm font-medium"
// // //             >
// // //               View All Candidates →
// // //             </button>
// // //           </div>
// // //           <div className="overflow-x-auto">
// // //             <table className="w-full">
// // //               <thead>
// // //                 <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
// // //                   <th className="px-6 py-3">Position</th>
// // //                   <th className="px-6 py-3">Department</th>
// // //                   <th className="px-6 py-3">Location</th>
// // //                   <th className="px-6 py-3">Applications</th>
// // //                   <th className="px-6 py-3">Shortlisted</th>
// // //                   <th className="px-6 py-3">In Progress</th>
// // //                   <th className="px-6 py-3">Status</th>
// // //                   <th className="px-6 py-3">Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody className="divide-y divide-gray-200">
// // //                 {jobs.length === 0 ? (
// // //                   <tr>
// // //                     <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
// // //                       <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// // //                       <p className="text-lg font-medium">No job positions found</p>
// // //                       <p className="mt-1">Start a new recruitment pipeline to begin</p>
// // //                     </td>
// // //                   </tr>
// // //                 ) : (
// // //                   jobs.map((job: any) => {
// // //                     const jobCandidates = candidates.filter((c: { job_id: any }) => c?.job_id === job.id);
// // //                     const shortlisted = jobCandidates.filter((c: { status: string }) => c?.status === "Shortlisted").length;
// // //                     const inProgress = jobCandidates.filter(
// // //                       (c: { exam_link_sent: any; interview_scheduled: any }) => c?.exam_link_sent || c?.interview_scheduled
// // //                     ).length;

// // //                     return (
// // //                       <tr key={job.id} className="hover:bg-gray-50">
// // //                         <td className="px-6 py-4">
// // //                           <div className="text-sm font-medium text-gray-900">{job.title}</div>
// // //                         </td>
// // //                         <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
// // //                         <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
// // //                         <td className="px-6 py-4">
// // //                           <span className="text-sm font-medium text-gray-900">
// // //                             {jobCandidates.length}
// // //                           </span>
// // //                         </td>
// // //                         <td className="px-6 py-4">
// // //                           <span className="text-sm font-medium text-green-600">{shortlisted}</span>
// // //                         </td>
// // //                         <td className="px-6 py-4">
// // //                           <span className="text-sm font-medium text-blue-600">{inProgress}</span>
// // //                         </td>
// // //                         <td className="px-6 py-4">
// // //                           <span className="inline-flex px-2 py-1 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
// // //                             Active
// // //                           </span>
// // //                         </td>
// // //                         <td className="px-6 py-4 text-sm">
// // //                           <div className="flex space-x-2">
// // //                             <button
// // //                               onClick={() => router.push(`/candidates?job_id=${job.id}`)}
// // //                               className="text-blue-600 hover:text-blue-900 font-medium"
// // //                             >
// // //                               View
// // //                             </button>
// // //                             <button
// // //                               onClick={() => setSelectedPipelineJob(job)}
// // //                               className="text-green-600 hover:text-green-900 font-medium"
// // //                             >
// // //                               Run Pipeline
// // //                             </button>
// // //                           </div>
// // //                         </td>
// // //                       </tr>
// // //                     );
// // //                   })
// // //                 )}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </div>

// // //         {/* Assessment metrics + Quick actions */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Assessment Metrics</h3>
// // //             <ResponsiveContainer width="100%" height={200}>
// // //               <BarChart data={assessmentMetrics}>
// // //                 <CartesianGrid strokeDasharray="3 3" />
// // //                 <XAxis dataKey="name" />
// // //                 <YAxis />
// // //                 <Tooltip />
// // //                 <Bar dataKey="value" fill="#8B5CF6" />
// // //               </BarChart>
// // //             </ResponsiveContainer>
// // //             <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
// // //               <div>
// // //                 <p className="text-gray-500">Completion Rate</p>
// // //                 <p className="text-xl font-semibold text-gray-500">{stats.assessmentCompletionRate}%</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-gray-500">Pass Rate</p>
// // //                 <p className="text-xl font-semibold text-gray-500">
// // //                   {candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length > 0
// // //                     ? (
// // //                         (candidates.filter((c: { exam_percentage: number }) => c?.exam_percentage >= 70).length /
// // //                           candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length) *
// // //                         100
// // //                       ).toFixed(1)
// // //                     : 0}
// // //                   %
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// // //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
// // //             <div className="space-y-3">
// // //               <button
// // //                 onClick={() => router.push("/assessments")}
// // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // //               >
// // //                 <span className="font-medium text-gray-700">Manage Assessments</span>
// // //                 <span className="text-sm text-gray-500">{stats.activeAssessments} pending</span>
// // //               </button>

// // //               <button
// // //                 onClick={() => router.push("/scheduler")}
// // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // //               >
// // //                 <span className="font-medium text-gray-700">Schedule Interviews</span>
// // //                 <span className="text-sm text-gray-500">{stats.activeInterviews} scheduled</span>
// // //               </button>

// // //               <button
// // //                 onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // //               >
// // //                 <span className="font-medium text-gray-700">Start New Recruitment</span>
// // //                 <span className="text-sm text-gray-500">Run pipeline</span>
// // //               </button>

// // //               <button
// // //                 onClick={() => router.push("/candidates")}
// // //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// // //               >
// // //                 <span className="font-medium text-gray-700">View All Candidates</span>
// // //                 <span className="text-sm text-gray-500">{candidates.length} total</span>
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //       {selectedPipelineJob && (
// // //         <PipelineRunner
// // //           job={selectedPipelineJob}
// // //           onPipelineStart={() =>
// // //             setPipelineStatus((p) => ({
// // //               ...p,
// // //               [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
// // //             }))
// // //           }
// // //           onPipelineComplete={() => {
// // //             fetchAll(true);
// // //             setPipelineStatus((p) => ({
// // //               ...p,
// // //               [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
// // //             }));
// // //           }}
// // //           onClose={() => setSelectedPipelineJob(null)}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";

// // import React, { useCallback, useEffect, useMemo, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";

// // import { RefreshCw, Users, Target, Clock, Bell, AlertCircle} from "lucide-react";

// // import StatCard from "./subComponents/StatCard";
// // import PipelineRunner from "./subComponents/PipelineRunner";
// // import RecruitmentJourney from "./subComponents/RecruitmentJourney";

// // import {
// //   ResponsiveContainer,
// //   CartesianGrid,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// //   BarChart,
// //   Bar,
// //   LineChart,
// //   Line,
// //   Legend,
// //   Cell,
// // } from "recharts";

// // import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// // const Dashboard: React.FC = () => {
// //   const router = useRouter();
// //   const dispatch = useAppDispatch();
// //   const { jobs, candidates, recruitmentData, loading } = useAppSelector((state) => state.dashboard);  
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
// //   const [selectedTimeRange, setSelectedTimeRange] =useState<"week" | "month" | "quarter" | "year">("month");
// //   const [notifications, setNotifications] = useState<any[]>([]);
// //   const [pipelineStatus, setPipelineStatus] = useState<Record<string, any>>({});
// //   const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

// //   const fetchAll = useCallback(
// //     async (force = false) => {
// //       if (force) setRefreshing(true);
// //       try {
// //         await dispatch(dashboardRefreshAll()).unwrap();
// //         setLastFetchTime(new Date());
// //       } finally {
// //         setRefreshing(false);
// //       }
// //     },
// //     [dispatch]
// //   );

// //   useEffect(() => {
// //     fetchAll();
// //     const id = setInterval(() => fetchAll(true), 120000);
// //     return () => clearInterval(id);
// //   }, [fetchAll, selectedTimeRange]);

// //   const stats = useMemo(() => {
// //     const total = candidates.length;
// //     const shortlisted = candidates.filter((c: { status: string }) => c?.status === "Shortlisted").length;
// //     const interviews = candidates.filter((c: { interview_scheduled: any }) => c?.interview_scheduled).length;
// //     const assessmentsSent = candidates.filter((c: { exam_link_sent: any }) => c?.exam_link_sent).length;
// //     const assessmentsCompleted = candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length;
// //     const hires = candidates.filter((c: { final_status: string }) => c?.final_status === "Hired").length;
// //     const pendingAssessments = candidates.filter(
// //       (c) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// //     ).length;

// //     const now = new Date();
// //     const pendingInterviews = candidates.filter((c: { interview_date: string | number | Date; interview_scheduled: any }) => {
// //       if (!c?.interview_date) return false;
// //       return c?.interview_scheduled && new Date(c.interview_date) > now;
// //     }).length;

// //     const timeToHire = (() => {
// //       const hired = candidates.filter((c: { final_status: string; processed_date: any }) => c?.final_status === "Hired" && c?.processed_date);
// //       if (!hired.length) return 0;
// //       const totalDays = hired.reduce((acc: number, c: { processed_date: string | number | Date }) => {
// //         const start = new Date(c.processed_date).getTime();
// //         const days = Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24));
// //         return acc + Math.max(days, 0);
// //       }, 0);
// //       return Math.round(totalDays / hired.length);
// //     })();

// //     return {
// //       totalApplications: total,
// //       activeInterviews: interviews,
// //       timeToHire,
// //       activeAssessments: pendingAssessments,
// //       shortlistRate: total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
// //       assessmentCompletionRate:
// //         assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
// //       totalHires: hires,
// //       pendingActions: pendingAssessments + pendingInterviews,
// //     };
// //   }, [candidates]);

// //   useEffect(() => {
// //     const outs: any[] = [];
// //     const pendingAssessments = candidates.filter(
// //       (c: { exam_link_sent: any; exam_completed: any; link_expired: any }) =>
// //         c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// //     );
// //     if (pendingAssessments.length) {
// //       outs.push({
// //         id: 1,
// //         type: "warning",
// //         message: `${pendingAssessments.length} candidates have pending assessments`,
// //         action: "View Candidates",
// //         route: "/candidates",
// //       });
// //     }
// //     const upcomingToday = candidates.filter((c: { interview_date: string | number | Date }) => {
// //       if (!c?.interview_date) return false;
// //       const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / (1000 * 60 * 60);
// //       return diffHrs > 0 && diffHrs < 24;
// //     });
// //     if (upcomingToday.length) {
// //       outs.push({
// //         id: 2,
// //         type: "info",
// //         message: `${upcomingToday.length} interviews scheduled for today`,
// //         action: "View Schedule",
// //         route: "/scheduler",
// //       });
// //     }
// //     setNotifications(outs);
// //   }, [candidates]);

// //   const pipelineStages = useMemo(
// //     () => [
// //       { name: "Applied", value: candidates.length, color: "#3B82F6" },
// //       { name: "Screened", value: candidates.filter((c: { ats_score: number }) => c?.ats_score > 0).length, color: "#10B981" },
// //       { name: "Shortlisted", value: candidates.filter((c: { status: string }) => c?.status === "Shortlisted").length, color: "#F59E0B" },
// //       { name: "Assessment", value: candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length, color: "#8B5CF6" },
// //       { name: "Interview", value: candidates.filter((c: { interview_scheduled: any }) => c?.interview_scheduled).length, color: "#EF4444" },
// //       { name: "Hired", value: candidates.filter((c: { final_status: string }) => c?.final_status === "Hired").length, color: "#059669" },
// //     ],
// //     [candidates]
// //   );

// //   const assessmentMetrics = useMemo(
// //     () => [
// //       { name: "Sent", value: candidates.filter((c: { exam_link_sent: any }) => c?.exam_link_sent).length },
// //       { name: "Started", value: candidates.filter((c: { exam_started: any }) => c?.exam_started).length },
// //       { name: "Completed", value: candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length },
// //       { name: "Passed", value: candidates.filter((c: { exam_percentage: number }) => c?.exam_percentage >= 70).length },
// //     ],
// //     [candidates]
// //   );

// //   const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

// //   if (loading && !lastFetchTime) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
// //           <p className="mt-4 text-gray-600">Loading dashboard...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen p-6 bg-white">
// //         <div className="flex items-center justify-between mb-6">
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
// //             <div className="flex items-center mt-1 space-x-4">
// //               <p className="text-gray-600">Welcome back! Here&apos;s your recruitment overview</p>
// //               {lastFetchTime && (
// //                 <span className="text-xs text-gray-500">
// //                   Last updated: {lastFetchTime.toLocaleTimeString()}
// //                 </span>
// //               )}
// //             </div>
// //           </div>
// //           <div className="flex items-center space-x-3">
// //             <button
// //               onClick={handleRefresh}
// //               disabled={refreshing}
// //               className="p-2 border border-gray-500 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-gray-500"
// //               title="Refresh Data"
// //             >
// //               <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
// //             </button>
// //             <select
// //               value={selectedTimeRange}
// //               onChange={(e) => setSelectedTimeRange(e.target.value as any)}
// //               className="border rounded-lg px-4 py-2 text-sm text-gray-500"
// //             >
// //               <option value="week">This Week</option>
// //               <option value="month">This Month</option>
// //               <option value="quarter">This Quarter</option>
// //               <option value="year">This Year</option>
// //             </select>
// //             <button
// //               onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// //               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// //             >
// //               New Pipeline
// //             </button>
// //           </div>
// //         </div>

// //         {/* Notifications */}
// //         {notifications.length > 0 && (
// //           <div className="mb-6 space-y-2">
// //             {notifications.map((n) => (
// //               <div
// //                 key={n.id}
// //                 className={`p-4 rounded-lg border flex items-center justify-between ${
// //                   n.type === "warning" ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200"
// //                 }`}
// //               >
// //                 <div className="flex items-center">
// //                   <AlertCircle
// //                     className={`w-5 h-5 mr-3 ${n.type === "warning" ? "text-yellow-600" : "text-blue-600"}`}
// //                   />
// //                   <span className={n.type === "warning" ? "text-yellow-800" : "text-blue-800"}>
// //                     {n.message}
// //                   </span>
// //                 </div>
// //                 <button
// //                   onClick={() => router.push(n.route)}
// //                   className={`px-3 py-1 rounded text-sm font-medium ${
// //                     n.type === "warning"
// //                       ? "bg-yellow-600 text-white hover:bg-yellow-700"
// //                       : "bg-blue-600 text-white hover:bg-blue-700"
// //                   }`}
// //                 >
// //                   {n.action}
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* ── Recruitment Journey Stepper ── */}
// //         <RecruitmentJourney
// //           currentStep={(() => {
// //             // Auto-derive active step from live candidate/job data
// //             if (candidates.filter((c: any) => c?.interview_scheduled).length > 0) return 4;
// //             if (candidates.filter((c: any) => c?.ats_score > 0).length > 0) return 3;
// //             if (candidates.filter((c: any) => c?.exam_link_sent).length > 0) return 2;
// //             if (jobs.length > 0) return 1;
// //             return 0;
// //           })()}
// //           onStepClick={(route) => router.push(route)}
// //         />

// //         {/* Stats */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //           <StatCard
// //             title="Total Applications"
// //             value={stats.totalApplications}
// //             change={12.5}
// //             icon={Users}
// //             color="bg-blue-600"
// //             subtitle="All time applications"
// //             loading={loading}
// //           />
// //           <StatCard
// //             title="Shortlist Rate"
// //             value={`${stats.shortlistRate}%`}
// //             change={5.2}
// //             icon={Target}
// //             color="bg-green-600"
// //             subtitle="Candidates shortlisted"
// //             loading={loading}
// //           />
// //           <StatCard
// //             title="Time-to-Hire"
// //             value={`${stats.timeToHire}d`}
// //             change={-8.3}
// //             icon={Clock}
// //             color="bg-yellow-600"
// //             subtitle="Average days to hire"
// //             loading={loading}
// //           />
// //           <StatCard
// //             title="Pending Actions"
// //             value={stats.pendingActions}
// //             icon={Bell}
// //             color="bg-purple-600"
// //             subtitle="Requires attention"
// //             loading={loading}
// //           />
// //         </div>

// //         {/* Charts */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
// //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Pipeline</h3>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <BarChart data={pipelineStages}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="name" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Bar dataKey="value" fill="#3B82F6">
// //                   {pipelineStages.map((e, i) => (
// //                     <Cell key={i} fill={e.color} />
// //                   ))}
// //                 </Bar>
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>

// //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Activity</h3>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <LineChart data={chartData}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="date" /> {/* change to "month" if your API provides that */}
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
// //                 <Line type="monotone" dataKey="interviews" stroke="#10B981" strokeWidth={2} />
// //                 <Line type="monotone" dataKey="hires" stroke="#EF4444" strokeWidth={2} />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //         {/* Jobs table */}
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
// //           <div className="p-6 border-b border-gray-200 flex items-center justify-between">
// //             <h3 className="text-lg font-semibold text-gray-700">Active Job Positions</h3>
// //             <button
// //               onClick={() => router.push("/candidates")}
// //               className="text-blue-600 hover:text-blue-700 text-sm font-medium"
// //             >
// //               View All Candidates →
// //             </button>
// //           </div>
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead>
// //                 <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
// //                   <th className="px-6 py-3">Position</th>
// //                   <th className="px-6 py-3">Department</th>
// //                   <th className="px-6 py-3">Location</th>
// //                   <th className="px-6 py-3">Applications</th>
// //                   <th className="px-6 py-3">Shortlisted</th>
// //                   <th className="px-6 py-3">In Progress</th>
// //                   <th className="px-6 py-3">Status</th>
// //                   <th className="px-6 py-3">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-200">
// //                 {jobs.length === 0 ? (
// //                   <tr>
// //                     <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
// //                       <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// //                       <p className="text-lg font-medium">No job positions found</p>
// //                       <p className="mt-1">Start a new recruitment pipeline to begin</p>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   jobs.map((job: any) => {
// //                     const jobCandidates = candidates.filter((c: { job_id: any }) => c?.job_id === job.id);
// //                     const shortlisted = jobCandidates.filter((c: { status: string }) => c?.status === "Shortlisted").length;
// //                     const inProgress = jobCandidates.filter(
// //                       (c: { exam_link_sent: any; interview_scheduled: any }) => c?.exam_link_sent || c?.interview_scheduled
// //                     ).length;

// //                     return (
// //                       <tr key={job.id} className="hover:bg-gray-50">
// //                         <td className="px-6 py-4">
// //                           <div className="text-sm font-medium text-gray-900">{job.title}</div>
// //                         </td>
// //                         <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
// //                         <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
// //                         <td className="px-6 py-4">
// //                           <span className="text-sm font-medium text-gray-900">
// //                             {jobCandidates.length}
// //                           </span>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <span className="text-sm font-medium text-green-600">{shortlisted}</span>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <span className="text-sm font-medium text-blue-600">{inProgress}</span>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <span className="inline-flex px-2 py-1 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
// //                             Active
// //                           </span>
// //                         </td>
// //                         <td className="px-6 py-4 text-sm">
// //                           <div className="flex space-x-2">
// //                             <button
// //                               onClick={() => router.push(`/candidates?job_id=${job.id}`)}
// //                               className="text-blue-600 hover:text-blue-900 font-medium"
// //                             >
// //                               View
// //                             </button>
// //                             <button
// //                               onClick={() => setSelectedPipelineJob(job)}
// //                               className="text-green-600 hover:text-green-900 font-medium"
// //                             >
// //                               Run Pipeline
// //                             </button>
// //                           </div>
// //                         </td>
// //                       </tr>
// //                     );
// //                   })
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>

// //         {/* Assessment metrics + Quick actions */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Assessment Metrics</h3>
// //             <ResponsiveContainer width="100%" height={200}>
// //               <BarChart data={assessmentMetrics}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="name" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Bar dataKey="value" fill="#8B5CF6" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //             <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
// //               <div>
// //                 <p className="text-gray-500">Completion Rate</p>
// //                 <p className="text-xl font-semibold text-gray-500">{stats.assessmentCompletionRate}%</p>
// //               </div>
// //               <div>
// //                 <p className="text-gray-500">Pass Rate</p>
// //                 <p className="text-xl font-semibold text-gray-500">
// //                   {candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length > 0
// //                     ? (
// //                         (candidates.filter((c: { exam_percentage: number }) => c?.exam_percentage >= 70).length /
// //                           candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length) *
// //                         100
// //                       ).toFixed(1)
// //                     : 0}
// //                   %
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
// //             <div className="space-y-3">
// //               <button
// //                 onClick={() => router.push("/assessments")}
// //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// //               >
// //                 <span className="font-medium text-gray-700">Manage Assessments</span>
// //                 <span className="text-sm text-gray-500">{stats.activeAssessments} pending</span>
// //               </button>

// //               <button
// //                 onClick={() => router.push("/scheduler")}
// //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// //               >
// //                 <span className="font-medium text-gray-700">Schedule Interviews</span>
// //                 <span className="text-sm text-gray-500">{stats.activeInterviews} scheduled</span>
// //               </button>

// //               <button
// //                 onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// //               >
// //                 <span className="font-medium text-gray-700">Start New Recruitment</span>
// //                 <span className="text-sm text-gray-500">Run pipeline</span>
// //               </button>

// //               <button
// //                 onClick={() => router.push("/candidates")}
// //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// //               >
// //                 <span className="font-medium text-gray-700">View All Candidates</span>
// //                 <span className="text-sm text-gray-500">{candidates.length} total</span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //       {selectedPipelineJob && (
// //         <PipelineRunner
// //           job={selectedPipelineJob}
// //           onPipelineStart={() =>
// //             setPipelineStatus((p) => ({
// //               ...p,
// //               [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
// //             }))
// //           }
// //           onPipelineComplete={() => {
// //             fetchAll(true);
// //             setPipelineStatus((p) => ({
// //               ...p,
// //               [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
// //             }));
// //           }}
// //           onClose={() => setSelectedPipelineJob(null)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// import {
//   RefreshCw, Users, Target, Clock, Bell, AlertCircle, CheckCircle, X,
// } from "lucide-react";
// import StatCard from "./subComponents/StatCard";
// import PipelineRunner from "./subComponents/PipelineRunner";
// import {
//   ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis,
//   BarChart, Bar, LineChart, Line, Legend, Cell,
// } from "recharts";
// import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface PipelineAlert {
//   id: number;
//   jobTitle: string;
//   candidateCount: number;
//   time: string;
//   read: boolean;
// }

// // ─── Bell Dropdown Component ──────────────────────────────────────────────────

// const BellAlertDropdown: React.FC<{
//   alerts: PipelineAlert[];
//   onClearAll: () => void;
//   onClose: () => void;
// }> = ({ alerts, onClearAll, onClose }) => (
//   <div
//     className="absolute right-0 top-12 z-50 w-80 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden"
//     style={{ animation: "fadeSlideDown 0.18s ease" }}
//   >
//     <style>{`
//       @keyframes fadeSlideDown {
//         from { opacity: 0; transform: translateY(-8px); }
//         to   { opacity: 1; transform: translateY(0); }
//       }
//     `}</style>

//     {/* Header */}
//     <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
//       <span className="text-sm font-semibold text-gray-800">Pipeline Alerts</span>
//       <div className="flex items-center gap-3">
//         {alerts.length > 0 && (
//           <button
//             onClick={onClearAll}
//             className="text-xs text-blue-600 hover:text-blue-800 font-medium"
//           >
//             Clear all
//           </button>
//         )}
//         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//           <X className="w-4 h-4" />
//         </button>
//       </div>
//     </div>

//     {/* Alert list */}
//     <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
//       {alerts.length === 0 ? (
//         <div className="px-4 py-8 text-center">
//           <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
//           <p className="text-sm text-gray-400">No alerts yet.</p>
//           <p className="text-xs text-gray-400 mt-1">Run a pipeline to see results here.</p>
//         </div>
//       ) : (
//         alerts.map((alert) => (
//           <div
//             key={alert.id}
//             className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
//           >
//             {/* Green check icon */}
//             <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
//               <CheckCircle className="w-4 h-4 text-green-600" />
//             </div>

//             {/* Content */}
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-900">Pipeline completed</p>
//               <p className="text-xs text-blue-600 font-medium mt-0.5 truncate">
//                 {alert.jobTitle}
//               </p>
//               <p className="text-xs text-gray-500 mt-0.5">
//                 <span className="font-semibold text-gray-700">{alert.candidateCount}</span>{" "}
//                 candidates processed
//               </p>
//               <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
//             </div>

//             {/* Unread dot */}
//             {!alert.read && (
//               <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   </div>
// );

// // ─── Main Dashboard ───────────────────────────────────────────────────────────

// const Dashboard: React.FC = () => {
//   const router   = useRouter();
//   const dispatch = useAppDispatch();
//   const { jobs, candidates, recruitmentData, loading } = useAppSelector(
//     (state) => state.dashboard
//   );

//   const [refreshing, setRefreshing]                   = useState(false);
//   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
//   const [selectedTimeRange, setSelectedTimeRange]     = useState<"week" | "month" | "quarter" | "year">("month");
//   const [notifications, setNotifications]             = useState<any[]>([]);
//   const [pipelineStatus, setPipelineStatus]           = useState<Record<string, any>>({});
//   const [lastFetchTime, setLastFetchTime]             = useState<Date | null>(null);

//   // ── Bell alert state ────────────────────────────────────────────────────────
//   const [pipelineAlerts, setPipelineAlerts] = useState<PipelineAlert[]>([]);
//   const [bellOpen, setBellOpen]             = useState(false);
//   const alertIdRef                          = useRef(0);
//   const bellRef                             = useRef<HTMLDivElement>(null);

//   const unreadCount = pipelineAlerts.filter((a) => !a.read).length;

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
//         setBellOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const addPipelineAlert = useCallback((jobTitle: string, candidateCount: number) => {
//     const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     setPipelineAlerts((prev) => [
//       { id: ++alertIdRef.current, jobTitle, candidateCount, time, read: false },
//       ...prev,
//     ]);
//   }, []);

//   const clearAllAlerts = useCallback(() => {
//     setPipelineAlerts([]);
//     setBellOpen(false);
//   }, []);

//   const openBell = useCallback(() => {
//     setBellOpen((o) => !o);
//     // mark all read when opened
//     setPipelineAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
//   }, []);

//   // ── Data fetching ───────────────────────────────────────────────────────────
//   const fetchAll = useCallback(
//     async (force = false) => {
//       if (force) setRefreshing(true);
//       try {
//         await dispatch(dashboardRefreshAll()).unwrap();
//         setLastFetchTime(new Date());
//       } finally {
//         setRefreshing(false);
//       }
//     },
//     [dispatch]
//   );

//   useEffect(() => {
//     fetchAll();
//     const id = setInterval(() => fetchAll(true), 120000);
//     return () => clearInterval(id);
//   }, [fetchAll, selectedTimeRange]);

//   // ── Stats ───────────────────────────────────────────────────────────────────
//   const stats = useMemo(() => {
//     const total              = candidates.length;
//     const shortlisted        = candidates.filter((c: any) => c?.status === "Shortlisted").length;
//     const interviews         = candidates.filter((c: any) => c?.interview_scheduled).length;
//     const assessmentsSent    = candidates.filter((c: any) => c?.exam_link_sent).length;
//     const assessmentsCompleted = candidates.filter((c: any) => c?.exam_completed).length;
//     const hires              = candidates.filter((c: any) => c?.final_status === "Hired").length;
//     const pendingAssessments = candidates.filter(
//       (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
//     ).length;
//     const now = new Date();
//     const pendingInterviews = candidates.filter((c: any) => {
//       if (!c?.interview_date) return false;
//       return c?.interview_scheduled && new Date(c.interview_date) > now;
//     }).length;
//     const timeToHire = (() => {
//       const hired = candidates.filter((c: any) => c?.final_status === "Hired" && c?.processed_date);
//       if (!hired.length) return 0;
//       const total = hired.reduce((acc: number, c: any) => {
//         const days = Math.floor((Date.now() - new Date(c.processed_date).getTime()) / 86400000);
//         return acc + Math.max(days, 0);
//       }, 0);
//       return Math.round(total / hired.length);
//     })();
//     return {
//       totalApplications: total,
//       activeInterviews: interviews,
//       timeToHire,
//       activeAssessments: pendingAssessments,
//       shortlistRate: total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
//       assessmentCompletionRate:
//         assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
//       totalHires: hires,
//       pendingActions: pendingAssessments + pendingInterviews,
//     };
//   }, [candidates]);

//   // ── Notification banners ────────────────────────────────────────────────────
//   useEffect(() => {
//     const outs: any[] = [];
//     const pendingAssessments = candidates.filter(
//       (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
//     );
//     if (pendingAssessments.length) {
//       outs.push({
//         id: 1, type: "warning",
//         message: `${pendingAssessments.length} candidates have pending assessments`,
//         action: "View Candidates", route: "/candidates",
//       });
//     }
//     const upcomingToday = candidates.filter((c: any) => {
//       if (!c?.interview_date) return false;
//       const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / 3600000;
//       return diffHrs > 0 && diffHrs < 24;
//     });
//     if (upcomingToday.length) {
//       outs.push({
//         id: 2, type: "info",
//         message: `${upcomingToday.length} interviews scheduled for today`,
//         action: "View Schedule", route: "/scheduler",
//       });
//     }
//     setNotifications(outs);
//   }, [candidates]);

//   const pipelineStages = useMemo(() => [
//     { name: "Applied",     value: candidates.length, color: "#3B82F6" },
//     { name: "Screened",    value: candidates.filter((c: any) => c?.ats_score > 0).length, color: "#10B981" },
//     { name: "Shortlisted", value: candidates.filter((c: any) => c?.status === "Shortlisted").length, color: "#F59E0B" },
//     { name: "Assessment",  value: candidates.filter((c: any) => c?.exam_completed).length, color: "#8B5CF6" },
//     { name: "Interview",   value: candidates.filter((c: any) => c?.interview_scheduled).length, color: "#EF4444" },
//     { name: "Hired",       value: candidates.filter((c: any) => c?.final_status === "Hired").length, color: "#059669" },
//   ], [candidates]);

//   const assessmentMetrics = useMemo(() => [
//     { name: "Sent",      value: candidates.filter((c: any) => c?.exam_link_sent).length },
//     { name: "Started",   value: candidates.filter((c: any) => c?.exam_started).length },
//     { name: "Completed", value: candidates.filter((c: any) => c?.exam_completed).length },
//     { name: "Passed",    value: candidates.filter((c: any) => c?.exam_percentage >= 70).length },
//   ], [candidates]);

//   const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

//   if (loading && !lastFetchTime) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6 bg-white">

//       {/* ── Top bar ── */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
//           <div className="flex items-center mt-1 space-x-4">
//             <p className="text-gray-500 text-sm">
//               Welcome back! Here&apos;s your recruitment overview
//             </p>
//             {lastFetchTime && (
//               <span className="text-xs text-gray-500">
//                 Last updated: {lastFetchTime.toLocaleTimeString()}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center space-x-3">
//           {/* Refresh */}
//           <button
//             onClick={handleRefresh}
//             disabled={refreshing}
//             className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-gray-500"
//             title="Refresh Data"
//           >
//             <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
//           </button>

//           {/* Time range */}
//           <select
//             value={selectedTimeRange}
//             onChange={(e) => setSelectedTimeRange(e.target.value as any)}
//             className="border rounded-lg px-4 py-2 text-sm text-gray-500"
//           >
//             <option value="week">This Week</option>
//             <option value="month">This Month</option>
//             <option value="quarter">This Quarter</option>
//             <option value="year">This Year</option>
//           </select>

//           {/* ── Bell icon ── */}
//           <div className="relative" ref={bellRef}>
//             <button
//               onClick={openBell}
//               className="relative p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors"
//               title="Pipeline Alerts"
//             >
//               <Bell className="w-5 h-5" />
//               {unreadCount > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
//                   {unreadCount > 9 ? "9+" : unreadCount}
//                 </span>
//               )}
//             </button>

//             {bellOpen && (
//               <BellAlertDropdown
//                 alerts={pipelineAlerts}
//                 onClearAll={clearAllAlerts}
//                 onClose={() => setBellOpen(false)}
//               />
//             )}
//           </div>

//           {/* New Pipeline */}
//           <button
//             onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-sm"
//           >
//             New Pipeline
//           </button>
//         </div>
//       </div>

//       {/* ── Notification banners ── */}
//       {notifications.length > 0 && (
//         <div className="mb-6 space-y-2">
//           {notifications.map((n) => (
//             <div
//               key={n.id}
//               className={`p-4 rounded-lg border flex items-center justify-between ${
//                 n.type === "warning"
//                   ? "bg-yellow-50 border-yellow-200"
//                   : "bg-blue-50 border-blue-200"
//               }`}
//             >
//               <div className="flex items-center">
//                 <AlertCircle
//                   className={`w-5 h-5 mr-3 ${
//                     n.type === "warning" ? "text-yellow-600" : "text-blue-600"
//                   }`}
//                 />
//                 <span className={n.type === "warning" ? "text-yellow-800" : "text-blue-800"}>
//                   {n.message}
//                 </span>
//               </div>
//               <button
//                 onClick={() => router.push(n.route)}
//                 className={`px-3 py-1 rounded text-sm font-medium ${
//                   n.type === "warning"
//                     ? "bg-yellow-600 text-white hover:bg-yellow-700"
//                     : "bg-blue-600 text-white hover:bg-blue-700"
//                 }`}
//               >
//                 {n.action}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ── Stats ── */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard title="Total Applications" value={stats.totalApplications} change={12.5}  icon={Users}  color="bg-blue-600"   subtitle="All time applications"  loading={loading} />
//         <StatCard title="Shortlist Rate"     value={`${stats.shortlistRate}%`} change={5.2} icon={Target} color="bg-green-600"  subtitle="Candidates shortlisted" loading={loading} />
//         <StatCard title="Time-to-Hire"       value={`${stats.timeToHire}d`}   change={-8.3} icon={Clock}  color="bg-yellow-600" subtitle="Average days to hire"   loading={loading} />
//         <StatCard title="Pending Actions"    value={stats.pendingActions}                   icon={Bell}   color="bg-purple-600" subtitle="Requires attention"      loading={loading} />
//       </div>

//       {/* ── Charts ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Pipeline</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={pipelineStages}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#3B82F6">
//                 {pipelineStages.map((e, i) => <Cell key={i} fill={e.color} />)}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Activity</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
//               <Line type="monotone" dataKey="interviews"   stroke="#10B981" strokeWidth={2} />
//               <Line type="monotone" dataKey="hires"        stroke="#EF4444" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* ── Jobs table ── */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
//         <div className="p-6 border-b border-gray-200 flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-gray-700">Active Job Positions</h3>
//           <button
//             onClick={() => router.push("/candidates")}
//             className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//           >
//             View All Candidates →
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
//                 <th className="px-6 py-3">Position</th>
//                 <th className="px-6 py-3">Department</th>
//                 <th className="px-6 py-3">Location</th>
//                 <th className="px-6 py-3">Applications</th>
//                 <th className="px-6 py-3">Shortlisted</th>
//                 <th className="px-6 py-3">In Progress</th>
//                 <th className="px-6 py-3">Status</th>
//                 <th className="px-6 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {jobs.length === 0 ? (
//                 <tr>
//                   <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
//                     <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//                     <p className="text-lg font-medium">No job positions found</p>
//                     <p className="mt-1">Start a new recruitment pipeline to begin</p>
//                   </td>
//                 </tr>
//               ) : (
//                 jobs.map((job: any) => {
//                   const jobCandidates = candidates.filter((c: any) => c?.job_id === job.id);
//                   const shortlisted   = jobCandidates.filter((c: any) => c?.status === "Shortlisted").length;
//                   const inProgress    = jobCandidates.filter(
//                     (c: any) => c?.exam_link_sent || c?.interview_scheduled
//                   ).length;
//                   return (
//                     <tr key={job.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
//                       <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
//                       <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{jobCandidates.length}</td>
//                       <td className="px-6 py-4 text-sm font-medium text-green-600">{shortlisted}</td>
//                       <td className="px-6 py-4 text-sm font-medium text-blue-600">{inProgress}</td>
//                       <td className="px-6 py-4">
//                         <span className="inline-flex px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
//                           Active
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => router.push(`/candidates?job_id=${job.id}`)}
//                             className="text-blue-600 hover:text-blue-900 font-medium"
//                           >
//                             View
//                           </button>
//                           <button
//                             onClick={() => setSelectedPipelineJob(job)}
//                             className="text-green-600 hover:text-green-900 font-medium"
//                           >
//                             Run Pipeline
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ── Assessment metrics + Quick actions ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Assessment Metrics</h3>
//           <ResponsiveContainer width="100%" height={200}>
//             <BarChart data={assessmentMetrics}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#8B5CF6" />
//             </BarChart>
//           </ResponsiveContainer>
//           <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
//             <div>
//               <p className="text-gray-500">Completion Rate</p>
//               <p className="text-xl font-semibold text-gray-700">{stats.assessmentCompletionRate}%</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Pass Rate</p>
//               <p className="text-xl font-semibold text-gray-700">
//                 {candidates.filter((c: any) => c?.exam_completed).length > 0
//                   ? (
//                       (candidates.filter((c: any) => c?.exam_percentage >= 70).length /
//                         candidates.filter((c: any) => c?.exam_completed).length) * 100
//                     ).toFixed(1)
//                   : 0}%
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
//           <div className="space-y-3">
//             <button
//               onClick={() => router.push("/assessments")}
//               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
//             >
//               <span className="font-medium text-gray-700">Manage Assessments</span>
//               <span className="text-sm text-gray-500">{stats.activeAssessments} pending</span>
//             </button>
//             <button
//               onClick={() => router.push("/scheduler")}
//               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
//             >
//               <span className="font-medium text-gray-700">Schedule Interviews</span>
//               <span className="text-sm text-gray-500">{stats.activeInterviews} scheduled</span>
//             </button>
//             <button
//               onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
//               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
//             >
//               <span className="font-medium text-gray-700">Start New Recruitment</span>
//               <span className="text-sm text-gray-500">Run pipeline</span>
//             </button>
//             <button
//               onClick={() => router.push("/candidates")}
//               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
//             >
//               <span className="font-medium text-gray-700">View All Candidates</span>
//               <span className="text-sm text-gray-500">{candidates.length} total</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── Pipeline Runner Modal ── */}
//       {selectedPipelineJob && (
//         <PipelineRunner
//           job={selectedPipelineJob}
//           onPipelineStart={() =>
//             setPipelineStatus((p) => ({
//               ...p,
//               [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
//             }))
//           }
//           onPipelineComplete={() => {
//             fetchAll(true).then(() => {
//               const jobCandidates = candidates.filter(
//                 (c: any) => String(c?.job_id) === String(selectedPipelineJob.id)
//               );
//               // ✅ Add bell alert with job title + candidate count
//               addPipelineAlert(selectedPipelineJob.title, jobCandidates.length);
//               setPipelineStatus((p) => ({
//                 ...p,
//                 [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
//               }));
//             });
//           }}
//           onClose={() => setSelectedPipelineJob(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboard;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import {
  RefreshCw,
  Users,
  Target,
  Clock,
  Bell,
  AlertCircle,
  CheckCircle,
  X,
  UserCheck,
  UserX,
  TrendingUp,
  PlayCircle,
  CalendarDays,
  LayoutDashboard,
} from "lucide-react";
import StatCard        from "./subComponents/StatCard";
import PipelineRunner  from "./subComponents/PipelineRunner";
import RecruitmentJourney from "./subComponents/RecruitmentJourney";
import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
  Cell,
} from "recharts";
import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  accent:   "#2563EB",
  accentL:  "#EFF6FF",
  accentM:  "#BFDBFE",
  green:    "#059669",
  greenL:   "#ECFDF5",
  amber:    "#D97706",
  amberL:   "#FFFBEB",
  red:      "#DC2626",
  redL:     "#FEF2F2",
  purple:   "#7C3AED",
  purpleL:  "#F5F3FF",
  t1:       "#0F172A",
  t2:       "#64748B",
  t3:       "#94A3B8",
  border:   "rgba(0,0,0,0.08)",
  borderMd: "rgba(0,0,0,0.14)",
  bg:       "#F8FAFC",
  surface:  "#ffffff",
  r:        10,
  rl:       14,
  rxl:      18,
} as const;

// ── Types ─────────────────────────────────────────────────────────────────────
interface PipelineAlert {
  id: number;
  jobTitle: string;
  candidateCount: number;
  shortlisted: number;
  notShortlisted: number;
  time: string;
  read: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-component: PipelineResultToast
// Stays on screen until HR clicks X — no auto-dismiss
// ─────────────────────────────────────────────────────────────────────────────
const PipelineResultToast: React.FC<{
  toasts: PipelineAlert[];
  onDismiss: (id: number) => void;
}> = ({ toasts, onDismiss }) => {
  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 80,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 340,
        width: "100%",
      }}
    >
      <style>{`
        @keyframes toastIn {
          from { opacity:0; transform:translateX(40px) }
          to   { opacity:1; transform:translateX(0) }
        }
      `}</style>

      {toasts.map(toast => (
        <div
          key={toast.id}
          style={{
            background: T.surface,
            borderRadius: 14,
            boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
            border: `0.5px solid ${T.borderMd}`,
            overflow: "hidden",
            animation: "toastIn 0.25s ease",
          }}
        >
          {/* Green header */}
          <div
            style={{
              background: "#059669",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle size={15} color="#fff" />
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
                Pipeline Completed
              </span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.7)", display: "flex",
                padding: 2, transition: "color 0.12s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = "#fff")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)")}
            >
              <X size={13} />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "13px 15px" }}>
            <p
              style={{
                fontSize: 13, fontWeight: 600, color: T.t1,
                marginBottom: 10,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}
            >
              {toast.jobTitle}
            </p>

            {/* Counts grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              {/* Shortlisted */}
              <div
                style={{
                  borderRadius: 9, padding: "10px 12px",
                  background: T.greenL, border: "0.5px solid #BBF7D0",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                <UserCheck size={14} color={T.green} style={{ flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 10, fontWeight: 500, color: T.green }}>Shortlisted</p>
                  <p style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: "#065F46" }}>
                    {toast.shortlisted}
                  </p>
                </div>
              </div>

              {/* Not shortlisted */}
              <div
                style={{
                  borderRadius: 9, padding: "10px 12px",
                  background: T.redL, border: "0.5px solid #FECACA",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                <UserX size={14} color={T.red} style={{ flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 10, fontWeight: 500, color: T.red }}>Not Shortlisted</p>
                  <p style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: "#991B1B" }}>
                    {toast.notShortlisted}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                paddingTop: 8, borderTop: `0.5px solid ${T.border}`,
              }}
            >
              <span style={{ fontSize: 11, color: T.t2 }}>
                Total processed:{" "}
                <strong style={{ color: T.t1 }}>{toast.candidateCount}</strong>
              </span>
              <span style={{ fontSize: 10, color: T.t3 }}>{toast.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-component: BellAlertDropdown
// ─────────────────────────────────────────────────────────────────────────────
const BellAlertDropdown: React.FC<{
  alerts: PipelineAlert[];
  onClearAll: () => void;
  onClose: () => void;
}> = ({ alerts, onClearAll, onClose }) => (
  <div
    style={{
      position: "absolute", right: 0, top: 44,
      width: 320,
      background: T.surface,
      border: `0.5px solid ${T.borderMd}`,
      borderRadius: 14,
      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      overflow: "hidden",
      zIndex: 60,
      animation: "fadeDown 0.18s ease",
    }}
  >
    <style>{`
      @keyframes fadeDown {
        from { opacity:0; transform:translateY(-8px) }
        to   { opacity:1; transform:translateY(0) }
      }
    `}</style>

    {/* Header */}
    <div
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px",
        borderBottom: `0.5px solid ${T.border}`,
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 600, color: T.t1 }}>
        Pipeline Alerts
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {alerts.length > 0 && (
          <button
            onClick={onClearAll}
            style={{
              fontSize: 12, color: T.accent, fontWeight: 500,
              background: "none", border: "none", cursor: "pointer",
            }}
          >
            Clear all
          </button>
        )}
        <button
          onClick={onClose}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: T.t3, display: "flex",
          }}
        >
          <X size={15} />
        </button>
      </div>
    </div>

    {/* Alert list */}
    <div style={{ maxHeight: 288, overflowY: "auto" }}>
      {alerts.length === 0 ? (
        <div style={{ padding: "28px 16px", textAlign: "center" }}>
          <Bell
            size={30}
            color={T.t3}
            style={{ margin: "0 auto 8px", display: "block" }}
          />
          <p style={{ fontSize: 13, color: T.t2, fontWeight: 500 }}>No alerts yet</p>
          <p style={{ fontSize: 11, color: T.t3, marginTop: 3 }}>
            Run a pipeline to see results here.
          </p>
        </div>
      ) : (
        alerts.map(alert => (
          <div
            key={alert.id}
            style={{
              display: "flex", gap: 12,
              padding: "12px 16px",
              borderBottom: `0.5px solid ${T.border}`,
              transition: "background 0.12s",
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLDivElement).style.background = T.bg)
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLDivElement).style.background = T.surface)
            }
          >
            <div
              style={{
                width: 32, height: 32, borderRadius: "50%",
                background: T.greenL, border: "0.5px solid #BBF7D0",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, marginTop: 1,
              }}
            >
              <CheckCircle size={14} color={T.green} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: T.t1, margin: 0 }}>
                Pipeline Completed
              </p>
              <p style={{ fontSize: 11, color: T.t2, marginTop: 2, lineHeight: 1.4 }}>
                {alert.jobTitle} &mdash; {alert.shortlisted} shortlisted,{" "}
                {alert.notShortlisted} not shortlisted ({alert.candidateCount} total)
              </p>
              <p style={{ fontSize: 10, color: T.t3, marginTop: 3 }}>{alert.time}</p>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main Dashboard
// ─────────────────────────────────────────────────────────────────────────────
const Dashboard: React.FC = () => {
  const router   = useRouter();
  const dispatch = useAppDispatch();
  const { jobs, candidates, recruitmentData, loading } = useAppSelector(
    (state: any) => state.dashboard
  );

  const [refreshing, setRefreshing]               = useState(false);
  const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<"week" | "month" | "quarter" | "year">("month");
  const [notifications, setNotifications]         = useState<any[]>([]);
  const [pipelineStatus, setPipelineStatus]       = useState<Record<string, any>>({});
  const [lastFetchTime, setLastFetchTime]         = useState<Date | null>(null);
  const [bellOpen, setBellOpen]                   = useState(false);
  const [pipelineAlerts, setPipelineAlerts]       = useState<PipelineAlert[]>([]);
  const [resultToasts, setResultToasts]           = useState<PipelineAlert[]>([]);
  const bellRef = useRef<HTMLDivElement>(null);

  // ── Data fetch (auto-refresh every 2 min) ─────────────────────────────────
  const fetchAll = useCallback(
    async (force = false) => {
      if (force) setRefreshing(true);
      try {
        await dispatch(dashboardRefreshAll()).unwrap();
        setLastFetchTime(new Date());
      } finally {
        setRefreshing(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchAll();
    const id = setInterval(() => fetchAll(true), 120_000);
    return () => clearInterval(id);
  }, [fetchAll, selectedTimeRange]);

  // ── Stats (useMemo — mirrors original computation exactly) ─────────────────
  const stats = useMemo(() => {
    const total              = candidates.length;
    const shortlisted        = candidates.filter((c: any) => c?.status === "Shortlisted").length;
    const interviews         = candidates.filter((c: any) => c?.interview_scheduled).length;
    const assessmentsSent    = candidates.filter((c: any) => c?.exam_link_sent).length;
    const assessmentsCompleted = candidates.filter((c: any) => c?.exam_completed).length;
    const hires              = candidates.filter((c: any) => c?.final_status === "Hired").length;
    const pendingAssessments = candidates.filter(
      (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
    ).length;

    const now = new Date();
    const pendingInterviews = candidates.filter((c: any) => {
      if (!c?.interview_date) return false;
      return c?.interview_scheduled && new Date(c.interview_date) > now;
    }).length;

    const timeToHire = (() => {
      const hired = candidates.filter(
        (c: any) => c?.final_status === "Hired" && c?.processed_date
      );
      if (!hired.length) return 0;
      const totalDays = hired.reduce((acc: number, c: any) => {
        const start = new Date(c.processed_date).getTime();
        const days  = Math.floor((Date.now() - start) / 86_400_000);
        return acc + Math.max(days, 0);
      }, 0);
      return Math.round(totalDays / hired.length);
    })();

    return {
      totalApplications:        total,
      activeInterviews:         interviews,
      timeToHire,
      activeAssessments:        pendingAssessments,
      shortlistRate:            total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
      assessmentCompletionRate: assessmentsSent > 0
        ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1)
        : 0,
      assessmentPassRate: assessmentsCompleted > 0
        ? (
            (candidates.filter((c: any) => c?.exam_percentage >= 70).length /
              assessmentsCompleted) *
            100
          ).toFixed(1)
        : 0,
      totalHires:     hires,
      pendingActions: pendingAssessments + pendingInterviews,
    };
  }, [candidates]);

  // ── Current journey step (derived from live data) ──────────────────────────
  const currentJourneyStep = useMemo(() => {
    if (stats.totalHires > 0 || stats.activeInterviews > 0) return 4;
    if (stats.activeAssessments > 0) return 3;
    if (parseFloat(String(stats.shortlistRate)) > 0) return 2;
    if (jobs.length > 0) return 1;
    return 0;
  }, [stats, jobs]);

  // ── Pipeline stages for bar chart ─────────────────────────────────────────
  const pipelineStages = useMemo(
    () => [
      { name: "Applied",     value: candidates.length,                                              color: "#3B82F6" },
      { name: "Screened",    value: candidates.filter((c: any) => c?.ats_score > 0).length,         color: "#10B981" },
      { name: "Shortlisted", value: candidates.filter((c: any) => c?.status === "Shortlisted").length, color: "#F59E0B" },
      { name: "Assessment",  value: candidates.filter((c: any) => c?.exam_completed).length,        color: "#8B5CF6" },
      { name: "Interview",   value: candidates.filter((c: any) => c?.interview_scheduled).length,   color: "#EF4444" },
      { name: "Hired",       value: candidates.filter((c: any) => c?.final_status === "Hired").length, color: "#059669" },
    ],
    [candidates]
  );

  // ── Assessment bar chart data ──────────────────────────────────────────────
  const assessmentMetrics = useMemo(
    () => [
      { name: "Sent",      value: candidates.filter((c: any) => c?.exam_link_sent).length },
      { name: "Started",   value: candidates.filter((c: any) => c?.exam_started).length },
      { name: "Completed", value: candidates.filter((c: any) => c?.exam_completed).length },
      { name: "Passed",    value: candidates.filter((c: any) => c?.exam_percentage >= 70).length },
    ],
    [candidates]
  );


  // ── Recruitment Activity chart data ───────────────────────────────────────
  // Uses recruitmentData from Redux if populated; otherwise derives it live
  // from candidates grouped by month so the chart always shows real metrics.
  const chartData = useMemo(() => {
    // If the API already returned shaped data, use it directly
    if (Array.isArray(recruitmentData) && recruitmentData.length > 0) {
      return recruitmentData;
    }

    // Derive from candidates: group by month over the last 6 months
    const MONTHS = 6;
    const now    = new Date();
    const buckets: Record<string, { date: string; applications: number; interviews: number; hires: number }> = {};

    for (let i = MONTHS - 1; i >= 0; i--) {
      const d   = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleString("default", { month: "short", year: "2-digit" });
      buckets[key] = { date: key, applications: 0, interviews: 0, hires: 0 };
    }

    candidates.forEach((c: any) => {
      const raw = c?.processed_date || c?.created_at;
      if (!raw) return;
      const d   = new Date(raw);
      const key = d.toLocaleString("default", { month: "short", year: "2-digit" });
      if (!buckets[key]) return;
      buckets[key].applications += 1;
      if (c?.interview_scheduled || c?.interview_date) buckets[key].interviews += 1;
      if (c?.final_status === "Hired") buckets[key].hires += 1;
    });

    const derived = Object.values(buckets);

    // If still all zeros, show demo seed data so chart is never blank
    const hasAny = derived.some(d => d.applications > 0 || d.interviews > 0 || d.hires > 0);
    if (!hasAny) {
      const seed  = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const apps  = [12, 19, 15, 25, 22, 30];
      const ints  = [4,  8,  6,  10,  9,  14];
      const hired = [1,  3,  2,   4,  3,   5];
      return seed.map((m, i) => ({ date: m, applications: apps[i], interviews: ints[i], hires: hired[i] }));
    }

    return derived;
  }, [recruitmentData, candidates]);

  // ── Notification banners (pending assessments / today's interviews) ────────
  useEffect(() => {
    const outs: any[] = [];
    const pendingAssessments = candidates.filter(
      (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
    );
    if (pendingAssessments.length) {
      outs.push({
        id: 1, type: "warning",
        message: `${pendingAssessments.length} candidates have pending assessments`,
        action: "View Candidates", route: "/candidates",
      });
    }
    const upcomingToday = candidates.filter((c: any) => {
      if (!c?.interview_date) return false;
      const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / 3_600_000;
      return diffHrs > 0 && diffHrs < 24;
    });
    if (upcomingToday.length) {
      outs.push({
        id: 2, type: "info",
        message: `${upcomingToday.length} interviews scheduled for today`,
        action: "View Schedule", route: "/scheduler",
      });
    }
    setNotifications(outs);
  }, [candidates]);

  // ── Bell helpers ──────────────────────────────────────────────────────────
  const unreadCount = pipelineAlerts.filter(a => !a.read).length;

  const openBell = () => {
    setBellOpen(prev => !prev);
    setPipelineAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  // Close bell on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (bellOpen && bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [bellOpen]);

  const addPipelineAlert = (jobTitle: string, shortlisted: number, notShortlisted: number) => {
    const id   = Date.now();
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const alert: PipelineAlert = {
      id, jobTitle,
      candidateCount: shortlisted + notShortlisted,
      shortlisted, notShortlisted,
      time, read: false,
    };
    setPipelineAlerts(prev => [alert, ...prev]);
    setResultToasts(prev => [alert, ...prev]);
  };

  const clearAllAlerts = () => setPipelineAlerts([]);
  const dismissToast   = (id: number) =>
    setResultToasts(prev => prev.filter(t => t.id !== id));

  const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

  // ── Loading splash ────────────────────────────────────────────────────────
  if (loading && !lastFetchTime) {
    return (
      <div
        style={{
          minHeight: "100vh", background: T.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 48, height: 48, borderRadius: "50%",
              border: `3px solid ${T.accentM}`,
              borderTopColor: T.accent,
              animation: "spin 0.7s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ color: T.t2, fontSize: 14 }}>Loading dashboard...</p>
        </div>
        <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div style={{ background: T.bg, minHeight: "100vh" }}>

      {/* ── Page body ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px 64px" }}>

        {/* ── Notification banners ── */}
        {notifications.length > 0 && (
          <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {notifications.map(n => (
              <div
                key={n.id}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "11px 16px", borderRadius: 10,
                  border: `0.5px solid ${n.type === "warning" ? "#FCD34D" : T.accentM}`,
                  background: n.type === "warning" ? T.amberL : T.accentL,
                }}
              >
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    fontSize: 13, fontWeight: 500,
                    color: n.type === "warning" ? "#92400E" : "#1E40AF",
                  }}
                >
                  <AlertCircle size={15} />
                  {n.message}
                </div>
                <button
                  onClick={() => router.push(n.route)}
                  style={{
                    padding: "5px 12px", fontSize: 12, fontWeight: 500,
                    border: "none", borderRadius: 8, cursor: "pointer",
                    fontFamily: "inherit",
                    background: n.type === "warning" ? T.amber : T.accent,
                    color: "#fff",
                  }}
                >
                  {n.action}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── RecruitmentJourney ── */}
        <RecruitmentJourney
          currentStep={currentJourneyStep}
          onStepClick={(route) => router.push(route)}
        />

        {/* ── Page title + controls ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
          <div>
            <h1
              style={{
                fontSize: 22, fontWeight: 600, color: T.t1,
                letterSpacing: "-0.5px", margin: 0,
              }}
            >
              Recruitment Dashboard
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 3 }}>
              <p style={{ fontSize: 13, color: T.t2, margin: 0 }}>
                Welcome back! Here&apos;s your recruitment overview
              </p>
              {lastFetchTime && (
                <span style={{ fontSize: 11, color: T.t3 }}>
                  Last updated: {lastFetchTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
            </div>
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Refresh */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh data"
              style={{
                width: 36, height: 36, padding: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 8, border: `0.5px solid ${T.borderMd}`,
                background: T.surface, cursor: "pointer",
                transition: "background 0.14s",
                opacity: refreshing ? 0.5 : 1,
              }}
            >
              <RefreshCw
                size={15}
                color={T.t2}
                style={{ animation: refreshing ? "spin 0.7s linear infinite" : "none" }}
              />
            </button>

            {/* Time range */}
            <select
              value={selectedTimeRange}
              onChange={e => setSelectedTimeRange(e.target.value as any)}
              style={{
                fontSize: 13, fontFamily: "inherit", color: T.t2,
                background: T.surface, border: `0.5px solid ${T.borderMd}`,
                borderRadius: 8, padding: "7px 12px", outline: "none", cursor: "pointer",
              }}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>

            {/* Bell */}
            <div style={{ position: "relative" }} ref={bellRef}>
              <button
                onClick={openBell}
                title="Pipeline Alerts"
                style={{
                  width: 36, height: 36,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: `0.5px solid ${T.borderMd}`, borderRadius: 8,
                  background: T.surface, cursor: "pointer", position: "relative",
                  transition: "background 0.14s",
                }}
              >
                <Bell size={16} color={T.t2} />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: "absolute", top: -5, right: -5,
                      minWidth: 16, height: 16, padding: "0 3px",
                      background: T.red, color: "#fff",
                      fontSize: 10, fontWeight: 700, borderRadius: 20,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: `2px solid ${T.surface}`,
                    }}
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {bellOpen && (
                <BellAlertDropdown
                  alerts={pipelineAlerts}
                  onClearAll={clearAllAlerts}
                  onClose={() => setBellOpen(false)}
                />
              )}
            </div>

            {/* New Pipeline */}
            <button
              onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
              style={{
                padding: "8px 16px", fontSize: 13, fontWeight: 500,
                background: T.accent, color: "#fff", border: "none",
                borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
                transition: "background 0.15s",
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#1D4ED8")
              }
              onMouseLeave={e =>
                ((e.currentTarget as HTMLButtonElement).style.background = T.accent)
              }
            >
              New Pipeline
            </button>
          </div>
        </div>

        {/* ── StatCards (4) ── */}
        <div
          style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            gap: 14, marginBottom: 26,
          }}
        >
          <StatCard
            title="Total Applications"
            value={stats.totalApplications}
            change={12.5}
            icon={Users}
            accentColor="#2563EB"
            iconBg="#2563EB"
            subtitle="All time applications"
            loading={loading}
          />
          <StatCard
            title="Shortlist Rate"
            value={`${stats.shortlistRate}%`}
            change={5.2}
            icon={Target}
            accentColor="#059669"
            iconBg="#059669"
            subtitle="Candidates shortlisted"
            loading={loading}
          />
          <StatCard
            title="Time-to-Hire"
            value={`${stats.timeToHire}d`}
            change={-8.3}
            icon={Clock}
            accentColor="#D97706"
            iconBg="#D97706"
            subtitle="Average days to hire"
            loading={loading}
          />
          <StatCard
            title="Pending Actions"
            value={stats.pendingActions}
            icon={Bell}
            accentColor="#7C3AED"
            iconBg="#7C3AED"
            subtitle="Requires attention"
            loading={loading}
          />
        </div>

        {/* ── Charts row ── */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 22 }}
        >
          {/* Pipeline bar chart */}
          <div
            style={{
              background: T.surface, border: `0.5px solid ${T.border}`,
              borderRadius: T.rl, overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "15px 20px", borderBottom: `0.5px solid ${T.border}`,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
                Recruitment Pipeline
              </span>
            </div>
            <div style={{ padding: "14px 18px 18px" }}>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={pipelineStages}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: T.surface, border: `0.5px solid ${T.borderMd}`,
                      borderRadius: 10, fontSize: 12,
                    }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {pipelineStages.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity line chart */}
          <div
            style={{
              background: T.surface, border: `0.5px solid ${T.border}`,
              borderRadius: T.rl, overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "15px 20px", borderBottom: `0.5px solid ${T.border}`,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
                Recruitment Activity
              </span>
            </div>
            <div style={{ padding: "14px 18px 18px" }}>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: T.surface, border: `0.5px solid ${T.borderMd}`,
                      borderRadius: 10, fontSize: 12,
                    }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: T.t2 }} />
                  <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="interviews"   stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="hires"        stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── Pipeline stage strip ── */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 11,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>Pipeline Stages</span>
          <span style={{ fontSize: 12, color: T.t2 }}>Live candidate counts by stage</span>
        </div>
        <div style={{ display: "flex", marginBottom: 8 }}>
          {pipelineStages.map((stage, i) => {
            const maxV = Math.max(...pipelineStages.map(s => s.value), 1);
            const pct  = Math.round((stage.value / maxV) * 100);
            const isFirst = i === 0;
            const isLast  = i === pipelineStages.length - 1;
            return (
              <div
                key={stage.name}
                style={{
                  flex: 1,
                  padding: "13px 15px",
                  background: T.surface,
                  border: `0.5px solid ${T.border}`,
                  borderLeft: i > 0 ? "none" : `0.5px solid ${T.border}`,
                  borderRadius: isFirst
                    ? "10px 0 0 10px"
                    : isLast
                    ? "0 10px 10px 0"
                    : 0,
                  position: "relative",
                  cursor: "pointer",
                  transition: "background 0.14s",
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLDivElement).style.background = "#F8FAFC")
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLDivElement).style.background = T.surface)
                }
                onClick={() => router.push(`/candidates?stage=${stage.name.toLowerCase()}`)}
              >
                <div style={{ fontSize: 11, fontWeight: 600, color: T.t2, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>
                  {stage.name}
                </div>
                <div style={{ fontSize: 26, fontWeight: 600, color: T.t1, letterSpacing: "-1px", lineHeight: 1 }}>
                  {stage.value}
                </div>
                <div style={{ height: 3, background: "#E2E8F0", marginTop: 9, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: stage.color, borderRadius: 2, transition: "width 0.6s ease" }} />
                </div>
                {!isLast && (
                  <div
                    style={{
                      position: "absolute", right: -9, top: "50%",
                      transform: "translateY(-50%)",
                      width: 17, height: 30,
                      background: T.surface, border: `0.5px solid ${T.border}`,
                      borderRadius: "0 6px 6px 0",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      zIndex: 2, fontSize: 10, color: T.t3, pointerEvents: "none",
                    }}
                  >
                    ›
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 11, color: T.t3, textAlign: "center", marginBottom: 22 }}>
          Click any stage to filter candidates
        </p>

        {/* ── Active Jobs table ── */}
        <div
          style={{
            background: T.surface,
            border: `0.5px solid ${T.border}`,
            borderRadius: T.rl,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "15px 20px", borderBottom: `0.5px solid ${T.border}`,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
              Active Job Positions
              {jobs.length > 0 && (
                <span
                  style={{
                    fontSize: 12, fontWeight: 500,
                    background: T.accentL, color: T.accent,
                    padding: "2px 9px", borderRadius: 20, marginLeft: 8,
                  }}
                >
                  {jobs.length} active
                </span>
              )}
            </span>
            <button
              onClick={() => router.push("/candidates")}
              style={{
                fontSize: 13, fontWeight: 500, color: T.accent,
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              View All Candidates →
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `0.5px solid ${T.borderMd}` }}>
                  {["Position", "Department", "Location", "Applications", "Shortlisted", "In Progress", "Status", "Actions"].map(h => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 16px", textAlign: "left",
                        fontSize: 11, fontWeight: 600, color: T.t3,
                        textTransform: "uppercase", letterSpacing: "0.5px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan={8}>
                      <div
                        style={{
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "center",
                          padding: "56px 28px", textAlign: "center", gap: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 56, height: 56, borderRadius: 16,
                            background: T.accentL,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            marginBottom: 6,
                          }}
                        >
                          <TrendingUp size={26} color={T.accent} strokeWidth={1.5} />
                        </div>
                        <p style={{ fontSize: 15, fontWeight: 600, color: T.t1, margin: 0 }}>
                          No job positions found
                        </p>
                        <p style={{ fontSize: 13, color: T.t2, margin: 0 }}>
                          Start a new recruitment pipeline to begin
                        </p>
                        <button
                          onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
                          style={{
                            marginTop: 4, padding: "8px 16px",
                            background: T.accent, color: "#fff",
                            border: "none", borderRadius: 8,
                            fontSize: 13, fontWeight: 500, cursor: "pointer",
                          }}
                        >
                          Start New Pipeline →
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  jobs.map((job: any) => {
                    const jobCandidates = candidates.filter((c: any) => c?.job_id === job.id);
                    const shortlisted   = jobCandidates.filter((c: any) => c?.status === "Shortlisted").length;
                    const inProgress    = jobCandidates.filter(
                      (c: any) => c?.exam_link_sent || c?.interview_scheduled
                    ).length;
                    return (
                      <tr
                        key={job.id}
                        style={{
                          borderBottom: `0.5px solid ${T.border}`,
                          transition: "background 0.12s",
                        }}
                        onMouseEnter={e =>
                          ((e.currentTarget as HTMLTableRowElement).style.background = "#F8FAFC")
                        }
                        onMouseLeave={e =>
                          ((e.currentTarget as HTMLTableRowElement).style.background = T.surface)
                        }
                      >
                        <td style={{ padding: "13px 16px", fontWeight: 500, color: T.t1 }}>
                          {job.title}
                        </td>
                        <td style={{ padding: "13px 16px", color: T.t2 }}>{job.department}</td>
                        <td style={{ padding: "13px 16px", color: T.t2 }}>{job.location}</td>
                        <td style={{ padding: "13px 16px", fontWeight: 500, color: T.t1, textAlign: "center" }}>
                          {jobCandidates.length}
                        </td>
                        <td
                          style={{ padding: "13px 16px", fontWeight: 600, color: T.accent, textAlign: "center", cursor: "pointer" }}
                          onClick={() => router.push(`/candidates?job_id=${job.id}&stage=shortlisted`)}
                        >
                          {shortlisted}
                        </td>
                        <td
                          style={{ padding: "13px 16px", fontWeight: 600, color: T.accent, textAlign: "center", cursor: "pointer" }}
                          onClick={() => router.push(`/candidates?job_id=${job.id}&stage=in_progress`)}
                        >
                          {inProgress}
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          <span
                            style={{
                              display: "inline-flex",
                              fontSize: 11, fontWeight: 600, padding: "3px 10px",
                              borderRadius: 20,
                              background: "#ECFDF5", color: "#059669",
                            }}
                          >
                            Active
                          </span>
                        </td>
                        <td style={{ padding: "13px 16px", whiteSpace: "nowrap" }}>
                          <button
                            onClick={() => router.push(`/candidates?job_id=${job.id}`)}
                            style={{
                              fontSize: 12, fontWeight: 500, color: T.accent,
                              background: "none", border: "none", cursor: "pointer",
                              fontFamily: "inherit", padding: 0, marginRight: 12,
                              transition: "opacity 0.12s",
                            }}
                          >
                            View
                          </button>
                          <button
                            onClick={() => setSelectedPipelineJob(job)}
                            style={{
                              fontSize: 12, fontWeight: 500, color: T.green,
                              background: "none", border: "none", cursor: "pointer",
                              fontFamily: "inherit", padding: 0,
                              transition: "opacity 0.12s",
                            }}
                          >
                            Run Pipeline
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Bottom grid: Assessment metrics + Quick Actions ── */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 20 }}
        >
          {/* Assessment metrics */}
          <div
            style={{
              background: T.surface, border: `0.5px solid ${T.border}`,
              borderRadius: T.rl, overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "15px 20px", borderBottom: `0.5px solid ${T.border}`,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
                Assessment Metrics
              </span>
              <button
                onClick={() => router.push("/assessments")}
                style={{
                  fontSize: 13, fontWeight: 500, color: T.accent,
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                View details →
              </button>
            </div>
            <div style={{ padding: "15px 18px" }}>
              {/* Completion + Pass rate boxes */}
              <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                {[
                  { label: "Completion Rate", value: `${stats.assessmentCompletionRate}%`, color: T.accent },
                  { label: "Pass Rate",        value: `${stats.assessmentPassRate}%`,       color: T.green },
                ].map(m => (
                  <div
                    key={m.label}
                    style={{
                      flex: 1, padding: 12, textAlign: "center",
                      background: T.bg, borderRadius: 9,
                      border: `0.5px solid ${T.border}`,
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.5px", color: m.color }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize: 11, color: T.t2, marginTop: 2, fontWeight: 500 }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Assessment bar chart */}
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={assessmentMetrics} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: T.t3 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: T.surface, border: `0.5px solid ${T.borderMd}`,
                      borderRadius: 10, fontSize: 12,
                    }}
                  />
                  <Bar dataKey="value" fill="#8B5CF6" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              {/* Insight */}
              <div
                style={{
                  marginTop: 12, fontSize: 12, color: T.t2, lineHeight: 1.55,
                  padding: "10px 14px",
                  background: T.accentL,
                  borderRadius: 8,
                  borderLeft: `3px solid ${T.accent}`,
                }}
              >
                {parseFloat(String(stats.assessmentCompletionRate)) > 0
                    ? `${stats.assessmentCompletionRate}% completion · ${stats.assessmentPassRate}% pass rate`
                    : "Assessment data will appear once candidates complete tests."}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div
            style={{
              background: T.surface, border: `0.5px solid ${T.border}`,
              borderRadius: T.rl, overflow: "hidden",
            }}
          >
            <div
              style={{ padding: "15px 20px", borderBottom: `0.5px solid ${T.border}` }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>
                Quick Actions
              </span>
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  {
                    label: "New Pipeline",
                    sub: "Run pipeline",
                    color: T.accentL,
                    stroke: T.accent,
                    icon: <PlayCircle size={15} />,
                    onClick: () => jobs.length > 0 && setSelectedPipelineJob(jobs[0]),
                  },
                  {
                    label: "Manage Assessments",
                    sub: `${stats.activeAssessments} pending`,
                    color: "#ECFDF5",
                    stroke: T.green,
                    icon: <Target size={15} />,
                    onClick: () => router.push("/assessments"),
                  },
                  {
                    label: "Schedule Interviews",
                    sub: `${stats.activeInterviews} scheduled`,
                    color: "#FFFBEB",
                    stroke: T.amber,
                    icon: <CalendarDays size={15} />,
                    onClick: () => router.push("/scheduler"),
                  },
                  {
                    label: "View All Candidates",
                    sub: `${candidates.length} total`,
                    color: "#F5F3FF",
                    stroke: T.purple,
                    icon: <Users size={15} />,
                    onClick: () => router.push("/candidates"),
                  },
                ].map(qa => (
                  <button
                    key={qa.label}
                    onClick={qa.onClick}
                    style={{
                      background: T.bg,
                      border: `0.5px solid ${T.border}`,
                      borderRadius: 10, padding: 14,
                      cursor: "pointer", transition: "all 0.14s",
                      textAlign: "left", fontFamily: "inherit", width: "100%",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.borderColor = T.borderMd;
                      el.style.background  = "#EEF2F7";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.borderColor = T.border;
                      el.style.background  = T.bg;
                    }}
                  >
                    <div
                      style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: qa.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: 8, color: qa.stroke,
                      }}
                    >
                      {qa.icon}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.t1, marginBottom: 2 }}>
                      {qa.label}
                    </div>
                    <div style={{ fontSize: 11, color: T.t2 }}>{qa.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PipelineRunner modal ── */}
      {selectedPipelineJob && (
        <PipelineRunner
          job={selectedPipelineJob}
          onPipelineStart={() =>
            setPipelineStatus(p => ({
              ...p,
              [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
            }))
          }
          onPipelineComplete={() => {
            fetchAll(true).then(() => {
              const jobCandidates = candidates.filter(
                (c: any) => String(c?.job_id) === String(selectedPipelineJob.id)
              );
              const shortlisted = jobCandidates.filter(
                (c: any) => c?.status === "Shortlisted"
              ).length;
              addPipelineAlert(
                selectedPipelineJob.title,
                shortlisted,
                jobCandidates.length - shortlisted
              );
              setPipelineStatus(p => ({
                ...p,
                [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
              }));
            });
          }}
          onClose={() => setSelectedPipelineJob(null)}
        />
      )}

      {/* ── Persistent result toasts ── */}
      <PipelineResultToast toasts={resultToasts} onDismiss={dismissToast} />

      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
};

export default Dashboard;