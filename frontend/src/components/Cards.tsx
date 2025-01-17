import { useQuery } from "@apollo/client";
import { ReactNode } from "react";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { Transaction } from "../types/transaction.types";
import Card from "./Card";
import CardSkeleton from "./skeletons/CardSkeleton";


const Cards: React.FC = (): ReactNode => {
    const { data, loading } = useQuery(GET_TRANSACTIONS);
    const { data: userData } = useQuery(GET_AUTHENTICATED_USER);

    return (
        <div className='w-full px-10 min-h-[40vh]'>
            <p className='text-5xl font-bold text-center my-10'>History</p>
            {!loading && data?.getTransactions?.length === 0 && (
                <p className='text-2xl text-black font-bold text-center w-full'>No transaction history found.</p>
            )}
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
                {
                    data?.getTransactions.map((transaction: Transaction) => (
                        loading ? (
                            <CardSkeleton key={`skeleton-${transaction._id}`} />
                        ) : (
                            <Card authUser={userData.authUser} key={transaction._id} transaction={transaction} />
                        )
                    ))

                }
            </div>

        </div>
    );
};

export default Cards;