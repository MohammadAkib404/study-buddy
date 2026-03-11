import { useState } from "react";
import { getQuiz, getTopics } from "../../../Utilities/API_Connection";

export function useGenerator(filesData) {
  const [topics, setTopics] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [flashcards, setFlashcards] = useState(null);

  /**
   * Fetch the hierarchical topic tree from the backend.
   * This is the first step in the flow regardless of output type.
   */
  const generateTopics = async () => {
    if (!filesData[0]) return;
    // clear any previous results when a new source is uploaded
    setQuiz(null);
    setFlashcards(null);
    setTopics(await getTopics(filesData[0]));
  };

  const clearResults = () => {
    setQuiz(null);
    setFlashcards(null);
    setTopics(null);
  };

  /**
   * Helper that normalises whatever is passed in (Set/Array) to an array
   * and then delegates to the appropriate API call depending on `mode`.
   *
   * @param {Set|string[]} selectedTopics
   * @param {object} variator optional control object
   * @param {'quiz'|'flashcards'} mode
   */
  const generateByTopics = async (selectedTopics, variator = {}, mode = "quiz") => {
    if (!filesData[0]) return;

    const topicsArray = Array.isArray(selectedTopics) ? selectedTopics : Array.from(selectedTopics || []);

    if (mode === "quiz") {
      setQuiz(await getQuiz(filesData[0], topicsArray, variator));
      setFlashcards(null);
    } else if (mode === "flashcards") {
      // At the moment the server uses the same endpoint for flashcards;
      // if this changes we can call getMCQ or another helper here.
      setFlashcards(await getQuiz(filesData[0], topicsArray, variator));
      setQuiz(null);
    }
  };

  return { topics, quiz, flashcards, generateTopics, generateByTopics, clearResults };
}
