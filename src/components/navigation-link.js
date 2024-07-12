'use client'

import React, { memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {ArrowUpRightIcon, AtSignIcon, InstagramIcon} from 'lucide-react'

import { cn } from '@/lib/utils'

export const NavigationLink = memo(({ href, label, icon }) => {
  const pathname = usePathname()
  let isActive = false
  const iconCmp = icon ?? <AtSignIcon size={16} className={cn("text-black dark:text-white", isActive && "dark:text-black text-white")}/>

  const isInternal = href.startsWith('/')
  if (!isInternal) {
    return (
      <a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-2 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <span className="inline-flex items-center gap-2 font-medium dark:text-white">
          {iconCmp} {label}
        </span>
        <ArrowUpRightIcon size={16} className={cn("text-black dark:text-white", isActive && "dark:text-black text-white")}/>
      </a>
    )
  }

  if (pathname?.length > 0) {
    const splittedPathname = pathname.split('/')
    const currentPathname = splittedPathname[1] ?? ''
    isActive = currentPathname === href.split('/')[1]
  }

  return (
    <Link
      key={href}
      href={href}
      className={cn('flex items-center gap-2 rounded-lg p-2 text-white', isActive ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-gray-200 dark:hover:bg-gray-700')}
    >
      {React.cloneElement(iconCmp, {
        className: cn(iconCmp.props.className,"text-black", isActive && "dark:text-black text-white")
      })}
      <span className={cn('font-medium text-black dark:text-white', isActive && 'text-white dark:text-black')}>{label}</span>
    </Link>
  )
})
