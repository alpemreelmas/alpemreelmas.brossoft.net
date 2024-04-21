import { ScrollArea } from '@/components/scroll-area'
import { FloatingHeader } from '@/components/floating-header'
import {
    getAllPortfoliosSlug,
    getPortfolio,
} from '@/lib/contentful'
import { isDevelopment} from '@/lib/utils'
import {notFound} from "next/navigation";
import {LoadingSpinner} from "@/components/loading-spinner";
import {Suspense} from "react";
import {Button} from "@/components/ui/button.jsx";
import {Link} from "@/components/link";
import {RichText} from "@/components/contentful/rich-text";
import CarouselSlide from "@/components/ui/carousel-slide.jsx";
import Carousel from "@/components/ui/carousel.jsx";
export async function generateStaticParams() {
    const allPortf = await getAllPortfoliosSlug()
    return allPortf.map((port) => ({ slug: port.slug }))
}

export default async function Portfolios({params}) {
    const { slug } = params
    const { data } = await fetchData(slug)
    return (
        <ScrollArea className="flex flex-col m-0 p-0">
            <FloatingHeader title="Portfolios" />
            <Suspense fallback={<LoadingSpinner/>}>
                <div className="flex md:flex-row flex-col p-4 gap-4 md:items-start items-center">
                    <div className={"md:w-2/5 w-full h-fit border flex flex-col overflow-hidden p-4 rounded-xl md:sticky lg:top-0 top-[70px] max-w-[540px]"}>
                        <Carousel count={data.thumbnailsCollection.items.length} className={"min-w-[250px]"}>
                            {data.thumbnailsCollection.items.map((pic,index)=> {
                                return (
                                    <CarouselSlide index={index} key={index} className={"h-[300px]"} >
                                        <img src={pic.url} alt="test" key={index} className={"object-cover aspect-[16/9]"}/>
                                    </CarouselSlide>
                                )
                            })}
                        </Carousel>
                        <span className="font-bold text-lg">{data.title}</span>
                        <span className="font-medium text-md mb-2">{data.description}</span>
                            { data.link && (
                                <Link
                                    key={data.slug}
                                    href={data.link}
                                    className={"w-full"}
                                >
                                    <Button size="sm" variant="secondary" className={"w-full "}>
                                        See demo &nbsp;
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round" className="lucide lucide-rocket">
                                            <path
                                                d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                                            <path
                                                d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                                            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                                            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                                        </svg>
                                    </Button>
                                </Link>
                            )}

                    </div>
                    <div className={"md:w-3/5 w-full"}>
                        {/*<RichText content={data.content} />*/}
                        Job Description

                        JOB SUMMARY:

                        This role is a key contributor to RHC’s marketing efforts, collaborating across sales, marketing, and communications. This role is responsible for maintaining the company’s social media presence and crafting engaging written and visual content that drives the company’s marketing goals, including increased following across digital and social platforms, brand affinity, and community engagement.

                        POSITION RESPONSIBILITIES:

                        Work in collaboration with Marketing, Communications, and Sales teams to develop and manage social media campaigns to support their respective missions, ensuring consistency in voice and effectiveness.
                        Develop and manage ongoing campaign calendar and appropriate timeline for posting, engaging, and optimizing content specific to each platform.
                        Record, film, and shoot content for company-operated social channels.
                        Conduct trend and competitive analysis to develop content, build relevance, and engage audiences across owned and operated channels.
                        Monitor follower communication and respond in a brand-appropriate manner.
                        Oversee influencer outreach to drive brand awareness.
                        Moderate the collection, curation, and integration of user-generated content.
                        Develop weekly and monthly reports tracking and optimizing campaign performance.
                        Support and develop on-brand creative designs for high-profile, high-impact brand initiatives, translating ideas into compelling, memorable visual stories and growing the Robinson Helicopter messaging.
                        Draft, edit, and finalize compelling story content for the quarterly newsletter.
                        Support creative digital and print asset development that aligns with and propels the RHC brand across print, digital, social, and premium branded items.

                        QUALIFICATIONS:

                        Education Requirements: A Bachelor of Arts degree in marketing, advertising, communications, digital strategy, or a related field and at least two years of relevant experience with social media management.

                        Competency Requirements Include:

                        5+ years of proven experience in a social media or digital marketing role.
                        Excellent written and verbal communication skills with the ability to tailor actionable messaging to diverse audiences.
                        Expertise in digital marketing, including advertising and marketing content creation, video production/editing, and social media management.
                        Strong analytical and problem-solving skills with a data-driven approach to campaign optimization.
                        Juggle multiple projects with finesse, prioritizing tasks, managing deadlines, and ensuring seamless campaign execution.
                        Adaptable and flexible in a team environment, adjusting to changing circumstances and priorities as needed.
                        Proficiency in design tools such as Canva, Photoshop, Adobe Creative Suite, iMovie, Uniqode and InDesign.
                        Passion for the aerospace industry and Robinson Helicopter's legacy of innovation.

                        Preferred but not required:

                        Experience with marketing analytics and social media analytics tools.
                        Knowledge of the aviation, mobility, or manufacturing industry.
                        Bilingual in English and Spanish

                        SUPERVISORY RESPONSIBILITIES:

                        None

                        WORK CONTACTS:

                        This position interacts with manufacturing personnel, quality assurance, purchasing, facilities and equipment maintenance, sales, finance, human resources, and administrative personnel.

                        PHYSICAL EFFORT:

                        This position may occasionally be required to lift up to 25 lbs. Must be able to remain in a stationary position at 75%.

                        SAFETY:

                        You must be able to perform this job safely without endangering the health or safety of yourself or others. You must also be able to read safety manuals and implement safety procedures.

                        Travel: 5-15%. US and International travel may be required but is not guaranteed.

                        WORKING CONDITIONS:

                        Works throughout the premises as needed. The work environment may have noise levels ranging from medium to quiet. The environment for this position varies from clean, climate-controlled offices to manufacturing areas.

                        This job description portrays in general terms the type and level(s) of work performed and is not intended to be all-inclusive or to represent specific duties of any one incumbent. The knowledge, skills, and abilities may be acquired through a combination of formal schooling, self-education, prior experience, or on-the-job training. The company reserves the right to modify, supplement, delete, or augment the duties and responsibilities specified in the position description at the company’s sole and absolute discretion. Duties other than those expressly specified may be assigned from time to time.

                        Company Description

                        Robinson Helicopter produces more civil helicopters than any other company in the world. Our Torrance, California factory was built specifically for aircraft manufacturing, and we perform most operations on site including welding, machining, assembly, painting, and flight testing. Our commitment to rigorous quality standards placed us among the first American aerospace companies to be awarded ISO 9001 certification for design and manufacture of helicopters. Administrative functions include accounting, marketing, engineering and legal. Our customer service areas include product support, technical publications, warranty administration, and spare parts sales.

                        Torrance boasts a high level of entertainment with 24 parks, a golf course, numerous public tennis courts, and over 350 acres of open space and parkland. Nearby beaches offer excellent facilities for swimming, surfing and volleyball. Torrance is known for its outstanding medical care facilities, excellent schools, fine dining, and wide range of hotels, and is the home of the Del Amo Fashion Center, the largest enclosed shopping mall in the west. Numerous family destinations are within easy driving distance, including Disneyland, Magic Mountain, Knotts Berry Farm and Universal Studios. For more information about our job postings please visit our website at robinsonheli.com/careers

                        Robinson Helicopter produces more civil helicopters than any other company in the world. Our Torrance, California factory was built specifically for aircraft manufacturing, and we perform most operations on site including welding, machining, assembly, painting, and flight testing. Our commitment to rigorous quality standards placed us among the first American aerospace companies to be awarded ISO 9001 certification for design and manufacture of helicopters. Administrative functions include accounting, marketing, engineering and legal. Our customer service areas include product support, technical publications, warranty administration, and spare parts sales. Torrance boasts a high level of entertainment with 24 parks, a golf course, numerous public tennis courts, and over 350 acres of open space and parkland. Nearby beaches offer excellent facilities for swimming, surfing and volleyball. Torrance is known for its outstanding medical care facilities, excellent schools, fine dining, and wide range of hotels, and is the home of the Del Amo Fashion Center, the largest enclosed shopping mall in the west. Numerous family destinations are within easy driving distance, including Disneyland, Magic Mountain, Knotts Berry Farm and Universal Studios. For more information about our job postings please visit our website at robinsonheli.com/careers
                    </div>
                </div>
            </Suspense>

        </ScrollArea>
    )
}

async function fetchData(slug) {
    const data = await getPortfolio(slug, isDevelopment)
    if (!data) notFound()

    return {
        data
    }
}