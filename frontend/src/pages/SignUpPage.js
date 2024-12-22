import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import RadioButton from "../components/RadioButton";
import { SIGN_UP } from "../graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
const SignUpPage = () => {
    const [signUpData, setSignUpData] = useState({
        gender: "",
        name: "",
        password: "",
        username: "",
    });
    const [signup, { loading }] = useMutation(SIGN_UP, {
        update(cache, { data }) {
            if (data?.signUp) {
                cache.writeQuery({
                    query: GET_AUTHENTICATED_USER,
                    data: {
                        authUser: data.signUp,
                    },
                });
            }
        },
    });
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "radio") {
            setSignUpData((prevData) => ({
                ...prevData,
                gender: value,
            }));
        }
        else {
            setSignUpData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!signUpData.name || !signUpData.username || !signUpData.password || !signUpData.gender) {
            toast.error("Please fill in all fields.");
            return;
        }
        try {
            await signup({
                variables: {
                    input: signUpData,
                },
            });
            toast.success("Sign up successful");
        }
        catch (err) {
            console.error("Error during mutation", err);
            toast.error(err.message);
        }
    };
    return (_jsx("div", { className: 'h-screen flex justify-center items-center', children: _jsx("div", { className: 'flex rounded-lg overflow-hidden z-50 bg-gray-300', children: _jsx("div", { className: 'w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center', children: _jsxs("div", { className: 'max-w-md w-full p-6', children: [_jsx("h1", { className: 'text-3xl font-semibold mb-6 text-black text-center', children: "Sign Up" }), _jsx("h1", { className: 'text-sm font-semibold mb-6 text-green-500 text-center', children: "Join to keep track of your expenses" }), _jsxs("form", { className: 'space-y-4', onSubmit: handleSubmit, children: [_jsx(InputField, { label: 'Full Name', id: 'name', name: 'name', value: signUpData.name, onChange: handleChange }), _jsx(InputField, { label: 'Username', id: 'username', name: 'username', value: signUpData.username, onChange: handleChange }), _jsx(InputField, { label: 'Password', id: 'password', name: 'password', type: 'password', value: signUpData.password, onChange: handleChange }), _jsxs("div", { className: 'flex gap-10', children: [_jsx(RadioButton, { id: 'male', label: 'Male', name: 'gender', value: 'male', onChange: handleChange, checked: signUpData.gender === "male" }), _jsx(RadioButton, { id: 'female', label: 'Female', name: 'gender', value: 'female', onChange: handleChange, checked: signUpData.gender === "female" })] }), _jsx("div", { children: _jsx("button", { type: 'submit', className: 'w-full bg-green-500 text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed', disabled: loading, children: loading ? "Loading..." : "Sign Up" }) })] }), _jsx("div", { className: 'mt-4 text-sm text-gray-600 text-center', children: _jsxs("p", { children: ["Already have an account?", " ", _jsx(Link, { to: '/login', className: 'text-black hover:underline', children: "Login here" })] }) })] }) }) }) }));
};
export default SignUpPage;
