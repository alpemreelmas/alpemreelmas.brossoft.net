'use client'

import dynamic from 'next/dynamic'
import {BLOCKS, INLINES, MARKS} from '@contentful/rich-text-types'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'

import {Link} from '@/components/link'
import {CodeBlock} from '@/components/contentful/code-block'

const DynamicIframe = dynamic(() => import('@/components/contentful/iframe'))
import {dasherize} from '@/lib/utils'
import {TweetCard} from '@/components/tweet-card/tweet-card'

function options(links) {
    const findAsset = (id) => links?.assets.block.find((item) => item.sys.id === id)
    const findInlineEntry = (id) => links?.entries.inline.find((item) => item.sys.id === id)

    return {
        renderMark: {
            [MARKS.BOLD]: (text) => <span className="font-semibold text-black dark:text-white">{text}</span>,
            [MARKS.ITALIC]: (text) => <span className="italic">{text}</span>,
            [MARKS.CODE]: (text) => <code className="inline-code dark:bg-dark-bg-side">{text}</code>
        },
        renderNode: {
            [BLOCKS.HEADING_1]: (_, children) => {
                const id = dasherize(children)
                return (
                    <h1
                        id={id}
                        className="group relative mb-2 mt-6 w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']"
                    >
                        <a href={`#${id}`} className="group-hover:underline group-hover:underline-offset-4">
                            {children}
                        </a>
                    </h1>
                )
            },
            
            [BLOCKS.HEADING_2]: (_, children) => {
                const id = dasherize(children)
                return (
                    <h2
                        id={id}
                        className="group relative mb-2 mt-6 w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']"
                    >
                        <a href={`#${id}`} className="group-hover:underline group-hover:underline-offset-4">
                            {children}
                        </a>
                    </h2>
                )
            },
            [BLOCKS.HEADING_3]: (_, children) => {
                const id = dasherize(children)
                return (
                    <h3
                        id={id}
                        className="group relative mb-2 mt-6 w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']"
                    >
                        <a href={`#${id}`} className="group-hover:underline group-hover:underline-offset-4">
                            {children}
                        </a>
                    </h3>
                )
            },
            [BLOCKS.HEADING_4]: (_, children) => {
                const id = dasherize(children)
                return (
                    <h4
                        id={id}
                        className="font-bold group relative mb-2 mt-6 w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']"
                    >
                        <a href={`#${id}`} className="group-hover:underline group-hover:underline-offset-4">
                            {children}
                        </a>
                    </h4>
                )
            },
            [BLOCKS.HEADING_5]: (_, children) => {
                const id = dasherize(children)
                return (
                    <h5
                        id={id}
                        className="font-bold group relative mb-2 mt-6 w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']"
                    >
                        <a href={`#${id}`} className="group-hover:underline group-hover:underline-offset-4">
                            {children}
                        </a>
                    </h5>
                )
            },
            [BLOCKS.HEADING_6]: (_, children) => {
                const id = dasherize(children)
                return (
                    <div
                        className="italic group relative w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']"
                    >
                        <a href={`#${id}`} className="group-hover:underline group-hover:underline-offset-4">
                            {children}
                        </a>
                    </div>
                )
            },
            // Must be a <div> instead of <p> to avoid descendant issue, hence to avoid mismatching UI between server and client on hydration.
            [BLOCKS.PARAGRAPH]: (_, children) => <div className="mb-4 leading-slacker last:mb-0">{children}</div>,
            [BLOCKS.UL_LIST]: (_, children) => <ul
                className="flex list-disc flex-col gap-0.5 pl-6">{children}</ul>,
            [BLOCKS.OL_LIST]: (_, children) => (
                <ol className="mb-4 flex list-inside list-[decimal-leading-zero] flex-col gap-2">{children}</ol>
            ),
            [BLOCKS.LIST_ITEM]: (_, children) => {
              return (
                  <li>{children}</li>
              );
            },
            [BLOCKS.QUOTE]: (_, children) => (
                <blockquote
                    className="mb-4 rounded-r-lg border-l-2 border-gray-200 px-4 font-medium dark:border-slate-700 dark:bg-dark-bg-side">{children}</blockquote>
            ),
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const asset = findAsset(node.data.target.sys.id)
                return (
                    <figure
                        className={"mb-6 flex flex-col gap-2 overflow-hidden rounded-xl"}>
                        <img
                            src={asset.url}
                            width={asset.width || 400}
                            height={asset.height || 300}
                            alt={asset.description || asset.title}
                            loading="lazy"
                            className="animate-reveal"
                        />
                        {asset.description && (
                            <figcaption
                                className="text-center text-xs font-light text-gray-500">{asset.description}</figcaption>
                        )}
                    </figure>
                )
            },
            [BLOCKS.HR]: () => <hr className="my-12"/>,
            [INLINES.HYPERLINK]: (node, children) => <Link href={node.data.uri}>{children}</Link>,
            [INLINES.EMBEDDED_ENTRY]: (node) => {
                const entry = findInlineEntry(node.data.target.sys.id)
                switch (entry.__typename) {
                    case 'ContentEmbed': {
                        const {embedUrl, title, type} = entry

                        switch (type) {
                            case 'Video': {
                                return (
                                    <DynamicIframe
                                        embedUrl={embedUrl}
                                        title={title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        className="aspect-video"
                                    />
                                )
                            }
                            case 'SoundCloud': {
                                return <DynamicIframe embedUrl={embedUrl} title={title} scrolling="no"
                                                      className="h-[166px]"/>
                            }
                            default:
                                return null
                        }
                    }
                    case 'CodeBlock': {
                        return <CodeBlock {...entry} />
                    }
                    case 'Tweet': {
                        const {id} = entry
                        return <TweetCard id={id}/>
                    }
                    default:
                        return null
                }
            }
        }
    }
}

export const RichText = ({content}) => {
    if (!content) return null
    return documentToReactComponents(content.json, options(content.links))
}
