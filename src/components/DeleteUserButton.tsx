'use client'

import { deleteUserAction } from '@/server/actions'
import { useRouter } from 'next/navigation'

export default function DeleteUserButton({ userId }: { userId: string }) {
    const router = useRouter()
    return (
        <span
            className="text-red-500 hover:underline"
            onClick={() => {
                const deleteUserWithId = deleteUserAction.bind(null, userId)
                deleteUserWithId()
                router.refresh()
            }}
        >
            Excluir
        </span>
    )
}
