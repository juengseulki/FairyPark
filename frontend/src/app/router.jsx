import { Routes, Route } from "react-router-dom";
import HomePage from "../features/search/pages/HomePage";
import SearchPage from "../features/search/pages/SearchPage";
import ParkingDetailPage from "../features/parking/pages/ParkingDetailPage";
import FavoritesPage from "../features/favorite/pages/FavoritesPage";
import LoginPage from "../features/auth/pages/LoginPage";
import SignupPage from "../features/auth/pages/SignupPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/parking/:id" element={<ParkingDetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default AppRouter;
