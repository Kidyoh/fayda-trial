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
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'prizes' | 'sponsors'>('overview');

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
      <div className="min-h-screen bg-white relative">
        {/* Hero Section Skeleton */}
        <section className="relative pt-20 bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center text-white pb-16 md:pt-24">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto px-6 z-10 relative">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse">
                <div className="h-16 bg-white/20 rounded w-3/4 mx-auto mb-6"></div>
                <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
                  <div className="h-6 bg-white/20 rounded w-32"></div>
                  <div className="h-6 bg-white/20 rounded w-32"></div>
                  <div className="h-6 bg-white/20 rounded w-32"></div>
                </div>
                <div className="h-12 bg-white/20 rounded w-48 mx-auto mb-12"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 h-24"></div>
                  ))}
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 h-24"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Skeleton */}
        <div className="container mx-auto px-6 pb-16 relative z-10">
          <div className="mt-8 space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/80 backdrop-blur-md rounded-2xl p-8 h-48 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !competition) {
    return (
      <div className="min-h-screen bg-white relative">
        {/* Hero Section with Error */}
        <section className="relative pt-20 bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center text-white pb-16 md:pt-24">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto px-6 z-10 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">Competition Not Found</h1>
              <p className="text-xl mb-8 text-white/90">The competition you're looking for doesn't exist or has been removed</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 pb-16 relative z-10">
          <div className="text-center mt-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-[#c7cc3f]/30 shadow-lg max-w-md mx-auto">
              <AlertCircle className="w-16 h-16 text-[#07705d] mx-auto mb-4" />
              <p className="text-[#07705d] mb-6 text-lg">{error || 'Competition not found'}</p>
              <Button 
                onClick={() => router.push('/competitions')}
                className="bg-[#07705d] hover:bg-[#07705d]/90 text-white px-6 py-3 rounded-xl"
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
    <div className="min-h-screen bg-white relative">
      {/* Hero Section with Background Image */}
      <section className="relative pt-20 bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center text-white pb-16 md:pt-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-6 z-10 relative">
          <div className="max-w-4xl mx-auto">
            {/* Event Title */}
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-center">
              {competition.title}
            </h1>
            
            {/* Event Metadata */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#c7cc3f]" />
                <span>Fayida Academy Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#c7cc3f]" />
                <span>{formatCompetitionDate(competition.startDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#c7cc3f]" />
                <span>{competition.registrationCount} participants</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center mb-12">
              {competition && (
                <Button 
                  onClick={handleButtonClick}
                  disabled={applying}
                  className={`text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${getButtonClass(competition.buttonState)}`}
                >
                  {getButtonIcon(competition.buttonState)}
                  {applying ? 'Applying...' : competition.buttonText}
                </Button>
              )}
            </div>

            {/* Glassmorphism Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <Users className="w-8 h-8 text-[#c7cc3f] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{competition.registrationCount}</div>
                <div className="text-sm text-white/80">Participants</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <Trophy className="w-8 h-8 text-[#c7cc3f] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{competition.totalPrizes}</div>
                <div className="text-sm text-white/80">Prizes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <Clock className="w-8 h-8 text-[#c7cc3f] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{competition.examCount || 0}</div>
                <div className="text-sm text-white/80">Exams</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <Calendar className="w-8 h-8 text-[#c7cc3f] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{formatCompetitionDate(competition.startDate)}</div>
                <div className="text-sm text-white/80">Event Date</div>
              </div>
            </div>

            {/* Registration Progress Bar */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Registration Progress</h3>
                <span className="text-[#c7cc3f] font-bold">{competition.registrationCount}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-[#07705d] to-[#c7cc3f] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(competition.registrationCount, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-white/80">
                {Math.max(0, 100 - competition.registrationCount)} spots remaining
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#c7cc3f]/30 shadow-lg">
          <div className="flex flex-wrap">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors rounded-tl-2xl ${
                activeTab === 'overview' 
                  ? 'text-[#07705d] bg-[#c7cc3f]/10 border-b-2 border-[#07705d]' 
                  : 'text-gray-600 hover:text-[#07705d] hover:bg-[#c7cc3f]/5'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('schedule')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'schedule' 
                  ? 'text-[#07705d] bg-[#c7cc3f]/10 border-b-2 border-[#07705d]' 
                  : 'text-gray-600 hover:text-[#07705d] hover:bg-[#c7cc3f]/5'
              }`}
            >
              Schedule
            </button>
            <button 
              onClick={() => setActiveTab('prizes')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'prizes' 
                  ? 'text-[#07705d] bg-[#c7cc3f]/10 border-b-2 border-[#07705d]' 
                  : 'text-gray-600 hover:text-[#07705d] hover:bg-[#c7cc3f]/5'
              }`}
            >
              Prizes
            </button>
            <button 
              onClick={() => setActiveTab('sponsors')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors rounded-tr-2xl ${
                activeTab === 'sponsors' 
                  ? 'text-[#07705d] bg-[#c7cc3f]/10 border-b-2 border-[#07705d]' 
                  : 'text-gray-600 hover:text-[#07705d] hover:bg-[#c7cc3f]/5'
              }`}
            >
              Sponsors
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-16 relative z-10">
        {/* Success/Error Messages */}
        {applyMessage && (
          <div className="mt-8">
            <Alert className="border-[#07705d]/20 bg-[#07705d]/5">
              <CheckCircle className="h-4 w-4 text-[#07705d]" />
              <AlertDescription className="text-[#07705d]">
                {applyMessage}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* About the Event Section */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-[#c7cc3f]/30 shadow-lg">
                <h2 className="text-3xl font-bold text-[#07705d] mb-6">About the Event</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {competition.description}
                  </p>
                </div>
              </div>

              {/* Requirements Section */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-[#c7cc3f]/30 shadow-lg">
                <h2 className="text-3xl font-bold text-[#07705d] mb-6">Requirements</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#07705d] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700">Valid Grade {competition.grade} package covering the full tournament duration</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#07705d] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700">Stable internet connection for online participation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#07705d] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700">Device with camera and microphone for exam monitoring</p>
                  </div>
                </div>
              </div>

              {/* Call to Action Section */}
              <div className="bg-gradient-to-r from-[#07705d] to-[#c7cc3f] rounded-2xl p-8 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Ready to participate?</h2>
                <p className="text-xl mb-6 text-white/90">Join {competition.registrationCount}+ participants in this exciting competition</p>
                {competition && (
                  <Button 
                    onClick={handleButtonClick}
                    disabled={applying}
                    className="bg-white text-[#07705d] hover:bg-white/90 font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {getButtonIcon(competition.buttonState)}
                    {applying ? 'Applying...' : competition.buttonText} →
                  </Button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-8">
              {/* Exams Schedule Section */}
              {competition.exams && competition.exams.length > 0 ? (
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-[#c7cc3f]/30 shadow-lg">
                  <h2 className="text-3xl font-bold text-[#07705d] mb-6">Exam Schedule</h2>
                  <div className="space-y-6">
                    {competition.exams.map((exam, index) => (
                      <div key={exam.id} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-[#c7cc3f]/20">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <h4 className="text-xl font-semibold text-[#07705d] mb-2 md:mb-0">
                            Day {exam.day} - {exam.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-[#c7cc3f]/20 text-[#07705d] border-0 px-3 py-1">
                              {formatCompetitionDate(exam.scheduledDateTime)}
                            </Badge>
                            <Badge className="bg-[#07705d]/20 text-[#07705d] border-0 px-3 py-1">
                              {formatCompetitionTime(exam.scheduledDateTime)}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#c7cc3f]" />
                            <span>{exam.totalQuestions} Questions</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-[#c7cc3f]" />
                            <span>{exam.duration} Minutes Duration</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-[#c7cc3f]/30 shadow-lg text-center">
                  <Clock className="w-16 h-16 text-[#c7cc3f] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-[#07705d] mb-4">No Schedule Available</h2>
                  <p className="text-gray-600">Exam schedule will be announced soon. Check back later for updates.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'prizes' && (
            <div className="space-y-8">
              {/* Prizes Section */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-[#c7cc3f]/30 shadow-lg">
                <h2 className="text-3xl font-bold text-[#07705d] mb-6">Prizes & Awards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {competition.prizes.map((prize, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-[#c7cc3f]/20 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#07705d] to-[#c7cc3f] rounded-full flex items-center justify-center mx-auto mb-4">
                        {prize.image ? (
                          <img src={prize.image} alt={prize.prizeName} className="w-10 h-10 object-cover rounded-full" />
                        ) : (
                          <Trophy className="w-8 h-8 text-white" />
                        )}
                      </div>
                      <div className="mb-2">
                        <Badge className="bg-[#c7cc3f]/20 text-[#07705d] border-0 px-3 py-1">
                          {prize.rank === 1 ? '🥇 1st Place' : 
                           prize.rank === 2 ? '🥈 2nd Place' :
                           prize.rank === 3 ? '🥉 3rd Place' :
                           `${prize.rank}th Place`}
                        </Badge>
                      </div>
                      <h5 className="font-semibold text-[#07705d] text-lg mb-2">{prize.prizeName}</h5>
                      <p className="text-gray-600 text-sm mb-2">{prize.description}</p>
                      <p className="text-[#c7cc3f] font-bold">Value: {prize.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sponsors' && (
            <div className="space-y-8">
              {/* Sponsors Section */}
              {competition.sponsors && competition.sponsors.length > 0 ? (
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-[#c7cc3f]/30 shadow-lg">
                  <h2 className="text-3xl font-bold text-[#07705d] mb-6">Our Sponsors</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {competition.sponsors.map((sponsor, index) => (
                      <div key={index} className="text-center">
                        {sponsor.website ? (
                          <a 
                            href={sponsor.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block hover:opacity-80 transition-opacity bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[#c7cc3f]/20"
                          >
                            <img 
                              src={sponsor.logo} 
                              alt={sponsor.name} 
                              className="w-full h-16 object-contain mb-3"
                            />
                            <span className="text-sm text-[#07705d] font-medium">{sponsor.name}</span>
                            <ExternalLink className="w-3 h-3 inline ml-1 text-[#c7cc3f]" />
                          </a>
                        ) : (
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[#c7cc3f]/20">
                            <img 
                              src={sponsor.logo} 
                              alt={sponsor.name} 
                              className="w-full h-16 object-contain mb-3"
                            />
                            <span className="text-sm text-[#07705d] font-medium">{sponsor.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-[#c7cc3f]/30 shadow-lg text-center">
                  <Trophy className="w-16 h-16 text-[#c7cc3f] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-[#07705d] mb-4">No Sponsors Yet</h2>
                  <p className="text-gray-600">Sponsor information will be updated soon. Check back later for updates.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <PackageDialog />
    </div>
  );
};

export default CompetitionDetailPage;
