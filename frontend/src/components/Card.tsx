import toast from "react-hot-toast";
import { BsCardText } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaLocationDot, FaSackDollar } from "react-icons/fa6";
import { HiPencilAlt } from "react-icons/hi";
import { MdOutlinePayments } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDeleteTransaction } from "../graphql/hooks/useDeleteTransaction";
import { Transaction as ITransaction } from "../types/transaction.types";
import capitalizeLetter from "../utils/capitalizeLetter";
import { formatDate } from "../utils/formatDate";

const categoryColorMap: { [key: string]: string } = {
    saving: "from-green-700 to-green-400",
    expense: "from-pink-800 to-pink-600",
    investment: "from-blue-700 to-blue-400",
};

const Card = ({ transaction }: { transaction: ITransaction }) => {
    let { _id, category, amount, location, date, paymentType, description } = transaction;
    const cardClass = categoryColorMap[category];

    const { deleteTransaction, loading } = useDeleteTransaction();
    const { capitalizedDescription, capitalizedCategory, capitalizedPaymentType } = capitalizeLetter(description, category, paymentType);
    const formattedDate = formatDate(Number(date));

    const handleDelete = async () => {
        try {
            await deleteTransaction({
                variables: {
                    transactionId: _id,
                },
            });
            toast.success("Transaction deleted successfully");
        } catch (error) {
            console.error("Error deleting transaction", error);
            toast.error("Error deleting transaction");
        }
    };

    return (
        <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`} key={"_id"}>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-row items-center justify-between'>
                    <h2 className='text-lg font-bold text-white'>{capitalizedCategory}</h2>
                    <div className='flex items-center gap-2'>
                        {!loading && <FaTrash className={"cursor-pointer"} onClick={handleDelete} />}
                        {loading && <div className='w-6 h-6 border-t-2 border-b-2  rounded-full animate-spin'></div>}
                        <Link to={`/transaction/${transaction._id}`}>
                            <HiPencilAlt className='cursor-pointer' size={20} />
                        </Link>
                    </div>
                </div>
                <p className='text-white flex items-center gap-1'>
                    <BsCardText />
                    Description: {capitalizedDescription}
                </p>
                <p className='text-white flex items-center gap-1'>
                    <MdOutlinePayments />
                    Payment Type: {capitalizedPaymentType}
                </p>
                <p className='text-white flex items-center gap-1'>
                    <FaSackDollar />
                    Amount: ${amount}
                </p>
                <p className='text-white flex items-center gap-1'>
                    <FaLocationDot />
                    Location: {location || "N/A"}
                </p>
                <div className='flex justify-between items-center'>
                    <p className='text-xs text-black font-bold'>{formattedDate}</p>
                </div>
            </div>
        </div>
    );
};
export default Card;