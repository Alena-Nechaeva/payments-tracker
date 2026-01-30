'use client';

import { Button, Card, CardContent, Divider, Grid, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useAddBillMutation, useEditBillMutation, useGetBillsQuery } from '@/src/store/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { currentBillSelect, setCurrentBill } from '@/src/store/store.slice';
import { useDispatch, useSelector } from 'react-redux';
import { columnsBills } from '@/src/app/(private)/bills/columnsBills';

export default function BillsPage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const currentBill = useSelector(currentBillSelect);
  const { data, isError, isLoading } = useGetBillsQuery();
  const [addBill] = useAddBillMutation();
  const [editBill] = useEditBillMutation();
  const dispatch = useDispatch();

  async function createOrUpdateBill() {
    setLoading(true);
    try {
      const response = currentBill ? await editBill({ name, billId: currentBill.id }).unwrap() : await addBill({ name }).unwrap();
      toast.success(response?.message ?? (currentBill ? 'Bill updated successfully' : 'Bill created successfully'));
      setName('');
    } catch (error: any) {
      toast.error(error?.data?.error ?? (currentBill ? 'Failed to pupdate bill' : 'Failed to create bill'));
    } finally {
      dispatch(setCurrentBill(null));
      setLoading(false);
    }
  }

  useEffect(() => {
    if (currentBill) {
      setName(currentBill.name);
    }
  }, [currentBill]);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to get bills');
    }
  }, [isError]);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <Typography variant='h5'>Bills</Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider component={'div'} sx={{ mb: 2 }} />
            <div className={'flex items-center gap-4'}>
              <TextField
                label={'Create new bill'}
                variant='outlined'
                sx={{ width: '40%' }}
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <Button variant={'contained'} onClick={createOrUpdateBill} loading={loading} sx={{ py: 1.9 }}>
                {currentBill ? 'Update bill' : 'Create bill'}
              </Button>
            </div>
            <Divider component={'div'} sx={{ mt: 2 }} />
          </Grid>

          <Grid size={12}>
            <DataGrid
              autoHeight
              pageSizeOptions={[15, 25, 50]}
              rows={data?.bills ?? []}
              columns={columnsBills}
              disableColumnFilter
              disableColumnMenu
              disableDensitySelector
              disableColumnSelector
              disableRowSelectionOnClick
              loading={isLoading}
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
