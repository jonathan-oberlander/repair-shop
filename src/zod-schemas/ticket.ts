import { tickets } from '@/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const insertTicketSchema = createInsertSchema(tickets, {
  id: z.union([z.number(), z.literal('(new)')]),
  title: (schema) => schema.title.min(1, 'Title is required'),
  description: (schema) => schema.description.min(1, 'Descriptionis required'),
  tech: (schema) => schema.tech.email('Invalid email address'),
})

export const selectTicketSchema = createSelectSchema(tickets)

export type InsertTicketSchema = typeof insertTicketSchema._type
export type SelectTicketSchema = typeof selectTicketSchema._type
