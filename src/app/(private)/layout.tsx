'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/src/lib/firebase/client';
import Header from '@/src/shared/header';

const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_UID!;

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user || user.uid !== ADMIN_UID) {
        router.replace('/login');
        return;
      }
      setReady(true);
    });
    return () => unsub();
  }, [router]);

  if (!ready) return null;

  return (
    <div className='px-4'>
      <Header />
      {children}
    </div>
  );
}
