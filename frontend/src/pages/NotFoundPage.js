import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const NotFound = () => {
    return (_jsx("section", { children: _jsx("div", { className: 'h-screen w-auto flex', children: _jsxs("div", { className: 'h-full w-full m-auto text-center', children: [_jsx("div", { className: "justify-center flex h-4/5 w-auto", children: _jsx("img", { className: "h-full", src: '/404-error-background-piggy-bank.jpg', alt: '404' }) }), _jsx("h1", { className: 'font-bold text-[#000000] p-2 mb-4', children: "The stuff you were looking for doesn't exist !" }), _jsx("a", { href: '/', className: 'bg-transparent hover:bg-[#0d974d] text-[#26b22d] hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-[#1fac15] hover:border-transparent', children: "Take me home" })] }) }) }));
};
export default NotFound;
