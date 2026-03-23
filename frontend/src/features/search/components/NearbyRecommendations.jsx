function NearbyRecommendations({ nearbyRecommendations, onSelectParking }) {
  if (!nearbyRecommendations.length) return null;

  return (
    <div className="mb-6 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-5">
        <p className="mb-2 text-sm font-semibold text-violet-500">
          NEARBY PICK
        </p>
        <h2 className="text-2xl font-bold text-gray-900">
          내 위치에서 가까운 추천 주차장
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          현재 위치를 기준으로 가까운 주차장을 먼저 보여드려요.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {nearbyRecommendations.map((parking) => (
          <button
            key={parking.id}
            type="button"
            onClick={() => onSelectParking(parking)}
            className="rounded-3xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-pink-200 hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <p className="text-base font-bold text-gray-900">
                {parking.name}
              </p>
              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                추천
              </span>
            </div>

            <p className="mb-2 text-sm text-gray-500">{parking.address}</p>

            {typeof parking.distance === "number" && (
              <p className="text-sm font-semibold text-blue-600">
                📍 {parking.distance.toFixed(1)} km
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NearbyRecommendations;
