import { useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import GET_AUTHENTICATED_USER from "./graphql/queries/user.query";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";

function App() {
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route path='/' element={data?.authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={data?.authUser ? <Navigate to="/" /> : <LoginPage />} />
        <Route path='/signup' element={data?.authUser ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path='/transaction/:id' element={data?.authUser ? <Navigate to="/login" /> : <TransactionPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}
export default App;