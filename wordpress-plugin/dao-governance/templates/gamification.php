<?php
/**
 * Gamification Dashboard Template
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div id="dao-gamification-dashboard" class="dao-gamification-container">
    <!-- Loading State -->
    <div id="gamification-loading" class="dao-loading">
        <div class="loading-spinner"></div>
        <p>Loading your gamification progress...</p>
    </div>
    
    <!-- Main Dashboard -->
    <div id="gamification-content" style="display: none;">
        <!-- Header Stats -->
        <div class="gamification-header">
            <h2>🎮 Your DAO Journey</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-content">
                        <div class="stat-value" id="total-xp">0</div>
                        <div class="stat-label">Total XP</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-content">
                        <div class="stat-value" id="achievements-unlocked">0</div>
                        <div class="stat-label">Achievements</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📈</div>
                    <div class="stat-content">
                        <div class="stat-value" id="current-level">Member</div>
                        <div class="stat-label">Current Level</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🔥</div>
                    <div class="stat-content">
                        <div class="stat-value" id="current-streak">0</div>
                        <div class="stat-label">Day Streak</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab Navigation -->
        <div class="gamification-tabs">
            <button class="tab-btn active" data-tab="membership">Membership Levels</button>
            <button class="tab-btn" data-tab="achievements">Achievements</button>
            <button class="tab-btn" data-tab="challenges">Seasonal Challenges</button>
            <button class="tab-btn" data-tab="leaderboard">Leaderboard</button>
        </div>

        <!-- Membership Levels Tab -->
        <div id="membership-tab" class="tab-content active">
            <div class="membership-progress">
                <h3>Your Membership Journey</h3>
                <div class="level-progression">
                    <div class="level-item completed" data-level="1">
                        <div class="level-icon">🐣</div>
                        <div class="level-info">
                            <h4>Newcomer</h4>
                            <p>Join the DAO</p>
                        </div>
                    </div>
                    <div class="level-item current" data-level="2">
                        <div class="level-icon">🦄</div>
                        <div class="level-info">
                            <h4>Member</h4>
                            <p>500 XP Required</p>
                            <div class="progress-bar">
                                <div class="progress-fill" id="member-progress"></div>
                            </div>
                        </div>
                    </div>
                    <div class="level-item" data-level="3">
                        <div class="level-icon">🌟</div>
                        <div class="level-info">
                            <h4>Contributor</h4>
                            <p>1,000 XP Required</p>
                        </div>
                    </div>
                    <div class="level-item" data-level="4">
                        <div class="level-icon">🚀</div>
                        <div class="level-info">
                            <h4>Advocate</h4>
                            <p>2,500 XP Required</p>
                        </div>
                    </div>
                    <div class="level-item" data-level="5">
                        <div class="level-icon">👑</div>
                        <div class="level-info">
                            <h4>Guardian</h4>
                            <p>5,000 XP Required</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Achievements Tab -->
        <div id="achievements-tab" class="tab-content">
            <h3>Your Achievements</h3>
            <div class="achievements-filter">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="unlocked">Unlocked</button>
                <button class="filter-btn" data-filter="locked">Locked</button>
                <button class="filter-btn" data-filter="governance">Governance</button>
                <button class="filter-btn" data-filter="social">Social</button>
            </div>
            <div id="achievements-grid" class="achievements-grid">
                <!-- Achievements will be loaded here -->
            </div>
        </div>

        <!-- Seasonal Challenges Tab -->
        <div id="challenges-tab" class="tab-content">
            <h3>Current Season: Winter Governance Sprint</h3>
            <div class="season-info">
                <div class="season-header">
                    <div class="season-icon">❄️</div>
                    <div class="season-details">
                        <h4>Winter 2024 Challenges</h4>
                        <p>Complete challenges to earn bonus XP and exclusive rewards!</p>
                        <div class="season-timer">
                            <span id="season-countdown">15 days remaining</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="challenges-list" class="challenges-list">
                <!-- Challenges will be loaded here -->
            </div>
        </div>

        <!-- Leaderboard Tab -->
        <div id="leaderboard-tab" class="tab-content">
            <h3>DAO Leaderboard</h3>
            <div class="leaderboard-filters">
                <select id="leaderboard-period">
                    <option value="all-time">All Time</option>
                    <option value="monthly">This Month</option>
                    <option value="weekly">This Week</option>
                </select>
                <select id="leaderboard-metric">
                    <option value="xp">Total XP</option>
                    <option value="votes">Votes Cast</option>
                    <option value="proposals">Proposals Created</option>
                </select>
            </div>
            <div class="user-rank-card">
                <div class="rank-info">
                    <span class="rank-number" id="user-rank">#-</span>
                    <span class="rank-label">Your Rank</span>
                </div>
                <div class="rank-stats">
                    <span id="user-leaderboard-xp">0 XP</span>
                </div>
            </div>
            <div id="leaderboard-list" class="leaderboard-list">
                <!-- Leaderboard entries will be loaded here -->
            </div>
        </div>
    </div>

    <!-- Error State -->
    <div id="gamification-error" class="dao-error" style="display: none;">
        <h3>Unable to Load Gamification Data</h3>
        <p>Please check your wallet connection and try again.</p>
        <button onclick="loadGamificationData()" class="retry-btn">Retry</button>
    </div>
</div>

<style>
.dao-gamification-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.gamification-header {
    margin-bottom: 30px;
}

.gamification-header h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-align: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 15px;
    transition: transform 0.2s ease;
}

.stat-card:hover {
    transform: translateY(-2px);
}

.stat-icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
}

.stat-value {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
}

.stat-label {
    color: #666;
    font-size: 0.9rem;
}

.gamification-tabs {
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

.tab-btn:hover {
    background: #f5f5f5;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

.level-progression {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.level-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.level-item.completed {
    background: linear-gradient(135deg, #a8e6cf 0%, #88d8a3 100%);
}

.level-item.current {
    background: linear-gradient(135deg, #ffd3a5 0%, #fd9853 100%);
    border: 2px solid #ff9500;
}

.level-icon {
    font-size: 2.5rem;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
}

.level-info h4 {
    margin: 0 0 5px 0;
    font-size: 1.3rem;
}

.level-info p {
    margin: 0;
    color: #666;
}

.progress-bar {
    width: 200px;
    height: 8px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    margin-top: 10px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
    transition: width 0.5s ease;
}

.achievements-filter {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.filter-btn {
    background: #f0f0f0;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-btn.active {
    background: #667eea;
    color: white;
}

.achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
}

.achievement-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    border: 2px solid transparent;
}

.achievement-card.unlocked {
    border-color: #4caf50;
}

.achievement-card.locked {
    opacity: 0.6;
    background: #f5f5f5;
}

.achievement-card:hover {
    transform: translateY(-2px);
}

.season-info {
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
}

.season-header {
    display: flex;
    align-items: center;
    gap: 20px;
}

.season-icon {
    font-size: 3rem;
}

.season-timer {
    margin-top: 10px;
    font-weight: 600;
    color: #1976d2;
}

.challenges-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.challenge-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.leaderboard-filters {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.leaderboard-filters select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: white;
}

.user-rank-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.rank-number {
    font-size: 2rem;
    font-weight: bold;
}

.leaderboard-list {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.leaderboard-entry {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.2s ease;
}

.leaderboard-entry:hover {
    background: #f8f9fa;
}

.leaderboard-entry:last-child {
    border-bottom: none;
}

.entry-rank {
    font-weight: bold;
    width: 40px;
    color: #667eea;
}

.entry-info {
    flex: 1;
    margin-left: 15px;
}

.entry-name {
    font-weight: 600;
    margin-bottom: 5px;
}

.entry-address {
    font-size: 0.8rem;
    color: #666;
}

.entry-stats {
    text-align: right;
}

.entry-xp {
    font-weight: bold;
    color: #333;
}

.entry-level {
    font-size: 0.8rem;
    color: #667eea;
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
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .level-item {
        flex-direction: column;
        text-align: center;
    }
    
    .season-header {
        flex-direction: column;
        text-align: center;
    }
    
    .user-rank-card {
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gamification dashboard
    initGamificationTabs();
    loadGamificationData();
});

function initGamificationTabs() {
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

async function loadGamificationData() {
    try {
        // Show loading state
        document.getElementById('gamification-loading').style.display = 'block';
        document.getElementById('gamification-content').style.display = 'none';
        document.getElementById('gamification-error').style.display = 'none';
        
        // Get user address (this would come from wallet connection)
        const userAddress = getCurrentUserAddress();
        
        if (!userAddress) {
            throw new Error('Wallet not connected');
        }
        
        // Fetch gamification data
        const response = await fetch(`/wp-json/dao-governance/v1/gamification/${userAddress}`);
        const data = await response.json();
        
        if (data.success) {
            updateGamificationUI(data);
            // Show content
            document.getElementById('gamification-loading').style.display = 'none';
            document.getElementById('gamification-content').style.display = 'block';
            
            // Load initial tab data
            loadTabData('membership');
        } else {
            throw new Error('Failed to load gamification data');
        }
    } catch (error) {
        console.error('Error loading gamification data:', error);
        document.getElementById('gamification-loading').style.display = 'none';
        document.getElementById('gamification-error').style.display = 'block';
    }
}

function updateGamificationUI(data) {
    // Update header stats
    document.getElementById('total-xp').textContent = data.membershipLevel.totalXP.toLocaleString();
    document.getElementById('achievements-unlocked').textContent = data.achievements.filter(a => a.unlocked).length;
    document.getElementById('current-level').textContent = data.membershipLevel.current;
    document.getElementById('current-streak').textContent = '7'; // Would come from data
    
    // Update membership progress
    const progressPercentage = (data.membershipLevel.progress / 100) * 100;
    const progressBar = document.getElementById('member-progress');
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
    }
}

function loadTabData(tabName) {
    switch (tabName) {
        case 'achievements':
            loadAchievements();
            break;
        case 'challenges':
            loadSeasonalChallenges();
            break;
        case 'leaderboard':
            loadLeaderboard();
            break;
    }
}

async function loadAchievements() {
    const userAddress = getCurrentUserAddress();
    if (!userAddress) return;
    
    try {
        const response = await fetch(`/wp-json/dao-governance/v1/gamification/${userAddress}`);
        const data = await response.json();
        
        const achievementsGrid = document.getElementById('achievements-grid');
        achievementsGrid.innerHTML = '';
        
        data.achievements.forEach(achievement => {
            const achievementCard = createAchievementCard(achievement);
            achievementsGrid.appendChild(achievementCard);
        });
        
        // Initialize achievement filters
        initAchievementFilters();
    } catch (error) {
        console.error('Error loading achievements:', error);
    }
}

function createAchievementCard(achievement) {
    const card = document.createElement('div');
    card.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;
    
    card.innerHTML = `
        <div class="achievement-header">
            <div class="achievement-icon">${achievement.unlocked ? '🏆' : '🔒'}</div>
            <h4>${achievement.name}</h4>
        </div>
        <p class="achievement-description">${achievement.description || 'Achievement description'}</p>
        ${achievement.unlocked ? 
            `<div class="achievement-date">Unlocked: ${new Date(achievement.date).toLocaleDateString()}</div>` :
            `<div class="achievement-progress">Progress: ${achievement.progress || 0}%</div>`
        }
    `;
    
    return card;
}

async function loadSeasonalChallenges() {
    const userAddress = getCurrentUserAddress();
    if (!userAddress) return;
    
    try {
        const response = await fetch(`/wp-json/dao-governance/v1/gamification/${userAddress}`);
        const data = await response.json();
        
        const challengesList = document.getElementById('challenges-list');
        challengesList.innerHTML = '';
        
        data.seasonalChallenges.forEach(challenge => {
            const challengeCard = createChallengeCard(challenge);
            challengesList.appendChild(challengeCard);
        });
    } catch (error) {
        console.error('Error loading challenges:', error);
    }
}

function createChallengeCard(challenge) {
    const card = document.createElement('div');
    card.className = 'challenge-card';
    
    card.innerHTML = `
        <div class="challenge-header">
            <h4>${challenge.name}</h4>
            <div class="challenge-reward">+${challenge.reward} XP</div>
        </div>
        <div class="challenge-progress">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${challenge.progress}%"></div>
            </div>
            <div class="progress-text">${challenge.progress}% Complete</div>
        </div>
        <p class="challenge-description">${challenge.description || 'Challenge description'}</p>
    `;
    
    return card;
}

async function loadLeaderboard() {
    try {
        const response = await fetch('/wp-json/dao-governance/v1/leaderboard');
        const data = await response.json();
        
        if (data.success) {
            updateLeaderboardUI(data);
        }
    } catch (error) {
        console.error('Error loading leaderboard:', error);
    }
}

function updateLeaderboardUI(data) {
    // Update user rank
    document.getElementById('user-rank').textContent = `#${data.userRank}`;
    document.getElementById('user-leaderboard-xp').textContent = `${data.userXP || 0} XP`;
    
    // Update leaderboard list
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';
    
    data.leaders.forEach((leader, index) => {
        const entry = createLeaderboardEntry(leader, index + 1);
        leaderboardList.appendChild(entry);
    });
}

function createLeaderboardEntry(leader, rank) {
    const entry = document.createElement('div');
    entry.className = 'leaderboard-entry';
    
    let rankDisplay = rank;
    if (rank === 1) rankDisplay = '🥇';
    else if (rank === 2) rankDisplay = '🥈';
    else if (rank === 3) rankDisplay = '🥉';
    
    entry.innerHTML = `
        <div class="entry-rank">${rankDisplay}</div>
        <div class="entry-info">
            <div class="entry-name">${leader.name || 'Anonymous'}</div>
            <div class="entry-address">${leader.address}</div>
        </div>
        <div class="entry-stats">
            <div class="entry-xp">${leader.xp} XP</div>
            <div class="entry-level">${leader.level}</div>
        </div>
    `;
    
    return entry;
}

function initAchievementFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter achievements
            achievementCards.forEach(card => {
                let show = true;
                
                if (filter === 'unlocked' && card.classList.contains('locked')) {
                    show = false;
                } else if (filter === 'locked' && card.classList.contains('unlocked')) {
                    show = false;
                }
                
                card.style.display = show ? 'block' : 'none';
            });
        });
    });
}

// Utility function to get current user address
function getCurrentUserAddress() {
    // This would integrate with your wallet connection system
    // For now, return a mock address
    return window.userAddress || '0x1234567890123456789012345678901234567890';
}
</script>