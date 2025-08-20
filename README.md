

# Vibe Search 🔮
## ✨ About The Project

Vibe Search is an interactive Next.js application that helps users discover real estate properties based on descriptive "vibes" (e.g., "beach property in Goa", "mountain retreat", "farmhouse investment").
It combines a search API, AI-driven property matching, and modern UI components with animations and effects to deliver a delightful user experience.

---

## 🚀 Key Features

-   **🤖 AI-Powered Semantic Search**: Users can input natural language queries like "a serene mountain retreat for yoga" or "a vibrant beachfront house for parties" to find relevant properties.
-   **💬 Interactive Chat UI**: A modern, chat-based interface for a more intuitive and engaging search experience.
-   **✨ Dynamic & Animated Frontend**:
    -   A procedural WebGL animated background (`DarkVeil`) creates an immersive atmosphere.
    -   `SpotlightCard` components provide a cool hover effect that follows the user's cursor.
    -   Animated gradient text and badges add a polished, premium feel.
-   **✅ Detailed & Relevant Results**: Each property card displays key information, including a relevance score, the reasons it matches the user's vibe, and descriptive tags.
-   **⚡️ Serverless Backend**: The search logic is handled by a Next.js API route, making the application fast and scalable.

---

## 🛠️ Tech Stack

This project is built with a modern, TypeScript-first tech stack.

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI Backend**: Google Gemini API (for the semantic `findPropertiesByVibe` function)
-   **Graphics & Animation**:
    -   [ogl](https://oframe.github.io/ogl/): A small, effective WebGL library for the animated background.
    -   Custom CSS animations and React hooks for UI effects.

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm (or yarn) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/vibe-search.git
    cd vibe-search
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    ```
3.  **Set up environment variables:**
    You'll need to create a `.env.local` file in the root of the project and add your Google Gemini API key.
    ```env
    GEMINI_API_KEY='YOUR_API_KEY_HERE'
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the result.

---

## 🔌 API Endpoint

The project contains a core API endpoint for handling the search logic.

### Vibe Search

-   **Endpoint**: `POST /api/chat`

-   **Description**: Takes a user's natural language message and returns a list of matching properties from the `enhancedProperties.json` dataset.

-   **Request Body**:

    ```json
    {
    	"message": "A quiet and peaceful place surrounded by nature."
    }
    ```

-   **Success Response** (`200 OK`):

    ```json
    {
      "success": true,
      "results": [
        {
          "id": "prop1",
          "ProjectName": "Serene Meadows",
          "vibeSummary": "An oasis of calm...",
          "...other property details"
        }
      ],
      "matchData": [
        {
          "id": "prop1",
          "relevanceScore": 9,
          "matchReasons": ["Surrounded by lush greenery...", "Designed for tranquility..."]
        }
      ],
      "query": "A quiet and peaceful place surrounded by nature."
    }
    ```

-   **Endpoint**: `GET /api/chat`

-   **Description**: A simple health-check endpoint to confirm the API is running.

---

## 🧩 Components Overview

The frontend is built with several reusable and specialized React components.

-   `VibeSearch.tsx`: The main component that orchestrates the entire chat interface, state management, and API calls.
-   `SpotlightCard.tsx`: An interactive card used to display each property result. It features a beautiful spotlight effect on mouse hover.
-   `DarkVeil.tsx`: Creates the stunning, procedural WebGL background animation using `ogl` and GLSL shaders.
-   `AnimatedGradientText.tsx` & `GradientText.tsx`: Reusable components for creating eye-catching animated gradient text effects.
-   `AnimateBadge.tsx`: A small, animated badge component used for announcements.
