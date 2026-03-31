export function formatTime(value) {
  const raw = String(value || "").trim();

  if (!raw) return "";

  if (raw.length === 4) {
    return `${raw.slice(0, 2)}:${raw.slice(2, 4)}`;
  }

  if (raw.length === 5 && raw.includes(":")) {
    return raw;
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
  if (value === null || value === undefined || value === "") {
    return "정보 없음";
  }

  const num = Number(value);

  if (Number.isNaN(num)) {
    return "정보 없음";
  }

  if (num === 0) {
    return "무료";
  }

  return `${num.toLocaleString()}원`;
}

export function formatCapacity(value) {
  if (value === null || value === undefined || value === "") {
    return "주차면수 정보 없음";
  }

  const num = Number(value);

  if (Number.isNaN(num) || num <= 0) {
    return "주차면수 정보 없음";
  }

  return `${num.toLocaleString()}면`;
}

export function formatFeeType(parking) {
  const feeInfo = String(parking?.feeInfo || "").trim();

  if (!feeInfo) return "정보 없음";
  if (feeInfo.includes("무료")) return "무료";
  if (feeInfo.includes("유료")) return "유료";

  return feeInfo;
}

export function formatBasicFee(parking) {
  if (!parking) return "기본요금 정보 없음";

  const basicTime = String(parking.basicTime || "").trim();
  const basicCharge = parking.basicCharge;

  if (
    basicTime &&
    basicCharge !== null &&
    basicCharge !== undefined &&
    basicCharge !== ""
  ) {
    return `${basicTime}분 ${formatPrice(basicCharge)}`;
  }

  if (formatFeeType(parking) === "무료") {
    return "무료";
  }

  return "기본요금 정보 없음";
}

export function formatAdditionalFee(parking) {
  if (!parking) return "추가요금 정보 없음";

  const addUnitTime = String(parking.addUnitTime || "").trim();
  const addCharge = parking.addCharge;

  if (
    addUnitTime &&
    addCharge !== null &&
    addCharge !== undefined &&
    addCharge !== ""
  ) {
    return `${addUnitTime}분당 ${formatPrice(addCharge)}`;
  }

  if (formatFeeType(parking) === "무료") {
    return "무료";
  }

  return "추가요금 정보 없음";
}

export function formatDayTicket(parking) {
  const value = parking?.dayCmmtkt;

  if (value === null || value === undefined || value === "") {
    return "정보 없음";
  }

  if (Number(value) === 0) {
    return "없음";
  }

  return formatPrice(value);
}

export function formatMonthlyTicket(parking) {
  const value = parking?.monthCmmtkt;

  if (value === null || value === undefined || value === "") {
    return "정보 없음";
  }

  if (Number(value) === 0) {
    return "없음";
  }

  return formatPrice(value);
}

export function getFeeTypeStyle(parking) {
  const feeInfo = String(parking?.feeInfo || "").trim();

  if (feeInfo.includes("무료")) {
    return {
      label: "무료",
      className: "bg-green-50 text-green-600",
    };
  }

  if (feeInfo.includes("유료")) {
    return {
      label: "유료",
      className: "bg-pink-50 text-pink-500",
    };
  }

  return {
    label: feeInfo || "정보 없음",
    className: "bg-gray-100 text-gray-500",
  };
}
