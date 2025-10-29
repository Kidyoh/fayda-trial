📄 Fayida Academy – Quiz Tournament Competition Documentation

1. Overview
   Fayida Academy is launching a digital quiz tournament hosted via its website and mobile application. The competition can be:
   One-Time Competition (single event).
   Tournament Mode (multi-day, e.g., 5 days).
   Other Key Features:
   Grade-Specific Participation: Grade 9 & Grade 10
   Real-Time Leaderboards
   Exam Auto-Scoring with Answer and Explanation Review
   Prizes Displayed with Images and Rank Assignment
   Exam ID Distribution via Email & SMS
   Anti-Cheating Measures: Single-device Exam ID, Screenshot Prevention
   Package Validity Check: Must cover full tournament duration
2. Competition Page
   2.1 Main Competition Page
   The main Competition Page should have the following sections:
   Tabs/Filters:
   Upcoming Competitions
   Past Competitions
   All Competitions
   Event Card Details:
   Event Name
   Event Date & Time
   Place: Online (Fayida Academy platform)
   "Show detail" Button

3. Event Detail Page
   The Event Detail Page is divided into multiple sections:
   Event Info Header
   Overview section
   Schedule section
   Prize section
   Sponsors section
   Quiz section
   Leaderboard
   3.1 Event Info Header
   3.1.1 Components
   Event Title
   Large, prominent at the top of the Event Detail Page
   Example: Quiz Tournament
   Specific Grade below the event title that represent the quiz grade
   Event Info Icons / Thumbnails
   🏆 Total Prizes
   📅 Event Dates: “Sept 15 – Sept 19, 2025”
   ⏳ Duration: “5 Days”
   Dynamic Action Button Area: “Apply Now” Button
   Conditional “Apply Now” based on login, package purchase, and package validity

Dynamic Button Logic
User Status
Button Display
Behavior
Not logged In
[Sign Up/Log in]

Logged In, No Package
[Apply Now]
Pop up message with “View Package” on bottom
If the quiz is grade 9
“To apply You need to purchase a Grade 9 package to apply for this tournament.”
🛒 View Packages → Redirect to Package List Page filtered to his/her grade
Logged in, Specific grade package purchase
[Apply Now]
Generates Exam ID, sends to email + SMS, confirms registration
Already Applied
[Go to Dashboard]
Shows Exam ID info, prevents multiple applications
Click [Go to Dashboard] 🡪 Comptition
Logged In, Package expires before tournament ends and want to apply tournament
[Apply Now]
Pop up message with “View Package” on bottom
If the quiz is grade 9
“Your current package expires early and didn’t cover the full tournament duration. Buy new package”
🛒 View Packages → Redirect to Package List Page filtered to his/her grade
Block application until package covers full duration

Grade-Specific Rules
Grade-specific restriction
Grade 9 Tournament → requires Grade 9 (at least 1 month) package.
Grade 10 Tournament → requires Grade 10 (at least 1 month) package.
Students can only participate in tournaments for their grade.
❌ Cannot use Grade 9 package to apply for Grade 10, or vice versa.
Package must cover entire tournament duration
At prize claim:
Must show Current School ID matching the grade.
System cross-checks with package purchase.
If mismatch → ❌ Prize cancelled → given to next runner-up.

3.2 Overview Section
General description and purpose
Requirements:
Must be a registered student
Must Sign Up / Log In
Must purchase 1-month package for corresponding grade
Grade-specific restriction
Grade 9 Tournament → requires Grade 9 (at least 1 month) package.
Grade 10 Tournament → requires Grade 10 (at least 1 month) package.
At prize claim:
Must show Current School ID matching the grade.
System cross-checks with package purchase.
If mismatch → ❌ Prize cancelled → given to next runner-up.
3.3 Schedule Section
Shows daily exams with:
Date & Time
Brief description of topics
Example:
Day 1 – Sept 15, 7:00 PM → “20 Questions (Math & Science)”
Day 2 – Sept 16, 7:00 PM → “20 Questions (English & History)”
3.4 Prizes Section
Each prize displays:
Image of the prize
Name & brief description
Ranking position
Example Table:
Rank
Prize Image
Prize Name
Description
🥇 1st
🎁 Laptop
Dell Inspiron
High-performance laptop for studies.
🥈 2nd
🎧 Headset
JBL Headphones
Noise-cancelling wireless headset.
🥉 3rd
🎫 Voucher
Bookstore Card
2,000 ETB bookstore gift voucher.
10th
🎒 Backpack
Study Backpack
Stylish backpack with study tools.

3.5 Sponsors Section
Display sponsor logos
Each logo clickable → redirects to sponsor website
3.6 Exam Section

The Exam Section is visible for all applied students (not hidden), but its state changes depending on time.

1. General Structure
   Each day of the tournament has its own card or block in the Exam Section.
   Components of each day’s exam card:
   Thumbnail Image representing the day or topic
   Title (e.g., “Day 1: Foundation & Warm-Up”)
   Small description
   Scheduled Exam Date & Time
   Countdown Timer until unlock
   Status Button:
   🔒 Locked (before start)
   ✅ Enter Exam (during exam)
   ⛔ Closed (after exam ends)
   Exam Start Rules
   Each exam has a scheduled start time set by the system.
   Countdown timer visible to applied users before start.
   Important: The exam timer starts at the scheduled start time, regardless of when the student logs in.
   Example: Exam scheduled for 7:00 PM, duration 20 minutes.
   Student logs in at 7:05 PM → remaining time = 15 minutes.
   Submission Rules
   Must answer all questions to submit
   Single attempt per Exam ID per day
   Anti-cheating: single-device enforcement, screenshot prevention
   Exam Access & Session
   Before Exam Day
   Quiz section visible but locked.
   Thumbnail, title, small description, Scheduled exam date and time
   ⏳ Shows Countdown Timer until exam opens.
   🔒 “Locked” state → button disabled.
   Example
   [Thumbnail Image] Day 1: Foundation & Warm-Up
   Contains: “General Science Basic, Arithmetic Math, Simple Social Studies, a bit of Aptitude”
   Exam starts: Sept 15, 7:00 PM
   Countdown: 01 Day 03 Hours 22 Minutes 15 Seconds
   [ 🔒 Locked ]
   Student cannot access questions yet
   During Exam
   Quiz Unlocks automatically at scheduled start
   Students enter Exam ID to start the exam
   Countdown replaced with remaining exam time
   Single-device enforcement and screenshot prevention still apply
   Late Login
   If student logs in after the exam has started:
   Remaining time = scheduled duration – time elapsed.
   Example: Exam scheduled for 7:00 PM, duration 20 minutes.
   Student logs in at 7:05 PM → remaining time = 15 minutes.

Exam will auto-submit when scheduled duration ends.

After Exam Ends
After submitting the exam Pop-up Score Page:
Example
Score: 18/20
Time Taken: 16m 05s
Answer Review Page:
Question, User Answer, Correct Answer, Explanation
Leaderboard Access:
Redirect via button [Go to Leaderboard]
3.7 Leaderboard
Pinned user rank at top
Top 20 cumulative scores
Separate for Grade 9 & Grade 10
Ranking: Highest score → Shortest time (tie-breaker)
📊 Tournament Ranking Logic
Day 1 (Single Exam Ranking)
Each day, students answer 20 questions in 20 minutes.
After submission, the system auto-grades and awards score (out of 20).
First Priority: Higher Total Score → higher rank.
Second Priority (tiebreaker): If Total Score is equal, the student with the shorter time taken (measured in minutes:seconds:microseconds) is ranked higher.
Day 2 → Day 5 (and beyond) Ranking Rule
Updated after each exam day.
Shows Cumulative Score and Total Time.
Primary: Higher Total Score (sum of all days so far).
Secondary: Shorter Total Time (sum of all days’ times).
🔑 That means the logic is consistent:
Day 1: Single exam score + time
Day 2 onward: Accumulated score + accumulated time
Admin Features
Create/Edit competition (one-time/tournament)
Define Overview, Schedule, Prizes, Sponsors
Upload daily question sets per grade
Manage package & grade restrictions
Manage registrations & Exam IDs
View & export leaderboard
Technical Requirements
Platform: Website + Mobile App
Authentication: Secure login, Exam ID, OTP/SMS verification
Messaging: Email + SMS for Exam ID distribution
Anti-Cheating: Screenshot disabled, single-device enforcement
Leaderboard: Auto-updated after each exam
Scalability: Thousands of concurrent users
