function SearchEmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
      <p className="text-lg font-semibold text-gray-700">
        조건에 맞는 주차장을 찾지 못했어요.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        검색어를 바꾸거나 필터를 초기화해서 다시 찾아보세요.
      </p>
    </div>
  );
}

export default SearchEmptyState;
