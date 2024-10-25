'use client'
import { createUserAction } from '@/server/actions'
import { redirect, useRouter } from 'next/navigation'

export default function UserForm() {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    const form = new FormData(e.target as HTMLFormElement)
                    try {
                        await createUserAction(form)
                        router.push('/list/user')
                    } catch (error) {
                        if (error instanceof Error) {
                            alert(error.message)
                        }
                    }
                }}
                className="grid grid-cols-2 items-center justify-center gap-6 rounded-lg border-2 border-gray-200 p-4 even:w-1/4"
            >
                <label htmlFor="nome">Nome: </label>
                <input
                    className="rounded-md border border-black p-2"
                    type="text"
                    name="nome"
                    id="nome"
                    placeholder="Nome"
                />
                <label htmlFor="tipo_doc">Tipo de documento: </label>
                <select
                    className="rounded-md border border-black p-2"
                    name="tipo_doc"
                    id="tipo_doc"
                >
                    <option value="CPF">CPF</option>
                    <option value="CNPJ">CNPJ</option>
                </select>
                <label htmlFor="num_doc">Numero do documento: </label>
                <input
                    className="rounded-md border border-black p-2"
                    type="text"
                    name="num_doc"
                    id="num_doc"
                    placeholder="Numero do documento"
                />
                <label htmlFor="telefone">Telefone: </label>
                <input
                    className="rounded-md border border-black p-2"
                    type="text"
                    name="telefone"
                    id="telefone"
                    placeholder="Telefone"
                />
                <label htmlFor="status">Status: </label>
                <select
                    className="rounded-md border border-black p-2"
                    name="status"
                    id="status"
                >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>
                <label htmlFor="email">Email: </label>
                <input
                    className="rounded-md border border-black p-2"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                />
                <label htmlFor="senha">Senha: </label>
                <input
                    className="rounded-md border border-black p-2"
                    type="password"
                    name="senha"
                    id="senha"
                    placeholder="Senha"
                />
                <button className="col-span-2 rounded bg-blue-500 px-4 py-2 font-bold text-white transition-all duration-300 hover:bg-blue-700">
                    Cadastrar
                </button>
            </form>
        </div>
    )
}
