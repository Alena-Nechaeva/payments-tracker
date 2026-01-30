'use client';

import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '@/src/lib/firebase/client';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/');
    } catch (err: any) {
      toast.error(err?.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={'w-full h-screen flex items-center justify-center'}>
      <Card className={'w-1/2'}>
        <CardContent className={'flex justify-center flex-col gap-4'}>
          <Typography variant='h5' textAlign={'center'}>
            Login
          </Typography>
          <form onSubmit={onSubmit} className={'flex justify-center flex-col gap-4'}>
            <TextField variant='outlined' label={'Email'} value={email} onChange={e => setEmail(e.target.value)} />
            <TextField label={'Password'} variant='outlined' value={password} onChange={e => setPassword(e.target.value)} />
            <Button fullWidth type={'submit'} variant={'contained'} sx={{ mt: 4 }} loading={loading} disabled={loading}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
