// "use client";

// import React, { useState } from "react";
// import { User } from "lucide-react";
// import AuthModal from "../modal/AuthModal";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const Navbar: React.FC = () => {
//   const [showModal, setShowModal] = useState(false);
//   const pathname = usePathname();

//   const navItems = [
//     { path: "/dashboard", label: "Dashboard" },
//     { path: "/candidates", label: "Candidates" },
//     { path: "/scheduler", label: "Scheduling" },
//     { path: "/assessments", label: "Assessments" },
//     { path: "/interview-results", label: "Interview Results" },
//   ];

//   return (
//     <>
//       <header className="bg-white border-b border-gray-200 shadow-sm">
//         <div className="flex items-center justify-between px-6 py-3">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link href="/" className="text-xl font-bold text-blue-600">
//               TalentFlow AI
//             </Link>

//             {/* Navigation */}
//             <nav className="ml-10 hidden md:flex space-x-8">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   href={item.path}
//                   className={`transition-colors duration-200 ${
//                     pathname === item.path
//                       ? "text-blue-600 font-semibold"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>
//           </div>

//           {/* Login/Signup Button */}
//           <button
//             type="button"
//             onClick={() => setShowModal(true)}
//             className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <User size={18} />
//             Login / Signup
//           </button>
//         </div>
//       </header>

//       {/* Auth Modal */}
//       {showModal && <AuthModal onClose={() => setShowModal(false)} />}
//     </>
//   );
// };

// export default Navbar;
// "use client";

// import React, { useEffect, useState } from "react";
// import { User, LogOut } from "lucide-react";
// import AuthModal from "../modal/AuthModal";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";

// const Navbar: React.FC = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Define your navigation menu
//   const navItems = [
//     { path: "/dashboard", label: "Dashboard" },
//     { path: "/candidates", label: "Candidates" },
//     { path: "/scheduler", label: "Scheduling" },
//     { path: "/assessments", label: "Assessments" },
//     { path: "/interview-results", label: "Interview Results" },
//   ];

//   // Check if token exists on mount
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setIsAuthenticated(!!token);
//   }, []);

//   // Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     setIsAuthenticated(false);
//     router.replace("/"); // redirect to homepage or login page
//   };

//   return (
//     <>
//       <header className="bg-white border-b border-gray-200 shadow-sm">
//         <div className="flex items-center justify-between px-6 py-3">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link href="/" className="text-xl font-bold text-blue-600">
//               TalentFlow AI
//             </Link>

//             {/* Navigation */}
//             <nav className="ml-10 hidden md:flex space-x-8">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   href={item.path}
//                   className={`transition-colors duration-200 ${
//                     pathname === item.path
//                       ? "text-blue-600 font-semibold"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>
//           </div>

//           {/* Auth Buttons */}
//           {!isAuthenticated ? (
//             <button
//               type="button"
//               onClick={() => setShowModal(true)}
//               className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <User size={18} />
//               Login / Signup
//             </button>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
//             >
//               <LogOut size={18} />
//               Logout
//             </button>
//           )}
//         </div>
//       </header>

//       {/* Auth Modal */}
//       {showModal && (
//         <AuthModal
//           onClose={() => {
//             setShowModal(false);
//             setIsAuthenticated(true); // ✅ update auth state after successful login
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;
// // components/navbar/Navbar.tsx
// "use client";
// import React, { useEffect, useState } from "react";
// import { User, LogOut } from "lucide-react";
// import AuthModal from "../modal/AuthModal";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";

// const Navbar: React.FC = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   const navItems = [
//     { path: "/dashboard", label: "Dashboard" },
//     { path: "/candidates", label: "Candidates" },
//     { path: "/scheduler", label: "Scheduling" },
//     { path: "/assessments", label: "Assessments" },
//     { path: "/interview-results", label: "Interview Results" },
//   ];

//   const syncAuth = () => {
//     const token = localStorage.getItem("authToken") || localStorage.getItem("tf_token");
//     setIsAuthenticated(!!token);
//   };

//   useEffect(() => {
//     // initial
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     syncAuth();

//     // react to tab changes + our custom event
//     const onStorage = () => syncAuth();
//     const onAuthChanged = () => syncAuth();

//     window.addEventListener("storage", onStorage);
//     window.addEventListener("auth-changed", onAuthChanged as EventListener);

//     return () => {
//       window.removeEventListener("storage", onStorage);
//       window.removeEventListener("auth-changed", onAuthChanged as EventListener);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("tf_token");
//     localStorage.removeItem("authUser");
//     window.dispatchEvent(new Event("auth-changed"));
//     router.replace("/");
//   };

//   return (
//     <>
//       <header className="bg-white border-b border-gray-200 shadow-sm">
//         <div className="flex items-center justify-between px-6 py-3">
//           <div className="flex items-center">
//             <Link href="/" className="text-xl font-bold text-blue-600">TalentFlow AI</Link>
//             <nav className="ml-10 hidden md:flex space-x-8">
//               {navItems.map((item) => (
//                 <Link key={item.path} href={item.path}
//                       className={`transition-colors duration-200 ${pathname === item.path ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-gray-900"}`}>
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>
//           </div>

//           {!isAuthenticated ? (
//             <button
//               type="button"
//               onClick={() => setShowModal(true)}
//               className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <User size={18} />
//               Login / Signup
//             </button>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
//             >
//               <LogOut size={18} />
//               Logout
//             </button>
//           )}
//         </div>
//       </header>

//       {showModal && (
//         <AuthModal onClose={() => setShowModal(false)} />
//       )}
//     </>
//   );
// };

// export default Navbar;

// src/components/navigation/Navbar.tsx (or wherever your Navbar lives)
// src/components/navigation/Navbar.tsx
// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import AuthModal from "../modal/AuthModal";
// import { User, LogOut } from "lucide-react";

// const Navbar: React.FC = () => {
//   const [mounted, setMounted] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   const navItems = [
//     { path: "/dashboard", label: "Dashboard" },
//     { path: "/candidates", label: "Candidates" },
//     { path: "/scheduler",  label: "Scheduling" }, // ✅ keep the working route
//     { path: "/assessments", label: "Assessments" },
//     { path: "/interview-results", label: "Interview Results" },
//   ];

//   const syncAuth = () => {
//     const token =
//       (typeof window !== "undefined" && localStorage.getItem("authToken")) ||
//       (typeof window !== "undefined" && localStorage.getItem("tf_token"));
//     setIsAuthenticated(!!token);
//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setMounted(true);
//     syncAuth();
//     const onStorage = () => syncAuth();
//     const onAuthChanged = () => syncAuth();
//     window.addEventListener("storage", onStorage);
//     window.addEventListener("auth-changed", onAuthChanged as EventListener);
//     return () => {
//       window.removeEventListener("storage", onStorage);
//       window.removeEventListener("auth-changed", onAuthChanged as EventListener);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("tf_token");
//     localStorage.removeItem("authUser");
//     window.dispatchEvent(new Event("auth-changed"));
//     router.replace("/"); // back to login screen
//   };

//   if (!mounted) return null;

//   // 🔒 Freeze nav ONLY on login screens when logged out
//   const isLoginRoute = pathname === "/" || pathname === "/login";
//   const freezeNav = !isAuthenticated && isLoginRoute;

//   return (
//     <>
//       <header className="bg-white border-b border-gray-200 shadow-sm">
//         <div className="flex items-center justify-between px-6 py-3">
//           <div className="flex items-center">
//             {/* Brand: disabled on login when logged out */}
//             {freezeNav ? (
//               <span
//                 aria-disabled="true"
//                 className="text-xl font-bold text-gray-400 cursor-not-allowed select-none"
//                 tabIndex={-1}
//               >
//                 TalentFlow AI
//               </span>
//             ) : (
//               <Link href="/" className="text-xl font-bold text-blue-600">
//                 TalentFlow AI
//               </Link>
//             )}

//             <nav className="ml-10 hidden md:flex space-x-8">
//               {navItems.map((item) =>
//                 freezeNav ? (
//                   <span
//                     key={item.path}
//                     aria-disabled="true"
//                     className="text-gray-400 cursor-not-allowed pointer-events-none select-none"
//                     tabIndex={-1}
//                   >
//                     {item.label}
//                   </span>
//                 ) : (
//                   <Link
//                     key={item.path}
//                     href={item.path}
//                     className={`transition-colors duration-200 ${
//                       pathname === item.path
//                         ? "text-blue-600 font-semibold"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                   >
//                     {item.label}
//                   </Link>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Right side: hide Login/Signup on login page when logged out */}
//           {!isAuthenticated ? (
//             freezeNav ? null : (
//               <button
//                 type="button"
//                 onClick={() => setShowModal(true)}
//                 className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 <User size={18} />
//                 Login / Signup
//               </button>
//             )
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
//             >
//               <LogOut size={18} />
//               Logout
//             </button>
//           )}
//         </div>
//       </header>

//       {showModal && <AuthModal onClose={() => setShowModal(false)} />}
//     </>
//   );
// };

// export default Navbar;
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AuthModal from "../modal/AuthModal";
import { User, LogOut } from "lucide-react";

const Navbar: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { path: "/dashboard",        label: "Dashboard"        },
    { path: "/candidates",       label: "Candidates"       },
    { path: "/scheduler",        label: "Scheduling"       },
    { path: "/assessments",      label: "Assessments"      },
    { path: "/interview-results",label: "Interview Results"},
  ];

  const syncAuth = () => {
    const token =
      (typeof window !== "undefined" && localStorage.getItem("authToken")) ||
      (typeof window !== "undefined" && localStorage.getItem("tf_token"));
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    setMounted(true);
    syncAuth();
    const onStorage      = () => syncAuth();
    const onAuthChanged  = () => syncAuth();
    window.addEventListener("storage",      onStorage);
    window.addEventListener("auth-changed", onAuthChanged as EventListener);
    return () => {
      window.removeEventListener("storage",      onStorage);
      window.removeEventListener("auth-changed", onAuthChanged as EventListener);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tf_token");
    localStorage.removeItem("authUser");
    window.dispatchEvent(new Event("auth-changed"));
    router.replace("/");
  };

  if (!mounted) return null;

  const isLoginRoute = pathname === "/" || pathname === "/login";
  const freezeNav    = !isAuthenticated && isLoginRoute;

  return (
    <>
      {/* ── Navbar shell ── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: 56,
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          fontFamily: "inherit",
        }}
      >
        {/* ── Left: brand + nav ── */}
        <div style={{ display: "flex", alignItems: "center" }}>

          {/* Brand */}
          {freezeNav ? (
            <span style={{ fontSize: 20, fontWeight: 700, color: "#9ca3af", userSelect: "none" }}>
              TalentFlow AI
            </span>
          ) : (
            <Link href="/" style={{ fontSize: 20, fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>
              TalentFlow AI
            </Link>
          )}

          {/* ── Nav links ──
              FIX: replaced "hidden md:flex space-x-8" (broken Tailwind)
              with inline flex + gap so spacing is always applied  */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,           /* gap between items */
              marginLeft: 40,   /* same as ml-10 */
            }}
          >
            {navItems.map((item) =>
              freezeNav ? (
                <span
                  key={item.path}
                  style={{
                    padding: "6px 12px",
                    fontSize: 14,
                    color: "#9ca3af",
                    cursor: "not-allowed",
                    userSelect: "none",
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: pathname === item.path ? 600 : 400,
                    color:      pathname === item.path ? "#2563eb" : "#4b5563",
                    background: pathname === item.path ? "#eff6ff"  : "transparent",
                    textDecoration: "none",
                    transition: "all 0.14s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* ── Right: auth button ── */}
        {!isAuthenticated ? (
          freezeNav ? null : (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 16px", fontSize: 13, fontWeight: 500,
                color: "#fff", background: "#2563eb",
                border: "none", borderRadius: 8, cursor: "pointer",
                transition: "background 0.14s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#2563eb")}
            >
              <User size={16} />
              Login / Signup
            </button>
          )
        ) : (
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 16px", fontSize: 13, fontWeight: 500,
              color: "#fff", background: "#dc2626",
              border: "none", borderRadius: 8, cursor: "pointer",
              transition: "background 0.14s",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#b91c1c")}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#dc2626")}
          >
            <LogOut size={16} />
            Logout
          </button>
        )}
      </header>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;