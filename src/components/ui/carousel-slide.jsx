"use client"
import * as React from 'react'
import { cn } from '@/lib/utils'

const CarouselSlide = React.forwardRef(({ className, children,index,slide, ...props}, ref) => {
    return (
            <div className={cn(className,["rounded-xl w-full h-full shadow-lg focus:none"], slide === index ? "flex":"hidden" )} {...props} ref={ref} >
                {children}
            </div>
    )
})

CarouselSlide.displayName = "CarouselSlide";

export default CarouselSlide
