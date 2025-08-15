export interface TradingSignal {
  id: string;
  type: 'stock' | 'option';
  action: 'buy' | 'sell';
  symbol: string;
  entryPrice: number;
  stopLoss: number;
  target: number;
  confidence: number;
  pattern: string;
  timeframe: 'scalp' | 'swing';
  createdAt: Date;
  notes: string;
}

export interface MarketOverview {
  bias: 'bullish' | 'bearish' | 'neutral';
  winRate: number;
  profitLoss: number;
  totalTrades: number;
  activeTrades: number;
}