import InsightForm from '@/components/InsightForm'
import UserSelect from '@/components/UserSelect'

export default async function CreateInsight() {
    return (
        <InsightForm>
            <UserSelect />
        </InsightForm>
    )
}
