import { Button } from "../components/ui/button";
import UserInfo from "@/app/admin/user/user-info";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>Hello World</p>
      <Button>test</Button>
      <UserInfo />
    </div>
  );
}
