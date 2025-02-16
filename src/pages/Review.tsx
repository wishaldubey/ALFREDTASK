import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ThumbsUp, ThumbsDown } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import type { Flashcard } from "../types";

// Function to convert UTC date to IST
const convertToIST = (utcDate: string) => {
  const date = new Date(utcDate);
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  return new Date(date.getTime() + istOffset);
};

function Review() {
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dueCount, setDueCount] = useState(0);

  // Fetch the next card due for review
  const fetchNextCard = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/flashcards/next");
      let { card, dueCount: count } = response.data;

      console.log("Fetched card:", card);
      console.log("Cards due:", count);

      if (card && card._id) {
        card = { ...card, id: card._id };

        // Convert `nextReviewDate` from UTC to IST
        const nextReviewDateIST = convertToIST(card.nextReviewDate);
        const todayIST = new Date();

        // Remove time part from the date for accurate comparison
        todayIST.setHours(0, 0, 0, 0);
        nextReviewDateIST.setHours(0, 0, 0, 0);

        if (nextReviewDateIST <= todayIST) {
          setCurrentCard(card);
        } else {
          setCurrentCard(null);
        }
      } else {
        setCurrentCard(null);
      }

      setDueCount(count);
    } catch (error) {
      toast.error("Failed to fetch next card");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchNextCard();
  }, []);

  // Handle card review (correct/incorrect)
  const handleResponse = async (correct: boolean) => {
    if (!currentCard || !currentCard.id) {
      toast.error("Invalid card data");
      console.error("Error: currentCard is null or missing id", currentCard);
      return;
    }

    try {
      await api.post(`/flashcards/${currentCard.id}/review`, { correct });
      toast.success(correct ? "Great job!" : "Keep practicing!");
      setShowAnswer(false);
      fetchNextCard(); // ✅ Fetch next card after reviewing
    } catch (error) {
      toast.error("Failed to update card progress");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // No cards left for review
  if (!currentCard) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center py-12"
      >
        <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
          No cards due for review
        </h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Great job! You've completed all your reviews for now.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Review Cards
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {dueCount} card{dueCount !== 1 ? "s" : ""} left to review today
        </p>
      </motion.div>

      <motion.div
        key={currentCard.id} // ✅ Use id (mapped from _id)
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="card"
      >
        <div className="p-6">
          <div className="min-h-[200px] flex items-center justify-center">
            <h2 className="text-xl text-gray-900 dark:text-white text-center">
              {currentCard.question}
            </h2>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="min-h-[100px] flex items-center justify-center">
                  <p className="text-gray-700 dark:text-gray-300 text-center">
                    {currentCard.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="btn-primary w-full"
            >
              Show Answer
            </button>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={() => handleResponse(false)}
                className="flex-1 flex items-center justify-center btn-primary bg-red-600 hover:bg-red-700 focus:ring-red-500"
              >
                <ThumbsDown className="w-5 h-5 mr-2" />
                Got it Wrong
              </button>
              <button
                onClick={() => handleResponse(true)}
                className="flex-1 flex items-center justify-center btn-primary bg-green-600 hover:bg-green-700 focus:ring-green-500"
              >
                <ThumbsUp className="w-5 h-5 mr-2" />
                Got it Right
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Review;
