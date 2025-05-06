// // "use client"
// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import Image from "next/image";

// // function Login() {
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [isAnimating, setIsAnimating] = useState(false);

// //   const toggleForm = () => {
// //     if (isAnimating) return;
// //     setIsAnimating(true);
// //     setIsLogin(!isLogin);
// //     setTimeout(() => setIsAnimating(false), 500);
// //   };

// //   // Background gradient animation
// //   const [gradientPos, setGradientPos] = useState({ x: 0, y: 0 });
  
// //   useEffect(() => {
// //     const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
// //       const x = e.clientX / window.innerWidth - 0.5;
// //       const y = e.clientY / window.innerHeight - 0.5;
// //       setGradientPos({ x, y });
// //     };
    
// //     window.addEventListener('mousemove', handleMouseMove);
// //     return () => window.removeEventListener('mousemove', handleMouseMove);
// //   }, []);

// //   const bgStyle = {
// //     background: `radial-gradient(
// //       at ${50 + gradientPos.x * 20}% ${50 + gradientPos.y * 20}%, 
// //       #0891b2 0%, 
// //       #155e75 50%, 
// //       #164e63 100%
// //     )`,
// //   };

// //   return (
// //     <div 
// //       className="min-h-screen w-full flex flex-col md:flex-row"
// //       style={bgStyle}
// //     >
// //       {/* Left Section - Image (hidden on mobile, shown on md and up) */}
// //       <div className="hidden md:block relative w-full md:w-1/2 h-auto">
// //         <Image
// //           src="/assets/auth.png"
// //           alt="Wavy Bus"
// //           fill
// //           className="object-cover"
// //           priority
// //           sizes="(max-width: 768px) 0px, 50vw"
// //         />
// //       </div>

// //       {/* Right Section - Form (full width on mobile, half on desktop) */}
// //       <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-6">
// //         <motion.div 
// //           className="w-full max-w-md bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-6 md:p-8 backdrop-blur-sm bg-opacity-90"
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6 }}
// //         >
// //           <div className="flex justify-center mb-4 md:mb-6">
// //             <div className="w-12 h-12 md:w-16 md:h-16 bg-cyan-100 rounded-full flex items-center justify-center">
// //               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
// //               </svg>
// //             </div>
// //           </div>
          
// //           <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800">
// //             {isLogin ? "Welcome Back" : "Create Account"}
// //           </h2>
// //           <p className="text-center text-sm md:text-base text-gray-500 mb-4 md:mb-6">
// //             {isLogin ? "Login to access your account" : "Join us today"}
// //           </p>

// //           <AnimatePresence mode="wait">
// //             <motion.form
// //               key={isLogin ? "login" : "signup"}
// //               initial={{ opacity: 0, x: 20 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               exit={{ opacity: 0, x: -20 }}
// //               transition={{ duration: 0.3 }}
// //             >
// //               {!isLogin && (
// //                 <motion.div
// //                   initial={{ opacity: 0, height: 0 }}
// //                   animate={{ opacity: 1, height: "auto" }}
// //                   transition={{ duration: 0.3 }}
// //                   className="mb-3 md:mb-4 overflow-hidden"
// //                 >
// //                   <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
// //                     Username
// //                   </label>
// //                   <div className="relative">
// //                     <input
// //                       type="text"
// //                       id="username"
// //                       name="username"
// //                       required
// //                       placeholder="Your username"
// //                       className="w-full p-2 md:p-3 pl-9 md:pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 transition-all text-sm md:text-base"
// //                     />
// //                     <div className="absolute left-3 top-2.5 md:top-3 text-gray-400">
// //                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //                       </svg>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               )}

// //               <div className="mb-3 md:mb-4">
// //                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
// //                 <div className="relative">
// //                   <input
// //                     type="email"
// //                     id="email"
// //                     name="email"
// //                     required
// //                     placeholder="your@email.com"
// //                     className="w-full p-2 md:p-3 pl-9 md:pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 transition-all text-sm md:text-base"
// //                   />
// //                   <div className="absolute left-3 top-2.5 md:top-3 text-gray-400">
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //                     </svg>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="mb-4 md:mb-6">
// //                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
// //                 <div className="relative">
// //                   <input
// //                     type="password"
// //                     id="password"
// //                     name="password"
// //                     required
// //                     placeholder="••••••••"
// //                     className="w-full p-2 md:p-3 pl-9 md:pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 transition-all text-sm md:text-base"
// //                   />
// //                   <div className="absolute left-3 top-2.5 md:top-3 text-gray-400">
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
// //                     </svg>
// //                   </div>
// //                 </div>
// //               </div>

// //               <motion.button
// //                 type="submit"
// //                 className="w-full py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm md:text-base"
// //                 whileHover={{ scale: 1.01 }}
// //                 whileTap={{ scale: 0.99 }}
// //               >
// //                 {isLogin ? "Login" : "Sign Up"}
// //               </motion.button>
// //             </motion.form>
// //           </AnimatePresence>

// //           <div className="mt-4 md:mt-6 text-center">
// //             <button
// //               onClick={toggleForm}
// //               className="text-cyan-600 hover:text-cyan-700 font-medium focus:outline-none transition-colors text-sm md:text-base"
// //             >
// //               {isLogin ? (
// //                 <span>Don't have an account? <span className="font-semibold">Sign Up</span></span>
// //               ) : (
// //                 <span>Already have an account? <span className="font-semibold">Login</span></span>
// //               )}
// //             </button>
// //           </div>

// //           {isLogin && (
// //             <div className="mt-3 md:mt-4 text-center">
// //               <a href="#" className="text-xs md:text-sm text-gray-500 hover:text-cyan-600 transition-colors">
// //                 Forgot password?
// //               </a>
// //             </div>
// //           )}
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;


// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// import toast from "react-hot-toast";
// import useApi from "../services/useApi";


// function Login() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [form, setForm] = useState({ email: "", password: "", username: "" });
//   const [error, setError] = useState<string | null>(null);

//   const { request } = useApi();

//   const toggleForm = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setIsLogin(!isLogin);
//     setError(null);
//     setTimeout(() => setIsAnimating(false), 500);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     const loadingToast = toast.loading(isLogin ? "Logging in..." : "Creating account...");
//     try {
//       const endpoint = isLogin ? "/auth/login" : "/auth/signup";
//       const payload = isLogin
//         ? { email: form.email, password: form.password }
//         : { email: form.email, password: form.password, username: form.username };

//       const res = await request(endpoint, "POST", payload);
//       toast.success(isLogin ? "Login successful!" : "Account created successfully!", {
//         id: loadingToast,
//       });
//       console.log("Success:", res);
//       // TODO: Redirect or store token
//     } catch (err: any) {
//       toast.error(err.message || "Something went wrong", { id: loadingToast });
//       setError(err.message || "Something went wrong");
//     }
//   };

//   // Background gradient animation
//   const [gradientPos, setGradientPos] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       const x = e.clientX / window.innerWidth - 0.5;
//       const y = e.clientY / window.innerHeight - 0.5;
//       setGradientPos({ x, y });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   const bgStyle = {
//     background: `radial-gradient(
//       at ${50 + gradientPos.x * 20}% ${50 + gradientPos.y * 20}%,
//       #0891b2 0%,
//       #155e75 50%,
//       #164e63 100%
//     )`,
//   };

//   return (
//     <div className="min-h-screen w-full flex flex-col md:flex-row" style={bgStyle}>
//       <div className="hidden md:block relative w-full md:w-1/2 h-auto">
//         <Image
//           src="/assets/auth.png"
//           alt="Wavy Bus"
//           fill
//           className="object-cover"
//           priority
//           sizes="(max-width: 768px) 0px, 50vw"
//         />
//       </div>

//       <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-6">
//         <motion.div
//           className="w-full max-w-md bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-6 md:p-8 backdrop-blur-sm bg-opacity-90"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="flex justify-center mb-6">
//             <div className="w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
//               </svg>
//             </div>
//           </div>

//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h2>
//           <p className="text-center text-gray-500 mb-6">{isLogin ? "Login to access your account" : "Join us today"}</p>

//           <AnimatePresence mode="wait">
//             <motion.form
//               key={isLogin ? "login" : "signup"}
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.3 }}
//               onSubmit={handleSubmit}
//             >
//               {!isLogin && (
//                 <div className="mb-4">
//                   <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                   <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     value={form.username}
//                     onChange={handleChange}
//                     required
//                     placeholder="Your username"
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 text-sm"
//                   />
//                 </div>
//               )}

//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                   placeholder="your@email.com"
//                   className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 text-sm"
//                 />
//               </div>

//               <div className="mb-6">
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   required
//                   placeholder="••••••••"
//                   className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 text-sm"
//                 />
//               </div>

//               {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//               <motion.button
//                 type="submit"
//                 className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
//                 whileHover={{ scale: 1.01 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 {isLogin ? "Login" : "Sign Up"}
//               </motion.button>
//             </motion.form>
//           </AnimatePresence>

//           <div className="mt-4 text-center">
//             <button onClick={toggleForm} className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
//               {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
//             </button>
//           </div>

//           {isLogin && (
//             <div className="mt-3 text-center">
//               <a href="#" className="text-xs text-gray-500 hover:text-cyan-600">Forgot password?</a>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default Login;
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import toast from "react-hot-toast";
import useApi from "../services/useApi";
import { useRouter } from "next/navigation";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { request } = useApi();

  const toggleForm = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsLogin(!isLogin);
    setError(null);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const loadingToast = toast.loading(isLogin ? "Logging in..." : "Creating account...");
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { email: form.email, password: form.password, username: form.username };

      const res = await request(endpoint, "POST", payload);
      toast.success(isLogin ? "Login successful!" : "Account created successfully!", {
        id: loadingToast,
      });
      console.log("Success:", res);
      
router.push("/dashboard");

      // TODO: Redirect or store token
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", { id: loadingToast });
      setError(err.message || "Something went wrong");
    }
  };

  // Background gradient animation
  const [gradientPos, setGradientPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setGradientPos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const bgStyle = {
    background: `radial-gradient(
      at ${50 + gradientPos.x * 20}% ${50 + gradientPos.y * 20}%,
      #0891b2 0%,
      #155e75 50%,
      #164e63 100%
    )`,
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row" style={bgStyle}>
      <div className="hidden md:block relative w-full md:w-1/2 h-auto">
        <Image
          src="/assets/auth.png"
          alt="Wavy Bus"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 0px, 50vw"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-6">
        <motion.div
          className="w-full max-w-md bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-6 md:p-8 backdrop-blur-sm bg-opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p className="text-center text-gray-500 mb-6">{isLogin ? "Login to access your account" : "Join us today"}</p>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
            >
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    placeholder="Your username"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 text-sm"
                  />
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 text-sm"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 text-sm"
                />
              </div>

              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

              <motion.button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          <div className="mt-4 text-center">
            <button onClick={toggleForm} className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>

          {isLogin && (
            <div className="mt-3 text-center">
              <a href="#" className="text-xs text-gray-500 hover:text-cyan-600">Forgot password?</a>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Login;