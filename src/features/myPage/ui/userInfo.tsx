"use client";

import { userApi } from "@/entities/user/api/userApi";
import { useQuery } from "@tanstack/react-query";

export const UserInfo = () => {
  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => userApi.getUserInfo(),
  });
  return (
    <div className="flex items-center gap-2 text-2xl w-full py-9">
      <div className="w-24 h-24 bg-gray-500 rounded-12"></div>
      <div className="flex items-center gap-2">
        <span className="font-bold">{userInfo?.content?.nickname}</span> 님
      </div>
    </div>
  );
};
