'use client';

import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';

const Footer = () => {
    const pathname = usePathname();
    const isDashboard = pathname === "/dashboard";
    const t = useTranslations('Footer');

    return (isDashboard) ? "" : (
        <footer className="bg-sky-900/15 shadow-md text-white text-center bottom-0 w-full">
            <div className="md:py-8 py-8 text-center">
                <p>2024 &copy; {t("copyright")} - Sebastian{t(",")} Michał{t(",")} Abdullah{t(",")} {t("and")} Inam</p>
            </div>
        </footer>
    );
}

export default Footer;
