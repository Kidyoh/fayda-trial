# Fayida Student Web Platform

## Overview

Fayida Student Web Platform is a comprehensive online learning system designed for students. The platform provides access to educational packages, mock exams, leaderboards, and a community forum to enhance the learning experience.

## Features

- **Educational Packages**: Browse and access various learning packages
- **Mock Exams**: Practice with simulated exam environments
- **Leaderboards**: Track progress and compare performance with peers
- **User Profiles**: Manage personal information and track learning progress
- **Forum**: Engage with the community of learners and instructors
- **Multi-language Support**: Available in multiple languages through i18n integration

## Tech Stack

- **Framework**: Next.js 13.5.4
- **UI Library**: React 18.2.0
- **Styling**: Tailwind CSS with components from Radix UI
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Internationalization**: i18next
- **API Integration**: Axios

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- PNPM package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fayida_student_web.git
   cd fayida_student_web
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

### Building for Production

```bash
pnpm build
pnpm start
```

## Docker Support

The application can be containerized using the provided Dockerfile:

```bash
docker build -t fayida-student-web .
docker run -p 8080:8080 fayida-student-web
```

## Project Structure

- `src/app/[locale]`: Core application pages with internationalization
- `src/components`: Reusable UI components
- `src/lib`: Utility functions and shared logic
- `public`: Static assets
- `locales`: Translation files for multi-language support

## License

[Add your license information here]

## Contact

[Add contact information here]