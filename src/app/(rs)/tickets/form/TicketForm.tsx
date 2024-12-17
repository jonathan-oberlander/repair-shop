'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  type InsertTicketSchema,
  type SelectTicketSchema,
  insertTicketSchema,
} from '@/zod-schemas/ticket'
import type { SelectCustomerSchema } from '@/zod-schemas/customer'
import { CheckboxWithLabel } from '@/components/inputs/CheckBoxWithLabel'
import { InputWithLabel } from '@/components/inputs/InputWithLabel'
import { TextAreaWithLabel } from '@/components/inputs/TextAreaWithLabel'

type Props = {
  customer: SelectCustomerSchema
  ticket?: SelectTicketSchema
}

export default function TicketForm({ customer, ticket }: Props) {
  const defaultValues: InsertTicketSchema = {
    id: ticket?.id ?? '(new)',
    customerId: ticket?.customerId ?? 0,
    title: ticket?.title ?? '',
    description: ticket?.description ?? '',
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? 'new-ticket@example.com',
  }

  const form = useForm<InsertTicketSchema>({
    mode: 'onBlur',
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  })

  async function submitForm(data: InsertTicketSchema) {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id ? `Edit Ticket # ${ticket.id}` : 'New Ticket Form'}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col md:flex-row gap-4 md:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<InsertTicketSchema>
              fieldTitle="Title"
              nameInSchema="title"
            />

            <InputWithLabel<InsertTicketSchema>
              fieldTitle="Tech"
              nameInSchema="tech"
              disabled={true}
            />

            <CheckboxWithLabel<InsertTicketSchema>
              fieldTitle="Completed"
              nameInSchema="completed"
              message="Yes"
            />

            <div className="mt-4 space-y-2">
              <h3 className="text-lg">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer.firstName} {customer.lastName}
              </p>
              <p>{customer.address1}</p>
              {customer.address2 ? <p>{customer.address2}</p> : null}
              <p>
                {customer.city}, {customer.state} {customer.zip}
              </p>
              <hr className="w-4/5" />
              <p>{customer.email}</p>
              <p>Phone: {customer.phone}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <TextAreaWithLabel<InsertTicketSchema>
              fieldTitle="Description"
              nameInSchema="description"
              className="h-96"
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
              >
                Save
              </Button>

              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={() => form.reset(defaultValues)}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
