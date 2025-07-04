// "use client";
//
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/features/auth/model";
// import useInput from "@/shared/hooks/useInput";
// import { Button } from "@/components/ui/button";
//
// export default function LoginPage() {
//   const email = useInput("");
//   const password = useInput("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//
//   const { login } = useAuth();
//   const router = useRouter();
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//
//     try {
//       await login(email.value, password.value);
//       router.push("/dashboard"); // 로그인 후 리다이렉트
//     } catch (err) {
//       console.log(err);
//       setError("로그인에 실패했습니다.");
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const googleLogin = () => {
//     window.location.href = `http://localhost:8080/oauth2/authorization/google`;
//   };
//
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center">로그인</h1>
//
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//             {error}
//           </div>
//         )}
//
//         <div>
//           <input
//             {...email}
//             type="email"
//             placeholder="이메일"
//             className="w-full px-3 py-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//
//         <div>
//           <input
//             {...password}
//             type="password"
//             placeholder="비밀번호"
//             className="w-full px-3 py-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
//         >
//           {loading ? "로그인 중..." : "로그인"}
//         </button>
//       </form>
//       <Button
//         onClick={() => {
//           googleLogin();
//         }}
//       >
//         googleLogin
//       </Button>
//     </div>
//   );
// }
