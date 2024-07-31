import {Suspense} from 'react'
import {ScrollArea} from '@/components/scroll-area'
import {LoadingSpinner} from '@/components/loading-spinner'
import {WritingList} from '@/components/writing-list'
import {FloatingHeader} from '@/components/floating-header'
import {PageTitle} from '@/components/page-title'
import {getAllPortfolios, getAllPosts} from '@/lib/contentful'
import {getSortedPosts} from '@/lib/utils'
import {PortfolioLink} from "@/components/portfolio-link";
import {Tour} from "@/components/tour";

async function fetchData() {
    const allPosts = await getAllPosts()
    const allPortfolios = await getAllPortfolios()
    return {allPosts, allPortfolios }
}

export default async function Home() {
    const {allPosts,allPortfolios} = await fetchData()
    const sortedPosts = getSortedPosts(allPosts)

    return (
        <ScrollArea className="flex flex-col" hasScrollTitle>
            <Tour/>
            <FloatingHeader scrollTitle="Alp Emre Elmas"/>
            <div className="content-wrapper">
                <div className="content">
                    <PageTitle title="Home" className="lg:hidden"/>
                    <p>
                        {`Hello! 👋 I'm Alp, a software artisan weaving digital tales amid the serene streets of Poznan,
                        Poland. In this enchanting city, where my love for coding mingles with the echoes of each
                        keystroke, I navigate the realms of FullStack development.`}
                    </p>
                    <p>
                        {`Beyond the pixels and lines of code,
                        I'm a devoted car enthusiast, a wordsmith embracing simplicity, and a storyteller at heart.
                        Here, on this virtual canvas, I invite you to explore the artifacts of my coding odyssey—where
                        functionality meets finesse.`}
                    </p>
                    <Suspense fallback={<LoadingSpinner/>}>
                        <h2 className="mb-4 mt-8">Here some of my works</h2>
                        <div className={"grid md:grid-cols-2 grid-cols-1 gap-4"}>
                            {allPortfolios.map((portfolio, index) => {
                                return (
                                    <PortfolioLink portfolio={portfolio} key={index} className={"m-0"}/>
                                )
                            })}
                        </div>
                    </Suspense>
                    <Suspense fallback={<LoadingSpinner/>}>
                        <h2 className="mb-4 mt-8">Writing</h2>
                        <WritingList items={sortedPosts} header="Writing"/>
                    </Suspense>
                </div>
            </div>
        </ScrollArea>
        
    )
}
