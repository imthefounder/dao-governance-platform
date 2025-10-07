# 🚀 Quick Setup Guide

This guide will get you up and running with the Ugly Unicorns DAO platform in under 10 minutes.

## ⚡ Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] MetaMask or compatible Web3 wallet
- [ ] Some testnet ETH (Sepolia) for testing

## 📋 Step-by-Step Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/imthefounder/dao-governance-platform.git
cd dao-governance-platform/frontend

# Install dependencies
npm install
```

### 2. Get Your API Keys

#### WalletConnect Project ID (Required)
1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com/)
2. Sign up/Login → Create Project
3. Copy your **Project ID**

#### Alchemy API Key (Required)
1. Go to [alchemy.com](https://www.alchemy.com/)
2. Sign up/Login → Create App
3. Select **Ethereum Sepolia** testnet
4. Copy your **API Key**

### 3. Configure Environment

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your values
```

**Minimum required configuration:**
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=wc_1234567890abcdef...
NEXT_PUBLIC_ALCHEMY_API_KEY=alcht_1234567890abcdef...
NEXT_PUBLIC_ENVIRONMENT=development
```

### 4. Start Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

## 🔗 Contract Integration (Optional)

If you have deployed contracts, add their addresses to `.env.local`:

```env
# Core DAO Contracts
NEXT_PUBLIC_GOV_TOKEN_ADDRESS=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_DAO_GOVERNOR_ADDRESS=0x2345678901234567890123456789012345678901
NEXT_PUBLIC_TIMELOCK_ADDRESS=0x3456789012345678901234567890123456789012

# Token & NFT Contracts
NEXT_PUBLIC_MINCHYN_TOKEN_ADDRESS=0x4567890123456789012345678901234567890123
NEXT_PUBLIC_UGLY_UNICORNS_NFT_ADDRESS=0x5678901234567890123456789012345678901234
```

## 🎯 Test the Platform

1. **Connect Wallet**: Click "Connect Wallet" button
2. **Switch Network**: Ensure you're on Sepolia testnet
3. **Explore Features**:
   - 🎮 **Gamification**: View membership levels and achievements
   - 📊 **Analytics**: Explore governance and treasury metrics
   - 👤 **Profile**: Check your personal dashboard
   - 🌐 **Community**: Browse discussions and social features

## 🚀 Deploy to Production

### Vercel Deployment (Recommended)

1. **Build and test locally:**
```bash
npm run build
npm start
```

2. **Deploy to Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel --prod
```

3. **Add environment variables in Vercel:**
   - Go to your project settings
   - Add all variables from `.env.local`
   - Redeploy

## 🛠 Common Issues & Solutions

### Issue: "Connect Wallet" not working
**Solution**: Check your WalletConnect Project ID and network settings

### Issue: Contract interactions failing
**Solution**: Verify contract addresses and ensure you're on the correct network

### Issue: Build errors
**Solution**: Run `npm run build` to check for TypeScript errors

### Issue: Slow loading
**Solution**: Check your Alchemy API rate limits

## 📚 Next Steps

1. **Read the full documentation**: [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
2. **Deploy smart contracts**: Follow the contract deployment guide
3. **Customize the platform**: Modify components and styling
4. **Join the community**: Connect with other developers

## 🆘 Need Help?

- **Documentation**: [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- **Issues**: [GitHub Issues](https://github.com/imthefounder/dao-governance-platform/issues)
- **Community**: [Discord](https://discord.gg/uglyunicorns)

---

**🎉 Congratulations! Your DAO platform is now running!**

*Time to explore all the amazing features and start building your community.*