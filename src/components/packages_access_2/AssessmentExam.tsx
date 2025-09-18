"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../lib/tokenManager";
import { 
  Brain, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Timer, 
  Flag, 
  Save,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AssessmentExamProps {
  assessmentId: string;
  onComplete: (result: any) => void;
  onExit: () => void;
}

interface Question {
  id: string;
  question: string;
  choiseA: string;
  choiseB: string;
  choiseC: string;
  choiseD: string;
  questionImage?: string;
  questionImageUrl?: string;
}

export default function AssessmentExam({ assessmentId, onComplete, onExit }: AssessmentExamProps) {
  const accessToken = getAccessToken();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [totalQuestionCounts, setTotalQuestionsCounts] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [showSidebar, setShowSidebar] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const countNullValues = (arr: any[]): number => {
    return arr.filter(value => value === undefined).length;
  };

  const handleSubmit = async (event?: any) => {
    if (event) event.preventDefault();
    
    if (parseInt(totalQuestionCounts) === selectedAnswers.length && countNullValues(selectedAnswers) === 0) {
      try {
        const response = await axios.post(
          `${apiUrl}/assesments/submit-answers/${assessmentId}`,
          { answers: selectedAnswers },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        
        const responseData = response.data;
        if (response.status === 200) {
          onComplete(responseData);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to submit assessment. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Incomplete Assessment",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
    }
  };

  const automaticSubmit = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/assesments/submit-answers/${assessmentId}`,
        { answers: selectedAnswers },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      if (response.status === 200) {
        onComplete(response.data);
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };

  const autoSave = async () => {
    if (!autoSaveEnabled) return;
    
    try {
      // Auto-save logic here - you might want to implement a separate endpoint for auto-saving
      setLastSaved(new Date());
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/purchaselist/specificStudentSingleAssessment/${assessmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const jsonData = await response.json();
        console.log("Assessment data:", jsonData); // Debug log
        setData(jsonData);
        if (jsonData[0] && jsonData[0].duration) {
          setSeconds(jsonData[0].duration * 60);
        }
        if (jsonData[0] && jsonData[0].question) {
          setTotalQuestionsCounts(jsonData[0].question.length.toString());
          setQuestions(jsonData[0].question);
          setSelectedAnswers(new Array(jsonData[0].question.length).fill(undefined));
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [assessmentId, accessToken]);

  useEffect(() => {
    if (seconds <= 0) return;

    const timerId = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timerId);
          automaticSubmit();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (autoSaveEnabled) {
      autoSaveIntervalRef.current = setInterval(autoSave, 30000);
    }

    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
    };
  }, [autoSaveEnabled]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelection = (questionIndex: number, answerId: string) => {
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerId;
      return newAnswers;
    });
  };

  const toggleFlag = (questionIndex: number) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionIndex)) {
        newSet.delete(questionIndex);
      } else {
        newSet.add(questionIndex);
      }
      return newSet;
    });
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getQuestionStatus = (index: number) => {
    if (index === currentQuestionIndex) return "current";
    if (selectedAnswers[index] !== undefined) return "answered";
    if (flaggedQuestions.has(index)) return "flagged";
    return "unanswered";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current": return "bg-gradient-to-r from-[#07705d] to-[#bf8c13] text-white border-[#bf8c13] shadow-md";
      case "answered": return "bg-green-100 text-green-700 border-green-300 shadow-sm";
      case "flagged": return "bg-yellow-100 text-yellow-700 border-yellow-300 shadow-sm";
      default: return "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Brain size={40} className="text-primaryColor animate-bounce" />
          <p className="text-gray-500 font-medium">Loading assessment...</p>
        </div>
      </div>
    );
  }

  const answeredQuestions = selectedAnswers.filter(answer => answer !== undefined).length;
  const progressPercentage = (answeredQuestions / parseInt(totalQuestionCounts)) * 100;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c7cc3f]/10 to-white">
      {/* Sticky Header with Timer */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#bf8c13]/20 shadow-lg">
        <div className="px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-[#07705d] flex items-center gap-2">
                <Brain className="h-6 w-6 text-[#bf8c13]" />
                Assessment in Progress
              </h1>
              <Badge variant="outline" className="text-sm border-[#bf8c13]/30 text-[#07705d]">
                Question {currentQuestionIndex + 1} of {totalQuestionCounts}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Progress */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">Progress</span>
                <div className="w-24 md:w-32">
                  <Progress value={progressPercentage} className="h-2 bg-gray-200" />
                </div>
                <span className="text-sm font-medium text-[#07705d]">
                  {answeredQuestions}/{totalQuestionCounts}
                </span>
              </div>

              {/* Timer */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl px-4 py-3 border-2 border-red-200 shadow-md">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-xs font-medium text-red-600">Time Remaining</p>
                    <p className="text-xl font-bold text-red-700">{formatTime(seconds)}</p>
                  </div>
                </div>
              </div>

              {/* Auto-save indicator */}
              {lastSaved && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Save className="h-3 w-3" />
                  <span>Saved {lastSaved.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6">
        {/* Sidebar - Question Navigation */}
        <div className={`${showSidebar ? 'w-full lg:w-80' : 'w-0'} transition-all duration-300 bg-white rounded-xl border border-[#bf8c13]/20 shadow-lg flex flex-col`}>
          <div className="p-4 border-b border-[#bf8c13]/20">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#07705d]">Question Navigation</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-1 text-[#bf8c13] hover:bg-[#bf8c13]/10"
              >
                {showSidebar ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, index) => {
                const status = getQuestionStatus(index);
                return (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-all hover:scale-105 ${getStatusColor(status)}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="text-sm font-medium text-[#07705d]">Legend:</div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#bf8c13]"></div>
                  <span>Current Question</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-100 border border-green-200"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-200"></div>
                  <span>Flagged</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-100 border border-gray-200"></div>
                  <span>Unanswered</span>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Question Content */}
          <div className="flex-1">
            <Card className="p-6 md:p-8 bg-white rounded-xl border border-[#bf8c13]/20 shadow-lg">
              <div className="space-y-6">
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#07705d] to-[#bf8c13] flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-lg">{currentQuestionIndex + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#07705d] leading-relaxed">
                        {currentQuestion?.question}
                      </h3>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFlag(currentQuestionIndex)}
                    className={`flex items-center gap-2 border-2 ${
                      flaggedQuestions.has(currentQuestionIndex) 
                        ? 'bg-yellow-50 border-yellow-300 text-yellow-700' 
                        : 'border-[#bf8c13]/30 text-[#07705d] hover:bg-yellow-50'
                    }`}
                  >
                    <Flag className="h-4 w-4" />
                    {flaggedQuestions.has(currentQuestionIndex) ? 'Flagged' : 'Flag'}
                  </Button>
                </div>

                {/* Question Image */}
                {currentQuestion?.questionImage && (
                  <div className="mt-6">
                    <img
                      src={currentQuestion.questionImageUrl}
                      alt="Question"
                      className="max-w-full h-auto rounded-lg border-2 border-[#bf8c13]/20 shadow-md"
                    />
                  </div>
                )}

                {/* Answer Choices */}
                <RadioGroup
                  value={selectedAnswers[currentQuestionIndex]}
                  onValueChange={(value) => handleAnswerSelection(currentQuestionIndex, value)}
                  className="space-y-4"
                >
                  {[
                    { id: "a", text: currentQuestion?.choiseA },
                    { id: "b", text: currentQuestion?.choiseB },
                    { id: "c", text: currentQuestion?.choiseC },
                    { id: "d", text: currentQuestion?.choiseD },
                  ].map((choice) => (
                    <div key={choice.id} className="flex items-center space-x-4 p-4 rounded-xl border-2 border-[#bf8c13]/20 hover:bg-gradient-to-r hover:from-[#c7cc3f]/5 hover:to-[#bf8c13]/5 transition-all duration-200 hover:shadow-md">
                      <RadioGroupItem
                        value={choice.id}
                        id={`${currentQuestion?.id}-${choice.id}`}
                        className="border-2 border-[#bf8c13] text-[#bf8c13]"
                      />
                      <Label
                        htmlFor={`${currentQuestion?.id}-${choice.id}`}
                        className="text-[#07705d] cursor-pointer flex-1 text-lg font-medium"
                      >
                        <span className="font-bold mr-3 text-[#bf8c13]">{choice.id.toUpperCase()}.</span>
                        {choice.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </Card>
          </div>

          {/* Navigation Footer */}
          <div className="mt-6 bg-white rounded-xl border border-[#bf8c13]/20 p-4 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2 border-2 border-[#bf8c13]/30 text-[#07705d] hover:bg-[#bf8c13]/10 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <Button
                  variant="outline"
                  onClick={nextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="flex items-center gap-2 border-2 border-[#bf8c13]/30 text-[#07705d] hover:bg-[#bf8c13]/10 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={onExit}
                  className="text-[#07705d] border-2 border-red-200 hover:bg-red-50 hover:border-red-300"
                >
                  Exit Assessment
                </Button>
                
                <Button
                  onClick={() => handleSubmit()}
                  className="px-6 bg-gradient-to-r from-[#07705d] to-[#bf8c13] text-white hover:from-[#07705d]/90 hover:to-[#bf8c13]/90 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Submit Assessment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
