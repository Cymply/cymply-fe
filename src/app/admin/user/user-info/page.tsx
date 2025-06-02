import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {User, userDummyData} from "@/entities/user/model/user-dummy-data";
import {JSX, ReactNode} from "react";
import UserTable from "src/features/ui";

export interface UserInfoProps {

}
export default function UserInfo(props : UserInfoProps) {
  return (
    <div>
      <UserTable/>
    </div>
  )
}