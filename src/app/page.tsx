import db from '@/server/db'

export default async function Home() {
    const stats = await db.stats()
    return (
        <main>
            <h1 className="text-6xl font-bold underline">
                Consulting Insights with Deep Analysis
            </h1>
            <h2>
                {stats.ok}
            </h2>
        </main>
    )
}
