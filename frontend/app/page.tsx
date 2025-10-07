'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '../components/ui/Button';
import { Card, StatsCard } from '../components/ui/Card';
import { Badge, Progress } from '../components/ui/Badge';
import {
  WalletIcon,
  VoteIcon,
  TreasuryIcon,
  ProposalIcon,
  ChartIcon,
  UserIcon,
  PlusIcon,
  CheckIcon,
  XIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExternalLinkIcon,
  Menu
} from '../components/ui/Icons';
import { sampleProposals, sampleTreasuryAssets, sampleTransactions, sampleDAOStats } from '../data/sampleData';
import { Proposal } from '../types/dao';

// Import new feature components
import { MembershipLevels } from '../components/gamification/MembershipLevels';
import { AchievementSystem } from '../components/gamification/AchievementSystem';
import { SeasonalChallenges } from '../components/gamification/SeasonalChallenges';
import { GovernanceAnalytics } from '../components/analytics/GovernanceAnalytics';
import { TreasuryAnalyticsDashboard } from '../components/analytics/TreasuryAnalytics';
import { PersonalDashboard } from '../components/member/PersonalDashboard';
import { SocialFeatures } from '../components/member/SocialFeatures';
import { NFTMinting } from '../components/nft/NFTMinting';

// Import legal components
import { LegalFooter } from '../components/legal/LegalFooter';
import { LegalDisclaimerModal, QuickLegalBanner } from '../components/legal/LegalDisclaimerModal';

// Import sample data
import {
  membershipLevelsData,
  sampleAchievements,
  sampleSeasonalChallenges,
  sampleGovernanceMetrics,
  sampleTreasuryAnalytics,
  sampleMemberProfile,
  sampleVotingHistory,
  sampleDelegations,
  sampleGovernanceRewards,
  sampleImpactMetrics,
  sampleDiscussions
} from '../data/sample-data';

export default function HomePage() {
  const [isConnected, setIsConnected] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLegalDisclaimer, setShowLegalDisclaimer] = useState(false);
  const [legalDisclaimerType, setLegalDisclaimerType] = useState<'equity' | 'nft' | 'general'>('general');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [showCreateProposal, setShowCreateProposal] = useState(false);
  const [showMoreTabs, setShowMoreTabs] = useState(false);
  const [userVotingPower] = useState(12500);
  const [userBalance] = useState(15.75);
  const [userNftCount] = useState(3); // Updated to show 3 NFTs for equity calculation
  const [isAdmin] = useState(true); // Admin access for demonstration
  
  // Equity calculation constants
  const TOTAL_OUTSTANDING_SHARES = 300000000; // 300 million base shares
  const SHARES_PER_NFT = 500;
  const TOTAL_NFT_COLLECTION_SIZE = 22222; // Total Ugly Unicorns collection (from contract ABI)
  const ESTIMATED_COMPANY_VALUATION = 50000000; // $50M estimated valuation
  
  // Calculate diluted shares (base + all potential NFT shares if all NFTs minted)
  const totalDilutedShares = TOTAL_OUTSTANDING_SHARES + (TOTAL_NFT_COLLECTION_SIZE * SHARES_PER_NFT);
  
  // User's equity calculations
  const userGiftedShares = userNftCount * SHARES_PER_NFT;
  const userEquityPercentage = (userGiftedShares / totalDilutedShares) * 100;
  const userEquityValue = (userGiftedShares / totalDilutedShares) * ESTIMATED_COMPANY_VALUATION;
  
  // NFT Collection Status
  const currentMintedNFTs = 3247; // Current minted count
  const isCollectionSoldOut = currentMintedNFTs >= TOTAL_NFT_COLLECTION_SIZE;
  
  // New state for gamification and member features
  const [userParticipation, setUserParticipation] = useState<Record<string, boolean>>({
    'october-governance': true
  });

  // LinkedIn application state
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [applicantName, setApplicantName] = useState('');
  const [linkedInProfile, setLinkedInProfile] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Job applications storage
  const [jobApplications, setJobApplications] = useState<Array<{
    id: string;
    name: string;
    linkedInProfile: string;
    jobTitle: string;
    timestamp: string;
    nftCount: number;
    status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  }>>([]);

  // Crowdfunding campaigns state
  const [campaigns, setCampaigns] = useState([
    {
      id: 'campaign-1',
      title: 'Senior Developer Hiring',
      description: 'Fund the hiring of a senior developer for our core platform',
      targetAmount: 50000,
      currentAmount: 32500,
      deadline: Date.now() + (15 * 24 * 60 * 60 * 1000), // 15 days from now
      category: 'hiring',
      status: 'active'
    },
    {
      id: 'campaign-2', 
      title: 'Marketing Campaign Q4',
      description: 'Launch comprehensive marketing campaign for Q4 growth',
      targetAmount: 75000,
      currentAmount: 45000,
      deadline: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days from now
      category: 'marketing',
      status: 'active'
    }
  ]);
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);

  const connectWallet = () => {
    setIsConnected(!isConnected);
  };

  // New handlers for advanced features
  const handleJoinChallenge = (challengeId: string) => {
    setUserParticipation(prev => ({
      ...prev,
      [challengeId]: true
    }));
  };

  const handleCreateThread = (title: string, content: string, tags: string[]) => {
    console.log('Creating thread:', { title, content, tags });
    // In a real app, this would create a new thread
  };

  const handleReply = (threadId: string, content: string, parentId?: string) => {
    console.log('Creating reply:', { threadId, content, parentId });
    // In a real app, this would create a new reply
  };

  const handleVoteOnThread = (threadId: string, replyId: string | null, type: 'up' | 'down') => {
    console.log('Voting on thread:', { threadId, replyId, type });
    // In a real app, this would register the vote
  };

  const activeProposals = sampleProposals.filter(p => p.status === 'active');
  const treasuryTotal = sampleTreasuryAssets.reduce((sum, asset) => sum + asset.usdValue, 0);

  const formatTimeRemaining = (endTime: number) => {
    const remaining = endTime - Date.now();
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return `${days}d ${hours}h`;
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getProposalStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'info';
      case 'passed': return 'success';
      case 'failed': return 'danger';
      default: return 'default';
    }
  };

  // LinkedIn application handlers
  const handleApplyWithLinkedIn = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setShowLinkedInModal(true);
    setApplicationStatus('idle');
    setApplicantName('');
    setLinkedInProfile('');
  };

  const validateLinkedInProfile = (url: string): boolean => {
    // Accept various LinkedIn URL formats or just username
    const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[\w-]+\/?$/;
    const usernameRegex = /^[\w-]+$/;
    
    // If it's just a username, validate that format
    if (usernameRegex.test(url) && !url.includes('/')) {
      return true;
    }
    
    // If it's a full URL, validate LinkedIn URL format
    return linkedInRegex.test(url);
  };

  const submitLinkedInApplication = async () => {
    if (!applicantName.trim()) {
      alert('Please enter your full name');
      return;
    }

    if (!linkedInProfile.trim()) {
      alert('Please enter your LinkedIn profile');
      return;
    }

    if (!validateLinkedInProfile(linkedInProfile.trim())) {
      alert('Please enter a valid LinkedIn profile URL or username (e.g., "john-smith" or "https://linkedin.com/in/john-smith")');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Format the LinkedIn URL if it's just a username
      let formattedUrl = linkedInProfile.trim();
      if (!/^https?:\/\//.test(formattedUrl) && !formattedUrl.includes('/')) {
        formattedUrl = `https://linkedin.com/in/${formattedUrl}`;
      }

      // Create new application
      const newApplication = {
        id: `app-${Date.now()}`,
        name: applicantName.trim(),
        linkedInProfile: formattedUrl,
        jobTitle: selectedJob,
        timestamp: new Date().toISOString(),
        nftCount: userNftCount,
        status: 'pending' as const
      };

      // Add to applications array
      setJobApplications(prev => [newApplication, ...prev]);

      console.log('Application submitted:', newApplication);

      setApplicationStatus('success');
      
      // Auto-close modal after success
      setTimeout(() => {
        setShowLinkedInModal(false);
        setApplicationStatus('idle');
        setApplicantName('');
        setLinkedInProfile('');
      }, 3000);

    } catch (error) {
      console.error('Application failed:', error);
      setApplicationStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Voting handlers
  const handleVoteOnProposal = (proposalId: string, voteType: 'for' | 'against') => {
    if (!isConnected) {
      alert('Please connect your wallet to vote');
      return;
    }

    console.log(`Voting ${voteType} on proposal:`, proposalId, {
      voterAddress: 'connected-wallet-address',
      votingPower: userVotingPower,
      nftCount: userNftCount,
      timestamp: new Date().toISOString()
    });

    // In a real app, this would call the smart contract
    alert(`Vote cast successfully! You voted ${voteType.toUpperCase()} with ${userVotingPower.toLocaleString()} voting power.`);
  };

  const handleVoteOnHiring = (candidateId: string, voteType: 'hire' | 'pass') => {
    if (!isConnected) {
      alert('Please connect your wallet to vote');
      return;
    }

    console.log(`Voting ${voteType} on candidate:`, candidateId, {
      voterAddress: 'connected-wallet-address',
      votingPower: userVotingPower,
      nftCount: userNftCount,
      timestamp: new Date().toISOString()
    });

    // In a real app, this would update the candidate voting data
    alert(`Vote cast successfully! You voted to ${voteType.toUpperCase()} this candidate with ${userVotingPower.toLocaleString()} voting power.`);
  };

  const handleCreateProposal = (title: string, description: string) => {
    if (!isConnected) {
      alert('Please connect your wallet to create proposals');
      return;
    }

    console.log('Creating proposal:', {
      title,
      description,
      creator: 'connected-wallet-address',
      votingPower: userVotingPower,
      timestamp: new Date().toISOString()
    });

    // In a real app, this would create the proposal on-chain
    alert('Proposal created successfully! It will be available for voting shortly.');
    setShowCreateProposal(false);
  };

  const handleDelegateVotes = (delegateAddress: string) => {
    if (!isConnected) {
      alert('Please connect your wallet to delegate votes');
      return;
    }

    console.log('Delegating votes to:', delegateAddress, {
      delegator: 'connected-wallet-address',
      votingPower: userVotingPower,
      timestamp: new Date().toISOString()
    });

    // In a real app, this would delegate voting power on-chain
    alert(`Successfully delegated ${userVotingPower.toLocaleString()} voting power to ${delegateAddress}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Enhanced Mobile-Responsive Navigation */}
      <nav className="bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 mr-2"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FMC</span>
                </div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  <span className="hidden sm:inline">Minchyn FMC</span>
                  <span className="sm:hidden">FMC</span>
                </h1>
              </div>
            </div>
            
            {/* Desktop Navigation with Organized Tabs */}
            <div className="hidden md:flex items-center space-x-1">
              {/* Core Dashboard */}
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                📊 Dashboard
              </button>
              
              {/* DAO Tab */}
              <div className="relative group">
                <button className="px-3 py-2 rounded-lg text-xs lg:text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200">
                  🏛️ DAO ▼
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                  <button onClick={() => setActiveTab('governance')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-t-lg">🏦 Governance</button>
                  <button onClick={() => setActiveTab('proposals')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">📋 Proposals</button>
                  <button onClick={() => setActiveTab('treasury')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">💰 Treasury</button>
                  <button onClick={() => setActiveTab('crowdfunding')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-b-lg">💸 Crowdfunding</button>
                </div>
              </div>
              
              {/* Member Tab (Founding Member Club Features) */}
              <div className="relative group">
                <button className="px-3 py-2 rounded-lg text-xs lg:text-sm font-medium text-purple-400 hover:text-purple-300 hover:bg-gray-700 transition-all duration-200">
                  👑 Member ▼
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                  <button onClick={() => setActiveTab('profile')} className="w-full text-left px-4 py-2 text-sm text-purple-300 hover:bg-gray-700 hover:text-white rounded-t-lg">👤 Profile</button>
                  <button onClick={() => setActiveTab('nft')} className="w-full text-left px-4 py-2 text-sm text-purple-300 hover:bg-gray-700 hover:text-white">🦄 Mint NFT</button>
                  <button onClick={() => setActiveTab('equity')} className="w-full text-left px-4 py-2 text-sm text-purple-300 hover:bg-gray-700 hover:text-white">📈 Equity</button>
                  <button onClick={() => setActiveTab('benefits')} className="w-full text-left px-4 py-2 text-sm text-purple-300 hover:bg-gray-700 hover:text-white">🎁 Benefits</button>
                  <button onClick={() => setActiveTab('network')} className="w-full text-left px-4 py-2 text-sm text-purple-300 hover:bg-gray-700 hover:text-white rounded-b-lg">🤝 Network</button>
                </div>
              </div>
              
              {/* Community Tab */}
              <div className="relative group">
                <button className="px-3 py-2 rounded-lg text-xs lg:text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200">
                  🌐 Community ▼
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                  <button onClick={() => setActiveTab('community')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-t-lg">🌐 Community</button>
                  <button onClick={() => setActiveTab('gamification')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">🎮 Gamification</button>
                  <button onClick={() => setActiveTab('jobs')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">💼 Jobs</button>
                  <button onClick={() => setActiveTab('hiring')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-b-lg">🎯 Hiring</button>
                </div>
              </div>
              
              {/* Analytics */}
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === 'analytics'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                📊 Analytics
              </button>
              
              {/* Admin */}
              {isAdmin && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === 'admin'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-purple-400 hover:text-purple-300 hover:bg-gray-700'
                  }`}
                >
                  ⚡ Admin
                </button>
              )}
            </div>
            
            {/* User Info & Wallet */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              {isConnected && (
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs lg:text-sm font-medium text-green-700">
                    {formatAddress('0x742d35Cc6634C0532925a3b8D56d8145431C5e5B')}
                  </span>
                </div>
              )}
              <Button
                onClick={connectWallet}
                variant={isConnected ? 'success' : 'primary'}
                className="flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 text-xs lg:text-sm"
              >
                <WalletIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{isConnected ? 'Connected' : 'Connect Wallet'}</span>
                <span className="sm:hidden">💰</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-gray-900 border-t border-gray-700">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {/* User Status */}
              {isConnected && (
                <div className="mb-4 p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-400">
                      {formatAddress('0x742d35Cc6634C0532925a3b8D56d8145431C5e5B')}
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Items */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Core</h3>
                  <button onClick={() => { setActiveTab('dashboard'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>📊 Dashboard</button>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">DAO Governance</h3>
                  <div className="space-y-1">
                    <button onClick={() => { setActiveTab('governance'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'governance' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>🗳️ Governance</button>
                    <button onClick={() => { setActiveTab('proposals'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'proposals' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>📋 Proposals</button>
                    <button onClick={() => { setActiveTab('treasury'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'treasury' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>💰 Treasury</button>
                    <button onClick={() => { setActiveTab('crowdfunding'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'crowdfunding' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>🚀 Crowdfunding</button>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">Member Exclusive</h3>
                  <div className="space-y-1">
                    <button onClick={() => { setActiveTab('profile'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'profile' ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-300 hover:text-white hover:bg-gray-700'}`}>👤 Profile</button>
                    <button onClick={() => { setActiveTab('nft'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'nft' ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-300 hover:text-white hover:bg-gray-700'}`}>🦄 Mint NFT</button>
                    <button onClick={() => { setActiveTab('equity'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'equity' ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-300 hover:text-white hover:bg-gray-700'}`}>📈 Equity</button>
                    <button onClick={() => { setActiveTab('benefits'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'benefits' ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-300 hover:text-white hover:bg-gray-700'}`}>🎁 Benefits</button>
                    <button onClick={() => { setActiveTab('network'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'network' ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-300 hover:text-white hover:bg-gray-700'}`}>🤝 Network</button>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">Community</h3>
                  <div className="space-y-1">
                    <button onClick={() => { setActiveTab('community'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'community' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>🌐 Community</button>
                    <button onClick={() => { setActiveTab('gamification'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'gamification' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>🎮 Gamification</button>
                    <button onClick={() => { setActiveTab('jobs'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'jobs' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>💼 Jobs</button>
                    <button onClick={() => { setActiveTab('hiring'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'hiring' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>🎯 Hiring</button>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tools</h3>
                  <div className="space-y-1">
                    <button onClick={() => { setActiveTab('analytics'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'analytics' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>📊 Analytics</button>
                    {isAdmin && (<button onClick={() => { setActiveTab('admin'); setShowMobileMenu(false); }} className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'admin' ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-300 hover:text-white hover:bg-gray-700'}`}>⚡ Admin</button>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile-Responsive Main Content */}
      <main className="max-w-7xl mx-auto py-4 lg:py-8 px-4 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Mobile-Responsive Page Description */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-blue-200">
              <h2 className="text-lg lg:text-xl font-bold text-white mb-2">📊 Dashboard Overview</h2>
              <p className="text-sm lg:text-base text-gray-700">
                Your central hub for managing the Minchyn FMC. View your voting power, track proposals, 
                monitor treasury activities, and stay updated with community engagement metrics.
              </p>
            </div>

            {/* Mobile-Responsive Premium Welcome Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Welcome back, Founder! 🦄</h1>
                    <p className="text-base sm:text-lg lg:text-xl text-white/90">
                      {isConnected ? 'Your Minchyn journey continues...' : 'Connect to access your founding member dashboard'}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl sm:text-3xl font-bold">#0047</div>
                    <div className="text-sm sm:text-lg text-white/80">Founding Member</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Overview with Mobile-Responsive Premium Design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="group relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 lg:mb-4">
                    <div className="p-2 lg:p-3 bg-blue-100 rounded-lg lg:rounded-xl">
                      <WalletIcon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                    </div>
                    <div className="text-xs text-green-600 font-semibold">+2.4% ↗</div>
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    {isConnected ? `${userBalance} ETH` : '0 ETH'}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Your Balance</div>
                  <div className="text-xs text-gray-500">≈ $37,485 USD</div>
                </div>
              </div>
              
              <div className="group relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 lg:mb-4">
                    <div className="p-2 lg:p-3 bg-purple-100 rounded-lg lg:rounded-xl">
                      <VoteIcon className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
                    </div>
                    <div className="text-xs text-green-600 font-semibold">+5.1% ↗</div>
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    {isConnected ? `${userVotingPower.toLocaleString()}` : '0'}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Voting Power</div>
                  <div className="text-xs text-gray-500">$MINCHYN Tokens</div>
                </div>
              </div>

              <div className="group relative overflow-hidden bg-gradient-to-br from-white via-emerald-50 to-teal-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 lg:mb-4">
                    <div className="p-2 lg:p-3 bg-emerald-100 rounded-lg lg:rounded-xl">
                      <span className="text-lg lg:text-xl">🦄</span>
                    </div>
                    <div className="text-xs text-blue-600 font-semibold">NFT Verified</div>
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">3</div>
                  <div className="text-sm text-gray-600 mb-1">Ugly Unicorns</div>
                  <div className="text-xs text-gray-500">Founding Access</div>
                </div>
              </div>

              <div className="group relative overflow-hidden bg-gradient-to-br from-white via-orange-50 to-yellow-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-orange-100 hover:border-orange-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 lg:mb-4">
                    <div className="p-2 lg:p-3 bg-orange-100 rounded-lg lg:rounded-xl">
                      <span className="text-lg lg:text-xl">📈</span>
                    </div>
                    <div className="text-xs text-green-600 font-semibold">+12.3% ↗</div>
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">0.25%</div>
                  <div className="text-sm text-gray-600 mb-1">Equity Share</div>
                  <div className="text-xs text-gray-500">≈ $125k value</div>
                </div>
              </div>
            </div>

            {/* Mobile-Responsive Quick Actions */}
            <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-xl lg:rounded-2xl shadow-xl border border-gray-100 p-4 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent mb-4 lg:mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                <Button 
                  onClick={() => setActiveTab('proposals')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 lg:p-4 rounded-lg lg:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base"
                >
                  🗳️ Vote on Proposals
                </Button>
                <Button 
                  onClick={() => setActiveTab('jobs')}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white p-3 lg:p-4 rounded-lg lg:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base"
                >
                  💼 Browse Jobs
                </Button>
                <Button 
                  onClick={() => setActiveTab('nft')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 lg:p-4 rounded-lg lg:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base"
                >
                  🦄 Mint NFT
                </Button>
                <Button 
                  onClick={() => setActiveTab('analytics')}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white p-3 lg:p-4 rounded-lg lg:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base"
                >
                  📊 View Analytics
                </Button>
              </div>
            </div>

            {/* Mobile-Responsive Welcome Section */}
            <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-xl lg:rounded-2xl shadow-xl border border-gray-100 p-4 lg:p-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent mb-2">
                    Welcome to Minchyn FMC
                  </h2>
                  <p className="text-gray-600 text-base lg:text-lg">
                    Participate in hiring decisions, manage exclusive benefits, and shape the future of Minchyn.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('proposals')}
                    className="flex items-center justify-center space-x-2 text-sm lg:text-base"
                  >
                    <VoteIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>View Proposals</span>
                  </Button>
                  <Button
                    onClick={() => setShowCreateProposal(true)}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                  >
                    <PlusIcon />
                    <span>Create Proposal</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-white via-gray-50 to-purple-50 rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                  Recent Proposals
                </h3>
                <div className="space-y-3">
                  {activeProposals.slice(0, 3).map((proposal) => (
                    <div key={proposal.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-purple-100 hover:border-purple-300 transition-colors">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{proposal.title}</p>
                        <p className="text-sm text-gray-600">{formatTimeRemaining(proposal.endTime)} remaining</p>
                      </div>
                      <Badge variant={getProposalStatusColor(proposal.status)}>
                        {proposal.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-white via-gray-50 to-green-50 rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                  Treasury Overview
                </h3>
                <div className="space-y-3">
                  {sampleTreasuryAssets.slice(0, 3).map((asset) => (
                    <div key={asset.symbol} className="flex items-center justify-between p-3 bg-white rounded-xl border border-green-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{asset.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{asset.symbol}</p>
                          <p className="text-sm text-gray-600">{asset.balance}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${asset.usdValue.toLocaleString()}</p>
                        <p className={`text-sm font-medium ${asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!isConnected && (
              <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl border border-blue-200 p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <WalletIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Wallet</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Connect your Web3 wallet to participate in governance and view your assets.
                  </p>
                  <Button 
                    onClick={connectWallet}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Connect Wallet
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'proposals' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Proposals</h2>
                <p className="text-gray-600">Vote on proposals that shape our DAO's future</p>
              </div>
              <Button
                onClick={() => setShowCreateProposal(true)}
                className="flex items-center space-x-2"
              >
                <PlusIcon />
                <span>Create Proposal</span>
              </Button>
            </div>

            {/* Proposal Filters */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {['all', 'active', 'passed', 'failed'].map((filter) => (
                <Badge
                  key={filter}
                  variant={filter === 'all' ? 'info' : 'default'}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Badge>
              ))}
            </div>

            {/* Proposals List */}
            <div className="space-y-4">
              {sampleProposals.map((proposal) => (
                <Card
                  key={proposal.id}
                  hover
                  className="cursor-pointer"
                  onClick={() => setSelectedProposal(proposal)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant={getProposalStatusColor(proposal.status)}>
                          {proposal.status}
                        </Badge>
                        <Badge variant="default">{proposal.category}</Badge>
                        <span className="text-sm text-gray-500">
                          by {formatAddress(proposal.proposer)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{proposal.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{proposal.description}</p>
                    </div>
                    
                    <div className="lg:w-80 space-y-3">
                      {proposal.status === 'active' && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">
                              {((proposal.votesFor + proposal.votesAgainst) / proposal.totalVotes * 100).toFixed(1)}%
                            </span>
                          </div>
                          <Progress
                            value={proposal.votesFor}
                            max={proposal.totalVotes}
                            color="green"
                            showLabel={false}
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>For: {proposal.votesFor.toLocaleString()}</span>
                            <span>Against: {proposal.votesAgainst.toLocaleString()}</span>
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-medium text-blue-600">
                              {formatTimeRemaining(proposal.endTime)} remaining
                            </span>
                          </div>
                        </>
                      )}
                      
                      {proposal.status !== 'active' && (
                        <div className="text-center text-sm text-gray-500">
                          Final: {proposal.votesFor.toLocaleString()} for, {proposal.votesAgainst.toLocaleString()} against
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'treasury' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Treasury</h2>
                <p className="text-gray-600">Manage and track DAO assets</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">
                  Export Report
                </Button>
                <Button>
                  Propose Transfer
                </Button>
              </div>
            </div>

            {/* Treasury Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Total Value"
                value={`$${(treasuryTotal / 1000).toFixed(0)}K`}
                subtitle="All assets"
                icon={<TreasuryIcon />}
                color="green"
                trend={{
                  value: '+5.2%',
                  isPositive: true
                }}
              />
              
              <StatsCard
                title="Monthly Flow"
                value="+$23.5K"
                subtitle="Net inflow"
                icon={<ArrowUpIcon />}
                color="blue"
                trend={{
                  value: '+12.3%',
                  isPositive: true
                }}
              />
              
              <StatsCard
                title="Diversification"
                value="4 Assets"
                subtitle="ETH, MCHN, USDC, BASE"
                icon={<ChartIcon />}
                color="purple"
              />
            </div>

            {/* Assets Table */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assets</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-medium text-gray-600">Asset</th>
                      <th className="text-right py-3 px-2 font-medium text-gray-600">Balance</th>
                      <th className="text-right py-3 px-2 font-medium text-gray-600">Value</th>
                      <th className="text-right py-3 px-2 font-medium text-gray-600">24h Change</th>
                      <th className="text-right py-3 px-2 font-medium text-gray-600">Allocation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sampleTreasuryAssets.map((asset) => (
                      <tr key={asset.symbol} className="hover:bg-gray-50">
                        <td className="py-4 px-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="font-medium text-sm">{asset.symbol.slice(0, 2)}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{asset.symbol}</p>
                              <p className="text-sm text-gray-500">{asset.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-right">
                          <p className="font-medium text-gray-900">{asset.balance}</p>
                          <p className="text-sm text-gray-500">${asset.price}</p>
                        </td>
                        <td className="py-4 px-2 text-right">
                          <p className="font-medium text-gray-900">${asset.usdValue.toLocaleString()}</p>
                        </td>
                        <td className="py-4 px-2 text-right">
                          <span className={`font-medium ${
                            asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                          </span>
                        </td>
                        <td className="py-4 px-2 text-right">
                          <span className="font-medium text-gray-900">
                            {((asset.usdValue / treasuryTotal) * 100).toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
              <div className="space-y-4">
                {sampleTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'incoming' ? 'bg-green-100 text-green-600' :
                        tx.type === 'outgoing' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {tx.type === 'incoming' ? <ArrowDownIcon /> :
                         tx.type === 'outgoing' ? <ArrowUpIcon /> :
                         <ChartIcon />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {tx.type === 'incoming' ? 'Received' :
                           tx.type === 'outgoing' ? 'Sent' :
                           'Swapped'} {tx.amount} {tx.asset}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={
                        tx.status === 'completed' ? 'success' :
                        tx.status === 'pending' ? 'warning' : 'danger'
                      }>
                        {tx.status}
                      </Badge>
                      <ExternalLinkIcon />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'governance' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Governance</h2>
              <p className="text-gray-600">Manage your voting power and participate in decisions</p>
            </div>

            {/* Governance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatsCard
                title="Your NFTs"
                value={isConnected ? userNftCount.toString() : '0'}
                subtitle="Ugly Unicorns"
                icon={<UserIcon />}
                color="purple"
              />
              
              <StatsCard
                title="Voting Power"
                value={isConnected ? userVotingPower.toLocaleString() : '0'}
                subtitle="UUDT Tokens"
                icon={<VoteIcon />}
                color="blue"
              />
              
              <StatsCard
                title="Proposals Voted"
                value={isConnected ? '8' : '0'}
                subtitle="This month"
                icon={<CheckIcon />}
                color="green"
              />
              
              <StatsCard
                title="Delegation"
                value="None"
                subtitle="Self-voting"
                icon={<UserIcon />}
                color="orange"
              />
            </div>

            {/* NFT Staking */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">NFT Staking</h3>
              {isConnected ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Your Ugly Unicorns</h4>
                    <div className="space-y-3">
                      {[1, 2].map((nftId) => (
                        <div key={nftId} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold">#{nftId}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Ugly Unicorn #{nftId}</p>
                              <p className="text-sm text-gray-500">Not staked</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Stake
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Staking Rewards</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-blue-900 font-medium">Available Rewards</span>
                        <span className="text-blue-600 font-bold">2.5 UUDT</span>
                      </div>
                      <Button variant="primary" size="sm" className="w-full">
                        Claim Rewards
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <UserIcon />
                  <p className="mt-2">Connect wallet to view your NFTs</p>
                </div>
              )}
            </Card>

            {/* Token Exchange */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Exchange</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    MCHN Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.0"
                    />
                    <div className="absolute right-3 top-3">
                      <span className="text-gray-500 text-sm">MCHN</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Balance: 1,250 MCHN</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    You'll Receive
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      placeholder="0.0"
                      disabled
                    />
                    <div className="absolute right-3 top-3">
                      <span className="text-gray-500 text-sm">UUDT</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Exchange Rate: 1 MCHN = 2 UUDT</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full" size="lg">
                  Exchange for Voting Power
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Gamification Tab */}
        {activeTab === 'gamification' && (
          <div className="space-y-8">
            {/* Page Description */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
              <h2 className="text-xl font-bold text-gray-900 mb-2">🎮 Achievement System</h2>
              <p className="text-gray-700">
                Earn exclusive badges, climb membership tiers, and unlock special rewards through participation. 
                NFT holders get access to premium challenges and founder-exclusive achievements.
              </p>
            </div>

            {/* Premium Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-500 rounded-3xl p-8 text-white">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎮</span>
                  </div>
                  <h1 className="text-4xl font-bold">Founder Achievement Hub</h1>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                </div>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Level up your membership and unlock exclusive rewards through engagement.
                </p>
                <div className="mt-6 p-4 bg-pink-500/20 backdrop-blur-sm rounded-xl border border-pink-300/30">
                  <p className="text-lg font-semibold">🦄 Current Level: Founder Elite • {userNftCount * 250} Points Earned</p>
                </div>
              </div>
            </div>

            {/* Achievement Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* NFT Exclusive Achievements */}
              <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl shadow-xl border border-purple-100 p-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <span className="mr-3">🦄</span> Founder Achievements
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl">💎</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Diamond Holder</div>
                        <div className="text-sm text-gray-600">Own 3+ Ugly Unicorn NFTs</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Unlocked</span>
                      <span className="text-purple-600 font-bold">+500 pts</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl">🔒</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Staking Master</div>
                        <div className="text-sm text-gray-600">Stake NFTs for 100+ days</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Unlocked</span>
                      <span className="text-green-600 font-bold">+750 pts</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl">👔</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Hiring Guru</div>
                        <div className="text-sm text-gray-600">Vote on 10+ hiring decisions</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Unlocked</span>
                      <span className="text-blue-600 font-bold">+300 pts</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center">
                        <span className="text-gray-500 text-xl">🌟</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-500">Whale Founder</div>
                        <div className="text-sm text-gray-400">Own 10+ NFTs</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Locked</span>
                      <span className="text-gray-500 font-bold">+1000 pts</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Achievements */}
              <div className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-2xl shadow-xl border border-blue-100 p-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <span className="mr-3">🌟</span> Community Achievements
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl">🗳️</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Governance Pro</div>
                        <div className="text-sm text-gray-600">Vote on 25+ proposals</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Unlocked</span>
                      <span className="text-orange-600 font-bold">+400 pts</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl">🤝</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Network Builder</div>
                        <div className="text-sm text-gray-600">Connect with 50+ members</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Unlocked</span>
                      <span className="text-yellow-600 font-bold">+250 pts</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl">📊</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Analytics Expert</div>
                        <div className="text-sm text-gray-600">View analytics 100+ times</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Unlocked</span>
                      <span className="text-indigo-600 font-bold">+200 pts</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center">
                        <span className="text-gray-500 text-xl">👑</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-500">Community Leader</div>
                        <div className="text-sm text-gray-400">Top 10 on leaderboard</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Locked</span>
                      <span className="text-gray-500 font-bold">+800 pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Levels */}
            <div className="bg-gradient-to-br from-white via-gray-50 to-amber-50 rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-6">
                🏆 Membership Levels
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
                  <div className="text-4xl mb-3">🥉</div>
                  <h3 className="font-bold text-gray-800 mb-2">Newbie</h3>
                  <div className="text-sm text-gray-600 mb-3">0 - 500 points</div>
                  <div className="text-xs text-gray-500">Basic access</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                  <div className="text-4xl mb-3">🥈</div>
                  <h3 className="font-bold text-blue-800 mb-2">Contributor</h3>
                  <div className="text-sm text-blue-600 mb-3">500 - 1,500 points</div>
                  <div className="text-xs text-blue-500">Enhanced features</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl border-2 border-purple-400">
                  <div className="text-4xl mb-3">🥇</div>
                  <h3 className="font-bold text-purple-800 mb-2">Founder Elite</h3>
                  <div className="text-sm text-purple-600 mb-3">1,500+ points</div>
                  <div className="text-xs text-purple-500">Premium access ⭐</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-yellow-100 to-amber-200 rounded-xl">
                  <div className="text-4xl mb-3">👑</div>
                  <h3 className="font-bold text-amber-800 mb-2">Guardian</h3>
                  <div className="text-sm text-amber-600 mb-3">3,000+ points</div>
                  <div className="text-xs text-amber-500">Maximum privileges</div>
                </div>
              </div>
            </div>

            {/* Current Challenge */}
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl shadow-xl border border-green-200 p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-6">
                🎯 Monthly Challenge: December 2024
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🦄 "NFT Governance Master"</h3>
                  <p className="text-gray-700 mb-4">
                    Participate in at least 5 governance votes and stake your NFTs for the entire month. 
                    Exclusive to Ugly Unicorn holders!
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Governance votes</span>
                      <span className="text-sm font-semibold">8/5 ✅</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Days staked</span>
                      <span className="text-sm font-semibold">15/30 🔄</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                    <div className="text-3xl mb-2">🏆</div>
                    <h4 className="font-bold text-gray-900 mb-2">Exclusive Rewards</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• Limited Edition NFT Badge</div>
                      <div>• 1,000 Bonus $MINCHYN Tokens</div>
                      <div>• Double Voting Power (1 month)</div>
                      <div>• Founder Dinner Invitation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Page Description */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-2">📊 Analytics Dashboard</h2>
              <p className="text-gray-700">
                Deep insights into governance participation, treasury performance, voting patterns, and community growth. 
                Track key metrics and analyze trends to make informed decisions.
              </p>
            </div>

            <GovernanceAnalytics data={sampleGovernanceMetrics} />
            <TreasuryAnalyticsDashboard data={sampleTreasuryAnalytics} />
          </div>
        )}

        {/* Crowdfunding Section */}
        {activeTab === 'crowdfunding' && (
          <div className="space-y-8">
            {/* Page Description */}
            <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-2xl p-6 border border-green-700">
              <h2 className="text-xl font-bold text-white mb-2">💰 Community Crowdfunding</h2>
              <p className="text-green-100">
                Contribute $MINCHYN tokens to fund hiring initiatives and marketing campaigns. 
                Help shape Minchyn's growth while earning rewards and voting power for your contributions.
              </p>
            </div>

            {/* Premium Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-blue-600 to-purple-500 rounded-3xl p-8 text-white">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h1 className="text-4xl font-bold">Crowdfunding Hub</h1>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                </div>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Fund Minchyn's future! Contribute $MINCHYN tokens to strategic initiatives 
                  and earn enhanced voting power and exclusive rewards.
                </p>
              </div>
            </div>

            {/* Your Contribution Stats */}
            <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-2xl shadow-xl border border-gray-600 p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-6">
                Your Contribution Stats
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">15,420</div>
                    <div className="text-gray-300">$MINCHYN Contributed</div>
                    <div className="text-sm text-gray-400 mt-1">≈ $2,313 USD</div>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">3,540</div>
                    <div className="text-gray-300">Bonus Voting Power</div>
                    <div className="text-sm text-gray-400 mt-1">From contributions</div>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">#12</div>
                    <div className="text-gray-300">Contributor Rank</div>
                    <div className="text-sm text-gray-400 mt-1">Top 1% globally</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Campaigns */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">🎯 Active Campaigns</h2>
              
              {/* Hiring Campaign */}
              <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-2xl shadow-xl border border-green-600 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-green-400 mb-2">👥 Senior Developer Hiring</h3>
                    <p className="text-green-100 text-lg">Fund the recruitment of blockchain developers for core protocol development</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 text-sm font-semibold">URGENT</div>
                    <div className="text-green-200 text-xs">5 days left</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">847,523</div>
                    <div className="text-green-300">$MINCHYN Raised</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">1,200,000</div>
                    <div className="text-green-300">Goal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">71%</div>
                    <div className="text-green-300">Complete</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-3 rounded-full" style={{width: '71%'}}></div>
                </div>
                
                <div className="flex space-x-4">
                  <input
                    type="number"
                    placeholder="Enter $MINCHYN amount"
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">
                    Contribute
                  </button>
                </div>
                
                <div className="mt-4 p-3 bg-green-900/30 rounded-lg border border-green-600">
                  <div className="text-sm text-green-200">
                    <strong>Rewards:</strong> 2x voting power on hiring decisions + exclusive access to developer interviews
                  </div>
                </div>
              </div>

              {/* Marketing Campaign */}
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl shadow-xl border border-blue-600 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">📈 Q1 Marketing Blitz</h3>
                    <p className="text-blue-100 text-lg">Accelerate growth with targeted advertising and influencer partnerships</p>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-400 text-sm font-semibold">TRENDING</div>
                    <div className="text-blue-200 text-xs">23 days left</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">1,456,890</div>
                    <div className="text-blue-300">$MINCHYN Raised</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">2,000,000</div>
                    <div className="text-blue-300">Goal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">73%</div>
                    <div className="text-blue-300">Complete</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{width: '73%'}}></div>
                </div>
                
                <div className="flex space-x-4">
                  <input
                    type="number"
                    placeholder="Enter $MINCHYN amount"
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all">
                    Contribute
                  </button>
                </div>
                
                <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-600">
                  <div className="text-sm text-blue-200">
                    <strong>Rewards:</strong> Early access to marketing analytics + contributor NFT badge + revenue sharing
                  </div>
                </div>
              </div>
            </div>

            {/* Contribution History */}
            <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-2xl shadow-xl border border-gray-600 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">📊 Your Contribution History</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-xl border border-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">👥</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Senior Developer Hiring</div>
                      <div className="text-sm text-gray-300">Contributed 5,000 $MINCHYN</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">+1,000 VP</div>
                    <div className="text-xs text-gray-400">2 days ago</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-xl border border-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">📈</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Q1 Marketing Blitz</div>
                      <div className="text-sm text-gray-300">Contributed 10,420 $MINCHYN</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-400 font-semibold">+2,084 VP</div>
                    <div className="text-xs text-gray-400">1 week ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contributor Benefits */}
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl shadow-xl border border-purple-600 p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                🎁 Contributor Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🗳️</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Enhanced Voting Power</div>
                      <div className="text-sm text-purple-200">2x multiplier on contributed campaigns</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">💎</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Exclusive NFT Badges</div>
                      <div className="text-sm text-pink-200">Show your contributor status</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📊</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Revenue Sharing</div>
                      <div className="text-sm text-blue-200">Earn from successful campaigns</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">⚡</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Early Access</div>
                      <div className="text-sm text-green-200">First to new features & updates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">👤 Personal Dashboard</h2>
              <p className="text-gray-300">Track your contributions and manage your DAO participation</p>
            </div>

            <PersonalDashboard
              profile={sampleMemberProfile}
              votingHistory={sampleVotingHistory}
              delegations={sampleDelegations}
              rewards={sampleGovernanceRewards}
              impactMetrics={sampleImpactMetrics}
            />
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            {/* Page Description */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200">
              <h2 className="text-xl font-bold text-gray-900 mb-2">🌐 Community Hub</h2>
              <p className="text-gray-700">
                Connect with fellow founding members, participate in discussions, share achievements, and engage with 
                the broader Minchyn community. Build relationships and collaborate on shared goals.
              </p>
            </div>

            <SocialFeatures
              discussions={sampleDiscussions}
              currentUser={sampleMemberProfile}
              onCreateThread={handleCreateThread}
              onReply={handleReply}
              onVote={handleVoteOnThread}
            />
          </div>
        )}

        {/* NFT Minting Tab */}
        {activeTab === 'nft' && (
          <div className="space-y-8">
            {/* Legal Disclaimer Banner */}
            <QuickLegalBanner type="nft" />
            
            {/* Page Description */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <h2 className="text-xl font-bold text-gray-900 mb-2">🦄 NFT Minting</h2>
              <p className="text-gray-700">
                {isCollectionSoldOut 
                  ? "All Ugly Unicorn NFTs have been minted! You can purchase them on the secondary marketplace below."
                  : "Mint your Ugly Unicorn NFTs to unlock founder benefits, governance power, and equity shares. Each NFT grants you 500 gifted shares in Minchyn."
                }
              </p>
            </div>

            {isCollectionSoldOut ? (
              /* OpenSea Marketplace Integration */
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🌊</span>
                    </div>
                    <h1 className="text-4xl font-bold">Collection Sold Out!</h1>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🦄</span>
                    </div>
                  </div>
                  <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
                    All {TOTAL_NFT_COLLECTION_SIZE.toLocaleString()} Ugly Unicorn NFTs have been minted! 
                    You can still join the founding member club by purchasing on OpenSea.
                  </p>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{TOTAL_NFT_COLLECTION_SIZE.toLocaleString()}</div>
                        <div className="text-sm text-white/80">Total Minted</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">2.5 ETH</div>
                        <div className="text-sm text-white/80">Floor Price</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">847</div>
                        <div className="text-sm text-white/80">Owners</div>
                      </div>
                    </div>
                    
                    <a 
                      href="https://opensea.io/collection/uglyunicorns" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-300 group"
                    >
                      <span className="text-2xl mr-3">🌊</span>
                      <span>Buy on OpenSea Marketplace</span>
                      <span className="ml-3 transform group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <NFTMinting
                isConnected={isConnected}
                userAddress={isConnected ? '0x742d35Cc6634C0532925a3b8D56d8145431C5e5B' : undefined}
                userBalance={userBalance}
              />
            )}

            {/* Secondary Marketplace Info Card */}
            <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-gray-200 p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                🌊 Secondary Marketplace
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Why Buy Ugly Unicorns?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700">500 gifted Minchyn shares per NFT</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Exclusive founder club access</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Governance voting power</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700">Hiring decision participation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="text-gray-700">Staking rewards & networking</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Collection Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{currentMintedNFTs.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Minted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{((currentMintedNFTs / TOTAL_NFT_COLLECTION_SIZE) * 100).toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">Collection Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{(currentMintedNFTs * SHARES_PER_NFT).toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Shares Allocated</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">${((currentMintedNFTs * SHARES_PER_NFT) / totalDilutedShares * ESTIMATED_COMPANY_VALUATION).toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Equity Value</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <a 
                      href="https://opensea.io/collection/uglyunicorns" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                      View on OpenSea
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Board Tab - NFT Holders Only */}
        {activeTab === 'jobs' && (
          <div className="space-y-8">
            {/* Page Description */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <h2 className="text-xl font-bold text-gray-900 mb-2">💼 Career Opportunities</h2>
              <p className="text-gray-700">
                Exclusive job board for Minchyn founding members. Access curated opportunities, apply directly through 
                LinkedIn integration, and leverage your NFT status for priority consideration.
              </p>
            </div>

            {/* Premium Header with Gradient */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-3xl p-8 text-white">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🦄</span>
                  </div>
                  <h1 className="text-4xl font-bold">Minchyn Career Hub</h1>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                </div>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Exclusive career opportunities for Ugly Unicorn NFT holders. Join the Minchyn team and help build the future of creator economy.
                </p>
                {!isConnected && (
                  <div className="mt-6 p-4 bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-300/30">
                    <p className="text-lg font-semibold">🔐 Connect your wallet to access exclusive job opportunities</p>
                  </div>
                )}
                {isConnected && (
                  <div className="mt-6 p-4 bg-green-500/20 backdrop-blur-sm rounded-xl border border-green-300/30">
                    <p className="text-lg font-semibold">✅ Ugly Unicorn NFT Verified - Access Granted!</p>
                  </div>
                )}
              </div>
            </div>

            {isConnected ? (
              <>
                {/* Job Filters with Modern Design */}
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Open Positions
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      <select className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700">
                        <option>All Departments</option>
                        <option>Engineering</option>
                        <option>Product</option>
                        <option>Marketing</option>
                        <option>Operations</option>
                      </select>
                      <select className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700">
                        <option>All Locations</option>
                        <option>Remote</option>
                        <option>San Francisco</option>
                        <option>New York</option>
                        <option>Austin</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Premium Job Listings */}
                <div className="grid gap-6">
                  {/* Job Listing 1 */}
                  <div className="group relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-2xl font-bold text-gray-900">Senior Frontend Engineer</h3>
                            <Badge variant="success" className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">Full-time</Badge>
                            <Badge variant="default" className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">Remote</Badge>
                            <Badge className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">🦄 NFT Exclusive</Badge>
                          </div>
                          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                            Join our engineering team to build the next generation of creator tools. 
                            Work with React, TypeScript, and cutting-edge technologies. Shape the future of Minchyn.
                          </p>
                          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-4">
                            <span className="flex items-center space-x-2"><span>📍</span><span>Remote Worldwide</span></span>
                            <span className="flex items-center space-x-2"><span>💰</span><span>$120k - $180k + equity</span></span>
                            <span className="flex items-center space-x-2"><span>⏰</span><span>Posted 2 days ago</span></span>
                            <span className="flex items-center space-x-2"><span>👥</span><span>3 candidates applied</span></span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">React</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">TypeScript</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Web3</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Next.js</span>
                          </div>
                        </div>
                        <div className="ml-6 text-right">
                          <Button 
                            onClick={() => handleApplyWithLinkedIn('Senior Frontend Engineer')}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            Apply with LinkedIn
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Listing 2 */}
                  <div className="group relative overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-teal-50 rounded-2xl p-6 border border-cyan-100 hover:border-cyan-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-2xl font-bold text-gray-900">Product Manager</h3>
                            <Badge variant="success" className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">Full-time</Badge>
                            <Badge variant="default" className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold">San Francisco</Badge>
                            <Badge className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">🦄 NFT Exclusive</Badge>
                          </div>
                          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                            Lead product strategy and execution for our creator platform. 
                            Drive user research, roadmap planning, and cross-team collaboration.
                          </p>
                          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-4">
                            <span className="flex items-center space-x-2"><span>📍</span><span>San Francisco, CA</span></span>
                            <span className="flex items-center space-x-2"><span>💰</span><span>$140k - $200k + equity</span></span>
                            <span className="flex items-center space-x-2"><span>⏰</span><span>Posted 1 week ago</span></span>
                            <span className="flex items-center space-x-2"><span>👥</span><span>7 candidates applied</span></span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Product Strategy</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">User Research</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Analytics</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Growth</span>
                          </div>
                        </div>
                        <div className="ml-6 text-right">
                          <Button 
                            onClick={() => handleApplyWithLinkedIn('Product Manager')}
                            className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            Apply with LinkedIn
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Listing 3 */}
                  <div className="group relative overflow-hidden bg-gradient-to-br from-white via-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100 hover:border-pink-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-2xl font-bold text-gray-900">Marketing Lead</h3>
                            <Badge variant="success" className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">Full-time</Badge>
                            <Badge variant="default" className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">Remote</Badge>
                            <Badge className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">🦄 NFT Exclusive</Badge>
                          </div>
                          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                            Drive growth marketing and brand strategy. Own the entire marketing funnel 
                            and help scale our creator community to 1M+ users.
                          </p>
                          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-4">
                            <span className="flex items-center space-x-2"><span>📍</span><span>Remote</span></span>
                            <span className="flex items-center space-x-2"><span>💰</span><span>$110k - $160k + equity</span></span>
                            <span className="flex items-center space-x-2"><span>⏰</span><span>Posted 3 days ago</span></span>
                            <span className="flex items-center space-x-2"><span>👥</span><span>5 candidates applied</span></span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Growth Marketing</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Content Strategy</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Community</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Brand</span>
                          </div>
                        </div>
                        <div className="ml-6 text-right">
                          <Button 
                            onClick={() => handleApplyWithLinkedIn('Marketing Lead')}
                            className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            Apply with LinkedIn
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Stats Dashboard */}
                <div className="bg-gradient-to-br from-white via-gray-50 to-purple-50 rounded-2xl shadow-xl border border-gray-100 p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                      Your Career Journey
                    </h3>
                    <p className="text-gray-600">Track your applications and community support</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-blue-100">
                      <div className="text-4xl font-bold text-blue-600 mb-2">2</div>
                      <div className="text-sm text-gray-600 font-semibold">Applications Submitted</div>
                      <div className="text-xs text-gray-500 mt-1">This month</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-green-100">
                      <div className="text-4xl font-bold text-green-600 mb-2">156</div>
                      <div className="text-sm text-gray-600 font-semibold">Community Votes</div>
                      <div className="text-xs text-gray-500 mt-1">Supporting you</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-purple-100">
                      <div className="text-4xl font-bold text-purple-600 mb-2">1</div>
                      <div className="text-sm text-gray-600 font-semibold">Interview Scheduled</div>
                      <div className="text-xs text-gray-500 mt-1">Next week</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-orange-100">
                      <div className="text-4xl font-bold text-orange-600 mb-2">0</div>
                      <div className="text-sm text-gray-600 font-semibold">Offers Received</div>
                      <div className="text-xs text-gray-500 mt-1">Keep applying!</div>
                    </div>
                  </div>
                </div>

                {/* LinkedIn Application Form Modal would appear when clicking "Apply with LinkedIn" */}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12 max-w-2xl mx-auto">
                  <div className="text-6xl mb-6">🔐</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">NFT Verification Required</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    This exclusive job board is only available to Ugly Unicorn NFT holders. 
                    Connect your wallet to verify your NFT ownership and unlock premium career opportunities.
                  </p>
                  <Button
                    onClick={connectWallet}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Connect Wallet to Apply
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hiring Votes Tab - Community Driven */}
        {activeTab === 'hiring' && (
          <div className="space-y-8">
            {/* Page Description */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
              <h2 className="text-xl font-bold text-gray-900 mb-2">👔 Community Hiring</h2>
              <p className="text-gray-700">
                Help shape the future of Minchyn by voting on hiring decisions. Use your NFT and token voting power 
                to evaluate candidates and select the best talent to join our growing team.
              </p>
            </div>

            {/* Premium Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-500 rounded-3xl p-8 text-white">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🗳️</span>
                  </div>
                  <h1 className="text-4xl font-bold">Community Hiring Hub</h1>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Shape Minchyn's future! Vote on job candidates based on their LinkedIn profiles. 
                  Your voice matters in building the perfect team.
                </p>
              </div>
            </div>

            {/* Voting Power Display */}
            <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl shadow-xl border border-purple-100 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Your Voting Power
                  </h3>
                  <p className="text-gray-600 text-lg">Based on your Ugly Unicorn NFTs and $Minchyn tokens</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">🦄 3 NFTs</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">💎 15,420 $MINCHYN</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {userVotingPower.toLocaleString()}
                  </div>
                  <div className="text-lg text-gray-500 font-semibold">Voting Points</div>
                  <div className="text-sm text-gray-400">Rank #47 globally</div>
                </div>
              </div>
            </div>

            {/* Job Applications Section */}
            {jobApplications.length > 0 && (
              <div className="bg-gradient-to-br from-white via-orange-50 to-amber-50 rounded-2xl shadow-xl border border-orange-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                      Recent Job Applications
                    </h3>
                    <p className="text-gray-600 text-lg">Applications submitted through the jobs board</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">{jobApplications.length}</div>
                    <div className="text-sm text-gray-500">Total Applications</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {jobApplications.map((application) => (
                    <div key={application.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-100 hover:border-orange-300 transition-all duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold">
                              {application.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-gray-900">{application.name}</h4>
                              <p className="text-sm text-gray-600">Applied for: <span className="font-semibold">{application.jobTitle}</span></p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6 mb-4">
                            <a 
                              href={application.linkedInProfile} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold"
                            >
                              <span>📄</span>
                              <span>View LinkedIn Profile</span>
                              <ExternalLinkIcon className="w-4 h-4" />
                            </a>
                            <span className="text-sm text-gray-600">
                              📅 {new Date(application.timestamp).toLocaleDateString()} at {new Date(application.timestamp).toLocaleTimeString()}
                            </span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                              🦄 {application.nftCount} NFTs
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Badge 
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                application.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                                application.status === 'approved' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}
                            >
                              {application.status === 'pending' ? '⏳ Pending Review' :
                               application.status === 'reviewing' ? '👀 Under Review' :
                               application.status === 'approved' ? '✅ Approved' :
                               '❌ Not Selected'}
                            </Badge>
                          </div>
                        </div>
                        
                        {isAdmin && application.status === 'pending' && (
                          <div className="flex space-x-2 ml-6">
                            <Button
                              onClick={() => {
                                setJobApplications(prev => 
                                  prev.map(app => 
                                    app.id === application.id 
                                      ? { ...app, status: 'reviewing' as const }
                                      : app
                                  )
                                );
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                            >
                              👀 Review
                            </Button>
                            <Button
                              onClick={() => {
                                setJobApplications(prev => 
                                  prev.map(app => 
                                    app.id === application.id 
                                      ? { ...app, status: 'approved' as const }
                                      : app
                                  )
                                );
                              }}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                            >
                              ✅ Approve
                            </Button>
                            <Button
                              onClick={() => {
                                setJobApplications(prev => 
                                  prev.map(app => 
                                    app.id === application.id 
                                      ? { ...app, status: 'rejected' as const }
                                      : app
                                  )
                                );
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                            >
                              ❌ Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Current Hiring Votes */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  Active Candidate Votes
                </h2>
                <p className="text-gray-600 text-lg">Review LinkedIn profiles and vote for the best candidates</p>
              </div>
              
              {/* Candidate Vote 1 */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 hover:border-green-300 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">AJ</span>
                      </div>
                      <div className="text-center mt-2">
                        <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center justify-center space-x-1">
                          <span>📄</span><span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">Alex Johnson</h3>
                          <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-3 py-1 rounded-full font-semibold border border-purple-200">
                            Senior Frontend Engineer
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Position closes in</div>
                          <div className="text-lg font-bold text-orange-600">2 days</div>
                        </div>
                      </div>
                      
                      {/* LinkedIn Profile Summary */}
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-2">LinkedIn Profile Summary</h4>
                        <p className="text-gray-700 mb-3">
                          <strong>Experience:</strong> 5 years at Google as Senior Software Engineer, 2 years at Meta. 
                          React expert with 50+ open source contributions. Led 3 major product launches reaching 10M+ users.
                        </p>
                        <p className="text-gray-700 mb-3">
                          <strong>Skills:</strong> React, TypeScript, Node.js, GraphQL, Web3, System Design
                        </p>
                        <p className="text-gray-700">
                          <strong>Education:</strong> MS Computer Science - Stanford University, BS - MIT
                        </p>
                        <div className="flex items-center space-x-4 mt-3">
                          <span className="text-sm text-gray-600">🎯 500+ connections</span>
                          <span className="text-sm text-gray-600">📝 50+ recommendations</span>
                          <span className="text-sm text-gray-600">🏆 Top 1% profile views</span>
                        </div>
                      </div>
                      
                      {/* Voting Progress */}
                      <div className="space-y-4">
                        <div className="flex justify-between text-lg font-semibold">
                          <span className="text-green-600 flex items-center space-x-2">
                            <span>👍</span><span>Hire: 2,840 votes (82%)</span>
                          </span>
                          <span className="text-red-600 flex items-center space-x-2">
                            <span>👎</span><span>Pass: 620 votes (18%)</span>
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full shadow-sm" style={{width: '82%'}}></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold">3,460 total votes</span> • 
                            <span className="ml-1">Voting confidence: Very High</span>
                          </div>
                          <div className="flex space-x-3">
                            <Button 
                              onClick={() => handleVoteOnHiring('alex-johnson', 'hire')}
                              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                              disabled={!isConnected}
                            >
                              👍 Vote Hire
                            </Button>
                            <Button 
                              onClick={() => handleVoteOnHiring('alex-johnson', 'pass')}
                              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                              disabled={!isConnected}
                            >
                              👎 Vote Pass
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Candidate Vote 2 */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">SM</span>
                      </div>
                      <div className="text-center mt-2">
                        <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center justify-center space-x-1">
                          <span>📄</span><span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">Sarah Martinez</h3>
                          <Badge className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-3 py-1 rounded-full font-semibold border border-orange-200">
                            Product Manager
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Position closes in</div>
                          <div className="text-lg font-bold text-orange-600">5 days</div>
                        </div>
                      </div>
                      
                      {/* LinkedIn Profile Summary */}
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-2">LinkedIn Profile Summary</h4>
                        <p className="text-gray-700 mb-3">
                          <strong>Experience:</strong> 4 years as Senior PM at Spotify, 3 years at Airbnb. 
                          Launched 8 major features with 50M+ combined users. Expert in user research and data-driven decisions.
                        </p>
                        <p className="text-gray-700 mb-3">
                          <strong>Skills:</strong> Product Strategy, User Research, Analytics, A/B Testing, Growth, Design
                        </p>
                        <p className="text-gray-700">
                          <strong>Education:</strong> MBA - Wharton, BS Business - UC Berkeley
                        </p>
                        <div className="flex items-center space-x-4 mt-3">
                          <span className="text-sm text-gray-600">🎯 800+ connections</span>
                          <span className="text-sm text-gray-600">📝 75+ recommendations</span>
                          <span className="text-sm text-gray-600">🏆 Product Leader badge</span>
                        </div>
                      </div>
                      
                      {/* Voting Progress */}
                      <div className="space-y-4">
                        <div className="flex justify-between text-lg font-semibold">
                          <span className="text-green-600 flex items-center space-x-2">
                            <span>👍</span><span>Hire: 1,990 votes (68%)</span>
                          </span>
                          <span className="text-red-600 flex items-center space-x-2">
                            <span>👎</span><span>Pass: 940 votes (32%)</span>
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full shadow-sm" style={{width: '68%'}}></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold">2,930 total votes</span> • 
                            <span className="ml-1">Voting confidence: High</span>
                          </div>
                          <div className="flex space-x-3">
                            <Button 
                              onClick={() => handleVoteOnHiring('sarah-martinez', 'hire')}
                              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                              disabled={!isConnected}
                            >
                              👍 Vote Hire
                            </Button>
                            <Button 
                              onClick={() => handleVoteOnHiring('sarah-martinez', 'pass')}
                              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                              disabled={!isConnected}
                            >
                              👎 Vote Pass
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Voting History & Rewards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Voting History */}
              <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  Your Voting History
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div>
                      <span className="font-semibold text-green-800">Voted 👍 for David Chen</span>
                      <div className="text-sm text-green-600">Backend Engineer • 2 weeks ago</div>
                    </div>
                    <div className="text-right">
                      <span className="text-green-600 font-bold">✅ Hired</span>
                      <div className="text-xs text-green-500">+50 points earned</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div>
                      <span className="font-semibold text-red-800">Voted 👎 for Lisa Wong</span>
                      <div className="text-sm text-red-600">Designer • 3 weeks ago</div>
                    </div>
                    <div className="text-right">
                      <span className="text-red-600 font-bold">❌ Passed</span>
                      <div className="text-xs text-red-500">+25 points earned</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div>
                      <span className="font-semibold text-green-800">Voted 👍 for Mike Torres</span>
                      <div className="text-sm text-green-600">Marketing Lead • 1 month ago</div>
                    </div>
                    <div className="text-right">
                      <span className="text-green-600 font-bold">✅ Hired</span>
                      <div className="text-xs text-green-500">+50 points earned</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Voting Rewards */}
              <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl shadow-xl border border-purple-100 p-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                  Voting Rewards
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-purple-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Voting Accuracy</span>
                      <span className="text-2xl font-bold text-purple-600">85%</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">Your votes matched final hiring decisions</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Points Earned</span>
                      <span className="text-2xl font-bold text-blue-600">1,250</span>
                    </div>
                    <div className="text-sm text-gray-600">Total from all voting activities</div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <div className="font-semibold text-orange-800">Hiring Oracle Badge</div>
                        <div className="text-sm text-orange-600">Earned for 80%+ accuracy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NFT Staking Rewards Program */}
        {activeTab === 'staking' && (
          <div className="space-y-8">
            {/* Page Description */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
              <h2 className="text-xl font-bold text-gray-900 mb-2">🔒 NFT Staking Rewards</h2>
              <p className="text-gray-700">
                Stake your Ugly Unicorn NFTs to earn additional voting power and $Minchyn token rewards. 
                The longer you stake, the more rewards you earn. This helps secure the network and shows long-term commitment.
              </p>
            </div>

            {isConnected ? (
              <>
                {/* Premium Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-500 rounded-3xl p-8 text-white">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🔒</span>
                      </div>
                      <h1 className="text-4xl font-bold">NFT Staking Hub</h1>
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <span className="text-2xl">💎</span>
                      </div>
                    </div>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                      Stake your Ugly Unicorns to earn rewards and boost your voting power. 
                      Show your commitment to the Minchyn ecosystem and earn passive income.
                    </p>
                    <div className="mt-6 p-4 bg-green-500/20 backdrop-blur-sm rounded-xl border border-green-300/30">
                      <p className="text-lg font-semibold">🦄 {userNftCount} NFTs Available • 2 Currently Staked</p>
                    </div>
                  </div>
                </div>

                {/* Staking Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="group relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <span className="text-2xl">🔒</span>
                        </div>
                        <div className="text-xs text-blue-600 font-semibold">Active</div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
                      <div className="text-sm text-gray-600 mb-1">NFTs Staked</div>
                      <div className="text-xs text-gray-500">of {userNftCount} total</div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:border-green-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                          <span className="text-2xl">🗳️</span>
                        </div>
                        <div className="text-xs text-green-600 font-semibold">+150% boost</div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{(userVotingPower * 2.5).toLocaleString()}</div>
                      <div className="text-sm text-gray-600 mb-1">Boosted Voting Power</div>
                      <div className="text-xs text-gray-500">from staking rewards</div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-100 rounded-xl">
                          <span className="text-2xl">💰</span>
                        </div>
                        <div className="text-xs text-purple-600 font-semibold">Daily</div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">25</div>
                      <div className="text-sm text-gray-600 mb-1">$MINCHYN / Day</div>
                      <div className="text-xs text-gray-500">per staked NFT</div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden bg-gradient-to-br from-white via-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 hover:border-orange-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-100 rounded-xl">
                          <span className="text-2xl">⏰</span>
                        </div>
                        <div className="text-xs text-orange-600 font-semibold">Average</div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">145</div>
                      <div className="text-sm text-gray-600 mb-1">Days Staked</div>
                      <div className="text-xs text-gray-500">earning rewards</div>
                    </div>
                  </div>
                </div>

                {/* Staking Pools */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Available NFTs */}
                  <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-2xl shadow-xl border border-gray-100 p-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                      Your NFTs
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                              <span className="text-white text-2xl font-bold">🦄</span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Ugly Unicorn #1247</div>
                              <div className="text-sm text-gray-600">Available to stake</div>
                              <div className="text-xs text-blue-600">+25 $MINCHYN/day</div>
                            </div>
                          </div>
                          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-semibold">
                            Stake Now
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center relative">
                              <span className="text-white text-2xl font-bold">🦄</span>
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">🔒</span>
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Ugly Unicorn #856</div>
                              <div className="text-sm text-green-600">Staked for 120 days</div>
                              <div className="text-xs text-green-600">Earning 25 $MINCHYN/day</div>
                            </div>
                          </div>
                          <Button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-semibold">
                            Unstake
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center relative">
                              <span className="text-white text-2xl font-bold">🦄</span>
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">🔒</span>
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Ugly Unicorn #2134</div>
                              <div className="text-sm text-green-600">Staked for 170 days</div>
                              <div className="text-xs text-green-600">Earning 25 $MINCHYN/day</div>
                            </div>
                          </div>
                          <Button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-semibold">
                            Unstake
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rewards Dashboard */}
                  <div className="bg-gradient-to-br from-white via-gray-50 to-purple-50 rounded-2xl shadow-xl border border-gray-100 p-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                      Rewards Dashboard
                    </h2>
                    
                    <div className="space-y-6">
                      {/* Claimable Rewards */}
                      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-2xl font-bold text-green-800">7,250 $MINCHYN</div>
                            <div className="text-sm text-green-600">Claimable Rewards</div>
                          </div>
                          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold">
                            Claim All
                          </Button>
                        </div>
                        <div className="text-xs text-green-600">≈ $145 USD at current rates</div>
                      </div>
                      
                      {/* Staking Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                          <div className="text-xl font-bold text-gray-900">50 $MINCHYN</div>
                          <div className="text-sm text-gray-600">Daily Earnings</div>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                          <div className="text-xl font-bold text-gray-900">18.25%</div>
                          <div className="text-sm text-gray-600">Annual APY</div>
                        </div>
                      </div>
                      
                      {/* Voting Power Boost */}
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">Voting Power Multiplier</span>
                          <span className="text-2xl font-bold text-blue-600">2.5x</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{width: '83%'}}></div>
                        </div>
                        <div className="text-sm text-gray-600">Next tier at 200 days: 3.0x multiplier</div>
                      </div>
                      
                      {/* Achievements */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Staking Achievements</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                            <span className="text-green-600">🏆</span>
                            <span className="text-sm font-medium text-green-800">Long-term Staker</span>
                          </div>
                          <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                            <span className="text-blue-600">💎</span>
                            <span className="text-sm font-medium text-blue-800">Diamond Hands</span>
                          </div>
                          <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                            <span className="text-gray-400">🚀</span>
                            <span className="text-sm text-gray-600">Whale Staker (Locked)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Staking Information */}
                <div className="bg-gradient-to-br from-white via-gray-50 to-yellow-50 rounded-2xl shadow-xl border border-gray-100 p-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
                    How NFT Staking Works
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">🔒</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">1. Stake Your NFTs</h3>
                      <p className="text-gray-600 text-sm">
                        Lock your Ugly Unicorn NFTs in our secure staking contract. You maintain ownership while earning rewards.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">💰</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">2. Earn Rewards</h3>
                      <p className="text-gray-600 text-sm">
                        Receive daily $MINCHYN tokens and increased voting power. Longer staking periods unlock higher multipliers.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">🗳️</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">3. Boost Governance</h3>
                      <p className="text-gray-600 text-sm">
                        Use your enhanced voting power in hiring decisions and proposal governance. Your voice matters more.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12 max-w-2xl mx-auto">
                  <div className="text-6xl mb-6">🔐</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect Wallet to Stake</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Connect your wallet to start staking your Ugly Unicorn NFTs and earning $MINCHYN token rewards.
                  </p>
                  <Button
                    onClick={connectWallet}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Connect Wallet to Stake
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Equity Tracking Dashboard - EXCLUSIVE to NFT Holders */}
        {activeTab === 'equity' && (
          <div className="space-y-8">
            {/* Legal Disclaimer Banner */}
            <QuickLegalBanner type="equity" />
            
            {isConnected ? (
              <>
                {/* Premium Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-red-500 rounded-3xl p-8 text-white">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <span className="text-2xl">📈</span>
                      </div>
                      <h1 className="text-4xl font-bold">Equity Portfolio</h1>
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <span className="text-2xl">💎</span>
                      </div>
                    </div>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                      Track your gifted equity shares earned through Ugly Unicorn NFT ownership. 
                      These represent claimable equity ownership in Minchyn after 4-year vesting. Qualified Holders only.
                    </p>
                    <div className="mt-6 p-4 bg-green-500/20 backdrop-blur-sm rounded-xl border border-green-300/30">
                      <p className="text-lg font-semibold">✅ NFT Verified - {userNftCount} Ugly Unicorns = {userNftCount * 500} Gifted Shares!</p>
                      <p className="text-sm text-white/80 mt-1">*Claimable after 4-year vesting period by Qualified Holders only</p>
                    </div>
                  </div>
                </div>

                {/* Equity Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="group relative overflow-hidden bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 hover:border-amber-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-amber-100 rounded-xl">
                          <span className="text-2xl">🏢</span>
                        </div>
                        <div className="text-xs text-green-600 font-semibold">Vested</div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{userEquityPercentage.toFixed(4)}%</div>
                      <div className="text-sm text-gray-600 mb-1">Total Equity</div>
                      <div className="text-xs text-gray-500">{userGiftedShares.toLocaleString()} gifted shares</div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:border-green-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                          <span className="text-2xl">💰</span>
                        </div>
                        <div className="text-xs text-green-600 font-semibold">+15.2% ↗</div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">${userEquityValue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 mb-1">Current Value</div>
                      <div className="text-xs text-gray-500">≈ $50M valuation</div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <span className="text-2xl">⏰</span>
                        </div>
                        <div className="text-xs text-blue-600 font-semibold">25% vested</div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{Math.floor(userGiftedShares * 0.25).toLocaleString()}</div>
                      <div className="text-sm text-gray-600 mb-1">Vested Shares</div>
                      <div className="text-xs text-gray-500">{Math.floor(userGiftedShares * 0.75).toLocaleString()} remaining</div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-100 rounded-xl">
                          <span className="text-2xl">📅</span>
                        </div>
                        <div className="text-xs text-purple-600 font-semibold">36 months</div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">75%</div>
                      <div className="text-sm text-gray-600 mb-1">Remaining</div>
                      <div className="text-xs text-gray-500">To vest</div>
                    </div>
                  </div>
                </div>

                {/* Dilution & Ownership Analysis */}
                <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-2xl shadow-xl border border-gray-600 p-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
                    📊 Your Position Analysis
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-600">
                      <h3 className="text-xl font-bold text-white mb-4">Your Position Analysis</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Your NFTs:</span>
                          <span className="font-semibold text-white">{userNftCount}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Your Gifted Shares:</span>
                          <span className="font-semibold text-white">{userGiftedShares.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Diluted Ownership:</span>
                          <span className="font-semibold text-green-400">{userEquityPercentage.toFixed(4)}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Current Est. Value:</span>
                          <span className="font-semibold text-blue-400">${userEquityValue.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-600">
                      <h3 className="text-xl font-bold text-white mb-4">Dilution Protection</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <div className="font-semibold text-white">Fixed Share Allocation</div>
                            <div className="text-sm text-gray-300">500 shares per NFT, capped at collection size</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <div className="font-semibold text-white">Transparent Calculation</div>
                            <div className="text-sm text-gray-300">All dilution factors clearly disclosed upfront</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          <div>
                            <div className="font-semibold text-white">Founder Priority</div>
                            <div className="text-sm text-gray-300">Early NFT holders get maximum benefit</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-amber-100 border border-amber-300 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <span className="text-amber-600 text-xl">⚠️</span>
                      <div>
                        <div className="font-semibold text-amber-900">Important Dilution Disclosure</div>
                        <div className="text-sm text-amber-800 mt-1">
                          Your ownership percentage is calculated based on fully diluted shares (305,000,000 total) 
                          assuming all {TOTAL_NFT_COLLECTION_SIZE.toLocaleString()} NFTs are eventually minted. 
                          Your actual percentage may be higher if fewer NFTs are minted.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vesting Schedule */}
                <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-2xl shadow-xl border border-gray-100 p-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                    Vesting Schedule
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-semibold text-gray-900">Vesting Progress</span>
                          <span className="text-2xl font-bold text-blue-600">25%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full shadow-sm" style={{width: '25%'}}></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <span>Started: Jan 2024</span>
                          <span>Completion: Jan 2028</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-green-800">Year 1 (Complete)</div>
                              <div className="text-sm text-green-600">{Math.floor((userNftCount * 500) * 0.25)} gifted shares vested</div>
                            </div>
                            <div className="text-green-600 font-bold">✅ 100%</div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-blue-800">Year 2 (Current)</div>
                              <div className="text-sm text-blue-600">{Math.floor((userNftCount * 500) * 0.0625)} of {Math.floor((userNftCount * 500) * 0.25)} shares vested</div>
                            </div>
                            <div className="text-blue-600 font-bold">25%</div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-gray-800">Year 3 (Pending)</div>
                              <div className="text-sm text-gray-600">{Math.floor((userNftCount * 500) * 0.25)} gifted shares to vest</div>
                            </div>
                            <div className="text-gray-600 font-bold">0%</div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-gray-800">Year 4 (Pending)</div>
                              <div className="text-sm text-gray-600">{Math.floor((userNftCount * 500) * 0.25)} gifted shares to vest</div>
                            </div>
                            <div className="text-gray-600 font-bold">0%</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Value Growth Timeline</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-700 rounded-xl border border-gray-600 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-white">Seed Round (Jan 2024)</span>
                            <span className="text-lg font-bold text-gray-300">$10M</span>
                          </div>
                          <div className="text-sm text-gray-300">Your equity worth: ${((userGiftedShares / totalDilutedShares) * 10000000).toFixed(0)}</div>
                        </div>
                        
                        <div className="p-4 bg-gray-700 rounded-xl border border-blue-500 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-white">Series A (Expected Q1 2025)</span>
                            <span className="text-lg font-bold text-blue-400">$40M</span>
                          </div>
                          <div className="text-sm text-blue-300">Projected equity worth: ${((userGiftedShares / totalDilutedShares) * 40000000).toFixed(0)}</div>
                        </div>
                        
                        <div className="p-4 bg-green-900/30 rounded-xl border border-green-500">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-green-300">Current Valuation</span>
                            <span className="text-lg font-bold text-green-400">$50M</span>
                          </div>
                          <div className="text-sm text-green-300">Your equity worth: ${((userGiftedShares / totalDilutedShares) * 50000000).toFixed(0)}</div>
                        </div>
                        
                        <div className="p-4 bg-purple-900/30 rounded-xl border border-purple-500">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-purple-300">IPO Target (2027)</span>
                            <span className="text-lg font-bold text-purple-400">$1B+</span>
                          </div>
                          <div className="text-sm text-purple-300">Projected equity worth: ${((userGiftedShares / totalDilutedShares) * 1000000000).toLocaleString()}+</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Equity Events */}
                <div className="bg-gradient-to-br from-white via-gray-50 to-purple-50 rounded-2xl shadow-xl border border-gray-100 p-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                    Recent Equity Events
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <span className="text-green-600 text-xl">📈</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-green-800">Quarterly Vesting Event</div>
                        <div className="text-sm text-green-600">{Math.floor((userNftCount * 500) * 0.0625)} gifted shares vested • ${((userNftCount * 500) * 0.0625 / 1000000 * 50000000).toLocaleString()} current value</div>
                        <div className="text-xs text-green-500">October 1, 2024</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <span className="text-blue-600 text-xl">💰</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-blue-800">Valuation Update</div>
                        <div className="text-sm text-blue-600">Company valued at $50M (+25% growth)</div>
                        <div className="text-xs text-blue-500">September 15, 2024</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-purple-50 border border-purple-200 rounded-xl">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <span className="text-purple-600 text-xl">🎁</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-purple-800">NFT Holder Appreciation Gift</div>
                        <div className="text-sm text-purple-600">{userNftCount * 500} gifted shares granted for early support (not a purchase)</div>
                        <div className="text-xs text-purple-500">January 15, 2024</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12 max-w-2xl mx-auto">
                  <div className="text-6xl mb-6">🔐</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">NFT Verification Required</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Equity tracking is exclusively available to Ugly Unicorn NFT holders. 
                    Connect your wallet to verify your NFT ownership and access your equity portfolio.
                  </p>
                  <Button
                    onClick={connectWallet}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Connect Wallet to View Equity
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Founder Benefits Dashboard - EXCLUSIVE to NFT Holders */}
        {activeTab === 'benefits' && (
          <div className="space-y-8">
            {/* Page Description */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <h2 className="text-xl font-bold text-gray-900 mb-2">🎁 Founder Benefits</h2>
              <p className="text-gray-700">
                Exclusive perks and benefits for Ugly Unicorn NFT holders. Access early features, special events, 
                merchandise, and priority support as a founding member of the Minchyn ecosystem.
              </p>
            </div>

            {isConnected ? (
              <>
                {/* Premium Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-red-500 rounded-3xl p-8 text-white">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🎁</span>
                      </div>
                      <h1 className="text-4xl font-bold">Exclusive Founder Benefits</h1>
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <span className="text-2xl">⭐</span>
                      </div>
                    </div>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                      Your NFT unlocks premium benefits and early access to Minchyn features.
                    </p>
                    <div className="mt-6 p-4 bg-yellow-500/20 backdrop-blur-sm rounded-xl border border-yellow-300/30">
                      <p className="text-lg font-semibold">🦄 {userNftCount} NFTs = {userNftCount * 500} Gifted Shares + Premium Access</p>
                    </div>
                  </div>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-2xl shadow-xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-green-100 rounded-xl">
                        <span className="text-2xl">🎫</span>
                      </div>
                      <div className="text-xs text-green-600 font-semibold">ACTIVE</div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Festival VIP Access</h3>
                    <p className="text-gray-600 text-sm mb-3">Priority tickets to Minchyn events and tech conferences</p>
                    <div className="text-xs text-green-600">Next event: Web3 Summit 2024</div>
                  </div>

                  <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl shadow-xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <span className="text-2xl">👕</span>
                      </div>
                      <div className="text-xs text-purple-600 font-semibold">LIMITED</div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Exclusive Merch</h3>
                    <p className="text-gray-600 text-sm mb-3">Limited edition Minchyn founder merchandise and collectibles</p>
                    <div className="text-xs text-purple-600">Q1 2024 collection available</div>
                  </div>

                  <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <span className="text-2xl">💰</span>
                      </div>
                      <div className="text-xs text-blue-600 font-semibold">EARNED</div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Token Allocation</h3>
                    <p className="text-gray-600 text-sm mb-3">Early $MINCHYN token allocation and staking rewards</p>
                    <div className="text-xs text-blue-600">{userNftCount * 10000} tokens allocated</div>
                  </div>

                  <div className="bg-gradient-to-br from-white via-orange-50 to-red-50 rounded-2xl shadow-xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-orange-100 rounded-xl">
                        <span className="text-2xl">🚀</span>
                      </div>
                      <div className="text-xs text-orange-600 font-semibold">COMING</div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Early Access</h3>
                    <p className="text-gray-600 text-sm mb-3">Beta access to new features and platform updates</p>
                    <div className="text-xs text-orange-600">Next feature: Mobile app</div>
                  </div>

                  <div className="bg-gradient-to-br from-white via-gray-50 to-slate-50 rounded-2xl shadow-xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gray-100 rounded-xl">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">PRIORITY</div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Support Access</h3>
                    <p className="text-gray-600 text-sm mb-3">Priority customer support and direct founder contact</p>
                    <div className="text-xs text-gray-600">24/7 premium support</div>
                  </div>

                  <div className="bg-gradient-to-br from-white via-yellow-50 to-amber-50 rounded-2xl shadow-xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-yellow-100 rounded-xl">
                        <span className="text-2xl">🏆</span>
                      </div>
                      <div className="text-xs text-yellow-600 font-semibold">EXCLUSIVE</div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Founder Status</h3>
                    <p className="text-gray-600 text-sm mb-3">Permanent recognition as a founding member</p>
                    <div className="text-xs text-yellow-600">Forever honored</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12 max-w-2xl mx-auto">
                  <div className="text-6xl mb-6">🔐</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect Wallet for Benefits</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Connect your wallet to access exclusive founder benefits and perks.
                  </p>
                  <Button
                    onClick={connectWallet}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl text-lg font-semibold"
                  >
                    Connect Wallet to View Benefits
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Networking Hub - EXCLUSIVE to NFT Holders */}
        {activeTab === 'network' && (
          <div className="space-y-8">
            {/* Page Description */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200">
              <h2 className="text-xl font-bold text-gray-900 mb-2">🤝 Founder Network</h2>
              <p className="text-gray-700">
                Connect with fellow founding members, collaborate on projects, and build partnerships within the 
                Minchyn ecosystem. Share ideas, find co-founders, and grow together.
              </p>
            </div>

            {isConnected ? (
              <>
                {/* Premium Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-500 rounded-3xl p-8 text-white">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🤝</span>
                      </div>
                      <h1 className="text-4xl font-bold">Founder Network</h1>
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🌐</span>
                      </div>
                    </div>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                      Connect, collaborate, and build the future together with fellow founders.
                    </p>
                    <div className="mt-6 p-4 bg-blue-500/20 backdrop-blur-sm rounded-xl border border-blue-300/30">
                      <p className="text-lg font-semibold">🦄 {userNftCount * 150} Active Connections • 45 Online Now</p>
                    </div>
                  </div>
                </div>

                {/* Networking Features */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Member Directory */}
                  <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-2xl shadow-xl border border-gray-100 p-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                      Founder Directory
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">AS</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Alex Smith</div>
                            <div className="text-sm text-gray-600">Full-stack Developer</div>
                            <div className="text-xs text-green-600">🟢 Online</div>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-2 rounded-xl">
                          Connect
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">MJ</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Maria Johnson</div>
                            <div className="text-sm text-gray-600">Marketing Expert</div>
                            <div className="text-xs text-gray-500">🔴 2 hours ago</div>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-2 rounded-xl">
                          Connect
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">DL</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">David Lee</div>
                            <div className="text-sm text-gray-600">Blockchain Engineer</div>
                            <div className="text-xs text-green-600">🟢 Online</div>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-2 rounded-xl">
                          Connect
                        </Button>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-6 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-3 rounded-xl">
                      View All 450+ Members
                    </Button>
                  </div>

                  {/* Collaboration Hub */}
                  <div className="bg-gradient-to-br from-white via-gray-50 to-purple-50 rounded-2xl shadow-xl border border-gray-100 p-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                      Active Projects
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">DeFi Analytics Tool</h3>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Seeking: Frontend Dev</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Building advanced DeFi analytics dashboard with real-time data</p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-purple-600">By Alex & Maria • 3 days ago</div>
                          <Button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-sm">
                            Join Project
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">NFT Marketplace</h3>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Seeking: Designer</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Creating next-gen NFT marketplace with social features</p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-blue-600">By David • 1 week ago</div>
                          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                            Join Project
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">Web3 Education Platform</h3>
                          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Seeking: Content Creator</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Educational platform teaching Web3 concepts to beginners</p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-green-600">By Community • 5 days ago</div>
                          <Button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
                            Join Project
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-xl">
                      Start New Project
                    </Button>
                  </div>
                </div>

                {/* Networking Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">450+</div>
                      <div className="text-sm text-gray-600">Total Members</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">24</div>
                      <div className="text-sm text-gray-600">Active Projects</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">89</div>
                      <div className="text-sm text-gray-600">Collaborations</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">45</div>
                      <div className="text-sm text-gray-600">Online Now</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12 max-w-2xl mx-auto">
                  <div className="text-6xl mb-6">🔐</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect Wallet to Network</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Connect your wallet to access the exclusive founder network and collaboration features.
                  </p>
                  <Button
                    onClick={connectWallet}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold"
                  >
                    Connect Wallet to Network
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Administrator Dashboard - ADMIN ONLY */}
        {activeTab === 'admin' && isAdmin && (
          <div className="space-y-8">
            {/* Page Description */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
              <h2 className="text-xl font-bold text-gray-900 mb-2">⚡ Administrator Dashboard</h2>
              <p className="text-gray-700">
                Admin-only access to manage platform data, review candidates, moderate community, and update key metrics. 
                Use this dashboard to maintain the platform and support the growing founder community.
              </p>
            </div>

            {/* Premium Admin Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-orange-600 to-amber-500 rounded-3xl p-8 text-white">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h1 className="text-4xl font-bold">Admin Control Center</h1>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🔧</span>
                  </div>
                </div>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Manage and maintain the Minchyn FMC platform.
                </p>
                <div className="mt-6 p-4 bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-300/30">
                  <p className="text-lg font-semibold">🔐 Administrative Access • Full Platform Control</p>
                </div>
              </div>
            </div>

            {/* Admin Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-xl">👥</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">User Management</h3>
                  <p className="text-sm text-gray-600">Manage members, roles, and permissions</p>
                </div>
              </button>

              <button className="group p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 hover:border-green-400 transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-xl">💼</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Job Management</h3>
                  <p className="text-sm text-gray-600">Add jobs, review applications</p>
                </div>
              </button>

              <button className="group p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 hover:border-purple-400 transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-xl">💰</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Equity Updates</h3>
                  <p className="text-sm text-gray-600">Update valuations and calculations</p>
                </div>
              </button>

              <button className="group p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200 hover:border-orange-400 transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-xl">📊</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Analytics</h3>
                  <p className="text-sm text-gray-600">Platform metrics and insights</p>
                </div>
              </button>
            </div>

            {/* Admin Management Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Job Posting Management */}
              <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                  💼 Job Management
                </h2>
                
                <div className="space-y-4 mb-6">
                  <button className="w-full p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors">
                    + Add New Job Posting
                  </button>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">Senior Frontend Developer</h4>
                          <p className="text-sm text-gray-600">Posted 2 days ago • 12 applications</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm">Edit</button>
                          <button className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm">Close</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">Product Marketing Manager</h4>
                          <p className="text-sm text-gray-600">Posted 5 days ago • 8 applications</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm">Edit</button>
                          <button className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Candidate Review */}
              <div className="bg-gradient-to-br from-white via-gray-50 to-green-50 rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                  👔 Candidate Review
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">JS</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">John Smith</h4>
                          <p className="text-sm text-gray-600">Applied for Frontend Developer</p>
                        </div>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending Review</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm">Approve for Vote</button>
                      <button className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm">Reject</button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">MJ</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Maria Johnson</h4>
                          <p className="text-sm text-gray-600">Applied for Marketing Manager</p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">In Community Vote</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Community voting ends in 3 days • Current: 78% approval
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Metrics & Settings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Equity Management */}
              <div className="bg-gradient-to-br from-white via-gray-50 to-amber-50 rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-6">
                  💰 Equity Management
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Valuation ($)</label>
                      <input 
                        type="text" 
                        value="50,000,000" 
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Outstanding Shares</label>
                      <input 
                        type="text" 
                        value="300,000,000" 
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white rounded-xl border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Current Metrics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">NFTs Minted:</span>
                        <span className="ml-2 font-semibold">3,247 / 10,000</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Shares Allocated:</span>
                        <span className="ml-2 font-semibold">1,623,500</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Dilution:</span>
                        <span className="ml-2 font-semibold">0.54%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Share Value:</span>
                        <span className="ml-2 font-semibold">$0.165</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full p-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold">
                    Update Valuation & Metrics
                  </button>
                </div>
              </div>

              {/* Platform Analytics */}
              <div className="bg-gradient-to-br from-white via-gray-50 to-purple-50 rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                  📊 Platform Analytics
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-gray-200 text-center">
                      <div className="text-2xl font-bold text-purple-600">1,247</div>
                      <div className="text-sm text-gray-600">Active Members</div>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-200 text-center">
                      <div className="text-2xl font-bold text-green-600">89%</div>
                      <div className="text-sm text-gray-600">Engagement Rate</div>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-200 text-center">
                      <div className="text-2xl font-bold text-blue-600">156</div>
                      <div className="text-sm text-gray-600">Daily Active</div>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-200 text-center">
                      <div className="text-2xl font-bold text-orange-600">24</div>
                      <div className="text-sm text-gray-600">Open Positions</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white rounded-xl border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">New NFT mints today:</span>
                        <span className="font-semibold">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Governance votes:</span>
                        <span className="font-semibold">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Job applications:</span>
                        <span className="font-semibold">42</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Community posts:</span>
                        <span className="font-semibold">89</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold">
                    View Detailed Analytics
                  </button>
                </div>
              </div>
            </div>

            {/* System Tools */}
            <div className="bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 rounded-2xl shadow-xl border border-gray-200 p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-slate-700 bg-clip-text text-transparent mb-6">
                🔧 System Tools & Maintenance
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-xl">🔄</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Data Sync</h3>
                  <p className="text-sm text-gray-600 mb-4">Sync blockchain data and update metrics</p>
                  <button className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm">
                    Run Sync
                  </button>
                </div>
                
                <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-xl">📁</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Export Data</h3>
                  <p className="text-sm text-gray-600 mb-4">Export platform data for analysis</p>
                  <button className="w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm">
                    Export
                  </button>
                </div>
                
                <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-xl">⚙️</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Settings</h3>
                  <p className="text-sm text-gray-600 mb-4">Configure platform settings</p>
                  <button className="w-full p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm">
                    Configure
                  </button>
                </div>
              </div>
            </div>

            {/* Campaign Management Section */}
            <div className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 rounded-2xl shadow-xl border border-purple-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    💰 Crowdfunding Campaign Management
                  </h2>
                  <p className="text-gray-600 text-lg">Create and manage funding campaigns for DAO initiatives</p>
                </div>
                <Button
                  onClick={() => setShowAddCampaignModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add New Campaign
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-6 border border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-3 h-3 rounded-full ${campaign.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <h4 className="text-lg font-bold text-gray-900">{campaign.title}</h4>
                        </div>
                        <p className="text-gray-600 mb-4">{campaign.description}</p>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold text-gray-900">
                              ${campaign.currentAmount.toLocaleString()} / ${campaign.targetAmount.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{width: `${Math.min((campaign.currentAmount / campaign.targetAmount) * 100, 100)}%`}}
                            ></div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-purple-600 font-semibold">
                              {Math.round((campaign.currentAmount / campaign.targetAmount) * 100)}% funded
                            </span>
                            <span className="text-gray-600">
                              {Math.ceil((campaign.deadline - Date.now()) / (24 * 60 * 60 * 1000))} days left
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge 
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          campaign.category === 'hiring' ? 'bg-green-100 text-green-800' :
                          campaign.category === 'marketing' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {campaign.category === 'hiring' ? '👥 Hiring' :
                         campaign.category === 'marketing' ? '📢 Marketing' :
                         '🔧 Development'}
                      </Badge>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          className="px-4 py-2 text-sm"
                          onClick={() => {
                            console.log('Edit campaign:', campaign.id);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm"
                          onClick={() => {
                            console.log('View campaign details:', campaign.id);
                          }}
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Proposal Detail Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant={getProposalStatusColor(selectedProposal.status)}>
                      {selectedProposal.status}
                    </Badge>
                    <Badge variant="default">{selectedProposal.category}</Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProposal.title}</h2>
                  <p className="text-gray-600 mt-1">
                    Proposed by {formatAddress(selectedProposal.proposer)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProposal(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedProposal.description}</p>
              </div>

              {selectedProposal.status === 'active' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Voting</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Progress
                        value={selectedProposal.votesFor}
                        max={selectedProposal.votesFor + selectedProposal.votesAgainst}
                        color="green"
                        showLabel={true}
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">For: {selectedProposal.votesFor.toLocaleString()}</span>
                        <span className="text-red-600">Against: {selectedProposal.votesAgainst.toLocaleString()}</span>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          Quorum: {selectedProposal.currentQuorum.toLocaleString()} / {selectedProposal.quorumRequired.toLocaleString()}
                        </p>
                        <p className="text-sm font-medium text-blue-600">
                          {formatTimeRemaining(selectedProposal.endTime)} remaining
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button
                        onClick={() => handleVoteOnProposal(selectedProposal.id, 'for')}
                        variant="success"
                        size="lg"
                        className="w-full flex items-center justify-center space-x-2"
                        disabled={!isConnected}
                      >
                        <CheckIcon />
                        <span>Vote For</span>
                      </Button>
                      <Button
                        onClick={() => handleVoteOnProposal(selectedProposal.id, 'against')}
                        variant="danger"
                        size="lg"
                        className="w-full flex items-center justify-center space-x-2"
                        disabled={!isConnected}
                      >
                        <XIcon />
                        <span>Vote Against</span>
                      </Button>
                      {!isConnected && (
                        <p className="text-center text-sm text-gray-500">
                          Connect wallet to vote
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {selectedProposal.status !== 'active' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Final Results</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Final vote:</span>
                      <span className="font-medium">
                        {selectedProposal.votesFor.toLocaleString()} for, {selectedProposal.votesAgainst.toLocaleString()} against
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Proposal Modal */}
      {showCreateProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Create Proposal</h2>
                <button
                  onClick={() => setShowCreateProposal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter proposal title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="treasury">Treasury</option>
                  <option value="governance">Governance</option>
                  <option value="membership">Membership</option>
                  <option value="technical">Technical</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your proposal in detail"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateProposal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowCreateProposal(false)}
                  className="flex-1"
                  disabled={!isConnected}
                >
                  Create Proposal
                </Button>
              </div>
              
              {!isConnected && (
                <p className="text-center text-sm text-gray-500">
                  Connect wallet to create proposals
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LinkedIn Application Modal */}
      {showLinkedInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">💼</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Apply with LinkedIn</h2>
                    <p className="text-sm text-gray-600">{selectedJob}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLinkedInModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isSubmitting}
                >
                  <XIcon />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {applicationStatus === 'idle' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile *
                    </label>
                    <input
                      type="text"
                      value={linkedInProfile}
                      onChange={(e) => setLinkedInProfile(e.target.value)}
                      placeholder="Enter your LinkedIn username or URL"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Examples: "john-smith" or "https://linkedin.com/in/john-smith"
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-blue-900 mb-2">🦄 NFT Holder Benefits</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Priority review by hiring team</li>
                      <li>• Direct access to hiring managers</li>
                      <li>• Exclusive founder member status</li>
                      <li>• Enhanced equity package consideration</li>
                    </ul>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => setShowLinkedInModal(false)}
                      variant="outline"
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={submitLinkedInApplication}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={isSubmitting || !applicantName.trim() || !linkedInProfile.trim()}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  </div>
                </>
              )}

              {applicationStatus === 'success' && (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Application Submitted!</h3>
                  <p className="text-gray-600 mb-4">
                    Your application for <strong>{selectedJob}</strong> has been received. 
                    Our hiring team will review your LinkedIn profile and get back to you soon.
                  </p>
                  <div className="bg-green-50 rounded-xl p-3">
                    <p className="text-sm text-green-800">
                      ✨ As an NFT holder, your application will receive priority review!
                    </p>
                  </div>
                </div>
              )}

              {applicationStatus === 'error' && (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XIcon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Application Failed</h3>
                  <p className="text-gray-600 mb-4">
                    There was an error submitting your application. Please try again.
                  </p>
                  <Button
                    onClick={() => setApplicationStatus('idle')}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Campaign Modal */}
      {showAddCampaignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Add New Campaign</h2>
                <button
                  onClick={() => setShowAddCampaignModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter campaign title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the campaign goals and purpose"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Amount ($) *
                  </label>
                  <input
                    type="number"
                    placeholder="50000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">Select category</option>
                    <option value="hiring">👥 Hiring</option>
                    <option value="marketing">📢 Marketing</option>
                    <option value="development">🔧 Development</option>
                    <option value="operations">⚙️ Operations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Duration *
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="">Select duration</option>
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>

              <div className="bg-purple-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-purple-900 mb-2">📋 Campaign Guidelines</h3>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Campaigns must align with DAO objectives</li>
                  <li>• Funding goals should be realistic and justified</li>
                  <li>• Regular progress updates are required</li>
                  <li>• Community voting determines final approval</li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={() => setShowAddCampaignModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // In a real app, this would create the campaign
                    console.log('Creating new campaign');
                    setShowAddCampaignModal(false);
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Create Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legal Footer */}
      <LegalFooter />

      {/* Legal Disclaimer Modal */}
      <LegalDisclaimerModal
        isOpen={showLegalDisclaimer}
        onClose={() => setShowLegalDisclaimer(false)}
        onAccept={() => setShowLegalDisclaimer(false)}
        type={legalDisclaimerType}
      />
    </div>
  );
}