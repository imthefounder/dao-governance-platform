# Minchyn FMC WordPress Plugin - Shortcode Usage Guide

## Quick Reference

### Essential FMC Shortcodes

#### 1. Complete Platform Dashboard
```php
[dao_dashboard]
```
**Usage:** Main landing page for the founding member platform
**Displays:** Stats overview, quick actions, welcome message

#### 2. NFT Staking Rewards
```php
[fmc_staking_rewards daily_reward="100" voting_boost="1.5"]
```
**Usage:** NFT staking interface with rewards display
**Features:** Daily $MINCHYN rewards, voting power boosts, staking stats

#### 3. Equity Tracking (with Legal Disclaimers)
```php
[fmc_equity_tracking total_shares="300000000" shares_per_nft="500"]
```
**Usage:** Display equity calculations with prominent legal notices
**Features:** Accurate calculations, dilution analysis, legal warnings

#### 4. Founder Benefits Dashboard
```php
[fmc_founder_benefits]
```
**Usage:** Showcase exclusive founder benefits and VIP features
**Features:** VIP access, merchandise, priority support, permanent status

#### 5. Networking Hub
```php
[fmc_networking_hub]
```
**Usage:** Professional networking features for founders
**Features:** Member directory, project collaboration, connections

#### 6. Job Board
```php
[fmc_job_board posts_per_page="10"]
```
**Usage:** Community job listings and opportunities
**Features:** Job postings, application tracking, community-driven

#### 7. Legal Compliance Integration
```php
[fmc_legal_disclaimers type="equity"]    <!-- For equity pages -->
[fmc_legal_disclaimers type="nft"]       <!-- For NFT pages -->
[fmc_legal_disclaimers type="general"]   <!-- For general pages -->
```
**Usage:** Required legal disclaimers for compliance

### Page-Specific Implementation Examples

#### Landing Page Setup
```php
<!-- Main FMC Dashboard -->
[dao_dashboard]

<!-- Legal Notice -->
[fmc_legal_disclaimers type="general"]
```

#### NFT/Staking Page
```php
<!-- Legal Disclaimer First -->
[fmc_legal_disclaimers type="nft"]

<!-- NFT Minting -->
[dao_nft_minting contract_address="0x742d35Cc6634C0532925a3b8D56d8145431C5e5B"]

<!-- Staking Rewards -->
[fmc_staking_rewards daily_reward="100" voting_boost="1.5"]

<!-- OpenSea Integration -->
[fmc_opensea_integration collection_slug="ugly-unicorns"]
```

#### Equity Tracking Page
```php
<!-- Critical Legal Disclaimer -->
[fmc_legal_disclaimers type="equity"]

<!-- Equity Calculator -->
[fmc_equity_tracking total_shares="300000000" shares_per_nft="500"]

<!-- Founder Benefits -->
[fmc_founder_benefits]
```

#### Community & Networking Page
```php
<!-- Community Overview -->
[dao_community]

<!-- Networking Hub -->
[fmc_networking_hub]

<!-- Social Features -->
[dao_social_features]

<!-- Discussions -->
[dao_discussions]
```

#### Careers & Jobs Page
```php
<!-- Job Board -->
[fmc_job_board posts_per_page="15"]

<!-- Hiring Hub -->
[fmc_hiring_hub]
```

#### Admin Management Page (Restricted)
```php
<!-- Admin Dashboard (requires manage_options capability) -->
[fmc_admin_dashboard]
```

## Advanced Customization

### Custom CSS Classes
```css
/* Customize legal disclaimers */
.fmc-legal-disclaimers .legal-notice {
    background: #fee;
    border: 2px solid #f00;
    padding: 20px;
    margin: 20px 0;
}

/* Style equity tracking */
.fmc-equity-tracking .equity-calculator {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 10px;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
    .fmc-staking-rewards .staking-stats {
        display: block;
    }
    
    .fmc-founder-benefits .benefits-grid {
        grid-template-columns: 1fr;
    }
}
```

### Security Considerations
```php
<!-- Only show admin features to authorized users -->
<?php if (current_user_can('manage_options')): ?>
    [fmc_admin_dashboard]
<?php endif; ?>

<!-- Check user authentication -->
<?php if (is_user_logged_in()): ?>
    [fmc_staking_rewards]
<?php else: ?>
    <p>Please <a href="/login">login</a> to access staking features.</p>
<?php endif; ?>
```

## Legal Compliance Best Practices

### Required Disclaimers
**Always include legal disclaimers on pages with:**
- Equity tracking features
- NFT utility information
- Staking/rewards systems
- Financial calculations

### Example Implementation
```php
<!-- At the top of equity-related pages -->
[fmc_legal_disclaimers type="equity"]

<!-- At the top of NFT-related pages -->
[fmc_legal_disclaimers type="nft"]

<!-- Footer for all pages -->
[fmc_legal_disclaimers type="general"]
```

### Link to Full Legal Documentation
```html
<div class="legal-footer">
    <p>For complete legal information:</p>
    <a href="/legal/terms-of-service" target="_blank">Terms of Service</a> |
    <a href="/legal/privacy-policy" target="_blank">Privacy Policy</a> |
    <a href="/legal/legal-disclaimers" target="_blank">Full Legal Disclaimers</a>
</div>
```

## Performance Optimization

### Caching Recommendations
```php
<!-- Use WordPress caching for static content -->
<?php if (!is_user_logged_in()): ?>
    <!-- Cached version for non-authenticated users -->
    [dao_dashboard]
<?php else: ?>
    <!-- Dynamic version for authenticated users -->
    [dao_personal_dashboard]
<?php endif; ?>
```

### Conditional Loading
```php
<!-- Only load features when needed -->
<?php if (has_nft_access($user_id)): ?>
    [fmc_staking_rewards]
    [fmc_founder_benefits]
<?php else: ?>
    [dao_nft_minting]
<?php endif; ?>
```

## Troubleshooting Common Issues

### Shortcode Not Displaying
1. Verify plugin activation
2. Check user permissions
3. Review error logs
4. Ensure proper PHP version (8.0+)

### Legal Disclaimers Missing
1. Check shortcode syntax
2. Verify disclaimer type parameter
3. Ensure legal files exist in `/legal/` directory

### Mobile Display Issues
1. Check responsive CSS
2. Test on actual devices
3. Verify viewport meta tag
4. Clear cache

### Styling Conflicts
1. Use specific CSS selectors
2. Check theme compatibility
3. Override with `!important` if necessary
4. Consider custom CSS priority

## Migration from Previous Versions

### From Version 2.0.0 to 3.0.0
```php
<!-- Replace old shortcodes -->
[dao_governance] → [dao_dashboard]
[dao_nft] → [dao_nft_minting] + [fmc_staking_rewards]

<!-- Add new features -->
[fmc_equity_tracking]
[fmc_founder_benefits]
[fmc_networking_hub]
[fmc_legal_disclaimers type="general"]
```

### Database Cleanup
```sql
-- Remove old cached data
DELETE FROM wp_options WHERE option_name LIKE 'dao_governance_cache_%';

-- Update version numbers
UPDATE wp_options SET option_value = '3.0.0' WHERE option_name = 'dao_governance_version';
```

## Support & Resources

### Documentation
- Plugin README: `/wp-content/plugins/dao-governance/README-v3.md`
- Legal Documentation: `/wp-content/plugins/dao-governance/legal/`
- Integration Guide: `/wp-content/plugins/dao-governance/INTEGRATION_GUIDE.md`

### Contact Support
- **Technical Issues:** support@minchyn.com
- **Legal Questions:** legal@minchyn.com
- **Feature Requests:** dev@minchyn.com

---

**Remember:** Always include appropriate legal disclaimers when using equity tracking or NFT-related shortcodes. The platform uses gamification features that must be clearly identified as appreciation gifts, not financial instruments.