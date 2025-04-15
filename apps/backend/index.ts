import { Elysia, t } from 'elysia'
import { connectToDB } from './db'
import { generateAuthToken, hashPassword, verifyPassword } from './utils/auth'
import cors from '@elysiajs/cors'


const db = await connectToDB()

const app = new Elysia()
    .use(cors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        exposeHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers'],
        credentials: true,
        maxAge: 86400
    }))
    .post('/register', async ({ body }) => {
        const { email, password, role } = body
        const user = await db.collection('users').findOne({ email })
        if (user) {
            return { error: 'User already exists' }
        }
        const hashedPassword = await hashPassword(password)
        await db.collection('users').insertOne({ email, password: hashedPassword, role })
        return { message: 'User registered' }
    },{
        body: t.Object({
            email: t.String(),
            password: t.String(),
            role: t.String()
        })
    })
    .post('/login', async ({ body }) => {
        const { email, password } = body
        const user = await db.collection('users').findOne({ email })
        if (!user) {
            return { error: 'User not found' }
        }
        const isPasswordValid = await verifyPassword(password, user.password)
        if (!isPasswordValid) {
            return { error: 'Invalid password' }
        }
        let userWithoutPassword = {
            ...user,
        }
        delete userWithoutPassword.password
        const token = await generateAuthToken(userWithoutPassword as unknown as {email: string, role: string, _id: string})

        return { message: 'User logged in', token }
    },{
        body: t.Object({
            email: t.String(),
            password: t.String()
        })
    })
    .listen(3000)

    console.log(`🦊 Сервер запущен на порту ${3000}`)


export type App = typeof app 