import { redirect } from "next/navigation";

import { getCurrentUser } from "@/api/user/get-current";
import { ProfileDashboard } from "@features/ProfileDashboard/ProfileDashboard";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/");

  return (
    <div>
      <ProfileDashboard currentUser={currentUser} />
    </div>
  );
};

export default ProfilePage;
