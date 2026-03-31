import KakaoMap from "../components/KakaoMap";

function ParkingLocationPanel({ parking }) {
  if (!parking) return null;

  const lat = Number(parking.lat);
  const lng = Number(parking.lng);
  const hasValidLocation = !Number.isNaN(lat) && !Number.isNaN(lng);

  const kakaoMapLink = hasValidLocation
    ? `https://map.kakao.com/link/map/${encodeURIComponent(
        parking.name || "주차장",
      )},${lat},${lng}`
    : null;

  return (
    <section className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-xs font-semibold tracking-wider text-pink-400">
          LOCATION
        </p>
        <h3 className="mt-1 text-xl font-bold text-gray-900">위치 정보</h3>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
        <div className="overflow-hidden rounded-3xl">
          {hasValidLocation ? (
            <KakaoMap latitude={lat} longitude={lng} />
          ) : (
            <div className="flex h-64 items-center justify-center px-4 text-center text-sm text-gray-400">
              위치 좌표 정보가 없어 지도를 표시할 수 없어요.
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 bg-white px-4 py-4">
          <p className="text-sm font-semibold text-gray-800">
            {parking.address || "주소 정보 없음"}
          </p>

          <p className="mt-2 text-xs text-gray-400">
            위도: {hasValidLocation ? lat : "정보 없음"} / 경도:{" "}
            {hasValidLocation ? lng : "정보 없음"}
          </p>

          {kakaoMapLink && (
            <a
              href={kakaoMapLink}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex h-10 items-center justify-center rounded-2xl bg-gray-900 px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-700"
            >
              카카오맵에서 크게 보기
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default ParkingLocationPanel;
