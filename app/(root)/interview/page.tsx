import React from 'react'
import Agent from '../../../components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'
const page = async () => {
    const user = await getCurrentUser() //
    // getCurrentUser() => cookieStore ko bulaya, usse session cookie nikali, sessionCookie verify karke ek arrayOfObject aya jisme uid bhi arranged thi, ab db ke users collection pe wo uid check kar li aur agar USER mil gya to uska poora data with recordId bhej diya -> In User Object Format
    // console.log(user?.name, typeof user)
    return (
        <>
            <h3>Interview Generation</h3>
            <Agent
                userName={user?.name}
                userId={user?.id}
                type="generate"
            />{' '}
            {/* for now the only job is to take the information from the user about what kind of interview we need to generate*/}
        </>
    )
}
export default page
