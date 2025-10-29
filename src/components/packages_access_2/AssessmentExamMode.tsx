"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import {
  Brain,
  Clock,
  AlertTriangle,
  ArrowRight,
  Target,
  Book,
  Play,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AssessmentExam from "./AssessmentExam";
import ShowResult from "../../app/(learning)/assessment_questions/show_result";

interface AssessmentExamModeProps {
  assessmentId: string;
  studentId: string;
}

export default function AssessmentExamMode({
  assessmentId,
  studentId,
}: AssessmentExamModeProps) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [examMode, setExamMode] = useState(false);
  const [examResult, setExamResult] = useState<any>(null);
  const [previousAttempts, setPreviousAttempts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assessmentRes, attemptsRes] = await Promise.all([
          fetch(`${apiUrl}/materials/${assessmentId}`, {
            credentials: "include",
          }),
          fetch(
            `${apiUrl}/studentmaterial/attempts/${assessmentId}/${studentId}`,
            {
              credentials: "include",
            },
          ),
        ]);

        const assessmentData = await assessmentRes.json();
        const attemptsData = await attemptsRes.json();

        setData(assessmentData);
        setPreviousAttempts(attemptsData || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [assessmentId, studentId]);

  const CheckAssessmentIfSeen = () => {
    const postData = {
      MaterialId: assessmentId,
    };

    fetch(`${apiUrl}/studentmaterial/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
  };

  const startExam = () => {
    CheckAssessmentIfSeen();
    setExamMode(true);
  };

  const handleExamComplete = (result: any) => {
    setExamResult(result);
    setExamMode(false);
  };

  const handleExitExam = () => {
    setExamMode(false);
  };

  const retakeExam = () => {
    setExamResult(null);
    setExamMode(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Brain size={40} className="text-primaryColor animate-bounce" />
          <p className="text-gray-500 font-medium">Loading assessment...</p>
        </div>
      </div>
    );
  }

  // If exam is in progress, show the exam interface
  if (examMode) {
    return (
      <AssessmentExam
        assessmentId={assessmentId}
        onComplete={handleExamComplete}
        onExit={handleExitExam}
      />
    );
  }

  // If exam is completed, show results
  if (examResult) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Assessment Results
          </h2>
          <Button
            onClick={retakeExam}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Retake Assessment
          </Button>
        </div>

        <ShowResult
          reslultText={examResult.message}
          incorrectquestions={examResult.incorrectQuestionNumbers || []}
          questions={examResult.questions || []}
        />
      </div>
    );
  }

  // Show assessment preview/start screen
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Brain className="h-8 w-8 text-primaryColor" />
              {data?.assementId?.assesmentTitle}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {data?.assementId?.assesmentDescription}
            </p>
          </div>
          {previousAttempts.length > 0 && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">
                  Best Score:{" "}
                  {Math.max(...previousAttempts.map((a) => a.score))}%
                </span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                {previousAttempts.length} previous{" "}
                {previousAttempts.length === 1 ? "attempt" : "attempts"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Assessment Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Duration</p>
              <p className="text-xl font-semibold text-gray-900">
                {data?.assementId?.duration} minutes
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Points</p>
              <p className="text-xl font-semibold text-gray-900">
                {data?.assementId?.assesmentPoints} points
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Book className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Questions</p>
              <p className="text-xl font-semibold text-gray-900">
                {data?.assementId?.totalQuestions || "Multiple"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Important Information
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-600">
            <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
              <span className="text-amber-700 text-sm font-medium">1</span>
            </div>
            <p>
              Once you start the assessment, you must complete it within the
              allocated time.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600">
            <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
              <span className="text-amber-700 text-sm font-medium">2</span>
            </div>
            <p>Ensure you have a stable internet connection before starting.</p>
          </div>
          <div className="flex items-start gap-3 text-gray-600">
            <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
              <span className="text-amber-700 text-sm font-medium">3</span>
            </div>
            <p>All questions must be answered to submit the assessment.</p>
          </div>
          <div className="flex items-start gap-3 text-gray-600">
            <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
              <span className="text-amber-700 text-sm font-medium">4</span>
            </div>
            <p>
              You can flag questions for review and navigate between questions
              freely.
            </p>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={startExam}
          className="inline-flex items-center gap-2 px-8 py-4 bg-primaryColor text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-primaryColor/90 transition-all hover:scale-105 hover:shadow-xl active:scale-100"
        >
          <Play className="h-5 w-5" />
          Start Assessment
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
