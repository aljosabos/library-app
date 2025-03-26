"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Slide1 from "@images/slides/slide-1.jpg";
import Slide2 from "@images/slides/slide-2.jpg";
import Slide3 from "@images/slides/slide-3.jpg";
import Slide4 from "@images/slides/slide-4.jpg";

export const Slider = () => {
  return (
    <Swiper
      // className="h-[700px]"
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Pagination, Autoplay, Navigation]}
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{ delay: 3000 }}
      navigation={{ enabled: true }}
    >
      <SwiperSlide>
        <Image src={Slide1} alt="slide-1" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={Slide2} alt="slide-2" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={Slide3} alt="slide-3" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={Slide4} alt="slide-4" />
      </SwiperSlide>
    </Swiper>
  );
};
