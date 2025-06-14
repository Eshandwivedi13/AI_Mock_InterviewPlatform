import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import {ReactNode} from 'react'
//(auth) => its a route group which allows us to organize our app into different layouts
//common layout for all authPages
const AuthLayout = async ({children} : {children : ReactNode}) => {//component expects a children prop of type ReactNode, takes all children itself because of nextJS
  const isUserAuthenticated = await isAuthenticated();
  if(isUserAuthenticated) redirect('/');
  return (
    <div className='auth-layout'>{children}</div>
  )
}

export default AuthLayout


//NOTE : AI SDK, allows you to integrate any kind of LLM without depending on specific provider you use....the code will look the same for whichever provider you choose
//we have chosen gemini...we need gemini to speak like a human so we'll use vapi for that(Best ai voice agents for developers)

//Vapi web sdk - will allow you to integrate vapi with web app
// it will provide you a simple api for interacting with real time call functionalites of vapi