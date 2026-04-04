// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React from "react";
// import { avColor, ini, scoreCls, fmtDate } from "../SchedulerInterface";
// import type { Candidate } from "../SchedulerInterface";

// const CHIPS = ["all","pending","scheduled","completed","cancelled"];
// const CHIP_LABEL: Record<string,string> = { all:"All", pending:"Pending", scheduled:"Scheduled", completed:"Completed", cancelled:"Cancelled" };

// interface Props {
//   title: string;
//   candidates: Candidate[];
//   total: number;
//   selectedId: string|null;
//   search: string; setSearch:(v:string)=>void;
//   chipFilter: string; setChipFilter:(v:string)=>void;
//   sortBy: string; setSortBy:(v:string)=>void;
//   onSelect: (c:Candidate)=>void;
//   onManualSchedule: (id:string)=>void;
// }

// export default function LeftPanel({ title, candidates, total, selectedId, search, setSearch, chipFilter, setChipFilter, sortBy, setSortBy, onSelect, onManualSchedule }: Props) {
//   const pillCls = (status:string) =>
//     status==="scheduled"?"sch-pill sch-pill-blue":status==="completed"?"sch-pill sch-pill-green":status==="cancelled"?"sch-pill sch-pill-red":"sch-pill sch-pill-amber";
//   const pillLabel = (status:string) =>
//     status==="scheduled"?"Scheduled":status==="completed"?"Completed":status==="cancelled"?"Cancelled":"Pending";

//   return (
//     <div className="sch-left">
//       <div className="sch-left-head">
//         <div className="sch-left-title-row">
//           <span className="sch-left-title">{title}</span>
//           <span className="sch-left-count">{candidates.length} of {total}</span>
//         </div>

//         {/* Search */}
//         <div className="sch-search-wrap">
//           <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
//           <input className="sch-search" placeholder="Search candidates…" value={search} onChange={e=>setSearch(e.target.value)} />
//         </div>

//         {/* Chips */}
//         <div className="sch-chip-row">
//           {CHIPS.map(v => (
//             <button key={v} className={`sch-chip${chipFilter===v?" active":""}`} onClick={()=>setChipFilter(v)}>
//               {CHIP_LABEL[v]}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Sort */}
//       <div className="sch-sort-row">
//         <span className="sch-sort-label">Sort by</span>
//         <select className="sch-sort-select" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
//           <option value="score_desc">Score ↓</option>
//           <option value="date_asc">Interview Date ↑</option>
//           <option value="date_desc">Interview Date ↓</option>
//           <option value="name_asc">Name A–Z</option>
//         </select>
//       </div>

//       {/* List */}
//       <div className="sch-cand-list">
//         {candidates.length === 0 ? (
//           <div className="sch-list-empty">
//             <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="1.2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
//             <div style={{fontSize:13,fontWeight:600,color:"var(--t1)"}}>No candidates found</div>
//             <div style={{fontSize:11,color:"var(--t2)"}}>Adjust filters or search.</div>
//           </div>
//         ) : candidates.map(c => {
//           const [bg,fg] = avColor(c.name);
//           return (
//             <div key={c.id} className={`sch-cand-card${selectedId===c.id?" selected":""}`} onClick={()=>onSelect(c)}>
//               <div className="sch-avatar" style={{background:bg,color:fg}}>{ini(c.name)}</div>
//               <div className="sch-cand-info">
//                 <div className="sch-cand-name">{c.name}</div>
//                 <div className="sch-cand-role">{c.job_title} · {c.dept}</div>
//                 <div className="sch-cand-meta">
//                   <span className={pillCls(c.interview_status)}>{pillLabel(c.interview_status)}</span>
//                   <span className="sch-date">{c.interview_date?fmtDate(c.interview_date):"No date"}</span>
//                 </div>
//               </div>
//               <div className="sch-cand-right">
//                 <span className={scoreCls(c.ats_score)}>{c.ats_score||"—"}</span>
//                 <span className="sch-date">{c.location}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
"use client";
import React from "react";
import { avColor, ini } from "@/services/interfaces/sechedulerhelpers";
import type { RawCandidate } from "@/services/api/schedulerAPI";

type Props = { items: RawCandidate[]; selected?: RawCandidate | null; onPick: (c: RawCandidate) => void; };

export default function CandidateSelector({ items, selected, onPick }: Props) {
  return (
    <div>
      <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--t2)", marginBottom: 12 }}>Select Candidate</h4>
      <div>
        {items.map(c => {
          const [bg, fg] = avColor(c.name ?? "?");
          const chosen = selected?.id === c.id;
          return (
            <button key={c.id} className={`sch-pick-item${chosen ? " chosen" : ""}`} onClick={() => onPick(c)}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="sch-pick-av" style={{ background: bg, color: fg }}>{ini(c.name ?? "?")}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: chosen ? "var(--accent)" : "var(--t1)" }}>{c.name ?? "Unknown"}</div>
                  <div style={{ fontSize: 11, color: "var(--t2)" }}>{(c as any).job_title ?? (c as any).role ?? "—"}</div>
                  {c.email && <div style={{ fontSize: 10, color: "var(--t3)" }}>{c.email}</div>}
                  {(c as any).resume_path && <div style={{ fontSize: 10, color: "var(--green)", marginTop: 2 }}>📄 Resume available</div>}
                </div>
              </div>
              {chosen && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>}
            </button>
          );
        })}
      </div>
    </div>
  );
}