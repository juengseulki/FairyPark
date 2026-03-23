import { mockParkings } from "../../../data/mockParkings";

const BASE_URL = import.meta.env.VITE_PARKING_BASE_URL;
const SERVICE_KEY = import.meta.env.VITE_PARKING_SERVICE_KEY;

const USE_MOCK = false;

const parseNumber = (value) => {
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
};

const getText = (item, tagName) => {
  return item.querySelector(tagName)?.textContent?.trim() || "";
};

const normalizeParking = (item, index = 0) => {
  const latitude = parseNumber(getText(item, "latitude"));
  const longitude = parseNumber(getText(item, "longitude"));

  const totalSpaces = parseNumber(getText(item, "prkcmprt"));
  const baseFee = parseNumber(getText(item, "basicCharge"));
  const addFee = parseNumber(getText(item, "addCharge"));

  const name = getText(item, "prkplceNm") || "이름 없음";
  const roadAddress = getText(item, "rdnmadr");
  const jibunAddress = getText(item, "lnmadr");
  const address = roadAddress || jibunAddress || "주소 정보 없음";

  return {
    id:
      getText(item, "prkplceNo") || `${name}-${latitude}-${longitude}-${index}`,
    name,
    address,
    roadAddress,
    jibunAddress,

    latitude,
    longitude,
    lat: latitude,
    lng: longitude,

    type: getText(item, "prkplceSe"),
    parkingType: getText(item, "prkplceType"),
    totalSpaces,

    weekdayStart: getText(item, "weekdayOperOpenHhmm"),
    weekdayEnd: getText(item, "weekdayOperCloseHhmm"),
    saturdayStart: getText(item, "satOperOperOpenHhmm"),
    saturdayEnd: getText(item, "satOperCloseHhmm"),
    holidayStart: getText(item, "holidayOperOpenHhmm"),
    holidayEnd: getText(item, "holidayCloseOpenHhmm"),

    feeInfo: getText(item, "parkingchrgeInfo"),
    basicTime: getText(item, "basicTime"),
    basicCharge: baseFee,
    addUnitTime: getText(item, "addUnitTime"),
    addCharge: addFee,
    dayCmmtktAdjTime: getText(item, "dayCmmtktAdjTime"),
    dayCmmtkt: getText(item, "dayCmmtkt"),
    monthCmmtkt: getText(item, "monthCmmtkt"),

    operationDay: getText(item, "operDay"),
    phoneNumber: getText(item, "phoneNumber"),
    institutionName: getText(item, "institutionNm"),
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

const createApiUrl = () => {
  if (!BASE_URL || !SERVICE_KEY) {
    throw new Error("주차장 API 환경변수가 설정되지 않았습니다.");
  }

  const params = new URLSearchParams();
  params.set("serviceKey", SERVICE_KEY);
  params.set("pageNo", "1");
  params.set("numOfRows", "1000");
  params.set("type", "xml");

  return `${BASE_URL}?${params.toString()}`;
};

const parseXmlToParkings = (xmlText) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "text/xml");

  const resultCode = xml.querySelector("resultCode")?.textContent?.trim();
  const resultMsg = xml.querySelector("resultMsg")?.textContent?.trim();

  if (resultCode && resultCode !== "00") {
    throw new Error(resultMsg || "공공 API 응답 오류");
  }

  const items = Array.from(xml.querySelectorAll("item"));
  return items.map((item, index) => normalizeParking(item, index));
};

async function getAllParkings() {
  if (USE_MOCK) {
    return mockParkings.filter(isValidParking);
  }

  try {
    const apiUrl = createApiUrl();
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("주차장 데이터를 불러오지 못했습니다.");
    }

    const xmlText = await response.text();
    const parsed = parseXmlToParkings(xmlText);

    return parsed.filter(isValidParking);
  } catch (error) {
    console.error("실데이터 호출 실패 → mock 데이터 사용:", error);
    return mockParkings.filter(isValidParking);
  }
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
