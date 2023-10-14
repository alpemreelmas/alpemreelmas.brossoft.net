import {
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
  YoutubeIcon,
  SparklesIcon,
  PencilLineIcon,
  NavigationIcon,
  Wand2Icon,
  BookmarkIcon
} from 'lucide-react'

export const PROFILES = {
  twitter: {
    title: 'Twitter',
    username: 'ElmasAlpEmre',
    url: 'https://twitter.com/intent/user?screen_name=ElmasAlpEmre',
    icon: <TwitterIcon size={16} />
  },
  github: {
    title: 'GitHub',
    url: 'https://github.com/alpemreelmas',
    icon: <GithubIcon size={16} />
  },
  linkedin: {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alp-emre-elmas/',
    icon: <LinkedinIcon size={16} />
  },
  medium: {
    title: 'Medium',
    url: 'https://alpemre.medium.com'
  },
  instagram: {
    title: 'Instagram',
    url: 'https://www.instagram.com/alp_emre_elmas',
    icon: <InstagramIcon size={16} />
  },
  youtube: {
    title: 'YouTube',
    url: 'https://www.youtube.com/c/brossoft',
    icon: <YoutubeIcon size={16} />
  },
  /*
  bluesky: {
    title: 'Bluesky',
    url: 'https://staging.bsky.app/profile/onur.dev'
  },
  readcv: {
    title: 'Read.cv',
    url: 'https://read.cv/'
  }*/
}

export const TWEETS_COLLECTION_ID = 15896982

export const LINKS = [
  {
    href: '/',
    label: 'Home',
    icon: <SparklesIcon size={16} />
  },
  {
    href: '/writing',
    label: 'Writing',
    icon: <PencilLineIcon size={16} />
  },
  {
    href: '/journey',
    label: 'Journey',
    icon: <NavigationIcon size={16} />
  },
  {
    href: '/stack',
    label: 'Stack',
    icon: <Wand2Icon size={16} />
  },
]

export const SCROLL_AREA_ID = 'scroll-area'
export const MOBILE_SCROLL_THRESHOLD = 20
