import { Link } from "react-router-dom";
import { useAuth } from "../../../shared/context/AuthContext";
import { useEffect, useState } from "react";
import { getFavorites } from "../services/favoriteService";
import ParkingCard from "../../parking/components/ParkingCard";

function FavoritesPage() {
  const { isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      setFavorites(getFavorites());
    }
  }, [isLoggedIn]);

  // ❌ 비로그인 상태
  if (!isLoggedIn) {
    return (
      <main className="min-h-[calc(100vh-73px)] bg-gradient-to-b from-pink-50 via-white to-pink-100/60">
        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-8 rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5">
            <p className="mb-2 text-sm font-semibold text-pink-400">
              FAVORITES
            </p>
            <h1 className="text-3xl font-extrabold text-gray-900">즐겨찾기</h1>
            <p className="mt-3 text-sm text-gray-500">
              즐겨찾기 기능은 로그인 후 사용할 수 있는 회원 전용 기능입니다.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white px-6 py-16 text-center shadow-sm ring-1 ring-black/5">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-50 text-2xl">
              ⭐
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              로그인 후 즐겨찾기를 이용해보세요
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              자주 찾는 주차장을 저장하고,
              <br />
              나만의 주차장 목록을 편하게 관리할 수 있어요.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/login"
                className="rounded-2xl bg-pink-300 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-400"
              >
                로그인하러 가기
              </Link>

              <Link
                to="/signup"
                className="rounded-2xl border border-pink-200 bg-white px-5 py-3 text-sm font-semibold text-pink-500 transition hover:bg-pink-50"
              >
                회원가입하기
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // ✅ 로그인 상태
  return (
    <main className="min-h-[calc(100vh-73px)] bg-gradient-to-b from-pink-50 via-white to-pink-100/60">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-8 rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5">
          <p className="mb-2 text-sm font-semibold text-pink-400">FAVORITES</p>
          <h1 className="text-3xl font-extrabold text-gray-900">내 즐겨찾기</h1>

          <div className="mt-4 inline-flex rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-500">
            총 {favorites.length}개 저장됨
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="rounded-[2rem] bg-white px-6 py-16 text-center shadow-sm ring-1 ring-black/5">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-50 text-2xl">
              ♡
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              아직 저장된 즐겨찾기가 없어요
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              마음에 드는 주차장을 저장해보세요!
            </p>

            <Link
              to="/search"
              className="mt-6 inline-block rounded-2xl bg-pink-300 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-400"
            >
              주차장 찾으러 가기
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
              <p className="text-sm font-semibold text-pink-400">
                MY COLLECTION
              </p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                즐겨찾기 목록
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {favorites.map((parking) => (
                <ParkingCard key={parking.id} parking={parking} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default FavoritesPage;
