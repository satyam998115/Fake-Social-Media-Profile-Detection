import React from 'react';
import { AlertTriangle, CheckCircle2, Shield, User, Users, Image, FileText, BrainCircuit } from 'lucide-react';
import { ScanResultType } from '../types';

interface ScanResultProps {
  result: ScanResultType;
}

const ScanResult: React.FC<ScanResultProps> = ({ result }) => {
  if (result.status === 'error') {
    return (
      <div className="mt-8 p-6 bg-red-900/50 rounded-xl border border-red-700">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="text-red-400 w-6 h-6" />
          <h3 className="text-xl font-semibold text-red-300">Analysis Failed</h3>
        </div>
        <p className="text-red-400">{result.error || 'An unknown error occurred.'}</p>
      </div>
    );
  }

  const { status, confidence, aiView, riskFactors, profileData } = result;

  return (
    <div className="mt-8 p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        {status === 'fake' ? (
          <AlertTriangle className="text-red-400 w-6 h-6" />
        ) : (
          <CheckCircle2 className="text-green-400 w-6 h-6" />
        )}
        <h3 className="text-xl font-semibold">
          {status === 'fake' ? 'Potential Fake Account Detected' : 'Account Appears Legitimate'}
        </h3>
      </div>

      <div className="space-y-6">
        {/* AI View Section */}
        {aiView && (
          <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
            <h4 className="font-medium mb-2 flex items-center gap-2 text-purple-300">
              <BrainCircuit className="w-5 h-5 text-purple-400" />
              AI-Powered Overview
            </h4>
            <p className="text-sm text-slate-300">{aiView}</p>
          </div>
        )}

        {/* Confidence and Risk Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-800/30 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Confidence Score
            </h4>
            <p className="text-3xl font-bold">{confidence?.toFixed(2)}%</p>
            <p className="text-sm text-slate-400">Confidence that the profile is {status}.</p>
          </div>
          <div className="p-4 bg-slate-800/30 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Risk Factors
            </h4>
            {riskFactors && riskFactors.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-slate-300">
                {riskFactors.map((factor, index) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">No major risk factors detected.</p>
            )}
          </div>
        </div>

        {/* Profile Data Section */}
        {profileData && (
          <div className="p-4 bg-slate-800/30 rounded-lg">
            <h4 className="font-medium mb-3 text-lg">Profile Snapshot</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2"><User className="w-4 h-4 text-slate-400" /><span>{profileData.username}</span></div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" /><span>{profileData.followersCount} Followers</span></div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" /><span>{profileData.followingCount} Following</span></div>
              <div className="flex items-center gap-2"><Image className="w-4 h-4 text-slate-400" /><span>{profileData.postsCount} Posts</span></div>
              <div className="flex items-center gap-2 col-span-2 md:col-span-3"><FileText className="w-4 h-4 text-slate-400" /><span>Bio: {profileData.biography || 'N/A'}</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanResult;