import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MissionTypeModalComponent } from '@/app/mission-type/mission-type-modal/mission-type-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../components/delete-modal/delete-modal.component';
import { AuthService } from '@/app/services/auth.service'


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
    MatMenuModule,
    MatCheckboxModule,
  ],
  templateUrl: './mission-type.component.html',
  styleUrls: ['./mission-type.component.scss']
})
export class MissionTypeComponent implements OnInit {
  missionTypes: MissionType[] = [];
  displayedColumns: string[] = ['label', 'isCharged', 'isBonus', 'tjm', 'bonusPercentage', 'startDate', 'endDate', 'actions'];
  dataSource = new MatTableDataSource<MissionType>();
  errorMessage = '';
  private dialog = inject(MatDialog);
  isAdmin: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private missionTypeService: MissionTypeService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadMissionTypes();
    this.checkUserRole();

    console.log('Rôle de l’utilisateur :', this.authService.getUserRole());

    this.displayedColumns = ['label', 'isCharged', 'isBonus', 'tjm', 'bonusPercentage', 'startDate', 'endDate'];

    if (this.isAdmin) {
      this.displayedColumns.push('actions');
    }
  }

  checkUserRole(): void {
    const userRoles = this.authService.getUserRole();
    this.isAdmin = userRoles ? userRoles.includes('ADMINISTRATOR') : false;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadMissionTypes(): void {
    this.missionTypeService.getMissionTypes().subscribe({
      next: (data) => {
        this.missionTypes = this.sortMissionTypes(data);
        this.dataSource.data = this.missionTypes;
      },
      error: () => (this.errorMessage = 'Erreur lors du chargement des types de mission.'),
    });
  }

  sortMissionTypes(missionTypes: MissionType[]): MissionType[] {
    return missionTypes.sort((a, b) => {
      if (!a.endDate && b.endDate) return -1;
      if (a.endDate && !b.endDate) return 1;

      if (!a.endDate && !b.endDate) {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }

      if (a.endDate && b.endDate) {
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      }

      return 0;
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

  openModal(missionType?: MissionType): void {
    const dialogRef = this.dialog.open(MissionTypeModalComponent, {
      data: missionType || null,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (missionType) {
          this.missionTypeService.updateMissionType(missionType.id, result).subscribe(() => {
            this.loadMissionTypes();
          });
        } else {
          this.missionTypeService.createMissionType(result).subscribe(() => {
            this.loadMissionTypes();
          });
        }
      }
    });
  }

  openDeleteModal(missionType: MissionType): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '500px',
      data: {
        title: 'Confirmation de suppression',
        description: missionType.endDate
          ? 'Êtes-vous sûr de vouloir supprimer la nature de mission ?'
          : 'Des missions sont rattachées à cette nature de mission. Voulez-vous définir la date de fin à aujourd’hui ?',
        actionButtonLabel: missionType.endDate ? 'Supprimer' : 'Définir une date de fin',
        cancelButtonLabel: 'Annuler',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        if (missionType.endDate) {
          this.missionTypeService.deleteMissionType(missionType.id).subscribe({
            next: () => this.loadMissionTypes(),
            error: (err) => {
              this.errorMessage = err.error?.message || "Des missions sont liés à cette nature de mission.";
            }
          });
        } else {
          const updatedMissionType = { ...missionType, endDate: new Date().toISOString() };
          this.missionTypeService.fadeMissionType(missionType.id, updatedMissionType).subscribe({
            next: () => this.loadMissionTypes(),
            error: (err) => {
              this.errorMessage = err.error?.message || "Erreur lors de l'échéance de la nature de mission'.";
            }
          });
        }
      }
    });
  }

}