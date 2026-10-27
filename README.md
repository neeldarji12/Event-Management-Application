# Applen Solutions — Event Management Application

## Project Overview

The Event Management Application is a frontend-only React application developed as part of the Applen Solutions Frontend Internship Assignment.

It allows users to create, edit, delete, organize, search, filter, sort, and track events.

The application uses React state and browser localStorage to manage event data without a backend or database.

## Technology Stack

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- Browser localStorage

## Features

- Dashboard displaying total, upcoming, completed, and cancelled events.
- Create events with form validation.
- Edit existing event details.
- Delete events with confirmation.
- Update event status.
- Search events by title.
- Filter events by status.
- Sort events by date.
- Clear search and filter controls.
- Responsive interface for desktop and mobile.
- Persistent event storage using localStorage.
- Empty states for missing events and unmatched search results.

## Project Structure

```text
event-management/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── EventForm.jsx
│   │   ├── EventCard.jsx
│   │   ├── EventList.jsx
│   │   └── EventFilters.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── README.md
```

## Installation

### Prerequisites

Install Node.js and npm before starting the project.

### Step 1: Clone the repository

```bash
git clone https://github.com/neeldarji12/Event-Management-Application.git
```

Replace the placeholder with your actual GitHub repository URL.

### Step 2: Open the project

```bash
cd event-management
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Production Build

Run:

```bash
npm run build
```

Vite generates the production build in the `dist` directory.

## Data Persistence

The application saves event data in browser localStorage using the key `applen-events`.

Events remain available after refreshing the page in the same browser, provided the saved browser data is not cleared.

The application does not use a backend, database, external API, or DJ Immigration integration.

## Validation Rules

- Event title is required and must contain at least three characters.
- Event description is optional and cannot exceed 300 characters.
- Event date is required.
- New events cannot have a date in the past.
- An existing historical event can retain its original date.
- Event time is required.
- Event location is required.
- New events default to the Upcoming status.

## Author

Neel Darji

## Assignment

Applen Solutions — Frontend Internship Assignment

Event Management Application