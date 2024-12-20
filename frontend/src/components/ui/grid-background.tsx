export function GridBackgroundDemo({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-full dark:bg-green-900 bg-green-100 dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-green-800 bg-green-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-green-600 py-8">
                {children}
            </p>
        </div>
    );
}
