export function formatTime(start, end) {
  if (start && end) return `${start} - ${end}`;
  return "정보 없음";
}

export function formatWeekdayHours(parking) {
  if (parking.weekdayStart && parking.weekdayEnd) {
    return `${parking.weekdayStart} - ${parking.weekdayEnd}`;
  }

  if (parking.operatingHours) {
    return parking.operatingHours;
  }

  return "정보 없음";
}

export function formatBasicFee(parking) {
  if (parking.basicFee) {
    return `${Number(parking.basicFee).toLocaleString()}원`;
  }

  if (parking.fee) {
    return `${Number(parking.fee).toLocaleString()}원`;
  }

  if (parking.feeInfo) {
    return parking.feeInfo;
  }

  return "정보 없음";
}
