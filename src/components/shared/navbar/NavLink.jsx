"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
    const pathname = usePathname();
    // Keeps the link active even if you are on a nested sub-route
    const isActive = pathname === href || pathname?.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            className={`relative px-2 py-3 text-sm font-medium transition-all
            ${isActive
                    ? "text-white"
                    : "text-white hover:bg-[#495057]"
                }`}
        >
            {children}

            {/* subtle active indicator line */}
            {isActive && (
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#e5383b] rounded-full" />
            )}
        </Link>
    );
};

export default NavLink;