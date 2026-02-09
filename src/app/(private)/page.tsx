'use client';

import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columnsPayments, columnsSum } from '@/src/shared/columnsPayments';
import { useGetBillsQuery, useGetPaymentsQuery } from '@/src/store/api';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { TTypeBill } from '@/src/store/store.types';
import { months } from '@/src/assets/months';

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
  const makeEmptyRow = (type: TTypeBill) =>
    months.reduce(
      (acc, m) => {
        acc[m] = 0;
        return acc;
      },
      { id: type, type: type.toUpperCase() } as Record<string, string | number>
    );

  const rowsGeneral = () => {
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

  const rowsSum = () => {
    if (!paymentsData?.payments || !billsData) return [];

    const totals = new Map<TTypeBill, Record<string, string | number>>([
      ['bill', makeEmptyRow('bill')],
      ['other', makeEmptyRow('other')]
    ]);

    paymentsData.payments.forEach(monthPayments => {
      const monthKey = monthPayments.month.toLowerCase();

      monthPayments.payments.forEach(p => {
        const row = totals.get(p.bill.type)!;
        row[monthKey] = Number(row[monthKey] ?? 0) + Number(p.amount ?? 0);
      });
    });
    return Array.from(totals.values());
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
          <Grid size={12}>
            <Typography variant='h5'>Payments</Typography>
          </Grid>

          <Grid size={12}>
            <DataGrid
              autoHeight
              pageSizeOptions={[15, 25, 50]}
              rows={rowsGeneral()}
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
          <Grid size={12}>
            <Typography variant='h5'>Amounts per type</Typography>
          </Grid>
          <Grid size={12}>
            <DataGrid
              autoHeight
              pageSizeOptions={[15, 25, 50]}
              rows={rowsSum()}
              columns={columnsSum}
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
