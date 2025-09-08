'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Calendar, 
  Clock, 
  Trophy, 
  Users, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  Lock, 
  Play,
  ExternalLink,
  ShoppingCart,
  Star,
  ArrowLeft,
  BookOpen,
  Timer,
  Target
} from 'lucide-react';
import CountdownTimer from '@/components/competitions/CountdownTimer';

// Demo data for competitions
const demoCompetitionsData: Record<string, any> = {
  'comp-1': {
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
    currentParticipants: 342,
    overview: 'Join the most prestigious mathematics competition in the country! This 5-day tournament will challenge your problem-solving skills across various mathematical domains. Compete with the best students nationwide and showcase your mathematical excellence.',
    requirements: [
      'Must be a registered student',
      'Must Sign Up / Log In to the platform',
      'Must purchase 1-month Grade 10 package',
      'Package must cover entire tournament duration',
      'Must show current School ID matching Grade 10 at prize claim'
    ],
    schedule: [
      {
        id: 'day-1',
        day: 1,
        date: '2024-02-15',
        time: '7:00 PM',
        title: 'Algebra & Number Theory',
        description: 'Foundation problems in algebra and number theory',
        topics: ['Linear Equations', 'Quadratic Functions', 'Number Theory', 'Sequences'],
        questionCount: 20,
        duration: 20
      },
      {
        id: 'day-2',
        day: 2,
        date: '2024-02-16',
        time: '7:00 PM',
        title: 'Geometry & Trigonometry',
        description: 'Spatial reasoning and trigonometric problems',
        topics: ['Euclidean Geometry', 'Coordinate Geometry', 'Trigonometry', 'Vectors'],
        questionCount: 20,
        duration: 20
      },
      {
        id: 'day-3',
        day: 3,
        date: '2024-02-17',
        time: '7:00 PM',
        title: 'Calculus & Analysis',
        description: 'Differential and integral calculus challenges',
        topics: ['Limits', 'Derivatives', 'Integrals', 'Functions'],
        questionCount: 20,
        duration: 20
      },
      {
        id: 'day-4',
        day: 4,
        date: '2024-02-18',
        time: '7:00 PM',
        title: 'Statistics & Probability',
        description: 'Data analysis and probability problems',
        topics: ['Statistics', 'Probability', 'Data Analysis', 'Combinations'],
        questionCount: 20,
        duration: 20
      },
      {
        id: 'day-5',
        day: 5,
        date: '2024-02-19',
        time: '7:00 PM',
        title: 'Mixed Problem Solving',
        description: 'Comprehensive mathematical problem solving',
        topics: ['Mixed Topics', 'Word Problems', 'Logic', 'Applications'],
        questionCount: 20,
        duration: 20
      }
    ],
    prizes: [
      {
        id: 'prize-1',
        rank: 1,
        name: 'Dell Inspiron Laptop',
        description: 'High-performance laptop for studies',
        image: '/common_files/main/phone_Image.png',
        value: 45000,
        currency: 'ETB'
      },
      {
        id: 'prize-2',
        rank: 2,
        name: 'JBL Wireless Headphones',
        description: 'Noise-cancelling wireless headset',
        image: '/common_files/main/phone_Image.png',
        value: 8000,
        currency: 'ETB'
      },
      {
        id: 'prize-3',
        rank: 3,
        name: 'Bookstore Gift Voucher',
        description: '2,000 ETB bookstore gift voucher',
        image: '/common_files/main/phone_Image.png',
        value: 2000,
        currency: 'ETB'
      },
      {
        id: 'prize-4',
        rank: 10,
        name: 'Study Backpack',
        description: 'Stylish backpack with study tools',
        image: '/common_files/main/phone_Image.png',
        value: 500,
        currency: 'ETB'
      }
    ],
    sponsors: [
      {
        id: 'sponsor-1',
        name: 'Tech Solutions Ethiopia',
        logo: '/common_files/main/fayida_logo.png',
        website: 'https://example.com'
      },
      {
        id: 'sponsor-2',
        name: 'Education First',
        logo: '/common_files/main/smallfulllogo.png',
        website: 'https://example.com'
      }
    ],
    examSections: [
      {
        id: 'exam-1',
        competitionId: 'comp-1',
        day: 1,
        title: 'Day 1: Algebra & Number Theory',
        description: 'Foundation problems in algebra and number theory',
        scheduledDate: '2024-02-15',
        scheduledTime: '19:00',
        duration: 20,
        questionCount: 20,
        status: 'locked',
        thumbnailImage: '/course/Math.png',
        topics: ['Linear Equations', 'Quadratic Functions', 'Number Theory', 'Sequences']
      },
      // Add more exam sections as needed
    ]
  },
  'comp-2': {
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
    currentParticipants: 156,
    overview: 'Explore the fascinating world of science in this comprehensive tournament! Test your knowledge in physics, chemistry, and biology while competing with fellow Grade 9 students from across the country.',
    requirements: [
      'Must be a registered student',
      'Must Sign Up / Log In to the platform',
      'Must purchase 1-month Grade 9 package',
      'Package must cover entire tournament duration',
      'Must show current School ID matching Grade 9 at prize claim'
    ],
    schedule: [
      {
        id: 'day-1',
        day: 1,
        date: '2024-02-20',
        time: '7:00 PM',
        title: 'Physics Fundamentals',
        description: 'Basic physics concepts and applications',
        topics: ['Mechanics', 'Heat', 'Light', 'Sound'],
        questionCount: 20,
        duration: 20
      },
      {
        id: 'day-2',
        day: 2,
        date: '2024-02-21',
        time: '7:00 PM',
        title: 'Chemistry Basics',
        description: 'Chemical reactions and atomic structure',
        topics: ['Atomic Structure', 'Chemical Bonds', 'Reactions', 'Periodic Table'],
        questionCount: 20,
        duration: 20
      }
    ],
    prizes: [
      {
        id: 'prize-1',
        rank: 1,
        name: 'Science Kit Premium',
        description: 'Complete laboratory science kit',
        image: '/common_files/main/phone_Image.png',
        value: 15000,
        currency: 'ETB'
      }
    ],
    sponsors: [],
    examSections: []
  }
};

const CompetitionDemoDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const competitionId = params.competition_id as string;

  const [competition, setCompetition] = useState<any>(null);
  const [showEnrollmentDialog, setShowEnrollmentDialog] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<'not_enrolled' | 'enrolled' | 'need_package'>('not_enrolled');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate checking login status
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);

    // Load demo competition data
    const competitionData = demoCompetitionsData[competitionId];
    if (competitionData) {
      setCompetition(competitionData);
    }
  }, [competitionId]);

  const handleEnrollment = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    // Simulate enrollment process
    setShowEnrollmentDialog(true);
  };

  const simulateEnrollment = () => {
    // Simulate successful enrollment
    setEnrollmentStatus('enrolled');
    setShowEnrollmentDialog(false);
    
    // Show success message (you could use a toast here)
    alert('Successfully enrolled! Your Exam ID: DEMO-2024-001');
  };

  const getActionButton = () => {
    if (!isLoggedIn) {
      return (
        <Button 
          onClick={() => router.push('/login')}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
        >
          Sign Up / Log In
        </Button>
      );
    }

    if (enrollmentStatus === 'enrolled') {
      return (
        <Button 
          onClick={() => router.push('/dashboard')}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
        >
          Go to Dashboard
        </Button>
      );
    }

    return (
      <Button 
        onClick={handleEnrollment}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
      >
        Apply Now (Demo)
      </Button>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!competition) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Competition Not Found</h1>
            <p className="text-gray-600 mb-6">The requested demo competition could not be found.</p>
            <Button 
              onClick={() => router.push('/competitions/demo')}
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Demo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            onClick={() => router.push('/competitions/demo')}
            variant="outline"
            className="border-gray-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Demo
          </Button>
        </div>

        {/* Demo Notice */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Star className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Demo Mode:</strong> This is a demonstration of the competition detail page. 
            Enrollment will simulate the process but won't create actual registrations.
          </AlertDescription>
        </Alert>

        {/* Event Info Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {competition.title}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-orange-100 text-orange-800 border-0 font-medium px-3 py-1">
                  Grade {competition.grade}
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 border-0 font-medium px-3 py-1">
                  {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
                </Badge>
                <Badge variant="outline" className="border-green-300 text-green-700">
                  <Star className="w-3 h-3 mr-1" />
                  Demo
                </Badge>
              </div>

              {/* Event Info Icons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="font-medium">{competition.totalPrizes} Prizes</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">
                      {formatDate(competition.startDate)} - {formatDate(competition.endDate)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-medium">{competition.duration} Days</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Users className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="font-medium">{competition.currentParticipants} Participants</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button Area */}
            <div className="lg:w-80">
              {competition.status === 'upcoming' && (
                <div className="mb-4">
                  <CountdownTimer targetDate={competition.startDate} />
                </div>
              )}
              {getActionButton()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {competition.overview}
                </p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <ul className="space-y-2">
                    {competition.requirements.map((requirement: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competition.schedule.map((exam: any) => (
                    <div key={exam.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          Day {exam.day} - {exam.title}
                        </h4>
                        <Badge variant="outline" className="text-sm">
                          {formatDate(exam.date)} at {exam.time}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{exam.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{exam.questionCount} Questions</span>
                        <span>{exam.duration} Minutes</span>
                        <span>Topics: {exam.topics.join(', ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Demo Exam Section */}
            {enrollmentStatus === 'enrolled' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Exam Sections</CardTitle>
                  <CardDescription>
                    Complete each exam section during its scheduled time window.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">
                                Day 1: Algebra & Number Theory
                              </h4>
                              <p className="text-gray-600 text-sm mb-2">
                                Foundation problems in algebra and number theory
                              </p>
                            </div>
                            <Badge className="bg-gray-100 text-gray-600 border-0 font-medium">
                              <Lock className="w-4 h-4 mr-1" />
                              Locked
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Date:</span>
                              <div>Feb 15, 2024</div>
                            </div>
                            <div>
                              <span className="font-medium">Time:</span>
                              <div>7:00 PM</div>
                            </div>
                            <div>
                              <span className="font-medium">Duration:</span>
                              <div>20 minutes</div>
                            </div>
                            <div>
                              <span className="font-medium">Questions:</span>
                              <div>20</div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mt-2">
                            <div className="flex items-center gap-1 mb-1">
                              <Timer className="w-4 h-4" />
                              <span>Unlocks in:</span>
                            </div>
                            <div className="font-mono font-medium">
                              05:12:34:22
                            </div>
                          </div>
                          <div className="mt-3">
                            <Button disabled variant="outline">
                              Locked
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Prizes Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Prizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competition.prizes.map((prize: any) => (
                    <div key={prize.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {prize.rank === 1 ? '🥇 1st' : 
                             prize.rank === 2 ? '🥈 2nd' :
                             prize.rank === 3 ? '🥉 3rd' :
                             `${prize.rank}th`}
                          </Badge>
                        </div>
                        <h5 className="font-medium text-gray-900 text-sm">{prize.name}</h5>
                        <p className="text-gray-600 text-xs">{prize.description}</p>
                        {prize.value && (
                          <p className="text-green-600 text-xs font-medium">
                            {prize.value} {prize.currency}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sponsors Section */}
            {competition.sponsors && competition.sponsors.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Sponsors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {competition.sponsors.map((sponsor: any) => (
                      <div key={sponsor.id} className="text-center">
                        <a 
                          href={sponsor.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block hover:opacity-80 transition-opacity"
                        >
                          <img 
                            src={sponsor.logo} 
                            alt={sponsor.name} 
                            className="w-full h-16 object-contain mb-2"
                          />
                          <span className="text-sm text-gray-600">{sponsor.name}</span>
                          <ExternalLink className="w-3 h-3 inline ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Demo Leaderboard */}
            {enrollmentStatus === 'enrolled' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Leaderboard Preview
                  </CardTitle>
                  <CardDescription>
                    Sample leaderboard data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { rank: 1, name: 'Demo Student A', score: 95, time: '15:30' },
                      { rank: 2, name: 'Demo Student B', score: 92, time: '16:45' },
                      { rank: 3, name: 'You (Demo)', score: 88, time: '17:20' }
                    ].map((entry) => (
                      <div 
                        key={entry.rank}
                        className={`flex items-center gap-4 p-3 rounded-lg border ${
                          entry.name.includes('You') 
                            ? 'border-blue-200 bg-blue-50' 
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-center w-8">
                          {entry.rank === 1 ? '🥇' : 
                           entry.rank === 2 ? '🥈' : 
                           entry.rank === 3 ? '🥉' : entry.rank}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{entry.name}</div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              <span>{entry.score} points</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{entry.time}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-gray-100 text-gray-700 border-0 font-medium">
                          #{entry.rank}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Enrollment Dialog */}
      <Dialog open={showEnrollmentDialog} onOpenChange={setShowEnrollmentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Demo Enrollment</DialogTitle>
            <DialogDescription>
              This is a demonstration of the enrollment process. In the real system, 
              we would validate your package and create an actual enrollment.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Demo Package Found:</strong> Grade {competition.grade} package 
                (valid until March 2024) covers the full tournament duration.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowEnrollmentDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={simulateEnrollment}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Enroll (Demo)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompetitionDemoDetailPage;
