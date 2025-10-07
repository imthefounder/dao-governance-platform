import React, { useState } from 'react';
import { TreasuryAnalytics } from '@/types/dao-features';

interface TreasuryAnalyticsProps {
  data: TreasuryAnalytics;
}

export const TreasuryAnalyticsDashboard: React.FC<TreasuryAnalyticsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'performance' | 'spending' | 'forecasting' | 'yield'>('performance');

  const AssetPerformance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Performance Cards */}
        <div className="space-y-4">
          {data.assetPerformance.map((asset, index) => (
            <div key={asset.asset} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    asset.roi >= 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{asset.asset}</h4>
                    <p className="text-sm text-gray-500">{asset.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">
                    ${asset.currentValue.toLocaleString()}
                  </div>
                  <div className={`text-sm font-medium ${
                    asset.roi >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {asset.roi > 0 ? '+' : ''}{asset.roi.toFixed(2)}%
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">7d Change:</span>
                  <span className={`ml-1 font-medium ${
                    asset.performance7d >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {asset.performance7d > 0 ? '+' : ''}{asset.performance7d.toFixed(2)}%
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">30d Change:</span>
                  <span className={`ml-1 font-medium ${
                    asset.performance30d >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {asset.performance30d > 0 ? '+' : ''}{asset.performance30d.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Overview */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-4">Portfolio Overview</h4>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Value:</span>
              <span className="font-bold text-gray-900">
                ${data.assetPerformance.reduce((sum, asset) => sum + asset.currentValue, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total ROI:</span>
              <span className={`font-bold ${
                data.assetPerformance.reduce((sum, asset) => sum + asset.roi, 0) >= 0 
                  ? 'text-green-600' : 'text-red-600'
              }`}>
                {data.assetPerformance.reduce((sum, asset) => sum + asset.roi, 0) > 0 ? '+' : ''}
                {(data.assetPerformance.reduce((sum, asset) => sum + asset.roi, 0) / data.assetPerformance.length).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Best Performer:</span>
              <span className="font-bold text-green-600">
                {data.assetPerformance.reduce((best, asset) => 
                  asset.roi > best.roi ? asset : best
                ).symbol}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Worst Performer:</span>
              <span className="font-bold text-red-600">
                {data.assetPerformance.reduce((worst, asset) => 
                  asset.roi < worst.roi ? asset : worst
                ).symbol}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SpendingPatterns = () => (
    <div className="space-y-6">
      {/* Spending Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Spending by Category</h4>
          <div className="space-y-3">
            {data.spendingPatterns.map((pattern, index) => (
              <div key={pattern.category} className="flex items-center">
                <div className="w-20 text-sm text-gray-600">{pattern.category}</div>
                <div className="flex-1 mx-3">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-purple-500' :
                        index === 3 ? 'bg-orange-500' :
                        'bg-gray-500'
                      }`}
                      style={{ width: `${pattern.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-sm font-medium text-gray-900 text-right">
                  ${pattern.amount.toLocaleString()}
                </div>
                <div className="w-8 ml-2">
                  {pattern.trend === 'up' && <span className="text-green-500">↗️</span>}
                  {pattern.trend === 'down' && <span className="text-red-500">↘️</span>}
                  {pattern.trend === 'stable' && <span className="text-gray-500">➡️</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Spending Trends</h4>
          <div className="space-y-4">
            {data.spendingPatterns.map((pattern, index) => (
              <div key={pattern.category} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium text-gray-900">{pattern.category}</div>
                  <div className="text-sm text-gray-600">{pattern.percentage}% of total</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">${pattern.amount.toLocaleString()}</div>
                  <div className={`text-sm flex items-center ${
                    pattern.trend === 'up' ? 'text-red-600' :
                    pattern.trend === 'down' ? 'text-green-600' :
                    'text-gray-600'
                  }`}>
                    {pattern.trend === 'up' && '↗️ Increasing'}
                    {pattern.trend === 'down' && '↘️ Decreasing'}
                    {pattern.trend === 'stable' && '➡️ Stable'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const BudgetForecasting = () => (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Budget vs Actual</h4>
        <div className="space-y-4">
          {data.budgetForecasting.map((forecast, index) => (
            <div key={forecast.month} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-900">{forecast.month}</span>
                <div className="flex gap-4">
                  <span className="text-blue-600">Projected: ${forecast.projected.toLocaleString()}</span>
                  {forecast.actual !== undefined && (
                    <span className="text-gray-900">Actual: ${forecast.actual.toLocaleString()}</span>
                  )}
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-400 h-4 rounded-full"
                    style={{ width: '100%' }}
                  ></div>
                  {forecast.actual !== undefined && (
                    <div 
                      className={`absolute top-0 h-4 rounded-full ${
                        forecast.actual <= forecast.projected ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, (forecast.actual / forecast.projected) * 100)}%` }}
                    ></div>
                  )}
                </div>
              </div>
              
              {forecast.variance !== undefined && (
                <div className={`text-sm text-right ${
                  forecast.variance <= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  Variance: {forecast.variance > 0 ? '+' : ''}${forecast.variance.toLocaleString()}
                  ({((forecast.variance / forecast.projected) * 100).toFixed(1)}%)
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">
            ${data.budgetForecasting.reduce((sum, f) => sum + f.projected, 0).toLocaleString()}
          </div>
          <div className="text-sm text-blue-700">Total Projected</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">
            ${data.budgetForecasting
              .filter(f => f.actual !== undefined)
              .reduce((sum, f) => sum + (f.actual || 0), 0)
              .toLocaleString()}
          </div>
          <div className="text-sm text-green-700">Total Actual</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">
            ${Math.abs(data.budgetForecasting
              .filter(f => f.variance !== undefined)
              .reduce((sum, f) => sum + (f.variance || 0), 0))
              .toLocaleString()}
          </div>
          <div className="text-sm text-purple-700">Total Variance</div>
        </div>
      </div>
    </div>
  );

  const YieldOptimization = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.yieldOptimization.map((opportunity, index) => {
          const getRiskColor = (risk: string) => {
            return risk === 'low' ? 'green' : risk === 'medium' ? 'yellow' : 'red';
          };
          
          const riskColor = getRiskColor(opportunity.risk);
          
          return (
            <div key={opportunity.protocol} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{opportunity.protocol}</h4>
                <div className={`px-2 py-1 rounded text-xs font-medium bg-${riskColor}-100 text-${riskColor}-800`}>
                  {opportunity.risk.toUpperCase()} RISK
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">APY:</span>
                  <span className="font-bold text-green-600">{opportunity.apy.toFixed(2)}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">TVL:</span>
                  <span className="font-medium text-gray-900">${opportunity.tvl.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-sm text-gray-600">{opportunity.recommendation}</p>
                </div>
                
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium transition-colors">
                  Explore Opportunity
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Yield Comparison Chart */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">APY Comparison</h4>
        <div className="space-y-3">
          {data.yieldOptimization
            .sort((a, b) => b.apy - a.apy)
            .map((opportunity, index) => (
              <div key={opportunity.protocol} className="flex items-center">
                <div className="w-24 text-sm text-gray-600 truncate">{opportunity.protocol}</div>
                <div className="flex-1 mx-3">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        opportunity.risk === 'low' ? 'bg-green-500' :
                        opportunity.risk === 'medium' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${(opportunity.apy / Math.max(...data.yieldOptimization.map(o => o.apy))) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-sm font-medium text-gray-900 text-right">
                  {opportunity.apy.toFixed(2)}%
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'performance', label: 'Asset Performance', icon: '📊', component: AssetPerformance },
    { id: 'spending', label: 'Spending Patterns', icon: '💰', component: SpendingPatterns },
    { id: 'forecasting', label: 'Budget Forecasting', icon: '📈', component: BudgetForecasting },
    { id: 'yield', label: 'Yield Optimization', icon: '🚀', component: YieldOptimization },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="text-2xl mr-2">💎</span>
        Treasury Analytics
      </h3>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {tabs.find(tab => tab.id === activeTab)?.component()}
      </div>
    </div>
  );
};