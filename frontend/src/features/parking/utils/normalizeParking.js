export function normalizePlace(item) {
  return {
    id: item.id,
    name: item.place_name || "이름 없음",

    address: item.road_address_name || item.address_name || "주소 정보 없음",
    roadAddress: item.road_address_name || "",
    jibunAddress: item.address_name || "",

    latitude: Number(item.y),
    longitude: Number(item.x),

    phone: item.phone || "",
    phoneNumber: item.phone || "정보 없음",

    category: item.category_name || "주차장",
    placeUrl: item.place_url || "",

    imageUrl: "/images/parking-default.png",

    type: "주차장",
    parkingType: "",
    totalSpaces: null,

    weekdayStart: "",
    weekdayEnd: "",
    saturdayStart: "",
    saturdayEnd: "",
    holidayStart: "",
    holidayEnd: "",

    feeInfo: "정보 없음",
    basicFee: null,

    paymentMethod: "정보 없음",
    specialNote: item.category_name || "카카오 장소 검색 결과",
    managerName: "정보 없음",
    hasDisabledParking: "정보 없음",

    distance: item.distance ? Number(item.distance) / 1000 : null,
  };
}
