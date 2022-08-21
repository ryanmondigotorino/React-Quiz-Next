
export interface Choices {
  description: string;
  isAnswer: boolean;
}

export interface Questions {
  question: string;
  type: boolean;
  choices: Array<Choices>;
}

export interface QuizPost {
  title: string;
  questions: Array<Questions>
}
