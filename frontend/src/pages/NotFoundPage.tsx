const NotFound: React.FC = () => {
    return (
        <section>
            <div className='h-screen w-auto flex'>
                <div className='h-full w-full m-auto text-center'>
                    <div className="justify-center flex h-4/5 w-auto" >
                        <img className="h-full" src='/404-error-background-piggy-bank.jpg' alt='404' />
                    </div>
                    <h1 className='font-bold text-[#000000] p-2 mb-4'>
                        The stuff you were looking for doesn't exist !
                    </h1>
                    <a
                        href='/'
                        className='bg-transparent hover:bg-[#0d974d] text-[#26b22d] hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-[#1fac15] hover:border-transparent'
                    >
                        Take me home
                    </a>
                </div>
            </div>
        </section>
    );
};
export default NotFound;