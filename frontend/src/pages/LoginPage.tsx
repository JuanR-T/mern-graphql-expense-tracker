import { useMutation } from "@apollo/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import { LOGIN } from "../graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { LoginResponse } from "../types/user.types";

const LoginPage: React.FC = () => {
    const [loginData, setLoginData] = useState<LoginResponse>({
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
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!loginData.username || !loginData.password) {
            return toast.error("Please fill in all fields.");
        }
        try {
            await login({
                variables: {
                    input: loginData,
                }
            })
            toast.success('Login successful');
        } catch (error: any) {
            console.error("Error during login", error);
            toast.error(error.message);
        }
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='flex rounded-lg overflow-hidden z-50 bg-gray-300'>
                <div className='w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center'>
                    <div className='max-w-md w-full p-6'>
                        <h1 className='text-3xl font-semibold mb-6 text-black text-center'>Login</h1>
                        <h1 className='text-sm font-semibold mb-6 text-green-500 text-center'>
                            Welcome back! Log in to your account
                        </h1>
                        <form className='space-y-4' onSubmit={handleSubmit}>
                            <InputField
                                label='Username'
                                id='username'
                                name='username'
                                value={loginData.username}
                                onChange={handleChange}
                            />

                            <InputField
                                label='Password'
                                id='password'
                                name='password'
                                type='password'
                                value={loginData.password}
                                onChange={handleChange}
                            />
                            <div>
                                <button
                                    type='submit'
                                    className='w-full bg-green-500 text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300
										disabled:opacity-50 disabled:cursor-not-allowed
									'
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Login'}
                                </button>
                            </div>
                        </form>
                        <div className='mt-4 text-sm text-gray-600 text-center'>
                            <p>
                                {"Don't"} have an account?{" "}
                                <Link to='/signup' className='text-black hover:underline'>
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;