import { redirect } from "next/navigation";

import { ICurrentUserResponse } from "@/api/user/get-current";
import { getUser } from "@api/user/get";

import { ProfileDashboardAdmin } from "./ProfileDashboardAdmin/ProfileDashboardAdmin";
import { ProfileDashboardUser } from "./ProfileDashboardUser/ProfileDashboardUser";

interface IProfileDashboardProps {
  currentUser: ICurrentUserResponse;
}

export const ProfileDashboard = async ({
  currentUser,
}: IProfileDashboardProps) => {
  if (!currentUser) {
    redirect("/");
  }

  const user = await getUser(currentUser._id);

  return (
    <div>
      {currentUser?.isAdmin ? (
        <ProfileDashboardAdmin />
      ) : (
        <ProfileDashboardUser user={user} />
      )}
    </div>
  );
};
