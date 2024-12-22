import React, { useState, useCallback } from 'react';
import { Clover } from 'lucide-react';
import { LotteryBall } from './components/LotteryBall';
import { generateLotteryNumbers } from './utils/lottery';

function App() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNumbers = useCallback(async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setNumbers([]);
    
    const newNumbers = generateLotteryNumbers();
    
    // Reveal numbers one by one
    for (let i = 0; i < newNumbers.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setNumbers(prev => [...prev, newNumbers[i]]);
    }
    
    setIsGenerating(false);
  }, [isGenerating]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-700 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Clover className="w-8 h-8" />
          Sorteador da Sorte
        </h1>
        <p className="text-purple-200">Gere seus números da sorte!</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8 max-w-2xl min-h-[120px]">
        {numbers.map((number, index) => (
          <LotteryBall key={index} number={number} animate={true} />
        ))}
        {numbers.length === 0 && !isGenerating && (
          <div className="text-white text-center w-full">
            Clique no botão abaixo para gerar seus números
          </div>
        )}
      </div>

      <button
        onClick={generateNumbers}
        disabled={isGenerating}
        className={`px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold
                 rounded-full shadow-lg transform transition-all duration-300 
                 ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                 focus:outline-none focus:ring-4 focus:ring-yellow-300`}
      >
        {isGenerating ? 'Sorteando...' : 'Sortear Números'}
      </button>
    </div>
  );
}

export default App;