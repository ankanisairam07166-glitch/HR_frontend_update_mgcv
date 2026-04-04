// // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // "use client";
// // // import React, { useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { signupAPI } from "@/services/redux/thunk/authThunk";
// // // import Input from "../input/Input";
// // // import Button from "../button/Button";
// // // import Link from "next/link";

// // // export default function SignupPage() {
// // //   const router = useRouter();
// // //   const [form, setForm] = useState({ first_name: "", last_name: "", email: "", password: "" });
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");

// // //   const handleSignup = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setLoading(true);
// // //     try {
// // //       await signupAPI(form.first_name, form.last_name, form.email, form.password);
// // //       router.push("/login");
// // //     } catch (err: any) {
// // //       setError(err.response?.data?.message || "Signup failed");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex items-center justify-center mt-40">
// // //       <form onSubmit={handleSignup} className="w-96  p-6 rounded-lg shadow-md">
// // //         <h1 className="text-2xl mb-4 font-semibold text-center">Create Account</h1>

// // //         <Input
// // //           type="text"
// // //           label="First Name"
// // //           placeholder="First Name"
// // //           className="w-full p-2 mb-3 rounded  text-black"
// // //           name="first_name"
// // //         />

// // //         <Input
// // //           type="text"
// // //           label="Last Name"
// // //           placeholder="Last Name"
// // //           className="w-full p-2 mb-3 rounded  text-black"
// // //           name="last_name"
// // //         />

// // //         <Input
// // //           type="email"
// // //           placeholder="Email"
// // //           className="w-full p-2 mb-3 rounded  text-black"
// // //           name="email"
// // //         />

// // //         <Input
// // //           type="password"
// // //           label="Password"
// // //           placeholder="Password"
// // //           className="w-full p-2 mb-3 rounded  text-black"
// // //           name="password"
// // //         />

// // //         <Button
// // //           type="submit"
// // //           disabled={loading}
// // //           className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
// // //           label="Sign Up"
// // //         />
         
// // //         <p className="text-sm mt-4 text-center">
// // //           Already have an account?{" "}
// // //           <Link href="/login"  className="text-blue-400 underline">
// // //             Login
// // //           </Link>
// // //         </p>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // "use client";
// // // import React, { useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { signupAPI } from "@/services/redux/thunk/authThunk";
// // // import Input from "../input/Input";
// // // import Button from "../button/Button";
// // // import Link from "next/link";

// // // export default function SignupPage() {
// // //   const router = useRouter();
// // //   const [form, setForm] = useState({
// // //     first_name: "",
// // //     last_name: "",
// // //     email: "",
// // //     password: "",
// // //   });
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");

// // //   const handleSignup = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setLoading(true);
// // //     try {
// // //       if (!form.email || !form.password || !form.first_name || !form.last_name) {
// // //         setError("All fields are required");
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       console.log("Signup Payload:", form);
// // //       await signupAPI(form.first_name, form.last_name, form.email, form.password);
// // //       router.push("/login");
// // //     } catch (err: any) {
// // //       setError(err.response?.data?.message || "Signup failed");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex items-center justify-center mt-40">
// // //       <form
// // //         onSubmit={handleSignup}
// // //         className="w-96 p-6 rounded-lg shadow-md bg-white"
// // //       >
// // //         <h1 className="text-2xl mb-4 font-semibold text-blue-600">Create Account</h1>

// // //         {error && (
// // //           <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
// // //         )}

// // //         <Input
// // //           type="text"
// // //           label="First Name"
// // //           name="first_name"
// // //           placeholder="First Name"
// // //           className="w-full p-2 mb-3 rounded text-black"
// // //           value={form.first_name}
// // //           onChange={(e) => setForm({ ...form, first_name: e.target.value })}
// // //         />

// // //         <Input
// // //           type="text"
// // //           label="Last Name"
// // //           name="last_name"
// // //           placeholder="Last Name"
// // //           className="w-full p-2 mb-3 rounded text-black"
// // //           value={form.last_name}
// // //           onChange={(e) => setForm({ ...form, last_name: e.target.value })}
// // //         />

// // //         <Input
// // //           type="email"
// // //           label="Email"
// // //           name="email"
// // //           placeholder="Email"
// // //           className="w-full p-2 mb-3 rounded text-black"
// // //           value={form.email}
// // //           onChange={(e) => setForm({ ...form, email: e.target.value })}
// // //         />

// // //         <Input
// // //           type="password"
// // //           label="Password"
// // //           name="password"
// // //           placeholder="Password"
// // //           className="w-full p-2 mb-3 rounded text-black"
// // //           value={form.password}
// // //           onChange={(e) => setForm({ ...form, password: e.target.value })}
// // //         />

// // //         <Button
// // //           type="submit"
// // //           disabled={loading}
// // //           className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
// // //           label={loading ? "Creating..." : "Sign Up"}
// // //         />

// // //         <p className="text-sm mt-4 text-center text-gray-600">
// // //           Already have an account?{" "}
// // //           <Link href="/login" className="text-blue-400 underline">
// // //             Login
// // //           </Link>
// // //         </p>
// // //       </form>
// // //     </div>
// // //   );
// // // }
// // // src/components/loginForm/SignUp.tsx
// // "use client";
// // import React, { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { signupAPI } from "@/services/redux/thunk/authThunk";
// // import Button from "../button/Button";

// // type SignUpProps = {
// //   onClose?: () => void;          // when used inside modal
// //   switchToLogin?: () => void;    // show Login view inside modal (if you prefer switching)
// //   redirectTo?: string;           // default: "/dashboard"
// //   autoLogin?: boolean;           // default: true (use backend token)
// // };

// // export default function SignUp({
// //   onClose,
// //   switchToLogin,
// //   redirectTo = "/dashboard",
// //   autoLogin = true,
// // }: SignUpProps) {
// //   const router = useRouter();
// //   const [form, setForm] = useState({
// //     first_name: "",
// //     last_name: "",
// //     email: "",
// //     password: "",
// //   });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleSignup = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");

// //     const { first_name, last_name, email, password } = form;
// //     if (!first_name || !last_name || !email || !password) {
// //       setError("All fields are required");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const data = await signupAPI(first_name, last_name, email, password); // { token, user }

// //       if (autoLogin && data?.token) {
// //         localStorage.setItem("authToken", data.token);
// //         localStorage.setItem("authUser", JSON.stringify(data.user));
// //         window.dispatchEvent(new Event("auth-changed"));
// //         onClose?.(); // close modal if present
// //         router.push(redirectTo);
// //       } else {
// //         // fallback: switch to login view if provided
// //         switchToLogin?.();
// //       }
// //     } catch (err: any) {
// //       setError(err?.response?.data?.message || "Signup failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
// //       <form
// //         onSubmit={handleSignup}
// //         className="w-full max-w-md p-6 rounded-lg shadow-md bg-white"
// //       >
// //         <h1 className="text-2xl mb-4 font-semibold text-blue-600">Create Account</h1>
// //         {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

// //         {/* First Name */}
// //         <div className="mb-3">
// //           <label className="block text-sm font-medium mb-1 text-gray-600">First Name</label>
// //           <input
// //             type="text"
// //             name="first_name"
// //             placeholder="First Name"
// //             value={form.first_name}
// //             onChange={(e) => setForm({ ...form, first_name: e.target.value })}
// //             className="w-full p-2 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
// //             autoComplete="given-name"
// //           />
// //         </div>

// //         {/* Last Name */}
// //         <div className="mb-3">
// //           <label className="block text-sm font-medium mb-1 text-gray-600">Last Name</label>
// //           <input
// //             type="text"
// //             name="last_name"
// //             placeholder="Last Name"
// //             value={form.last_name}
// //             onChange={(e) => setForm({ ...form, last_name: e.target.value })}
// //             className="w-full p-2 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
// //             autoComplete="family-name"
// //           />
// //         </div>

// //         {/* Email */}
// //         <div className="mb-3">
// //           <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email"
// //             value={form.email}
// //             onChange={(e) => setForm({ ...form, email: e.target.value })}
// //             className="w-full p-2 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
// //             autoComplete="email"
// //           />
// //         </div>

// //         {/* Password with show/hide */}
// //         <div className="mb-3">
// //           <label className="block text-sm font-medium mb-1 text-gray-600">Password</label>
// //           <div className="relative">
// //             <input
// //               type={showPassword ? "text" : "password"}
// //               name="password"
// //               placeholder="Password"
// //               value={form.password}
// //               onChange={(e) => setForm({ ...form, password: e.target.value })}
// //               className="w-full p-2 pr-10 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
// //               autoComplete="new-password"
// //             />
// //             <button
// //               type="button"
// //               aria-label={showPassword ? "Hide password" : "Show password"}
// //               onClick={() => setShowPassword((s) => !s)}
// //               className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
// //             >
// //               {showPassword ? (
// //                 // eye-off
// //                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                   <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-10.94-8  .58-1.77 1.54-3.34 2.78-4.62"/>
// //                   <path d="M1 1l22 22"/>
// //                   <path d="M10.58 10.58a2 2 0 0 0 2.84 2.84"/>
// //                   <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 10.94 8a11.8 11.8 0 0 1-2.31 3.64"/>
// //                 </svg>
// //               ) : (
// //                 // eye
// //                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                   <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
// //                   <circle cx="12" cy="12" r="3" />
// //                 </svg>
// //               )}
// //             </button>
// //           </div>
// //           <p className="text-xs text-gray-500 mt-1">Use at least 8 characters.</p>
// //         </div>

// //         <Button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
// //           label={loading ? "Creating..." : "Sign Up"}
// //         />
// //       </form>
// //     </div>
// //   );
// // }

// // src/components/loginForm/SignUp.tsx
// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signupAPI } from "@/services/redux/thunk/authThunk";
// import Button from "../button/Button";

// type SignUpProps = {
//   onClose?: () => void;          // when used inside modal
//   switchToLogin?: () => void;    // show Login view inside modal (if you prefer switching)
//   redirectTo?: string;           // default: "/dashboard"
//   autoLogin?: boolean;           // default: true (use backend token)
// };

// export default function SignUp({
//   onClose,
//   switchToLogin,
//   redirectTo = "/dashboard",
//   autoLogin = true,
// }: SignUpProps) {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const { first_name, last_name, email, password } = form;
//     if (!first_name || !last_name || !email || !password) {
//       setError("All fields are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = await signupAPI(first_name, last_name, email, password); // { token, user }

//       if (autoLogin && data?.token) {
//         localStorage.setItem("authToken", data.token);
//         localStorage.setItem("authUser", JSON.stringify(data.user));
//         window.dispatchEvent(new Event("auth-changed"));
//         onClose?.(); // close modal if present
//         router.push(redirectTo);
//       } else {
//         // fallback: switch to login view if provided
//         switchToLogin?.();
//       }
//     } catch (err: unknown) {
//       // Type-safe error handling
//       const error = err as { response?: { data?: { message?: string } } };
//       setError(error?.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
//       <form
//         onSubmit={handleSignup}
//         className="w-full max-w-md p-6 rounded-lg shadow-md bg-white"
//       >
//         <h1 className="text-2xl mb-4 font-semibold text-blue-600">Create Account</h1>
//         {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

//         {/* First Name */}
//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1 text-gray-600">First Name</label>
//           <input
//             type="text"
//             name="first_name"
//             placeholder="First Name"
//             value={form.first_name}
//             onChange={(e) => setForm({ ...form, first_name: e.target.value })}
//             className="w-full p-2 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
//             autoComplete="given-name"
//           />
//         </div>

//         {/* Last Name */}
//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1 text-gray-600">Last Name</label>
//           <input
//             type="text"
//             name="last_name"
//             placeholder="Last Name"
//             value={form.last_name}
//             onChange={(e) => setForm({ ...form, last_name: e.target.value })}
//             className="w-full p-2 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
//             autoComplete="family-name"
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="w-full p-2 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
//             autoComplete="email"
//           />
//         </div>

//         {/* Password with show/hide */}
//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1 text-gray-600">Password</label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className="w-full p-2 pr-10 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
//               autoComplete="new-password"
//             />
//             <button
//               type="button"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//               onClick={() => setShowPassword((s) => !s)}
//               className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
//             >
//               {showPassword ? (
//                 // eye-off
//                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-10.94-8  .58-1.77 1.54-3.34 2.78-4.62"/>
//                   <path d="M1 1l22 22"/>
//                   <path d="M10.58 10.58a2 2 0 0 0 2.84 2.84"/>
//                   <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 10.94 8a11.8 11.8 0 0 1-2.31 3.64"/>
//                 </svg>
//               ) : (
//                 // eye
//                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
//                   <circle cx="12" cy="12" r="3" />
//                 </svg>
//               )}
//             </button>
//           </div>
//           <p className="text-xs text-gray-500 mt-1">Use at least 8 characters.</p>
//         </div>

//         <Button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
//           label={loading ? "Creating..." : "Sign Up"}
//         />
//       </form>
//     </div>
//   );
// }
// src/components/loginForm/SignUp.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signupAPI } from "@/services/redux/thunk/authThunk";
import Link from "next/link";

type SignUpProps = {
  onClose?: () => void;
  switchToLogin?: () => void;
  redirectTo?: string;
  autoLogin?: boolean;
};

export default function SignUp({
  onClose,
  switchToLogin,
  redirectTo = "/dashboard",
  autoLogin = true,
}: SignUpProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Password strength helpers
  const getStrength = (val: string): number => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const strengthMeta: Record<number, { label: string; color: string }> = {
    0: { label: "", color: "#1e293b" },
    1: { label: "Weak", color: "#ef4444" },
    2: { label: "Fair", color: "#f97316" },
    3: { label: "Good", color: "#eab308" },
    4: { label: "Strong", color: "#22c55e" },
  };

  const strength = getStrength(form.password);
  const { label: strengthLabel, color: strengthColor } = strengthMeta[strength];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { first_name, last_name, email, password } = form;
    if (!first_name || !last_name || !email || !password) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const data = await signupAPI(first_name, last_name, email, password);
      if (autoLogin && data?.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("authUser", JSON.stringify(data.user));
        window.dispatchEvent(new Event("auth-changed"));
        onClose?.();
        router.push(redirectTo);
      } else {
        switchToLogin?.();
      }
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-[#0b1120] font-sans">
      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex w-[42%] flex-col justify-between px-10 py-10 bg-gradient-to-br from-[#0f1f3d] via-[#0b1120] to-[#071428] border-r border-[#1e3a5f]/40 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -left-16 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-10 w-56 h-56 rounded-full bg-indigo-500/10 blur-3xl" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 20 20">
              <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3a3 3 0 110 6 3 3 0 010-6zm0 9.5c-2.33 0-4.32-1.45-5.12-3.5h10.24c-.8 2.05-2.79 3.5-5.12 3.5z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-[15px] tracking-wide">
            HR<span className="text-blue-400">Auto</span>
          </span>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 flex flex-col gap-6">
          <div>
            <h1 className="text-white text-[28px] font-semibold leading-snug mb-3">
              Join thousands of{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                HR leaders
              </span>{" "}
              today
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">
              Set up your workspace in under 3 minutes. No credit card required.
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {[
              "Free 14-day trial, no card needed",
              "Onboard your team instantly",
              "ISO 27001 certified security",
              "Dedicated support team",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <div className="flex gap-3">
            {[
              { num: "14 days", lbl: "Free trial" },
              { num: "SOC2", lbl: "Certified" },
            ].map((s) => (
              <div
                key={s.lbl}
                className="flex-1 bg-slate-800/50 border border-[#1e3a5f]/60 rounded-xl p-3"
              >
                <p className="text-white text-lg font-semibold">{s.num}</p>
                <p className="text-slate-500 text-[10px] mt-0.5">{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-700 text-xs relative z-10">© 2026 HRAutomation Inc.</p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-14 py-10 bg-[#111827] relative">
        {/* Top-right nav */}
        <div className="absolute top-5 right-6 flex gap-2">
          {switchToLogin ? (
            <button
              type="button"
              onClick={switchToLogin}
              className="px-4 py-1.5 rounded-md border border-[#1e3a5f] text-slate-400 text-xs hover:text-slate-200 transition-colors"
            >
              Sign in
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-md border border-[#1e3a5f] text-slate-400 text-xs hover:text-slate-200 transition-colors"
            >
              Sign in
            </Link>
          )}
          <span className="px-4 py-1.5 rounded-md border border-blue-600 bg-slate-800 text-blue-400 text-xs font-medium">
            Sign up
          </span>
        </div>

        <div className="w-full max-w-sm mx-auto">
          {/* Header */}
          <p className="text-blue-400 text-[11px] font-medium uppercase tracking-widest mb-2">
            Get started free
          </p>
          <h2 className="text-white text-2xl font-semibold mb-1">Create your account</h2>
          <p className="text-slate-400 text-sm mb-8">
            Your first workspace is completely free for 14 days.
          </p>

          {error && (
            <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/25 px-4 py-2.5 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            {/* Name row */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                  First name
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Rahul"
                  value={form.first_name}
                  onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  autoComplete="given-name"
                  className="w-full bg-[#1e293b] border border-[#1e3a5f] rounded-[9px] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                  Last name
                </label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Sharma"
                  value={form.last_name}
                  onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  autoComplete="family-name"
                  className="w-full bg-[#1e293b] border border-[#1e3a5f] rounded-[9px] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                Work email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                className="w-full bg-[#1e293b] border border-[#1e3a5f] rounded-[9px] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  autoComplete="new-password"
                  className="w-full bg-[#1e293b] border border-[#1e3a5f] rounded-[9px] px-3.5 py-2.5 pr-11 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-10.94-8 .58-1.77 1.54-3.34 2.78-4.62" />
                      <path d="M1 1l22 22" />
                      <path d="M10.58 10.58a2 2 0 0 0 2.84 2.84" />
                      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 10.94 8a11.8 11.8 0 0 1-2.31 3.64" />
                    </svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Strength bar */}
              {form.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-[3px] flex-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: i <= strength ? strengthColor : "#1e293b",
                        }}
                      />
                    ))}
                  </div>
                  {strengthLabel && (
                    <p className="text-[11px] mt-1" style={{ color: strengthColor }}>
                      {strengthLabel}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-[9px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 mt-1"
            >
              {loading ? "Creating account…" : "Create account — it's free →"}
            </button>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#1e293b]">
            <span className="text-sm text-slate-500">Already have an account?</span>
            {switchToLogin ? (
              <button
                type="button"
                onClick={switchToLogin}
                className="text-sm text-blue-400 font-medium hover:text-blue-300 transition-colors"
              >
                Sign in instead
              </button>
            ) : (
              <Link
                href="/login"
                className="text-sm text-blue-400 font-medium hover:text-blue-300 transition-colors"
              >
                Sign in instead
              </Link>
            )}
          </div>

          <p className="text-center text-[11px] text-slate-600 mt-4 leading-relaxed">
            By signing up, you agree to our{" "}
            <span className="text-blue-500 cursor-pointer hover:text-blue-400">Terms of Service</span>{" "}
            and{" "}
            <span className="text-blue-500 cursor-pointer hover:text-blue-400">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}








