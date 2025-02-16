import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, BookOpen} from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import api from "../lib/axios";
import type { Flashcard } from "../types";

const cardColors = [
  "bg-red-400 dark:bg-red-900",
  "bg-green-400 dark:bg-green-900",
  "bg-blue-400 dark:bg-blue-900",
  "bg-yellow-400 dark:bg-yellow-900",
  "bg-purple-400 dark:bg-purple-900",
  "bg-pink-400 dark:bg-pink-900",
  "bg-teal-400 dark:bg-teal-900",
];

function Dashboard() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [formData, setFormData] = useState({ question: "", answer: "" });

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await api.get("/flashcards");
      setFlashcards(response.data);
    } catch (error) {
      toast.error("Failed to fetch flashcards");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCard) {
        await api.put(`/flashcards/${editingCard._id}`, formData);
        toast.success("Flashcard updated successfully");
      } else {
        const response = await api.post("/flashcards", formData);
        toast.success("Flashcard created successfully");
        setFlashcards((prev) => [...prev, response.data]);
      }
      setFormData({ question: "", answer: "" });
      setIsCreating(false);
      setEditingCard(null);
      fetchFlashcards();
    } catch (error) {
      toast.error(
        editingCard
          ? "Failed to update flashcard"
          : "Failed to create flashcard"
      );
    }
  };

  const handleDelete = async (_id: string) => {
    if (!window.confirm("Are you sure you want to delete this flashcard?"))
      return;
    try {
      await api.delete(`/flashcards/${_id}`);
      toast.success("Flashcard deleted successfully");
      setFlashcards((prev) => prev.filter((card) => card._id !== _id));
    } catch (error) {
      toast.error("Failed to delete flashcard");
    }
  };

  const handleEdit = (card: Flashcard) => {
    setEditingCard(card);
    setFormData({ question: card.question, answer: card.answer });
    setIsCreating(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Flashcards
        </h1>
        <button
          onClick={() => {
            setIsCreating(true);
            setEditingCard(null);
            setFormData({ question: "", answer: "" });
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Flashcard</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="card mb-8 p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="question"
                  className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Question
                </label>
                <textarea
                  id="question"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  className="input-primary mt-1"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="answer"
                  className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Answer
                </label>
                <textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  className="input-primary mt-1"
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingCard(null);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingCard ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {flashcards.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No flashcards
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating a new flashcard.
          </p>
        </motion.div>
      ) : (
        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {flashcards.map((card, index) => (
              <motion.div
                key={card._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`p-6 rounded-lg shadow-md transition-colors duration-300 ${
                  cardColors[index % cardColors.length]
                } text-gray-900 dark:text-gray-100`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {card.question}
                    </h3>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                      Box {card.box} • Next review:{" "}
                      {format(new Date(card.nextReviewDate), "PP")}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(card)}
                      className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(card._id)}
                      className="p-2 text-gray-600 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-black dark:!text-white">{card.answer}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;
