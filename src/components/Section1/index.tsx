import React from 'react'

function index() {
return (
    <>
    <div className="w-full px-4 py-8">
        <main className="mt-20">
        <h2 className="text-xl uppercase tracking-wider mb-4 font-mono font-bold">
            HEY, I AM IBAI GARRIDO
        </h2>
        <div className="max-w-3xl text-justify">
            <div className="grid grid-cols-1">
            <h1 className="text-9xl leading-tight font-thin">Web</h1>
            <h1 className="text-8xl font-bold leading-tight font-serif">
                Application
            </h1>
            <h1 className="text-6xl leading-tight mb-6 font-mono">
                Developer
            </h1>
            </div>
            <p className="text-xl mb-8">Based in Oiartzun, Spain.</p>
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors flex items-center space-x-2">
            <span>Get in Touch</span>
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
            </svg>
            </button>
        </div>
        </main>
    </div>
    </>
)
}

export default index