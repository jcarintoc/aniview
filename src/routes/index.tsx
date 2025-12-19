import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layout/main-layout";
const HomePage = lazy(() => import("../pages/HomePage"));
const CatalogPage = lazy(() => import("@/pages/CatalogPage"));
const News = lazy(() => import("@/pages/News"));
const AnimeDetailsPage = lazy(() => import("@/pages/AnimeDetailsPage"));
const TrendingPage = lazy(() => import("@/pages/TrendingPage"));
const SeasonNowPage = lazy(() => import("@/pages/SeasonNowPage"));
const MostPopularPage = lazy(() => import("@/pages/MostPopularPage"));
const TopUpcomingPage = lazy(() => import("@/pages/TopUpcomingPage"));
import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center h-screen">
      <Spinner className="size-10 animate-spin" />
    </div>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route
        index
        element={
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="/catalog"
        element={
          <Suspense fallback={<Loading />}>
            <CatalogPage />
          </Suspense>
        }
      />
      <Route
        path="/news"
        element={
          <Suspense fallback={<Loading />}>
            <News />
          </Suspense>
        }
      />
      <Route
        path="/anime/:id"
        element={
          <Suspense fallback={<Loading />}>
            <AnimeDetailsPage />
          </Suspense>
        }
      />
      <Route
        path="/trending"
        element={
          <Suspense fallback={<Loading />}>
            <TrendingPage />
          </Suspense>
        }
      />
      <Route
        path="/season-now"
        element={
          <Suspense fallback={<Loading />}>
            <SeasonNowPage />
          </Suspense>
        }
      />
      <Route
        path="/most-popular"
        element={
          <Suspense fallback={<Loading />}>
            <MostPopularPage />
          </Suspense>
        }
      />
      <Route
        path="/top-upcoming"
        element={
          <Suspense fallback={<Loading />}>
            <TopUpcomingPage />
          </Suspense>
        }
      />
    </Route>
  )
);
