import db from '@/server/db'
import { File, InsightWithId } from '@/utils/types'
import { ObjectId } from 'mongodb'
import Link from 'next/link'

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const insight = (await db
        .collection('insights')
        .findOne({ _id: new ObjectId(id) })) as InsightWithId
    const files = insight?.arquivos ?? ([] as File[])
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
            <h1 className="text-center text-2xl font-bold">Arquivos</h1>
            <table className="w-full table-auto border-collapse text-left text-sm">
                <thead>
                    <tr className="bg-gray-300 text-xs font-semibold uppercase text-gray-700">
                        <th className="border-b px-4 py-2">Nome</th>
                        <th className="border-b px-4 py-2">Extensão</th>
                        <th className="border-b px-4 py-2">Tamanho</th>
                        <th className="border-b px-4 py-2">Data de upload</th>
                        <th className="border-b px-4 py-2">URL</th>
                        <th className="border-b px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => (
                        <tr key={file.nome} className="border-b">
                            <td className="border px-4 py-2">{file.nome}</td>
                            <td className="border px-4 py-2">
                                {file.extensao}
                            </td>
                            <td className="border px-4 py-2">{file.tamanho}</td>
                            <td className="border px-4 py-2">
                                {new Date(file.dataUpload).toLocaleString()}
                            </td>
                            <td className="border px-4 py-2">{file.url}</td>
                            <td className="border px-4 py-2">
                                <Link
                                    href={`/edit/insight/${insight._id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Editar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
