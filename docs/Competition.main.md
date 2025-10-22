# Fayida Academy Competition System - Frontend Integration Guide

## 📋 Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
4. [Frontend Implementation Guide](#frontend-implementation-guide)
5. [Error Handling](#error-handling)
6. [UI/UX Guidelines](#uiux-guidelines)
7. [Testing](#testing)

---

## 🎯 Overview

This guide provides everything needed to integrate the Fayida Academy Competition System with your frontend application. The system supports both one-time competitions and multi-day tournaments with real-time features, anti-cheating measures, and comprehensive prize management.

### Key Features

- ✅ Real-time leaderboards
- ✅ Dynamic button states
- ✅ Countdown timers
- ✅ Email/SMS notifications
- ✅ Prize verification system
- ✅ Anti-cheating measures
- ✅ Package validation

---

## 🔐 Authentication

### JWT Token Required

Most endpoints require authentication. Include the JWT token in the Authorization header:

```javascript
const headers = {
  Authorization: `Bearer ${userToken}`,
  "Content-Type": "application/json",
};
```

### Token Storage

```javascript
// Store token after login
localStorage.setItem("authToken", response.data.token);

// Retrieve token for API calls
const token = localStorage.getItem("authToken");
```

---

## 🚀 API Endpoints

### 1. Public Endpoints (No Authentication)

#### Get All Competitions

```http
GET /competitions
```

**Query Parameters:**

- `status` (optional): `upcoming`, `active`, `completed`, `cancelled`
- `grade` (optional): `9`, `10`
- `type` (optional): `one-time`, `tournament`

**Response:**

```json
{
  "success": true,
  "competitions": [
    {
      "id": "comp-uuid",
      "title": "Grade 9 Quiz Tournament",
      "description": "5-day tournament for Grade 9 students",
      "grade": "9",
      "competitionType": "tournament",
      "status": "upcoming",
      "startDate": "2024-09-15T19:00:00.000Z",
      "endDate": "2024-09-19T21:00:00.000Z",
      "totalPrizes": "50000",
      "thumbnail": "https://example.com/thumb.jpg",
      "registrationCount": 150,
      "examCount": 5,
      "prizes": [
        {
          "rank": 1,
          "prizeName": "Dell Inspiron Laptop",
          "description": "High-performance laptop",
          "image": "https://example.com/laptop.jpg",
          "value": "25000"
        }
      ],
      "sponsors": [
        {
          "name": "TechCorp Ethiopia",
          "logo": "https://example.com/logo.jpg",
          "website": "https://techcorp.et"
        }
      ]
    }
  ]
}
```

#### Get Competition Details (Public)

```http
GET /competitions/:id
```

**Response:**

```json
{
  "success": true,
  "competition": {
    "id": "comp-uuid",
    "title": "Grade 9 Quiz Tournament",
    "description": "Detailed description...",
    "grade": "9",
    "status": "upcoming",
    "startDate": "2024-09-15T19:00:00.000Z",
    "endDate": "2024-09-19T21:00:00.000Z",
    "registrationCount": 150,
    "exams": [
      {
        "id": "exam-uuid",
        "title": "Day 1: Foundation & Warm-Up",
        "day": 1,
        "scheduledDateTime": "2024-09-15T19:00:00.000Z",
        "duration": 20,
        "totalQuestions": 20
      }
    ],
    "prizes": [...],
    "sponsors": [...],
    "isRegistered": false,
    "userRegistration": null,
    "buttonState": "not_logged_in",
    "buttonText": "Sign Up/Log In",
    "buttonAction": "login",
    "requiresPackage": true,
    "packageValid": false,
    "packageGrade": null
  }
}
```

#### Get Competition Leaderboard

```http
GET /competitions/:id/leaderboard?limit=20
```

**Response:**

```json
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "totalScore": 95,
      "totalTimeSpent": 3600,
      "examsCompleted": 5,
      "student": {
        "firstName": "John",
        "lastName": "Doe",
        "gread": "9",
        "schoolName": "ABC High School",
        "profilePicture": "https://example.com/profile.jpg"
      }
    }
  ],
  "userRank": {
    "rank": 15,
    "totalScore": 85,
    "totalTimeSpent": 2400,
    "examsCompleted": 4
  },
  "totalParticipants": 150
}
```

---

### 2. Student Endpoints (Authentication Required)

#### Apply for Competition

```http
POST /competitions/:id/apply
```

**Headers:**

```javascript
{
  'Authorization': `Bearer ${userToken}`,
  'Content-Type': 'application/json'
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Successfully registered for competition",
  "examId": "A1B2C3",
  "registration": {
    "id": "reg-uuid",
    "examId": "A1B2C3",
    "registeredAt": "2024-09-10T10:00:00.000Z"
  },
  "notifications": {
    "email": true,
    "sms": true,
    "errors": {
      "email": null,
      "sms": null
    }
  }
}
```

**Error Responses:**

```json
// Already registered
{
  "success": false,
  "message": "Already registered for this competition",
  "examId": "A1B2C3"
}

// Package required
{
  "success": false,
  "message": "You need a valid Grade 9 package that covers the full tournament duration",
  "requiresPackage": true,
  "grade": "9"
}

// Registration closed
{
  "success": false,
  "message": "Competition registration is closed"
}
```

#### Get Competition Dashboard

```http
GET /competitions/:id/dashboard
```

**Response:**

```json
{
  "success": true,
  "registration": {
    "examId": "A1B2C3",
    "registeredAt": "2024-09-10T10:00:00.000Z"
  },
  "competition": {
    "id": "comp-uuid",
    "title": "Grade 9 Quiz Tournament",
    "grade": "9",
    "status": "active"
  },
  "examStatus": [
    {
      "id": "exam-uuid",
      "title": "Day 1: Foundation & Warm-Up",
      "day": 1,
      "scheduledDateTime": "2024-09-15T19:00:00.000Z",
      "duration": 20,
      "totalQuestions": 20,
      "status": "locked",
      "timeRemaining": 432000,
      "countdownDisplay": "5d 0h 0m",
      "examStart": "2024-09-15T19:00:00.000Z",
      "examEnd": "2024-09-15T19:20:00.000Z",
      "submission": null
    },
    {
      "id": "exam-uuid-2",
      "title": "Day 2: Advanced Topics",
      "day": 2,
      "scheduledDateTime": "2024-09-16T19:00:00.000Z",
      "duration": 20,
      "totalQuestions": 20,
      "status": "active",
      "timeRemaining": 1200,
      "countdownDisplay": "20m 0s",
      "examStart": "2024-09-16T19:00:00.000Z",
      "examEnd": "2024-09-16T19:20:00.000Z",
      "submission": null
    },
    {
      "id": "exam-uuid-3",
      "title": "Day 3: Final Challenge",
      "day": 3,
      "scheduledDateTime": "2024-09-17T19:00:00.000Z",
      "duration": 20,
      "totalQuestions": 20,
      "status": "completed",
      "timeRemaining": null,
      "countdownDisplay": null,
      "examStart": "2024-09-17T19:00:00.000Z",
      "examEnd": "2024-09-17T19:20:00.000Z",
      "submission": {
        "score": 18,
        "totalQuestions": 20,
        "timeSpent": 960,
        "submittedAt": "2024-09-17T19:16:00.000Z"
      }
    }
  ],
  "leaderboard": {
    "rank": 15,
    "totalScore": 85,
    "totalTimeSpent": 2400,
    "examsCompleted": 2
  },
  "totalExams": 5,
  "completedExams": 1
}
```

#### Get Exam Details and Questions

```http
GET /competition-exams/:examId
```

**Response:**

```json
{
  "success": true,
  "exam": {
    "id": "exam-uuid",
    "title": "Day 1: Foundation & Warm-Up",
    "description": "General Science, Math, Social Studies",
    "day": 1,
    "duration": 20,
    "totalQuestions": 20,
    "timeRemaining": 1200,
    "questions": [
      {
        "id": "q-uuid",
        "questionIndex": 1,
        "question": "What is the capital of Ethiopia?",
        "choiceA": "Addis Ababa",
        "choiceB": "Bahir Dar",
        "choiceC": "Hawassa",
        "choiceD": "Mekelle",
        "questionImage": null
      }
    ]
  },
  "competition": {
    "id": "comp-uuid",
    "title": "Grade 9 Quiz Tournament",
    "grade": "9"
  },
  "examId": "A1B2C3"
}
```

#### Submit Exam Answers

```http
POST /competition-exams/:examId/submit
```

**Request Body:**

```json
{
  "examIdCode": "A1B2C3",
  "timeSpent": 1200,
  "answers": [
    {
      "questionId": "q-uuid-1",
      "selectedChoice": "A",
      "timeSpent": 60
    },
    {
      "questionId": "q-uuid-2",
      "selectedChoice": "B",
      "timeSpent": 45
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Exam submitted successfully",
  "submission": {
    "id": "sub-uuid",
    "score": 18,
    "totalQuestions": 20,
    "timeSpent": 1200,
    "submittedAt": "2024-09-15T19:20:00.000Z",
    "percentage": 90
  }
}
```

#### Get Exam Results and Review

```http
GET /competition-exams/:examId/results
```

**Response:**

```json
{
  "success": true,
  "submission": {
    "score": 18,
    "totalQuestions": 20,
    "timeSpent": 1200,
    "submittedAt": "2024-09-15T19:20:00.000Z",
    "percentage": 90
  },
  "exam": {
    "title": "Day 1: Foundation & Warm-Up",
    "day": 1
  },
  "competition": {
    "title": "Grade 9 Quiz Tournament"
  },
  "results": [
    {
      "questionIndex": 1,
      "question": "What is the capital of Ethiopia?",
      "questionImage": null,
      "choices": {
        "A": "Addis Ababa",
        "B": "Bahir Dar",
        "C": "Hawassa",
        "D": "Mekelle"
      },
      "selectedChoice": "A",
      "correctChoice": "A",
      "isCorrect": true,
      "explanation": "Addis Ababa is the capital and largest city of Ethiopia.",
      "explanationImage": null,
      "timeSpent": 60
    }
  ]
}
```

---

## 🎨 Frontend Implementation Guide

### 1. Dynamic Button Logic Implementation

```javascript
// Competition Detail Page Component
const CompetitionDetail = ({ competition, user }) => {
  const handleButtonClick = () => {
    switch (competition.buttonState) {
      case "not_logged_in":
        // Redirect to login page
        router.push("/login");
        break;

      case "needs_package":
        // Show package popup/modal
        setShowPackageModal(true);
        break;

      case "can_apply":
        // Apply for competition
        applyForCompetition(competition.id);
        break;

      case "already_applied":
        // Go to dashboard
        router.push(`/competitions/${competition.id}/dashboard`);
        break;

      default:
        console.log("Unknown button state");
    }
  };

  return (
    <div className="competition-detail">
      <h1>{competition.title}</h1>
      <p>Grade {competition.grade}</p>

      <button
        className={`btn ${getButtonClass(competition.buttonState)}`}
        onClick={handleButtonClick}
      >
        {competition.buttonText}
      </button>

      {competition.buttonState === "needs_package" && (
        <PackageModal
          isOpen={showPackageModal}
          onClose={() => setShowPackageModal(false)}
          grade={competition.grade}
        />
      )}
    </div>
  );
};

const getButtonClass = (buttonState) => {
  const classes = {
    not_logged_in: "btn-secondary",
    needs_package: "btn-warning",
    can_apply: "btn-primary",
    already_applied: "btn-success",
  };
  return classes[buttonState] || "btn-secondary";
};
```

### 2. Countdown Timer Implementation

```javascript
// Countdown Timer Component
const CountdownTimer = ({ examStatus, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(examStatus.timeRemaining);
  const [display, setDisplay] = useState(examStatus.countdownDisplay);

  useEffect(() => {
    if (!timeLeft || examStatus.status !== "active") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
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

  return (
    <div className={`countdown ${examStatus.status}`}>
      <span className="time-display">{display}</span>
      <span className="status-badge">{examStatus.status}</span>
    </div>
  );
};
```

### 3. Exam Status Cards

```javascript
// Exam Status Card Component
const ExamStatusCard = ({ exam, onStartExam, onViewResults }) => {
  const getStatusIcon = (status) => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case "locked":
        return "gray";
      case "active":
        return "green";
      case "completed":
        return "blue";
      case "closed":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className={`exam-card status-${exam.status}`}>
      <div className="exam-header">
        <h3>{exam.title}</h3>
        <span className={`status-icon ${getStatusColor(exam.status)}`}>
          {getStatusIcon(exam.status)}
        </span>
      </div>

      <p className="exam-description">{exam.description}</p>

      <div className="exam-details">
        <p>
          <strong>Date:</strong>{" "}
          {new Date(exam.scheduledDateTime).toLocaleDateString()}
        </p>
        <p>
          <strong>Time:</strong>{" "}
          {new Date(exam.scheduledDateTime).toLocaleTimeString()}
        </p>
        <p>
          <strong>Duration:</strong> {exam.duration} minutes
        </p>
        <p>
          <strong>Questions:</strong> {exam.totalQuestions}
        </p>
      </div>

      {exam.status === "locked" && exam.countdownDisplay && (
        <div className="countdown">
          <CountdownTimer examStatus={exam} onTimeUp={() => {}} />
        </div>
      )}

      {exam.status === "active" && (
        <div className="exam-actions">
          <CountdownTimer
            examStatus={exam}
            onTimeUp={() => window.location.reload()}
          />
          <button
            className="btn btn-primary"
            onClick={() => onStartExam(exam.id)}
          >
            Enter Exam
          </button>
        </div>
      )}

      {exam.status === "completed" && exam.submission && (
        <div className="exam-results">
          <p>
            <strong>Score:</strong> {exam.submission.score}/
            {exam.submission.totalQuestions}
          </p>
          <p>
            <strong>Time:</strong> {Math.floor(exam.submission.timeSpent / 60)}m{" "}
            {exam.submission.timeSpent % 60}s
          </p>
          <button
            className="btn btn-secondary"
            onClick={() => onViewResults(exam.id)}
          >
            View Results
          </button>
        </div>
      )}

      {exam.status === "closed" && (
        <div className="exam-closed">
          <p>This exam has ended</p>
        </div>
      )}
    </div>
  );
};
```

### 4. Leaderboard Component

```javascript
// Leaderboard Component
const Leaderboard = ({ leaderboard, userRank, totalParticipants }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m ${secs}s`;
    }
  };

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <p className="total-participants">
        Total Participants: {totalParticipants}
      </p>

      <div className="leaderboard-list">
        {leaderboard.map((entry, index) => (
          <div
            key={entry.id}
            className={`leaderboard-entry ${entry.student.id === userRank?.student?.id ? "current-user" : ""}`}
          >
            <div className="rank">{getRankIcon(entry.rank)}</div>

            <div className="student-info">
              <img
                src={entry.student.profilePicture || "/default-avatar.png"}
                alt="Profile"
                className="profile-picture"
              />
              <div className="student-details">
                <h4>
                  {entry.student.firstName} {entry.student.lastName}
                </h4>
                <p>{entry.student.schoolName}</p>
              </div>
            </div>

            <div className="scores">
              <div className="score">
                <span className="label">Score:</span>
                <span className="value">{entry.totalScore}</span>
              </div>
              <div className="time">
                <span className="label">Time:</span>
                <span className="value">
                  {formatTime(entry.totalTimeSpent)}
                </span>
              </div>
              <div className="exams">
                <span className="label">Exams:</span>
                <span className="value">{entry.examsCompleted}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {userRank && (
        <div className="user-rank">
          <h3>Your Rank</h3>
          <div className="rank-card">
            <span className="rank-number">{getRankIcon(userRank.rank)}</span>
            <div className="rank-details">
              <p>Score: {userRank.totalScore}</p>
              <p>Time: {formatTime(userRank.totalTimeSpent)}</p>
              <p>Exams Completed: {userRank.examsCompleted}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
```

### 5. Exam Interface

```javascript
// Exam Interface Component
const ExamInterface = ({ exam, examId, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(exam.timeRemaining);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerChange = (questionId, choice) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: choice,
    }));
  };

  const handleSubmit = () => {
    const answerArray = exam.questions.map((q) => ({
      questionId: q.id,
      selectedChoice: answers[q.id] || null,
      timeSpent: 0, // Calculate per question if needed
    }));

    onSubmit({
      examIdCode: examId,
      timeSpent: exam.duration * 60 - timeLeft,
      answers: answerArray,
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="exam-interface">
      <div className="exam-header">
        <h2>{exam.title}</h2>
        <div className="exam-timer">
          <span className="time-display">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="exam-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / exam.totalQuestions) * 100}%`,
            }}
          />
        </div>
        <span className="progress-text">
          Question {currentQuestion + 1} of {exam.totalQuestions}
        </span>
      </div>

      <div className="question-container">
        {exam.questions.map((question, index) => (
          <div
            key={question.id}
            className={`question ${index === currentQuestion ? "active" : "hidden"}`}
          >
            <h3>Question {question.questionIndex}</h3>
            <p>{question.question}</p>

            {question.questionImage && (
              <img
                src={question.questionImage}
                alt="Question"
                className="question-image"
              />
            )}

            <div className="choices">
              {["A", "B", "C", "D"].map((choice) => (
                <label key={choice} className="choice-option">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={choice}
                    checked={answers[question.id] === choice}
                    onChange={() => handleAnswerChange(question.id, choice)}
                  />
                  <span className="choice-letter">{choice}.</span>
                  <span className="choice-text">
                    {question[`choice${choice}`]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="exam-navigation">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>

        <div className="question-numbers">
          {exam.questions.map((_, index) => (
            <button
              key={index}
              className={`question-number ${index === currentQuestion ? "active" : ""} ${answers[exam.questions[index].id] ? "answered" : ""}`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            if (currentQuestion < exam.questions.length - 1) {
              setCurrentQuestion((prev) => prev + 1);
            } else {
              handleSubmit();
            }
          }}
        >
          {currentQuestion < exam.questions.length - 1 ? "Next" : "Submit Exam"}
        </button>
      </div>
    </div>
  );
};
```

---

## ⚠️ Error Handling

### Standard Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE" // Optional
}
```

### Common Error Codes

- `AUTHENTICATION_REQUIRED` - User not logged in
- `INVALID_TOKEN` - JWT token invalid or expired
- `PACKAGE_REQUIRED` - Valid package needed
- `ALREADY_REGISTERED` - User already registered
- `REGISTRATION_CLOSED` - Competition registration closed
- `EXAM_NOT_STARTED` - Exam hasn't started yet
- `EXAM_EXPIRED` - Exam time has expired
- `ALREADY_SUBMITTED` - Exam already submitted
- `INVALID_EXAM_ID` - Exam ID doesn't match

### Error Handling Implementation

```javascript
const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 401:
        // Redirect to login
        router.push("/login");
        break;
      case 403:
        // Show access denied message
        showError("Access denied. Please check your permissions.");
        break;
      case 404:
        // Show not found message
        showError("Competition not found.");
        break;
      case 400:
        // Show validation error
        showError(data.message);
        break;
      default:
        // Show generic error
        showError("Something went wrong. Please try again.");
    }
  } else {
    showError("Network error. Please check your connection.");
  }
};
```

---

## 🎨 UI/UX Guidelines

### 1. Button States

```css
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### 2. Countdown Timer Styles

```css
.countdown {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 600;
}

.countdown.locked {
  background-color: #f8f9fa;
  color: #6c757d;
}

.countdown.active {
  background-color: #d4edda;
  color: #155724;
}

.time-display {
  font-size: 1.2em;
  font-family: "Courier New", monospace;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  text-transform: uppercase;
}
```

### 3. Exam Status Cards

```css
.exam-card {
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.exam-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.exam-card.status-locked {
  border-color: #6c757d;
  background-color: #f8f9fa;
}

.exam-card.status-active {
  border-color: #28a745;
  background-color: #d4edda;
}

.exam-card.status-completed {
  border-color: #007bff;
  background-color: #cce7ff;
}

.exam-card.status-closed {
  border-color: #dc3545;
  background-color: #f8d7da;
}
```

### 4. Leaderboard Styles

```css
.leaderboard-entry {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  transition: background-color 0.3s ease;
}

.leaderboard-entry:hover {
  background-color: #f8f9fa;
}

.leaderboard-entry.current-user {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.rank {
  font-size: 1.5em;
  font-weight: bold;
  margin-right: 16px;
  min-width: 60px;
}

.profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}

.scores {
  display: flex;
  gap: 24px;
  margin-left: auto;
}

.score,
.time,
.exams {
  text-align: center;
}

.score .value,
.time .value,
.exams .value {
  font-weight: bold;
  font-size: 1.1em;
}
```

---

## 🧪 Testing

### 1. API Testing

Use the provided `ApiTest/competitions.http` file with your API testing tool (VS Code REST Client, Postman, etc.).

### 2. Frontend Testing Checklist

- [ ] Competition listing with filters
- [ ] Dynamic button states
- [ ] Countdown timers
- [ ] Exam interface
- [ ] Leaderboard updates
- [ ] Error handling
- [ ] Mobile responsiveness
- [ ] Notification display

### 3. Test Scenarios

1. **Not logged in user** - Should see "Sign Up/Log In" button
2. **User without package** - Should see package requirement popup
3. **User with valid package** - Should be able to apply
4. **Already registered user** - Should see "Go to Dashboard" button
5. **During exam time** - Should see countdown and "Enter Exam" button
6. **After exam** - Should see results and "View Results" button

---

## 📱 Mobile Considerations

### 1. Responsive Design

- Use mobile-first approach
- Ensure touch targets are at least 44px
- Implement swipe gestures for exam navigation
- Use collapsible sections for long content

### 2. Performance

- Implement lazy loading for images
- Use virtual scrolling for large leaderboards
- Cache API responses when appropriate
- Implement offline capability for exam questions

### 3. Accessibility

- Use semantic HTML elements
- Provide alt text for images
- Ensure sufficient color contrast
- Implement keyboard navigation
- Add ARIA labels for screen readers

---

## 🔒 Security Considerations

### 1. Client-Side Security

- Never store sensitive data in localStorage
- Implement screenshot prevention (browser-specific)
- Use HTTPS for all API calls
- Validate all user inputs

### 2. Anti-Cheating Measures

- Implement single-device enforcement
- Disable right-click and keyboard shortcuts during exams
- Implement fullscreen mode for exams
- Add session timeout warnings

### 3. Data Protection

- Encrypt sensitive data in transit
- Implement proper error handling to avoid data leaks
- Use secure token storage
- Implement proper logout functionality

---

This comprehensive guide should provide everything needed to integrate the competition system with your frontend application. The API is fully functional and ready for production use!
