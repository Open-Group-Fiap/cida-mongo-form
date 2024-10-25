'use client'

import { InsightWithId, UserWithId } from '@/utils/types'
import { Suspense, useMemo, useState } from 'react'

export default function InsightForm({
    users,
    insight,
}: {
    users: UserWithId[]
    insight?: InsightWithId
}) {
    const [arquivosCount, setArquivosCount] = useState(1)
    const rangeCount = useMemo(
        () => Array.from({ length: arquivosCount }, (_, i) => i),
        [arquivosCount]
    )
    return (
        <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
            <h1 className="text-center text-2xl font-bold">
                {insight ? 'Editar Insight' : 'Criar Insight'}
            </h1>
            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    const form = new FormData(e.target as HTMLFormElement)
                    /*try {
                        insight
                            ? await editInsightAction(
                                insight._id.toString(),
                                form
                            )
                            : await createInsightAction(form)
                        alert('Insight criada com sucesso!')
                    } catch (error) {
                        if (error instanceof Error) {
                            alert(error.message)
                        }
                        }*/
                }}
                className="grid w-full grid-cols-2 items-center justify-center gap-6 rounded-lg border-2 border-gray-200 p-4"
            >
                <label htmlFor="descricao">Descrição: </label>
                <input
                    className="rounded-md border border-black p-2"
                    type="text"
                    name="descricao"
                    id="descricao"
                    defaultValue={insight?.descricao}
                    placeholder="Descrição"
                />
                <label htmlFor="resumo">Resumo: </label>
                <input
                    className="rounded-md border border-black p-2"
                    type="text"
                    name="resumo"
                    id="resumo"
                    defaultValue={insight?.resumo.descricao}
                    placeholder="Resumo"
                />
                <label htmlFor="user_id">Usuário: </label>
                <select
                    className="rounded-md border border-black p-2"
                    name="user_id"
                    id="user_id"
                >
                    {users.map((user) => {
                        const id = user._id.toString()
                        return (
                            <option key={id} value={id}>
                                {user.nome}
                            </option>
                        )
                    })}
                </select>
                <label htmlFor="num_arquivos">Numero de arquivos: </label>
                <input
                    className="rounded-md border border-black p-2"
                    type="number"
                    name="num_arquivos"
                    id="num_arquivos"
                    defaultValue={arquivosCount}
                    min={1}
                    onChange={(e) => setArquivosCount(Number(e.target.value))}
                    placeholder="Numero de arquivos"
                />
                <div className="col-span-2 grid w-full grid-cols-4 items-center justify-center gap-4 p-4">
                    {rangeCount.map((i) => (
                        <div
                            key={i}
                            className="flex w-full flex-col items-center justify-center gap-4 p-4"
                        >
                            <label htmlFor="arquivo_nome">
                                Nome do arquivo:{' '}
                            </label>
                            <input
                                className="rounded-md border border-black p-2"
                                type="text"
                                name="arquivo_nome"
                                id="arquivo_nome"
                                placeholder="Nome do arquivo"
                            />

                            <label htmlFor="arquivo_tamanho">
                                Tamanho do arquivo:{' '}
                            </label>
                            <input
                                className="rounded-md border border-black p-2"
                                type="number"
                                name="arquivo_tamanho"
                                id="arquivo_tamanho"
                                placeholder="Tamanho do arquivo"
                            />
                            <label htmlFor="arquivo_url">
                                URL do arquivo:{' '}
                            </label>
                            <input
                                className="rounded-md border border-black p-2"
                                type="text"
                                name="arquivo_url"
                                id="arquivo_url"
                                placeholder="URL do arquivo"
                            />
                        </div>
                    ))}
                </div>
                <button className="col-span-2 rounded bg-blue-500 px-4 py-2 font-bold text-white transition-all duration-300 hover:bg-blue-700">
                    {insight ? 'Editar' : 'Criar'}
                </button>
            </form>
        </div>
    )
}
