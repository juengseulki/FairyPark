import { useEffect, useRef } from "react";

function KakaoMap({ latitude, longitude }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const kakaoScript = window.kakao;

    if (!kakaoScript || !window.kakao.maps) {
      console.error("카카오맵 스크립트 안 불러와짐");
      return;
    }

    window.kakao.maps.load(() => {
      const container = mapRef.current;
      if (!container) return;

      const position = new window.kakao.maps.LatLng(latitude, longitude);

      const options = {
        center: position,
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);

      const marker = new window.kakao.maps.Marker({
        position,
      });

      marker.setMap(map);
    });
  }, [latitude, longitude]);

  return (
    <div
      ref={mapRef}
      className="h-64 w-full rounded-2xl border border-gray-200"
    />
  );
}

export default KakaoMap;
