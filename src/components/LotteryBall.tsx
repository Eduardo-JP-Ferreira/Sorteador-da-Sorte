import React from 'react';

interface LotteryBallProps {
  number: number;
  animate?: boolean;
}

export function LotteryBall({ number, animate = false }: LotteryBallProps) {
  return (
    <div
      className={`w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center
                transform transition-all duration-500 ${
                  animate ? 'animate-bounce-in' : ''
                }`}
    >
      <span className="text-3xl font-bold text-purple-700">{number}</span>
    </div>
  );
}