const CardSkeleton: React.FC = () => {
    return (
        <div className='rounded-md p-4 bg-gradient-to-br from-gray-100 to-gray-300 animate-pulse'>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-row items-center justify-between'>
                    <div className='h-6 w-1/3 bg-gray-200 rounded dark:bg-gray-700'></div>
                    <div className='flex items-center gap-2'>
                        <div className='h-6 w-6 bg-gray-200 rounded-full dark:bg-gray-700'></div>
                        <div className='h-6 w-6 bg-gray-200 rounded-full dark:bg-gray-700'></div>
                    </div>
                </div>
                <div className='h-5 w-3/4 bg-gray-200 rounded dark:bg-gray-700'></div>
                <div className='h-5 w-2/3 bg-gray-200 rounded dark:bg-gray-700'></div>
                <div className='h-5 w-1/2 bg-gray-200 rounded dark:bg-gray-700'></div>
                <div className='h-5 w-2/3 bg-gray-200 rounded dark:bg-gray-700'></div>
                <div className='flex justify-between items-center'>
                    <div className='h-4 w-1/4 bg-gray-200 rounded dark:bg-gray-700'></div>
                    <div className='h-8 w-8 bg-gray-200 rounded-full dark:bg-gray-700'></div>
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;