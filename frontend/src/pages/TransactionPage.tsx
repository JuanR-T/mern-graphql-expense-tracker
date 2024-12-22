import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import TransactionFormSkeleton from "../components/skeletons/TransactionFormSkeleton";
import { useUpdateTransaction } from "../graphql/hooks/useUpdateTransaction";
import { Transaction } from "../types/transaction.types";
import { currentPageTransaction } from "../utils/currentPageTransaction";

const TransactionPage: React.FC = () => {
    const { updateTransaction, loading } = useUpdateTransaction();
    const { id: paramsId } = useParams();
    const { category, paymentType, location, date, amount, description } = currentPageTransaction(paramsId);

    const [formData, setFormData] = useState<Transaction>({
        description,
        paymentType,
        category,
        amount,
        location,
        date: new Date(+date).toISOString().substring(0, 10),
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            toast.success("Transaction updated successfully");
        } catch (error) {
            console.error("Error updating transaction", error);
            toast.error("Error updating transaction");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    if (loading) { return <TransactionFormSkeleton /> }
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='bg-gray-100 rounded-lg shadow-2xl max-w-xl mx-auto flex flex-col items-center justify-center p-4'>
                <p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r text-black inline-block bg-clip-text'>
                    Update this transaction
                </p>
                <form className='w-full max-w-lg flex flex-col gap-5 px-3 ' onSubmit={handleSubmit}>
                    {/* TRANSACTION */}
                    <div className='flex flex-wrap'>
                        <div className='w-full'>
                            <label
                                className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
                                htmlFor='description'
                            >
                                Transaction
                            </label>
                            <input
                                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                id='description'
                                name='description'
                                type='text'
                                placeholder='Rent, Groceries, Salary, etc.'
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {/* Payment */}
                    <div className='flex flex-wrap gap-3'>
                        <div className='w-full flex-1 mb-6 md:mb-0'>
                            <label
                                className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
                                htmlFor='paymentType'
                            >
                                Payment Type
                            </label>
                            <div className='relative'>
                                <select
                                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                    id='paymentType'
                                    name='paymentType'
                                    onChange={handleInputChange}
                                    defaultValue={formData.paymentType}
                                >
                                    <option value={"card"}>Card</option>
                                    <option value={"cash"}>Cash</option>
                                </select>
                                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                                    <svg
                                        className='fill-current h-4 w-4'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 20 20'
                                    >
                                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Category */}
                        <div className='w-full flex-1 mb-6 md:mb-0'>
                            <label
                                className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
                                htmlFor='category'
                            >
                                Category
                            </label>
                            <div className='relative'>
                                <select
                                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                    id='category'
                                    name='category'
                                    onChange={handleInputChange}
                                    defaultValue={formData.category}
                                >
                                    <option value={"saving"}>Saving</option>
                                    <option value={"expense"}>Expense</option>
                                    <option value={"investment"}>Investment</option>
                                </select>
                                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                                    <svg
                                        className='fill-current h-4 w-4'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 20 20'
                                    >
                                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* AMOUNT */}
                        <div className='w-full flex-1 mb-6 md:mb-0'>
                            <label className='block uppercase text-black text-xs font-bold mb-2' htmlFor='amount'>
                                Amount($)
                            </label>
                            <input
                                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                id='amount'
                                name='amount'
                                type='number'
                                placeholder='150'
                                value={formData.amount}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className='flex flex-wrap gap-3'>
                        <div className='w-full flex-1 mb-6 md:mb-0'>
                            <label
                                className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
                                htmlFor='location'
                            >
                                Location
                            </label>
                            <input
                                className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                                id='location'
                                name='location'
                                type='text'
                                placeholder='New York'
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Date */}
                        <div className='w-full flex-1'>
                            <label
                                className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
                                htmlFor='date'
                            >
                                Date
                            </label>
                            <input
                                type='date'
                                name='date'
                                id='date'
                                className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
                            focus:bg-white'
                                placeholder='Select date'
                                value={formData.date}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <button
                        className='text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
            bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                        type='submit'
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};
export default TransactionPage;