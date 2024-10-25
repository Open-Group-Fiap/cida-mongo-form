'use client'
import { createUserAction } from '@/server/actions'

export default function UserForm() {
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                const form = new FormData(e.target as HTMLFormElement)

                try {
                    await createUserAction(form)
                } catch (error) {
                    alert(error)
                }
            }}
        >
            <input type="text" name="nome" id="nome" placeholder="Nome" />
            <select name="tipo_doc" id="tipo_doc">
                <option value="CPF">CPF</option>
                <option value="CNPJ">CNPJ</option>
            </select>
            <input
                type="text"
                name="num_doc"
                id="num_doc"
                placeholder="Numero do documento"
            />
            <input
                type="text"
                name="telefone"
                id="telefone"
                placeholder="Telefone"
            />
            <select name="status" id="status">
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
            </select>
            <input type="email" name="email" id="email" placeholder="Email" />
            <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Senha"
            />
            <button type="submit">Cadastrar</button>
        </form>
    )
}
