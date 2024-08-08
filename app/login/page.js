import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
    return (
        <Card className=" mt-40 mx-auto max-w-sm shadow-xl bg-inherit border border-sky-500">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-white text-center">Login</CardTitle>
                <CardDescription className="text-sky-500 text-center">
                    Login below with your account details
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label className="text-white font-bold" htmlFor="email">Email</Label>
                        <Input
                            className="text-white hover:border-sky-500 focus:border-sky-500 focus:border-2"
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label className="text-white font-bold" htmlFor="password">Password</Label>
                        </div>
                        <Input className="text-white hover:border-sky-500 focus:border-sky-500 focus:border-2" id="password" type="password" placeholder="**********" required />
                    </div>
                    <Button type="submit" className="w-full bg-sky-900/15 text-white">
                        <MdOutlineMail className="mr-2 h-5 w-5" /> Login with Email
                    </Button>
                    <Button className="w-full bg-sky-900/15 text-white">
                        <FcGoogle className="mr-2 h-5 w-5" /> Login with Google
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm text-white">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="underline hover:text-sky-500">
                        Register
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
