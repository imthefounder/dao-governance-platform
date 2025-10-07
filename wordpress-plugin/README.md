# DAO Governance WordPress Plugin

A comprehensive WordPress plugin that integrates Web3 DAO governance functionality into your WordPress site. Perfect for integrating with cr8r.xyz.

## 🚀 Features

- **Web3 Wallet Integration** - MetaMask, WalletConnect, and other Web3 wallets
- **Multi-Contract Support** - All your DAO contracts in one interface
- **Responsive Design** - Works on desktop and mobile
- **WordPress Integration** - Native WordPress shortcodes and admin interface
- **Base Network Support** - Optimized for Base Mainnet and Sepolia
- **Real-time Updates** - Live blockchain data integration

## 📦 Installation

### Option 1: Manual Installation

1. **Download the plugin**
```bash
# Copy the dao-governance folder to your WordPress plugins directory
cp -r dao-governance /path/to/wordpress/wp-content/plugins/
```

2. **Activate the plugin**
- Go to WordPress Admin → Plugins
- Find "DAO Governance Platform"
- Click "Activate"

### Option 2: ZIP Upload

1. **Create ZIP file**
```bash
cd wordpress-plugin
zip -r dao-governance.zip dao-governance/
```

2. **Upload in WordPress**
- Go to WordPress Admin → Plugins → Add New
- Click "Upload Plugin"
- Choose `dao-governance.zip`
- Install and activate

## ⚙️ Configuration

### 1. Smart Contract Setup

Go to **WordPress Admin → DAO Governance** and enter your deployed contract addresses:

```
Governance Token (GovToken): 0x...
DAO Governor (DaoGovernor): 0x...
Timelock Controller: 0x...
Proposal Manager: 0x...
DAO Treasury: 0x...
Voting Power Exchange: 0x...
Ugly Unicorns Governance: 0x...
Minchyn Wrapper: 0x...
```

### 2. Network Settings

- **Chain ID**: 8453 (Base Mainnet) or 84532 (Base Sepolia)
- **Enable Logging**: For debugging and monitoring
- **Cache Duration**: How long to cache blockchain data

## 🎯 Usage

### Shortcodes

Add these shortcodes to any post or page:

#### Complete Dashboard
```php
[dao_dashboard]
```
- Wallet connection
- User stats and balance
- Quick actions
- Recent activity

#### Proposals Management
```php
[dao_proposals limit="10"]
```
- List active proposals
- Create new proposals
- Vote on proposals

#### Treasury Overview
```php
[dao_treasury]
```
- Asset balances
- Monthly spending
- Transaction history

#### Governance Tools
```php
[dao_governance]
```
- Token exchange
- NFT management
- Voting power

#### Simple Wallet Button
```php
[wallet_connect text="Connect Wallet" class="custom-class"]
```

### Page Structure for cr8r.xyz

Create these pages for a complete DAO experience:

```
📄 /dao/ (DAO Home)
   Content: [dao_dashboard]
   
📄 /dao/proposals/ (Proposals)
   Content: [dao_proposals]
   
📄 /dao/treasury/ (Treasury)
   Content: [dao_treasury]
   
📄 /dao/governance/ (Governance)
   Content: [dao_governance]
```

## 🎨 Customization

### CSS Customization

The plugin includes comprehensive CSS classes:

```css
/* Override in your theme */
.dao-card {
    background: #your-color;
    border-radius: 15px;
}

.dao-btn-primary {
    background: #your-brand-color;
}
```

### JavaScript Hooks

Listen for DAO events in your theme:

```javascript
// Wallet connection event
jQuery(document).on('dao:ui-updated', function(event, state) {
    if (state.isConnected) {
        console.log('Wallet connected:', state.address);
    }
});

// Proposal refresh event
jQuery(document).on('dao:refresh-proposals', function() {
    // Custom proposal handling
});
```

## 🔌 API Endpoints

The plugin provides REST API endpoints:

```
GET /wp-json/dao-governance/v1/proposals
GET /wp-json/dao-governance/v1/treasury  
GET /wp-json/dao-governance/v1/user/{address}
```

## 🛠️ Development

### File Structure

```
dao-governance/
├── dao-governance.php          # Main plugin file
├── assets/
│   ├── js/
│   │   └── dao-governance.js   # Web3 integration
│   └── css/
│       └── dao-governance.css  # Styling
├── templates/
│   ├── dashboard.php           # Dashboard template
│   ├── proposals.php           # Proposals template
│   ├── treasury.php            # Treasury template
│   └── governance.php          # Governance template
├── admin/
│   └── admin-page.php          # Admin settings
└── README.md
```

### Adding Custom Features

1. **Custom Shortcode**
```php
add_shortcode('custom_dao_feature', function($atts) {
    // Your custom functionality
    return '<div class="custom-dao-feature">Content</div>';
});
```

2. **Custom JavaScript**
```javascript
// Extend the DAO object
window.DAO.customFeature = function() {
    // Your custom Web3 functionality
};
```

## 🔒 Security

- **Nonce verification** for all admin actions
- **Input sanitization** for all user inputs
- **Permission checks** for admin functionality
- **Web3 signature validation** for transactions

## 📱 Mobile Support

- Responsive design works on all devices
- Mobile wallet integration (MetaMask Mobile, etc.)
- Touch-friendly interface
- Progressive web app features

## 🐛 Troubleshooting

### Common Issues

1. **Wallet won't connect**
   - Check if MetaMask is installed
   - Verify network is Base (Chain ID 8453)
   - Clear browser cache

2. **Contract interactions fail**
   - Verify contract addresses in admin
   - Check if contracts are deployed
   - Ensure wallet has sufficient ETH for gas

3. **Styling issues**
   - Check for theme CSS conflicts
   - Verify plugin CSS is loading
   - Use browser developer tools

### Debug Mode

Enable WordPress debug mode in `wp-config.php`:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

Check logs in `/wp-content/debug.log`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support with the DAO Governance WordPress plugin:

- **Technical Issues**: Create an issue in the repository
- **WordPress Integration**: Contact CR8R development team
- **Smart Contract Questions**: Refer to the main DAO documentation

## 🔄 Updates

The plugin supports automatic updates through WordPress:

1. Updates are checked daily
2. Notifications appear in admin dashboard
3. One-click updates available
4. Automatic backup before updates

---

**Made with ❤️ for the Ugly Unicorns DAO community**