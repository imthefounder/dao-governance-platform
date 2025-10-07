<?php
/**
 * DAO Dashboard Template
 * 
 * Displays the main dashboard with wallet connection,
 * user stats, and recent activity.
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="dao-dashboard dao-container">
    <!-- Header Section -->
    <div class="dao-card dao-mb-4">
        <div class="dao-card-header">
            <h2 class="dao-card-title">DAO Governance Dashboard</h2>
        </div>
        
        <div class="dao-card-content">
            <!-- Wallet Connection Status -->
            <div class="dao-wallet-connection dao-mb-3">
                <div class="dao-wallet-status disconnected">
                    <span>Wallet Status</span>
                </div>
                
                <div class="dao-wallet-info dao-mt-2">
                    <div class="dao-wallet-address">Not connected</div>
                    <div class="dao-wallet-balance">-</div>
                </div>
                
                <div class="dao-mt-3">
                    <button class="dao-btn dao-btn-primary dao-connect-wallet">
                        Connect Wallet
                    </button>
                    
                    <div class="dao-connected-only" style="display: none;">
                        <button class="dao-btn dao-btn-secondary dao-disconnect-wallet dao-ml-2">
                            Disconnect
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Connection Help -->
            <div class="dao-disconnected-only">
                <p class="dao-text-muted">
                    Connect your Web3 wallet to participate in DAO governance. 
                    Make sure you're on the Base network.
                </p>
            </div>
        </div>
    </div>
    
    <!-- Stats Grid -->
    <div class="dao-stats-grid dao-mb-4">
        <div class="dao-card dao-stat-card">
            <div class="dao-stat-value dao-wallet-balance">0</div>
            <div class="dao-stat-label">ETH Balance</div>
        </div>
        
        <div class="dao-card dao-stat-card">
            <div class="dao-stat-value dao-voting-power">0</div>
            <div class="dao-stat-label">Voting Power (UUDT)</div>
        </div>
        
        <div class="dao-card dao-stat-card">
            <div class="dao-stat-value" id="dao-active-proposals">0</div>
            <div class="dao-stat-label">Active Proposals</div>
        </div>
        
        <div class="dao-card dao-stat-card">
            <div class="dao-stat-value" id="dao-treasury-value">0</div>
            <div class="dao-stat-label">Treasury Value (ETH)</div>
        </div>
    </div>
    
    <!-- Connected User Content -->
    <div class="dao-connected-only" style="display: none;">
        <!-- Quick Actions -->
        <div class="dao-card dao-mb-4">
            <div class="dao-card-header">
                <h3 class="dao-card-title">Quick Actions</h3>
            </div>
            
            <div class="dao-card-content">
                <div class="dao-grid dao-grid-cols-2">
                    <button class="dao-btn dao-btn-primary dao-create-proposal">
                        📝 Create Proposal
                    </button>
                    
                    <button class="dao-btn dao-btn-secondary dao-deposit-treasury">
                        💰 Deposit to Treasury
                    </button>
                    
                    <button class="dao-btn dao-btn-secondary dao-exchange-tokens">
                        🔄 Exchange Tokens
                    </button>
                    
                    <button class="dao-btn dao-btn-secondary" onclick="window.location.href='#proposals'">
                        🗳️ View Proposals
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Your NFTs -->
        <div class="dao-card dao-mb-4">
            <div class="dao-card-header">
                <h3 class="dao-card-title">Your Ugly Unicorns NFTs</h3>
            </div>
            
            <div class="dao-card-content">
                <div id="dao-user-nfts" class="dao-nft-grid">
                    <div class="dao-text-center dao-text-muted">
                        <p>Loading NFTs...</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Recent Activity -->
        <div class="dao-card">
            <div class="dao-card-header">
                <h3 class="dao-card-title">Recent Activity</h3>
            </div>
            
            <div class="dao-card-content">
                <div id="dao-recent-activity">
                    <div class="dao-text-center dao-text-muted">
                        <p>No recent activity</p>
                        <p class="dao-text-sm">Your governance activities will appear here</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Disconnected Message -->
    <div class="dao-disconnected-only">
        <div class="dao-card">
            <div class="dao-card-content dao-text-center">
                <h3>Welcome to the Ugly Unicorns DAO</h3>
                <p class="dao-text-muted dao-mb-3">
                    Participate in community governance by connecting your wallet. 
                    You can vote on proposals, manage the treasury, and help shape the future of our community.
                </p>
                
                <div class="dao-mb-3">
                    <button class="dao-btn dao-btn-primary dao-connect-wallet">
                        Connect Wallet to Get Started
                    </button>
                </div>
                
                <div class="dao-text-sm dao-text-muted">
                    <p><strong>Requirements:</strong></p>
                    <ul style="list-style: none; padding: 0;">
                        <li>• MetaMask or compatible Web3 wallet</li>
                        <li>• Connected to Base network</li>
                        <li>• Ugly Unicorns NFT or MCHN tokens (optional)</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
jQuery(document).ready(function($) {
    // Update dashboard data when wallet connects
    $(document).on('dao:ui-updated', function(event, state) {
        if (state.isConnected) {
            loadDashboardData();
        }
    });
    
    // Load dashboard data
    function loadDashboardData() {
        // Load active proposals count
        loadActiveProposalsCount();
        
        // Load treasury value
        loadTreasuryValue();
        
        // Load user NFTs
        loadUserNFTs();
        
        // Load recent activity
        loadRecentActivity();
    }
    
    function loadActiveProposalsCount() {
        $.get('/wp-json/dao-governance/v1/proposals', function(data) {
            if (data.success) {
                $('#dao-active-proposals').text(data.total || 0);
            }
        });
    }
    
    function loadTreasuryValue() {
        $.get('/wp-json/dao-governance/v1/treasury', function(data) {
            if (data.success) {
                $('#dao-treasury-value').text(data.totalValue || 0);
            }
        });
    }
    
    function loadUserNFTs() {
        if (!window.DAO.state.address) return;
        
        const nftContainer = $('#dao-user-nfts');
        nftContainer.html('<div class="dao-text-center dao-text-muted"><p>Loading your NFTs...</p></div>');
        
        // This would integrate with your NFT contract
        // For now, show placeholder
        setTimeout(function() {
            nftContainer.html('<div class="dao-text-center dao-text-muted"><p>No Ugly Unicorns NFTs found</p><p class="dao-text-sm">NFTs will appear here when detected</p></div>');
        }, 2000);
    }
    
    function loadRecentActivity() {
        if (!window.DAO.state.address) return;
        
        $.get('/wp-json/dao-governance/v1/user/' + window.DAO.state.address, function(data) {
            const activityContainer = $('#dao-recent-activity');
            
            if (data.success && data.proposals && data.proposals.length > 0) {
                let html = '<ul class="dao-activity-list">';
                data.proposals.forEach(function(proposal) {
                    html += '<li class="dao-activity-item">';
                    html += '<span class="dao-activity-type">Voted on</span>';
                    html += '<span class="dao-activity-title">' + proposal.title + '</span>';
                    html += '<span class="dao-activity-time">' + proposal.timestamp + '</span>';
                    html += '</li>';
                });
                html += '</ul>';
                activityContainer.html(html);
            } else {
                activityContainer.html('<div class="dao-text-center dao-text-muted"><p>No recent activity</p><p class="dao-text-sm">Your governance activities will appear here</p></div>');
            }
        });
    }
});
</script>