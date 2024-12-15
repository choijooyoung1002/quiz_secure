export interface Question {
  text: string;
  options: string[];
  correct: number;
}

export const questions: Question[] = [
  {
    text: "지정된 문서 분류 등급은?",
    options: ["대외비", "2급 비밀", "1급 비밀", "극비"],
    correct: 2
  },
  {
    text: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correct: 1
  },
  {
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    correct: 2
  },
  {
    text: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correct: 1
  }
];