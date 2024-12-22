import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import toast from "react-hot-toast";
import { BsCardText } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaLocationDot, FaSackDollar } from "react-icons/fa6";
import { HiPencilAlt } from "react-icons/hi";
import { MdOutlinePayments } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDeleteTransaction } from "../graphql/hooks/useDeleteTransaction";
import capitalizeLetter from "../utils/capitalizeLetter";
import { formatDate } from "../utils/formatDate";
const categoryColorMap = {
    saving: "from-green-700 to-green-400",
    expense: "from-pink-800 to-pink-600",
    investment: "from-blue-700 to-blue-400",
};
const Card = ({ transaction, authUser }) => {
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
        }
        catch (error) {
            console.error("Error deleting transaction", error);
            toast.error("Error deleting transaction");
        }
    };
    return (_jsx("div", { className: `rounded-md p-4 bg-gradient-to-br ${cardClass}`, children: _jsxs("div", { className: 'flex flex-col gap-3', children: [_jsxs("div", { className: 'flex flex-row items-center justify-between', children: [_jsx("h2", { className: 'text-lg font-bold text-white', children: capitalizedCategory }), _jsxs("div", { className: 'flex items-center gap-2', children: [!loading && _jsx(FaTrash, { className: "cursor-pointer", onClick: handleDelete }), loading && _jsx("div", { className: 'w-6 h-6 border-t-2 border-b-2  rounded-full animate-spin' }), _jsx(Link, { to: `/transaction/${transaction._id}`, children: _jsx(HiPencilAlt, { className: 'cursor-pointer', size: 20 }) })] })] }), _jsxs("p", { className: 'text-white flex items-center gap-1', children: [_jsx(BsCardText, {}), "Description: ", capitalizedDescription] }), _jsxs("p", { className: 'text-white flex items-center gap-1', children: [_jsx(MdOutlinePayments, {}), "Payment Type: ", capitalizedPaymentType] }), _jsxs("p", { className: 'text-white flex items-center gap-1', children: [_jsx(FaSackDollar, {}), "Amount: $", amount] }), _jsxs("p", { className: 'text-white flex items-center gap-1', children: [_jsx(FaLocationDot, {}), "Location: ", location || "N/A"] }), _jsxs("div", { className: 'flex justify-between items-center', children: [_jsx("p", { className: 'text-xs text-black font-bold', children: formattedDate }), _jsx("img", { src: `${authUser?.profilePicture}`, className: 'h-8 w-8 border rounded-full', alt: '' })] })] }) }, "_id"));
};
export default Card;
