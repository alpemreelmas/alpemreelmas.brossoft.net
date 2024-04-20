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
import {Button} from "@/components/ui/button";
import {Link} from "@/components/link";
import {RichText} from "@/components/contentful/rich-text";

export async function generateStaticParams() {
    const allPortf = await getAllPortfoliosSlug()
    return allPortf.map((port) => ({ slug: port.slug }))
}

export default async function Portfolios({params}) {
    const { slug } = params
    const { data } = await fetchData(slug)
    return (
        <ScrollArea className="flex flex-col p-4">
            <FloatingHeader title="Portfolios" />
            <Suspense fallback={<LoadingSpinner/>}>
                <div className="flex gap-4">
                    <div className={"w-1/4 border flex flex-col overflow-hidden p-4 rounded-xl sticky top-0"}>
                            {
                                data.thumbnailsCollection.items.map((pic,indx)=>{
                                    return (
                                        <>
                                            <span key={indx}>image will be replaced</span><br/>
                                        </>
                                    )
                                })
                            }
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
                    <div className={"w-3/4"}>
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