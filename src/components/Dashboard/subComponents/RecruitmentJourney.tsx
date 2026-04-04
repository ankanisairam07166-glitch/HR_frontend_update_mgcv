// // import React from "react";

// // // ── Props ─────────────────────────────────────────────────────────────────────
// // type Props = {
// //   /** 0-indexed active step, computed from live Redux data */
// //   currentStep: number;
// //   onStepClick?: (route: string, index: number) => void;
// // };

// // // ── Step icons (always shown — no tick ever replaces them) ────────────────────
// // const STEPS = [
// //   {
// //     label: "Dashboard",
// //     sublabel: "Recruitment overview",
// //     route: "/dashboard",
// //     icon: (
// //       <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
// //         <path
// //           d="M16 3L3 14h4v13h7v-7h4v7h7V14h4L16 3z"
// //           fill="#6366f1"
// //           fillOpacity={0.18}
// //           stroke="#6366f1"
// //           strokeWidth="1.7"
// //           strokeLinejoin="round"
// //         />
// //         <rect x="12" y="20" width="8" height="7" rx="1" fill="#6366f1" fillOpacity={0.4} />
// //       </svg>
// //     ),
// //   },
// //   {
// //     label: "Job & Candidates",
// //     sublabel: "Post role · Build profile",
// //     route: "/jobs",
// //     icon: (
// //       <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
// //         <rect x="5" y="7" width="22" height="18" rx="2.5" fill="#8b5cf6" fillOpacity={0.13} stroke="#8b5cf6" strokeWidth="1.7" />
// //         <path d="M11 7V5a2 2 0 014 0v2M17 7V5a2 2 0 014 0v2" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
// //         <path d="M9 15h14M9 19h8" stroke="#8b5cf6" strokeWidth="1.6" strokeLinecap="round" />
// //       </svg>
// //     ),
// //   },
// //   {
// //     label: "Assessment Creation",
// //     sublabel: "Build test & questions",
// //     route: "/assessments",
// //     icon: (
// //       <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
// //         <rect x="5" y="5" width="22" height="22" rx="2.5" fill="#a855f7" fillOpacity={0.12} stroke="#a855f7" strokeWidth="1.7" />
// //         <path d="M10 12h12M10 16h8M10 20h10" stroke="#a855f7" strokeWidth="1.6" strokeLinecap="round" />
// //         <path d="M22 8l2 2-6 6-3 1 1-3 6-6z" fill="#a855f7" fillOpacity={0.65} stroke="#a855f7" strokeWidth="0.8" />
// //       </svg>
// //     ),
// //   },
// //   {
// //     label: "ATS Checking",
// //     sublabel: "AI resume screening",
// //     route: "/candidates",
// //     icon: (
// //       <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
// //         <rect x="4" y="8" width="24" height="16" rx="2.5" fill="#ec4899" fillOpacity={0.1} stroke="#ec4899" strokeWidth="1.7" />
// //         <circle cx="16" cy="16" r="4" stroke="#ec4899" strokeWidth="1.6" fill="#ec4899" fillOpacity={0.15} />
// //         <path d="M16 13.5V16l2 2" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
// //         <path d="M7 12l2 1.5M25 12l-2 1.5M7 20l2-1.5M25 20l-2-1.5" stroke="#ec4899" strokeWidth="1.3" strokeLinecap="round" opacity={0.6} />
// //       </svg>
// //     ),
// //   },
// //   {
// //     label: "Interview Scheduling",
// //     sublabel: "Book & confirm slots",
// //     route: "/scheduler",
// //     icon: (
// //       <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
// //         <rect x="4" y="6" width="24" height="22" rx="2.5" fill="#6366f1" fillOpacity={0.1} stroke="#6366f1" strokeWidth="1.7" />
// //         <path d="M4 12h24" stroke="#6366f1" strokeWidth="1.5" />
// //         <path d="M11 6V4M21 6V4" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" />
// //         <rect x="9"  y="16" width="5" height="4" rx="0.8" fill="#6366f1" fillOpacity={0.45} />
// //         <rect x="17" y="16" width="5" height="4" rx="0.8" fill="#6366f1" fillOpacity={0.2} />
// //         <rect x="9"  y="22" width="5" height="3" rx="0.8" fill="#6366f1" fillOpacity={0.2} />
// //       </svg>
// //     ),
// //   },
// // ];

// // // ── Component ─────────────────────────────────────────────────────────────────
// // const RecruitmentJourney: React.FC<Props> = ({ currentStep, onStepClick }) => {
// //   const progressPct = (currentStep / (STEPS.length - 1)) * 100;

// //   return (
// //     <div
// //       style={{
// //         background:
// //           "linear-gradient(135deg,#eef2ff 0%,#f5f0ff 35%,#fce7f3 70%,#ede9fe 100%)",
// //         border: "1px solid rgba(255,255,255,0.85)",
// //         borderRadius: 18,
// //         padding: "22px 36px 16px",
// //         marginBottom: 24,
// //         boxShadow: "0 2px 20px rgba(99,102,241,0.09)",
// //       }}
// //     >
// //       {/* Title */}
// //       <div
// //         style={{
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           gap: 8,
// //           marginBottom: 24,
// //         }}
// //       >
// //         <span style={{ fontSize: 18 }}>🗺️</span>
// //         <span style={{ fontSize: 14, fontWeight: 700, color: "#475569" }}>
// //           Your Recruitment Journey
// //         </span>
// //       </div>

// //       {/* Steps */}
// //       <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
// //         {STEPS.map((step, idx) => {
// //           /**
// //            * STATES:
// //            *  done     → completed step: white circle, plain border, icon shown (NO tick, NO fill)
// //            *  active   → current step:  white circle, indigo border + glow, icon shown, scale up
// //            *  upcoming → future step:   white circle, grey border, icon shown, dimmed
// //            */
// //           const isDone     = idx < currentStep;
// //           const isActive   = idx === currentStep;
// //           const isUpcoming = idx > currentStep;

// //           return (
// //             <React.Fragment key={idx}>
// //               {/* ── Step column ── */}
// //               <div
// //                 onClick={() => onStepClick?.(step.route, idx)}
// //                 style={{
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   alignItems: "center",
// //                   cursor: "pointer",
// //                   minWidth: 110,
// //                   userSelect: "none",
// //                 }}
// //               >
// //                 {/* Circle */}
// //                 <div
// //                   style={{
// //                     width: 62,
// //                     height: 62,
// //                     borderRadius: "50%",
// //                     // ✅ Always white background — no purple fill for done steps
// //                     background: "white",
// //                     border: `2px solid ${
// //                       isActive
// //                         ? "#6366f1"       // indigo border when active
// //                         : isDone
// //                         ? "rgba(99,102,241,0.5)"  // indigo border with 50% opacity when done
// //                         : "#e2e8f0"       // grey border when upcoming
// //                     }`,
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     position: "relative",
// //                     marginBottom: 10,
// //                     transition: "all 0.3s ease",
// //                     // ✅ Only active step scales up
// //                     transform: isActive ? "scale(1.12)" : "scale(1)",
// //                     // ✅ Only active step gets the glow ring
// //                     boxShadow: isActive
// //                       ? "0 0 0 6px rgba(99,102,241,0.13), 0 4px 16px rgba(99,102,241,0.22)"
// //                       : isDone
// //                       ? "0 2px 6px rgba(99,102,241,0.12)"
// //                       : "0 2px 8px rgba(0,0,0,0.05)",
// //                     // ✅ Upcoming steps are dimmed
// //                     opacity: isUpcoming ? 0.5 : 1,
// //                   }}
// //                 >
// //                   {/* ✅ Always show the icon — NEVER show a tick */}
// //                   {step.icon}

// //                   {/* Step number badge — only on active + upcoming (not done) */}
// //                   {!isDone && (
// //                     <div
// //                       style={{
// //                         position: "absolute",
// //                         top: -5,
// //                         right: -5,
// //                         width: 20,
// //                         height: 20,
// //                         borderRadius: "50%",
// //                         background: isActive
// //                           ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
// //                           : "#cbd5e1",
// //                         color: "white",
// //                         fontSize: 10,
// //                         fontWeight: 800,
// //                         display: "flex",
// //                         alignItems: "center",
// //                         justifyContent: "center",
// //                         boxShadow: isActive ? "0 1px 6px rgba(99,102,241,0.4)" : "none",
// //                       }}
// //                     >
// //                       {idx + 1}
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Label */}
// //                 <p
// //                   style={{
// //                     margin: "0 0 3px",
// //                     fontSize: 12.5,
// //                     fontWeight: isActive ? 700 : isDone ? 600 : 500,
// //                     color: isActive ? "#4f46e5" : isDone ? "#6366f1" : "#94a3b8",
// //                     textAlign: "center",
// //                     lineHeight: 1.3,
// //                     transition: "color 0.2s",
// //                   }}
// //                 >
// //                   {step.label}
// //                 </p>

// //                 {/* Sub-label */}
// //                 <p
// //                   style={{
// //                     margin: 0,
// //                     fontSize: 10.5,
// //                     color: isActive ? "#818cf8" : "#b0b8c9",
// //                     textAlign: "center",
// //                     maxWidth: 95,
// //                     lineHeight: 1.4,
// //                   }}
// //                 >
// //                   {step.sublabel}
// //                 </p>
// //               </div>

// //               {/* Arrow connector */}
// //               {idx < STEPS.length - 1 && (
// //                 <div style={{ paddingBottom: 34, margin: "0 2px", flexShrink: 0 }}>
// //                   <svg width="36" height="14" viewBox="0 0 36 14">
// //                     <path
// //                       d="M0 7 H28 M22 2 L30 7 L22 12"
// //                       stroke={idx < currentStep ? "#6366f1" : "#dde1ea"}
// //                       strokeWidth="1.8"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       fill="none"
// //                       opacity={idx < currentStep ? 1 : 0.6}
// //                     />
// //                   </svg>
// //                 </div>
// //               )}
// //             </React.Fragment>
// //           );
// //         })}
// //       </div>

// //       {/* Progress bar */}
// //       <div
// //         style={{
// //           marginTop: 16,
// //           height: 4,
// //           background: "rgba(255,255,255,0.65)",
// //           borderRadius: 10,
// //           overflow: "hidden",
// //         }}
// //       >
// //         <div
// //           style={{
// //             height: "100%",
// //             width: `${progressPct}%`,
// //             borderRadius: 10,
// //             background: "linear-gradient(90deg,#6366f1,#a855f7,#ec4899)",
// //             boxShadow: "0 0 8px rgba(99,102,241,0.4)",
// //             transition: "width 0.5s ease",
// //           }}
// //         />
// //       </div>

// //       {/* Hint */}
// //       <p
// //         style={{
// //           textAlign: "center",
// //           fontSize: 11.5,
// //           color: "#a78bfa",
// //           margin: "10px 0 0",
// //           fontWeight: 500,
// //         }}
// //       >
// //         Step {currentStep + 1} of {STEPS.length}&nbsp;·&nbsp;
// //         <strong style={{ color: "#6366f1" }}>{STEPS[currentStep].label}</strong>
// //         &nbsp;·&nbsp;
// //         <span style={{ color: "#94a3b8" }}>{STEPS[currentStep].sublabel}</span>
// //       </p>
// //     </div>
// //   );
// // };

// // export default RecruitmentJourney;
// "use client";

// import React from "react";

// type Props = {
//   /** 0-indexed active step, computed from live Redux data */
//   currentStep: number;
//   onStepClick?: (route: string, index: number) => void;
// };

// // ── Step definitions (icons always shown — tick NEVER replaces icon) ──────────
// const STEPS = [
//   {
//     label: "Dashboard",
//     sublabel: "Recruitment overview",
//     route: "/dashboard",
//     icon: (
//       <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
//         <path
//           d="M16 3L3 14h4v13h7v-7h4v7h7V14h4L16 3z"
//           fill="#6366f1"
//           fillOpacity={0.18}
//           stroke="#6366f1"
//           strokeWidth="1.7"
//           strokeLinejoin="round"
//         />
//         <rect x="12" y="20" width="8" height="7" rx="1" fill="#6366f1" fillOpacity={0.4} />
//       </svg>
//     ),
//   },
//   {
//     label: "Job & Candidates",
//     sublabel: "Post role · Build profile",
//     route: "/jobs",
//     icon: (
//       <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
//         <rect x="5" y="7" width="22" height="18" rx="2.5" fill="#8b5cf6" fillOpacity={0.13} stroke="#8b5cf6" strokeWidth="1.7" />
//         <path d="M11 7V5a2 2 0 014 0v2M17 7V5a2 2 0 014 0v2" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
//         <path d="M9 15h14M9 19h8" stroke="#8b5cf6" strokeWidth="1.6" strokeLinecap="round" />
//       </svg>
//     ),
//   },
//   {
//     label: "Assessment Creation",
//     sublabel: "Build test & questions",
//     route: "/assessments",
//     icon: (
//       <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
//         <rect x="5" y="5" width="22" height="22" rx="2.5" fill="#a855f7" fillOpacity={0.12} stroke="#a855f7" strokeWidth="1.7" />
//         <path d="M10 12h12M10 16h8M10 20h10" stroke="#a855f7" strokeWidth="1.6" strokeLinecap="round" />
//         <path d="M22 8l2 2-6 6-3 1 1-3 6-6z" fill="#a855f7" fillOpacity={0.65} stroke="#a855f7" strokeWidth="0.8" />
//       </svg>
//     ),
//   },
//   {
//     label: "ATS Checking",
//     sublabel: "AI resume screening",
//     route: "/candidates",
//     icon: (
//       <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
//         <rect x="4" y="8" width="24" height="16" rx="2.5" fill="#ec4899" fillOpacity={0.1} stroke="#ec4899" strokeWidth="1.7" />
//         <circle cx="16" cy="16" r="4" stroke="#ec4899" strokeWidth="1.6" fill="#ec4899" fillOpacity={0.15} />
//         <path d="M16 13.5V16l2 2" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
//         <path d="M7 12l2 1.5M25 12l-2 1.5M7 20l2-1.5M25 20l-2-1.5" stroke="#ec4899" strokeWidth="1.3" strokeLinecap="round" opacity={0.6} />
//       </svg>
//     ),
//   },
//   {
//     label: "Interview Scheduling",
//     sublabel: "Book & confirm slots",
//     route: "/scheduler",
//     icon: (
//       <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
//         <rect x="4" y="6" width="24" height="22" rx="2.5" fill="#6366f1" fillOpacity={0.1} stroke="#6366f1" strokeWidth="1.7" />
//         <path d="M4 12h24" stroke="#6366f1" strokeWidth="1.5" />
//         <path d="M11 6V4M21 6V4" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" />
//         <rect x="9"  y="16" width="5" height="4" rx="0.8" fill="#6366f1" fillOpacity={0.45} />
//         <rect x="17" y="16" width="5" height="4" rx="0.8" fill="#6366f1" fillOpacity={0.2} />
//         <rect x="9"  y="22" width="5" height="3" rx="0.8" fill="#6366f1" fillOpacity={0.2} />
//       </svg>
//     ),
//   },
// ];

// // ── Styles ────────────────────────────────────────────────────────────────────
// const S = {
//   wrapper: {
//     background: "linear-gradient(135deg,#eef2ff 0%,#f5f0ff 35%,#fce7f3 70%,#ede9fe 100%)",
//     border: "1px solid rgba(255,255,255,0.85)",
//     borderRadius: 18,
//     padding: "20px 36px 14px",
//     marginBottom: 24,
//     boxShadow: "0 2px 20px rgba(99,102,241,0.09)",
//   } as React.CSSProperties,
//   titleRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     marginBottom: 22,
//     fontSize: 14,
//     fontWeight: 700,
//     color: "#475569",
//   } as React.CSSProperties,
//   stepsRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexWrap: "wrap" as const,
//   },
//   barWrap: {
//     marginTop: 16,
//     height: 4,
//     background: "rgba(255,255,255,0.65)",
//     borderRadius: 10,
//     overflow: "hidden",
//   } as React.CSSProperties,
//   hint: {
//     textAlign: "center" as const,
//     fontSize: 11.5,
//     color: "#a78bfa",
//     margin: "10px 0 0",
//     fontWeight: 500,
//   } as React.CSSProperties,
// };

// // ── Component ─────────────────────────────────────────────────────────────────
// const RecruitmentJourney: React.FC<Props> = ({ currentStep, onStepClick }) => {
//   const progressPct = (currentStep / (STEPS.length - 1)) * 100;

//   return (
//     <div style={S.wrapper}>
//       {/* Title */}
//       <div style={S.titleRow}>
//         <span style={{ fontSize: 18 }}>🗺️</span>
//         <span>Your Recruitment Journey</span>
//       </div>

//       {/* Steps row */}
//       <div style={S.stepsRow}>
//         {STEPS.map((step, idx) => {
//           const isDone     = idx < currentStep;
//           const isActive   = idx === currentStep;
//           const isUpcoming = idx > currentStep;

//           const circleStyle: React.CSSProperties = {
//             width: 62,
//             height: 62,
//             borderRadius: "50%",
//             background: "white",
//             border: `2px solid ${
//               isActive
//                 ? "#6366f1"
//                 : isDone
//                 ? "rgba(99,102,241,0.5)"
//                 : "#e2e8f0"
//             }`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             position: "relative",
//             marginBottom: 10,
//             transition: "all 0.3s ease",
//             transform: isActive ? "scale(1.12)" : "scale(1)",
//             boxShadow: isActive
//               ? "0 0 0 6px rgba(99,102,241,0.13), 0 4px 16px rgba(99,102,241,0.22)"
//               : isDone
//               ? "0 2px 6px rgba(99,102,241,0.12)"
//               : "0 2px 8px rgba(0,0,0,0.05)",
//             opacity: isUpcoming ? 0.5 : 1,
//           };

//           const badgeStyle: React.CSSProperties = {
//             position: "absolute",
//             top: -5,
//             right: -5,
//             width: 20,
//             height: 20,
//             borderRadius: "50%",
//             background: isActive
//               ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
//               : "#cbd5e1",
//             color: "white",
//             fontSize: 10,
//             fontWeight: 800,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             boxShadow: isActive ? "0 1px 6px rgba(99,102,241,0.4)" : "none",
//           };

//           return (
//             <React.Fragment key={idx}>
//               {/* Step column */}
//               <div
//                 onClick={() => onStepClick?.(step.route, idx)}
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   cursor: "pointer",
//                   minWidth: 110,
//                   userSelect: "none",
//                 }}
//               >
//                 {/* Circle — always shows icon, NEVER a tick */}
//                 <div style={circleStyle}>
//                   {step.icon}

//                   {/* Badge — shown only on active + upcoming, never on done */}
//                   {!isDone && (
//                     <div style={badgeStyle}>{idx + 1}</div>
//                   )}
//                 </div>

//                 {/* Label */}
//                 <p
//                   style={{
//                     margin: "0 0 3px",
//                     fontSize: 12.5,
//                     fontWeight: isActive ? 700 : isDone ? 600 : 500,
//                     color: isActive ? "#4f46e5" : isDone ? "#6366f1" : "#94a3b8",
//                     textAlign: "center",
//                     lineHeight: 1.3,
//                     transition: "color 0.2s",
//                   }}
//                 >
//                   {step.label}
//                 </p>

//                 {/* Sub-label */}
//                 <p
//                   style={{
//                     margin: 0,
//                     fontSize: 10.5,
//                     color: isActive ? "#818cf8" : "#b0b8c9",
//                     textAlign: "center",
//                     maxWidth: 95,
//                     lineHeight: 1.4,
//                   }}
//                 >
//                   {step.sublabel}
//                 </p>
//               </div>

//               {/* Arrow connector */}
//               {idx < STEPS.length - 1 && (
//                 <div style={{ paddingBottom: 34, margin: "0 2px", flexShrink: 0 }}>
//                   <svg width="36" height="14" viewBox="0 0 36 14">
//                     <path
//                       d="M0 7 H28 M22 2 L30 7 L22 12"
//                       stroke={idx < currentStep ? "#6366f1" : "#dde1ea"}
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       fill="none"
//                       opacity={idx < currentStep ? 1 : 0.6}
//                     />
//                   </svg>
//                 </div>
//               )}
//             </React.Fragment>
//           );
//         })}
//       </div>

//       {/* Progress bar */}
//       <div style={S.barWrap}>
//         <div
//           style={{
//             height: "100%",
//             width: `${progressPct}%`,
//             borderRadius: 10,
//             background: "linear-gradient(90deg,#6366f1,#a855f7,#ec4899)",
//             boxShadow: "0 0 8px rgba(99,102,241,0.4)",
//             transition: "width 0.5s ease",
//           }}
//         />
//       </div>

//       {/* Hint */}
//       <p style={S.hint}>
//         Step {currentStep + 1} of {STEPS.length}&nbsp;·&nbsp;
//         <strong style={{ color: "#6366f1" }}>{STEPS[currentStep].label}</strong>
//         &nbsp;·&nbsp;
//         <span style={{ color: "#94a3b8" }}>{STEPS[currentStep].sublabel}</span>
//       </p>
//     </div>
//   );
// };

// export default RecruitmentJourney;
import React from "react";
import { useRouter } from "next/navigation";

// ── Step definitions ───────────────────────────────────────────────────────────
// Each step has a label, sub-label, route to navigate, and an SVG icon.
// Routes must match your Next.js page structure exactly.
const STEPS = [
  {
    label:    "Dashboard",
    sublabel: "Recruitment overview",
    route:    "/dashboard",
    icon: (
      <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
        <path d="M16 3L3 14h4v13h7v-7h4v7h7V14h4L16 3z"
          fill="#6366f1" fillOpacity={0.18} stroke="#6366f1"
          strokeWidth="1.7" strokeLinejoin="round"/>
        <rect x="12" y="20" width="8" height="7" rx="1"
          fill="#6366f1" fillOpacity={0.4}/>
      </svg>
    ),
  },
  {
    label:    "Job & Candidates",
    sublabel: "Post role · Build profile",
    route:    "/candidates",          // ← candidates page, not /jobs
    icon: (
      <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
        <rect x="5" y="7" width="22" height="18" rx="2.5"
          fill="#8b5cf6" fillOpacity={0.13} stroke="#8b5cf6" strokeWidth="1.7"/>
        <path d="M11 7V5a2 2 0 014 0v2M17 7V5a2 2 0 014 0v2"
          stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 15h14M9 19h8"
          stroke="#8b5cf6" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label:    "Assessment Creation",
    sublabel: "Build test & questions",
    route:    "/assessments",
    icon: (
      <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
        <rect x="5" y="5" width="22" height="22" rx="2.5"
          fill="#a855f7" fillOpacity={0.12} stroke="#a855f7" strokeWidth="1.7"/>
        <path d="M10 12h12M10 16h8M10 20h10"
          stroke="#a855f7" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M22 8l2 2-6 6-3 1 1-3 6-6z"
          fill="#a855f7" fillOpacity={0.65} stroke="#a855f7" strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    label:    "ATS Checking",
    sublabel: "AI resume screening",
    route:    "/candidates",          // opens candidates page for ATS view
    icon: (
      <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
        <rect x="4" y="8" width="24" height="16" rx="2.5"
          fill="#ec4899" fillOpacity={0.1} stroke="#ec4899" strokeWidth="1.7"/>
        <circle cx="16" cy="16" r="4"
          stroke="#ec4899" strokeWidth="1.6" fill="#ec4899" fillOpacity={0.15}/>
        <path d="M16 13.5V16l2 2"
          stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 12l2 1.5M25 12l-2 1.5M7 20l2-1.5M25 20l-2-1.5"
          stroke="#ec4899" strokeWidth="1.3" strokeLinecap="round" opacity={0.6}/>
      </svg>
    ),
  },
  {
    label:    "Interview Scheduling",
    sublabel: "Book & confirm slots",
    route:    "/scheduler",
    icon: (
      <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
        <rect x="4" y="6" width="24" height="22" rx="2.5"
          fill="#6366f1" fillOpacity={0.1} stroke="#6366f1" strokeWidth="1.7"/>
        <path d="M4 12h24" stroke="#6366f1" strokeWidth="1.5"/>
        <path d="M11 6V4M21 6V4"
          stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="9"  y="16" width="5" height="4" rx="0.8"
          fill="#6366f1" fillOpacity={0.45}/>
        <rect x="17" y="16" width="5" height="4" rx="0.8"
          fill="#6366f1" fillOpacity={0.2}/>
        <rect x="9"  y="22" width="5" height="3" rx="0.8"
          fill="#6366f1" fillOpacity={0.2}/>
      </svg>
    ),
  },
];

// ── Props ─────────────────────────────────────────────────────────────────────
type Props = {
  currentStep: number;
  /** Optional override — Dashboard passes router.push */
  onStepClick?: (route: string, index: number) => void;
};

// ── Component ─────────────────────────────────────────────────────────────────
const RecruitmentJourney: React.FC<Props> = ({ currentStep, onStepClick }) => {
  // Use internal router as fallback if no onStepClick provided
  const router = useRouter();

  const handleClick = (route: string, idx: number) => {
    if (onStepClick) {
      onStepClick(route, idx);
    } else {
      router.push(route);
    }
  };

  const progressPct = Math.round((currentStep / (STEPS.length - 1)) * 100);

  return (
    <div
      style={{
        background: "linear-gradient(135deg,#eef2ff 0%,#f5f0ff 35%,#fce7f3 70%,#ede9fe 100%)",
        border: "1px solid rgba(255,255,255,0.85)",
        borderRadius: 18,
        padding: "22px 36px 16px",
        marginBottom: 24,
        boxShadow: "0 2px 20px rgba(99,102,241,0.09)",
      }}
    >
      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
        <span style={{ fontSize: 18 }}>🗺️</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#475569" }}>Your Recruitment Journey</span>
      </div>

      {/* Steps row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {STEPS.map((step, idx) => {
          const isDone     = idx < currentStep;
          const isActive   = idx === currentStep;
          const isUpcoming = idx > currentStep;

          return (
            <React.Fragment key={idx}>
              {/* ── Step column ── */}
              <div
                onClick={() => handleClick(step.route, idx)}
                title={`Go to ${step.label}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  minWidth: 110,
                  userSelect: "none",
                  // Subtle hover lift handled with inline onMouse events below
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                {/* Circle */}
                <div
                  style={{
                    width: 62,
                    height: 62,
                    borderRadius: "50%",
                    background: "white",
                    border: `2px solid ${
                      isActive   ? "#6366f1"
                      : isDone   ? "rgba(99,102,241,0.5)"
                      :            "#e2e8f0"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    marginBottom: 10,
                    transition: "all 0.3s ease",
                    transform: isActive ? "scale(1.12)" : "scale(1)",
                    boxShadow: isActive
                      ? "0 0 0 6px rgba(99,102,241,0.13), 0 4px 16px rgba(99,102,241,0.22)"
                      : isDone
                      ? "0 2px 6px rgba(99,102,241,0.12)"
                      : "0 2px 8px rgba(0,0,0,0.05)",
                    opacity: isUpcoming ? 0.5 : 1,
                  }}
                >
                  {/* Icon — always shown, tick NEVER replaces it */}
                  {step.icon}

                  {/* Step number badge — only on active + upcoming */}
                  {!isDone && (
                    <div
                      style={{
                        position: "absolute",
                        top: -5, right: -5,
                        width: 20, height: 20,
                        borderRadius: "50%",
                        background: isActive
                          ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                          : "#cbd5e1",
                        color: "white",
                        fontSize: 10, fontWeight: 800,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: isActive ? "0 1px 6px rgba(99,102,241,0.4)" : "none",
                      }}
                    >
                      {idx + 1}
                    </div>
                  )}
                </div>

                {/* Label */}
                <p
                  style={{
                    margin: "0 0 3px",
                    fontSize: 12.5,
                    fontWeight: isActive ? 700 : isDone ? 600 : 500,
                    color: isActive ? "#4f46e5" : isDone ? "#6366f1" : "#94a3b8",
                    textAlign: "center",
                    lineHeight: 1.3,
                    transition: "color 0.2s",
                  }}
                >
                  {step.label}
                </p>

                {/* Sub-label */}
                <p
                  style={{
                    margin: 0,
                    fontSize: 10.5,
                    color: isActive ? "#818cf8" : "#b0b8c9",
                    textAlign: "center",
                    maxWidth: 95,
                    lineHeight: 1.4,
                  }}
                >
                  {step.sublabel}
                </p>
              </div>

              {/* Arrow connector between steps */}
              {idx < STEPS.length - 1 && (
                <div style={{ paddingBottom: 34, margin: "0 2px", flexShrink: 0 }}>
                  <svg width="36" height="14" viewBox="0 0 36 14">
                    <path
                      d="M0 7 H28 M22 2 L30 7 L22 12"
                      stroke={idx < currentStep ? "#6366f1" : "#dde1ea"}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      opacity={idx < currentStep ? 1 : 0.6}
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 16, height: 4, background: "rgba(255,255,255,0.65)", borderRadius: 10, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${progressPct}%`,
            borderRadius: 10,
            background: "linear-gradient(90deg,#6366f1,#a855f7,#ec4899)",
            boxShadow: "0 0 8px rgba(99,102,241,0.4)",
            transition: "width 0.5s ease",
          }}
        />
      </div>

      {/* Hint text */}
      <p style={{ textAlign: "center", fontSize: 11.5, color: "#a78bfa", margin: "10px 0 0", fontWeight: 500 }}>
        Step {currentStep + 1} of {STEPS.length}&nbsp;·&nbsp;
        <strong style={{ color: "#6366f1" }}>{STEPS[currentStep].label}</strong>
        &nbsp;·&nbsp;
        <span style={{ color: "#94a3b8" }}>{STEPS[currentStep].sublabel}</span>
      </p>
    </div>
  );
};

export default RecruitmentJourney;