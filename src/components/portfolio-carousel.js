"use client"
import React, {useRef} from 'react';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import {WORKS} from "@/lib/constants";
import {Navigation, EffectCoverflow} from "swiper/modules"

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";

const PortfolioCarousel = () => {
    const swiper = useSwiper();
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className={"relative w-full overflow-hidden "}>
            <div className={"h-full w-full z-10 cover absolute"}></div>
            <div className="absolute flex justify-between items-center z-20 h-full w-full px-3">
                <button ref={prevRef} onClick={()=> swiper.slidePrev()} className={"shadow-[-2.0px_2.0px_8.0px_rgba(0,0,0,0.38)] bg-white border border-1 border-solid rounded-2xl flex justify-center items-center"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button ref={nextRef} onClick={()=> swiper.slideNext()} className={"shadow-[2.0px_2.0px_8.0px_rgba(0,0,0,0.38)] bg-white border border-1 border-solid rounded-2xl flex justify-center items-center"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                loop={true}
                spaceBetween={20}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 0,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow, Navigation]}
                className={"h-80 flex items-center justify-center md:w-3/4 w-full"}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
            >

                {WORKS.map((obj, index) => (
                    <SwiperSlide key={index} className={"h-full relative flex justify-center items-center w-full "} >
                            <Image
                                className="h-full bg-cover bg-center transition-opacity duration-500 ease-in-out rounded-xl slideImage"
                                src={obj.image}
                                fill
                                objectFit={"fill"}
                                alt={obj.name}
                            />
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
};

export default PortfolioCarousel;
