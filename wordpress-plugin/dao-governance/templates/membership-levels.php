<?php
/**
 * Membership Levels Template
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div id="dao-membership-levels" class="dao-membership-container">
    <!-- Loading State -->
    <div id="membership-loading" class="dao-loading">
        <div class="loading-spinner"></div>
        <p>Loading membership information...</p>
    </div>
    
    <!-- Main Content -->
    <div id="membership-content" style="display: none;">
        <!-- Header -->
        <div class="membership-header">
            <h2>🦄 Membership Levels</h2>
            <p>Progress through the DAO and unlock exclusive benefits at each level!</p>
        </div>

        <!-- Current Status -->
        <div class="current-status-card">
            <div class="status-header">
                <div class="current-level-icon" id="current-level-icon">🦄</div>
                <div class="status-info">
                    <h3 id="current-level-name">Member</h3>
                    <p id="current-level-description">Active participant in DAO governance</p>
                </div>
            </div>
            <div class="status-progress">
                <div class="xp-info">
                    <span id="current-xp">750</span> / <span id="required-xp">1000</span> XP
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="current-progress"></div>
                </div>
                <div class="progress-percentage" id="progress-percentage">75%</div>
            </div>
            <div class="next-level-info">
                <span>Next Level: <strong id="next-level-name">Contributor</strong></span>
                <span id="xp-needed">250 XP needed</span>
            </div>
        </div>

        <!-- All Levels -->
        <div class="levels-grid">
            <!-- Level 1: Newcomer -->
            <div class="level-card completed" data-level="1">
                <div class="level-badge">
                    <div class="level-icon">🐣</div>
                    <div class="level-number">1</div>
                </div>
                <div class="level-content">
                    <h3>Newcomer</h3>
                    <div class="level-requirement">0 XP Required</div>
                    <div class="level-description">
                        Welcome to the DAO! Complete your first actions to get started.
                    </div>
                    <div class="level-benefits">
                        <h4>Benefits:</h4>
                        <ul>
                            <li>✅ Access to public discussions</li>
                            <li>✅ Proposal viewing rights</li>
                            <li>✅ Basic DAO information</li>
                        </ul>
                    </div>
                    <div class="level-tasks">
                        <h4>To Advance:</h4>
                        <ul>
                            <li>✅ Connect your wallet</li>
                            <li>✅ Join the DAO community</li>
                            <li>✅ Read the governance guide</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Level 2: Member -->
            <div class="level-card current" data-level="2">
                <div class="level-badge">
                    <div class="level-icon">🦄</div>
                    <div class="level-number">2</div>
                </div>
                <div class="level-content">
                    <h3>Member</h3>
                    <div class="level-requirement">500 XP Required</div>
                    <div class="level-description">
                        Active participant with voting rights and engagement privileges.
                    </div>
                    <div class="level-benefits">
                        <h4>Benefits:</h4>
                        <ul>
                            <li>✅ Voting rights on proposals</li>
                            <li>✅ Comment on discussions</li>
                            <li>✅ Access to member-only channels</li>
                            <li>✅ Monthly newsletter access</li>
                        </ul>
                    </div>
                    <div class="level-tasks">
                        <h4>To Advance:</h4>
                        <ul>
                            <li>⭕ Cast 10 votes (7/10)</li>
                            <li>⭕ Participate in 5 discussions (3/5)</li>
                            <li>⭕ Attend 2 community calls (1/2)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Level 3: Contributor -->
            <div class="level-card" data-level="3">
                <div class="level-badge">
                    <div class="level-icon">🌟</div>
                    <div class="level-number">3</div>
                </div>
                <div class="level-content">
                    <h3>Contributor</h3>
                    <div class="level-requirement">1,000 XP Required</div>
                    <div class="level-description">
                        Recognized contributor actively shaping the DAO's future.
                    </div>
                    <div class="level-benefits">
                        <h4>Benefits:</h4>
                        <ul>
                            <li>🔮 Proposal creation rights</li>
                            <li>🔮 Early access to new features</li>
                            <li>🔮 Contributor badge & recognition</li>
                            <li>🔮 Quarterly contributor rewards</li>
                            <li>🔮 Access to contributor workshops</li>
                        </ul>
                    </div>
                    <div class="level-tasks">
                        <h4>To Advance:</h4>
                        <ul>
                            <li>⚪ Create 2 successful proposals</li>
                            <li>⚪ Mentor 3 new members</li>
                            <li>⚪ Lead a community initiative</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Level 4: Advocate -->
            <div class="level-card" data-level="4">
                <div class="level-badge">
                    <div class="level-icon">🚀</div>
                    <div class="level-number">4</div>
                </div>
                <div class="level-content">
                    <h3>Advocate</h3>
                    <div class="level-requirement">2,500 XP Required</div>
                    <div class="level-description">
                        Influential advocate representing the DAO in the broader ecosystem.
                    </div>
                    <div class="level-benefits">
                        <h4>Benefits:</h4>
                        <ul>
                            <li>🔮 Committee nomination rights</li>
                            <li>🔮 Speaker opportunities at events</li>
                            <li>🔮 Exclusive advocate NFT</li>
                            <li>🔮 Priority support access</li>
                            <li>🔮 Advanced governance tools</li>
                            <li>🔮 Partnership proposal rights</li>
                        </ul>
                    </div>
                    <div class="level-tasks">
                        <h4>To Advance:</h4>
                        <ul>
                            <li>⚪ Serve on a DAO committee</li>
                            <li>⚪ Represent DAO at external events</li>
                            <li>⚪ Contribute to strategic planning</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Level 5: Guardian -->
            <div class="level-card" data-level="5">
                <div class="level-badge">
                    <div class="level-icon">👑</div>
                    <div class="level-number">5</div>
                </div>
                <div class="level-content">
                    <h3>Guardian</h3>
                    <div class="level-requirement">5,000 XP Required</div>
                    <div class="level-description">
                        Elite guardian trusted with the highest responsibilities and privileges.
                    </div>
                    <div class="level-benefits">
                        <h4>Benefits:</h4>
                        <ul>
                            <li>🔮 Multi-sig wallet access</li>
                            <li>🔮 Emergency governance powers</li>
                            <li>🔮 Exclusive guardian council membership</li>
                            <li>🔮 Revenue sharing participation</li>
                            <li>🔮 Cross-DAO ambassador status</li>
                            <li>🔮 Lifetime achievement recognition</li>
                        </ul>
                    </div>
                    <div class="level-tasks">
                        <h4>Guardian Responsibilities:</h4>
                        <ul>
                            <li>⚪ Maintain treasury oversight</li>
                            <li>⚪ Guide strategic decisions</li>
                            <li>⚪ Mentor advocate members</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- XP Earning Guide -->
        <div class="xp-guide">
            <h3>💫 How to Earn XP</h3>
            <div class="xp-activities">
                <div class="activity-category">
                    <h4>Governance Activities</h4>
                    <div class="activity-list">
                        <div class="activity-item">
                            <span class="activity-name">Cast a vote on proposal</span>
                            <span class="activity-xp">+50 XP</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-name">Create a proposal</span>
                            <span class="activity-xp">+200 XP</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-name">Proposal passes</span>
                            <span class="activity-xp">+300 XP</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-name">Delegate voting power</span>
                            <span class="activity-xp">+25 XP</span>
                        </div>
                    </div>
                </div>
                
                <div class="activity-category">
                    <h4>Community Engagement</h4>
                    <div class="activity-list">
                        <div class="activity-item">
                            <span class="activity-name">Join discussion</span>
                            <span class="activity-xp">+10 XP</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-name">Create discussion thread</span>
                            <span class="activity-xp">+75 XP</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-name">Helpful community response</span>
                            <span class="activity-xp">+25 XP</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-name">Attend community call</span>
                            <span class="activity-xp">+100 XP</span>
                        </div>
                    </div>
                </div>
                
                <div class="activity-category">
                    <h4>Special Achievements</h4>
                    <div class="activity-list">
                        <div class="activity-item">
                            <span class="activity-name">Complete seasonal challenge</span>
                            <span class="activity-xp">+150 XP</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-name">Refer new member</span>
                            <span class="activity-xp">+100 XP</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-name">Contribute to documentation</span>
                            <span class="activity-xp">+200 XP</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-name">Bug report/feedback</span>
                            <span class="activity-xp">+50 XP</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Error State -->
    <div id="membership-error" class="dao-error" style="display: none;">
        <h3>Unable to Load Membership Data</h3>
        <p>Please check your wallet connection and try again.</p>
        <button onclick="loadMembershipData()" class="retry-btn">Retry</button>
    </div>
</div>

<style>
.dao-membership-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.membership-header {
    text-align: center;
    margin-bottom: 40px;
}

.membership-header h2 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.membership-header p {
    font-size: 1.2rem;
    color: #666;
}

.current-status-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    padding: 30px;
    margin-bottom: 40px;
}

.status-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
}

.current-level-icon {
    font-size: 4rem;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
}

.status-info h3 {
    margin: 0 0 5px 0;
    font-size: 2rem;
}

.status-info p {
    margin: 0;
    opacity: 0.9;
    font-size: 1.1rem;
}

.status-progress {
    margin-bottom: 20px;
}

.xp-info {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 10px;
}

.progress-bar {
    width: 100%;
    height: 12px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 10px;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #a8e6cf 0%, #88d8a3 100%);
    border-radius: 6px;
    transition: width 0.5s ease;
}

.progress-percentage {
    text-align: right;
    font-weight: bold;
}

.next-level-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
}

.levels-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    margin-bottom: 50px;
}

.level-card {
    background: white;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 3px solid transparent;
    position: relative;
    overflow: hidden;
}

.level-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #e0e0e0;
}

.level-card.completed::before {
    background: linear-gradient(90deg, #4caf50 0%, #8bc34a 100%);
}

.level-card.current::before {
    background: linear-gradient(90deg, #ff9800 0%, #ffc107 100%);
}

.level-card.current {
    border-color: #ff9800;
    transform: translateY(-5px);
}

.level-card.completed {
    border-color: #4caf50;
}

.level-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
}

.level-badge {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.level-icon {
    font-size: 3rem;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 50%;
}

.level-card.completed .level-icon {
    background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
}

.level-card.current .level-icon {
    background: linear-gradient(135deg, #ff9800 0%, #ffc107 100%);
}

.level-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: #667eea;
    background: #f0f2ff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.level-content h3 {
    margin: 0 0 10px 0;
    font-size: 1.8rem;
    color: #333;
}

.level-requirement {
    color: #667eea;
    font-weight: 600;
    margin-bottom: 15px;
    font-size: 1.1rem;
}

.level-description {
    color: #666;
    margin-bottom: 20px;
    line-height: 1.6;
}

.level-benefits,
.level-tasks {
    margin-bottom: 20px;
}

.level-benefits h4,
.level-tasks h4 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 1.1rem;
}

.level-benefits ul,
.level-tasks ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.level-benefits li,
.level-tasks li {
    padding: 5px 0;
    color: #555;
    display: flex;
    align-items: center;
    gap: 8px;
}

.level-benefits li::before {
    font-size: 0.9rem;
}

.xp-guide {
    background: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.xp-guide h3 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2rem;
    color: #333;
}

.xp-activities {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.activity-category h4 {
    margin: 0 0 15px 0;
    color: #667eea;
    font-size: 1.3rem;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 10px;
}

.activity-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.activity-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    background: #f8f9fa;
    border-radius: 8px;
    transition: background 0.2s ease;
}

.activity-item:hover {
    background: #e9ecef;
}

.activity-name {
    color: #333;
    font-weight: 500;
}

.activity-xp {
    color: #667eea;
    font-weight: bold;
    background: #e8f0fe;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.9rem;
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
    .status-header {
        flex-direction: column;
        text-align: center;
    }
    
    .levels-grid {
        grid-template-columns: 1fr;
    }
    
    .xp-activities {
        grid-template-columns: 1fr;
    }
    
    .next-level-info {
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    loadMembershipData();
});

async function loadMembershipData() {
    try {
        // Show loading state
        document.getElementById('membership-loading').style.display = 'block';
        document.getElementById('membership-content').style.display = 'none';
        document.getElementById('membership-error').style.display = 'none';
        
        // Get user address
        const userAddress = getCurrentUserAddress();
        
        if (!userAddress) {
            throw new Error('Wallet not connected');
        }
        
        // Fetch membership data
        const response = await fetch(`/wp-json/dao-governance/v1/gamification/${userAddress}`);
        const data = await response.json();
        
        if (data.success) {
            updateMembershipUI(data);
            // Show content
            document.getElementById('membership-loading').style.display = 'none';
            document.getElementById('membership-content').style.display = 'block';
        } else {
            throw new Error('Failed to load membership data');
        }
    } catch (error) {
        console.error('Error loading membership data:', error);
        document.getElementById('membership-loading').style.display = 'none';
        document.getElementById('membership-error').style.display = 'block';
    }
}

function updateMembershipUI(data) {
    const membershipLevel = data.membershipLevel;
    
    // Update current status card
    document.getElementById('current-level-icon').textContent = getLevelIcon(membershipLevel.tier);
    document.getElementById('current-level-name').textContent = membershipLevel.current;
    document.getElementById('current-level-description').textContent = getLevelDescription(membershipLevel.current);
    document.getElementById('current-xp').textContent = membershipLevel.totalXP.toLocaleString();
    document.getElementById('required-xp').textContent = membershipLevel.requiredXP.toLocaleString();
    
    // Update progress bar
    const progressPercentage = (membershipLevel.totalXP / membershipLevel.requiredXP) * 100;
    document.getElementById('current-progress').style.width = `${Math.min(progressPercentage, 100)}%`;
    document.getElementById('progress-percentage').textContent = `${Math.round(progressPercentage)}%`;
    
    // Update next level info
    const nextLevel = getNextLevel(membershipLevel.tier);
    document.getElementById('next-level-name').textContent = nextLevel.name;
    document.getElementById('xp-needed').textContent = `${membershipLevel.requiredXP - membershipLevel.totalXP} XP needed`;
    
    // Update level cards status
    updateLevelCards(membershipLevel.tier);
}

function getLevelIcon(tier) {
    const icons = {
        1: '🐣',
        2: '🦄',
        3: '🌟',
        4: '🚀',
        5: '👑'
    };
    return icons[tier] || '🦄';
}

function getLevelDescription(levelName) {
    const descriptions = {
        'Newcomer': 'Welcome to the DAO community!',
        'Member': 'Active participant in DAO governance',
        'Contributor': 'Recognized contributor shaping the DAO',
        'Advocate': 'Influential advocate in the ecosystem',
        'Guardian': 'Elite guardian with highest privileges'
    };
    return descriptions[levelName] || 'DAO community member';
}

function getNextLevel(currentTier) {
    const levels = {
        1: { name: 'Member', tier: 2 },
        2: { name: 'Contributor', tier: 3 },
        3: { name: 'Advocate', tier: 4 },
        4: { name: 'Guardian', tier: 5 },
        5: { name: 'Guardian', tier: 5 } // Max level
    };
    return levels[currentTier] || levels[2];
}

function updateLevelCards(currentTier) {
    const levelCards = document.querySelectorAll('.level-card');
    
    levelCards.forEach(card => {
        const levelNum = parseInt(card.dataset.level);
        
        // Remove existing status classes
        card.classList.remove('completed', 'current');
        
        if (levelNum < currentTier) {
            card.classList.add('completed');
        } else if (levelNum === currentTier) {
            card.classList.add('current');
        }
        // Future levels remain without special class
    });
}

// Utility function to get current user address
function getCurrentUserAddress() {
    // This would integrate with your wallet connection system
    return window.userAddress || '0x1234567890123456789012345678901234567890';
}
</script>