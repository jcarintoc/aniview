// routes.tsx
import { lazy, Suspense, type ReactNode } from "react";
import MainLayout from "../layout/main-layout";
import { Spinner } from "@/components/ui/spinner";

// Lazy-loaded pages
const pages = {
  HomePage: lazy(() => import("../pages/HomePage")),
  CatalogPage: lazy(() => import("@/pages/CatalogPage")),
  AnimeDetailsPage: lazy(() => import("@/pages/AnimeDetailsPage")),
  TrendingPage: lazy(() => import("@/pages/TrendingPage")),
  SeasonNowPage: lazy(() => import("@/pages/SeasonNowPage")),
  MostPopularPage: lazy(() => import("@/pages/MostPopularPage")),
  TopUpcomingPage: lazy(() => import("@/pages/TopUpcomingPage")),
  ProducersPage: lazy(() => import("@/pages/ProducersPage")),
};

const Loading = () => (
  <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center h-screen">
    <Spinner className="size-10 animate-spin" />
  </div>
);

// Helper to wrap components with Suspense
const withSuspense = (
  Component: React.LazyExoticComponent<() => ReactNode>
) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

// Route definitions - clean and minimal
const routeConfig = [
  { path: "/", element: pages.HomePage, index: true },
  { path: "/catalog", element: pages.CatalogPage },
  { path: "/anime/:id", element: pages.AnimeDetailsPage },
  { path: "/trending", element: pages.TrendingPage },
  { path: "/season-now", element: pages.SeasonNowPage },
  { path: "/most-popular", element: pages.MostPopularPage },
  { path: "/top-upcoming", element: pages.TopUpcomingPage },
  { path: "/producers", element: pages.ProducersPage },
];

// Generate routes from config
export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: routeConfig.map(({ path, element, index }) => ({
      ...(index ? { index: true } : { path }),
      element: withSuspense(element),
    })),
  },
];
