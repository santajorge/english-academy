import { NextResponse } from 'next/server'
// @ts-expect-error - El SDK de PayPal no tiene tipos oficiales actualizados
import paypal from '@paypal/checkout-server-sdk'
import { createClient } from '@/utils/supabase/server'

// Configure environment
const Environment = process.env.NODE_ENV === 'production'
  ? paypal.core.LiveEnvironment
  : paypal.core.SandboxEnvironment

const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID!,
    process.env.PAYPAL_CLIENT_SECRET!
  )
)

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { courseId, title, price } = body

    if (!courseId || !title || !price) {
      return NextResponse.json({ error: 'Missing course details' }, { status: 400 })
    }

    // Construct a request object and set desired parameters
    const requestPaypal = new paypal.orders.OrdersCreateRequest()
    requestPaypal.prefer('return=representation')
    requestPaypal.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: courseId,
          custom_id: `${user.id}|${courseId}`, // Store user and course in custom_id
          description: title,
          amount: {
            currency_code: 'USD',
            value: Number(price).toFixed(2)
          }
        }
      ],
      application_context: {
        return_url: `${request.headers.get('origin')}/dashboard?payment=success`,
        cancel_url: `${request.headers.get('origin')}/dashboard?payment=cancelled`,
      }
    })

    // Call API with your client and get a response for your call
    const response = await paypalClient.execute(requestPaypal)

    return NextResponse.json({ 
      id: response.result.id,
      links: response.result.links
    })

  } catch (error: any) {
    console.error('Error creating PayPal order:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
