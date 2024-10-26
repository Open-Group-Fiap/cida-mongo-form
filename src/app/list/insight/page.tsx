import DeleteInsightButton from '@/components/DeleteInsightButton'
import db from '@/server/db'
import { InsightWithId } from '@/utils/types'
import Link from 'next/link'

export default async function Page() {
    const insights = (await db
        .collection('insights')
        .find()
        .toArray()) as InsightWithId[]

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
            <h1 className="text-center text-2xl font-bold">
                Lista de insights
            </h1>
            <table className="w-full table-auto border-collapse text-left text-sm">
                <thead>
                    <tr className="bg-gray-300 text-xs font-semibold uppercase text-gray-700">
                        <th className="border-b px-4 py-2">ID</th>
                        <th className="border-b px-4 py-2">Usuário</th>
                        <th className="border-b px-4 py-2">Data de criação</th>
                        <th className="border-b px-4 py-2">Descrição</th>
                        <th className="border-b px-4 py-2">Resumo</th>
                        <th className="border-b px-4 py-2">Arquivos</th>
                        <th className="border-b px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {insights.map((insight) => (
                        <tr key={insight._id.toString()} className="border-b">
                            <td className="border px-4 py-2">
                                {insight._id.toString()}
                            </td>
                            <td className="border px-4 py-2">
                                <Link
                                    href={`/edit/user/${insight.usuario}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {insight.usuario.toString()}
                                </Link>
                            </td>
                            <td className="border px-4 py-2">
                                {new Date(insight.dataCriacao).toLocaleString()}
                            </td>
                            <td className="border px-4 py-2">
                                {insight.descricao}
                            </td>
                            <td className="border px-4 py-2">
                                {insight.resumo.descricao}
                            </td>
                            <td className="border px-4 py-2">
                                <Link
                                    href={`/list/files/${insight._id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {insight.arquivos.length}
                                </Link>
                            </td>
                            <td className="border px-4 py-2">
                                <Link
                                    href={`/edit/insight/${insight._id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Editar
                                </Link>
                                <span className="mx-2">|</span>
                                <DeleteInsightButton
                                    insightId={insight._id.toString()}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
