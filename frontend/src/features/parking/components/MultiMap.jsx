import { useEffect, useRef } from "react";

const getLat = (parking) => {
  const value = parking?.latitude ?? parking?.lat;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
};

const getLng = (parking) => {
  const value = parking?.longitude ?? parking?.lng;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
};

function MultiMap({
  parkings,
  selectedParking,
  onSelectParking,
  onBoundsChange,
  userLocation,
  onMoveToCard,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerMapRef = useRef(new Map());
  const infoWindowMapRef = useRef(new Map());
  const currentLocationMarkerRef = useRef(null);
  const currentLocationInfoRef = useRef(null);
  const clustererRef = useRef(null);
  const lastBoundsRef = useRef(null);
  const selectedMarkerIdRef = useRef(null);
  const hasInitializedBoundsRef = useRef(false);
  const hasMovedToUserLocationRef = useRef(false);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오맵 없음");
      return;
    }

    window.kakao.maps.load(() => {
      const container = mapRef.current;
      if (!container) return;
      if (mapInstanceRef.current) return;

      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 5,
      });

      const clusterer = new window.kakao.maps.MarkerClusterer({
        map,
        averageCenter: true,
        minLevel: 6,
      });

      mapInstanceRef.current = map;
      clustererRef.current = clusterer;

      const notifyBoundsChange = () => {
        const currentBounds = map.getBounds();
        if (!currentBounds) return;

        const nextBounds = {
          swLat: currentBounds.getSouthWest().getLat(),
          swLng: currentBounds.getSouthWest().getLng(),
          neLat: currentBounds.getNorthEast().getLat(),
          neLng: currentBounds.getNorthEast().getLng(),
        };

        const prevBounds = lastBoundsRef.current;

        const isSameBounds =
          prevBounds &&
          prevBounds.swLat === nextBounds.swLat &&
          prevBounds.swLng === nextBounds.swLng &&
          prevBounds.neLat === nextBounds.neLat &&
          prevBounds.neLng === nextBounds.neLng;

        if (isSameBounds) return;

        lastBoundsRef.current = nextBounds;
        onBoundsChange?.(nextBounds);
      };

      notifyBoundsChange();
      window.kakao.maps.event.addListener(map, "idle", notifyBoundsChange);
    });
  }, [onBoundsChange]);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;
    if (!mapInstanceRef.current || !clustererRef.current) return;

    const map = mapInstanceRef.current;
    const clusterer = clustererRef.current;

    clusterer.clear();

    markerMapRef.current.forEach((marker) => marker.setMap(null));
    infoWindowMapRef.current.forEach((infowindow) => infowindow.close());

    markerMapRef.current = new Map();
    infoWindowMapRef.current = new Map();

    const bounds = new window.kakao.maps.LatLngBounds();
    const markers = [];

    parkings.forEach((parking) => {
      const lat = getLat(parking);
      const lng = getLng(parking);

      if (lat === null || lng === null) return;

      const position = new window.kakao.maps.LatLng(lat, lng);

      const markerImage = new window.kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
        new window.kakao.maps.Size(24, 35),
      );

      const marker = new window.kakao.maps.Marker({
        position,
        image: markerImage,
      });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `
           <div style="
      padding:12px 14px;
      max-width:240px;
      font-size:13px;
      line-height:1.5;
      box-sizing:border-box;
      white-space:normal;
    ">
      <div style="
        font-weight:700;
        color:#111827;
        margin-bottom:6px;
        white-space:normal;
        word-break:break-word;
        overflow-wrap:anywhere;
      ">
        ${parking.name}
      </div>

       <div style="
      padding:12px 14px;
      max-width:220px;
      font-size:13px;
      line-height:1.5;
      box-sizing:border-box;
      white-space:normal;
    ">
      <div style="
        font-weight:700;
        color:#111827;
        margin-bottom:6px;
        white-space:normal;
        word-break:break-word;
        overflow-wrap:anywhere;
      ">
        ${parking.name}
      </div>

      <div style="
        color:#6b7280;
        margin-bottom:10px;
        white-space:normal;
        word-break:break-word;
        overflow-wrap:anywhere;
      ">
        ${parking.address}
      </div>

      <a
        href="#"
        class="move-to-card-btn"
        data-id="${parking.id}"
        style="
          display:block;
          width:100%;
          height:36px;
          line-height:36px;
          text-align:center;
          text-decoration:none;
          border-radius:10px;
          background:#111827;
          color:#ffffff;
          font-size:12px;
          font-weight:600;
          box-sizing:border-box;
        "
      >
        정보 보기
      </a>
    </div>
        `,
      });

      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        infowindow.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        if (selectedMarkerIdRef.current === parking.id) return;
        infowindow.close();
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        selectedMarkerIdRef.current = parking.id;

        const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
        map.setLevel(4);
        map.panTo(moveLatLng);

        infoWindowMapRef.current.forEach((windowItem) => windowItem.close());
        infowindow.open(map, marker);

        onSelectParking?.(parking);

        setTimeout(() => {
          const button = document.querySelector(
            `.move-to-card-btn[data-id="${parking.id}"]`,
          );

          if (button) {
            button.onclick = (event) => {
              event.preventDefault();
              onMoveToCard?.(parking);
            };
          }
        }, 0);
      });

      markerMapRef.current.set(parking.id, marker);
      infoWindowMapRef.current.set(parking.id, infowindow);

      bounds.extend(position);
      markers.push(marker);
    });

    if (markers.length > 0) {
      clusterer.addMarkers(markers);
      map.setBounds(bounds);
    }

    if (!hasInitializedBoundsRef.current) {
      map.setBounds(bounds);
      hasInitializedBoundsRef.current = true;
    }
  }, [parkings, onSelectParking, onMoveToCard]);

  useEffect(() => {
    if (!selectedParking) return;
    if (!mapInstanceRef.current) return;
    if (!window.kakao || !window.kakao.maps) return;

    const map = mapInstanceRef.current;
    const marker = markerMapRef.current.get(selectedParking.id);
    const infowindow = infoWindowMapRef.current.get(selectedParking.id);

    const lat = getLat(selectedParking);
    const lng = getLng(selectedParking);

    if (lat === null || lng === null) return;

    selectedMarkerIdRef.current = selectedParking.id;

    const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
    map.setLevel(4);
    map.panTo(moveLatLng);

    infoWindowMapRef.current.forEach((windowItem) => windowItem.close());

    if (marker && infowindow) {
      infowindow.open(map, marker);
    }
  }, [selectedParking]);

  useEffect(() => {
    if (!userLocation) return;
    if (!mapInstanceRef.current) return;
    if (!window.kakao || !window.kakao.maps) return;

    const map = mapInstanceRef.current;
    const position = new window.kakao.maps.LatLng(
      userLocation.lat,
      userLocation.lng,
    );

    if (currentLocationMarkerRef.current) {
      currentLocationMarkerRef.current.setMap(null);
    }
    if (currentLocationInfoRef.current) {
      currentLocationInfoRef.current.close();
    }

    const marker = new window.kakao.maps.Marker({
      position,
    });

    marker.setMap(map);

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `
        <div style="padding:8px 10px; font-size:12px;">
          📍 내 위치
        </div>
      `,
    });

    infowindow.open(map, marker);

    currentLocationMarkerRef.current = marker;
    currentLocationInfoRef.current = infowindow;

    if (!hasMovedToUserLocationRef.current) {
      map.setLevel(4);
      map.panTo(position);
      hasMovedToUserLocationRef.current = true;
    }
  }, [userLocation]);

  return (
    <div
      ref={mapRef}
      className="mb-8 h-80 w-full rounded-3xl border border-gray-200"
    />
  );
}

export default MultiMap;
