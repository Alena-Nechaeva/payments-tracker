import { Button } from '@mui/material';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useGetBillsQuery, useGetPaymentsQuery, useUpdatePaymentMutation } from '@/src/store/api';
import PaymentLine from '@/src/shared/paymentLine';
import { useSelector } from 'react-redux';
import { currentMonthSelect } from '@/src/store/store.slice';
import { TPayment } from '@/src/store/store.types';
import { toast } from 'react-toastify';

export type TPaymentLocal = Omit<TPayment, 'amount'> & { amount: string };

export function PaymentForm() {
  const month = useSelector(currentMonthSelect);
  const { data: billsData, isSuccess: billsSuccess, isError: billsError } = useGetBillsQuery();
  const { data: paymentsData, isSuccess: paymentsSuccess, isError: paymentsError } = useGetPaymentsQuery();
  const [updatePayment, { isLoading: updating }] = useUpdatePaymentMutation();

  const initialPayments = useMemo(() => {
    if (!billsSuccess || !paymentsSuccess || !billsData.bills) return [];

    const monthPayments = paymentsData?.payments.find(p => p.month === month?.toLowerCase());
    const filteredBills = billsData.bills.filter(b => b.enabled);
    return filteredBills.map(b => ({
      bill: { name: b.name, id: b.id, slug: b.slug },
      amount: monthPayments?.payments.find(p => p.bill.id === b.id)?.amount.toString() ?? ''
    }));
  }, [billsData, billsSuccess, month, paymentsData?.payments, paymentsSuccess]);

  const filteredBills = useMemo(() => {
    if (!billsSuccess || !billsData.bills) return [];
    return billsData.bills.filter(b => b.enabled);
  }, [billsData?.bills, billsSuccess]);

  const [paymentsPerMonth, setPaymentsPerMonth] = useState<TPaymentLocal[]>([]);

  useEffect(() => {
    setPaymentsPerMonth(initialPayments);
  }, [initialPayments]);

  useEffect(() => {
    if (billsError) {
      toast.error('Failed to get bills');
    }

    if (paymentsError) {
      toast.error('Failed to get payments');
    }
  }, [billsError, paymentsError]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!month) {
      toast.info('Please select a month');
      return;
    }

    const payments = paymentsPerMonth.map(p => ({ ...p, amount: p.amount !== '' ? parseInt(p.amount) : 0 }));
    try {
      await updatePayment({ month, payments }).unwrap();
      toast.success('Payments saved successfully');
    } catch (error: any) {
      toast.error(error?.data?.error ?? 'Failed to save payments');
    }
  }

  return (
    <form onSubmit={onSubmit} className={'w-4/5 flex flex-col gap-4'}>
      {filteredBills.map(b => {
        return (
          <PaymentLine
            key={b.id}
            bill={b}
            amount={paymentsPerMonth?.find(p => p.bill.id === b.id)?.amount ?? ''}
            setPaymentsPerMonth={setPaymentsPerMonth}
          />
        );
      })}
      <Button fullWidth type={'submit'} variant={'contained'} sx={{ mt: 4 }} loading={updating} disabled={updating}>
        Save
      </Button>
    </form>
  );
}
