import { apiUrl } from "@/apiConfig";

// Competition Types
export interface Competition {
  id: string;
  title: string;
  description: string;
  grade: "9" | "10";
  competitionType: "one-time" | "tournament";
  status: "upcoming" | "active" | "completed" | "cancelled";
  startDate: string;
  endDate: string;
  totalPrizes: string;
  thumbnail?: string;
  registrationCount: number;
  examCount?: number;
  prizes: Prize[];
  sponsors: Sponsor[];
}

export interface CompetitionDetail extends Competition {
  exams: Exam[];
  isRegistered: boolean;
  userRegistration: UserRegistration | null;
  buttonState:
    | "not_logged_in"
    | "needs_package"
    | "can_apply"
    | "already_applied";
  buttonText: string;
  buttonAction: "login" | "package" | "apply" | "dashboard";
  requiresPackage: boolean;
  packageValid: boolean;
  packageGrade: string | null;
}

export interface Exam {
  id: string;
  title: string;
  day: number;
  scheduledDateTime: string;
  duration: number; // in minutes
  totalQuestions: number;
  status?: "locked" | "active" | "completed" | "closed";
  timeRemaining?: number; // in seconds
  countdownDisplay?: string;
  examStart?: string;
  examEnd?: string;
  submission?: ExamSubmission | null;
}

export interface ExamSubmission {
  score: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  submittedAt: string;
}

export interface Prize {
  rank: number;
  prizeName: string;
  description: string;
  image: string;
  value: string;
}

export interface Sponsor {
  name: string;
  logo: string;
  website: string;
}

export interface UserPackage {
  id: string;
  packageName: string;
  packageDescription: string;
  price: number;
  imgUrl: string;
  tag: string;
  courses?: any[];
  purchasedAt?: string;
  expiryDate?: string;
  isActive?: boolean;
}

export interface UserRegistration {
  id: string;
  examId: string;
  registeredAt: string;
}

export interface CompetitionDashboard {
  registration: {
    examId: string;
    registeredAt: string;
  };
  competition: {
    id: string;
    title: string;
    grade: string;
    status: string;
  };
  examStatus: Exam[];
  leaderboard: {
    rank: number;
    totalScore: number;
    totalTimeSpent: number;
    examsCompleted: number;
  };
  totalExams: number;
  completedExams: number;
}

export interface ExamDetails {
  id: string;
  title: string;
  description: string;
  day: number;
  duration: number;
  totalQuestions: number;
  timeRemaining: number;
  questions: Question[];
}

export interface Question {
  id: string;
  questionIndex: number;
  question: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  questionImage?: string;
}

export interface ExamSubmissionRequest {
  examIdCode: string;
  timeSpent: number;
  answers: Answer[];
}

export interface Answer {
  questionId: string;
  selectedChoice: string;
  timeSpent: number;
}

export interface ExamSubmissionResponse {
  success: boolean;
  message: string;
  submission: {
    id: string;
    score: number;
    totalQuestions: number;
    timeSpent: number;
    submittedAt: string;
    percentage: number;
  };
}

export interface ExamResults {
  submission: {
    score: number;
    totalQuestions: number;
    timeSpent: number;
    submittedAt: string;
    percentage: number;
  };
  exam: {
    title: string;
    day: number;
  };
  competition: {
    id: string;
    title: string;
  };
  results: QuestionResult[];
}

export interface QuestionResult {
  questionIndex: number;
  question: string;
  questionImage?: string;
  choices: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  selectedChoice: string;
  correctChoice: string;
  isCorrect: boolean;
  explanation: string;
  explanationImage?: string;
  timeSpent: number;
}

export interface ExamSection {
  id: string;
  title: string;
  day: number;
  scheduledDateTime: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  totalQuestions: number;
  questionCount: number;
  status: "locked" | "active" | "completed" | "closed" | "available";
  timeRemaining: number;
  countdownDisplay: string;
  examStart: string;
  examEnd: string;
  description: string;
  thumbnailImage: string;
  topics: string[];
  submission: {
    score: number;
    totalQuestions: number;
    timeSpent: number;
    submittedAt: string;
  } | null;
}

export interface CompetitionEnrollment {
  id: string;
  competitionId: string;
  studentId: string;
  enrolledAt: string;
  examId: string;
  status: "active" | "completed" | "withdrawn";
}

export interface LeaderboardEntry {
  rank: number;
  totalScore: number;
  totalTimeSpent: number;
  examsCompleted: number;
  student: {
    firstName: string;
    lastName: string;
    gread: string;
    schoolName: string;
    profilePicture?: string;
  };
}

export interface LeaderboardResponse {
  success: boolean;
  leaderboard: LeaderboardEntry[];
  userRank?: {
    rank: number;
    totalScore: number;
    totalTimeSpent: number;
    examsCompleted: number;
  };
  totalParticipants: number;
}

// Utility Types
export type CompetitionStatus =
  | "upcoming"
  | "active"
  | "completed"
  | "cancelled";
export type CompetitionType = "one-time" | "tournament";
export type Grade = "9" | "10";
export type ExamStatus = "locked" | "active" | "completed" | "closed";

// API Functions
export class CompetitionAPI {
  /**
   * Get list of competitions with optional filters
   */
  static async getCompetitions(
    params: {
      status?: "upcoming" | "active" | "completed" | "cancelled";
      grade?: "9" | "10";
      type?: "one-time" | "tournament";
    } = {},
  ): Promise<{ success: boolean; competitions: Competition[] }> {
    try {
      const queryParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(
        `${apiUrl}/competitions?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch competitions");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching competitions:", error);
      throw error;
    }
  }

  /**
   * Get competition details by ID
   */
  static async getCompetitionDetail(
    competitionId: string,
    accessToken?: string,
  ): Promise<{ success: boolean; competition: CompetitionDetail }> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      console.log("API: Fetching competition details for:", competitionId);
      console.log(
        "API: Authorization header:",
        accessToken ? `Bearer ${accessToken.substring(0, 20)}...` : "No token",
      );

      const response = await fetch(`${apiUrl}/competitions/${competitionId}`, {
        method: "GET",
        headers,
      });

      console.log("API: Response status:", response.status);
      console.log(
        "API: Response headers:",
        Object.fromEntries(response.headers.entries()),
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("API: Error response data:", errorData);
        throw new Error(
          errorData.message || "Failed to fetch competition details",
        );
      }

      const result = await response.json();
      console.log("API: Success response data:", result);
      return result;
    } catch (error) {
      console.error("Error fetching competition details:", error);
      throw error;
    }
  }

  /**
   * Apply for competition
   */
  static async applyForCompetition(
    competitionId: string,
    accessToken: string,
  ): Promise<{
    success: boolean;
    message: string;
    examId?: string;
    registration?: UserRegistration;
    requiresPackage?: boolean;
    grade?: string | null;
    notifications?: {
      email: boolean;
      sms: boolean;
      errors: {
        email: string | null;
        sms: string | null;
      };
    };
  }> {
    try {
      console.log(
        `Making API call to: ${apiUrl}/competitions/${competitionId}/apply`,
      );
      console.log(
        `Authorization header: Bearer ${accessToken.substring(0, 20)}...`,
      );

      const response = await fetch(
        `${apiUrl}/competitions/${competitionId}/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log(`Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP ${response.status}: ${response.statusText}`,
        }));
        console.error("API Error Response:", errorData);

        // Return the error response instead of throwing
        return {
          success: false,
          message:
            errorData.message ||
            `Failed to apply for competition: ${response.status} ${response.statusText}`,
          requiresPackage: errorData.requiresPackage || false,
          grade: errorData.grade || null,
        };
      }

      const data = await response.json();
      console.log("API Success Response:", data);
      return data;
    } catch (error) {
      console.error("Error applying for competition:", error);
      throw error;
    }
  }

  /**
   * Get competition dashboard
   */
  static async getCompetitionDashboard(
    competitionId: string,
    accessToken: string,
  ): Promise<{ success: boolean; data: CompetitionDashboard }> {
    try {
      console.log(
        `Making API call to: ${apiUrl}/competitions/${competitionId}/dashboard`,
      );
      console.log(
        `Authorization header: Bearer ${accessToken.substring(0, 20)}...`,
      );

      const response = await fetch(
        `${apiUrl}/competitions/${competitionId}/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log(`Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP ${response.status}: ${response.statusText}`,
        }));
        console.error("API Error Response:", errorData);
        throw new Error(
          errorData.message ||
            `Failed to fetch competition dashboard: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      console.log("API Success Response:", data);

      // Check if the response has the expected format
      if (data.success && data.data) {
        return data;
      } else if (data.competition || data.examStatus) {
        // If the response is directly the dashboard data, wrap it
        return { success: true, data: data };
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Error fetching competition dashboard:", error);
      throw error;
    }
  }

  /**
   * Get exam details and questions
   */
  static async getExamDetails(
    examId: string,
    accessToken: string,
  ): Promise<{
    success: boolean;
    exam: ExamDetails;
    competition: {
      id: string;
      title: string;
      grade: string;
    };
    examId: string;
  }> {
    try {
      const response = await fetch(`${apiUrl}/competition-exams/${examId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch exam details");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching exam details:", error);
      throw error;
    }
  }

  /**
   * Submit exam answers
   */
  static async submitExamAnswers(
    examId: string,
    data: ExamSubmissionRequest,
    accessToken: string,
  ): Promise<ExamSubmissionResponse> {
    try {
      console.log(
        "API: Submitting exam answers to:",
        `${apiUrl}/competition-exams/${examId}/submit`,
      );
      console.log("API: Request data:", data);
      console.log(
        "API: Authorization header:",
        `Bearer ${accessToken.substring(0, 20)}...`,
      );

      const response = await fetch(
        `${apiUrl}/competition-exams/${examId}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        },
      );

      console.log("API: Response status:", response.status);
      console.log(
        "API: Response headers:",
        Object.fromEntries(response.headers.entries()),
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("API: Error response data:", errorData);
        throw new Error(errorData.message || "Failed to submit exam answers");
      }

      const result = await response.json();
      console.log("API: Success response:", result);
      return result;
    } catch (error) {
      console.error("Error submitting exam answers:", error);
      throw error;
    }
  }

  /**
   * Get exam results and review
   */
  static async getExamResults(
    examId: string,
    accessToken: string,
  ): Promise<{ success: boolean; data: ExamResults }> {
    try {
      const response = await fetch(
        `${apiUrl}/competition-exams/${examId}/results`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch exam results");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching exam results:", error);
      throw error;
    }
  }

  /**
   * Get competition leaderboard
   */
  static async getLeaderboard(
    competitionId: string,
    limit: number = 20,
    accessToken?: string,
  ): Promise<LeaderboardResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("limit", limit.toString());

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const response = await fetch(
        `${apiUrl}/competitions/${competitionId}/leaderboard?${queryParams.toString()}`,
        {
          method: "GET",
          headers,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch leaderboard");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      throw error;
    }
  }

  /**
   * Check if user has access to an exam
   */
  static async checkExamAccess(
    examId: string,
    accessToken: string,
  ): Promise<{ success: boolean; hasAccess: boolean; message?: string }> {
    try {
      const response = await fetch(
        `${apiUrl}/competition-exams/${examId}/access`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          hasAccess: false,
          message: errorData.message || "Failed to check exam access",
        };
      }

      const data = await response.json();
      return {
        success: true,
        hasAccess: data.hasAccess || false,
        message: data.message,
      };
    } catch (error) {
      console.error("Error checking exam access:", error);
      return {
        success: false,
        hasAccess: false,
        message: "Network error checking exam access",
      };
    }
  }
}

// Utility functions
export function formatCompetitionDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatCompetitionTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function getCompetitionStatus(
  startDate: string,
  endDate: string,
): CompetitionStatus {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return "upcoming";
  if (now > end) return "completed";
  return "active";
}

export function calculateTimeRemaining(targetDate: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number; // in milliseconds
} {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, total: difference };
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
}

// Error handling utility
export function handleApiError(error: any): string {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 401:
        return "Please log in to continue";
      case 403:
        return "Access denied. Please check your permissions";
      case 404:
        return "Competition not found";
      case 400:
        return data.message || "Invalid request";
      default:
        return "Something went wrong. Please try again";
    }
  } else {
    return "Network error. Please check your connection";
  }
}
