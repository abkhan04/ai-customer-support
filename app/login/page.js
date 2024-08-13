'use client';

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase"; // Import the auth and googleProvider from firebase.js

export default function Login() {
    const t = useTranslations('LoginReg');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User successfully signed in!', user);
            if (user) {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Login failed: ", error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("Signed in with Google:", user);
            if (user) {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Google Login failed: ", error.message);
        }
    };

    return (
        <Card className=" mt-40 mx-auto max-w-sm shadow-xl bg-inherit border border-sky-500">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-white text-center">{t("login")}</CardTitle>
                <CardDescription className="text-sky-500 text-center">
                    {t("loginbelow")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} noValidate>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label className="text-white font-bold" htmlFor="email">{t("email")}</Label>
                            <Input
                                className="text-white hover:border-sky-500 focus:border-sky-500 focus:border-2"
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label className="text-white font-bold" htmlFor="password">{t("password")}</Label>
                            </div>
                            <Input
                                className="text-white hover:border-sky-500 focus:border-sky-500 focus:border-2"
                                id="password"
                                type="password"
                                placeholder="**********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-sky-900/15 text-white">
                            <MdOutlineMail className="mr-2 h-5 w-5" /> {t("loginemail")}
                        </Button>
                    </div>
                </form>
                <Button onClick={handleGoogleLogin} className="mt-4 w-full bg-sky-900/15 text-white">
                    <FcGoogle className="mr-2 h-5 w-5" /> {t("logingoogle")}
                </Button>
                <div className="mt-4 text-center text-sm text-white">
                    {t("noacc")}{" "}
                    <Link href="/register" className="underline hover:text-sky-500">
                        Register
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}