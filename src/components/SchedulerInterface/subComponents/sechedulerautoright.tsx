// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React from "react";
// import { avColor, ini, sbColor, friendlyDate, slotToDate, MORNING, AFTERNOON } from "../SchedulerInterface";
// import type { Candidate, Interviewer, Slot } from "../SchedulerInterface";

// const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// interface Props {
//   candidate: Candidate;
//   candidates: Candidate[];
//   autoStep: 1|2|3; setAutoStep:(s:1|2|3)=>void;
//   autoDate: Date; setAutoDate:(d:Date)=>void;
//   autoSlot: Slot|null; setAutoSlot:(s:Slot|null)=>void;
//   autoCandidate: Candidate|null; setAutoCandidate:(c:Candidate|null)=>void;
//   interviewers: Interviewer[]; setInterviewers:(ivs:Interviewer[])=>void;
//   autoMethod: "video"|"onsite"; setAutoMethod:(m:"video"|"onsite")=>void;
//   jobDesc: string;
//   autoResult: any;
//   scheduling: boolean;
//   onSubmit: ()=>void;
//   onOpenJD: ()=>void;
// }

// export default function AutoRight(p: Props) {
//   const { autoStep, setAutoStep, autoDate, setAutoDate, autoSlot, setAutoSlot, autoCandidate, setAutoCandidate, interviewers, setInterviewers, autoMethod, setAutoMethod, jobDesc, autoResult, scheduling, onSubmit, onOpenJD, candidates } = p;

//   const stepBar = () => (
//     <div className="sch-step-bar">
//       {[["Select Date",1],["Select Time",2],["Confirm",3]].map(([lbl,n])=>{
//         const cls = autoStep>Number(n)?"done":autoStep===Number(n)?"active":"inactive";
//         return (
//           <div key={n} className={`sch-step-item ${cls}`} style={{cursor:Number(n)<autoStep?"pointer":"default"}} onClick={()=>{if(Number(n)<autoStep)setAutoStep(Number(n) as any)}}>
//             <div className="sch-step-num">{autoStep>Number(n)?"✓":n}</div>
//             <span className="sch-step-lbl">{lbl}</span>
//           </div>
//         );
//       })}
//     </div>
//   );

//   // Step 1 — Calendar
//   const step1 = () => {
//     const y=autoDate.getFullYear(),m=autoDate.getMonth();
//     const ivDates=new Set(candidates.filter(c=>c.interview_date).map(c=>new Date(c.interview_date!).toDateString()));
//     const first=new Date(y,m,1),last=new Date(y,m+1,0);
//     const today=new Date().toDateString();
//     const days:React.ReactNode[]=["Su","Mo","Tu","We","Th","Fr","Sa"].map((d,i)=>(<div key={"h"+i} className="sch-cal-hdr">{d}</div>));
//     for(let i=0;i<first.getDay();i++) days.push(<div key={"b"+i} className="sch-cal-day disabled"/>);
//     for(let d=1;d<=last.getDate();d++){
//       const dt=new Date(y,m,d);const ds=dt.toDateString();
//       const isSel=autoDate.getDate()===d&&autoDate.getMonth()===m&&autoDate.getFullYear()===y;
//       const isPast=dt<new Date()&&ds!==today;
//       let cls="sch-cal-day";
//       if(ds===today)cls+=" today";
//       if(isSel)cls+=" selected";
//       if(ivDates.has(ds))cls+=" has-iv";
//       if(isPast)cls+=" past";
//       const click=isPast?undefined:()=>{setAutoDate(new Date(y,m,d));setAutoStep(2);};
//       days.push(<div key={"d"+d} className={cls} onClick={click}>{d}</div>);
//     }
//     return (
//       <div className="sch-cal">
//         <div className="sch-cal-head">
//           <span className="sch-cal-month">{MONTHS[m]} {y}</span>
//           <div className="sch-cal-nav">
//             <button className="sch-cal-nav-btn" onClick={()=>setAutoDate(new Date(y,m-1,1))}>‹</button>
//             <button className="sch-cal-nav-btn" onClick={()=>setAutoDate(new Date(y,m+1,1))}>›</button>
//           </div>
//         </div>
//         <div className="sch-cal-grid">{days}</div>
//         <div className="sch-cal-legend">
//           <span><span className="sch-cal-dot" style={{background:"var(--green)"}}/>Interviews scheduled</span>
//           <span><span className="sch-cal-dot" style={{background:"var(--accent)"}}/>Selected date</span>
//         </div>
//       </div>
//     );
//   };

//   // Step 2 — Time slots
//   const step2 = () => {
//     const slotBtn = (s: Slot) => {
//       const isSel=autoSlot?.id===s.id;
//       let cls="sch-slot";
//       if(!s.available)cls+=" taken"; else if(isSel)cls+=" selected";
//       return (
//         <button key={s.id} className={cls} disabled={!s.available} onClick={()=>{if(s.available){setAutoSlot(s);setAutoStep(3);}}}>
//           <span className="sch-slot-time">
//             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
//             {s.time}
//           </span>
//           {!s.available
//             ? <span style={{fontSize:10,color:"var(--t3)"}}>Taken</span>
//             : <span className="sch-slot-tag">{isSel?"Selected":"Available"}</span>
//           }
//         </button>
//       );
//     };
//     return (
//       <>
//         <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
//           <button className="sch-btn-ghost" onClick={()=>setAutoStep(1)} style={{display:"flex",alignItems:"center",gap:4,padding:"6px 0"}}>
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
//             Back to calendar
//           </button>
//         </div>
//         <div style={{fontSize:14,fontWeight:600,color:"var(--t1)",marginBottom:14}}>Select a time on <strong>{friendlyDate(autoDate)}</strong></div>
//         <div className="sch-slots-grid">
//           <div><div className="sch-slots-title">Morning</div>{MORNING.map(slotBtn)}</div>
//           <div><div className="sch-slots-title">Afternoon</div>{AFTERNOON.map(slotBtn)}</div>
//         </div>
//       </>
//     );
//   };

//   // Step 3 — Confirm
//   const step3 = () => {
//     const eligible = candidates.filter(c=>c.exam_completed||c.interview_status==="pending");
//     return (
//       <>
//         {/* Summary */}
//         <div className="sch-summary">
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
//           <div style={{flex:1}}>
//             <div style={{fontSize:12,fontWeight:600,color:"var(--t2)",marginBottom:4}}>Interview Summary</div>
//             <div style={{fontSize:15,fontWeight:600,color:"var(--t1)",marginBottom:8}}>{friendlyDate(autoDate)}{autoSlot?" at "+autoSlot.time:""}</div>
//             <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
//               <div style={{fontSize:13,color:"var(--t2)"}}><strong style={{color:"var(--t1)"}}>Position:</strong> {autoCandidate?.job_title||"—"}</div>
//               <div style={{fontSize:13,color:"var(--t2)"}}><strong style={{color:"var(--t1)"}}>Candidate:</strong> {autoCandidate?.name||"—"}</div>
//             </div>
//           </div>
//         </div>

//         <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
//           {/* Candidate selector */}
//           <div className="sch-card">
//             <div className="sch-card-head"><span className="sch-card-title">Candidate</span></div>
//             <div style={{padding:12}}>
//               {eligible.map(x=>{
//                 const [bg,fg]=avColor(x.name);
//                 const chosen=autoCandidate?.id===x.id;
//                 return (
//                   <button key={x.id} className={`sch-pick-item${chosen?" chosen":""}`} onClick={()=>setAutoCandidate(x)}>
//                     <div style={{display:"flex",alignItems:"center",gap:10}}>
//                       <div className="sch-pick-av" style={{background:bg,color:fg}}>{ini(x.name)}</div>
//                       <div>
//                         <div style={{fontSize:13,fontWeight:600,color:chosen?"var(--accent)":"var(--t1)"}}>{x.name}</div>
//                         <div style={{fontSize:11,color:"var(--t2)"}}>{x.job_title||"—"}</div>
//                         <div style={{fontSize:10,color:"var(--t3)"}}>{x.email}</div>
//                         {x.resume_path&&<div style={{fontSize:10,color:"var(--green)",marginTop:2}}>📄 Resume available</div>}
//                       </div>
//                     </div>
//                     {chosen&&<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Interviewers */}
//           <div className="sch-card">
//             <div className="sch-card-head"><span className="sch-card-title">Interviewers</span></div>
//             <div style={{padding:12}}>
//               {interviewers.map(it=>(
//                 <div key={it.id} className="sch-iv-item">
//                   <div style={{display:"flex",alignItems:"center",gap:10}}>
//                     <div className="sch-iv-av">{it.name.charAt(0)}</div>
//                     <div>
//                       <div style={{fontSize:13,fontWeight:500,color:"var(--t1)"}}>{it.name}</div>
//                       <div style={{fontSize:11,color:"var(--t2)"}}>{it.role}</div>
//                     </div>
//                   </div>
//                   <input type="checkbox" style={{width:16,height:16,accentColor:"var(--accent)",cursor:"pointer"}} checked={it.checked} onChange={()=>setInterviewers(interviewers.map(i=>i.id===it.id?{...i,checked:!i.checked}:i))}/>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Job Description */}
//         <div className="sch-card">
//           <div className="sch-card-head">
//             <span className="sch-card-title">Job Description (Optional)</span>
//             <button className="sch-btn-ghost" onClick={onOpenJD}>📄 {jobDesc?"Edit":"Add"} JD</button>
//           </div>
//           <div style={{padding:12}}>
//             <div className="sch-jd-box">
//               {jobDesc?jobDesc.slice(0,160)+(jobDesc.length>160?"…":""):<em style={{color:"var(--t3)"}}>No job description — system will use generic description or candidate profile.</em>}
//             </div>
//           </div>
//         </div>

//         {/* Method */}
//         <div className="sch-card">
//           <div className="sch-card-head"><span className="sch-card-title">Interview Method</span></div>
//           <div style={{padding:12,display:"flex",gap:10}}>
//             {([["video","AI-Powered Video Interview","Secure interview link sent automatically to candidate email","✓ Knowledge base created from resume\n✓ Job description auto-used\n✓ Email confirmation sent"],["onsite","In-Person Interview","Office location details shared with candidate",""]] as const).map(([key,title,sub,checks])=>{
//               const sel=autoMethod===key;
//               return (
//                 <div key={key} className={`sch-method${sel?" selected-method":""}`} onClick={()=>setAutoMethod(key as any)}>
//                   <div className="sch-method-ic" style={{background:sel?"var(--accent-l)":"var(--bg)"}}>
//                     {key==="video"
//                       ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={sel?"var(--accent)":"var(--t2)"} strokeWidth="2" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
//                       : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={sel?"var(--accent)":"var(--t2)"} strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
//                     }
//                   </div>
//                   <div style={{fontSize:13,fontWeight:600,color:"var(--t1)",marginBottom:3}}>{title}</div>
//                   <div style={{fontSize:11,color:"var(--t2)",lineHeight:1.5}}>{sub}</div>
//                   {checks&&<div style={{fontSize:11,color:"var(--green)",marginTop:5,whiteSpace:"pre-line"}}>{checks}</div>}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Result */}
//         {autoResult&&<ResultCard result={autoResult}/>}

//         {/* Actions */}
//         <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
//           <button className="sch-btn" onClick={()=>setAutoStep(1)}>Cancel</button>
//           <button className="sch-btn sch-btn-primary" onClick={onSubmit} disabled={!autoCandidate||!autoSlot||scheduling}>
//             {scheduling?<><span className="sch-spinner"/>Scheduling…</>:"⚡ Schedule Interview"}
//           </button>
//         </div>
//       </>
//     );
//   };

//   return (
//     <div style={{padding:20,display:"flex",flexDirection:"column",gap:14}}>
//       {stepBar()}
//       {autoStep===1&&step1()}
//       {autoStep===2&&step2()}
//       {autoStep===3&&step3()}
//     </div>
//   );
// }

// function ResultCard({ result }: { result: any }) {
//   const isOk=result.success, isExisting=result.already_scheduled;
//   const cls=!isOk?"error":isExisting?"exists":"success";
//   const color=isOk?(isExisting?"var(--amber)":"var(--green)"):"var(--red)";
//   const title=!isOk?"Scheduling Failed":isExisting?"Already Scheduled":"Interview Scheduled!";
//   return (
//     <div className={`sch-result ${cls}`}>
//       <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
//         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
//           {isOk?<polyline points="20 6 9 17 4 12"/>:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}
//         </svg>
//         <span style={{fontSize:14,fontWeight:600,color}}>{title}</span>
//       </div>
//       {result.interview_link&&<div style={{fontSize:12,wordBreak:"break-all",marginTop:6}}>🔗 <a href={result.interview_link} target="_blank" rel="noreferrer" style={{color:"var(--accent)"}}>{result.interview_link}</a></div>}
//       <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:10}}>
//         {result.email_sent!==undefined&&<span style={{fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:20,background:result.email_sent?"var(--green-l)":"var(--red-l)",color:result.email_sent?"var(--green)":"var(--red)"}}>{result.email_sent?"✓ Email sent":"✗ Email failed"}</span>}
//         {result.resume_extracted!==undefined&&<span style={{fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:20,background:"var(--green-l)",color:"var(--green)"}}>{result.resume_extracted?"✓ Resume extracted":"Resume pending"}</span>}
//         {result.knowledge_base_id&&<span style={{fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:20,background:"var(--purple-l)",color:"var(--purple)"}}>KB: {result.knowledge_base_id}</span>}
//       </div>
//       {result.message&&<p style={{fontSize:12,color:"var(--t2)",marginTop:8}}>{result.message}</p>}
//     </div>
//   );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { avColor, ini, sbColor, friendlyDate, slotToDate, MORNING, AFTERNOON } from "@/services/interfaces/sechedulerhelpers";
import type { Candidate, Interviewer, Slot } from "@/services/interfaces/sechedulerhelpers";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

interface Props {
  candidate: Candidate; candidates: Candidate[];
  autoStep: 1|2|3; setAutoStep: (s:1|2|3)=>void;
  autoDate: Date; setAutoDate: (d:Date)=>void;
  autoSlot: Slot|null; setAutoSlot: (s:Slot|null)=>void;
  autoCandidate: Candidate|null; setAutoCandidate: (c:Candidate|null)=>void;
  interviewers: Interviewer[]; setInterviewers: (ivs:Interviewer[])=>void;
  autoMethod: "video"|"onsite"; setAutoMethod: (m:"video"|"onsite")=>void;
  jobDesc: string; autoResult: any; scheduling: boolean;
  onSubmit: ()=>void; onOpenJD: ()=>void;
}

export default function AutoRight(p: Props) {
  const { autoStep, setAutoStep, autoDate, setAutoDate, autoSlot, setAutoSlot, autoCandidate, setAutoCandidate, interviewers, setInterviewers, autoMethod, setAutoMethod, jobDesc, autoResult, scheduling, onSubmit, onOpenJD, candidates } = p;

  const stepBar = () => (
    <div className="sch-step-bar">
      {[["Select Date",1],["Select Time",2],["Confirm",3]].map(([lbl,n])=>{
        const cls = autoStep>Number(n)?"done":autoStep===Number(n)?"active":"inactive";
        return (
          <div key={n} className={`sch-step-item ${cls}`} style={{cursor:Number(n)<autoStep?"pointer":"default"}} onClick={()=>{if(Number(n)<autoStep)setAutoStep(Number(n) as any)}}>
            <div className="sch-step-num">{autoStep>Number(n)?"✓":n}</div>
            <span className="sch-step-lbl">{lbl}</span>
          </div>
        );
      })}
    </div>
  );

  const step1 = () => {
    const y=autoDate.getFullYear(),m=autoDate.getMonth();
    const ivDates=new Set(candidates.filter(c=>c.interview_date).map(c=>new Date(c.interview_date!).toDateString()));
    const first=new Date(y,m,1),last=new Date(y,m+1,0);
    const today=new Date().toDateString();
    const days:React.ReactNode[]=["Su","Mo","Tu","We","Th","Fr","Sa"].map((d,i)=>(<div key={"h"+i} className="sch-cal-hdr">{d}</div>));
    for(let i=0;i<first.getDay();i++) days.push(<div key={"b"+i} className="sch-cal-day disabled"/>);
    for(let d=1;d<=last.getDate();d++){
      const dt=new Date(y,m,d);const ds=dt.toDateString();
      const isSel=autoDate.getDate()===d&&autoDate.getMonth()===m&&autoDate.getFullYear()===y;
      const isPast=dt<new Date()&&ds!==today;
      let cls="sch-cal-day";
      if(ds===today)cls+=" today"; if(isSel)cls+=" selected"; if(ivDates.has(ds))cls+=" has-iv"; if(isPast)cls+=" past";
      days.push(<div key={"d"+d} className={cls} onClick={isPast?undefined:()=>{setAutoDate(new Date(y,m,d));setAutoStep(2);}}>{d}</div>);
    }
    return (
      <div className="sch-cal">
        <div className="sch-cal-head">
          <span className="sch-cal-month">{MONTHS[m]} {y}</span>
          <div className="sch-cal-nav">
            <button className="sch-cal-nav-btn" onClick={()=>setAutoDate(new Date(y,m-1,1))}>‹</button>
            <button className="sch-cal-nav-btn" onClick={()=>setAutoDate(new Date(y,m+1,1))}>›</button>
          </div>
        </div>
        <div className="sch-cal-grid">{days}</div>
        <div className="sch-cal-legend">
          <span><span className="sch-cal-dot" style={{background:"var(--green)"}}/>Interviews scheduled</span>
          <span><span className="sch-cal-dot" style={{background:"var(--accent)"}}/>Selected date</span>
        </div>
      </div>
    );
  };

  const step2 = () => {
    const slotBtn = (s: Slot) => {
      const isSel=autoSlot?.id===s.id;
      let cls="sch-slot";
      if(!s.available)cls+=" taken"; else if(isSel)cls+=" selected";
      return (
        <button key={s.id} className={cls} disabled={!s.available} onClick={()=>{if(s.available){setAutoSlot(s);setAutoStep(3);}}}>
          <span className="sch-slot-time">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {s.time}
          </span>
          {!s.available?<span style={{fontSize:10,color:"var(--t3)"}}>Taken</span>:<span className="sch-slot-tag">{isSel?"Selected":"Available"}</span>}
        </button>
      );
    };
    return (
      <>
        <button className="sch-btn-ghost" onClick={()=>setAutoStep(1)} style={{display:"flex",alignItems:"center",gap:4,padding:"6px 0",marginBottom:14}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back to calendar
        </button>
        <div style={{fontSize:14,fontWeight:600,color:"var(--t1)",marginBottom:14}}>Select a time on <strong>{friendlyDate(autoDate)}</strong></div>
        <div className="sch-slots-grid">
          <div><div className="sch-slots-title">Morning</div>{MORNING.map(slotBtn)}</div>
          <div><div className="sch-slots-title">Afternoon</div>{AFTERNOON.map(slotBtn)}</div>
        </div>
      </>
    );
  };

  const step3 = () => {
    const eligible = candidates.filter(c=>c.exam_completed||c.interview_status==="pending");
    return (
      <>
        <div className="sch-summary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:600,color:"var(--t2)",marginBottom:4}}>Interview Summary</div>
            <div style={{fontSize:15,fontWeight:600,color:"var(--t1)",marginBottom:8}}>{friendlyDate(autoDate)}{autoSlot?" at "+autoSlot.time:""}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div style={{fontSize:13,color:"var(--t2)"}}><strong style={{color:"var(--t1)"}}>Position:</strong> {autoCandidate?.job_title||"—"}</div>
              <div style={{fontSize:13,color:"var(--t2)"}}><strong style={{color:"var(--t1)"}}>Candidate:</strong> {autoCandidate?.name||"—"}</div>
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div className="sch-card">
            <div className="sch-card-head"><span className="sch-card-title">Candidate</span></div>
            <div style={{padding:12}}>
              {eligible.map(x=>{
                const [bg,fg]=avColor(x.name); const chosen=autoCandidate?.id===x.id;
                return (
                  <button key={x.id} className={`sch-pick-item${chosen?" chosen":""}`} onClick={()=>setAutoCandidate(x)}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div className="sch-pick-av" style={{background:bg,color:fg}}>{ini(x.name)}</div>
                      <div>
                        <div style={{fontSize:13,fontWeight:600,color:chosen?"var(--accent)":"var(--t1)"}}>{x.name}</div>
                        <div style={{fontSize:11,color:"var(--t2)"}}>{x.job_title||"—"}</div>
                        <div style={{fontSize:10,color:"var(--t3)"}}>{x.email}</div>
                        {x.resume_path&&<div style={{fontSize:10,color:"var(--green)",marginTop:2}}>📄 Resume available</div>}
                      </div>
                    </div>
                    {chosen&&<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="sch-card">
            <div className="sch-card-head"><span className="sch-card-title">Interviewers</span></div>
            <div style={{padding:12}}>
              {interviewers.map(it=>(
                <div key={it.id} className="sch-iv-item">
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div className="sch-iv-av">{it.name.charAt(0)}</div>
                    <div><div style={{fontSize:13,fontWeight:500,color:"var(--t1)"}}>{it.name}</div><div style={{fontSize:11,color:"var(--t2)"}}>{it.role}</div></div>
                  </div>
                  <input type="checkbox" style={{width:16,height:16,accentColor:"var(--accent)",cursor:"pointer"}} checked={it.checked} onChange={()=>setInterviewers(interviewers.map(i=>i.id===it.id?{...i,checked:!i.checked}:i))}/>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sch-card">
          <div className="sch-card-head">
            <span className="sch-card-title">Job Description (Optional)</span>
            <button className="sch-btn-ghost" onClick={onOpenJD}>📄 {jobDesc?"Edit":"Add"} JD</button>
          </div>
          <div style={{padding:12}}>
            <div className="sch-jd-box">{jobDesc?jobDesc.slice(0,160)+(jobDesc.length>160?"…":""):<em style={{color:"var(--t3)"}}>No job description — system will use generic description or candidate profile.</em>}</div>
          </div>
        </div>
        <div className="sch-card">
          <div className="sch-card-head"><span className="sch-card-title">Interview Method</span></div>
          <div style={{padding:12,display:"flex",gap:10}}>
            {([["video","AI-Powered Video Interview","Secure interview link sent automatically","✓ Knowledge base created from resume\n✓ Job description auto-used\n✓ Email confirmation sent"],["onsite","In-Person Interview","Office location details shared with candidate",""]] as const).map(([key,title,sub,checks])=>{
              const sel=autoMethod===key;
              return (
                <div key={key} className={`sch-method${sel?" selected-method":""}`} onClick={()=>setAutoMethod(key as any)}>
                  <div className="sch-method-ic" style={{background:sel?"var(--accent-l)":"var(--bg)"}}>
                    {key==="video"?<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={sel?"var(--accent)":"var(--t2)"} strokeWidth="2" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={sel?"var(--accent)":"var(--t2)"} strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                  </div>
                  <div style={{fontSize:13,fontWeight:600,color:"var(--t1)",marginBottom:3}}>{title}</div>
                  <div style={{fontSize:11,color:"var(--t2)",lineHeight:1.5}}>{sub}</div>
                  {checks&&<div style={{fontSize:11,color:"var(--green)",marginTop:5,whiteSpace:"pre-line"}}>{checks}</div>}
                </div>
              );
            })}
          </div>
        </div>
        {autoResult&&<ResultCard result={autoResult}/>}
        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
          <button className="sch-btn" onClick={()=>setAutoStep(1)}>Cancel</button>
          <button className="sch-btn sch-btn-primary" onClick={onSubmit} disabled={!autoCandidate||!autoSlot||scheduling}>
            {scheduling?<><span className="sch-spinner"/>Scheduling…</>:"⚡ Schedule Interview"}
          </button>
        </div>
      </>
    );
  };

  return (
    <div style={{padding:20,display:"flex",flexDirection:"column",gap:14}}>
      {stepBar()}
      {autoStep===1&&step1()}
      {autoStep===2&&step2()}
      {autoStep===3&&step3()}
    </div>
  );
}

function ResultCard({ result }: { result: any }) {
  const isOk=result.success,isExisting=result.already_scheduled;
  const color=isOk?(isExisting?"var(--amber)":"var(--green)"):"var(--red)";
  const title=!isOk?"Scheduling Failed":isExisting?"Already Scheduled":"Interview Scheduled!";
  return (
    <div className={`sch-result ${!isOk?"error":isExisting?"exists":"success"}`}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
          {isOk?<polyline points="20 6 9 17 4 12"/>:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}
        </svg>
        <span style={{fontSize:14,fontWeight:600,color}}>{title}</span>
      </div>
      {result.interview_link&&<div style={{fontSize:12,wordBreak:"break-all",marginTop:6}}>🔗 <a href={result.interview_link} target="_blank" rel="noreferrer" style={{color:"var(--accent)"}}>{result.interview_link}</a></div>}
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:10}}>
        {result.email_sent!==undefined&&<span style={{fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:20,background:result.email_sent?"var(--green-l)":"var(--red-l)",color:result.email_sent?"var(--green)":"var(--red)"}}>{result.email_sent?"✓ Email sent":"✗ Email failed"}</span>}
        {result.resume_extracted!==undefined&&<span style={{fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:20,background:"var(--green-l)",color:"var(--green)"}}>{result.resume_extracted?"✓ Resume extracted":"Resume pending"}</span>}
        {result.knowledge_base_id&&<span style={{fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:20,background:"var(--purple-l)",color:"var(--purple)"}}>KB: {result.knowledge_base_id}</span>}
      </div>
      {result.message&&<p style={{fontSize:12,color:"var(--t2)",marginTop:8}}>{result.message}</p>}
    </div>
  );
}