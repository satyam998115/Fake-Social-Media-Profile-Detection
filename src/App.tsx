import React, { useState } from 'react';
import Header from './components/Header';
import Scanner from './components/Scanner';
import ScanResult from './components/ScanResult';
import Statistics from './components/Statistics';
import Features from './components/Features';
import Education from './components/Education';
import { ScanResultType } from './types';

function App() {
  const [scanResult, setScanResult] = useState<ScanResultType | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500">
            Fake Profile Detection & Reporting
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            AI-powered system to identify and report suspicious social media accounts. Integrated with CERT-In for immediate threat response.
          </p>
        </div>

        <Scanner onScanComplete={setScanResult} />
        {scanResult && <ScanResult result={scanResult} />}
        <Statistics />
        <Features />
        <Education />
      </main>

      <footer className="bg-slate-900/50 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400">
          <p>© 2025 FakeGuard - Official partner with CERT-In for cybersecurity</p>
        </div>
      </footer>
    </div>
  );
}

export default App;