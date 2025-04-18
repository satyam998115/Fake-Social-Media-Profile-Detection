export type ProfileData = {
  username: string;
  fullName: string;
  biography: string;
  isPrivate: boolean;
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  externalUrl?: string;
  profilePicUrl: string;
  isBusinessAccount: boolean;
  businessCategory?: string;
};

export type ScanResultType = {
  status: 'fake' | 'real';
  confidence: number;
  riskFactors: string[];
  platformType: 'facebook' | 'instagram' | 'twitter' | 'unknown';
  profileData?: ProfileData;
};