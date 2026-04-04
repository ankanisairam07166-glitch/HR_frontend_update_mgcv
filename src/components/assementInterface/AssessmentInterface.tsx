// // // "use client";
// // // import React, { useEffect, useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import {
// // //   fetchJobsThunk,
// // //   fetchCandidatesThunk,
// // // } from "@/services/redux/thunk/assessmentThunk";
// // // import { RootState, AppDispatch } from "@/services/redux/store";
// // // // import Navigation from "@/components/Navigation";
// // // import JobSelector from "./subComponents/JobSelector";
// // // import StatsCards from "./subComponents/StatsCards";
// // // import Tabs from "./subComponents/Tabs";
// // // import CandidatesTable from "./subComponents/CandidatesTable";
// // // import OverviewTab from "./subComponents/OverviewTab";
// // // import ResultsManagement from "./subComponents/ResultsManagement";
// // // import { Navigation } from "lucide-react";

// // // const AssessmentInterface = () => {
// // //   const dispatch = useDispatch<AppDispatch>();
// // //   const { jobs, candidates, assessmentStats, isLoading, message } = useSelector(
// // //     (state: RootState) => state.assessment
// // //   );
// // //   const [selectedJob, setSelectedJob] = useState<any>(null);
// // //   const [activeTab, setActiveTab] = useState("overview");

// // //   useEffect(() => {
// // //     dispatch(fetchJobsThunk());
// // //   }, [dispatch]);

// // //   useEffect(() => {
// // //     if (selectedJob) {
// // //       dispatch(fetchCandidatesThunk(selectedJob.id));
// // //     }
// // //   }, [selectedJob, activeTab, dispatch]);

// // //   return (
// // //     <div className="flex flex-col min-h-screen bg-gray-50">
// // //       <Navigation />
// // //       <main className="flex-grow p-6">
// // //         <h1 className="text-2xl font-bold mb-4 text-gray-900">Assessment Management</h1>

// // //         <JobSelector jobs={jobs} selectedJob={selectedJob} setSelectedJob={setSelectedJob} />

// // //         {message && (
// // //           <div className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg">{message}</div>
// // //         )}

// // //         {selectedJob ? (
// // //           <>
// // //             <StatsCards stats={assessmentStats} />
// // //             <Tabs
// // //               candidates={candidates}
// // //               activeTab={activeTab}
// // //               setActiveTab={setActiveTab}
// // //               loading={isLoading}
// // //             />
// // //             {activeTab === "overview" && (
// // //               <OverviewTab candidates={candidates} assessmentStats={assessmentStats} />
// // //             )}
// // //             {activeTab === "results" && (
// // //               <ResultsManagement 
// // //               candidates={candidates} 
// // //               selectedJob={selectedJob} 
// // //               onRefreshCandidates={() =>{
// // //                 if (selectedJob) {
// // //                   dispatch(fetchCandidatesThunk(selectedJob.id));
// // //                 }
// // //               } } />
// // //             )}
// // //             {["pending", "completed", "not_sent", "expired"].includes(activeTab) && (
// // //               <CandidatesTable
// // //                 candidates={candidates}
// // //                 activeTab={activeTab}
// // //                 selectedJob={selectedJob}
// // //               />
// // //             )}
// // //           </>
// // //         ) : (
// // //           <div className="bg-white p-6 text-center rounded-lg border shadow-sm">
// // //             <p className="text-gray-500">Select a job position to view assessments</p>
// // //           </div>
// // //         )}
// // //       </main>
// // //     </div>
// // //   );
// // // };

// // // export default AssessmentInterface;
// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";

// // import {
// //   fetchJobsThunk,
// //   fetchCandidatesThunk,
// // } from "@/services/redux/thunk/assessmentThunk";

// // import { RootState, AppDispatch } from "@/services/redux/store";
// // import { Job, Candidate } from "@/services/interfaces/CandidateScreening";

// // import JobSelector from "./subComponents/JobSelector";
// // import StatsCards from "./subComponents/StatsCards";
// // import Tabs from "./subComponents/Tabs";
// // import CandidatesTable from "./subComponents/CandidatesTable";
// // import OverviewTab from "./subComponents/OverviewTab";
// // import ResultsManagement from "./subComponents/ResultsManagement";

// // import { Navigation } from "lucide-react";

// // const AssessmentInterface = () => {
// //   const dispatch = useDispatch<AppDispatch>();

// //   const { jobs, candidates, assessmentStats, isLoading, message } = useSelector(
// //     (state: RootState) => ({
// //       jobs: state.assessment.jobs as Job[],
// //       candidates: state.assessment.candidates,
// //       assessmentStats: state.assessment.assessmentStats,
// //       isLoading: state.assessment.isLoading,
// //       message: state.assessment.message,
// //     })
// //   );

// //   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
// //   const [activeTab, setActiveTab] = useState("overview");

// //   // Fetch jobs on load
// //   useEffect(() => {
// //     dispatch(fetchJobsThunk());
// //   }, [dispatch]);

// //   // Fetch candidates when a job or tab changes
// //   useEffect(() => {
// //     if (selectedJob) {
// //       const idNum = Number(selectedJob.id);
// //       if (!isNaN(idNum)) dispatch(fetchCandidatesThunk(idNum));
// //     }
// //   }, [selectedJob, activeTab, dispatch]);

// //   // Normalize candidate IDs safely
// //   const normalizedCandidates: Candidate[] = candidates.map((c) => ({
// //     ...c,
// //     id: typeof c.id === "string" ? Number(c.id) : c.id,
// //   }));

// //   return (
// //     <div className="flex flex-col min-h-screen bg-gray-50">
// //       <Navigation />

// //       <main className="flex-grow p-6">
// //         <h1 className="text-2xl font-bold mb-4 text-gray-900">
// //           Assessment Management
// //         </h1>

// //         <JobSelector
// //           jobs={jobs}
// //           selectedJob={selectedJob}
// //           setSelectedJob={setSelectedJob}
// //         />

// //         {message && (
// //           <div className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg">
// //             {message}
// //           </div>
// //         )}

// //         {selectedJob ? (
// //           <>
// //             <StatsCards stats={assessmentStats} />

// //             <Tabs
// //               candidates={normalizedCandidates}
// //               activeTab={activeTab}
// //               setActiveTab={setActiveTab}
// //               loading={isLoading}
// //             />

// //             {activeTab === "overview" && (
// //               <OverviewTab
// //                 candidates={normalizedCandidates}
// //                 assessmentStats={assessmentStats}
// //               />
// //             )}

// //             {activeTab === "results" && (
// //               <ResultsManagement
// //                 candidates={normalizedCandidates}
// //                 selectedJob={selectedJob}
// //                 onRefreshCandidates={() => {
// //                   const idNum = Number(selectedJob.id);
// //                   if (!isNaN(idNum)) dispatch(fetchCandidatesThunk(idNum));
// //                 }}
// //               />
// //             )}

// //             {["pending", "completed", "not_sent", "expired"].includes(
// //               activeTab
// //             ) && (
// //               <CandidatesTable
// //                 candidates={normalizedCandidates}
// //                 activeTab={activeTab}
// //                 selectedJob={selectedJob}
// //               />
// //             )}
// //           </>
// //         ) : (
// //           <div className="bg-white p-6 text-center rounded-lg border shadow-sm">
// //             <p className="text-gray-500">
// //               Select a job position to view assessments
// //             </p>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // };

// // export default AssessmentInterface;
// "use client";

// import React, { useEffect, useCallback, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchJobsThunk, fetchCandidatesThunk } from "@/services/redux/thunk/assessmentThunk";
// import { RootState, AppDispatch } from "@/services/redux/store";
// import { Job, Candidate } from "@/services/interfaces/CandidateScreening";

// import JobSelector from "./subComponents/JobSelector";
// import StatsCards from "./subComponents/StatsCards";
// import Tabs from "./subComponents/Tabs";
// import CandidatesTable from "./subComponents/CandidatesTable";
// import OverviewTab from "./subComponents/OverviewTab";
// import ResultsManagement from "./subComponents/ResultsManagement";

// const AssessmentInterface = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { jobs, candidates, assessmentStats, isLoading, message } = useSelector(
//     (state: RootState) => ({
//       jobs: state.assessment.jobs as Job[],
//       candidates: state.assessment.candidates,
//       assessmentStats: state.assessment.assessmentStats,
//       isLoading: state.assessment.isLoading,
//       message: state.assessment.message,
//     })
//   );

//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const [activeTab, setActiveTab] = useState("overview");

//   // Prevent re-fetching on every tab change if job hasn't changed
//   const lastFetchedJobRef = useRef<string | null>(null);

//   // Fetch jobs on mount
//   useEffect(() => {
//     dispatch(fetchJobsThunk());
//   }, [dispatch]);

//   // Fetch candidates only when selectedJob changes (not on every tab switch)
//   useEffect(() => {
//     if (!selectedJob) return;
//     const jobKey = String(selectedJob.id);
//     if (lastFetchedJobRef.current === jobKey) return;
//     lastFetchedJobRef.current = jobKey;
//     dispatch(fetchCandidatesThunk(Number(selectedJob.id)));
//   }, [selectedJob, dispatch]);

//   const handleRefreshCandidates = useCallback(() => {
//     if (!selectedJob) return;
//     lastFetchedJobRef.current = null; // force re-fetch
//     dispatch(fetchCandidatesThunk(Number(selectedJob.id)));
//     lastFetchedJobRef.current = String(selectedJob.id);
//   }, [selectedJob, dispatch]);

//   const handleJobChange = useCallback((job: Job | null) => {
//     lastFetchedJobRef.current = null; // reset so new job fetches fresh
//     setSelectedJob(job);
//     setActiveTab("overview"); // reset tab on job change
//   }, []);

//   // Type assertion - candidates from Redux are properly typed despite TypeScript's inference
//   const typedCandidates = candidates as unknown as Candidate[];

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <main className="flex-grow p-6">
//         <h1 className="text-2xl font-bold mb-4 text-gray-900">Assessment Management</h1>

//         <JobSelector jobs={jobs} selectedJob={selectedJob} setSelectedJob={handleJobChange} />

//         {message && (
//           <div className="mt-4 mb-4 bg-green-100 text-green-700 px-4 py-3 rounded-lg flex items-center">
//             <span>{message}</span>
//           </div>
//         )}

//         {selectedJob ? (
//           <>
//             <StatsCards stats={assessmentStats} />

//             <Tabs
//               candidates={typedCandidates}
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//               loading={isLoading}
//             />

//             {activeTab === "overview" && (
//               <OverviewTab candidates={typedCandidates} assessmentStats={assessmentStats} />
//             )}

//             {activeTab === "results" && (
//               <ResultsManagement
//                 candidates={typedCandidates}
//                 selectedJob={selectedJob}
//                 onRefreshCandidates={handleRefreshCandidates}
//               />
//             )}

//             {["pending", "completed", "not_sent", "expired"].includes(activeTab) && (
//               <CandidatesTable
//                 candidates={typedCandidates}
//                 activeTab={activeTab}
//                 selectedJob={selectedJob}
//               />
//             )}
//           </>
//         ) : (
//           <div className="bg-white p-8 text-center rounded-lg border shadow-sm">
//             <p className="text-gray-500 text-lg">Select a job position to view assessments</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AssessmentInterface;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsThunk, fetchCandidatesThunk } from "@/services/redux/thunk/assessmentThunk";
import { RootState, AppDispatch } from "@/services/redux/store";
import { Job, Candidate } from "@/services/interfaces/CandidateScreening";
import { Info, X } from "lucide-react";

import JobSelector    from "./subComponents/JobSelector";
import StatsCards     from "./subComponents/StatsCards";
import Tabs           from "./subComponents/Tabs";
import CandidatesTable from "./subComponents/CandidatesTable";
import OverviewTab    from "./subComponents/OverviewTab";
import ResultsManagement from "./subComponents/ResultsManagement";

// ── Notification bar ──────────────────────────────────────────────────────────
const NotifyBar: React.FC<{ count: number; onSendAll: () => void; onDismiss: () => void }> = ({
  count, onSendAll, onDismiss,
}) => (
  <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-5">
    <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
    <p className="flex-1 text-sm text-blue-700 font-medium">
      {count} candidate{count > 1 ? "s have" : " has"} not yet received the assessment.{" "}
      <span className="font-normal text-blue-600">Send now to avoid delays in your pipeline.</span>
    </p>
    <button
      onClick={onSendAll}
      className="text-xs font-semibold px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
    >
      Send Now
    </button>
    <button onClick={onDismiss} className="text-blue-400 hover:text-blue-600 transition-colors ml-1">
      <X className="w-4 h-4" />
    </button>
  </div>
);

// ── Main ─────────────────────────────────────────────────────────────────────
const AssessmentInterface: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { jobs, candidates, assessmentStats, isLoading, message } = useSelector(
    (state: RootState) => ({
      jobs:            state.assessment.jobs as Job[],
      candidates:      state.assessment.candidates,
      assessmentStats: state.assessment.assessmentStats,
      isLoading:       state.assessment.isLoading,
      message:         state.assessment.message,
    })
  );

  const [selectedJob, setSelectedJob]     = useState<Job | null>(null);
  const [activeTab, setActiveTab]         = useState("all");
  const [notifyDismissed, setNotifyDismissed] = useState(false);
  const lastFetchedJobRef                 = useRef<string | null>(null);

  const typedCandidates = candidates as unknown as Candidate[];

  // How many not yet sent
  const pendingCount = typedCandidates.filter(c => !c.exam_link_sent).length;
  const showNotify   = !notifyDismissed && selectedJob && pendingCount > 0;

  // Build stats for StatsCards
  const statsForCards = {
    totalSent:      typedCandidates.filter(c => c.exam_link_sent).length,
    totalPending:   pendingCount,
    totalCompleted: typedCandidates.filter(c => c.exam_completed).length,
    passRate:       (() => {
      const comp   = typedCandidates.filter(c => c.exam_completed).length;
      const passed = typedCandidates.filter(c => c.exam_completed && (c.exam_percentage ?? 0) >= 70).length;
      return comp > 0 ? (passed / comp) * 100 : 0;
    })(),
    avgScore: (() => {
      const scores = typedCandidates.filter(c => c.exam_completed).map(c => c.exam_percentage ?? 0);
      return scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    })(),
  };

  useEffect(() => {
    dispatch(fetchJobsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedJob) return;
    const key = String(selectedJob.id);
    if (lastFetchedJobRef.current === key) return;
    lastFetchedJobRef.current = key;
    dispatch(fetchCandidatesThunk(Number(selectedJob.id)));
  }, [selectedJob, dispatch]);

  const handleRefresh = useCallback(() => {
    if (!selectedJob) return;
    lastFetchedJobRef.current = null;
    dispatch(fetchCandidatesThunk(Number(selectedJob.id)));
    lastFetchedJobRef.current = String(selectedJob.id);
  }, [selectedJob, dispatch]);

  const handleJobChange = useCallback((job: Job | null) => {
    lastFetchedJobRef.current = null;
    setSelectedJob(job);
    setActiveTab("all");
    setNotifyDismissed(false);
  }, []);

  const handleSendAll = () => {
    // TODO: dispatch bulk send action
    setNotifyDismissed(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow p-6 max-w-[1200px] mx-auto w-full">

        {/* ── Page header ── */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight">Assessment Management</h1>
            <p className="text-[13px] text-gray-400 mt-1">
              Manage screening tests, track submissions and review results by job position
            </p>
          </div>
          <button className="text-sm px-3.5 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 font-medium">
            Export Results
          </button>
        </div>

        {/* ── KPI strip ── */}
        <StatsCards stats={statsForCards} />

        {/* ── Notification bar ── */}
        {showNotify && (
          <NotifyBar
            count={pendingCount}
            onSendAll={handleSendAll}
            onDismiss={() => setNotifyDismissed(true)}
          />
        )}

        {/* ── Success message ── */}
        {message && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
            {message}
          </div>
        )}

        {/* ── Job selector ── */}
        <JobSelector
          jobs={jobs}
          selectedJob={selectedJob}
          setSelectedJob={handleJobChange}
          candidates={typedCandidates}
        />

        {/* ── No job selected ── */}
        {!selectedJob ? (
          <div className="bg-white border border-gray-100 rounded-xl">
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center px-6">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" />
              </svg>
              <p className="text-[16px] font-semibold text-gray-800">Select a job position to view assessments</p>
              <p className="text-[13px] text-gray-400 max-w-[300px] leading-relaxed">
                Choose a job from the dropdown above to see candidates, send assessments, and review results.
              </p>
            </div>
          </div>
        ) : (

          /* ── Two-column layout ── */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 items-start">

            {/* Left: candidates table with inner tabs */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <Tabs
                candidates={typedCandidates}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                loading={isLoading}
              />

              {/* Tab content */}
              {activeTab === "results" ? (
                <div className="p-5">
                  <ResultsManagement
                    candidates={typedCandidates}
                    selectedJob={selectedJob}
                    onRefreshCandidates={handleRefresh}
                  />
                </div>
              ) : (
                <CandidatesTable
                  candidates={typedCandidates}
                  activeTab={activeTab}
                  selectedJob={selectedJob}
                />
              )}
            </div>

            {/* Right: sidebar (ring + dist + settings) */}
            <OverviewTab
              candidates={typedCandidates}
              assessmentStats={assessmentStats}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default AssessmentInterface;