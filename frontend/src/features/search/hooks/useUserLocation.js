import { useEffect, useState } from "react";

function useUserLocation() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("위치 정보를 가져오지 못했습니다.", error);
      },
    );
  }, []);

  return userLocation;
}

export default useUserLocation;
