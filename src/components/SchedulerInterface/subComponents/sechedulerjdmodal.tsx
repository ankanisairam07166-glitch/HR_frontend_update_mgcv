"use client";
import React from "react";

interface Props { value:string; onChange:(v:string)=>void; onClose:()=>void; }

export default function JDModal({ value, onChange, onClose }: Props) {
  return (
    <div className="sch-modal-bd" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="sch-modal" style={{maxWidth:600}}>
        <div className="sch-modal-head">
          <span className="sch-modal-title">Add / Edit Job Description</span>
          <button className="sch-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="sch-modal-body">
          <div className="sch-form-group" style={{marginBottom:0}}>
            <label className="sch-form-label">Job Description</label>
            <textarea className="sch-jd-textarea" placeholder="Enter detailed job description…" value={value} onChange={e=>onChange(e.target.value)}/>
          </div>
        </div>
        <div className="sch-modal-foot">
          <button className="sch-btn" onClick={onClose}>Cancel</button>
          <button className="sch-btn sch-btn-primary" onClick={onClose}>Save Job Description</button>
        </div>
      </div>
    </div>
  );
}