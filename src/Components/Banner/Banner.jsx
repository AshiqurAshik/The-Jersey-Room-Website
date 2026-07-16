import React from 'react';
import jersey1 from '../../assets/jersey1.png';
import jersey2 from '../../assets/jersey2.png';
import jersey3 from '../../assets/jersey3.png';
import jersey4 from '../../assets/jersey4.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Link } from 'react-router';

const bannerImages = [jersey1, jersey2, jersey3, jersey4];

const Banner = () => {
  return (
    <div className="relative overflow-hidden min-h-fit md:min-h-[80vh] bg-white max-w-7xl mx-auto my-6 md:my-10 rounded-xl flex flex-col-reverse md:flex-row justify-around items-center px-6 sm:px-8 md:px-10 py-10 md:py-0 gap-8 md:gap-0">
      <div className="flex-1 text-center md:text-left">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#C8F169]/20 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-[#0B3D2E] ring-1 ring-[#0B3D2E]/10">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0B3D2E] animate-pulse" />
          New Season 2026
        </span>

        <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] md:leading-[1.1] tracking-tight text-[#0A0A0A]">
          Wear Your
          <span className="relative inline-block px-1 text-[#0B3D2E]">
            {' '}
            Passion
          </span>
          <br />
          On Match Day
        </h1>

        <p className="mt-4 md:mt-6 max-w-lg mx-auto md:mx-0 text-base sm:text-lg leading-relaxed text-[#5C5B54]">
          Discover premium football jerseys inspired by the world's greatest
          clubs and players.
        </p>

        <div className="mt-6 md:mt-8 flex items-center justify-center md:justify-start gap-4">
          <button className="group relative overflow-hidden rounded-lg bg-[#0B3D2E] px-5 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-[#0B3D2E]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#0B3D2E]/30 hover:-translate-y-0.5">
            <Link to="/products" className="relative z-10">
              Shop Now
            </Link>
          </button>
        </div>
      </div>

      <div className="flex flex-1 justify-center w-full">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="max-h-[260px] sm:max-h-[320px] md:max-h-[400px] w-full max-w-[280px] sm:max-w-sm md:max-w-md"
        >
          {bannerImages.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={`Football Jersey ${i + 1}`}
                className="max-h-[260px] sm:max-h-[320px] md:max-h-[400px] w-full object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
