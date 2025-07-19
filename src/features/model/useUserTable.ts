"use client"

import {useState} from "react";
import {User, userDummyData} from "@/entities/user/model/user-dummy-data";

export default function useUserTable() {
  const [userData, setUserData] = useState<User[]>(userDummyData);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  
  const getProviderBadgeStyle = (provider: string) => {
    switch (provider) {
      case 'google':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'kakao':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'naver':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  
  const calculateAge = (birthyear?: number) => {
    if (!birthyear) return '-';
    return new Date().getFullYear() - birthyear;
  };
  return {
    userData,
    selectedUser,
    isModalOpen,
    calculateAge,
    getProviderBadgeStyle,
    handleModalClose,
    handleRowClick
  }
}