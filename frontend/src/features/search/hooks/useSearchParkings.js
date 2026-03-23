import { useEffect, useState } from "react";
import { fetchParkings } from "../../parking/services/parkingApi";

function useSearchParkings(keyword) {
  const [parkings, setParkings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const trimmedKeyword = (keyword || "").trim();

    if (!trimmedKeyword) {
      setParkings([]);
      setErrorMessage("");
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    async function loadParkings() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const result = await fetchParkings(trimmedKeyword);

        if (!isCancelled) {
          setParkings(result.data || []);
        }
      } catch (error) {
        if (!isCancelled) {
          setParkings([]);
          setErrorMessage(
            error.message || "주차장 데이터를 불러오지 못했습니다.",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadParkings();

    return () => {
      isCancelled = true;
    };
  }, [keyword]);

  return {
    parkings,
    isLoading,
    errorMessage,
  };
}

export default useSearchParkings;
