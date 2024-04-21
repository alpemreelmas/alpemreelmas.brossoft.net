import { ScrollArea } from '@/components/scroll-area'
import { FloatingHeader } from '@/components/floating-header'
import {
    getAllPortfoliosSlug,
    getPortfolio,
} from '@/lib/contentful'
import { isDevelopment} from '@/lib/utils'
import {notFound} from "next/navigation";
import {LoadingSpinner} from "@/components/loading-spinner";
import {Suspense} from "react";
import {Button} from "@/components/ui/button.jsx";
import {Link} from "@/components/link";
import {RichText} from "@/components/contentful/rich-text";
import CarouselSlide from "@/components/ui/carousel-slide.jsx";
import Carousel from "@/components/ui/carousel.jsx";
export async function generateStaticParams() {
    const allPortf = await getAllPortfoliosSlug()
    return allPortf.map((port) => ({ slug: port.slug }))
}

export default async function Portfolios({params}) {
    const { slug } = params
    const { data } = await fetchData(slug)
    return (
        <ScrollArea className="flex flex-col m-0 p-0">
            <FloatingHeader title="Portfolios" />
            <Suspense fallback={<LoadingSpinner/>}>
                <div className="flex md:flex-row flex-col p-4 gap-4 md:items-start items-center">
                    <div className={"md:w-2/5 w-full h-fit border flex flex-col overflow-hidden p-4 rounded-xl md:sticky lg:top-0 top-[70px] max-w-[540px]"}>
                        <Carousel count={data.thumbnailsCollection.items.length} className={"min-w-[250px]"}>
                            {data.thumbnailsCollection.items.map((pic,index)=> {
                                return (
                                    <CarouselSlide index={index} key={index} className={"h-[300px]"} >
                                        <img src={pic.url} alt="test" key={index} className={"object-cover aspect-[16/9]"}/>
                                    </CarouselSlide>
                                )
                            })}
                        </Carousel>
                        <span className="font-bold text-lg">{data.title}</span>
                        <span className="font-medium text-md mb-2">{data.description}</span>
                            { data.link && (
                                <Link
                                    key={data.slug}
                                    href={data.link}
                                    className={"w-full"}
                                >
                                    <Button size="sm" variant="secondary" className={"w-full "}>
                                        See demo &nbsp;
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round" className="lucide lucide-rocket">
                                            <path
                                                d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                                            <path
                                                d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                                            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                                            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                                        </svg>
                                    </Button>
                                </Link>
                            )}

                    </div>
                    <div className={"md:w-3/5 w-full"}>
                        <RichText content={data.content} />
                    </div>
                </div>
            </Suspense>

        </ScrollArea>
    )
}

async function fetchData(slug) {
    const data = await getPortfolio(slug, isDevelopment)
    if (!data) notFound()

    return {
        data
    }
}