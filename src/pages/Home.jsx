import React from 'react';
import { Header } from '../components/Header';

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b       from-amber-50/50 to-white flex flex-col">
            <Header />
            
            <div className="flex-grow flex flex-col items-center justify-center px-4">
                <div className="text-center max-w-xl">
                    <h1 className="text-6xl md:text-7xl font-extrabold text-amber-600 tracking-tight mb-4 drop-shadow-sm">
                        BeYourChef
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 font-medium">
                        Explora, cocina y disfruta de tus recetas favoritas.
                    </p>
                    <div className="mt-8 text-3xl animate-bounce">
                        🍳
                    </div>
                </div>
            </div>
        </div>
    );
}

export {
    Home
}