import {ColumnDefinition} from '@/app/interfaces/column-definition';

export type TableColumns = ColumnDefinition & { id: string };

export const columns: TableColumns [] = [
  // {
  //   property: 'label',
  //   label: 'Label',
  //   sortable: true
  // },
  // {property: 'billed', label: 'Facturé', sortable: true},
  // {property: 'prime', label: 'Prime', sortable: false},
  {
    id: 'dailyRate',
    property: 'missionType',
    label: 'TJM (en €)',
    sortable: true,
    formatter: (value: any) => {
      const dailyRate = value.averageDailyRate;
      return dailyRate ? `${dailyRate.toFixed(2)} €` : "";
    }
  },
  // {
  //   id: 'billed',
  //   property: 'missionType',
  //   label: 'Facturé',
  //   sortable: true,
  //   formatter: (value: any) => (value.isCharged ? 'Oui' : 'Non')
  // },

  {
    id: 'prime-percent',
    property: 'missionType',
    label: '% de Prime',
    sortable: false,
    formatter: (value: any) => {
      const bonus = value.bonusPercentage;
      return bonus ? `${bonus.toFixed(2)} %` : "";
    }
  },

  {
    id: 'startDate',
    property: 'startDate',
    label: 'Date de début',
    sortable: true,
    formatter: (value: string) => new Date(value).toLocaleDateString()
  },
  {
    id: 'endDate',
    property: 'endDate',
    label: 'Date de fin',
    sortable: true,
    formatter: (value: string) => new Date(value).toLocaleDateString()
  },
  {
    id: 'status',
    property: 'status',
    label: 'Status',
    sortable: true
  },
  {
    id: "expense-report",
    property: 'expenseReport',
    label: 'Note de Frais',
    sortable: false,
    formatter: (value?: any) => {
      const expenses = value?.amount;
      return expenses ? `${expenses.toFixed(2)} €` : "";
    }
  },
  {
    id: "expense-report-status",
    property: 'expenseReport',
    label: 'Status Note de Frais',
    sortable: false,
    formatter: (value: any) => value.status?.name ?? ""
  },
];
