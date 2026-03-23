export const parseNumber = (value) => {
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
};

export const getLat = (parking) => {
  const value = parking?.latitude ?? parking?.lat;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
};

export const getLng = (parking) => {
  const value = parking?.longitude ?? parking?.lng;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
};

export const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};
