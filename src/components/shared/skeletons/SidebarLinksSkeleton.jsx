export function SidebarLinksSkeleton({ isCollapsed, count }) {
    return (
        <ul className="px-3 py-6 space-y-1.5 list-none">
            {Array(count)
                .fill(null)
                .map((_, index) => (
                    <li
                        key={index}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border border-transparent ${isCollapsed ? 'lg:justify-center' : ''
                            }`}
                    >
                        <div className="w-5 h-5 bg-slate-800 rounded shrink-0 animate-pulse" />
                        <div
                            className={`h-4 bg-slate-800 rounded w-2/3 animate-pulse ${isCollapsed ? 'lg:hidden' : ''
                                }`}
                        />
                    </li>
                ))}
        </ul>
    );
}