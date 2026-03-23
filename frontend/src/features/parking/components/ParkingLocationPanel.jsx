import KakaoMap from "./KakaoMap";

function ParkingLocationPanel({ parking }) {
  return (
    <div className="rounded-3xl bg-white p-5 ring-1 ring-black/5">
      <h3 className="mb-4 text-lg font-bold text-gray-900">위치 정보</h3>

      <div className="overflow-hidden rounded-3xl">
        <KakaoMap latitude={parking.latitude} longitude={parking.longitude} />
      </div>

      <p className="mt-3 text-sm leading-6 text-gray-500">
        {parking.address || "주소 정보 없음"}
      </p>
      <p className="mt-1 text-xs text-gray-400">
        위도: {parking.latitude} / 경도: {parking.longitude}
      </p>
    </div>
  );
}

export default ParkingLocationPanel;
