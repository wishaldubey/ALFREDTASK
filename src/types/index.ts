export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Flashcard {
  _id: any;
  id: string;
  question: string;
  answer: string;
  box: number;
  nextReviewDate: string;
  createdAt: string;
  userId: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
