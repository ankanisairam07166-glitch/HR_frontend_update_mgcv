// import React from "react";
// import { Search } from "lucide-react";
// import type { Job } from "@/services/interfaces/CandidateScreening";

// interface FilterBarProps {
//   jobs: Job[];
//   selectedJob: Job | null;
//   onJobChange: (job: Job | null) => void;
//   searchTerm: string;
//   onSearchChange: (value: string) => void;
//   filterStatus: string;
//   onFilterStatusChange: (value: string) => void;
//   sortBy: string;
//   onSortChange: (value: string) => void;
// }

// const FilterBar: React.FC<FilterBarProps> = ({
//   jobs,
//   selectedJob,
//   onJobChange,
//   searchTerm,
//   onSearchChange,
//   filterStatus,
//   onFilterStatusChange,
//   sortBy,
//   onSortChange,
// }) => {
//   return (
//     <div className="mb-6 flex flex-wrap items-center gap-4">
//       {/* Job Selector */}
//       <select
//         value={selectedJob?.id || ""}
//         onChange={(e) => {
//           const job = jobs.find((j) => String(j.id) === e.target.value);
//           onJobChange(job || null);
//         }}
//         className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-600"
//       >
//         <option value="">All Jobs</option>
//         {jobs.map((job) => (
//           <option key={job.id} value={job.id}>
//             {job.title} ({job.location})
//           </option>
//         ))}
//       </select>

//       {/* Search Input */}
//       <div className="relative flex-1 max-w-md">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
//         <input
//           type="text"
//           placeholder="Search candidates by name, email, or job title..."
//           value={searchTerm}
//           onChange={(e) => onSearchChange(e.target.value)}
//           className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-600"
//         />
//       </div>

//       {/* Status Filter */}
//       <select
//         value={filterStatus}
//         onChange={(e) => onFilterStatusChange(e.target.value)}
//         className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-600"
//       >
//         <option value="all">All Status</option>
//         <option value="shortlisted">Shortlisted</option>
//         <option value="assessment_pending">Assessment Pending</option>
//         <option value="assessment_completed">Assessment Completed</option>
//         <option value="interview_scheduled">Interview Scheduled</option>
//         <option value="rejected">Rejected</option>
//       </select>

//       {/* Sort Options */}
//       <select
//         value={sortBy}
//         onChange={(e) => onSortChange(e.target.value)}
//         className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-600"
//       >
//         <option value="score_desc">Score (High to Low)</option>
//         <option value="score_asc">Score (Low to High)</option>
//         <option value="date_desc">Date (Newest First)</option>
//         <option value="date_asc">Date (Oldest First)</option>
//         <option value="name">Name (A-Z)</option>
//         <option value="status">Status Priority</option>
//       </select>
//     </div>
//   );
// };

// export default React.memo(FilterBar);
import React from "react";
import { Search } from "lucide-react";
import type { Job } from "@/services/interfaces/CandidateScreening";

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  accent:  "#2563EB", accentL: "#EFF6FF", accentM: "#BFDBFE",
  green:   "#059669",
  t1: "#0F172A", t2: "#64748B", t3: "#94A3B8",
  border:  "rgba(0,0,0,0.08)", borderMd: "rgba(0,0,0,0.14)",
  bg:      "#F8FAFC", surface: "#ffffff",
} as const;

// ── Shared input/select style ─────────────────────────────────────────────────
const selectStyle: React.CSSProperties = {
  fontSize: 13, fontFamily: "inherit", color: T.t2,
  background: T.surface, border: `0.5px solid ${T.borderMd}`,
  borderRadius: 9, padding: "8px 12px",
  outline: "none", cursor: "pointer", appearance: "none",
  WebkitAppearance: "none",
  transition: "border-color 0.14s",
};

// ── Status chip ───────────────────────────────────────────────────────────────
interface ChipProps {
  label: string;
  value: string;
  active: boolean;
  onClick: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      flexShrink: 0, fontSize: 12, fontWeight: 500,
      padding: "5px 13px", borderRadius: 20,
      border: `0.5px solid ${active ? "transparent" : T.borderMd}`,
      background: active ? T.accent : T.surface,
      color: active ? "#fff" : T.t2,
      cursor: "pointer", transition: "all 0.13s",
      whiteSpace: "nowrap", fontFamily: "inherit",
    }}
  >
    {label}
  </button>
);

// ── Props ─────────────────────────────────────────────────────────────────────
interface FilterBarProps {
  jobs: Job[];
  selectedJob: Job | null;
  onJobChange: (job: Job | null) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onFilterStatusChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

// ── Status chip definitions ───────────────────────────────────────────────────
const STATUS_CHIPS = [
  { label: "All",                  value: "all" },
  { label: "Shortlisted",          value: "shortlisted" },
  { label: "Assessment Pending",   value: "assessment_pending" },
  { label: "Assessment Completed", value: "assessment_completed" },
  { label: "Interview Scheduled",  value: "interview_scheduled" },
  { label: "Rejected",             value: "rejected" },
];

const FilterBar: React.FC<FilterBarProps> = ({
  jobs,
  selectedJob,
  onJobChange,
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
  sortBy,
  onSortChange,
}) => (
  <div style={{ marginBottom: 20 }}>

    {/* ── Top row: job selector + search + sort ── */}
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>

      {/* Job selector */}
      <div style={{ position: "relative" }}>
        <select
          value={selectedJob?.id ?? ""}
          onChange={e => {
            const job = jobs.find(j => String(j.id) === e.target.value);
            onJobChange(job ?? null);
          }}
          style={{ ...selectStyle, paddingRight: 32, minWidth: 180 }}
          onFocus={e => (e.currentTarget.style.borderColor = T.accentM)}
          onBlur={e  => (e.currentTarget.style.borderColor = T.borderMd)}
        >
          <option value="">All Jobs</option>
          {jobs.map(job => (
            <option key={job.id} value={job.id}>
              {job.title} ({job.location})
            </option>
          ))}
        </select>
        {/* Custom arrow */}
        <svg
          viewBox="0 0 24 24" width="13" height="13"
          style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", stroke: T.t3, fill: "none", strokeWidth: 2, strokeLinecap: "round" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Search */}
      <div style={{ position: "relative", flex: 1, maxWidth: 380, minWidth: 200 }}>
        <Search
          size={14}
          style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: T.t3 }}
        />
        <input
          type="text"
          placeholder="Search by name, email, or job title…"
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          style={{
            ...selectStyle, paddingLeft: 34, paddingRight: 12,
            width: "100%", appearance: "none", WebkitAppearance: "none",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = T.accentM)}
          onBlur={e  => (e.currentTarget.style.borderColor = T.borderMd)}
        />
      </div>

      {/* Sort */}
      <div style={{ position: "relative" }}>
        <select
          value={sortBy}
          onChange={e => onSortChange(e.target.value)}
          style={{ ...selectStyle, paddingRight: 32, minWidth: 180 }}
          onFocus={e => (e.currentTarget.style.borderColor = T.accentM)}
          onBlur={e  => (e.currentTarget.style.borderColor = T.borderMd)}
        >
          <option value="score_desc">Score (High to Low)</option>
          <option value="score_asc">Score (Low to High)</option>
          <option value="date_desc">Date (Newest First)</option>
          <option value="date_asc">Date (Oldest First)</option>
          <option value="name">Name (A–Z)</option>
          <option value="status">Status Priority</option>
        </select>
        <svg
          viewBox="0 0 24 24" width="13" height="13"
          style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", stroke: T.t3, fill: "none", strokeWidth: 2, strokeLinecap: "round" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>

    {/* ── Status chips row ── */}
    <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2, scrollbarWidth: "none" }}>
      {STATUS_CHIPS.map(chip => (
        <Chip
          key={chip.value}
          label={chip.label}
          value={chip.value}
          active={filterStatus === chip.value}
          onClick={() => onFilterStatusChange(chip.value)}
        />
      ))}
    </div>
  </div>
);

export default React.memo(FilterBar);