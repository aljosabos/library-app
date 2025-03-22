import { NavigationMenu } from "@components/NavigationMenu/NavigationMenu";
import { Slider } from "@features/Slider/Slider";

export const Dashboard = () => {
  return (
    <div>
      <NavigationMenu />
      <div className="mx-auto my-8 max-w-[85%]">
        <Slider />
      </div>
    </div>
  );
};
