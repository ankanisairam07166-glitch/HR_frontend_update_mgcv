// // // "use client";
// // // import React, { useState } from "react";

// // // import { useRouter } from "next/navigation";
// // // import { loginAPI } from "@/services/redux/thunk/authThunk";
// // // import { useAuth } from "@/services/context/AuthContext";
// // // import Input from "../input/Input";
// // // import Button from "../button/Button";
// // // import Link from "next/link";

// // // export default function LoginPage() {
// // //   const router = useRouter();
// // //   const { login } = useAuth();

// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");

// // //   const handleLogin = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setLoading(true);

// // //     try {
// // //       const data = await loginAPI(email, password);
// // //       login(data.token, data.user);
// // //       router.push("/");
// // //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
// // //     } catch (err: any) {
// // //       setError(err.response?.data?.message || "Invalid credentials");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex items-center justify-center mt-40 ">
// // //       <form onSubmit={handleLogin} className="w-96 p-6 rounded-lg shadow-md">
// // //         <h1 className="text-2xl mb-4 font-semibold text-center">Login</h1>
// // //         <Input
// // //           type="email"
// // //           label="Email"
// // //           placeholder="Email"
// // //           className="w-full p-2 mb-3 rounded  text-black"
// // //           name="email"
// // //         />
// // //         <Input
// // //           type="password"
// // //           label="Password"
// // //           placeholder="Password"
// // //           className="w-full p-2 mb-3 rounded  text-black" name="password"  />

// // //         <Button
// // //           type="submit"
// // //           disabled={loading}
// // //           className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
// // //           label ="Login"
// // //           isLoading={loading}
// // //           />

// // //         <p className="text-sm mt-4 text-center">
// // //           Don’t have an account?{" "}
// // //           <Link href="/signup" className="text-blue-400 underline" >
// // //             Sign Up
// // //           </Link>
// // //         </p>

// // //         <p className="text-sm text-center mt-2">
// // //           <Link href="/forget-password" className="text-gray-400 underline">
// // //             Forgot Password?
// // //           </Link>
// // //         </p>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // "use client";
// // // import React, { useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { loginAPI } from "@/services/redux/thunk/authThunk";
// // // import Input from "../input/Input";
// // // import Button from "../button/Button";
// // // import Link from "next/link";

// // // export default function LoginPage() {
// // //   const router = useRouter();
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");

// // //   const handleLogin = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setLoading(true);
// // //     try {
// // //       if (!email || !password) {
// // //         setError("Please enter both email and password");
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       console.log("Login payload:", { email, password });
// // //       await loginAPI(email, password);
// // //       router.push("/dashboard");
// // //     } catch (err: any) {
// // //       setError(err.response?.data?.message || "Login failed");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex items-center justify-center mt-40">
// // //       <form
// // //         onSubmit={handleLogin}
// // //         className="w-96 p-6 rounded-lg shadow-md bg-white"
// // //       >
// // //         <h1 className="text-2xl mb-4 font-semibold text-blue-600">Login</h1>

// // //         {error && (
// // //           <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
// // //         )}

// // //         <Input
// // //           type="email"
// // //           label="Email"
// // //           placeholder="Email"
// // //           name="email"
// // //           value={email}
// // //           onChange={(e) => setEmail(e.target.value)}
// // //           className="w-full p-2 mb-3 rounded text-black"
// // //         />

// // //         <Input
// // //           type="password"
// // //           label="Password"
// // //           placeholder="Password"
// // //           name="password"
// // //           value={password}
// // //           onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
// // //           className="w-full p-2 mb-3 rounded text-black"
// // //         />

// // //         <Button
// // //           type="submit"
// // //           disabled={loading}
// // //           className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
// // //           label={loading ? "Logging in..." : "Login"}
// // //         />

// // //         {/* Links Section */}
// // //       <div className="mt-6 flex flex-col items-center space-y-2 text-sm text-gray-600">
// // //         <p>
// // //           Don’t have an account?{" "}
// // //           <Link href="/signup" className="text-blue-500 hover:underline">
// // //             Sign up
// // //           </Link>
// // //         </p>

// // //         <Link
// // //           href="/forget-password"
// // //           className="text-blue-500 hover:underline font-medium"
// // //         >
// // //           Forgot Password?
// // //         </Link>
// // //       </div>
// // //     </form>
// // //   </div>
// // // );
// // // }

// // // src/components/loginForm/Login.tsx
// // "use client";
// // import React, { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { loginAPI } from "@/services/redux/thunk/authThunk";
// // import Button from "../button/Button";
// // import Link from "next/link";

// // type LoginProps = {
// //   onClose?: () => void;            // when used in modal
// //   onLoggedIn?: () => void;         // optional callback after success
// //   switchToSignUp?: () => void;     // show SignUp view inside modal
// //   redirectTo?: string;             // default: "/dashboard"
// // };

// // export default function Login({
// //   onClose,
// //   onLoggedIn,
// //   switchToSignUp,
// //   redirectTo = "/dashboard",
// // }: LoginProps) {
// //   const router = useRouter();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");

// //     if (!email || !password) {
// //       setError("Please enter both email and password");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const data = await loginAPI(email, password); // { token, user }

// //       // Persist & notify navbar
// //       localStorage.setItem("authToken", data.token);
// //       localStorage.setItem("authUser", JSON.stringify(data.user));
// //       window.dispatchEvent(new Event("auth-changed"));

// //       onLoggedIn?.();
// //       onClose?.(); // close modal if present

// //       router.push(redirectTo);
// //     } catch (err: any) {
// //       setError(err?.response?.data?.message || "Login failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //    return (
// //     <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
// //       <form onSubmit={handleLogin} className="w-96 p-6 rounded-lg shadow-md bg-white">
// //         <h1 className="text-2xl mb-4 font-semibold text-blue-600">Login</h1>

// //         {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

// //         {/* Email */}
// //         <div className="mb-3">
// //           <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
// //           <input
// //             type="email"
// //             placeholder="Email"
// //             name="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
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
// //               placeholder="Password"
// //               name="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="w-full p-2 pr-10 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
// //               autoComplete="current-password"
// //             />
// //             <button
// //               type="button"
// //               aria-label={showPassword ? "Hide password" : "Show password"}
// //               onClick={() => setShowPassword((s) => !s)}
// //               className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
// //             >
// //               {showPassword ? (
// //                 // eye-off icon
// //                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                   <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-10.94-8 .58-1.77 1.54-3.34 2.78-4.62"/>
// //                   <path d="M1 1l22 22"/>
// //                   <path d="M10.58 10.58a2 2 0 0 0 2.84 2.84"/>
// //                   <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 10.94 8a11.8 11.8 0 0 1-2.31 3.64"/>
// //                 </svg>
// //               ) : (
// //                 // eye icon
// //                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                   <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
// //                   <circle cx="12" cy="12" r="3" />
// //                 </svg>
// //               )}
// //             </button>
// //           </div>
// //         </div>

// //         <Button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
// //           label={loading ? "Logging in..." : "Login"}
// //         />

// //         {/* Links */}
// //         <div className="mt-6 flex flex-col items-center space-y-2 text-sm text-gray-600">
// //           {switchToSignUp ? (
// //             <button type="button" className="text-blue-500 hover:underline" onClick={switchToSignUp}>
// //               Don’t have an account? Sign up
// //             </button>
// //           ) : (
// //             <p>
// //               Don’t have an account?{" "}
// //               <Link href="/signup" className="text-blue-500 hover:underline">
// //                 Sign up
// //               </Link>
// //             </p>
// //           )}
// //           <Link href="/forget-password" className="text-blue-500 hover:underline font-medium">
// //             Forgot Password?
// //           </Link>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }
// // src/components/loginForm/Login.tsx
// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { loginAPI } from "@/services/redux/thunk/authThunk";
// import Button from "../button/Button";
// import Link from "next/link";

// type LoginProps = {
//   onClose?: () => void;            // when used in modal
//   onLoggedIn?: () => void;         // optional callback after success
//   switchToSignUp?: () => void;     // show SignUp view inside modal
//   redirectTo?: string;             // default: "/dashboard"
// };

// export default function Login({
//   onClose,
//   onLoggedIn,
//   switchToSignUp,
//   redirectTo = "/dashboard",
// }: LoginProps) {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       setError("Please enter both email and password");
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = await loginAPI(email, password); // { token, user }

//       // Persist & notify navbar
//       localStorage.setItem("authToken", data.token);
//       localStorage.setItem("authUser", JSON.stringify(data.user));
//       window.dispatchEvent(new Event("auth-changed"));

//       onLoggedIn?.();
//       onClose?.(); // close modal if present

//       router.push(redirectTo);
//     } catch (err: unknown) {
//       // Type-safe error handling
//       const error = err as { response?: { data?: { message?: string } } };
//       setError(error?.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//    return (
//     <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
//       <form onSubmit={handleLogin} className="w-96 p-6 rounded-lg shadow-md bg-white">
//         <h1 className="text-2xl mb-4 font-semibold text-blue-600">Login</h1>

//         {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

//         {/* Email */}
//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
//           <input
//             type="email"
//             placeholder="Email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
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
//               placeholder="Password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 pr-10 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
//               autoComplete="current-password"
//             />
//             <button
//               type="button"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//               onClick={() => setShowPassword((s) => !s)}
//               className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
//             >
//               {showPassword ? (
//                 // eye-off icon
//                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-10.94-8 .58-1.77 1.54-3.34 2.78-4.62"/>
//                   <path d="M1 1l22 22"/>
//                   <path d="M10.58 10.58a2 2 0 0 0 2.84 2.84"/>
//                   <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 10.94 8a11.8 11.8 0 0 1-2.31 3.64"/>
//                 </svg>
//               ) : (
//                 // eye icon
//                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
//                   <circle cx="12" cy="12" r="3" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         <Button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
//           label={loading ? "Logging in..." : "Login"}
//         />

//         {/* Links */}
//         <div className="mt-6 flex flex-col items-center space-y-2 text-sm text-gray-600">
//           {switchToSignUp ? (
//             <button type="button" className="text-blue-500 hover:underline" onClick={switchToSignUp}>
//              Don&apos;t have an account? Sign up
//             </button>
//           ) : (
//             <p>
//               Don&apos;t have an account?{" "}
//               <Link href="/signup" className="text-blue-500 hover:underline">
//                 Sign up
//               </Link>
//             </p>
//           )}
//           <Link href="/forget-password" className="text-blue-500 hover:underline font-medium">
//             Forgot Password?
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }
// src/components/loginForm/Login.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAPI } from "@/services/redux/thunk/authThunk";
import Link from "next/link";

type LoginProps = {
  onClose?: () => void;
  onLoggedIn?: () => void;
  switchToSignUp?: () => void;
  redirectTo?: string;
};

export default function Login({
  onClose,
  onLoggedIn,
  switchToSignUp,
  redirectTo = "/dashboard",
}: LoginProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    setLoading(true);
    try {
      const data = await loginAPI(email, password);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-changed"));
      onLoggedIn?.();
      onClose?.();
      router.push(redirectTo);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-[#0b1120] font-sans">
      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex w-[42%] flex-col justify-between px-10 py-10 bg-gradient-to-br from-[#0f1f3d] via-[#0b1120] to-[#071428] border-r border-[#1e3a5f]/40 relative overflow-hidden">
        {/* Ambient glow */}
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
              Smarter HR,<br />built for{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                modern teams
              </span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">
              Automate onboarding, leave, payroll, and performance — all in one platform.
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {[
              "Automated onboarding workflows",
              "Real-time attendance tracking",
              "Smart payroll processing",
              "360° performance reviews",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <div className="flex gap-3">
            {[
              { num: "2.4k+", lbl: "Companies" },
              { num: "98%", lbl: "Satisfaction" },
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
          <span className="px-4 py-1.5 rounded-md border border-blue-600 bg-slate-800 text-blue-400 text-xs font-medium">
            Sign in
          </span>
          {switchToSignUp ? (
            <button
              type="button"
              onClick={switchToSignUp}
              className="px-4 py-1.5 rounded-md border border-[#1e3a5f] text-slate-400 text-xs hover:text-slate-200 transition-colors"
            >
              Sign up
            </button>
          ) : (
            <Link
              href="/signup"
              className="px-4 py-1.5 rounded-md border border-[#1e3a5f] text-slate-400 text-xs hover:text-slate-200 transition-colors"
            >
              Sign up
            </Link>
          )}
        </div>

        <div className="w-full max-w-sm mx-auto">
          {/* Header */}
          <p className="text-blue-400 text-[11px] font-medium uppercase tracking-widest mb-2">
            Welcome back
          </p>
          <h2 className="text-white text-2xl font-semibold mb-1">Sign in to your account</h2>
          <p className="text-slate-400 text-sm mb-8">
            Enter your credentials to access your HR dashboard.
          </p>

          {error && (
            <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/25 px-4 py-2.5 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                Work email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
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
              <div className="text-right mt-1.5">
                <Link
                  href="/forget-password"
                  className="text-[12px] text-slate-500 hover:text-blue-400 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-[9px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 mt-1"
            >
              {loading ? "Signing in…" : "Sign in to dashboard →"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#1e293b]" />
            <span className="text-[11px] text-slate-600 whitespace-nowrap">new to HRAutomation?</span>
            <div className="flex-1 h-px bg-[#1e293b]" />
          </div>

          {/* Secondary CTA */}
          {switchToSignUp ? (
            <button
              type="button"
              onClick={switchToSignUp}
              className="w-full py-2.5 rounded-[9px] border border-[#1e3a5f] bg-[#1e293b] text-slate-400 text-sm font-medium hover:text-slate-200 transition-colors"
            >
              Create a free account
            </button>
          ) : (
            <Link
              href="/signup"
              className="block w-full text-center py-2.5 rounded-[9px] border border-[#1e3a5f] bg-[#1e293b] text-slate-400 text-sm font-medium hover:text-slate-200 transition-colors"
            >
              Create a free account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}