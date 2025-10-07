'use client';

// Chain helper functions
export const getChainName = (chainId: number): string => {
  switch (chainId) {
    case 8453:
      return 'Base Mainnet';
    case 84532:
      return 'Base Sepolia';
    default:
      return 'Unknown Chain';
  }
};

export const isChainSupported = (chainId: number): boolean => {
  return chainId === 8453 || chainId === 84532;
};

// Format utilities
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatTokenAmount = (amount: string | number, decimals = 18): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (num === 0) return '0';
  if (num < 0.001) return '< 0.001';
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
  return num.toFixed(3);
};

export const formatEther = (wei: string | number): string => {
  try {
    const value = typeof wei === 'string' ? parseFloat(wei) : wei;
    const ether = value / 1e18;
    return formatTokenAmount(ether);
  } catch {
    return '0';
  }
};

// Date utilities
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDuration = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

// Validation utilities
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const isValidAmount = (amount: string): boolean => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};