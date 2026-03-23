function SearchResultHeader({ keyword, resultCount }) {
  return (
    <div className="mb-8 rounded-3xl bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 transition-all duration-200">
      <p className="mb-2 text-sm font-semibold text-pink-300">SEARCH RESULT</p>

      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        {keyword ? (
          <>
            "<span className="text-pink-400">{keyword}</span>" 검색 결과
          </>
        ) : (
          "전체 주차장"
        )}
      </h1>

      <p className="mt-3 text-sm text-gray-500">
        현재 조건에 맞는{" "}
        <span className="font-bold text-gray-900">{resultCount}</span>개의
        주차장을 찾았어요.
      </p>
    </div>
  );
}

export default SearchResultHeader;
