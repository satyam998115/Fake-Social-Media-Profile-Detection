import React, { useState } from 'react';
import { Search, Loader2, AlertTriangle, Shield } from 'lucide-react';
import { ScanResultType } from '../types';
import { analyzeSocialProfile } from '../services/api';

interface ScannerProps {
  onScanComplete: (result: ScanResultType) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanComplete }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter an Instagram username');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await analyzeSocialProfile(username.trim());
      onScanComplete(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-center gap-2 text-blue-400 mb-2">
          <Shield className="w-5 h-5" />
          <span className="font-medium">Instagram Profile Analysis</span>
        </div>
        <p className="text-sm text-slate-400">
          Enter an Instagram username to analyze the profile for potential fake account indicators.
        </p>
      </div>

      <form onSubmit={handleScan} className="relative">
        <input
          type="text"
          placeholder="Enter Instagram username (e.g., username)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:cursor-not-allowed px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Analyze Profile
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;