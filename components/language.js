// 'use client';

// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';

// export default function LanguageSwitcher() {
//     const router = useRouter();

//     const changeLanguage = (locale) => {
//         Cookies.set('locale', locale, { expires: 365 });
//         router.refresh(); // Refresh the page to apply the new language
//     };

//     return (
//         <div className="flex space-x-4">
//             <button onClick={() => changeLanguage('en')} className="hover:underline">
//                 English
//             </button>
//             <button onClick={() => changeLanguage('pl')} className="hover:underline">
//                 Polski
//             </button>
//             <button onClick={() => changeLanguage('fr')} className="hover:underline">
//                 Français
//             </button>
//             <button onClick={() => changeLanguage('es')} className="hover:underline">
//                 Español
//             </button>
//             <button onClick={() => changeLanguage('cn')} className="hover:underline">
//                 Mandarin
//             </button>
//             <button onClick={() => changeLanguage('in')} className="hover:underline">
//                 Hindi
//             </button>
//             <button onClick={() => changeLanguage('sa')} className="hover:underline">
//                 Arabic
//             </button>
//         </div>
//     );
// }

"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const languages = [
    {
        value: "en",
        label: "English",
        locale: "en",
    },
    {
        value: "fr",
        label: "French",
        locale: "fr",
    },
    {
        value: "es",
        label: "Spanish",
        locale: "es",
    },
    {
        value: "pl",
        label: "Polish",
        locale: "pl",
    },
    {
        value: "cn",
        label: "Chinese",
        locale: "cn",
    },
    {
        value: "in",
        label: "Hindi",
        locale: "in",
    },
    {
        value: "sa",
        label: "Arabic",
        locale: "sa",
    },
]

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LanguageSwitcher() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(Cookies.get('locale') || "en");
    const router = useRouter();

    const changeLanguage = (locale) => {
        Cookies.set('locale', locale, { expires: 365 });
        router.refresh(); // Refresh the page to apply the new language
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="default"
                    role="combobox"
                    aria-expanded={open}
                    size="sm"
                    className="w-[100px] text-white font-bold border-2 rounded-full hover:text-sky-500 hover:shadow-none shadow-none"
                >
                    {value
                        ? languages.find((language) => language.value === value)?.label
                        : "Select language..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-75" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[120px] p-0 bg-background">
                <Command className="bg-inherit">
                    <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                            {languages.map((language) => (
                                <CommandItem
                                    key={language.value}
                                    value={language.value}
                                    onSelect={() => {
                                        setValue(language.locale);
                                        changeLanguage(language.locale);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === language.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {language.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}