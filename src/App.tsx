import React, { useState } from 'react';
import { Shield, Scan, UserCheck, RefreshCw, ChevronRight } from 'lucide-react';
import KYCVerification from './components/KYCVerification';
import Navbar from './components/Navbar';
import HowItWorks from './components/HowItWorks';
import SupportedPlatforms from './components/SupportedPlatforms';
import Documentation from './components/Documentation';

function App() {
  const [step, setStep] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'how-it-works':
        return <HowItWorks />;
      case 'platforms':
        return <SupportedPlatforms />;
      case 'docs':
        return <Documentation />;
      case 'verify':
        return <KYCVerification />;
      default:
        return (
          <div className="space-y-12">
            <header className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
                One Identity, Multiple Platforms
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Complete your KYC once and seamlessly verify your identity across the Web3 ecosystem
              </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Shield className="w-8 h-8 text-blue-600" />}
                title="Secure Verification"
                description="Enterprise-grade security with biometric authentication and facial recognition"
              />
              <FeatureCard 
                icon={<Scan className="w-8 h-8 text-blue-600" />}
                title="Quick Scanning"
                description="Advanced facial scanning technology for fast and accurate verification"
              />
              <FeatureCard 
                icon={<RefreshCw className="w-8 h-8 text-blue-600" />}
                title="Reusable Identity"
                description="Verify once, use everywhere across supported Web3 platforms"
              />
            </div>

            <div className="text-center">
              <button
                onClick={() => setCurrentPage('verify')}
                className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Verification
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar onNavigate={setCurrentPage} />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {renderContent()}
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default App;