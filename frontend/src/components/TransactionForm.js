import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "react-hot-toast";
import { useCreateTransaction } from "../graphql/hooks/useCreateTransaction";
const TransactionForm = () => {
    const { createTransaction, loading } = useCreateTransaction();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const transactionData = {
            description: formData.get("description"),
            paymentType: formData.get("paymentType"),
            category: formData.get("category"),
            amount: parseFloat(String(formData.get("amount"))),
            location: formData.get("location"),
            date: formData.get("date"),
        };
        if (!transactionData.description || !transactionData.paymentType || !transactionData.category || !transactionData.amount || !transactionData.location || !transactionData.date) {
            return toast.error("Please fill in all fields.");
        }
        ;
        try {
            await createTransaction({
                variables: {
                    input: transactionData,
                },
            });
            form?.reset();
            return toast.success("Transaction added successfully");
        }
        catch (error) {
            console.error(error, "Error adding transaction");
            return toast.error("Error adding transaction");
        }
    };
    return (_jsxs("form", { className: 'bg-slate-200 shadow-2xl p-4 rounded-lg w-full max-w-lg flex flex-col gap-5 px-3', onSubmit: handleSubmit, children: [_jsx("div", { className: 'flex flex-wrap', children: _jsxs("div", { className: 'w-full', children: [_jsx("label", { className: 'block uppercase tracking-wide text-black text-xs font-bold mb-2', htmlFor: 'description', children: "Transaction" }), _jsx("input", { className: 'appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500', id: 'description', name: 'description', type: 'text', required: true, placeholder: 'Rent, Groceries, Salary, etc.' })] }) }), _jsxs("div", { className: 'flex flex-wrap gap-3', children: [_jsxs("div", { className: 'w-full flex-1 mb-6 md:mb-0', children: [_jsx("label", { className: 'block uppercase tracking-wide text-black text-xs font-bold mb-2', htmlFor: 'paymentType', children: "Payment Type" }), _jsxs("div", { className: 'relative', children: [_jsxs("select", { className: 'block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500', id: 'paymentType', name: 'paymentType', children: [_jsx("option", { value: "card", children: "Card" }), _jsx("option", { value: "cash", children: "Cash" })] }), _jsx("div", { className: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700', children: _jsx("svg", { className: 'fill-current h-4 w-4', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', children: _jsx("path", { d: 'M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' }) }) })] })] }), _jsxs("div", { className: 'w-full flex-1 mb-6 md:mb-0', children: [_jsx("label", { className: 'block uppercase tracking-wide text-black text-xs font-bold mb-2', htmlFor: 'category', children: "Category" }), _jsxs("div", { className: 'relative', children: [_jsxs("select", { className: 'block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500', id: 'category', name: 'category', children: [_jsx("option", { value: "saving", children: "Saving" }), _jsx("option", { value: "expense", children: "Expense" }), _jsx("option", { value: "investment", children: "Investment" })] }), _jsx("div", { className: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700', children: _jsx("svg", { className: 'fill-current h-4 w-4', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', children: _jsx("path", { d: 'M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' }) }) })] })] }), _jsxs("div", { className: 'w-full flex-1 mb-6 md:mb-0', children: [_jsx("label", { className: 'block uppercase text-black text-xs font-bold mb-2', htmlFor: 'amount', children: "Amount($)" }), _jsx("input", { className: 'appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500', id: 'amount', name: 'amount', type: 'number', placeholder: '150' })] })] }), _jsxs("div", { className: 'flex flex-wrap gap-3', children: [_jsxs("div", { className: 'w-full flex-1 mb-6 md:mb-0', children: [_jsx("label", { className: 'block uppercase tracking-wide text-black text-xs font-bold mb-2', htmlFor: 'location', children: "Location" }), _jsx("input", { className: 'appearance-none block w-full bg-white text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white', id: 'location', name: 'location', type: 'text', placeholder: 'New York' })] }), _jsxs("div", { className: 'w-full flex-1', children: [_jsx("label", { className: 'block uppercase tracking-wide text-black text-xs font-bold mb-2', htmlFor: 'date', children: "Date" }), _jsx("input", { type: 'date', name: 'date', id: 'date', className: 'appearance-none block w-full bg-white text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none\n\t\t\t\t\t\t focus:bg-white', placeholder: 'Select date' })] })] }), _jsx("button", { className: 'text-black font-bold w-full rounded px-4 py-2 bg-gradient-to-br\n          from-green-500 to-green-500 hover:from-green-600 hover:to-green-600\n\t\t\t\t\t\tdisabled:opacity-70 disabled:cursor-not-allowed', type: 'submit', disabled: loading, children: loading ? 'Loading...' : 'Add Transaction' })] }));
};
export default TransactionForm;
