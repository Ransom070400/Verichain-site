import React from 'react';
import { Shield, ExternalLink } from 'lucide-react';

const platforms = [
  {
    name: 'Binance',
    logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
    description: 'Leading cryptocurrency exchange platform',
    status: 'Live'
  },
  {
    name: 'Bitget',
    logo: 'https://cryptologos.cc/logos/bitget-token-bgt-logo.png',
    description: 'Fast-growing crypto trading platform',
    status: 'Coming Soon'
  },
  {
    name: 'Coinbase',
    logo: 'https://cryptologos.cc/logos/coinbase-coin-coin-logo.png',
    description: 'Secure platform for buying, selling, and storing cryptocurrency',
    status: 'Coming Soon'
  },
  {
    name: 'Kraken',
    logo: 'https://cryptologos.cc/logos/kraken-krak-logo.png',
    description: 'Leading European cryptocurrency exchange',
    status: 'Coming Soon'
  },
  {
    name: 'KuCoin',
    logo: 'https://cryptologos.cc/logos/kucoin-token-kcs-logo.png',
    description: 'Global cryptocurrency exchange',
    status: 'Coming Soon'
  },
  {
    name: 'OKX',
    logo: 'https://cryptologos.cc/logos/okb-okb-logo.png',
    description: 'Comprehensive crypto trading platform',
    status: 'Coming Soon'
  }
];

function SupportedPlatforms() {
  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Supported Platforms</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            VeriChain's KYC verification is accepted across major cryptocurrency exchanges and platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platforms.map((platform) => (
            <div key={platform.name} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={platform.logo}
                    alt={`${platform.name} logo`}
                    className="w-10 h-10 object-contain"
                  />
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
                    <span className={`text-sm ${
                      platform.status === 'Live' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {platform.status}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600">{platform.description}</p>
              {platform.status === 'Live' && (
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <Shield className="w-4 h-4 mr-1" />
                  Verification Available
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SupportedPlatforms;