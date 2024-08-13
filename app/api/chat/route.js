// import { auth, firestore } from "@/firebase";
// import { getFirestore, getDocs, query, orderBy, collection, addDoc } from "firebase/firestore";
// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import { NextApiRequest, NextApiResponse } from "next";


// const systemPrompt = `
// Role: You are a virtual customer support assistant for [Company Name], responsible for assisting customers with inquiries, troubleshooting issues, and providing information about products and services.

// Tone and Style:

// Use a friendly, polite, and professional tone in all interactions.
// Be empathetic and patient, especially when dealing with frustrated or confused customers.
// Maintain clarity and conciseness in explanations and responses.

// Core Responsibilities include the following:

// Customer Inquiries:

// Answer questions about products, services, and company policies.
// Provide detailed information on pricing, availability, and specifications.
// Assist with order status inquiries and tracking information.

// Technical Support:

// Guide customers through troubleshooting common issues.
// Offer step-by-step instructions for resolving problems.
// Escalate unresolved issues to a human agent when necessary.

// Account Management:

// Assist customers with account-related questions, including login issues, password resets, and account updates.
// Ensure customer data privacy and security in all interactions.

// Feedback and Complaints:

// Collect and document customer feedback, complaints, and suggestions.
// Apologize for any inconveniences and provide solutions or escalate as needed.

// General Support:

// Direct customers to relevant resources, such as FAQs, guides, and tutorials.
// Schedule callbacks or follow-up communications if required.

// Limitations and Escalation:

// Politely inform customers when a request is beyond the chatbot's capabilities and offer to connect them with a human representative.
// Do not provide medical, legal, or financial advice.
// Avoid engaging in arguments or discussing personal opinions.

// Additional Instructions:

// Personalize responses by using the customer's name when possible.
// Remain up-to-date with the latest company information and changes in procedures.
// Maintain a log of all interactions for quality assurance and training purposes.
// `;

// async function saveMessageToFirestore(userId, message, isUser = true) {
//   try {
//     const docRef = await addDoc(collection(firestore, "chats", userId, "messages"), {
//       text: message,
//       isUser: isUser,
//       timestamp: new Date(),
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

// async function getChatHistory(userId) {
//   const messagesRef = collection(firestore, "chats", userId, "messages");
//   const q = query(messagesRef, orderBy("timestamp", "asc"));
//   const querySnapshot = await getDocs(q);

//   let chatHistory = [];
//   querySnapshot.forEach((doc) => {
//     chatHistory.push(doc.data());
//   });

//   return chatHistory;
// }

// export async function POST(req) {
//   const openai = new OpenAI();
//   const data = await req.json();

//   const user = auth.currentUser;

//   if (!user) {
//     return new NextResponse('Unauthorized', { status: 401 });
//   }

//   const userId = user.uid;

//   try {
//     const chatHistory = await getChatHistory(userId);

//     const completion = await openai.chat.completions.create({
//       messages: [
//         { role: 'system', content: systemPrompt },
//         ...chatHistory.map((msg) => ({ role: msg.isUser ? 'user' : 'assistant', content: msg.text })),
//         { role: 'user', content: data.message }
//       ],
//       model: 'gpt-4',
//       stream: true,
//     });

//     await saveMessageToFirestore(userId, data.message);

//     const stream = new ReadableStream({
//       async start(controller) {
//         const encoder = new TextEncoder();
//         let assistantMessage = '';
//         try {
//           for await (const chunk of completion) {
//             const content = chunk.choices[0]?.delta?.content;
//             if (content) {
//               assistantMessage += content;
//               const text = encoder.encode(content);
//               controller.enqueue(text);
//             }
//           }
//         } catch (err) {
//           controller.error(err);
//         } finally {
//           await saveMessageToFirestore(userId, assistantMessage, false);
//           controller.close();
//         }
//       },
//     });

//     return new NextResponse(stream);

//   } catch (error) {
//     console.error("Error handling request:", error);
//     return new NextResponse('Unauthorized', { status: 401 });
//   }
// }

// async function saveMessageToFirestore(userId, message, isUser = true) {
//   try {
//     await addDoc(collection(firestore, "chats", userId, "messages"), {
//       text: message,
//       isUser: isUser,
//       timestamp: new Date(),
//     });
//   } catch (error) {
//     console.error("Error adding document:", error);
//   }
// }

// async function getChatHistory(userId) {
//   const messagesRef = collection(firestore, "chats", userId, "messages");
//   const q = query(messagesRef, orderBy("timestamp", "asc"));
//   const querySnapshot = await getDocs(q);

//   let chatHistory = [];
//   querySnapshot.forEach((doc) => {
//     chatHistory.push(doc.data());
//   });

//   return chatHistory;
// }

// export async function POST(req) {
//   const { message, uid } = await req.json(); // Expecting UID and message in the body

//   if (!uid) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//     const chatHistory = await getChatHistory(uid);

//     const completion = await openai.chat.completions.create({
//       model: 'gpt-4',
//       messages: [
//         { role: 'system', content: 'You are a helpful assistant.' },
//         ...chatHistory.map((msg) => ({ role: msg.isUser ? 'user' : 'assistant', content: msg.text })),
//         { role: 'user', content: message }
//       ],
//       stream: true,
//     });

//     await saveMessageToFirestore(uid, message);

//     const stream = new ReadableStream({
//       async start(controller) {
//         const encoder = new TextEncoder();
//         let assistantMessage = '';

//         for await (const chunk of completion) {
//           const content = chunk.choices[0]?.delta?.content;
//           if (content) {
//             assistantMessage += content;
//             const text = encoder.encode(content);
//             controller.enqueue(text);
//           }
//         }

//         await saveMessageToFirestore(uid, assistantMessage, false);
//         controller.close();
//       },
//     });

//     return new NextResponse(stream);

//   } catch (error) {
//     console.error("Error handling request:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { firestore } from "@/firebase";
import { getDocs, query, orderBy, collection, doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import OpenAI from "openai";

async function saveMessageToFirestore(userId, chatId, message, isUser = true) {
  try {
    const messageId = `message-${Date.now()}`;

    // Using `setDoc` instead of `addDoc` to ensure we have a deterministic messageId
    const docRef = doc(firestore, "users", userId, "chats", chatId, "messages", messageId);

    await setDoc(docRef, {
      content: message,
      isUser: isUser,
      timestamp: new Date(),
    });

    // Update the last updated timestamp of the chat
    const chatDocRef = doc(firestore, 'users', userId, 'chats', chatId);
    await setDoc(chatDocRef, {
      lastUpdated: new Date(),
    }, { merge: true });

  } catch (error) {
    console.error("Error adding document:", error);
  }
}

async function getChatHistory(userId, chatId) {
  try {
    const messagesRef = collection(firestore, "users", userId, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const querySnapshot = await getDocs(q);

    let chatHistory = [];
    querySnapshot.forEach((doc) => {
      chatHistory.push(doc.data());
    });

    return chatHistory;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
}

export async function POST(req) {
  const { message, uid, chatId } = await req.json(); // Expecting UID, chatId, and message in the body

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const chatHistory = await getChatHistory(uid, chatId);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...chatHistory.map((msg) => ({ role: msg.isUser ? 'user' : 'assistant', content: msg.text })),
        { role: 'user', content: message }
      ],
      stream: true,
    });

    // Save the user's message to Firestore
    await saveMessageToFirestore(uid, chatId, message);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        let assistantMessage = '';

        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              const text = encoder.encode(content);
              controller.enqueue(text);
            }
          }
        } catch (error) {
          console.error("Error during streaming response:", error);
          controller.error(error);
        } finally {
          // Save the assistant's message to Firestore
          await saveMessageToFirestore(uid, chatId, assistantMessage, false);
          controller.close();
        }
      },
    });

    return new NextResponse(stream);

  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}