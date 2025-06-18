//NOTE : -> 1) User will talk with AI(vapi), vapi will ask some predefined questions which user will answer
// 2) vapi got the basic idea of user's knowledge, now it will send request to API(this file), it will send post request to gemini for generating questions 
// 3) after we got questions based on user's knowledge, we'll save the data in firebase for generating new Interviews

import {generateText} from 'ai';
import { google } from '@ai-sdk/google';
import { getRandomInterviewCover } from '@/lib/utils';
import { db } from '@/firebase/admin';
//NOTE : creating routes in nextjs directly => we do this using regular function only
export async function GET() {//get API
    return Response.json({ success: true, data: 'Thank You!' }, { status: 200 })
}

//post route -> for getting the questions generated from Gemini and saving that in the new Interview
export async function POST(request : Request) {//
    const {type, role, level, techstack, amount, userid} = await request.json();//this is how get access to request body in nextJs
    //company ki image ke liye, company bhi destructure kar sakte in above line
    try{
        //how do we generate an AI text, that our vapi-AI agent will then use
        //since we are using nextJs AI-SDK its pretty simple, see how =>
        const {text} = await generateText({
            model : google('gemini-2.0-flash-001'),//which ai-model we are using
            prompt : `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3`
        });
        const interview = {
            role, type, level, 
            techstack : techstack.split(','), 
            questions : JSON.parse(text),//AI returns in the form of text, we want to parse into an array
            userId : userid,
            finalized : true,
            coverImage : getRandomInterviewCover(),
            createdAt : new Date().toISOString()
        }
        await db.collection("interviews").add(interview);//interviews collection mein is interview ko add kardega, interview collection nhi hoga to generate karke add kardega
        return Response.json({
            success: true,
        }, {status : 200})
    }catch(e){
        console.error(e)
        return Response.json({success : false, e}, {status : 500})//something went wrong
    }
}