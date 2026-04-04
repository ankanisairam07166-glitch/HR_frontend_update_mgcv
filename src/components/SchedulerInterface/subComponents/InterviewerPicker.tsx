// "use client";
// import React from "react";

// export type Interviewer = { id: number; name: string; role: string; checked: boolean };

// type Props = {
//   items: Interviewer[];
//   onToggle: (id: number) => void;
// };

// export default function InterviewerPicker({ items, onToggle }: Props) {
//   return (
//     <div>
//       <h4 className="mb-3 font-medium text-gray-700">Interviewers</h4>
//       <div className="font-medium text-gray-700 space-y-2">
//         {items.map((it) => (
//           <div
//             key={it.id}
//             className="flex items-center justify-between rounded-md border border-gray-500 p-3"
//           >
//             <div className="flex items-center">
//               <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 text-white">
//                 {it.name.charAt(0)}
//               </div>
//               <div>
//                 <div className="font-medium">{it.name}</div>
//                 <div className="text-sm text-gray-500">{it.role}</div>
//               </div>
//             </div>
//             <input
//               type="checkbox"
//               className="h-4 w-4 rounded border-gray-300 text-blue-600"
//               checked={it.checked}
//               onChange={() => onToggle(it.id)}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";
import React from "react";

export type Interviewer = { id:number; name:string; role:string; checked:boolean };
type Props = { items:Interviewer[]; onToggle:(id:number)=>void; };

export default function InterviewerPicker({ items, onToggle }: Props) {
  return (
    <div>
      <h4 style={{fontSize:13,fontWeight:600,color:"var(--t2)",marginBottom:12}}>Interviewers</h4>
      <div>
        {items.map(it=>(
          <div key={it.id} className="sch-iv-item">
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div className="sch-iv-av">{it.name.charAt(0)}</div>
              <div>
                <div style={{fontSize:13,fontWeight:500,color:"var(--t1)"}}>{it.name}</div>
                <div style={{fontSize:11,color:"var(--t2)"}}>{it.role}</div>
              </div>
            </div>
            <input type="checkbox" style={{width:16,height:16,accentColor:"var(--accent)",cursor:"pointer"}} checked={it.checked} onChange={()=>onToggle(it.id)}/>
          </div>
        ))}
      </div>
    </div>
  );
}