import { useMutation, useQuery } from "@apollo/client";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";
import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";
import { client } from "../graphql/client/client.init";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";
import GET_AUTHENTICATED_USER from "../graphql/queries/user.query";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
    const { data } = useQuery(GET_TRANSACTION_STATISTICS);
    const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);

    const [logout, { loading }] = useMutation(LOGOUT, {
        update(cache, { data }) {
            if (data?.logout) {
                cache.evict({ fieldName: 'authUser' });
                cache.gc();
            }
        }
    });

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "$",
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
                borderRadius: 30,
                spacing: 10,
                cutout: 130,
            },
        ],
    });

    useEffect(() => {
        const transactionsStatistics = data?.getTransactionsStatistics;
        if (transactionsStatistics) {
            const categories = transactionsStatistics.map((stat: any) => stat.category);
            const totalAmounts = transactionsStatistics.map((stat: any) => stat.totalAmount);

            const backgroundColors: any = [];
            const borderColors: any = [];

            categories.forEach((category: string) => {
                if (category === "saving") {
                    backgroundColors.push("rgba(75, 192, 192)");
                    borderColors.push("rgba(75, 192, 192)");
                } else if (category === "expense") {
                    backgroundColors.push("rgba(255, 99, 132)");
                    borderColors.push("rgba(255, 99, 132)");
                } else if (category === "investment") {
                    backgroundColors.push("rgba(54, 162, 235)");
                    borderColors.push("rgba(54, 162, 235)");
                }
            });

            setChartData((prev) => ({
                labels: categories,
                datasets: [
                    {
                        ...prev.datasets[0],
                        data: totalAmounts,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                    },
                ],
            }));
        }
    }, [data]);

    const handleLogout = async () => {
        try {
            await logout();
            client.cache.reset();
            toast.success("Logged out successfully");
        } catch (error: any) {
            console.error("Error logging out:", error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
                <div className='flex items-center'>
                    <p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-green-600 via-yellow-500 to-green-400 inline-block text-transparent bg-clip-text'>
                        Spend wisely, track wisely
                    </p>
                    <img
                        src={authUserData?.authUser.profilePicture}
                        className='w-11 h-11 rounded-full border cursor-pointer'
                        alt='Avatar'
                    />
                    {!loading && <MdLogout className='mx-2 w-5 h-5 cursor-pointer' onClick={handleLogout} />}
                    {/* loading spinner */}
                    {loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
                </div>
                <div className='flex flex-wrap w-full justify-center items-center gap-6'>
                    {data?.getTransactionsStatistics.length > 0 && (
                        <div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
                            <Doughnut data={chartData} />
                        </div>
                    )}

                    <TransactionForm />
                </div>
                <Cards />
            </div>
        </>
    );
};
export default HomePage;