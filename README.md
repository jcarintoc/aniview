# Aniview

Aniview is a modern, responsive anime discovery platform and catalog application powered by the [Jikan API](https://jikan.moe/). Built with performance and user experience in mind, it allows fans to explore trending series, discover upcoming releases, and dive deep into their favorite anime titles.

## ✨ Features

- **Dynamic Homepage**: Explore featured and trending anime at a glance.
- **Advanced Catalog**: Comprehensive filtering and search capabilities to find exactly what you're looking for.
- **Detailed Insights**: View synopsis, characters, staff, and recommendations for any anime.
- **Real-time Categories**:
  - **Trending**: What's hot in the community right now.
  - **Season Now**: The latest releases for the current season.
  - **Most Popular**: All-time fan favorites.
  - **Top Upcoming**: Stay ahead of the curve with future releases.
- **Producer Directory**: Browse anime by production studios.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [TanStack Query v5](https://tanstack.com/query/latest) (for efficient server state and caching)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Client**: [Axios](https://axios-http.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/)

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **Package Manager**: npm, yarn, or pnpm

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/jcarintoc/aniview.git
    cd aniview
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Copy the example environment file and configure your variables:
    ```bash
    cp .env.example .env
    ```
    Ensure `VITE_API_BASE_URL` is set (e.g., `https://api.jikan.moe`) and `VITE_API_VERSION` is set (e.g., `v4`).

### Running Locally

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

## 📁 Project Structure

```text
src/
├── api/        # API configuration and service functions
├── components/ # Reusable UI components (Radix/Shadcn)
├── hooks/      # Custom React hooks
├── layout/     # Page layout structures
├── lib/        # Shared utilities and configurations
├── pages/      # Page-level components
├── query/      # TanStack Query keys and hooks
├── routes/     # Routing configuration
└── type/       # TypeScript interfaces and types
```
