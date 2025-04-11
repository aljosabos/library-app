import { redirect } from "next/navigation";

import { ICurrentUserResponse } from "@/api/user/get-current";

import { ProfileDashboardAdmin } from "./ProfileDashboardAdmin/ProfileDashboardAdmin";

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
        <ProfileDashboardAdmin />
      ) : (
        <div>Welcome user</div>
      )}
    </div>
  );
};
