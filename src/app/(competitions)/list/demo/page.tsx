'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar, 
  Clock, 
  Trophy, 
  Users, 
  MapPin,
  Star,
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import CountdownTimer from '@/components/competitions/CountdownTimer';

// Demo data
const demoCompetitions = [
  {
    id: 'comp-1',
    title: 'National Mathematics Championship 2024',
    description: 'Test your mathematical prowess in this exciting 5-day tournament covering algebra, geometry, calculus, and problem-solving.',
    grade: 10,
    type: 'tournament',
    status: 'upcoming',
    startDate: '2024-02-15T19:00:00Z',
    endDate: '2024-02-19T21:00:00Z',
    duration: 5,
    totalPrizes: 15,
    maxParticipants: 1000,
    currentParticipants: 342,
    thumbnailImage: '/course/Math.png',
    bannerImage: '/common_files/main/cover.jpg',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'comp-2',
    title: 'Science Quiz Bonanza - Grade 9',
    description: 'Dive deep into physics, chemistry, and biology in this comprehensive science competition designed for Grade 9 students.',
    grade: 9,
    type: 'tournament',
    status: 'upcoming',
    startDate: '2024-02-20T19:00:00Z',
    endDate: '2024-02-24T21:00:00Z',
    duration: 5,
    totalPrizes: 12,
    maxParticipants: 800,
    currentParticipants: 156,
    thumbnailImage: '/course/Physics.png',
    bannerImage: '/common_files/main/cover2.jpg',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: 'comp-3',
    title: 'History & Social Studies Challenge',
    description: 'Explore Ethiopian history, world civilizations, and social studies in this engaging one-time competition.',
    grade: 10,
    type: 'one-time',
    status: 'upcoming',
    startDate: '2024-02-25T15:00:00Z',
    endDate: '2024-02-25T17:00:00Z',
    duration: 1,
    totalPrizes: 8,
    maxParticipants: 500,
    currentParticipants: 89,
    thumbnailImage: '/course/History.png',
    bannerImage: '/common_files/main/cover3.png',
    createdAt: '2024-01-12T11:00:00Z',
    updatedAt: '2024-01-22T13:20:00Z'
  },
  {
    id: 'comp-4',
    title: 'Winter Academic Olympics 2023',
    description: 'Multi-subject competition covering all major academic areas. This competition has concluded.',
    grade: 9,
    type: 'tournament',
    status: 'past',
    startDate: '2023-12-10T19:00:00Z',
    endDate: '2023-12-14T21:00:00Z',
    duration: 5,
    totalPrizes: 20,
    maxParticipants: 1200,
    currentParticipants: 1089,
    thumbnailImage: '/course/Economics.png',
    bannerImage: '/common_files/main/cover4 - Copy.png',
    createdAt: '2023-11-15T08:00:00Z',
    updatedAt: '2023-12-15T10:00:00Z'
  }
];

const CompetitionsDemoPage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'all'>('upcoming');

  const filteredCompetitions = demoCompetitions.filter(competition => {
    if (activeTab === 'upcoming') return competition.status === 'upcoming';
    if (activeTab === 'past') return competition.status === 'past';
    return true; // 'all'
  });

  const handleShowDetail = (competitionId: string) => {
    router.push(`/competitions/demo/${competitionId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'past': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const CompetitionCard: React.FC<{ competition: any }> = ({ competition }) => (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-orange-200">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
            {competition.title}
          </CardTitle>
          <Badge className={`${getStatusColor(competition.status)} border-0 font-medium`}>
            {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
            Grade {competition.grade}
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium capitalize">
            {competition.type}
          </span>
          {competition.status === 'upcoming' && (
            <Badge variant="outline" className="border-green-300 text-green-700">
              <Star className="w-3 h-3 mr-1" />
              Demo
            </Badge>
          )}
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
              {formatDate(competition.startDate)} - {formatDate(competition.endDate)}
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="w-4 h-4 text-green-500" />
            <span>{competition.duration} {competition.duration === 1 ? 'Day' : 'Days'}</span>
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

          {/* Countdown for upcoming competitions */}
          {competition.status === 'upcoming' && (
            <div className="mt-4">
              <CountdownTimer 
                targetDate={competition.startDate} 
                className="text-xs p-3"
              />
            </div>
          )}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              Quiz Competitions Demo
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Welcome to the Fayida Academy Competition Platform! Join exciting quiz tournaments, 
            compete with students nationwide, and win amazing prizes. This is a demonstration 
            of our competition enrollment system.
          </p>
          
          {/* Demo Notice */}
          <Alert className="max-w-2xl mx-auto border-blue-200 bg-blue-50 mb-6">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Demo Mode:</strong> This is a demonstration page with sample data. 
              The actual competition system will connect to real backend APIs for enrollment, 
              package validation, and exam access.
            </AlertDescription>
          </Alert>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-green-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Smart Enrollment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800 text-sm">
                Automatic package validation ensures only eligible students can enroll. 
                Grade-specific restrictions and package duration checks are built-in.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-orange-900 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Real-time Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800 text-sm">
                Exam sections unlock automatically at scheduled times. Countdown timers 
                and late-entry handling ensure fair competition for all participants.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-purple-900 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Live Leaderboards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800 text-sm">
                Track your progress with real-time leaderboards. Grade-separated rankings 
                with score and time-based sorting keep the competition exciting.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            onClick={() => router.push('/competitions')}
            variant="outline"
            className="border-gray-300"
          >
            View Live Competitions
          </Button>
          <Button 
            onClick={() => router.push('/explore_packages')}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Browse Packages
          </Button>
        </div>

        {/* Tabs for filtering */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-white border shadow-sm">
              <TabsTrigger 
                value="upcoming" 
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium"
              >
                Upcoming ({demoCompetitions.filter(c => c.status === 'upcoming').length})
              </TabsTrigger>
              <TabsTrigger 
                value="past"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium"
              >
                Past ({demoCompetitions.filter(c => c.status === 'past').length})
              </TabsTrigger>
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium"
              >
                All ({demoCompetitions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompetitions.map((competition) => (
                  <CompetitionCard key={competition.id} competition={competition} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompetitions.map((competition) => (
                  <CompetitionCard key={competition.id} competition={competition} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompetitions.map((competition) => (
                  <CompetitionCard key={competition.id} competition={competition} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Technical Implementation Note */}
        <Card className="max-w-4xl mx-auto border-gray-200 bg-gray-50">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-gray-600" />
              Implementation Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Frontend Features:</h4>
                <ul className="space-y-1">
                  <li>• Competition listing with filters</li>
                  <li>• Detailed competition pages</li>
                  <li>• Enrollment flow with validation</li>
                  <li>• Real-time countdown timers</li>
                  <li>• Exam access controls</li>
                  <li>• Live leaderboards</li>
                  <li>• Mobile-responsive design</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Backend Integration:</h4>
                <ul className="space-y-1">
                  <li>• RESTful API endpoints</li>
                  <li>• User authentication & authorization</li>
                  <li>• Package validation logic</li>
                  <li>• Grade-specific restrictions</li>
                  <li>• Exam ID generation & distribution</li>
                  <li>• Anti-cheating measures</li>
                  <li>• Real-time score calculations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompetitionsDemoPage;
