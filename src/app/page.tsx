import UserForm from '@/components/UserForm'
import db from '@/server/db'
import { User } from '@/utils/types'
export default async function Home() {
    return (
        <main>
            <h1 className="text-center text-6xl font-bold underline">
                Cida - Consulting Insights with Deep Analysis
            </h1>
            <UserForm />
        </main>
    )
}
