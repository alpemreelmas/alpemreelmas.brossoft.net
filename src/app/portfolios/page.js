import { ScrollArea } from '@/components/scroll-area'
import { FloatingHeader } from '@/components/floating-header'
import { PortfolioLink } from '@/components/portfolio-link';
import {getAllPortfolios} from '@/lib/contentful'
import { getSortedPosts } from '@/lib/utils'
import {LoadingSpinner} from "@/components/loading-spinner";
import {Suspense} from "react";

export default async function Portfolios() {
    const { allPortfolios } = await fetchData()
    const sortedPortfolios = getSortedPosts(allPortfolios)

    return (
        <ScrollArea className="flex flex-col">
            <Suspense fallback={<LoadingSpinner/>}>
                    <FloatingHeader title="Portfolios" />
                    <div className={"m-5 grid grid-cols-3"}>
                        {sortedPortfolios.map((portfolio, index) => {
                            return (
                                <PortfolioLink portfolio={portfolio} key={index} />
                            )
                        })}
                    </div>
            </Suspense>
        </ScrollArea>
    )
}

async function fetchData() {
    const allPortfolios = await getAllPortfolios()
    return {allPortfolios}
}

/*export async function generateMetadata() {
    const seoData = await getPageSeo('writing')
    if (!seoData) return null

    const {
        seo: { title, description }
    } = seoData
    const siteUrl = '/writing'

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: siteUrl
        },
        alternates: {
            canonical: siteUrl
        }
    }
}*/
