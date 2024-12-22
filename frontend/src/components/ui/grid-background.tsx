import { useLocation } from "react-router-dom";

const GridBackground = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const location = useLocation();
    const excludedPaths = ["/login", "/signup", "/", "/transaction/:id"];
    const is404Page = !excludedPaths.some((path) => location.pathname.match(new RegExp(`^${path.replace(/:[^\s/]+/g, "[^/]+")}$`)));

    return is404Page ? (
        <div className="w-full bg-white relative">
            {children}
        </div>
    ) : (
        <div className="w-full dark:bg-slate-900 bg-slate-100 dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative">
            <div className="absolute pointer-events-none flex items-center justify-center dark:bg-slate-800 bg-slate-200 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]"></div>
            {children}
        </div>
    );
};

export default GridBackground;
