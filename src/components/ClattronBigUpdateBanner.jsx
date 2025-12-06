import { HardHat, Wrench, Zap } from "lucide-react";

export default function ClattronBigUpdateBanner() {
  return (
    <div className="relative bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b-8 border-yellow-500 shadow-2xl">
      {/* Main Banner - Taller now */}
      <div className="px-6 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Left - Icons + Big Message */}
          <div className="flex items-center gap-6">
            {/* Animated Icons */}
            <div className="flex -space-x-4">
              <div className="animate-bounce">
                <HardHat className="w-16 h-16 lg:w-20 lg:h-20 text-yellow-400 drop-shadow-lg" />
              </div>
              <div className="animate-pulse delay-150">
                <Wrench className="w-12 h-12 lg:w-16 lg:h-16 text-blue-400 rotate-12 drop-shadow-lg" />
              </div>
              <div className="animate-bounce delay-300">
                <Zap className="w-10 h-10 lg:w-14 lg:h-14 text-yellow-500 drop-shadow-lg" />
              </div>
            </div>

            {/* Text Content */}
            <div className="text-left">
              <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight">
                SITE UNDER <span className="text-yellow-400"> UPGRADE</span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-300 mt-2 font-medium">
                We're rebuilding clattron.com from the ground up — better machines catalog,
                faster loading, mobile-ready, and a brand new design.
              </p>
              <p className="text-sm lg:text-base text-gray-400 mt-3">
                Full launch in <span className="text-yellow-400 font-bold">a few days</span>. 
                Your patience is powering our progress!
              </p>
            </div>
          </div>

          {/* Right - Status Badge + Countdown Feel */}
          <div className="text-center lg:text-right">
            <div className="inline-flex items-center gap-4 bg-black/50 backdrop-blur-sm border-2 border-yellow-500/50 rounded-xl px-8 py-5 shadow-2xl">
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              <div>
                <p className="text-yellow-400 text-sm font-bold uppercase tracking-wider">Status</p>
                <p className="text-white text-2xl font-black">LAUNCHING SOON</p>
              </div>
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="h-2 bg-gradient-to-r from-yellow-600 via-blue-600 to-yellow-600"></div>
    </div>
  );
}