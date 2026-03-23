import { useCallback, useEffect, useState } from "react";
import {
  getFavorites,
  isFavorite,
  toggleFavorite,
} from "../services/favoriteService";

function useFavorites(parkingId) {
  const [favorites, setFavorites] = useState([]);
  const [favorite, setFavorite] = useState(false);

  const refreshFavorites = useCallback(() => {
    const nextFavorites = getFavorites();
    setFavorites(nextFavorites);

    if (parkingId !== undefined && parkingId !== null) {
      setFavorite(isFavorite(parkingId));
    }
  }, [parkingId]);

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  const handleToggleFavorite = useCallback((parking) => {
    const result = toggleFavorite(parking);
    setFavorite(result);
    setFavorites(getFavorites());
    return result;
  }, []);

  return {
    favorites,
    favorite,
    toggleFavorite: handleToggleFavorite,
    refreshFavorites,
  };
}

export default useFavorites;
