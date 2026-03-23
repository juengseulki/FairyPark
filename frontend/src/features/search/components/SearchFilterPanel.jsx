function SearchFilterPanel({
  filters,
  sortType,
  keyword,
  resultCount,
  onFilterChange,
  onSortChange,
  onReset,
  onMoveToMyLocation,
}) {
  const fieldClass =
    "h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100";

  const badgeClass = "rounded-full px-3 py-1 text-xs font-semibold";

  return (
    <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all duration-200">
      {/* 타이틀 약하게 */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-pink-400">FILTER</p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              요금
            </label>
            <select
              value={filters.feeType}
              onChange={(e) => onFilterChange("feeType", e.target.value)}
              className={fieldClass}
            >
              <option value="ALL">전체</option>
              <option value="FREE">무료</option>
              <option value="PAID">유료</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              주차 규모
            </label>
            <select
              value={filters.capacity}
              onChange={(e) => onFilterChange("capacity", e.target.value)}
              className={fieldClass}
            >
              <option value="ALL">전체</option>
              <option value="LARGE">넉넉함</option>
              <option value="MEDIUM">보통</option>
              <option value="SMALL">적음</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              정렬
            </label>
            <select
              value={sortType}
              onChange={(e) => onSortChange(e.target.value)}
              className={fieldClass}
            >
              <option value="DEFAULT">기본순</option>
              <option value="PRICE_ASC">가격 낮은순</option>
              <option value="PRICE_DESC">가격 높은순</option>
              <option value="CAPACITY_DESC">주차공간 많은순</option>
              <option value="DISTANCE_ASC">가까운순</option>
            </select>
          </div>

          <div className="flex h-full items-end">
            <label className="flex h-11 w-full cursor-pointer items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-pink-200 hover:bg-pink-50">
              <input
                type="checkbox"
                checked={filters.mapOnly}
                onChange={(e) => onFilterChange("mapOnly", e.target.checked)}
                className="h-4 w-4"
              />
              현재 지도 영역만 보기
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onMoveToMyLocation}
            className="inline-flex h-11 items-center rounded-2xl bg-pink-400 px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-pink-500"
          >
            📍 내 위치
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-11 items-center rounded-2xl border border-pink-200 bg-white px-4 text-sm font-semibold text-pink-500 transition-all duration-200 hover:bg-pink-50"
          >
            초기화
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`${badgeClass} bg-pink-50 text-pink-500`}>
          검색어: {keyword || "전체"}
        </span>

        {filters.feeType !== "ALL" && (
          <span className={`${badgeClass} bg-pink-50 text-pink-500`}>
            💰 {filters.feeType === "FREE" ? "무료" : "유료"}
          </span>
        )}

        {filters.capacity !== "ALL" && (
          <span className={`${badgeClass} bg-violet-50 text-violet-500`}>
            🚗{" "}
            {filters.capacity === "LARGE"
              ? "넉넉함"
              : filters.capacity === "MEDIUM"
                ? "보통"
                : "적음"}
          </span>
        )}

        {sortType !== "DEFAULT" && (
          <span className={`${badgeClass} bg-purple-50 text-purple-500`}>
            🔽{" "}
            {sortType === "PRICE_ASC"
              ? "가격 낮은순"
              : sortType === "PRICE_DESC"
                ? "가격 높은순"
                : sortType === "CAPACITY_DESC"
                  ? "주차공간 많은순"
                  : sortType === "DISTANCE_ASC"
                    ? "가까운순"
                    : "정렬 적용됨"}
          </span>
        )}

        {filters.mapOnly && (
          <span className={`${badgeClass} bg-rose-50 text-rose-500`}>
            지도 영역 필터 적용 중
          </span>
        )}

        <span className={`${badgeClass} bg-gray-900 text-white`}>
          결과 {resultCount}개
        </span>
      </div>
    </div>
  );
}

export default SearchFilterPanel;
