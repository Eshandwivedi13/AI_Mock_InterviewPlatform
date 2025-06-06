'use client' //client set of functionalities like button click, inputs or forms is typically client render component, so added "use client" on top
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import FormField from './FormField'
import { useRouter } from 'next/navigation'

// const formSchema = z.object({
//     //using 'form' from shadcn
//     username: z.string().min(2).max(50),
// }) //hata diya

const authFormSchema = (type: FormType) => {
    return z.object({
        //using 'form' from shadcn
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    })
}

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter(); 
    const formSchema = authFormSchema(type) //created custom authFormSchema
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            if(type === 'sign-up'){
                toast.success("Account created successfully. Please sign in.");
                router.push('/sign-in')
                console.log('sign up', values);
            }else{
                toast.success("Sign in successfully.");
                router.push('/')
                console.log('sign in', values);
            }
        } catch (error) {
            console.log(error);
            //for making sonner work, you gotta import <Toaster /> in app's layout, so that you would be able to trigger toast
            toast.error(`There was an error : ${error}`) //sonner was installed for toast only
        }
        console.log(values) // "printWidth": 80 for pretierrc
    }
    const isSignin = type === 'sign-in' //checking for sign-in or sign-up, at which page child is
    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">PrepWise</h2>
                </div>
                <h3>Practice Job Interview With AI</h3>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6 mt-4 form"
                    >
                        {!isSignin && <FormField control={form.control} name="name" label = "Name" placeholder='Your Name'/>}
                        <FormField control={form.control} name="email" label = "Email" placeholder='Your email address' type="email" />
                        <FormField control={form.control} name="password" label = "Password" placeholder='Enter your password' type="password" />
                        <Button type="submit" className="btn">
                            {isSignin ? 'Sign in' : 'Create an Account'}
                        </Button>
                    </form>
                </Form>
                <p className="text-center">
                    {isSignin ? 'No account yet' : 'Have an account already'}
                    <Link
                        href={!isSignin ? '/sign-in' : '/sign-up'}
                        className="font-bold text-user-primary ml-1"
                    >
                        {!isSignin ? 'Sign in' : 'Sign up'}
                    </Link>
                </p>
                {/* Signin page pe hai to No account yet, link to /signup,  also 'signup' mesg */}
            </div>
        </div>
    )
}

export default AuthForm
