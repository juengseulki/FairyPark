import { useMemo } from "react";

const parseNumber = (value) => {
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
};

const matchesKeyword = (parking, keyword) => {
  const trimmedKeyword = (keyword || "").trim().toLowerCase();

  if (!trimmedKeyword) return true;

  return (
    parking.name?.toLowerCase().includes(trimmedKeyword) ||
    parking.address?.toLowerCase().includes(trimmedKeyword) ||
    parking.roadAddress?.toLowerCase().includes(trimmedKeyword) ||
    parking.jibunAddress?.toLowerCase().includes(trimmedKeyword)
  );
};

const matchesFeeType = (parking, feeType) => {
  if (feeType === "ALL") return true;

  const feeInfo = (parking.feeInfo || "").trim();

  if (feeType === "FREE") {
    return feeInfo.includes("무료");
  }

  if (feeType === "PAID") {
    return !feeInfo.includes("무료");
  }

  return true;
};

const matchesCapacity = (parking, capacity) => {
  if (capacity === "ALL") return true;

  const totalSpaces = parseNumber(parking.totalSpaces) || 0;

  if (capacity === "SMALL") {
    return totalSpaces < 50;
  }

  if (capacity === "MEDIUM") {
    return totalSpaces >= 50 && totalSpaces < 200;
  }

  if (capacity === "LARGE") {
    return totalSpaces >= 200;
  }

  return true;
};

const isInBounds = (parking, mapBounds) => {
  if (!mapBounds) return true;

  const lat = Number(parking.lat ?? parking.latitude);
  const lng = Number(parking.lng ?? parking.longitude);

  if (Number.isNaN(lat) || Number.isNaN(lng)) return false;

  return (
    lat >= mapBounds.south &&
    lat <= mapBounds.north &&
    lng >= mapBounds.west &&
    lng <= mapBounds.east
  );
};

const toRadians = (degree) => (degree * Math.PI) / 180;

const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371e3;

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lng2 - lng1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const sortParkings = (parkings, sortType, userLocation) => {
  const copied = [...parkings];

  switch (sortType) {
    case "NAME":
      return copied.sort((a, b) => a.name.localeCompare(b.name));

    case "CAPACITY_HIGH":
      return copied.sort(
        (a, b) => (Number(b.totalSpaces) || 0) - (Number(a.totalSpaces) || 0),
      );

    case "CAPACITY_LOW":
      return copied.sort(
        (a, b) => (Number(a.totalSpaces) || 0) - (Number(b.totalSpaces) || 0),
      );

    case "DISTANCE":
      if (!userLocation) return copied;

      return copied.sort((a, b) => {
        const aDistance = getDistance(
          userLocation.lat,
          userLocation.lng,
          Number(a.lat ?? a.latitude),
          Number(a.lng ?? a.longitude),
        );
        const bDistance = getDistance(
          userLocation.lat,
          userLocation.lng,
          Number(b.lat ?? b.latitude),
          Number(b.lng ?? b.longitude),
        );

        return aDistance - bDistance;
      });

    default:
      return copied;
  }
};

function useParkingSearch({
  parkings = [],
  keyword = "",
  filters = {},
  sortType = "DEFAULT",
  userLocation = null,
  mapBounds = null,
}) {
  const filteredAndSortedParkings = useMemo(() => {
    const filtered = parkings.filter((parking) => {
      const matchesMapOnly = !filters.mapOnly || isInBounds(parking, mapBounds);

      return (
        matchesKeyword(parking, keyword) &&
        matchesFeeType(parking, filters.feeType || "ALL") &&
        matchesCapacity(parking, filters.capacity || "ALL") &&
        matchesMapOnly
      );
    });

    return sortParkings(filtered, sortType, userLocation);
  }, [parkings, keyword, filters, sortType, userLocation, mapBounds]);

  const nearbyRecommendations = useMemo(() => {
    if (!userLocation || !parkings.length) {
      return [];
    }

    return [...parkings]
      .filter((parking) => {
        const lat = Number(parking.lat ?? parking.latitude);
        const lng = Number(parking.lng ?? parking.longitude);

        return !Number.isNaN(lat) && !Number.isNaN(lng);
      })
      .map((parking) => ({
        ...parking,
        distance: getDistance(
          userLocation.lat,
          userLocation.lng,
          Number(parking.lat ?? parking.latitude),
          Number(parking.lng ?? parking.longitude),
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }, [parkings, userLocation]);

  return {
    filteredAndSortedParkings,
    nearbyRecommendations,
  };
}

export default useParkingSearch;
