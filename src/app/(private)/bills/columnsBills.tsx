import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { TBill } from '@/src/store/store.types';
import { IconButton, Switch } from '@mui/material';
import { useDispatch } from 'react-redux';
import EditIcon from '@/src/assets/icons/edit';
import DeleteIcon from '@/src/assets/icons/delete';
import { setCurrentBill } from '@/src/store/store.slice';
import { useDeleteBillMutation, useDisableBillMutation } from '@/src/store/api';
import { toast } from 'react-toastify';

const RenderActions = (params: GridCellParams<TBill>) => {
  const dispatch = useDispatch();
  const [disableBill] = useDisableBillMutation();
  const [deleteBill] = useDeleteBillMutation();

  const handleDisableBill = async () => {
    try {
      const response = await disableBill({ enabled: !params.row.enabled, billId: params.row.id }).unwrap();
      toast.success(response?.message ?? 'Bill updated successfully');
    } catch (error: any) {
      toast.error(error?.data?.error ?? 'Failed to update bill');
    }
  };

  const handleDeleteBill = async () => {
    try {
      const response = await deleteBill(params.row.id).unwrap();
      toast.success(response?.message ?? 'Bill deleted successfully');
    } catch (error: any) {
      toast.error(error?.data?.error ?? 'Failed to delete bill');
    }
  };

  const handleEditBill = (): void => {
    dispatch(setCurrentBill(params.row));
  };

  return (
    <div className='flex gap-2'>
      <>
        <IconButton color='warning' onClick={handleEditBill} title='Editar'>
          <EditIcon />
        </IconButton>
        <IconButton color='error' onClick={handleDeleteBill} title='Eliminar'>
          <DeleteIcon />
        </IconButton>
        <Switch title={'Enable/Disable'} checked={params.row.enabled} onChange={handleDisableBill} />
      </>
    </div>
  );
};

export const columnsBills: GridColDef<TBill>[] = [
  {
    field: 'name',
    flex: 2,
    headerName: 'Bill name'
  },
  {
    field: 'actions',
    flex: 1,
    headerName: 'Actions',
    minWidth: 200,
    renderCell: params => <RenderActions {...params} />
  }
];
