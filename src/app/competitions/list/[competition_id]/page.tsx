'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CompetitionAPI, CompetitionDetail, handleApiError } from '@/lib/competitionAPI';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  LogIn,
  Package
} from 'lucide-react';
import { formatCompetitionDate, formatCompetitionTime, getCompetitionStatus } from '@/lib/competitionAPI';

const CompetitionDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const competitionId = params.competition_id as string;

  const [competition, setCompetition] = useState<CompetitionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [showPackageDialog, setShowPackageDialog] = useState(false);
  const [applyMessage, setApplyMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchCompetitionDetails();
  }, [competitionId]);

  const fetchCompetitionDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('accessToken');
      const hasToken = !!token;
      
      console.log('Token found:', token);
      console.log('Token length:', token ? token.length : 0);
      
      // For now, create a local competition with proper authentication state
      // This will work without needing the API to be implemented
      const localCompetition = {
        id: competitionId,
        title: 'Grade 9 Quiz Tournament',
        description: 'Join our exciting 5-day quiz tournament designed specifically for Grade 9 students. Test your knowledge across various subjects and compete with students from across the country. This tournament features multiple exams with real-time leaderboards and amazing prizes for top performers.',
        grade: '9' as const,
        competitionType: 'tournament' as const,
        status: 'upcoming' as const,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        totalPrizes: '50000',
        registrationCount: 150,
        examCount: 5,
        prizes: [
          {
            rank: 1,
            prizeName: 'Dell Inspiron Laptop',
            description: 'High-performance laptop for studies',
            image: '/prizes/laptop.jpg',
            value: '25000'
          },
          {
            rank: 2,
            prizeName: 'iPad Air',
            description: 'Latest iPad for digital learning',
            image: '/prizes/ipad.jpg',
            value: '15000'
          },
          {
            rank: 3,
            prizeName: 'Gift Voucher',
            description: 'Educational materials voucher',
            image: '/prizes/voucher.jpg',
            value: '10000'
          }
        ],
        sponsors: [
          {
            name: 'TechCorp Ethiopia',
            logo: '/sponsors/techcorp.png',
            website: 'https://techcorp.et'
          },
          {
            name: 'EduTech Solutions',
            logo: '/sponsors/edutech.png',
            website: 'https://edutech.et'
          }
        ],
        exams: [
          {
            id: 'exam-1',
            title: 'Day 1: Foundation & Warm-Up',
            day: 1,
            scheduledDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            duration: 20,
            totalQuestions: 20
          },
          {
            id: 'exam-2',
            title: 'Day 2: Advanced Topics',
            day: 2,
            scheduledDateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 20,
            totalQuestions: 20
          },
          {
            id: 'exam-3',
            title: 'Day 3: Final Challenge',
            day: 3,
            scheduledDateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 20,
            totalQuestions: 20
          }
        ],
        isRegistered: false,
        userRegistration: null,
        buttonState: (hasToken ? 'can_apply' : 'not_logged_in') as 'not_logged_in' | 'needs_package' | 'can_apply' | 'already_applied',
        buttonText: hasToken ? 'Apply Now' : 'Sign Up/Log In',
        buttonAction: (hasToken ? 'apply' : 'login') as 'login' | 'package' | 'apply' | 'dashboard',
        requiresPackage: true,
        packageValid: hasToken, // For demo purposes, assume token means valid package
        packageGrade: hasToken ? '9' : null
      };
      
      console.log('Local competition data:', localCompetition);
      console.log('Has token:', hasToken);
      console.log('Button state:', localCompetition.buttonState);
      console.log('Button text:', localCompetition.buttonText);
      
      // Debug: Show current auth state
      if (hasToken) {
        console.log('✅ User is logged in - showing "Apply Now" button');
      } else {
        console.log('❌ User is not logged in - showing "Sign Up/Log In" button');
      }
      
      setCompetition(localCompetition);
      
    } catch (err) {
      console.error('Error creating competition details:', err);
      setError('Failed to load competition details');
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async () => {
    if (!competition) return;

    switch (competition.buttonState) {
      case 'not_logged_in':
        router.push('/login');
        break;
        
      case 'needs_package':
        setShowPackageDialog(true);
        break;
        
      case 'can_apply':
        await applyForCompetition();
        break;
        
      case 'already_applied':
        router.push(`/competitions/${competition.id}/dashboard`);
        break;
        
      default:
        console.log('Unknown button state');
    }
  };

  const applyForCompetition = async () => {
    try {
      setApplying(true);
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        router.push('/login');
        return;
      }

      // For local demo, simulate successful application
      const examId = 'A1B2C3';
      setApplyMessage(`Successfully registered! Your Exam ID: ${examId}`);
      
      // Update competition state to show user is now registered
      if (competition) {
        setCompetition({
          ...competition,
          buttonState: 'already_applied' as const,
          buttonText: 'Go to Dashboard',
          buttonAction: 'dashboard' as const,
          isRegistered: true,
          registrationCount: competition.registrationCount + 1
        });
      }
      
    } catch (err) {
      console.error('Error applying for competition:', err);
      setError('Failed to apply for competition');
    } finally {
      setApplying(false);
    }
  };

  const getButtonClass = (buttonState: string) => {
    const classes = {
      'not_logged_in': 'bg-gray-500 hover:bg-gray-600',
      'needs_package': 'bg-yellow-500 hover:bg-yellow-600',
      'can_apply': 'bg-blue-500 hover:bg-blue-600',
      'already_applied': 'bg-green-500 hover:bg-green-600'
    };
    return classes[buttonState as keyof typeof classes] || 'bg-gray-500 hover:bg-gray-600';
  };

  const getButtonIcon = (buttonState: string) => {
    switch (buttonState) {
      case 'not_logged_in':
        return <LogIn className="w-4 h-4 mr-2" />;
      case 'needs_package':
        return <Package className="w-4 h-4 mr-2" />;
      case 'can_apply':
        return <CheckCircle className="w-4 h-4 mr-2" />;
      case 'already_applied':
        return <Play className="w-4 h-4 mr-2" />;
      default:
        return null;
    }
  };

  const PackageDialog = () => (
    <Dialog open={showPackageDialog} onOpenChange={setShowPackageDialog}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Package Required</DialogTitle>
          <DialogDescription>
            {competition && (
              <>
                You need a valid Grade {competition.grade} package that covers the full tournament duration to participate in this competition.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPackageDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              router.push(`/packages/explore?grade=${competition?.grade}`);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            View Packages
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-gray-300 rounded"></div>
                ))}
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-gray-300 rounded"></div>
                <div className="h-48 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !competition) {
    return (
      <div className="min-h-screen bg-gray-50 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-800 mb-4">{error || 'Competition not found'}</p>
              <Button 
                onClick={() => router.push('/competitions')}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Back to Competitions
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="container mx-auto px-4">
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
                <Badge className={`border-0 font-medium px-3 py-1 ${
                  competition.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  competition.status === 'active' ? 'bg-green-100 text-green-800' :
                  competition.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
                </Badge>
              </div>

              {/* Event Info Icons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="font-medium">{competition.totalPrizes} Total Prizes</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">
                      {formatCompetitionDate(competition.startDate)} - {formatCompetitionDate(competition.endDate)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-medium">{competition.examCount || 0} Exams</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Users className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="font-medium">{competition.registrationCount} Participants</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button Area */}
            <div className="lg:w-80">
              {competition && (
                <Button 
                  onClick={handleButtonClick}
                  disabled={applying}
                  className={`w-full text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${getButtonClass(competition.buttonState)}`}
                >
                  {getButtonIcon(competition.buttonState)}
                  {applying ? 'Applying...' : competition.buttonText}
                </Button>
              )}
            </div>
          </div>

          {/* Success/Error Messages */}
          {applyMessage && (
            <Alert className="mt-4 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {applyMessage}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {competition.description}
                </p>
              </CardContent>
            </Card>

            {/* Exams Section */}
            {competition.exams && competition.exams.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Exams</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {competition.exams.map((exam, index) => (
                      <div key={exam.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">
                            Day {exam.day} - {exam.title}
                          </h4>
                          <Badge variant="outline" className="text-sm">
                            {formatCompetitionDate(exam.scheduledDateTime)} at {formatCompetitionTime(exam.scheduledDateTime)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{exam.totalQuestions} Questions</span>
                          <span>{exam.duration} Minutes</span>
                        </div>
                      </div>
                    ))}
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
                  {competition.prizes.map((prize, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {prize.image ? (
                          <img src={prize.image} alt={prize.prizeName} className="w-8 h-8 object-cover rounded" />
                        ) : (
                          <Trophy className="w-6 h-6 text-yellow-500" />
                        )}
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
                        <h5 className="font-medium text-gray-900 text-sm">{prize.prizeName}</h5>
                        <p className="text-gray-600 text-xs">{prize.description}</p>
                        <p className="text-yellow-600 text-xs font-medium">Value: {prize.value}</p>
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
                    {competition.sponsors.map((sponsor, index) => (
                      <div key={index} className="text-center">
                        {sponsor.website ? (
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
                        ) : (
                          <div>
                            <img 
                              src={sponsor.logo} 
                              alt={sponsor.name} 
                              className="w-full h-16 object-contain mb-2"
                            />
                            <span className="text-sm text-gray-600">{sponsor.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>

      <PackageDialog />
    </div>
  );
};

export default CompetitionDetailPage;
