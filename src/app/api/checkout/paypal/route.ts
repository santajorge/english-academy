import { NextResponse } from 'next/server'
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

    const formData = await request.formData()
    const courseId = formData.get('courseId') as string

    if (!courseId) {
      return NextResponse.json({ error: 'Missing courseId' }, { status: 400 })
    }

    // Buscar el precio REAL en la base de datos (Seguridad)
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('title, price')
      .eq('id', courseId)
      .single()

    if (courseError || !course || !course.price) {
      return NextResponse.json({ error: 'Course not found or price missing' }, { status: 404 })
    }

    const payPalRequest = new paypal.orders.OrdersCreateRequest()
    payPalRequest.prefer("return=representation")
    payPalRequest.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: courseId,
          custom_id: `${user.id}|${courseId}`, // MUY IMPORTANTE para el Webhook
          description: course.title,
          amount: {
            currency_code: 'USD',
            value: course.price.toString()
          }
        }
      ],
      application_context: {
        return_url: `${request.headers.get('origin')}/dashboard?payment=success`,
        cancel_url: `${request.headers.get('origin')}/dashboard?payment=cancel`
      }
    })

    const response = await paypalClient.execute(payPalRequest)
    
    // Find approval URL to redirect user
    const approveLink = response.result.links.find((link: any) => link.rel === 'approve')
    
    if (approveLink) {
      // Redirigir directamente a PayPal
      return NextResponse.redirect(approveLink.href, 303)
    }

    return NextResponse.json({ error: 'Approval link not found' }, { status: 500 })

  } catch (error: any) {
    console.error('Error creating PayPal order:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
