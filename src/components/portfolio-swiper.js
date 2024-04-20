"use client"
import {useRef} from 'react';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import {Navigation, EffectCoverflow} from "swiper/modules"

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';

const PortfolioSwiper = ({items}) => {
    const swiper = useSwiper();
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
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
            className={"h-80 flex items-center justify-center w-full"}
            style={{margin: "0px!important"}}
            onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
            }}
        >
            {items.map((obj, index) => (
                <SwiperSlide key={index} className={"h-full relative flex justify-center items-center w-full"} >
                    <img
                        className="h-full bg-cover bg-center transition-opacity duration-500 ease-in-out rounded-xl slideImage object-fill"
                        src={obj.url}
                        width={obj.width}
                        height={obj.height}
                        alt={index}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default PortfolioSwiper;
