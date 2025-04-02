import { Dashboard } from "@components/features/Dashboard/Dashboard";

import { getCurrentUserAction } from "./actions/users/getCurrentUserAction";

const Home = async () => {
  const currentUser = await getCurrentUserAction();

  return (
    <div>
      <Dashboard currentUser={currentUser} />
    </div>
  );
};

export default Home;
