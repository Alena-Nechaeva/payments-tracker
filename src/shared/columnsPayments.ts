import { GridColDef } from '@mui/x-data-grid';

const numberFormatter = new Intl.NumberFormat('ru-RU');

export const columnsPayments: GridColDef[] = [
  {
    field: 'name',
    flex: 2,
    headerName: 'Bill name'
  },
  {
    field: 'january',
    flex: 1,
    headerName: 'January',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'february',
    flex: 1,
    headerName: 'February',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'march',
    flex: 1,
    headerName: 'March',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'april',
    flex: 1,
    headerName: 'April',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'may',
    flex: 1,
    headerName: 'May',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'june',
    flex: 1,
    headerName: 'June',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'july',
    flex: 1,
    headerName: 'July',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'august',
    flex: 1,
    headerName: 'August',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'septiembre',
    flex: 1,
    headerName: 'Septiembre',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'october',
    flex: 1,
    headerName: 'October',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'november',
    flex: 1,
    headerName: 'November',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'diciembre',
    flex: 1,
    headerName: 'Diciembre',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  }
];

export const columnsSum: GridColDef[] = [
  {
    field: 'type',
    flex: 2,
    headerName: 'Type'
  },
  {
    field: 'january',
    flex: 1,
    headerName: 'January',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'february',
    flex: 1,
    headerName: 'February',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'march',
    flex: 1,
    headerName: 'March',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'april',
    flex: 1,
    headerName: 'April',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'may',
    flex: 1,
    headerName: 'May',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'june',
    flex: 1,
    headerName: 'June',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'july',
    flex: 1,
    headerName: 'July',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'august',
    flex: 1,
    headerName: 'August',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'septiembre',
    flex: 1,
    headerName: 'Septiembre',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'october',
    flex: 1,
    headerName: 'October',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'november',
    flex: 1,
    headerName: 'November',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  },
  {
    field: 'diciembre',
    flex: 1,
    headerName: 'Diciembre',
    valueFormatter: (param: number) => numberFormatter.format(param ?? 0)
  }
];
