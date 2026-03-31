import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../shared/context/AuthContext";
import useFavorites from "../../favorite/hooks/useFavorites";
import {
  formatCapacity,
  formatBasicFee,
  formatOperatingHours,
} from "../utils/formatParking";

const DEFAULT_PARKING_IMAGE = "/src/shared/image/parking-default.png";

function ParkingCard({
  parking,
  onSelect,
  isSelected = false,
  shouldScrollIntoView = false,
  onScrollComplete,
}) {
  const cardRef = useRef(null);
  const { isLoggedIn } = useAuth();
  const { favorite, toggleFavorite } = useFavorites(parking?.id);

  useEffect(() => {
    if (!shouldScrollIntoView) return;
    if (!isSelected || !cardRef.current) return;

    cardRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });

    onScrollComplete?.();
  }, [isSelected, shouldScrollIntoView, onScrollComplete]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    toggleFavorite(parking);
  };

  if (!parking) return null;

  return (
    <article
      ref={cardRef}
      onClick={() => onSelect?.(parking)}
      className={`group cursor-pointer overflow-hidden rounded-3xl border bg-white shadow-sm ring-1 ring-black/5 transition-all duration-200 ${
        isSelected
          ? "border-pink-300 shadow-md ring-pink-100"
          : "border-gray-100 hover:-translate-y-1 hover:border-pink-200 hover:shadow-md"
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={parking.imageUrl || parking.image || DEFAULT_PARKING_IMAGE}
          alt={parking.name || "주차장 이미지"}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_PARKING_IMAGE;
          }}
          className="h-36 w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-pink-500 backdrop-blur">
            {parking.type || "주차장"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition-all duration-200 ${
            isLoggedIn
              ? favorite
                ? "bg-pink-400 text-white shadow-sm hover:bg-pink-500"
                : "bg-white/90 text-gray-500 hover:bg-pink-50 hover:text-pink-500"
              : "cursor-not-allowed bg-white/80 text-gray-300"
          }`}
          aria-label={favorite ? "즐겨찾기 제거" : "즐겨찾기 추가"}
          title={isLoggedIn ? "즐겨찾기" : "로그인 후 이용 가능"}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
            {parking.name || "이름 없음"}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
            {parking.address || "주소 정보 없음"}
          </p>
        </div>

        <div className="space-y-2 rounded-2xl bg-gray-50 p-4">
          <div className="flex items-start justify-between gap-3 text-sm">
            <span className="font-medium text-gray-500">운영시간</span>
            <span className="text-right font-semibold text-gray-800">
              {formatOperatingHours(
                parking.weekdayStart || parking.operatingStart,
                parking.weekdayEnd || parking.operatingEnd,
              )}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3 text-sm">
            <span className="font-medium text-gray-500">주차 구획 수</span>
            <span className="text-right font-semibold text-gray-800">
              {formatCapacity(parking.totalSpaces ?? parking.capacity)}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3 text-sm">
            <span className="font-medium text-gray-500">기본 요금</span>
            <span className="text-right font-semibold text-pink-500">
              {formatBasicFee(parking)}
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-gray-400">
            자세한 정보 보기
          </span>

          <Link
            to={`/parking/${parking.id}`}
            state={{ parking }}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex h-10 items-center justify-center rounded-2xl bg-gray-900 px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-700"
          >
            상세 보기
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ParkingCard;
