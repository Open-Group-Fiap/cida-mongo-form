import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Formulario CIDA',
    description: 'Consulting Insights with Deep Analysis',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <main className="flex flex-col items-center justify-center gap-4 p-4">
                    <div className="flex flex-row w-full justify-between">
                            <Link className="float-left" href="/">
                                <img
                                    src="/favicon.ico"
                                    alt="Logo"
                                    className="h-12 w-auto"
                                />
                            </Link>
                            <h1 className="w-full text-6xl font-bold text-center">
                                Cida - Conexão MongoDB
                            </h1>
                    </div>
                    {children}
                </main>
            </body>
        </html>
    )
}
