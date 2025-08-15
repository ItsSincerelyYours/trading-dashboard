export interface MarketIntelligence {
  regime: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidence: number;
  vix: number;
  sectorLeader: string;
  liquidity: number;
  optionsFlow: number;
  smartMoney: 'BUYING' | 'SELLING' | 'NEUTRAL';
  breadth: number;
}

export interface TradingSetup {
  id: string;
  symbol: string;
  type: 'SWING' | 'SCALP' | 'OPTION';
  action: 'LONG' | 'SHORT';
  pattern: string;
  confidence: number;
  entry: number;
  target: number | string;
  stop: number | string;
  rrRatio: string;
  indicators: string[];
  size: string;
  strike?: number;
  dte?: string;
  premium?: number;
  optionType?: 'CALL' | 'PUT';
}

export interface PatternPerformance {
  name: string;
  winRate: number;
  totalTrades: number;
  wins: number;
  avgGain: number;
  lastUpdated: string;
}

export interface TrendingStock {
  symbol: string;
  momentum: number;
  rvol: number;
  change: number;
  pattern: string;
  direction: 'up' | 'down';
}

// Legacy interfaces for backward compatibility
export interface AdvancedTradingSignal {
  id: string;
  type: 'stock' | 'call' | 'put';
  symbol: string;
  strike?: number;
  expiry?: string;
  action: 'buy' | 'sell' | 'short';
  entryPrice: number;
  stopLoss: number;
  target: number;
  premium?: number;
  confidence: number;
  pattern: string;
  timeframe: 'scalp' | 'swing' | '0DTE' | '2DTE' | '3DTE' | '5DTE' | '7DTE' | '10DTE' | '14DTE';
  indicators: string[];
  riskRewardRatio: number;
  momentum?: number;
  volumeRatio?: number;
  iv?: number;
  delta?: number;
  gamma?: number;
  openInterest?: number;
  volume?: number;
  createdAt: Date;
  notes: string;
}

export interface TrendAnalysis {
  symbol: string;
  momentum: number;
  volumeRatio: number;
  priceChange: number;
  pattern: string;
  indicators: string[];
}

export interface PatternRecognition {
  name: string;
  occurrences: number;
  winRate: number;
  avgReturn: number;
  confidence: number;
}