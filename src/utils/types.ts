import { z } from 'zod'

export const userSchema = z.object({
    nome: z.string(),
    tipoDoc: z.enum(['CPF', 'CNPJ']),
    numDoc: z.string(),
    telefone: z.string(),
    criadoEm: z.string().datetime(),
    status: z.enum(['ativo', 'inativo']),
    auth: z.object({
        email: z.string().email(),
        hashSenha: z.string(),
    }),
})
export const resumoSchema = z.object({
    dataCriacao: z.date(),
    descricao: z.string(),
})
export const arquivoSchema = z.object({
    usuario: z.string(),
    nome: z.string(),
    extensao: z.string(),
    tamanho: z.number(),
    dataUpload: z.date(),
    url: z.string(),
})
export const insightSchema = z.object({
    usuario: z.string(),
    dataCriacao: z.date(),
    descricao: z.string(),
    resumo: resumoSchema,
    arquivos: z.array(arquivoSchema),
})
export type Insight = z.infer<typeof insightSchema>
export type User = z.infer<typeof userSchema>
