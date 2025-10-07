<?php
/**
 * Analytics Dashboard Template
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div id="dao-analytics-dashboard" class="dao-analytics-container">
    <!-- Loading State -->
    <div id="analytics-loading" class="dao-loading">
        <div class="loading-spinner"></div>
        <p>Loading analytics data...</p>
    </div>
    
    <!-- Main Dashboard -->
    <div id="analytics-content" style="display: none;">
        <!-- Header -->
        <div class="analytics-header">
            <h2>📊 DAO Analytics</h2>
            <p>Comprehensive insights into DAO performance and community health</p>
            <div class="header-filters">
                <select id="time-period">
                    <option value="7d">Last 7 days</option>
                    <option value="30d" selected>Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                </select>
                <button id="refresh-data" class="refresh-btn">
                    <span class="refresh-icon">🔄</span> Refresh
                </button>
            </div>
        </div>

        <!-- Key Metrics Grid -->
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-icon">🗳️</div>
                <div class="metric-content">
                    <div class="metric-value" id="participation-rate">0%</div>
                    <div class="metric-label">Participation Rate</div>
                    <div class="metric-change positive" id="participation-change">+5.2%</div>
                </div>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon">📈</div>
                <div class="metric-content">
                    <div class="metric-value" id="active-proposals">0</div>
                    <div class="metric-label">Active Proposals</div>
                    <div class="metric-change" id="proposals-change">+2</div>
                </div>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon">💰</div>
                <div class="metric-content">
                    <div class="metric-value" id="treasury-value">$0</div>
                    <div class="metric-label">Treasury Value</div>
                    <div class="metric-change positive" id="treasury-change">+12.5%</div>
                </div>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon">👥</div>
                <div class="metric-content">
                    <div class="metric-value" id="active-members">0</div>
                    <div class="metric-label">Active Members</div>
                    <div class="metric-change positive" id="members-change">+8</div>
                </div>
            </div>
        </div>

        <!-- Tab Navigation -->
        <div class="analytics-tabs">
            <button class="tab-btn active" data-tab="governance">Governance Health</button>
            <button class="tab-btn" data-tab="treasury">Treasury Analytics</button>
            <button class="tab-btn" data-tab="community">Community Insights</button>
            <button class="tab-btn" data-tab="performance">Performance Metrics</button>
        </div>

        <!-- Governance Health Tab -->
        <div id="governance-tab" class="tab-content active">
            <div class="chart-section">
                <h3>Governance Participation Trends</h3>
                <div class="chart-container">
                    <canvas id="participation-chart" width="800" height="400"></canvas>
                </div>
            </div>
            
            <div class="governance-stats">
                <div class="stat-row">
                    <div class="stat-item">
                        <h4>Proposal Success Rate</h4>
                        <div class="stat-visual">
                            <div class="progress-ring">
                                <div class="progress-circle" data-percentage="82"></div>
                                <span class="progress-text">82%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <h4>Average Voting Power</h4>
                        <div class="stat-value-large">125.8</div>
                        <div class="stat-subtext">per active voter</div>
                    </div>
                    
                    <div class="stat-item">
                        <h4>Proposal Categories</h4>
                        <div class="category-breakdown">
                            <div class="category-item">
                                <span class="category-label">Treasury</span>
                                <span class="category-value">45%</span>
                            </div>
                            <div class="category-item">
                                <span class="category-label">Governance</span>
                                <span class="category-value">30%</span>
                            </div>
                            <div class="category-item">
                                <span class="category-label">Community</span>
                                <span class="category-value">25%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="recent-activity">
                <h3>Recent Governance Activity</h3>
                <div id="governance-activity-list" class="activity-list">
                    <!-- Activity items will be loaded here -->
                </div>
            </div>
        </div>

        <!-- Treasury Analytics Tab -->
        <div id="treasury-tab" class="tab-content">
            <div class="treasury-overview">
                <div class="treasury-total">
                    <h3>Total Treasury Value</h3>
                    <div class="treasury-amount" id="treasury-total">$2,450,000</div>
                    <div class="treasury-change-large">
                        <span class="change-value positive">+12.5%</span>
                        <span class="change-period">This month</span>
                    </div>
                </div>
                
                <div class="asset-allocation">
                    <h4>Asset Allocation</h4>
                    <div class="allocation-chart">
                        <canvas id="allocation-chart" width="300" height="300"></canvas>
                    </div>
                </div>
            </div>
            
            <div class="treasury-charts">
                <div class="chart-section">
                    <h3>Treasury Performance Over Time</h3>
                    <div class="chart-container">
                        <canvas id="treasury-performance-chart" width="800" height="400"></canvas>
                    </div>
                </div>
                
                <div class="expense-breakdown">
                    <h3>Monthly Expenses</h3>
                    <div class="expense-items">
                        <!-- Expense items will be loaded here -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Community Insights Tab -->
        <div id="community-tab" class="tab-content">
            <div class="community-metrics">
                <div class="metric-section">
                    <h3>Member Growth</h3>
                    <div class="chart-container">
                        <canvas id="member-growth-chart" width="800" height="300"></canvas>
                    </div>
                </div>
                
                <div class="engagement-metrics">
                    <h3>Engagement Metrics</h3>
                    <div class="engagement-grid">
                        <div class="engagement-card">
                            <div class="engagement-icon">💬</div>
                            <div class="engagement-content">
                                <div class="engagement-value">234</div>
                                <div class="engagement-label">Discussion Posts</div>
                            </div>
                        </div>
                        
                        <div class="engagement-card">
                            <div class="engagement-icon">🔄</div>
                            <div class="engagement-content">
                                <div class="engagement-value">1,567</div>
                                <div class="engagement-label">Member Interactions</div>
                            </div>
                        </div>
                        
                        <div class="engagement-card">
                            <div class="engagement-icon">⭐</div>
                            <div class="engagement-content">
                                <div class="engagement-value">89%</div>
                                <div class="engagement-label">Satisfaction Score</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="member-distribution">
                    <h3>Member Level Distribution</h3>
                    <div class="distribution-chart">
                        <canvas id="member-distribution-chart" width="600" height="400"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- Performance Metrics Tab -->
        <div id="performance-tab" class="tab-content">
            <div class="performance-overview">
                <h3>Key Performance Indicators</h3>
                <div class="kpi-grid">
                    <div class="kpi-card">
                        <div class="kpi-header">
                            <h4>Governance Efficiency</h4>
                            <span class="kpi-trend positive">↗️</span>
                        </div>
                        <div class="kpi-value">92.5%</div>
                        <div class="kpi-description">Average time to decision: 5.2 days</div>
                    </div>
                    
                    <div class="kpi-card">
                        <div class="kpi-header">
                            <h4>Community Health</h4>
                            <span class="kpi-trend positive">↗️</span>
                        </div>
                        <div class="kpi-value">8.7/10</div>
                        <div class="kpi-description">Based on participation & engagement</div>
                    </div>
                    
                    <div class="kpi-card">
                        <div class="kpi-header">
                            <h4>Treasury Growth</h4>
                            <span class="kpi-trend positive">↗️</span>
                        </div>
                        <div class="kpi-value">+15.2%</div>
                        <div class="kpi-description">Quarterly growth rate</div>
                    </div>
                    
                    <div class="kpi-card">
                        <div class="kpi-header">
                            <h4>Innovation Index</h4>
                            <span class="kpi-trend neutral">➡️</span>
                        </div>
                        <div class="kpi-value">7.3/10</div>
                        <div class="kpi-description">New proposals & initiatives</div>
                    </div>
                </div>
            </div>
            
            <div class="performance-charts">
                <div class="chart-section">
                    <h3>Performance Trends</h3>
                    <div class="chart-container">
                        <canvas id="performance-trends-chart" width="800" height="400"></canvas>
                    </div>
                </div>
            </div>
            
            <div class="benchmarks">
                <h3>Industry Benchmarks</h3>
                <div class="benchmark-comparison">
                    <div class="benchmark-item">
                        <div class="benchmark-metric">Participation Rate</div>
                        <div class="benchmark-bars">
                            <div class="benchmark-bar">
                                <div class="bar-fill our-dao" style="width: 68.5%"></div>
                                <span class="bar-label">Our DAO: 68.5%</span>
                            </div>
                            <div class="benchmark-bar">
                                <div class="bar-fill industry" style="width: 45%"></div>
                                <span class="bar-label">Industry Avg: 45%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="benchmark-item">
                        <div class="benchmark-metric">Decision Speed</div>
                        <div class="benchmark-bars">
                            <div class="benchmark-bar">
                                <div class="bar-fill our-dao" style="width: 85%"></div>
                                <span class="bar-label">Our DAO: 5.2 days</span>
                            </div>
                            <div class="benchmark-bar">
                                <div class="bar-fill industry" style="width: 60%"></div>
                                <span class="bar-label">Industry Avg: 8.7 days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Error State -->
    <div id="analytics-error" class="dao-error" style="display: none;">
        <h3>Unable to Load Analytics Data</h3>
        <p>Please check your connection and try again.</p>
        <button onclick="loadAnalyticsData()" class="retry-btn">Retry</button>
    </div>
</div>

<style>
.dao-analytics-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.analytics-header {
    text-align: center;
    margin-bottom: 40px;
}

.analytics-header h2 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.analytics-header p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 20px;
}

.header-filters {
    display: flex;
    justify-content: center;
    gap: 15px;
    align-items: center;
}

.header-filters select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: white;
}

.refresh-btn {
    background: #667eea;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.metric-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 20px;
}

.metric-icon {
    font-size: 2.5rem;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
}

.metric-value {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
}

.metric-label {
    color: #666;
    margin-bottom: 5px;
}

.metric-change {
    font-size: 0.9rem;
    font-weight: 600;
}

.metric-change.positive {
    color: #4caf50;
}

.metric-change.negative {
    color: #f44336;
}

.analytics-tabs {
    display: flex;
    border-bottom: 2px solid #e0e0e0;
    margin-bottom: 30px;
    overflow-x: auto;
}

.tab-btn {
    background: none;
    border: none;
    padding: 15px 25px;
    font-size: 1rem;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.tab-btn.active {
    border-bottom-color: #667eea;
    color: #667eea;
    font-weight: 600;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

.chart-section {
    background: white;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.chart-container {
    position: relative;
    margin-top: 20px;
}

.governance-stats {
    margin-bottom: 30px;
}

.stat-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
}

.stat-item {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.stat-item h4 {
    margin: 0 0 15px 0;
    color: #333;
}

.progress-ring {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 auto;
}

.progress-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: conic-gradient(#667eea 0deg, #667eea calc(var(--percentage) * 3.6deg), #e0e0e0 calc(var(--percentage) * 3.6deg));
    position: relative;
}

.progress-circle::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 60px;
    height: 60px;
    background: white;
    border-radius: 50%;
}

.progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: #333;
}

.stat-value-large {
    font-size: 2.5rem;
    font-weight: bold;
    color: #667eea;
    margin-bottom: 5px;
}

.stat-subtext {
    color: #666;
    font-size: 0.9rem;
}

.category-breakdown {
    text-align: left;
}

.category-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
}

.category-item:last-child {
    border-bottom: none;
}

.category-value {
    font-weight: bold;
    color: #667eea;
}

.recent-activity {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.activity-list {
    margin-top: 20px;
}

.activity-item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;
}

.activity-item:last-child {
    border-bottom: none;
}

.treasury-overview {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
    margin-bottom: 30px;
}

.treasury-total {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.treasury-amount {
    font-size: 3rem;
    font-weight: bold;
    color: #333;
    margin: 15px 0;
}

.treasury-change-large {
    margin-top: 15px;
}

.change-value {
    font-size: 1.5rem;
    font-weight: bold;
}

.change-value.positive {
    color: #4caf50;
}

.change-period {
    color: #666;
    margin-left: 10px;
}

.asset-allocation {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.allocation-chart {
    margin-top: 20px;
}

.treasury-charts {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
}

.expense-breakdown {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.engagement-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.engagement-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.engagement-icon {
    font-size: 2rem;
    margin-bottom: 10px;
}

.engagement-value {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
}

.engagement-label {
    color: #666;
    font-size: 0.9rem;
}

.kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
    margin-top: 20px;
}

.kpi-card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.kpi-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.kpi-header h4 {
    margin: 0;
    color: #333;
}

.kpi-trend {
    font-size: 1.2rem;
}

.kpi-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: #667eea;
    margin-bottom: 10px;
}

.kpi-description {
    color: #666;
    font-size: 0.9rem;
}

.benchmark-comparison {
    margin-top: 20px;
}

.benchmark-item {
    margin-bottom: 30px;
}

.benchmark-metric {
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
}

.benchmark-bars {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.benchmark-bar {
    position: relative;
    height: 30px;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
}

.bar-fill {
    height: 100%;
    border-radius: 4px;
    position: relative;
}

.bar-fill.our-dao {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.bar-fill.industry {
    background: linear-gradient(90deg, #ffc107 0%, #ff9800 100%);
}

.bar-label {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
}

.dao-loading {
    text-align: center;
    padding: 60px 20px;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.dao-error {
    text-align: center;
    padding: 60px 20px;
    background: #fee;
    border-radius: 12px;
    border: 2px solid #fcc;
}

.retry-btn {
    background: #667eea;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 15px;
}

@media (max-width: 768px) {
    .metrics-grid {
        grid-template-columns: 1fr;
    }
    
    .treasury-overview {
        grid-template-columns: 1fr;
    }
    
    .treasury-charts {
        grid-template-columns: 1fr;
    }
    
    .stat-row {
        grid-template-columns: 1fr;
    }
    
    .kpi-grid {
        grid-template-columns: 1fr;
    }
    
    .engagement-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    initAnalyticsTabs();
    loadAnalyticsData();
});

function initAnalyticsTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabName}-tab`) {
                    content.classList.add('active');
                }
            });
            
            // Load tab-specific data
            loadTabData(tabName);
        });
    });
}

async function loadAnalyticsData() {
    try {
        // Show loading state
        document.getElementById('analytics-loading').style.display = 'block';
        document.getElementById('analytics-content').style.display = 'none';
        document.getElementById('analytics-error').style.display = 'none';
        
        // Load governance analytics
        const governanceResponse = await fetch('/wp-json/dao-governance/v1/analytics/governance');
        const governanceData = await governanceResponse.json();
        
        // Load treasury analytics
        const treasuryResponse = await fetch('/wp-json/dao-governance/v1/analytics/treasury');
        const treasuryData = await treasuryResponse.json();
        
        if (governanceData.success && treasuryData.success) {
            updateAnalyticsUI(governanceData, treasuryData);
            
            // Show content
            document.getElementById('analytics-loading').style.display = 'none';
            document.getElementById('analytics-content').style.display = 'block';
            
            // Load initial charts
            loadTabData('governance');
        } else {
            throw new Error('Failed to load analytics data');
        }
    } catch (error) {
        console.error('Error loading analytics data:', error);
        document.getElementById('analytics-loading').style.display = 'none';
        document.getElementById('analytics-error').style.display = 'block';
    }
}

function updateAnalyticsUI(governanceData, treasuryData) {
    // Update key metrics
    document.getElementById('participation-rate').textContent = `${governanceData.participationRate}%`;
    document.getElementById('active-proposals').textContent = governanceData.activeProposals;
    document.getElementById('treasury-value').textContent = `$${treasuryData.totalValue.toLocaleString()}`;
    document.getElementById('active-members').textContent = '156'; // Would come from data
    
    // Update treasury total in treasury tab
    document.getElementById('treasury-total').textContent = `$${treasuryData.totalValue.toLocaleString()}`;
}

function loadTabData(tabName) {
    switch (tabName) {
        case 'governance':
            loadGovernanceCharts();
            loadGovernanceActivity();
            break;
        case 'treasury':
            loadTreasuryCharts();
            loadExpenseBreakdown();
            break;
        case 'community':
            loadCommunityCharts();
            break;
        case 'performance':
            loadPerformanceCharts();
            break;
    }
}

function loadGovernanceCharts() {
    // Participation chart
    const participationCtx = document.getElementById('participation-chart')?.getContext('2d');
    if (participationCtx) {
        new Chart(participationCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Participation Rate (%)',
                    data: [62, 65, 68, 71, 69, 74],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Update progress circle
    const progressCircle = document.querySelector('.progress-circle');
    if (progressCircle) {
        progressCircle.style.setProperty('--percentage', '82');
    }
}

async function loadGovernanceActivity() {
    try {
        const response = await fetch('/wp-json/dao-governance/v1/analytics/governance');
        const data = await response.json();
        
        const activityList = document.getElementById('governance-activity-list');
        activityList.innerHTML = '';
        
        if (data.recentActivity) {
            data.recentActivity.forEach(activity => {
                const item = createActivityItem(activity);
                activityList.appendChild(item);
            });
        }
    } catch (error) {
        console.error('Error loading governance activity:', error);
    }
}

function createActivityItem(activity) {
    const item = document.createElement('div');
    item.className = 'activity-item';
    
    const timeAgo = getTimeAgo(activity.timestamp);
    const activityIcon = activity.type === 'vote' ? '🗳️' : '📋';
    const activityText = activity.type === 'vote' ? 'Cast a vote' : 'Created proposal';
    
    item.innerHTML = `
        <div class="activity-icon">${activityIcon}</div>
        <div class="activity-content">
            <div class="activity-text">${activity.user} ${activityText}</div>
            <div class="activity-time">${timeAgo}</div>
        </div>
    `;
    
    return item;
}

function loadTreasuryCharts() {
    // Asset allocation pie chart
    const allocationCtx = document.getElementById('allocation-chart')?.getContext('2d');
    if (allocationCtx) {
        new Chart(allocationCtx, {
            type: 'doughnut',
            data: {
                labels: ['ETH', 'USDC', 'Other Tokens'],
                datasets: [{
                    data: [65, 30, 5],
                    backgroundColor: ['#667eea', '#764ba2', '#a8e6cf']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Treasury performance chart
    const performanceCtx = document.getElementById('treasury-performance-chart')?.getContext('2d');
    if (performanceCtx) {
        new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Treasury Value',
                    data: [2000000, 2150000, 2300000, 2200000, 2350000, 2450000],
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000000).toFixed(1) + 'M';
                            }
                        }
                    }
                }
            }
        });
    }
}

async function loadExpenseBreakdown() {
    try {
        const response = await fetch('/wp-json/dao-governance/v1/analytics/treasury');
        const data = await response.json();
        
        const expenseItems = document.querySelector('.expense-items');
        expenseItems.innerHTML = '';
        
        if (data.expenses) {
            data.expenses.forEach(expense => {
                const item = createExpenseItem(expense);
                expenseItems.appendChild(item);
            });
        }
    } catch (error) {
        console.error('Error loading expense breakdown:', error);
    }
}

function createExpenseItem(expense) {
    const item = document.createElement('div');
    item.className = 'expense-item';
    item.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid #f0f0f0;
    `;
    
    item.innerHTML = `
        <div class="expense-category">
            <div style="font-weight: 600; color: #333;">${expense.category}</div>
            <div style="color: #666; font-size: 0.9rem;">${expense.percentage}% of total</div>
        </div>
        <div class="expense-amount" style="font-weight: bold; color: #667eea;">
            $${expense.amount.toLocaleString()}
        </div>
    `;
    
    return item;
}

function loadCommunityCharts() {
    // Member growth chart
    const memberGrowthCtx = document.getElementById('member-growth-chart')?.getContext('2d');
    if (memberGrowthCtx) {
        new Chart(memberGrowthCtx, {
            type: 'area',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Total Members',
                    data: [120, 135, 142, 148, 152, 156],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Member distribution chart
    const distributionCtx = document.getElementById('member-distribution-chart')?.getContext('2d');
    if (distributionCtx) {
        new Chart(distributionCtx, {
            type: 'bar',
            data: {
                labels: ['Newcomer', 'Member', 'Contributor', 'Advocate', 'Guardian'],
                datasets: [{
                    label: 'Number of Members',
                    data: [45, 67, 28, 13, 3],
                    backgroundColor: [
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(76, 175, 80, 0.8)',
                        'rgba(255, 152, 0, 0.8)',
                        'rgba(156, 39, 176, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

function loadPerformanceCharts() {
    // Performance trends chart
    const performanceTrendsCtx = document.getElementById('performance-trends-chart')?.getContext('2d');
    if (performanceTrendsCtx) {
        new Chart(performanceTrendsCtx, {
            type: 'radar',
            data: {
                labels: ['Governance', 'Treasury', 'Community', 'Innovation', 'Growth', 'Efficiency'],
                datasets: [{
                    label: 'Current Performance',
                    data: [92, 88, 87, 73, 85, 92],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#667eea'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: false
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
}

function getTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - (timestamp * 1000);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
}

// Chart.js would need to be loaded for these charts to work
// Add this to the WordPress theme or plugin
if (typeof Chart === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    document.head.appendChild(script);
}
</script>