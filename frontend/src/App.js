import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
function App() {
    const { data } = useQuery(GET_AUTHENTICATED_USER);
    return (_jsxs(_Fragment, { children: [data?.authUser && _jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: data?.authUser ? _jsx(HomePage, {}) : _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: '/login', element: data?.authUser ? _jsx(Navigate, { to: "/" }) : _jsx(LoginPage, {}) }), _jsx(Route, { path: '/signup', element: data?.authUser ? _jsx(Navigate, { to: "/" }) : _jsx(SignUpPage, {}) }), _jsx(Route, { path: '/transaction/:id', element: data?.authUser ? _jsx(TransactionPage, {}) : _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: '*', element: _jsx(NotFoundPage, {}) })] }), _jsx(Toaster, {})] }));
}
export default App;
