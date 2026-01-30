'use client';

import { Button, Card, CardContent, Typography } from '@mui/material';

export default function Header() {
  const year = new Date().getFullYear();

  return (
    <Card className={'my-4'}>
      <CardContent className={'flex items-center justify-between'}>
        <div className={'flex gap-4'}>
          <Button variant={'outlined'} href={'/'}>
            Home
          </Button>
          <Button variant={'outlined'} href={'/payments'}>
            Payments
          </Button>
          <Button variant={'outlined'} href={'/bills'}>
            Bills
          </Button>
        </div>
        <Typography variant={'h5'} textAlign={'center'}>
          {year}
        </Typography>
      </CardContent>
    </Card>
  );
}
