// import React from "react";

// const CandidateListSkeleton: React.FC = () => {
//   return (
//     <div className="p-4 space-y-4">
//       {[...Array(5)].map((_, index) => (
//         <div key={index} className="animate-pulse flex space-x-4">
//           <div className="rounded-full bg-gray-200 h-10 w-10 flex-shrink-0" />
//           <div className="flex-1 space-y-2 py-1">
//             <div className="h-4 bg-gray-200 rounded w-3/4" />
//             <div className="h-3 bg-gray-200 rounded w-1/2" />
//             <div className="h-2 bg-gray-200 rounded w-2/3" />
//           </div>
//           <div className="flex flex-col items-end space-y-2">
//             <div className="h-6 w-12 bg-gray-200 rounded" />
//             <div className="h-6 w-24 bg-gray-200 rounded-full" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CandidateListSkeleton;
import React from "react";

const CandidateListSkeleton: React.FC = () => (
  <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
    <style>{`
      @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
      .skel-cs { background:linear-gradient(90deg,#f0f0f0 25%,#e4e4e4 50%,#f0f0f0 75%); background-size:400px 100%; animation:shimmer 1.3s infinite linear; border-radius:6px; }
    `}</style>
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"12px 10px", borderRadius:10, background:"#fff", border:"0.5px solid rgba(0,0,0,0.06)", marginBottom:2 }}>
        <div className="skel-cs" style={{ width:40, height:40, borderRadius:"50%", flexShrink:0 }} />
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:7, paddingTop:2 }}>
          <div className="skel-cs" style={{ height:13, width:"60%" }} />
          <div className="skel-cs" style={{ height:11, width:"45%" }} />
          <div className="skel-cs" style={{ height:10, width:"38%" }} />
          <div className="skel-cs" style={{ height:18, width:88, borderRadius:20 }} />
        </div>
        <div style={{ flexShrink:0, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
          <div className="skel-cs" style={{ height:24, width:40, borderRadius:6 }} />
          <div className="skel-cs" style={{ height:10, width:32 }} />
        </div>
      </div>
    ))}
  </div>
);

export default CandidateListSkeleton;