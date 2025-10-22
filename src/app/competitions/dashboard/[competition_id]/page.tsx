"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  CompetitionAPI,
  CompetitionDashboard,
  Exam,
  handleApiError,
} from "@/lib/competitionAPI";
import { getAccessToken } from "@/lib/tokenManager";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar,
  Clock,
  Trophy,
  Users,
  CheckCircle,
  AlertCircle,
  Lock,
  Play,
  Eye,
  ArrowLeft,
} from "lucide-react";
import {
  formatCompetitionDate,
  formatCompetitionTime,
} from "@/lib/competitionAPI";
import CountdownTimer from "@/components/competitions/CountdownTimer";

const CompetitionDashboardPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const competitionId = params.competition_id as string;

  const [dashboard, setDashboard] = useState<CompetitionDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, [competitionId]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getAccessToken();
      if (!token) {
        router.push("/login");
        return;
      }

      console.log("Fetching dashboard for competition:", competitionId);
      console.log(
        "Using token:",
        token ? `Token present (${token.substring(0, 20)}...)` : "No token",
      );
      console.log("Token length:", token ? token.length : 0);

      const response = await CompetitionAPI.getCompetitionDashboard(
        competitionId,
        token,
      );

      if (response.success) {
        console.log("Dashboard data received:", response.data);
        setDashboard(response.data);
      } else {
        console.error("API returned success: false", response);
        setError("Failed to fetch competition dashboard");
      }
    } catch (err) {
      console.error("Error fetching competition dashboard:", err);
      const errorMessage = handleApiError(err);

      // Check if the error is about not being registered
      if (
        errorMessage.includes("Not registered") ||
        errorMessage.includes("not registered")
      ) {
        setError(
          'You need to apply for this competition first. Please go back to the competition page and click "Apply Now".',
        );
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStartExam = (examId: string) => {
    router.push(`/competitions/exam/${examId}`);
  };

  const handleViewResults = (examId: string) => {
    router.push(`/competitions/exam/${examId}/results`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "locked":
        return "🔒";
      case "active":
        return "✅";
      case "completed":
        return "✅";
      case "closed":
        return "⛔";
      default:
        return "❓";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "locked":
        return "border-gray-300 bg-gray-50";
      case "active":
        return "border-green-300 bg-green-50";
      case "completed":
        return "border-blue-300 bg-blue-50";
      case "closed":
        return "border-red-300 bg-red-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const ExamStatusCard: React.FC<{ exam: Exam }> = ({ exam }) => (
    <div
      className={`h-full transition-all duration-300 hover:shadow-lg bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-[#c7cc3f]/20 ${getStatusColor(exam.status || "locked")}`}
    >
      <div className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-[#07705d]">{exam.title}</h3>
          <span className={`status-icon text-2xl`}>
            {getStatusIcon(exam.status || "locked")}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span className="bg-[#c7cc3f]/20 text-[#07705d] px-3 py-1 rounded-full font-medium">
            Day {exam.day}
          </span>
        </div>
      </div>

      <div className="pb-4">
        <div className="space-y-3">
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 text-[#c7cc3f]" />
            <span>
              {formatCompetitionDate(exam.scheduledDateTime)} at{" "}
              {formatCompetitionTime(exam.scheduledDateTime)}
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="w-4 h-4 text-[#c7cc3f]" />
            <span>{exam.duration} minutes</span>
          </div>

          {/* Questions */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Trophy className="w-4 h-4 text-[#c7cc3f]" />
            <span>{exam.totalQuestions} questions</span>
          </div>
        </div>

        {/* Countdown Timer */}
        {exam.status === "locked" && exam.countdownDisplay && (
          <div className="mt-4">
            <CountdownTimer
              examStatus={exam}
              onTimeUp={() => window.location.reload()}
            />
          </div>
        )}

        {/* Active Exam Timer */}
        {exam.status === "active" && (
          <div className="mt-4">
            <CountdownTimer
              examStatus={exam}
              onTimeUp={() => window.location.reload()}
            />
          </div>
        )}

        {/* Results Display */}
        {exam.status === "completed" && exam.submission && (
          <div className="mt-4 p-3 bg-[#c7cc3f]/10 rounded-lg border border-[#c7cc3f]/20">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-[#07705d]">
                  Score: {exam.submission.score}/
                  {exam.submission.totalQuestions}
                </p>
                <p className="text-xs text-gray-600">
                  Time: {Math.floor(exam.submission.timeSpent / 60)}m{" "}
                  {exam.submission.timeSpent % 60}s
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleViewResults(exam.id)}
                className="border-[#c7cc3f] text-[#07705d] hover:bg-[#c7cc3f]/10"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Results
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="pt-0">
        {exam.status === "active" && (
          <Button
            className="w-full bg-gradient-to-r from-[#07705d] to-[#c7cc3f] hover:from-[#07705d]/90 hover:to-[#c7cc3f]/90 text-white font-semibold"
            onClick={() => handleStartExam(exam.id)}
          >
            <Play className="w-4 h-4 mr-2" />
            Enter Exam
          </Button>
        )}

        {exam.status === "locked" && (
          <Button
            disabled
            className="w-full bg-gray-400 text-white cursor-not-allowed"
          >
            <Lock className="w-4 h-4 mr-2" />
            Exam Locked
          </Button>
        )}

        {exam.status === "closed" && (
          <Button
            disabled
            className="w-full bg-red-400 text-white cursor-not-allowed"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Exam Closed
          </Button>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section Skeleton */}
        <section className="relative pt-20 bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center text-white pb-16 md:pt-24">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto px-6 z-10 relative">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse">
                <div className="h-16 bg-white/20 rounded-lg mb-6"></div>
                <div className="h-8 bg-white/20 rounded-lg w-2/3 mx-auto mb-8"></div>
                <div className="h-12 bg-white/20 rounded-lg w-1/3 mx-auto"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Skeleton */}
        <div className="container mx-auto px-6 pb-16 relative z-10">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-80 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative pt-20 bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center text-white pb-16 md:pt-24">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto px-6 z-10 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-center">
                Competition Dashboard
              </h1>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <p className="text-white mb-6 text-lg">
                  {error || "Dashboard not found"}
                </p>
                <Button
                  onClick={() => router.push("/competitions")}
                  className="bg-white text-red-600 hover:bg-white/90 font-semibold px-6 py-3 rounded-2xl"
                >
                  Back to Competitions
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-20 bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center text-white pb-16 md:pt-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-6 z-10 relative">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-8">
              <Button
                variant="outline"
                onClick={() => router.push("/competitions")}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Competitions
              </Button>
            </div>

            {/* Competition Title */}
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-center">
              {dashboard.competition.title}
            </h1>

            {/* Competition Info */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-lg">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#c7cc3f]" />
                <span>Grade {dashboard.competition.grade}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#c7cc3f]" />
                <span>Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#c7cc3f]" />
                <span>{dashboard.competition.status}</span>
              </div>
            </div>

            {/* Glassmorphism Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <Trophy className="w-8 h-8 text-[#c7cc3f] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  #{dashboard.leaderboard.rank}
                </div>
                <div className="text-sm text-white/80">Current Rank</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <CheckCircle className="w-8 h-8 text-[#c7cc3f] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {dashboard.leaderboard.totalScore}
                </div>
                <div className="text-sm text-white/80">Total Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <Clock className="w-8 h-8 text-[#c7cc3f] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {dashboard.completedExams}/{dashboard.totalExams}
                </div>
                <div className="text-sm text-white/80">Exams Done</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <Calendar className="w-8 h-8 text-[#c7cc3f] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {Math.floor(dashboard.leaderboard.totalTimeSpent / 60)}m
                </div>
                <div className="text-sm text-white/80">Time Spent</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-16 relative z-10">
        {/* Registration Info */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-[#c7cc3f]/30 shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-[#07705d] mb-6">
            Registration Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#07705d] rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700 text-lg">
                Exam ID:{" "}
                <strong className="text-[#07705d]">
                  {dashboard.registration.examId}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#07705d] rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700 text-lg">
                Registered:{" "}
                {formatCompetitionDate(dashboard.registration.registeredAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Exam Status Cards */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-[#c7cc3f]/30 shadow-lg">
            <h2 className="text-3xl font-bold text-[#07705d] mb-6">
              Exam Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboard.examStatus.map((exam) => (
                <ExamStatusCard key={exam.id} exam={exam} />
              ))}
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-[#c7cc3f]/30 shadow-lg">
          <h2 className="text-3xl font-bold text-[#07705d] mb-6">
            Your Performance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-[#c7cc3f]/20 text-center">
              <Trophy className="w-8 h-8 text-[#c7cc3f] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#07705d] mb-2">
                #{dashboard.leaderboard.rank}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Current Rank
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-[#c7cc3f]/20 text-center">
              <CheckCircle className="w-8 h-8 text-[#c7cc3f] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#07705d] mb-2">
                {dashboard.leaderboard.totalScore}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Total Score
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-[#c7cc3f]/20 text-center">
              <Clock className="w-8 h-8 text-[#c7cc3f] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#07705d] mb-2">
                {Math.floor(dashboard.leaderboard.totalTimeSpent / 60)}m
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Time Spent
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-[#c7cc3f]/20 text-center">
              <Users className="w-8 h-8 text-[#c7cc3f] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#07705d] mb-2">
                {dashboard.leaderboard.examsCompleted}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Exams Done
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDashboardPage;
