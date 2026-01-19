import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate();

  return (
      <main id="home" className="pb-10 bg-bg pt-42">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pb-20 text-center">
          <span className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-layer/40 px-5 py-2.5 text-xs uppercase tracking-widest font-mono text-muted font-bold">Villain Arc: <span className="text-primary font-bold">Active</span>
          </span>

          <h1 className="mx-auto w-full sm:max-w-3xl md:max-w-[55rem] px-2 sm:text-6xl md:text-[5.5rem] lg:text-[90px] font-extrabold tracking-tighter italic text-primary">
            <span className="block text-transparent text-stroke opacity-40">Stop Studying,</span>
            <span className="block text-primary mt-2">Start Dominating</span>
          </h1>

          <p className="mt-6 max-w-lg mx-auto text-sm sm:text-base md:text-lg leading-7 text-muted font-semibold tracking-tight">
            Average students work hard. Join the platform designed for the <span className="text-primary font-bold">Top 1%</span>
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
            <button onClick={() => navigate("/register")} className="group cursor-pointer rounded-xl bg-black px-10 py-3 text-sm font-bold uppercase tracking-wider text-white">Try Now</button>
            <button className="rounded-xl px-5 py-3 text-sm font-bold uppercase tracking-wider border border-zinc-700 text-zinc-700 hover:bg-zinc-100 transition-colors"> View Archive →</button>
          </div>
        </div>

        <div className="w-screen px-3 sm:px-8 pb-12">
          <img src="./hero_image.png" alt="app" className="max-w-6xl w-screen mx-auto" />
        </div>
      </main>
  );
}

export default Hero;
