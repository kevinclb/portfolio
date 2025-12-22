import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Your email address where messages will be sent
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'kevin@example.com'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, senderEmail, message } = req.body

  if (!name || !senderEmail || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, senderEmail, message' })
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(senderEmail)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: RECIPIENT_EMAIL,
      replyTo: senderEmail,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${senderEmail}">${senderEmail}</a></p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}

