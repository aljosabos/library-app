import { ICurrentUserResponse } from "@/api/user/get-current";
import { DatePicker } from "@components/DayPicker/DayPicker";
import { Events } from "@components/features/Events/Events";
import { Footer } from "@components/features/Footer/Footer";
import { Posts } from "@components/features/Posts/Posts";
import { Slider } from "@components/features/Slider/Slider";
import { NavigationMenu } from "@components/NavigationMenu/NavigationMenu";

interface IDashboardProps {
  currentUser?: ICurrentUserResponse;
}

export const Dashboard = ({ currentUser }: IDashboardProps) => {
  return (
    <div>
      <NavigationMenu currentUser={currentUser} />
      <div className="mx-auto my-8">
        <Slider />
        <div className="grid gap-4 p-16 lg:grid-cols-[3fr_1fr]">
          <Posts />
          <div className="sticky top-0 flex flex-col items-center p-4 sm:h-auto lg:h-screen">
            <DatePicker classes={{ day: "sm:p-4 lg:p-0" }} />
            <Events />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
