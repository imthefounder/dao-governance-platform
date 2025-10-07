<?php
/**
 * NFT Minting Template
 * 
 * Template for displaying the Ugly Unicorns NFT minting interface
 * 
 * @package DAO_Governance
 * @version 2.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// Get shortcode attributes
$contract_address = !empty($atts['contract_address']) ? $atts['contract_address'] : '0x742d35Cc6634C0532925a3b8D56d8145431C5e5B';
$max_per_wallet = !empty($atts['max_per_wallet']) ? intval($atts['max_per_wallet']) : 61;
$price = !empty($atts['price']) ? floatval($atts['price']) : 0.2;
$css_class = !empty($atts['class']) ? esc_attr($atts['class']) : 'dao-nft-minting';
?>

<div class="<?php echo $css_class; ?>" id="dao-nft-minting">
    <!-- NFT Minting Header -->
    <div class="dao-nft-header">
        <h2 class="dao-section-title">🦄 Ugly Unicorns NFT Collection</h2>
        <p class="dao-section-description">
            Join the founding members club and mint your Ugly Unicorn NFT! Each NFT grants you voting power, 
            exclusive perks, and access to the future of our DAO ecosystem.
        </p>
    </div>

    <!-- Collection Stats -->
    <div class="dao-collection-stats">
        <div class="dao-stats-grid">
            <div class="dao-stat-card">
                <div class="dao-stat-value" id="minted-count">8,945</div>
                <div class="dao-stat-label">Minted</div>
            </div>
            <div class="dao-stat-card">
                <div class="dao-stat-value" id="remaining-count">13,277</div>
                <div class="dao-stat-label">Remaining</div>
            </div>
            <div class="dao-stat-card">
                <div class="dao-stat-value"><?php echo $price; ?> ETH</div>
                <div class="dao-stat-label">Mint Price</div>
            </div>
            <div class="dao-stat-card">
                <div class="dao-stat-value"><?php echo $max_per_wallet; ?></div>
                <div class="dao-stat-label">Max per Wallet</div>
            </div>
        </div>
    </div>

    <!-- Progress Bar -->
    <div class="dao-card dao-progress-card">
        <div class="dao-progress-header">
            <h3>Collection Progress</h3>
            <span class="dao-progress-percentage" id="progress-percentage">40.3% Complete</span>
        </div>
        <div class="dao-progress-container">
            <div class="dao-progress-bar" id="progress-bar" style="width: 40.3%"></div>
        </div>
        <div class="dao-progress-text" id="progress-text">8,945 / 22,222 minted</div>
    </div>

    <!-- Main Minting Interface -->
    <div class="dao-mint-grid">
        <!-- Minting Panel -->
        <div class="dao-card dao-mint-card">
            <h3 class="dao-card-title">Mint Your Ugly Unicorn</h3>
            
            <!-- Wallet Connection Required -->
            <div class="dao-wallet-required" id="wallet-required" style="display: block;">
                <div class="dao-wallet-prompt">
                    <div class="dao-wallet-icon">🦄</div>
                    <p>Connect your wallet to start minting</p>
                    <button class="dao-btn dao-btn-primary" id="connect-wallet-btn">
                        <span class="dao-btn-icon">👛</span>
                        Connect Wallet
                    </button>
                </div>
            </div>

            <!-- Minting Interface (hidden initially) -->
            <div class="dao-mint-interface" id="mint-interface" style="display: none;">
                <!-- User Status -->
                <div class="dao-user-status">
                    <div class="dao-user-info">
                        <div class="dao-user-minted">Your Minted NFTs</div>
                        <div class="dao-user-count" id="user-minted-count">2 / <?php echo $max_per_wallet; ?></div>
                    </div>
                    <div class="dao-badge dao-badge-success" id="allowlist-badge" style="display: none;">
                        <span class="dao-badge-icon">✓</span>
                        Allow Listed
                    </div>
                </div>

                <!-- Quantity Selector -->
                <div class="dao-form-group">
                    <label class="dao-form-label">Quantity to Mint</label>
                    <div class="dao-quantity-selector">
                        <button class="dao-btn dao-btn-outline dao-quantity-btn" id="decrease-qty" type="button">-</button>
                        <span class="dao-quantity-display" id="mint-quantity">1</span>
                        <button class="dao-btn dao-btn-outline dao-quantity-btn" id="increase-qty" type="button">+</button>
                    </div>
                    <div class="dao-form-help">Max 10 per transaction</div>
                </div>

                <!-- Cost Breakdown -->
                <div class="dao-cost-breakdown">
                    <div class="dao-cost-row">
                        <span>Price per NFT:</span>
                        <span class="dao-cost-value"><?php echo $price; ?> ETH</span>
                    </div>
                    <div class="dao-cost-row">
                        <span>Quantity:</span>
                        <span class="dao-cost-value" id="cost-quantity">1</span>
                    </div>
                    <div class="dao-cost-row dao-cost-total">
                        <span>Total Cost:</span>
                        <span class="dao-cost-value" id="total-cost"><?php echo $price; ?> ETH</span>
                    </div>
                    <div class="dao-balance-info">
                        <span>Your balance: <span id="user-balance">15.75 ETH</span></span>
                    </div>
                </div>

                <!-- Mint Button -->
                <button class="dao-btn dao-btn-primary dao-btn-large dao-mint-btn" id="mint-nft-btn">
                    <span class="dao-btn-icon">🦄</span>
                    <span id="mint-btn-text">Mint 1 Ugly Unicorn</span>
                </button>

                <!-- Status Messages -->
                <div class="dao-status-message dao-status-success" id="mint-success" style="display: none;">
                    <div class="dao-status-header">
                        <span class="dao-status-icon">✅</span>
                        <span class="dao-status-title">Mint Successful!</span>
                    </div>
                    <p class="dao-status-text">Your NFT has been minted successfully.</p>
                    <a href="#" class="dao-status-link" id="etherscan-link" target="_blank" rel="noopener noreferrer">
                        View on Etherscan →
                    </a>
                </div>

                <div class="dao-status-message dao-status-error" id="mint-error" style="display: none;">
                    <div class="dao-status-header">
                        <span class="dao-status-icon">❌</span>
                        <span class="dao-status-title">Mint Failed</span>
                    </div>
                    <p class="dao-status-text">Something went wrong. Please try again.</p>
                </div>

                <div class="dao-status-message dao-status-warning" id="mint-paused" style="display: none;">
                    <div class="dao-status-header">
                        <span class="dao-status-icon">⚠️</span>
                        <span class="dao-status-title">Minting Paused</span>
                    </div>
                    <p class="dao-status-text">Public minting is currently paused. Check back later!</p>
                </div>
            </div>
        </div>

        <!-- Your NFTs Panel -->
        <div class="dao-card dao-nfts-card">
            <h3 class="dao-card-title">Your Ugly Unicorns</h3>
            
            <!-- No Connection State -->
            <div class="dao-no-nfts" id="no-connection-nfts" style="display: block;">
                <div class="dao-empty-state">
                    <div class="dao-empty-icon">🦄</div>
                    <p>Connect wallet to view your NFTs</p>
                </div>
            </div>

            <!-- No NFTs State -->
            <div class="dao-no-nfts" id="no-nfts" style="display: none;">
                <div class="dao-empty-state">
                    <div class="dao-empty-icon">🦄</div>
                    <p>You don't own any Ugly Unicorns yet</p>
                    <p class="dao-empty-subtitle">Mint your first one above!</p>
                </div>
            </div>

            <!-- NFT List -->
            <div class="dao-nft-list" id="user-nfts" style="display: none;">
                <!-- NFT items will be loaded here -->
            </div>
        </div>
    </div>

    <!-- Collection Benefits -->
    <div class="dao-card dao-benefits-card">
        <h3 class="dao-card-title">🎯 NFT Holder Benefits</h3>
        <div class="dao-benefits-grid">
            <div class="dao-benefit-item">
                <div class="dao-benefit-icon">🗳️</div>
                <h4 class="dao-benefit-title">Enhanced Voting Power</h4>
                <p class="dao-benefit-text">Each NFT grants additional voting power in DAO governance decisions</p>
            </div>
            <div class="dao-benefit-item">
                <div class="dao-benefit-icon">💰</div>
                <h4 class="dao-benefit-title">Treasury Rewards</h4>
                <p class="dao-benefit-text">Share in treasury distributions and exclusive airdrops</p>
            </div>
            <div class="dao-benefit-item">
                <div class="dao-benefit-icon">🏆</div>
                <h4 class="dao-benefit-title">Exclusive Access</h4>
                <p class="dao-benefit-text">Priority access to events, features, and future collections</p>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // NFT Minting JavaScript functionality
    const mintingInterface = {
        contractAddress: '<?php echo esc_js($contract_address); ?>',
        maxPerWallet: <?php echo $max_per_wallet; ?>,
        price: <?php echo $price; ?>,
        
        // State
        isConnected: false,
        userBalance: 0,
        userMinted: 0,
        mintQuantity: 1,
        
        // DOM elements
        elements: {
            walletRequired: document.getElementById('wallet-required'),
            mintInterface: document.getElementById('mint-interface'),
            connectBtn: document.getElementById('connect-wallet-btn'),
            decreaseBtn: document.getElementById('decrease-qty'),
            increaseBtn: document.getElementById('increase-qty'),
            quantityDisplay: document.getElementById('mint-quantity'),
            costQuantity: document.getElementById('cost-quantity'),
            totalCost: document.getElementById('total-cost'),
            mintBtn: document.getElementById('mint-nft-btn'),
            mintBtnText: document.getElementById('mint-btn-text'),
            mintSuccess: document.getElementById('mint-success'),
            mintError: document.getElementById('mint-error'),
            noConnectionNfts: document.getElementById('no-connection-nfts'),
            noNfts: document.getElementById('no-nfts'),
            userNfts: document.getElementById('user-nfts')
        },
        
        init: function() {
            this.bindEvents();
            this.updateUI();
        },
        
        bindEvents: function() {
            this.elements.connectBtn.addEventListener('click', () => this.connectWallet());
            this.elements.decreaseBtn.addEventListener('click', () => this.changeQuantity(-1));
            this.elements.increaseBtn.addEventListener('click', () => this.changeQuantity(1));
            this.elements.mintBtn.addEventListener('click', () => this.mintNFT());
        },
        
        connectWallet: async function() {
            try {
                if (typeof window.ethereum !== 'undefined') {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    if (accounts.length > 0) {
                        this.isConnected = true;
                        this.userBalance = 15.75; // Mock balance
                        this.userMinted = 2; // Mock minted count
                        this.updateUI();
                    }
                } else {
                    alert('Please install MetaMask or another Web3 wallet to mint NFTs.');
                }
            } catch (error) {
                console.error('Error connecting wallet:', error);
                alert('Failed to connect wallet. Please try again.');
            }
        },
        
        changeQuantity: function(delta) {
            const newQuantity = this.mintQuantity + delta;
            const maxMintable = Math.min(10, this.maxPerWallet - this.userMinted);
            
            if (newQuantity >= 1 && newQuantity <= maxMintable) {
                this.mintQuantity = newQuantity;
                this.updateQuantityDisplay();
            }
        },
        
        updateQuantityDisplay: function() {
            this.elements.quantityDisplay.textContent = this.mintQuantity;
            this.elements.costQuantity.textContent = this.mintQuantity;
            this.elements.totalCost.textContent = (this.mintQuantity * this.price).toFixed(4) + ' ETH';
            this.elements.mintBtnText.textContent = `Mint ${this.mintQuantity} Ugly Unicorn${this.mintQuantity > 1 ? 's' : ''}`;
        },
        
        mintNFT: async function() {
            if (!this.isConnected) {
                alert('Please connect your wallet first.');
                return;
            }
            
            const totalCost = this.mintQuantity * this.price;
            if (this.userBalance < totalCost) {
                alert('Insufficient balance to mint.');
                return;
            }
            
            // Show loading state
            this.elements.mintBtn.disabled = true;
            this.elements.mintBtnText.textContent = 'Minting...';
            
            try {
                // Simulate minting transaction
                await new Promise(resolve => setTimeout(resolve, 3000));
                
                // Show success message
                this.elements.mintSuccess.style.display = 'block';
                this.elements.mintError.style.display = 'none';
                
                // Update user's minted count
                this.userMinted += this.mintQuantity;
                this.userBalance -= totalCost;
                
                // Reset quantity to 1
                this.mintQuantity = 1;
                this.updateQuantityDisplay();
                this.updateUI();
                
                // Simulate transaction hash
                const txHash = '0x' + Math.random().toString(16).substr(2, 64);
                document.getElementById('etherscan-link').href = `https://etherscan.io/tx/${txHash}`;
                
            } catch (error) {
                console.error('Minting error:', error);
                this.elements.mintSuccess.style.display = 'none';
                this.elements.mintError.style.display = 'block';
            } finally {
                this.elements.mintBtn.disabled = false;
                this.elements.mintBtnText.textContent = `Mint ${this.mintQuantity} Ugly Unicorn${this.mintQuantity > 1 ? 's' : ''}`;
            }
        },
        
        updateUI: function() {
            if (this.isConnected) {
                this.elements.walletRequired.style.display = 'none';
                this.elements.mintInterface.style.display = 'block';
                this.elements.noConnectionNfts.style.display = 'none';
                
                // Update user minted count
                document.getElementById('user-minted-count').textContent = `${this.userMinted} / ${this.maxPerWallet}`;
                
                // Update balance
                document.getElementById('user-balance').textContent = `${this.userBalance.toFixed(4)} ETH`;
                
                // Show NFTs or no NFTs state
                if (this.userMinted > 0) {
                    this.elements.noNfts.style.display = 'none';
                    this.elements.userNfts.style.display = 'block';
                    this.loadUserNFTs();
                } else {
                    this.elements.noNfts.style.display = 'block';
                    this.elements.userNfts.style.display = 'none';
                }
            } else {
                this.elements.walletRequired.style.display = 'block';
                this.elements.mintInterface.style.display = 'none';
                this.elements.noConnectionNfts.style.display = 'block';
                this.elements.noNfts.style.display = 'none';
                this.elements.userNfts.style.display = 'none';
            }
            
            this.updateQuantityDisplay();
        },
        
        loadUserNFTs: function() {
            // Mock NFT data
            const mockNFTs = [
                {
                    tokenId: 1234,
                    name: 'Ugly Unicorn #1234',
                    rarity: 'Legendary',
                    image: '/wp-content/plugins/dao-governance/assets/images/nft-placeholder.png'
                },
                {
                    tokenId: 5678,
                    name: 'Ugly Unicorn #5678',
                    rarity: 'Rare',
                    image: '/wp-content/plugins/dao-governance/assets/images/nft-placeholder.png'
                }
            ];
            
            const nftContainer = this.elements.userNfts;
            nftContainer.innerHTML = '';
            
            mockNFTs.slice(0, this.userMinted).forEach(nft => {
                const nftElement = document.createElement('div');
                nftElement.className = 'dao-nft-item';
                nftElement.innerHTML = `
                    <div class="dao-nft-image">
                        <img src="${nft.image}" alt="${nft.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"100\\" height=\\"100\\"><rect width=\\"100\\" height=\\"100\\" fill=\\"%23f3f4f6\\"/><text x=\\"50\\" y=\\"50\\" text-anchor=\\"middle\\" dy=\\".3em\\" fill=\\"%236b7280\\">🦄</text></svg>'" />
                    </div>
                    <div class="dao-nft-info">
                        <div class="dao-nft-header">
                            <h4 class="dao-nft-name">${nft.name}</h4>
                            <span class="dao-badge dao-badge-rarity dao-badge-${nft.rarity.toLowerCase()}">${nft.rarity}</span>
                        </div>
                        <div class="dao-nft-actions">
                            <button class="dao-btn dao-btn-outline dao-btn-sm">View Details</button>
                            <button class="dao-btn dao-btn-outline dao-btn-sm">↗</button>
                        </div>
                    </div>
                `;
                nftContainer.appendChild(nftElement);
            });
        }
    };
    
    // Initialize the minting interface
    mintingInterface.init();
});
</script>

<style>
/* NFT Minting Specific Styles */
.dao-nft-minting {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.dao-nft-header {
    text-align: center;
    margin-bottom: 3rem;
}

.dao-collection-stats {
    margin-bottom: 2rem;
}

.dao-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.dao-stat-card {
    background: white;
    padding: 2rem 1.5rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
}

.dao-stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: #3b82f6;
    margin-bottom: 0.5rem;
}

.dao-stat-label {
    font-size: 0.875rem;
    color: #6b7280;
}

.dao-progress-card {
    margin-bottom: 2rem;
}

.dao-progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.dao-progress-container {
    width: 100%;
    height: 12px;
    background-color: #e5e7eb;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 0.5rem;
}

.dao-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%);
    transition: width 0.3s ease;
}

.dao-progress-text {
    font-size: 0.75rem;
    color: #6b7280;
    text-align: center;
}

.dao-mint-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

@media (max-width: 768px) {
    .dao-mint-grid {
        grid-template-columns: 1fr;
    }
}

.dao-wallet-prompt {
    text-align: center;
    padding: 3rem 1rem;
}

.dao-wallet-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.dao-user-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
    margin-bottom: 1.5rem;
}

.dao-user-minted {
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.dao-user-count {
    font-size: 0.875rem;
    color: #6b7280;
}

.dao-quantity-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 0.5rem 0;
}

.dao-quantity-btn {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    font-size: 1.25rem;
    font-weight: bold;
}

.dao-quantity-display {
    font-size: 1.5rem;
    font-weight: bold;
    min-width: 3rem;
    text-align: center;
}

.dao-cost-breakdown {
    background: #dbeafe;
    padding: 1rem;
    border-radius: 8px;
    margin: 1.5rem 0;
}

.dao-cost-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}

.dao-cost-total {
    font-weight: bold;
    border-top: 1px solid #93c5fd;
    padding-top: 0.5rem;
    margin-top: 0.5rem;
}

.dao-balance-info {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 0.5rem;
}

.dao-mint-btn {
    width: 100%;
    justify-content: center;
}

.dao-empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: #6b7280;
}

.dao-empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.dao-empty-subtitle {
    font-size: 0.875rem;
    margin-top: 0.5rem;
}

.dao-nft-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.dao-nft-item {
    display: flex;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
}

.dao-nft-image {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    background: #f3f4f6;
}

.dao-nft-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.dao-nft-info {
    flex: 1;
    padding: 1rem;
}

.dao-nft-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
}

.dao-nft-name {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0;
}

.dao-badge-rarity.dao-badge-legendary {
    background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%);
    color: white;
}

.dao-badge-rarity.dao-badge-rare {
    background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
}

.dao-nft-actions {
    display: flex;
    gap: 0.5rem;
}

.dao-benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.dao-benefit-item {
    text-align: center;
}

.dao-benefit-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.dao-benefit-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
}

.dao-benefit-text {
    font-size: 0.875rem;
    color: #6b7280;
    line-height: 1.5;
}
</style>