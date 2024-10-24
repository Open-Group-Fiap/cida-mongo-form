import { User, userSchema } from '@/utils/types'
//import db from './db'

export async function createUser(form: FormData) {
    'use server'
    console.log('aaa')
    const userForm = {
        nome: form.get('name'),
        tipoDoc: form.get('tipo_doc'),
        numDoc: form.get('num_doc'),
        telefone: form.get('telefone'),
        criadoEm: Date.now(),
        status: form.get('status'),
        auth: {
            email: form.get('email'),
            password: form.get('password'),
        },
    }
    const { data, error, success } = userSchema.safeParse(userForm)
    if (!success) {
        throw new Error('Invalid data')
    }
    //db.collection('users').insertOne(data)
}
