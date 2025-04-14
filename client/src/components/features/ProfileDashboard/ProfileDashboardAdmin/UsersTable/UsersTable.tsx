"use client";

import { CircleX, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

import { IUser } from "@api/user/get-all";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";

interface IUsersTableProps {
  users: IUser[] | undefined;
}
export const UsersTable = ({ users }: IUsersTableProps) => {
  const router = useRouter();

  const handleViewDetails = (userId: string) => {
    router.push(`/profile/${userId}`); // adjust path as needed
  };

  return (
    <Table className="my-4">
      <TableHeader className="sticky top-0">
        <TableRow className="bg-gray-200">
          <TableHead className="font-bold">Id</TableHead>
          <TableHead className="font-bold">Email</TableHead>
          <TableHead className="font-bold">Role</TableHead>
          <TableHead className="text-center font-bold">Details</TableHead>
          <TableHead className="text-md text-center font-bold">
            Delete
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users?.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user._id}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
            <TableCell>
              <div className="flex h-full cursor-pointer items-center justify-center p-2">
                <Eye width={20} onClick={() => handleViewDetails(user._id)} />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex h-full cursor-pointer items-center justify-center p-2">
                <CircleX width={18} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
