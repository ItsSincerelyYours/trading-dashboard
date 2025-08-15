'use client';

import React, { useState, useEffect } from 'react';

// Type definitions
interface MarketIntelligence {
  regime: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidence: number;
  vix: number;
  sectorLeader: string;
  liquidity: number;
  optionsFlow: number;
  smartMoney: 'BUYING' | 'SELLING' | 'NEUTRAL';
  breadth: number;
}

interface TradingSetup {
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

interface PatternPerformance {
  name: string;
  winRate: number;
  totalTrades: number;
  wins: number;
  avgGain: number;
  lastUpdated: string;
}

interface TrendingStock {
  symbol: string;
  momentum: number;
  rvol: number;
  change: number;
  pattern: string;
  direction: 'up' | 'down';
}

export default function AdvancedTradingDashboard() {
  // State Management
  const [marketData, setMarketData] = useState<MarketIntelligence>({
    regime: 'BULLISH',
    confidence: 82,
    vix: 14.2,
    sectorLeader: 'TECH',
    liquidity: 4.2,
    optionsFlow: 2.8,
    smartMoney: 'BUYING',
    breadth: 68
  });

  const [patternsAnalyzed, setPatternsAnalyzed] = useState(14827);
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedConfidence, setSelectedConfidence] = useState('all');

  // Stock Trading Setups
  const stockSetups: TradingSetup[] = [
    {
      id: 'stock-1',
      symbol: 'NVDA',
      type: 'SWING',
      action: 'LONG',
      pattern: 'Bull Flag Breakout + Volume Surge',
      confidence: 92,
      entry: 745.50,
      target: 768.00,
      stop: 738.00,
      rrRatio: '3.2:1',
      indicators: ['RVOL: 4.2x', 'RSI: 58', 'Above VWAP', '20MA Support', 'Gap Fill'],
      size: '20% ($10,000)'
    },
    {
      id: 'stock-2',
      symbol: 'META',
      type: 'SWING',
      action: 'LONG',
      pattern: 'VWAP Reclaim + Institutional Flow',
      confidence: 88,
      entry: 482.30,
      target: 495.00,
      stop: 478.00,
      rrRatio: '2.9:1',
      indicators: ['RVOL: 3.8x', 'RSI: 52', 'VWAP Cross', 'Dark Pool: $45M'],
      size: '20% ($10,000)'
    },
    {
      id: 'stock-3',
      symbol: 'TSLA',
      type: 'SCALP',
      action: 'LONG',
      pattern: 'Opening Range Break',
      confidence: 76,
      entry: 185.25,
      target: 187.50,
      stop: 184.50,
      rrRatio: '3.0:1',
      indicators: ['RVOL: 5.1x', 'RSI: 61', '30min Hold', 'Pre-Market Gap'],
      size: '10% ($5,000)'
    },
    {
      id: 'stock-4',
      symbol: 'AAPL',
      type: 'SCALP',
      action: 'SHORT',
      pattern: 'Resistance Rejection',
      confidence: 73,
      entry: 178.90,
      target: 177.20,
      stop: 179.40,
      rrRatio: '3.4:1',
      indicators: ['RVOL: 2.3x', 'RSI: 71', 'Below VWAP', '15min Scalp'],
      size: '10% ($5,000)'
    }
  ];

  // Options Setups - Calls
  const callOptions: TradingSetup[] = [
    {
      id: 'call-1',
      symbol: 'SPY',
      type: 'OPTION',
      action: 'LONG',
      pattern: 'Morning Momentum Surge',
      confidence: 89,
      strike: 453,
      dte: '0DTE',
      premium: 4.25,
      entry: 4.25,
      target: '+60%',
      stop: '-30%',
      rrRatio: '2.0:1',
      indicators: ['IV: 18%', 'Delta: 0.45', 'Volume: 28K', 'OI: 45K'],
      size: '5% ($2,500)',
      optionType: 'CALL'
    },
    {
      id: 'call-2',
      symbol: 'QQQ',
      type: 'OPTION',
      action: 'LONG',
      pattern: 'VWAP Reclaim Pattern',
      confidence: 85,
      strike: 388,
      dte: '2DTE',
      premium: 5.80,
      entry: 5.80,
      target: '+40%',
      stop: '-25%',
      rrRatio: '1.6:1',
      indicators: ['IV: 22%', 'Delta: 0.52', 'Gamma: 0.08', 'Flow: Bullish'],
      size: '5% ($2,500)',
      optionType: 'CALL'
    },
    {
      id: 'call-3',
      symbol: 'MSFT',
      type: 'OPTION',
      action: 'LONG',
      pattern: 'Oversold Bounce',
      confidence: 82,
      strike: 425,
      dte: '7DTE',
      premium: 7.20,
      entry: 7.20,
      target: '+35%',
      stop: '-20%',
      rrRatio: '1.75:1',
      indicators: ['IV: 19%', 'RSI: 32', 'Support Test', 'Vol Spike'],
      size: '5% ($2,500)',
      optionType: 'CALL'
    },
    {
      id: 'call-4',
      symbol: 'AMD',
      type: 'OPTION',
      action: 'LONG',
      pattern: 'Trend Continuation',
      confidence: 78,
      strike: 165,
      dte: '14DTE',
      premium: 4.50,
      entry: 4.50,
      target: '+40%',
      stop: '-25%',
      rrRatio: '1.6:1',
      indicators: ['IV: 38%', 'Trend: Up', '20MA Support', 'Sector Lead'],
      size: '5% ($2,500)',
      optionType: 'CALL'
    },
    {
      id: 'call-5',
      symbol: 'AMZN',
      type: 'OPTION',
      action: 'LONG',
      pattern: 'Squeeze Breakout',
      confidence: 86,
      strike: 180,
      dte: '3DTE',
      premium: 3.90,
      entry: 3.90,
      target: '+70%',
      stop: '-35%',
      rrRatio: '2.0:1',
      indicators: ['IV Crush', 'TTM Squeeze', 'RVOL: 6.2x', 'Bollinger Tight'],
      size: '5% ($2,500)',
      optionType: 'CALL'
    }
  ];

  // Options Setups - Puts
  const putOptions: TradingSetup[] = [
    {
      id: 'put-1',
      symbol: 'SPY',
      type: 'OPTION',
      action: 'SHORT',
      pattern: 'Rejection Reversal',
      confidence: 75,
      strike: 450,
      dte: '0DTE',
      premium: 3.20,
      entry: 3.20,
      target: '+60%',
      stop: '-30%',
      rrRatio: '2.0:1',
      indicators: ['RSI: 78', 'Resistance', 'Divergence', 'Put Flow'],
      size: '5% ($2,500)',
      optionType: 'PUT'
    },
    {
      id: 'put-2',
      symbol: 'IWM',
      type: 'OPTION',
      action: 'SHORT',
      pattern: 'VWAP Failure',
      confidence: 72,
      strike: 218,
      dte: '5DTE',
      premium: 4.80,
      entry: 4.80,
      target: '+40%',
      stop: '-25%',
      rrRatio: '1.6:1',
      indicators: ['Below VWAP', 'Failed Test', 'Weak Sector', 'IV: 24%'],
      size: '5% ($2,500)',
      optionType: 'PUT'
    },
    {
      id: 'put-3',
      symbol: 'COIN',
      type: 'OPTION',
      action: 'SHORT',
      pattern: 'Overbought Fade',
      confidence: 74,
      strike: 240,
      dte: '7DTE',
      premium: 8.50,
      entry: 8.50,
      target: '+35%',
      stop: '-20%',
      rrRatio: '1.75:1',
      indicators: ['RSI: 82', 'Extended', 'IV: 68%', 'BTC Weak'],
      size: '5% ($2,500)',
      optionType: 'PUT'
    },
    {
      id: 'put-4',
      symbol: 'ARKK',
      type: 'OPTION',
      action: 'SHORT',
      pattern: 'Breakdown Continuation',
      confidence: 81,
      strike: 52,
      dte: '10DTE',
      premium: 2.30,
      entry: 2.30,
      target: '+40%',
      stop: '-25%',
      rrRatio: '1.6:1',
      indicators: ['Downtrend', '50MA Reject', 'Outflows', 'Tech Weak'],
      size: '5% ($2,500)',
      optionType: 'PUT'
    },
    {
      id: 'put-5',
      symbol: 'BABA',
      type: 'OPTION',
      action: 'SHORT',
      pattern: 'Support Break',
      confidence: 83,
      strike: 85,
      dte: '2DTE',
      premium: 1.85,
      entry: 1.85,
      target: '+70%',
      stop: '-35%',
      rrRatio: '2.0:1',
      indicators: ['Key Break', 'Volume Spike', 'China Risk', 'RVOL: 4.8x'],
      size: '5% ($2,500)',
      optionType: 'PUT'
    }
  ];

  // Pattern Performance Data
  const patterns: PatternPerformance[] = [
    { name: 'Bull Flag Breakout', winRate: 78, totalTrades: 45, wins: 35, avgGain: 2.8, lastUpdated: 'Today' },
    { name: 'VWAP Reclaim', winRate: 72, totalTrades: 52, wins: 35, avgGain: 2.1, lastUpdated: 'Today' },
    { name: 'Power Hour Squeeze', winRate: 65, totalTrades: 29, wins: 19, avgGain: 2.5, lastUpdated: 'Yesterday' },
    { name: 'Opening Range Break', winRate: 70, totalTrades: 40, wins: 28, avgGain: 3.2, lastUpdated: 'Today' },
    { name: 'Oversold Bounce', winRate: 68, totalTrades: 38, wins: 26, avgGain: 1.9, lastUpdated: 'Today' },
    { name: 'Trend Continuation', winRate: 64, totalTrades: 33, wins: 21, avgGain: 2.3, lastUpdated: '2 days ago' }
  ];

  // Trending Stocks
  const [trendingStocks] = useState<TrendingStock[]>([
    { symbol: 'SMCI', momentum: 92, rvol: 8.3, change: 12.4, pattern: 'Breakout', direction: 'up' },
    { symbol: 'PLTR', momentum: 88, rvol: 6.7, change: 8.9, pattern: 'AI Rally', direction: 'up' },
    { symbol: 'ARM', momentum: 85, rvol: 5.2, change: 7.2, pattern: 'Squeeze', direction: 'up' },
    { symbol: 'RIVN', momentum: -78, rvol: 4.1, change: -5.8, pattern: 'Breakdown', direction: 'down' }
  ]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update market data
      setMarketData(prev => ({
        ...prev,
        vix: Math.max(10, Math.min(30, prev.vix + (Math.random() - 0.5) * 0.2)),
        breadth: Math.max(0, Math.min(100, prev.breadth + (Math.random() - 0.5) * 5)),
        confidence: Math.max(50, Math.min(95, prev.confidence + (Math.random() - 0.5) * 2)),
        liquidity: Math.max(2, Math.min(6, prev.liquidity + (Math.random() - 0.5) * 0.1))
      }));

      // Update patterns analyzed
      setPatternsAnalyzed(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceBarColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-gradient-to-r from-green-400 to-green-600';
    if (confidence >= 60) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    return 'bg-gradient-to-r from-red-400 to-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,_rgba(59,130,246,0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,_rgba(139,92,246,0.15)_0%,_transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 tracking-tight">
            🧠 Advanced AI Trading Intelligence System
          </h1>
          <p className="text-gray-400 text-lg">Neural Pattern Recognition • Multi-Timeframe Analysis • Real-Time Execution</p>
          
          {/* Status Indicators */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <div className="px-5 py-2.5 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 flex items-center gap-2 backdrop-blur-sm hover:bg-green-500/30 transition-all">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="font-semibold">LIVE SCANNING</span>
            </div>
            <div className="px-5 py-2.5 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-400 backdrop-blur-sm hover:bg-blue-500/30 transition-all">
              <span>🤖</span>
              <span className="font-semibold">Claude AI: ACTIVE</span>
            </div>
            <div className="px-5 py-2.5 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 backdrop-blur-sm hover:bg-purple-500/30 transition-all">
              <span>📊</span>
              <span className="font-semibold">{patternsAnalyzed.toLocaleString()} Patterns Analyzed</span>
            </div>
            <div className="px-5 py-2.5 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-yellow-400 backdrop-blur-sm hover:bg-yellow-500/30 transition-all">
              <span>⚡</span>
              <span className="font-semibold">Latency: 12ms</span>
            </div>
            <div className="px-5 py-2.5 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 backdrop-blur-sm hover:bg-cyan-500/30 transition-all">
              <span>🎯</span>
              <span className="font-semibold">Win Rate: 71.3%</span>
            </div>
          </div>
        </div>

        {/* AI Market Intelligence Panel */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-6 relative z-10">🔮 AI Market Intelligence</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            <div className="bg-black/40 backdrop-blur rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Market Regime</div>
              <div className={`text-2xl font-bold ${marketData.regime === 'BULLISH' ? 'text-green-400' : marketData.regime === 'BEARISH' ? 'text-red-400' : 'text-yellow-400'}`}>
                {marketData.regime}
              </div>
              <div className="text-sm text-green-400 flex items-center gap-1">
                <span>↑</span>
                <span>{marketData.confidence.toFixed(0)}% Confidence</span>
              </div>
            </div>
            <div className="bg-black/40 backdrop-blur rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Volatility Forecast</div>
              <div className="text-2xl font-bold text-yellow-400">{marketData.vix.toFixed(1)}</div>
              <div className="text-sm text-yellow-400">→ Stable (VIX)</div>
            </div>
            <div className="bg-black/40 backdrop-blur rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Sector Rotation</div>
              <div className="text-2xl font-bold text-blue-400">{marketData.sectorLeader}</div>
              <div className="text-sm text-green-400">↑ Leading +3.2%</div>
            </div>
            <div className="bg-black/40 backdrop-blur rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Liquidity Flow</div>
              <div className="text-2xl font-bold text-green-400">${marketData.liquidity.toFixed(1)}B</div>
              <div className="text-sm text-green-400">↑ Inflow Detected</div>
            </div>
            <div className="bg-black/40 backdrop-blur rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Options Flow</div>
              <div className="text-2xl font-bold text-green-400">{marketData.optionsFlow}:1</div>
              <div className="text-sm text-gray-400">Call/Put Ratio</div>
            </div>
            <div className="bg-black/40 backdrop-blur rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Smart Money</div>
              <div className="text-2xl font-bold text-cyan-400">{marketData.smartMoney}</div>
              <div className="text-sm text-cyan-400">↑ Institutions Active</div>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="bg-black/30 backdrop-blur rounded-xl p-4 mb-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Timeframe:</span>
            <select 
              className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              <option value="all">All Timeframes</option>
              <option value="scalp">Scalp (5-30min)</option>
              <option value="day">Day Trade (1-4hr)</option>
              <option value="swing">Swing (1-3 days)</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Confidence:</span>
            <select 
              className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
              value={selectedConfidence}
              onChange={(e) => setSelectedConfidence(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="high">High (&gt;80%)</option>
              <option value="medium">Medium (60-80%)</option>
              <option value="aggressive">Aggressive (&lt;60%)</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Risk/Reward:</span>
            <select className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400 cursor-pointer">
              <option>All R:R</option>
              <option>Conservative (&gt;2:1)</option>
              <option>Balanced (1.5:1)</option>
              <option>Aggressive (1:1)</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Pattern Type:</span>
            <select className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400 cursor-pointer">
              <option>All Patterns</option>
              <option>Breakout</option>
              <option>Reversal</option>
              <option>Continuation</option>
              <option>Squeeze</option>
            </select>
          </div>
        </div>

        {/* Stock Trading Setups */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6 bg-black/30 backdrop-blur rounded-xl p-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>📈</span>
              <span>Stock Trading Setups (4)</span>
            </h2>
            <div className="flex gap-3">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold">2 Swing Trades</span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-semibold">2 Scalp Trades</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {stockSetups.map((setup) => (
              <div 
                key={setup.id} 
                className={`bg-gray-900/50 backdrop-blur-xl rounded-xl border-l-4 ${
                  setup.action === 'LONG' ? 'border-green-500' : 'border-red-500'
                } p-6 hover:transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 border border-white/10`}
              >
                <div className="flex justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-white">{setup.symbol}</div>
                    <span className={`inline-block mt-1 px-2 py-1 ${
                      setup.type === 'SWING' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'
                    } rounded text-xs font-semibold uppercase tracking-wider`}>
                      {setup.type} {setup.action === 'SHORT' ? 'SHORT' : 'TRADE'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getConfidenceColor(setup.confidence)}`}>
                      {setup.confidence}%
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Confidence</div>
                  </div>
                </div>

                <div className="bg-purple-500/20 text-purple-300 rounded-lg px-3 py-2 mb-4 text-sm font-medium">
                  🚀 {setup.pattern}
                </div>

                <div className="h-2 bg-gray-700 rounded-full mb-4 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getConfidenceBarColor(setup.confidence)} relative overflow-hidden`}
                    style={{ width: `${setup.confidence}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>

                <div className="bg-black/40 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Entry</div>
                      <div className="text-lg font-bold text-white">${setup.entry}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Target</div>
                      <div className="text-lg font-bold text-green-400">${setup.target}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Stop</div>
                      <div className="text-lg font-bold text-red-400">${setup.stop}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {setup.indicators.map((indicator, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-medium">
                      {indicator}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <div>
                    <span className="text-green-400 font-bold">R:R {setup.rrRatio}</span>
                    <span className="text-gray-400 text-sm ml-3">Size: {setup.size}</span>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg">
                    Execute Trade
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Options Trading Setups */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6 bg-black/30 backdrop-blur rounded-xl p-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>⚡</span>
              <span>Options Trading Setups (10)</span>
            </h2>
            <div className="flex gap-3">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold">5 Calls</span>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-semibold">5 Puts</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* Render Call Options */}
            {callOptions.map((option) => (
              <div 
                key={option.id}
                className="bg-gray-900/50 backdrop-blur-xl rounded-xl border-l-4 border-green-500 p-4 hover:transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 border border-white/10"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-xl font-bold text-white">{option.symbol}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-semibold">
                      CALL
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-semibold">
                    {option.dte}
                  </span>
                </div>

                <div className="text-sm space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Strike:</span>
                    <span className="text-white font-semibold">${option.strike}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Premium:</span>
                    <span className="text-white font-semibold">${option.premium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target:</span>
                    <span className="text-green-400 font-semibold">{option.target}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stop:</span>
                    <span className="text-red-400 font-semibold">{option.stop}</span>
                  </div>
                </div>

                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden mb-3">
                  <div 
                    className={`h-full rounded-full ${getConfidenceBarColor(option.confidence)}`}
                    style={{ width: `${option.confidence}%` }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm font-bold ${getConfidenceColor(option.confidence)}`}>
                    {option.confidence}%
                  </span>
                  <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold hover:bg-green-500/30 transition-all">
                    Execute
                  </button>
                </div>
              </div>
            ))}

            {/* Render Put Options */}
            {putOptions.map((option) => (
              <div 
                key={option.id}
                className="bg-gray-900/50 backdrop-blur-xl rounded-xl border-l-4 border-red-500 p-4 hover:transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-red-500/20 border border-white/10"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-xl font-bold text-white">{option.symbol}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs font-semibold">
                      PUT
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-semibold">
                    {option.dte}
                  </span>
                </div>

                <div className="text-sm space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Strike:</span>
                    <span className="text-white font-semibold">${option.strike}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Premium:</span>
                    <span className="text-white font-semibold">${option.premium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target:</span>
                    <span className="text-green-400 font-semibold">{option.target}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stop:</span>
                    <span className="text-red-400 font-semibold">{option.stop}</span>
                  </div>
                </div>

                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden mb-3">
                  <div 
                    className={`h-full rounded-full ${getConfidenceBarColor(option.confidence)}`}
                    style={{ width: `${option.confidence}%` }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm font-bold ${getConfidenceColor(option.confidence)}`}>
                    {option.confidence}%
                  </span>
                  <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold hover:bg-red-500/30 transition-all">
                    Execute
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Trend Detection */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>📡</span>
            <span>Real-Time Trend Detection</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingStocks.map((stock, i) => (
              <div key={i} className="bg-black/40 rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="text-lg font-bold text-white mb-3">
                  {stock.direction === 'up' ? '🔥' : '📉'} {stock.symbol}
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Momentum</span>
                      <span className={`text-sm font-semibold ${stock.direction === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {Math.abs(stock.momentum)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${stock.direction === 'up' ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`}
                        style={{ width: `${Math.abs(stock.momentum)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-xs">RVOL: {stock.rvol}x</span>
                    <span className={`px-2 py-0.5 ${stock.direction === 'up' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'} rounded text-xs`}>
                      {stock.change > 0 ? '+' : ''}{stock.change}%
                    </span>
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs">{stock.pattern}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Pattern Recognition Engine */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-6 relative z-10 flex items-center gap-2">
            <span>🧠</span>
            <span>AI Pattern Recognition Engine</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 relative z-10">
            {patterns.map((pattern, i) => (
              <div 
                key={i} 
                className="bg-black/40 backdrop-blur rounded-xl p-4 border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer hover:transform hover:scale-[1.02]"
              >
                <div className="text-sm font-bold text-white mb-3">🎯 {pattern.name}</div>
                <div className="h-2 bg-gray-700 rounded-full mb-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${pattern.winRate >= 70 ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-yellow-400 to-yellow-600'} relative overflow-hidden`}
                    style={{ width: `${pattern.winRate}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className={`text-lg font-bold ${pattern.winRate >= 70 ? 'text-green-400' : 'text-yellow-400'}`}>
                      {pattern.winRate}%
                    </div>
                    <div className="text-xs text-gray-400">Win</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{pattern.totalTrades}</div>
                    <div className="text-xs text-gray-400">Total</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-400">+{pattern.avgGain}%</div>
                    <div className="text-xs text-gray-400">Avg</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}