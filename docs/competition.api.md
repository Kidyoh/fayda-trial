# Competition API - Quick Reference

## 🔗 Base URL
```
https://your-api-domain.com
```

## 🔐 Authentication
```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

## 📋 Public Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/competitions` | List all competitions | ❌ |
| GET | `/competitions/:id` | Get competition details | ❌ |
| GET | `/competitions/:id/leaderboard` | Get leaderboard | ❌ |

---

## 👤 Student Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/competitions/:id/apply` | Apply for competition | ✅ |
| GET | `/competitions/:id/dashboard` | Get user dashboard | ✅ |
| GET | `/competition-exams/:examId` | Get exam questions | ✅ |
| POST | `/competition-exams/:examId/submit` | Submit exam answers | ✅ |
| GET | `/competition-exams/:examId/results` | Get exam results | ✅ |

---

## 👨‍💼 Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/admin/competitions` | Create competition | ✅ Admin |
| PUT | `/admin/competitions/:id` | Update competition | ✅ Admin |
| DELETE | `/admin/competitions/:id` | Delete competition | ✅ Admin |
| PATCH | `/admin/competitions/:id/status` | Update competition status | ✅ Admin |
| POST | `/admin/competitions/:id/exams` | Add exam to competition | ✅ Admin |
| POST | `/admin/competitions/:id/exams/:examId/questions` | Add questions to exam | ✅ Admin |
| GET | `/admin/competitions/:id/registrations` | Get registrations | ✅ Admin |
| GET | `/admin/competitions/:id/export` | Export competition data | ✅ Admin |
| POST | `/admin/competitions/:id/verify-prize-winner` | Verify prize winner | ✅ Admin |
| GET | `/admin/competitions/:id/prize-verification` | Get prize verification status | ✅ Admin |
| POST | `/admin/competitions/:id/assign-prizes` | Assign prizes to winners | ✅ Admin |

---

## 📊 Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

---

## 🎯 Key Data Structures

### Competition Object
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "grade": "9" | "10",
  "competitionType": "one-time" | "tournament",
  "status": "upcoming" | "active" | "completed" | "cancelled",
  "startDate": "ISO 8601 string",
  "endDate": "ISO 8601 string",
  "totalPrizes": "string",
  "thumbnail": "string",
  "requiresPackage": boolean,
  "packageDuration": number,
  "maxParticipants": number,
  "buttonState": "not_logged_in" | "needs_package" | "can_apply" | "already_applied",
  "buttonText": "string",
  "buttonAction": "login" | "apply" | "dashboard",
  "packageValid": boolean,
  "packageGrade": "string"
}
```

### Exam Status Object
```json
{
  "id": "string",
  "title": "string",
  "day": number,
  "scheduledDateTime": "ISO 8601 string",
  "duration": number,
  "totalQuestions": number,
  "status": "locked" | "active" | "completed" | "closed",
  "timeRemaining": number,
  "countdownDisplay": "string",
  "examStart": "ISO 8601 string",
  "examEnd": "ISO 8601 string",
  "submission": {
    "score": number,
    "totalQuestions": number,
    "timeSpent": number,
    "submittedAt": "ISO 8601 string"
  } | null
}
```

### Leaderboard Entry
```json
{
  "rank": number,
  "totalScore": number,
  "totalTimeSpent": number,
  "examsCompleted": number,
  "student": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "gread": "string",
    "schoolName": "string",
    "profilePicture": "string"
  }
}
```

---

## 🚨 Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `AUTHENTICATION_REQUIRED` | 401 | User not logged in |
| `INVALID_TOKEN` | 401 | JWT token invalid/expired |
| `ACCESS_DENIED` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `PACKAGE_REQUIRED` | 400 | Valid package needed |
| `ALREADY_REGISTERED` | 400 | User already registered |
| `REGISTRATION_CLOSED` | 400 | Registration closed |
| `EXAM_NOT_STARTED` | 400 | Exam hasn't started |
| `EXAM_EXPIRED` | 400 | Exam time expired |
| `ALREADY_SUBMITTED` | 400 | Exam already submitted |
| `INVALID_EXAM_ID` | 400 | Exam ID doesn't match |

---

## 📱 Frontend Integration Examples

### Apply for Competition
```javascript
const applyForCompetition = async (competitionId) => {
  try {
    const response = await fetch(`/competitions/${competitionId}/apply`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Show success message with exam ID
      showSuccess(`Registered! Your Exam ID: ${data.examId}`);
      
      // Check notification status
      if (data.notifications.email) {
        showInfo('Exam ID sent to your email');
      }
      if (data.notifications.sms) {
        showInfo('Exam ID sent to your phone');
      }
    } else {
      // Handle errors
      if (data.requiresPackage) {
        showPackageModal(data.grade);
      } else {
        showError(data.message);
      }
    }
  } catch (error) {
    showError('Network error. Please try again.');
  }
};
```

### Get Competition Dashboard
```javascript
const getCompetitionDashboard = async (competitionId) => {
  try {
    const response = await fetch(`/competitions/${competitionId}/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Update UI with exam status
      data.examStatus.forEach(exam => {
        updateExamCard(exam);
      });
      
      // Update leaderboard
      updateLeaderboard(data.leaderboard);
    }
  } catch (error) {
    console.error('Failed to load dashboard:', error);
  }
};
```

### Submit Exam
```javascript
const submitExam = async (examId, answers, timeSpent) => {
  try {
    const response = await fetch(`/competition-exams/${examId}/submit`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        examIdCode: userExamId,
        timeSpent: timeSpent,
        answers: answers
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Show results
      showResults(data.submission);
      
      // Redirect to results page
      router.push(`/competition-exams/${examId}/results`);
    } else {
      showError(data.message);
    }
  } catch (error) {
    showError('Failed to submit exam. Please try again.');
  }
};
```

---

## 🔄 Real-time Updates

### Polling Strategy
```javascript
// Poll dashboard every 30 seconds during active competition
const pollDashboard = (competitionId) => {
  const interval = setInterval(async () => {
    const dashboard = await getCompetitionDashboard(competitionId);
    updateUI(dashboard);
  }, 30000);
  
  return interval;
};

// Stop polling when component unmounts
useEffect(() => {
  const interval = pollDashboard(competitionId);
  return () => clearInterval(interval);
}, [competitionId]);
```

### Countdown Timer
```javascript
const useCountdown = (targetTime) => {
  const [timeLeft, setTimeLeft] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetTime).getTime();
      const difference = target - now;
      
      if (difference > 0) {
        setTimeLeft(Math.floor(difference / 1000));
      } else {
        setTimeLeft(0);
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetTime]);
  
  return timeLeft;
};
```

---

## 🎨 UI State Management

### Button States
```javascript
const getButtonConfig = (competition, user) => {
  if (!user) {
    return {
      text: 'Sign Up/Log In',
      action: 'login',
      className: 'btn-secondary',
      disabled: false
    };
  }
  
  if (competition.isRegistered) {
    return {
      text: 'Go to Dashboard',
      action: 'dashboard',
      className: 'btn-success',
      disabled: false
    };
  }
  
  if (competition.requiresPackage && !competition.packageValid) {
    return {
      text: 'Apply Now',
      action: 'apply',
      className: 'btn-warning',
      disabled: false,
      showPackageModal: true
    };
  }
  
  return {
    text: 'Apply Now',
    action: 'apply',
    className: 'btn-primary',
    disabled: false
  };
};
```

### Exam Status
```javascript
const getExamStatus = (exam) => {
  const now = new Date();
  const start = new Date(exam.scheduledDateTime);
  const end = new Date(start.getTime() + exam.duration * 60000);
  
  if (exam.submission) {
    return 'completed';
  } else if (now < start) {
    return 'locked';
  } else if (now >= start && now <= end) {
    return 'active';
  } else {
    return 'closed';
  }
};
```

---

## 📝 Testing Checklist

### API Integration
- [ ] All endpoints return expected responses
- [ ] Error handling works correctly
- [ ] Authentication is properly implemented
- [ ] Data validation is working

### UI Components
- [ ] Button states change correctly
- [ ] Countdown timers work accurately
- [ ] Exam interface is functional
- [ ] Leaderboard updates properly
- [ ] Mobile responsiveness

### User Flows
- [ ] Registration flow
- [ ] Exam taking flow
- [ ] Results viewing flow
- [ ] Dashboard navigation
- [ ] Error recovery

---

This quick reference should help with rapid development and debugging!
