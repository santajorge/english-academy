import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase Admin Client (to bypass RLS for server-side insertions)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // En producción deberías verificar la firma del webhook con PayPal
    // usando la API de verificación de webhooks de PayPal.
    
    const eventType = body.event_type

    // Escuchamos el evento de orden completada
    if (eventType === 'CHECKOUT.ORDER.APPROVED' || eventType === 'PAYMENT.CAPTURE.COMPLETED') {
      
      const resource = body.resource
      
      // En nuestra request original metimos studentId y courseId separados por '|' en custom_id
      // Dependiendo de si es order o capture, custom_id está en purchase_units[0]
      let customId = ''
      
      if (resource.purchase_units && resource.purchase_units.length > 0) {
         customId = resource.purchase_units[0].custom_id
      } else if (resource.custom_id) {
         customId = resource.custom_id
      }

      if (customId) {
        const [studentId, courseId] = customId.split('|')

        if (studentId && courseId) {
          // Matricular al estudiante
          const { error } = await supabaseAdmin
            .from('enrollments')
            .upsert({
              student_id: studentId,
              course_id: courseId,
              status: 'active'
            }, {
              onConflict: 'student_id,course_id'
            })

          if (error) {
            console.error('Error inserting PayPal enrollment:', error)
            return NextResponse.json({ error: 'DB insertion failed' }, { status: 500 })
          }
          
          console.log(`Successfully enrolled student ${studentId} to course ${courseId} via PayPal`)
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error: any) {
    console.error('PayPal Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 })
  }
}
