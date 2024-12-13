import { db } from '@/db'
import { customers } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getCustomer(id: number) {
  return (await db.select().from(customers).where(eq(customers.id, id))).at(0)
}
