import AuthForm from '@/components/AuthForm'
import React from 'react'

const page = () => {
  return <AuthForm type="sign-in" />    
}
 
export default page
// going to handle the authentication using firebase, used by - duolingo, gameloft, newyork times, alibaba
// firebase -> is a backend as a service tool, offered by google providing auth, db storage and more without having to manage server
//firebase offers 2 sdks -> 1) admin sdks allows secure server side operations, 2) client sdk enables direct interactions from web or mobile apps
//In latest version of nextJs, firebase works with server actions and middleware for authentication and real time databaseManagement and edge functions for scalibility
