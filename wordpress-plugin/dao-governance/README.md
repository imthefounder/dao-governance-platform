# DAO Governance WordPress Plugin

A comprehensive WordPress plugin that brings advanced DAO governance, gamification, analytics, and community features to your website. Built for the Ugly Unicorns DAO community but adaptable for any DAO organization.

## 🚀 Features

### Core Governance
- **Wallet Connection**: Seamless Web3 wallet integration with MetaMask, WalletConnect support
- **Proposal Management**: View, create, and vote on DAO proposals
- **Treasury Overview**: Real-time treasury monitoring and asset tracking
- **Governance Dashboard**: Comprehensive overview of DAO activities

### 🎮 Gamification System
- **Membership Levels**: Progressive 5-tier system (Newcomer → Member → Contributor → Advocate → Guardian)
- **Achievement System**: Unlock badges for various DAO activities
- **XP & Rewards**: Earn experience points for participation and contributions
- **Seasonal Challenges**: Limited-time challenges with bonus rewards
- **Leaderboards**: Community rankings based on activity and contributions

### 📊 Advanced Analytics
- **Governance Health**: Participation rates, voting patterns, proposal success metrics
- **Treasury Analytics**: Asset allocation, performance tracking, expense breakdowns
- **Community Insights**: Member growth, engagement metrics, activity trends
- **Performance Benchmarks**: Compare against industry standards

### 👥 Community Features
- **Discussion Forums**: Category-based community discussions
- **Member Profiles**: Personal dashboards with activity history
- **Social Features**: Member directory, networking capabilities
- **Event Calendar**: Community events and meeting scheduling
- **Special Interest Groups**: Topic-based sub-communities

### 🔧 Personal Dashboard
- **Profile Management**: Customizable member profiles
- **Activity Tracking**: Personal voting history and contribution timeline
- **Progress Monitoring**: Level advancement and achievement tracking
- **Portfolio Overview**: Voting power, delegations, token holdings

## 📋 Available Shortcodes

### Core Governance
```php
[dao_dashboard]           // Main DAO overview dashboard
[dao_proposals]           // Proposal listing and management
[dao_treasury]            // Treasury overview and analytics
[dao_governance]          // Governance information and tools
[wallet_connect]          // Wallet connection button
```

### Gamification
```php
[dao_gamification]        // Complete gamification dashboard
[dao_membership_levels]   // Membership tier information
[dao_achievements]        // Achievement system and progress
[dao_seasonal_challenges] // Current seasonal challenges
[dao_leaderboard]         // Community leaderboard
```

### Analytics
```php
[dao_analytics]           // Complete analytics dashboard
[dao_governance_analytics] // Governance-specific metrics
[dao_treasury_analytics]  // Treasury performance analytics
```

### Community & Profile
```php
[dao_community]           // Community hub with discussions
[dao_profile]             // Personal member dashboard
[dao_personal_dashboard]  // Detailed personal analytics
[dao_social_features]     // Social networking features
[dao_discussions]         // Discussion forums only
```

## 🛠️ Installation

1. **Download** the plugin files to your WordPress plugins directory:
   ```
   /wp-content/plugins/dao-governance/
   ```

2. **Activate** the plugin through the WordPress admin panel:
   - Go to `Plugins > Installed Plugins`
   - Find "Ugly Unicorns DAO Platform" and click "Activate"

3. **Configure** the plugin settings:
   - Go to `DAO Governance` in the WordPress admin menu
   - Enter your contract addresses and RPC endpoints
   - Configure wallet connection settings

## ⚙️ Configuration

### Required Settings
```php
// Contract Addresses (configure in admin panel)
DAO_CONTRACT_ADDRESS=0x...
TREASURY_CONTRACT_ADDRESS=0x...
GOVERNANCE_TOKEN_ADDRESS=0x...

// Network Configuration
NETWORK_RPC_URL=https://...
NETWORK_CHAIN_ID=1
```

### Optional Features
- **Custom Branding**: Modify colors, logos, and styling
- **Membership Levels**: Customize XP requirements and benefits
- **Achievement Types**: Define custom achievements and rewards
- **Discussion Categories**: Set up forum categories
- **Event Integration**: Connect with external calendar systems

## 📖 Usage Examples

### Basic Dashboard Page
```php
// Create a new page and add this shortcode
[dao_dashboard]
```

### Complete Gamification Page
```php
// Full gamification experience
[dao_gamification]

// Or individual components
[dao_membership_levels]
[dao_achievements]
[dao_seasonal_challenges]
```

### Analytics Dashboard
```php
// Complete analytics suite
[dao_analytics]

// Or specific analytics
[dao_governance_analytics]
[dao_treasury_analytics]
```

### Community Hub
```php
// Full community features
[dao_community]

// Or individual features
[dao_discussions]
[dao_social_features]
```

### Member Profile Page
```php
// Personal dashboard for logged-in members
[dao_profile]
```

## 🎨 Customization

### CSS Customization
The plugin includes comprehensive CSS classes for easy customization:

```css
/* Main containers */
.dao-gamification-container { }
.dao-analytics-container { }
.dao-community-container { }
.dao-profile-container { }

/* Card components */
.dashboard-card { }
.metric-card { }
.achievement-card { }
.member-card { }

/* Interactive elements */
.tab-btn { }
.filter-btn { }
.create-btn { }
```

### Template Overrides
Override plugin templates by copying them to your theme:

```
wp-content/themes/your-theme/dao-governance/
├── gamification.php
├── analytics.php
├── community.php
├── profile.php
└── membership-levels.php
```

## 🔌 API Endpoints

The plugin provides REST API endpoints for external integrations:

### Gamification
- `GET /wp-json/dao-governance/v1/gamification/{address}` - User gamification data
- `GET /wp-json/dao-governance/v1/leaderboard` - Community leaderboard

### Analytics
- `GET /wp-json/dao-governance/v1/analytics/governance` - Governance metrics
- `GET /wp-json/dao-governance/v1/analytics/treasury` - Treasury analytics

### Community
- `GET /wp-json/dao-governance/v1/discussions` - Discussion threads
- `POST /wp-json/dao-governance/v1/discussions` - Create new discussion

### Core Data
- `GET /wp-json/dao-governance/v1/proposals` - Proposal data
- `GET /wp-json/dao-governance/v1/treasury` - Treasury information
- `GET /wp-json/dao-governance/v1/user/{address}` - User profile data

## 🧪 Development & Testing

### Local Development
1. Set up a local WordPress environment
2. Install the plugin in development mode
3. Configure test contract addresses
4. Use browser developer tools for debugging

### Testing Features
- **Wallet Connection**: Test with MetaMask in development mode
- **Data Loading**: Verify API endpoints return expected data
- **Responsive Design**: Test on various screen sizes
- **Performance**: Monitor loading times and optimization

## 🔒 Security Features

- **Wallet Verification**: Cryptographic signature verification
- **Input Sanitization**: All user inputs are sanitized and validated
- **Nonce Protection**: WordPress nonces for form submissions
- **Permission Checks**: Proper capability checking for admin functions
- **XSS Prevention**: Output escaping for all dynamic content

## 🆘 Troubleshooting

### Common Issues

**Wallet Connection Fails**
- Check that MetaMask is installed and unlocked
- Verify network configuration matches your setup
- Ensure popup blockers are disabled

**Data Not Loading**
- Verify contract addresses are correct
- Check RPC endpoint connectivity
- Review browser console for JavaScript errors

**Styling Issues**
- Check for CSS conflicts with theme
- Verify plugin styles are loading correctly
- Use browser developer tools to inspect elements

**Performance Issues**
- Enable WordPress caching
- Optimize database queries
- Consider CDN for static assets

### Debug Mode
Enable debug mode in WordPress to see detailed error messages:

```php
// In wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

## 📊 Analytics & Metrics

The plugin tracks various metrics for community insights:

### Governance Metrics
- Participation rates
- Voting patterns
- Proposal success rates
- Active member counts

### Engagement Metrics
- Discussion participation
- Achievement unlocks
- Level progressions
- Event attendance

### Treasury Metrics
- Asset performance
- Spending patterns
- Growth tracking
- Risk assessment

## 🤝 Contributing

We welcome contributions to improve the plugin:

1. **Bug Reports**: Submit detailed issue reports
2. **Feature Requests**: Suggest new functionality
3. **Code Contributions**: Submit pull requests
4. **Documentation**: Help improve documentation
5. **Testing**: Help test new features and updates

## 📜 License

This plugin is released under the MIT License. See LICENSE file for details.

## 🙋‍♂️ Support

For support and questions:

- **Documentation**: Check this README and inline documentation
- **Community**: Join our Discord server for community support
- **Issues**: Submit GitHub issues for bug reports
- **Email**: Contact the development team for urgent issues

## 🔄 Updates & Roadmap

### Recent Updates (v2.0.0)
- ✅ Complete gamification system
- ✅ Advanced analytics dashboard
- ✅ Community discussion features
- ✅ Personal member profiles
- ✅ Seasonal challenges
- ✅ Enhanced mobile responsiveness

### Upcoming Features
- 🔄 Multi-DAO support
- 🔄 Advanced governance tools
- 🔄 NFT integration
- 🔄 Cross-chain compatibility
- 🔄 AI-powered insights
- 🔄 Mobile app companion

## 📋 System Requirements

### WordPress
- WordPress 6.0 or higher
- PHP 8.0 or higher
- MySQL 5.7 or higher

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Dependencies
- Web3 wallet (MetaMask recommended)
- Modern browser with JavaScript enabled
- Stable internet connection for blockchain data

---

**Built with ❤️ for the Ugly Unicorns DAO Community**

*Transform your WordPress site into a powerful DAO governance platform with comprehensive gamification, analytics, and community features.*