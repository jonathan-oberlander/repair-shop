'use client'

import {
  insertCustomerSchema,
  type InsertCustomerSchema,
  type SelectCustomerSchema,
} from '@/zod-schemas/customer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { InputWithLabel } from '@/components/inputs/InputWithLabel'
import { TextAreaWithLabel } from '@/components/inputs/TextAreaWithLabel'
import { SelectWithLabel } from '@/components/inputs/SelectWithLabel'
import { StatesArray } from '@/constants/StatesArray'

type Props = {
  customer?: SelectCustomerSchema
}

export default function CustomerForm({ customer }: Props) {
  const defaultValues: InsertCustomerSchema = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? '',
    lastName: customer?.lastName ?? '',
    address1: customer?.address1 ?? '',
    address2: customer?.address2 ?? '',
    city: customer?.city ?? '',
    state: customer?.state ?? '',
    zip: customer?.zip ?? '',
    phone: customer?.phone ?? '',
    email: customer?.email ?? '',
    notes: customer?.notes ?? '',
  }

  const form = useForm<InsertCustomerSchema>({
    mode: 'onBlur',
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  })

  async function submit(data: InsertCustomerSchema) {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? 'Edit' : 'New'} Customer Form
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex flex-col sm:flex-row gap-4 sm:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="Adress 1"
              nameInSchema="address1"
            />
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="Address 2"
              nameInSchema="address2"
            />
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="City"
              nameInSchema="city"
            />
            <SelectWithLabel<InsertCustomerSchema>
              fieldTitle="State"
              nameInSchema="state"
              data={StatesArray}
            />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="Zip Code"
              nameInSchema="zip"
            />
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="Email"
              nameInSchema="email"
            />
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="Phone"
              nameInSchema="phone"
            />
            <TextAreaWithLabel<InsertCustomerSchema>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="h-40"
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
