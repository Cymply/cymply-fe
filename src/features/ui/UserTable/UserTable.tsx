"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/entities/user/model/user-dummy-data";
import { JSX, useState } from "react";
import useUserTable from "@/features/model/useUserTable";

export interface UserTableProps {
}

export default function UserTable(props : UserTableProps) {
  const {
    userData,
    selectedUser,
    isModalOpen,
    calculateAge,
    getProviderBadgeStyle,
    handleModalClose,
    handleRowClick} = useUserTable();
  return (
    <>
      <Table>
        <TableCaption>사용자 목록</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>닉네임</TableHead>
            <TableHead>제공자</TableHead>
            <TableHead>성별</TableHead>
            <TableHead>생년</TableHead>
            <TableHead className="text-right">가입일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((user: User): JSX.Element => (
            <TableRow
              key={user.id}
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleRowClick(user)}
            >
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={user.thumbnail}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {user.name}
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.nickname}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={getProviderBadgeStyle(user.provider)}>
                  {user.provider}
                </Badge>
              </TableCell>
              <TableCell>{user.gender || '-'}</TableCell>
              <TableCell>{user.birthyear || '-'}</TableCell>
              <TableCell className="text-right">
                {user.created_at.format('YYYY-MM-DD')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>총 사용자 수</TableCell>
            <TableCell className="text-right">{userData.length}명</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      
      {/* 사용자 상세 정보 모달 */}
      <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-2xl" onClose={handleModalClose}>
          <DialogHeader>
            <DialogTitle>
              {selectedUser && (
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={selectedUser.thumbnail}
                    alt={selectedUser.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col justify-end w-full">
                    <div className="text-xl">{selectedUser.name}</div>
                    <div className="text-sm text-gray-600 font-normal">
                      {selectedUser.nickname}
                    </div>
                  </div>
                </div>
              )}
            </DialogTitle>
            {/*<DialogDescription>*/}
            {/*  사용자 상세 정보를 확인할 수 있습니다.*/}
            {/*</DialogDescription>*/}
          </DialogHeader>
          
          {selectedUser && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* 기본 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">기본 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">ID:</span>
                    <span>{selectedUser.id}</span>
                  </div>
                    <div className="flex justify-between">
                    <span className="font-medium text-gray-600">이메일:</span>
                    <span className="text-sm">{selectedUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">닉네임:</span>
                    <span>{selectedUser.nickname}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">성별:</span>
                    <Badge variant="outline">
                      {selectedUser.gender === 'M' ? '남성' : selectedUser.gender === 'F' ? '여성' : '-'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              {/* 개인 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">개인 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">생년월일:</span>
                    <span>{selectedUser.birthday || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">출생연도:</span>
                    <span>{selectedUser.birthyear || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">나이:</span>
                    <span>{calculateAge(selectedUser.birthyear)}세</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">로그인 제공자:</span>
                    <Badge className={getProviderBadgeStyle(selectedUser.provider)}>
                      {selectedUser.provider.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              {/* 서비스 정보 */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">서비스 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="font-medium text-gray-600 block mb-1">가입일:</span>
                      <span className="text-sm">
                        {selectedUser.created_at.format('YYYY년 MM월 DD일')}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 block mb-1">최근 업데이트:</span>
                      <span className="text-sm">
                        {selectedUser.updated_at.format('YYYY년 MM월 DD일')}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 block mb-1">계정 상태:</span>
                      <Badge variant={selectedUser.deleted_at ? "destructive" : "default"}>
                        {selectedUser.deleted_at ? '삭제됨' : '활성'}
                      </Badge>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="font-medium text-gray-600 block mb-1">외부 ID:</span>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {selectedUser.sub}
                    </code>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}