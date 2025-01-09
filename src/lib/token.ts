import Jwt from 'jsonwebtoken'

export default function checkAccessToken(token: string){
  try {
    // Decode the token without verifying the signature
    const decoded = Jwt.decode(token) as { exp?: number };

    if (!decoded || typeof decoded.exp !== 'number') {
      return false;
    }

    // Check if the current time is before the expiration time
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime < decoded.exp;
  } catch (error) {
    // If an error occurs during decoding, consider the token invalid
    return false;
  }
}