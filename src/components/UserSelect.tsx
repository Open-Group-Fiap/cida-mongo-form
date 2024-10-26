import db from '@/server/db'
import { UserWithId } from '@/utils/types'
export default async function UserSelect() {
    const users = (await db
        .collection('users')
        .find({})
        .toArray()) as UserWithId[]
    return (
        <select
            className="rounded-md border border-black p-2"
            name="user"
            id="user"
        >
            <option value="" disabled>
                Selecione um usuário
            </option>
            {users.map((user) => (
                <option key={user._id.toString()} value={user._id.toString()}>
                    {user.nome}
                </option>
            ))}
        </select>
    )
}
