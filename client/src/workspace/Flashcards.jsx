import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function Flashcards({ data }) {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!data || data.length === 0) return null;

  const card = data[index];

  const nextCard = () => {
    setShowAnswer(false);
    setIndex((i) => Math.min(i + 1, data.length - 1));
  };

  const prevCard = () => {
    setShowAnswer(false);
    setIndex((i) => Math.max(i - 1, 0));
  };

  return (
    <section className="sm:p-5">
      <Sidebar />
      <div className="sm:border-1 rounded-2xl max-w-3xl px-6 sm:px-8 py-10 m-auto text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Flashcards</h2>
        <div className="border p-6 rounded-lg mb-4">
          <p className="text-lg font-medium">{card.question}</p>
          {showAnswer && <p className="mt-4 text-green-600 font-semibold">Answer: {card.options[card.ans]}</p>}
        </div>
        <div className="flex justify-between gap-4">
          <button onClick={prevCard} disabled={index === 0} className="px-4 py-2 bg-brand rounded-lg text-white">
            Previous
          </button>
          <button onClick={() => setShowAnswer((v) => !v)} className="px-4 py-2 bg-primary rounded-lg text-white">
            {showAnswer ? "Hide" : "Show"} answer
          </button>
          <button onClick={nextCard} disabled={index === data.length - 1} className="px-4 py-2 bg-brand rounded-lg text-white">
            Next
          </button>
        </div>
        <p className="mt-4 text-muted">
          {index + 1} / {data.length}
        </p>
      </div>
    </section>
  );
}
