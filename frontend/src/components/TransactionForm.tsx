import { toast } from "react-hot-toast";
import { useCreateTransaction } from "../graphql/hooks/useCreateTransaction";

const TransactionForm: React.FC = () => {
    const { createTransaction, loading } = useCreateTransaction();
    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement | undefined;
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
        };

        try {
            await createTransaction({
                variables: {
                    input: transactionData,
                },
            });
            form?.reset();
            return toast.success("Transaction added successfully");
        } catch (error) {
            console.error(error, "Error adding transaction");
            return toast.error("Error adding transaction");
        }
    };

    return (
        <form className='bg-slate-200 shadow-2xl p-4 rounded-lg w-full max-w-lg flex flex-col gap-5 px-3' onSubmit={handleSubmit}>
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
                        className='appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        id='description'
                        name='description'
                        type='text'
                        required
                        placeholder='Rent, Groceries, Salary, etc.'
                    />
                </div>
            </div>
            {/* PAYMENT TYPE */}
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
                            className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            id='paymentType'
                            name='paymentType'
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

                {/* CATEGORY */}
                <div className='w-full flex-1 mb-6 md:mb-0'>
                    <label
                        className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
                        htmlFor='category'
                    >
                        Category
                    </label>
                    <div className='relative'>
                        <select
                            className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            id='category'
                            name='category'
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
                        className='appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        id='amount'
                        name='amount'
                        type='number'
                        placeholder='150'
                    />
                </div>
            </div>

            {/* LOCATION */}
            <div className='flex flex-wrap gap-3'>
                <div className='w-full flex-1 mb-6 md:mb-0'>
                    <label
                        className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
                        htmlFor='location'
                    >
                        Location
                    </label>
                    <input
                        className='appearance-none block w-full bg-white text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                        id='location'
                        name='location'
                        type='text'
                        placeholder='New York'
                    />
                </div>

                {/* DATE */}
                <div className='w-full flex-1'>
                    <label className='block uppercase tracking-wide text-black text-xs font-bold mb-2' htmlFor='date'>
                        Date
                    </label>
                    <input
                        type='date'
                        name='date'
                        id='date'
                        className='appearance-none block w-full bg-white text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
						 focus:bg-white'
                        placeholder='Select date'
                    />
                </div>
            </div>
            {/* SUBMIT BUTTON */}
            <button
                className='text-black font-bold w-full rounded px-4 py-2 bg-gradient-to-br
          from-green-500 to-green-500 hover:from-green-600 hover:to-green-600
						disabled:opacity-70 disabled:cursor-not-allowed'
                type='submit'
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Add Transaction'}
            </button>
        </form>
    );
};

export default TransactionForm;