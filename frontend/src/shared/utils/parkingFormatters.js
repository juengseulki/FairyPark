export function formatTime(value) {
  const raw = String(value || "").trim();

  if (!raw) return "";

  if (raw.length === 4) {
    return `${raw.slice(0, 2)}:${raw.slice(2, 4)}`;
  }

  return raw;
}

export function formatOperatingHours(start, end) {
  const formattedStart = formatTime(start);
  const formattedEnd = formatTime(end);

  if (!formattedStart || !formattedEnd) {
    return "운영시간 정보 없음";
  }

  return `${formattedStart} - ${formattedEnd}`;
}

export function formatPrice(value) {
  const num = Number(value);

  if (value === null || value === undefined || value === "") {
    return "정보 없음";
  }

  if (Number.isNaN(num)) {
    return "정보 없음";
  }

  if (num === 0) {
    return "무료";
  }

  return `${num.toLocaleString()}원`;
}

export function formatCapacity(value) {
  const num = Number(value);

  if (value === null || value === undefined || value === "") {
    return "주차면수 정보 없음";
  }

  if (Number.isNaN(num) || num <= 0) {
    return "주차면수 정보 없음";
  }

  return `${num.toLocaleString()}면`;
}

export function formatBasicFee(parking) {
  if (!parking) return "요금 정보 없음";

  if ((parking.feeInfo || "").includes("무료")) {
    return "무료";
  }

  const basicTime = parking.basicTime ? `${parking.basicTime}분` : "";
  const basicCharge = formatPrice(parking.basicCharge);

  if (basicTime && basicCharge !== "정보 없음") {
    return `기본 ${basicTime} ${basicCharge}`;
  }

  return parking.feeInfo || "요금 정보 없음";
}
