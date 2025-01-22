import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionTypeService } from '../services/mission-type.service';
import { MissionType } from '../interfaces/mission-type';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-mission-type',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './mission-type.component.html',
  styleUrls: ['./mission-type.component.css']
})
export class MissionTypeComponent implements OnInit {
  missionTypes: MissionType[] = [];
  displayedColumns: string[] = ['label', 'isCharged', 'isBonus', 'tjm', 'bonusPercentage', 'startDate', 'endDate', 'actions'];
  dataSource = new MatTableDataSource<MissionType>();
  errorMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private missionTypeService: MissionTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMissionTypes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadMissionTypes(): void {
    this.missionTypeService.getMissionTypes().subscribe({
      next: (data) => {
        this.missionTypes = data;
        this.dataSource.data = data;
      },
      error: () => (this.errorMessage = 'Erreur lors du chargement des types de mission.')
    });
  }

  deleteMissionType(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce type de mission ?')) {
      this.missionTypeService.deleteMissionType(id).subscribe({
        next: () => this.loadMissionTypes(),
        error: () => (this.errorMessage = 'Erreur lors de la suppression.')
      });
    }
  }

  returnHome(): void {
    this.router.navigate(['/missions']);
  }
}