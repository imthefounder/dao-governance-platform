# WordPress Plugin Integration Guide

This guide will help you integrate the enhanced DAO governance plugin into your WordPress site with all the new gamification, analytics, and community features.

## 🚀 Quick Start Integration

### 1. Basic Setup

After installing and activating the plugin, create these essential pages:

```php
// Main DAO Dashboard Page
Title: "DAO Dashboard"
Content: [dao_dashboard]

// Gamification Hub
Title: "Gamification"
Content: [dao_gamification]

// Community Hub
Title: "Community"
Content: [dao_community]

// Analytics Dashboard
Title: "Analytics"
Content: [dao_analytics]

// Member Profiles
Title: "My Profile"
Content: [dao_profile]
```

### 2. Navigation Menu Setup

Add these pages to your WordPress menu:

```
- DAO Dashboard
- Governance
  - Proposals
  - Treasury
  - Voting
- Community
  - Discussions
  - Members
  - Events
- Gamification
  - Achievements
  - Leaderboard
  - Challenges
- Analytics
- My Profile
```

## 📋 Page Templates & Shortcodes

### Homepage Integration

Create an engaging homepage that showcases your DAO:

```php
<!-- Hero Section -->
<div class="dao-hero">
    <h1>Welcome to Ugly Unicorns DAO</h1>
    <p>Join our community-driven decentralized organization</p>
    [wallet_connect]
</div>

<!-- Key Metrics -->
<div class="dao-overview">
    <h2>DAO Overview</h2>
    [dao_dashboard]
</div>

<!-- Community Preview -->
<div class="community-preview">
    <h2>Active Community</h2>
    [dao_community]
</div>
```

### Governance Pages

#### Main Governance Hub
```php
<!-- governance.php -->
<div class="governance-hub">
    <h1>DAO Governance</h1>
    <div class="governance-tabs">
        <div class="tab-content">
            [dao_governance]
        </div>
        <div class="tab-content">
            [dao_proposals]
        </div>
        <div class="tab-content">
            [dao_treasury]
        </div>
    </div>
</div>
```

#### Proposals Page
```php
<!-- proposals.php -->
<div class="proposals-page">
    <h1>DAO Proposals</h1>
    <div class="proposals-header">
        <p>Vote on proposals that shape our DAO's future</p>
        [wallet_connect]
    </div>
    [dao_proposals]
</div>
```

#### Treasury Page
```php
<!-- treasury.php -->
<div class="treasury-page">
    <h1>DAO Treasury</h1>
    <div class="treasury-overview">
        [dao_treasury]
        [dao_treasury_analytics]
    </div>
</div>
```

### Gamification Pages

#### Main Gamification Hub
```php
<!-- gamification.php -->
<div class="gamification-hub">
    <h1>🎮 DAO Gamification</h1>
    <p>Level up your DAO participation and unlock exclusive rewards!</p>
    [dao_gamification]
</div>
```

#### Membership Levels Page
```php
<!-- membership.php -->
<div class="membership-page">
    <h1>🦄 Membership Levels</h1>
    <p>Discover the benefits of each membership tier</p>
    [dao_membership_levels]
</div>
```

#### Achievements Page
```php
<!-- achievements.php -->
<div class="achievements-page">
    <h1>🏆 Achievements</h1>
    <p>Track your progress and unlock exclusive badges</p>
    [dao_achievements]
</div>
```

#### Seasonal Challenges
```php
<!-- challenges.php -->
<div class="challenges-page">
    <h1>🎯 Seasonal Challenges</h1>
    <p>Complete time-limited challenges for bonus rewards</p>
    [dao_seasonal_challenges]
</div>
```

#### Leaderboard
```php
<!-- leaderboard.php -->
<div class="leaderboard-page">
    <h1>📊 Community Leaderboard</h1>
    <p>See how you rank among community members</p>
    [dao_leaderboard]
</div>
```

### Analytics Pages

#### Main Analytics Dashboard
```php
<!-- analytics.php -->
<div class="analytics-hub">
    <h1>📈 DAO Analytics</h1>
    <p>Comprehensive insights into DAO performance</p>
    [dao_analytics]
</div>
```

#### Governance Analytics
```php
<!-- governance-analytics.php -->
<div class="governance-analytics">
    <h1>🗳️ Governance Analytics</h1>
    <p>Track governance participation and effectiveness</p>
    [dao_governance_analytics]
</div>
```

#### Treasury Analytics
```php
<!-- treasury-analytics.php -->
<div class="treasury-analytics">
    <h1>💰 Treasury Analytics</h1>
    <p>Monitor treasury performance and asset allocation</p>
    [dao_treasury_analytics]
</div>
```

### Community Pages

#### Community Hub
```php
<!-- community.php -->
<div class="community-hub">
    <h1>🌟 Community Hub</h1>
    <p>Connect and collaborate with fellow DAO members</p>
    [dao_community]
</div>
```

#### Discussions
```php
<!-- discussions.php -->
<div class="discussions-page">
    <h1>💬 Community Discussions</h1>
    <p>Join ongoing conversations and start new topics</p>
    [dao_discussions]
</div>
```

#### Members Directory
```php
<!-- members.php -->
<div class="members-directory">
    <h1>👥 Community Members</h1>
    <p>Discover and connect with DAO members</p>
    [dao_social_features]
</div>
```

### Profile Pages

#### Personal Dashboard
```php
<!-- profile.php -->
<div class="profile-dashboard">
    <h1>Your DAO Profile</h1>
    <p>Track your participation and manage your DAO presence</p>
    [dao_profile]
</div>
```

#### Personal Analytics
```php
<!-- my-analytics.php -->
<div class="personal-analytics">
    <h1>Your DAO Analytics</h1>
    <p>Detailed insights into your DAO participation</p>
    [dao_personal_dashboard]
</div>
```

## 🎨 Theme Integration

### Custom Post Types

The plugin registers these custom post types:

```php
// DAO Discussions
'dao_discussion' - Community discussion threads

// DAO Achievements  
'dao_achievement' - Achievement definitions and tracking
```

### Theme Template Files

Create these template files in your theme to customize display:

```
your-theme/
├── single-dao_discussion.php
├── archive-dao_discussion.php
├── single-dao_achievement.php
└── dao-governance/
    ├── dashboard.php
    ├── gamification.php
    ├── analytics.php
    ├── community.php
    └── profile.php
```

### Custom Styling

Override plugin styles in your theme:

```css
/* your-theme/style.css */

/* Custom DAO branding */
:root {
  --dao-primary: #your-brand-color;
  --dao-secondary: #your-secondary-color;
}

/* Custom card styling */
.dao-card {
  border: 2px solid var(--dao-primary);
  border-radius: 16px;
}

/* Custom button styling */
.dao-btn-primary {
  background: linear-gradient(45deg, #your-gradient);
}
```

## 🔧 Advanced Customization

### Custom Shortcode Attributes

Many shortcodes accept custom attributes:

```php
// Limit number of items
[dao_proposals limit="5"]

// Show specific categories
[dao_discussions category="governance"]

// Custom styling classes
[dao_analytics class="custom-analytics-style"]

// Show only specific member levels
[dao_leaderboard filter="contributors"]
```

### Widget Areas

Register widget areas for DAO components:

```php
// functions.php
function register_dao_widget_areas() {
    register_sidebar(array(
        'name' => 'DAO Sidebar',
        'id' => 'dao-sidebar',
        'description' => 'Sidebar for DAO pages',
        'before_widget' => '<div class="dao-widget">',
        'after_widget' => '</div>',
    ));
}
add_action('widgets_init', 'register_dao_widget_areas');
```

Use in templates:

```php
<!-- In your template files -->
<?php if (is_active_sidebar('dao-sidebar')) : ?>
    <aside class="dao-sidebar">
        <?php dynamic_sidebar('dao-sidebar'); ?>
    </aside>
<?php endif; ?>
```

### Custom Hooks and Filters

The plugin provides hooks for customization:

```php
// functions.php

// Customize gamification XP values
add_filter('dao_xp_vote_cast', function($xp) {
    return $xp * 2; // Double XP for votes
});

// Add custom achievement types
add_action('dao_custom_achievements', function() {
    // Register custom achievements
});

// Modify analytics data
add_filter('dao_analytics_data', function($data) {
    // Add custom metrics
    return $data;
});

// Customize member levels
add_filter('dao_membership_levels', function($levels) {
    // Modify level requirements or add new levels
    return $levels;
});
```

## 📱 Mobile Optimization

### Responsive Design

The plugin includes responsive design, but you can enhance it:

```css
/* Mobile-first responsive design */
@media (max-width: 768px) {
    .dao-gamification-container {
        padding: 10px;
    }
    
    .dao-metrics {
        grid-template-columns: 1fr;
    }
    
    .dao-tab-btn {
        font-size: 0.9rem;
        padding: 10px 15px;
    }
}
```

### Mobile Menu Integration

Add DAO links to your mobile menu:

```php
// functions.php
function add_dao_to_mobile_menu($items, $args) {
    if ($args->theme_location == 'mobile') {
        $dao_menu = '
            <li><a href="/dao-dashboard">Dashboard</a></li>
            <li><a href="/gamification">Gamification</a></li>
            <li><a href="/community">Community</a></li>
            <li><a href="/my-profile">Profile</a></li>
        ';
        $items .= $dao_menu;
    }
    return $items;
}
add_filter('wp_nav_menu_items', 'add_dao_to_mobile_menu', 10, 2);
```

## 🔐 Security & Performance

### Security Best Practices

```php
// functions.php

// Restrict certain pages to DAO members only
function restrict_dao_pages() {
    if (is_page('dao-admin') && !current_user_can('manage_dao')) {
        wp_redirect(home_url('/dao-dashboard'));
        exit;
    }
}
add_action('template_redirect', 'restrict_dao_pages');

// Add custom capability for DAO management
add_role('dao_manager', 'DAO Manager', array(
    'read' => true,
    'manage_dao' => true,
    'edit_dao_content' => true,
));
```

### Performance Optimization

```php
// functions.php

// Cache DAO data
function cache_dao_data() {
    if (false === ($dao_data = get_transient('dao_cached_data'))) {
        $dao_data = fetch_dao_data(); // Your data fetching function
        set_transient('dao_cached_data', $dao_data, HOUR_IN_SECONDS);
    }
    return $dao_data;
}

// Preload critical DAO assets
function preload_dao_assets() {
    if (is_page_template('page-dao.php')) {
        echo '<link rel="preload" href="' . plugins_url('assets/dao-governance.css', __FILE__) . '" as="style">';
        echo '<link rel="preload" href="' . plugins_url('assets/dao-governance.js', __FILE__) . '" as="script">';
    }
}
add_action('wp_head', 'preload_dao_assets');
```

## 🎯 User Experience Enhancements

### Custom Loading States

```php
// Add custom loading messages
add_filter('dao_loading_messages', function($messages) {
    return array(
        'gamification' => 'Loading your DAO achievements...',
        'analytics' => 'Crunching the numbers...',
        'community' => 'Gathering community updates...',
        'profile' => 'Loading your DAO journey...'
    );
});
```

### Progressive Enhancement

```javascript
// Enhance forms with JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add real-time validation
    const forms = document.querySelectorAll('.dao-form');
    forms.forEach(form => {
        // Add validation logic
    });
    
    // Add smooth scrolling to anchors
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
```

## 🧪 Testing & Debug

### Debug Mode

Enable debug mode for development:

```php
// wp-config.php
define('DAO_DEBUG', true);

// This will show additional debug information
```

### Testing Checklist

- [ ] All shortcodes render correctly
- [ ] Wallet connection works
- [ ] Responsive design on all devices
- [ ] Forms submit properly
- [ ] Loading states display
- [ ] Error handling works
- [ ] Analytics track correctly
- [ ] Gamification updates properly
- [ ] Community features function
- [ ] Profile data saves

### Browser Testing

Test across these browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Analytics & Tracking

### Google Analytics Integration

```javascript
// Track DAO interactions
function trackDAOEvent(action, category, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Example usage
document.addEventListener('dao_vote_cast', function(e) {
    trackDAOEvent('vote_cast', 'governance', e.detail.proposalId);
});
```

### Custom Metrics Dashboard

```php
// Create admin dashboard widget
function dao_metrics_dashboard_widget() {
    wp_add_dashboard_widget(
        'dao_metrics',
        'DAO Metrics',
        'display_dao_metrics'
    );
}
add_action('wp_dashboard_setup', 'dao_metrics_dashboard_widget');

function display_dao_metrics() {
    // Display key DAO metrics in admin dashboard
    echo '<div class="dao-admin-metrics">';
    echo '<p>Active Members: ' . get_dao_member_count() . '</p>';
    echo '<p>Recent Votes: ' . get_recent_vote_count() . '</p>';
    echo '<p>Treasury Value: $' . number_format(get_treasury_value()) . '</p>';
    echo '</div>';
}
```

This integration guide provides a comprehensive foundation for implementing the enhanced DAO governance plugin in your WordPress site. Customize the examples based on your specific needs and branding requirements.