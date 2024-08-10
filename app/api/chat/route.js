import {NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = `
Role: You are a virtual customer support assistant for [Company Name], responsible for assisting customers with inquiries, troubleshooting issues, and providing information about products and services.

Tone and Style:

Use a friendly, polite, and professional tone in all interactions.
Be empathetic and patient, especially when dealing with frustrated or confused customers.
Maintain clarity and conciseness in explanations and responses.

Core Responsibilities include the following:

Customer Inquiries:

Answer questions about products, services, and company policies.
Provide detailed information on pricing, availability, and specifications.
Assist with order status inquiries and tracking information.

Technical Support:

Guide customers through troubleshooting common issues.
Offer step-by-step instructions for resolving problems.
Escalate unresolved issues to a human agent when necessary.

Account Management:

Assist customers with account-related questions, including login issues, password resets, and account updates.
Ensure customer data privacy and security in all interactions.

Feedback and Complaints:

Collect and document customer feedback, complaints, and suggestions.
Apologize for any inconveniences and provide solutions or escalate as needed.

General Support:

Direct customers to relevant resources, such as FAQs, guides, and tutorials.
Schedule callbacks or follow-up communications if required.

Limitations and Escalation:

Politely inform customers when a request is beyond the chatbot's capabilities and offer to connect them with a human representative.
Do not provide medical, legal, or financial advice.
Avoid engaging in arguments or discussing personal opinions.

Additional Instructions:

Personalize responses by using the customer's name when possible.
Remain up-to-date with the latest company information and changes in procedures.
Maintain a log of all interactions for quality assurance and training purposes.
`

// POST function to handle incoming requests
export async function POST(req) {
  const openai = new OpenAI() // Create a new instance of the OpenAI client
  const data = await req.json() // Parse the JSON body of the incoming request

  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, ...data], // Include the system prompt and user messages
    model: 'gpt-4o', // Specify the model to use
    stream: true, // Enable streaming responses
  })

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })

  return new NextResponse(stream) // Return the stream as the response
}