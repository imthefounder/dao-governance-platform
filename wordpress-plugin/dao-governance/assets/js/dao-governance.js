/**
 * DAO Governance WordPress Plugin JavaScript
 * 
 * Handles Web3 wallet connection and smart contract interactions
 * for the Ugly Unicorns DAO governance platform.
 */

(function($) {
    'use strict';

    // Global DAO object
    window.DAO = {
        // Configuration
        config: daoGovernance || {},
        
        // State
        state: {
            isConnected: false,
            address: null,
            balance: null,
            votingPower: null,
            provider: null,
            signer: null,
            chainId: null
        },
        
        // Contract instances
        contracts: {},
        
        // Initialize DAO functionality
        init: function() {
            console.log('Initializing DAO Governance Plugin...');
            
            // Check if Web3 is available
            if (typeof window.ethereum === 'undefined') {
                this.showError('MetaMask or another Web3 wallet is required to use this feature.');
                return;
            }
            
            // Initialize event handlers
            this.bindEvents();
            
            // Check if already connected
            this.checkConnection();
            
            console.log('DAO Governance Plugin initialized successfully');
        },
        
        // Bind event handlers
        bindEvents: function() {
            var self = this;
            
            // Wallet connect button
            $(document).on('click', '.dao-connect-wallet', function(e) {
                e.preventDefault();
                self.connectWallet();
            });
            
            // Disconnect wallet
            $(document).on('click', '.dao-disconnect-wallet', function(e) {
                e.preventDefault();
                self.disconnectWallet();
            });
            
            // Create proposal
            $(document).on('click', '.dao-create-proposal', function(e) {
                e.preventDefault();
                self.showCreateProposalModal();
            });
            
            // Cast vote
            $(document).on('click', '.dao-cast-vote', function(e) {
                e.preventDefault();
                var proposalId = $(this).data('proposal-id');
                var support = $(this).data('support');
                self.castVote(proposalId, support);
            });
            
            // Deposit to treasury
            $(document).on('click', '.dao-deposit-treasury', function(e) {
                e.preventDefault();
                self.showDepositModal();
            });
            
            // Exchange tokens
            $(document).on('click', '.dao-exchange-tokens', function(e) {
                e.preventDefault();
                self.showExchangeModal();
            });
            
            // Listen for account changes
            if (window.ethereum) {
                window.ethereum.on('accountsChanged', function(accounts) {
                    if (accounts.length === 0) {
                        self.disconnectWallet();
                    } else {
                        self.state.address = accounts[0];
                        self.updateUI();
                    }
                });
                
                window.ethereum.on('chainChanged', function(chainId) {
                    self.state.chainId = parseInt(chainId, 16);
                    self.checkChain();
                });
            }
        },
        
        // Connect wallet
        connectWallet: async function() {
            try {
                console.log('Connecting wallet...');
                
                // Request account access
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                
                if (accounts.length === 0) {
                    throw new Error('No accounts found');
                }
                
                // Initialize provider and signer
                this.state.provider = new ethers.providers.Web3Provider(window.ethereum);
                this.state.signer = this.state.provider.getSigner();
                this.state.address = accounts[0];
                this.state.isConnected = true;
                
                // Get chain ID
                const network = await this.state.provider.getNetwork();
                this.state.chainId = network.chainId;
                
                // Check if on correct chain
                if (!this.checkChain()) {
                    return;
                }
                
                // Get balance
                await this.updateBalance();
                
                // Initialize contracts
                this.initContracts();
                
                // Update UI
                this.updateUI();
                
                // Get voting power
                await this.updateVotingPower();
                
                console.log('Wallet connected successfully:', this.state.address);
                this.showSuccess('Wallet connected successfully!');
                
            } catch (error) {
                console.error('Error connecting wallet:', error);
                this.showError('Failed to connect wallet: ' + error.message);
            }
        },
        
        // Disconnect wallet
        disconnectWallet: function() {
            this.state = {
                isConnected: false,
                address: null,
                balance: null,
                votingPower: null,
                provider: null,
                signer: null,
                chainId: null
            };
            
            this.contracts = {};
            this.updateUI();
            
            console.log('Wallet disconnected');
            this.showInfo('Wallet disconnected');
        },
        
        // Check if on correct chain
        checkChain: function() {
            const expectedChainId = this.config.chainId || 8453; // Base Mainnet
            
            if (this.state.chainId !== expectedChainId) {
                this.showError('Please switch to the correct network (Base Mainnet)');
                return false;
            }
            
            return true;
        },
        
        // Check existing connection
        checkConnection: async function() {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({
                        method: 'eth_accounts'
                    });
                    
                    if (accounts.length > 0) {
                        await this.connectWallet();
                    }
                } catch (error) {
                    console.error('Error checking connection:', error);
                }
            }
        },
        
        // Initialize smart contracts
        initContracts: function() {
            if (!this.state.signer) return;
            
            try {
                // Initialize contract instances (you'll need to add the full ABIs)
                if (this.config.contracts.govToken) {
                    this.contracts.govToken = new ethers.Contract(
                        this.config.contracts.govToken,
                        this.getGovTokenABI(),
                        this.state.signer
                    );
                }
                
                if (this.config.contracts.proposalManager) {
                    this.contracts.proposalManager = new ethers.Contract(
                        this.config.contracts.proposalManager,
                        this.getProposalManagerABI(),
                        this.state.signer
                    );
                }
                
                if (this.config.contracts.treasury) {
                    this.contracts.treasury = new ethers.Contract(
                        this.config.contracts.treasury,
                        this.getTreasuryABI(),
                        this.state.signer
                    );
                }
                
                console.log('Contracts initialized');
            } catch (error) {
                console.error('Error initializing contracts:', error);
            }
        },
        
        // Update balance
        updateBalance: async function() {
            if (!this.state.provider || !this.state.address) return;
            
            try {
                const balance = await this.state.provider.getBalance(this.state.address);
                this.state.balance = ethers.utils.formatEther(balance);
                console.log('Balance updated:', this.state.balance);
            } catch (error) {
                console.error('Error updating balance:', error);
            }
        },
        
        // Update voting power
        updateVotingPower: async function() {
            if (!this.contracts.govToken || !this.state.address) return;
            
            try {
                const votingPower = await this.contracts.govToken.balanceOf(this.state.address);
                this.state.votingPower = ethers.utils.formatEther(votingPower);
                console.log('Voting power updated:', this.state.votingPower);
            } catch (error) {
                console.error('Error updating voting power:', error);
            }
        },
        
        // Update UI elements
        updateUI: function() {
            // Update connection status
            if (this.state.isConnected) {
                $('.dao-wallet-status').removeClass('disconnected').addClass('connected');
                $('.dao-wallet-address').text(this.formatAddress(this.state.address));
                $('.dao-wallet-balance').text(this.formatBalance(this.state.balance));
                $('.dao-voting-power').text(this.formatBalance(this.state.votingPower));
                
                // Show connected elements
                $('.dao-connected-only').show();
                $('.dao-disconnected-only').hide();
                
                // Update button text
                $('.dao-connect-wallet').text('Connected').prop('disabled', true);
                
            } else {
                $('.dao-wallet-status').removeClass('connected').addClass('disconnected');
                $('.dao-wallet-address').text('Not connected');
                $('.dao-wallet-balance').text('-');
                $('.dao-voting-power').text('-');
                
                // Hide connected elements
                $('.dao-connected-only').hide();
                $('.dao-disconnected-only').show();
                
                // Update button text
                $('.dao-connect-wallet').text('Connect Wallet').prop('disabled', false);
            }
            
            // Trigger custom event
            $(document).trigger('dao:ui-updated', [this.state]);
        },
        
        // Cast vote on proposal
        castVote: async function(proposalId, support) {
            if (!this.contracts.proposalManager) {
                this.showError('Proposal manager contract not available');
                return;
            }
            
            try {
                this.showLoading('Casting vote...');
                
                const tx = await this.contracts.proposalManager.castVote(proposalId, support);
                await tx.wait();
                
                this.hideLoading();
                this.showSuccess('Vote cast successfully!');
                
                // Refresh proposal data
                this.refreshProposals();
                
            } catch (error) {
                this.hideLoading();
                console.error('Error casting vote:', error);
                this.showError('Failed to cast vote: ' + error.message);
            }
        },
        
        // Deposit ETH to treasury
        depositToTreasury: async function(amount) {
            if (!this.contracts.treasury) {
                this.showError('Treasury contract not available');
                return;
            }
            
            try {
                this.showLoading('Depositing to treasury...');
                
                const tx = await this.contracts.treasury.depositETH({
                    value: ethers.utils.parseEther(amount)
                });
                await tx.wait();
                
                this.hideLoading();
                this.showSuccess('Deposit successful!');
                
                // Refresh treasury data
                this.refreshTreasury();
                
            } catch (error) {
                this.hideLoading();
                console.error('Error depositing to treasury:', error);
                this.showError('Failed to deposit: ' + error.message);
            }
        },
        
        // Utility functions
        formatAddress: function(address) {
            if (!address) return '';
            return address.slice(0, 6) + '...' + address.slice(-4);
        },
        
        formatBalance: function(balance) {
            if (!balance) return '0';
            const num = parseFloat(balance);
            if (num === 0) return '0';
            if (num < 0.001) return '< 0.001';
            return num.toFixed(3);
        },
        
        // Show success message
        showSuccess: function(message) {
            this.showNotification(message, 'success');
        },
        
        // Show error message
        showError: function(message) {
            this.showNotification(message, 'error');
        },
        
        // Show info message
        showInfo: function(message) {
            this.showNotification(message, 'info');
        },
        
        // Show notification
        showNotification: function(message, type) {
            // Create notification element
            var notification = $('<div class="dao-notification dao-notification-' + type + '">' + message + '</div>');
            
            // Add to page
            $('body').append(notification);
            
            // Show notification
            notification.addClass('show');
            
            // Auto hide after 5 seconds
            setTimeout(function() {
                notification.removeClass('show');
                setTimeout(function() {
                    notification.remove();
                }, 300);
            }, 5000);
        },
        
        // Show loading overlay
        showLoading: function(message) {
            var loading = $('<div class="dao-loading-overlay"><div class="dao-loading-content"><div class="dao-spinner"></div><p>' + (message || 'Loading...') + '</p></div></div>');
            $('body').append(loading);
        },
        
        // Hide loading overlay
        hideLoading: function() {
            $('.dao-loading-overlay').remove();
        },
        
        // Refresh proposals
        refreshProposals: function() {
            // Trigger refresh event
            $(document).trigger('dao:refresh-proposals');
        },
        
        // Refresh treasury
        refreshTreasury: function() {
            // Trigger refresh event
            $(document).trigger('dao:refresh-treasury');
        },
        
        // Contract ABIs (simplified - you'll need full ABIs)
        getGovTokenABI: function() {
            return [
                "function balanceOf(address account) view returns (uint256)",
                "function mint(address to, uint256 amount)",
                "function burn(address from, uint256 amount)"
            ];
        },
        
        getProposalManagerABI: function() {
            return [
                "function createProposal(uint8 proposalType, string title, string description, address[] targets, uint256[] values, bytes[] calldatas) returns (uint256)",
                "function castVote(uint256 proposalId, uint8 support)",
                "function getProposal(uint256 proposalId) view returns (tuple)",
                "function getProposalCount() view returns (uint256)"
            ];
        },
        
        getTreasuryABI: function() {
            return [
                "function depositETH() payable",
                "function getAssetBalance(address asset) view returns (uint256)",
                "function getSupportedAssets() view returns (address[])"
            ];
        }
    };

    // Initialize when document is ready
    $(document).ready(function() {
        window.DAO.init();
    });

})(jQuery);