import React from 'react';
import { Flame, ArrowLeft, Home } from 'lucide-react';

export default function NotFound({ onGoHome }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#FAF7F2]">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Flame Badge */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1B3B32] border-2 border-[#B45309] mx-auto flex items-center justify-center shadow-xl">
          <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-[#FEF3C7]" />
        </div>

        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#B45309] block mb-2">
            ERROR 404 • PAGE NOT FOUND
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#111827] uppercase tracking-wider">
            LOST IN THE LIGHT
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm font-light mt-3 leading-relaxed">
            The page you are looking for does not exist, has been removed, or is private.
          </p>
        </div>

        <div className="pt-4 flex justify-center">
          <button
            onClick={onGoHome}
            className="btn-kimirica text-xs py-3 px-6 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>RETURN TO BOTANICAL STUDIO</span>
          </button>
        </div>

      </div>
    </div>
  );
}
