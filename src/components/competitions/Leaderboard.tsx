'use client';

import React, { useState, useEffect } from 'react';
import { CompetitionAPI, LeaderboardEntry, LeaderboardResponse, handleApiError } from '@/lib/competitionAPI';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Clock, Target, Users } from 'lucide-react';

interface LeaderboardProps {
  competitionId: string;
  limit?: number;
  showUserRank?: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  competitionId, 
  limit = 20, 
  showUserRank = true 
}) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<any>(null);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [competitionId, limit]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('authToken') || undefined;
      const response = await CompetitionAPI.getLeaderboard(competitionId, limit, token);

      if (response.success) {
        setLeaderboard(response.leaderboard);
        setUserRank(response.userRank);
        setTotalParticipants(response.totalParticipants);
      } else {
        setError('Failed to fetch leaderboard');
      }
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m ${secs}s`;
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 border rounded-lg animate-pulse">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchLeaderboard}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Try Again
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">Leaderboard</CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{totalParticipants} participants</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((entry, index) => (
            <div 
              key={index}
              className={`flex items-center gap-4 p-4 border rounded-lg transition-colors hover:bg-gray-50 ${
                userRank && entry.student.firstName === userRank.student?.firstName 
                  ? 'border-blue-300 bg-blue-50' 
                  : 'border-gray-200'
              }`}
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-8 text-center">
                <span className="text-lg font-bold text-gray-700">
                  {getRankIcon(entry.rank)}
                </span>
              </div>
              
              {/* Student Info */}
              <div className="flex items-center gap-3 flex-1">
                <Avatar className="w-10 h-10">
                  <AvatarImage 
                    src={entry.student.profilePicture} 
                    alt={`${entry.student.firstName} ${entry.student.lastName}`}
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-800 font-medium">
                    {getInitials(entry.student.firstName, entry.student.lastName)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {entry.student.firstName} {entry.student.lastName}
                  </h4>
                  <p className="text-sm text-gray-600 truncate">
                    {entry.student.schoolName}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      Grade {entry.student.gread}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Scores */}
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <Target className="w-3 h-3" />
                    <span className="text-xs">Score</span>
                  </div>
                  <div className="font-bold text-gray-900">
                    {entry.totalScore}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">Time</span>
                  </div>
                  <div className="font-medium text-gray-900">
                    {formatTime(entry.totalTimeSpent)}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <Trophy className="w-3 h-3" />
                    <span className="text-xs">Exams</span>
                  </div>
                  <div className="font-medium text-gray-900">
                    {entry.examsCompleted}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* User Rank (if not in top list) */}
        {showUserRank && userRank && !leaderboard.some(entry => 
          entry.student.firstName === userRank.student?.firstName
        ) && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Rank</h3>
            <div className="flex items-center gap-4 p-4 border-2 border-blue-300 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-8 text-center">
                <span className="text-lg font-bold text-blue-700">
                  {getRankIcon(userRank.rank)}
                </span>
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-blue-900">Your Performance</h4>
                <p className="text-sm text-blue-700">Keep up the great work!</p>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-xs text-blue-600 mb-1">Score</div>
                  <div className="font-bold text-blue-900">
                    {userRank.totalScore}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-xs text-blue-600 mb-1">Time</div>
                  <div className="font-medium text-blue-900">
                    {formatTime(userRank.totalTimeSpent)}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-xs text-blue-600 mb-1">Exams</div>
                  <div className="font-medium text-blue-900">
                    {userRank.examsCompleted}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;