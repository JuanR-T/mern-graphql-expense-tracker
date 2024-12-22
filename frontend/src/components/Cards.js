import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import Card from "./Card";
import CardSkeleton from "./skeletons/CardSkeleton";
const Cards = () => {
    const { data, loading } = useQuery(GET_TRANSACTIONS);
    const { data: userData } = useQuery(GET_AUTHENTICATED_USER);
    return (_jsxs("div", { className: 'w-full px-10 min-h-[40vh]', children: [_jsx("p", { className: 'text-5xl font-bold text-center my-10', children: "History" }), !loading && data?.getTransactions?.length === 0 && (_jsx("p", { className: 'text-2xl text-black font-bold text-center w-full', children: "No transaction history found." })), _jsx("div", { className: 'w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20', children: data?.getTransactions.map((transaction) => (loading ? (_jsx(CardSkeleton, {}, `skeleton-${transaction._id}`)) : (_jsx(Card, { authUser: userData.authUser, transaction: transaction }, transaction._id)))) })] }));
};
export default Cards;
