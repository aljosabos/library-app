import Image from "next/image";

import { Typography } from "@components/Typography/Typography";
import { Button } from "@components/ui/button";
import Image1 from "@images/slides/slide-1.jpg";

export const Post = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-md border border-gray-200">
      <div className="flex flex-[2] flex-col justify-around gap-8 p-6">
        <Typography variant="h2">Lorem ipsum</Typography>
        <Typography>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit iure
          inventore commodi dolorem? Sapiente, atque at qui aut assumenda dicta
          culpa aspernatur dolores? Consequatur sint cumque veniam dolorum
          architecto. Dignissimos!
        </Typography>
        <Button
          className="color-white w-full bg-[#7c6853] font-bold uppercase text-white"
          variant="outline"
          size="lg"
        >
          More Details
        </Button>
      </div>
      <div className="relative h-[180px] w-full flex-[1]">
        <Image src={Image1} alt="img" fill className="object-cover px-4" />
      </div>
    </div>
  );
};
