<?php
/**
 * Plugin Name: Ugly Unicorns DAO Platform
 * Plugin URI: https://uglyunicornsdao.com
 * Description: Complete DAO governance platform with gamification, analytics, and social features for the Ugly Unicorns community. Includes membership levels, achievements, treasury analytics, and community discussions.
 * Version: 3.0.0
 * Author: Ugly Unicorns DAO Team
 * Author URI: https://uglyunicornsdao.com
 * License: MIT
    /**
     * NFT Minting shortcode
     */
    public function dao_nft_minting_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-nft-minting',
            'contract_address' => '0x742d35Cc6634C0532925a3b8D56d8145431C5e5B', // Default Ugly Unicorns contract
            'max_per_wallet' => 61,
            'price' => '0.2'
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/nft-minting.php';
        return ob_get_clean();
    }
    
    // ========================================
    // FMC 2024 ENHANCEMENT SHORTCODES
    // ========================================
    
    /**
     * FMC Staking Rewards shortcode
     */
    public function fmc_staking_rewards_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'fmc-staking-rewards',
            'daily_reward' => '100',
            'voting_boost' => '1.5'
        ), $atts);
        
        ob_start();
        ?>
        <div class="<?php echo esc_attr($atts['class']); ?>">
            <div class="fmc-staking-container">
                <h3>🎯 NFT Staking Rewards</h3>
                <div class="staking-stats">
                    <div class="stat-card">
                        <h4>Daily Rewards</h4>
                        <p><?php echo esc_html($atts['daily_reward']); ?> $MINCHYN</p>
                    </div>
                    <div class="stat-card">
                        <h4>Voting Power Boost</h4>
                        <p><?php echo esc_html($atts['voting_boost']); ?>x multiplier</p>
                    </div>
                </div>
                <p><strong>Legal Notice:</strong> $MINCHYN tokens are utility tokens for platform features, not investment securities.</p>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * FMC Equity Tracking shortcode
     */
    public function fmc_equity_tracking_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'fmc-equity-tracking',
            'total_shares' => '300000000',
            'shares_per_nft' => '500'
        ), $atts);
        
        ob_start();
        ?>
        <div class="<?php echo esc_attr($atts['class']); ?>">
            <div class="equity-disclaimer">
                <h3>⚠️ IMPORTANT LEGAL NOTICE</h3>
                <p><strong>These are appreciation gifts, NOT real equity or securities.</strong></p>
            </div>
            <div class="equity-calculator">
                <h3>📊 Equity Calculator</h3>
                <p>Base Shares: <?php echo number_format($atts['total_shares']); ?></p>
                <p>Per NFT: <?php echo esc_html($atts['shares_per_nft']); ?> gifted shares</p>
                <p><em>Calculation is for gamification purposes only - no legal rights.</em></p>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * FMC Founder Benefits shortcode
     */
    public function fmc_founder_benefits_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'fmc-founder-benefits'
        ), $atts);
        
        ob_start();
        ?>
        <div class="<?php echo esc_attr($atts['class']); ?>">
            <h3>👑 Founder Benefits</h3>
            <div class="benefits-grid">
                <div class="benefit-card">
                    <h4>🎯 VIP Access</h4>
                    <p>Exclusive features and early access</p>
                </div>
                <div class="benefit-card">
                    <h4>🛍️ Exclusive Merchandise</h4>
                    <p>Founder-only items and collectibles</p>
                </div>
                <div class="benefit-card">
                    <h4>🚀 Priority Support</h4>
                    <p>Direct line to our team</p>
                </div>
                <div class="benefit-card">
                    <h4>🌟 Permanent Status</h4>
                    <p>Forever recognized as a founder</p>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * FMC Networking Hub shortcode
     */
    public function fmc_networking_hub_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'fmc-networking-hub'
        ), $atts);
        
        ob_start();
        ?>
        <div class="<?php echo esc_attr($atts['class']); ?>">
            <h3>🤝 Networking Hub</h3>
            <div class="networking-features">
                <div class="feature">
                    <h4>👥 Member Directory</h4>
                    <p>Connect with fellow founders</p>
                </div>
                <div class="feature">
                    <h4>🚀 Project Collaboration</h4>
                    <p>Find partners for your ideas</p>
                </div>
                <div class="feature">
                    <h4>💼 Professional Network</h4>
                    <p>Expand your business connections</p>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * FMC Job Board shortcode
     */
    public function fmc_job_board_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'fmc-job-board',
            'posts_per_page' => '10'
        ), $atts);
        
        ob_start();
        ?>
        <div class="<?php echo esc_attr($atts['class']); ?>">
            <h3>💼 Community Job Board</h3>
            <div class="job-listings">
                <div class="job-card">
                    <h4>Frontend Developer</h4>
                    <p>Remote • Full-time • $80k-120k</p>
                    <span class="job-type">Engineering</span>
                </div>
                <div class="job-card">
                    <h4>Marketing Manager</h4>
                    <p>Remote • Full-time • $60k-90k</p>
                    <span class="job-type">Marketing</span>
                </div>
            </div>
            <p><em>Job opportunities from the founder community</em></p>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * FMC Hiring Hub shortcode
     */
    public function fmc_hiring_hub_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'fmc-hiring-hub'
        ), $atts);
        
        ob_start();
        ?>
        <div class="<?php echo esc_attr($atts['class']); ?>">
            <h3>🎯 Hiring Hub</h3>
            <div class="hiring-features">
                <div class="feature">
                    <h4>📝 Post Positions</h4>
                    <p>Share job opportunities with the community</p>
                </div>
                <div class="feature">
                    <h4>👤 Review Candidates</h4>
                    <p>Get feedback from fellow founders</p>
                </div>
                <div class="feature">
                    <h4>🤝 Referral Network</h4>
                    <p>Leverage community connections</p>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * FMC Enhanced Gamification shortcode
     */
    public function fmc_enhanced_gamification_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'fmc-enhanced-gamification'
        ), $atts);
        
        ob_start();
        ?>
        <div class="<?php echo esc_attr($atts['class']); ?>">
            <h3>🎮 Enhanced Gamification</h3>
            <div class="gamification-levels">
                <div class="level">
                    <h4>🆕 Newbie (0-99 XP)</h4>
                    <p>Just getting started</p>
                </div>
                <div class="level">
                    <h4>💪 Contributor (100-499 XP)</h4>
                    <p>Active community member</p>
                </div>
                <div class="level">
                    <h4>👑 Founder Elite (500-999 XP)</h4>
                    <p>Experienced leader</p>
                </div>
                <div class="level">
                    <h4>🛡️ Guardian (1000+ XP)</h4>
                    <p>Community protector</p>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * FMC Admin Dashboard shortcode (restricted)
     */
    public function fmc_admin_dashboard_shortcode($atts) {
        if (!current_user_can('manage_options')) {
            return '<p>Access denied. Administrator privileges required.</p>';
        }
        
        $atts = shortcode_atts(array(
            'class' => 'fmc-admin-dashboard'
        ), $atts);
        
        ob_start();
        ?>
        <div class="<?php echo esc_attr($atts['class']); ?>">
            <h3>⚡ Admin Dashboard</h3>
            <div class="admin-tools">
                <div class="tool">
                    <h4>👥 User Management</h4>
                    <p>Manage community members</p>
                </div>
                <div class="tool">
                    <h4>💼 Job Management</h4>
                    <p>Moderate job postings</p>
                </div>
                <div class="tool">
                    <h4>📊 Analytics</h4>
                    <p>Platform usage statistics</p>
                </div>
                <div class="tool">
                    <h4>⚖️ Legal Compliance</h4>
                    <p>Manage disclaimers and terms</p>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * FMC OpenSea Integration shortcode
     */
    public function fmc_opensea_integration_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'fmc-opensea-integration',
            'collection_slug' => 'ugly-unicorns',
            'contract_address' => '0x742d35Cc6634C0532925a3b8D56d8145431C5e5B'
        ), $atts);
        
        ob_start();
        ?>
        <div class="<?php echo esc_attr($atts['class']); ?>">
            <h3>🌊 OpenSea Marketplace</h3>
            <div class="opensea-info">
                <div class="collection-stats">
                    <h4>Collection Status</h4>
                    <p>3,247 / 10,000 Minted</p>
                    <p>Floor Price: 0.15 ETH</p>
                </div>
                <div class="marketplace-links">
                    <a href="https://opensea.io/collection/<?php echo esc_attr($atts['collection_slug']); ?>" target="_blank" class="opensea-button">
                        View on OpenSea
                    </a>
                </div>
            </div>
            <p><em>Secondary marketplace for existing NFT holders</em></p>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * FMC Legal Disclaimers shortcode
     */
    public function fmc_legal_disclaimers_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'fmc-legal-disclaimers',
            'type' => 'general' // general, equity, nft
        ), $atts);
        
        ob_start();
        ?>
        <div class="<?php echo esc_attr($atts['class']); ?>">
            <div class="legal-notice">
                <h3>⚠️ Important Legal Notice</h3>
                <?php if ($atts['type'] === 'equity'): ?>
                    <div class="equity-disclaimer">
                        <p><strong>CRITICAL:</strong> Gifted "shares" are appreciation gifts only - NOT real equity or securities.</p>
                        <ul>
                            <li>❌ No legal ownership rights</li>
                            <li>❌ No financial value</li>
                            <li>❌ Not transferable</li>
                            <li>✅ Gamification only</li>
                        </ul>
                    </div>
                <?php elseif ($atts['type'] === 'nft'): ?>
                    <div class="nft-disclaimer">
                        <p><strong>NFTs are utility tokens</strong> providing platform access, not investment securities.</p>
                        <ul>
                            <li>✅ Platform features access</li>
                            <li>✅ Community benefits</li>
                            <li>❌ Not investment contracts</li>
                            <li>❌ No guaranteed returns</li>
                        </ul>
                    </div>
                <?php else: ?>
                    <div class="general-disclaimer">
                        <p><strong>Platform Disclaimer:</strong> This platform uses gamification features and utility tokens. Nothing constitutes financial advice or securities offerings.</p>
                        <div class="legal-links">
                            <a href="/legal/terms-of-service" target="_blank">Terms of Service</a> |
                            <a href="/legal/privacy-policy" target="_blank">Privacy Policy</a> |
                            <a href="/legal/legal-disclaimers" target="_blank">Full Legal Disclaimers</a>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    } dao-governance
 * Domain Path: /languages
 * Requires at least: 6.0
 * Tested up to: 6.4
 * Requires PHP: 8.0
 * Network: false
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('DAO_GOVERNANCE_VERSION', '3.0.0');
define('DAO_GOVERNANCE_PLUGIN_URL', plugin_dir_url(__FILE__));
define('DAO_GOVERNANCE_PLUGIN_PATH', plugin_dir_path(__FILE__));

/**
 * Main DAO Governance Plugin Class
 */
class DAOGovernancePlugin {
    
    private static $instance = null;
    
    /**
     * Get singleton instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_styles'));
        
        // Register shortcodes
        add_shortcode('dao_dashboard', array($this, 'dao_dashboard_shortcode'));
        add_shortcode('dao_proposals', array($this, 'dao_proposals_shortcode'));
        add_shortcode('dao_treasury', array($this, 'dao_treasury_shortcode'));
        add_shortcode('dao_governance', array($this, 'dao_governance_shortcode'));
        add_shortcode('wallet_connect', array($this, 'wallet_connect_shortcode'));
        
        // New feature shortcodes
        add_shortcode('dao_gamification', array($this, 'dao_gamification_shortcode'));
        add_shortcode('dao_membership_levels', array($this, 'dao_membership_levels_shortcode'));
        add_shortcode('dao_achievements', array($this, 'dao_achievements_shortcode'));
        add_shortcode('dao_seasonal_challenges', array($this, 'dao_seasonal_challenges_shortcode'));
        add_shortcode('dao_analytics', array($this, 'dao_analytics_shortcode'));
        add_shortcode('dao_governance_analytics', array($this, 'dao_governance_analytics_shortcode'));
        add_shortcode('dao_treasury_analytics', array($this, 'dao_treasury_analytics_shortcode'));
        add_shortcode('dao_profile', array($this, 'dao_profile_shortcode'));
        add_shortcode('dao_personal_dashboard', array($this, 'dao_personal_dashboard_shortcode'));
        add_shortcode('dao_community', array($this, 'dao_community_shortcode'));
        add_shortcode('dao_social_features', array($this, 'dao_social_features_shortcode'));
        add_shortcode('dao_discussions', array($this, 'dao_discussions_shortcode'));
        add_shortcode('dao_leaderboard', array($this, 'dao_leaderboard_shortcode'));
        add_shortcode('dao_nft_minting', array($this, 'dao_nft_minting_shortcode'));
        
        // FMC 2024 Enhancement Shortcodes
        add_shortcode('fmc_staking_rewards', array($this, 'fmc_staking_rewards_shortcode'));
        add_shortcode('fmc_equity_tracking', array($this, 'fmc_equity_tracking_shortcode'));
        add_shortcode('fmc_founder_benefits', array($this, 'fmc_founder_benefits_shortcode'));
        add_shortcode('fmc_networking_hub', array($this, 'fmc_networking_hub_shortcode'));
        add_shortcode('fmc_job_board', array($this, 'fmc_job_board_shortcode'));
        add_shortcode('fmc_hiring_hub', array($this, 'fmc_hiring_hub_shortcode'));
        add_shortcode('fmc_enhanced_gamification', array($this, 'fmc_enhanced_gamification_shortcode'));
        add_shortcode('fmc_admin_dashboard', array($this, 'fmc_admin_dashboard_shortcode'));
        add_shortcode('fmc_opensea_integration', array($this, 'fmc_opensea_integration_shortcode'));
        add_shortcode('fmc_legal_disclaimers', array($this, 'fmc_legal_disclaimers_shortcode'));
        
        // Register REST API endpoints
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        
        // Admin menu
        add_action('admin_menu', array($this, 'admin_menu'));
        
        // Custom post types for discussions
        add_action('init', array($this, 'register_post_types'));
        
        // Activation/Deactivation hooks
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, 'deactivate');
    }
    
    /**
     * Initialize plugin
     */
    public function init() {
        // Load text domain for translations
        load_plugin_textdomain('dao-governance', false, dirname(plugin_basename(__FILE__)) . '/languages/');
        
        // Initialize database tables if needed
        $this->maybe_create_tables();
    }
    
    /**
     * Enqueue JavaScript files
     */
    public function enqueue_scripts() {
        // Only load on pages with DAO content
        if ($this->should_load_assets()) {
            // Web3 libraries
            wp_enqueue_script(
                'ethers-js',
                'https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js',
                array(),
                '5.7.2',
                true
            );
            
            // Main DAO JavaScript
            wp_enqueue_script(
                'dao-governance-main',
                DAO_GOVERNANCE_PLUGIN_URL . 'assets/js/dao-governance.js',
                array('jquery', 'ethers-js'),
                DAO_GOVERNANCE_VERSION,
                true
            );
            
            // Localize script with contract addresses and settings
            wp_localize_script('dao-governance-main', 'daoGovernance', array(
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('dao_governance_nonce'),
                'contracts' => $this->get_contract_addresses(),
                'chainId' => get_option('dao_chain_id', 8453), // Base Mainnet
                'debug' => WP_DEBUG,
            ));
        }
    }
    
    /**
     * Enqueue CSS files
     */
    public function enqueue_styles() {
        if ($this->should_load_assets()) {
            wp_enqueue_style(
                'dao-governance-style',
                DAO_GOVERNANCE_PLUGIN_URL . 'assets/css/dao-governance.css',
                array(),
                DAO_GOVERNANCE_VERSION
            );
        }
    }
    
    /**
     * Check if DAO assets should be loaded
     */
    private function should_load_assets() {
        global $post;
        
        if (!$post) return false;
        
        // Check for DAO shortcodes in content
        $dao_shortcodes = array('dao_dashboard', 'dao_proposals', 'dao_treasury', 'dao_governance', 'wallet_connect');
        
        foreach ($dao_shortcodes as $shortcode) {
            if (has_shortcode($post->post_content, $shortcode)) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Get contract addresses from options
     */
    private function get_contract_addresses() {
        return array(
            'govToken' => get_option('dao_gov_token_address', ''),
            'daoGovernor' => get_option('dao_governor_address', ''),
            'timelock' => get_option('dao_timelock_address', ''),
            'proposalManager' => get_option('dao_proposal_manager_address', ''),
            'treasury' => get_option('dao_treasury_address', ''),
            'votingPowerExchange' => get_option('dao_voting_power_exchange_address', ''),
            'uglyUnicornsGovernance' => get_option('dao_ugly_unicorns_governance_address', ''),
            'minchynWrapper' => get_option('dao_minchyn_wrapper_address', ''),
        );
    }
    
    /**
     * DAO Dashboard Shortcode
     */
    public function dao_dashboard_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-dashboard',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/dashboard.php';
        return ob_get_clean();
    }
    
    /**
     * DAO Proposals Shortcode
     */
    public function dao_proposals_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-proposals',
            'limit' => 10,
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/proposals.php';
        return ob_get_clean();
    }
    
    /**
     * DAO Treasury Shortcode
     */
    public function dao_treasury_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-treasury',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/treasury.php';
        return ob_get_clean();
    }
    
    /**
     * DAO Governance Shortcode
     */
    public function dao_governance_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-governance',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/governance.php';
        return ob_get_clean();
    }
    
    /**
     * Wallet Connect Shortcode
     */
    public function wallet_connect_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'wallet-connect',
            'text' => 'Connect Wallet',
        ), $atts);
        
        return '<button class="' . esc_attr($atts['class']) . ' dao-connect-wallet">' . esc_html($atts['text']) . '</button>';
    }
    
    // ===== NEW GAMIFICATION SHORTCODES =====
    
    /**
     * Gamification Dashboard Shortcode
     */
    public function dao_gamification_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-gamification',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/gamification.php';
        return ob_get_clean();
    }
    
    /**
     * Membership Levels Shortcode
     */
    public function dao_membership_levels_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-membership-levels',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/membership-levels.php';
        return ob_get_clean();
    }
    
    /**
     * Achievements Shortcode
     */
    public function dao_achievements_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-achievements',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/achievements.php';
        return ob_get_clean();
    }
    
    /**
     * Seasonal Challenges Shortcode
     */
    public function dao_seasonal_challenges_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-seasonal-challenges',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/seasonal-challenges.php';
        return ob_get_clean();
    }
    
    // ===== NEW ANALYTICS SHORTCODES =====
    
    /**
     * Analytics Dashboard Shortcode
     */
    public function dao_analytics_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-analytics',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/analytics.php';
        return ob_get_clean();
    }
    
    /**
     * Governance Analytics Shortcode
     */
    public function dao_governance_analytics_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-governance-analytics',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/governance-analytics.php';
        return ob_get_clean();
    }
    
    /**
     * Treasury Analytics Shortcode
     */
    public function dao_treasury_analytics_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-treasury-analytics',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/treasury-analytics.php';
        return ob_get_clean();
    }
    
    // ===== NEW MEMBER FEATURES SHORTCODES =====
    
    /**
     * Profile Dashboard Shortcode
     */
    public function dao_profile_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-profile',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/profile.php';
        return ob_get_clean();
    }
    
    /**
     * Personal Dashboard Shortcode
     */
    public function dao_personal_dashboard_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-personal-dashboard',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/personal-dashboard.php';
        return ob_get_clean();
    }
    
    /**
     * Community Features Shortcode
     */
    public function dao_community_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-community',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/community.php';
        return ob_get_clean();
    }
    
    /**
     * Social Features Shortcode
     */
    public function dao_social_features_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-social-features',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/social-features.php';
        return ob_get_clean();
    }
    
    /**
     * Discussions Shortcode
     */
    public function dao_discussions_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-discussions',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/discussions.php';
        return ob_get_clean();
    }
    
    /**
     * Leaderboard Shortcode
     */
    public function dao_leaderboard_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-leaderboard',
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/leaderboard.php';
        return ob_get_clean();
    }
    
    /**
     * NFT Minting Shortcode
     */
    public function dao_nft_minting_shortcode($atts) {
        $atts = shortcode_atts(array(
            'class' => 'dao-nft-minting',
            'contract_address' => '0x742d35Cc6634C0532925a3b8D56d8145431C5e5B', // Default Ugly Unicorns contract
            'max_per_wallet' => 61,
            'price' => '0.2'
        ), $atts);
        
        ob_start();
        include DAO_GOVERNANCE_PLUGIN_PATH . 'templates/nft-minting.php';
        return ob_get_clean();
    }
    
    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        register_rest_route('dao-governance/v1', '/proposals', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_proposals'),
            'permission_callback' => '__return_true',
        ));
        
        register_rest_route('dao-governance/v1', '/treasury', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_treasury_data'),
            'permission_callback' => '__return_true',
        ));
        
        register_rest_route('dao-governance/v1', '/user/(?P<address>[a-zA-Z0-9]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_user_data'),
            'permission_callback' => '__return_true',
        ));
        
        // New endpoints for enhanced features
        register_rest_route('dao-governance/v1', '/gamification/(?P<address>[a-zA-Z0-9]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_gamification_data'),
            'permission_callback' => '__return_true',
        ));
        
        register_rest_route('dao-governance/v1', '/analytics/governance', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_governance_analytics'),
            'permission_callback' => '__return_true',
        ));
        
        register_rest_route('dao-governance/v1', '/analytics/treasury', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_treasury_analytics'),
            'permission_callback' => '__return_true',
        ));
        
        register_rest_route('dao-governance/v1', '/discussions', array(
            'methods' => array('GET', 'POST'),
            'callback' => array($this, 'handle_discussions'),
            'permission_callback' => '__return_true',
        ));
        
        register_rest_route('dao-governance/v1', '/leaderboard', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_leaderboard'),
            'permission_callback' => '__return_true',
        ));
    }
    
    /**
     * Register custom post types
     */
    public function register_post_types() {
        // DAO Discussion post type
        register_post_type('dao_discussion', array(
            'labels' => array(
                'name' => 'DAO Discussions',
                'singular_name' => 'DAO Discussion',
                'add_new' => 'Add New Discussion',
                'add_new_item' => 'Add New Discussion',
                'edit_item' => 'Edit Discussion',
                'new_item' => 'New Discussion',
                'view_item' => 'View Discussion',
                'search_items' => 'Search Discussions',
                'not_found' => 'No discussions found',
                'not_found_in_trash' => 'No discussions found in trash',
            ),
            'public' => true,
            'has_archive' => true,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'author', 'comments', 'custom-fields'),
            'menu_icon' => 'dashicons-format-chat',
            'capability_type' => 'post',
        ));
        
        // DAO Achievement post type
        register_post_type('dao_achievement', array(
            'labels' => array(
                'name' => 'DAO Achievements',
                'singular_name' => 'DAO Achievement',
            ),
            'public' => false,
            'show_ui' => true,
            'show_in_admin_bar' => false,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'custom-fields'),
            'menu_icon' => 'dashicons-awards',
        ));
    }
    
    /**
     * Get proposals via REST API
     */
    public function get_proposals($request) {
        // This would typically fetch from blockchain or cache
        return rest_ensure_response(array(
            'proposals' => array(),
            'total' => 0,
            'success' => true,
        ));
    }
    
    /**
     * Get treasury data via REST API
     */
    public function get_treasury_data($request) {
        return rest_ensure_response(array(
            'assets' => array(),
            'totalValue' => 0,
            'success' => true,
        ));
    }
    
    /**
     * Get user data via REST API
     */
    public function get_user_data($request) {
        $address = $request->get_param('address');
        
        return rest_ensure_response(array(
            'address' => $address,
            'votingPower' => 0,
            'proposals' => array(),
            'success' => true,
        ));
    }
    
    // ===== NEW API METHODS =====
    
    /**
     * Get gamification data for user
     */
    public function get_gamification_data($request) {
        $address = $request->get_param('address');
        
        // Sample gamification data - would typically come from blockchain/database
        return rest_ensure_response(array(
            'address' => $address,
            'membershipLevel' => array(
                'current' => 'Contributor',
                'tier' => 2,
                'progress' => 75,
                'totalXP' => 750,
                'requiredXP' => 1000,
            ),
            'achievements' => array(
                array('id' => 1, 'name' => 'First Vote', 'unlocked' => true, 'date' => '2024-01-15'),
                array('id' => 2, 'name' => 'Proposal Creator', 'unlocked' => true, 'date' => '2024-02-01'),
                array('id' => 3, 'name' => 'Community Builder', 'unlocked' => false, 'progress' => 60),
            ),
            'seasonalChallenges' => array(
                array('id' => 1, 'name' => 'January Governance Sprint', 'progress' => 80, 'reward' => 50),
                array('id' => 2, 'name' => 'Community Engagement', 'progress' => 60, 'reward' => 30),
            ),
            'success' => true,
        ));
    }
    
    /**
     * Get governance analytics
     */
    public function get_governance_analytics($request) {
        return rest_ensure_response(array(
            'participationRate' => 68.5,
            'averageVotingPower' => 125.8,
            'activeProposals' => 7,
            'totalProposals' => 156,
            'passedProposals' => 128,
            'rejectedProposals' => 21,
            'recentActivity' => array(
                array('type' => 'vote', 'timestamp' => time() - 3600, 'user' => '0x123...abc'),
                array('type' => 'proposal', 'timestamp' => time() - 7200, 'user' => '0x456...def'),
            ),
            'success' => true,
        ));
    }
    
    /**
     * Get treasury analytics
     */
    public function get_treasury_analytics($request) {
        return rest_ensure_response(array(
            'totalValue' => 2450000,
            'monthlyChange' => 12.5,
            'assets' => array(
                array('symbol' => 'ETH', 'amount' => 850, 'value' => 2125000),
                array('symbol' => 'USDC', 'amount' => 325000, 'value' => 325000),
            ),
            'expenses' => array(
                array('category' => 'Development', 'amount' => 45000, 'percentage' => 65),
                array('category' => 'Marketing', 'amount' => 15000, 'percentage' => 22),
                array('category' => 'Operations', 'amount' => 9000, 'percentage' => 13),
            ),
            'performanceHistory' => array(
                array('month' => '2024-01', 'value' => 2200000),
                array('month' => '2024-02', 'value' => 2350000),
                array('month' => '2024-03', 'value' => 2450000),
            ),
            'success' => true,
        ));
    }
    
    /**
     * Handle discussions (GET/POST)
     */
    public function handle_discussions($request) {
        if ($request->get_method() === 'GET') {
            $discussions = get_posts(array(
                'post_type' => 'dao_discussion',
                'posts_per_page' => 10,
                'post_status' => 'publish',
            ));
            
            $formatted_discussions = array();
            foreach ($discussions as $discussion) {
                $formatted_discussions[] = array(
                    'id' => $discussion->ID,
                    'title' => $discussion->post_title,
                    'content' => $discussion->post_content,
                    'author' => get_the_author_meta('display_name', $discussion->post_author),
                    'date' => $discussion->post_date,
                    'comments_count' => wp_count_comments($discussion->ID)->approved,
                );
            }
            
            return rest_ensure_response(array(
                'discussions' => $formatted_discussions,
                'success' => true,
            ));
        } else if ($request->get_method() === 'POST') {
            // Handle new discussion creation
            $title = sanitize_text_field($request->get_param('title'));
            $content = wp_kses_post($request->get_param('content'));
            $author_address = sanitize_text_field($request->get_param('author_address'));
            
            $discussion_id = wp_insert_post(array(
                'post_title' => $title,
                'post_content' => $content,
                'post_type' => 'dao_discussion',
                'post_status' => 'publish',
                'meta_input' => array(
                    'author_address' => $author_address,
                ),
            ));
            
            return rest_ensure_response(array(
                'discussion_id' => $discussion_id,
                'success' => !is_wp_error($discussion_id),
            ));
        }
    }
    
    /**
     * Get leaderboard data
     */
    public function get_leaderboard($request) {
        return rest_ensure_response(array(
            'leaders' => array(
                array('address' => '0x123...abc', 'name' => 'Alice', 'xp' => 1250, 'level' => 'Advocate', 'votes' => 45),
                array('address' => '0x456...def', 'name' => 'Bob', 'xp' => 980, 'level' => 'Contributor', 'votes' => 32),
                array('address' => '0x789...ghi', 'name' => 'Charlie', 'xp' => 875, 'level' => 'Contributor', 'votes' => 28),
                array('address' => '0xabc...123', 'name' => 'Diana', 'xp' => 750, 'level' => 'Member', 'votes' => 22),
                array('address' => '0xdef...456', 'name' => 'Eve', 'xp' => 620, 'level' => 'Member', 'votes' => 18),
            ),
            'userRank' => 12,
            'totalMembers' => 156,
            'success' => true,
        ));
    }
    
    /**
     * Add admin menu
     */
    public function admin_menu() {
        add_menu_page(
            'DAO Governance',
            'DAO Governance',
            'manage_options',
            'dao-governance',
            array($this, 'admin_page'),
            'dashicons-groups',
            30
        );
    }
    
    /**
     * Admin page callback
     */
    public function admin_page() {
        include DAO_GOVERNANCE_PLUGIN_PATH . 'admin/admin-page.php';
    }
    
    /**
     * Plugin activation
     */
    public function activate() {
        // Create database tables if needed
        $this->maybe_create_tables();
        
        // Set default options
        $default_options = array(
            'dao_chain_id' => 8453, // Base Mainnet
            'dao_enable_logging' => true,
            'dao_cache_duration' => 300, // 5 minutes
        );
        
        foreach ($default_options as $key => $value) {
            if (get_option($key) === false) {
                add_option($key, $value);
            }
        }
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Plugin deactivation
     */
    public static function deactivate() {
        // Clean up if needed
        flush_rewrite_rules();
    }
    
    /**
     * Create database tables if needed
     */
    private function maybe_create_tables() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'dao_governance_cache';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            cache_key varchar(255) NOT NULL,
            cache_value longtext NOT NULL,
            expires datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY cache_key (cache_key)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}

// Initialize the plugin
DAOGovernancePlugin::get_instance();

/**
 * Helper function to get plugin instance
 */
function dao_governance() {
    return DAOGovernancePlugin::get_instance();
}