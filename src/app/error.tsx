'use client'

import Link from 'next/link'

export default function HomeError({ error }: { error: Error }) {
    return (
        <>
            <h1>Oops!</h1>
            <h2>{error.message}</h2>
            <Link href="/">Go back home</Link>
        </>
    )
}
