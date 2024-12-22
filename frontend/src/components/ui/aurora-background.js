"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils.js";
export const AuroraBackground = ({ className, children, showRadialGradient = true, ...props }) => {
    return (_jsx("main", { children: _jsxs("div", { className: cn("relative flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg", className), ...props, children: [_jsx("div", { className: "absolute inset-0 overflow-hidden", children: _jsx("div", { className: cn(`
            [--white-gradient:repeating-linear-gradient(100deg,var(--transparent)_0%,var(--transparent)_10%,var(--green-700)_15%,var(--green-500)_20%,var(--yellow-400)_30%)]
            [--dark-gradient:repeating-linear-gradient(120deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--money-aurora:repeating-linear-gradient(400deg,var(--green-700)_10%,var(--green-500)_15%,var(--yellow-400)_20%,var(--green-500)_25%,var(--yellow-300)_30%)]
            [background-image:var(--white-gradient),var(--money-aurora)]
            dark:[background-image:var(--dark-gradient),var(--money-aurora)]
            [background-size:400%,_300%,100%]
            [background-position:50%_50%,50%_50%,50%_50%]
            filter blur-[5px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--money-aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--money-aurora)]
            after:[background-size:400%,_300%,100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute inset-0 opacity-60 will-change-transform`, showRadialGradient &&
                            `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`) }) }), children] }) }));
};
