import {Component, effect, input, signal} from '@angular/core';
import {Mission} from '@/app/interfaces/mission';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {columns} from '@/app/components/missions-table/mission-table-columns';

@Component({
  selector: 'app-missions-table',
  imports: [MatTableModule, MatIcon, MatIconButton, MatMenu, MatMenuItem, MatPaginator, MatSort, MatSortHeader, MatMenuTrigger],
  templateUrl: './missions-table.component.html',
  styleUrl: './missions-table.component.scss'
})
export class MissionsTableComponent {
  columns = signal(columns)

  data = input<Mission[]>([])

  sort!: MatSort;
  source = new MatTableDataSource<Mission>();
  headers: string[] = ["dailyRate", "billed", "prime-percent", "startDate", "endDate", "status", "expense-report", "expense-report-status"];

  constructor() {
    effect(() => {
      this.source.data = this.data()
      this.source.sort = this.sort
    });
  }
}
