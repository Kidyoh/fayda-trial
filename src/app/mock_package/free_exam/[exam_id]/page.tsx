"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import ShowResult from "@/app/packages_access/assessment_questions/show_result";
import useSelectedMockPackageStore from "@/app/store/selectedmockpackageStore";
import useTemporaryPhonenumberStore from "@/app/store/temporaryphonenumberStore";
import { useRouter } from "next/navigation";
import { Brain, Clock, AlertCircle, CheckCircle2, Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function AssessmentQuestions({ params }: any) {
  const { push } = useRouter();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [totalQuestionCounts, setTotalQuestionsCounts] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [questions, setQuestions] = useState<any>([]);
  const [onExam, setOnExam] = useState(true);
  const [resultText, setResultText] = useState("");

  const MockPackage = useSelectedMockPackageStore((state) => state.mockpackage);
  const PhoneNumber = useTemporaryPhonenumberStore((state) => state.phoneNumber);

  function formatTextToHTML(text: any) {
    if (!text) return "";

    const formattedText = text
      .replace(/\^(.*?)\^/g, "<sup>$1</sup>")
      .replace(/\*\*\*(.*?)\*\*\*/g, "<sub>$1</sub>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/_(.*?)_/g, "<u>$1</u>")
      .replace(/&&8/g, "∞")
      .replace(/&&f/g, "ƒ")
      .replace(/&&arf/g, "→")
      .replace(/&&arb/g, "←")
      .replace(/&&aru/g, "↑")
      .replace(/&&ard/g, "↓")
      .replace(/&&pi/g, "π")
      .replace(/&&sqrt/g, "√")
      .replace(/&&noteq/g, "≠")
      .replace(/&&empty/g, "∅")
      .replace(/&&integ/g, "∫")
      .replace(/&&triangle/g, "△")
      .replace(/&&imp/g, "⇒")
      .replace(/&&bimp/g, "⇔")
      .replace(/&&invv/g, "∧")
      .replace(/&&alpha/g, "α")
      .replace(/&&beta/g, "β")
      .replace(/&&theta/g, "θ")
      .replace(/&&gamma/g, "γ")
      .replace(/&&lambda/g, "λ")
      .replace(/&&mu/g, "μ")
      .replace(/&&nu/g, "ν")
      .replace(/&&rho/g, "ρ")
      .replace(/&&tau/g, "τ")
      .replace(/&&phi/g, "φ")
      .replace(/&&psi/g, "ψ")
      .replace(/&&omega/g, "ω")
      .replace(/&&eta/g, "η")
      .replace(/&&dotdotdot/g, "⋮")
      .replace(/&&greaterequal/g, "≥")
      .replace(/&&lessequal/g, "≤")
      .replace(/&&plusminus/g, "±")
      .replace(/&&nl/g, "<br>")
      .replace(/&&dash/g, "________")
      .replace(/&&dashl/g, "______________________")
      .replace(/&&r/g, "<span style='font-size:1.2em'>&#8477;</span>")
      .replace(/&&nat/g, "<span style='font-size:1.2em'>&naturals;</span>")
      .replace(/&&rarw&([^&]*)&&/g, (_, text) => text + " \u2192");

    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  }

  useEffect(() => {
    if (MockPackage.id == undefined) {
      push("/mock_package/selectmainfolder");
    }
  }, []);

  const AssessmentId = params.exam_id;

  const countNullValues = (arr: any[]): number => {
    return arr.filter(value => value === undefined || value === "x" || value === "X").length;
  };

  const countSelectedAnswers = (arr: any[]): number => {
    return arr.filter(value => value !== undefined && value !== "x" && value !== "X").length;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    if (parseInt(totalQuestionCounts) === selectedAnswers.length && countNullValues(selectedAnswers) === 0) {
      try {
        const response = await axios.post(
          `${apiUrl}/assesments/submit-exam-answers/${AssessmentId}`,
          { answers: selectedAnswers },
          { withCredentials: true }
        );
        
        const responseData = response.data;
        if (response.status === 200) {
          setResultText(responseData.message);
          setIncorrectQuestions(responseData.incorrectQuestionNumbers);
          setOnExam(false);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to submit exam. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Incomplete Exam",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
    }
  };

  const automaticSubmit = async () => {
    const updatedAnswers = selectedAnswers.map(item => item === null ? "X" : item);
    setSelectedAnswers(updatedAnswers);

    try {
      const response = await axios.post(
        `${apiUrl}/assesments/submit-exam-answers/${AssessmentId}`,
        { answers: updatedAnswers },
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        setResultText(response.data.message);
        setIncorrectQuestions(response.data.incorrectQuestionNumbers);
        setOnExam(false);
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/mockexampackagepurchase/accessexam/${PhoneNumber}/${MockPackage?.id}/${AssessmentId}`,
          { credentials: "include" }
        );
        const jsonData = await response.json();
        setData(jsonData);
        setSeconds(jsonData.duration * 60);
        setTotalQuestionsCounts(jsonData.question.length);
        setQuestions(jsonData.question);
        setSelectedAnswers(Array(jsonData.question.length).fill("x"));
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [AssessmentId, MockPackage?.id, PhoneNumber]);

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

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelection = (questionIndex: number, answerId: string) => {
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerId;
      return newAnswers;
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Brain size={40} className="text-primaryColor animate-bounce" />
          <p className="text-gray-500 font-medium">Loading exam...</p>
        </div>
      </div>
    );
  }

  if (!onExam) {
    return <ShowResult reslultText={resultText} incorrectquestions={incorrectQuestions} questions={questions} />;
  }

  const answeredQuestions = countSelectedAnswers(selectedAnswers);
  const progressPercentage = (answeredQuestions / parseInt(totalQuestionCounts)) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Brain className="h-6 w-6 text-primaryColor" />
              Mock Exam Progress
            </h1>
            <p className="text-gray-600 mt-1">
              Complete all {totalQuestionCounts} questions within the time limit
            </p>
          </div>
          
          {/* Timer Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Timer className="h-5 w-5 text-primaryColor" />
              <div>
                <p className="text-sm font-medium text-gray-500">Time Remaining</p>
                <p className="text-xl font-bold text-gray-900">{formatTime(seconds)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Progress</span>
            <span className="text-sm font-medium text-primaryColor">
              {answeredQuestions} of {totalQuestionCounts} answered
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Questions */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {data?.question?.map((question: any, index: number) => (
          <Card key={question?.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primaryColor/10 flex items-center justify-center">
                  <span className="text-primaryColor font-semibold">{index + 1}</span>
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {formatTextToHTML(question?.question)}
                  </h3>
                  
                  {question?.questionImage && (
                    <img
                      src={question?.questionImageUrl}
                      alt="Question Image"
                      className="rounded-lg max-w-full h-auto"
                    />
                  )}

                  <RadioGroup
                    value={selectedAnswers[index]}
                    onValueChange={(value) => handleAnswerSelection(index, value)}
                    className="space-y-3"
                  >
                    {[
                      { id: "A", text: question.choiseA },
                      { id: "b", text: question.choiseB },
                      { id: "c", text: question.choiseC },
                      { id: "d", text: question.choiseD },
                    ].map((choice) => (
                      <div key={choice.id} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={choice.id}
                          id={`${question.id}-${choice.id}`}
                          className="border-2"
                        />
                        <Label
                          htmlFor={`${question.id}-${choice.id}`}
                          className="text-gray-700 cursor-pointer"
                        >
                          {formatTextToHTML(choice.text)}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            className="px-8 py-6 bg-primaryColor text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-primaryColor/90 transition-all hover:scale-105 hover:shadow-xl active:scale-100 flex items-center gap-2"
          >
            Submit Exam
            <CheckCircle2 className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
