import { Link } from "react-router-dom";
import { useAuth } from "../../../shared/context/AuthContext";
import useFavorites from "../../favorite/hooks/useFavorites";

function ParkingActionPanel({ parking }) {
  const { isLoggedIn } = useAuth();
  const { favorite, toggleFavorite } = useFavorites(parking?.id);

  const handleToggleFavorite = () => {
    if (!isLoggedIn) return;
    toggleFavorite(parking);
  };

  return (
    <div className="rounded-3xl bg-white p-5 ring-1 ring-black/5">
      <h3 className="mb-4 text-lg font-bold text-gray-900">즐겨찾기</h3>

      <button
        type="button"
        onClick={handleToggleFavorite}
        className={`inline-flex h-11 w-full items-center justify-center rounded-2xl px-5 text-sm font-semibold text-white transition-all duration-200 ${
          isLoggedIn
            ? favorite
              ? "bg-gray-700 hover:bg-gray-800"
              : "bg-pink-400 hover:bg-pink-500"
            : "cursor-not-allowed bg-gray-300"
        }`}
      >
        {favorite ? "★ 즐겨찾기 제거" : "⭐ 즐겨찾기 추가"}
      </button>

      {isLoggedIn ? (
        <p className="mt-3 text-center text-sm leading-6 text-gray-500">
          마음에 드는 주차장을 즐겨찾기에 저장해두고
          <br />
          나중에 더 빠르게 다시 확인해보세요.
        </p>
      ) : (
        <>
          <p className="mt-3 text-center text-sm leading-6 text-gray-500">
            즐겨찾기는 로그인 후 이용할 수 있어요.
          </p>
          <div className="mt-3 flex justify-center">
            <Link
              to="/login"
              className="text-sm font-semibold text-pink-400 transition-all duration-200 hover:text-pink-500"
            >
              로그인하러 가기
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default ParkingActionPanel;
