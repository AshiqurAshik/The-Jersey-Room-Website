import React from 'react';
import jersey1 from '../../assets/jersey1.png';
import jersey2 from '../../assets/jersey2.png';
import jersey3 from '../../assets/jersey3.png';
import jersey4 from '../../assets/jersey4.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const bannerImages = [jersey1, jersey2, jersey3, jersey4];

const Banner = () => {
  return (
    <div className="relative overflow-hidden min-h-[80vh] bg-white max-w-7xl mx-auto my-10 rounded-xl flex justify-around items-center px-10">
      <div className="flex-1">
        <span className="rounded-full bg-[#C8F169]/20 px-3 py-1 text-sm font-medium text-[#0B3D2E]">
          New Season 2026
        </span>

        <h1 className="mt-6 text-5xl font-bold leading-tight text-[#0A0A0A]">
          Wear Your
          <span className="text-[#0B3D2E]"> Passion</span>
          <br />
          On Match Day
        </h1>

        <p className="mt-6 max-w-lg text-lg text-[#5C5B54]">
          Discover premium football jerseys inspired by the world's greatest
          clubs and players.
        </p>

        <button className="mt-8 rounded-lg bg-[#0B3D2E] px-6 py-3 font-semibold text-white transition hover:bg-[#072d22]">
          Shop Now
        </button>
      </div>

      <div className="flex flex-1 justify-center">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="max-h-[400px] w-full max-w-md"
        >
          {bannerImages.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={`Football Jersey ${i + 1}`}
                className="max-h-[400px] w-full max-w-md object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
