import React from "react";

export default function Features() {
  return (
    <section className="w-screeen bg-bg space-y-35">

      <section className="max-w-6xl h-screen mx-auto px-3 sm:px-6 py-12">
        <div className="mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Study smarter, not harder — no delays, just results.</h2>
          <p className="mt-6 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-7 text-muted font-medium tracking-tight">
            Transform your learning with AI-powered flashcards that adapt to your pace, track your progress, and help you master any subject faster than ever
            before.
          </p>
        </div>
        <div className="grid grid-cols-6 grid-rows-2 h-screen gap-10">
          <div className="col-span-2 border border-border rounded-2xl">
            <h4>AI Test Generation</h4>
            <p>Muted</p>
            <div>This div</div>
          </div>
          <div className="col-span-2 border border-border rounded-2xl"></div>
          <div className="col-span-2 border border-border rounded-2xl"></div>
          <div className="col-span-3 border border-border rounded-2xl"></div>
          <div className="col-span-3 border border-border rounded-2xl"></div>
        </div>
      </section>

      <section className="max-w-6xl h-screen mx-auto px-3 sm:px-6 py-12">
        <div className="mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Two Powerful Ways To Create Flashcards.</h2>
        </div>
        <div className="grid grid-cols-2 h-screen gap-10">
          <div className="border border-border rounded-2xl">
            <h4>AI Test Generation</h4>
            <p>Muted</p>
            <div>This div</div>
          </div>
          <div className="border border-border rounded-2xl"></div>
          
        </div>
      </section>
    </section>
  );
}
