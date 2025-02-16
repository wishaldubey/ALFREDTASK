import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
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
}, {
  timestamps: true
});

// Calculate next review date based on box number
flashcardSchema.methods.calculateNextReviewDate = function() {
  const now = new Date();
  switch (this.box) {
    case 1: return now; // same day
    case 2: return new Date(now.setDate(now.getDate() + 1)); // 1 day
    case 3: return new Date(now.setDate(now.getDate() + 3)); // 3 days
    case 4: return new Date(now.setDate(now.getDate() + 7)); // 7 days
    case 5: return new Date(now.setDate(now.getDate() + 15)); // 15 days
    case 6: return new Date(now.setDate(now.getDate() + 30)); // 30 days
    default: return now;
  }
};

// Update box and next review date based on review result
flashcardSchema.methods.processReview = function(correct) {
  if (correct) {
    this.box = Math.min(this.box + 1, 6);
  } else {
    this.box = 1;
  }
  this.nextReviewDate = this.calculateNextReviewDate();
};

export default mongoose.model('Flashcard', flashcardSchema);