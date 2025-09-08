'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CompetitionAPI, Competition, CompetitionStatus, Grade } from '@/lib/competitionAPI';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Trophy, Users, MapPin } from 'lucide-react';
import { formatCompetitionDate, formatCompetitionTime, getCompetitionStatus } from '@/lib/competitionAPI';

const CompetitionsPage: React.FC = () => {
  const router = useRouter();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'all'>('upcoming');

  useEffect(() => {
    fetchCompetitions();
  }, [activeTab]);

  const fetchCompetitions = async () => {
    try {
      setLoading(true);
      setError(null);

      const status: CompetitionStatus | undefined = 
        activeTab === 'upcoming' ? 'upcoming' :
        activeTab === 'past' ? 'past' :
        undefined;

      const response = await CompetitionAPI.getCompetitions({
        status,
        limit: 50
      });

      if (response.success) {
        setCompetitions(response.competitions);
      } else {
        setError('Failed to fetch competitions');
      }
    } catch (err) {
      console.error('Error fetching competitions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch competitions');
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetail = (competitionId: string) => {
    router.push(`/competitions/${competitionId}`);
  };

  const getStatusColor = (competition: Competition) => {
    const status = getCompetitionStatus(competition.startDate, competition.endDate);
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'past': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (competition: Competition) => {
    const status = getCompetitionStatus(competition.startDate, competition.endDate);
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const CompetitionCard: React.FC<{ competition: Competition }> = ({ competition }) => (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
            {competition.title}
          </CardTitle>
          <Badge className={`${getStatusColor(competition)} border-0 font-medium`}>
            {getStatusText(competition)}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
            Grade {competition.grade}
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium capitalize">
            {competition.type}
          </span>
        </div>
        <CardDescription className="text-gray-600 line-clamp-3">
          {competition.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-3">
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>
              {formatCompetitionDate(competition.startDate)} - {formatCompetitionDate(competition.endDate)}
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="w-4 h-4 text-green-500" />
            <span>{competition.duration} Days</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>Online (Fayida Academy Platform)</span>
          </div>

          {/* Prizes */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-medium text-yellow-700">
              {competition.totalPrizes} Total Prizes
            </span>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users className="w-4 h-4 text-purple-500" />
            <span>
              {competition.currentParticipants} Participants
              {competition.maxParticipants && (
                <span className="text-gray-500"> / {competition.maxParticipants}</span>
              )}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={() => handleShowDetail(competition.id)}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
        >
          Show Details
        </Button>
      </CardFooter>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Competitions</h1>
            <p className="text-lg text-gray-600">Loading competitions...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-80 animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-gray-300 rounded w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Competitions</h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-800 mb-4">{error}</p>
              <Button 
                onClick={fetchCompetitions}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quiz Competitions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join exciting quiz tournaments and compete with students from across the country. 
            Test your knowledge and win amazing prizes!
          </p>
        </div>

        {/* Tabs for filtering */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-white border shadow-sm">
              <TabsTrigger 
                value="upcoming" 
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger 
                value="past"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium"
              >
                Past
              </TabsTrigger>
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium"
              >
                All
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-8">
              {competitions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {competitions.map((competition) => (
                    <CompetitionCard key={competition.id} competition={competition} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Upcoming Competitions
                  </h3>
                  <p className="text-gray-500">
                    Check back soon for exciting new quiz tournaments!
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-8">
              {competitions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {competitions.map((competition) => (
                    <CompetitionCard key={competition.id} competition={competition} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Past Competitions
                  </h3>
                  <p className="text-gray-500">
                    Past competitions will appear here after they conclude.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="all" className="mt-8">
              {competitions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {competitions.map((competition) => (
                    <CompetitionCard key={competition.id} competition={competition} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Competitions Available
                  </h3>
                  <p className="text-gray-500">
                    Competitions will appear here when they become available.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CompetitionsPage;
