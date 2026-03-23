import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/context/AuthContext";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/");
  };

  return (
    <main className="min-h-[calc(100vh-73px)] bg-gradient-to-b from-pink-50 via-white to-pink-100/60">
      <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center justify-center px-5 py-12">
        <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 text-lg shadow-sm">
              ✦
            </div>

            <p className="mb-2 text-sm font-semibold text-pink-400">LOGIN</p>
            <h1 className="text-3xl font-extrabold text-gray-900">로그인</h1>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              즐겨찾기와 회원 전용 기능을 이용하려면
              <br />
              로그인이 필요해요.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                className="h-12 w-full rounded-2xl border border-pink-100 bg-white px-4 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="h-12 w-full rounded-2xl border border-pink-100 bg-white px-4 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="h-12 w-full rounded-2xl bg-pink-300 text-sm font-semibold text-white transition hover:bg-pink-400"
            >
              로그인
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-pink-100 bg-pink-50 px-4 py-3 text-sm leading-6 text-gray-600">
            현재는 mock 로그인 단계입니다.
            <br />
            버튼을 누르면 로그인 상태 UI가 변경됩니다.
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            아직 계정이 없나요?{" "}
            <Link
              to="/signup"
              className="font-semibold text-pink-400 hover:text-pink-500"
            >
              회원가입
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
