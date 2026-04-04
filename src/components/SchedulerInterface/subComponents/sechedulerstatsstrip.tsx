"use client";
import React from "react";

interface Props { stats: { total:number; today:number; week:number; pending:number } }

export default function StatsStrip({ stats }: Props) {
  const cards = [
    { lbl:"Total Scheduled", val:stats.total,   sub:"All time interviews",  bar:"var(--accent)"  },
    { lbl:"Today",           val:stats.today,   sub:"Interviews today",     bar:"var(--green)"   },
    { lbl:"This Week",       val:stats.week,    sub:"Scheduled this week",  bar:"var(--amber)"   },
    { lbl:"Pending",         val:stats.pending, sub:"Awaiting schedule",    bar:"var(--purple)"  },
  ];
  return (
    <div className="sch-stats">
      {cards.map(c => (
        <div key={c.lbl} className="sch-stat">
          <div className="sch-stat-bar" style={{background:c.bar}} />
          <div className="sch-stat-lbl">{c.lbl}</div>
          <div className="sch-stat-val">{c.val}</div>
          <div className="sch-stat-sub">{c.sub}</div>
        </div>
      ))}
    </div>
  );
}