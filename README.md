# AI Resume Builder 

An AI-powered resume creation and optimization platform built using the MERN stack and Google Gemini AI. Create professional, ATS-friendly resumes, improve resume content with AI, import existing resumes, and choose from multiple professionally designed templates.

The platform combines intelligent resume parsing, AI-assisted content enhancement, customizable resume editing, and secure resume management in one application.

---

##  Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Application Workflow](#-application-workflow)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Design](#-database-design)
- [AI Integration](#-ai-integration)
- [Resume Templates](#-resume-templates)
- [Security](#-security)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

---

##  Overview

AI Resume Builder is a full-stack web application designed to simplify the process of creating and managing professional resumes.

Traditional resume creation requires users to manually structure their information, write professional descriptions, and repeatedly modify their content to improve readability and ATS compatibility.

This application addresses these challenges by integrating Google Gemini AI into the resume-building workflow.

Users can either create a resume from scratch or upload an existing PDF/DOCX resume. The uploaded document is parsed, its text is extracted, and Gemini AI converts the extracted content into structured resume information that users can review and edit.

The application also provides AI-powered content enhancement, multiple resume templates, secure user authentication, resume management, profile image uploads, and public resume sharing.

**The primary goal is to make professional resume creation faster, more accessible, and more structured through AI assistance.**

---

##  Key Features

### 1. AI-Powered Resume Content Enhancement

- Improve professional summaries, project descriptions, and work experience.
- Generate concise and professional resume content.
- Improve grammar, clarity, and readability.
- Use action-oriented language to strengthen resume descriptions.
- Preserve the original factual information without intentionally introducing fabricated achievements or skills.
- Integrate Google Gemini AI through the backend.

### 2. Existing Resume Import and AI Parsing

- Upload existing resumes in PDF and DOCX formats.
- Extract text from PDF documents using `pdf-parse`.
- Extract text from DOCX documents using `Mammoth`.
- Review and modify extracted text before AI processing.
- Use Gemini AI to convert unstructured resume text into structured JSON.
- Automatically organize information into predefined resume sections.
- Transfer extracted information into the resume editor for further customization.

**Supported formats:** PDF and DOCX.

**Maximum upload size:** 5 MB.

### 3. Multiple Professional Resume Templates

Choose from four resume designs:

- Classic – ATS-oriented resume layout.
- Modern – Contemporary professional resume design.
- Minimal – Clean and minimal resume presentation.
- Professional – Professional sidebar-based resume layout.

Switch between templates while working on your resume.

### 4. Custom Resume Editor

Create and customize resumes using structured fields, including:

- Personal information
- Professional title
- Contact information
- LinkedIn and GitHub profiles
- Professional summary
- Work experience
- Education
- Technical skills
- Categorized technical skills
- Projects and technology stacks
- GitHub and live project links
- Achievements
- Certifications
- Certification credential links
- Profile image

### 5. Resume Management Dashboard

- Create multiple resumes.
- View previously created resumes.
- Update existing resumes.
- Delete resumes.
- Manage resume details.
- Track updated resumes through timestamps.

### 6. User Authentication

- User registration.
- Secure login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Protected API endpoints.
- Forgot password functionality.
- Password reset using time-limited reset tokens.

### 7. Public Resume Sharing

- Generate unique public identifiers for resumes.
- Make resumes public or private.
- Access public resumes through shareable URLs.
- View publicly shared resumes without requiring authentication.

### 8. Profile Image Upload

- Upload profile images.
- Store images using ImageKit.
- Generate image URLs for resume previews.
- Optional background removal during image upload.

### 9. Resume Export

- Generate downloadable resume documents through the frontend PDF export functionality.
- Preview the selected resume template before exporting.

---

## Application Workflow

The application supports two primary resume creation workflows.

### Workflow 1: Create a Resume from Scratch

1. Register or log in to the application.
2. Navigate to the dashboard.
3. Create a new resume.
4. Enter personal and professional information.
5. Add education, skills, projects, and experience.
6. Use Gemini AI to improve individual resume sections.
7. Select a preferred resume template.
8. Preview and customize the resume.
9. Save the resume to your account.
10. Export or share the completed resume.

### Workflow 2: Upload and Optimize an Existing Resume

1. Navigate to the resume upload section.
2. Upload an existing PDF or DOCX document.
3. Extract text using the backend document-processing libraries.
4. Review and edit the extracted text.
5. Send the extracted text to the Gemini AI integration.
6. Convert the resume content into structured JSON.
7. Populate the resume editor with the extracted information.
8. Review and modify the generated fields.
9. Select a resume template.
10. Save, export, or share the optimized resume.

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | Component-based user interface |
| JavaScript | Frontend application logic |
| Vite 8 | Development server and build tool |
| Tailwind CSS 4 | Styling and responsive layouts |
| React Router 7 | Client-side navigation |
| Lucide React | Icons |
| html2pdf.js | PDF export functionality |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express 5 | REST API development |
| MongoDB | Database |
| Mongoose 9 | Database modeling and queries |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Multer | File upload handling |
| Nodemailer | Password reset emails |
| Mammoth | DOCX text extraction |
| pdf-parse | PDF text extraction |
| dotenv | Environment configuration |
| CORS | Cross-origin request handling |

### AI and External Services

| Technology | Purpose |
|---|---|
| Google Gemini AI | Resume parsing and content enhancement |
| ImageKit | Profile image storage and optional background removal |

---

## Project Architecture

The application follows a client-server architecture.

```text
                 USER
                   |
                   v
          REACT FRONTEND
             (Vite)
                   |
          HTTP / REST API
                   |
                   v
          EXPRESS BACKEND
                   |
       +-----------+-----------+
       |           |           |
       v           v           v
 Authentication  Resume      AI Routes
    Routes       Routes         |
       |           |            v
       |           |       Google Gemini
       |           |
       +-----------+
             |
             v
       MONGODB DATABASE

       Additional Services
       -------------------
       ImageKit
       Nodemailer
       PDF/DOCX Parsing
```

### Architecture Components

**Frontend Layer**

The React application handles user interactions, authentication screens, resume editing, template selection, document uploading, and resume previews.

**Backend Layer**

The Express server exposes REST API endpoints for authentication, resume management, AI operations, image uploads, and document parsing.

**Database Layer**

MongoDB stores user accounts and resume information through Mongoose schemas.

**AI Layer**

Google Gemini processes resume content, improves individual sections, and extracts structured information from uploaded documents.

**External Services**

ImageKit handles profile image uploads, while Nodemailer handles password reset emails.

---

## Project Architecture and Folder Structure

```text
AI-Resume-Builder/
│
├── client/
│   │
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── components/
│   │   │   ├── AtsClassicPreview.jsx
│   │   │   ├── CertificationLinks.jsx
│   │   │   ├── ContactLinks.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MinimalTemplate.jsx
│   │   │   ├── ProfessionalSidebarTemplate.jsx
│   │   │   └── ResumePreview.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PublicResume.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── ResumeEditor.jsx
│   │   │   ├── Templates.jsx
│   │   │   └── UploadResume.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── config.js
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── server/
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Resume.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── authRoutes.js
│   │   ├── imageRoutes.js
│   │   ├── resumeRoutes.js
│   │   └── uploadResumeRoutes.js
│   │
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

### Important Directories

| Directory | Responsibility |
|---|---|
| `client/src/pages` | Application pages and user workflows |
| `client/src/components` | Reusable UI and resume templates |
| `server/routes` | Backend API endpoints |
| `server/models` | MongoDB schemas |
| `server/middleware` | Authentication and request protection |

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB Atlas account or a local MongoDB instance
- Google Gemini API key
- ImageKit account
- Email account with an application password for password reset emails

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

cd YOUR_REPOSITORY
```

Replace the repository URL with your actual GitHub repository URL.

### 2. Configure the Backend

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory.

Add the required environment variables as described in the Environment Variables section.

Start the backend development server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

The default port is 5000 unless configured otherwise.

### 3. Configure the Frontend

Open another terminal and navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run at the Vite development URL, normally:

```text
http://localhost:5173
```

### 4. Verify the Backend

Open the following endpoint in your browser:

```text
http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is healthy"
}
```

---

## Environment Variables

The backend requires the following environment variables.

Create `server/.env`:

```env
PORT=5000

CLIENT_URL=http://localhost:5173

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

RESET_PASSWORD_SECRET=your_reset_password_secret

GEMINI_API_KEY=your_gemini_api_key

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

EMAIL_USER=your_email_address

EMAIL_APP_PASSWORD=your_email_app_password
```

### Environment Variable Explanation

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `CLIENT_URL` | Frontend origin used for CORS and password reset links |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign authentication tokens |
| `RESET_PASSWORD_SECRET` | Secret used for password reset tokens |
| `GEMINI_API_KEY` | Google Gemini API key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private API key |
| `EMAIL_USER` | Email address used for sending reset emails |
| `EMAIL_APP_PASSWORD` | Email application password |

**Important:**

- Never commit `.env` files to GitHub.
- Keep API keys and database credentials private.
- Use separate secrets for authentication and password reset tokens.
- Configure production environment variables separately when deploying.

The frontend uses `VITE_API_URL` to determine the backend API address.

---

##  API Documentation

The backend exposes RESTful API endpoints through Express.

Base URL:

```text
http://localhost:5000
```

### 1. Authentication APIs

Base route: `/api/auth`

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Authenticate a user | No |
| POST | `/forgot-password` | Request password reset email | No |
| POST | `/reset-password/:token` | Reset password using token | No |

### 2. Resume Management APIs

Base route: `/api/resumes`

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/` | Create a resume | Yes |
| GET | `/` | Get all resumes of logged-in user | Yes |
| GET | `/:id` | Get a specific resume | Yes |
| PUT | `/:id` | Update a resume | Yes |
| PATCH | `/:id/visibility` | Change public/private visibility | Yes |
| DELETE | `/:id` | Delete a resume | Yes |
| GET | `/public/:publicId` | Retrieve a public resume | No |

### 3. AI APIs

Base route: `/api/ai`

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/improve` | Improve resume content using Gemini AI | Yes |
| POST | `/extract-resume` | Extract structured resume data using Gemini AI | Yes |

### 4. Image Upload API

Base route: `/api/images`

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/profile-image` | Upload a profile image to ImageKit | Yes |

### 5. Resume Upload API

Base route: `/api/resume-upload`

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/parse` | Extract text from PDF or DOCX resume | Yes |

### Authentication Header

Protected endpoints require a JWT access token.

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Example: Improve Resume Content

Request:

```http
POST /api/ai/improve
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN
```

Body:

```json
{
  "section": "project",
  "content": "Created a web application using React and Node.js."
}
```

The API returns the improved resume content in the `improvedText` field.

---

## 🗄️ Database Design

The application uses MongoDB with Mongoose for data modeling.

### User Model

The User collection stores registered user information.

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Unique user identifier |
| `name` | String | User's name |
| `email` | String | Unique email address |
| `password` | String | Hashed password |
| `createdAt` | Date | Account creation timestamp |
| `updatedAt` | Date | Last update timestamp |

Passwords are hashed using bcrypt before being stored.

### Resume Model

The Resume collection stores user-created resumes.

Important fields include:

- User reference
- Resume title
- Selected template
- Personal information
- Contact details
- Professional summary
- Work experience
- Education details
- Technical skills
- Categorized skills
- Project details
- Achievements
- Certifications
- Certification links
- Profile image URL
- Public/private visibility
- Unique public identifier
- Creation and update timestamps

Each resume is associated with a user through a MongoDB ObjectId reference.

---

## AI Integration

Google Gemini AI is one of the central components of this project.

The backend integrates Gemini using the official `@google/genai` SDK.

### 1. AI-Based Resume Content Improvement

The `/api/ai/improve` endpoint accepts:

- Original resume content
- Resume section type

The backend constructs a context-aware prompt and sends it to Gemini.

Section-specific instructions are used for:

- Professional summaries
- Project descriptions
- Work experience
- General resume content

The AI is instructed to preserve factual information, avoid fabricated achievements, and return only the improved text.

### 2. Intelligent Resume Parsing

The `/api/ai/extract-resume` endpoint converts extracted resume text into structured JSON.

The AI identifies information such as:

- Personal information
- Professional title
- Skills and skill categories
- Work experience
- Education
- Projects
- Achievements
- Certifications

The generated JSON is parsed by the backend and returned to the frontend.

### 3. Gemini Model Fallback

The backend implements a model fallback mechanism:

```text
Primary Model:
gemini-3.5-flash

        |
        v

If Gemini returns a 503
high-demand response

        |
        v

Fallback Model:
gemini-3.5-flash-lite
```

This helps the application attempt another available model when the primary model encounters a high-demand error.

---

## Resume Templates

The application provides four resume templates.

| Template | Description |
|---|---|
| Classic | Traditional ATS-oriented layout |
| Modern | Modern professional design |
| Minimal | Simple and clean design |
| Professional | Sidebar-based professional layout |

The `ResumePreview` component selects the appropriate template based on the resume's saved template value.

Users can preview their resume before exporting or sharing it.

---

## Security

Security-related mechanisms implemented in the application include:

- Password hashing using bcrypt.
- JWT-based authentication.
- Protected backend routes.
- User-specific resume access checks.
- Time-limited password reset tokens.
- Separate authentication and password reset secrets.
- File upload size restrictions.
- File type validation for document and image uploads.
- Environment-based storage of sensitive credentials.

Public resumes are accessible only when their visibility is enabled.

---

## Future Improvements

Potential improvements for future versions include:

- ATS compatibility scoring and keyword analysis.
- Job description-based resume optimization.
- Resume-to-job-description matching.
- AI-generated interview questions based on resume content.
- Advanced resume analytics and improvement suggestions.
- More customizable resume templates.
- Real-time collaborative resume editing.
- Resume version history.
- Support for additional document formats.
- Automated grammar and spelling analysis.
- More detailed resume section recommendations.

---

## Contributing

Contributions, feature suggestions, and bug reports are welcome.

To contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Implement your changes.
4. Test your implementation.
5. Commit your changes.
6. Open a pull request.

```bash
git checkout -b feature/your-feature-name

git add .

git commit -m "Add: your feature description"

git push origin feature/your-feature-name
```

---

⭐ If you find this project useful, consider giving the repository a star!

**Built with React, Node.js, MongoDB, Express, and Google Gemini AI.**
