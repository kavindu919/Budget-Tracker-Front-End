# Wallet Wise - Budget Tracker Frontend

A personal finance management application built to help users track income, expenses, budgets, and spending categories in one place. Wallet Wise provides a clean dashboard with visual breakdowns so you can understand where your money goes at a glance.

This repository contains the frontend client. It communicates with a separate backend API server for data persistence and authentication.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Authentication Flow](#authentication-flow)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Dashboard Overview** -- View total income, total expenses, current balance, and budget usage at a glance through summary stat cards.
- **Interactive Charts** -- Monthly income vs. expenses bar chart, expense breakdown by category (donut chart), and budget vs. actual spending comparison, all powered by Recharts.
- **Transaction Management** -- Create, edit, and delete transactions. Filter by type, category, and date range. Search with debounced input for a smooth experience. Paginated results keep things fast even with large datasets.
- **Budget Tracking** -- Set monthly budgets per category and monitor actual spending against those targets.
- **Category Management** -- Create custom spending categories with user-defined color codes. Edit or remove categories as your needs change.
- **User Authentication** -- Register and log in with session-based authentication. Automatic token refresh keeps sessions alive without interrupting your workflow.
- **Responsive Layout** -- Sidebar navigation that adapts to mobile and desktop viewports. Consistent experience across screen sizes.
- **Form Validation** -- Client-side validation on all forms using Zod schemas, giving users immediate feedback before any network request is made.
- **Toast Notifications** -- Non-intrusive success and error messages via react-hot-toast so the user always knows what happened.

---

## Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | Next.js 16 (App Router)             |
| Language         | TypeScript 5                        |
| UI Styling       | Tailwind CSS 4                      |
| Charts           | Recharts 3                          |
| HTTP Client      | Axios (with interceptors)           |
| Validation       | Zod 4                               |
| State Management | React Context API                   |
| Notifications    | react-hot-toast                     |
| Icons            | react-icons                         |
| Font             | Poppins (via next/font)             |
| Linting          | ESLint 9 + eslint-config-next       |
| Formatting       | Prettier + prettier-plugin-tailwindcss |

---

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** v18.0 or later
- **npm** v9.0 or later (ships with Node.js)
- A running instance of the **Wallet Wise backend API** (the frontend expects the API at the URL defined in your `.env` file)

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/kavindu919/Budget-Tracker-Front-End.git
   cd Budget-Tracker-Front-End
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root (or copy the existing `.env.example` if provided):

   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

   Update the URL to point to wherever your backend API is running.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
.
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login page
│   │   └── register/       # Registration page
│   ├── dashboard/
│   │   ├── page.tsx         # Main dashboard with charts and stats
│   │   ├── transactions/    # Transaction list, filters, and CRUD
│   │   ├── budget/          # Budget management page
│   │   └── category/        # Category management page
│   ├── coming-soon/         # Placeholder for upcoming features
│   ├── layout.tsx           # Root layout with providers and global font
│   ├── globals.css          # Global styles and Tailwind directives
│   └── page.tsx             # Landing / redirect page
├── components/              # Reusable UI components
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── Navbar.tsx           # Top navigation bar
│   ├── StatCard.tsx         # Dashboard stat display card
│   ├── Pagination.tsx       # Paginated list controls
│   ├── PopUpModalComponent.tsx  # Reusable modal wrapper (uses React Portal)
│   ├── CategoryFilter.tsx   # Category filter dropdown
│   ├── TransactionFilters.tsx   # Combined filter controls for transactions
│   ├── Create*Popup.tsx     # Creation modals for transactions, budgets, categories
│   ├── Edit*Popup.tsx       # Edit modals for transactions, budgets, categories
│   └── ...                  # Buttons, inputs, form fields, etc.
├── context/
│   └── UserContext.tsx      # React Context provider for authenticated user state
├── hooks/
│   ├── useUser.ts           # Hook to access user context
│   └── useDebouncehook.ts   # Debounce hook for search input
├── lib/
│   └── axios.ts             # Axios instance with interceptors and token refresh logic
├── services/
│   ├── auth.Services.ts     # Auth API calls (login, register, profile, logout)
│   ├── transaction.Services.ts  # Transaction CRUD + summary API calls
│   ├── budget.Services.ts   # Budget CRUD API calls
│   └── category.Services.ts # Category CRUD API calls
├── utils/
│   ├── interfaces/          # TypeScript interfaces for API data shapes
│   ├── validation/          # Zod schemas for form validation
│   └── helpers/             # Utility functions (badges, formatters, etc.)
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── .prettierrc
```

---

## Environment Variables

| Variable              | Description                              | Default                        |
| --------------------- | ---------------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_API_URL`  | Base URL for the backend REST API        | `http://localhost:3001/api`     |

The `NEXT_PUBLIC_` prefix is required by Next.js to expose the variable to client-side code.

---

## Available Scripts

| Command          | Description                                      |
| ---------------- | ------------------------------------------------ |
| `npm run dev`    | Start the development server with hot reloading   |
| `npm run build`  | Create an optimized production build              |
| `npm run start`  | Serve the production build locally                |
| `npm run lint`   | Run ESLint across the codebase                    |

---

## Authentication Flow

The app uses HTTP-only cookie-based authentication managed by the backend. Here is how the frontend handles it:

1. The user logs in or registers through the auth pages. Credentials are sent to the backend, which sets session cookies on the response.
2. All subsequent API requests include cookies automatically (`withCredentials: true` on the Axios instance).
3. If a request returns a 401 status, the Axios response interceptor automatically attempts to refresh the session by calling the `/auth/refresh-tokens` endpoint.
4. If the refresh succeeds, the original failed request is retried transparently. If it fails, the user is redirected to the login page.
5. Concurrent 401 failures are queued and resolved together once the refresh completes, avoiding duplicate refresh calls.

---

## Contributing

Contributions are welcome. To get started:

1. Fork the repository.
2. Create a feature branch from `main`.
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit with clear, descriptive messages.
4. Push to your fork and open a pull request against the `main` branch.

Please make sure your code passes linting (`npm run lint`) before submitting.

---

## License

This project is open source and available under the [MIT License](LICENSE).
