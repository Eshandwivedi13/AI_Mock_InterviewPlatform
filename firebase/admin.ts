import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
console.log("🔥 initFirebaseAdmin.ts is being loaded")

//set of librararies that lets you interact with firebase from pivileged environments to perform actions like queries and mutations on a firebase dataconnection, read and write with realtime, generate some auth tokens
//npm i firebase-admin --save
const initFirebaseAdmin = () => {//initializing firebase admin, checking also -> so we dont initalize it more than once
            console.log('========================== FIREBASE_PROJECT_ID: =========================.............', process.env.FIREBASE_PROJECT_ID)
    const apps = getApps();
    if(!apps.length){//makes sure that only one instance of fireBase sdk is created
        initializeApp({
            credential : cert({
                projectId : process.env.FIREBASE_PROJECT_ID,
                clientEmail : process.env.FIREBASE_CLIENT_EMAIL,
                privateKey : process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")//this will replace all of the newLines that we dont need within this key
            })
        })
    }
    return {
        auth : getAuth(),
        db : getFirestore()
    }//we'll use that admin authentication for getting some user information from server side and perform some operations later on
}

export const{auth, db} = initFirebaseAdmin();