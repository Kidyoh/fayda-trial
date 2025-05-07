"use client";
import { apiUrl } from "@/apiConfig";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowLeft, Brain, Trophy, Target, AlertCircle } from "lucide-react";
import confetti from 'canvas-confetti';

interface ShowResultProps {
  reslultText: string;
  incorrectquestions: number[];
  questions: any[];
}

export default function ShowResult({
  reslultText,
  incorrectquestions,
  questions,
}: ShowResultProps) {
  const [open, setOpen] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Trigger confetti if all questions are correct
    if (incorrectquestions.length === 0 && questions?.length > 0) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#10B981', '#6366F1', '#8B5CF6']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#10B981', '#6366F1', '#8B5CF6']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [incorrectquestions.length, questions]);

  function formatTextToHTML(text: string) {
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
      .replace(/&&.pi/g, "π")
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

  const correctCount = questions?.length - incorrectquestions.length;
  const score = Math.round((correctCount / questions?.length) * 100);
  const scoreColor = score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Results Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <span>{reslultText}</span>
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="w-full bg-primary text-white hover:bg-primary/90"
              onClick={() => setOpen(false)}
            >
              View Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Results Summary */}
      <div className="mb-8">
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Assessment Results</h1>
            <Link
              href="/mock_package/selectmainfolder"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Packages
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-4xl font-bold mb-2 text-primary">{score}%</div>
              <div className="text-sm text-gray-500">Overall Score</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-4xl font-bold mb-2 text-green-500">{correctCount}</div>
              <div className="text-sm text-gray-500">Correct Answers</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-4xl font-bold mb-2 text-red-500">{incorrectquestions.length}</div>
              <div className="text-sm text-gray-500">Incorrect Answers</div>
            </div>
          </div>

          {incorrectquestions.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
            >
              <Trophy className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-green-700 mb-2">
                Perfect Score! Congratulations!
              </h2>
              <p className="text-green-600">
                You've mastered this assessment. Keep up the excellent work!
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Questions Review */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Detailed Review
        </h2>

        {questions?.map((que, index) => {
          const isIncorrect = incorrectquestions.includes(index);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden
                ${isIncorrect ? 'border-red-200' : 'border-green-200'}`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center
                      ${isIncorrect ? 'bg-red-100' : 'bg-green-100'}`}
                    >
                      {isIncorrect ? (
                        <XCircle className="w-5 h-5 text-red-500" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Question {index + 1}
                    </h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium
                    ${isIncorrect ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                  >
                    {isIncorrect ? 'Incorrect' : 'Correct'}
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="text-gray-700">{formatTextToHTML(que.question)}</div>
                  
                  {que.questionImage && (
                    <img
                      src={que.questionImageUrl}
                      alt="Question Image"
                      className="rounded-lg max-h-64 object-contain"
                    />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { label: 'A', text: que.choiseA },
                      { label: 'B', text: que.choiseB },
                      { label: 'C', text: que.choiseC },
                      { label: 'D', text: que.choiseD },
                    ].map((choice) => (
                      <div
                        key={choice.label}
                        className={`p-3 rounded-lg border ${
                          choice.label.toLowerCase() === que.correctChoice
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{choice.label}:</span>
                          <span className="text-gray-700">{formatTextToHTML(choice.text)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {isIncorrect && (
                    <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <h4 className="font-medium text-amber-800">Explanation</h4>
                      </div>
                      <div className="text-amber-700">{formatTextToHTML(que.correction)}</div>
                      {que.correctionImage && (
                        <img
                          src={que.correctionImageUrl}
                          alt="Correction Image"
                          className="mt-3 rounded-lg max-h-64 object-contain"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
