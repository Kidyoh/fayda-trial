"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  CompetitionAPI,
  ExamResults,
  QuestionResult,
  handleApiError,
} from "@/lib/competitionAPI";
import { getAccessToken } from "@/lib/tokenManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  Eye,
  EyeOff,
} from "lucide-react";

const ExamResultsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const examId = params.exam_id as string;

  const [results, setResults] = useState<ExamResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    fetchExamResults();
  }, [examId]);

  const fetchExamResults = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getAccessToken();
      if (!token) {
        router.push("/login");
        return;
      }

      console.log("Fetching exam results for:", examId);
      console.log("Using token:", token ? "Token present" : "No token");

      const response = await CompetitionAPI.getExamResults(examId, token);

      if (response.success) {
        console.log("Exam results received:", response.data);
        setResults(response.data);
      } else {
        setError("Failed to fetch exam results");
      }
    } catch (err) {
      console.error("Error fetching exam results:", err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBadgeColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-100 text-green-800";
    if (percentage >= 70) return "bg-yellow-100 text-yellow-800";
    if (percentage >= 50) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-32 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen bg-gray-50 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-800 mb-4">
                {error || "Results not found"}
              </p>
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

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => router.push("/competitions")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Competitions
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Exam Results</h1>
            <p className="text-gray-600">
              {results.exam.title} • Day {results.exam.day}
            </p>
          </div>
        </div>

        {/* Score Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Your Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div
                  className={`text-4xl font-bold mb-2 ${getScoreColor(results.submission.percentage)}`}
                >
                  {results.submission.score}/{results.submission.totalQuestions}
                </div>
                <div className="text-gray-600">Correct Answers</div>
              </div>

              <div className="text-center">
                <div
                  className={`text-4xl font-bold mb-2 ${getScoreColor(results.submission.percentage)}`}
                >
                  {results.submission.percentage}%
                </div>
                <div className="text-gray-600">Percentage</div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {formatTime(results.submission.timeSpent)}
                </div>
                <div className="text-gray-600">Time Taken</div>
              </div>

              <div className="text-center">
                <Badge
                  className={`text-lg px-4 py-2 ${getScoreBadgeColor(results.submission.percentage)}`}
                >
                  {results.submission.percentage >= 90
                    ? "Excellent"
                    : results.submission.percentage >= 70
                      ? "Good"
                      : results.submission.percentage >= 50
                        ? "Average"
                        : "Needs Improvement"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Toggle Answers Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setShowAnswers(!showAnswers)}
            variant="outline"
            className="flex items-center gap-2"
          >
            {showAnswers ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            {showAnswers ? "Hide" : "Show"} Answer Review
          </Button>
        </div>

        {/* Answer Review */}
        {showAnswers && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Answer Review</h2>

            {results.results.map((result, index) => (
              <Card
                key={index}
                className={`${
                  result.isCorrect
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">
                      Question {result.questionIndex}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {result.isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                      <Badge
                        className={
                          result.isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {result.isCorrect ? "Correct" : "Incorrect"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Question */}
                  <div>
                    <p className="text-gray-900 font-medium mb-2">
                      {result.question}
                    </p>
                    {result.questionImage && (
                      <img
                        src={result.questionImage}
                        alt="Question"
                        className="max-w-full h-auto rounded-lg border"
                      />
                    )}
                  </div>

                  {/* Answer Choices */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(result.choices).map(([choice, text]) => (
                      <div
                        key={choice}
                        className={`p-3 rounded-lg border ${
                          choice === result.correctChoice
                            ? "border-green-500 bg-green-100"
                            : choice === result.selectedChoice &&
                                !result.isCorrect
                              ? "border-red-500 bg-red-100"
                              : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{choice}.</span>
                          <span>{text}</span>
                          {choice === result.correctChoice && (
                            <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                          )}
                          {choice === result.selectedChoice &&
                            !result.isCorrect && (
                              <XCircle className="w-4 h-4 text-red-500 ml-auto" />
                            )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* User's Answer vs Correct Answer */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Your Answer:
                      </p>
                      <Badge
                        className={
                          result.isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {result.selectedChoice}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Correct Answer:
                      </p>
                      <Badge className="bg-green-100 text-green-800">
                        {result.correctChoice}
                      </Badge>
                    </div>
                  </div>

                  {/* Explanation */}
                  {result.explanation && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-2">
                        Explanation:
                      </p>
                      <p className="text-blue-800">{result.explanation}</p>
                      {result.explanationImage && (
                        <img
                          src={result.explanationImage}
                          alt="Explanation"
                          className="max-w-full h-auto rounded-lg border mt-2"
                        />
                      )}
                    </div>
                  )}

                  {/* Time Spent */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Time spent: {formatTime(result.timeSpent)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={() => router.push("/competitions")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            Back to Competitions
          </Button>

          <Button
            onClick={() =>
              router.push(`/competitions/dashboard/${results.competition.id}`)
            }
            className="flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamResultsPage;
