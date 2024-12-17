import BackButton from '@/components/BackButton'
import { getCustomer } from '@/lib/queries/getCustomer'
import * as Sentry from '@sentry/nextjs'
import CustomerForm from './CustomerForm'

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  try {
    const { customerId } = await searchParams

    // Edit customer form
    if (customerId) {
      const customer = await getCustomer(Number(customerId))

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
            <BackButton title="Go Back" variant="ghost" />
          </>
        )
      }

      // customer form
      return <CustomerForm customer={customer} />
    }

    // new customer form
    return <CustomerForm />
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error)
      throw error
    }
  }
}
