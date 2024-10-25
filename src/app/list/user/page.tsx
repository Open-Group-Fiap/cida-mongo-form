import DeleteUserButton from '@/components/DeleteUserButton'
import db from '@/server/db'
import { User } from '@/utils/types'
import { ObjectId } from 'mongodb'
import Link from 'next/link'

type UserWithId = User & { _id: ObjectId }
export default async function Page() {
    const users = (await db
        .collection('users')
        .find()
        .toArray()) as UserWithId[]
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
            <h1 className="text-center text-2xl font-bold">
                Lista de usuários
            </h1>
            <table className="w-full table-auto border-collapse text-left text-sm">
                <thead>
                    <tr className="bg-gray-300 text-xs font-semibold uppercase text-gray-700">
                        <th className="border-b px-4 py-2">ID</th>
                        <th className="border-b px-4 py-2">Nome</th>
                        <th className="border-b px-4 py-2">
                            Tipo do documento
                        </th>
                        <th className="border-b px-4 py-2">
                            Número de documento
                        </th>
                        <th className="border-b px-4 py-2">E-mail</th>
                        <th className="border-b px-4 py-2">Hash Senha</th>
                        <th className="border-b px-4 py-2">Telefone</th>
                        <th className="border-b px-4 py-2">Data de cadastro</th>
                        <th className="border-b px-4 py-2">Status</th>
                        <th className="border-b px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {users.map((user) => (
                        <tr
                            key={user._id.toString()}
                            className="border-b border-gray-500 transition-all duration-200 odd:bg-gray-300 hover:bg-gray-600 hover:text-white"
                        >
                            <td className="border-b px-4 py-2">
                                {user._id.toString()}
                            </td>
                            <td className="border-b px-4 py-2">{user.nome}</td>
                            <td className="border-b px-4 py-2">
                                {user.tipoDoc}
                            </td>
                            <td className="border-b px-4 py-2">
                                {user.numDoc}
                            </td>
                            <td className="border-b px-4 py-2">
                                {user.auth.email}
                            </td>
                            <td className="border-b px-4 py-2">
                                {user.auth.hashSenha}
                            </td>
                            <td className="border-b px-4 py-2">
                                {user.telefone}
                            </td>
                            <td className="border-b px-4 py-2">
                                {new Date(user.criadoEm).toLocaleString()}
                            </td>
                            <td className="border-b px-4 py-2">
                                <span
                                    className={`rounded px-2 py-1 text-xs font-bold ${user.status === 'ativo'
                                            ? 'text-green-500'
                                            : 'text-red-700'
                                        }`}
                                >
                                    {user.status[0].toUpperCase() +
                                        user.status.slice(1)}
                                </span>
                            </td>
                            <td className="border-b px-4 py-2">
                                <Link
                                    href={`/edit/user/${user._id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Editar
                                </Link>
                                <span className="mx-2">|</span>
                                <DeleteUserButton
                                    userId={user._id.toString()}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
