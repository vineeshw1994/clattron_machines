
// export default function ClattronUnderConstruction() {
//   return (
//     <>
//       {/* Full Screen - Dark Industrial Theme */}
//       <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden">
        
//         {/* Background subtle grid + moving lines effect */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-black"></div>
//           <div className="absolute inset-0 bg-grid-white/5 bg-grid-32"></div>
//         </div>

//         <div className="relative text-center max-w-4xl mx-auto space-y-12">
          
//           {/* Logo or Company Name */}
//           <div className="flex justify-center">
//             <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
//               CLATTRON
//             </h1>
//           </div>

//           {/* Hard Hat Icon Animation */}
//           <div className="flex justify-center">
//             <div className="relative">
//               <HardHat className="w-24 h-24 md:w-32 md:h-32 text-yellow-500 animate-bounce" />
//               <Wrench className="w-12 h-12 text-blue-500 absolute -bottom-4 -right-4 rotate-12 animate-pulse" />
//             </div>
//           </div>

//           {/* Main Message */}
//           <div className="space-y-6">
//             <h2 className="text-4xl md:text-6xl font-bold text-white">
//               Site Under <span className="text-blue-400">Heavy Construction</span>
//             </h2>
            
//             <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
//               We're upgrading clattron.com with a brand new look, better machines catalog, 
//               and faster performance.
//             </p>

//             <p className="text-lg text-gray-400">
//               We'll be back stronger than ever in just a few days.
//             </p>
//           </div>

//           {/* Status Badge */}
//           <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/50 rounded-full px-8 py-4">
//             <div className="w-3 h-3 bg-yellow-500 rounded-full animate-ping"></div>
//             <span className="text-yellow-400 font-bold text-lg">ACTIVELY BUILDING – LAUNCHING SOON</span>
//           </div>

//           {/* Optional: Email notify (uncomment if you want) */}
//           {/* 
//           <div className="mt-12">
//             <p className="text-gray-400 mb-4">Want to be the first to know when we launch?</p>
//             <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="px-6 py-4 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
//               />
//               <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition">
//                 <Mail className="w-5 h-5" />
//                 Notify Me
//               </button>
//             </div>
//           </div>
//           */}

//           {/* Footer */}
//           <div className="pt-16 text-gray-500 text-sm">
//             <p>© 2025 Clattron Machinery Co. • Building the future of heavy industry</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

export default function ClattronUpdateBanner() {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 border-b-4 border-yellow-500 shadow-2xl pt-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        
        {/* Left Icon */}
        <div className="flex items-center gap-3">
          <div className="animate-spin-slow">
            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className="text-white font-bold text-sm md:text-lg">
          <span className="text-yellow-400">⚡ SITE UPGRADE IN PROGRESS ⚡</span> — 
          We’re building a brand new clattron.com. Full launch in a few days!
        </div>

        {/* Optional close button (uncomment if you want clients to hide it) */}
        {/* 
        <button className="absolute right-4 top-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        */}
      </div>
    </div>
  );
}