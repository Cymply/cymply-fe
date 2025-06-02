"use client"

import {useState} from "react";
import {User, userDummyData} from "@/entities/user/model/user-dummy-data";

export default function useUserTable() {
  const [userData, setUserData] = useState<User[]>(userDummyData);
  
  return {
    userData
  }
}