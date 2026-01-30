import { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <div className='px-4'>{children}</div>;
}
