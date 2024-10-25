import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
            <Link href="/create/user">Criar usuário</Link>
            <Link href="/list/user">Listar usuários</Link>
            <Link href="/create/insight">Criar insight</Link>
        </div>
    )
}
