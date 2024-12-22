import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Header = () => {
    return (_jsxs("div", { className: 'mb-10', children: [_jsx("h1", { className: 'md:text-6xl text-4xl lg:text-8xl font-bold text-center relative z-50 text-black pt-10', children: _jsx(Link, { to: '/', children: "MoneyMap" }) }), _jsxs("div", { className: 'relative mb-10 w-1/2 mx-auto hidden md:block', children: [_jsx("div", { className: 'absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-[2px] w-3/4 blur-sm' }), _jsx("div", { className: 'absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-px w-3/4' }), _jsx("div", { className: 'absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-green-300 to-transparent h-[5px] w-1/4 blur-sm' }), _jsx("div", { className: 'absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-green-300 to-transparent h-px w-1/4' })] })] }));
};
export default Header;
