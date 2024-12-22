import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const InputField = ({ label, id, name, type = "text", onChange, value }) => {
    return (_jsxs("div", { children: [_jsx("label", { htmlFor: id, className: 'block text-sm font-medium text-gray-700', children: label }), _jsx("input", { className: 'mt-1 p-2 w-full border rounded-md text-black focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300', id: id, type: type, name: name, value: value, onChange: onChange })] }));
};
export default InputField;
