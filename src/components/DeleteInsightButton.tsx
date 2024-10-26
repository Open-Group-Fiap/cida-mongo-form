'use client'

import { deleteInsightAction, deleteUserAction } from '@/server/actions'
import { useRouter } from 'next/navigation'

export default function DeleteInsightButton({
    insightId: insightId,
}: {
    insightId: string
}) {
    const router = useRouter()
    return (
        <span
            className="text-red-500 hover:underline"
            onClick={() => {
                deleteInsightAction(insightId)
                router.refresh()
            }}
        >
            Excluir
        </span>
    )
}
