'use client';

import { Card, CardContent, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columnsPayments } from '@/src/shared/columnsPayments';
import { useGetBillsQuery, useGetPaymentsQuery } from '@/src/store/api';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  const { data: paymentsData, isError: paymentsError, isLoading: paymentsLoading } = useGetPaymentsQuery();
  const {
    data: billsData,
    isLoading: billsLoading,
    isError: billsError
  } = useGetBillsQuery(undefined, {
    selectFromResult: ({ data, isError, isLoading }) => ({
      data: data?.bills.filter(b => b.enabled) ?? [],
      isError,
      isLoading
    })
  });

  const rows = () => {
    if (!paymentsData?.payments || !billsData) return [];

    // Создаем Map: billId -> { id, name, january, february, ... }
    const billsMap = new Map<string, Record<string, string | number>>();

    // Инициализируем все bills с пустыми месяцами
    billsData.forEach(bill => {
      billsMap.set(bill.id, {
        id: bill.id,
        name: bill.name,
        january: 0,
        february: 0,
        march: 0,
        april: 0,
        may: 0,
        june: 0,
        july: 0,
        august: 0,
        septiembre: 0,
        october: 0,
        november: 0,
        diciembre: 0
      });
    });

    // Заполняем суммы из payments
    paymentsData.payments.forEach(monthPayments => {
      const monthKey = monthPayments.month.toLowerCase();

      monthPayments.payments.forEach(p => {
        const billRow = billsMap.get(p.bill.id);
        if (billRow) {
          billRow[monthKey] = p.amount;
        }
      });
    });

    return Array.from(billsMap.values());
  };

  useEffect(() => {
    if (billsError) {
      toast.error('Failed to get bills');
    }

    if (paymentsError) {
      toast.error('Failed to get payments');
    }
  }, [billsError, paymentsError]);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <Typography variant='h5'>Payments</Typography>
          </Grid>

          <Grid size={12}>
            <DataGrid
              autoHeight
              pageSizeOptions={[15, 25, 50]}
              rows={rows()}
              columns={columnsPayments}
              disableColumnFilter
              disableColumnMenu
              disableDensitySelector
              disableColumnSelector
              disableRowSelectionOnClick
              loading={billsLoading || paymentsLoading}
              checkboxSelection={false}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 15, page: 0 }
                },
                sorting: {
                  sortModel: [{ field: 'id', sort: 'desc' }]
                }
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
