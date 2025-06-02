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
import {User} from "@/entities/user/model/user-dummy-data";
import {JSX} from "react";
import useUserTable from "@/features/model/useUserTable";

export interface UserTableProps {
}

export default function UserTable(props : UserTableProps) {
  const {userData} = useUserTable();
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
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
        {userData.map((user: User) : JSX.Element => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <imgs
                  src={user.thumbnail}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                {user.name}
              </div>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.nickname}</TableCell>
            <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.provider === 'google' ? 'bg-red-100 text-red-800' :
                    user.provider === 'kakao' ? 'bg-yellow-100 text-yellow-800' :
                      user.provider === 'naver' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                }`}>
                  {user.provider}
                </span>
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
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}