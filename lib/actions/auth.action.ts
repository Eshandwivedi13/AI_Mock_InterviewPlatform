'use server';
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7

//NOTE : actions file must be turn into server rendered file -> by using 'use server'; directive
export async function signup(params : SignUpParams){//SignUpParams is in 'types' folder, actually its in an interface file, we expect here an object with variable and datatype e.g. -> uid, name, email, password
    const {uid, name, email} = params
    try{
        const userRecord = await db.collection('users').doc('uid').get();//trying to fetch the users by heading into users collection, getting a document with a specific id
        if(userRecord.exists){
            return{
                success : false,
                message : 'User already exists. Please sign in instead.'
            }
        }
        //if user isn't already present, set the user in 'users' collection
        await db.collection('users').doc(uid).set({
            name, email//setting name : name, email : email as in object form
        })
        return{
            success : true,
            message : 'Account created successfully. Please sign in.'
        }
    }catch(e : any){// : any karne se => we dont have to any typescript validations
        console.error('Error creating a user', e);
        //we can even check for firebase errors
        if(e.code === 'auth/email-already-exists'){
            return{
                success : false,
                message : 'This email is already in use.'
            }
        }
        return{//general error (you could explicitly create for password and name as well)
            success : false,
            message : 'failed to create an account'
        }
    }
}


//sign in page -> you need to signIn with firebase sign-in with email and password, this will then generate a token 
//which will send over server-side and setup cookie
export async function signIn(params:SignInParams) {
    console.log('even error pe signin chal gya')
    const {email, idToken} = params;
    try{
        const userRecord = await auth.getUserByEmail(email);//only admin sdk will have access to this user, checking if userRecord exists or not
        if(!userRecord){
            return{
                success : false,
                message : "User does not exist. Create an account instead."
            }
        }
        await setSessionCookie(idToken)
    }catch(e){
        console.log(e)
        return{
           success : false,
           message : 'Failed to log into an account.' 
        }
    }
}
export async function setSessionCookie(idToken : string){//SignUpParams is in 'types' folder, actually its in an interface file, we expect here an object with variable and datatype e.g. -> uid, name, email, password
    const cookieStore = await cookies()
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn : ONE_WEEK * 1000,
    })//created sessionCookie, matlab itne session tak ye cookie rahegi
    cookieStore.set('session', sessionCookie, {
        maxAge : ONE_WEEK,
        httpOnly : true,//we typically do this with authentication cookie
        secure : process.env.NODE_ENV === 'production',
        path : '/',
        sameSite : 'lax'
    })//setting cookie to cookie store
   
}

export async function getCurrentUser() : Promise<User | null> {//this funct will return a promise, that will be resolved in either a user or a null
    //NOTE : 1) we are using the Next.js server-side cookies() utility (from next/headers)
    // 2) Gives you access to the request cookies sent by the browser.
    // 3) Automatically includes cookies like 'session' if they exist in the browser and are scoped to your domain/path.
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;//getting specific session cookie
    if(!sessionCookie) return null;//cookie doesn't exist
    try{
         const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);//verifying session cookie, 2nd parameter is for 'have we revoked the session or not'
         const userRecord = await db.collection('users').doc(decodedClaims.uid).get()//who is this user which is currently loggedIn and getting him as well
         if(!userRecord.exists) return null;
         return{
            ...userRecord.data(), 
            id : userRecord.id,
         } as User //returning the object as 'User' object
    }catch(e){
        console.log(e);
        return null;//invalid session
    }
}

export async function isAuthenticated(){
    const user = await getCurrentUser();
    return !!user;//basically 2 negation cancel each other, if user is null so return false...warna true karega
}