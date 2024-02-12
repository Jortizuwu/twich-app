import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'error'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
    console.log('Connected to the database successfully.')
  } catch (error) {
    console.error('Error connecting to the database:', error)
    throw new Error('Unable to connect to the database.')
  }
}
