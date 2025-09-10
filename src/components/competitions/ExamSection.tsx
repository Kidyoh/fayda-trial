'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CompetitionAPI, ExamSection as ExamSectionType, CompetitionEnrollment, calculateTimeRemaining } from '@/lib/competitionAPI';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Lock, 
  Play, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  BookOpen,
  Timer
} from 'lucide-react';

interface ExamSectionProps {
  competitionId: string;
  examSections: ExamSectionType[];
  enrollment: CompetitionEnrollment;
}

const ExamSection: React.FC<ExamSectionProps> = ({ 
  competitionId, 
  examSections, 
  enrollment 
}) => {
  const router = useRouter();
  const [examAccess, setExamAccess] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [showExamIdDialog, setShowExamIdDialog] = useState(false);
  const [selectedExamSection, setSelectedExamSection] = useState<ExamSectionType | null>(null);
  const [examId, setExamId] = useState('');
  const [examIdError, setExamIdError] = useState<string | null>(null);

  useEffect(() => {
    // Check access for all exam sections
    examSections.forEach(section => {
      checkExamAccess(section.id);
    });
  }, [examSections]);

  const checkExamAccess = async (examSectionId: string) => {
    try {
      setLoading(prev => ({ ...prev, [examSectionId]: true }));
      
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await CompetitionAPI.checkExamAccess(
        competitionId,
        examSectionId,
        token
      );

      setExamAccess(prev => ({
        ...prev,
        [examSectionId]: response
      }));
    } catch (error) {
      console.error('Error checking exam access:', error);
    } finally {
      setLoading(prev => ({ ...prev, [examSectionId]: false }));
    }
  };

  const handleExamAccess = (section: ExamSectionType) => {
    const access = examAccess[section.id];
    
    if (!access?.canAccess) {
      return;
    }

    if (section.status === 'available') {
      setSelectedExamSection(section);
      setShowExamIdDialog(true);
    }
  };

  const handleEnterExam = () => {
    if (!selectedExamSection || !examId.trim()) {
      setExamIdError('Please enter your Exam ID');
      return;
    }

    // Validate exam ID format or make API call to validate
    if (examId !== enrollment.examId) {
      setExamIdError('Invalid Exam ID. Please check your email or SMS for the correct ID.');
      return;
    }

    // Navigate to exam page
    router.push(`/competitions/${competitionId}/exam/${selectedExamSection.id}?examId=${examId}`);
  };

  const getExamStatusIcon = (section: ExamSectionType) => {
    switch (section.status) {
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />;
      case 'available':
        return <Play className="w-5 h-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'closed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getExamStatusColor = (section: ExamSectionType) => {
    switch (section.status) {
      case 'locked':
        return 'bg-gray-100 text-gray-600';
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'closed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getButtonText = (section: ExamSectionType) => {
    switch (section.status) {
      case 'locked':
        return 'Locked';
      case 'available':
        return 'Enter Exam';
      case 'completed':
        return 'View Results';
      case 'closed':
        return 'Closed';
      default:
        return 'Unavailable';
    }
  };

  const ExamCountdown: React.FC<{ section: ExamSectionType }> = ({ section }) => {
    const [timeRemaining, setTimeRemaining] = useState(
      calculateTimeRemaining(`${section.scheduledDate}T${section.scheduledTime}`)
    );

    useEffect(() => {
      if (section.status !== 'locked') return;

      const interval = setInterval(() => {
        const remaining = calculateTimeRemaining(`${section.scheduledDate}T${section.scheduledTime}`);
        setTimeRemaining(remaining);

        if (remaining.total <= 0) {
          // Refresh exam access when countdown reaches zero
          checkExamAccess(section.id);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [section]);

    if (section.status !== 'locked' || timeRemaining.total <= 0) {
      return null;
    }

    return (
      <div className="text-sm text-gray-600 mt-2">
        <div className="flex items-center gap-1 mb-1">
          <Timer className="w-4 h-4" />
          <span>Unlocks in:</span>
        </div>
        <div className="font-mono font-medium">
          {timeRemaining.days > 0 && `${timeRemaining.days}d `}
          {timeRemaining.hours.toString().padStart(2, '0')}:
          {timeRemaining.minutes.toString().padStart(2, '0')}:
          {timeRemaining.seconds.toString().padStart(2, '0')}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Exam Sections</CardTitle>
        <CardDescription>
          Complete each exam section during its scheduled time window.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {examSections.map((section) => {
            const access = examAccess[section.id];
            const isLoading = loading[section.id];

            return (
              <div 
                key={section.id} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {section.thumbnailImage ? (
                      <img 
                        src={section.thumbnailImage} 
                        alt={section.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {section.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          {section.description}
                        </p>
                      </div>
                      
                      <Badge className={`${getExamStatusColor(section)} border-0 font-medium`}>
                        <div className="flex items-center gap-1">
                          {getExamStatusIcon(section)}
                          <span className="capitalize">{section.status}</span>
                        </div>
                      </Badge>
                    </div>

                    {/* Exam Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Date:</span>
                        <div>{new Date(section.scheduledDate).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="font-medium">Time:</span>
                        <div>{section.scheduledTime}</div>
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span>
                        <div>{section.duration} minutes</div>
                      </div>
                      <div>
                        <span className="font-medium">Questions:</span>
                        <div>{section.questionCount}</div>
                      </div>
                    </div>

                    {/* Topics */}
                    {section.topics && section.topics.length > 0 && (
                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-700">Topics: </span>
                        <span className="text-sm text-gray-600">
                          {section.topics.join(', ')}
                        </span>
                      </div>
                    )}

                    {/* Countdown Timer for locked exams */}
                    <ExamCountdown section={section} />

                    {/* Access Messages */}
                    {access && !access.canAccess && access.message && (
                      <Alert className="mt-2 border-orange-200 bg-orange-50">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <AlertDescription className="text-orange-800">
                          {access.message}
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Action Button */}
                    <div className="mt-3">
                      <Button
                        onClick={() => handleExamAccess(section)}
                        disabled={isLoading || !access?.canAccess || section.status === 'locked'}
                        variant={section.status === 'available' ? 'default' : 'outline'}
                        className={
                          section.status === 'available' 
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : ''
                        }
                      >
                        {isLoading ? 'Checking...' : getButtonText(section)}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>

      {/* Exam ID Dialog */}
      <Dialog open={showExamIdDialog} onOpenChange={setShowExamIdDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Exam ID</DialogTitle>
            <DialogDescription>
              Please enter your Exam ID to access the exam. You should have received this via email and SMS.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="examId">Exam ID</Label>
              <Input
                id="examId"
                type="text"
                placeholder="Enter your Exam ID"
                value={examId}
                onChange={(e) => {
                  setExamId(e.target.value);
                  setExamIdError(null);
                }}
                className="mt-1"
              />
              {examIdError && (
                <p className="text-red-600 text-sm mt-1">{examIdError}</p>
              )}
            </div>
            
            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Important:</strong> The exam timer starts at the scheduled time, regardless of when you log in. 
                If you're late, your remaining time will be reduced.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowExamIdDialog(false);
                setExamId('');
                setExamIdError(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleEnterExam}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Enter Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ExamSection;






