import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { XIcon } from '../ui/Icons';

interface LegalDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  type: 'equity' | 'nft' | 'general';
}

export const LegalDisclaimerModal: React.FC<LegalDisclaimerModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  type
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  if (!isOpen) return null;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setHasScrolled(true);
    }
  };

  const getContent = () => {
    switch (type) {
      case 'equity':
        return {
          title: '⚠️ Gifted Shares Legal Disclaimer',
          content: (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-bold text-red-800 mb-2">CRITICAL: THESE ARE NOT REAL SHARES</h3>
                <p className="text-red-700 text-sm">
                  The "gifted shares" on our platform are <strong>APPRECIATION GIFTS ONLY</strong> with 
                  <strong>NO LEGAL RIGHTS OR FINANCIAL VALUE</strong>. This is a <strong>GAMIFICATION SYSTEM</strong> 
                  for community recognition, NOT real equity or securities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ What Gifted "Shares" ARE NOT:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• NOT real equity or ownership</li>
                    <li>• NOT securities or investments</li>
                    <li>• NO legal ownership rights</li>
                    <li>• NO financial value whatsoever</li>
                    <li>• NOT claimable for anything legal</li>
                    <li>• NOT transferable assets</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ What They Actually ARE:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Virtual appreciation gifts</li>
                    <li>• Community recognition tokens</li>
                    <li>• Gamification system features</li>
                    <li>• Platform engagement rewards</li>
                    <li>• Community status indicators</li>
                    <li>• NO legal significance</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">� Gamification System Structure</h4>
                <div className="text-sm text-blue-700 space-y-2">
                  <p><strong>System Purpose:</strong> Community appreciation and engagement tracking</p>
                  <p><strong>Legal Status:</strong> NO legal rights, NO financial value, NO ownership</p>
                  <p><strong>Platform Use:</strong> Recognition and gamification features only</p>
                  <p><strong>Transfer Rights:</strong> NONE - these are non-transferable virtual gifts</p>
                  <p><strong>Financial Value:</strong> ZERO - completely non-monetary appreciation system</p>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">📊 Appreciation Calculation (Virtual Only)</h4>
                <p className="text-purple-700 text-sm mb-2">Recognition percentage calculated using virtual numbers:</p>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• <strong>Virtual Base:</strong> 300,000,000 virtual "shares" (for calculation only)</li>
                  <li>• <strong>NFT Gifts:</strong> 10,000 NFTs × 500 virtual gifts = 5,000,000</li>
                  <li>• <strong>Total Virtual Pool:</strong> 305,000,000 virtual "shares"</li>
                  <li>• <strong>Your Recognition %:</strong> (Your gifts ÷ 305,000,000) × 100</li>
                </ul>
                <p className="text-purple-700 text-sm mt-2 font-medium">
                  This calculation is purely for appreciation tracking with NO legal significance.
                </p>
              </div>
            </div>
          )
        };
        
      case 'nft':
        return {
          title: '🦄 NFT Utility Token Disclaimer',
          content: (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-2">Founding Member NFTs are Utility Tokens</h3>
                <p className="text-blue-700 text-sm">
                  These NFTs provide platform access and benefits, not investment returns or ownership rights.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ What NFTs Provide:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Access to exclusive platform features</li>
                    <li>• Governance participation (advisory only)</li>
                    <li>• Founder benefits and rewards</li>
                    <li>• Community membership privileges</li>
                    <li>• Staking rewards ($MINCHYN utility tokens)</li>
                    <li>• Achievement and gamification access</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ What NFTs Do NOT Provide:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Investment returns or profit sharing</li>
                    <li>• Legal ownership rights in any entity</li>
                    <li>• Guaranteed future value appreciation</li>
                    <li>• Securities or investment contract rights</li>
                    <li>• Rights to company assets or revenue</li>
                    <li>• Transferable equity or ownership stakes</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Risks</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• NFT values may fluctuate in secondary markets</li>
                  <li>• Platform features may change or be discontinued</li>
                  <li>• Technical risks inherent in blockchain technology</li>
                  <li>• No guarantee of continued service availability</li>
                  <li>• Regulatory changes may affect platform operation</li>
                </ul>
              </div>
            </div>
          )
        };
        
      default:
        return {
          title: '📋 General Legal Disclaimer',
          content: (
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-2">Platform Usage Agreement</h3>
                <p className="text-gray-700 text-sm">
                  By using the Minchyn Founding Member Club platform, you acknowledge and agree to these terms.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-800">Service Disclaimer</h4>
                  <p className="text-sm text-gray-600">
                    Platform provided "as is" without warranties. May experience downtime or service interruptions.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-800">User Responsibility</h4>
                  <p className="text-sm text-gray-600">
                    Users responsible for wallet security, legal compliance, and understanding all risks.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-800">Liability Limitation</h4>
                  <p className="text-sm text-gray-600">
                    Platform liability limited to maximum extent permitted by law.
                  </p>
                </div>
              </div>
            </div>
          )
        };
    }
  };

  const { title, content } = getContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div 
          className="flex-1 overflow-y-auto p-6"
          onScroll={handleScroll}
        >
          {content}
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Legal Documentation</h4>
            <p className="text-sm text-gray-600 mb-3">
              For complete legal information, please review our comprehensive documentation:
            </p>
            <div className="flex flex-wrap gap-2">
              <a 
                href="/legal/terms-of-service.md" 
                target="_blank"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Terms of Service
              </a>
              <span className="text-gray-400">|</span>
              <a 
                href="/legal/privacy-policy.md" 
                target="_blank"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Privacy Policy
              </a>
              <span className="text-gray-400">|</span>
              <a 
                href="/legal/legal-disclaimers.md" 
                target="_blank"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Full Legal Disclaimers
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            {!hasScrolled && "Please scroll down to read the complete disclaimer"}
            {hasScrolled && "✓ You have reviewed the complete disclaimer"}
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              onClick={onAccept}
              disabled={!hasScrolled}
              className={`px-6 py-2 ${
                hasScrolled 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              I Understand & Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick disclaimer banner component
export const QuickLegalBanner: React.FC<{ type: 'equity' | 'nft' }> = ({ type }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getContent = () => {
    if (type === 'equity') {
      return {
        icon: '🏛️',
        title: 'Legal Notice: Gifted Equity Shares',
        summary: 'These represent actual equity ownership in Minchyn with 4-year vesting and specific qualification requirements.',
        detail: 'Gifted shares carry legal ownership rights after vesting period completion. Only "Qualified Holders" (original NFT owners who haven\'t claimed) can submit equity claims after 4 years. No voting rights in legal entity, but platform governance participation is advisory.'
      };
    } else {
      return {
        icon: '🦄',
        title: 'NFT Utility Notice',
        summary: 'NFTs provide platform access and benefits - NOT investment returns.',
        detail: 'Founding Member NFTs are utility tokens that grant exclusive features and community access, but do not represent securities or investment contracts.'
      };
    }
  };

  const { icon, title, summary, detail } = getContent();

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <span className="text-xl">{icon}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-yellow-800 mb-1">{title}</h4>
            <p className="text-sm text-yellow-700 mb-2">{summary}</p>
            
            {isExpanded && (
              <p className="text-sm text-yellow-700 mb-3">{detail}</p>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-yellow-600 hover:text-yellow-800 font-medium"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDisclaimerModal;