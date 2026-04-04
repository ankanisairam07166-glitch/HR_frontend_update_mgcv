// "use client";
// import React from "react";
// import { Calendar } from "lucide-react";

// export default function InterviewSummary({ date, timeText, title, candidateName }: Props) {
//   const friendly = date.toLocaleDateString("en-US", {
//     weekday: "long",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
//       <div className="flex items-start">
//         <Calendar className="mr-3 mt-1 flex-shrink-0 text-blue-600" size={24} />
//         <div>
//           <h4 className="font-semibold text-gray-900">Interview Summary</h4>
//           <p className="mt-0.5 text-[15px] font-semibold text-gray-900">
//             {friendly} {timeText ? `at ${timeText}` : ""}
//           </p>

//           <div className="mt-3 grid grid-cols-2 gap-6 text-sm">
//             <div className="space-y-1">
//               <div className="text-gray-800">
//                 <span className="font-semibold text-gray-900">Position:</span>{" "}
//                 <span className="text-gray-900">{title ?? "—"}</span>
//               </div>
//               <div className="text-gray-800">
//                 <span className="font-semibold text-gray-900">Candidate:</span>{" "}
//                 <span className="text-gray-900">{candidateName ?? "—"}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React from "react";

interface Props { date:Date; timeText?:string; title?:string; candidateName?:string; }

export default function InterviewSummary({ date, timeText, title, candidateName }: Props) {
  const friendly=date.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});
  return (
    <div className="sch-summary" style={{marginBottom:16}}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      <div>
        <div style={{fontSize:12,fontWeight:600,color:"var(--t2)",marginBottom:4}}>Interview Summary</div>
        <div style={{fontSize:15,fontWeight:600,color:"var(--t1)"}}>{friendly}{timeText?` at ${timeText}`:""}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
          <div style={{fontSize:13,color:"var(--t2)"}}><strong style={{color:"var(--t1)"}}>Position:</strong> {title||"—"}</div>
          <div style={{fontSize:13,color:"var(--t2)"}}><strong style={{color:"var(--t1)"}}>Candidate:</strong> {candidateName||"—"}</div>
        </div>
      </div>
    </div>
  );
}
