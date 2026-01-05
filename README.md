# AquaSens - Smart Irrigation Prediction System

<div align="center">

![AquaSens Logo](/backend/study/screenshots/AquaSens%20Logo.png)

**AI-Powered Irrigation Decision Support System**

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.20.4-green.svg)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.22.1-lightgrey.svg)](https://expressjs.com/)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-black.svg)](https://flask.palletsprojects.com/)

[Features](#-features) • [Architecture](#-architecture) • [Installation](#-installation) • [Usage](#-usage) • [Screenshots](#-screenshots)

</div>

---

## Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Acknowledgments](#-acknowledgments)

---

## Overview

**AquaSens** is an intelligent irrigation prediction system that leverages machine learning to help farmers make data-driven decisions about crop irrigation needs. The system analyzes multiple environmental and soil parameters to predict whether crops require low, medium, or high irrigation, along with detailed recommendations and decision paths.

### Why AquaSens?

- **Water Conservation**: Optimize water usage and reduce waste
- **Crop Health**: Ensure crops receive appropriate irrigation
- **Data-Driven**: Make informed decisions based on multiple parameters
- **AI-Powered**: 99.7% accurate Decision Tree model
- **User-Friendly**: Intuitive interface for farmers and agronomists

---

## Features

### Core Features

- **User Authentication**

  - Secure registration and login with JWT tokens
  - Password hashing with bcryptjs
  - Protected routes and API endpoints

- **Irrigation Prediction**

  - ML predictions (Low/Medium/High)
  - Detailed decision path explanation
  - Agronomist recommendations

- **Prediction History**

  - Complete history of all predictions
  - Detailed view of each prediction

- **Transparent AI**
  - View decision tree path
  - Understand feature importance
  - Probability distribution for all classes

### Technical Features

- **High Performance**

  - 99.7% model accuracy on test data
  - Fast API response times
  - Optimized database queries with Mongoose

- **Security**

  - JWT authentication with 7-day expiry
  - CORS protection
  - Input validation
  - Password hashing with bcryptjs

- **Responsive Design**
  - Mobile-first approach with Tailwind CSS
  - Works on all devices
  - Modern UI/UX with Radix UI components

---

## Architecture

![AquaSens FullStack Architecture](/backend/study/screenshots/AquaSens%20Architecture.jpg)

---

## Tech Stack

### Frontend

- **Framework**: React 18.3.1 with TypeScript 5.8.3
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI + Custom components
- **Icons**: Lucide React 0.462.0
- **Routing**: React Router DOM 6.30.1
- **HTTP Client**: Axios 1.13.2
- **Form Management**: React Hook Form 7.61.1
- **Validation**: Zod 3.25.76
- **State Management**: React Context API + TanStack Query 5.83.0

### Backend (API Server)

- **Runtime**: Node.js 16+
- **Framework**: Express.js 4.22.1
- **Database**: MongoDB with Mongoose 8.20.4
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password Hashing**: bcryptjs 2.4.3
- **Security**: CORS 2.8.5
- **HTTP Client**: Axios 1.13.2
- **Environment**: dotenv 16.6.1

### ML Server (Flask)

- **Framework**: Flask 2.3.3
- **ML Library**: Scikit-learn 1.8.0
- **Data Processing**: Pandas 2.1.1, NumPy 1.26.0
- **Feature Engineering**: Category Encoders 2.6.0
- **Model Persistence**: Joblib 1.3.2
- **Model**: Decision Tree Classifier

### Development Tools

- **Version Control**: Git
- **Package Manager**: npm (Node.js), pip (Python)
- **Code Formatting**: Prettier, ESLint 9.32.0
- **Development Server**: Nodemon 3.1.11
- **API Testing**: Postman
- **Environment**: dotenv

---

## Project Structure

```
aquasens/
├── backend/
│   ├── api_server/                    # Node.js API Server (Express 4.22.1)
│   │   ├── node_modules/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── history.controller.js
│   │   │   │   └── prediction.controller.js
│   │   │   ├── middlewares/
│   │   │   │   └── auth.middleware.js
│   │   │   ├── models/
│   │   │   │   ├── Prediction.js
│   │   │   │   └── User.js
│   │   │   ├── routes/
│   │   │   │   ├── auth.routes.js
│   │   │   │   ├── history.routes.js
│   │   │   │   └── prediction.routes.js
│   │   │   ├── services/
│   │   │   │   └── ml.service.js      # ML API communication
│   │   │   └── app.js                 # Server entry point
│   │   ├── .env
│   │   ├── .gitignore
│   │   ├── package.json
│   │   └── package-lock.json
│   │
│   ├── ml_server/                     # Flask ML Server (2.3.3)
│   │   ├── model/
│   │   │   ├── AquaSens_decision_tree_model.joblib
│   │   │   ├── AquaSens_feature_encoder.joblib
│   │   │   └── AquaSens_model_metadata.joblib
│   │   ├── services/
│   │   │   ├── decision_path.py       # Extract decision path
│   │   │   ├── predictor.py           # Prediction logic
│   │   │   └── recommendations.py     # Generate recommendations
│   │   ├── utils/
│   │   │   └── helpers.py
│   │   ├── venv/                      # Python virtual environment
│   │   ├── app.py                     # Flask application
│   │   └── requirements.txt
│   │
│   └── study/                         # Research & Development
│       ├── dataset/
│       │   └── irrigation_prediction.csv
│       ├── notebook/
│       │   └── AquaSens - Smart Irrigation Prediction - Final Version.ipynb
│       ├── presentaion/
│       │   └── AquaSens_ Smart Irrigation Prediction System.pptx
│       ├── reports/
│       │   └── AquaSens_IA_Powered_Irrigation_Report - Houssem Eddine Chaouch 4GL.pdf
│       └── screenshots/
│           ├── AquaSens Logo.png
│           ├── AquaSens Architecture.jpg
│           ├── landing_page.png
│           ├── signin_page.png
│           ├── signup_page.png
│           ├── prediction_form_page.png
│           ├── prediction_details_page.png
│           └── prediction_history_page.png
│
├── frontend/                          # React + TypeScript (Vite)
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── LoginForm.tsx
│   │   │       ├── Navbar.tsx
│   │   │       ├── NavLink.tsx
│   │   │       ├── PredictionForm.tsx
│   │   │       ├── PredictionHistory.tsx
│   │   │       ├── ProtectedRoute.tsx
│   │   │       └── SignupForm.tsx
│   │   ├── lib/
│   │   │   ├── api.ts                 # Axios API client
│   │   │   ├── constants.ts           # App constants
│   │   │   ├── types.ts               # TypeScript types
│   │   │   └── utils.ts               # Utility functions
│   │   ├── pages/
│   │   │   ├── Index.tsx              # Landing page
│   │   │   ├── Login.tsx
│   │   │   ├── NotFound.tsx
│   │   │   ├── Predict.tsx
│   │   │   ├── PredictionDetails.tsx
│   │   │   └── Signup.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── components.json
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
└── README.md                          # This file
```

---

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 16.0.0 ([Download](https://nodejs.org/))
- **Python** >= 3.8 ([Download](https://www.python.org/))
- **MongoDB** >= 5.0 ([Download](https://www.mongodb.com/))
- **npm** >= 8.0.0 (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Step 1: Clone the Repository

```bash
git clone https://github.com/HoussemEddineChaouch/AquaSens.git
cd AquaSens
```

### Step 2: Backend Setup

#### A. API Server (Node.js + Express)

```bash
cd backend/api_server

# Install dependencies
npm install

# Create .env file
touch .env
```

**Edit `.env` file with the following:**

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/aquasens
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
ML_API_URL=http://localhost:5001
```

**Generate a secure JWT secret:**

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use this online: https://generate-secret.vercel.app/32
```

#### B. ML Server (Flask)

```bash
cd ../ml_server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Verify installation
pip list
```

**Ensure model files exist:**

```bash
ls model/
# Should show:
# - AquaSens_decision_tree_model.joblib
# - AquaSens_feature_encoder.joblib
# - AquaSens_model_metadata.joblib
```

### Step 3: Frontend Setup

```bash
cd ../../frontend

# Install dependencies
npm install

# Build for development (optional)
npm run build:dev
```

### Step 4: Database Setup

**Start MongoDB:**

```bash
# On macOS with Homebrew:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod

# On Windows:
# Start MongoDB from Services or run:
mongod
```

**Verify MongoDB is running:**

```bash
mongosh
# Should connect to: mongodb://127.0.0.1:27017
# Type 'exit' to quit
```

**Create database (automatic):**
The database `aquasens` will be created automatically on first API request.

---

## Configuration

### Backend API Server (.env)

Create a `.env` file in `backend/api_server/`:

```env
# Server Configuration
PORT=5000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/aquasens

# JWT Secret (IMPORTANT: Use a strong random string in production)
JWT_SECRET=your_super_secret_jwt_key_here_replace_with_random_string

# ML Server URL
ML_API_URL=http://localhost:5001
```

### Frontend Configuration

The frontend is configured to connect to the backend API at `http://localhost:5000` by default. This is set in the `src/lib/api.ts` file.

If you need to change the API URL, edit `src/lib/api.ts`:

```typescript
const API_BASE_URL = "http://localhost:5000";
```

### ML Server Configuration

The ML server runs on port `5001` by default. To change this, edit `backend/ml_server/app.py`:

```python
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
```

---

## Usage

### Development Mode

You need to run **3 terminals** simultaneously:

#### Terminal 1 - Flask ML Server (Port 5001)

```bash
cd backend/ml_server

# Activate virtual environment
# macOS/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Start Flask server
python app.py
```

**Expected output:**

```
 * Running on http://127.0.0.1:5001
 * Debug mode: on
 Model loaded successfully
```

#### Terminal 2 - Node.js API Server (Port 5000)

```bash
cd backend/api_server

# Start with nodemon (auto-reload)
npm run dev

# OR start normally
npm start
```

**Expected output:**

```
Server running on http://localhost:5000
MongoDB Connected
```

#### Terminal 3 - React Frontend (Port 8080)

```bash
cd frontend

# Start Vite dev server
npm run dev
```

**Expected output:**

```
  VITE v5.4.19  ready in XXX ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
```

### Access the Application

- **Frontend**: http://localhost:8080
- **API Server**: http://localhost:5000
- **ML Server**: http://localhost:5001

### Testing the APIs

#### Test Backend API

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

#### Test ML Server

```bash
# Check if ML server is running
curl http://localhost:5001/
```

```bash
# Build frontend
cd frontend
npm run build

# Start backend (production)
cd ../backend/api_server
NODE_ENV=production npm start

# Start ML server (production)
cd ../ml_server
source venv/bin/activate
python app.py
```

---

## Screenshots

### Landing Page

![Landing Page](/backend/study/screenshots/landing_page.png)

### Sign In Page

![Sign In](/backend/study/screenshots/signin_page.png)

### Sign Up Page

![Sign Up](/backend/study/screenshots/signup_page.png)

### Prediction Form

![Prediction Form](/backend/study/screenshots/prediction_form_page.png)

### Prediction Details

![Prediction Details](/backend/study/screenshots/prediction_details_page.png)

### Prediction History

![Prediction History](/backend/study/screenshots/prediction_history_page.png)

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines

- **Frontend**: Follow TypeScript and React best practices
- **Backend**: Follow Node.js and Express conventions
- **Python**: Follow PEP 8 style guide
- Use ESLint and Prettier for code formatting
- Write clear commit messages
- Add comments for complex logic
- Update README for significant changes

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Houssem Eddine Chaouch**

- Email: chaouch.eddinehoussem@gmail.com
- GitHub: [@HoussemEddineChaouch](https://github.com/HoussemEddineChaouch)
- LinkedIn: [Chaouch Houssem Eddine](https://www.linkedin.com/in/chaouch-houssem-eddine-/)

---

## Acknowledgments

- **Dataset**: [Arif Miah](https://www.kaggle.com/miadul) for the [Irrigation Water Requirement Prediction Dataset](https://www.kaggle.com/datasets/miadul/irrigation-water-requirement-prediction-dataset)
- **Machine Learning**: Scikit-learn team for the excellent ML library
- **Frameworks**: React, Express.js, and Flask communities
- **UI Components**: Radix UI and Shadcn UI for beautiful components
- **Icons**: Lucide React for amazing icons
- **Styling**: Tailwind CSS for utility-first CSS framework

---
