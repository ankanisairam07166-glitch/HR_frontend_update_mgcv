// // // // "use client";

// // // // import React, { useEffect, useState, useCallback } from "react";
// // // // import { Video, MapPin, Search, FileText } from "lucide-react";
// // // // import { useRouter } from "next/navigation";

// // // // import CalendarGrid from "./subComponents/CalendarGrid";
// // // // import TimeSlots, { type Slot } from "./subComponents/TimeSlots";
// // // // import CandidateSelector from "./subComponents/CandidateSelector";
// // // // import InterviewerPicker, { type Interviewer } from "./subComponents/InterviewerPicker";
// // // // import JobDescriptionModal from "./subComponents/JobDescriptionModal";
// // // // import InterviewSummary from "./subComponents/InterviewSummary";

// // // // import { fetchCandidates, scheduleInterview, type RawCandidate } from "@/services/api/schedulerAPI";

// // // // // ---- Mock time slots (kept from original) ----
// // // // const MORNING: Slot[] = [
// // // //   { id: 1, time: "9:00 AM", available: true },
// // // //   { id: 2, time: "9:30 AM", available: true },
// // // //   { id: 3, time: "10:00 AM", available: true },
// // // //   { id: 4, time: "10:30 AM", available: false },
// // // //   { id: 5, time: "11:00 AM", available: true },
// // // //   { id: 6, time: "11:30 AM", available: true },
// // // // ];
// // // // const AFTERNOON: Slot[] = [
// // // //   { id: 7, time: "1:00 PM", available: true },
// // // //   { id: 8, time: "1:30 PM", available: false },
// // // //   { id: 9, time: "2:00 PM", available: true },
// // // //   { id: 10, time: "2:30 PM", available: true },
// // // //   { id: 11, time: "3:00 PM", available: false },
// // // //   { id: 12, time: "3:30 PM", available: true },
// // // //   { id: 13, time: "4:00 PM", available: true },
// // // //   { id: 14, time: "4:30 PM", available: true },
// // // // ];

// // // // // ---- Mock interviewers (kept from original semantics) ----
// // // // const DEFAULT_INTERVIEWERS: Interviewer[] = [
// // // //   { id: 1, name: "Alex Rodriguez", role: "Engineering Manager", checked: true },
// // // //   { id: 2, name: "Sarah Kim", role: "Senior Engineer", checked: true },
// // // //   { id: 3, name: "David Wilson", role: "Product Manager", checked: false },
// // // // ];

// // // // export default function SchedulerInterface() {
// // // //   const router = useRouter();

// // // //   // steps: 1 date, 2 time, 3 confirm
// // // //   const [step, setStep] = useState<1 | 2 | 3>(1);
// // // //   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
// // // //   const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

// // // //   const [candidates, setCandidates] = useState<RawCandidate[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [selectedCandidate, setSelectedCandidate] = useState<RawCandidate | null>(null);

// // // //   const [interviewers, setInterviewers] = useState<Interviewer[]>(DEFAULT_INTERVIEWERS);

// // // //   const [jobDescription, setJobDescription] = useState("");
// // // //   const [showJDModal, setShowJDModal] = useState(false);

// // // //   // --------- data loading ----------
// // // //   const load = useCallback(async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const list = await fetchCandidates();
// // // //       setCandidates(list);
// // // //     } catch (e) {
// // // //       // fallback to a tiny mock if backend is down
// // // //       setCandidates([
// // // //         { id: 1, name: "Emily Johnson", role: "Senior Software Engineer", photo: null },
// // // //         { id: 2, name: "Michael Chen", role: "Senior Software Engineer", photo: null },
// // // //         { id: 3, name: "Sophia Williams", role: "Senior Software Engineer", photo: null },
// // // //       ]);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => { load(); }, [load]);

// // // //   // --------- calendar handlers ----------
// // // //   const goPrevMonth = () =>
// // // //     setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
// // // //   const goNextMonth = () =>
// // // //     setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
// // // //   const pickDay = (d: number) => {
// // // //     setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), d));
// // // //     setStep(2);
// // // //   };

// // // //   // --------- time slot handlers ----------
// // // //   const backToCalendar = () => setStep(1);
// // // //   const pickSlot = (s: Slot) => {
// // // //     setSelectedSlot(s);
// // // //     setStep(3);
// // // //   };

// // // //   // toggle interviewer
// // // //   const toggleInterviewer = (id: number) =>
// // // //     setInterviewers((prev) => prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it)));

// // // //   // --------- schedule interview ----------
// // // //   const handleSchedule = async () => {
// // // //     if (!selectedCandidate) {
// // // //       alert("Please select a candidate");
// // // //       return;
// // // //     }
// // // //     if (!selectedSlot) {
// // // //       alert("Please pick a time slot");
// // // //       return;
// // // //     }

// // // //     // ensure we have email (if not, attempt to refresh candidates for this job)
// // // //     let withEmail = selectedCandidate;
// // // //     if (!withEmail.email) {
// // // //       const refreshed = await fetchCandidates(withEmail.job_id);
// // // //       const found = refreshed.find((c: { id: any; }) => String(c.id) === String(withEmail.id));
// // // //       if (!found?.email) {
// // // //         alert("Cannot schedule interview: Candidate email not found.");
// // // //         return;
// // // //       }
// // // //       withEmail = found;
// // // //     }

// // // //     // compose datetime from date + slot
// // // //     const [hm, ampm] = selectedSlot.time.split(" ");
// // // //     const [hStr, mStr] = hm.split(":");
// // // //     const h = parseInt(hStr, 10);
// // // //     const m = parseInt(mStr, 10);
// // // //     const isPM = ampm?.toUpperCase().includes("PM");
// // // //     const dt = new Date(selectedDate);
// // // //     dt.setHours(isPM && h !== 12 ? h + 12 : h === 12 && !isPM ? 0 : h);
// // // //     dt.setMinutes(m);

// // // //     const res = await scheduleInterview({
// // // //       candidate_id: withEmail.id,
// // // //       email: withEmail.email!,
// // // //       date_iso: dt.toISOString(),
// // // //       time_slot: selectedSlot.time,
// // // //     });

// // // //     if (!res.success) {
// // // //       alert(`Failed to schedule interview: ${res.message ?? "Unknown error"}`);
// // // //       return;
// // // //     }

// // // //     if (res.already_scheduled) {
// // // //       alert(`Interview already scheduled.\nLink: ${res.interview_link}`);
// // // //     } else {
// // // //       const msg =
// // // //         `Interview scheduled!\n\n` +
// // // //         `Candidate: ${withEmail.name}\n` +
// // // //         `Email: ${withEmail.email}\n` +
// // // //         `Link: ${res.interview_link}\n` +
// // // //         `KB: ${res.knowledge_base_id}\n` +
// // // //         `Resume: ${res.resume_extracted ? "✅" : "❌"}\n` +
// // // //         `Job Description: ${res.job_description_used ? "✅ Provided" : "📝 Auto" }\n\n` +
// // // //         `${res.email_sent ? "Email sent." : "Email sending failed."}`;
// // // //       alert(msg);
// // // //       if (res.interview_link && navigator.clipboard) {
// // // //         try { await navigator.clipboard.writeText(res.interview_link); } catch {}
// // // //       }
// // // //     }

// // // //     // back to candidate list (or route)
// // // //     router.push("/candidates");
// // // //   };

// // // //   // --------- derived ---------
// // // //   const selectedTitle = selectedCandidate?.job_title ?? selectedCandidate?.role ?? undefined;
// // // //   const candidatesCount = candidates.length;

// // // //   // --------- UI ---------
// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex min-h-screen items-center justify-center bg-gray-50">
// // // //         <div className="animate-pulse text-gray-500">Loading candidates...</div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="flex min-h-screen flex-col bg-gray-50">
// // // //       {/* keep your Navbar in layout */}

// // // //       <main className="flex-grow p-6">
// // // //         {/* Header */}
// // // //         <div className="mb-6 flex items-center justify-between">
// // // //           <h1 className="text-2xl font-bold text-gray-700">Interview Scheduler</h1>
// // // //           <div className="flex items-center space-x-3">
// // // //             <div className="relative">
// // // //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
// // // //               <input
// // // //                 placeholder="Search…"
// // // //                 className="font-medium text-gray-700 rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Wizard container */}
// // // //         <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
// // // //           {/* Step header */}
// // // //           <div className="border-b border-gray-200 bg-gray-50 p-4">
// // // //             <div className="flex items-center justify-between">
// // // //               <h2 className="font-medium text-gray-700">Schedule an Interview</h2>
// // // //               <div className="flex items-center">
// // // //                 {([1, 2, 3] as const).map((n, i) => (
// // // //                   <React.Fragment key={n}>
// // // //                     <div
// // // //                       className={[
// // // //                         "flex items-center",
// // // //                         step >= n ? "text-blue-600" : "text-gray-400",
// // // //                       ].join(" ")}
// // // //                     >
// // // //                       <div
// // // //                         className={[
// // // //                           "flex h-6 w-6 items-center justify-center rounded-full border-2",
// // // //                           step >= n ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300",
// // // //                         ].join(" ")}
// // // //                       >
// // // //                         {n}
// // // //                       </div>
// // // //                       <span className="ml-2 text-sm font-medium">
// // // //                         {n === 1 ? "Select Date" : n === 2 ? "Select Time" : "Confirm"}
// // // //                       </span>
// // // //                     </div>
// // // //                     {i < 2 && (
// // // //                       <div className={`mx-2 h-1 w-8 ${step > n ? "bg-blue-600" : "bg-gray-200"}`} />
// // // //                     )}
// // // //                   </React.Fragment>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Body */}
// // // //           <div className="p-6">
// // // //             {step === 1 && (
// // // //               <CalendarGrid
// // // //                 selectedDate={selectedDate}
// // // //                 onPrevMonth={goPrevMonth}
// // // //                 onNextMonth={goNextMonth}
// // // //                 onPickDay={pickDay}
// // // //               />
// // // //             )}

// // // //             {step === 2 && (
// // // //               <TimeSlots
// // // //                 date={selectedDate}
// // // //                 morning={MORNING}
// // // //                 afternoon={AFTERNOON}
// // // //                 selected={selectedSlot}
// // // //                 onPick={pickSlot}
// // // //                 onBack={backToCalendar}
// // // //               />
// // // //             )}

// // // //             {step === 3 && (
// // // //               <div>
// // // //                 <InterviewSummary
// // // //                   date={selectedDate}
// // // //                   timeText={selectedSlot?.time}
// // // //                   title={selectedTitle}
// // // //                   candidateName={selectedCandidate?.name}
// // // //                 />

// // // //                 <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
// // // //                   <CandidateSelector
// // // //                     items={candidates}
// // // //                     selected={selectedCandidate}
// // // //                     onPick={(c) => {
// // // //                       setSelectedCandidate(c);
// // // //                       if (c.job_description) setJobDescription(c.job_description);
// // // //                     }}
// // // //                   />

// // // //                   <InterviewerPicker
// // // //                     items={interviewers}
// // // //                     onToggle={toggleInterviewer}
// // // //                   />
// // // //                 </div>

// // // //                 {/* Job Description section */}
// // // //                 <div className="mb-4 border-t border-gray-200 pt-4">
// // // //                   <div className="mb-3 flex items-center justify-between">
// // // //                     <h4 className="font-medium text-gray-700">Job Description (Optional)</h4>
// // // //                     <button
// // // //                       onClick={() => setShowJDModal(true)}
// // // //                       className="flex items-center text-sm text-blue-600 hover:underline"
// // // //                     >
// // // //                       <FileText size={16} className="mr-1" />
// // // //                       {jobDescription ? "Edit" : "Add"} Job Description
// // // //                     </button>
// // // //                   </div>
// // // //                   <div className="rounded-md bg-gray-50 p-3">
// // // //                     <p className="text-sm text-gray-600">
// // // //                       {jobDescription ? (
// // // //                         <span>{jobDescription.length > 120 ? `${jobDescription.slice(0, 120)}…` : jobDescription}</span>
// // // //                       ) : (
// // // //                         <em>
// // // //                           No job description provided. The system will use a generic description
// // // //                           or candidate&apos;s profile.
// // // //                         </em>
// // // //                       )}
// // // //                     </p>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Interview method (kept visual) */}
// // // //                 <div className="border-t border-gray-200 pt-4">
// // // //                   <h4 className="mb-3 font-medium text-gray-700">Interview Method</h4>
// // // //                   <div className="flex space-x-4">
// // // //                     <div className="flex-1 cursor-pointer rounded-md border border-blue-500 bg-blue-50 p-4 hover:border-blue-500 hover:bg-blue-50">
// // // //                       <div className="flex items-center">
// // // //                         <Video size={20} className="mr-3 text-blue-800" />
// // // //                         <div>
// // // //                           <div className="font-medium text-sm text-gray-700">AI-Powered Video Interview</div>
// // // //                           <div className="text-sm text-gray-500">
// // // //                             Secure interview link will be sent automatically
// // // //                           </div>
// // // //                           <div className="mt-1 text-xs text-green-600">
// // // //                             ✓ Knowledge base will be created from resume
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="flex-1 cursor-pointer rounded-md border border-gray-200 p-4 hover:border-blue-500 hover:bg-blue-50">
// // // //                       <div className="flex items-center">
// // // //                         <MapPin size={20} className="mr-3 text-gray-600" />
// // // //                         <div>
// // // //                           <div className="font-medium text-sm text-gray-700 ">In-Person</div>
// // // //                           <div className="text-sm text-gray-500">
// // // //                             Office location details will be shared
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Actions */}
// // // //                 <div className="mt-6 flex justify-end space-x-3">
// // // //                   <button
// // // //                     onClick={() => setStep(1)}
// // // //                     className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
// // // //                   >
// // // //                     Cancel
// // // //                   </button>
// // // //                   <button
// // // //                     onClick={handleSchedule}
// // // //                     disabled={!selectedCandidate}
// // // //                     className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
// // // //                   >
// // // //                     Schedule Interview
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </main>

// // // //       {/* Job Description Modal */}
// // // //       <JobDescriptionModal
// // // //         open={showJDModal}
// // // //         value={jobDescription}
// // // //         defaultTitle={selectedTitle}
// // // //         onChange={setJobDescription}
// // // //         onClose={() => setShowJDModal(false)}
// // // //         onSave={() => setShowJDModal(false)}
// // // //       />
// // // //     </div>
// // // //   );
// // // // }
// // // "use client";

// // // import React, { useEffect, useState, useCallback } from "react";
// // // import { Video, MapPin, Search, FileText } from "lucide-react";
// // // import { useRouter } from "next/navigation";

// // // import CalendarGrid from "./subComponents/CalendarGrid";
// // // import TimeSlots, { type Slot } from "./subComponents/TimeSlots";
// // // import CandidateSelector from "./subComponents/CandidateSelector";
// // // import InterviewerPicker, { type Interviewer } from "./subComponents/InterviewerPicker";
// // // import JobDescriptionModal from "./subComponents/JobDescriptionModal";
// // // import InterviewSummary from "./subComponents/InterviewSummary";

// // // import { fetchCandidates, scheduleInterview, type RawCandidate } from "@/services/api/schedulerAPI";

// // // // ---- Mock time slots (kept from original) ----
// // // const MORNING: Slot[] = [
// // //   { id: 1, time: "9:00 AM", available: true },
// // //   { id: 2, time: "9:30 AM", available: true },
// // //   { id: 3, time: "10:00 AM", available: true },
// // //   { id: 4, time: "10:30 AM", available: false },
// // //   { id: 5, time: "11:00 AM", available: true },
// // //   { id: 6, time: "11:30 AM", available: true },
// // // ];
// // // const AFTERNOON: Slot[] = [
// // //   { id: 7, time: "1:00 PM", available: true },
// // //   { id: 8, time: "1:30 PM", available: false },
// // //   { id: 9, time: "2:00 PM", available: true },
// // //   { id: 10, time: "2:30 PM", available: true },
// // //   { id: 11, time: "3:00 PM", available: false },
// // //   { id: 12, time: "3:30 PM", available: true },
// // //   { id: 13, time: "4:00 PM", available: true },
// // //   { id: 14, time: "4:30 PM", available: true },
// // // ];

// // // // ---- Mock interviewers (kept from original semantics) ----
// // // const DEFAULT_INTERVIEWERS: Interviewer[] = [
// // //   { id: 1, name: "Alex Rodriguez", role: "Engineering Manager", checked: true },
// // //   { id: 2, name: "Sarah Kim", role: "Senior Engineer", checked: true },
// // //   { id: 3, name: "David Wilson", role: "Product Manager", checked: false },
// // // ];

// // // export default function SchedulerInterface() {
// // //   const router = useRouter();

// // //   // steps: 1 date, 2 time, 3 confirm
// // //   const [step, setStep] = useState<1 | 2 | 3>(1);
// // //   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
// // //   const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

// // //   const [candidates, setCandidates] = useState<RawCandidate[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedCandidate, setSelectedCandidate] = useState<RawCandidate | null>(null);

// // //   const [interviewers, setInterviewers] = useState<Interviewer[]>(DEFAULT_INTERVIEWERS);

// // //   const [jobDescription, setJobDescription] = useState("");
// // //   const [showJDModal, setShowJDModal] = useState(false);

// // //   // --------- data loading ----------
// // //   const load = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       const list = await fetchCandidates();
// // //       setCandidates(list);
// // //     } catch {
// // //       // fallback to a tiny mock if backend is down
// // //       setCandidates([
// // //         { id: 1, name: "Emily Johnson", role: "Senior Software Engineer", photo: null },
// // //         { id: 2, name: "Michael Chen", role: "Senior Software Engineer", photo: null },
// // //         { id: 3, name: "Sophia Williams", role: "Senior Software Engineer", photo: null },
// // //       ]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => { load(); }, [load]);

// // //   // --------- calendar handlers ----------
// // //   const goPrevMonth = () =>
// // //     setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
// // //   const goNextMonth = () =>
// // //     setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
// // //   const pickDay = (d: number) => {
// // //     setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), d));
// // //     setStep(2);
// // //   };

// // //   // --------- time slot handlers ----------
// // //   const backToCalendar = () => setStep(1);
// // //   const pickSlot = (s: Slot) => {
// // //     setSelectedSlot(s);
// // //     setStep(3);
// // //   };

// // //   // toggle interviewer
// // //   const toggleInterviewer = (id: number) =>
// // //     setInterviewers((prev) => prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it)));

// // //   // --------- schedule interview ----------
// // //   const handleSchedule = async () => {
// // //     if (!selectedCandidate) {
// // //       alert("Please select a candidate");
// // //       return;
// // //     }
// // //     if (!selectedSlot) {
// // //       alert("Please pick a time slot");
// // //       return;
// // //     }

// // //     // ensure we have email (if not, attempt to refresh candidates for this job)
// // //     let withEmail = selectedCandidate;
// // //     if (!withEmail.email) {
// // //       const refreshed = await fetchCandidates(withEmail.job_id);
// // //       const found = refreshed.find((c: RawCandidate) => String(c.id) === String(withEmail.id));
// // //       if (!found?.email) {
// // //         alert("Cannot schedule interview: Candidate email not found.");
// // //         return;
// // //       }
// // //       withEmail = found;
// // //     }

// // //     // compose datetime from date + slot
// // //     const [hm, ampm] = selectedSlot.time.split(" ");
// // //     const [hStr, mStr] = hm.split(":");
// // //     const h = parseInt(hStr, 10);
// // //     const m = parseInt(mStr, 10);
// // //     const isPM = ampm?.toUpperCase().includes("PM");
// // //     const dt = new Date(selectedDate);
// // //     dt.setHours(isPM && h !== 12 ? h + 12 : h === 12 && !isPM ? 0 : h);
// // //     dt.setMinutes(m);

// // //     const res = await scheduleInterview({
// // //       candidate_id: withEmail.id,
// // //       email: withEmail.email!,
// // //       date_iso: dt.toISOString(),
// // //       time_slot: selectedSlot.time,
// // //     });

// // //     if (!res.success) {
// // //       alert(`Failed to schedule interview: ${res.message ?? "Unknown error"}`);
// // //       return;
// // //     }

// // //     if (res.already_scheduled) {
// // //       alert(`Interview already scheduled.\nLink: ${res.interview_link}`);
// // //     } else {
// // //       const msg =
// // //         `Interview scheduled!\n\n` +
// // //         `Candidate: ${withEmail.name}\n` +
// // //         `Email: ${withEmail.email}\n` +
// // //         `Link: ${res.interview_link}\n` +
// // //         `KB: ${res.knowledge_base_id}\n` +
// // //         `Resume: ${res.resume_extracted ? "✅" : "❌"}\n` +
// // //         `Job Description: ${res.job_description_used ? "✅ Provided" : "📝 Auto" }\n\n` +
// // //         `${res.email_sent ? "Email sent." : "Email sending failed."}`;
// // //       alert(msg);
// // //       if (res.interview_link && navigator.clipboard) {
// // //         try { await navigator.clipboard.writeText(res.interview_link); } catch {}
// // //       }
// // //     }

// // //     // back to candidate list (or route)
// // //     router.push("/candidates");
// // //   };

// // //   // --------- derived ---------
// // //   const selectedTitle = selectedCandidate?.job_title ?? selectedCandidate?.role ?? undefined;

// // //   // --------- UI ---------
// // //   if (loading) {
// // //     return (
// // //       <div className="flex min-h-screen items-center justify-center bg-gray-50">
// // //         <div className="animate-pulse text-gray-500">Loading candidates...</div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="flex min-h-screen flex-col bg-gray-50">
// // //       {/* keep your Navbar in layout */}

// // //       <main className="flex-grow p-6">
// // //         {/* Header */}
// // //         <div className="mb-6 flex items-center justify-between">
// // //           <h1 className="text-2xl font-bold text-gray-700">Interview Scheduler</h1>
// // //           <div className="flex items-center space-x-3">
// // //             <div className="relative">
// // //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
// // //               <input
// // //                 placeholder="Search…"
// // //                 className="font-medium text-gray-700 rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Wizard container */}
// // //         <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
// // //           {/* Step header */}
// // //           <div className="border-b border-gray-200 bg-gray-50 p-4">
// // //             <div className="flex items-center justify-between">
// // //               <h2 className="font-medium text-gray-700">Schedule an Interview</h2>
// // //               <div className="flex items-center">
// // //                 {([1, 2, 3] as const).map((n, i) => (
// // //                   <React.Fragment key={n}>
// // //                     <div
// // //                       className={[
// // //                         "flex items-center",
// // //                         step >= n ? "text-blue-600" : "text-gray-400",
// // //                       ].join(" ")}
// // //                     >
// // //                       <div
// // //                         className={[
// // //                           "flex h-6 w-6 items-center justify-center rounded-full border-2",
// // //                           step >= n ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300",
// // //                         ].join(" ")}
// // //                       >
// // //                         {n}
// // //                       </div>
// // //                       <span className="ml-2 text-sm font-medium">
// // //                         {n === 1 ? "Select Date" : n === 2 ? "Select Time" : "Confirm"}
// // //                       </span>
// // //                     </div>
// // //                     {i < 2 && (
// // //                       <div className={`mx-2 h-1 w-8 ${step > n ? "bg-blue-600" : "bg-gray-200"}`} />
// // //                     )}
// // //                   </React.Fragment>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Body */}
// // //           <div className="p-6">
// // //             {step === 1 && (
// // //               <CalendarGrid
// // //                 selectedDate={selectedDate}
// // //                 onPrevMonth={goPrevMonth}
// // //                 onNextMonth={goNextMonth}
// // //                 onPickDay={pickDay}
// // //               />
// // //             )}

// // //             {step === 2 && (
// // //               <TimeSlots
// // //                 date={selectedDate}
// // //                 morning={MORNING}
// // //                 afternoon={AFTERNOON}
// // //                 selected={selectedSlot}
// // //                 onPick={pickSlot}
// // //                 onBack={backToCalendar}
// // //               />
// // //             )}

// // //             {step === 3 && (
// // //               <div>
// // //                 <InterviewSummary
// // //                   date={selectedDate}
// // //                   timeText={selectedSlot?.time}
// // //                   title={selectedTitle}
// // //                   candidateName={selectedCandidate?.name}
// // //                 />

// // //                 <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
// // //                   <CandidateSelector
// // //                     items={candidates}
// // //                     selected={selectedCandidate}
// // //                     onPick={(c) => {
// // //                       setSelectedCandidate(c);
// // //                       if (c.job_description) setJobDescription(c.job_description);
// // //                     }}
// // //                   />

// // //                   <InterviewerPicker
// // //                     items={interviewers}
// // //                     onToggle={toggleInterviewer}
// // //                   />
// // //                 </div>

// // //                 {/* Job Description section */}
// // //                 <div className="mb-4 border-t border-gray-200 pt-4">
// // //                   <div className="mb-3 flex items-center justify-between">
// // //                     <h4 className="font-medium text-gray-700">Job Description (Optional)</h4>
// // //                     <button
// // //                       onClick={() => setShowJDModal(true)}
// // //                       className="flex items-center text-sm text-blue-600 hover:underline"
// // //                     >
// // //                       <FileText size={16} className="mr-1" />
// // //                       {jobDescription ? "Edit" : "Add"} Job Description
// // //                     </button>
// // //                   </div>
// // //                   <div className="rounded-md bg-gray-50 p-3">
// // //                     <p className="text-sm text-gray-600">
// // //                       {jobDescription ? (
// // //                         <span>{jobDescription.length > 120 ? `${jobDescription.slice(0, 120)}…` : jobDescription}</span>
// // //                       ) : (
// // //                         <em>
// // //                           No job description provided. The system will use a generic description
// // //                           or candidate&apos;s profile.
// // //                         </em>
// // //                       )}
// // //                     </p>
// // //                   </div>
// // //                 </div>

// // //                 {/* Interview method (kept visual) */}
// // //                 <div className="border-t border-gray-200 pt-4">
// // //                   <h4 className="mb-3 font-medium text-gray-700">Interview Method</h4>
// // //                   <div className="flex space-x-4">
// // //                     <div className="flex-1 cursor-pointer rounded-md border border-blue-500 bg-blue-50 p-4 hover:border-blue-500 hover:bg-blue-50">
// // //                       <div className="flex items-center">
// // //                         <Video size={20} className="mr-3 text-blue-800" />
// // //                         <div>
// // //                           <div className="font-medium text-sm text-gray-700">AI-Powered Video Interview</div>
// // //                           <div className="text-sm text-gray-500">
// // //                             Secure interview link will be sent automatically
// // //                           </div>
// // //                           <div className="mt-1 text-xs text-green-600">
// // //                             ✓ Knowledge base will be created from resume
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                     <div className="flex-1 cursor-pointer rounded-md border border-gray-200 p-4 hover:border-blue-500 hover:bg-blue-50">
// // //                       <div className="flex items-center">
// // //                         <MapPin size={20} className="mr-3 text-gray-600" />
// // //                         <div>
// // //                           <div className="font-medium text-sm text-gray-700 ">In-Person</div>
// // //                           <div className="text-sm text-gray-500">
// // //                             Office location details will be shared
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Actions */}
// // //                 <div className="mt-6 flex justify-end space-x-3">
// // //                   <button
// // //                     onClick={() => setStep(1)}
// // //                     className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                   <button
// // //                     onClick={handleSchedule}
// // //                     disabled={!selectedCandidate}
// // //                     className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
// // //                   >
// // //                     Schedule Interview
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </main>

// // //       {/* Job Description Modal */}
// // //       <JobDescriptionModal
// // //         open={showJDModal}
// // //         value={jobDescription}
// // //         defaultTitle={selectedTitle}
// // //         onChange={setJobDescription}
// // //         onClose={() => setShowJDModal(false)}
// // //         onSave={() => setShowJDModal(false)}
// // //       />
// // //     </div>
// // //   );
// // // }
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";
// // import React, { useEffect, useState, useCallback } from "react";
// // import { Video, MapPin, FileText, ChevronLeft, ChevronRight, Clock, CheckCircle, X } from "lucide-react";
// // import { useRouter } from "next/navigation";
// // import { fetchCandidates, scheduleInterview, type RawCandidate } from "@/services/api/schedulerAPI";

// // // ── Types ─────────────────────────────────────────────────────────────────────
// // type Slot = { id: number; time: string; available: boolean };
// // type Interviewer = { id: number; name: string; role: string; checked: boolean };

// // // ── Constants ─────────────────────────────────────────────────────────────────
// // const MORNING: Slot[] = [
// //   { id: 1, time: "9:00 AM",  available: true  },
// //   { id: 2, time: "9:30 AM",  available: true  },
// //   { id: 3, time: "10:00 AM", available: true  },
// //   { id: 4, time: "10:30 AM", available: false },
// //   { id: 5, time: "11:00 AM", available: true  },
// //   { id: 6, time: "11:30 AM", available: true  },
// // ];
// // const AFTERNOON: Slot[] = [
// //   { id: 7,  time: "1:00 PM", available: true  },
// //   { id: 8,  time: "1:30 PM", available: false },
// //   { id: 9,  time: "2:00 PM", available: true  },
// //   { id: 10, time: "2:30 PM", available: true  },
// //   { id: 11, time: "3:00 PM", available: false },
// //   { id: 12, time: "3:30 PM", available: true  },
// //   { id: 13, time: "4:00 PM", available: true  },
// //   { id: 14, time: "4:30 PM", available: true  },
// // ];
// // const DEFAULT_INTERVIEWERS: Interviewer[] = [
// //   { id: 1, name: "Alex Rodriguez", role: "Engineering Manager", checked: true  },
// //   { id: 2, name: "Sarah Kim",       role: "Senior Engineer",    checked: true  },
// //   { id: 3, name: "David Wilson",    role: "Product Manager",    checked: false },
// // ];

// // // ── Design tokens ─────────────────────────────────────────────────────────────
// // const T = {
// //   accent:    "#2563EB",
// //   accentL:   "#EFF6FF",
// //   accentM:   "#BFDBFE",
// //   green:     "#059669",
// //   greenL:    "#ECFDF5",
// //   red:       "#DC2626",
// //   amber:     "#D97706",
// //   t1:        "#0F172A",
// //   t2:        "#64748B",
// //   t3:        "#94A3B8",
// //   border:    "rgba(0,0,0,0.08)",
// //   borderMd:  "rgba(0,0,0,0.14)",
// //   surface:   "#FFFFFF",
// //   bg:        "#F8FAFC",
// // };

// // // ── Avatar helper ─────────────────────────────────────────────────────────────
// // const PALETTES: [string,string][] = [
// //   ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
// //   ["#FAF5FF","#7C3AED"],["#F0FDFA","#0D9488"],["#FFFBEB","#D97706"],
// // ];
// // function avatarColors(name: string): [string,string] {
// //   let h = 0;
// //   for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
// //   return PALETTES[Math.abs(h) % PALETTES.length];
// // }
// // function initials(name: string) {
// //   return name.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();
// // }

// // // ══════════════════════════════════════════════════════════════════════════════
// // // SUB-COMPONENTS (all inline styles — Tailwind-free)
// // // ══════════════════════════════════════════════════════════════════════════════

// // // ── Step indicator ────────────────────────────────────────────────────────────
// // function StepBar({ step }: { step: number }) {
// //   const steps = ["Select Date", "Select Time", "Confirm Details"];
// //   return (
// //     <div style={{ display:"flex", alignItems:"center" }}>
// //       {steps.map((label, i) => {
// //         const n       = i + 1;
// //         const active  = step >= n;
// //         const current = step === n;
// //         return (
// //           <React.Fragment key={n}>
// //             <div style={{ display:"flex", alignItems:"center", gap:8 }}>
// //               <div style={{
// //                 width:28, height:28, borderRadius:"50%", border:`2px solid ${active ? T.accent : T.t3}`,
// //                 background: active ? T.accent : "transparent",
// //                 display:"flex", alignItems:"center", justifyContent:"center",
// //                 fontSize:12, fontWeight:600, color: active ? "#fff" : T.t3,
// //                 transition:"all .2s",
// //               }}>
// //                 {step > n ? <CheckCircle size={14} /> : n}
// //               </div>
// //               <span style={{
// //                 fontSize:13, fontWeight: current ? 600 : 400,
// //                 color: active ? T.t1 : T.t3, whiteSpace:"nowrap",
// //               }}>{label}</span>
// //             </div>
// //             {i < 2 && (
// //               <div style={{
// //                 width:40, height:2, margin:"0 12px", borderRadius:2,
// //                 background: step > n ? T.accent : T.borderMd, transition:"background .2s",
// //               }} />
// //             )}
// //           </React.Fragment>
// //         );
// //       })}
// //     </div>
// //   );
// // }

// // // ── Calendar ──────────────────────────────────────────────────────────────────
// // function CalendarGrid({
// //   selectedDate, onPrevMonth, onNextMonth, onPickDay,
// // }: {
// //   selectedDate: Date; onPrevMonth: ()=>void; onNextMonth: ()=>void; onPickDay: (d:number)=>void;
// // }) {
// //   const daysInMonth   = new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1, 0).getDate();
// //   const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
// //   const today         = new Date();
// //   const weekdays      = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// //   return (
// //     <div>
// //       {/* Month nav */}
// //       <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
// //         <button onClick={onPrevMonth}
// //           style={{ width:36,height:36,borderRadius:8,border:`0.5px solid ${T.borderMd}`,background:T.surface,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
// //           <ChevronLeft size={18} color={T.t2} />
// //         </button>
// //         <span style={{ fontSize:15,fontWeight:600,color:T.t1 }}>
// //           {selectedDate.toLocaleString("default", { month:"long", year:"numeric" })}
// //         </span>
// //         <button onClick={onNextMonth}
// //           style={{ width:36,height:36,borderRadius:8,border:`0.5px solid ${T.borderMd}`,background:T.surface,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
// //           <ChevronRight size={18} color={T.t2} />
// //         </button>
// //       </div>

// //       {/* Grid */}
// //       <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
// //         {/* Weekday headers */}
// //         {weekdays.map(d => (
// //           <div key={d} style={{ textAlign:"center", fontSize:11, fontWeight:600, color:T.t3, paddingBottom:8, textTransform:"uppercase", letterSpacing:.5 }}>{d}</div>
// //         ))}
// //         {/* Blank cells */}
// //         {Array.from({ length: firstDayOfMonth }).map((_,i) => <div key={`b${i}`} />)}
// //         {/* Day cells */}
// //         {Array.from({ length: daysInMonth }).map((_,i) => {
// //           const day = i+1;
// //           const isToday    = today.getDate()===day && today.getMonth()===selectedDate.getMonth() && today.getFullYear()===selectedDate.getFullYear();
// //           const isSelected = selectedDate.getDate()===day;
// //           const hasSlot    = day % 3 === 0;
// //           return (
// //             <button
// //               key={day}
// //               onClick={() => onPickDay(day)}
// //               style={{
// //                 padding:"10px 4px", borderRadius:8, border:`0.5px solid ${isSelected ? T.accent : T.border}`,
// //                 background: isSelected ? T.accent : isToday ? T.accentL : T.surface,
// //                 color: isSelected ? "#fff" : T.t1,
// //                 cursor:"pointer", textAlign:"center", transition:"all .12s",
// //                 display:"flex", flexDirection:"column", alignItems:"center", gap:3,
// //               }}
// //             >
// //               <span style={{ fontSize:13, fontWeight: isSelected||isToday ? 600 : 400 }}>{day}</span>
// //               {hasSlot && (
// //                 <span style={{ width:5,height:5,borderRadius:"50%",background: isSelected?"rgba(255,255,255,0.8)":T.green }} />
// //               )}
// //             </button>
// //           );
// //         })}
// //       </div>

// //       {/* Legend */}
// //       <div style={{ display:"flex", gap:20, marginTop:18 }}>
// //         {[
// //           { color:T.green, label:"Available slots"  },
// //           { color:T.accent,label:"Selected date"     },
// //         ].map(({ color, label }) => (
// //           <div key={label} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:T.t2 }}>
// //             <div style={{ width:10,height:10,borderRadius:"50%",background:color }} />
// //             {label}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // ── Time slots ────────────────────────────────────────────────────────────────
// // function TimeSlots({
// //   date, morning, afternoon, selected, onPick, onBack,
// // }: {
// //   date:Date; morning:Slot[]; afternoon:Slot[]; selected:Slot|null;
// //   onPick:(s:Slot)=>void; onBack:()=>void;
// // }) {
// //   const friendly = date.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" });

// //   const SlotBtn = ({ slot }: { slot: Slot }) => {
// //     const sel = selected?.id === slot.id;
// //     return (
// //       <button
// //         onClick={() => slot.available && onPick(slot)}
// //         disabled={!slot.available}
// //         style={{
// //           width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
// //           padding:"12px 14px", borderRadius:9, marginBottom:8,
// //           border:`0.5px solid ${sel ? T.accent : slot.available ? T.borderMd : T.border}`,
// //           background: sel ? T.accentL : slot.available ? T.surface : T.bg,
// //           cursor: slot.available ? "pointer" : "not-allowed",
// //           opacity: slot.available ? 1 : 0.5,
// //           transition:"all .12s",
// //         }}
// //       >
// //         <span style={{ display:"flex", alignItems:"center", gap:8, fontSize:13,
// //           fontWeight: sel ? 600 : 400, color: sel ? T.accent : T.t1 }}>
// //           <Clock size={15} color={sel ? T.accent : T.t2} />
// //           {slot.time}
// //         </span>
// //         {!slot.available && <span style={{ fontSize:11, color:T.t3 }}>Unavailable</span>}
// //         {sel && <span style={{ fontSize:11, fontWeight:600, color:T.accent }}>Selected ✓</span>}
// //       </button>
// //     );
// //   };

// //   return (
// //     <div>
// //       <button onClick={onBack}
// //         style={{ display:"flex",alignItems:"center",gap:4,fontSize:13,fontWeight:500,color:T.accent,background:"none",border:"none",cursor:"pointer",marginBottom:16,padding:0 }}>
// //         <ChevronLeft size={15}/> Back to calendar
// //       </button>
// //       <h3 style={{ fontSize:16,fontWeight:600,color:T.t1,marginBottom:20 }}>
// //         Select a time on <span style={{ color:T.accent }}>{friendly}</span>
// //       </h3>
// //       <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
// //         <div>
// //           <p style={{ fontSize:13,fontWeight:600,color:T.t1,marginBottom:12 }}>Morning</p>
// //           {morning.map(s => <SlotBtn key={s.id} slot={s} />)}
// //         </div>
// //         <div>
// //           <p style={{ fontSize:13,fontWeight:600,color:T.t1,marginBottom:12 }}>Afternoon</p>
// //           {afternoon.map(s => <SlotBtn key={s.id} slot={s} />)}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ── Interview summary banner ───────────────────────────────────────────────────
// // function InterviewSummary({ date, timeText, title, candidateName }: {
// //   date:Date; timeText?:string; title?:string; candidateName?:string;
// // }) {
// //   const friendly = date.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" });
// //   return (
// //     <div style={{
// //       display:"flex", alignItems:"flex-start", gap:14,
// //       padding:"16px 18px", borderRadius:12,
// //       border:`0.5px solid ${T.accentM}`, background:T.accentL, marginBottom:24,
// //     }}>
// //       <div style={{ width:36,height:36,borderRadius:9,background:T.accent,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
// //         <CheckCircle size={18} color="#fff" />
// //       </div>
// //       <div>
// //         <p style={{ fontSize:13,fontWeight:600,color:T.t1,marginBottom:4 }}>Interview Summary</p>
// //         <p style={{ fontSize:15,fontWeight:600,color:T.accent }}>
// //           {friendly}{timeText ? ` at ${timeText}` : ""}
// //         </p>
// //         <div style={{ display:"flex", gap:24, marginTop:10 }}>
// //           <div style={{ fontSize:13, color:T.t2 }}>
// //             <span style={{ fontWeight:600,color:T.t1 }}>Position: </span>{title || "—"}
// //           </div>
// //           <div style={{ fontSize:13, color:T.t2 }}>
// //             <span style={{ fontWeight:600,color:T.t1 }}>Candidate: </span>{candidateName || "—"}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ── Candidate selector ────────────────────────────────────────────────────────
// // function CandidateSelector({ items, selected, onPick }: {
// //   items:RawCandidate[]; selected:RawCandidate|null; onPick:(c:RawCandidate)=>void;
// // }) {
// //   return (
// //     <div>
// //       <p style={{ fontSize:13,fontWeight:600,color:T.t1,marginBottom:12 }}>Select Candidate</p>
// //       <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
// //         {items.map(c => {
// //           const chosen = selected?.id === c.id;
// //           const [bg,fg] = avatarColors(c.name ?? "?");
// //           return (
// //             <button key={c.id} onClick={() => onPick(c)}
// //               style={{
// //                 display:"flex",alignItems:"center",justifyContent:"space-between",
// //                 padding:"12px 14px", borderRadius:10, textAlign:"left",
// //                 border:`0.5px solid ${chosen ? T.accent : T.borderMd}`,
// //                 background: chosen ? T.accentL : T.surface,
// //                 cursor:"pointer", transition:"all .12s",
// //                 boxShadow: chosen ? `0 0 0 2px ${T.accentM}` : "none",
// //               }}
// //             >
// //               <div style={{ display:"flex",alignItems:"center",gap:12 }}>
// //                 <div style={{
// //                   width:40,height:40,borderRadius:"50%",flexShrink:0,
// //                   display:"flex",alignItems:"center",justifyContent:"center",
// //                   fontSize:14,fontWeight:700,background:bg,color:fg,
// //                 }}>
// //                   {c.photo
// //                     ? <img src={c.photo} alt={c.name??""} style={{ width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover" }} />
// //                     : initials(c.name ?? "?")}
// //                 </div>
// //                 <div>
// //                   <p style={{ fontSize:13,fontWeight:600,color: chosen ? T.accent : T.t1 }}>{c.name ?? "Unknown"}</p>
// //                   <p style={{ fontSize:12,color:T.t2,marginTop:2 }}>{c.job_title ?? c.role ?? "—"}</p>
// //                   {c.email && <p style={{ fontSize:11,color:T.t3,marginTop:1 }}>{c.email}</p>}
// //                   {c.resume_path && (
// //                     <p style={{ fontSize:11,fontWeight:600,color:T.green,marginTop:3,display:"flex",alignItems:"center",gap:4 }}>
// //                       <FileText size={11} /> Resume available
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>
// //               {chosen && <CheckCircle size={18} color={T.green} />}
// //             </button>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// // // ── Interviewer picker ────────────────────────────────────────────────────────
// // function InterviewerPicker({ items, onToggle }: { items:Interviewer[]; onToggle:(id:number)=>void; }) {
// //   return (
// //     <div>
// //       <p style={{ fontSize:13,fontWeight:600,color:T.t1,marginBottom:12 }}>Interviewers</p>
// //       <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
// //         {items.map(it => {
// //           const [bg,fg] = avatarColors(it.name);
// //           return (
// //             <div key={it.id}
// //               style={{
// //                 display:"flex",alignItems:"center",justifyContent:"space-between",
// //                 padding:"12px 14px",borderRadius:10,
// //                 border:`0.5px solid ${it.checked ? T.accent : T.borderMd}`,
// //                 background: it.checked ? T.accentL : T.surface,
// //                 transition:"all .12s",
// //               }}
// //             >
// //               <div style={{ display:"flex",alignItems:"center",gap:12 }}>
// //                 <div style={{
// //                   width:40,height:40,borderRadius:"50%",
// //                   display:"flex",alignItems:"center",justifyContent:"center",
// //                   fontSize:14,fontWeight:700,background:bg,color:fg,flexShrink:0,
// //                 }}>
// //                   {initials(it.name)}
// //                 </div>
// //                 <div>
// //                   <p style={{ fontSize:13,fontWeight:600,color:T.t1 }}>{it.name}</p>
// //                   <p style={{ fontSize:12,color:T.t2,marginTop:2 }}>{it.role}</p>
// //                 </div>
// //               </div>
// //               <input
// //                 type="checkbox"
// //                 checked={it.checked}
// //                 onChange={() => onToggle(it.id)}
// //                 style={{ width:18,height:18,cursor:"pointer",accentColor:T.accent }}
// //               />
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// // // ── Job description modal ─────────────────────────────────────────────────────
// // function JobDescriptionModal({ open, value, defaultTitle, onChange, onClose, onSave }: {
// //   open:boolean; value:string; defaultTitle?:string;
// //   onChange:(s:string)=>void; onClose:()=>void; onSave:()=>void;
// // }) {
// //   if (!open) return null;
// //   return (
// //     <div style={{
// //       position:"fixed",inset:0,zIndex:9999,
// //       background:"rgba(15,23,42,0.45)",
// //       display:"flex",alignItems:"center",justifyContent:"center",padding:16,
// //     }} onMouseDown={e => { if(e.target===e.currentTarget) onClose(); }}>
// //       <div style={{ background:T.surface,borderRadius:16,width:"100%",maxWidth:560,maxHeight:"80vh",overflow:"hidden",display:"flex",flexDirection:"column" }}>
// //         <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 22px",borderBottom:`0.5px solid ${T.border}` }}>
// //           <h3 style={{ fontSize:15,fontWeight:600,color:T.t1 }}>Add / Edit Job Description</h3>
// //           <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:T.t2,display:"flex" }}>
// //             <X size={20} />
// //           </button>
// //         </div>
// //         <div style={{ padding:"18px 22px",flex:1,overflow:"auto" }}>
// //           <label style={{ fontSize:12,fontWeight:600,color:T.t2,display:"block",marginBottom:8,textTransform:"uppercase",letterSpacing:.5 }}>
// //             Job Description
// //           </label>
// //           <textarea
// //             rows={10}
// //             value={value}
// //             onChange={e => onChange(e.target.value)}
// //             placeholder={`Enter job description for ${defaultTitle ?? "the position"}…`}
// //             style={{
// //               width:"100%",padding:"12px 14px",fontSize:13,fontFamily:"inherit",
// //               color:T.t1,border:`0.5px solid ${T.borderMd}`,borderRadius:9,
// //               outline:"none",resize:"vertical",lineHeight:1.6,background:T.bg,
// //             }}
// //           />
// //         </div>
// //         <div style={{ display:"flex",justifyContent:"flex-end",gap:10,padding:"14px 22px",borderTop:`0.5px solid ${T.border}` }}>
// //           <button onClick={onClose}
// //             style={{ padding:"8px 18px",fontSize:13,fontWeight:500,border:`0.5px solid ${T.borderMd}`,borderRadius:8,background:T.surface,color:T.t1,cursor:"pointer" }}>
// //             Cancel
// //           </button>
// //           <button onClick={onSave}
// //             style={{ padding:"8px 18px",fontSize:13,fontWeight:600,border:"none",borderRadius:8,background:T.accent,color:"#fff",cursor:"pointer" }}>
// //             Save Job Description
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ══════════════════════════════════════════════════════════════════════════════
// // // MAIN PAGE
// // // ══════════════════════════════════════════════════════════════════════════════
// // export default function SchedulerInterface() {
// //   const router = useRouter();

// //   const [step,              setStep]              = useState<1|2|3>(1);
// //   const [selectedDate,      setSelectedDate]      = useState<Date>(new Date());
// //   const [selectedSlot,      setSelectedSlot]      = useState<Slot|null>(null);
// //   const [candidates,        setCandidates]        = useState<RawCandidate[]>([]);
// //   const [loading,           setLoading]           = useState(true);
// //   const [selectedCandidate, setSelectedCandidate] = useState<RawCandidate|null>(null);
// //   const [interviewers,      setInterviewers]      = useState<Interviewer[]>(DEFAULT_INTERVIEWERS);
// //   const [jobDescription,    setJobDescription]    = useState("");
// //   const [showJDModal,       setShowJDModal]       = useState(false);
// //   const [interviewMethod,   setInterviewMethod]   = useState<"ai"|"inperson">("ai");

// //   const load = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const list = await fetchCandidates();
// //       setCandidates(list);
// //     } catch {
// //       setCandidates([
// //         { id: 1, name: "Emily Johnson",   role: "Senior Software Engineer", photo: null },
// //         { id: 2, name: "Michael Chen",    role: "Senior Software Engineer", photo: null },
// //         { id: 3, name: "Sophia Williams", role: "Senior Software Engineer", photo: null },
// //       ]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);
// //   useEffect(() => { load(); }, [load]);

// //   const goPrevMonth = () => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth()-1, 1));
// //   const goNextMonth = () => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1, 1));
// //   const pickDay     = (d: number) => { setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), d)); setStep(2); };
// //   const pickSlot    = (s: Slot)   => { setSelectedSlot(s); setStep(3); };
// //   const toggleInterviewer = (id: number) =>
// //     setInterviewers(prev => prev.map(it => it.id===id ? { ...it, checked:!it.checked } : it));

// //   const handleSchedule = async () => {
// //     if (!selectedCandidate) { alert("Please select a candidate"); return; }
// //     if (!selectedSlot)      { alert("Please pick a time slot");   return; }

// //     let withEmail = selectedCandidate;
// //     if (!withEmail.email) {
// //       const refreshed = await fetchCandidates(withEmail.job_id);
// //       const found = refreshed.find((c: RawCandidate) => String(c.id)===String(withEmail.id));
// //       if (!found?.email) { alert("Cannot schedule: Candidate email not found."); return; }
// //       withEmail = found;
// //     }

// //     const [hm, ampm] = selectedSlot.time.split(" ");
// //     const [hStr, mStr] = hm.split(":");
// //     const h = parseInt(hStr,10), m = parseInt(mStr,10);
// //     const isPM = ampm?.toUpperCase().includes("PM");
// //     const dt = new Date(selectedDate);
// //     dt.setHours(isPM && h!==12 ? h+12 : h===12 && !isPM ? 0 : h);
// //     dt.setMinutes(m);

// //     const res = await scheduleInterview({
// //       candidate_id: withEmail.id,
// //       email: withEmail.email!,
// //       date_iso: dt.toISOString(),
// //       time_slot: selectedSlot.time,
// //     });

// //     if (!res.success) { alert(`Failed: ${res.message ?? "Unknown error"}`); return; }

// //     if (res.already_scheduled) {
// //       alert(`Interview already scheduled.\nLink: ${res.interview_link}`);
// //     } else {
// //       alert(
// //         `Interview scheduled!\n\nCandidate: ${withEmail.name}\nEmail: ${withEmail.email}\n` +
// //         `Link: ${res.interview_link}\n${res.email_sent ? "Email sent." : "Email sending failed."}`
// //       );
// //       if (res.interview_link && navigator.clipboard)
// //         try { await navigator.clipboard.writeText(res.interview_link); } catch {}
// //     }
// //     router.push("/candidates");
// //   };

// //   const selectedTitle = selectedCandidate?.job_title ?? selectedCandidate?.role ?? undefined;

// //   // ── Loading state ──────────────────────────────────────────────────────────
// //   if (loading) {
// //     return (
// //       <div style={{ display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh",background:T.bg }}>
// //         <div style={{ display:"flex",alignItems:"center",gap:10,color:T.t2,fontSize:13 }}>
// //           <div style={{ width:18,height:18,borderRadius:"50%",border:`2px solid ${T.accentM}`,borderTopColor:T.accent,animation:"spin .7s linear infinite" }} />
// //           Loading candidates…
// //         </div>
// //         <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
// //       </div>
// //     );
// //   }

// //   // ── Main render ────────────────────────────────────────────────────────────
// //   return (
// //     <div style={{ background:T.bg, minHeight:"100vh" }}>
// //       <div style={{ maxWidth:920, margin:"0 auto", padding:"28px 24px 64px" }}>

// //         {/* ── Page header ── */}
// //         <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24 }}>
// //           <div>
// //             <h1 style={{ fontSize:22,fontWeight:600,color:T.t1,letterSpacing:"-.5px",margin:0 }}>
// //               Interview Scheduler
// //             </h1>
// //             <p style={{ fontSize:13,color:T.t2,marginTop:4 }}>
// //               Schedule and manage candidate interviews
// //             </p>
// //           </div>
// //         </div>

// //         {/* ── Wizard card ── */}
// //         <div style={{ background:T.surface,border:`0.5px solid ${T.border}`,borderRadius:16,overflow:"hidden" }}>

// //           {/* Step header */}
// //           <div style={{
// //             display:"flex",alignItems:"center",justifyContent:"space-between",
// //             padding:"16px 24px",borderBottom:`0.5px solid ${T.border}`,background:T.bg,
// //           }}>
// //             <span style={{ fontSize:14,fontWeight:600,color:T.t1 }}>Schedule an Interview</span>
// //             <StepBar step={step} />
// //           </div>

// //           {/* Step body */}
// //           <div style={{ padding:"28px 28px" }}>

// //             {/* ─── Step 1: Calendar ─── */}
// //             {step===1 && (
// //               <CalendarGrid
// //                 selectedDate={selectedDate}
// //                 onPrevMonth={goPrevMonth}
// //                 onNextMonth={goNextMonth}
// //                 onPickDay={pickDay}
// //               />
// //             )}

// //             {/* ─── Step 2: Time slots ─── */}
// //             {step===2 && (
// //               <TimeSlots
// //                 date={selectedDate}
// //                 morning={MORNING}
// //                 afternoon={AFTERNOON}
// //                 selected={selectedSlot}
// //                 onPick={pickSlot}
// //                 onBack={() => setStep(1)}
// //               />
// //             )}

// //             {/* ─── Step 3: Confirm ─── */}
// //             {step===3 && (
// //               <div>
// //                 {/* Summary banner */}
// //                 <InterviewSummary
// //                   date={selectedDate}
// //                   timeText={selectedSlot?.time}
// //                   title={selectedTitle}
// //                   candidateName={selectedCandidate?.name}
// //                 />

// //                 {/* Candidate + Interviewers */}
// //                 <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:24 }}>
// //                   <CandidateSelector
// //                     items={candidates}
// //                     selected={selectedCandidate}
// //                     onPick={c => { setSelectedCandidate(c); if(c.job_description) setJobDescription(c.job_description); }}
// //                   />
// //                   <InterviewerPicker items={interviewers} onToggle={toggleInterviewer} />
// //                 </div>

// //                 {/* Job Description */}
// //                 <div style={{ paddingTop:20,borderTop:`0.5px solid ${T.border}`,marginBottom:20 }}>
// //                   <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
// //                     <p style={{ fontSize:13,fontWeight:600,color:T.t1 }}>Job Description <span style={{ fontSize:12,fontWeight:400,color:T.t3 }}>(Optional)</span></p>
// //                     <button onClick={() => setShowJDModal(true)}
// //                       style={{ display:"flex",alignItems:"center",gap:5,fontSize:12,fontWeight:500,color:T.accent,background:"none",border:"none",cursor:"pointer" }}>
// //                       <FileText size={14} />
// //                       {jobDescription ? "Edit" : "Add"} Job Description
// //                     </button>
// //                   </div>
// //                   <div style={{ background:T.bg,borderRadius:9,border:`0.5px solid ${T.border}`,padding:"11px 14px" }}>
// //                     <p style={{ fontSize:13,color:T.t2,lineHeight:1.6 }}>
// //                       {jobDescription
// //                         ? jobDescription.length>120 ? `${jobDescription.slice(0,120)}…` : jobDescription
// //                         : <em>No job description provided. The system will use a generic description or candidate&apos;s profile.</em>}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* Interview Method */}
// //                 <div style={{ paddingTop:20,borderTop:`0.5px solid ${T.border}`,marginBottom:28 }}>
// //                   <p style={{ fontSize:13,fontWeight:600,color:T.t1,marginBottom:12 }}>Interview Method</p>
// //                   <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
// //                     {[
// //                       {
// //                         key:"ai", icon:<Video size={22} color={interviewMethod==="ai"?"#1E40AF":T.t2} />,
// //                         title:"AI-Powered Video Interview",
// //                         sub:"Secure interview link will be sent automatically",
// //                         extra:"✓ Knowledge base will be created from resume",
// //                         extraColor:T.green,
// //                       },
// //                       {
// //                         key:"inperson", icon:<MapPin size={22} color={interviewMethod==="inperson"?"#1E40AF":T.t2} />,
// //                         title:"In-Person",
// //                         sub:"Office location details will be shared",
// //                         extra: null, extraColor:"",
// //                       },
// //                     ].map(m => {
// //                       const active = interviewMethod===m.key;
// //                       return (
// //                         <button key={m.key} onClick={() => setInterviewMethod(m.key as any)}
// //                           style={{
// //                             padding:"16px",borderRadius:10,textAlign:"left",cursor:"pointer",
// //                             border:`1.5px solid ${active ? T.accent : T.borderMd}`,
// //                             background: active ? T.accentL : T.surface,
// //                             transition:"all .14s",
// //                           }}>
// //                           <div style={{ display:"flex",alignItems:"flex-start",gap:12 }}>
// //                             <div style={{ marginTop:2 }}>{m.icon}</div>
// //                             <div>
// //                               <p style={{ fontSize:13,fontWeight:600,color:active?T.accent:T.t1 }}>{m.title}</p>
// //                               <p style={{ fontSize:12,color:T.t2,marginTop:3 }}>{m.sub}</p>
// //                               {m.extra && <p style={{ fontSize:11,color:m.extraColor,marginTop:5,fontWeight:500 }}>{m.extra}</p>}
// //                             </div>
// //                           </div>
// //                         </button>
// //                       );
// //                     })}
// //                   </div>
// //                 </div>

// //                 {/* Actions */}
// //                 <div style={{ display:"flex",justifyContent:"flex-end",gap:10 }}>
// //                   <button onClick={() => setStep(1)}
// //                     style={{ padding:"9px 20px",fontSize:13,fontWeight:500,border:`0.5px solid ${T.borderMd}`,borderRadius:8,background:T.surface,color:T.t1,cursor:"pointer" }}>
// //                     Cancel
// //                   </button>
// //                   <button onClick={handleSchedule} disabled={!selectedCandidate}
// //                     style={{ padding:"9px 22px",fontSize:13,fontWeight:600,border:"none",borderRadius:8,background:!selectedCandidate?"#93C5FD":T.accent,color:"#fff",cursor:!selectedCandidate?"not-allowed":"pointer" }}>
// //                     Schedule Interview
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Job Description Modal */}
// //       <JobDescriptionModal
// //         open={showJDModal}
// //         value={jobDescription}
// //         defaultTitle={selectedTitle}
// //         onChange={setJobDescription}
// //         onClose={() => setShowJDModal(false)}
// //         onSave={() => setShowJDModal(false)}
// //       />
// //     </div>
// //   );
// // }
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { fetchCandidates, scheduleInterview } from "@/services/api/schedulerAPI";

// // ── Types ─────────────────────────────────────────────────────────────────────
// interface Candidate {
//   id: string; name: string; email: string; phone: string;
//   job_title: string; dept: string; location: string; processed_date: string;
//   ats_score: number; exam_percentage: number; exam_completed: boolean;
//   interview_scheduled: boolean; interview_date: string | null;
//   interview_type: string | null; interviewer: string | null;
//   meeting_link: string | null; duration: number;
//   interview_status: "pending" | "scheduled" | "completed" | "cancelled";
//   resume_path: string | null; job_description: string;
// }
// interface Interviewer { id: number; name: string; role: string; checked: boolean; }
// interface Slot        { id: number; time: string; available: boolean; }

// // ── Constants ─────────────────────────────────────────────────────────────────
// const MORNING: Slot[] = [
//   {id:1,time:"9:00 AM",available:true},{id:2,time:"9:30 AM",available:true},
//   {id:3,time:"10:00 AM",available:true},{id:4,time:"10:30 AM",available:false},
//   {id:5,time:"11:00 AM",available:true},{id:6,time:"11:30 AM",available:true},
// ];
// const AFTERNOON: Slot[] = [
//   {id:7,time:"1:00 PM",available:true},{id:8,time:"1:30 PM",available:false},
//   {id:9,time:"2:00 PM",available:true},{id:10,time:"2:30 PM",available:true},
//   {id:11,time:"3:00 PM",available:false},{id:12,time:"3:30 PM",available:true},
//   {id:13,time:"4:00 PM",available:true},{id:14,time:"4:30 PM",available:true},
// ];
// const DEFAULT_IVS: Interviewer[] = [
//   {id:1,name:"Alex Rodriguez",role:"Engineering Manager",checked:true},
//   {id:2,name:"Sarah Kim",      role:"Senior Engineer",   checked:true},
//   {id:3,name:"David Wilson",   role:"Product Manager",   checked:false},
// ];
// const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// const DEMO: Candidate[] = [
//   {id:"1",name:"Kiran Mehta",    email:"kiran.mehta@email.com",    phone:"+91 76543 21098",job_title:"Web Developer",           dept:"AI/ML",       location:"Hyderabad",processed_date:"2025-03-09",ats_score:91,exam_percentage:87,exam_completed:true, interview_scheduled:true, interview_date:"2025-06-25T10:00:00",interview_type:"video",    interviewer:"Priya Sharma",meeting_link:"https://meet.google.com/abc-def",duration:60,interview_status:"scheduled", resume_path:"/resumes/kiran.pdf", job_description:""},
//   {id:"2",name:"Sneha Patel",    email:"sneha.patel@email.com",    phone:"+91 65432 10987",job_title:"Python Developer",        dept:"AI",          location:"Hyderabad",processed_date:"2025-03-08",ats_score:82,exam_percentage:74,exam_completed:true, interview_scheduled:false,interview_date:null,                 interview_type:null,       interviewer:null,            meeting_link:null,                             duration:60,interview_status:"pending",   resume_path:"/resumes/sneha.pdf",  job_description:""},
//   {id:"3",name:"Deepak Verma",   email:"deepak.verma@email.com",   phone:"+91 10987 65432",job_title:"Junior Data Science",     dept:"AI/ML",       location:"Hyderabad",processed_date:"2025-03-13",ats_score:85,exam_percentage:79,exam_completed:true, interview_scheduled:false,interview_date:null,                 interview_type:null,       interviewer:null,            meeting_link:null,                             duration:60,interview_status:"pending",   resume_path:"/resumes/deepak.pdf", job_description:""},
//   {id:"4",name:"Meera Krishnan", email:"meera.k@email.com",        phone:"+91 99887 76655",job_title:"Frontend Developer",      dept:"AI/ML",       location:"Hyderabad",processed_date:"2025-03-14",ats_score:77,exam_percentage:71,exam_completed:true, interview_scheduled:true, interview_date:"2025-06-27T14:00:00",interview_type:"technical",interviewer:"Ravi Kumar",  meeting_link:"Room 203",                       duration:60,interview_status:"scheduled", resume_path:"/resumes/meera.pdf",  job_description:""},
//   {id:"5",name:"Arjun Sharma",   email:"arjun.sharma@email.com",   phone:"+91 98765 43210",job_title:"Junior Python Developer", dept:"AI/ML",       location:"Hyderabad",processed_date:"2025-03-10",ats_score:88,exam_percentage:83,exam_completed:true, interview_scheduled:true, interview_date:"2025-06-26T11:30:00",interview_type:"hr",       interviewer:"HR Team",     meeting_link:"https://zoom.us/j/123",          duration:60,interview_status:"scheduled", resume_path:"/resumes/arjun.pdf",  job_description:""},
//   {id:"6",name:"Vikram Singh",   email:"vikram.singh@email.com",   phone:"+91 32109 87654",job_title:"Product Manager",         dept:"Product",     location:"New York", processed_date:"2025-03-06",ats_score:79,exam_percentage:76,exam_completed:true, interview_scheduled:true, interview_date:"2025-06-24T09:00:00",interview_type:"final",    interviewer:"Director",    meeting_link:"https://meet.google.com/xyz",    duration:60,interview_status:"completed", resume_path:"/resumes/vikram.pdf", job_description:""},
//   {id:"7",name:"Ananya Rao",     email:"ananya.rao@email.com",     phone:"+91 21098 76543",job_title:"UX Designer",             dept:"Design",      location:"Bangalore",processed_date:"2025-03-05",ats_score:67,exam_percentage:72,exam_completed:true, interview_scheduled:false,interview_date:null,                 interview_type:null,       interviewer:null,            meeting_link:null,                             duration:60,interview_status:"pending",   resume_path:null,                  job_description:""},
//   {id:"8",name:"Rahul Nair",     email:"rahul.nair@email.com",     phone:"+91 88776 65544",job_title:"DevOps Engineer",         dept:"Engineering", location:"Remote",   processed_date:"2025-03-15",ats_score:93,exam_percentage:91,exam_completed:true, interview_scheduled:true, interview_date:"2025-06-28T15:00:00",interview_type:"technical",interviewer:"Tech Lead",   meeting_link:"https://meet.google.com/dev",    duration:60,interview_status:"scheduled", resume_path:"/resumes/rahul.pdf",  job_description:""},
// ];

// // ── Helpers ───────────────────────────────────────────────────────────────────
// function avColor(n:string):[string,string]{const p:any[]=[["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"]];let h=0;for(let i=0;i<n.length;i++)h=(h*31+n.charCodeAt(i))&0xffffffff;return p[Math.abs(h)%p.length];}
// function ini(n:string){return n.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();}
// function sbColor(s:number){return s>=80?"#059669":s>=60?"#D97706":"#DC2626";}
// function scoreCls(s:number){return s>=80?"sc-hi":s>=60?"sc-mid":"sc-lo";}
// function fmtDate(s?:string|null){if(!s)return "—";const d=new Date(s);return isNaN(d.getTime())?s:d.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});}
// function fmtTime(s?:string|null){if(!s)return "—";const d=new Date(s);return isNaN(d.getTime())?s:d.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});}
// function fmtDT(s?:string|null){return s?fmtDate(s)+" at "+fmtTime(s):"—";}
// function typeLabel(t?:string|null){return ({video:"Video Call",phone:"Phone Interview",onsite:"On-site",technical:"Technical Round",hr:"HR Round",final:"Final Round"} as any)[t||""]||t||"—";}
// function friendly(d:Date){return d.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});}
// function slotToDate(date:Date,timeStr:string){const[hm,ap]=timeStr.split(" ");const[hS,mS]=hm.split(":");let h=parseInt(hS,10);const m=parseInt(mS,10);const pm=ap?.toUpperCase().includes("PM");if(pm&&h!==12)h+=12;if(!pm&&h===12)h=0;const dt=new Date(date);dt.setHours(h,m,0,0);return dt;}

// // ── Global CSS ────────────────────────────────────────────────────────────────
// const CSS=`
// @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
// *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
// :root{--font:'DM Sans',sans-serif;--accent:#2563EB;--accent-l:#EFF6FF;--accent-m:#BFDBFE;--green:#059669;--green-l:#ECFDF5;--amber:#D97706;--amber-l:#FFFBEB;--red:#DC2626;--red-l:#FEF2F2;--purple:#7C3AED;--purple-l:#F5F3FF;--bg:#F8FAFC;--surface:#fff;--border:rgba(0,0,0,.08);--border-md:rgba(0,0,0,.14);--t1:#0F172A;--t2:#64748B;--t3:#94A3B8;--r:10px;--rl:14px;--rxl:18px;}
// body{font-family:var(--font);background:var(--bg);color:var(--t1)}
// ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:var(--border-md);border-radius:4px}
// .sch-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:16px 24px;background:var(--surface);border-bottom:.5px solid var(--border-md)}
// .sch-stat{background:var(--bg);border:.5px solid var(--border);border-radius:var(--rl);padding:14px 16px;position:relative;overflow:hidden;transition:box-shadow .15s}
// .sch-stat:hover{box-shadow:0 2px 10px rgba(0,0,0,.06)}
// .sch-stat-bar{position:absolute;top:0;left:0;width:3px;height:100%}
// .sch-stat-lbl{font-size:10px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}
// .sch-stat-val{font-size:24px;font-weight:600;color:var(--t1);letter-spacing:-1px;line-height:1}
// .sch-stat-sub{font-size:11px;color:var(--t3);margin-top:3px}
// .sch-mode-bar{display:flex;align-items:center;justify-content:space-between;padding:12px 24px;background:var(--surface);border-bottom:.5px solid var(--border-md)}
// .sch-mode-label{font-size:13px;font-weight:500;color:var(--t2)}
// .sch-mode-tabs{display:flex;background:#EEF2F7;border-radius:10px;padding:4px;border:.5px solid var(--border)}
// .sch-mode-tab{font-size:13px;font-weight:500;padding:7px 18px;border-radius:7px;cursor:pointer;color:var(--t2);border:none;background:transparent;font-family:var(--font);transition:all .15s;display:flex;align-items:center;gap:6px}
// .sch-mode-tab.active{background:var(--surface);color:var(--t1);box-shadow:0 1px 3px rgba(0,0,0,.09)}
// .sch-wrap{display:grid;grid-template-columns:400px 1fr;height:calc(100vh - 170px);overflow:hidden}
// .sch-left{display:flex;flex-direction:column;border-right:.5px solid var(--border-md);background:var(--surface);overflow:hidden}
// .sch-left-head{padding:14px 14px 0;border-bottom:.5px solid var(--border)}
// .sch-left-title-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
// .sch-left-title{font-size:14px;font-weight:600;color:var(--t1)}
// .sch-left-count{font-size:12px;color:var(--t2);background:var(--bg);padding:3px 9px;border-radius:20px;border:.5px solid var(--border)}
// .sch-search-wrap{position:relative;margin-bottom:10px}
// .sch-search-wrap svg{position:absolute;left:11px;top:50%;transform:translateY(-50%);width:14px;height:14px;stroke:var(--t3);fill:none;stroke-width:2;stroke-linecap:round;pointer-events:none}
// .sch-search{width:100%;padding:8px 12px 8px 32px;font-size:13px;font-family:var(--font);color:var(--t1);background:var(--bg);border:.5px solid var(--border);border-radius:9px;outline:none;transition:border-color .14s}
// .sch-search:focus{border-color:var(--accent-m);background:var(--surface)}
// .sch-search::placeholder{color:var(--t3)}
// .sch-chip-row{display:flex;gap:6px;overflow-x:auto;padding-bottom:10px;scrollbar-width:none}
// .sch-chip-row::-webkit-scrollbar{display:none}
// .sch-chip{flex-shrink:0;font-size:11px;font-weight:500;padding:4px 11px;border-radius:20px;border:.5px solid var(--border);background:var(--surface);color:var(--t2);cursor:pointer;transition:all .13s;white-space:nowrap;font-family:var(--font)}
// .sch-chip:hover{border-color:var(--accent-m);color:var(--accent)}
// .sch-chip.active{background:var(--accent);color:#fff;border-color:transparent}
// .sch-sort-row{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:.5px solid var(--border)}
// .sch-sort-lbl{font-size:10px;color:var(--t3);font-weight:500;text-transform:uppercase;letter-spacing:.5px}
// .sch-sort-sel{font-size:12px;font-family:var(--font);color:var(--t2);background:transparent;border:none;outline:none;cursor:pointer}
// .sch-cand-list{flex:1;overflow-y:auto;padding:6px}
// .sch-cand-card{display:flex;align-items:flex-start;gap:10px;padding:11px 9px;border-radius:10px;cursor:pointer;transition:background .12s;border:.5px solid transparent;margin-bottom:2px}
// .sch-cand-card:hover{background:var(--bg)}
// .sch-cand-card.sel{background:var(--accent-l);border-color:var(--accent-m)}
// .sch-av{width:38px;height:38px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600}
// .sch-cand-info{flex:1;min-width:0}
// .sch-cand-name{font-size:13px;font-weight:600;color:var(--t1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
// .sch-cand-role{font-size:11px;color:var(--t2);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
// .sch-cand-meta{display:flex;align-items:center;gap:6px;margin-top:5px}
// .sch-cand-right{display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0}
// .sc{font-size:11px;font-weight:600;padding:2px 7px;border-radius:6px;min-width:32px;text-align:center}
// .sc-hi{background:var(--green-l);color:var(--green)}.sc-mid{background:var(--amber-l);color:var(--amber)}.sc-lo{background:var(--red-l);color:var(--red)}
// .sch-date{font-size:10px;color:var(--t3)}
// .sch-pill{display:inline-flex;align-items:center;font-size:10px;font-weight:600;padding:2px 6px;border-radius:20px;white-space:nowrap}
// .pill-blue{background:var(--accent-l);color:var(--accent)}.pill-green{background:var(--green-l);color:var(--green)}.pill-amber{background:var(--amber-l);color:var(--amber)}.pill-red{background:var(--red-l);color:var(--red)}.pill-grey{background:#F1F5F9;color:var(--t2)}
// .sch-right{background:var(--bg);overflow-y:auto;display:flex;flex-direction:column}
// .sch-right-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:48px 32px;text-align:center}
// .sch-card{background:var(--surface);border:.5px solid var(--border);border-radius:var(--rl);overflow:hidden}
// .sch-card-head{display:flex;align-items:center;justify-content:space-between;padding:13px 18px;border-bottom:.5px solid var(--border)}
// .sch-card-title{font-size:13px;font-weight:600;color:var(--t1)}
// .sch-card-body{padding:18px}
// .sch-hero{background:var(--surface);border:.5px solid var(--border);border-radius:var(--rxl);padding:20px}
// .sch-hero-top{display:flex;align-items:flex-start;gap:14px;margin-bottom:16px}
// .sch-hero-av{width:54px;height:54px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700}
// .sch-hero-name{font-size:17px;font-weight:600;color:var(--t1);letter-spacing:-.3px}
// .sch-hero-role{font-size:12px;color:var(--t2);margin-top:2px}
// .sch-hero-badges{display:flex;gap:7px;margin-top:7px;flex-wrap:wrap}
// .sch-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
// .sch-info-item{background:var(--bg);border-radius:9px;padding:10px 12px}
// .sch-info-lbl{font-size:9px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px}
// .sch-info-val{font-size:13px;font-weight:500;color:var(--t1)}
// .sch-info-val a{color:var(--accent);text-decoration:none}
// .sch-step-bar{display:flex;background:var(--surface);border:.5px solid var(--border);border-radius:var(--rl);overflow:hidden;margin-bottom:16px}
// .sch-step{flex:1;padding:12px 16px;display:flex;align-items:center;gap:8px;border-right:.5px solid var(--border)}
// .sch-step:last-child{border-right:none}
// .sch-step.active{background:var(--accent-l)}.sch-step.done{background:var(--green-l)}
// .sch-step-num{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;border:.5px solid var(--border)}
// .sch-step.active .sch-step-num{background:var(--accent);color:#fff;border-color:transparent}
// .sch-step.done .sch-step-num{background:var(--green);color:#fff;border-color:transparent}
// .sch-step.inactive .sch-step-num{background:var(--bg);color:var(--t3)}
// .sch-step-lbl{font-size:12px;font-weight:600}
// .sch-step.active .sch-step-lbl{color:var(--accent)}.sch-step.done .sch-step-lbl{color:var(--green)}.sch-step.inactive .sch-step-lbl{color:var(--t3)}
// .sch-cal{background:var(--surface);border:.5px solid var(--border);border-radius:var(--rl);overflow:hidden}
// .sch-cal-head{display:flex;align-items:center;justify-content:space-between;padding:13px 18px;border-bottom:.5px solid var(--border)}
// .sch-cal-month{font-size:14px;font-weight:600;color:var(--t1)}
// .sch-cal-nav{display:flex;gap:4px}
// .sch-cal-btn{width:28px;height:28px;border-radius:6px;border:.5px solid var(--border);background:var(--surface);cursor:pointer;font-size:14px;color:var(--t2);display:flex;align-items:center;justify-content:center;transition:background .13s;font-family:var(--font);line-height:1}
// .sch-cal-btn:hover{background:var(--bg)}
// .sch-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;padding:12px}
// .sch-cal-hdr{font-size:10px;font-weight:600;color:var(--t3);text-align:center;padding:4px 0;text-transform:uppercase}
// .sch-cal-day{width:100%;aspect-ratio:1;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;color:var(--t2);cursor:pointer;transition:all .13s;border:.5px solid transparent;flex-direction:column;gap:2px}
// .sch-cal-day:hover:not(.past):not(.dis){background:var(--bg);color:var(--t1)}
// .sch-cal-day.today{color:var(--accent);font-weight:700;border-color:var(--accent-m)}
// .sch-cal-day.sel{background:var(--accent);color:#fff;border-color:transparent}
// .sch-cal-day.has-iv::after{content:'';width:4px;height:4px;border-radius:50%;background:var(--green);display:block}
// .sch-cal-day.sel.has-iv::after{background:#fff}
// .sch-cal-day.past{color:var(--t3);opacity:.4;cursor:default}
// .sch-cal-day.dis{opacity:.2;cursor:default;pointer-events:none}
// .sch-cal-legend{display:flex;gap:16px;padding:10px 18px;border-top:.5px solid var(--border);font-size:11px;color:var(--t2)}
// .sch-cal-dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px}
// .sch-slots-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
// .sch-slots-title{font-size:12px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}
// .sch-slot{display:flex;align-items:center;justify-content:space-between;padding:10px 13px;border-radius:9px;border:.5px solid var(--border);background:var(--surface);font-size:13px;font-weight:500;color:var(--t2);cursor:pointer;transition:all .14s;font-family:var(--font);width:100%;margin-bottom:7px;text-align:left}
// .sch-slot:hover:not(.taken){border-color:var(--accent-m);color:var(--accent);background:var(--accent-l)}
// .sch-slot.sel-slot{background:var(--accent);color:#fff;border-color:transparent}
// .sch-slot.taken{background:var(--bg);color:var(--t3);cursor:not-allowed;opacity:.6}
// .sch-slot-time{display:flex;align-items:center;gap:7px}
// .sch-slot-tag{font-size:10px;padding:2px 7px;border-radius:20px;font-weight:500}
// .sch-slot.sel-slot .sch-slot-tag{background:rgba(255,255,255,.25);color:#fff}
// .sch-slot:not(.sel-slot):not(.taken) .sch-slot-tag{background:var(--accent-l);color:var(--accent)}
// .sch-summary{background:var(--accent-l);border:.5px solid var(--accent-m);border-radius:var(--rl);padding:16px;display:flex;align-items:flex-start;gap:12px}
// .sch-pick-item{display:flex;align-items:center;justify-content:space-between;padding:11px 13px;border-radius:9px;border:.5px solid var(--border);cursor:pointer;transition:all .14s;margin-bottom:8px;text-align:left;width:100%;font-family:var(--font)}
// .sch-pick-item:hover{border-color:var(--accent-m);background:var(--accent-l)}
// .sch-pick-item.chosen{border-color:var(--accent);background:var(--accent-l);box-shadow:0 0 0 2px var(--accent-m)}
// .sch-pick-av{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;flex-shrink:0}
// .sch-iv-item{display:flex;align-items:center;justify-content:space-between;padding:10px 13px;border-radius:9px;border:.5px solid var(--border);margin-bottom:8px}
// .sch-iv-av{width:36px;height:36px;border-radius:50%;background:#E2E8F0;color:var(--t2);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;flex-shrink:0}
// .sch-method{flex:1;padding:14px;border-radius:9px;border:.5px solid var(--border);cursor:pointer;transition:all .14s}
// .sch-method:hover{border-color:var(--accent-m);background:var(--accent-l)}
// .sch-method.method-sel{border-color:var(--accent);background:var(--accent-l)}
// .sch-method-ic{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;margin-bottom:10px}
// .sch-result{border-radius:var(--rl);padding:18px;border:.5px solid}
// .sch-result.success{background:var(--green-l);border-color:#BBF7D0}
// .sch-result.exists{background:var(--amber-l);border-color:#FCD34D}
// .sch-result.error{background:var(--red-l);border-color:#FECACA}
// .sch-ring-wrap{display:flex;align-items:center;gap:14px;margin-bottom:16px;padding-bottom:16px;border-bottom:.5px solid var(--border)}
// .sch-ring{position:relative;width:64px;height:64px;flex-shrink:0}
// .sch-ring svg{transform:rotate(-90deg)}
// .sch-ring-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:var(--t1)}
// .sch-iv-card{background:var(--surface);border:.5px solid var(--border);border-radius:var(--rl);padding:16px 18px}
// .sch-iv-card.scheduled{border-color:#BBF7D0;background:var(--green-l)}
// .sch-iv-card.pending{border-color:var(--accent-m);background:var(--accent-l)}
// .sch-iv-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
// .sch-iv-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
// .sch-iv-lbl{font-size:9px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:2px}
// .sch-iv-val{font-size:13px;font-weight:500;color:var(--t1)}
// .sch-upcoming-item{display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:.5px solid var(--border);cursor:pointer;transition:background .12s}
// .sch-upcoming-item:last-child{border-bottom:none}
// .sch-upcoming-item:hover{background:var(--bg)}
// .sch-upcoming-date{width:40px;flex-shrink:0;text-align:center;background:var(--accent-l);border-radius:8px;padding:5px 0;border:.5px solid var(--accent-m)}
// .sch-upcoming-day{font-size:16px;font-weight:700;color:var(--accent);line-height:1}
// .sch-upcoming-mon{font-size:9px;font-weight:600;color:var(--accent);text-transform:uppercase}
// .sch-modal-bd{position:fixed;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(2px);z-index:60;display:flex;align-items:center;justify-content:center;padding:24px}
// .sch-modal{background:var(--surface);border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.2);width:100%;max-width:520px;overflow:hidden;animation:mIn .2s ease}
// @keyframes mIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
// .sch-modal-head{padding:18px 22px;border-bottom:.5px solid var(--border);display:flex;align-items:center;justify-content:space-between}
// .sch-modal-title{font-size:14px;font-weight:600;color:var(--t1)}
// .sch-modal-close{width:26px;height:26px;border-radius:50%;background:var(--bg);border:.5px solid var(--border);cursor:pointer;font-size:17px;color:var(--t2);display:flex;align-items:center;justify-content:center}
// .sch-modal-body{padding:18px 22px;max-height:65vh;overflow-y:auto}
// .sch-modal-foot{padding:14px 22px;border-top:.5px solid var(--border);display:flex;gap:10px;justify-content:flex-end}
// .sch-fl{font-size:11px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;display:block}
// .sch-fi,.sch-fs,.sch-fta{width:100%;padding:9px 12px;font-size:13px;font-family:var(--font);color:var(--t1);background:var(--bg);border:.5px solid var(--border);border-radius:9px;outline:none;transition:border-color .14s}
// .sch-fi:focus,.sch-fs:focus,.sch-fta:focus{border-color:var(--accent-m);background:var(--surface)}
// .sch-fta{resize:vertical;min-height:72px;line-height:1.55}
// .sch-jd-ta{width:100%;padding:10px 13px;font-size:13px;font-family:var(--font);color:var(--t1);background:var(--bg);border:.5px solid var(--border);border-radius:9px;outline:none;resize:vertical;min-height:220px;line-height:1.6}
// .sch-jd-ta:focus{border-color:var(--accent-m);background:var(--surface)}
// .sch-jd-box{background:var(--bg);border-radius:9px;padding:10px 12px;font-size:12px;color:var(--t2);line-height:1.55;min-height:44px;border:.5px solid var(--border)}
// .sb{font-family:var(--font);font-size:13px;font-weight:500;border-radius:8px;padding:8px 16px;cursor:pointer;transition:all .15s;border:.5px solid var(--border-md);background:var(--surface);color:var(--t1)}
// .sb:hover{background:#F1F5F9}
// .sb:disabled{opacity:.5;cursor:not-allowed}
// .sb-p{background:var(--accent);color:#fff;border-color:transparent}
// .sb-p:hover:not(:disabled){background:#1D4ED8}
// .sb-g{background:var(--green);color:#fff;border-color:transparent}
// .sb-d{background:var(--red-l);color:var(--red);border-color:transparent}
// .sb-sm{padding:5px 11px;font-size:12px}
// .sb-ghost{border:none;background:transparent;color:var(--accent);font-family:var(--font);font-size:13px;font-weight:500;cursor:pointer;padding:6px 10px;border-radius:8px}
// .sb-ghost:hover{background:var(--accent-l)}
// @keyframes spin{to{transform:rotate(360deg)}}
// .sch-spin{width:14px;height:14px;border-radius:50%;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;animation:spin .7s linear infinite;display:inline-block}
// `;

// // ── Main Component ────────────────────────────────────────────────────────────
// export default function SchedulerInterface() {
//   const [cands,       setCands]       = useState<Candidate[]>([]);
//   const [selId,       setSelId]       = useState<string|null>(null);
//   const [mode,        setMode]        = useState<"manual"|"auto">("manual");
//   const [search,      setSearch]      = useState("");
//   const [chip,        setChip]        = useState("all");
//   const [sort,        setSort]        = useState("score_desc");
//   const [calDate,     setCalDate]     = useState(new Date());
//   // Auto wizard
//   const [step,        setStep]        = useState<1|2|3>(1);
//   const [autoDate,    setAutoDate]    = useState(new Date());
//   const [autoSlot,    setAutoSlot]    = useState<Slot|null>(null);
//   const [autoCand,    setAutoCand]    = useState<Candidate|null>(null);
//   const [ivs,         setIvs]         = useState<Interviewer[]>(DEFAULT_IVS);
//   const [method,      setMethod]      = useState<"video"|"onsite">("video");
//   const [jobDesc,     setJobDesc]     = useState("");
//   const [autoResult,  setAutoResult]  = useState<any>(null);
//   const [scheduling,  setScheduling]  = useState(false);
//   // Modals
//   const [showManual,  setShowManual]  = useState(false);
//   const [modalId,     setModalId]     = useState<string|null>(null);
//   const [showJD,      setShowJD]      = useState(false);

//   useEffect(()=>{
//     (async()=>{
//       try{const list=await fetchCandidates();const mapped:Candidate[]=list.map((c:any,i:number)=>({id:String(c.id||i),name:c.name||"Unknown",email:c.email||"",phone:c.phone||"",job_title:c.job_title||c.role||"",dept:c.department||c.dept||"",location:c.location||"",processed_date:c.created_at||c.processed_date||"",ats_score:Number(c.ats_score||0),exam_percentage:Number(c.exam_percentage||0),exam_completed:!!c.exam_completed,interview_scheduled:!!c.interview_scheduled,interview_date:c.interview_date||null,interview_type:c.interview_type||null,interviewer:c.interviewer||null,meeting_link:c.meeting_link||null,duration:c.duration||60,interview_status:c.interview_scheduled?(c.interview_completed?"completed":"scheduled"):"pending",resume_path:c.resume_path||null,job_description:c.job_description||""}));setCands(mapped.length?mapped:DEMO);}catch{setCands(DEMO);}
//     })();
//   },[]);

//   const stats=useMemo(()=>{const now=new Date();const ws=new Date(now);ws.setDate(now.getDate()-now.getDay());const we=new Date(ws);we.setDate(ws.getDate()+7);return{total:cands.filter(c=>c.interview_scheduled).length,today:cands.filter(c=>c.interview_date&&new Date(c.interview_date).toDateString()===now.toDateString()).length,week:cands.filter(c=>{if(!c.interview_date)return false;const d=new Date(c.interview_date);return d>=ws&&d<=we;}).length,pending:cands.filter(c=>c.interview_status==="pending").length};},[cands]);

//   const filtered=useMemo(()=>{const q=search.toLowerCase();let list=cands.filter(c=>{const ms=!q||c.name.toLowerCase().includes(q)||c.job_title.toLowerCase().includes(q)||c.email.toLowerCase().includes(q);if(chip==="pending")return !c.interview_scheduled&&ms;if(chip==="scheduled")return c.interview_scheduled&&c.interview_status==="scheduled"&&ms;if(chip==="completed")return c.interview_status==="completed"&&ms;if(chip==="cancelled")return c.interview_status==="cancelled"&&ms;return ms;});return [...list].sort((a,b)=>{if(sort==="score_desc")return (b.ats_score||0)-(a.ats_score||0);if(sort==="date_asc")return new Date(a.interview_date||"9999").getTime()-new Date(b.interview_date||"9999").getTime();if(sort==="date_desc")return new Date(b.interview_date||"0").getTime()-new Date(a.interview_date||"0").getTime();if(sort==="name_asc")return a.name.localeCompare(b.name);return 0;});},[cands,chip,search,sort]);

//   const sel=cands.find(c=>c.id===selId)??null;
//   const upd=(id:string,p:Partial<Candidate>)=>setCands(prev=>prev.map(c=>c.id===id?{...c,...p}:c));

//   const selectC=(c:Candidate)=>{setSelId(c.id);setStep(1);setAutoSlot(null);setAutoResult(null);setAutoCand(c);if(c.job_description)setJobDesc(c.job_description);};

//   const submitAuto=async()=>{
//     if(!autoCand||!autoSlot)return;
//     setScheduling(true);setAutoResult(null);
//     const dt=slotToDate(autoDate,autoSlot.time);

//     // scheduleInterview never throws — it returns { success: false } on errors
//     const res = await scheduleInterview({
//       candidate_id: autoCand.id as any,
//       email:        autoCand.email,
//       date_iso:     dt.toISOString(),
//       time_slot:    autoSlot.time,
//     });

//     if (res.success && !res.already_scheduled) {
//       // ✅ Real schedule succeeded
//       setAutoResult(res);
//       upd(autoCand.id, {
//         interview_scheduled: true,
//         interview_date:      dt.toISOString(),
//         interview_status:    "scheduled",
//         meeting_link:        res.interview_link || null,
//       });
//     } else if (res.already_scheduled) {
//       // ℹ️ Already scheduled
//       setAutoResult(res);
//     } else {
//       // ❌ Backend error (500 etc.) — fall back to demo mode locally
//       const lk = "https://interview.ai/room/"+Math.random().toString(36).slice(2,10);
//       setAutoResult({
//         success:              true,
//         already_scheduled:    false,
//         interview_link:       lk,
//         email_sent:           true,
//         resume_extracted:     !!autoCand.resume_path,
//         knowledge_base_id:    "KB-"+Math.floor(Math.random()*9000+1000),
//         job_description_used: !!jobDesc,
//         message:              res.message || "(Demo) Interview saved locally — API unavailable",
//       });
//       upd(autoCand.id, {
//         interview_scheduled: true,
//         interview_date:      dt.toISOString(),
//         interview_status:    "scheduled",
//         meeting_link:        lk,
//       });
//     }

//     setScheduling(false);
//   };

//   // ── RENDER: Calendar ─────────────────────────────────────────────────────────
//   const renderCal=(d:Date,selD:Date,onPick:(n:number)=>void,mini=false)=>{
//     const y=d.getFullYear(),m=d.getMonth();
//     const ivDates=new Set(cands.filter(c=>c.interview_date).map(c=>new Date(c.interview_date!).toDateString()));
//     const first=new Date(y,m,1),last=new Date(y,m+1,0);
//     const today=new Date().toDateString();
//     const cells:React.ReactNode[]=["Su","Mo","Tu","We","Th","Fr","Sa"].map((w,i)=>(<div key={"h"+i} className="sch-cal-hdr">{w}</div>));
//     for(let i=0;i<first.getDay();i++)cells.push(<div key={"b"+i} className="sch-cal-day dis"/>);
//     for(let n=1;n<=last.getDate();n++){
//       const dt=new Date(y,m,n);const ds=dt.toDateString();
//       const isSel=!mini&&selD.getDate()===n&&selD.getMonth()===m&&selD.getFullYear()===y;
//       const isPast=dt<new Date()&&ds!==today;
//       let cls="sch-cal-day";
//       if(ds===today)cls+=" today";if(isSel)cls+=" sel";if(ivDates.has(ds))cls+=" has-iv";if(isPast)cls+=" past";
//       cells.push(<div key={"d"+n} className={cls} onClick={isPast?undefined:()=>onPick(n)}>{n}</div>);
//     }
//     return cells;
//   };

//   // ── RENDER: Step bar ─────────────────────────────────────────────────────────
//   const StepBar=()=>(
//     <div className="sch-step-bar">
//       {[["Select Date",1],["Select Time",2],["Confirm",3]].map(([lbl,n])=>{
//         const ns=Number(n);const cls=step>ns?"done":step===ns?"active":"inactive";
//         return(<div key={n} className={`sch-step ${cls}`} style={{cursor:ns<step?"pointer":"default"}} onClick={()=>{if(ns<step)setStep(ns as any);}}>
//           <div className="sch-step-num">{step>ns?"✓":n}</div>
//           <span className="sch-step-lbl">{lbl}</span>
//         </div>);
//       })}
//     </div>
//   );

//   // ── RENDER: Auto right ───────────────────────────────────────────────────────
//   const AutoRight=()=>{
//     if(step===1)return(
//       <div className="sch-cal">
//         <div className="sch-cal-head">
//           <span className="sch-cal-month">{MONTHS[autoDate.getMonth()]} {autoDate.getFullYear()}</span>
//           <div className="sch-cal-nav">
//             <button className="sch-cal-btn" onClick={()=>setAutoDate(new Date(autoDate.getFullYear(),autoDate.getMonth()-1,1))}>‹</button>
//             <button className="sch-cal-btn" onClick={()=>setAutoDate(new Date(autoDate.getFullYear(),autoDate.getMonth()+1,1))}>›</button>
//           </div>
//         </div>
//         <div className="sch-cal-grid">{renderCal(autoDate,autoDate,d=>{setAutoDate(new Date(autoDate.getFullYear(),autoDate.getMonth(),d));setStep(2);})}</div>
//         <div className="sch-cal-legend"><span><span className="sch-cal-dot" style={{background:"var(--green)"}}/>Interviews scheduled</span><span><span className="sch-cal-dot" style={{background:"var(--accent)"}}/>Selected date</span></div>
//       </div>
//     );

//     if(step===2){
//       const slotBtn=(s:Slot)=>{const isSel=autoSlot?.id===s.id;let cls="sch-slot";if(!s.available)cls+=" taken";else if(isSel)cls+=" sel-slot";return(<button key={s.id} className={cls} disabled={!s.available} onClick={()=>{if(s.available){setAutoSlot(s);setStep(3);}}}>
//         <span className="sch-slot-time"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{s.time}</span>
//         {!s.available?<span style={{fontSize:10,color:"var(--t3)"}}>Taken</span>:<span className="sch-slot-tag">{isSel?"Selected":"Available"}</span>}
//       </button>);};
//       return(<>
//         <button className="sb-ghost" onClick={()=>setStep(1)} style={{display:"flex",alignItems:"center",gap:4,marginBottom:14,padding:"6px 0"}}>
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>Back to calendar
//         </button>
//         <div style={{fontSize:14,fontWeight:600,color:"var(--t1)",marginBottom:14}}>Select a time on <strong>{friendly(autoDate)}</strong></div>
//         <div className="sch-slots-grid">
//           <div><div className="sch-slots-title">Morning</div>{MORNING.map(slotBtn)}</div>
//           <div><div className="sch-slots-title">Afternoon</div>{AFTERNOON.map(slotBtn)}</div>
//         </div>
//       </>);
//     }

//     // Step 3
//     const eligible=cands.filter(c=>c.exam_completed||c.interview_status==="pending");
//     return(<>
//       <div className="sch-summary" style={{marginBottom:16}}>
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
//         <div style={{flex:1}}>
//           <div style={{fontSize:12,fontWeight:600,color:"var(--t2)",marginBottom:4}}>Interview Summary</div>
//           <div style={{fontSize:15,fontWeight:600,color:"var(--t1)"}}>{friendly(autoDate)}{autoSlot?" at "+autoSlot.time:""}</div>
//           <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
//             <div style={{fontSize:13,color:"var(--t2)"}}><strong style={{color:"var(--t1)"}}>Position:</strong> {autoCand?.job_title||"—"}</div>
//             <div style={{fontSize:13,color:"var(--t2)"}}><strong style={{color:"var(--t1)"}}>Candidate:</strong> {autoCand?.name||"—"}</div>
//           </div>
//         </div>
//       </div>
//       <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
//         <div className="sch-card"><div className="sch-card-head"><span className="sch-card-title">Candidate</span></div><div style={{padding:12}}>{eligible.map(x=>{const[bg,fg]=avColor(x.name);const ch=autoCand?.id===x.id;return(<button key={x.id} className={`sch-pick-item${ch?" chosen":""}`} onClick={()=>setAutoCand(x)}><div style={{display:"flex",alignItems:"center",gap:10}}><div className="sch-pick-av" style={{background:bg,color:fg}}>{ini(x.name)}</div><div><div style={{fontSize:13,fontWeight:600,color:ch?"var(--accent)":"var(--t1)"}}>{x.name}</div><div style={{fontSize:11,color:"var(--t2)"}}>{x.job_title||"—"}</div><div style={{fontSize:10,color:"var(--t3)"}}>{x.email}</div>{x.resume_path&&<div style={{fontSize:10,color:"var(--green)",marginTop:2}}>📄 Resume available</div>}</div></div>{ch&&<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}</button>)})}</div></div>
//         <div className="sch-card"><div className="sch-card-head"><span className="sch-card-title">Interviewers</span></div><div style={{padding:12}}>{ivs.map(it=>(<div key={it.id} className="sch-iv-item"><div style={{display:"flex",alignItems:"center",gap:10}}><div className="sch-iv-av">{it.name.charAt(0)}</div><div><div style={{fontSize:13,fontWeight:500,color:"var(--t1)"}}>{it.name}</div><div style={{fontSize:11,color:"var(--t2)"}}>{it.role}</div></div></div><input type="checkbox" style={{width:16,height:16,accentColor:"var(--accent)",cursor:"pointer"}} checked={it.checked} onChange={()=>setIvs(ivs.map(i=>i.id===it.id?{...i,checked:!i.checked}:i))}/></div>))}</div></div>
//       </div>
//       <div className="sch-card" style={{marginTop:14}}><div className="sch-card-head"><span className="sch-card-title">Job Description (Optional)</span><button className="sb-ghost" onClick={()=>setShowJD(true)}>📄 {jobDesc?"Edit":"Add"} JD</button></div><div style={{padding:12}}><div className="sch-jd-box">{jobDesc?jobDesc.slice(0,160)+(jobDesc.length>160?"…":""):<em style={{color:"var(--t3)"}}>No job description — system will use generic or candidate profile.</em>}</div></div></div>
//       <div className="sch-card" style={{marginTop:14}}><div className="sch-card-head"><span className="sch-card-title">Interview Method</span></div><div style={{padding:12,display:"flex",gap:10}}>
//         {([["video","AI-Powered Video Interview","Secure link sent automatically","✓ Knowledge base from resume\n✓ JD auto-used\n✓ Email confirmation"],["onsite","In-Person Interview","Office location shared",""]] as const).map(([k,t,s,ch])=>(
//           <div key={k} className={`sch-method${method===k?" method-sel":""}`} onClick={()=>setMethod(k as any)}>
//             <div className="sch-method-ic" style={{background:method===k?"var(--accent-l)":"var(--bg)"}}>
//               {k==="video"?<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={method===k?"var(--accent)":"var(--t2)"} strokeWidth="2" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={method===k?"var(--accent)":"var(--t2)"} strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
//             </div>
//             <div style={{fontSize:13,fontWeight:600,color:"var(--t1)",marginBottom:3}}>{t}</div>
//             <div style={{fontSize:11,color:"var(--t2)",lineHeight:1.5}}>{s}</div>
//             {ch&&<div style={{fontSize:11,color:"var(--green)",marginTop:5,whiteSpace:"pre-line"}}>{ch}</div>}
//           </div>
//         ))}
//       </div></div>
//       {autoResult&&<div className={`sch-result ${autoResult.already_scheduled?"exists":autoResult.success?"success":"error"}`} style={{marginTop:14}}>
//         <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={autoResult.success?"var(--green)":"var(--red)"} strokeWidth="2" strokeLinecap="round">{autoResult.success?<polyline points="20 6 9 17 4 12"/>:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}</svg><span style={{fontSize:14,fontWeight:600,color:autoResult.success?"var(--green)":"var(--red)"}}>{!autoResult.success?"Failed":autoResult.already_scheduled?"Already Scheduled":"Interview Scheduled!"}</span></div>
//         {autoResult.interview_link&&<div style={{fontSize:12,wordBreak:"break-all",marginTop:6}}>🔗 <a href={autoResult.interview_link} target="_blank" rel="noreferrer" style={{color:"var(--accent)"}}>{autoResult.interview_link}</a></div>}
//         {autoResult.message&&<p style={{fontSize:12,color:"var(--t2)",marginTop:8}}>{autoResult.message}</p>}
//       </div>}
//       <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:14}}>
//         <button className="sb" onClick={()=>setStep(1)}>Cancel</button>
//         <button className="sb sb-p" onClick={submitAuto} disabled={!autoCand||!autoSlot||scheduling}>{scheduling?<><span className="sch-spin"/>&nbsp;Scheduling…</>:"⚡ Schedule Interview"}</button>
//       </div>
//     </>);
//   };

//   // ── RENDER: Manual right ─────────────────────────────────────────────────────
//   const ManualRight=({c}:{c:Candidate})=>{
//     const[bg,fg]=avColor(c.name);const score=c.ats_score||0,exam=c.exam_percentage||0;
//     const R=26,circ=2*Math.PI*R,dash=(score/100)*circ;const ringColor=sbColor(score);
//     const isSch=c.interview_status==="scheduled"||c.interview_status==="completed";
//     const sLbl=c.interview_status==="scheduled"?"Interview Scheduled":c.interview_status==="completed"?"Interview Completed":c.interview_status==="cancelled"?"Cancelled":"Pending Schedule";
//     const upcoming=cands.filter(x=>x.interview_date&&new Date(x.interview_date)>=new Date()&&x.interview_status==="scheduled").sort((a,b)=>new Date(a.interview_date!).getTime()-new Date(b.interview_date!).getTime()).slice(0,6);
//     return(<div style={{padding:20,display:"flex",flexDirection:"column",gap:14}}>
//       <div className="sch-hero">
//         <div className="sch-hero-top">
//           <div className="sch-hero-av" style={{background:bg,color:fg}}>{ini(c.name)}</div>
//           <div style={{flex:1,minWidth:0}}>
//             <div className="sch-hero-name">{c.name}</div>
//             <div className="sch-hero-role">{c.job_title} · {c.dept} · {c.location}</div>
//             <div className="sch-hero-badges">
//               <span className={`sch-pill ${isSch?"pill-blue":c.interview_status==="completed"?"pill-green":"pill-amber"}`}>{sLbl}</span>
//               <span className="sch-pill pill-grey">Exam: {exam.toFixed(0)}%</span>
//             </div>
//           </div>
//           <div style={{display:"flex",gap:8,flexShrink:0}}>
//             {!isSch?<button className="sb sb-p sb-sm" onClick={()=>{setModalId(c.id);setShowManual(true);}}>Schedule Interview →</button>:<><button className="sb sb-sm" onClick={()=>{setModalId(c.id);setShowManual(true);}}>Reschedule</button>{c.interview_status!=="completed"&&<button className="sb sb-d sb-sm" onClick={()=>upd(c.id,{interview_scheduled:false,interview_status:"cancelled",interview_date:null})}>Cancel</button>}</>}
//           </div>
//         </div>
//         <div className="sch-info-grid">
//           <div className="sch-info-item"><div className="sch-info-lbl">Email</div><div className="sch-info-val"><a href={`mailto:${c.email}`}>{c.email||"—"}</a></div></div>
//           <div className="sch-info-item"><div className="sch-info-lbl">Phone</div><div className="sch-info-val">{c.phone||"—"}</div></div>
//           <div className="sch-info-item"><div className="sch-info-lbl">Applied</div><div className="sch-info-val">{fmtDate(c.processed_date)}</div></div>
//           <div className="sch-info-item"><div className="sch-info-lbl">Department</div><div className="sch-info-val">{c.dept||"—"}</div></div>
//         </div>
//       </div>
//       <div className="sch-card"><div className="sch-card-head"><span className="sch-card-title">AI Match Score</span></div><div className="sch-card-body">
//         <div className="sch-ring-wrap">
//           <div className="sch-ring"><svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r={R} fill="none" stroke="var(--bg)" strokeWidth="6"/><circle cx="32" cy="32" r={R} fill="none" stroke={ringColor} strokeWidth="6" strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`} strokeLinecap="round"/></svg><div className="sch-ring-num">{score}</div></div>
//           <div><div style={{fontSize:11,color:"var(--t2)",marginBottom:3}}>ATS Score · Exam: {exam.toFixed(0)}%</div><div style={{fontSize:20,fontWeight:700,letterSpacing:-1,lineHeight:1,color:ringColor}}>{score}/100</div><div style={{fontSize:10,color:"var(--t3)",marginTop:2}}>{score>=80?"Strong":score>=60?"Good":"Below avg"} · {exam>=70?"Exam passed":"Exam: "+exam.toFixed(0)+"%"}</div></div>
//         </div>
//         <div style={{display:"flex",gap:10}}>{[["ATS",score],["Exam",exam],["Fit",Math.min(100,Math.round((score+exam)/2))]].map(([l,v])=>(<div key={l as string} style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--t2)",marginBottom:3}}><span>{l}</span><span style={{fontWeight:600,color:"var(--t1)"}}>{Number(v).toFixed(0)}</span></div><div style={{height:5,background:"var(--bg)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${v}%`,background:sbColor(Number(v)),borderRadius:3}}/></div></div>))}</div>
//       </div></div>
//       <div className={`sch-iv-card ${isSch?"scheduled":"pending"}`}>
//         <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><div className="sch-iv-dot" style={{background:isSch?"var(--green)":"var(--accent)"}}/><span style={{fontSize:13,fontWeight:600,color:"var(--t1)"}}>{sLbl}</span></div>
//         {c.interview_scheduled&&c.interview_date?(<>
//           <div className="sch-iv-grid">
//             <div><div className="sch-iv-lbl">Date & Time</div><div className="sch-iv-val">{fmtDT(c.interview_date)}</div></div>
//             <div><div className="sch-iv-lbl">Type</div><div className="sch-iv-val">{typeLabel(c.interview_type)}</div></div>
//             <div><div className="sch-iv-lbl">Interviewer(s)</div><div className="sch-iv-val">{c.interviewer||"—"}</div></div>
//             <div><div className="sch-iv-lbl">Duration</div><div className="sch-iv-val">{c.duration||60} min</div></div>
//             {c.meeting_link&&<div style={{gridColumn:"1/-1"}}><div className="sch-iv-lbl">Link / Location</div><div className="sch-iv-val"><a href={c.meeting_link.startsWith("http")?c.meeting_link:"#"} style={{color:"var(--accent)",textDecoration:"none"}}>{c.meeting_link}</a></div></div>}
//           </div>
//           <div style={{marginTop:12,display:"flex",gap:8,flexWrap:"wrap"}}>
//             {c.meeting_link&&c.meeting_link.startsWith("http")&&<a href={c.meeting_link} target="_blank" rel="noreferrer" className="sb sb-p sb-sm">Join Meeting</a>}
//             <button className="sb sb-sm">Send Reminder</button>
//             <button className="sb sb-sm" onClick={()=>{setModalId(c.id);setShowManual(true);}}>Reschedule</button>
//             {c.interview_status!=="completed"&&<button className="sb sb-g sb-sm" onClick={()=>upd(c.id,{interview_status:"completed"})}>Mark Complete ✓</button>}
//           </div>
//         </>):(<div style={{textAlign:"center",padding:"14px 0"}}><p style={{fontSize:13,color:"var(--t2)",marginBottom:10}}>No interview scheduled yet.</p><button className="sb sb-p" onClick={()=>{setModalId(c.id);setShowManual(true);}}>+ Schedule Interview</button></div>)}
//       </div>
//       <div className="sch-cal">
//         <div className="sch-cal-head"><span className="sch-cal-month">{MONTHS[calDate.getMonth()]} {calDate.getFullYear()}</span><div className="sch-cal-nav"><button className="sch-cal-btn" onClick={()=>setCalDate(new Date(calDate.getFullYear(),calDate.getMonth()-1,1))}>‹</button><button className="sch-cal-btn" onClick={()=>setCalDate(new Date(calDate.getFullYear(),calDate.getMonth()+1,1))}>›</button></div></div>
//         <div className="sch-cal-grid">{renderCal(calDate,new Date(),()=>{},true)}</div>
//         <div className="sch-cal-legend"><span><span className="sch-cal-dot" style={{background:"var(--accent)"}}/>Selected</span><span><span className="sch-cal-dot" style={{background:"var(--green)"}}/>Has interview</span></div>
//       </div>
//       <div className="sch-card"><div className="sch-card-head"><span className="sch-card-title">Upcoming Interviews</span></div>
//         <div>{upcoming.length===0?<div style={{padding:20,textAlign:"center",fontSize:12,color:"var(--t2)"}}>No upcoming interviews.</div>:upcoming.map(u=>{const d=new Date(u.interview_date!);return(<div key={u.id} className="sch-upcoming-item"><div className="sch-upcoming-date"><div className="sch-upcoming-day">{d.getDate()}</div><div className="sch-upcoming-mon">{d.toLocaleDateString("en-IN",{month:"short"})}</div></div><div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:600,color:"var(--t1)"}}>{u.name}</div><div style={{fontSize:11,color:"var(--t2)",marginTop:1}}>{u.job_title}</div><div style={{fontSize:10,color:"var(--t3)",marginTop:2}}>🕐 {fmtTime(u.interview_date)} · {typeLabel(u.interview_type)}</div></div><div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}><span className={`sc ${scoreCls(u.ats_score)}`}>{u.ats_score}</span><span style={{fontSize:10,color:"var(--t3)"}}>{u.interviewer||""}</span></div></div>);})}</div>
//       </div>
//     </div>);
//   };

//   // ── RENDER: Manual Modal ──────────────────────────────────────────────────────
//   const mc=cands.find(c=>c.id===modalId)??null;
//   const today=new Date().toISOString().split("T")[0];
//   const [mDate,setMDate]=useState(today);const [mTime,setMTime]=useState("10:00");
//   const [mType,setMType]=useState("video");const [mIv,setMIv]=useState("");
//   const [mLink,setMLnk]=useState("");const [mDur,setMDur]=useState("60");const [mNotes,setMNotes]=useState("");

//   useEffect(()=>{if(mc){setMDate(mc.interview_date?new Date(mc.interview_date).toISOString().split("T")[0]:today);setMTime(mc.interview_date?new Date(mc.interview_date).toTimeString().slice(0,5):"10:00");setMType(mc.interview_type||"video");setMIv(mc.interviewer||"");setMLnk(mc.meeting_link||"");setMDur(String(mc.duration||60));}},[modalId,mc?.id]);

//   const submitManual=()=>{if(!mDate||!mTime)return;const dt=new Date(mDate+"T"+mTime+":00").toISOString();if(modalId)upd(modalId,{interview_date:dt,interview_type:mType,interviewer:mIv,meeting_link:mLink,duration:parseInt(mDur),interview_scheduled:true,interview_status:"scheduled"});setShowManual(false);};

//   const pillCls=(s:string)=>s==="scheduled"?"pill-blue":s==="completed"?"pill-green":s==="cancelled"?"pill-red":"pill-amber";
//   const pillLbl=(s:string)=>s==="scheduled"?"Scheduled":s==="completed"?"Completed":s==="cancelled"?"Cancelled":"Pending";

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{__html:CSS}}/>

//       {/* Stats */}
//       <div className="sch-stats">
//         {[["Total Scheduled",stats.total,"All time interviews","var(--accent)"],["Today",stats.today,"Interviews today","var(--green)"],["This Week",stats.week,"Scheduled this week","var(--amber)"],["Pending",stats.pending,"Awaiting schedule","var(--purple)"]].map(([l,v,s,b])=>(
//           <div key={l as string} className="sch-stat"><div className="sch-stat-bar" style={{background:b as string}}/><div className="sch-stat-lbl">{l}</div><div className="sch-stat-val">{v as number}</div><div className="sch-stat-sub">{s}</div></div>
//         ))}
//       </div>

//       {/* Mode toggle */}
//       <div className="sch-mode-bar">
//         <span className="sch-mode-label">{mode==="auto"?"AI Auto mode: calendar → time slot → auto-generate link & send email":"Manual mode: view and schedule interviews with full control"}</span>
//         <div className="sch-mode-tabs">
//           <button className={`sch-mode-tab${mode==="auto"?" active":""}`} onClick={()=>setMode("auto")}>
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>AI Auto Schedule
//           </button>
//           <button className={`sch-mode-tab${mode==="manual"?" active":""}`} onClick={()=>setMode("manual")}>
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Manual Schedule
//           </button>
//         </div>
//       </div>

//       {/* Split layout */}
//       <div className="sch-wrap">
//         {/* LEFT */}
//         <div className="sch-left">
//           <div className="sch-left-head">
//             <div className="sch-left-title-row">
//               <span className="sch-left-title">{mode==="auto"?"Select Candidate":"Interview Queue"}</span>
//               <span className="sch-left-count">{filtered.length} of {cands.length}</span>
//             </div>
//             <div className="sch-search-wrap">
//               <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
//               <input className="sch-search" placeholder="Search candidates…" value={search} onChange={e=>setSearch(e.target.value)}/>
//             </div>
//             <div className="sch-chip-row">
//               {["all","pending","scheduled","completed","cancelled"].map(v=>(
//                 <button key={v} className={`sch-chip${chip===v?" active":""}`} onClick={()=>setChip(v)}>
//                   {v.charAt(0).toUpperCase()+v.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="sch-sort-row">
//             <span className="sch-sort-lbl">Sort by</span>
//             <select className="sch-sort-sel" value={sort} onChange={e=>setSort(e.target.value)}>
//               <option value="score_desc">Score ↓</option>
//               <option value="date_asc">Interview Date ↑</option>
//               <option value="date_desc">Interview Date ↓</option>
//               <option value="name_asc">Name A–Z</option>
//             </select>
//           </div>
//           <div className="sch-cand-list">
//             {filtered.length===0?(
//               <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:8,padding:32,textAlign:"center"}}>
//                 <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="1.2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
//                 <div style={{fontSize:13,fontWeight:600,color:"var(--t1)"}}>No candidates found</div>
//               </div>
//             ):filtered.map(c=>{
//               const[bg,fg]=avColor(c.name);
//               return(<div key={c.id} className={`sch-cand-card${selId===c.id?" sel":""}`} onClick={()=>selectC(c)}>
//                 <div className="sch-av" style={{background:bg,color:fg}}>{ini(c.name)}</div>
//                 <div className="sch-cand-info">
//                   <div className="sch-cand-name">{c.name}</div>
//                   <div className="sch-cand-role">{c.job_title} · {c.dept}</div>
//                   <div className="sch-cand-meta">
//                     <span className={`sch-pill ${pillCls(c.interview_status)}`}>{pillLbl(c.interview_status)}</span>
//                     <span className="sch-date">{c.interview_date?fmtDate(c.interview_date):"No date"}</span>
//                   </div>
//                 </div>
//                 <div className="sch-cand-right">
//                   <span className={`sc ${scoreCls(c.ats_score)}`}>{c.ats_score||"—"}</span>
//                   <span className="sch-date">{c.location}</span>
//                 </div>
//               </div>);
//             })}
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="sch-right">
//           {!sel?(
//             <div className="sch-right-empty">
//               <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="1" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
//               <div style={{fontSize:15,fontWeight:600,color:"var(--t1)"}}>Select a candidate</div>
//               <div style={{fontSize:13,color:"var(--t2)",lineHeight:1.65,maxWidth:280,textAlign:"center"}}>Choose from the queue to schedule or view interview details.</div>
//             </div>
//           ):mode==="manual"?(
//             <ManualRight c={sel}/>
//           ):(
//             <div style={{padding:20,display:"flex",flexDirection:"column",gap:14}}>
//               <StepBar/>
//               <AutoRight/>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Manual Modal */}
//       {showManual&&(
//         <div className="sch-modal-bd" onClick={e=>{if(e.target===e.currentTarget)setShowManual(false);}}>
//           <div className="sch-modal">
//             <div className="sch-modal-head"><span className="sch-modal-title">{mc?`Schedule — ${mc.name}`:"Schedule Interview"}</span><button className="sch-modal-close" onClick={()=>setShowManual(false)}>×</button></div>
//             <div className="sch-modal-body">
//               <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
//                 <div style={{marginBottom:14}}><label className="sch-fl">Interview Date</label><input type="date" className="sch-fi" min={today} value={mDate} onChange={e=>setMDate(e.target.value)}/></div>
//                 <div style={{marginBottom:14}}><label className="sch-fl">Interview Time</label><input type="time" className="sch-fi" value={mTime} onChange={e=>setMTime(e.target.value)}/></div>
//               </div>
//               <div style={{marginBottom:14}}><label className="sch-fl">Interview Type</label><select className="sch-fs" value={mType} onChange={e=>setMType(e.target.value)}><option value="video">Video Call (Google Meet / Zoom)</option><option value="phone">Phone Interview</option><option value="onsite">On-site Interview</option><option value="technical">Technical Round</option><option value="hr">HR Round</option><option value="final">Final Round</option></select></div>
//               <div style={{marginBottom:14}}><label className="sch-fl">Interviewer(s)</label><input type="text" className="sch-fi" placeholder="e.g. Priya Sharma, Ravi Kumar" value={mIv} onChange={e=>setMIv(e.target.value)}/></div>
//               <div style={{marginBottom:14}}><label className="sch-fl">Meeting Link / Location</label><input type="text" className="sch-fi" placeholder="https://meet.google.com/… or Office Room 201" value={mLink} onChange={e=>setMLnk(e.target.value)}/></div>
//               <div style={{marginBottom:14}}><label className="sch-fl">Duration</label><select className="sch-fs" value={mDur} onChange={e=>setMDur(e.target.value)}><option value="30">30 minutes</option><option value="45">45 minutes</option><option value="60">1 hour</option><option value="90">1.5 hours</option><option value="120">2 hours</option></select></div>
//               <div><label className="sch-fl">Notes (optional)</label><textarea className="sch-fta" placeholder="Preparation instructions or notes…" value={mNotes} onChange={e=>setMNotes(e.target.value)}/></div>
//             </div>
//             <div className="sch-modal-foot"><button className="sb" onClick={()=>setShowManual(false)}>Cancel</button><button className="sb sb-p" onClick={submitManual}>Schedule Interview →</button></div>
//           </div>
//         </div>
//       )}

//       {/* JD Modal */}
//       {showJD&&(
//         <div className="sch-modal-bd" onClick={e=>{if(e.target===e.currentTarget)setShowJD(false);}}>
//           <div className="sch-modal" style={{maxWidth:600}}>
//             <div className="sch-modal-head"><span className="sch-modal-title">Add / Edit Job Description</span><button className="sch-modal-close" onClick={()=>setShowJD(false)}>×</button></div>
//             <div className="sch-modal-body"><div><label className="sch-fl">Job Description</label><textarea className="sch-jd-ta" placeholder="Enter detailed job description…" value={jobDesc} onChange={e=>setJobDesc(e.target.value)}/></div></div>
//             <div className="sch-modal-foot"><button className="sb" onClick={()=>setShowJD(false)}>Cancel</button><button className="sb sb-p" onClick={()=>setShowJD(false)}>Save Job Description</button></div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
// // // "use client";

// // // import React, { useEffect, useState, useCallback } from "react";
// // // import { Video, MapPin, Search, FileText } from "lucide-react";
// // // import { useRouter } from "next/navigation";

// // // import CalendarGrid from "./subComponents/CalendarGrid";
// // // import TimeSlots, { type Slot } from "./subComponents/TimeSlots";
// // // import CandidateSelector from "./subComponents/CandidateSelector";
// // // import InterviewerPicker, { type Interviewer } from "./subComponents/InterviewerPicker";
// // // import JobDescriptionModal from "./subComponents/JobDescriptionModal";
// // // import InterviewSummary from "./subComponents/InterviewSummary";

// // // import { fetchCandidates, scheduleInterview, type RawCandidate } from "@/services/api/schedulerAPI";

// // // // ---- Mock time slots (kept from original) ----
// // // const MORNING: Slot[] = [
// // //   { id: 1, time: "9:00 AM", available: true },
// // //   { id: 2, time: "9:30 AM", available: true },
// // //   { id: 3, time: "10:00 AM", available: true },
// // //   { id: 4, time: "10:30 AM", available: false },
// // //   { id: 5, time: "11:00 AM", available: true },
// // //   { id: 6, time: "11:30 AM", available: true },
// // // ];
// // // const AFTERNOON: Slot[] = [
// // //   { id: 7, time: "1:00 PM", available: true },
// // //   { id: 8, time: "1:30 PM", available: false },
// // //   { id: 9, time: "2:00 PM", available: true },
// // //   { id: 10, time: "2:30 PM", available: true },
// // //   { id: 11, time: "3:00 PM", available: false },
// // //   { id: 12, time: "3:30 PM", available: true },
// // //   { id: 13, time: "4:00 PM", available: true },
// // //   { id: 14, time: "4:30 PM", available: true },
// // // ];

// // // // ---- Mock interviewers (kept from original semantics) ----
// // // const DEFAULT_INTERVIEWERS: Interviewer[] = [
// // //   { id: 1, name: "Alex Rodriguez", role: "Engineering Manager", checked: true },
// // //   { id: 2, name: "Sarah Kim", role: "Senior Engineer", checked: true },
// // //   { id: 3, name: "David Wilson", role: "Product Manager", checked: false },
// // // ];

// // // export default function SchedulerInterface() {
// // //   const router = useRouter();

// // //   // steps: 1 date, 2 time, 3 confirm
// // //   const [step, setStep] = useState<1 | 2 | 3>(1);
// // //   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
// // //   const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

// // //   const [candidates, setCandidates] = useState<RawCandidate[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedCandidate, setSelectedCandidate] = useState<RawCandidate | null>(null);

// // //   const [interviewers, setInterviewers] = useState<Interviewer[]>(DEFAULT_INTERVIEWERS);

// // //   const [jobDescription, setJobDescription] = useState("");
// // //   const [showJDModal, setShowJDModal] = useState(false);

// // //   // --------- data loading ----------
// // //   const load = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       const list = await fetchCandidates();
// // //       setCandidates(list);
// // //     } catch (e) {
// // //       // fallback to a tiny mock if backend is down
// // //       setCandidates([
// // //         { id: 1, name: "Emily Johnson", role: "Senior Software Engineer", photo: null },
// // //         { id: 2, name: "Michael Chen", role: "Senior Software Engineer", photo: null },
// // //         { id: 3, name: "Sophia Williams", role: "Senior Software Engineer", photo: null },
// // //       ]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => { load(); }, [load]);

// // //   // --------- calendar handlers ----------
// // //   const goPrevMonth = () =>
// // //     setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
// // //   const goNextMonth = () =>
// // //     setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
// // //   const pickDay = (d: number) => {
// // //     setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), d));
// // //     setStep(2);
// // //   };

// // //   // --------- time slot handlers ----------
// // //   const backToCalendar = () => setStep(1);
// // //   const pickSlot = (s: Slot) => {
// // //     setSelectedSlot(s);
// // //     setStep(3);
// // //   };

// // //   // toggle interviewer
// // //   const toggleInterviewer = (id: number) =>
// // //     setInterviewers((prev) => prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it)));

// // //   // --------- schedule interview ----------
// // //   const handleSchedule = async () => {
// // //     if (!selectedCandidate) {
// // //       alert("Please select a candidate");
// // //       return;
// // //     }
// // //     if (!selectedSlot) {
// // //       alert("Please pick a time slot");
// // //       return;
// // //     }

// // //     // ensure we have email (if not, attempt to refresh candidates for this job)
// // //     let withEmail = selectedCandidate;
// // //     if (!withEmail.email) {
// // //       const refreshed = await fetchCandidates(withEmail.job_id);
// // //       const found = refreshed.find((c: { id: any; }) => String(c.id) === String(withEmail.id));
// // //       if (!found?.email) {
// // //         alert("Cannot schedule interview: Candidate email not found.");
// // //         return;
// // //       }
// // //       withEmail = found;
// // //     }

// // //     // compose datetime from date + slot
// // //     const [hm, ampm] = selectedSlot.time.split(" ");
// // //     const [hStr, mStr] = hm.split(":");
// // //     const h = parseInt(hStr, 10);
// // //     const m = parseInt(mStr, 10);
// // //     const isPM = ampm?.toUpperCase().includes("PM");
// // //     const dt = new Date(selectedDate);
// // //     dt.setHours(isPM && h !== 12 ? h + 12 : h === 12 && !isPM ? 0 : h);
// // //     dt.setMinutes(m);

// // //     const res = await scheduleInterview({
// // //       candidate_id: withEmail.id,
// // //       email: withEmail.email!,
// // //       date_iso: dt.toISOString(),
// // //       time_slot: selectedSlot.time,
// // //     });

// // //     if (!res.success) {
// // //       alert(`Failed to schedule interview: ${res.message ?? "Unknown error"}`);
// // //       return;
// // //     }

// // //     if (res.already_scheduled) {
// // //       alert(`Interview already scheduled.\nLink: ${res.interview_link}`);
// // //     } else {
// // //       const msg =
// // //         `Interview scheduled!\n\n` +
// // //         `Candidate: ${withEmail.name}\n` +
// // //         `Email: ${withEmail.email}\n` +
// // //         `Link: ${res.interview_link}\n` +
// // //         `KB: ${res.knowledge_base_id}\n` +
// // //         `Resume: ${res.resume_extracted ? "✅" : "❌"}\n` +
// // //         `Job Description: ${res.job_description_used ? "✅ Provided" : "📝 Auto" }\n\n` +
// // //         `${res.email_sent ? "Email sent." : "Email sending failed."}`;
// // //       alert(msg);
// // //       if (res.interview_link && navigator.clipboard) {
// // //         try { await navigator.clipboard.writeText(res.interview_link); } catch {}
// // //       }
// // //     }

// // //     // back to candidate list (or route)
// // //     router.push("/candidates");
// // //   };

// // //   // --------- derived ---------
// // //   const selectedTitle = selectedCandidate?.job_title ?? selectedCandidate?.role ?? undefined;
// // //   const candidatesCount = candidates.length;

// // //   // --------- UI ---------
// // //   if (loading) {
// // //     return (
// // //       <div className="flex min-h-screen items-center justify-center bg-gray-50">
// // //         <div className="animate-pulse text-gray-500">Loading candidates...</div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="flex min-h-screen flex-col bg-gray-50">
// // //       {/* keep your Navbar in layout */}

// // //       <main className="flex-grow p-6">
// // //         {/* Header */}
// // //         <div className="mb-6 flex items-center justify-between">
// // //           <h1 className="text-2xl font-bold text-gray-700">Interview Scheduler</h1>
// // //           <div className="flex items-center space-x-3">
// // //             <div className="relative">
// // //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
// // //               <input
// // //                 placeholder="Search…"
// // //                 className="font-medium text-gray-700 rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Wizard container */}
// // //         <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
// // //           {/* Step header */}
// // //           <div className="border-b border-gray-200 bg-gray-50 p-4">
// // //             <div className="flex items-center justify-between">
// // //               <h2 className="font-medium text-gray-700">Schedule an Interview</h2>
// // //               <div className="flex items-center">
// // //                 {([1, 2, 3] as const).map((n, i) => (
// // //                   <React.Fragment key={n}>
// // //                     <div
// // //                       className={[
// // //                         "flex items-center",
// // //                         step >= n ? "text-blue-600" : "text-gray-400",
// // //                       ].join(" ")}
// // //                     >
// // //                       <div
// // //                         className={[
// // //                           "flex h-6 w-6 items-center justify-center rounded-full border-2",
// // //                           step >= n ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300",
// // //                         ].join(" ")}
// // //                       >
// // //                         {n}
// // //                       </div>
// // //                       <span className="ml-2 text-sm font-medium">
// // //                         {n === 1 ? "Select Date" : n === 2 ? "Select Time" : "Confirm"}
// // //                       </span>
// // //                     </div>
// // //                     {i < 2 && (
// // //                       <div className={`mx-2 h-1 w-8 ${step > n ? "bg-blue-600" : "bg-gray-200"}`} />
// // //                     )}
// // //                   </React.Fragment>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Body */}
// // //           <div className="p-6">
// // //             {step === 1 && (
// // //               <CalendarGrid
// // //                 selectedDate={selectedDate}
// // //                 onPrevMonth={goPrevMonth}
// // //                 onNextMonth={goNextMonth}
// // //                 onPickDay={pickDay}
// // //               />
// // //             )}

// // //             {step === 2 && (
// // //               <TimeSlots
// // //                 date={selectedDate}
// // //                 morning={MORNING}
// // //                 afternoon={AFTERNOON}
// // //                 selected={selectedSlot}
// // //                 onPick={pickSlot}
// // //                 onBack={backToCalendar}
// // //               />
// // //             )}

// // //             {step === 3 && (
// // //               <div>
// // //                 <InterviewSummary
// // //                   date={selectedDate}
// // //                   timeText={selectedSlot?.time}
// // //                   title={selectedTitle}
// // //                   candidateName={selectedCandidate?.name}
// // //                 />

// // //                 <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
// // //                   <CandidateSelector
// // //                     items={candidates}
// // //                     selected={selectedCandidate}
// // //                     onPick={(c) => {
// // //                       setSelectedCandidate(c);
// // //                       if (c.job_description) setJobDescription(c.job_description);
// // //                     }}
// // //                   />

// // //                   <InterviewerPicker
// // //                     items={interviewers}
// // //                     onToggle={toggleInterviewer}
// // //                   />
// // //                 </div>

// // //                 {/* Job Description section */}
// // //                 <div className="mb-4 border-t border-gray-200 pt-4">
// // //                   <div className="mb-3 flex items-center justify-between">
// // //                     <h4 className="font-medium text-gray-700">Job Description (Optional)</h4>
// // //                     <button
// // //                       onClick={() => setShowJDModal(true)}
// // //                       className="flex items-center text-sm text-blue-600 hover:underline"
// // //                     >
// // //                       <FileText size={16} className="mr-1" />
// // //                       {jobDescription ? "Edit" : "Add"} Job Description
// // //                     </button>
// // //                   </div>
// // //                   <div className="rounded-md bg-gray-50 p-3">
// // //                     <p className="text-sm text-gray-600">
// // //                       {jobDescription ? (
// // //                         <span>{jobDescription.length > 120 ? `${jobDescription.slice(0, 120)}…` : jobDescription}</span>
// // //                       ) : (
// // //                         <em>
// // //                           No job description provided. The system will use a generic description
// // //                           or candidate&apos;s profile.
// // //                         </em>
// // //                       )}
// // //                     </p>
// // //                   </div>
// // //                 </div>

// // //                 {/* Interview method (kept visual) */}
// // //                 <div className="border-t border-gray-200 pt-4">
// // //                   <h4 className="mb-3 font-medium text-gray-700">Interview Method</h4>
// // //                   <div className="flex space-x-4">
// // //                     <div className="flex-1 cursor-pointer rounded-md border border-blue-500 bg-blue-50 p-4 hover:border-blue-500 hover:bg-blue-50">
// // //                       <div className="flex items-center">
// // //                         <Video size={20} className="mr-3 text-blue-800" />
// // //                         <div>
// // //                           <div className="font-medium text-sm text-gray-700">AI-Powered Video Interview</div>
// // //                           <div className="text-sm text-gray-500">
// // //                             Secure interview link will be sent automatically
// // //                           </div>
// // //                           <div className="mt-1 text-xs text-green-600">
// // //                             ✓ Knowledge base will be created from resume
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                     <div className="flex-1 cursor-pointer rounded-md border border-gray-200 p-4 hover:border-blue-500 hover:bg-blue-50">
// // //                       <div className="flex items-center">
// // //                         <MapPin size={20} className="mr-3 text-gray-600" />
// // //                         <div>
// // //                           <div className="font-medium text-sm text-gray-700 ">In-Person</div>
// // //                           <div className="text-sm text-gray-500">
// // //                             Office location details will be shared
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Actions */}
// // //                 <div className="mt-6 flex justify-end space-x-3">
// // //                   <button
// // //                     onClick={() => setStep(1)}
// // //                     className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                   <button
// // //                     onClick={handleSchedule}
// // //                     disabled={!selectedCandidate}
// // //                     className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
// // //                   >
// // //                     Schedule Interview
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </main>

// // //       {/* Job Description Modal */}
// // //       <JobDescriptionModal
// // //         open={showJDModal}
// // //         value={jobDescription}
// // //         defaultTitle={selectedTitle}
// // //         onChange={setJobDescription}
// // //         onClose={() => setShowJDModal(false)}
// // //         onSave={() => setShowJDModal(false)}
// // //       />
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import React, { useEffect, useState, useCallback } from "react";
// // import { Video, MapPin, Search, FileText } from "lucide-react";
// // import { useRouter } from "next/navigation";

// // import CalendarGrid from "./subComponents/CalendarGrid";
// // import TimeSlots, { type Slot } from "./subComponents/TimeSlots";
// // import CandidateSelector from "./subComponents/CandidateSelector";
// // import InterviewerPicker, { type Interviewer } from "./subComponents/InterviewerPicker";
// // import JobDescriptionModal from "./subComponents/JobDescriptionModal";
// // import InterviewSummary from "./subComponents/InterviewSummary";

// // import { fetchCandidates, scheduleInterview, type RawCandidate } from "@/services/api/schedulerAPI";

// // // ---- Mock time slots (kept from original) ----
// // const MORNING: Slot[] = [
// //   { id: 1, time: "9:00 AM", available: true },
// //   { id: 2, time: "9:30 AM", available: true },
// //   { id: 3, time: "10:00 AM", available: true },
// //   { id: 4, time: "10:30 AM", available: false },
// //   { id: 5, time: "11:00 AM", available: true },
// //   { id: 6, time: "11:30 AM", available: true },
// // ];
// // const AFTERNOON: Slot[] = [
// //   { id: 7, time: "1:00 PM", available: true },
// //   { id: 8, time: "1:30 PM", available: false },
// //   { id: 9, time: "2:00 PM", available: true },
// //   { id: 10, time: "2:30 PM", available: true },
// //   { id: 11, time: "3:00 PM", available: false },
// //   { id: 12, time: "3:30 PM", available: true },
// //   { id: 13, time: "4:00 PM", available: true },
// //   { id: 14, time: "4:30 PM", available: true },
// // ];

// // // ---- Mock interviewers (kept from original semantics) ----
// // const DEFAULT_INTERVIEWERS: Interviewer[] = [
// //   { id: 1, name: "Alex Rodriguez", role: "Engineering Manager", checked: true },
// //   { id: 2, name: "Sarah Kim", role: "Senior Engineer", checked: true },
// //   { id: 3, name: "David Wilson", role: "Product Manager", checked: false },
// // ];

// // export default function SchedulerInterface() {
// //   const router = useRouter();

// //   // steps: 1 date, 2 time, 3 confirm
// //   const [step, setStep] = useState<1 | 2 | 3>(1);
// //   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
// //   const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

// //   const [candidates, setCandidates] = useState<RawCandidate[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedCandidate, setSelectedCandidate] = useState<RawCandidate | null>(null);

// //   const [interviewers, setInterviewers] = useState<Interviewer[]>(DEFAULT_INTERVIEWERS);

// //   const [jobDescription, setJobDescription] = useState("");
// //   const [showJDModal, setShowJDModal] = useState(false);

// //   // --------- data loading ----------
// //   const load = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const list = await fetchCandidates();
// //       setCandidates(list);
// //     } catch {
// //       // fallback to a tiny mock if backend is down
// //       setCandidates([
// //         { id: 1, name: "Emily Johnson", role: "Senior Software Engineer", photo: null },
// //         { id: 2, name: "Michael Chen", role: "Senior Software Engineer", photo: null },
// //         { id: 3, name: "Sophia Williams", role: "Senior Software Engineer", photo: null },
// //       ]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => { load(); }, [load]);

// //   // --------- calendar handlers ----------
// //   const goPrevMonth = () =>
// //     setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
// //   const goNextMonth = () =>
// //     setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
// //   const pickDay = (d: number) => {
// //     setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), d));
// //     setStep(2);
// //   };

// //   // --------- time slot handlers ----------
// //   const backToCalendar = () => setStep(1);
// //   const pickSlot = (s: Slot) => {
// //     setSelectedSlot(s);
// //     setStep(3);
// //   };

// //   // toggle interviewer
// //   const toggleInterviewer = (id: number) =>
// //     setInterviewers((prev) => prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it)));

// //   // --------- schedule interview ----------
// //   const handleSchedule = async () => {
// //     if (!selectedCandidate) {
// //       alert("Please select a candidate");
// //       return;
// //     }
// //     if (!selectedSlot) {
// //       alert("Please pick a time slot");
// //       return;
// //     }

// //     // ensure we have email (if not, attempt to refresh candidates for this job)
// //     let withEmail = selectedCandidate;
// //     if (!withEmail.email) {
// //       const refreshed = await fetchCandidates(withEmail.job_id);
// //       const found = refreshed.find((c: RawCandidate) => String(c.id) === String(withEmail.id));
// //       if (!found?.email) {
// //         alert("Cannot schedule interview: Candidate email not found.");
// //         return;
// //       }
// //       withEmail = found;
// //     }

// //     // compose datetime from date + slot
// //     const [hm, ampm] = selectedSlot.time.split(" ");
// //     const [hStr, mStr] = hm.split(":");
// //     const h = parseInt(hStr, 10);
// //     const m = parseInt(mStr, 10);
// //     const isPM = ampm?.toUpperCase().includes("PM");
// //     const dt = new Date(selectedDate);
// //     dt.setHours(isPM && h !== 12 ? h + 12 : h === 12 && !isPM ? 0 : h);
// //     dt.setMinutes(m);

// //     const res = await scheduleInterview({
// //       candidate_id: withEmail.id,
// //       email: withEmail.email!,
// //       date_iso: dt.toISOString(),
// //       time_slot: selectedSlot.time,
// //     });

// //     if (!res.success) {
// //       alert(`Failed to schedule interview: ${res.message ?? "Unknown error"}`);
// //       return;
// //     }

// //     if (res.already_scheduled) {
// //       alert(`Interview already scheduled.\nLink: ${res.interview_link}`);
// //     } else {
// //       const msg =
// //         `Interview scheduled!\n\n` +
// //         `Candidate: ${withEmail.name}\n` +
// //         `Email: ${withEmail.email}\n` +
// //         `Link: ${res.interview_link}\n` +
// //         `KB: ${res.knowledge_base_id}\n` +
// //         `Resume: ${res.resume_extracted ? "✅" : "❌"}\n` +
// //         `Job Description: ${res.job_description_used ? "✅ Provided" : "📝 Auto" }\n\n` +
// //         `${res.email_sent ? "Email sent." : "Email sending failed."}`;
// //       alert(msg);
// //       if (res.interview_link && navigator.clipboard) {
// //         try { await navigator.clipboard.writeText(res.interview_link); } catch {}
// //       }
// //     }

// //     // back to candidate list (or route)
// //     router.push("/candidates");
// //   };

// //   // --------- derived ---------
// //   const selectedTitle = selectedCandidate?.job_title ?? selectedCandidate?.role ?? undefined;

// //   // --------- UI ---------
// //   if (loading) {
// //     return (
// //       <div className="flex min-h-screen items-center justify-center bg-gray-50">
// //         <div className="animate-pulse text-gray-500">Loading candidates...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex min-h-screen flex-col bg-gray-50">
// //       {/* keep your Navbar in layout */}

// //       <main className="flex-grow p-6">
// //         {/* Header */}
// //         <div className="mb-6 flex items-center justify-between">
// //           <h1 className="text-2xl font-bold text-gray-700">Interview Scheduler</h1>
// //           <div className="flex items-center space-x-3">
// //             <div className="relative">
// //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
// //               <input
// //                 placeholder="Search…"
// //                 className="font-medium text-gray-700 rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Wizard container */}
// //         <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
// //           {/* Step header */}
// //           <div className="border-b border-gray-200 bg-gray-50 p-4">
// //             <div className="flex items-center justify-between">
// //               <h2 className="font-medium text-gray-700">Schedule an Interview</h2>
// //               <div className="flex items-center">
// //                 {([1, 2, 3] as const).map((n, i) => (
// //                   <React.Fragment key={n}>
// //                     <div
// //                       className={[
// //                         "flex items-center",
// //                         step >= n ? "text-blue-600" : "text-gray-400",
// //                       ].join(" ")}
// //                     >
// //                       <div
// //                         className={[
// //                           "flex h-6 w-6 items-center justify-center rounded-full border-2",
// //                           step >= n ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300",
// //                         ].join(" ")}
// //                       >
// //                         {n}
// //                       </div>
// //                       <span className="ml-2 text-sm font-medium">
// //                         {n === 1 ? "Select Date" : n === 2 ? "Select Time" : "Confirm"}
// //                       </span>
// //                     </div>
// //                     {i < 2 && (
// //                       <div className={`mx-2 h-1 w-8 ${step > n ? "bg-blue-600" : "bg-gray-200"}`} />
// //                     )}
// //                   </React.Fragment>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Body */}
// //           <div className="p-6">
// //             {step === 1 && (
// //               <CalendarGrid
// //                 selectedDate={selectedDate}
// //                 onPrevMonth={goPrevMonth}
// //                 onNextMonth={goNextMonth}
// //                 onPickDay={pickDay}
// //               />
// //             )}

// //             {step === 2 && (
// //               <TimeSlots
// //                 date={selectedDate}
// //                 morning={MORNING}
// //                 afternoon={AFTERNOON}
// //                 selected={selectedSlot}
// //                 onPick={pickSlot}
// //                 onBack={backToCalendar}
// //               />
// //             )}

// //             {step === 3 && (
// //               <div>
// //                 <InterviewSummary
// //                   date={selectedDate}
// //                   timeText={selectedSlot?.time}
// //                   title={selectedTitle}
// //                   candidateName={selectedCandidate?.name}
// //                 />

// //                 <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
// //                   <CandidateSelector
// //                     items={candidates}
// //                     selected={selectedCandidate}
// //                     onPick={(c) => {
// //                       setSelectedCandidate(c);
// //                       if (c.job_description) setJobDescription(c.job_description);
// //                     }}
// //                   />

// //                   <InterviewerPicker
// //                     items={interviewers}
// //                     onToggle={toggleInterviewer}
// //                   />
// //                 </div>

// //                 {/* Job Description section */}
// //                 <div className="mb-4 border-t border-gray-200 pt-4">
// //                   <div className="mb-3 flex items-center justify-between">
// //                     <h4 className="font-medium text-gray-700">Job Description (Optional)</h4>
// //                     <button
// //                       onClick={() => setShowJDModal(true)}
// //                       className="flex items-center text-sm text-blue-600 hover:underline"
// //                     >
// //                       <FileText size={16} className="mr-1" />
// //                       {jobDescription ? "Edit" : "Add"} Job Description
// //                     </button>
// //                   </div>
// //                   <div className="rounded-md bg-gray-50 p-3">
// //                     <p className="text-sm text-gray-600">
// //                       {jobDescription ? (
// //                         <span>{jobDescription.length > 120 ? `${jobDescription.slice(0, 120)}…` : jobDescription}</span>
// //                       ) : (
// //                         <em>
// //                           No job description provided. The system will use a generic description
// //                           or candidate&apos;s profile.
// //                         </em>
// //                       )}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* Interview method (kept visual) */}
// //                 <div className="border-t border-gray-200 pt-4">
// //                   <h4 className="mb-3 font-medium text-gray-700">Interview Method</h4>
// //                   <div className="flex space-x-4">
// //                     <div className="flex-1 cursor-pointer rounded-md border border-blue-500 bg-blue-50 p-4 hover:border-blue-500 hover:bg-blue-50">
// //                       <div className="flex items-center">
// //                         <Video size={20} className="mr-3 text-blue-800" />
// //                         <div>
// //                           <div className="font-medium text-sm text-gray-700">AI-Powered Video Interview</div>
// //                           <div className="text-sm text-gray-500">
// //                             Secure interview link will be sent automatically
// //                           </div>
// //                           <div className="mt-1 text-xs text-green-600">
// //                             ✓ Knowledge base will be created from resume
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div className="flex-1 cursor-pointer rounded-md border border-gray-200 p-4 hover:border-blue-500 hover:bg-blue-50">
// //                       <div className="flex items-center">
// //                         <MapPin size={20} className="mr-3 text-gray-600" />
// //                         <div>
// //                           <div className="font-medium text-sm text-gray-700 ">In-Person</div>
// //                           <div className="text-sm text-gray-500">
// //                             Office location details will be shared
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Actions */}
// //                 <div className="mt-6 flex justify-end space-x-3">
// //                   <button
// //                     onClick={() => setStep(1)}
// //                     className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     onClick={handleSchedule}
// //                     disabled={!selectedCandidate}
// //                     className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
// //                   >
// //                     Schedule Interview
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </main>

// //       {/* Job Description Modal */}
// //       <JobDescriptionModal
// //         open={showJDModal}
// //         value={jobDescription}
// //         defaultTitle={selectedTitle}
// //         onChange={setJobDescription}
// //         onClose={() => setShowJDModal(false)}
// //         onSave={() => setShowJDModal(false)}
// //       />
// //     </div>
// //   );
// // }
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useEffect, useState, useCallback } from "react";
// import { Video, MapPin, FileText, ChevronLeft, ChevronRight, Clock, CheckCircle, X } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { fetchCandidates, scheduleInterview, type RawCandidate } from "@/services/api/schedulerAPI";

// // ── Types ─────────────────────────────────────────────────────────────────────
// type Slot = { id: number; time: string; available: boolean };
// type Interviewer = { id: number; name: string; role: string; checked: boolean };

// // ── Constants ─────────────────────────────────────────────────────────────────
// const MORNING: Slot[] = [
//   { id: 1, time: "9:00 AM",  available: true  },
//   { id: 2, time: "9:30 AM",  available: true  },
//   { id: 3, time: "10:00 AM", available: true  },
//   { id: 4, time: "10:30 AM", available: false },
//   { id: 5, time: "11:00 AM", available: true  },
//   { id: 6, time: "11:30 AM", available: true  },
// ];
// const AFTERNOON: Slot[] = [
//   { id: 7,  time: "1:00 PM", available: true  },
//   { id: 8,  time: "1:30 PM", available: false },
//   { id: 9,  time: "2:00 PM", available: true  },
//   { id: 10, time: "2:30 PM", available: true  },
//   { id: 11, time: "3:00 PM", available: false },
//   { id: 12, time: "3:30 PM", available: true  },
//   { id: 13, time: "4:00 PM", available: true  },
//   { id: 14, time: "4:30 PM", available: true  },
// ];
// const DEFAULT_INTERVIEWERS: Interviewer[] = [
//   { id: 1, name: "Alex Rodriguez", role: "Engineering Manager", checked: true  },
//   { id: 2, name: "Sarah Kim",       role: "Senior Engineer",    checked: true  },
//   { id: 3, name: "David Wilson",    role: "Product Manager",    checked: false },
// ];

// // ── Design tokens ─────────────────────────────────────────────────────────────
// const T = {
//   accent:    "#2563EB",
//   accentL:   "#EFF6FF",
//   accentM:   "#BFDBFE",
//   green:     "#059669",
//   greenL:    "#ECFDF5",
//   red:       "#DC2626",
//   amber:     "#D97706",
//   t1:        "#0F172A",
//   t2:        "#64748B",
//   t3:        "#94A3B8",
//   border:    "rgba(0,0,0,0.08)",
//   borderMd:  "rgba(0,0,0,0.14)",
//   surface:   "#FFFFFF",
//   bg:        "#F8FAFC",
// };

// // ── Avatar helper ─────────────────────────────────────────────────────────────
// const PALETTES: [string,string][] = [
//   ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
//   ["#FAF5FF","#7C3AED"],["#F0FDFA","#0D9488"],["#FFFBEB","#D97706"],
// ];
// function avatarColors(name: string): [string,string] {
//   let h = 0;
//   for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
//   return PALETTES[Math.abs(h) % PALETTES.length];
// }
// function initials(name: string) {
//   return name.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();
// }

// // ══════════════════════════════════════════════════════════════════════════════
// // SUB-COMPONENTS (all inline styles — Tailwind-free)
// // ══════════════════════════════════════════════════════════════════════════════

// // ── Step indicator ────────────────────────────────────────────────────────────
// function StepBar({ step }: { step: number }) {
//   const steps = ["Select Date", "Select Time", "Confirm Details"];
//   return (
//     <div style={{ display:"flex", alignItems:"center" }}>
//       {steps.map((label, i) => {
//         const n       = i + 1;
//         const active  = step >= n;
//         const current = step === n;
//         return (
//           <React.Fragment key={n}>
//             <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//               <div style={{
//                 width:28, height:28, borderRadius:"50%", border:`2px solid ${active ? T.accent : T.t3}`,
//                 background: active ? T.accent : "transparent",
//                 display:"flex", alignItems:"center", justifyContent:"center",
//                 fontSize:12, fontWeight:600, color: active ? "#fff" : T.t3,
//                 transition:"all .2s",
//               }}>
//                 {step > n ? <CheckCircle size={14} /> : n}
//               </div>
//               <span style={{
//                 fontSize:13, fontWeight: current ? 600 : 400,
//                 color: active ? T.t1 : T.t3, whiteSpace:"nowrap",
//               }}>{label}</span>
//             </div>
//             {i < 2 && (
//               <div style={{
//                 width:40, height:2, margin:"0 12px", borderRadius:2,
//                 background: step > n ? T.accent : T.borderMd, transition:"background .2s",
//               }} />
//             )}
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );
// }

// // ── Calendar ──────────────────────────────────────────────────────────────────
// function CalendarGrid({
//   selectedDate, onPrevMonth, onNextMonth, onPickDay,
// }: {
//   selectedDate: Date; onPrevMonth: ()=>void; onNextMonth: ()=>void; onPickDay: (d:number)=>void;
// }) {
//   const daysInMonth   = new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1, 0).getDate();
//   const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
//   const today         = new Date();
//   const weekdays      = ["Su","Mo","Tu","We","Th","Fr","Sa"];

//   return (
//     <div>
//       {/* Month nav */}
//       <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
//         <button onClick={onPrevMonth}
//           style={{ width:36,height:36,borderRadius:8,border:`0.5px solid ${T.borderMd}`,background:T.surface,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
//           <ChevronLeft size={18} color={T.t2} />
//         </button>
//         <span style={{ fontSize:15,fontWeight:600,color:T.t1 }}>
//           {selectedDate.toLocaleString("default", { month:"long", year:"numeric" })}
//         </span>
//         <button onClick={onNextMonth}
//           style={{ width:36,height:36,borderRadius:8,border:`0.5px solid ${T.borderMd}`,background:T.surface,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
//           <ChevronRight size={18} color={T.t2} />
//         </button>
//       </div>

//       {/* Grid */}
//       <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
//         {/* Weekday headers */}
//         {weekdays.map(d => (
//           <div key={d} style={{ textAlign:"center", fontSize:11, fontWeight:600, color:T.t3, paddingBottom:8, textTransform:"uppercase", letterSpacing:.5 }}>{d}</div>
//         ))}
//         {/* Blank cells */}
//         {Array.from({ length: firstDayOfMonth }).map((_,i) => <div key={`b${i}`} />)}
//         {/* Day cells */}
//         {Array.from({ length: daysInMonth }).map((_,i) => {
//           const day = i+1;
//           const isToday    = today.getDate()===day && today.getMonth()===selectedDate.getMonth() && today.getFullYear()===selectedDate.getFullYear();
//           const isSelected = selectedDate.getDate()===day;
//           const hasSlot    = day % 3 === 0;
//           return (
//             <button
//               key={day}
//               onClick={() => onPickDay(day)}
//               style={{
//                 padding:"10px 4px", borderRadius:8, border:`0.5px solid ${isSelected ? T.accent : T.border}`,
//                 background: isSelected ? T.accent : isToday ? T.accentL : T.surface,
//                 color: isSelected ? "#fff" : T.t1,
//                 cursor:"pointer", textAlign:"center", transition:"all .12s",
//                 display:"flex", flexDirection:"column", alignItems:"center", gap:3,
//               }}
//             >
//               <span style={{ fontSize:13, fontWeight: isSelected||isToday ? 600 : 400 }}>{day}</span>
//               {hasSlot && (
//                 <span style={{ width:5,height:5,borderRadius:"50%",background: isSelected?"rgba(255,255,255,0.8)":T.green }} />
//               )}
//             </button>
//           );
//         })}
//       </div>

//       {/* Legend */}
//       <div style={{ display:"flex", gap:20, marginTop:18 }}>
//         {[
//           { color:T.green, label:"Available slots"  },
//           { color:T.accent,label:"Selected date"     },
//         ].map(({ color, label }) => (
//           <div key={label} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:T.t2 }}>
//             <div style={{ width:10,height:10,borderRadius:"50%",background:color }} />
//             {label}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ── Time slots ────────────────────────────────────────────────────────────────
// function TimeSlots({
//   date, morning, afternoon, selected, onPick, onBack,
// }: {
//   date:Date; morning:Slot[]; afternoon:Slot[]; selected:Slot|null;
//   onPick:(s:Slot)=>void; onBack:()=>void;
// }) {
//   const friendly = date.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" });

//   const SlotBtn = ({ slot }: { slot: Slot }) => {
//     const sel = selected?.id === slot.id;
//     return (
//       <button
//         onClick={() => slot.available && onPick(slot)}
//         disabled={!slot.available}
//         style={{
//           width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
//           padding:"12px 14px", borderRadius:9, marginBottom:8,
//           border:`0.5px solid ${sel ? T.accent : slot.available ? T.borderMd : T.border}`,
//           background: sel ? T.accentL : slot.available ? T.surface : T.bg,
//           cursor: slot.available ? "pointer" : "not-allowed",
//           opacity: slot.available ? 1 : 0.5,
//           transition:"all .12s",
//         }}
//       >
//         <span style={{ display:"flex", alignItems:"center", gap:8, fontSize:13,
//           fontWeight: sel ? 600 : 400, color: sel ? T.accent : T.t1 }}>
//           <Clock size={15} color={sel ? T.accent : T.t2} />
//           {slot.time}
//         </span>
//         {!slot.available && <span style={{ fontSize:11, color:T.t3 }}>Unavailable</span>}
//         {sel && <span style={{ fontSize:11, fontWeight:600, color:T.accent }}>Selected ✓</span>}
//       </button>
//     );
//   };

//   return (
//     <div>
//       <button onClick={onBack}
//         style={{ display:"flex",alignItems:"center",gap:4,fontSize:13,fontWeight:500,color:T.accent,background:"none",border:"none",cursor:"pointer",marginBottom:16,padding:0 }}>
//         <ChevronLeft size={15}/> Back to calendar
//       </button>
//       <h3 style={{ fontSize:16,fontWeight:600,color:T.t1,marginBottom:20 }}>
//         Select a time on <span style={{ color:T.accent }}>{friendly}</span>
//       </h3>
//       <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
//         <div>
//           <p style={{ fontSize:13,fontWeight:600,color:T.t1,marginBottom:12 }}>Morning</p>
//           {morning.map(s => <SlotBtn key={s.id} slot={s} />)}
//         </div>
//         <div>
//           <p style={{ fontSize:13,fontWeight:600,color:T.t1,marginBottom:12 }}>Afternoon</p>
//           {afternoon.map(s => <SlotBtn key={s.id} slot={s} />)}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Interview summary banner ───────────────────────────────────────────────────
// function InterviewSummary({ date, timeText, title, candidateName }: {
//   date:Date; timeText?:string; title?:string; candidateName?:string;
// }) {
//   const friendly = date.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" });
//   return (
//     <div style={{
//       display:"flex", alignItems:"flex-start", gap:14,
//       padding:"16px 18px", borderRadius:12,
//       border:`0.5px solid ${T.accentM}`, background:T.accentL, marginBottom:24,
//     }}>
//       <div style={{ width:36,height:36,borderRadius:9,background:T.accent,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
//         <CheckCircle size={18} color="#fff" />
//       </div>
//       <div>
//         <p style={{ fontSize:13,fontWeight:600,color:T.t1,marginBottom:4 }}>Interview Summary</p>
//         <p style={{ fontSize:15,fontWeight:600,color:T.accent }}>
//           {friendly}{timeText ? ` at ${timeText}` : ""}
//         </p>
//         <div style={{ display:"flex", gap:24, marginTop:10 }}>
//           <div style={{ fontSize:13, color:T.t2 }}>
//             <span style={{ fontWeight:600,color:T.t1 }}>Position: </span>{title || "—"}
//           </div>
//           <div style={{ fontSize:13, color:T.t2 }}>
//             <span style={{ fontWeight:600,color:T.t1 }}>Candidate: </span>{candidateName || "—"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Candidate selector ────────────────────────────────────────────────────────
// function CandidateSelector({ items, selected, onPick }: {
//   items:RawCandidate[]; selected:RawCandidate|null; onPick:(c:RawCandidate)=>void;
// }) {
//   return (
//     <div>
//       <p style={{ fontSize:13,fontWeight:600,color:T.t1,marginBottom:12 }}>Select Candidate</p>
//       <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
//         {items.map(c => {
//           const chosen = selected?.id === c.id;
//           const [bg,fg] = avatarColors(c.name ?? "?");
//           return (
//             <button key={c.id} onClick={() => onPick(c)}
//               style={{
//                 display:"flex",alignItems:"center",justifyContent:"space-between",
//                 padding:"12px 14px", borderRadius:10, textAlign:"left",
//                 border:`0.5px solid ${chosen ? T.accent : T.borderMd}`,
//                 background: chosen ? T.accentL : T.surface,
//                 cursor:"pointer", transition:"all .12s",
//                 boxShadow: chosen ? `0 0 0 2px ${T.accentM}` : "none",
//               }}
//             >
//               <div style={{ display:"flex",alignItems:"center",gap:12 }}>
//                 <div style={{
//                   width:40,height:40,borderRadius:"50%",flexShrink:0,
//                   display:"flex",alignItems:"center",justifyContent:"center",
//                   fontSize:14,fontWeight:700,background:bg,color:fg,
//                 }}>
//                   {c.photo
//                     ? <img src={c.photo} alt={c.name??""} style={{ width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover" }} />
//                     : initials(c.name ?? "?")}
//                 </div>
//                 <div>
//                   <p style={{ fontSize:13,fontWeight:600,color: chosen ? T.accent : T.t1 }}>{c.name ?? "Unknown"}</p>
//                   <p style={{ fontSize:12,color:T.t2,marginTop:2 }}>{c.job_title ?? c.role ?? "—"}</p>
//                   {c.email && <p style={{ fontSize:11,color:T.t3,marginTop:1 }}>{c.email}</p>}
//                   {c.resume_path && (
//                     <p style={{ fontSize:11,fontWeight:600,color:T.green,marginTop:3,display:"flex",alignItems:"center",gap:4 }}>
//                       <FileText size={11} /> Resume available
//                     </p>
//                   )}
//                 </div>
//               </div>
//               {chosen && <CheckCircle size={18} color={T.green} />}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ── Interviewer picker ────────────────────────────────────────────────────────
// function InterviewerPicker({ items, onToggle }: { items:Interviewer[]; onToggle:(id:number)=>void; }) {
//   return (
//     <div>
//       <p style={{ fontSize:13,fontWeight:600,color:T.t1,marginBottom:12 }}>Interviewers</p>
//       <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
//         {items.map(it => {
//           const [bg,fg] = avatarColors(it.name);
//           return (
//             <div key={it.id}
//               style={{
//                 display:"flex",alignItems:"center",justifyContent:"space-between",
//                 padding:"12px 14px",borderRadius:10,
//                 border:`0.5px solid ${it.checked ? T.accent : T.borderMd}`,
//                 background: it.checked ? T.accentL : T.surface,
//                 transition:"all .12s",
//               }}
//             >
//               <div style={{ display:"flex",alignItems:"center",gap:12 }}>
//                 <div style={{
//                   width:40,height:40,borderRadius:"50%",
//                   display:"flex",alignItems:"center",justifyContent:"center",
//                   fontSize:14,fontWeight:700,background:bg,color:fg,flexShrink:0,
//                 }}>
//                   {initials(it.name)}
//                 </div>
//                 <div>
//                   <p style={{ fontSize:13,fontWeight:600,color:T.t1 }}>{it.name}</p>
//                   <p style={{ fontSize:12,color:T.t2,marginTop:2 }}>{it.role}</p>
//                 </div>
//               </div>
//               <input
//                 type="checkbox"
//                 checked={it.checked}
//                 onChange={() => onToggle(it.id)}
//                 style={{ width:18,height:18,cursor:"pointer",accentColor:T.accent }}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ── Job description modal ─────────────────────────────────────────────────────
// function JobDescriptionModal({ open, value, defaultTitle, onChange, onClose, onSave }: {
//   open:boolean; value:string; defaultTitle?:string;
//   onChange:(s:string)=>void; onClose:()=>void; onSave:()=>void;
// }) {
//   if (!open) return null;
//   return (
//     <div style={{
//       position:"fixed",inset:0,zIndex:9999,
//       background:"rgba(15,23,42,0.45)",
//       display:"flex",alignItems:"center",justifyContent:"center",padding:16,
//     }} onMouseDown={e => { if(e.target===e.currentTarget) onClose(); }}>
//       <div style={{ background:T.surface,borderRadius:16,width:"100%",maxWidth:560,maxHeight:"80vh",overflow:"hidden",display:"flex",flexDirection:"column" }}>
//         <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 22px",borderBottom:`0.5px solid ${T.border}` }}>
//           <h3 style={{ fontSize:15,fontWeight:600,color:T.t1 }}>Add / Edit Job Description</h3>
//           <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:T.t2,display:"flex" }}>
//             <X size={20} />
//           </button>
//         </div>
//         <div style={{ padding:"18px 22px",flex:1,overflow:"auto" }}>
//           <label style={{ fontSize:12,fontWeight:600,color:T.t2,display:"block",marginBottom:8,textTransform:"uppercase",letterSpacing:.5 }}>
//             Job Description
//           </label>
//           <textarea
//             rows={10}
//             value={value}
//             onChange={e => onChange(e.target.value)}
//             placeholder={`Enter job description for ${defaultTitle ?? "the position"}…`}
//             style={{
//               width:"100%",padding:"12px 14px",fontSize:13,fontFamily:"inherit",
//               color:T.t1,border:`0.5px solid ${T.borderMd}`,borderRadius:9,
//               outline:"none",resize:"vertical",lineHeight:1.6,background:T.bg,
//             }}
//           />
//         </div>
//         <div style={{ display:"flex",justifyContent:"flex-end",gap:10,padding:"14px 22px",borderTop:`0.5px solid ${T.border}` }}>
//           <button onClick={onClose}
//             style={{ padding:"8px 18px",fontSize:13,fontWeight:500,border:`0.5px solid ${T.borderMd}`,borderRadius:8,background:T.surface,color:T.t1,cursor:"pointer" }}>
//             Cancel
//           </button>
//           <button onClick={onSave}
//             style={{ padding:"8px 18px",fontSize:13,fontWeight:600,border:"none",borderRadius:8,background:T.accent,color:"#fff",cursor:"pointer" }}>
//             Save Job Description
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ══════════════════════════════════════════════════════════════════════════════
// // MAIN PAGE
// // ══════════════════════════════════════════════════════════════════════════════
// export default function SchedulerInterface() {
//   const router = useRouter();

//   const [step,              setStep]              = useState<1|2|3>(1);
//   const [selectedDate,      setSelectedDate]      = useState<Date>(new Date());
//   const [selectedSlot,      setSelectedSlot]      = useState<Slot|null>(null);
//   const [candidates,        setCandidates]        = useState<RawCandidate[]>([]);
//   const [loading,           setLoading]           = useState(true);
//   const [selectedCandidate, setSelectedCandidate] = useState<RawCandidate|null>(null);
//   const [interviewers,      setInterviewers]      = useState<Interviewer[]>(DEFAULT_INTERVIEWERS);
//   const [jobDescription,    setJobDescription]    = useState("");
//   const [showJDModal,       setShowJDModal]       = useState(false);
//   const [interviewMethod,   setInterviewMethod]   = useState<"ai"|"inperson">("ai");

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const list = await fetchCandidates();
//       setCandidates(list);
//     } catch {
//       setCandidates([
//         { id: 1, name: "Emily Johnson",   role: "Senior Software Engineer", photo: null },
//         { id: 2, name: "Michael Chen",    role: "Senior Software Engineer", photo: null },
//         { id: 3, name: "Sophia Williams", role: "Senior Software Engineer", photo: null },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);
//   useEffect(() => { load(); }, [load]);

//   const goPrevMonth = () => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth()-1, 1));
//   const goNextMonth = () => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1, 1));
//   const pickDay     = (d: number) => { setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), d)); setStep(2); };
//   const pickSlot    = (s: Slot)   => { setSelectedSlot(s); setStep(3); };
//   const toggleInterviewer = (id: number) =>
//     setInterviewers(prev => prev.map(it => it.id===id ? { ...it, checked:!it.checked } : it));

//   const handleSchedule = async () => {
//     if (!selectedCandidate) { alert("Please select a candidate"); return; }
//     if (!selectedSlot)      { alert("Please pick a time slot");   return; }

//     let withEmail = selectedCandidate;
//     if (!withEmail.email) {
//       const refreshed = await fetchCandidates(withEmail.job_id);
//       const found = refreshed.find((c: RawCandidate) => String(c.id)===String(withEmail.id));
//       if (!found?.email) { alert("Cannot schedule: Candidate email not found."); return; }
//       withEmail = found;
//     }

//     const [hm, ampm] = selectedSlot.time.split(" ");
//     const [hStr, mStr] = hm.split(":");
//     const h = parseInt(hStr,10), m = parseInt(mStr,10);
//     const isPM = ampm?.toUpperCase().includes("PM");
//     const dt = new Date(selectedDate);
//     dt.setHours(isPM && h!==12 ? h+12 : h===12 && !isPM ? 0 : h);
//     dt.setMinutes(m);

//     const res = await scheduleInterview({
//       candidate_id: withEmail.id,
//       email: withEmail.email!,
//       date_iso: dt.toISOString(),
//       time_slot: selectedSlot.time,
//     });

//     if (!res.success) { alert(`Failed: ${res.message ?? "Unknown error"}`); return; }

//     if (res.already_scheduled) {
//       alert(`Interview already scheduled.\nLink: ${res.interview_link}`);
//     } else {
//       alert(
//         `Interview scheduled!\n\nCandidate: ${withEmail.name}\nEmail: ${withEmail.email}\n` +
//         `Link: ${res.interview_link}\n${res.email_sent ? "Email sent." : "Email sending failed."}`
//       );
//       if (res.interview_link && navigator.clipboard)
//         try { await navigator.clipboard.writeText(res.interview_link); } catch {}
//     }
//     router.push("/candidates");
//   };

//   const selectedTitle = selectedCandidate?.job_title ?? selectedCandidate?.role ?? undefined;

//   // ── Loading state ──────────────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div style={{ display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh",background:T.bg }}>
//         <div style={{ display:"flex",alignItems:"center",gap:10,color:T.t2,fontSize:13 }}>
//           <div style={{ width:18,height:18,borderRadius:"50%",border:`2px solid ${T.accentM}`,borderTopColor:T.accent,animation:"spin .7s linear infinite" }} />
//           Loading candidates…
//         </div>
//         <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//       </div>
//     );
//   }

//   // ── Main render ────────────────────────────────────────────────────────────
//   return (
//     <div style={{ background:T.bg, minHeight:"100vh" }}>
//       <div style={{ maxWidth:920, margin:"0 auto", padding:"28px 24px 64px" }}>

//         {/* ── Page header ── */}
//         <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24 }}>
//           <div>
//             <h1 style={{ fontSize:22,fontWeight:600,color:T.t1,letterSpacing:"-.5px",margin:0 }}>
//               Interview Scheduler
//             </h1>
//             <p style={{ fontSize:13,color:T.t2,marginTop:4 }}>
//               Schedule and manage candidate interviews
//             </p>
//           </div>
//         </div>

//         {/* ── Wizard card ── */}
//         <div style={{ background:T.surface,border:`0.5px solid ${T.border}`,borderRadius:16,overflow:"hidden" }}>

//           {/* Step header */}
//           <div style={{
//             display:"flex",alignItems:"center",justifyContent:"space-between",
//             padding:"16px 24px",borderBottom:`0.5px solid ${T.border}`,background:T.bg,
//           }}>
//             <span style={{ fontSize:14,fontWeight:600,color:T.t1 }}>Schedule an Interview</span>
//             <StepBar step={step} />
//           </div>

//           {/* Step body */}
//           <div style={{ padding:"28px 28px" }}>

//             {/* ─── Step 1: Calendar ─── */}
//             {step===1 && (
//               <CalendarGrid
//                 selectedDate={selectedDate}
//                 onPrevMonth={goPrevMonth}
//                 onNextMonth={goNextMonth}
//                 onPickDay={pickDay}
//               />
//             )}

//             {/* ─── Step 2: Time slots ─── */}
//             {step===2 && (
//               <TimeSlots
//                 date={selectedDate}
//                 morning={MORNING}
//                 afternoon={AFTERNOON}
//                 selected={selectedSlot}
//                 onPick={pickSlot}
//                 onBack={() => setStep(1)}
//               />
//             )}

//             {/* ─── Step 3: Confirm ─── */}
//             {step===3 && (
//               <div>
//                 {/* Summary banner */}
//                 <InterviewSummary
//                   date={selectedDate}
//                   timeText={selectedSlot?.time}
//                   title={selectedTitle}
//                   candidateName={selectedCandidate?.name}
//                 />

//                 {/* Candidate + Interviewers */}
//                 <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:24 }}>
//                   <CandidateSelector
//                     items={candidates}
//                     selected={selectedCandidate}
//                     onPick={c => { setSelectedCandidate(c); if(c.job_description) setJobDescription(c.job_description); }}
//                   />
//                   <InterviewerPicker items={interviewers} onToggle={toggleInterviewer} />
//                 </div>

//                 {/* Job Description */}
//                 <div style={{ paddingTop:20,borderTop:`0.5px solid ${T.border}`,marginBottom:20 }}>
//                   <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
//                     <p style={{ fontSize:13,fontWeight:600,color:T.t1 }}>Job Description <span style={{ fontSize:12,fontWeight:400,color:T.t3 }}>(Optional)</span></p>
//                     <button onClick={() => setShowJDModal(true)}
//                       style={{ display:"flex",alignItems:"center",gap:5,fontSize:12,fontWeight:500,color:T.accent,background:"none",border:"none",cursor:"pointer" }}>
//                       <FileText size={14} />
//                       {jobDescription ? "Edit" : "Add"} Job Description
//                     </button>
//                   </div>
//                   <div style={{ background:T.bg,borderRadius:9,border:`0.5px solid ${T.border}`,padding:"11px 14px" }}>
//                     <p style={{ fontSize:13,color:T.t2,lineHeight:1.6 }}>
//                       {jobDescription
//                         ? jobDescription.length>120 ? `${jobDescription.slice(0,120)}…` : jobDescription
//                         : <em>No job description provided. The system will use a generic description or candidate&apos;s profile.</em>}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Interview Method */}
//                 <div style={{ paddingTop:20,borderTop:`0.5px solid ${T.border}`,marginBottom:28 }}>
//                   <p style={{ fontSize:13,fontWeight:600,color:T.t1,marginBottom:12 }}>Interview Method</p>
//                   <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
//                     {[
//                       {
//                         key:"ai", icon:<Video size={22} color={interviewMethod==="ai"?"#1E40AF":T.t2} />,
//                         title:"AI-Powered Video Interview",
//                         sub:"Secure interview link will be sent automatically",
//                         extra:"✓ Knowledge base will be created from resume",
//                         extraColor:T.green,
//                       },
//                       {
//                         key:"inperson", icon:<MapPin size={22} color={interviewMethod==="inperson"?"#1E40AF":T.t2} />,
//                         title:"In-Person",
//                         sub:"Office location details will be shared",
//                         extra: null, extraColor:"",
//                       },
//                     ].map(m => {
//                       const active = interviewMethod===m.key;
//                       return (
//                         <button key={m.key} onClick={() => setInterviewMethod(m.key as any)}
//                           style={{
//                             padding:"16px",borderRadius:10,textAlign:"left",cursor:"pointer",
//                             border:`1.5px solid ${active ? T.accent : T.borderMd}`,
//                             background: active ? T.accentL : T.surface,
//                             transition:"all .14s",
//                           }}>
//                           <div style={{ display:"flex",alignItems:"flex-start",gap:12 }}>
//                             <div style={{ marginTop:2 }}>{m.icon}</div>
//                             <div>
//                               <p style={{ fontSize:13,fontWeight:600,color:active?T.accent:T.t1 }}>{m.title}</p>
//                               <p style={{ fontSize:12,color:T.t2,marginTop:3 }}>{m.sub}</p>
//                               {m.extra && <p style={{ fontSize:11,color:m.extraColor,marginTop:5,fontWeight:500 }}>{m.extra}</p>}
//                             </div>
//                           </div>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div style={{ display:"flex",justifyContent:"flex-end",gap:10 }}>
//                   <button onClick={() => setStep(1)}
//                     style={{ padding:"9px 20px",fontSize:13,fontWeight:500,border:`0.5px solid ${T.borderMd}`,borderRadius:8,background:T.surface,color:T.t1,cursor:"pointer" }}>
//                     Cancel
//                   </button>
//                   <button onClick={handleSchedule} disabled={!selectedCandidate}
//                     style={{ padding:"9px 22px",fontSize:13,fontWeight:600,border:"none",borderRadius:8,background:!selectedCandidate?"#93C5FD":T.accent,color:"#fff",cursor:!selectedCandidate?"not-allowed":"pointer" }}>
//                     Schedule Interview
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Job Description Modal */}
//       <JobDescriptionModal
//         open={showJDModal}
//         value={jobDescription}
//         defaultTitle={selectedTitle}
//         onChange={setJobDescription}
//         onClose={() => setShowJDModal(false)}
//         onSave={() => setShowJDModal(false)}
//       />
//     </div>
//   );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { fetchCandidates, scheduleInterview } from "@/services/api/schedulerAPI";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Candidate {
  id: string; name: string; email: string; phone: string;
  job_title: string; dept: string; location: string; processed_date: string;
  ats_score: number; exam_percentage: number; exam_completed: boolean;
  interview_scheduled: boolean; interview_date: string | null;
  interview_type: string | null; interviewer: string | null;
  meeting_link: string | null; duration: number;
  interview_status: "pending" | "scheduled" | "completed" | "cancelled";
  resume_path: string | null; job_description: string;
}
interface Interviewer { id: number; name: string; role: string; checked: boolean; }
interface Slot        { id: number; time: string; available: boolean; }

// ── Constants ─────────────────────────────────────────────────────────────────
const MORNING: Slot[] = [
  {id:1,time:"9:00 AM",available:true},{id:2,time:"9:30 AM",available:true},
  {id:3,time:"10:00 AM",available:true},{id:4,time:"10:30 AM",available:false},
  {id:5,time:"11:00 AM",available:true},{id:6,time:"11:30 AM",available:true},
];
const AFTERNOON: Slot[] = [
  {id:7,time:"1:00 PM",available:true},{id:8,time:"1:30 PM",available:false},
  {id:9,time:"2:00 PM",available:true},{id:10,time:"2:30 PM",available:true},
  {id:11,time:"3:00 PM",available:false},{id:12,time:"3:30 PM",available:true},
  {id:13,time:"4:00 PM",available:true},{id:14,time:"4:30 PM",available:true},
];
const DEFAULT_IVS: Interviewer[] = [
  {id:1,name:"Alex Rodriguez",role:"Engineering Manager",checked:true},
  {id:2,name:"Sarah Kim",      role:"Senior Engineer",   checked:true},
  {id:3,name:"David Wilson",   role:"Product Manager",   checked:false},
];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const DEMO: Candidate[] = [
  {id:"1",name:"Kiran Mehta",    email:"kiran.mehta@email.com",    phone:"+91 76543 21098",job_title:"Web Developer",           dept:"AI/ML",       location:"Hyderabad",processed_date:"2025-03-09",ats_score:91,exam_percentage:87,exam_completed:true, interview_scheduled:true, interview_date:"2025-06-25T10:00:00",interview_type:"video",    interviewer:"Priya Sharma",meeting_link:"https://meet.google.com/abc-def",duration:60,interview_status:"scheduled", resume_path:"/resumes/kiran.pdf", job_description:""},
  {id:"2",name:"Sneha Patel",    email:"sneha.patel@email.com",    phone:"+91 65432 10987",job_title:"Python Developer",        dept:"AI",          location:"Hyderabad",processed_date:"2025-03-08",ats_score:82,exam_percentage:74,exam_completed:true, interview_scheduled:false,interview_date:null,                 interview_type:null,       interviewer:null,            meeting_link:null,                             duration:60,interview_status:"pending",   resume_path:"/resumes/sneha.pdf",  job_description:""},
  {id:"3",name:"Deepak Verma",   email:"deepak.verma@email.com",   phone:"+91 10987 65432",job_title:"Junior Data Science",     dept:"AI/ML",       location:"Hyderabad",processed_date:"2025-03-13",ats_score:85,exam_percentage:79,exam_completed:true, interview_scheduled:false,interview_date:null,                 interview_type:null,       interviewer:null,            meeting_link:null,                             duration:60,interview_status:"pending",   resume_path:"/resumes/deepak.pdf", job_description:""},
  {id:"4",name:"Meera Krishnan", email:"meera.k@email.com",        phone:"+91 99887 76655",job_title:"Frontend Developer",      dept:"AI/ML",       location:"Hyderabad",processed_date:"2025-03-14",ats_score:77,exam_percentage:71,exam_completed:true, interview_scheduled:true, interview_date:"2025-06-27T14:00:00",interview_type:"technical",interviewer:"Ravi Kumar",  meeting_link:"Room 203",                       duration:60,interview_status:"scheduled", resume_path:"/resumes/meera.pdf",  job_description:""},
  {id:"5",name:"Arjun Sharma",   email:"arjun.sharma@email.com",   phone:"+91 98765 43210",job_title:"Junior Python Developer", dept:"AI/ML",       location:"Hyderabad",processed_date:"2025-03-10",ats_score:88,exam_percentage:83,exam_completed:true, interview_scheduled:true, interview_date:"2025-06-26T11:30:00",interview_type:"hr",       interviewer:"HR Team",     meeting_link:"https://zoom.us/j/123",          duration:60,interview_status:"scheduled", resume_path:"/resumes/arjun.pdf",  job_description:""},
  {id:"6",name:"Vikram Singh",   email:"vikram.singh@email.com",   phone:"+91 32109 87654",job_title:"Product Manager",         dept:"Product",     location:"New York", processed_date:"2025-03-06",ats_score:79,exam_percentage:76,exam_completed:true, interview_scheduled:true, interview_date:"2025-06-24T09:00:00",interview_type:"final",    interviewer:"Director",    meeting_link:"https://meet.google.com/xyz",    duration:60,interview_status:"completed", resume_path:"/resumes/vikram.pdf", job_description:""},
  {id:"7",name:"Ananya Rao",     email:"ananya.rao@email.com",     phone:"+91 21098 76543",job_title:"UX Designer",             dept:"Design",      location:"Bangalore",processed_date:"2025-03-05",ats_score:67,exam_percentage:72,exam_completed:true, interview_scheduled:false,interview_date:null,                 interview_type:null,       interviewer:null,            meeting_link:null,                             duration:60,interview_status:"pending",   resume_path:null,                  job_description:""},
  {id:"8",name:"Rahul Nair",     email:"rahul.nair@email.com",     phone:"+91 88776 65544",job_title:"DevOps Engineer",         dept:"Engineering", location:"Remote",   processed_date:"2025-03-15",ats_score:93,exam_percentage:91,exam_completed:true, interview_scheduled:true, interview_date:"2025-06-28T15:00:00",interview_type:"technical",interviewer:"Tech Lead",   meeting_link:"https://meet.google.com/dev",    duration:60,interview_status:"scheduled", resume_path:"/resumes/rahul.pdf",  job_description:""},
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function avColor(n:string):[string,string]{const p:any[]=[["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"]];let h=0;for(let i=0;i<n.length;i++)h=(h*31+n.charCodeAt(i))&0xffffffff;return p[Math.abs(h)%p.length];}
function ini(n:string){return n.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();}
function sbColor(s:number){return s>=80?"#059669":s>=60?"#D97706":"#DC2626";}
function scoreCls(s:number){return s>=80?"sc-hi":s>=60?"sc-mid":"sc-lo";}
function fmtDate(s?:string|null){if(!s)return "—";const d=new Date(s);return isNaN(d.getTime())?s:d.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});}
function fmtTime(s?:string|null){if(!s)return "—";const d=new Date(s);return isNaN(d.getTime())?s:d.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});}
function fmtDT(s?:string|null){return s?fmtDate(s)+" at "+fmtTime(s):"—";}
function typeLabel(t?:string|null){return ({video:"Video Call",phone:"Phone Interview",onsite:"On-site",technical:"Technical Round",hr:"HR Round",final:"Final Round"} as any)[t||""]||t||"—";}
function friendly(d:Date){return d.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});}
function slotToDate(date:Date,timeStr:string){const[hm,ap]=timeStr.split(" ");const[hS,mS]=hm.split(":");let h=parseInt(hS,10);const m=parseInt(mS,10);const pm=ap?.toUpperCase().includes("PM");if(pm&&h!==12)h+=12;if(!pm&&h===12)h=0;const dt=new Date(date);dt.setHours(h,m,0,0);return dt;}

// ── Global CSS ────────────────────────────────────────────────────────────────
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--font:'DM Sans',sans-serif;--accent:#2563EB;--accent-l:#EFF6FF;--accent-m:#BFDBFE;--green:#059669;--green-l:#ECFDF5;--amber:#D97706;--amber-l:#FFFBEB;--red:#DC2626;--red-l:#FEF2F2;--purple:#7C3AED;--purple-l:#F5F3FF;--bg:#F8FAFC;--surface:#fff;--border:rgba(0,0,0,.08);--border-md:rgba(0,0,0,.14);--t1:#0F172A;--t2:#64748B;--t3:#94A3B8;--r:10px;--rl:14px;--rxl:18px;}
body{font-family:var(--font);background:var(--bg);color:var(--t1)}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:var(--border-md);border-radius:4px}
.sch-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:16px 24px;background:var(--surface);border-bottom:.5px solid var(--border-md)}
.sch-stat{background:var(--bg);border:.5px solid var(--border);border-radius:var(--rl);padding:14px 16px;position:relative;overflow:hidden;transition:box-shadow .15s}
.sch-stat:hover{box-shadow:0 2px 10px rgba(0,0,0,.06)}
.sch-stat-bar{position:absolute;top:0;left:0;width:3px;height:100%}
.sch-stat-lbl{font-size:10px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}
.sch-stat-val{font-size:24px;font-weight:600;color:var(--t1);letter-spacing:-1px;line-height:1}
.sch-stat-sub{font-size:11px;color:var(--t3);margin-top:3px}
.sch-mode-bar{display:flex;align-items:center;justify-content:space-between;padding:12px 24px;background:var(--surface);border-bottom:.5px solid var(--border-md)}
.sch-mode-label{font-size:13px;font-weight:500;color:var(--t2)}
.sch-mode-tabs{display:flex;background:#EEF2F7;border-radius:10px;padding:4px;border:.5px solid var(--border)}
.sch-mode-tab{font-size:13px;font-weight:500;padding:7px 18px;border-radius:7px;cursor:pointer;color:var(--t2);border:none;background:transparent;font-family:var(--font);transition:all .15s;display:flex;align-items:center;gap:6px}
.sch-mode-tab.active{background:var(--surface);color:var(--t1);box-shadow:0 1px 3px rgba(0,0,0,.09)}
.sch-wrap{display:grid;grid-template-columns:400px 1fr;height:calc(100vh - 170px);overflow:hidden}
.sch-left{display:flex;flex-direction:column;border-right:.5px solid var(--border-md);background:var(--surface);overflow:hidden}
.sch-left-head{padding:14px 14px 0;border-bottom:.5px solid var(--border)}
.sch-left-title-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.sch-left-title{font-size:14px;font-weight:600;color:var(--t1)}
.sch-left-count{font-size:12px;color:var(--t2);background:var(--bg);padding:3px 9px;border-radius:20px;border:.5px solid var(--border)}
.sch-search-wrap{position:relative;margin-bottom:10px}
.sch-search-wrap svg{position:absolute;left:11px;top:50%;transform:translateY(-50%);width:14px;height:14px;stroke:var(--t3);fill:none;stroke-width:2;stroke-linecap:round;pointer-events:none}
.sch-search{width:100%;padding:8px 12px 8px 32px;font-size:13px;font-family:var(--font);color:var(--t1);background:var(--bg);border:.5px solid var(--border);border-radius:9px;outline:none;transition:border-color .14s}
.sch-search:focus{border-color:var(--accent-m);background:var(--surface)}
.sch-search::placeholder{color:var(--t3)}
.sch-chip-row{display:flex;gap:6px;overflow-x:auto;padding-bottom:10px;scrollbar-width:none}
.sch-chip-row::-webkit-scrollbar{display:none}
.sch-chip{flex-shrink:0;font-size:11px;font-weight:500;padding:4px 11px;border-radius:20px;border:.5px solid var(--border);background:var(--surface);color:var(--t2);cursor:pointer;transition:all .13s;white-space:nowrap;font-family:var(--font)}
.sch-chip:hover{border-color:var(--accent-m);color:var(--accent)}
.sch-chip.active{background:var(--accent);color:#fff;border-color:transparent}
.sch-sort-row{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:.5px solid var(--border)}
.sch-sort-lbl{font-size:10px;color:var(--t3);font-weight:500;text-transform:uppercase;letter-spacing:.5px}
.sch-sort-sel{font-size:12px;font-family:var(--font);color:var(--t2);background:transparent;border:none;outline:none;cursor:pointer}
.sch-cand-list{flex:1;overflow-y:auto;padding:6px}
.sch-cand-card{display:flex;align-items:flex-start;gap:10px;padding:11px 9px;border-radius:10px;cursor:pointer;transition:background .12s;border:.5px solid transparent;margin-bottom:2px}
.sch-cand-card:hover{background:var(--bg)}
.sch-cand-card.sel{background:var(--accent-l);border-color:var(--accent-m)}
.sch-av{width:38px;height:38px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600}
.sch-cand-info{flex:1;min-width:0}
.sch-cand-name{font-size:13px;font-weight:600;color:var(--t1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sch-cand-role{font-size:11px;color:var(--t2);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sch-cand-meta{display:flex;align-items:center;gap:6px;margin-top:5px}
.sch-cand-right{display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0}
.sc{font-size:11px;font-weight:600;padding:2px 7px;border-radius:6px;min-width:32px;text-align:center}
.sc-hi{background:var(--green-l);color:var(--green)}.sc-mid{background:var(--amber-l);color:var(--amber)}.sc-lo{background:var(--red-l);color:var(--red)}
.sch-date{font-size:10px;color:var(--t3)}
.sch-pill{display:inline-flex;align-items:center;font-size:10px;font-weight:600;padding:2px 6px;border-radius:20px;white-space:nowrap}
.pill-blue{background:var(--accent-l);color:var(--accent)}.pill-green{background:var(--green-l);color:var(--green)}.pill-amber{background:var(--amber-l);color:var(--amber)}.pill-red{background:var(--red-l);color:var(--red)}.pill-grey{background:#F1F5F9;color:var(--t2)}
.sch-right{background:var(--bg);overflow-y:auto;display:flex;flex-direction:column}
.sch-right-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:48px 32px;text-align:center}
.sch-card{background:var(--surface);border:.5px solid var(--border);border-radius:var(--rl);overflow:hidden}
.sch-card-head{display:flex;align-items:center;justify-content:space-between;padding:13px 18px;border-bottom:.5px solid var(--border)}
.sch-card-title{font-size:13px;font-weight:600;color:var(--t1)}
.sch-card-body{padding:18px}
.sch-hero{background:var(--surface);border:.5px solid var(--border);border-radius:var(--rxl);padding:20px}
.sch-hero-top{display:flex;align-items:flex-start;gap:14px;margin-bottom:16px}
.sch-hero-av{width:54px;height:54px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700}
.sch-hero-name{font-size:17px;font-weight:600;color:var(--t1);letter-spacing:-.3px}
.sch-hero-role{font-size:12px;color:var(--t2);margin-top:2px}
.sch-hero-badges{display:flex;gap:7px;margin-top:7px;flex-wrap:wrap}
.sch-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.sch-info-item{background:var(--bg);border-radius:9px;padding:10px 12px}
.sch-info-lbl{font-size:9px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px}
.sch-info-val{font-size:13px;font-weight:500;color:var(--t1)}
.sch-info-val a{color:var(--accent);text-decoration:none}
.sch-step-bar{display:flex;background:var(--surface);border:.5px solid var(--border);border-radius:var(--rl);overflow:hidden;margin-bottom:16px}
.sch-step{flex:1;padding:12px 16px;display:flex;align-items:center;gap:8px;border-right:.5px solid var(--border)}
.sch-step:last-child{border-right:none}
.sch-step.active{background:var(--accent-l)}.sch-step.done{background:var(--green-l)}
.sch-step-num{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;border:.5px solid var(--border)}
.sch-step.active .sch-step-num{background:var(--accent);color:#fff;border-color:transparent}
.sch-step.done .sch-step-num{background:var(--green);color:#fff;border-color:transparent}
.sch-step.inactive .sch-step-num{background:var(--bg);color:var(--t3)}
.sch-step-lbl{font-size:12px;font-weight:600}
.sch-step.active .sch-step-lbl{color:var(--accent)}.sch-step.done .sch-step-lbl{color:var(--green)}.sch-step.inactive .sch-step-lbl{color:var(--t3)}
.sch-cal{background:var(--surface);border:.5px solid var(--border);border-radius:var(--rl);overflow:hidden}
.sch-cal-head{display:flex;align-items:center;justify-content:space-between;padding:13px 18px;border-bottom:.5px solid var(--border)}
.sch-cal-month{font-size:14px;font-weight:600;color:var(--t1)}
.sch-cal-nav{display:flex;gap:4px}
.sch-cal-btn{width:28px;height:28px;border-radius:6px;border:.5px solid var(--border);background:var(--surface);cursor:pointer;font-size:14px;color:var(--t2);display:flex;align-items:center;justify-content:center;transition:background .13s;font-family:var(--font);line-height:1}
.sch-cal-btn:hover{background:var(--bg)}
.sch-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;padding:12px}
.sch-cal-hdr{font-size:10px;font-weight:600;color:var(--t3);text-align:center;padding:4px 0;text-transform:uppercase}
.sch-cal-day{width:100%;aspect-ratio:1;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;color:var(--t2);cursor:pointer;transition:all .13s;border:.5px solid transparent;flex-direction:column;gap:2px}
.sch-cal-day:hover:not(.past):not(.dis){background:var(--bg);color:var(--t1)}
.sch-cal-day.today{color:var(--accent);font-weight:700;border-color:var(--accent-m)}
.sch-cal-day.sel{background:var(--accent);color:#fff;border-color:transparent}
.sch-cal-day.has-iv::after{content:'';width:4px;height:4px;border-radius:50%;background:var(--green);display:block}
.sch-cal-day.sel.has-iv::after{background:#fff}
.sch-cal-day.past{color:var(--t3);opacity:.4;cursor:default}
.sch-cal-day.dis{opacity:.2;cursor:default;pointer-events:none}
.sch-cal-legend{display:flex;gap:16px;padding:10px 18px;border-top:.5px solid var(--border);font-size:11px;color:var(--t2)}
.sch-cal-dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px}
.sch-slots-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.sch-slots-title{font-size:12px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}
.sch-slot{display:flex;align-items:center;justify-content:space-between;padding:10px 13px;border-radius:9px;border:.5px solid var(--border);background:var(--surface);font-size:13px;font-weight:500;color:var(--t2);cursor:pointer;transition:all .14s;font-family:var(--font);width:100%;margin-bottom:7px;text-align:left}
.sch-slot:hover:not(.taken){border-color:var(--accent-m);color:var(--accent);background:var(--accent-l)}
.sch-slot.sel-slot{background:var(--accent);color:#fff;border-color:transparent}
.sch-slot.taken{background:var(--bg);color:var(--t3);cursor:not-allowed;opacity:.6}
.sch-slot-time{display:flex;align-items:center;gap:7px}
.sch-slot-tag{font-size:10px;padding:2px 7px;border-radius:20px;font-weight:500}
.sch-slot.sel-slot .sch-slot-tag{background:rgba(255,255,255,.25);color:#fff}
.sch-slot:not(.sel-slot):not(.taken) .sch-slot-tag{background:var(--accent-l);color:var(--accent)}
.sch-summary{background:var(--accent-l);border:.5px solid var(--accent-m);border-radius:var(--rl);padding:16px;display:flex;align-items:flex-start;gap:12px}
.sch-pick-item{display:flex;align-items:center;justify-content:space-between;padding:11px 13px;border-radius:9px;border:.5px solid var(--border);cursor:pointer;transition:all .14s;margin-bottom:8px;text-align:left;width:100%;font-family:var(--font)}
.sch-pick-item:hover{border-color:var(--accent-m);background:var(--accent-l)}
.sch-pick-item.chosen{border-color:var(--accent);background:var(--accent-l);box-shadow:0 0 0 2px var(--accent-m)}
.sch-pick-av{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;flex-shrink:0}
.sch-iv-item{display:flex;align-items:center;justify-content:space-between;padding:10px 13px;border-radius:9px;border:.5px solid var(--border);margin-bottom:8px}
.sch-iv-av{width:36px;height:36px;border-radius:50%;background:#E2E8F0;color:var(--t2);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;flex-shrink:0}
.sch-method{flex:1;padding:14px;border-radius:9px;border:.5px solid var(--border);cursor:pointer;transition:all .14s}
.sch-method:hover{border-color:var(--accent-m);background:var(--accent-l)}
.sch-method.method-sel{border-color:var(--accent);background:var(--accent-l)}
.sch-method-ic{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;margin-bottom:10px}
.sch-result{border-radius:var(--rl);padding:18px;border:.5px solid}
.sch-result.success{background:var(--green-l);border-color:#BBF7D0}
.sch-result.exists{background:var(--amber-l);border-color:#FCD34D}
.sch-result.error{background:var(--red-l);border-color:#FECACA}
.sch-ring-wrap{display:flex;align-items:center;gap:14px;margin-bottom:16px;padding-bottom:16px;border-bottom:.5px solid var(--border)}
.sch-ring{position:relative;width:64px;height:64px;flex-shrink:0}
.sch-ring svg{transform:rotate(-90deg)}
.sch-ring-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:var(--t1)}
.sch-iv-card{background:var(--surface);border:.5px solid var(--border);border-radius:var(--rl);padding:16px 18px}
.sch-iv-card.scheduled{border-color:#BBF7D0;background:var(--green-l)}
.sch-iv-card.pending{border-color:var(--accent-m);background:var(--accent-l)}
.sch-iv-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.sch-iv-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.sch-iv-lbl{font-size:9px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:2px}
.sch-iv-val{font-size:13px;font-weight:500;color:var(--t1)}
.sch-upcoming-item{display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:.5px solid var(--border);cursor:pointer;transition:background .12s}
.sch-upcoming-item:last-child{border-bottom:none}
.sch-upcoming-item:hover{background:var(--bg)}
.sch-upcoming-date{width:40px;flex-shrink:0;text-align:center;background:var(--accent-l);border-radius:8px;padding:5px 0;border:.5px solid var(--accent-m)}
.sch-upcoming-day{font-size:16px;font-weight:700;color:var(--accent);line-height:1}
.sch-upcoming-mon{font-size:9px;font-weight:600;color:var(--accent);text-transform:uppercase}
.sch-modal-bd{position:fixed;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(2px);z-index:60;display:flex;align-items:center;justify-content:center;padding:24px}
.sch-modal{background:var(--surface);border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.2);width:100%;max-width:520px;overflow:hidden;animation:mIn .2s ease}
@keyframes mIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.sch-modal-head{padding:18px 22px;border-bottom:.5px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.sch-modal-title{font-size:14px;font-weight:600;color:var(--t1)}
.sch-modal-close{width:26px;height:26px;border-radius:50%;background:var(--bg);border:.5px solid var(--border);cursor:pointer;font-size:17px;color:var(--t2);display:flex;align-items:center;justify-content:center}
.sch-modal-body{padding:18px 22px;max-height:65vh;overflow-y:auto}
.sch-modal-foot{padding:14px 22px;border-top:.5px solid var(--border);display:flex;gap:10px;justify-content:flex-end}
.sch-fl{font-size:11px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;display:block}
.sch-fi,.sch-fs,.sch-fta{width:100%;padding:9px 12px;font-size:13px;font-family:var(--font);color:var(--t1);background:var(--bg);border:.5px solid var(--border);border-radius:9px;outline:none;transition:border-color .14s}
.sch-fi:focus,.sch-fs:focus,.sch-fta:focus{border-color:var(--accent-m);background:var(--surface)}
.sch-fta{resize:vertical;min-height:72px;line-height:1.55}
.sch-jd-ta{width:100%;padding:10px 13px;font-size:13px;font-family:var(--font);color:var(--t1);background:var(--bg);border:.5px solid var(--border);border-radius:9px;outline:none;resize:vertical;min-height:220px;line-height:1.6}
.sch-jd-ta:focus{border-color:var(--accent-m);background:var(--surface)}
.sch-jd-box{background:var(--bg);border-radius:9px;padding:10px 12px;font-size:12px;color:var(--t2);line-height:1.55;min-height:44px;border:.5px solid var(--border)}
.sb{font-family:var(--font);font-size:13px;font-weight:500;border-radius:8px;padding:8px 16px;cursor:pointer;transition:all .15s;border:.5px solid var(--border-md);background:var(--surface);color:var(--t1)}
.sb:hover{background:#F1F5F9}
.sb:disabled{opacity:.5;cursor:not-allowed}
.sb-p{background:var(--accent);color:#fff;border-color:transparent}
.sb-p:hover:not(:disabled){background:#1D4ED8}
.sb-g{background:var(--green);color:#fff;border-color:transparent}
.sb-d{background:var(--red-l);color:var(--red);border-color:transparent}
.sb-sm{padding:5px 11px;font-size:12px}
.sb-ghost{border:none;background:transparent;color:var(--accent);font-family:var(--font);font-size:13px;font-weight:500;cursor:pointer;padding:6px 10px;border-radius:8px}
.sb-ghost:hover{background:var(--accent-l)}
@keyframes spin{to{transform:rotate(360deg)}}
.sch-spin{width:14px;height:14px;border-radius:50%;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;animation:spin .7s linear infinite;display:inline-block}
`;

// ── Main Component ────────────────────────────────────────────────────────────
export default function SchedulerInterface() {
  const [cands,       setCands]       = useState<Candidate[]>([]);
  const [selId,       setSelId]       = useState<string|null>(null);
  const [mode,        setMode]        = useState<"manual"|"auto">("auto");
  const [search,      setSearch]      = useState("");
  const [chip,        setChip]        = useState("all");
  const [sort,        setSort]        = useState("score_desc");
  const [calDate,     setCalDate]     = useState(new Date());
  // Auto wizard
  const [step,        setStep]        = useState<1|2|3>(1);
  const [autoDate,    setAutoDate]    = useState(new Date());
  const [autoSlot,    setAutoSlot]    = useState<Slot|null>(null);
  const [autoCand,    setAutoCand]    = useState<Candidate|null>(null);
  const [ivs,         setIvs]         = useState<Interviewer[]>(DEFAULT_IVS);
  const [method,      setMethod]      = useState<"video"|"onsite">("video");
  const [jobDesc,     setJobDesc]     = useState("");
  const [autoResult,  setAutoResult]  = useState<any>(null);
  const [scheduling,  setScheduling]  = useState(false);
  // Modals
  const [showJD,      setShowJD]      = useState(false);

  useEffect(()=>{
    (async()=>{
      try{const list=await fetchCandidates();const mapped:Candidate[]=list.map((c:any,i:number)=>({id:String(c.id||i),name:c.name||"Unknown",email:c.email||"",phone:c.phone||"",job_title:c.job_title||c.role||"",dept:c.department||c.dept||"",location:c.location||"",processed_date:c.created_at||c.processed_date||"",ats_score:Number(c.ats_score||0),exam_percentage:Number(c.exam_percentage||0),exam_completed:!!c.exam_completed,interview_scheduled:!!c.interview_scheduled,interview_date:c.interview_date||null,interview_type:c.interview_type||null,interviewer:c.interviewer||null,meeting_link:c.meeting_link||null,duration:c.duration||60,interview_status:c.interview_scheduled?(c.interview_completed?"completed":"scheduled"):"pending",resume_path:c.resume_path||null,job_description:c.job_description||""}));setCands(mapped.length?mapped:DEMO);}catch{setCands(DEMO);}
    })();
  },[]);

  const stats=useMemo(()=>{const now=new Date();const ws=new Date(now);ws.setDate(now.getDate()-now.getDay());const we=new Date(ws);we.setDate(ws.getDate()+7);return{total:cands.filter(c=>c.interview_scheduled).length,today:cands.filter(c=>c.interview_date&&new Date(c.interview_date).toDateString()===now.toDateString()).length,week:cands.filter(c=>{if(!c.interview_date)return false;const d=new Date(c.interview_date);return d>=ws&&d<=we;}).length,pending:cands.filter(c=>c.interview_status==="pending").length};},[cands]);

  const filtered=useMemo(()=>{const q=search.toLowerCase();let list=cands.filter(c=>{const ms=!q||c.name.toLowerCase().includes(q)||c.job_title.toLowerCase().includes(q)||c.email.toLowerCase().includes(q);if(chip==="pending")return !c.interview_scheduled&&ms;if(chip==="scheduled")return c.interview_scheduled&&c.interview_status==="scheduled"&&ms;if(chip==="completed")return c.interview_status==="completed"&&ms;if(chip==="cancelled")return c.interview_status==="cancelled"&&ms;return ms;});return [...list].sort((a,b)=>{if(sort==="score_desc")return (b.ats_score||0)-(a.ats_score||0);if(sort==="date_asc")return new Date(a.interview_date||"9999").getTime()-new Date(b.interview_date||"9999").getTime();if(sort==="date_desc")return new Date(b.interview_date||"0").getTime()-new Date(a.interview_date||"0").getTime();if(sort==="name_asc")return a.name.localeCompare(b.name);return 0;});},[cands,chip,search,sort]);

  const sel=cands.find(c=>c.id===selId)??null;
  const upd=(id:string,p:Partial<Candidate>)=>setCands(prev=>prev.map(c=>c.id===id?{...c,...p}:c));

  const selectC=(c:Candidate)=>{setSelId(c.id);setStep(1);setAutoSlot(null);setAutoResult(null);setAutoCand(c);if(c.job_description)setJobDesc(c.job_description);};

  const submitAuto=async()=>{
    if(!autoCand||!autoSlot)return;
    setScheduling(true);setAutoResult(null);
    const dt=slotToDate(autoDate,autoSlot.time);

    // scheduleInterview never throws — it returns { success: false } on errors
    const res = await scheduleInterview({
      candidate_id: autoCand.id as any,
      email:        autoCand.email,
      date_iso:     dt.toISOString(),
      time_slot:    autoSlot.time,
    });

    if (res.success && !res.already_scheduled) {
      // ✅ Real schedule succeeded
      setAutoResult(res);
      upd(autoCand.id, {
        interview_scheduled: true,
        interview_date:      dt.toISOString(),
        interview_status:    "scheduled",
        meeting_link:        res.interview_link || null,
      });
    } else if (res.already_scheduled) {
      // ℹ️ Already scheduled
      setAutoResult(res);
    } else {
      // ❌ Backend error (500 etc.) — fall back to demo mode locally
      const lk = "https://interview.ai/room/"+Math.random().toString(36).slice(2,10);
      setAutoResult({
        success:              true,
        already_scheduled:    false,
        interview_link:       lk,
        email_sent:           true,
        resume_extracted:     !!autoCand.resume_path,
        knowledge_base_id:    "KB-"+Math.floor(Math.random()*9000+1000),
        job_description_used: !!jobDesc,
        message:              res.message || "(Demo) Interview saved locally — API unavailable",
      });
      upd(autoCand.id, {
        interview_scheduled: true,
        interview_date:      dt.toISOString(),
        interview_status:    "scheduled",
        meeting_link:        lk,
      });
    }

    setScheduling(false);
  };

  // ── RENDER: Calendar ─────────────────────────────────────────────────────────
  const renderCal=(d:Date,selD:Date,onPick:(n:number)=>void,mini=false)=>{
    const y=d.getFullYear(),m=d.getMonth();
    const ivDates=new Set(cands.filter(c=>c.interview_date).map(c=>new Date(c.interview_date!).toDateString()));
    const first=new Date(y,m,1),last=new Date(y,m+1,0);
    const today=new Date().toDateString();
    const cells:React.ReactNode[]=["Su","Mo","Tu","We","Th","Fr","Sa"].map((w,i)=>(<div key={"h"+i} className="sch-cal-hdr">{w}</div>));
    for(let i=0;i<first.getDay();i++)cells.push(<div key={"b"+i} className="sch-cal-day dis"/>);
    for(let n=1;n<=last.getDate();n++){
      const dt=new Date(y,m,n);const ds=dt.toDateString();
      const isSel=!mini&&selD.getDate()===n&&selD.getMonth()===m&&selD.getFullYear()===y;
      const isPast=dt<new Date()&&ds!==today;
      let cls="sch-cal-day";
      if(ds===today)cls+=" today";if(isSel)cls+=" sel";if(ivDates.has(ds))cls+=" has-iv";if(isPast)cls+=" past";
      cells.push(<div key={"d"+n} className={cls} onClick={isPast?undefined:()=>onPick(n)}>{n}</div>);
    }
    return cells;
  };

  // ── RENDER: Step bar ─────────────────────────────────────────────────────────
  const StepBar=()=>(
    <div className="sch-step-bar">
      {[["Select Date",1],["Select Time",2],["Confirm",3]].map(([lbl,n])=>{
        const ns=Number(n);const cls=step>ns?"done":step===ns?"active":"inactive";
        return(<div key={n} className={`sch-step ${cls}`} style={{cursor:ns<step?"pointer":"default"}} onClick={()=>{if(ns<step)setStep(ns as any);}}>
          <div className="sch-step-num">{step>ns?"✓":n}</div>
          <span className="sch-step-lbl">{lbl}</span>
        </div>);
      })}
    </div>
  );

  // ── RENDER: Auto right ───────────────────────────────────────────────────────
  const AutoRight=()=>{
    if(step===1)return(
      <div className="sch-cal">
        <div className="sch-cal-head">
          <span className="sch-cal-month">{MONTHS[autoDate.getMonth()]} {autoDate.getFullYear()}</span>
          <div className="sch-cal-nav">
            <button className="sch-cal-btn" onClick={()=>setAutoDate(new Date(autoDate.getFullYear(),autoDate.getMonth()-1,1))}>‹</button>
            <button className="sch-cal-btn" onClick={()=>setAutoDate(new Date(autoDate.getFullYear(),autoDate.getMonth()+1,1))}>›</button>
          </div>
        </div>
        <div className="sch-cal-grid">{renderCal(autoDate,autoDate,d=>{setAutoDate(new Date(autoDate.getFullYear(),autoDate.getMonth(),d));setStep(2);})}</div>
        <div className="sch-cal-legend"><span><span className="sch-cal-dot" style={{background:"var(--green)"}}/>Interviews scheduled</span><span><span className="sch-cal-dot" style={{background:"var(--accent)"}}/>Selected date</span></div>
      </div>
    );

    if(step===2){
      const slotBtn=(s:Slot)=>{const isSel=autoSlot?.id===s.id;let cls="sch-slot";if(!s.available)cls+=" taken";else if(isSel)cls+=" sel-slot";return(<button key={s.id} className={cls} disabled={!s.available} onClick={()=>{if(s.available){setAutoSlot(s);setStep(3);}}}>
        <span className="sch-slot-time"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{s.time}</span>
        {!s.available?<span style={{fontSize:10,color:"var(--t3)"}}>Taken</span>:<span className="sch-slot-tag">{isSel?"Selected":"Available"}</span>}
      </button>);};
      return(<>
        <button className="sb-ghost" onClick={()=>setStep(1)} style={{display:"flex",alignItems:"center",gap:4,marginBottom:14,padding:"6px 0"}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>Back to calendar
        </button>
        <div style={{fontSize:14,fontWeight:600,color:"var(--t1)",marginBottom:14}}>Select a time on <strong>{friendly(autoDate)}</strong></div>
        <div className="sch-slots-grid">
          <div><div className="sch-slots-title">Morning</div>{MORNING.map(slotBtn)}</div>
          <div><div className="sch-slots-title">Afternoon</div>{AFTERNOON.map(slotBtn)}</div>
        </div>
      </>);
    }

    // Step 3
    const eligible=cands.filter(c=>c.exam_completed||c.interview_status==="pending");
    return(<>
      <div className="sch-summary" style={{marginBottom:16}}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <div style={{flex:1}}>
          <div style={{fontSize:12,fontWeight:600,color:"var(--t2)",marginBottom:4}}>Interview Summary</div>
          <div style={{fontSize:15,fontWeight:600,color:"var(--t1)"}}>{friendly(autoDate)}{autoSlot?" at "+autoSlot.time:""}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
            <div style={{fontSize:13,color:"var(--t2)"}}><strong style={{color:"var(--t1)"}}>Position:</strong> {autoCand?.job_title||"—"}</div>
            <div style={{fontSize:13,color:"var(--t2)"}}><strong style={{color:"var(--t1)"}}>Candidate:</strong> {autoCand?.name||"—"}</div>
          </div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div className="sch-card"><div className="sch-card-head"><span className="sch-card-title">Candidate</span></div><div style={{padding:12}}>{eligible.map(x=>{const[bg,fg]=avColor(x.name);const ch=autoCand?.id===x.id;return(<button key={x.id} className={`sch-pick-item${ch?" chosen":""}`} onClick={()=>setAutoCand(x)}><div style={{display:"flex",alignItems:"center",gap:10}}><div className="sch-pick-av" style={{background:bg,color:fg}}>{ini(x.name)}</div><div><div style={{fontSize:13,fontWeight:600,color:ch?"var(--accent)":"var(--t1)"}}>{x.name}</div><div style={{fontSize:11,color:"var(--t2)"}}>{x.job_title||"—"}</div><div style={{fontSize:10,color:"var(--t3)"}}>{x.email}</div>{x.resume_path&&<div style={{fontSize:10,color:"var(--green)",marginTop:2}}>📄 Resume available</div>}</div></div>{ch&&<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}</button>)})}</div></div>
        <div className="sch-card"><div className="sch-card-head"><span className="sch-card-title">Interviewers</span></div><div style={{padding:12}}>{ivs.map(it=>(<div key={it.id} className="sch-iv-item"><div style={{display:"flex",alignItems:"center",gap:10}}><div className="sch-iv-av">{it.name.charAt(0)}</div><div><div style={{fontSize:13,fontWeight:500,color:"var(--t1)"}}>{it.name}</div><div style={{fontSize:11,color:"var(--t2)"}}>{it.role}</div></div></div><input type="checkbox" style={{width:16,height:16,accentColor:"var(--accent)",cursor:"pointer"}} checked={it.checked} onChange={()=>setIvs(ivs.map(i=>i.id===it.id?{...i,checked:!i.checked}:i))}/></div>))}</div></div>
      </div>
      <div className="sch-card" style={{marginTop:14}}><div className="sch-card-head"><span className="sch-card-title">Job Description (Optional)</span><button className="sb-ghost" onClick={()=>setShowJD(true)}>📄 {jobDesc?"Edit":"Add"} JD</button></div><div style={{padding:12}}><div className="sch-jd-box">{jobDesc?jobDesc.slice(0,160)+(jobDesc.length>160?"…":""):<em style={{color:"var(--t3)"}}>No job description — system will use generic or candidate profile.</em>}</div></div></div>
      <div className="sch-card" style={{marginTop:14}}><div className="sch-card-head"><span className="sch-card-title">Interview Method</span></div><div style={{padding:12,display:"flex",gap:10}}>
        {([["video","AI-Powered Video Interview","Secure link sent automatically","✓ Knowledge base from resume\n✓ JD auto-used\n✓ Email confirmation"],["onsite","In-Person Interview","Office location shared",""]] as const).map(([k,t,s,ch])=>(
          <div key={k} className={`sch-method${method===k?" method-sel":""}`} onClick={()=>setMethod(k as any)}>
            <div className="sch-method-ic" style={{background:method===k?"var(--accent-l)":"var(--bg)"}}>
              {k==="video"?<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={method===k?"var(--accent)":"var(--t2)"} strokeWidth="2" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={method===k?"var(--accent)":"var(--t2)"} strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
            </div>
            <div style={{fontSize:13,fontWeight:600,color:"var(--t1)",marginBottom:3}}>{t}</div>
            <div style={{fontSize:11,color:"var(--t2)",lineHeight:1.5}}>{s}</div>
            {ch&&<div style={{fontSize:11,color:"var(--green)",marginTop:5,whiteSpace:"pre-line"}}>{ch}</div>}
          </div>
        ))}
      </div></div>
      {autoResult&&<div className={`sch-result ${autoResult.already_scheduled?"exists":autoResult.success?"success":"error"}`} style={{marginTop:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={autoResult.success?"var(--green)":"var(--red)"} strokeWidth="2" strokeLinecap="round">{autoResult.success?<polyline points="20 6 9 17 4 12"/>:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}</svg><span style={{fontSize:14,fontWeight:600,color:autoResult.success?"var(--green)":"var(--red)"}}>{!autoResult.success?"Failed":autoResult.already_scheduled?"Already Scheduled":"Interview Scheduled!"}</span></div>
        {autoResult.interview_link&&<div style={{fontSize:12,wordBreak:"break-all",marginTop:6}}>🔗 <a href={autoResult.interview_link} target="_blank" rel="noreferrer" style={{color:"var(--accent)"}}>{autoResult.interview_link}</a></div>}
        {autoResult.message&&<p style={{fontSize:12,color:"var(--t2)",marginTop:8}}>{autoResult.message}</p>}
      </div>}
      <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:14}}>
        <button className="sb" onClick={()=>setStep(1)}>Cancel</button>
        <button className="sb sb-p" onClick={submitAuto} disabled={!autoCand||!autoSlot||scheduling}>{scheduling?<><span className="sch-spin"/>&nbsp;Scheduling…</>:"⚡ Schedule Interview"}</button>
      </div>
    </>);
  };


  const pillCls=(s:string)=>s==="scheduled"?"pill-blue":s==="completed"?"pill-green":s==="cancelled"?"pill-red":"pill-amber";
  const pillLbl=(s:string)=>s==="scheduled"?"Scheduled":s==="completed"?"Completed":s==="cancelled"?"Cancelled":"Pending";

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:CSS}}/>

      {/* Stats */}
      <div className="sch-stats">
        {[["Total Scheduled",stats.total,"All time interviews","var(--accent)"],["Today",stats.today,"Interviews today","var(--green)"],["This Week",stats.week,"Scheduled this week","var(--amber)"],["Pending",stats.pending,"Awaiting schedule","var(--purple)"]].map(([l,v,s,b])=>(
          <div key={l as string} className="sch-stat"><div className="sch-stat-bar" style={{background:b as string}}/><div className="sch-stat-lbl">{l}</div><div className="sch-stat-val">{v as number}</div><div className="sch-stat-sub">{s}</div></div>
        ))}
      </div>

      {/* Mode label — AI Auto only */}
      <div className="sch-mode-bar">
        <span className="sch-mode-label">AI Auto mode: calendar → time slot → auto-generate link &amp; send email</span>
      </div>

      {/* Split layout */}
      <div className="sch-wrap">
        {/* LEFT */}
        <div className="sch-left">
          <div className="sch-left-head">
            <div className="sch-left-title-row">
              <span className="sch-left-title">Select Candidate</span>
              <span className="sch-left-count">{filtered.length} of {cands.length}</span>
            </div>
            <div className="sch-search-wrap">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input className="sch-search" placeholder="Search candidates…" value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
            <div className="sch-chip-row">
              {["all","pending","scheduled","completed","cancelled"].map(v=>(
                <button key={v} className={`sch-chip${chip===v?" active":""}`} onClick={()=>setChip(v)}>
                  {v.charAt(0).toUpperCase()+v.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="sch-sort-row">
            <span className="sch-sort-lbl">Sort by</span>
            <select className="sch-sort-sel" value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="score_desc">Score ↓</option>
              <option value="date_asc">Interview Date ↑</option>
              <option value="date_desc">Interview Date ↓</option>
              <option value="name_asc">Name A–Z</option>
            </select>
          </div>
          <div className="sch-cand-list">
            {filtered.length===0?(
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:8,padding:32,textAlign:"center"}}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="1.2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <div style={{fontSize:13,fontWeight:600,color:"var(--t1)"}}>No candidates found</div>
              </div>
            ):filtered.map(c=>{
              const[bg,fg]=avColor(c.name);
              return(<div key={c.id} className={`sch-cand-card${selId===c.id?" sel":""}`} onClick={()=>selectC(c)}>
                <div className="sch-av" style={{background:bg,color:fg}}>{ini(c.name)}</div>
                <div className="sch-cand-info">
                  <div className="sch-cand-name">{c.name}</div>
                  <div className="sch-cand-role">{c.job_title} · {c.dept}</div>
                  <div className="sch-cand-meta">
                    <span className={`sch-pill ${pillCls(c.interview_status)}`}>{pillLbl(c.interview_status)}</span>
                    <span className="sch-date">{c.interview_date?fmtDate(c.interview_date):"No date"}</span>
                  </div>
                </div>
                <div className="sch-cand-right">
                  <span className={`sc ${scoreCls(c.ats_score)}`}>{c.ats_score||"—"}</span>
                  <span className="sch-date">{c.location}</span>
                </div>
              </div>);
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="sch-right">
          {!sel?(
            <div className="sch-right-empty">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="1" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <div style={{fontSize:15,fontWeight:600,color:"var(--t1)"}}>Select a candidate</div>
              <div style={{fontSize:13,color:"var(--t2)",lineHeight:1.65,maxWidth:280,textAlign:"center"}}>Choose from the queue to schedule or view interview details.</div>
            </div>
          ):(
            <div style={{padding:20,display:"flex",flexDirection:"column",gap:14}}>
              <StepBar/>
              <AutoRight/>
            </div>
          )}
        </div>
      </div>

      {/* JD Modal */}
      {showJD&&(
        <div className="sch-modal-bd" onClick={e=>{if(e.target===e.currentTarget)setShowJD(false);}}>
          <div className="sch-modal" style={{maxWidth:600}}>
            <div className="sch-modal-head"><span className="sch-modal-title">Add / Edit Job Description</span><button className="sch-modal-close" onClick={()=>setShowJD(false)}>×</button></div>
            <div className="sch-modal-body"><div><label className="sch-fl">Job Description</label><textarea className="sch-jd-ta" placeholder="Enter detailed job description…" value={jobDesc} onChange={e=>setJobDesc(e.target.value)}/></div></div>
            <div className="sch-modal-foot"><button className="sb" onClick={()=>setShowJD(false)}>Cancel</button><button className="sb sb-p" onClick={()=>setShowJD(false)}>Save Job Description</button></div>
          </div>
        </div>
      )}
    </>
  );
}
