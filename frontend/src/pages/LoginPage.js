import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import { LOGIN } from "../graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const [login, { loading }] = useMutation(LOGIN, {
        // This uppdate the cache after login, avoiding another network request
        update(cache, { data }) {
            if (data?.login) {
                cache.writeQuery({
                    query: GET_AUTHENTICATED_USER,
                    data: {
                        authUser: data.login,
                    },
                });
            }
        },
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loginData.username || !loginData.password) {
            return toast.error("Please fill in all fields.");
        }
        try {
            await login({
                variables: {
                    input: loginData,
                }
            });
            toast.success('Login successful');
        }
        catch (error) {
            console.error("Error during login", error);
            toast.error(error.message);
        }
    };
    return (_jsx("div", { className: 'h-screen flex justify-center items-center', children: _jsx("div", { className: 'flex rounded-lg overflow-hidden z-50 bg-gray-300', children: _jsx("div", { className: 'w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center', children: _jsxs("div", { className: 'max-w-md w-full p-6', children: [_jsx("h1", { className: 'text-3xl font-semibold mb-6 text-black text-center', children: "Login" }), _jsx("h1", { className: 'text-sm font-semibold mb-6 text-green-500 text-center', children: "Welcome back! Log in to your account" }), _jsxs("form", { className: 'space-y-4', onSubmit: handleSubmit, children: [_jsx(InputField, { label: 'Username', id: 'username', name: 'username', value: loginData.username, onChange: handleChange }), _jsx(InputField, { label: 'Password', id: 'password', name: 'password', type: 'password', value: loginData.password, onChange: handleChange }), _jsx("div", { children: _jsx("button", { type: 'submit', className: 'w-full bg-green-500 text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300\n\t\t\t\t\t\t\t\t\t\tdisabled:opacity-50 disabled:cursor-not-allowed\n\t\t\t\t\t\t\t\t\t', disabled: loading, children: loading ? 'Loading...' : 'Login' }) })] }), _jsx("div", { className: 'mt-4 text-sm text-gray-600 text-center', children: _jsxs("p", { children: ["Don't", " have an account?", " ", _jsx(Link, { to: '/signup', className: 'text-black hover:underline', children: "Sign Up" })] }) })] }) }) }) }));
};
export default LoginPage;
