import { apiUrl } from "@/apiConfig";

// Competition Types
export interface Competition {
  id: string;
  title: string;
  description: string;
  grade: 9 | 10;
  type: 'one-time' | 'tournament';
  status: 'upcoming' | 'ongoing' | 'past';
  startDate: string;
  endDate: string;
  duration: number; // in days
  totalPrizes: number;
  maxParticipants?: number;
  currentParticipants: number;
  thumbnailImage?: string;
  bannerImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompetitionDetail extends Competition {
  overview: string;
  requirements: string[];
  schedule: ExamSchedule[];
  prizes: Prize[];
  sponsors: Sponsor[];
  examSections: ExamSection[];
}

export interface ExamSchedule {
  id: string;
  day: number;
  date: string;
  time: string;
  title: string;
  description: string;
  topics: string[];
  questionCount: number;
  duration: number; // in minutes
}

export interface Prize {
  id: string;
  rank: number;
  name: string;
  description: string;
  image: string;
  value?: number;
  currency?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface ExamSection {
  id: string;
  competitionId: string;
  day: number;
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // in minutes
  questionCount: number;
  status: 'locked' | 'available' | 'completed' | 'closed';
  thumbnailImage?: string;
  topics: string[];
}

export interface CompetitionEnrollment {
  id: string;
  competitionId: string;
  userId: string;
  examId: string;
  enrolledAt: string;
  status: 'enrolled' | 'active' | 'completed' | 'disqualified';
  packageId: string;
  grade: 9 | 10;
}

export interface ExamAttempt {
  id: string;
  enrollmentId: string;
  examSectionId: string;
  startedAt: string;
  submittedAt?: string;
  score?: number;
  totalQuestions: number;
  timeTaken?: number; // in seconds
  answers: ExamAnswer[];
  status: 'in_progress' | 'submitted' | 'auto_submitted';
}

export interface ExamAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent: number; // in seconds
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  grade: 9 | 10;
  totalScore: number;
  totalTime: number; // in seconds
  completedExams: number;
  lastExamScore?: number;
  lastExamTime?: number;
  isCurrentUser?: boolean;
}

export interface UserPackage {
  id: string;
  packageId: string;
  packageName: string;
  grade: 9 | 10;
  startDate: string;
  endDate: string;
  isActive: boolean;
  duration: 1 | 3 | 6; // in months
}

// API Request/Response Types
export interface EnrollmentRequest {
  competitionId: string;
  packageId: string;
}

export interface EnrollmentResponse {
  success: boolean;
  message: string;
  enrollment?: CompetitionEnrollment;
  examId?: string;
}

export interface CompetitionListResponse {
  success: boolean;
  competitions: Competition[];
  total: number;
  page: number;
  limit: number;
}

export interface CompetitionDetailResponse {
  success: boolean;
  competition: CompetitionDetail;
  userEnrollment?: CompetitionEnrollment;
  userPackages: UserPackage[];
}

export interface LeaderboardResponse {
  success: boolean;
  leaderboard: LeaderboardEntry[];
  userRank?: LeaderboardEntry;
  totalParticipants: number;
}

export interface ExamAccessResponse {
  success: boolean;
  message: string;
  examSection?: ExamSection;
  timeRemaining?: number; // in seconds
  canAccess: boolean;
  accessToken?: string;
}

// Utility Types
export type CompetitionStatus = 'upcoming' | 'ongoing' | 'past';
export type CompetitionType = 'one-time' | 'tournament';
export type Grade = 9 | 10;
export type ExamStatus = 'locked' | 'available' | 'completed' | 'closed';
export type EnrollmentStatus = 'enrolled' | 'active' | 'completed' | 'disqualified';

// API Functions
export class CompetitionAPI {
  /**
   * Get list of competitions with optional filters
   */
  static async getCompetitions(
    params: {
      status?: CompetitionStatus;
      grade?: Grade;
      type?: CompetitionType;
      page?: number;
      limit?: number;
    } = {},
    accessToken?: string
  ): Promise<CompetitionListResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const response = await fetch(
        `${apiUrl}/competitions?${queryParams.toString()}`,
        {
          method: "GET",
          headers,
        }
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
    accessToken?: string
  ): Promise<CompetitionDetailResponse> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const response = await fetch(
        `${apiUrl}/competitions/${competitionId}`,
        {
          method: "GET",
          headers,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch competition details");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching competition details:", error);
      throw error;
    }
  }

  /**
   * Enroll user in a competition
   */
  static async enrollInCompetition(
    data: EnrollmentRequest,
    accessToken: string
  ): Promise<EnrollmentResponse> {
    try {
      const response = await fetch(`${apiUrl}/competitions/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to enroll in competition");
      }

      return response.json();
    } catch (error) {
      console.error("Error enrolling in competition:", error);
      throw error;
    }
  }

  /**
   * Get competition leaderboard
   */
  static async getLeaderboard(
    competitionId: string,
    grade?: Grade,
    accessToken?: string
  ): Promise<LeaderboardResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (grade) {
        queryParams.append('grade', grade.toString());
      }

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
        }
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
   * Check exam access for a specific section
   */
  static async checkExamAccess(
    competitionId: string,
    examSectionId: string,
    accessToken: string
  ): Promise<ExamAccessResponse> {
    try {
      const response = await fetch(
        `${apiUrl}/competitions/${competitionId}/exams/${examSectionId}/access`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to check exam access");
      }

      return response.json();
    } catch (error) {
      console.error("Error checking exam access:", error);
      throw error;
    }
  }

  /**
   * Get user's active packages
   */
  static async getUserPackages(
    grade?: Grade,
    accessToken?: string
  ): Promise<{ success: boolean; packages: UserPackage[] }> {
    try {
      const queryParams = new URLSearchParams();
      if (grade) {
        queryParams.append('grade', grade.toString());
      }

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const response = await fetch(
        `${apiUrl}/user/packages?${queryParams.toString()}`,
        {
          method: "GET",
          headers,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user packages");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching user packages:", error);
      throw error;
    }
  }

  /**
   * Validate package for competition enrollment
   */
  static async validatePackageForCompetition(
    competitionId: string,
    packageId: string,
    accessToken: string
  ): Promise<{
    success: boolean;
    valid: boolean;
    message: string;
    package?: UserPackage;
  }> {
    try {
      const response = await fetch(
        `${apiUrl}/competitions/${competitionId}/validate-package/${packageId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to validate package");
      }

      return response.json();
    } catch (error) {
      console.error("Error validating package:", error);
      throw error;
    }
  }
}

// Utility functions
export function formatCompetitionDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatCompetitionTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function getCompetitionStatus(startDate: string, endDate: string): CompetitionStatus {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return 'upcoming';
  if (now > end) return 'past';
  return 'ongoing';
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
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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

export function isPackageValidForCompetition(
  userPackage: UserPackage,
  competition: Competition
): { valid: boolean; reason?: string } {
  // Check if package grade matches competition grade
  if (userPackage.grade !== competition.grade) {
    return {
      valid: false,
      reason: `Package is for Grade ${userPackage.grade} but competition is for Grade ${competition.grade}`
    };
  }

  // Check if package is active
  if (!userPackage.isActive) {
    return {
      valid: false,
      reason: "Package is not active"
    };
  }

  // Check if package covers the full competition duration
  const packageEndDate = new Date(userPackage.endDate);
  const competitionEndDate = new Date(competition.endDate);

  if (packageEndDate < competitionEndDate) {
    return {
      valid: false,
      reason: "Package expires before competition ends. Please purchase a new package that covers the full tournament duration."
    };
  }

  return { valid: true };
}
