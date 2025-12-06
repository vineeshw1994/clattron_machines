import { ArrowRight, Wrench, Shield, Zap } from "lucide-react";

export default function ClattronHeroPoster() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16"></div>
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-300 backdrop-blur-sm">
              <Zap className="h-5 w-5" />
              <span>Building the Future of Heavy Industry</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-white">
              Powering Progress
              <span className="block text-blue-400 mt-2">
                With Unmatched Machinery
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl">
              Clattron delivers world-class industrial machines engineered for maximum performance, 
              durability, and precision. Trusted by leaders in construction, mining, and manufacturing 
              across the globe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-500 hover:shadow-2xl hover:scale-105"
              >
                Get a Custom Quote
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
              </a>
              <a
                href="#machines"
                className="inline-flex items-center justify-center gap-3 rounded-lg border-2 border-gray-400 px-8 py-4 text-lg font-bold text-gray-200 transition-all hover:border-white hover:bg-white/10"
              >
                Explore Machines
              </a>
            </div>

            {/* Trust Icons */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="flex items-center gap-3">
                <Shield className="h-10 w-10 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">ISO Certified</p>
                  <p className="font-semibold text-white">Quality Guaranteed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Wrench className="h-10 w-10 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">24/7 Support</p>
                  <p className="font-semibold text-white">Global Service Network</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Hero Image / Placeholder */}
          <div className="relative">
            <div className="aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl ring-4 ring-blue-500/50">
              {/* Replace with your actual machine hero image */}
              <img
                src="https://images.unsplash.com/photo-1581093458791-9d6c25f98a86?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
                alt="Clattron Heavy Machinery in action"
                className="h-full w-full object-cover object-center transform transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 px-6 py-3 shadow-2xl">
              <p className="text-sm font-bold text-white uppercase tracking-wider">
                Under Construction – Launching Soon
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 0L60 15L120 30L180 35L240 40L300 45L360 50L420 45L480 40L540 35L600 30L660 25L720 20L780 25L840 30L900 35L960 40L1020 35L1080 30L1140 25L1200 20L1260 25L1320 30L1380 35L1440 40V120H0V0Z"
            fill="#0f172a"
          />
        </svg>
      </div>
    </div>
  );
}