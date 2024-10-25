'use server'
import { User, userSchema } from '@/utils/types'
import db from './db'
import { ObjectId } from 'mongodb'
import { revalidatePath } from 'next/cache'

export async function createUserAction(form: FormData) {
    const now = new Date()
    const hash = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(form.get('senha') as string)
    )
    const hashString = Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    const userForm = {
        nome: form.get('nome'),
        tipoDoc: form
            .get('tipo_doc')
            ?.toString()
            .toUpperCase() as User['tipoDoc'],
        numDoc: form.get('num_doc'),
        telefone: form.get('telefone'),
        criadoEm: now.toISOString(),
        status: form.get('status'),
        auth: {
            email: form.get('email'),
            hashSenha: hashString,
        },
    }
    const { data, error, success } = userSchema.safeParse(userForm)
    if (!success) {
        console.log(error.errors)
        throw new Error(
            'Invalid data: ' + error.errors.map((e) => e.message).join(', ')
        )
    }
    db.collection('users').insertOne(data)
}

export async function editUserAction(id: string, form: FormData) {
    const now = new Date()
    const hash = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(form.get('senha') as string)
    )
    const hashString = Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    const userForm = {
        _id: new ObjectId(id),
        nome: form.get('nome'),
        tipoDoc: form
            .get('tipo_doc')
            ?.toString()
            .toUpperCase() as User['tipoDoc'],
        numDoc: form.get('num_doc'),
        telefone: form.get('telefone'),
        criadoEm: now.toISOString(),
        status: form.get('status'),
        auth: {
            email: form.get('email'),
            hashSenha: hashString,
        },
    }
    const { data, error, success } = userSchema.safeParse(userForm)
    if (!success) {
        console.log(error.errors)
        throw new Error(
            'Invalid data: ' + error.errors.map((e) => e.message).join(', ')
        )
    }
    db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    )
}
export async function deleteUserAction(id: string) {
    db.collection('users').deleteOne({ _id: new ObjectId(id) })
}

export async function createInsightAction(form: FormData) {
}

export async function editInsightAction(id: string, form: FormData) {}
