import InsightForm from "@/components/InsightForm";
import db from "@/server/db";
import { UserWithId } from "@/utils/types";

export default async function CreateInsight() {
    const users = await db.collection('users').find({}).toArray() as UserWithId[]

    const usersProp = JSON.parse(JSON.stringify(users)) as UserWithId[]
    return (
       <InsightForm users={usersProp} />
    )
}
