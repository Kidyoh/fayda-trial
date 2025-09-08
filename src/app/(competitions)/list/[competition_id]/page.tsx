'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CompetitionAPI, CompetitionDetail, UserPackage, CompetitionEnrollment, isPackageValidForCompetition } from '@/lib/competitionAPI';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  ShoppingCart
} from 'lucide-react';
import { formatCompetitionDate, formatCompetitionTime, getCompetitionStatus, calculateTimeRemaining } from '@/lib/competitionAPI';
import CountdownTimer from '@/components/competitions/CountdownTimer';
import ExamSection from '@/components/competitions/ExamSection';
import Leaderboard from '@/components/competitions/Leaderboard';

const CompetitionDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const competitionId = params.competition_id as string;

  const [competition, setCompetition] = useState<CompetitionDetail | null>(null);
  const [userEnrollment, setUserEnrollment] = useState<CompetitionEnrollment | null>(null);
  const [userPackages, setUserPackages] = useState<UserPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [showPackageDialog, setShowPackageDialog] = useState(false);
  const [enrollmentMessage, setEnrollmentMessage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (you'll need to implement this based on your auth system)
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
    
    fetchCompetitionDetails();
  }, [competitionId]);

  const fetchCompetitionDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('accessToken');
      const response = await CompetitionAPI.getCompetitionDetail(competitionId, token || undefined);

      if (response.success) {
        setCompetition(response.competition);
        setUserEnrollment(response.userEnrollment || null);
        setUserPackages(response.userPackages || []);
      } else {
        setError('Failed to fetch competition details');
      }
    } catch (err) {
      console.error('Error fetching competition details:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch competition details');
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollment = async (packageId?: string) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    if (!competition) return;

    // Check if user has appropriate package
    const validPackages = userPackages.filter(pkg => {
      const validation = isPackageValidForCompetition(pkg, competition);
      return validation.valid;
    });

    if (validPackages.length === 0) {
      setShowPackageDialog(true);
      return;
    }

    try {
      setEnrolling(true);
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        router.push('/login');
        return;
      }

      const selectedPackage = packageId ? 
        userPackages.find(pkg => pkg.id === packageId) : 
        validPackages[0];

      if (!selectedPackage) {
        setShowPackageDialog(true);
        return;
      }

      const response = await CompetitionAPI.enrollInCompetition({
        competitionId: competition.id,
        packageId: selectedPackage.id
      }, token);

      if (response.success) {
        setUserEnrollment(response.enrollment || null);
        setEnrollmentMessage(`Successfully enrolled! Your Exam ID: ${response.examId}`);
        // Refresh competition details to get updated participant count
        fetchCompetitionDetails();
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error('Error enrolling in competition:', err);
      setError(err instanceof Error ? err.message : 'Failed to enroll in competition');
    } finally {
      setEnrolling(false);
    }
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

    if (userEnrollment) {
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
        onClick={() => handleEnrollment()}
        disabled={enrolling}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {enrolling ? 'Enrolling...' : 'Apply Now'}
      </Button>
    );
  };

  const PackageDialog = () => (
    <Dialog open={showPackageDialog} onOpenChange={setShowPackageDialog}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Package Required</DialogTitle>
          <DialogDescription>
            {competition && (
              <>
                To apply for this Grade {competition.grade} tournament, you need to purchase a Grade {competition.grade} package that covers the full tournament duration.
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
              router.push(`/explore_packages?grade=${competition?.grade}`);
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
      <div className="min-h-screen bg-gray-50 py-8">
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
      <div className="min-h-screen bg-gray-50 py-8">
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

  const competitionStatus = getCompetitionStatus(competition.startDate, competition.endDate);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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
                  competitionStatus === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  competitionStatus === 'ongoing' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {competitionStatus.charAt(0).toUpperCase() + competitionStatus.slice(1)}
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
                      {formatCompetitionDate(competition.startDate)} - {formatCompetitionDate(competition.endDate)}
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
              {competitionStatus === 'upcoming' && (
                <div className="mb-4">
                  <CountdownTimer targetDate={competition.startDate} />
                </div>
              )}
              {getActionButton()}
            </div>
          </div>

          {/* Success/Error Messages */}
          {enrollmentMessage && (
            <Alert className="mt-4 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {enrollmentMessage}
              </AlertDescription>
            </Alert>
          )}
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
                    {competition.requirements.map((requirement, index) => (
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
                  {competition.schedule.map((exam, index) => (
                    <div key={exam.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          Day {exam.day} - {exam.title}
                        </h4>
                        <Badge variant="outline" className="text-sm">
                          {formatCompetitionDate(exam.date)} at {exam.time}
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

            {/* Exam Section - Only show if user is enrolled */}
            {userEnrollment && (
              <ExamSection 
                competitionId={competition.id}
                examSections={competition.examSections}
                enrollment={userEnrollment}
              />
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
                  {competition.prizes.map((prize) => (
                    <div key={prize.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {prize.image ? (
                          <img src={prize.image} alt={prize.name} className="w-8 h-8 object-cover rounded" />
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
                        <h5 className="font-medium text-gray-900 text-sm">{prize.name}</h5>
                        <p className="text-gray-600 text-xs">{prize.description}</p>
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
                    {competition.sponsors.map((sponsor) => (
                      <div key={sponsor.id} className="text-center">
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

            {/* Leaderboard */}
            {userEnrollment && (
              <Leaderboard competitionId={competition.id} grade={competition.grade} />
            )}
          </div>
        </div>
      </div>

      <PackageDialog />
    </div>
  );
};

export default CompetitionDetailPage;
