// import React from "react";
// import { Job } from "@/services/interfaces/CandidateScreening";

// interface JobSelectorProps {
//   jobs: Job[];
//   selectedJob: Job | null;
//   setSelectedJob: (job: Job | null) => void;
// }

// const JobSelector: React.FC<JobSelectorProps> = ({ jobs, selectedJob, setSelectedJob }) => (
//   <div className="mb-6">
//     <label className="block text-sm font-medium text-gray-700 mb-2">Select Job Position</label>
//     <select
//       value={selectedJob?.id ?? ""}
//       onChange={(e) => {
//         const job = jobs.find((j) => String(j.id) === e.target.value);
//         setSelectedJob(job ?? null);
//       }}
//       className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white min-w-[250px]"
//     >
//       <option value="">Select a job...</option>
//       {jobs.map((job) => (
//         <option key={job.id} value={job.id}>
//           {job.title} — {job.location}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// export default JobSelector;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import { Job, Candidate } from "@/services/interfaces/CandidateScreening";

interface JobSelectorProps {
  jobs: Job[];
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  candidates: Candidate[];
}

const JobSelector: React.FC<JobSelectorProps> = ({ jobs, selectedJob, setSelectedJob, candidates }) => {
  const sent      = candidates.filter(c => c.exam_link_sent).length;
  const completed = candidates.filter(c => c.exam_completed).length;
  const passed    = candidates.filter(c => c.exam_completed && (c.exam_percentage ?? 0) >= 70).length;
  const passRate  = completed > 0 ? Math.round((passed / completed) * 100) : null;

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3 mb-5">
      <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">Job Position</span>

      {/* Select */}
      <div className="relative flex-1 min-w-[220px]">
        <select
          value={selectedJob?.id ?? ""}
          onChange={(e) => {
            const job = jobs.find(j => String(j.id) === e.target.value);
            setSelectedJob(job ?? null);
          }}
          className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-9 py-2 text-sm text-gray-700 outline-none focus:border-blue-300 focus:bg-white cursor-pointer transition-colors"
        >
          <option value="">— Select a job position —</option>
          {jobs.map(j => (
            <option key={j.id} value={j.id}>
              {j.title}{j.location ? ` (${j.location})` : ""}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
      </div>

      {/* Meta stats — only shown when job selected */}
      {selectedJob && (
        <div className="flex gap-6">
          {[
            { num: candidates.length, lbl: "Applied" },
            { num: sent,              lbl: "Sent"    },
            { num: completed,         lbl: "Done"    },
            { num: passRate != null ? passRate + "%" : "—", lbl: "Pass Rate" },
          ].map(({ num, lbl }) => (
            <div key={lbl} className="text-center">
              <div className="text-base font-semibold text-gray-900 leading-none">{num}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wide mt-0.5">{lbl}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobSelector;