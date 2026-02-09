import { GridColDef } from '@mui/x-data-grid';

const numberFormatter = new Intl.NumberFormat('ru-RU');

export const columnsPayments: GridColDef[] = [
  {
    field: 'name',
    flex: 1,
    headerName: 'Bill name'
  },
  {
    field: 'january',
    flex: 1,
    headerName: 'January',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'february',
    flex: 1,
    headerName: 'February',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'march',
    flex: 1,
    headerName: 'March',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'april',
    flex: 1,
    headerName: 'April',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'may',
    flex: 1,
    headerName: 'May',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'june',
    flex: 1,
    headerName: 'June',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'july',
    flex: 1,
    headerName: 'July',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'august',
    flex: 1,
    headerName: 'August',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'septiembre',
    flex: 1,
    headerName: 'Septiembre',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'october',
    flex: 1,
    headerName: 'October',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'november',
    flex: 1,
    headerName: 'November',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'diciembre',
    flex: 1,
    headerName: 'Diciembre',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  }
];

export const columnsSum: GridColDef[] = [
  {
    field: 'type',
    flex: 1,
    headerName: 'Type'
  },
  {
    field: 'january',
    flex: 1,
    headerName: 'January',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'february',
    flex: 1,
    headerName: 'February',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'march',
    flex: 1,
    headerName: 'March',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'april',
    flex: 1,
    headerName: 'April',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'may',
    flex: 1,
    headerName: 'May',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'june',
    flex: 1,
    headerName: 'June',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'july',
    flex: 1,
    headerName: 'July',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'august',
    flex: 1,
    headerName: 'August',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'septiembre',
    flex: 1,
    headerName: 'Septiembre',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'october',
    flex: 1,
    headerName: 'October',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'november',
    flex: 1,
    headerName: 'November',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  },
  {
    field: 'diciembre',
    flex: 1,
    headerName: 'Diciembre',
    valueFormatter: param => numberFormatter.format(typeof param === 'number' ? param : 0)
  }
];
