import { User, userSchema } from '@/utils/types'
import db from './db'

export async function createUser(form: FormData) {
    'use server'
    const now = new Date()
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(form.get('senha') as string))
    const hashString = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
    const userForm = {
        nome: form.get('nome'),
        tipoDoc: form.get('tipo_doc'),
        numDoc: form.get('num_doc'),
        telefone: form.get('telefone'),
        criadoEm: now.toISOString(),
        status: form.get('status'),
        auth: {
            email: form.get('email'),
            hashSenha: hashString
        },
    }
    const { data, error, success } = userSchema.safeParse(userForm)
    if (!success) {
        console.log(error.errors)
        throw new Error('Invalid data: ' + error.errors.map(e => e.message).join(', '))
    }
    db.collection('users').insertOne(data)
}
