import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { createClient } from '@supabase/supabase-js' // Using vanilla supabase-js for admin bypass

// Initialize MercadoPago client
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: Request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // We need to add this to .env.local
  )
  try {
    const url = new URL(request.url)
    const action = url.searchParams.get('type') || url.searchParams.get('topic')
    const id = url.searchParams.get('data.id') || url.searchParams.get('id')

    // Only process 'payment' events
    if (action === 'payment' && id) {
      const paymentClient = new Payment(client)
      const paymentData = await paymentClient.get({ id: id })

      if (paymentData.status === 'approved') {
        const studentId = paymentData.metadata?.student_id
        const courseId = paymentData.metadata?.course_id

        if (studentId && courseId) {
          // Obtener los detalles del curso para ver si expira
          const { data: courseData } = await supabaseAdmin
            .from('courses')
            .select('duration_months')
            .eq('id', courseId)
            .single()

          let expiresAt = null
          if (courseData && courseData.duration_months) {
            const date = new Date()
            date.setMonth(date.getMonth() + courseData.duration_months)
            expiresAt = date.toISOString()
          }

          // Grant access to the course in Supabase
          const { error } = await supabaseAdmin
            .from('enrollments')
            .upsert({
              student_id: studentId,
              course_id: courseId,
              status: 'active',
              expires_at: expiresAt
            }, {
              onConflict: 'student_id,course_id'
            })

          if (error) {
            console.error('Error inserting enrollment:', error)
            return NextResponse.json({ error: 'DB insertion failed' }, { status: 500 })
          }
          console.log(`Successfully enrolled student ${studentId} to course ${courseId}`)
        }
      }
    }

    // Always return 200 OK to Mercado Pago so it stops retrying
    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 })
  }
}
