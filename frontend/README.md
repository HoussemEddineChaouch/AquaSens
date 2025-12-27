# AquaSens - Irrigation Need Prediction System

A modern web application for predicting irrigation needs using machine learning. Built with React, TypeScript, and Tailwind CSS.

## Features

- **User Authentication**: Secure login and signup with JWT token-based authentication
- **Irrigation Prediction**: ML-powered predictions based on soil, weather, and crop data
- **Prediction History**: View past prediction results
- **Responsive Design**: Works on desktop and mobile devices
- **Form Validation**: Comprehensive input validation using Zod

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Form Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm or bun package manager

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   bun dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

## Project Structure

```
src/
├── components/                   # React components
│   ├── ui/                       # Shadcn UI components
│   ├── LoginForm.tsx             # Login form component
│   ├── SignupForm.tsx            # Signup form component
│   ├── Navbar.tsx                # Navigation bar
│   ├── PredictionForm.tsx        # Main prediction form
│   ├── PredictionHistory.tsx     # History table
│   └── ProtectedRoute.tsx        # Auth route wrapper
├── contexts/                     # React contexts
│   └── AuthContext.tsx           # Authentication context
├── lib/                          # Utilities and API
│   ├── api.ts                    # Axios API client
│   ├── constants.ts              # Dropdown options
│   └── types.ts                  # Shared API TypeScript interfaces and types
├── pages/                        # Page components
│   ├── Index.tsx                 # Landing page
│   ├── Login.tsx                 # Login page
│   ├── Signup.tsx                # Signup page
│   ├── Predict.tsx               # Prediction page
│   ├── PredictionDetails.tsx     # Prediction Details page
│   └── NotFound.tsx              # 404 page
└── App.tsx                       # Main app component
```

## API Integration

The application expects a backend API with the following endpoint:

## Authentication Flow

1. User signs up or logs in
2. Backend returns JWT token
3. Token is stored in localStorage
4. Token is sent with each API request via Authorization header
5. Protected routes redirect to login if no valid token

## License

MIT License
