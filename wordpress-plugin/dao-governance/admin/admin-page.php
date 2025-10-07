<?php
/**
 * Admin page for DAO Governance plugin
 * 
 * Allows administrators to configure contract addresses,
 * network settings, and other plugin options.
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Handle form submission
if (isset($_POST['submit']) && wp_verify_nonce($_POST['dao_governance_nonce'], 'dao_governance_admin')) {
    // Save contract addresses
    update_option('dao_gov_token_address', sanitize_text_field($_POST['gov_token_address']));
    update_option('dao_governor_address', sanitize_text_field($_POST['governor_address']));
    update_option('dao_timelock_address', sanitize_text_field($_POST['timelock_address']));
    update_option('dao_proposal_manager_address', sanitize_text_field($_POST['proposal_manager_address']));
    update_option('dao_treasury_address', sanitize_text_field($_POST['treasury_address']));
    update_option('dao_voting_power_exchange_address', sanitize_text_field($_POST['voting_power_exchange_address']));
    update_option('dao_ugly_unicorns_governance_address', sanitize_text_field($_POST['ugly_unicorns_governance_address']));
    update_option('dao_minchyn_wrapper_address', sanitize_text_field($_POST['minchyn_wrapper_address']));
    
    // Save network settings
    update_option('dao_chain_id', intval($_POST['chain_id']));
    update_option('dao_enable_logging', isset($_POST['enable_logging']));
    update_option('dao_cache_duration', intval($_POST['cache_duration']));
    
    echo '<div class="notice notice-success"><p>Settings saved successfully!</p></div>';
}

// Get current values
$contract_addresses = array(
    'gov_token_address' => get_option('dao_gov_token_address', ''),
    'governor_address' => get_option('dao_governor_address', ''),
    'timelock_address' => get_option('dao_timelock_address', ''),
    'proposal_manager_address' => get_option('dao_proposal_manager_address', ''),
    'treasury_address' => get_option('dao_treasury_address', ''),
    'voting_power_exchange_address' => get_option('dao_voting_power_exchange_address', ''),
    'ugly_unicorns_governance_address' => get_option('dao_ugly_unicorns_governance_address', ''),
    'minchyn_wrapper_address' => get_option('dao_minchyn_wrapper_address', ''),
);

$chain_id = get_option('dao_chain_id', 8453);
$enable_logging = get_option('dao_enable_logging', true);
$cache_duration = get_option('dao_cache_duration', 300);
?>

<div class="wrap">
    <h1>DAO Governance Settings</h1>
    
    <form method="post" action="">
        <?php wp_nonce_field('dao_governance_admin', 'dao_governance_nonce'); ?>
        
        <!-- Contract Addresses Section -->
        <h2>Smart Contract Addresses</h2>
        <p>Enter the deployed contract addresses for your DAO governance system on Base network.</p>
        
        <table class="form-table">
            <tr>
                <th scope="row">
                    <label for="gov_token_address">Governance Token (GovToken)</label>
                </th>
                <td>
                    <input type="text" 
                           id="gov_token_address" 
                           name="gov_token_address" 
                           value="<?php echo esc_attr($contract_addresses['gov_token_address']); ?>" 
                           class="regular-text"
                           placeholder="0x..." />
                    <p class="description">Address of the deployed GovToken contract</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="governor_address">DAO Governor (DaoGovernor)</label>
                </th>
                <td>
                    <input type="text" 
                           id="governor_address" 
                           name="governor_address" 
                           value="<?php echo esc_attr($contract_addresses['governor_address']); ?>" 
                           class="regular-text"
                           placeholder="0x..." />
                    <p class="description">Address of the deployed DaoGovernor contract</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="timelock_address">Timelock Controller</label>
                </th>
                <td>
                    <input type="text" 
                           id="timelock_address" 
                           name="timelock_address" 
                           value="<?php echo esc_attr($contract_addresses['timelock_address']); ?>" 
                           class="regular-text"
                           placeholder="0x..." />
                    <p class="description">Address of the deployed Timelock contract</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="proposal_manager_address">Proposal Manager</label>
                </th>
                <td>
                    <input type="text" 
                           id="proposal_manager_address" 
                           name="proposal_manager_address" 
                           value="<?php echo esc_attr($contract_addresses['proposal_manager_address']); ?>" 
                           class="regular-text"
                           placeholder="0x..." />
                    <p class="description">Address of the deployed SimpleProposalManager contract</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="treasury_address">DAO Treasury</label>
                </th>
                <td>
                    <input type="text" 
                           id="treasury_address" 
                           name="treasury_address" 
                           value="<?php echo esc_attr($contract_addresses['treasury_address']); ?>" 
                           class="regular-text"
                           placeholder="0x..." />
                    <p class="description">Address of the deployed DAOTreasury contract</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="voting_power_exchange_address">Voting Power Exchange</label>
                </th>
                <td>
                    <input type="text" 
                           id="voting_power_exchange_address" 
                           name="voting_power_exchange_address" 
                           value="<?php echo esc_attr($contract_addresses['voting_power_exchange_address']); ?>" 
                           class="regular-text"
                           placeholder="0x..." />
                    <p class="description">Address of the deployed VotingPowerExchangeV2 contract</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="ugly_unicorns_governance_address">Ugly Unicorns Governance</label>
                </th>
                <td>
                    <input type="text" 
                           id="ugly_unicorns_governance_address" 
                           name="ugly_unicorns_governance_address" 
                           value="<?php echo esc_attr($contract_addresses['ugly_unicorns_governance_address']); ?>" 
                           class="regular-text"
                           placeholder="0x..." />
                    <p class="description">Address of the deployed UglyUnicornsGovernance contract</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="minchyn_wrapper_address">Minchyn Wrapper</label>
                </th>
                <td>
                    <input type="text" 
                           id="minchyn_wrapper_address" 
                           name="minchyn_wrapper_address" 
                           value="<?php echo esc_attr($contract_addresses['minchyn_wrapper_address']); ?>" 
                           class="regular-text"
                           placeholder="0x..." />
                    <p class="description">Address of the deployed MinchynGovernanceWrapper contract</p>
                </td>
            </tr>
        </table>
        
        <h2>Network Settings</h2>
        
        <table class="form-table">
            <tr>
                <th scope="row">
                    <label for="chain_id">Chain ID</label>
                </th>
                <td>
                    <select id="chain_id" name="chain_id">
                        <option value="8453" <?php selected($chain_id, 8453); ?>>Base Mainnet (8453)</option>
                        <option value="84532" <?php selected($chain_id, 84532); ?>>Base Sepolia (84532)</option>
                    </select>
                    <p class="description">Select the blockchain network for your DAO</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="enable_logging">Enable Logging</label>
                </th>
                <td>
                    <input type="checkbox" 
                           id="enable_logging" 
                           name="enable_logging" 
                           value="1" 
                           <?php checked($enable_logging); ?> />
                    <label for="enable_logging">Log DAO governance activities</label>
                    <p class="description">Enable logging for debugging and monitoring</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="cache_duration">Cache Duration (seconds)</label>
                </th>
                <td>
                    <input type="number" 
                           id="cache_duration" 
                           name="cache_duration" 
                           value="<?php echo esc_attr($cache_duration); ?>" 
                           min="60" 
                           max="3600" />
                    <p class="description">How long to cache blockchain data (60-3600 seconds)</p>
                </td>
            </tr>
        </table>
        
        <?php submit_button(); ?>
    </form>
    
    <!-- Usage Instructions -->
    <div style="margin-top: 2rem; padding: 1rem; background: #f9f9f9; border-left: 4px solid #0073aa;">
        <h3>Usage Instructions</h3>
        
        <h4>Shortcodes</h4>
        <p>Use these shortcodes in your posts and pages:</p>
        <ul>
            <li><code>[dao_dashboard]</code> - Complete DAO dashboard with wallet connection</li>
            <li><code>[dao_proposals]</code> - List and manage proposals</li>
            <li><code>[dao_treasury]</code> - Treasury overview and management</li>
            <li><code>[dao_governance]</code> - Token exchange and governance tools</li>
            <li><code>[wallet_connect]</code> - Simple wallet connection button</li>
        </ul>
        
        <h4>Page Setup for cr8r.xyz</h4>
        <p>Create these pages for a complete DAO experience:</p>
        <ol>
            <li><strong>DAO Dashboard</strong> (<code>/dao/</code>) - Add <code>[dao_dashboard]</code></li>
            <li><strong>Proposals</strong> (<code>/dao/proposals/</code>) - Add <code>[dao_proposals]</code></li>
            <li><strong>Treasury</strong> (<code>/dao/treasury/</code>) - Add <code>[dao_treasury]</code></li>
            <li><strong>Governance</strong> (<code>/dao/governance/</code>) - Add <code>[dao_governance]</code></li>
        </ol>
        
        <h4>Required Steps</h4>
        <ol>
            <li>Deploy your smart contracts to Base network</li>
            <li>Enter all contract addresses above</li>
            <li>Save settings</li>
            <li>Create DAO pages with shortcodes</li>
            <li>Test with MetaMask wallet</li>
        </ol>
        
        <h4>Support</h4>
        <p>For technical support or questions about the DAO governance system, contact the CR8R development team.</p>
    </div>
</div>

<style>
.form-table input[type="text"] {
    font-family: monospace;
    font-size: 12px;
}

.form-table .description {
    font-style: italic;
    color: #666;
}

code {
    background: #f1f1f1;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: monospace;
}
</style>