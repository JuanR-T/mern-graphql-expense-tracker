import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation } from "react-router-dom";
const GridBackground = ({ children, }) => {
    const location = useLocation();
    const excludedPaths = ["/login", "/signup", "/", "/transaction/:id"];
    const is404Page = !excludedPaths.some((path) => location.pathname.match(new RegExp(`^${path.replace(/:[^\s/]+/g, "[^/]+")}$`)));
    return is404Page ? (_jsx("div", { className: "w-full bg-white relative", children: children })) : (_jsxs("div", { className: "w-full dark:bg-slate-900 bg-slate-100 dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative", children: [_jsx("div", { className: "absolute pointer-events-none flex items-center justify-center dark:bg-slate-800 bg-slate-200 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]" }), children] }));
};
export default GridBackground;
