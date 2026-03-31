import { Link } from "react-router-dom";
import { useAuth } from "../../../shared/context/AuthContext";
import useFavorites from "../../favorite/hooks/useFavorites";

function ParkingActionPanel({ parking }) {
  const { isLoggedIn } = useAuth();
  const { favorite, toggleFavorite } = useFavorites(parking?.id);

  if (!parking) return null;

  const handleFavoriteClick = () => {
    if (!isLoggedIn) return;
    toggleFavorite(parking);
  };

  return (
    <section className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-xs font-semibold tracking-wider text-pink-400">
          ACTION
        </p>
        <h3 className="mt-1 text-xl font-bold text-gray-900">즐겨찾기</h3>
      </div>

      <div className="rounded-2xl bg-gray-50 p-4">
        <button
          type="button"
          onClick={handleFavoriteClick}
          disabled={!isLoggedIn}
          className={`flex h-12 w-full items-center justify-center rounded-2xl text-sm font-semibold transition-all duration-200 ${
            isLoggedIn
              ? favorite
                ? "bg-pink-500 text-white shadow-sm hover:bg-pink-600"
                : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-pink-50 hover:text-pink-500"
              : "cursor-not-allowed bg-gray-200 text-gray-400"
          }`}
        >
          {favorite ? "♥ 즐겨찾기 해제" : "♡ 즐겨찾기 추가"}
        </button>

        <p className="mt-3 text-center text-xs leading-5 text-gray-400">
          {isLoggedIn
            ? "자주 이용하는 주차장을 즐겨찾기에 저장할 수 있어요."
            : "즐겨찾기는 로그인 후 이용할 수 있어요."}
        </p>

        {!isLoggedIn && (
          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-sm font-semibold text-pink-500 hover:text-pink-600"
            >
              로그인하러 가기
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default ParkingActionPanel;
