'use client';

import useLogin from "@/widgets/account/model/useLogin";

export default function Login() {
  const {
    email, setEmail,
    password, setPassword,
    error, setError,
    loading, setLoading,
    handleSubmit,
    handleKakaoLogin,
  } = useLogin();
  
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-lg p-10 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">로그인</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {/* 카카오 로그인 버튼 */}
        <button
          onClick={handleKakaoLogin}
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-6 rounded-lg mb-6 flex items-center justify-center gap-3 transition-colors disabled:opacity-50 text-lg"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"/>
          </svg>
          카카오 로그인
        </button>
        
        {/* 구분선 */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">또는</span>
          </div>
        </div>
        
        {/* 구글 로그인 버튼 */}
        <button
          onClick={() => {/* 구글 로그인 핸들러 */}}
          disabled={loading}
          className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-lg mb-8 flex items-center justify-center gap-3 transition-colors disabled:opacity-50 border border-gray-300 text-lg"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          구글 로그인
        </button>
        
        {/* 기존 이메일 로그인 폼 */}
        {/*  <form onSubmit={handleSubmit} className="space-y-6">*/}
        {/*    <div>*/}
        {/*      <input*/}
        {/*        type="email"*/}
        {/*        placeholder="이메일"*/}
        {/*        value={email}*/}
        {/*        onChange={(e) => setEmail(e.target.value)}*/}
        {/*        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
        {/*        required*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    */}
        {/*    <div>*/}
        {/*      <input*/}
        {/*        type="password"*/}
        {/*        placeholder="비밀번호"*/}
        {/*        value={password}*/}
        {/*        onChange={(e) => setPassword(e.target.value)}*/}
        {/*        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
        {/*        required*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    */}
        {/*    <button*/}
        {/*      type="submit"*/}
        {/*      disabled={loading}*/}
        {/*      className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors text-lg font-semibold"*/}
        {/*    >*/}
        {/*      {loading ? '로그인 중...' : '이메일로 로그인'}*/}
        {/*    </button>*/}
        {/*  </form>*/}
        {/*  */}
        {/*  <div className="mt-8 text-center">*/}
        {/*    <p className="text-base text-gray-600">*/}
        {/*      계정이 없으신가요?{' '}*/}
        {/*      <a href="/signup" className="text-blue-500 hover:text-blue-600 font-medium">*/}
        {/*        회원가입*/}
        {/*      </a>*/}
        {/*    </p>*/}
        {/*  </div>*/}
      </div>
    </div>
  );
}