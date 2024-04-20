"use client"
import PortfolioSwiper from "@/components/portfolio-swiper";
import {Button} from '@/components/ui/button.jsx';
import {Link} from "@/components/link";


export const PortfolioLink = ({ portfolio }) => {
    return (
           <div className="flex flex-col gap-1 border rounded-xl px-4 py-3 text-sm hover:bg-gray-100 min-w-fit">
                <PortfolioSwiper items={portfolio.thumbnailsCollection.items}/>
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
