import { NextRequest } from 'next/server';
import { adminAuth } from './admin';

const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_UID;

export async function requireUser(req: NextRequest) {
  const header = req.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) throw new Error('Missing token');

  const token = header.slice(7);
  const decoded = await adminAuth.verifyIdToken(token);

  if (ADMIN_UID && decoded.uid !== ADMIN_UID) {
    throw new Error('Forbidden');
  }

  return decoded;
}
