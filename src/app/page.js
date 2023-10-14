import { Suspense } from 'react'

import { ScrollArea } from '@/components/scroll-area'
import { LoadingSpinner } from '@/components/loading-spinner'
import { WritingList } from '@/components/writing-list'
import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { getAllPosts } from '@/lib/contentful'
import { getSortedPosts } from '@/lib/utils'

async function fetchData() {
  const allPosts = await getAllPosts()
  return { allPosts }
}

export default async function Home() {
  const { allPosts } = await fetchData()
  const sortedPosts = getSortedPosts(allPosts)

  return (
    <ScrollArea className="flex flex-col" hasScrollTitle>
      <FloatingHeader scrollTitle="Alp Emre Elmas" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Home" className="lg:hidden" />
          <p>
            {`Hi 👋 I'm Alp, a software developer, car-lover, writer, and minimalist based in Poznan,
          Poland.`}
          </p>
          <p>
            I develop things as a FullStack Software Developer. To be continued
          </p>
          <Suspense fallback={<LoadingSpinner />}>
            <h2 className="mb-4 mt-8">Writing</h2>
            <WritingList items={sortedPosts} header="Writing" />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}
