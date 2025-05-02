"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Clock, Trophy, AlertTriangle, Brain, ArrowRight, Target, Book } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AssessmentDetails({ assessment_id, student_id }: any) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [previousAttempts, setPreviousAttempts] = useState<any[]>([]);
  const AssessmentId = assessment_id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assessmentRes, attemptsRes] = await Promise.all([
          fetch(`${apiUrl}/materials/${AssessmentId}`, {
            credentials: "include",
          }),
          fetch(`${apiUrl}/studentmaterial/attempts/${AssessmentId}/${student_id}`, {
            credentials: "include",
          })
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
  }, [AssessmentId, student_id]);

  const CheckAssessmentIfSeen = () => {
    const postData = {
      MaterialId: AssessmentId,
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
                <Trophy className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Best Score: {Math.max(...previousAttempts.map(a => a.score))}%</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                {previousAttempts.length} previous {previousAttempts.length === 1 ? 'attempt' : 'attempts'}
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
              <p className="text-xl font-semibold text-gray-900">{data?.assementId?.duration} minutes</p>
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
              <p className="text-xl font-semibold text-gray-900">{data?.assementId?.assesmentPoints} points</p>
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
              <p className="text-xl font-semibold text-gray-900">{data?.assementId?.totalQuestions || "Multiple"}</p>
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
            <p>Once you start the assessment, you must complete it within the allocated time.</p>
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
        </div>
      </div>

      {/* Start Button */}
      <div className="flex justify-center pt-4">
        <Link
          href={`/packages_access/assessment_questions/${data?.assementId?.id}`}
          onClick={CheckAssessmentIfSeen}
          className="inline-flex items-center gap-2 px-8 py-4 bg-primaryColor text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-primaryColor/90 transition-all hover:scale-105 hover:shadow-xl active:scale-100"
        >
          Start Assessment
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
