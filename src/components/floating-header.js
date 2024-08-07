'use client'

import { memo, useEffect, useState } from 'react'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { ArrowLeftIcon } from 'lucide-react'

import { MobileDrawer } from '@/components/drawer'
import { Button } from '@/components/ui/button.jsx'
import { SCROLL_AREA_ID, MOBILE_SCROLL_THRESHOLD } from '@/lib/constants'

export const FloatingHeader = memo(({ scrollTitle, title, goBackLink, children }) => {
  const [transformValues, setTransformValues] = useState({ translateY: 0, opacity: scrollTitle ? 0 : 1 })

  useEffect(() => {
    const scrollAreaElem = document.querySelector(`#${SCROLL_AREA_ID}`)

    const onScroll = (e) => {
      const scrollY = e.target.scrollTop

      const translateY = Math.max(100 - scrollY, 0)
      const opacity = Math.min(
        Math.max(
          ((scrollY - MOBILE_SCROLL_THRESHOLD * (MOBILE_SCROLL_THRESHOLD / (scrollY ** 2 / 100))) / 100).toFixed(2),
          0
        ),
        1
      )

      setTransformValues({ translateY, opacity })
    }

    if (scrollTitle) {
      scrollAreaElem?.addEventListener('scroll', onScroll, {
        passive: true
      })
    }
    return () => scrollAreaElem?.removeEventListener('scroll', onScroll)
  }, [scrollTitle])

  return (
    <header className="sticky inset-x-0 top-0 z-10 mx-auto flex h-12 w-full shrink-0 items-center overflow-hidden border-b dark:bg-dark-bg-side bg-white text-sm font-medium lg:hidden text-black dark:text-white dark:border-slate-700">
      <div className="flex h-full w-full items-center px-3">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex flex-1 items-center gap-1">
            {goBackLink ? (
              <Button variant="ghost" size="icon" className="shrink-0" asChild>
                <Link href={goBackLink} title="Go back">
                  <ArrowLeftIcon size={16} />
                </Link>
              </Button>
            ) : (
              <MobileDrawer />
            )}
            {scrollTitle && (
              <span
                className="line-clamp-2 font-bold"
                style={{ transform: `translateY(${transformValues.translateY}%)`, opacity: transformValues.opacity }}
              >
                {scrollTitle}
              </span>
            )}
            {title && (
              <Balancer ratio={0.35}>
                <span className="line-clamp-2 font-bold">{title}</span>
              </Balancer>
            )}
          </div>
          <div className="flex min-w-[50px] justify-end">{children}</div>
        </div>
      </div>
    </header>
  )
})
