import InsightForm from '@/components/InsightForm'
import UserSelect from '@/components/UserSelect'
import db from '@/server/db'
import { InsightWithId } from '@/utils/types'
import { ObjectId } from 'mongodb'

export default async function InsightPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const insight = (await db
        .collection('insights')
        .findOne({ _id: new ObjectId(id) })) as InsightWithId
    if (!insight) {
        return <div>Insight não encontrada</div>
    }
    const insightProp = JSON.parse(JSON.stringify(insight))
    return (
        <InsightForm insight={insightProp}>
            <UserSelect />
        </InsightForm>
    )
}
