import parkingsData from "../../../data/parkings.json";

const parseNumber = (value) => {
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
};

const normalizeParking = (parking, index = 0) => {
  const latitude = parseNumber(parking.latitude ?? parking.lat);
  const longitude = parseNumber(parking.longitude ?? parking.lng);

  const name = parking.name || "이름 없음";
  const roadAddress = parking.roadAddress || "";
  const jibunAddress = parking.jibunAddress || "";
  const address =
    parking.address || roadAddress || jibunAddress || "주소 정보 없음";

  return {
    id: parking.id || `${name}-${latitude}-${longitude}-${index}`,
    name,
    address,
    roadAddress,
    jibunAddress,

    latitude,
    longitude,
    lat: latitude,
    lng: longitude,

    type: parking.type || "",
    parkingType: parking.parkingType || "",
    totalSpaces: parseNumber(parking.totalSpaces),

    weekdayStart: parking.weekdayStart || "",
    weekdayEnd: parking.weekdayEnd || "",
    saturdayStart: parking.saturdayStart || "",
    saturdayEnd: parking.saturdayEnd || "",
    holidayStart: parking.holidayStart || "",
    holidayEnd: parking.holidayEnd || "",

    feeInfo: parking.feeInfo || "",
    basicTime: parking.basicTime || "",
    basicCharge: parseNumber(parking.basicCharge),
    addUnitTime: parking.addUnitTime || "",
    addCharge: parseNumber(parking.addCharge),
    dayCmmtktAdjTime: parking.dayCmmtktAdjTime || "",
    dayCmmtkt: parking.dayCmmtkt || "",
    monthCmmtkt: parking.monthCmmtkt || "",

    operationDay: parking.operationDay || "",
    phoneNumber: parking.phoneNumber || "",
    institutionName: parking.institutionName || "",
  };
};

const isValidParking = (parking) => {
  return (
    parking &&
    parking.name &&
    parking.lat != null &&
    parking.lng != null &&
    !Number.isNaN(parking.lat) &&
    !Number.isNaN(parking.lng)
  );
};

const filterByKeyword = (parkings, keyword) => {
  const trimmedKeyword = keyword.trim().toLowerCase();

  if (!trimmedKeyword) {
    return parkings;
  }

  return parkings.filter((parking) => {
    return (
      parking.name?.toLowerCase().includes(trimmedKeyword) ||
      parking.address?.toLowerCase().includes(trimmedKeyword) ||
      parking.roadAddress?.toLowerCase().includes(trimmedKeyword) ||
      parking.jibunAddress?.toLowerCase().includes(trimmedKeyword)
    );
  });
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

async function getAllParkings() {
  return parkingsData
    .map((parking, index) => normalizeParking(parking, index))
    .filter(isValidParking);
}

export async function fetchParkings(keyword = "") {
  const parkings = await getAllParkings();
  const filtered = filterByKeyword(parkings, keyword);

  return {
    totalCount: filtered.length,
    data: filtered,
  };
}

export async function fetchRecommendedParkings(lat, lng) {
  const parsedLat = Number(lat);
  const parsedLng = Number(lng);

  if (Number.isNaN(parsedLat) || Number.isNaN(parsedLng)) {
    return {
      totalCount: 0,
      data: [],
    };
  }

  const parkings = await getAllParkings();

  const recommended = parkings
    .map((parking) => ({
      ...parking,
      distance: getDistance(parsedLat, parsedLng, parking.lat, parking.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 10);

  return {
    totalCount: recommended.length,
    data: recommended,
  };
}

export async function fetchParkingById(id) {
  if (!id) {
    throw new Error("주차장 id가 필요합니다.");
  }

  const parkings = await getAllParkings();
  const parking = parkings.find((item) => String(item.id) === String(id));

  if (!parking) {
    throw new Error("해당 주차장을 찾을 수 없습니다.");
  }

  return parking;
}
