'use client';

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { useTranslations } from 'next-intl';
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase"; // Import the auth and googleProvider from firebase.js

export default function Register() {
    const t = useTranslations('LoginReg');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Registered user:", user);
            if (user) {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Registration failed: ", error.message);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("Registered with Google:", user);
            if (user) {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Google Registration failed: ", error.message);
        }
    };

    return (
        <Card className=" mt-40 mx-auto max-w-sm shadow-xl bg-inherit border border-sky-500">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-white text-center">{t("register")}</CardTitle>
                <CardDescription className="text-sky-500 text-center">
                    {t("enterinfo")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleRegister} noValidate>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label className="text-white font-bold" htmlFor="first-name">{t("fname")}</Label>
                                <Input
                                    className="text-white hover:border-sky-500 focus:border-sky-500 focus:border-2"
                                    id="first-name"
                                    placeholder="Mark"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-white font-bold" htmlFor="last-name">{t("lname")}</Label>
                                <Input
                                    className="text-white hover:border-sky-500 focus:border-sky-500 focus:border-2"
                                    id="last-name"
                                    placeholder="Zuckerberg"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
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
                                <MdOutlineMail className="mr-2 h-5 w-5" /> {t("regemail")}
                            </Button>
                        </div>
                    </div>
                </form>
                <Button onClick={handleGoogleRegister} className="mt-4 w-full bg-sky-900/15 text-white">
                    <FcGoogle className="mr-2 h-5 w-5" /> {t("reggoogle")}
                </Button>
                <div className="mt-4 text-center text-sm text-white">
                    {t("haveacc")}{" "}
                    <Link href="/login" className="underline hover:text-sky-500">
                        {t("login")}
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}