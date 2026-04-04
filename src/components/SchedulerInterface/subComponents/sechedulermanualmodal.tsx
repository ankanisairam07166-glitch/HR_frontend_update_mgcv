// "use client";
// import React, { useState } from "react";
// import type { Candidate } from "../SchedulerInterface";

// interface Props {
//   candidate: Candidate|null;
//   onClose: ()=>void;
//   onSave: (fields:any)=>void;
// }

// export default function ManualModal({ candidate:c, onClose, onSave }: Props) {
//   const today = new Date().toISOString().split("T")[0];
//   const [date,       setDate]       = useState(c?.interview_date?new Date(c.interview_date).toISOString().split("T")[0]:today);
//   const [time,       setTime]       = useState(c?.interview_date?new Date(c.interview_date).toTimeString().slice(0,5):"10:00");
//   const [type,       setType]       = useState(c?.interview_type||"video");
//   const [interviewer,setInterviewer]= useState(c?.interviewer||"");
//   const [link,       setLink]       = useState(c?.meeting_link||"");
//   const [duration,   setDuration]   = useState(String(c?.duration||60));
//   const [notes,      setNotes]      = useState("");

//   return (
//     <div className="sch-modal-bd" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
//       <div className="sch-modal">
//         <div className="sch-modal-head">
//           <span className="sch-modal-title">{c?`Schedule — ${c.name}`:"Schedule Interview"}</span>
//           <button className="sch-modal-close" onClick={onClose}>×</button>
//         </div>
//         <div className="sch-modal-body">
//           <div className="sch-form-grid">
//             <div className="sch-form-group"><label className="sch-form-label">Interview Date</label><input type="date" className="sch-form-input" min={today} value={date} onChange={e=>setDate(e.target.value)}/></div>
//             <div className="sch-form-group"><label className="sch-form-label">Interview Time</label><input type="time" className="sch-form-input" value={time} onChange={e=>setTime(e.target.value)}/></div>
//           </div>
//           <div className="sch-form-group"><label className="sch-form-label">Interview Type</label>
//             <select className="sch-form-select" value={type} onChange={e=>setType(e.target.value)}>
//               <option value="video">Video Call (Google Meet / Zoom)</option>
//               <option value="phone">Phone Interview</option>
//               <option value="onsite">On-site Interview</option>
//               <option value="technical">Technical Round</option>
//               <option value="hr">HR Round</option>
//               <option value="final">Final Round</option>
//             </select>
//           </div>
//           <div className="sch-form-group"><label className="sch-form-label">Interviewer(s)</label><input type="text" className="sch-form-input" placeholder="e.g. Priya Sharma, Ravi Kumar" value={interviewer} onChange={e=>setInterviewer(e.target.value)}/></div>
//           <div className="sch-form-group"><label className="sch-form-label">Meeting Link / Location</label><input type="text" className="sch-form-input" placeholder="https://meet.google.com/… or Office Room 201" value={link} onChange={e=>setLink(e.target.value)}/></div>
//           <div className="sch-form-group"><label className="sch-form-label">Duration</label>
//             <select className="sch-form-select" value={duration} onChange={e=>setDuration(e.target.value)}>
//               <option value="30">30 minutes</option>
//               <option value="45">45 minutes</option>
//               <option value="60">1 hour</option>
//               <option value="90">1.5 hours</option>
//               <option value="120">2 hours</option>
//             </select>
//           </div>
//           <div className="sch-form-group" style={{marginBottom:0}}><label className="sch-form-label">Notes (optional)</label><textarea className="sch-form-textarea" placeholder="Preparation instructions or notes…" value={notes} onChange={e=>setNotes(e.target.value)}/></div>
//         </div>
//         <div className="sch-modal-foot">
//           <button className="sch-btn" onClick={onClose}>Cancel</button>
//           <button className="sch-btn sch-btn-primary" onClick={()=>onSave({candId:c?.id,date,time,type,interviewer,link,duration,notes})}>Schedule Interview →</button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import type { Candidate } from "@/services/interfaces/sechedulerhelpers";

interface Props { candidate: Candidate | null; onClose: () => void; onSave: (fields: any) => void; }

export default function ManualModal({ candidate: c, onClose, onSave }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate]             = useState(c?.interview_date ? new Date(c.interview_date).toISOString().split("T")[0] : today);
  const [time, setTime]             = useState(c?.interview_date ? new Date(c.interview_date).toTimeString().slice(0, 5) : "10:00");
  const [type, setType]             = useState(c?.interview_type || "video");
  const [interviewer, setInterviewer] = useState(c?.interviewer || "");
  const [link, setLink]             = useState(c?.meeting_link || "");
  const [duration, setDuration]     = useState(String(c?.duration || 60));
  const [notes, setNotes]           = useState("");

  return (
    <div className="sch-modal-bd" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sch-modal">
        <div className="sch-modal-head">
          <span className="sch-modal-title">{c ? `Schedule — ${c.name}` : "Schedule Interview"}</span>
          <button className="sch-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="sch-modal-body">
          <div className="sch-form-grid">
            <div className="sch-form-group"><label className="sch-form-label">Interview Date</label><input type="date" className="sch-form-input" min={today} value={date} onChange={e => setDate(e.target.value)} /></div>
            <div className="sch-form-group"><label className="sch-form-label">Interview Time</label><input type="time" className="sch-form-input" value={time} onChange={e => setTime(e.target.value)} /></div>
          </div>
          <div className="sch-form-group"><label className="sch-form-label">Interview Type</label>
            <select className="sch-form-select" value={type} onChange={e => setType(e.target.value)}>
              <option value="video">Video Call (Google Meet / Zoom)</option>
              <option value="phone">Phone Interview</option>
              <option value="onsite">On-site Interview</option>
              <option value="technical">Technical Round</option>
              <option value="hr">HR Round</option>
              <option value="final">Final Round</option>
            </select>
          </div>
          <div className="sch-form-group"><label className="sch-form-label">Interviewer(s)</label><input type="text" className="sch-form-input" placeholder="e.g. Priya Sharma, Ravi Kumar" value={interviewer} onChange={e => setInterviewer(e.target.value)} /></div>
          <div className="sch-form-group"><label className="sch-form-label">Meeting Link / Location</label><input type="text" className="sch-form-input" placeholder="https://meet.google.com/… or Office Room 201" value={link} onChange={e => setLink(e.target.value)} /></div>
          <div className="sch-form-group"><label className="sch-form-label">Duration</label>
            <select className="sch-form-select" value={duration} onChange={e => setDuration(e.target.value)}>
              <option value="30">30 minutes</option><option value="45">45 minutes</option>
              <option value="60">1 hour</option><option value="90">1.5 hours</option><option value="120">2 hours</option>
            </select>
          </div>
          <div className="sch-form-group" style={{ marginBottom: 0 }}><label className="sch-form-label">Notes (optional)</label><textarea className="sch-form-textarea" placeholder="Preparation instructions or notes…" value={notes} onChange={e => setNotes(e.target.value)} /></div>
        </div>
        <div className="sch-modal-foot">
          <button className="sch-btn" onClick={onClose}>Cancel</button>
          <button className="sch-btn sch-btn-primary" onClick={() => onSave({ candId: c?.id, date, time, type, interviewer, link, duration, notes })}>Schedule Interview →</button>
        </div>
      </div>
    </div>
  );
}