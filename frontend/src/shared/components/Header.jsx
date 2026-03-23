import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { isLoggedIn, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-pink-100 text-pink-500"
        : "text-gray-600 hover:bg-pink-50 hover:text-gray-900"
    }`;

  const secondaryButtonClass =
    "inline-flex h-10 items-center rounded-full border border-pink-200 bg-white px-4 text-sm font-semibold text-pink-500 transition-all duration-200 hover:bg-pink-50";

  const primaryButtonClass =
    "inline-flex h-10 items-center rounded-full bg-pink-300 px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-pink-400";

  const darkButtonClass =
    "inline-flex h-10 items-center rounded-full bg-gray-900 px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-700";

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 py-4">
        <div className="flex items-center justify-between rounded-[2rem] bg-white/90 px-4 py-3 shadow-sm ring-1 ring-black/5">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 shadow-sm">
              ✦
            </div>

            <div className="leading-tight">
              <p className="text-xl font-black tracking-tight text-gray-900">
                <span className="text-pink-400">Fairy</span>
                <span className="text-pink-300">Park</span>
              </p>
              <p className="hidden text-xs font-medium text-gray-400 sm:block">
                감성 주차장 찾기
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-2 md:flex">
              <NavLink to="/search" className={navLinkClass}>
                주차장 찾기
              </NavLink>
              <NavLink to="/favorites" className={navLinkClass}>
                즐겨찾기
              </NavLink>
            </nav>

            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  <Link to="/favorites" className={secondaryButtonClass}>
                    <span className="sm:hidden">즐겨찾기</span>
                    <span className="hidden sm:inline">내 즐겨찾기</span>
                  </Link>
                  <button onClick={logout} className={darkButtonClass}>
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={secondaryButtonClass}>
                    로그인
                  </Link>
                  <Link to="/signup" className={primaryButtonClass}>
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
