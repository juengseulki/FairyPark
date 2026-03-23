import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecommendedParkings } from "../../parking/services/parkingApi";
import SearchBar from "../components/SearchBar";
import useUserLocation from "../hooks/useUserLocation";

const quickRegions = ["강남", "잠실", "성수", "여의도", "역삼", "삼성"];
const DEFAULT_PARKING_IMAGE = "/src/shared/image/parking-default.png";

function HomePage() {
  const navigate = useNavigate();
  const userLocation = useUserLocation();

  const [featuredParkings, setFeaturedParkings] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);

  const handleQuickSearch = (region) => {
    navigate(`/search?keyword=${encodeURIComponent(region)}`);
  };

  useEffect(() => {
    if (!userLocation?.lat || !userLocation?.lng) return;

    let isCancelled = false;

    async function loadRecommendedParkings() {
      try {
        setIsLoadingRecommendations(true);

        const result = await fetchRecommendedParkings(
          userLocation.lat,
          userLocation.lng,
        );

        if (!isCancelled) {
          setFeaturedParkings((result.data || []).slice(0, 3));
        }
      } catch (error) {
        console.error("추천 주차장 불러오기 실패:", error);

        if (!isCancelled) {
          setFeaturedParkings([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingRecommendations(false);
        }
      }
    }

    loadRecommendedParkings();

    return () => {
      isCancelled = true;
    };
  }, [userLocation]);

  return (
    <main className="min-h-[calc(100vh-73px)] bg-gradient-to-b from-rose-50 via-white to-violet-50">
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-5 inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
            쉽고 빠른 주차장 검색
          </span>

          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            주차장 찾기,
            <br />
            <span className="text-pink-500">이제 더 간편하게</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            지역명이나 주차장명을 검색하고, 운영시간과 요금, 위치까지 한 번에
            확인해보세요.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] bg-white/90 p-4 shadow-xl ring-1 ring-black/5 backdrop-blur">
          <SearchBar />
        </div>

        <div className="mt-6 text-center">
          <p className="mb-3 text-sm font-medium text-gray-500">
            많이 찾는 지역
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickRegions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => handleQuickSearch(region)}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600"
              >
                #{region}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-pink-500">
              RECOMMENDED
            </p>
            <h2 className="text-2xl font-bold text-gray-900">
              내 주변 추천 주차장
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              현재 위치를 기준으로 가까운 주차장을 추천해드려요.
            </p>
          </div>
        </div>

        {isLoadingRecommendations ? (
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-black/5">
            <p className="text-base font-semibold text-gray-600">
              내 주변 추천 주차장을 불러오는 중입니다...
            </p>
          </div>
        ) : featuredParkings.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-black/5">
            <p className="text-base font-semibold text-gray-600">
              위치 정보를 확인하면 주변 추천 주차장을 보여드릴게요.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {featuredParkings.map((parking) => (
              <button
                key={parking.id}
                type="button"
                onClick={() =>
                  navigate(`/parking/${parking.id}`, {
                    state: { parking },
                  })
                }
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={parking.imageUrl || DEFAULT_PARKING_IMAGE}
                  alt={parking.name}
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_PARKING_IMAGE;
                  }}
                  className="h-44 w-full object-cover"
                />

                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {parking.name}
                    </h3>

                    <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                      추천
                    </span>
                  </div>

                  {typeof parking.distance === "number" && (
                    <div className="mb-3 inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600">
                      📍 {parking.distance.toFixed(1)} km
                    </div>
                  )}

                  <p className="mb-2 text-sm text-gray-500">
                    {parking.address}
                  </p>

                  <p className="mb-1 text-sm text-gray-700">
                    전화번호: {parking.phone || "정보 없음"}
                  </p>

                  <p className="text-sm font-semibold text-pink-600">
                    {parking.category || "주차장"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <p className="mb-2 text-sm font-semibold text-violet-500">WHY US</p>
            <h2 className="text-2xl font-bold text-gray-900">
              이런 점이 편리해요
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-gray-50 p-6">
              <div className="mb-3 text-2xl">🔎</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                빠른 검색
              </h3>
              <p className="text-sm leading-6 text-gray-600">
                지역명이나 주차장명을 입력해 원하는 장소를 빠르게 찾을 수
                있어요.
              </p>
            </div>

            <div className="rounded-3xl bg-gray-50 p-6">
              <div className="mb-3 text-2xl">🗺️</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                지도 기반 탐색
              </h3>
              <p className="text-sm leading-6 text-gray-600">
                검색 결과를 지도와 함께 확인하면서 위치를 직관적으로 비교할 수
                있어요.
              </p>
            </div>

            <div className="rounded-3xl bg-gray-50 p-6">
              <div className="mb-3 text-2xl">📍</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                내 주변 추천
              </h3>
              <p className="text-sm leading-6 text-gray-600">
                현재 위치를 기준으로 가까운 주차장을 추천받을 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 pt-4">
        <div className="rounded-[2rem] bg-gray-900 px-6 py-12 text-center text-white shadow-sm">
          <p className="mb-3 text-sm font-semibold text-pink-300">START NOW</p>
          <h2 className="mb-4 text-3xl font-extrabold">
            지금 바로 주차장을 검색해보세요
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
            원하는 지역, 운영 정보, 요금까지 한 번에 확인하고 편하게 주차장을
            찾아보세요.
          </p>

          <button
            type="button"
            onClick={() => navigate("/search")}
            className="rounded-2xl bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
          >
            검색 페이지로 이동
          </button>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
