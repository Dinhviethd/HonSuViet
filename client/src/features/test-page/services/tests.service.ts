import api from "@/lib/api";
import type {
  ApiQuestion,
  ApiAnswer,
  ApiQuiz,
  ApiQuizAttempt,
  ApiQuizWithStats,
  ApiUserQuizStats,
  QuizQuestionWithAnswers,
} from "../schemas/tests.types";

export const testsService = {
  async getQuizzesWithStats(): Promise<ApiQuizWithStats[]> {
    const res = await api.get("/quiz/with-stats");
    return res.data.data;
  },

  async getUserAttempts(userId: string): Promise<ApiQuizAttempt[]> {
    const res = await api.get(`/quiz/attempts/user/${userId}`);
    return res.data.data;
  },

  async getUserQuizStats(userId: string): Promise<ApiUserQuizStats> {
    const res = await api.get(`/quiz/attempts/stats/user/${userId}`);
    return res.data.data;
  },

  async getTotalQuizzes(): Promise<number> {
    const res = await api.get("/quiz/stats");
    return res.data.data.totalQuizzes;
  },

  async getQuizById(quizId: string): Promise<ApiQuiz> {
    const res = await api.get(`/quiz/${quizId}`);
    return res.data.data;
  },

  async getQuestionsByQuizId(quizId: string): Promise<ApiQuestion[]> {
    const res = await api.get(`/quiz/${quizId}/questions`);
    return res.data.data;
  },

  async getAnswersByQuestionId(questionId: string): Promise<ApiAnswer[]> {
    const res = await api.get(`/quiz/questions/${questionId}/answers`);
    return res.data.data;
  },

  async getQuizQuestionsWithAnswers(quizId: string): Promise<QuizQuestionWithAnswers[]> {
    const questions = await this.getQuestionsByQuizId(quizId);
    const answersList = await Promise.all(
      questions.map((q) => this.getAnswersByQuestionId(q.idQuestion)),
    );

    return questions.map((question, index) => ({
      question,
      answers: answersList[index] ?? [],
    }));
  },

  async submitAttempt(payload: {
    idUser: string;
    idQuiz: string;
    answersData: Array<{ idQuestion: string; idAnswer: string | null }>;
    scorePercentage: number;
    correctAnswersCount: number;
  }): Promise<ApiQuizAttempt> {
    const res = await api.post("/quiz/attempts", {
      ...payload,
      status: "completed",
      completedAt: new Date().toISOString(),
    });
    return res.data.data;
  },
};
