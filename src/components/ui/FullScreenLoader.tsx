import React from 'react';
import { FileText, Edit3 } from 'lucide-react';

interface FullScreenLoaderProps {
    isLoading: boolean;
    message?: string;
}

export const FullScreenLoader = ({ isLoading, message = "AIが一生懸命LPの構成を書き起こしています..." }: FullScreenLoaderProps) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300">
            <style>{`
                @keyframes float-doc {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes write-pen {
                    0% { transform: translate(0px, 0px) rotate(-10deg); }
                    15% { transform: translate(22px, -3px) rotate(-22deg); }
                    25% { transform: translate(3px, 12px) rotate(-5deg); }
                    40% { transform: translate(26px, 9px) rotate(-25deg); }
                    50% { transform: translate(6px, 24px) rotate(-5deg); }
                    65% { transform: translate(30px, 21px) rotate(-22deg); }
                    80% { transform: translate(-10px, -5px) rotate(5deg); opacity: 1; }
                    85% { opacity: 0; }
                    95% { opacity: 0; transform: translate(0px, 0px) rotate(-10deg); }
                    100% { opacity: 1; transform: translate(0px, 0px) rotate(-10deg); }
                }
                @keyframes blink-dot {
                    0%, 100% { opacity: 0.2; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                .animate-float-doc {
                    animation: float-doc 3.5s ease-in-out infinite;
                }
                .animate-write-pen {
                    animation: write-pen 2.5s ease-in-out infinite;
                }
                .dot-1 { animation: blink-dot 1.5s infinite; animation-delay: 0s; }
                .dot-2 { animation: blink-dot 1.5s infinite; animation-delay: 0.2s; }
                .dot-3 { animation: blink-dot 1.5s infinite; animation-delay: 0.4s; }
            `}</style>

            <div className="relative flex items-center justify-center animate-float-doc">
                {/* Document Icon (Floating) */}
                <FileText
                    className="w-16 h-16 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                    strokeWidth={1.5}
                />

                {/* Pen Icon (Writing motion) */}
                <div className="absolute top-1 left-3 animate-write-pen origin-bottom-left">
                    <Edit3
                        className="w-8 h-8 text-amber-500 drop-shadow-lg"
                        strokeWidth={2}
                    />
                </div>
            </div>

            {/* Loading Text */}
            <div className="mt-8 flex items-center gap-1.5 text-white font-bold tracking-widest text-lg drop-shadow-md">
                <span>Loading</span>
                <span className="flex gap-1 ml-1 items-end pb-[4px]">
                    <span className="dot-1 w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    <span className="dot-2 w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    <span className="dot-3 w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                </span>
            </div>

            {/* Supporting Message */}
            <p className="mt-4 text-slate-200 text-xs sm:text-sm font-medium tracking-wide text-center px-4 max-w-sm leading-relaxed">
                {message}
            </p>
        </div>
    );
};
