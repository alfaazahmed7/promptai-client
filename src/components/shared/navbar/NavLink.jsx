"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
    const pathname = usePathname();
    // Fixes the Home link trap: only check sub-routes if href isn't the root "/"
    const isActive = pathname === href || (href !== "/" && pathname?.startsWith(`${href}/`));

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

            {/* subtle active indicator line - adjusted to center perfectly below the text */}
            {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#e5383b] rounded-full" />
            )}
        </Link>
    );
};

export default NavLink;