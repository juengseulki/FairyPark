import { useEffect, useState } from "react";
import { fetchParkings } from "../services/parkingApi";

function useParkingData(keyword = "") {
  const [parkings, setParkings] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadParkings = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = await fetchParkings(keyword);

        if (!isMounted) return;

        setParkings(result.data || []);
        setTotalCount(result.totalCount || 0);
      } catch (error) {
        if (!isMounted) return;

        console.error(error);
        setParkings([]);
        setTotalCount(0);
        setErrorMessage(
          error.message || "주차장 데이터를 불러오지 못했습니다.",
        );
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    loadParkings();

    return () => {
      isMounted = false;
    };
  }, [keyword]);

  return {
    parkings,
    totalCount,
    isLoading,
    errorMessage,
  };
}

export default useParkingData;
