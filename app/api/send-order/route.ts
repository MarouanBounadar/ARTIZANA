import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()

  const { name, email, address, itemsList, total } = body

  try {
    const data = await resend.emails.send({
      from: 'farfromfaiil@gmail.com', // your verified Resend sender
      to: 'bounadarmarwane@gmail.com',      // where you want to receive orders
      subject: `New Order from ${name}`,
      html: `
        <h2>New Order</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Items:</strong><br>${itemsList}</p>
        <p><strong>Total:</strong> ${total} MAD</p>
      `,
    })

    return NextResponse.json({ status: 'sent', data })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}