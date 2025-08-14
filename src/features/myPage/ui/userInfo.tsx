"use client";

import { userApi } from "@/entities/user/api/userApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export const UserInfo = () => {
  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => userApi.getUserInfo(),
  });
  return (
    <div className="w-full flex items-center gap-9">
      <div className="w-[7.5rem] h-[7.5rem] rounded-full">
        <Image
          src="/images/img-profile.png"
          alt="profile"
          width={120}
          height={120}
          className="w-[7.5rem] h-[7.5rem] object-contain"
        />
      </div>
      <div className="font-gangwonEduAll text-[2.625rem]">
        <span className="font-bold">{userInfo?.content?.nickname}</span> 님
      </div>
    </div>
  );
};
