import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { createClient } from '@/utils/supabase/server'

// Initialize MercadoPago client
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

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

    // Initialize Preference client
    const preference = new Preference(client)

    // Create preference
    const result = await preference.create({
      body: {
        items: [
          {
            id: courseId,
            title: title,
            quantity: 1,
            unit_price: Number(price),
            currency_id: 'USD', // O ARS, dependiendo de la moneda base
          }
        ],
        payer: {
          email: user.email,
        },
        metadata: {
          student_id: user.id,
          course_id: courseId,
        },
        back_urls: {
          success: `${request.headers.get('origin')}/dashboard?payment=success`,
          failure: `${request.headers.get('origin')}/dashboard?payment=failure`,
          pending: `${request.headers.get('origin')}/dashboard?payment=pending`,
        },
        auto_return: 'approved',
      }
    })

    return NextResponse.json({ init_point: result.init_point })

  } catch (error: any) {
    console.error('Error creating MP preference:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
