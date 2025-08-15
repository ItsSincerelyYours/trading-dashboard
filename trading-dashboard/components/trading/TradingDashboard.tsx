'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TradingSignal, MarketOverview } from '@/types/trading';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign, 
  Target,
  AlertCircle,
  Clock,
  BarChart3
} from 'lucide-react';

export function TradingDashboard() {
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  const [marketOverview, setMarketOverview] = useState<MarketOverview>({
    bias: 'bullish',
    winRate: 68.5,
    profitLoss: 12450,
    totalTrades: 42,
    activeTrades: 8
  });
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [debugMode, setDebugMode] = useState(false);

  // Mock data generator with debug logging
  const generateMockSignal = useCallback((): TradingSignal => {
    const stocks = ['NVDA', 'TSLA', 'AAPL', 'AMD', 'META', 'GOOGL', 'MSFT', 'AMZN'];
    const options = ['SPY', 'QQQ', 'IWM', 'VIX'];
    const patterns = ['Bull Flag', 'Cup & Handle', 'VWAP Reclaim', 'Breakout', 'Gap Fill', 'Support Bounce'];
    
    const isOption = Math.random() > 0.5;
    const symbol = isOption ? options[Math.floor(Math.random() * options.length)] : stocks[Math.floor(Math.random() * stocks.length)];
    const basePrice = Math.random() * 500 + 100;
    
    const signal: TradingSignal = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type: isOption ? 'option' : 'stock',
      action: Math.random() > 0.5 ? 'buy' : 'sell',
      symbol: symbol,
      entryPrice: parseFloat(basePrice.toFixed(2)),
      stopLoss: parseFloat((basePrice * 0.97).toFixed(2)),
      target: parseFloat((basePrice * 1.05).toFixed(2)),
      confidence: Math.floor(Math.random() * 30) + 70,
      pattern: patterns[Math.floor(Math.random() * patterns.length)],
      timeframe: Math.random() > 0.5 ? 'scalp' : 'swing',
      createdAt: new Date(),
      notes: 'Strong momentum, volume confirmation'
    };

    if (debugMode) {
      console.log('Generated new signal:', signal);
    }

    return signal;
  }, [debugMode]);

  // Initialize with mock data
  useEffect(() => {
    console.log('TradingDashboard: Initializing component');
    
    const initialSignals: TradingSignal[] = [];
    for (let i = 0; i < 8; i++) {
      initialSignals.push(generateMockSignal());
    }
    setSignals(initialSignals);
    console.log('TradingDashboard: Initial signals created:', initialSignals.length);

    // Update data every 5 seconds
    const interval = setInterval(() => {
      const now = new Date();
      setLastUpdate(now);
      
      // Add new signal randomly (30% chance)
      if (Math.random() > 0.7) {
        setSignals(prev => {
          const newSignal = generateMockSignal();
          const updated = [newSignal, ...prev].slice(0, 8);
          if (debugMode) {
            console.log(`[${now.toLocaleTimeString()}] Added new signal:`, newSignal.symbol);
          }
          return updated;
        });
      }

      // Update market overview
      setMarketOverview(prev => {
        const updates = {
          ...prev,
          winRate: Math.max(0, Math.min(100, parseFloat((prev.winRate + (Math.random() - 0.5) * 2).toFixed(1)))),
          profitLoss: prev.profitLoss + Math.floor((Math.random() - 0.5) * 1000),
          activeTrades: Math.max(0, Math.min(8, prev.activeTrades + Math.floor((Math.random() - 0.5) * 2)))
        };
        
        if (debugMode) {
          console.log(`[${now.toLocaleTimeString()}] Market overview updated:`, updates);
        }
        
        return updates;
      });
    }, 5000);

    console.log('TradingDashboard: Update interval started (5s)');

    return () => {
      console.log('TradingDashboard: Cleaning up interval');
      clearInterval(interval);
    };
  }, [debugMode, generateMockSignal]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-500';
    if (confidence >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPLColor = (value: number) => {
    return value >= 0 ? 'text-green-500' : 'text-red-500';
  };

  // Separate stock and option signals
  const stockSignals = signals.filter(s => s.type === 'stock').slice(0, 4);
  const optionSignals = signals.filter(s => s.type === 'option').slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-blue-500" />
            Trading Dashboard
          </h1>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-sm">Live</span>
            </div>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
              {lastUpdate.toLocaleTimeString()}
            </Badge>
            <button
              onClick={() => setDebugMode(!debugMode)}
              className="ml-2 text-xs text-gray-500 hover:text-gray-300"
            >
              {debugMode ? '🐛' : ''}Debug
            </button>
          </div>
        </div>

        {/* Debug Info */}
        {debugMode && (
          <Card className="bg-gray-800/50 border-yellow-500/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm font-mono text-yellow-400">Debug Info</CardTitle>
            </CardHeader>
            <CardContent className="font-mono text-xs text-gray-400">
              <div>Total Signals: {signals.length}</div>
              <div>Stock Signals: {stockSignals.length}</div>
              <div>Option Signals: {optionSignals.length}</div>
              <div>Last Update: {lastUpdate.toLocaleTimeString()}</div>
              <div>Next Update: in {5 - (Math.floor((Date.now() - lastUpdate.getTime()) / 1000) % 5)}s</div>
            </CardContent>
          </Card>
        )}

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Market Bias</CardTitle>
              <Activity className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white capitalize">{marketOverview.bias}</div>
              <Badge 
                className={`mt-2 ${
                  marketOverview.bias === 'bullish' ? 'bg-green-500/20 text-green-400' : 
                  marketOverview.bias === 'bearish' ? 'bg-red-500/20 text-red-400' : 
                  'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {marketOverview.bias === 'bullish' ? '↑' : marketOverview.bias === 'bearish' ? '↓' : '→'} Trending
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Win Rate</CardTitle>
              <Target className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{marketOverview.winRate}%</div>
              <p className="text-xs text-gray-400 mt-2">Last {marketOverview.totalTrades} trades</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">P&L Today</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getPLColor(marketOverview.profitLoss)}`}>
                ${marketOverview.profitLoss.toLocaleString()}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {marketOverview.profitLoss >= 0 ? '↑' : '↓'} {Math.abs(marketOverview.profitLoss / 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Trades</CardTitle>
              <Clock className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{marketOverview.activeTrades}</div>
              <p className="text-xs text-gray-400 mt-2">{stockSignals.length} stocks, {optionSignals.length} options</p>
            </CardContent>
          </Card>
        </div>

        {/* Trading Signals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stock Signals */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Stock Signals ({stockSignals.length})
            </h2>
            <div className="space-y-3">
              {stockSignals.length === 0 ? (
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur">
                  <CardContent className="p-4 text-center text-gray-400">
                    No stock signals available
                  </CardContent>
                </Card>
              ) : (
                stockSignals.map((signal) => (
                  <Card key={signal.id} className="bg-gray-800/50 border-gray-700 backdrop-blur hover:bg-gray-800/70 transition-all">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <Badge className={signal.action === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                            {signal.action.toUpperCase()}
                          </Badge>
                          <span className="text-white font-bold text-lg">{signal.symbol}</span>
                          <Badge variant="outline" className="border-gray-600 text-gray-400">
                            {signal.timeframe}
                          </Badge>
                        </div>
                        <div className={`font-bold ${getConfidenceColor(signal.confidence)}`}>
                          {signal.confidence}%
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-400">Entry</p>
                          <p className="text-white font-semibold">${signal.entryPrice}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Target</p>
                          <p className="text-green-400 font-semibold">${signal.target}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Stop</p>
                          <p className="text-red-400 font-semibold">${signal.stopLoss}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-between items-center">
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                          {signal.pattern}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(signal.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Option Signals */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-blue-500" />
              Option Signals ({optionSignals.length})
            </h2>
            <div className="space-y-3">
              {optionSignals.length === 0 ? (
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur">
                  <CardContent className="p-4 text-center text-gray-400">
                    No option signals available
                  </CardContent>
                </Card>
              ) : (
                optionSignals.map((signal) => (
                  <Card key={signal.id} className="bg-gray-800/50 border-gray-700 backdrop-blur hover:bg-gray-800/70 transition-all">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <Badge className={signal.action === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                            {signal.action.toUpperCase()}
                          </Badge>
                          <span className="text-white font-bold text-lg">{signal.symbol}</span>
                          <Badge variant="outline" className="border-gray-600 text-gray-400">
                            {signal.timeframe}
                          </Badge>
                        </div>
                        <div className={`font-bold ${getConfidenceColor(signal.confidence)}`}>
                          {signal.confidence}%
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-400">Entry</p>
                          <p className="text-white font-semibold">${signal.entryPrice}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Target</p>
                          <p className="text-green-400 font-semibold">${signal.target}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Stop</p>
                          <p className="text-red-400 font-semibold">${signal.stopLoss}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-between items-center">
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                          {signal.pattern}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(signal.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Alert Section */}
        <Alert className="bg-yellow-500/10 border-yellow-500/50">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-gray-300">
            <strong className="text-white">Market Alert:</strong> High volatility detected. Trade with caution and use proper risk management.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}