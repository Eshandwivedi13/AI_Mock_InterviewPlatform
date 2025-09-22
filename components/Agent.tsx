'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { vapi } from '@/lib/vapi.sdk'

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

interface SavedMessage {
    role: 'user' | 'system' | 'assistant'
    content: string
}

const Agent = ({ userName, userId, type }: AgentProps) => {
    const router = useRouter()
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [callStatus, setCallStatus] = useState<CallStatus>(
        CallStatus.INACTIVE
    )
    const [messages, setMessages] = useState<SavedMessage[]>([])
    // const isSpeaking = true;
    // const callStatus = CallStatus.INACTIVE
    // const messages = [
    //     'Whats your name?',
    //     'My name is John Doe, nice to meet you!',
    // ]
    useEffect(() => {
        //tells our application what it needs to do whenever certain states of the conversation with vapi get triggered
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED)

        const onMessage = (message: Message) => {
            if (
                message.type === 'transcript' &&
                message.transcriptType === 'final'
            ) {
                const newMessage = {
                    role: message.role,
                    content: message.transcript,
                }
                setMessages((prev) => [...prev, newMessage])
            }
        }

        const onSpeechStart = () => setIsSpeaking(true)
        const onSpeechEnd = () => setIsSpeaking(false)
        const onError = (error: Error) => console.log('Error LELE BETA ', error)

        //we are handling all of these listeners, but whenever you open up listeners, you also have to clear them
        vapi.on('call-start', onCallStart)
        vapi.on('call-end', onCallEnd)
        vapi.on('message', onMessage)
        vapi.on('speech-start', onSpeechStart)
        vapi.on('speech-end', onSpeechEnd)
        vapi.on('error', onError)

        return () => {
            vapi.off('call-start', onCallStart)
            vapi.off('call-end', onCallEnd)
            vapi.off('message', onMessage)
            vapi.off('speech-start', onSpeechStart)
            vapi.off('speech-end', onSpeechEnd)
            vapi.off('error', onError)
        }
    }, [])

    useEffect(() => {
        if (callStatus === CallStatus.FINISHED) router.push('/') //after interview, feedback generation will take some time,  so simply push it to home page instead of to '/interviews/id'  ..... so they'll manually find it
    }, [messages, callStatus, type, userId])

    /*const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
            variableValues: {
                username: userName,
                userid: userId,
            },
        })
    }*/ // Older handleCall

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)
        
        if (type === 'generate') {
            await vapi.start(
                undefined,
                undefined,
                undefined,
                process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
                {
                    variableValues: {
                        username: userName,
                        userid: userId,
                    },
                }
            )
            // console.log('chala XXXXXXXXXXXXXXXXX')
        }
        // else {
        //   let formattedQuestions = "";
        //   if (questions) {
        //     formattedQuestions = questions
        //       .map((question) => `- ${question}`)
        //       .join("\n");
        //   }

        //   await vapi.start(interviewer, {
        //     variableValues: {
        //       questions: formattedQuestions,
        //     },
        //   });
        // }
    }

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }
    const latestMessage = messages[messages.length - 1]?.content
    const isCallInactiveOrFinished =
        callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED

    // console.log(callStatus !== CallStatus.ACTIVE)
    return (
        <>
            <div className="call-view">
                <div className="card-interviewer">
                    <div className="avatar">
                        <Image
                            src="/ai-avatar.png"
                            alt="vapi"
                            width={65}
                            height={54}
                            className="object-cover"
                        />
                        {isSpeaking && <span className="animate-speak" />}{' '}
                        {/* animate ping property of tailwind css with colors etc */}
                    </div>
                    <h3>AI Interviewer</h3>
                </div>
                <div className="card-border">
                    <div className="card-content">
                        <Image
                            src="/user-avatar.png"
                            alt="user avatar"
                            width={540}
                            height={540}
                            className="rounded-full object-cover size-[120px]"
                        />
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>
            {messages.length > 0 && (
                <div className="transcript-border">
                    <div className="transcript">
                        <p
                            key={latestMessage}
                            className={cn(
                                'transition-opacity duration-500 capacity-0',
                                'animate-fadeIn opacity-100 '
                            )}
                        >
                            {latestMessage}
                        </p>
                    </div>
                </div>
            )}{' '}
            {/* hardCoded data for now */}
            <div className="w-full flex justify-center">
                {callStatus !== CallStatus.ACTIVE ? ( //'ACTIVE' bhi kar sakte the
                    <button className="relative btn-call " onClick={handleCall}>
                        <span
                            className={cn(
                                'absolute animate-ping rounded-full opacity-75',
                                callStatus !== CallStatus.CONNECTING && 'hidden'
                            )}
                        />
                        <span>
                            {isCallInactiveOrFinished ? 'Call' : '. . .'}
                        </span>
                    </button>
                ) : (
                    <button
                        className="btn-disconnect"
                        onClick={handleDisconnect}
                    >
                        End
                    </button>
                )}
            </div>
        </>
    )
}

export default Agent
