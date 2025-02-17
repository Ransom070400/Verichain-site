import React from 'react';
import { Shield, Scan, UserCheck, RefreshCw, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <Shield className="w-8 h-8 text-blue-600" />,
    title: 'Connect Your Wallet',
    description: 'Start by connecting your preferred crypto wallet to begin the verification process'
  },
  {
    icon: <Scan className="w-8 h-8 text-blue-600" />,
    title: 'Document Verification',
    description: 'Upload your government-issued ID and complete the facial scan process'
  },
  {
    icon: <UserCheck className="w-8 h-8 text-blue-600" />,
    title: 'Identity Confirmation',
    description: 'Our system verifies your identity using advanced biometric technology'
  },
  {
    icon: <RefreshCw className="w-8 h-8 text-blue-600" />,
    title: 'Use Across Platforms',
    description: 'Your verified identity can now be used across supported cryptocurrency exchanges'
  }
];

function HowItWorks() {
  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete your KYC verification once and use it across multiple platforms
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-sm p-6 h-full">
                  <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Feature
                title="Secure Verification"
                description="Enterprise-grade security with advanced encryption"
              />
              <Feature
                title="Quick Process"
                description="Complete verification in minutes, not days"
              />
              <Feature
                title="Multi-Platform"
                description="Use your verified identity across major exchanges"
              />
              <Feature
                title="Privacy Focused"
                description="Your data is encrypted and protected"
              />
              <Feature
                title="24/7 Support"
                description="Get help whenever you need it"
              />
              <Feature
                title="Regular Updates"
                description="Continuous improvements and new platform support"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default HowItWorks;