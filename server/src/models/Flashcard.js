import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    box: {
      type: Number,
      default: 1,
      min: 1,
      max: 6
    },
    nextReviewDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Function to calculate the next review date based on Leitner intervals
flashcardSchema.methods.calculateNextReviewDate = function () {
  const now = new Date();
  let daysToAdd = 0;

  switch (this.box) {
    case 1:
      daysToAdd = 0; // Review today
      break;
    case 2:
      daysToAdd = 1; // Review in 1 day
      break;
    case 3:
      daysToAdd = 3; // Review in 3 days
      break;
    case 4:
      daysToAdd = 7; // Review in 7 days
      break;
    case 5:
      daysToAdd = 15; // Review in 15 days
      break;
    case 6:
      daysToAdd = 30; // Review in 30 days
      break;
    default:
      daysToAdd = 0;
  }

  return new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
};

// Function to update the flashcard based on user's answer
flashcardSchema.methods.processReview = function (correct) {
  if (correct) {
    this.box = Math.min(this.box + 1, 6); // Move to next box (max box 6)
  } else {
    this.box = 1; // Reset to Box 1 if answered incorrectly
  }

  this.nextReviewDate = this.calculateNextReviewDate();
};

export default mongoose.model('Flashcard', flashcardSchema);
