import type { Metadata } from 'next'
import { Mona_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const monaSans = Mona_Sans({
    variable: '--font-mona-sans',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'PrepWise',
    description: 'An AI-powered platform for preparing for mock Interviews',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="dark">
            {/* making the class 'dark', helps us to keep same theme throughout the page using shadcn */}
            <body
                suppressHydrationWarning
                className={`${monaSans.className} antialiased pattern`} //applying font to main class, it will be applied everywhere
            >
                {children}
                <Toaster/>
            </body>
        </html>
    )
}
