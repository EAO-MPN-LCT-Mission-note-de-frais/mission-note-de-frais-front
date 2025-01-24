import {ColumnDefinition} from '@/app/interfaces/column-definition';

export const columns: ColumnDefinition[] = [
  // {
  //   property: 'label',
  //   label: 'Label',
  //   sortable: true
  // },
  // {property: 'billed', label: 'Facturé', sortable: true},
  // {property: 'prime', label: 'Prime', sortable: false},
  {
    property: 'amount',
    label: 'TJM (en €)',
    sortable: true,
    // formatter: (value: number) => `${value.toFixed(2)} €`
    formatter: (value: number) => `${534.78.toFixed(2)} €`
  },
  // {
  //   property: 'prime',
  //   label: '% de Prime',
  //   sortable: false,
  //   formatter: (value: number) => `${value} %`
  // },
  {
    property: 'startDate',
    label: 'Date de début',
    sortable: true,
    formatter: (value: string) => new Date(value).toLocaleDateString()
  },
  {
    property: 'endDate',
    label: 'Date de fin',
    sortable: true,
    formatter: (value: string) => new Date(value).toLocaleDateString()
  },
  {
    property: 'status',
    label: 'Status',
    sortable: true
  },
  // {
  //   property: 'expenseReport.amount',
  //   label: 'Note de Frais',
  //   sortable: false,
  //   formatter: (value: number) => `${value.toFixed(2)} €`
  // },
  // {
  //   property: 'expenseReport.status.name.',
  //   label: 'Status Note de Frais',
  //   sortable: false,
  //   formatter: (value: number) => `${value} %`
  // },
];
