"use client"
import * as React from 'react'
import { cn } from '@/lib/utils'
import {useState} from "react";

const Carousel = React.forwardRef(({ className, children, count, ...props}, ref) => {
    const [slide, setSlide] = useState(0)
    const nextSlide = () => {
        setSlide(slide === count - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? count - 1 : slide - 1);
    }

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { slide:slide });
        }
        return child;
    });
    
    return (
        <div className={cn(className, "flex justify-center items-center relative w-full")} ref={ref} {...props} >
            {count > 1 && (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-arrow-left left-2 carousel-arrow" onClick={prevSlide}>
                    <path d="m12 19-7-7 7-7"/>
                    <path d="M19 12H5"/>
                </svg>
            )}

            {childrenWithProps}

            {count > 1 && (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-arrow-right right-2 carousel-arrow" onClick={nextSlide}>
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                </svg>
            )}
        </div>
    )
})

Carousel.displayName = "Carousel";

export default Carousel
