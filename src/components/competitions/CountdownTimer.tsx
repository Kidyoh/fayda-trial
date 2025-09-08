'use client';

import React, { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '@/lib/competitionAPI';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  onComplete?: () => void;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetDate, 
  onComplete,
  className = ""
}) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining(targetDate);
      setTimeRemaining(remaining);

      if (remaining.total <= 0 && onComplete) {
        onComplete();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  if (timeRemaining.total <= 0) {
    return (
      <div className={`text-center p-4 bg-green-50 border border-green-200 rounded-lg ${className}`}>
        <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
        <p className="text-green-800 font-medium">Competition Started!</p>
      </div>
    );
  }

  return (
    <div className={`text-center p-4 bg-blue-50 border border-blue-200 rounded-lg ${className}`}>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Clock className="w-5 h-5 text-blue-600" />
        <span className="text-blue-800 font-medium">Starts in:</span>
      </div>
      
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white rounded-lg p-2 border border-blue-200">
          <div className="text-2xl font-bold text-blue-900">
            {timeRemaining.days.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-blue-600 font-medium">Days</div>
        </div>
        
        <div className="bg-white rounded-lg p-2 border border-blue-200">
          <div className="text-2xl font-bold text-blue-900">
            {timeRemaining.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-blue-600 font-medium">Hours</div>
        </div>
        
        <div className="bg-white rounded-lg p-2 border border-blue-200">
          <div className="text-2xl font-bold text-blue-900">
            {timeRemaining.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-blue-600 font-medium">Minutes</div>
        </div>
        
        <div className="bg-white rounded-lg p-2 border border-blue-200">
          <div className="text-2xl font-bold text-blue-900">
            {timeRemaining.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-blue-600 font-medium">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
