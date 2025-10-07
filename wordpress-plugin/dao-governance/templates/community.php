<?php
/**
 * Community/Social Features Template
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div id="dao-community-hub" class="dao-community-container">
    <!-- Loading State -->
    <div id="community-loading" class="dao-loading">
        <div class="loading-spinner"></div>
        <p>Loading community features...</p>
    </div>
    
    <!-- Main Content -->
    <div id="community-content" style="display: none;">
        <!-- Header -->
        <div class="community-header">
            <h2>🌟 Community Hub</h2>
            <p>Connect, collaborate, and grow together in the Ugly Unicorns DAO community</p>
        </div>

        <!-- Community Stats -->
        <div class="community-stats">
            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-info">
                    <div class="stat-value" id="total-members">156</div>
                    <div class="stat-label">Total Members</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">💬</div>
                <div class="stat-info">
                    <div class="stat-value" id="active-discussions">23</div>
                    <div class="stat-label">Active Discussions</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🔥</div>
                <div class="stat-info">
                    <div class="stat-value" id="online-members">42</div>
                    <div class="stat-label">Online Now</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🎯</div>
                <div class="stat-info">
                    <div class="stat-value" id="monthly-events">8</div>
                    <div class="stat-label">Monthly Events</div>
                </div>
            </div>
        </div>

        <!-- Tab Navigation -->
        <div class="community-tabs">
            <button class="tab-btn active" data-tab="discussions">Discussions</button>
            <button class="tab-btn" data-tab="members">Members</button>
            <button class="tab-btn" data-tab="events">Events</button>
            <button class="tab-btn" data-tab="groups">Groups</button>
        </div>

        <!-- Discussions Tab -->
        <div id="discussions-tab" class="tab-content active">
            <div class="discussions-section">
                <div class="discussions-header">
                    <h3>Community Discussions</h3>
                    <button id="new-discussion-btn" class="create-btn">
                        <span class="btn-icon">➕</span>
                        Start Discussion
                    </button>
                </div>
                
                <div class="discussion-filters">
                    <div class="filter-group">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="governance">Governance</button>
                        <button class="filter-btn" data-filter="proposals">Proposals</button>
                        <button class="filter-btn" data-filter="general">General</button>
                        <button class="filter-btn" data-filter="help">Help & Support</button>
                    </div>
                    <div class="sort-group">
                        <select id="discussion-sort">
                            <option value="latest">Latest Activity</option>
                            <option value="popular">Most Popular</option>
                            <option value="new">Newest</option>
                            <option value="unanswered">Unanswered</option>
                        </select>
                    </div>
                </div>
                
                <div id="discussions-list" class="discussions-list">
                    <!-- Discussion threads will be loaded here -->
                </div>
            </div>
        </div>

        <!-- Members Tab -->
        <div id="members-tab" class="tab-content">
            <div class="members-section">
                <div class="members-header">
                    <h3>Community Members</h3>
                    <div class="members-search">
                        <input type="text" id="member-search" placeholder="Search members..." />
                        <button class="search-btn">🔍</button>
                    </div>
                </div>
                
                <div class="member-filters">
                    <button class="filter-btn active" data-filter="all">All Members</button>
                    <button class="filter-btn" data-filter="online">Online</button>
                    <button class="filter-btn" data-filter="contributors">Contributors</button>
                    <button class="filter-btn" data-filter="new">New Members</button>
                </div>
                
                <div id="members-grid" class="members-grid">
                    <!-- Member cards will be loaded here -->
                </div>
            </div>
        </div>

        <!-- Events Tab -->
        <div id="events-tab" class="tab-content">
            <div class="events-section">
                <div class="events-header">
                    <h3>Community Events</h3>
                    <button id="create-event-btn" class="create-btn">
                        <span class="btn-icon">📅</span>
                        Create Event
                    </button>
                </div>
                
                <div class="events-calendar">
                    <div class="calendar-header">
                        <button id="prev-month" class="nav-btn">‹</button>
                        <h4 id="current-month">March 2024</h4>
                        <button id="next-month" class="nav-btn">›</button>
                    </div>
                    <div id="calendar-grid" class="calendar-grid">
                        <!-- Calendar will be rendered here -->
                    </div>
                </div>
                
                <div class="upcoming-events">
                    <h4>Upcoming Events</h4>
                    <div id="events-list" class="events-list">
                        <!-- Event cards will be loaded here -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Groups Tab -->
        <div id="groups-tab" class="tab-content">
            <div class="groups-section">
                <div class="groups-header">
                    <h3>Special Interest Groups</h3>
                    <button id="create-group-btn" class="create-btn">
                        <span class="btn-icon">👥</span>
                        Create Group
                    </button>
                </div>
                
                <div id="groups-grid" class="groups-grid">
                    <!-- Group cards will be loaded here -->
                </div>
            </div>
        </div>
    </div>

    <!-- New Discussion Modal -->
    <div id="new-discussion-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Start New Discussion</h3>
                <button class="modal-close">×</button>
            </div>
            <form id="new-discussion-form">
                <div class="form-group">
                    <label for="discussion-title">Title</label>
                    <input type="text" id="discussion-title" required placeholder="What would you like to discuss?" />
                </div>
                <div class="form-group">
                    <label for="discussion-category">Category</label>
                    <select id="discussion-category" required>
                        <option value="">Select category</option>
                        <option value="governance">Governance</option>
                        <option value="proposals">Proposals</option>
                        <option value="general">General</option>
                        <option value="help">Help & Support</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="discussion-content">Content</label>
                    <textarea id="discussion-content" required placeholder="Share your thoughts..." rows="5"></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="submit-btn">Post Discussion</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Error State -->
    <div id="community-error" class="dao-error" style="display: none;">
        <h3>Unable to Load Community Data</h3>
        <p>Please check your connection and try again.</p>
        <button onclick="loadCommunityData()" class="retry-btn">Retry</button>
    </div>
</div>

<style>
.dao-community-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.community-header {
    text-align: center;
    margin-bottom: 40px;
}

.community-header h2 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.community-header p {
    font-size: 1.2rem;
    color: #666;
}

.community-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
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

.community-tabs {
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

.discussions-header,
.members-header,
.events-header,
.groups-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.discussions-header h3,
.members-header h3,
.events-header h3,
.groups-header h3 {
    margin: 0;
    color: #333;
}

.create-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    transition: transform 0.2s ease;
}

.create-btn:hover {
    transform: translateY(-1px);
}

.discussion-filters,
.member-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    flex-wrap: wrap;
    gap: 15px;
}

.filter-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.filter-btn {
    background: #f0f0f0;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.filter-btn.active {
    background: #667eea;
    color: white;
}

.filter-btn:hover {
    background: #e0e0e0;
}

.filter-btn.active:hover {
    background: #5a6fd8;
}

.sort-group select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: white;
}

.discussions-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.discussion-item {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    border-left: 4px solid transparent;
}

.discussion-item:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.discussion-item.governance {
    border-left-color: #2196f3;
}

.discussion-item.proposals {
    border-left-color: #ff9800;
}

.discussion-item.general {
    border-left-color: #4caf50;
}

.discussion-item.help {
    border-left-color: #f44336;
}

.discussion-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
}

.discussion-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    margin: 0;
    line-height: 1.3;
}

.discussion-category {
    background: #e8f0fe;
    color: #1976d2;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
}

.discussion-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #f0f0f0;
}

.discussion-author {
    display: flex;
    align-items: center;
    gap: 10px;
}

.author-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 0.9rem;
}

.author-info {
    display: flex;
    flex-direction: column;
}

.author-name {
    font-weight: 600;
    color: #333;
    font-size: 0.9rem;
}

.discussion-time {
    color: #666;
    font-size: 0.8rem;
}

.discussion-stats {
    display: flex;
    gap: 15px;
    align-items: center;
}

.discussion-stat {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #666;
    font-size: 0.9rem;
}

.members-search {
    display: flex;
    gap: 10px;
    align-items: center;
}

.members-search input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    min-width: 200px;
}

.search-btn {
    background: #667eea;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
}

.members-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
}

.member-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s ease;
}

.member-card:hover {
    transform: translateY(-2px);
}

.member-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    margin: 0 auto 15px;
}

.member-name {
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
}

.member-level {
    color: #667eea;
    font-size: 0.9rem;
    margin-bottom: 10px;
}

.member-stats {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #f0f0f0;
}

.member-stat {
    text-align: center;
}

.member-stat-value {
    font-weight: bold;
    color: #333;
}

.member-stat-label {
    font-size: 0.8rem;
    color: #666;
}

.events-calendar {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.nav-btn {
    background: #f0f0f0;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-btn:hover {
    background: #e0e0e0;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
}

.calendar-day {
    aspect-ratio: 1;
    border: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease;
}

.calendar-day:hover {
    background: #f8f9fa;
}

.calendar-day.has-event {
    background: #e8f0fe;
    color: #1976d2;
    font-weight: bold;
}

.calendar-day.today {
    background: #667eea;
    color: white;
    border-radius: 50%;
}

.events-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.event-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #667eea;
}

.event-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
}

.event-title {
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
}

.event-time {
    color: #667eea;
    font-size: 0.9rem;
    font-weight: 500;
}

.event-description {
    color: #666;
    margin-bottom: 15px;
    line-height: 1.5;
}

.event-actions {
    display: flex;
    gap: 10px;
}

.event-btn {
    padding: 6px 12px;
    border: 1px solid #667eea;
    background: transparent;
    color: #667eea;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}

.event-btn:hover {
    background: #667eea;
    color: white;
}

.groups-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.group-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
}

.group-card:hover {
    transform: translateY(-2px);
}

.group-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
}

.group-icon {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.group-info h4 {
    margin: 0 0 5px 0;
    color: #333;
}

.group-member-count {
    color: #666;
    font-size: 0.9rem;
}

.group-description {
    color: #666;
    margin-bottom: 15px;
    line-height: 1.5;
}

.group-actions {
    display: flex;
    gap: 10px;
}

.group-btn {
    flex: 1;
    padding: 8px 16px;
    border: 1px solid #667eea;
    background: transparent;
    color: #667eea;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.group-btn.primary {
    background: #667eea;
    color: white;
}

.group-btn:hover {
    background: #667eea;
    color: white;
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
    max-width: 600px;
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

#new-discussion-form {
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
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #667eea;
    outline: none;
}

.form-group textarea {
    resize: vertical;
    min-height: 100px;
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
    .community-stats {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .discussions-header,
    .members-header,
    .events-header,
    .groups-header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
    }
    
    .discussion-filters,
    .member-filters {
        flex-direction: column;
        align-items: stretch;
    }
    
    .members-search {
        flex-direction: column;
    }
    
    .members-search input {
        min-width: auto;
    }
    
    .members-grid {
        grid-template-columns: 1fr;
    }
    
    .groups-grid {
        grid-template-columns: 1fr;
    }
    
    .form-actions {
        flex-direction: column;
    }
    
    .cancel-btn,
    .submit-btn {
        width: 100%;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    initCommunityTabs();
    initModals();
    loadCommunityData();
});

function initCommunityTabs() {
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

function initModals() {
    // New discussion modal
    const newDiscussionBtn = document.getElementById('new-discussion-btn');
    const newDiscussionModal = document.getElementById('new-discussion-modal');
    const modalClose = document.querySelector('.modal-close');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    newDiscussionBtn.addEventListener('click', () => {
        newDiscussionModal.style.display = 'flex';
    });
    
    modalClose.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    newDiscussionModal.addEventListener('click', (e) => {
        if (e.target === newDiscussionModal) {
            closeModal();
        }
    });
    
    function closeModal() {
        newDiscussionModal.style.display = 'none';
        document.getElementById('new-discussion-form').reset();
    }
    
    // Form submission
    document.getElementById('new-discussion-form').addEventListener('submit', handleNewDiscussion);
}

async function loadCommunityData() {
    try {
        // Show loading state
        document.getElementById('community-loading').style.display = 'block';
        document.getElementById('community-content').style.display = 'none';
        document.getElementById('community-error').style.display = 'none';
        
        // Load discussions data
        await loadDiscussions();
        
        // Show content
        document.getElementById('community-loading').style.display = 'none';
        document.getElementById('community-content').style.display = 'block';
        
    } catch (error) {
        console.error('Error loading community data:', error);
        document.getElementById('community-loading').style.display = 'none';
        document.getElementById('community-error').style.display = 'block';
    }
}

function loadTabData(tabName) {
    switch (tabName) {
        case 'discussions':
            loadDiscussions();
            break;
        case 'members':
            loadMembers();
            break;
        case 'events':
            loadEvents();
            break;
        case 'groups':
            loadGroups();
            break;
    }
}

async function loadDiscussions() {
    try {
        const response = await fetch('/wp-json/dao-governance/v1/discussions');
        const data = await response.json();
        
        const discussionsList = document.getElementById('discussions-list');
        discussionsList.innerHTML = '';
        
        if (data.success && data.discussions.length > 0) {
            data.discussions.forEach(discussion => {
                const discussionElement = createDiscussionElement(discussion);
                discussionsList.appendChild(discussionElement);
            });
        } else {
            discussionsList.innerHTML = '<div class="no-discussions">No discussions yet. Start the first one!</div>';
        }
        
        // Initialize discussion filters
        initDiscussionFilters();
        
    } catch (error) {
        console.error('Error loading discussions:', error);
        document.getElementById('discussions-list').innerHTML = '<div class="error-message">Error loading discussions</div>';
    }
}

function createDiscussionElement(discussion) {
    const element = document.createElement('div');
    element.className = `discussion-item ${discussion.category || 'general'}`;
    
    const timeAgo = getTimeAgo(new Date(discussion.date).getTime() / 1000);
    const authorInitial = discussion.author ? discussion.author.charAt(0).toUpperCase() : 'A';
    
    element.innerHTML = `
        <div class="discussion-header">
            <h4 class="discussion-title">${discussion.title}</h4>
            <span class="discussion-category">${discussion.category || 'general'}</span>
        </div>
        <div class="discussion-meta">
            <div class="discussion-author">
                <div class="author-avatar">${authorInitial}</div>
                <div class="author-info">
                    <div class="author-name">${discussion.author}</div>
                    <div class="discussion-time">${timeAgo}</div>
                </div>
            </div>
            <div class="discussion-stats">
                <div class="discussion-stat">
                    <span>💬</span>
                    <span>${discussion.comments_count}</span>
                </div>
                <div class="discussion-stat">
                    <span>👁️</span>
                    <span>${Math.floor(Math.random() * 50) + 10}</span>
                </div>
            </div>
        </div>
    `;
    
    element.addEventListener('click', () => {
        // Navigate to discussion detail (would be implemented)
        console.log('Navigate to discussion:', discussion.id);
    });
    
    return element;
}

function loadMembers() {
    // Sample member data
    const members = [
        { name: 'Alice', level: 'Advocate', xp: 1250, votes: 45, address: '0x123...abc' },
        { name: 'Bob', level: 'Contributor', xp: 980, votes: 32, address: '0x456...def' },
        { name: 'Charlie', level: 'Member', xp: 875, votes: 28, address: '0x789...ghi' },
        { name: 'Diana', level: 'Member', xp: 750, votes: 22, address: '0xabc...123' },
        { name: 'Eve', level: 'Contributor', xp: 620, votes: 18, address: '0xdef...456' },
        { name: 'Frank', level: 'Member', xp: 550, votes: 15, address: '0xghi...789' }
    ];
    
    const membersGrid = document.getElementById('members-grid');
    membersGrid.innerHTML = '';
    
    members.forEach(member => {
        const memberCard = createMemberCard(member);
        membersGrid.appendChild(memberCard);
    });
    
    initMemberFilters();
}

function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    
    const initial = member.name.charAt(0).toUpperCase();
    
    card.innerHTML = `
        <div class="member-avatar">${initial}</div>
        <div class="member-name">${member.name}</div>
        <div class="member-level">${member.level}</div>
        <div class="member-address">${member.address}</div>
        <div class="member-stats">
            <div class="member-stat">
                <div class="member-stat-value">${member.xp}</div>
                <div class="member-stat-label">XP</div>
            </div>
            <div class="member-stat">
                <div class="member-stat-value">${member.votes}</div>
                <div class="member-stat-label">Votes</div>
            </div>
        </div>
    `;
    
    return card;
}

function loadEvents() {
    // Sample events data
    const events = [
        {
            title: 'Weekly Governance Call',
            description: 'Discuss current proposals and governance matters',
            time: '2024-03-25 15:00',
            type: 'meeting'
        },
        {
            title: 'Treasury Review Session',
            description: 'Monthly review of treasury performance and allocations',
            time: '2024-03-28 14:00',
            type: 'review'
        },
        {
            title: 'Community AMAs',
            description: 'Ask Me Anything session with core team',
            time: '2024-03-30 16:00',
            type: 'ama'
        }
    ];
    
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = '';
    
    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventsList.appendChild(eventCard);
    });
    
    renderCalendar();
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    const eventDate = new Date(event.time);
    const timeString = eventDate.toLocaleString();
    
    card.innerHTML = `
        <div class="event-header">
            <div>
                <div class="event-title">${event.title}</div>
                <div class="event-time">${timeString}</div>
            </div>
        </div>
        <div class="event-description">${event.description}</div>
        <div class="event-actions">
            <button class="event-btn">RSVP</button>
            <button class="event-btn">Add to Calendar</button>
        </div>
    `;
    
    return card;
}

function renderCalendar() {
    // Simple calendar rendering
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonth = document.getElementById('current-month');
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    currentMonth.textContent = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    // Days of week header
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    calendarGrid.innerHTML = '';
    
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.textAlign = 'center';
        dayHeader.style.padding = '10px';
        dayHeader.style.background = '#f8f9fa';
        calendarGrid.appendChild(dayHeader);
    });
    
    // Calendar days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Highlight today
        if (day === now.getDate()) {
            dayElement.classList.add('today');
        }
        
        // Sample events on certain days
        if ([15, 22, 28].includes(day)) {
            dayElement.classList.add('has-event');
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

function loadGroups() {
    // Sample groups data
    const groups = [
        {
            name: 'DeFi Research',
            description: 'Explore and analyze DeFi protocols and investment opportunities',
            memberCount: 24,
            icon: '💰'
        },
        {
            name: 'NFT Collectors',
            description: 'Discuss NFT trends, share collections, and explore new projects',
            memberCount: 18,
            icon: '🎨'
        },
        {
            name: 'Technical Development',
            description: 'Contribute to DAO infrastructure and development projects',
            memberCount: 12,
            icon: '⚙️'
        },
        {
            name: 'Community Outreach',
            description: 'Organize events and grow the DAO community',
            memberCount: 31,
            icon: '🌍'
        },
        {
            name: 'Governance & Strategy',
            description: 'Shape the future direction of the DAO through strategic planning',
            memberCount: 16,
            icon: '📊'
        }
    ];
    
    const groupsGrid = document.getElementById('groups-grid');
    groupsGrid.innerHTML = '';
    
    groups.forEach(group => {
        const groupCard = createGroupCard(group);
        groupsGrid.appendChild(groupCard);
    });
}

function createGroupCard(group) {
    const card = document.createElement('div');
    card.className = 'group-card';
    
    card.innerHTML = `
        <div class="group-header">
            <div class="group-icon">${group.icon}</div>
            <div class="group-info">
                <h4>${group.name}</h4>
                <div class="group-member-count">${group.memberCount} members</div>
            </div>
        </div>
        <div class="group-description">${group.description}</div>
        <div class="group-actions">
            <button class="group-btn primary">Join Group</button>
            <button class="group-btn">View Details</button>
        </div>
    `;
    
    return card;
}

function initDiscussionFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('discussion-sort');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter discussions
            filterDiscussions(filter);
        });
    });
    
    sortSelect.addEventListener('change', () => {
        sortDiscussions(sortSelect.value);
    });
}

function initMemberFilters() {
    const filterBtns = document.querySelectorAll('#members-tab .filter-btn');
    const searchInput = document.getElementById('member-search');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter members
            filterMembers(filter);
        });
    });
    
    searchInput.addEventListener('input', () => {
        searchMembers(searchInput.value);
    });
}

function filterDiscussions(filter) {
    const discussions = document.querySelectorAll('.discussion-item');
    
    discussions.forEach(discussion => {
        if (filter === 'all' || discussion.classList.contains(filter)) {
            discussion.style.display = 'block';
        } else {
            discussion.style.display = 'none';
        }
    });
}

function sortDiscussions(sortBy) {
    // Implementation would depend on actual data structure
    console.log('Sort discussions by:', sortBy);
}

function filterMembers(filter) {
    // Implementation would filter member cards based on filter type
    console.log('Filter members by:', filter);
}

function searchMembers(query) {
    // Implementation would search member cards by name/address
    console.log('Search members:', query);
}

async function handleNewDiscussion(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const discussionData = {
        title: formData.get('title') || document.getElementById('discussion-title').value,
        category: formData.get('category') || document.getElementById('discussion-category').value,
        content: formData.get('content') || document.getElementById('discussion-content').value,
        author_address: getCurrentUserAddress()
    };
    
    try {
        const response = await fetch('/wp-json/dao-governance/v1/discussions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(discussionData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Close modal and reload discussions
            document.getElementById('new-discussion-modal').style.display = 'none';
            document.getElementById('new-discussion-form').reset();
            loadDiscussions();
        } else {
            alert('Error creating discussion. Please try again.');
        }
    } catch (error) {
        console.error('Error creating discussion:', error);
        alert('Error creating discussion. Please try again.');
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

function getCurrentUserAddress() {
    // This would integrate with wallet connection
    return window.userAddress || '0x1234567890123456789012345678901234567890';
}
</script>