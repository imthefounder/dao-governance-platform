'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { 
  WalletIcon, 
  ExternalLinkIcon,
  CheckIcon,
  XIcon,
  ArrowUpIcon
} from '../ui/Icons';

interface NFTMintingProps {
  isConnected: boolean;
  userAddress?: string;
  userBalance: number;
}

interface MintConfig {
  maxSupply: number;
  totalMinted: number;
  price: number;
  maxPerWallet: number;
  mintEnabled: boolean;
  allowListMintEnabled: boolean;
  userMinted: number;
  isAllowListed: boolean;
}

export function NFTMinting({ isConnected, userAddress, userBalance }: NFTMintingProps) {
  const [mintAmount, setMintAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string>('');
  
  // Mock contract data - in a real app, this would come from blockchain
  const [mintConfig] = useState<MintConfig>({
    maxSupply: 22222,
    totalMinted: 8945,
    price: 0.2, // ETH
    maxPerWallet: 61,
    mintEnabled: true,
    allowListMintEnabled: true,
    userMinted: 2,
    isAllowListed: true
  });

  const [userNFTs] = useState([
    {
      tokenId: 1234,
      image: '/api/placeholder/300/300',
      name: 'Ugly Unicorn #1234',
      rarity: 'Legendary',
      traits: [
        { trait: 'Background', value: 'Cosmic Purple' },
        { trait: 'Body', value: 'Golden' },
        { trait: 'Horn', value: 'Crystal' },
        { trait: 'Eyes', value: 'Laser' },
        { trait: 'Accessory', value: 'Crown' }
      ]
    },
    {
      tokenId: 5678,
      image: '/api/placeholder/300/300',
      name: 'Ugly Unicorn #5678',
      rarity: 'Rare',
      traits: [
        { trait: 'Background', value: 'Forest Green' },
        { trait: 'Body', value: 'Rainbow' },
        { trait: 'Horn', value: 'Twisted' },
        { trait: 'Eyes', value: 'Sleepy' },
        { trait: 'Accessory', value: 'Bow Tie' }
      ]
    }
  ]);

  const remainingSupply = mintConfig.maxSupply - mintConfig.totalMinted;
  const mintProgress = (mintConfig.totalMinted / mintConfig.maxSupply) * 100;
  const totalCost = mintAmount * mintConfig.price;
  const canMint = isConnected && 
                  mintConfig.mintEnabled && 
                  mintAmount > 0 && 
                  mintAmount <= Math.min(10, mintConfig.maxPerWallet - mintConfig.userMinted) &&
                  userBalance >= totalCost;

  const handleMint = async () => {
    if (!canMint) return;
    
    setIsMinting(true);
    setMintStatus('idle');
    
    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate transaction hash
      setTxHash('0x' + Math.random().toString(16).substr(2, 64));
      setMintStatus('success');
    } catch (error) {
      setMintStatus('error');
    } finally {
      setIsMinting(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      case 'uncommon': return 'from-green-400 to-emerald-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🦄 Ugly Unicorns NFT Collection</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Join the founding members club and mint your Ugly Unicorn NFT! Each NFT grants you voting power, 
          exclusive perks, and access to the future of our DAO ecosystem.
        </p>
      </div>

      {/* Collection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{mintConfig.totalMinted.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Minted</div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{remainingSupply.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{mintConfig.price} ETH</div>
            <div className="text-sm text-gray-600">Mint Price</div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{mintConfig.maxPerWallet}</div>
            <div className="text-sm text-gray-600">Max per Wallet</div>
          </div>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="p-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Collection Progress</h3>
            <span className="text-sm text-gray-600">{mintProgress.toFixed(1)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${mintProgress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            {mintConfig.totalMinted.toLocaleString()} / {mintConfig.maxSupply.toLocaleString()} minted
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Minting Interface */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Mint Your Ugly Unicorn</h3>
          
          {!isConnected ? (
            <div className="text-center py-8">
              <WalletIcon className="mx-auto w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">Connect your wallet to start minting</p>
              <Button variant="primary" className="flex items-center space-x-2 mx-auto">
                <WalletIcon />
                <span>Connect Wallet</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* User Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Your Minted NFTs</div>
                  <div className="text-sm text-gray-600">{mintConfig.userMinted} / {mintConfig.maxPerWallet}</div>
                </div>
                {mintConfig.isAllowListed && (
                  <Badge variant="success" className="flex items-center space-x-1">
                    <CheckIcon className="w-3 h-3" />
                    <span>Allow Listed</span>
                  </Badge>
                )}
              </div>

              {/* Mint Amount Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity to Mint
                </label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMintAmount(Math.max(1, mintAmount - 1))}
                    disabled={mintAmount <= 1}
                  >
                    -
                  </Button>
                  <span className="w-16 text-center font-mono text-lg">{mintAmount}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMintAmount(Math.min(10, mintConfig.maxPerWallet - mintConfig.userMinted, mintAmount + 1))}
                    disabled={mintAmount >= Math.min(10, mintConfig.maxPerWallet - mintConfig.userMinted)}
                  >
                    +
                  </Button>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Max {Math.min(10, mintConfig.maxPerWallet - mintConfig.userMinted)} per transaction
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2 p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between">
                  <span>Price per NFT:</span>
                  <span className="font-mono">{mintConfig.price} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-mono">{mintAmount}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-blue-200 pt-2">
                  <span>Total Cost:</span>
                  <span className="font-mono">{totalCost.toFixed(4)} ETH</span>
                </div>
                <div className="text-sm text-gray-600">
                  Your balance: {userBalance.toFixed(4)} ETH
                </div>
              </div>

              {/* Mint Button */}
              <Button
                variant={canMint ? "primary" : "secondary"}
                size="lg"
                className="w-full"
                onClick={handleMint}
                disabled={!canMint || isMinting}
              >
                {isMinting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Minting...</span>
                  </div>
                ) : (
                  `Mint ${mintAmount} Ugly Unicorn${mintAmount > 1 ? 's' : ''}`
                )}
              </Button>

              {/* Status Messages */}
              {mintStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckIcon className="w-5 h-5" />
                    <span className="font-medium">Mint Successful!</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">
                    Your NFT{mintAmount > 1 ? 's have' : ' has'} been minted successfully.
                  </p>
                  {txHash && (
                    <a
                      href={`https://etherscan.io/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm mt-2"
                    >
                      <span>View on Etherscan</span>
                      <ExternalLinkIcon className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}

              {mintStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-red-700">
                    <XIcon className="w-5 h-5" />
                    <span className="font-medium">Mint Failed</span>
                  </div>
                  <p className="text-red-600 text-sm mt-1">
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}

              {!mintConfig.mintEnabled && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    Public minting is currently paused. Check back later!
                  </p>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Your NFTs */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Your Ugly Unicorns</h3>
          
          {!isConnected ? (
            <div className="text-center py-8 text-gray-500">
              Connect wallet to view your NFTs
            </div>
          ) : userNFTs.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🦄</div>
              <p className="text-gray-600">You don't own any Ugly Unicorns yet</p>
              <p className="text-sm text-gray-500 mt-1">Mint your first one above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userNFTs.map((nft) => (
                <div key={nft.tokenId} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex">
                    <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{nft.name}</h4>
                        <Badge 
                          variant="default"
                          className={`bg-gradient-to-r ${getRarityColor(nft.rarity)} text-white`}
                        >
                          {nft.rarity}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {nft.traits.slice(0, 4).map((trait, index) => (
                          <div key={index} className="text-gray-600">
                            <span className="font-medium">{trait.trait}:</span> {trait.value}
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLinkIcon className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Collection Benefits */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">🎯 NFT Holder Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🗳️</span>
            </div>
            <h4 className="font-semibold mb-2">Enhanced Voting Power</h4>
            <p className="text-sm text-gray-600">
              Each NFT grants additional voting power in DAO governance decisions
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💰</span>
            </div>
            <h4 className="font-semibold mb-2">Treasury Rewards</h4>
            <p className="text-sm text-gray-600">
              Share in treasury distributions and exclusive airdrops
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🏆</span>
            </div>
            <h4 className="font-semibold mb-2">Exclusive Access</h4>
            <p className="text-sm text-gray-600">
              Priority access to events, features, and future collections
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}