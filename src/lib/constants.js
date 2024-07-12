import {
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
  YoutubeIcon,
  SparklesIcon,
  PencilLineIcon,
  NavigationIcon,
  Wand2Icon, RocketIcon, FileTextIcon,
} from 'lucide-react'

export const PROFILES = {
  twitter: {
    title: 'X (Twitter)',
    username: 'ElmasAlpEmre',
    url: 'https://twitter.com/intent/user?screen_name=ElmasAlpEmre',
    icon: <TwitterIcon size={16} className={"text-black dark:text-white"}/>
  },
  github: {
    title: 'GitHub',
    url: 'https://github.com/alpemreelmas',
    icon: <GithubIcon size={16} className={"text-black dark:text-white"}/>
  },
  linkedin: {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alp-emre-elmas/',
    icon: <LinkedinIcon size={16} className={"text-black dark:text-white"}/>
  },
  medium: {
    title: 'Medium',
    url: 'https://alpemre.medium.com'
  },
  instagram: {
    title: 'Instagram',
    url: 'https://www.instagram.com/alp_emre_elmas',
    icon: <InstagramIcon size={16} className={"text-black dark:text-white"}/>
  },
  youtube: {
    title: 'YouTube',
    url: 'https://www.youtube.com/@AlpEmreElmas',
    icon: <YoutubeIcon size={16} className={"dark:text-white"}/>
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
    icon: <SparklesIcon size={16} className={"text-black dark:text-white"}/>
  },
  {
    href: '/writing',
    label: 'Writing',
    icon: <PencilLineIcon size={16} className={"dark:text-white"} />
  },
  {
    href: '/journey',
    label: 'Journey',
    icon: <NavigationIcon size={16} className={"dark:text-white"}/>
  },
  {
    href: '/stack',
    label: 'Stack',
    icon: <Wand2Icon size={16} className={"dark:text-white"}/>
  },
  {
    href: '/portfolios',
    label: 'Portfolios',
    icon: <RocketIcon size={16} className={"dark:text-white"}/>
  },
  {
    href: '/cv.pdf',
    label: 'CV',
    icon: <FileTextIcon size={16} className={"dark:text-white"}/>
  },
]

export const SCROLL_AREA_ID = 'scroll-area'
export const MOBILE_SCROLL_THRESHOLD = 20

export const WORKS = [
  {
    "image": "/assets/yacht.png",
    "link": "https://yacht-photos.com/",
    "name": "Karezona Photography",
    "description": "This is CRM application which has blog, portfolio, setting modules. Site was developed using Wordpress.",
    "image_alt": "Solargy Logo",
    "status": "prod"
  },
  {
    "image": "/assets/solargy.png",
    "link": "#",
    "name": "Solargy",
    "description": "This is CRM application which has blog, project, setting, multi language, service modules. Site was developed using Laravel.",
    "image_alt": "Solargy Logo",
    "status": "prod"
  },
  {
    "image": "/assets/yacht.png",
    "link": "#",
    "name": "QTB",
    "description": "This is CLI application which is based AI to translate developers languages files. CLI is been developed using golang.",
    "image_alt": "CLI",
    "status": "dev"
  },
  {
    "image": "/assets/yacht.png",
    "link": "https://carpediemtour.brossoft.net/",
    "name": "carpediemtourtransfer",
    "description": "This is basic portfolio application which has built-in accounting module. This was developed using Laravel.",
    "image_alt": "carpediemtour.brossoft.net",
    "status": "prod"
  },
  {
    "image": "/assets/yacht.png",
    "link": "https://agency.brossoft.net",
    "name": "agency.brossoft.net",
    "description": "This is landing page for agency website.",
    "image_alt": "Agency Brossoft Website Picture",
    "status": "prod"
  },
]
