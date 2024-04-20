import { notFound } from 'next/navigation'

import { ScrollArea } from '@/components/scroll-area'
import { RichText } from '@/components/contentful/rich-text'
import { PageTitle } from '@/components/page-title'
import { FloatingHeader } from '@/components/floating-header'
import { getPost, getWritingSeo, getAllPostSlugs } from '@/lib/contentful'
import { getDateTimeFormat, isDevelopment } from '@/lib/utils'

export async function generateStaticParams() {
  const allPosts = await getAllPostSlugs()
  return allPosts.map((post) => ({ slug: post.slug }))
}

async function fetchData(slug) {
  const data = await getPost(slug, isDevelopment)
  if (!data) notFound()

  return {
    data
  }
}

export default async function WritingSlug({ params }) {
  const { slug } = params
  const { data } = await fetchData(slug)

  const {
    title,
    seoTitle,
    seoDescription,
    content,
    sys: { firstPublishedAt, publishedAt: updatedAt }
  } = data

  const postDate = firstPublishedAt
  const dateString = getDateTimeFormat(postDate)

  const datePublished = new Date(postDate).toISOString()
  const dateModified = new Date(updatedAt).toISOString()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: seoTitle,
    description: seoDescription,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: 'Alp Emre Elmas'
    },
    url: `https://alpemreelmas.brossoft.net/writing/${slug}`
  }

  return (
    <>
      <ScrollArea className="flex flex-col bg-white" hasScrollTitle>
        <FloatingHeader scrollTitle={title} goBackLink="/writing">
        </FloatingHeader>
        <div className="content-wrapper">
          <article className="content">
            <PageTitle
              title={title}
              subtitle={
                <time dateTime={postDate} className="text-gray-400">
                  {dateString}
                </time>
              }
              className="mb-6 flex flex-col gap-3"
            />
            <RichText content={content} />
          </article>
        </div>
      </ScrollArea>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }} />
    </>
  )
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const seoData = await getWritingSeo(slug)
  if (!seoData) return null

  const {
    seoTitle,
    seoDescription,
    sys: { firstPublishedAt, publishedAt: updatedAt }
  } = seoData

  const siteUrl = `/writing/${slug}`
  const postDate = firstPublishedAt
  const publishedTime = new Date(postDate).toISOString()
  const modifiedTime = new Date(updatedAt).toISOString()

  return {
    seoTitle,
    seoDescription,
    openGraph: {
      seoTitle,
      seoDescription,
      type: 'article',
      publishedTime,
      ...(updatedAt && {
        modifiedTime
      }),
      url: siteUrl
    },
    alternates: {
      canonical: siteUrl
    }
  }
}
