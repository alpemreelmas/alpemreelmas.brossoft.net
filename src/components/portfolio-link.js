"use client"
import PortfolioSwiper from "@/components/portfolio-swiper";
import {Button} from '@/components/ui/button.jsx';
import {Link} from "@/components/link";
import Carousel from "@/components/ui/carousel.jsx";
import CarouselSlide from '@/components/ui/carousel-slide.jsx';
import {cn} from "@/lib/utils";


export const PortfolioLink = ({ portfolio, className, ...props}) => {
    
    return (
           <div className={cn("flex flex-col gap-1 border rounded-xl px-4 py-3 text-sm hover:bg-gray-100 min-w-fit",className)} {...props}>
               <Carousel count={portfolio.thumbnailsCollection.items.length} className={"min-w-[250px]"}>
                   {portfolio.thumbnailsCollection.items.map((pic,index)=> {
                       return (
                           <CarouselSlide index={index} key={index} className={"h-[300px]"} >
                               <img src={pic.url} alt="test" key={index} className={"object-cover aspect-[16/9]"}/>
                           </CarouselSlide>
                       )
                   })}
               </Carousel>
                <span className="font-semibold text-lg">{portfolio.title}</span>
                <span className="font-medium text-md mb-2">{portfolio.description}</span>
                <Link
                    key={portfolio.slug}
                    href={`/portfolios/${portfolio.slug}`}
                    className={"w-full"}
                >
                    <Button size="sm" variant="secondary" className={"w-full "}>
                        See more
                    </Button>
                </Link>
           </div>
    )
}
