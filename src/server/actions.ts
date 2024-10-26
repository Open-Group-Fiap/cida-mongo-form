'use server'
import {
    Insight,
    insightSchema,
    InsightWithId,
    replaceKeys,
    User,
    userSchema,
} from '@/utils/types'
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
    db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: data })
}
export async function deleteUserAction(id: string) {
    db.collection('users').deleteOne({ _id: new ObjectId(id) })
}

export async function createInsightAction(form: FormData) {
    const now = new Date().toISOString()
    const insightForm: Insight = {
        usuario: form.get('user') as string,
        dataCriacao: now,
        descricao: form.get('descricao') as string,
        resumo: {
            dataCriacao: now,
            descricao: form.get('resumo') as string,
        },
        arquivos: [],
    }
    if (!form.get('num_arquivos')) {
        throw new Error('Missing key: num_arquivos')
    }
    const rangeCount = Number(form.get('num_arquivos'))
    for (let i = 0; i < rangeCount; i++) {
        const nome = form.get(`arquivo_nome_${i}`) as string
        const extensao = nome?.split('.').pop() as string
        const tamanho = Number(form.get(`arquivo_tamanho_${i}`))
        const dataUpload = now
        const url = form.get(`arquivo_url_${i}`) as string
        insightForm.arquivos.push({
            nome,
            extensao,
            tamanho,
            dataUpload,
            url,
        })
    }
    const { data, error, success } = insightSchema.safeParse(insightForm)
    if (!success) {
        console.log(error.errors)
        throw new Error(
            'Invalid data: ' + error.errors.map((e) => e.message).join(', ')
        )
    }
    const id = new ObjectId(data.usuario)
    db.collection('insights').insertOne({ ...data, usuario: id })
}

export async function editInsightAction(id: string, form: FormData) {
    const now = new Date().toISOString()
    const insightForm: Insight = {
        usuario: form.get('user') as string,
        dataCriacao: now,
        descricao: form.get('descricao') as string,
        resumo: {
            dataCriacao: now,
            descricao: form.get('resumo') as string,
        },
        arquivos: [],
    }
    if (!form.get('num_arquivos')) {
        throw new Error('Missing key: num_arquivos')
    }
    const rangeCount = Number(form.get('num_arquivos'))
    for (let i = 0; i < rangeCount; i++) {
        const nome = form.get(`arquivo_nome_${i}`) as string
        const extensao = nome?.split('.').pop() as string
        const tamanho = Number(form.get(`arquivo_tamanho_${i}`))
        const dataUpload = now
        const url = form.get(`arquivo_url_${i}`) as string
        insightForm.arquivos.push({
            nome,
            extensao,
            tamanho,
            dataUpload,
            url,
        })
    }
    const { data, error, success } = insightSchema.safeParse(insightForm)
    if (!success) {
        console.log(error.errors)
        throw new Error(
            'Invalid data: ' + error.errors.map((e) => e.message).join(', ')
        )
    }
    data.usuario = new ObjectId(data.usuario)
    db.collection('insights').updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    )
}

export async function deleteInsightAction(id: string) {
    db.collection('insights').deleteOne({ _id: new ObjectId(id) })
}
