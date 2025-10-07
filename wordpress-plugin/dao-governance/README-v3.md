# Minchyn Founding Member Club Platform WordPress Plugin

**Version:** 3.0.0  
**Requires WordPress:** 6.0+  
**Tested up to:** 6.4  
**PHP Version:** 8.0+  

## Overview

The Minchyn Founding Member Club Platform WordPress Plugin brings the complete founding member experience to your WordPress site through comprehensive shortcodes and integrations. This plugin enables you to create a full-featured community platform with equity tracking, NFT utilities, founder benefits, and advanced gamification.

## 📌 IMPORTANT LEGAL NOTICE

**All "equity shares" mentioned in this plugin represent ACTUAL OWNERSHIP RIGHTS in Minchyn and carry LEGAL RIGHTS and financial value. NFTs are utility tokens providing platform access and qualifying holders for equity share allocation. Please review all legal documentation before implementation.**

## 🚀 New Features in Version 3.0.0

### Enhanced Platform Features
- **NFT Staking Rewards System** - Stake NFTs for daily $MINCHYN utility tokens
- **Accurate Equity Tracking** - 300M base shares + NFT dilution calculations
- **Founder Benefits Dashboard** - VIP access, exclusive merchandise, priority support
- **Networking Hub** - Member directory, project collaboration, professional connections
- **Job Board & Hiring Hub** - Community-driven recruitment platform
- **Enhanced Gamification** - Advanced membership levels, seasonal challenges, NFT-specific achievements
- **Administrator Dashboard** - Complete platform management tools
- **OpenSea Integration** - Collection status and secondary marketplace features
- **Legal Compliance Suite** - Comprehensive disclaimers and documentation
- **Mobile Responsive Design** - Optimized for all devices

## 📋 Available Shortcodes

### Core Platform Shortcodes
```php
[dao_dashboard]                    // Main dashboard overview
[dao_proposals]                    // Governance proposals
[dao_treasury]                     // Treasury management
[dao_governance]                   // Governance features
[wallet_connect]                   // Wallet connection
[dao_nft_minting]                  // NFT minting interface
```

### Gamification & Community
```php
[dao_gamification]                 // Gamification overview
[dao_membership_levels]            // Membership level system
[dao_achievements]                 // Achievement tracking
[dao_seasonal_challenges]          // Seasonal challenges
[dao_community]                    // Community features
[dao_social_features]              // Social interactions
[dao_discussions]                  // Community discussions
[dao_leaderboard]                  // Community leaderboard
```

### Analytics & Insights
```php
[dao_analytics]                    // General analytics
[dao_governance_analytics]         // Governance metrics
[dao_treasury_analytics]           // Treasury analytics
[dao_profile]                      // User profiles
[dao_personal_dashboard]           // Personal dashboard
```

### FMC 2024 Enhancement Shortcodes
```php
[fmc_staking_rewards]              // NFT staking rewards system
[fmc_equity_tracking]              // Equity calculation display
[fmc_founder_benefits]             // Founder benefits overview
[fmc_networking_hub]               // Professional networking
[fmc_job_board]                    // Community job listings
[fmc_hiring_hub]                   // Hiring management
[fmc_enhanced_gamification]        // Advanced gamification
[fmc_admin_dashboard]              // Admin tools (restricted)
[fmc_opensea_integration]          // OpenSea marketplace
[fmc_legal_disclaimers]            // Legal compliance notices
```

## 🔧 Shortcode Attributes

### Staking Rewards
```php
[fmc_staking_rewards daily_reward="100" voting_boost="1.5"]
```

### Equity Tracking
```php
[fmc_equity_tracking total_shares="300000000" shares_per_nft="500"]
```

### OpenSea Integration
```php
[fmc_opensea_integration collection_slug="ugly-unicorns" contract_address="0x742d..."]
```

### Legal Disclaimers
```php
[fmc_legal_disclaimers type="equity"]     // Equity-specific disclaimers
[fmc_legal_disclaimers type="nft"]        // NFT-specific disclaimers
[fmc_legal_disclaimers type="general"]    // General platform disclaimers
```

### Job Board
```php
[fmc_job_board posts_per_page="10"]
```

## 🎨 Styling & Customization

### CSS Classes
The plugin provides comprehensive CSS classes for customization:

```css
/* Core Platform Styles */
.dao-dashboard { }
.dao-proposals { }
.dao-treasury { }
.dao-gamification { }

/* FMC Enhancement Styles */
.fmc-staking-rewards { }
.fmc-equity-tracking { }
.fmc-founder-benefits { }
.fmc-networking-hub { }
.fmc-job-board { }
.fmc-admin-dashboard { }
.fmc-legal-disclaimers { }

/* Legal Notice Styles */
.legal-notice { }
.equity-disclaimer { }
.nft-disclaimer { }
.general-disclaimer { }
```

### Responsive Design
All shortcodes include mobile-responsive design with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ⚖️ Legal Compliance Features

### Built-in Legal Disclaimers
- **Equity Disclaimers** - Clear warnings about gifted shares
- **NFT Utility Notices** - Explanation of utility token nature
- **Platform Terms** - General usage disclaimers
- **Regulatory Compliance** - Meets securities law requirements

### Legal Documentation Integration
- Links to Terms of Service
- Privacy Policy integration
- Full legal disclaimers
- Regulatory compliance notices

## 🔐 Security Features

### Access Control
- Administrator-only shortcodes require `manage_options` capability
- User authentication integration
- Wallet-based access control
- Role-based feature access

### Data Protection
- No sensitive data storage
- GDPR compliance ready
- Privacy-focused design
- Secure API endpoints

## 📱 Mobile Optimization

### Responsive Design
- Mobile-first approach
- Touch-friendly interfaces
- Optimized loading times
- Adaptive layouts

### Performance
- Minimal JavaScript footprint
- CSS optimization
- Image optimization
- Caching support

## 🛠️ Installation

1. **Upload Plugin**
   ```bash
   # Upload to /wp-content/plugins/dao-governance/
   ```

2. **Activate Plugin**
   - Go to WordPress Admin → Plugins
   - Find "Minchyn Founding Member Club Platform"
   - Click "Activate"

3. **Configure Settings**
   - Go to Settings → DAO Governance
   - Configure your preferences
   - Set up legal disclaimers

## ⚙️ Configuration

### Required Settings
```php
// Chain ID (Base Mainnet)
dao_chain_id = 8453

// Contract Address (Ugly Unicorns)
contract_address = "0x742d35Cc6634C0532925a3b8D56d8145431C5e5B"

// OpenSea Collection
collection_slug = "ugly-unicorns"
```

### Optional Settings
```php
// Cache Duration (seconds)
dao_cache_duration = 300

// Logging
dao_enable_logging = true

// Default Rewards
daily_staking_reward = 100
voting_power_boost = 1.5
```

## 📊 Analytics Integration

### Built-in Metrics
- User engagement tracking
- Feature usage analytics
- Community activity metrics
- Platform performance data

### External Integration
- Google Analytics support
- Custom event tracking
- Performance monitoring
- Error reporting

## 🔄 REST API Endpoints

### Available Endpoints
```
GET /wp-json/dao-governance/v1/proposals
GET /wp-json/dao-governance/v1/treasury
GET /wp-json/dao-governance/v1/user/{address}
GET /wp-json/dao-governance/v1/analytics
POST /wp-json/dao-governance/v1/vote
```

## 🐛 Troubleshooting

### Common Issues

1. **Shortcode Not Displaying**
   - Check plugin activation
   - Verify user permissions
   - Review error logs

2. **Styling Issues**
   - Clear cache
   - Check CSS conflicts
   - Verify theme compatibility

3. **Legal Disclaimers Missing**
   - Ensure proper shortcode usage
   - Check legal documentation files
   - Verify disclaimer type parameter

### Debug Mode
```php
// Enable WordPress debug mode
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);

// Check logs at /wp-content/debug.log
```

## 📝 Changelog

### Version 3.0.0 (December 2024)
- **New:** NFT staking rewards system
- **New:** Accurate equity tracking with 300M base calculations
- **New:** Founder benefits dashboard
- **New:** Networking hub with member directory
- **New:** Job board and hiring management
- **New:** Enhanced gamification system
- **New:** Administrator dashboard (restricted access)
- **New:** OpenSea marketplace integration
- **New:** Comprehensive legal compliance suite
- **New:** Mobile-responsive design optimization
- **Enhanced:** All existing features updated for FMC platform
- **Legal:** Added extensive disclaimers and compliance documentation

### Version 2.0.0 (Previous)
- Core DAO governance features
- Basic gamification system
- Community discussions
- Treasury analytics

## 📞 Support

### Documentation
- [Full Documentation](https://docs.minchyn.com)
- [Developer Guide](https://dev.minchyn.com)
- [Legal Resources](https://legal.minchyn.com)

### Contact
- **Technical Support:** support@minchyn.com
- **Legal Inquiries:** legal@minchyn.com
- **General Questions:** info@minchyn.com

## ⚖️ Legal Notice

**IMPORTANT:** This plugin includes features that reference "equity shares" and "staking rewards." The equity shares represent actual ownership rights in Minchyn with legal and financial value. NFTs are utility tokens providing platform access and qualifying holders for equity allocation.

**Always ensure compliance with local laws and regulations when implementing equity ownership features.**

---

© 2024 Minchyn. All rights reserved. This plugin is provided under the MIT License for the Minchyn Founding Member Club platform.