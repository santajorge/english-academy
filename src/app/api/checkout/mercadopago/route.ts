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

    const formData = await request.formData()
    const courseId = formData.get('courseId') as string

    if (!courseId) {
      return NextResponse.json({ error: 'Missing courseId' }, { status: 400 })
    }

    // Buscar el precio REAL en la base de datos (Seguridad)
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('title, price_ars')
      .eq('id', courseId)
      .single()

    if (courseError || !course || !course.price_ars) {
      return NextResponse.json({ error: 'Course not found or price missing' }, { status: 404 })
    }

    // Initialize Preference client
    const preference = new Preference(client)

    // Create preference
    const result = await preference.create({
      body: {
        items: [
          {
            id: courseId,
            title: course.title,
            quantity: 1,
            unit_price: Number(course.price_ars),
            currency_id: 'ARS',
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

    // Redirigir directamente al link de pago
    return NextResponse.redirect(result.init_point!, 303)

  } catch (error: any) {
    console.error('Error creating MP preference:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
