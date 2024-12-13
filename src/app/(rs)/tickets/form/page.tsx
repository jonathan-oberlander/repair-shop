import BackButton from '@/components/BackButton'
import { getCustomer } from '@/lib/queries/getCustomer'
import { getTicket } from '@/lib/queries/getTicket'
import * as Sentry from '@sentry/nextjs'

export default async function TicketsFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  try {
    const { ticketId, customerId } = await searchParams

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID requried to load a ticket form.
          </h2>
          <BackButton title="Go Back" />
        </>
      )
    }

    // NEW ticket form

    if (customerId) {
      const customer = await getCustomer(Number(customerId))

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found.
            </h2>
            <BackButton title="Go Back" />
          </>
        )
      }

      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} is not active.
            </h2>
            <BackButton title="Go Back" />
          </>
        )
      }

      //  ticket form
      console.log(customer)
    }

    if (ticketId) {
      const ticket = await getTicket(Number(ticketId))

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found.</h2>
            <BackButton title="Go Back" />
          </>
        )
      }

      const customer = await getCustomer(Number(ticket.customerId))

      // ticket form
      console.log('ticket: ', ticket)
      console.log('customer: ', customer)
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error)
      throw error
    }
  }
}
