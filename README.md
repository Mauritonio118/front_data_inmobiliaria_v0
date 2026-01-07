# Real Estate Tokenization & Crowdfunding Market Platform (MVP)

## Project Overview

This project represents the **Minimum Viable Product (MVP)** for a startup dedicated to collecting, organizing, and providing real-time data on the **tokenized real estate** and **real estate crowdfunding** markets worldwide.

The primary goal of this version is to validate the business idea and core value proposition by verifying user interest and system functionality.

## Core Features & Goals

While strictly an MVP, the platform aims to deliver value through the following core functionalities:

### 1. Market Intelligence & Visualization
-   **Data Navigation**: Browse detailed information stored in **MongoDB**.
-   **Entities**: View data on Platforms, Projects, Market Trends, and Industry News.
-   **Tiered Access**:
    -   **Free Tier**: Publicly available data for all users.
    -   **Premium Tier**: Exclusive, high-value data for paying subscribers.

### 2. User Management
-   Secure User Account Creation and Authentication (Login/Logout).
-   Account profile management.

### 3. Subscription System
-   Subscribe to Premium plans.
-   Manage payment methods and subscription status (Upgrade/Cancel).

## Application Standards & Requirements

All development must adhere to the following critical standards:

-   **📱 Mobile & Desktop Excellence (CRITICAL)**:
    -   The application must be **fully responsive**.
    -   **Every** component, functionality, and layout structure must be designed to work and look perfect on Mobile devices as well as Desktops.
-   **🌐 Language**:
    -   The application UI and content must be **100% in English**.
-   **💻 Code Quality**:
    -   All code must be **commented** and **documented** to ensure maintainability and scalability.
-   **🌙 Theme**:
    -   The application must use **Dark Mode** by default.

## Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/)
-   **UI Library**: React 19

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (Latest LTS recommended)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd front_data_inmobiliaria_v0
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory to configure your environment variables (e.g., MongoDB credentials).
    ```env
    MONGODB_URI=your_mongodb_connection_string
    # Add other private keys here
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  **Open the Application:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Development Guidelines

-   **Aesthetics**: Follow modern design principles with rich aesthetics (Glassmorphism, vibrant colors, etc.).
-   **Performance**: Optimize for fast load times and smooth interactions.
-   **Testing**: Always verify layout and functionality on mobile viewports during development.
