"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  examStatus: {
    timeRemaining?: number;
    countdownDisplay?: string;
    status?: "locked" | "active" | "completed" | "closed";
  };
  onTimeUp?: () => void;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  examStatus,
  onTimeUp,
  className = "",
}) => {
  const [timeLeft, setTimeLeft] = useState(examStatus.timeRemaining || 0);
  const [display, setDisplay] = useState(examStatus.countdownDisplay || "");

  useEffect(() => {
    if (!timeLeft || examStatus.status !== "active") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, examStatus.status, onTimeUp]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setDisplay("Time's up!");
      return;
    }

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    if (hours > 0) {
      setDisplay(`${hours}h ${minutes}m ${seconds}s`);
    } else if (minutes > 0) {
      setDisplay(`${minutes}m ${seconds}s`);
    } else {
      setDisplay(`${seconds}s`);
    }
  }, [timeLeft]);

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "locked":
        return "bg-gray-100 text-gray-700";
      case "active":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "closed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case "locked":
        return "🔒";
      case "active":
        return "✅";
      case "completed":
        return "✅";
      case "closed":
        return "⛔";
      default:
        return "❓";
    }
  };

  return (
    <div
      className={`countdown flex items-center gap-3 p-3 rounded-lg font-medium ${getStatusColor(examStatus.status)} ${className}`}
    >
      <span className="time-display font-mono text-lg">{display}</span>
      <span className="status-badge text-sm">
        {getStatusIcon(examStatus.status)} {examStatus.status}
      </span>
    </div>
  );
};

export default CountdownTimer;
