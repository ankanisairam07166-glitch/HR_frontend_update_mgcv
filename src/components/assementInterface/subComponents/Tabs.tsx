// // import React from "react";
// // import { Candidate } from "@/services/interfaces/CandidateScreening";
// // interface TabsProps {
// //   candidates: Candidate[];
// //   activeTab: string;
// //   setActiveTab: (tab: string) => void;
// //   loading: boolean;
// // }

// // const Tabs: React.FC<TabsProps> = ({ candidates, activeTab, setActiveTab }) => {
// //   const tabs = [
// //     { key: "overview", label: "Overview" },
// //     { key: "results", label: "Results" },
// //     { key: "pending", label: `Pending (${candidates.filter(c => c.exam_link_sent && !c.exam_completed && !c.link_expired).length})` },
// //     { key: "completed", label: `Completed (${candidates.filter(c => c.exam_completed).length})` },
// //     { key: "not_sent", label: `Not Sent (${candidates.filter(c => c.status === "Shortlisted" && !c.exam_link_sent).length})` },
// //     { key: "expired", label: `Expired (${candidates.filter(c => c.exam_link_sent && !c.exam_completed && c.link_expired).length})` },
// //   ];

// //   return (
// //     <div className="border-b border-gray-200 mb-6">
// //       <nav className="flex space-x-6">
// //         {tabs.map((tab) => (
// //           <button
// //             key={tab.key}
// //             onClick={() => setActiveTab(tab.key)}
// //             className={`py-2 px-1 border-b-2 font-medium text-sm ${
// //               activeTab === tab.key
// //                 ? "border-blue-500 text-blue-600"
// //                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
// //             }`}
// //           >
// //             {tab.label}
// //           </button>
// //         ))}
// //       </nav>
// //     </div>
// //   );
// // };

// // export default Tabs;
// import React from "react";
// import { Candidate } from "@/services/interfaces/CandidateScreening";

// interface TabsProps {
//   candidates: Candidate[];
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
//   loading: boolean;
// }

// const Tabs: React.FC<TabsProps> = ({ candidates, activeTab, setActiveTab, loading }) => {
//   const tabs = [
//     {
//       key: "overview",
//       label: "Overview",
//     },
//     {
//       key: "results",
//       label: "Results",
//     },
//     {
//       key: "pending",
//       label: `Pending (${candidates.filter((c) => c.exam_link_sent && !c.exam_completed && !c.link_expired).length})`,
//     },
//     {
//       key: "completed",
//       label: `Completed (${candidates.filter((c) => c.exam_completed).length})`,
//     },
//     {
//       key: "not_sent",
//       label: `Not Sent (${candidates.filter((c) => c.status === "Shortlisted" && !c.exam_link_sent).length})`,
//     },
//     {
//       key: "expired",
//       label: `Expired (${candidates.filter((c) => c.exam_link_sent && !c.exam_completed && c.link_expired).length})`,
//     },
//   ];

//   return (
//     <div className="border-b border-gray-200 mb-6">
//       <nav className="flex space-x-1 overflow-x-auto">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => !loading && setActiveTab(tab.key)}
//             disabled={loading}
//             className={`py-3 px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
//               activeTab === tab.key
//                 ? "border-blue-500 text-blue-600"
//                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//             } disabled:opacity-50`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Tabs;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Candidate } from "@/services/interfaces/CandidateScreening";

interface TabsProps {
  candidates: Candidate[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
}

const Tabs: React.FC<TabsProps> = ({ candidates, activeTab, setActiveTab, loading }) => {
  const tabs = [
    { key: "all",       label: "All Candidates" },
    { key: "pending",   label: `Pending (${candidates.filter(c => c.exam_link_sent && !c.exam_completed && !c.link_expired).length})` },
    { key: "completed", label: `Completed (${candidates.filter(c => c.exam_completed).length})` },
    { key: "questions", label: "Questions" },
  ];

  return (
    <div className="flex border-b border-gray-100">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => !loading && setActiveTab(tab.key)}
          disabled={loading}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
            activeTab === tab.key
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } disabled:opacity-50`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;