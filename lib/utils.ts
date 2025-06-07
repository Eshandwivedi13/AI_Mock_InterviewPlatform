import { interviewCovers, mappings } from '@/constants'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
//copied this file man
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const techIconBaseURL = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

const normalizeTechName = (tech: string) => {
    const key = tech.toLowerCase().replace(/\.js$/, '').replace(/\s+/g, '')
    return mappings[key as keyof typeof mappings]
}

const checkIconExists = async (url: string) => {
    try {
        const response = await fetch(url, { method: 'HEAD' })
        return response.ok // Returns true if the icon exists
    } catch {
        return false
    }
}

export const getTechLogos = async (techArray: string[]) => {
    //for rendering tech logos, this and normalizeTechName() are used such as =>
    /* SHORT => Mapping over array, normalizing techname,  calling cdn which delivers those icons or devicon or dev icon and then it just returns the actualy URL*/
    // DEEP WORK => uses techArray which we pass into it, we then normalize techName by removing some lowerCase characters and replaces dots and spaces
    //then we look into mappings map, and if its 'react.js' 'reactjs' 'react' -> we still return same react logo.......then we can generate random icons from 'dev-icons'
    const logoURLs = techArray.map((tech) => {
        const normalized = normalizeTechName(tech)
        return {
            tech,
            url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
        }
    })

    const results = await Promise.all(
        logoURLs.map(async ({ tech, url }) => ({
            tech,
            url: (await checkIconExists(url)) ? url : '/tech.svg',
        }))
    )

    return results
}

export const getRandomInterviewCover = () => {
    const randomIndex = Math.floor(Math.random() * interviewCovers.length)
    return `/covers${interviewCovers[randomIndex]}`
}
