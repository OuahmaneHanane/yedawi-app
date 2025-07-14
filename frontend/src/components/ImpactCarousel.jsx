import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

const impactStories = [
  {
    image: "/asthma-medication.jpg",
    beneficiary: "Fatima A.",
    useCase: "Received vital asthma medication.",
    donation: "Covered by $12 donation from Youssef.",
    dateCity: "Casablanca, 07/2025",
  },
  {
    image: "/diabet.jpg",
    beneficiary: "Yassine B.",
    useCase: "Insulin and glucose strips delivered.",
    donation: "Covered by $22 donation from Salma.",
    dateCity: "Rabat, 06/2025",
  },
  {
    image: "/antibiotic.jpg",
    beneficiary: "Amal T.",
    useCase: "Antibiotics delivered on time for her child.",
    donation: "Covered by $15 donation from community.",
    dateCity: "Fes, 07/2025",
  },
];

const AUTO_PLAY_DELAY = 5000;

export default function StoriesStyleImpactCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressWidths, setProgressWidths] = useState(
    new Array(impactStories.length).fill(0)
  );
  const swiperRef = useRef(null);

//   useEffect(() => {
//     // Set progress
//     setProgressWidths((widths) =>
//       widths.map((_, i) => (i < activeIndex ? 100 : i === activeIndex ? 0 : 0))
//     );

//     if (progressRef.current) clearInterval(progressRef.current);

    // const start = Date.now();

    // progressRef.current = setInterval(() => {
    //   const elapsed = Date.now() - start;
    //   const percentage = Math.min((elapsed / AUTO_PLAY_DELAY) * 100, 100);

    //   setProgressWidths((widths) => {
    //     const newWidths = [...widths];
    //     newWidths[activeIndex] = percentage;
    //     return newWidths;
    //   });

    //   if (percentage >= 100) {
    //     setActiveIndex((prev) =>
    //       prev === impactStories.length - 1 ? 0 : prev + 1
    //     );
    //   }
    // }, 50);
    

//     return () => clearInterval(progressRef.current);
//   }, [activeIndex]);

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-8 max-w-5xl mx-auto">
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-6">
        Your Impact Stories
      </h2>

      {/* Progress Bars */}
      <div className="flex gap-2 max-w-3xl mx-auto mb-4">
        {progressWidths.map((width, i) => (
          <div
            key={i}
            className="flex-1 h-1 bg-gray-300 rounded cursor-pointer overflow-hidden"
            onClick={() =>{
                swiperRef.current?.slideTo(i);
                 setActiveIndex(i);
                }}
          >
            <div
              className="h-1 bg-green-500 transition-all"
              style={{ width: `${width}%` }}
            />
          </div>
        ))}
      </div>

      {/* Swiper */}
      <Swiper
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        autoplay={{
          delay: AUTO_PLAY_DELAY,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        initialSlide={activeIndex}
        className="rounded-3xl overflow-hidden shadow-xl"
      >
        {impactStories.map(
          ({ image, beneficiary, useCase, donation, dateCity }, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-[500px] bg-cover bg-center relative"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white">
                  <h3 className="text-2xl font-semibold">{beneficiary}</h3>
                  <p className="mt-1 italic">{useCase}</p>
                  <p className="mt-2 text-sm font-medium">{donation}</p>
                  <p className="mt-1 text-xs text-gray-300">{dateCity}</p>
                </div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </section>
  );
}
