import UserForm from '@/components/UserForm'
import db from '@/server/db'
import { UserWithId } from '@/utils/types'
import { ObjectId } from 'mongodb'

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const user = (await db
        .collection('users')
        .findOne({ _id: new ObjectId(id) })) as UserWithId
    // Converte o id para string
    // Pois temos que converter o objeto para json e depois converter de volta para objeto
    // por causa de uma frescura do next
    const userWihtId = { ...user, _id: id.toString() }
    const userProp = JSON.parse(JSON.stringify(userWihtId))
    return <UserForm user={userProp} />
}
