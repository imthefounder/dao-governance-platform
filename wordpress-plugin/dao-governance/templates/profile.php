<?php
/**
 * Personal Dashboard/Profile Template
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div id="dao-profile-dashboard" class="dao-profile-container">
    <!-- Loading State -->
    <div id="profile-loading" class="dao-loading">
        <div class="loading-spinner"></div>
        <p>Loading your profile...</p>
    </div>
    
    <!-- Main Content -->
    <div id="profile-content" style="display: none;">
        <!-- Profile Header -->
        <div class="profile-header">
            <div class="profile-info">
                <div class="profile-avatar" id="profile-avatar">🦄</div>
                <div class="profile-details">
                    <h2 id="profile-name">Your Profile</h2>
                    <div class="profile-address" id="profile-address">Not connected</div>
                    <div class="profile-level">
                        <span class="level-badge" id="profile-level">Member</span>
                        <span class="level-xp" id="profile-xp">750 XP</span>
                    </div>
                </div>
            </div>
            <div class="profile-actions">
                <button id="edit-profile-btn" class="action-btn">
                    <span class="btn-icon">✏️</span>
                    Edit Profile
                </button>
                <button id="share-profile-btn" class="action-btn secondary">
                    <span class="btn-icon">🔗</span>
                    Share
                </button>
            </div>
        </div>

        <!-- Dashboard Grid -->
        <div class="dashboard-grid">
            <!-- Quick Stats -->
            <div class="dashboard-card stats-card">
                <h3>Your Stats</h3>
                <div class="stats-list">
                    <div class="stat-item">
                        <span class="stat-label">Proposals Voted On</span>
                        <span class="stat-value" id="votes-cast">7</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Proposals Created</span>
                        <span class="stat-value" id="proposals-created">2</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Days Active</span>
                        <span class="stat-value" id="days-active">45</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Community Rank</span>
                        <span class="stat-value" id="community-rank">#12</span>
                    </div>
                </div>
            </div>

            <!-- Progress to Next Level -->
            <div class="dashboard-card progress-card">
                <h3>Progress to Next Level</h3>
                <div class="level-progress">
                    <div class="current-level">
                        <span class="level-icon" id="current-level-icon">🦄</span>
                        <span id="current-level-name">Member</span>
                    </div>
                    <div class="progress-arrow">→</div>
                    <div class="next-level">
                        <span class="level-icon" id="next-level-icon">🌟</span>
                        <span id="next-level-name">Contributor</span>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="level-progress-fill"></div>
                </div>
                <div class="progress-text">
                    <span id="progress-xp">750</span> / <span id="required-xp">1000</span> XP
                    (<span id="remaining-xp">250</span> XP to go)
                </div>
            </div>

            <!-- Recent Achievements -->
            <div class="dashboard-card achievements-card">
                <h3>Recent Achievements</h3>
                <div id="recent-achievements" class="achievements-list">
                    <!-- Achievements will be loaded here -->
                </div>
                <button class="view-all-btn">View All Achievements</button>
            </div>

            <!-- Voting History -->
            <div class="dashboard-card voting-card">
                <h3>Recent Voting Activity</h3>
                <div id="voting-history" class="voting-history">
                    <!-- Voting history will be loaded here -->
                </div>
                <button class="view-all-btn">View Full History</button>
            </div>

            <!-- Active Proposals -->
            <div class="dashboard-card proposals-card">
                <h3>Proposals Requiring Your Vote</h3>
                <div id="pending-proposals" class="pending-proposals">
                    <!-- Pending proposals will be loaded here -->
                </div>
            </div>

            <!-- Community Activity -->
            <div class="dashboard-card activity-card">
                <h3>Your Community Activity</h3>
                <div id="community-activity" class="activity-feed">
                    <!-- Activity feed will be loaded here -->
                </div>
            </div>
        </div>

        <!-- Detailed Sections -->
        <div class="detailed-sections">
            <!-- Portfolio Overview -->
            <div class="section-card portfolio-section">
                <h3>Your DAO Portfolio</h3>
                <div class="portfolio-grid">
                    <div class="portfolio-item">
                        <div class="portfolio-label">Voting Power</div>
                        <div class="portfolio-value" id="voting-power">125.5</div>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-label">Delegated To</div>
                        <div class="portfolio-value" id="delegated-to">Self</div>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-label">Delegations Received</div>
                        <div class="portfolio-value" id="delegations-received">0</div>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-label">Governance Tokens</div>
                        <div class="portfolio-value" id="governance-tokens">1,250</div>
                    </div>
                </div>
            </div>

            <!-- Contribution History -->
            <div class="section-card contributions-section">
                <h3>Your Contributions</h3>
                <div class="contributions-timeline">
                    <div id="contributions-list" class="timeline-list">
                        <!-- Contributions timeline will be loaded here -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Profile Modal -->
    <div id="edit-profile-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Profile</h3>
                <button class="modal-close">×</button>
            </div>
            <form id="edit-profile-form">
                <div class="form-group">
                    <label for="profile-display-name">Display Name</label>
                    <input type="text" id="profile-display-name" placeholder="Enter your display name" />
                </div>
                <div class="form-group">
                    <label for="profile-bio">Bio</label>
                    <textarea id="profile-bio" placeholder="Tell us about yourself..." rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label for="profile-twitter">Twitter (optional)</label>
                    <input type="text" id="profile-twitter" placeholder="@username" />
                </div>
                <div class="form-group">
                    <label for="profile-discord">Discord (optional)</label>
                    <input type="text" id="profile-discord" placeholder="username#1234" />
                </div>
                <div class="form-group">
                    <label for="profile-website">Website (optional)</label>
                    <input type="url" id="profile-website" placeholder="https://yourwebsite.com" />
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="profile-public" />
                        Make profile public
                    </label>
                </div>
                <div class="form-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="submit-btn">Save Changes</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Error State -->
    <div id="profile-error" class="dao-error" style="display: none;">
        <h3>Unable to Load Profile</h3>
        <p>Please check your wallet connection and try again.</p>
        <button onclick="loadProfileData()" class="retry-btn">Retry</button>
    </div>
</div>

<style>
.dao-profile-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.profile-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    padding: 30px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.profile-info {
    display: flex;
    align-items: center;
    gap: 25px;
}

.profile-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    border: 3px solid rgba(255, 255, 255, 0.3);
}

.profile-details h2 {
    margin: 0 0 8px 0;
    font-size: 2rem;
}

.profile-address {
    font-family: 'Courier New', monospace;
    opacity: 0.9;
    margin-bottom: 10px;
    font-size: 0.9rem;
}

.profile-level {
    display: flex;
    align-items: center;
    gap: 10px;
}

.level-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
}

.level-xp {
    opacity: 0.9;
    font-weight: 500;
}

.profile-actions {
    display: flex;
    gap: 10px;
}

.action-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    transition: all 0.2s ease;
}

.action-btn:hover {
    background: rgba(255, 255, 255, 0.3);
}

.action-btn.secondary {
    background: transparent;
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
}

.dashboard-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
}

.dashboard-card:hover {
    transform: translateY(-2px);
}

.dashboard-card h3 {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 1.3rem;
}

.stats-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
}

.stat-item:last-child {
    border-bottom: none;
}

.stat-label {
    color: #666;
    font-weight: 500;
}

.stat-value {
    font-weight: bold;
    color: #667eea;
    font-size: 1.1rem;
}

.progress-card {
    background: linear-gradient(135deg, #f8f9ff 0%, #e8f0fe 100%);
}

.level-progress {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.current-level,
.next-level {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.level-icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.progress-arrow {
    font-size: 1.5rem;
    color: #667eea;
    font-weight: bold;
}

.progress-bar {
    width: 100%;
    height: 12px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 10px;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 6px;
    transition: width 0.5s ease;
}

.progress-text {
    text-align: center;
    color: #333;
    font-weight: 500;
}

.achievements-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 15px;
}

.achievement-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
}

.achievement-icon {
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.achievement-details {
    flex: 1;
}

.achievement-name {
    font-weight: 600;
    color: #333;
    margin-bottom: 2px;
}

.achievement-date {
    font-size: 0.8rem;
    color: #666;
}

.voting-history {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 15px;
}

.vote-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
}

.vote-proposal {
    flex: 1;
}

.vote-title {
    font-weight: 600;
    color: #333;
    margin-bottom: 4px;
}

.vote-date {
    font-size: 0.8rem;
    color: #666;
}

.vote-choice {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
}

.vote-choice.for {
    background: #e8f5e8;
    color: #4caf50;
}

.vote-choice.against {
    background: #ffebee;
    color: #f44336;
}

.vote-choice.abstain {
    background: #f5f5f5;
    color: #666;
}

.pending-proposals {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.pending-proposal {
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 8px;
    padding: 15px;
}

.proposal-title {
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
}

.proposal-deadline {
    font-size: 0.9rem;
    color: #856404;
    margin-bottom: 10px;
}

.proposal-actions {
    display: flex;
    gap: 8px;
}

.vote-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
    transition: all 0.2s ease;
}

.vote-btn.for {
    background: #4caf50;
    color: white;
}

.vote-btn.against {
    background: #f44336;
    color: white;
}

.vote-btn.abstain {
    background: #666;
    color: white;
}

.vote-btn:hover {
    transform: translateY(-1px);
}

.activity-feed {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.activity-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    border-radius: 8px;
    background: #f8f9fa;
}

.activity-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
}

.activity-text {
    flex: 1;
    font-size: 0.9rem;
    color: #333;
}

.activity-time {
    font-size: 0.8rem;
    color: #666;
}

.view-all-btn {
    width: 100%;
    background: transparent;
    border: 1px solid #667eea;
    color: #667eea;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
}

.view-all-btn:hover {
    background: #667eea;
    color: white;
}

.detailed-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 30px;
}

.section-card {
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-card h3 {
    margin: 0 0 25px 0;
    color: #333;
    font-size: 1.5rem;
}

.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.portfolio-item {
    text-align: center;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
}

.portfolio-label {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 8px;
}

.portfolio-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
}

.contributions-timeline {
    position: relative;
}

.timeline-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.timeline-item {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    position: relative;
}

.timeline-item::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 40px;
    bottom: -20px;
    width: 2px;
    background: #e0e0e0;
}

.timeline-item:last-child::before {
    display: none;
}

.timeline-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
    z-index: 1;
    position: relative;
}

.timeline-content {
    flex: 1;
    padding-top: 2px;
}

.timeline-title {
    font-weight: 600;
    color: #333;
    margin-bottom: 4px;
}

.timeline-description {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 4px;
}

.timeline-date {
    font-size: 0.8rem;
    color: #999;
}

/* Modal Styles */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 12px;
    padding: 0;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
    margin: 0;
    color: #333;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.modal-close:hover {
    background: #f0f0f0;
}

#edit-profile-form {
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
    border-color: #667eea;
    outline: none;
}

.form-group input[type="checkbox"] {
    width: auto;
    margin-right: 8px;
}

.form-actions {
    display: flex;
    gap: 15px;
    justify-content: flex-end;
    margin-top: 25px;
}

.cancel-btn,
.submit-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
}

.cancel-btn {
    background: #f0f0f0;
    color: #666;
}

.cancel-btn:hover {
    background: #e0e0e0;
}

.submit-btn {
    background: #667eea;
    color: white;
}

.submit-btn:hover {
    background: #5a6fd8;
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
    .profile-header {
        flex-direction: column;
        gap: 20px;
        text-align: center;
    }
    
    .profile-info {
        flex-direction: column;
        text-align: center;
    }
    
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
    
    .detailed-sections {
        grid-template-columns: 1fr;
    }
    
    .portfolio-grid {
        grid-template-columns: 1fr;
    }
    
    .level-progress {
        flex-direction: column;
        gap: 15px;
    }
    
    .progress-arrow {
        transform: rotate(90deg);
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    initProfileModals();
    loadProfileData();
});

function initProfileModals() {
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const modalClose = document.querySelector('.modal-close');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    editProfileBtn.addEventListener('click', () => {
        editProfileModal.style.display = 'flex';
        loadCurrentProfileData();
    });
    
    modalClose.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    editProfileModal.addEventListener('click', (e) => {
        if (e.target === editProfileModal) {
            closeModal();
        }
    });
    
    function closeModal() {
        editProfileModal.style.display = 'none';
    }
    
    // Form submission
    document.getElementById('edit-profile-form').addEventListener('submit', handleProfileUpdate);
}

async function loadProfileData() {
    try {
        // Show loading state
        document.getElementById('profile-loading').style.display = 'block';
        document.getElementById('profile-content').style.display = 'none';
        document.getElementById('profile-error').style.display = 'none';
        
        // Get user address
        const userAddress = getCurrentUserAddress();
        
        if (!userAddress) {
            throw new Error('Wallet not connected');
        }
        
        // Load all profile data
        await Promise.all([
            loadBasicProfile(userAddress),
            loadGamificationData(userAddress),
            loadVotingHistory(userAddress),
            loadPendingProposals(userAddress),
            loadCommunityActivity(userAddress)
        ]);
        
        // Show content
        document.getElementById('profile-loading').style.display = 'none';
        document.getElementById('profile-content').style.display = 'block';
        
    } catch (error) {
        console.error('Error loading profile data:', error);
        document.getElementById('profile-loading').style.display = 'none';
        document.getElementById('profile-error').style.display = 'block';
    }
}

async function loadBasicProfile(userAddress) {
    // Update profile header
    document.getElementById('profile-address').textContent = 
        userAddress.slice(0, 6) + '...' + userAddress.slice(-4);
    
    // Sample data - would come from API
    const profileData = {
        name: 'DAO Member',
        level: 'Member',
        xp: 750,
        votingPower: 125.5,
        governanceTokens: 1250
    };
    
    document.getElementById('profile-name').textContent = profileData.name;
    document.getElementById('profile-level').textContent = profileData.level;
    document.getElementById('profile-xp').textContent = `${profileData.xp} XP`;
    document.getElementById('voting-power').textContent = profileData.votingPower;
    document.getElementById('governance-tokens').textContent = profileData.governanceTokens.toLocaleString();
}

async function loadGamificationData(userAddress) {
    try {
        const response = await fetch(`/wp-json/dao-governance/v1/gamification/${userAddress}`);
        const data = await response.json();
        
        if (data.success) {
            const membershipLevel = data.membershipLevel;
            
            // Update level progress
            document.getElementById('current-level-name').textContent = membershipLevel.current;
            document.getElementById('next-level-name').textContent = getNextLevelName(membershipLevel.tier);
            document.getElementById('progress-xp').textContent = membershipLevel.totalXP;
            document.getElementById('required-xp').textContent = membershipLevel.requiredXP;
            document.getElementById('remaining-xp').textContent = membershipLevel.requiredXP - membershipLevel.totalXP;
            
            // Update progress bar
            const progressPercentage = (membershipLevel.totalXP / membershipLevel.requiredXP) * 100;
            document.getElementById('level-progress-fill').style.width = `${Math.min(progressPercentage, 100)}%`;
            
            // Update level icons
            document.getElementById('current-level-icon').textContent = getLevelIcon(membershipLevel.tier);
            document.getElementById('next-level-icon').textContent = getLevelIcon(membershipLevel.tier + 1);
            
            // Load recent achievements
            loadRecentAchievements(data.achievements);
        }
    } catch (error) {
        console.error('Error loading gamification data:', error);
    }
}

function loadRecentAchievements(achievements) {
    const recentAchievements = document.getElementById('recent-achievements');
    recentAchievements.innerHTML = '';
    
    const unlockedAchievements = achievements.filter(a => a.unlocked).slice(-3);
    
    unlockedAchievements.forEach(achievement => {
        const item = document.createElement('div');
        item.className = 'achievement-item';
        
        item.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-details">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-date">Unlocked ${new Date(achievement.date).toLocaleDateString()}</div>
            </div>
        `;
        
        recentAchievements.appendChild(item);
    });
    
    if (unlockedAchievements.length === 0) {
        recentAchievements.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">No achievements yet. Keep participating to unlock your first achievement!</div>';
    }
}

async function loadVotingHistory(userAddress) {
    // Sample voting history data
    const votingHistory = [
        { proposalTitle: 'Treasury Allocation Q1 2024', choice: 'for', date: '2024-03-15' },
        { proposalTitle: 'Community Grants Program', choice: 'for', date: '2024-03-10' },
        { proposalTitle: 'Protocol Upgrade v2.1', choice: 'abstain', date: '2024-03-05' }
    ];
    
    const votingHistoryContainer = document.getElementById('voting-history');
    votingHistoryContainer.innerHTML = '';
    
    votingHistory.forEach(vote => {
        const item = document.createElement('div');
        item.className = 'vote-item';
        
        item.innerHTML = `
            <div class="vote-proposal">
                <div class="vote-title">${vote.proposalTitle}</div>
                <div class="vote-date">${new Date(vote.date).toLocaleDateString()}</div>
            </div>
            <div class="vote-choice ${vote.choice}">${vote.choice.toUpperCase()}</div>
        `;
        
        votingHistoryContainer.appendChild(item);
    });
}

async function loadPendingProposals(userAddress) {
    // Sample pending proposals
    const pendingProposals = [
        {
            title: 'Marketing Campaign Budget',
            deadline: '2024-03-30',
            id: 'prop-001'
        },
        {
            title: 'New Partnership Proposal',
            deadline: '2024-04-02',
            id: 'prop-002'
        }
    ];
    
    const pendingProposalsContainer = document.getElementById('pending-proposals');
    pendingProposalsContainer.innerHTML = '';
    
    pendingProposals.forEach(proposal => {
        const item = document.createElement('div');
        item.className = 'pending-proposal';
        
        const daysLeft = Math.ceil((new Date(proposal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
        
        item.innerHTML = `
            <div class="proposal-title">${proposal.title}</div>
            <div class="proposal-deadline">Voting ends in ${daysLeft} days</div>
            <div class="proposal-actions">
                <button class="vote-btn for" onclick="vote('${proposal.id}', 'for')">Vote For</button>
                <button class="vote-btn against" onclick="vote('${proposal.id}', 'against')">Vote Against</button>
                <button class="vote-btn abstain" onclick="vote('${proposal.id}', 'abstain')">Abstain</button>
            </div>
        `;
        
        pendingProposalsContainer.appendChild(item);
    });
    
    if (pendingProposals.length === 0) {
        pendingProposalsContainer.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">No pending proposals. You\'re all caught up!</div>';
    }
}

async function loadCommunityActivity(userAddress) {
    // Sample community activity
    const activities = [
        { type: 'discussion', text: 'Commented on "Future of DeFi"', time: '2 hours ago' },
        { type: 'vote', text: 'Voted on Treasury Proposal', time: '1 day ago' },
        { type: 'achievement', text: 'Unlocked "Community Builder" achievement', time: '3 days ago' },
        { type: 'proposal', text: 'Created new proposal', time: '1 week ago' }
    ];
    
    const activityFeed = document.getElementById('community-activity');
    activityFeed.innerHTML = '';
    
    activities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        
        const icons = {
            discussion: '💬',
            vote: '🗳️',
            achievement: '🏆',
            proposal: '📋'
        };
        
        item.innerHTML = `
            <div class="activity-icon">${icons[activity.type]}</div>
            <div class="activity-text">${activity.text}</div>
            <div class="activity-time">${activity.time}</div>
        `;
        
        activityFeed.appendChild(item);
    });
}

function loadCurrentProfileData() {
    // Load current profile data into the edit form
    // This would fetch from API/storage
    document.getElementById('profile-display-name').value = 'DAO Member';
    document.getElementById('profile-bio').value = '';
    document.getElementById('profile-twitter').value = '';
    document.getElementById('profile-discord').value = '';
    document.getElementById('profile-website').value = '';
    document.getElementById('profile-public').checked = false;
}

async function handleProfileUpdate(e) {
    e.preventDefault();
    
    const formData = {
        displayName: document.getElementById('profile-display-name').value,
        bio: document.getElementById('profile-bio').value,
        twitter: document.getElementById('profile-twitter').value,
        discord: document.getElementById('profile-discord').value,
        website: document.getElementById('profile-website').value,
        isPublic: document.getElementById('profile-public').checked
    };
    
    try {
        // Here you would save the profile data
        console.log('Saving profile data:', formData);
        
        // Update UI
        document.getElementById('profile-name').textContent = formData.displayName || 'DAO Member';
        
        // Close modal
        document.getElementById('edit-profile-modal').style.display = 'none';
        
        // Show success message (you might want a proper notification system)
        alert('Profile updated successfully!');
        
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile. Please try again.');
    }
}

async function vote(proposalId, choice) {
    try {
        // Here you would submit the vote to the blockchain/API
        console.log('Voting on proposal:', proposalId, 'choice:', choice);
        
        // Show loading state
        const buttons = document.querySelectorAll(`[onclick*="${proposalId}"]`);
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.textContent = 'Voting...';
        });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Remove the proposal from pending list
        const proposalElement = buttons[0].closest('.pending-proposal');
        proposalElement.style.opacity = '0.5';
        proposalElement.innerHTML = '<div style="text-align: center; padding: 20px; color: #4caf50;">✅ Vote submitted successfully!</div>';
        
        // Reload voting history
        setTimeout(() => {
            loadVotingHistory(getCurrentUserAddress());
        }, 1000);
        
    } catch (error) {
        console.error('Error voting:', error);
        alert('Error submitting vote. Please try again.');
    }
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

function getNextLevelName(currentTier) {
    const levels = {
        1: 'Member',
        2: 'Contributor',
        3: 'Advocate',
        4: 'Guardian',
        5: 'Guardian' // Max level
    };
    return levels[currentTier + 1] || levels[5];
}

function getCurrentUserAddress() {
    // This would integrate with wallet connection
    return window.userAddress || '0x1234567890123456789012345678901234567890';
}
</script>