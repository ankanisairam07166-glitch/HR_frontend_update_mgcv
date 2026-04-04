// "use client";
// import React from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// type Props = {
//   selectedDate: Date;
//   onPrevMonth: () => void;
//   onNextMonth: () => void;
//   onPickDay: (day: number) => void;
// };

// export default function CalendarGrid({
//   selectedDate,
//   onPrevMonth,
//   onNextMonth,
//   onPickDay,
// }: Props) {
//   const daysInMonth = new Date(
//     selectedDate.getFullYear(),
//     selectedDate.getMonth() + 1,
//     0
//   ).getDate();
//   const firstDayOfMonth = new Date(
//     selectedDate.getFullYear(),
//     selectedDate.getMonth(),
//     1
//   ).getDay();
//   const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

//   const cells: React.ReactNode[] = [];

//   // headers
//   weekdays.forEach((d, i) =>
//     cells.push(
//       <div key={`wd-${i}`} className="py-2 text-center text-sm text-gray-700">
//         {d}
//       </div>
//     )
//   );

//   // blanks before first day
//   for (let i = 0; i < firstDayOfMonth; i++) {
//     cells.push(<div key={`blank-${i}`} className="border border-gray-100 p-2" />);
//   }

//   // days of month
//   for (let day = 1; day <= daysInMonth; day++) {
//     const today = new Date();
//     const isToday =
//       today.getDate() === day &&
//       today.getMonth() === selectedDate.getMonth() &&
//       today.getFullYear() === selectedDate.getFullYear();

//     const isSelected = selectedDate.getDate() === day;

//     cells.push(
//       <button
//         key={`day-${day}`}
//         onClick={() => onPickDay(day)}
//         className={[
//           "p-2 border border-gray-100 text-center hover:bg-blue-50 focus:outline-none",
//           isToday ? "bg-blue-50" : "",
//           isSelected ? "bg-blue-500 text-white hover:bg-blue-600" : "text-gray-800",
//         ].join(" ")}
//       >
//         <div className="text-sm">{day}</div>
//         {day % 3 === 0 && (
//           <div className="mx-auto mt-1 h-1 w-1 rounded-full bg-green-600" />
//         )}
//       </button>
//     );
//   }

//   return (
//     <div>
//       <div className="mb-4 flex items-center justify-between">
//         <button onClick={onPrevMonth} className="font-medium text-gray-400 rounded-md p-2 hover:bg-gray-100">
//           <ChevronLeft size={50} />
//         </button>
//         <div className="font-medium text-gray-900">
//           {selectedDate.toLocaleString("default", { month: "long", year: "numeric" })}
//         </div>
//         <button onClick={onNextMonth} className="font-medium text-gray-400 rounded-md p-2 hover:bg-gray-100">
//           <ChevronRight size={50} />
//         </button>
//       </div>

//       <div className="grid grid-cols-7 gap-1">{cells}</div>

//       <div className="mt-6 flex items-center text-sm text-gray-700">
//         <div className="mr-4 flex items-center">
//           <div className="mr-2 h-3 w-3 rounded-full bg-green-500" />
//           <span>Available slots</span>
//         </div>
//         <div className="flex items-center">
//           <div className="mr-2 h-3 w-3 rounded-full bg-blue-500" />
//           <span>Selected date</span>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React from "react";

type Props = {
  selectedDate: Date;
  onPrevMonth: ()=>void;
  onNextMonth: ()=>void;
  onPickDay: (day:number)=>void;
  interviewDates?: Set<string>;
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function CalendarGrid({ selectedDate, onPrevMonth, onNextMonth, onPickDay, interviewDates=new Set() }: Props) {
  const y=selectedDate.getFullYear(), m=selectedDate.getMonth();
  const daysInMonth=new Date(y,m+1,0).getDate();
  const firstDay=new Date(y,m,1).getDay();
  const today=new Date().toDateString();

  const cells:React.ReactNode[]=["Su","Mo","Tu","We","Th","Fr","Sa"].map((d,i)=>(
    <div key={"h"+i} className="sch-cal-hdr">{d}</div>
  ));
  for(let i=0;i<firstDay;i++) cells.push(<div key={"b"+i} className="sch-cal-day disabled"/>);
  for(let d=1;d<=daysInMonth;d++){
    const dt=new Date(y,m,d); const ds=dt.toDateString();
    const isSel=selectedDate.getDate()===d;
    const isPast=dt<new Date()&&ds!==today;
    let cls="sch-cal-day";
    if(ds===today)cls+=" today";
    if(isSel)cls+=" selected";
    if(interviewDates.has(ds))cls+=" has-iv";
    if(isPast)cls+=" past";
    cells.push(<div key={"d"+d} className={cls} onClick={isPast?undefined:()=>onPickDay(d)}>{d}</div>);
  }

  return (
    <div className="sch-cal">
      <div className="sch-cal-head">
        <span className="sch-cal-month">{MONTHS[m]} {y}</span>
        <div className="sch-cal-nav">
          <button className="sch-cal-nav-btn" onClick={onPrevMonth}>‹</button>
          <button className="sch-cal-nav-btn" onClick={onNextMonth}>›</button>
        </div>
      </div>
      <div className="sch-cal-grid">{cells}</div>
      <div className="sch-cal-legend">
        <span><span className="sch-cal-dot" style={{background:"var(--green)"}}/>Interviews scheduled</span>
        <span><span className="sch-cal-dot" style={{background:"var(--accent)"}}/>Selected date</span>
      </div>
    </div>
  );
}
