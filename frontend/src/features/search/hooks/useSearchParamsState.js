import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useSearchParamsState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

  const parsedFilters = useMemo(
    () => ({
      feeType: searchParams.get("feeType") || "ALL",
      capacity: searchParams.get("capacity") || "ALL",
      mapOnly: searchParams.get("mapOnly") === "true",
    }),
    [searchParams],
  );

  const parsedSortType = searchParams.get("sort") || "DEFAULT";

  const [filters, setFilters] = useState(parsedFilters);
  const [sortType, setSortType] = useState(parsedSortType);

  useEffect(() => {
    setFilters(parsedFilters);
  }, [parsedFilters]);

  useEffect(() => {
    setSortType(parsedSortType);
  }, [parsedSortType]);

  useEffect(() => {
    const nextParams = new URLSearchParams();

    if (keyword) nextParams.set("keyword", keyword);
    if (filters.feeType !== "ALL") nextParams.set("feeType", filters.feeType);
    if (filters.capacity !== "ALL") {
      nextParams.set("capacity", filters.capacity);
    }
    if (filters.mapOnly) nextParams.set("mapOnly", "true");
    if (sortType !== "DEFAULT") nextParams.set("sort", sortType);

    const current = searchParams.toString();
    const next = nextParams.toString();

    if (current !== next) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [filters, sortType, keyword, searchParams, setSearchParams]);

  return {
    keyword,
    filters,
    setFilters,
    sortType,
    setSortType,
  };
}

export default useSearchParamsState;
