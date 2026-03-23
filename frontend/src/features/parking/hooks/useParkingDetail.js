import { useEffect, useState } from "react";
import { fetchParkingById } from "../services/parkingApi";

function useParkingDetail(id, initialParking = null) {
  const [parking, setParking] = useState(initialParking);
  const [isLoading, setIsLoading] = useState(!initialParking && !!id);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (initialParking) {
      setParking(initialParking);
      setIsLoading(false);
      setErrorMessage("");
      return;
    }

    if (!id) {
      setParking(null);
      setIsLoading(false);
      setErrorMessage("주차장 id가 없습니다.");
      return;
    }

    let isMounted = true;

    const loadParking = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await fetchParkingById(id);

        if (!isMounted) return;

        if (!data) {
          setParking(null);
          setErrorMessage("주차장 정보를 찾을 수 없습니다.");
          return;
        }

        setParking(data);
      } catch (error) {
        if (!isMounted) return;

        console.error(error);
        setParking(null);
        setErrorMessage(error.message || "주차장 정보를 불러오지 못했습니다.");
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    loadParking();

    return () => {
      isMounted = false;
    };
  }, [id, initialParking]);

  return {
    parking,
    isLoading,
    errorMessage,
  };
}

export default useParkingDetail;
