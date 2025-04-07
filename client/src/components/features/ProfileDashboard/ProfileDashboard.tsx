import { redirect } from "next/navigation";

import { ICurrentUserResponse } from "@/api/user/get-current";

interface IProfileDashboardProps {
  currentUser: ICurrentUserResponse;
}

export const ProfileDashboard = ({ currentUser }: IProfileDashboardProps) => {
  if (!currentUser) {
    redirect("/");
  }

  return (
    <div>
      {currentUser?.isAdmin ? (
        <div>Welcome admin</div>
      ) : (
        <div>Welcome user</div>
      )}
    </div>
  );
};
