import React from 'react';
import { AlertTriangle, CheckCircle2, Shield, ExternalLink, User, Users, Image, FileText, Link2, BadgeCheck, Briefcase } from 'lucide-react';
import { ScanResultType } from '../types';

interface ScanResultProps {
  result: ScanResultType;
}

const ScanResult: React.FC<ScanResultProps> = ({ result }) => {
  const handleReport = () => {
    alert('Demo Version: In a production environment, this would submit the report to CERT-In for investigation.');
  };

  return (
    <div className="mt-8 p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        {result.status === 'fake' ? (
          <AlertTriangle className="text-red-400 w-6 h-6" />
        ) : (
          <CheckCircle2 className="text-green-400 w-6 h-6" />
        )}
        <h3 className="text-xl font-semibold">
          {result.status === 'fake' ? 'Potential Fake Account Detected' : 'Account Appears Legitimate'}
        </h3>
      </div>

      <div className="space-y-4">
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-4">
          <p className="text-sm text-blue-400">
            <strong>Analysis Complete:</strong> Profile has been scanned for potential indicators of a fake account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-slate-800/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Analysis Confidence</span>
            </div>
            <span className="text-2xl font-bold">{result.confidence}%</span>
          </div>

          {result.profileData && (
            <div className="p-4 bg-slate-800/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-purple-400" />
                <span className="font-medium">Profile Info</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Username:</span>
                  <span className="text-sm text-slate-300">{result.profileData.username}</span>
                  {result.profileData.isVerified && (
                    <BadgeCheck className="w-4 h-4 text-blue-400" title="Verified Account" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Name:</span>
                  <span className="text-sm text-slate-300">{result.profileData.fullName || 'Not available'}</span>
                </div>
                {result.profileData.isBusinessAccount && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-slate-300">{result.profileData.businessCategory || 'Business Account'}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {result.profileData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-slate-400">Followers</p>
                  <p className="font-medium">{result.profileData.followersCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                <Users className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-slate-400">Following</p>
                  <p className="font-medium">{result.profileData.followingCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                <Image className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-sm text-slate-400">Posts</p>
                  <p className="font-medium">{result.profileData.postsCount}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-800/30 rounded-lg">
              <h4 className="font-medium mb-2">Biography</h4>
              <p className="text-sm text-slate-400">
                {result.profileData.biography || 'No biography available'}
              </p>
              {result.profileData.externalUrl && (
                <a
                  href={result.profileData.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mt-2"
                >
                  <Link2 className="w-4 h-4" />
                  {result.profileData.externalUrl}
                </a>
              )}
            </div>
          </>
        )}

        {result.status === 'fake' && (
          <>
            <div className="border-t border-slate-700 my-4"></div>
            
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Risk Factors Detected:
              </h4>
              <ul className="space-y-2">
                {result.riskFactors.map((factor, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/30 p-2 rounded">
                    <FileText className="w-4 h-4 text-yellow-500" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-700 my-4"></div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleReport}
                className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg transition-colors"
              >
                <Shield className="w-5 h-5" />
                Report Suspicious Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScanResult;