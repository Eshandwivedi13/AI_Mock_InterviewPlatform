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