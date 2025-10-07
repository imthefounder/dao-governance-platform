import React from 'react';

export const LegalFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Critical Legal Notice */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🏛️</span>
              <div>
                <h3 className="text-lg font-bold text-blue-300 mb-2">GIFTED SHARES LEGAL STRUCTURE</h3>
                <p className="text-blue-200 text-sm mb-3">
                  <strong>Gifted "shares" represent actual equity ownership</strong> in Minchyn, Inc. through 
                  Founding Members Club, LLC. These carry legal ownership rights after a 4-year vesting period, 
                  but with specific qualification and claiming requirements.
                </p>
                <div className="flex flex-wrap gap-4 text-xs">
                  <span className="text-green-300">✅ Legal equity ownership</span>
                  <span className="text-yellow-300">⏰ 4-year vesting required</span>
                  <span className="text-orange-300">👥 Qualified Holders only</span>
                  <span className="text-red-300">❌ No voting rights</span>
                </div>
              </div>
            </div>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Platform Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Minchyn Founding Member Club</h3>
            <p className="text-gray-300 text-sm mb-4">
              A community platform for founding members with gamified features, governance participation, 
              and exclusive benefits.
            </p>
            <div className="text-xs text-gray-400">
              <p>Platform Version: 2024.12</p>
              <p>Last Updated: December 2024</p>
            </div>
          </div>

          {/* Legal Documentation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal Documentation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="/legal/terms-of-service.md" 
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="/legal/privacy-policy.md" 
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/legal/legal-disclaimers.md" 
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Legal Disclaimers
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    // This would open the cookie policy modal
                  }}
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Regulatory Compliance */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Compliance & Safety</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">🔒 Data Protection Compliant</li>
              <li className="text-gray-300">🛡️ Security Audited</li>
              <li className="text-gray-300">⚖️ Legal Framework Compliant</li>
              <li className="text-gray-300">🌐 International Standards</li>
            </ul>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400 mb-2">Regulatory Status:</p>
              <p className="text-xs text-green-400">✓ Utility Token Platform</p>
              <p className="text-xs text-green-400">✓ Non-Securities Compliant</p>
            </div>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="mailto:legal@minchyn.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  legal@minchyn.com
                </a>
                <span className="text-gray-400 text-xs block">Legal inquiries</span>
              </li>
              <li>
                <a 
                  href="mailto:compliance@minchyn.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  compliance@minchyn.com
                </a>
                <span className="text-gray-400 text-xs block">Regulatory matters</span>
              </li>
              <li>
                <a 
                  href="mailto:privacy@minchyn.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  privacy@minchyn.com
                </a>
                <span className="text-gray-400 text-xs block">Data protection</span>
              </li>
              <li>
                <a 
                  href="mailto:support@minchyn.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  support@minchyn.com
                </a>
                <span className="text-gray-400 text-xs block">General support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Equity Calculation Transparency */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <h3 className="text-lg font-semibold mb-4">📊 Equity Calculation Transparency</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">Base Calculation</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Total Outstanding Shares: 300,000,000</li>
                <li>• NFT Collection Size: 10,000</li>
                <li>• Shares per NFT: 500</li>
                <li>• NFT Dilution: 5,000,000 shares</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-400 mb-2">Equity Pool</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Total Diluted Shares: 305,000,000</li>
                <li>• Your Percentage: (Your Shares ÷ 305M) × 100</li>
                <li>• Calculation Purpose: Real equity tracking</li>
                <li>• Legal Value: Proportional ownership</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">Ownership Structure</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Real equity ownership after vesting</li>
                <li>• 4-year vesting period required</li>
                <li>• Legal ownership rights (limited)</li>
                <li>• No voting rights in entity</li>
                <li>• Qualified Holders only</li>
                <li>• Claimable appreciation gifts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal Line */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            <p>© 2024 Minchyn. All rights reserved.</p>
            <p className="text-xs mt-1">
              Platform designed for utility and community engagement. Not an investment platform.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <span>� Gamification Platform</span>
            <span>🔒 Privacy Protected</span>
            <span>⚠️ Gifts Only System</span>
            <span>🦄 Community Platform</span>
          </div>
        </div>

        {/* Final Legal Warning */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <p className="text-blue-200 text-xs text-center">
            <strong>IMPORTANT NOTICE:</strong> This platform features "gifted shares" that represent actual 
            equity ownership in Minchyn, Inc. after a 4-year vesting period. Only "Qualified Holders" 
            (original NFT owners who haven't claimed) may submit equity claims. No voting rights in legal entity. 
            Please understand all vesting requirements and comply with local laws.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LegalFooter;