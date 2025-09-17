'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CompetitionAPI, CompetitionDetail, handleApiError } from '@/lib/competitionAPI';
import { getAccessToken } from '@/lib/tokenManager';
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

      const token = getAccessToken();
      const hasToken = !!token;
      
      console.log('Fetching competition details for ID:', competitionId);
      console.log('Token found:', hasToken);
      
      // Fetch real competition details from API
      const response = await CompetitionAPI.getCompetitionDetail(competitionId, token);
      
      if (response.success) {
        console.log('Competition details fetched successfully:', response.competition);
        
        // Add authentication and button state logic
        const competitionData = response.competition;
        const hasToken = !!token;
        
        // Debug: Log the registration status from API
        console.log('API Registration Status:', {
          isRegistered: competitionData.isRegistered,
          userRegistration: competitionData.userRegistration,
          requiresPackage: competitionData.requiresPackage,
          packageValid: competitionData.packageValid,
          packageGrade: competitionData.packageGrade
        });
        
        // Check if we need to verify registration status separately
        let isRegistered = competitionData.isRegistered;
        
        // If the API doesn't return registration status, try to check it via dashboard
        if (hasToken && isRegistered === undefined) {
          console.log('Registration status not provided by API, checking dashboard...');
          try {
            const dashboardResponse = await CompetitionAPI.getCompetitionDashboard(competitionId, token);
            if (dashboardResponse.success) {
              isRegistered = true;
              console.log('User is registered (confirmed via dashboard)');
            } else {
              isRegistered = false;
              console.log('User is not registered (confirmed via dashboard)');
            }
          } catch (err) {
            console.log('Could not verify registration status, assuming not registered');
            isRegistered = false;
          }
        }
        
        // Determine button state based on authentication and registration status
        let buttonState: 'not_logged_in' | 'needs_package' | 'can_apply' | 'already_applied';
        let buttonText: string;
        let buttonAction: 'login' | 'package' | 'apply' | 'dashboard';
        
        if (!hasToken) {
          buttonState = 'not_logged_in';
          buttonText = 'Sign Up/Log In';
          buttonAction = 'login';
          console.log('Button state: Not logged in');
        } else if (isRegistered) {
          buttonState = 'already_applied';
          buttonText = 'Go to Dashboard';
          buttonAction = 'dashboard';
          console.log('Button state: Already registered - showing dashboard button');
        } else if (competitionData.requiresPackage && !competitionData.packageValid) {
          buttonState = 'needs_package';
          buttonText = 'Purchase Package';
          buttonAction = 'package';
          console.log('Button state: Needs package');
        } else {
          buttonState = 'can_apply';
          buttonText = 'Apply Now';
          buttonAction = 'apply';
          console.log('Button state: Can apply');
        }
        
        // Add the computed properties to the competition data
        const enhancedCompetition = {
          ...competitionData,
          isRegistered,
          buttonState,
          buttonText,
          buttonAction
        };
        
        console.log('Enhanced competition data:', enhancedCompetition);
        console.log('Final button state:', buttonState);
        console.log('Final button text:', buttonText);
        
        setCompetition(enhancedCompetition);
      } else {
        console.error('Failed to fetch competition details:', response);
        setError('Failed to load competition details');
      }
      
    } catch (err) {
      console.error('Error fetching competition details:', err);
      setError(handleApiError(err));
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
        router.push(`/competitions/dashboard/${competition.id}`);
        break;
        
      default:
        console.log('Unknown button state');
    }
  };

  const applyForCompetition = async () => {
    try {
      setApplying(true);
      const token = getAccessToken();
      
      if (!token) {
        router.push('/login');
        return;
      }

      console.log('Applying for competition:', competitionId);
      console.log('Using token:', token ? `Token present (${token.substring(0, 20)}...)` : 'No token');

      // Make real API call to apply for competition
      const response = await CompetitionAPI.applyForCompetition(competitionId, token);

      if (response.success) {
        console.log('Application successful:', response);
        setApplyMessage(`Successfully registered! Your Exam ID: ${response.examId}`);
        
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

        // Show success message
        setTimeout(() => {
          setApplyMessage(null);
        }, 5000);
      } else {
        console.error('Application failed:', response);
        
        // Handle package requirement error
        if (response.requiresPackage) {
          setShowPackageDialog(true);
          setError(`${response.message} Please purchase a Grade ${response.grade} package to participate in this competition.`);
        } else {
          setError(response.message || 'Failed to apply for competition');
        }
      }

    } catch (err) {
      console.error('Error applying for competition:', err);
      setError(handleApiError(err));
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
