'use client';

import React, { useState, useEffect } from 'react';
import { CompetitionAPI, LeaderboardEntry, Grade } from '@/lib/competitionAPI';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Medal, 
  Award, 
  Clock, 
  Target,
  RefreshCw,
  Crown,
  Star
} from 'lucide-react';
import { formatDuration } from '@/lib/competitionAPI';

interface LeaderboardProps {
  competitionId: string;
  grade: Grade;
  className?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  competitionId, 
  grade,
  className = ""
}) => {
  const [leaderboardData, setLeaderboardData] = useState<{
    grade9?: LeaderboardEntry[];
    grade10?: LeaderboardEntry[];
  }>({});
  const [userRank, setUserRank] = useState<{
    grade9?: LeaderboardEntry;
    grade10?: LeaderboardEntry;
  }>({});
  const [totalParticipants, setTotalParticipants] = useState<{
    grade9?: number;
    grade10?: number;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'9' | '10'>(grade.toString() as '9' | '10');

  useEffect(() => {
    fetchLeaderboard();
  }, [competitionId]);

  const fetchLeaderboard = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const token = localStorage.getItem('accessToken');
      
      // Fetch leaderboard for both grades
      const [grade9Response, grade10Response] = await Promise.all([
        CompetitionAPI.getLeaderboard(competitionId, 9, token || undefined),
        CompetitionAPI.getLeaderboard(competitionId, 10, token || undefined)
      ]);

      if (grade9Response.success) {
        setLeaderboardData(prev => ({
          ...prev,
          grade9: grade9Response.leaderboard
        }));
        setUserRank(prev => ({
          ...prev,
          grade9: grade9Response.userRank
        }));
        setTotalParticipants(prev => ({
          ...prev,
          grade9: grade9Response.totalParticipants
        }));
      }

      if (grade10Response.success) {
        setLeaderboardData(prev => ({
          ...prev,
          grade10: grade10Response.leaderboard
        }));
        setUserRank(prev => ({
          ...prev,
          grade10: grade10Response.userRank
        }));
        setTotalParticipants(prev => ({
          ...prev,
          grade10: grade10Response.totalParticipants
        }));
      }

    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-orange-500" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-gray-600 font-bold text-sm">
          {rank}
        </span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const UserRankCard: React.FC<{ userRank: LeaderboardEntry; grade: Grade }> = ({ userRank, grade }) => (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-blue-900 flex items-center gap-2">
          <Star className="w-5 h-5" />
          Your Rank - Grade {grade}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {getRankIcon(userRank.rank)}
            <Avatar className="w-10 h-10">
              <AvatarImage src={userRank.userAvatar} alt={userRank.userName} />
              <AvatarFallback className="bg-blue-500 text-white">
                {userRank.userName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-blue-900">{userRank.userName}</span>
              <Badge className={`${getRankBadgeColor(userRank.rank)} border-0 font-medium px-2 py-1`}>
                Rank #{userRank.rank}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Score:</span>
                <div className="text-blue-900 font-bold">{userRank.totalScore}</div>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Time:</span>
                <div className="text-blue-900 font-bold">{formatDuration(userRank.totalTime)}</div>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Exams:</span>
                <div className="text-blue-900 font-bold">{userRank.completedExams}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const LeaderboardList: React.FC<{ entries: LeaderboardEntry[]; grade: Grade }> = ({ entries, grade }) => (
    <div className="space-y-3">
      {entries.map((entry) => (
        <div 
          key={entry.userId}
          className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${
            entry.isCurrentUser 
              ? 'border-blue-200 bg-blue-50' 
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          {/* Rank */}
          <div className="flex items-center justify-center w-12">
            {getRankIcon(entry.rank)}
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="w-10 h-10">
              <AvatarImage src={entry.userAvatar} alt={entry.userName} />
              <AvatarFallback className={`${
                entry.rank <= 3 
                  ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {entry.userName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-medium ${entry.isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                  {entry.userName}
                </span>
                {entry.isCurrentUser && (
                  <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
                    You
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  <span>{entry.totalScore} points</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(entry.totalTime)}</span>
                </div>
                <div>
                  <span>{entry.completedExams} exams</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rank Badge */}
          <Badge className={`${getRankBadgeColor(entry.rank)} border-0 font-medium px-3 py-1`}>
            #{entry.rank}
          </Badge>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="w-12 h-6 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button 
              onClick={() => fetchLeaderboard()}
              variant="outline"
              size="sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Leaderboard
          </CardTitle>
          <CardDescription>
            Top performers in the competition
          </CardDescription>
        </div>
        <Button 
          onClick={() => fetchLeaderboard(true)}
          disabled={refreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as '9' | '10')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger 
              value="9"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Grade 9 ({totalParticipants.grade9 || 0})
            </TabsTrigger>
            <TabsTrigger 
              value="10"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Grade 10 ({totalParticipants.grade10 || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="9" className="space-y-4">
            {userRank.grade9 && (
              <UserRankCard userRank={userRank.grade9} grade={9} />
            )}
            
            {leaderboardData.grade9 && leaderboardData.grade9.length > 0 ? (
              <LeaderboardList entries={leaderboardData.grade9} grade={9} />
            ) : (
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No participants yet for Grade 9</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="10" className="space-y-4">
            {userRank.grade10 && (
              <UserRankCard userRank={userRank.grade10} grade={10} />
            )}
            
            {leaderboardData.grade10 && leaderboardData.grade10.length > 0 ? (
              <LeaderboardList entries={leaderboardData.grade10} grade={10} />
            ) : (
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No participants yet for Grade 10</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;







