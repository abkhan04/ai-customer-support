'use client';

import { usePathname } from "next/navigation";

const Footer = () => {
	const pathname = usePathname();
    const isDashboard = pathname === "/dashboard";

    return (isDashboard) ? "" : (
        <footer className="bg-sky-900/15 shadow-md text-white text-center bottom-0 w-full">
            <div className="md:py-8 py-8 text-center">
                <p>&copy; 2024 - Built by Sebastian, Michal, Abdullah, and Inam</p>
            </div>
        </footer>
    );
}

export default Footer;