import "dotenv/config"
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../app/generated/prisma/client';


const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
    connectionLimit: 5
})

const prismaClientSingleton = () => {
    return new PrismaClient({
        adapter,
        log: ['query'],
    })
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma