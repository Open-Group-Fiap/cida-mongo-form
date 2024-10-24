"use client"
export default function HomeError({ error }: { error: Error }) {
    return (
        <h2>{error.message}</h2>
    )
}
