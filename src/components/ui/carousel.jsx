"use client"
import * as React from 'react'
import { cn } from '@/lib/utils'
import {useState} from "react";
import {ArrowLeftIcon, ArrowRightIcon} from "lucide-react";

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
                <ArrowLeftIcon size={28} className={"carousel-arrow left-1 dark:text-black"} onClick={prevSlide}/>
            )}

            {childrenWithProps}

            {count > 1 && (
                <ArrowRightIcon size={28} className={"carousel-arrow right-1 dark:text-black"} onClick={nextSlide}/>
            )}
        </div>
    )
})

Carousel.displayName = "Carousel";

export default Carousel
