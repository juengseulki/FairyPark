const fs = require("fs");
const rawData = require("./전국주차장정보표준데이터.json");

const parseNumber = (v) => {
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};

const parseTime = (v) => {
  if (v == null) return "";
  return String(v).trim();
};

const parkings = rawData.records
  .map((item, index) => {
    const lat = parseNumber(item["위도"]);
    const lng = parseNumber(item["경도"]);

    if (lat == null || lng == null) return null;

    return {
      id: item["주차장관리번호"] || String(index),
      name: item["주차장명"] || "이름 없음",
      address:
        item["소재지도로명주소"] || item["소재지지번주소"] || "주소 정보 없음",

      roadAddress: item["소재지도로명주소"] || "",
      jibunAddress: item["소재지지번주소"] || "",

      lat,
      lng,

      totalSpaces: parseNumber(item["주차구획수"]),
      feeInfo: item["요금정보"] || "",

      type: item["주차장구분"] || "",
      parkingType: item["주차장유형"] || "",

      weekdayStart: parseTime(item["평일운영시작시각"]),
      weekdayEnd: parseTime(item["평일운영종료시각"]),
      saturdayStart: parseTime(item["토요일운영시작시각"]),
      saturdayEnd: parseTime(item["토요일운영종료시각"]),
      holidayStart: parseTime(item["공휴일운영시작시각"]),
      holidayEnd: parseTime(item["공휴일운영종료시각"]),

      basicTime: parseTime(item["기본주차시간"]),
      basicCharge: parseNumber(item["기본주차요금"]),
      addUnitTime: parseTime(item["추가단위시간"]),
      addCharge: parseNumber(item["추가단위요금"]),

      dayCmmtktAdjTime: parseTime(item["1일주차권요금적용시간"]),
      dayCmmtkt: parseNumber(item["1일주차권요금"]),
      monthCmmtkt: parseNumber(item["월정기권요금"]),

      phoneNumber: item["전화번호"] || "",
      institutionName: item["관리기관명"] || "",
    };
  })
  .filter(Boolean);

console.log("총 개수:", parkings.length);

fs.writeFileSync("./parkings.json", JSON.stringify(parkings, null, 2), "utf-8");
