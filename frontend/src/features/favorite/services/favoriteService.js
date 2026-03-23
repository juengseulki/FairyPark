const STORAGE_KEY = "favorites";

export const getFavorites = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveFavorites = (favorites) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export const toggleFavorite = (parking) => {
  const favorites = getFavorites();

  const exists = favorites.find((item) => item.id === parking.id);

  if (exists) {
    const updated = favorites.filter((item) => item.id !== parking.id);
    saveFavorites(updated);
    return false; // 제거됨
  } else {
    const updated = [...favorites, parking];
    saveFavorites(updated);
    return true; // 추가됨
  }
};

export const isFavorite = (id) => {
  const favorites = getFavorites();
  return favorites.some((item) => item.id === id);
};
