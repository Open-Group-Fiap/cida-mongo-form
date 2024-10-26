'use client'

import { createInsightAction, editInsightAction } from '@/server/actions'
import { InsightWithId, UserWithId } from '@/utils/types'
import { useRouter } from 'next/navigation'
import { Suspense, useMemo, useState } from 'react'

export default function InsightForm({
    children,
    insight,
}: {
    children: React.ReactNode
    insight?: InsightWithId
}) {
    const files = insight?.arquivos ?? []
    const [arquivosCount, setArquivosCount] = useState(
        files.length === 0 ? 1 : files.length
    )
    const router = useRouter()
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
                    try {
                        insight
                            ? await editInsightAction(
                                  insight._id.toString(),
                                  form
                              )
                            : await createInsightAction(form)
                        router.push('/list/insight')
                        router.refresh()
                    } catch (error) {
                        if (error instanceof Error) {
                            alert(error.message)
                        }
                    }
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
                <label htmlFor="user">Usuário: </label>
                <Suspense fallback={<div>Carregando...</div>}>
                    {children}
                </Suspense>
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
                            <label htmlFor={`arquivo_nome_${i}`}>
                                Nome do arquivo:{' '}
                            </label>
                            <input
                                className="rounded-md border border-black p-2"
                                type="text"
                                name={`arquivo_nome_${i}`}
                                id={`arquivo_nome_${i}`}
                                defaultValue={files[i]?.nome}
                                placeholder="Nome do arquivo"
                            />

                            <label htmlFor={`arquivo_tamanho_${i}`}>
                                Tamanho do arquivo:{' '}
                            </label>
                            <input
                                className="rounded-md border border-black p-2"
                                type="number"
                                name={`arquivo_tamanho_${i}`}
                                id={`arquivo_tamanho_${i}`}
                                defaultValue={files[i]?.tamanho}
                                placeholder="Tamanho do arquivo"
                            />
                            <label htmlFor={`arquivo_url_${i}`}>
                                URL do arquivo:{' '}
                            </label>
                            <input
                                className="rounded-md border border-black p-2"
                                type="text"
                                name={`arquivo_url_${i}`}
                                id={`arquivo_url_${i}`}
                                defaultValue={files[i]?.url}
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
