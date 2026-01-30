import { TextField } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import CheckIcon from '@/src/assets/icons/check';
import { useTheme } from '@mui/system';
import BlockIcon from '@/src/assets/icons/block';
import { TBill } from '@/src/store/store.types';
import { TPaymentLocal } from '@/src/shared/paymentForm';

type PaymentLineProps = {
  bill: TBill;
  amount: string;
  setPaymentsPerMonth: Dispatch<SetStateAction<TPaymentLocal[]>>;
};

export default function PaymentLine({ bill, amount, setPaymentsPerMonth }: PaymentLineProps) {
  const theme = useTheme();

  function onAmountChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^0-9]/g, '');

    setPaymentsPerMonth(prev => {
      const idx = prev.findIndex(p => p.bill.id === bill.id);

      if (idx !== -1) {
        return prev.map(p => (p.bill.id === bill.id ? { ...p, amount: value } : p));
      }
      return prev;
    });
  }

  return (
    <div className={'w-full flex gap-4 items-center'}>
      <TextField
        fullWidth
        defaultValue={bill.name}
        slotProps={{
          input: {
            readOnly: true
          }
        }}
      />
      <TextField fullWidth label={'Amount'} value={amount} onChange={onAmountChange} />
      {amount === '' || amount === '0' ? (
        <BlockIcon sx={{ color: theme.palette.error.main, width: 28, height: 28 }} />
      ) : (
        <CheckIcon sx={{ color: theme.palette.success.main, width: 28, height: 28 }} />
      )}
    </div>
  );
}
