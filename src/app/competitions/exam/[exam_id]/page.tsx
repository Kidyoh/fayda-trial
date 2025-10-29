"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  CompetitionAPI,
  ExamDetails,
  Question,
  ExamSubmissionRequest,
  Answer,
  handleApiError,
} from "@/lib/competitionAPI";
import { getAccessToken } from "@/lib/tokenManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";

const ExamInterfacePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const examId = params.exam_id as string;

  const [exam, setExam] = useState<ExamDetails | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExamDetails();
  }, [examId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const fetchExamDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getAccessToken();
      if (!token) {
        router.push("/login");
        return;
      }

      console.log("Fetching exam details for:", examId);
      console.log("Using token:", token ? "Token present" : "No token");

      const response = await CompetitionAPI.getExamDetails(examId, token);

      if (response.success) {
        console.log("Exam data received:", response.exam);
        setExam(response.exam);
        setTimeLeft(response.exam.timeRemaining);
      } else {
        setError("Failed to fetch exam details");
      }
    } catch (err) {
      console.error("Error fetching exam details:", err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, choice: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: choice,
    }));
  };

  const handleSubmit = async () => {
    if (!exam) return;

    try {
      setSubmitting(true);
      const token = getAccessToken();

      if (!token) {
        router.push("/login");
        return;
      }

      // First check if user has access to this exam
      console.log("Checking exam access for:", examId);
      const accessCheck = await CompetitionAPI.checkExamAccess(examId, token);
      console.log("Exam access check result:", accessCheck);

      if (!accessCheck.success || !accessCheck.hasAccess) {
        setError(
          accessCheck.message ||
            "You do not have access to this exam. Please make sure you are registered for the competition.",
        );
        return;
      }

      const answerArray: Answer[] = exam.questions.map((q) => ({
        questionId: q.id,
        selectedChoice: answers[q.id] || "",
        timeSpent: 0, // Calculate per question if needed
      }));

      const submissionData: ExamSubmissionRequest = {
        examIdCode: examId,
        timeSpent: exam.duration * 60 - timeLeft,
        answers: answerArray,
      };

      console.log("Submitting exam with data:", {
        examId,
        submissionData,
        token: token
          ? `Token present (${token.substring(0, 20)}...)`
          : "No token",
      });

      const response = await CompetitionAPI.submitExamAnswers(
        examId,
        submissionData,
        token,
      );

      console.log("Submit response:", response);

      if (response.success) {
        router.push(`/competitions/exam/${examId}/results`);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error("Error submitting exam:", err);
      setError(handleApiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const getAnsweredCount = () => {
    return Object.values(answers).filter((answer) => answer !== "").length;
  };

  const isQuestionAnswered = (questionId: string) => {
    return answers[questionId] && answers[questionId] !== "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-8"></div>
            <div className="h-96 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen bg-gray-50 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-800 mb-4">{error || "Exam not found"}</p>
              <Button
                onClick={() => router.push("/competitions")}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Back to Competitions
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = exam.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>
              <p className="text-gray-600">{exam.description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-lg font-mono text-red-600">
                <Clock className="w-5 h-5" />
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-500">Time Remaining</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                Question {currentQuestion + 1} of {exam.totalQuestions}
              </span>
              <span>{getAnsweredCount()} answered</span>
            </div>
            <Progress
              value={((currentQuestion + 1) / exam.totalQuestions) * 100}
              className="h-2"
            />
          </div>

          {/* Question Navigation */}
          <div className="flex flex-wrap gap-2">
            {exam.questions.map((_, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? "bg-blue-500 text-white"
                    : isQuestionAnswered(exam.questions[index].id)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">
              Question {currentQ.questionIndex}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Question Text */}
              <div>
                <p className="text-lg text-gray-900 mb-4">
                  {currentQ.question}
                </p>
                {currentQ.questionImage && (
                  <img
                    src={currentQ.questionImage}
                    alt="Question"
                    className="max-w-full h-auto rounded-lg border"
                  />
                )}
              </div>

              {/* Answer Choices */}
              <div className="space-y-3">
                {["A", "B", "C", "D"].map((choice) => (
                  <label
                    key={choice}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      answers[currentQ.id] === choice
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQ.id}`}
                      value={choice}
                      checked={answers[currentQ.id] === choice}
                      onChange={() => handleAnswerChange(currentQ.id, choice)}
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                        answers[currentQ.id] === choice
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {answers[currentQ.id] === choice && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        {choice}.
                      </span>
                      <span className="ml-2 text-gray-900">
                        {currentQ[`choice${choice}` as keyof Question]}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {currentQuestion < exam.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestion((prev) => prev + 1)}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Submitting..." : "Submit Exam"}
              </Button>
            )}
          </div>
        </div>

        {/* Warning Alert */}
        <Alert className="mt-6 border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Important:</strong> Make sure to answer all questions before
            submitting. Once submitted, you cannot change your answers.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ExamInterfacePage;
