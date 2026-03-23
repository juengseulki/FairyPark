import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-gradient-to-b from-pink-50 via-white to-pink-100/60">
      <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center justify-center px-5 py-12">
        <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 text-lg shadow-sm">
              ♡
            </div>

            <p className="mb-2 text-sm font-semibold text-pink-400">SIGN UP</p>
            <h1 className="text-3xl font-extrabold text-gray-900">회원가입</h1>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              회원가입 후 즐겨찾기와 개인화 기능을
              <br />
              편하게 이용할 수 있어요.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                이름
              </label>
              <input
                id="name"
                type="text"
                placeholder="이름을 입력하세요"
                className="h-12 w-full rounded-2xl border border-pink-100 bg-white px-4 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              />
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                이메일
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="example@email.com"
                className="h-12 w-full rounded-2xl border border-pink-100 bg-white px-4 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              />
            </div>

            <div>
              <label
                htmlFor="signup-password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                비밀번호
              </label>
              <input
                id="signup-password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="h-12 w-full rounded-2xl border border-pink-100 bg-white px-4 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              />
            </div>

            <div>
              <label
                htmlFor="signup-password-check"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                비밀번호 확인
              </label>
              <input
                id="signup-password-check"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                className="h-12 w-full rounded-2xl border border-pink-100 bg-white px-4 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              />
            </div>

            <button
              type="button"
              className="h-12 w-full rounded-2xl bg-pink-300 text-sm font-semibold text-white transition hover:bg-pink-400"
            >
              회원가입
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-pink-100 bg-pink-50 px-4 py-3 text-sm leading-6 text-gray-600">
            현재는 UI 단계입니다.
            <br />
            실제 회원가입 기능은 추후 백엔드/DB 연동 후 구현할 예정입니다.
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            이미 계정이 있나요?{" "}
            <Link
              to="/login"
              className="font-semibold text-pink-400 hover:text-pink-500"
            >
              로그인
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default SignupPage;
