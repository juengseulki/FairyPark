import { useEffect, useState } from "react";
import NearbyRecommendations from "../components/NearbyRecommendations";
import SearchBar from "../components/SearchBar";
import SearchFilterPanel from "../components/SearchFilterPanel";
import SearchMapSection from "../components/SearchMapSection";
import SearchResultHeader from "../components/SearchResultHeader";
import SearchResultsSection from "../components/SearchResultsSection";
import { fetchRecommendedParkings } from "../../parking/services/parkingApi";
import useSearchParkings from "../hooks/useSearchParkings";
import useParkingSearch from "../hooks/useParkingSearch";
import useSearchParamsState from "../hooks/useSearchParamsState";
import useSelectedParking from "../hooks/useSelectedParking";
import useUserLocation from "../hooks/useUserLocation";

function SearchPage() {
  const { keyword, filters, setFilters, sortType, setSortType } =
    useSearchParamsState();

  const userLocation = useUserLocation();
  const { parkings, isLoading, errorMessage } = useSearchParkings(keyword);

  const [mapBounds, setMapBounds] = useState(null);
  const [manualParkings, setManualParkings] = useState(null);
  const [isNearbyLoading, setIsNearbyLoading] = useState(false);
  const [nearbyErrorMessage, setNearbyErrorMessage] = useState("");

  const displayParkings = manualParkings ?? parkings;

  useEffect(() => {
    setManualParkings(null);
    setNearbyErrorMessage("");
  }, [keyword]);

  const { filteredAndSortedParkings, nearbyRecommendations } = useParkingSearch(
    {
      parkings: displayParkings,
      keyword,
      filters,
      sortType,
      userLocation,
      mapBounds,
    },
  );

  const { selectedParking, setSelectedParking } = useSelectedParking(
    filteredAndSortedParkings,
  );

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      feeType: "ALL",
      capacity: "ALL",
      mapOnly: false,
    });
    setSortType("DEFAULT");
    setManualParkings(null);
    setNearbyErrorMessage("");
  };

  const handleMoveToMyLocation = async () => {
    if (!userLocation) {
      alert("위치 정보를 가져오는 중입니다.");
      return;
    }

    try {
      setIsNearbyLoading(true);
      setNearbyErrorMessage("");

      const result = await fetchRecommendedParkings(
        userLocation.lat,
        userLocation.lng,
      );

      const recommendedParkings = result.data || [];
      setManualParkings(recommendedParkings);

      setSelectedParking({
        id: "__my_location__",
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        lat: userLocation.lat,
        lng: userLocation.lng,
        name: "내 위치",
        address: "현재 위치",
      });
    } catch (error) {
      console.error(error);
      setNearbyErrorMessage(
        error.message || "내 주변 주차장 검색에 실패했습니다.",
      );
    } finally {
      setIsNearbyLoading(false);
    }
  };

  const finalLoading = isLoading || isNearbyLoading;
  const finalErrorMessage = nearbyErrorMessage || errorMessage;

  return (
    <main className="min-h-[calc(100vh-73px)] bg-gradient-to-b from-rose-50 via-white to-violet-50">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <SearchResultHeader
          keyword={manualParkings ? "내 주변 주차장" : keyword}
          resultCount={filteredAndSortedParkings.length}
        />

        <div className="mb-8 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <SearchBar initialKeyword={keyword} />
        </div>

        {finalLoading ? (
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-black/5">
            <p className="text-lg font-semibold text-gray-700">
              데이터를 불러오는 중입니다...
            </p>
          </div>
        ) : finalErrorMessage ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-16 text-center">
            <p className="text-lg font-semibold text-red-600">
              {finalErrorMessage}
            </p>
          </div>
        ) : (
          <>
            <NearbyRecommendations
              nearbyRecommendations={nearbyRecommendations}
              onSelectParking={setSelectedParking}
            />

            <SearchFilterPanel
              filters={filters}
              sortType={sortType}
              keyword={manualParkings ? "내 주변 주차장" : keyword}
              resultCount={filteredAndSortedParkings.length}
              onFilterChange={handleFilterChange}
              onSortChange={setSortType}
              onReset={handleReset}
              onMoveToMyLocation={handleMoveToMyLocation}
            />

            <SearchMapSection
              parkings={filteredAndSortedParkings}
              selectedParking={selectedParking}
              onSelectParking={setSelectedParking}
              onBoundsChange={setMapBounds}
              userLocation={userLocation}
            />

            <SearchResultsSection
              parkings={filteredAndSortedParkings}
              selectedParking={selectedParking}
              onSelectParking={setSelectedParking}
              shouldScrollIntoView={false}
            />
          </>
        )}
      </section>
    </main>
  );
}

export default SearchPage;
