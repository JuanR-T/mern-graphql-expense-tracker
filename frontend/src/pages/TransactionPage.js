import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import TransactionFormSkeleton from "../components/skeletons/TransactionFormSkeleton";
import { useUpdateTransaction } from "../graphql/hooks/useUpdateTransaction";
import { currentPageTransaction } from "../utils/currentPageTransaction";
const TransactionPage = () => {
    const { updateTransaction, loading } = useUpdateTransaction();
    const { id: paramsId } = useParams();
    const { category, paymentType, location, date, amount, description } = currentPageTransaction(paramsId);
    const [formData, setFormData] = useState({
        description,
        paymentType,
        category,
        amount,
        location,
        date: new Date(+date).toISOString().substring(0, 10),
    });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const convertedAmount = parseFloat(String(formData.amount));
        try {
            await updateTransaction({
                variables: {
                    input: {
                        transactionId: paramsId,
                        ...formData,
                        amount: convertedAmount,
                    },
                },
            });
            navigate("/");
            toast.success("Transaction updated successfully");
        }
        catch (error) {
            console.error("Error updating transaction", error);
            toast.error("Error updating transaction");
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    if (loading) {
        return _jsx(TransactionFormSkeleton, {});
    }
    return (_jsx("div", { className: 'h-screen flex justify-center items-center', children: _jsxs("div", { className: 'bg-gray-100 rounded-lg shadow-2xl max-w-xl mx-auto flex flex-col items-center justify-center p-4', children: [_jsx("p", { className: 'md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r text-black inline-block bg-clip-text', children: "Update this transaction" }), _jsxs("form", { className: 'w-full max-w-lg flex flex-col gap-5 px-3 ', onSubmit: handleSubmit, children: [_jsx("div", { className: 'flex flex-wrap', children: _jsxs("div", { className: 'w-full', children: [_jsx("label", { className: 'block uppercase tracking-wide text-black text-xs font-bold mb-2', htmlFor: 'description', children: "Transaction" }), _jsx("input", { className: 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500', id: 'description', name: 'description', type: 'text', placeholder: 'Rent, Groceries, Salary, etc.', value: formData.description, onChange: handleInputChange })] }) }), _jsxs("div", { className: 'flex flex-wrap gap-3', children: [_jsxs("div", { className: 'w-full flex-1 mb-6 md:mb-0', children: [_jsx("label", { className: 'block uppercase tracking-wide text-black text-xs font-bold mb-2', htmlFor: 'paymentType', children: "Payment Type" }), _jsxs("div", { className: 'relative', children: [_jsxs("select", { className: 'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500', id: 'paymentType', name: 'paymentType', onChange: handleInputChange, defaultValue: formData.paymentType, children: [_jsx("option", { value: "card", children: "Card" }), _jsx("option", { value: "cash", children: "Cash" })] }), _jsx("div", { className: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700', children: _jsx("svg", { className: 'fill-current h-4 w-4', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', children: _jsx("path", { d: 'M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' }) }) })] })] }), _jsxs("div", { className: 'w-full flex-1 mb-6 md:mb-0', children: [_jsx("label", { className: 'block uppercase tracking-wide text-black text-xs font-bold mb-2', htmlFor: 'category', children: "Category" }), _jsxs("div", { className: 'relative', children: [_jsxs("select", { className: 'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500', id: 'category', name: 'category', onChange: handleInputChange, defaultValue: formData.category, children: [_jsx("option", { value: "saving", children: "Saving" }), _jsx("option", { value: "expense", children: "Expense" }), _jsx("option", { value: "investment", children: "Investment" })] }), _jsx("div", { className: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700', children: _jsx("svg", { className: 'fill-current h-4 w-4', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', children: _jsx("path", { d: 'M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' }) }) })] })] }), _jsxs("div", { className: 'w-full flex-1 mb-6 md:mb-0', children: [_jsx("label", { className: 'block uppercase text-black text-xs font-bold mb-2', htmlFor: 'amount', children: "Amount($)" }), _jsx("input", { className: 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500', id: 'amount', name: 'amount', type: 'number', placeholder: '150', value: formData.amount, onChange: handleInputChange })] })] }), _jsxs("div", { className: 'flex flex-wrap gap-3', children: [_jsxs("div", { className: 'w-full flex-1 mb-6 md:mb-0', children: [_jsx("label", { className: 'block uppercase tracking-wide text-black text-xs font-bold mb-2', htmlFor: 'location', children: "Location" }), _jsx("input", { className: 'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white', id: 'location', name: 'location', type: 'text', placeholder: 'New York', value: formData.location, onChange: handleInputChange })] }), _jsxs("div", { className: 'w-full flex-1', children: [_jsx("label", { className: 'block uppercase tracking-wide text-black text-xs font-bold mb-2', htmlFor: 'date', children: "Date" }), _jsx("input", { type: 'date', name: 'date', id: 'date', className: 'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none\n                            focus:bg-white', placeholder: 'Select date', value: formData.date, onChange: handleInputChange })] })] }), _jsx("button", { className: 'text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br\n            bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50', type: 'submit', children: loading ? "Updating..." : "Update" })] })] }) }));
};
export default TransactionPage;
