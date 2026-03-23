import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ initialKeyword = "" }) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(initialKeyword);

  useEffect(() => {
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;

    navigate(`/search?keyword=${encodeURIComponent(trimmedKeyword)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
    >
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="지역명 또는 주차장명을 입력하세요"
        className="h-14 flex-1 rounded-2xl border border-gray-200 bg-white px-5 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:border-pink-400"
      />

      <button
        type="submit"
        className="h-14 rounded-2xl bg-pink-500 px-6 text-base font-semibold text-white transition hover:bg-pink-600"
      >
        검색하기
      </button>
    </form>
  );
}

export default SearchBar;
