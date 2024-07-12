import { ScrollArea } from '@/components/scroll-area'
import { cn } from '@/lib/utils'

export const SideMenu = ({ children, title, isInner }) => {
  return (
    <ScrollArea
      className={cn(
        'hidden bg-zinc-50 dark:bg-dark-bg-side lg:flex lg:flex-col lg:border-r lg:dark:border-slate-700 ',
        isInner ? 'lg:w-80 xl:w-96' : 'lg:w-60 xl:w-72'
      )}
    >
      {title && (
        <div className="sticky top-0 z-10 border-b dark:border-slate-700 bg-zinc-50 dark:bg-dark-bg-side px-5 py-3">
          <span className="text-sm font-semibold">{title}</span>
        </div>
      )}
      <div className="bg-zinc-50 dark:bg-dark-bg-side p-3">{children}</div>
    </ScrollArea>
  )
}
