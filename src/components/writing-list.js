'use client'

import Link from 'next/link'
import { cn, dateWithDayAndMonthFormatter, dateWithMonthAndYearFormatter } from '@/lib/utils'
import {PageTitle} from "@/components/page-title";

export const WritingList = ({ items }) => {

  const itemsEntriesByYear = items.reduce((acc, item) => {
    const year = new Date(item.date || item.sys.firstPublishedAt).getFullYear()
    const yearArr = acc.find((item) => item[0] === year)
    if (!yearArr) {
      acc.push([year, [item]])
    } else {
      yearArr[1].push(item)
    }

    return acc
  }, [])

  return (
    <div className="text-sm">
      <div className="grid grid-cols-6 py-2 font-medium text-gray-500">
        <span className="col-span-1 hidden text-left md:grid">Year</span>
        <span className="col-span-6 md:col-span-5">
          <span className="grid grid-cols-4 items-center md:grid-cols-8">
            <span className="col-span-1 text-left">Date</span>
            <span className="col-span-2 md:col-span-6">Title</span>
          </span>
        </span>
      </div>

      <div className="group/list-wrapper">
        {itemsEntriesByYear.length === 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <p className="mt-5 font-bold">Nothing to show here for now...</p>
            </div>
        ) }
        {itemsEntriesByYear.map((customItems) => {
          const [year, itemsArr] = customItems

          return (
            <ul className="group/list list-none" key={year}>
              {itemsArr.map((item, itemIndex) => {
                const {
                  title,
                  slug,
                  date,
                  sys: { firstPublishedAt }
                } = item
                const dateObj = new Date(date || firstPublishedAt)
                const dateWithDayAndMonth = dateWithDayAndMonthFormatter.format(dateObj)
                const dateWithMonthAndYear = dateWithMonthAndYearFormatter.format(dateObj)

                return (
                  <li
                    key={slug}
                    className="group/list-item grid grid-cols-6 p-0 group-hover/list-wrapper:text-gray-300"
                  >
                    <span
                      className={cn(
                        'pointer-events-none col-span-1 hidden items-center transition-colors group-hover/list:text-gray-700 md:grid',
                        itemIndex === 0 && 'border-t border-gray-200'
                      )}
                    >
                      {itemIndex === 0 ? year : ''}
                    </span>
                    <Link
                      href={`/writing/${slug}`}
                      className="col-span-6 group-hover/list-item:text-gray-700 md:col-span-5"
                    >
                      <span className="grid grid-cols-4 items-center gap-2 border-t border-gray-200 py-4 md:grid-cols-8">
                        <span className="col-span-1 text-left">
                          <time dateTime={date} className="hidden md:block">
                            {dateWithDayAndMonth}
                          </time>
                          <time dateTime={date} className="md:hidden">
                            {dateWithMonthAndYear}
                          </time>
                        </span>
                        <span className="col-span-2 line-clamp-4 md:col-span-6">{title}</span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )
        })}
      </div>
    </div>
  )
}
