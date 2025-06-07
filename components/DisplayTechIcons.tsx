import { cn, getTechLogos } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
    const techIcons = await getTechLogos(techStack)
    // console.log(techIcons )
    return (
        <div className="flex flex-row">
            {techIcons.slice(0, 3).map(({ tech, url }, index) => (
                <div
                    key={tech}
                    //making className dynamic using 'cn' properties of shadcn
                    // allows you to pass a pre-built string and also provide a dynamic style 
                    className={cn("relative group bg-dark-300 rounded-full p-2 flex-center", index >= 1 && "-ml-3")}
                >
                    <span className="tech-tooltip">{tech}</span>
                    {/* tooltip basically means whenever you hover, it tells what it is */}
                    <Image
                        src={url}
                        alt={tech}
                        width={100}
                        height={100}
                        className="size-5"
                    ></Image>
                </div>
            ))}
        </div>
    )
}

export default DisplayTechIcons
