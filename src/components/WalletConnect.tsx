import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { MetaMaskSDK } from '@metamask/sdk';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

const MMSDK = new MetaMaskSDK();
const ethereum = MMSDK.getProvider();
const phantomWallet = new PhantomWalletAdapter();

function WalletConnect() {
  const [connectedWallet, setConnectedWallet] = useState('');
  const [address, setAddress] = useState('');

  const connectMetaMask = async () => {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setConnectedWallet('MetaMask');
      setAddress(accounts[0]);
    } catch (error) {
      console.error('MetaMask connection error:', error);
    }
  };

  const connectPhantom = async () => {
    try {
      await phantomWallet.connect();
      setConnectedWallet('Phantom');
      setAddress(phantomWallet.publicKey?.toString() || '');
    } catch (error) {
      console.error('Phantom connection error:', error);
    }
  };

  return (
    <div className="relative group">
      <button className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
        <Wallet className="w-4 h-4 mr-2" />
        {connectedWallet || 'Connect Wallet'}
      </button>
      
      {!connectedWallet && (
        <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-2">
            <button
              onClick={connectMetaMask}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 rounded-md"
            >
              MetaMask
            </button>
            <button
              onClick={connectPhantom}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 rounded-md"
            >
              Phantom
            </button>
          </div>
        </div>
      )}
      
      {address && (
        <div className="mt-2 text-sm text-gray-600">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
      )}
    </div>
  );
}

export default WalletConnect;