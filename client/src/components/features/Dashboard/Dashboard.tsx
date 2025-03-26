import { DatePicker } from "@components/DayPicker/DayPicker";
import { Events } from "@components/features/Events/Events";
import { Footer } from "@components/features/Footer/Footer";
import { Posts } from "@components/features/Posts/Posts";
import { Slider } from "@components/features/Slider/Slider";
import { NavigationMenu } from "@components/NavigationMenu/NavigationMenu";

export const Dashboard = () => {
  return (
    <div>
      <NavigationMenu />
      <div className="mx-auto my-8">
        <Slider />
        <div className="grid grid-cols-[3fr_1fr] gap-4 p-8">
          <Posts />
          <div className="sticky top-0 h-screen p-4">
            <DatePicker />
            <Events />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
