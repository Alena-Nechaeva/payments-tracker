'use client';

import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useAddBillMutation, useEditBillMutation, useGetBillsQuery } from '@/src/store/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { currentBillSelect, setCurrentBill } from '@/src/store/store.slice';
import { useDispatch, useSelector } from 'react-redux';
import { columnsBills } from '@/src/app/(private)/bills/columnsBills';
import { TTypeBill } from '@/src/store/store.types';

export default function BillsPage() {
  const currentBill = useSelector(currentBillSelect);
  const [name, setName] = useState('');
  const [type, setType] = useState<TTypeBill>('bill');
  const [loading, setLoading] = useState(false);
  const { data, isError, isLoading } = useGetBillsQuery();
  const [addBill] = useAddBillMutation();
  const [editBill] = useEditBillMutation();
  const dispatch = useDispatch();

  const onTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as TTypeBill);
  };

  async function createOrUpdateBill() {
    setLoading(true);
    try {
      const response = currentBill
        ? await editBill({ name, billId: currentBill.id, type }).unwrap()
        : await addBill({ name, type }).unwrap();
      toast.success(response?.message ?? (currentBill ? 'Bill updated successfully' : 'Bill created successfully'));
      setName('');
    } catch (error: any) {
      toast.error(error?.data?.error ?? (currentBill ? 'Failed to update bill' : 'Failed to create bill'));
    } finally {
      dispatch(setCurrentBill(null));
      setLoading(false);
    }
  }

  useEffect(() => {
    if (currentBill) {
      setName(currentBill.name);
      setType(currentBill.type);
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

          <Grid size={12}>
            <Divider component={'div'} sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 5 }}>
                <FormControl fullWidth>
                  <TextField label={'Bill name'} variant='outlined' value={name} onChange={e => setName(e.target.value)} />
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <FormControl fullWidth>
                  <InputLabel>Bill type</InputLabel>
                  <Select value={type} label='Bill type' onChange={onTypeChange}>
                    <MenuItem value={'bill'}>Bill</MenuItem>
                    <MenuItem value={'other'}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 2 }}>
                <Button fullWidth variant={'contained'} onClick={createOrUpdateBill} loading={loading} sx={{ py: 1.9 }}>
                  {currentBill ? 'Update bill' : 'Create bill'}
                </Button>
              </Grid>
            </Grid>
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
