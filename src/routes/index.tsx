import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "../layout/main-layout";
import HomePage from "../pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import News from "@/pages/News";
import AnimeDetailsPage from "@/pages/AnimeDetailsPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/news" element={<News />} />
      <Route path="/anime/:id" element={<AnimeDetailsPage />} />
    </Route>
  )
);
