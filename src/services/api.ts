import { ScanResultType } from '../types';

export async function analyzeSocialProfile(url: string): Promise<ScanResultType> {
  if (!url) {
    throw new Error('Please provide a valid Instagram username');
  }

  try {
    // Extract username from URL or use the input directly
    let username = url;
    if (url.includes('instagram.com')) {
      username = url.split('/').pop()?.replace('@', '') || '';
    }
    
    if (!username) {
      throw new Error('Invalid Instagram username');
    }

    // Call the Flask backend
    const response = await fetch('https://fake-profile-api-backend.onrender.com/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to analyze profile');
    }

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    console.error('Error analyzing profile:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unexpected error occurred while analyzing the profile');
  }
}