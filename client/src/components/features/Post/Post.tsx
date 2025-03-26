import Image from "next/image";

import { Typography } from "@components/Typography/Typography";
import { Button } from "@components/ui/button";
import Image1 from "@images/slides/slide-1.jpg";

export const Post = () => {
  return (
    <div className="gap-4rounded-md flex flex-wrap border border-gray-200 p-6">
      <div className="flex flex-[2] flex-col gap-4">
        <Typography variant="h2">Lorem ipsum</Typography>
        <Typography>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit iure
          inventore commodi dolorem? Sapiente, atque at qui aut assumenda dicta
          culpa aspernatur dolores? Consequatur sint cumque veniam dolorum
          architecto. Dignissimos!
        </Typography>
      </div>
      <div className="flex-[1]">
        <Image src={Image1} alt="img" className="rounded-md" />
      </div>
      <div className="mt-4 w-full">
        <Button
          className="color-white w-full bg-[#7c6853] font-bold uppercase text-white"
          variant="outline"
          size="lg"
        >
          More Details
        </Button>
      </div>
    </div>
  );
};
