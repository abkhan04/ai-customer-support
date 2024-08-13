// 'use client';

// import { useTranslations } from 'next-intl';
// import { useState, useEffect } from 'react';
// import {
//     Bird,
//     Book,
//     Bot,
//     Code2,
//     CornerDownLeft,
//     LifeBuoy,
//     Mic,
//     Paperclip,
//     Rabbit,
//     Settings,
//     Settings2,
//     Share,
//     SquareTerminal,
//     SquareUser,
//     Triangle,
//     Turtle,
// } from "lucide-react"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//     Drawer,
//     DrawerContent,
//     DrawerDescription,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "@/components/ui/drawer"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipTrigger,
//     TooltipProvider,
// } from "@/components/ui/tooltip"

// import { RiRobot2Line } from "react-icons/ri";
// import Link from "next/link";

// import { auth, firestore } from "@/firebase";
// import { getDocs, collection, orderBy, query } from "firebase/firestore";

// export default function Dashboard() {
//     const t = useTranslations("Dashboard");
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([
//         { role: 'assistant', content: t("welcome") },
//     ]);
//     const [recentChats, setRecentChats] = useState([]);
//     const user = auth.currentUser;

//     useEffect(() => {
//         if (user) {
//             loadChatHistory(user.uid);
//             loadRecentChats(user.uid);
//         }
//     }, [user]);

//     const loadChatHistory = async (uid) => {
//         const messagesRef = collection(firestore, "chats", uid, "messages");
//         const q = query(messagesRef, orderBy("timestamp", "asc"));
//         const querySnapshot = await getDocs(q);

//         const chatHistory = [];
//         querySnapshot.forEach((doc) => {
//             chatHistory.push(doc.data());
//         });

//         setMessages(chatHistory);
//     };

//     const loadRecentChats = async (uid) => {
//         const messagesRef = collection(firestore, "chats", uid, "messages");
//         const q = query(messagesRef, orderBy("timestamp", "desc"));
//         const querySnapshot = await getDocs(q);

//         const recent = [];
//         querySnapshot.forEach((doc) => {
//             const data = doc.data();
//             recent.push({ text: data.text, timestamp: data.timestamp.toDate(), isUser: data.isUser });
//         });

//         setRecentChats(recent);
//     };

// const sendMessage = async (message) => {
//     setMessage('');
//     setMessages((messages) => [...messages, { role: 'user', content: message }]);

//     try {
//         const user = auth.currentUser;
//         if (user) {
//             const token = await user.getIdToken(true); // Ensure token is refreshed
//             console.log("Token retrieved:", token); // Debugging log to check token
//             const response = await fetch('/api/chat', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
//                 },
//                 body: JSON.stringify({ message }),
//             });

//             if (!response.ok) {
//                 console.error("Failed to send message. Status:", response.status);
//             }

//             const reader = response.body.getReader();
//             const decoder = new TextDecoder();
//             let result = '';

//             const readChunk = async ({ done, value }) => {
//                 if (done) {
//                     return result;
//                 }

//                 const text = decoder.decode(value || new Uint8Array(), { stream: true });
//                 result += text;
//                 setMessages((messages) => {
//                     const lastMessage = messages[messages.length - 1];
//                     const otherMessages = messages.slice(0, messages.length - 1);
//                     return [...otherMessages, { ...lastMessage, content: lastMessage.content + text }];
//                 });

//                 return reader.read().then(readChunk);
//             };

//             reader.read().then(readChunk);
//         } else {
//             console.error("User is not authenticated.");
//         }

//     } catch (error) {
//         console.error("Error sending message:", error);
//     }
// };

//     const sendMessage = async () => {
//         if (user) {
//             const response = await fetch('/api/chat', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     message: message,
//                     uid: user.uid
//                 }),
//             });

//             const reader = response.body.getReader();
//             const decoder = new TextDecoder();
//             let assistantMessage = '';

//             while (true) {
//                 const { value, done } = await reader.read();
//                 if (done) break;

//                 const chunk = decoder.decode(value);
//                 assistantMessage += chunk;

//                 setMessages((prevMessages) => {
//                     const lastMessage = prevMessages[prevMessages.length - 1];
//                     const updatedMessages = [...prevMessages];

//                     if (lastMessage && lastMessage.role === "assistant") {
//                         updatedMessages[updatedMessages.length - 1].text += chunk;
//                     } else {
//                         updatedMessages.push({ text: chunk, isUser: false });
//                     }

//                     return updatedMessages;
//                 });
//             }

//             setMessage(""); // Clear input field
//             loadRecentChats(user.uid);
//         }
//     };

//     return (
//         <TooltipProvider>
//             <div className="grid h-screen w-full pl-[56px]">
//                 <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r-2">
//                     <div className="border-b-2 p-2">
//                         <Button size="icon" aria-label="Home" className="border-0 shadow-none hover:shadow-none">
//                             <Link href="/"><RiRobot2Line className="size-7 text-sky-500" /></Link>
//                         </Button>
//                     </div>
//                     <nav className="grid gap-1 p-2">
//                         <Tooltip>
//                             <TooltipTrigger asChild>
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="rounded-lg"
//                                     aria-label="API"
//                                 >
//                                     <Code2 className="size-5" />
//                                 </Button>
//                             </TooltipTrigger>
//                             <TooltipContent side="right" sideOffset={5}>
//                                 {t("api")}
//                             </TooltipContent>
//                         </Tooltip>
//                         <Tooltip>
//                             <TooltipTrigger asChild>
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="rounded-lg"
//                                     aria-label="Documentation"
//                                 >
//                                     <Book className="size-5" />
//                                 </Button>
//                             </TooltipTrigger>
//                             <TooltipContent side="right" sideOffset={5}>
//                                 {t("docu")}
//                             </TooltipContent>
//                         </Tooltip>
//                         <Tooltip>
//                             <TooltipTrigger asChild>
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="rounded-lg"
//                                     aria-label="Settings"
//                                 >
//                                     <Settings2 className="size-5" />
//                                 </Button>
//                             </TooltipTrigger>
//                             <TooltipContent side="right" sideOffset={5}>
//                                 {t("settings")}
//                             </TooltipContent>
//                         </Tooltip>
//                     </nav>
//                     <nav className="mt-auto grid gap-1 p-2">
//                         <Tooltip>
//                             <TooltipTrigger asChild>
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="mt-auto rounded-lg"
//                                     aria-label="Help"
//                                 >
//                                     <LifeBuoy className="size-5" />
//                                 </Button>
//                             </TooltipTrigger>
//                             <TooltipContent side="right" sideOffset={5}>
//                                 {t("help")}
//                             </TooltipContent>
//                         </Tooltip>
//                         <Tooltip>
//                             <TooltipTrigger asChild>
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="mt-auto rounded-lg"
//                                     aria-label="Account"
//                                 >
//                                     <SquareUser className="size-5" />
//                                 </Button>
//                             </TooltipTrigger>
//                             <TooltipContent side="right" sideOffset={5}>
//                                 {t("account")}
//                             </TooltipContent>
//                         </Tooltip>
//                     </nav>
//                 </aside>
//                 <div className="flex flex-col">
//                     <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b-2 bg-background px-4">
//                         <h1 className="text-xl font-semibold">{t("support")}</h1>
//                         <Drawer>
//                             <DrawerTrigger asChild>
//                                 <Button variant="ghost" size="icon" className="md:hidden">
//                                     <Settings2 className="size-4" />
//                                     <span className="sr-only">{t("settings")}</span>
//                                 </Button>
//                             </DrawerTrigger>
//                             <DrawerContent className="max-h-[80vh]">
//                                 <DrawerHeader>
//                                     <DrawerTitle>Configuration</DrawerTitle>
//                                 </DrawerHeader>
//                             </DrawerContent>
//                         </Drawer>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="ml-auto gap-1.5 text-sm border-2 shadow-none"
//                         >
//                             <Share className="size-3.5" />
//                             Share
//                         </Button>
//                     </header>
//                     <main className="flex items-center justify-center flex-1 overflow-auto p-4">
//                         <div className="relative flex h-full w-full max-w-4xl min-h-[50vh] flex-col rounded-xl bg-inherit p-4 border-2 border-sky-500 shadow-xl">
//                             <Badge variant="outline" className="absolute right-3 top-3 border-2 border-sky-500 bg-sky-900/15">
//                                 Output
//                             </Badge>
//                             <div className="flex-1 overflow-auto">
//                                 {messages.map((message, index) => (
//                                     <div key={index} className={`message ${message.isUser ? 'user' : 'assistant'}`}>
//                                         {message.text}
//                                     </div>
//                                 ))}
//                             </div>
//                             <form
//                                 onSubmit={(e) => { e.preventDefault(); sendMessage(message); }}
//                                 className="relative overflow-hidden rounded-lg border-2 border-white bg-inherit focus-within:border-2 focus-within:border-sky-500"
//                             >
//                                 <Label htmlFor="message" className="sr-only text-white">
//                                     Message
//                                 </Label>
//                                 <Textarea
//                                     id="message"
//                                     value={message}
//                                     onChange={(e) => setMessage(e.target.value)}
//                                     placeholder="Type your message here..."
//                                     className="min-h-12 resize-none border-0 bg-inherit p-3 focus-visible:ring-0"
//                                 />
//                                 <div className="flex items-center p-3 pt-0">
//                                     <Tooltip>
//                                         <TooltipTrigger asChild>
//                                             <Button className="text-white bg-sky-900/15 border-2 rounded-full border-sky-500" variant="ghost" size="icon">
//                                                 <Paperclip className="size-4" />
//                                                 <span className="sr-only">Attach file</span>
//                                             </Button>
//                                         </TooltipTrigger>
//                                         <TooltipContent side="right">Attach File</TooltipContent>
//                                     </Tooltip>
//                                     <Button type="submit" size="sm" variant="ghost" className="ml-auto gap-1.5 text-white font-bold shadow-none border-2 rounded-full bg-sky-900/15 border-sky-500 hover:shadow-none">
//                                         Send Message
//                                         <CornerDownLeft className="size-3.5" />
//                                     </Button>
//                                 </div>
//                             </form>
//                         </div>
//                     </main>
//                     {/* Recent Conversations */}
//                     <aside className="p-4 border-t-2">
//                         <h2 className="text-lg font-semibold">Recent Conversations</h2>
//                         <div className="flex flex-col space-y-2 mt-2">
//                             <ul>
//                                 {recentChats.map((chat, index) => (
//                                     <li key={index} className={chat.isUser ? 'user' : 'assistant'}>
//                                         {chat.text} <br />
//                                         <small>{chat.timestamp.toLocaleString()}</small>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </aside>
//                 </div>
//             </div>
//         </TooltipProvider>
//     )
// }

'use client';

import {
    Bird,
    Book,
    Bot,
    Code2,
    CornerDownLeft,
    LifeBuoy,
    Mic,
    Paperclip,
    Rabbit,
    Settings,
    Settings2,
    MessageSquarePlus,
    Share,
    SquareTerminal,
    SquareUser,
    Triangle,
    Turtle,
} from "lucide-react";
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip"
import { RiRobot2Line } from "react-icons/ri";
import Link from "next/link";
import { auth, firestore } from "@/firebase";
import { getDocs, collection, orderBy, query, doc, setDoc, addDoc, limit } from "firebase/firestore";
import { signOut } from "firebase/auth";

import ReactMarkdown from 'react-markdown';
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const t = useTranslations("Dashboard");
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [recentChats, setRecentChats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const user = auth.currentUser;
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            console.error("User not authenticated.");
            return;
        }
        loadRecentChats(user.uid);
    }, [user]);

    const loadChatHistory = async (uid, chatId) => {
        try {
            const messagesRef = collection(firestore, "users", uid, "chats", chatId, "messages");
            const q = query(messagesRef, orderBy("timestamp", "asc"));
            const querySnapshot = await getDocs(q);
            const chatHistory = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                chatHistory.push(doc.data());
            });
            setMessages(chatHistory);
            console.log("Chat history loaded:", chatHistory);
        } catch (error) {
            console.error("Error loading chat history:", error);
        }
    };

    const loadRecentChats = async (uid) => {
        try {
            const chatsRef = collection(firestore, "users", uid, "chats");
            const q = query(chatsRef, orderBy("lastUpdated", "desc"), limit(12));
            const querySnapshot = await getDocs(q);
            const recent = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                recent.push({ chatId: doc.id, ...data });
            });
            setRecentChats(recent);

            // Automatically select the most recent chat
            if (recent.length > 0 && !selectedChatId) {
                selectChat(recent[0].chatId);
            }
        } catch (error) {
            console.error("Error loading recent chats:", error);
        }
    };

    const createNewChat = async () => {
        if (!user) return;

        try {
            const chatRef = collection(firestore, 'users', user.uid, 'chats');
            const newChatRef = await addDoc(chatRef, {
                created: new Date(),
                lastUpdated: new Date(),
                title: `Chat ${new Date().toLocaleString()}`,
            });

            setSelectedChatId(newChatRef.id);
            setMessages([]);
        } catch (error) {
            console.error("Error creating new chat:", error);
        }
    };

    const selectChat = async (chatId) => {
        console.log(`Selected Chat ID: ${chatId}`);
        setSelectedChatId(chatId);
        if (user) {
            await loadChatHistory(user.uid, chatId);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!user || !selectedChatId) return;

        try {
            const messageId = `message-${Date.now()}`;
            const docRef = doc(collection(firestore, 'users', user.uid, 'chats', selectedChatId, 'messages'), messageId);

            // Add the user's message to Firestore
            await setDoc(docRef, {
                content: message,
                isUser: true,
                timestamp: new Date(),
            });

            // Update the last updated timestamp of the chat
            const chatDocRef = doc(firestore, 'users', user.uid, 'chats', selectedChatId);
            await setDoc(chatDocRef, {
                lastUpdated: new Date(),
            }, { merge: true });

            // Clear input field and update messages
            setMessage('');
            setMessages((prev) => [...prev, { role: 'user', content: message }]);

            // Send the message to the AI and get the response
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, uid: user.uid, chatId: selectedChatId }),
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                assistantMessage += chunk;

                // Update state only once the message is fully received
                setMessages((prevMessages) => {
                    const lastMessage = prevMessages[prevMessages.length - 1];
                    const updatedMessages = [...prevMessages];

                    if (lastMessage && lastMessage.role === "assistant") {
                        updatedMessages[updatedMessages.length - 1].content = assistantMessage.trim();
                    } else {
                        updatedMessages.push({ role: 'assistant', content: chunk });
                    }
                    return updatedMessages;
                });
            }

            // Store the assistant's message in Firestore
            const responseMessageId = `response-${Date.now()}`;
            await setDoc(doc(collection(firestore, 'users', user.uid, 'chats', selectedChatId, 'messages'), responseMessageId), {
                content: assistantMessage,
                isUser: false,
                timestamp: new Date(),
            });

            // Update the last updated timestamp of the chat
            await setDoc(chatDocRef, {
                lastUpdated: new Date(),
            }, { merge: true });

            loadRecentChats(user.uid);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    function handleSignOut() {
        signOut(auth).then(() => {
            router.push('/');
        }).catch((error) => {
            // An error happened.
            console.error("Error signing out: ", error);
        });
    }

    return (
        <TooltipProvider>
            <div className="grid h-screen w-full pl-[56px]">
                <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r-2">
                    <div className="border-b-2 p-2">
                        <Button size="icon" aria-label="Home" className="border-0 shadow-none hover:shadow-none">
                            <Link href="/"><RiRobot2Line className="size-7 text-sky-500" /></Link>
                        </Button>
                    </div>
                    <nav className="grid gap-1 p-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-lg" aria-label="API">
                                    <Code2 className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                {t("api")}
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Documentation">
                                    <Book className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                {t("docu")}
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Settings">
                                    <Settings2 className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                {t("settings")}
                            </TooltipContent>
                        </Tooltip>
                    </nav>
                    <nav className="mt-auto grid gap-1 p-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Help">
                                    <LifeBuoy className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                {t("help")}
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Account">
                                    <SquareUser className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                <Button
                                    onClick={handleSignOut}
                                    size="md"
                                    className="hover:shadow-none shadow-none"
                                >
                                    Sign Out
                                </Button>
                            </TooltipContent>
                        </Tooltip>
                    </nav>
                </aside>
                <div className="flex flex-col">
                    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b-2 bg-background px-4">
                        <h1 className="text-xl font-semibold">{t("support")}</h1>
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Settings2 className="size-4" />
                                    <span className="sr-only">{t("settings")}</span>
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className="max-h-[80vh]">
                                <DrawerHeader>
                                    <DrawerTitle>Configuration</DrawerTitle>
                                </DrawerHeader>
                            </DrawerContent>
                        </Drawer>
                        <Button variant="outline" size="sm" onClick={createNewChat} className="ml-auto gap-1.5 text-sm border-2 shadow-none">
                            <MessageSquarePlus className="size-3.5" />
                            New Chat
                        </Button>
                    </header>
                    <main className="grid flex-1 gap-8 flex-grow overflow-auto p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div
                            className="relative flex flex-col items-start gap-8"
                        >
                            <div className="relative flex h-full max-w-[xl] max-w-4xl min-h-[50vh] flex-col rounded-xl bg-inherit p-4 border-2 border-sky-500 shadow-xl">
                                <Badge variant="outline" className="absolute right-3 top-3 border-2 border-sky-500 bg-sky-900/15">
                                    Recent
                                </Badge>
                                <ul className="mt-7">
                                    {recentChats.map((chat, index) => (
                                        <li
                                            key={index}
                                            className={`p-2 text-white rounded-lg mb-2 cursor-pointer ${chat.chatId === selectedChatId ? 'bg-sky-900/45' : 'bg-sky-900/15'}`}
                                            onClick={() => selectChat(chat.chatId)}
                                        >
                                            {chat.title} <br />
                                            <small className="text-white">{chat.lastUpdated.toDate().toLocaleString()}</small>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="relative flex h-full w-full max-w-4xl min-h-[50vh] flex-col rounded-xl bg-inherit p-4 border-2 border-sky-500 shadow-xl">
                            <Badge variant="outline" className="absolute right-3 top-3 border-2 border-sky-500 bg-sky-900/15">
                                Output
                            </Badge>
                            <div className="flex-1 overflow-y-auto space-y-4">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 mt-7 rounded-lg ${message.role === "user" ? 'bg-sky-500 text-white self-end' : 'bg-sky-900/15 text-white self-start'}`}
                                    >
                                        <ReactMarkdown>{message.content}</ReactMarkdown>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={sendMessage} className="mt-4 relative overflow-hidden rounded-lg border-2 border-white bg-inherit focus-within:border-2 focus-within:border-sky-500">
                                <Label htmlFor="message" className="sr-only text-white">
                                    Message
                                </Label>
                                <Textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message here..."
                                    className="min-h-12 resize-none border-0 bg-inherit p-3 focus-visible:ring-0"
                                />
                                <div className="flex items-center p-3 pt-0">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button className="text-white bg-sky-900/15 border-2 rounded-full border-sky-500" variant="ghost" size="icon">
                                                <Paperclip className="size-4" />
                                                <span className="sr-only">Attach file</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">Attach File</TooltipContent>
                                    </Tooltip>
                                    <Button type="submit" size="sm" variant="ghost" className="ml-auto gap-1.5 text-white font-bold shadow-none border-2 rounded-full bg-sky-900/15 border-sky-500 hover:shadow-none">
                                        Send Message
                                        <CornerDownLeft className="size-3.5" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </TooltipProvider>
    );
}