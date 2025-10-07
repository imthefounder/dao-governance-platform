# Minchyn Founding Member Club Platform

An exclusive founding member club platform for early supporters and believers of Minchyn startup. Features job opportunities, hiring governance, equity tracking, and premium networking tools for NFT holders.

## 🚀 Features

### Founding Member Club Features
- **Job Board**: Exclusive access to Minchyn startup positions (NFT holders only)
- **Hiring Governance**: Vote on potential new hires and shape the team
- **Equity Tracking**: Monitor your gifted shares and company ownership
- **Founder Benefits**: Festival tickets, tokens, merchandise, and exclusive perks

### Gamification 🎮
- **Membership Levels**: Progressive tier system (Newbie → Contributor → Guardian → Elder)
- **Achievement System**: Unlock badges and earn points for participation
- **Seasonal Challenges**: Monthly community challenges with exclusive NFT holder rewards
- **Leaderboards**: Track top contributors and active members

### Analytics 📊
- **Governance Health**: Participation trends and decentralization metrics
- **Treasury Analytics**: Asset performance, spending patterns, yield optimization
- **Member Impact**: Personal contribution tracking and influence scoring
- **Predictive Insights**: Budget forecasting and trend analysis

### Premium Networking Features 🌐 (NFT Holders Only)
- **Member Directory**: Connect with fellow founding members
- **Collaboration Tools**: Private channels and project coordination
- **Startup Opportunities**: Early access to investments and partnerships
- **Founder Mentorship**: Direct access to Minchyn leadership team

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom components
- **Blockchain**: Ethereum, Foundry, Solidity
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Smart Contracts**: OpenZeppelin, Custom governance contracts

## � Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/imthefounder/dao-governance-platform.git
cd dao-governance-platform/frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```

4. **Configure your environment (see Integration Guide for details):**
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_ENVIRONMENT=development

# Add your contract addresses after deployment
NEXT_PUBLIC_GOV_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_DAO_GOVERNOR_ADDRESS=0x...
# ... (see .env.example for full list)
```

5. **Start the development server:**
```bash
npm run dev
```

6. **Open your browser:**
Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud project ID | ✅ |
| `NEXT_PUBLIC_ALCHEMY_API_KEY` | Alchemy API key for blockchain RPC | ✅ |
| `NEXT_PUBLIC_ENVIRONMENT` | Environment (development/production) | ✅ |
| `NEXT_PUBLIC_GOV_TOKEN_ADDRESS` | Governance token contract address | ✅ |
| `NEXT_PUBLIC_DAO_GOVERNOR_ADDRESS` | DAO Governor contract address | ✅ |
| `NEXT_PUBLIC_TIMELOCK_ADDRESS` | Timelock contract address | ✅ |
| `NEXT_PUBLIC_MINCHYN_TOKEN_ADDRESS` | $Minchyn token contract address | ✅ |
| `NEXT_PUBLIC_UGLY_UNICORNS_NFT_ADDRESS` | Ugly Unicorns NFT contract address | ✅ |

### Getting API Keys

#### WalletConnect Project ID
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create an account and new project
3. Copy the Project ID from your dashboard

#### Alchemy API Key
1. Visit [Alchemy](https://www.alchemy.com/)
2. Create an account and new app
3. Select your target network (Ethereum Mainnet/Sepolia)
4. Copy the API Key from your app dashboard

## 🏗 Smart Contract Deployment

### Deploy Contracts

1. **Navigate to the contract directory:**
```bash
cd ../
```

2. **Install dependencies:**
```bash
forge install
```

3. **Compile contracts:**
```bash
forge build
```

4. **Deploy to testnet:**
```bash
# Set up your environment variables for deployment
export PRIVATE_KEY=your_private_key
export SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_api_key

# Deploy core contracts
forge script script/DeployContracts.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify

# Deploy NFT contracts
forge script script/DeployNft.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify

# Grant necessary roles
forge script script/GrantRoles.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast
```

5. **Update frontend environment variables:**
Copy the deployed contract addresses to your `.env.local` file.

## 🎯 Usage

### For DAO Members
1. **Connect Wallet**: Use the connect button to link your wallet
2. **View Dashboard**: See your membership level, achievements, and stats
3. **Participate in Governance**: Vote on proposals and create new ones
4. **Engage with Community**: Join discussions and working groups
5. **Track Progress**: Monitor your impact and earn achievements

### For DAO Administrators
1. **Monitor Analytics**: Use the analytics dashboard to track DAO health
2. **Manage Treasury**: Oversee asset allocation and spending
3. **Create Challenges**: Set up seasonal challenges to boost engagement
4. **Review Performance**: Analyze member engagement and proposal success rates

## 🧪 Testing

### Run Tests
```bash
# Frontend tests
npm run test

# Smart contract tests
cd ../
forge test
```

### Test Coverage
```bash
# Smart contract coverage
forge coverage
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Build the application:**
```bash
npm run build
```

2. **Deploy to Vercel:**
```bash
npm install -g vercel
vercel --prod
```

3. **Configure environment variables:**
Add all environment variables in your Vercel project settings.

### Smart Contract Deployment (Mainnet)

1. **Update configuration for mainnet:**
```bash
export MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your_api_key
export ETHERSCAN_API_KEY=your_etherscan_api_key
```

2. **Deploy to mainnet:**
```bash
forge script script/DeployContracts.s.sol --rpc-url $MAINNET_RPC_URL --broadcast --verify
```

## � Documentation

- [Integration Guide](./INTEGRATION_GUIDE.md) - Detailed setup instructions
- [Smart Contract Documentation](../README.md) - Contract architecture and functions
- [API Reference](./docs/API.md) - Frontend component and hook documentation
- [Contributing Guide](./CONTRIBUTING.md) - Guidelines for contributors

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🛡 Security

### Audit Status
- Smart contracts have been audited by PeckShield (see `/audit` directory)
- Frontend security best practices implemented
- Environment variable validation and sanitization

### Report Security Issues
Please report security vulnerabilities to: security@uglyunicornsdao.com

## 🌟 Roadmap

### Phase 1 (Current)
- ✅ Core governance functionality
- ✅ Gamification system
- ✅ Analytics dashboard
- ✅ Social features

### Phase 2 (Q4 2024)
- 🔄 Cross-chain governance
- 🔄 Advanced delegation features
- 🔄 Mobile application
- 🔄 API for third-party integrations

### Phase 3 (Q1 2025)
- 📅 AI-powered governance insights
- 📅 Automated treasury optimization
- 📅 Advanced reputation system
- 📅 Integration with DeFi protocols

## 🆘 Support

### Community Support
- [Discord Server](https://discord.gg/uglyunicorns)
- [Telegram Group](https://t.me/uglyunicornsdao)
- [Twitter](https://twitter.com/uglyunicornsdao)

### Technical Support
- [GitHub Issues](https://github.com/imthefounder/dao-governance-platform/issues)
- [Documentation](https://docs.uglyunicornsdao.com)
- Email: support@uglyunicornsdao.com

## 🎖 Acknowledgments

- OpenZeppelin for secure smart contract frameworks
- Foundry team for excellent development tools
- Next.js team for the amazing React framework
- Tailwind CSS for beautiful utility-first styling
- Rainbow Kit for seamless wallet integration

---

**Built with ❤️ by the Ugly Unicorns community**

*Making DAO governance accessible, engaging, and fun for everyone.*
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

### Option 2: GitHub Integration

1. **Push to GitHub**
```bash
git add .
git commit -m "Add DAO frontend"
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Configure environment variables
- Deploy automatically

### Environment Variables in Vercel

Set these in your Vercel dashboard:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
NEXT_PUBLIC_ENVIRONMENT=production
```

## 🏗️ Architecture

```
frontend/
├── app/                 # Next.js 14 App Router
│   ├── layout.tsx      # Root layout with providers
│   └── page.tsx        # Main dashboard
├── lib/                # Utilities and config
│   ├── config.ts       # Contract addresses & settings
│   └── utils.ts        # Web3 utilities
├── styles/             # Global styles
└── package.json        # Dependencies
```

## 🔧 Features

### Implemented
- ✅ Wallet connection (RainbowKit)
- ✅ Multi-chain support (Base/Base Sepolia)
- ✅ Responsive dashboard UI
- ✅ Proposal management interface
- ✅ Treasury overview
- ✅ Governance token display

### To Implement
- 🔄 Smart contract integration
- 🔄 Real-time data fetching
- 🔄 Transaction handling
- 🔄 NFT display and management
- 🔄 Voting interface

## 🌐 Live Deployment Process

1. **Deploy Smart Contracts** (to Base Mainnet)
2. **Update Contract Addresses** (in `lib/config.ts`)
3. **Configure Environment Variables** (in Vercel)
4. **Deploy Frontend** (via Vercel)
5. **Test All Features** (with real wallet)

## 🔐 Security Features

- CSP headers for security
- Environment variable validation
- Address validation
- Transaction confirmation prompts

## 📱 Mobile Support

- Responsive design
- Mobile wallet integration
- Touch-friendly interface

## 🛠️ Development

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details