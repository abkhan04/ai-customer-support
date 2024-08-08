// 'use client';
// ---- BILL'S CODE FROM TUTORIAL ----
// import { useState, useEffect } from 'react';
// import { Box, Stack, TextField, Button } from '@mui/material';

// export default function Home() {
//     const [messages, setMessages] = useState([
//         { role: 'assistant', content: 'Welcome to Chat Support! How can I help you today?' },
//     ]);

//     const sendMessage = async (message) => {
//         setMessage('');
//         setMessages((messages) => [...messages, { role: 'user', content: message }]);
//         const response = fetch('/api/chat', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify([...messages, { role: "user", content: message }]),
//         }).then(async (res) => {
//             const reader = res.body.getReader();
//             const decoder = new TextDecoder();
//             let result = '';
//             return reader.read().then(function processText({ done, value }) {
//                 if (done) {
//                     return result;
//                 }
//                 const text = decoder.decode(value || new Uint8Array(), { stream: true });
//                 setMessages((messages) => {
//                     let lastMessage = messages[messages.length - 1];
//                     let otherMessages = messages.slice(0, messages.length - 1);

//                     return [...otherMessages,
//                     { ...lastMessage, content: lastMessage.content + text }];
//                 })

//                 return reader.read().then(processText);
//             });
//         });
//     };

//     const [message, setMessage] = useState('');
//     return (
//         <Box
//             height="100vh"
//             width="100vw"
//             display="flex"
//             flexDirection="column"
//             justifyContent="center"
//             alignItems="center"
//             bgcolor="background.default"
//         >
//             <Stack direction="column" width="500px" height="700px" border="1px solid black" padding={2} spacing={3}>
//                 <Stack spacing={2} direction="column" flexGrow={1} overflow="auto">
//                     {
//                         messages.map((message, index) => (
//                             <Box
//                                 key={index}
//                                 display="flex"
//                                 justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
//                             >
//                                 <Box
//                                     bgcolor={message.role === 'assistant' ? 'primary.main' : 'secondary.main'}
//                                     color="white"
//                                     borderRadius={16}
//                                     padding={5}
//                                 >
//                                     {message.content}
//                                 </Box>
//                             </Box>
//                         ))
//                     }
//                 </Stack>
//                 <Stack direction="row" spacing={2}>
//                     <TextField
//                         label="Type a message"
//                         fullWidth
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                     />
//                     <Button variant="contained" color="primary" onClick={sendMessage}>
//                         Send
//                     </Button>
//                 </Stack>
//             </Stack>
//         </Box>
//     )
// }
// ---- END OF BILL'S CODE ----

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
    Share,
    SquareTerminal,
    SquareUser,
    Triangle,
    Turtle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
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

export default function Dashboard() {
    return (
        <TooltipProvider>
            <div className="grid h-screen w-full pl-[56px]">
                <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
                    <div className="border-b p-2">
                        <Button variant="outline" size="icon" aria-label="Home">
                            <Triangle className="size-5 fill-foreground" />
                        </Button>
                    </div>
                    <nav className="grid gap-1 p-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-lg bg-muted"
                                    aria-label="Playground"
                                >
                                    <SquareTerminal className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Playground
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-lg"
                                    aria-label="Models"
                                >
                                    <Bot className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Models
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-lg"
                                    aria-label="API"
                                >
                                    <Code2 className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                API
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-lg"
                                    aria-label="Documentation"
                                >
                                    <Book className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Documentation
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-lg"
                                    aria-label="Settings"
                                >
                                    <Settings2 className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Settings
                            </TooltipContent>
                        </Tooltip>
                    </nav>
                    <nav className="mt-auto grid gap-1 p-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mt-auto rounded-lg"
                                    aria-label="Help"
                                >
                                    <LifeBuoy className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Help
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mt-auto rounded-lg"
                                    aria-label="Account"
                                >
                                    <SquareUser className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Account
                            </TooltipContent>
                        </Tooltip>
                    </nav>
                </aside>
                <div className="flex flex-col">
                    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                        <h1 className="text-xl font-semibold">Playground</h1>
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Settings className="size-4" />
                                    <span className="sr-only">Settings</span>
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className="max-h-[80vh]">
                                <DrawerHeader>
                                    <DrawerTitle>Configuration</DrawerTitle>
                                    <DrawerDescription>
                                        Configure the settings for the model and messages.
                                    </DrawerDescription>
                                </DrawerHeader>
                                <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                                    <fieldset className="grid gap-6 rounded-lg border p-4">
                                        <legend className="-ml-1 px-1 text-sm font-medium">
                                            Settings
                                        </legend>
                                        <div className="grid gap-3">
                                            <Label htmlFor="model">Model</Label>
                                            <Select>
                                                <SelectTrigger
                                                    id="model"
                                                    className="items-start [&_[data-description]]:hidden"
                                                >
                                                    <SelectValue placeholder="Select a model" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="genesis">
                                                        <div className="flex items-start gap-3 text-muted-foreground">
                                                            <Rabbit className="size-5" />
                                                            <div className="grid gap-0.5">
                                                                <p>
                                                                    Neural{" "}
                                                                    <span className="font-medium text-foreground">
                                                                        Genesis
                                                                    </span>
                                                                </p>
                                                                <p className="text-xs" data-description>
                                                                    Our fastest model for general use cases.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="explorer">
                                                        <div className="flex items-start gap-3 text-muted-foreground">
                                                            <Bird className="size-5" />
                                                            <div className="grid gap-0.5">
                                                                <p>
                                                                    Neural{" "}
                                                                    <span className="font-medium text-foreground">
                                                                        Explorer
                                                                    </span>
                                                                </p>
                                                                <p className="text-xs" data-description>
                                                                    Performance and speed for efficiency.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="quantum">
                                                        <div className="flex items-start gap-3 text-muted-foreground">
                                                            <Turtle className="size-5" />
                                                            <div className="grid gap-0.5">
                                                                <p>
                                                                    Neural{" "}
                                                                    <span className="font-medium text-foreground">
                                                                        Quantum
                                                                    </span>
                                                                </p>
                                                                <p className="text-xs" data-description>
                                                                    The most powerful model for complex
                                                                    computations.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="temperature">Temperature</Label>
                                            <Input id="temperature" type="number" placeholder="0.4" />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="top-p">Top P</Label>
                                            <Input id="top-p" type="number" placeholder="0.7" />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="top-k">Top K</Label>
                                            <Input id="top-k" type="number" placeholder="0.0" />
                                        </div>
                                    </fieldset>
                                    <fieldset className="grid gap-6 rounded-lg border p-4">
                                        <legend className="-ml-1 px-1 text-sm font-medium">
                                            Messages
                                        </legend>
                                        <div className="grid gap-3">
                                            <Label htmlFor="role">Role</Label>
                                            <Select defaultValue="system">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="system">System</SelectItem>
                                                    <SelectItem value="user">User</SelectItem>
                                                    <SelectItem value="assistant">Assistant</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="content">Content</Label>
                                            <Textarea id="content" placeholder="You are a..." />
                                        </div>
                                    </fieldset>
                                </form>
                            </DrawerContent>
                        </Drawer>
                        <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto gap-1.5 text-sm"
                        >
                            <Share className="size-3.5" />
                            Share
                        </Button>
                    </header>
                    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                        <div
                            className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
                        >
                            <form className="grid w-full items-start gap-6">
                                <fieldset className="grid gap-6 rounded-lg border p-4">
                                    <legend className="-ml-1 px-1 text-sm font-medium">
                                        Settings
                                    </legend>
                                    <div className="grid gap-3">
                                        <Label htmlFor="model">Model</Label>
                                        <Select>
                                            <SelectTrigger
                                                id="model"
                                                className="items-start [&_[data-description]]:hidden"
                                            >
                                                <SelectValue placeholder="Select a model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="genesis">
                                                    <div className="flex items-start gap-3 text-muted-foreground">
                                                        <Rabbit className="size-5" />
                                                        <div className="grid gap-0.5">
                                                            <p>
                                                                Neural{" "}
                                                                <span className="font-medium text-foreground">
                                                                    Genesis
                                                                </span>
                                                            </p>
                                                            <p className="text-xs" data-description>
                                                                Our fastest model for general use cases.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="explorer">
                                                    <div className="flex items-start gap-3 text-muted-foreground">
                                                        <Bird className="size-5" />
                                                        <div className="grid gap-0.5">
                                                            <p>
                                                                Neural{" "}
                                                                <span className="font-medium text-foreground">
                                                                    Explorer
                                                                </span>
                                                            </p>
                                                            <p className="text-xs" data-description>
                                                                Performance and speed for efficiency.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="quantum">
                                                    <div className="flex items-start gap-3 text-muted-foreground">
                                                        <Turtle className="size-5" />
                                                        <div className="grid gap-0.5">
                                                            <p>
                                                                Neural{" "}
                                                                <span className="font-medium text-foreground">
                                                                    Quantum
                                                                </span>
                                                            </p>
                                                            <p className="text-xs" data-description>
                                                                The most powerful model for complex computations.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="temperature">Temperature</Label>
                                        <Input id="temperature" type="number" placeholder="0.4" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="top-p">Top P</Label>
                                            <Input id="top-p" type="number" placeholder="0.7" />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="top-k">Top K</Label>
                                            <Input id="top-k" type="number" placeholder="0.0" />
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset className="grid gap-6 rounded-lg border p-4">
                                    <legend className="-ml-1 px-1 text-sm font-medium">
                                        Messages
                                    </legend>
                                    <div className="grid gap-3">
                                        <Label htmlFor="role">Role</Label>
                                        <Select defaultValue="system">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="system">System</SelectItem>
                                                <SelectItem value="user">User</SelectItem>
                                                <SelectItem value="assistant">Assistant</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="content">Content</Label>
                                        <Textarea
                                            id="content"
                                            placeholder="You are a..."
                                            className="min-h-[9.5rem]"
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                            <Badge variant="outline" className="absolute right-3 top-3">
                                Output
                            </Badge>
                            <div className="flex-1" />
                            <form
                                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
                            >
                                <Label htmlFor="message" className="sr-only">
                                    Message
                                </Label>
                                <Textarea
                                    id="message"
                                    placeholder="Type your message here..."
                                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                                />
                                <div className="flex items-center p-3 pt-0">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Paperclip className="size-4" />
                                                <span className="sr-only">Attach file</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">Attach File</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Mic className="size-4" />
                                                <span className="sr-only">Use Microphone</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">Use Microphone</TooltipContent>
                                    </Tooltip>
                                    <Button type="submit" size="sm" className="ml-auto gap-1.5">
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
    )
}
