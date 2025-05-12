import { Button } from "../components/ui/button";
import AuthInitializer from "@/app/auth/AuthInitializer/AuthInitializer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AuthInitializer/>
      <p>Hello World</p>
      <Button>test</Button>
      <Link href={"/auth/login"}>Login</Link>
      <Link href={"/auth/signup"}>Sign Up</Link>
    </div>
  );
}
