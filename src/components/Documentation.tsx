import React from 'react';
import { Book, Code, Key, Shield, Terminal, FileText } from 'lucide-react';

function Documentation() {
  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Documentation</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about integrating and using VeriChain's KYC verification
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DocSection
              icon={<Book className="w-6 h-6" />}
              title="Getting Started"
              items={[
                'Quick Start Guide',
                'Installation',
                'Basic Configuration',
                'First Verification'
              ]}
            />
            
            <DocSection
              icon={<Code className="w-6 h-6" />}
              title="Integration Guide"
              items={[
                'API Reference',
                'SDK Documentation',
                'Code Examples',
                'Webhooks'
              ]}
            />
            
            <DocSection
              icon={<Key className="w-6 h-6" />}
              title="Authentication"
              items={[
                'Wallet Connection',
                'Identity Verification',
                'Session Management',
                'Security Best Practices'
              ]}
            />
            
            <DocSection
              icon={<Shield className="w-6 h-6" />}
              title="Security"
              items={[
                'Data Protection',
                'Privacy Policy',
                'Compliance',
                'Best Practices'
              ]}
            />
            
            <DocSection
              icon={<Terminal className="w-6 h-6" />}
              title="Technical Guides"
              items={[
                'Implementation Examples',
                'Troubleshooting',
                'API Endpoints',
                'Error Handling'
              ]}
            />
            
            <DocSection
              icon={<FileText className="w-6 h-6" />}
              title="Resources"
              items={[
                'FAQs',
                'Support',
                'Release Notes',
                'Community Guidelines'
              ]}
            />
          </div>

          <div className="mt-16 bg-blue-600 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
            <p className="mb-6">Our support team is available 24/7 to assist you with any questions</p>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocSection({ icon, title, items }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 ml-3">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Documentation;