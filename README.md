# Appointment Tracker

This is a full-stack web application for managing appointments. Users can view, create, and delete appointments via a user-friendly interface. The project is built using a C# ASP.NET Core Web API for the backend and a React + TypeScript frontend.

---

## Features

- View a list of scheduled appointments
- Create new appointments using a modal form
- Delete existing appointments 
- Lightweight and fully functional with no database dependency (uses in-memory storage)

---

## Technology Stack

### Backend (API)
- **ASP.NET Core (C#)**: Hosts a RESTful API for managing appointments
- **.NET 9 SDK**: Application is built with the latest .NET SDK
- **In-memory data**: Appointments are stored temporarily in memory (no database)
- **CORS**: Configured to allow frontend access from a separate port

### Frontend (Client)
- **React (TypeScript)**: Built using Create React App with TypeScript template
- **Fetch API**: Used to communicate with the backend
- **Component-based design**: Appointment list, creation form, and modal functionality are separated for clarity and maintainability

---

## Project Structure
appointment-tracker/ \
├── HealthTracker.Api/ # ASP.NET Core backend \
│ ├── Program.cs # API entry point and route configuration \
│ ├── Appointment.cs # Appointment model \
│ └── ... (other .NET files) \
├── healthtracker-client/ # React frontend \
│ ├── src/ \
│ │ ├── App.tsx # Main application logic \
│ │ ├── CreateAppointmentModal.tsx# Modal form for creating appointments \
│ │ └── ... \
│ └── public/ \
│ └── ... \
└── README.md \

---

## Getting Started

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [Node.js and npm](https://nodejs.org/)
- Git (for cloning the repository)

---

## Running the Application Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/appointment-tracker.git
cd appointment-tracker
```

### 2. Run the Backend (C# API)
```bash
cd HealthTracker.Api
dotnet run
```
This will start the API on `http://localhost:5168` (or a similar port, depending on system config).

### 3. Run the Frontend (React)
Open a new terminal tab or window:
```bash
cd healthtracker-client
npm install
npm start
```
This will start the React app on `http://localhost:3000` and open it in your browser.

### 4. Interaction
- The frontend will load existing appointments from the API
- You can create a new appointment via the modal form
- You can delete an appointment using the trashcan icon
- The frontend and backend communicate via HTTP calls (GET, POST, and DELETE)

---

## Notes
- Appointments are stored in memory and will reset when the server is restarted.
- No authentication or persistence is included.
- Designed for development and learning purposes, not production deployment.

---

## Future Improvements
- Add persistent storage using a database (e.g., SQLite or PostgreSQL)
- Add user authentication and authorization
- Support editing of appointments
- Add validation and error handling
- Implement pagination or filtering
- Add tests for backend and frontend
