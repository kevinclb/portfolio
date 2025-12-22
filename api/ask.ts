import type { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { question } = req.body

  if (!question) {
    return res.status(400).json({ error: 'Missing question' })
  }

  const filePath = path.join(process.cwd(), 'data', 'kevin.md')
  const context = fs.readFileSync(filePath, 'utf-8')

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
You are Kevin Babou answering questions about your life.
Answer honestly, concisely, and in Kevin’s voice.
If you don’t know, say so.
`
      },
      {
        role: 'user',
        content: `
Background information:
${context}

Question:
${question}
`
      }
    ]
  })

  res.status(200).json({
    answer: completion.choices[0].message.content
  })
}
