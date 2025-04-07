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
          className="color-white w-min bg-cyan-600 font-bold text-white"
          variant="outline"
        >
          More Details
        </Button>
      </div>
      <div className="relative w-full flex-1 pr-4">
        <Image
          src={Image1}
          alt="post_img"
          height={200}
          width={300}
          className="block rounded-md"
        />
      </div>
    </div>
  );
};
