import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
/*  <<<<= Next JS file based routing functionality =>>> 
(auth) => () brackets are for grouping route together, group means -  /root (url)
    inside group layout -> it takes children and gives them layout
    inside one of the group folders, a folder with page.tsx -> anything with page.tsx is nothing but /foldername (route)
*/
const page = () => {
    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>
                        Get Interview-Ready with AI-Powered Practice & Feedback
                    </h2>
                    <p className="text-lg">
                        Practice on real interview questions and get instant
                        feedback
                    </p>
                    {/* asChild -> whole button will take properties of child i.e. Link here*/}
                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>
                <Image
                    src="/robot.png"
                    alt="robo-dude"
                    width={400}
                    height={400}
                    className="max-sm:hidden"
                />{' '}
                {/* the robo-image wont be visible in small devices */}
            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                       <InterviewCard {...interview} key={interview.id} />
                    ))}
                    {/* <p>You haven't taken any interviews yet</p> */}
                </div>
            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an Interview</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                       <InterviewCard {...interview} key={interview.id} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default page
