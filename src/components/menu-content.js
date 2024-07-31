import Link from 'next/link'

import { NavigationLink } from '@/components/navigation-link'
import { PROFILES, LINKS } from '@/lib/constants'
import ThemeToggle from "@/components/themeToggle";

export const MenuContent = () => {
  return (
    <div className="flex w-full flex-col text-sm">
      <div className="flex flex-col gap-4">
        <Link href="/" className="link-card inline-flex items-center gap-2 p-2">
          <img
            src="/assets/me.jpg"
            alt="Alp Emre Elmas"
            width={40}
            height={40}
            loading="lazy"
            className="rounded-full border dark:border-slate-500 shadow-sm"
          />
          <div className="flex flex-col">
            <span className="font-semibold dark:text-white">Alp Emre Elmas</span>
            <span className="text-gray-600 dark:text-white">Software Developer</span>
          </div>
        </Link>
        <div className="flex flex-col gap-1" id={"links"}>
          {LINKS.map((link) => (
            <NavigationLink key={link.href} href={link.href} label={link.label} icon={link.icon} />
          ))}
        </div>
      </div>
      <hr/>
      <div className="flex flex-col gap-2 text-sm" id={"profile-links"}>
        <span className="px-2 text-xs font-medium leading-relaxed text-gray-600 dark:text-gray-300">Online</span>
        <div className="flex flex-col gap-1">
          {Object.values(PROFILES).map((profile) => (
            <NavigationLink key={profile.url} href={profile.url} label={profile.title} icon={profile.icon} />
          ))}
        </div>
      </div>
        <hr/>
        <ThemeToggle/>
    </div>
  )
}
