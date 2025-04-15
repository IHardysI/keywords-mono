import { MongoClient, Db } from 'mongodb'

const MONGO_URI = process.env.MONGO_URL||"mongodb://localhost:27017"
let dbInstance: Db | null = null

export async function connectToDB() {
    const client = new MongoClient(MONGO_URI)
    await client.connect()
    console.log('Connected to MongoDB')
    dbInstance = client.db()
    return dbInstance
}