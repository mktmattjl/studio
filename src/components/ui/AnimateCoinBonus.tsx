
'use client';

import { PixelCoinIcon } from '@/components/icons/PixelCoinIcon';

interface AnimateCoinBonusProps {
  amount: number;
}

export function AnimateCoinBonus({ amount }: AnimateCoinBonusProps) {
  return (
    <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-[150] pointer-events-none">
      <div className="coin-bonus-animate flex items-center gap-2 bg-card p-3 rounded-lg shadow-xl border-2 border-chart-3">
        <PixelCoinIcon className="w-7 h-7 text-yellow-400" />
        <span className="text-xl font-bold text-chart-3">+{amount}</span>
      </div>
    </div>
  );
}
