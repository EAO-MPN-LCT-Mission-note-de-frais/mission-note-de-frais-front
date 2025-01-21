import { Component, OnInit } from '@angular/core';
import { MissionTypeService } from '../services/mission-type.service';
import { MissionType } from '../interfaces/mission-type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mission-type',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './mission-type.component.html',
  styleUrls: ['./mission-type.component.scss']
})
export class MissionTypeComponent implements OnInit {
  missionTypes: MissionType[] = [];
  errorMessage = '';

  constructor(private missionTypeService: MissionTypeService) {}

  ngOnInit(): void {
    this.loadMissionTypes();
  }

  loadMissionTypes(): void {
    this.missionTypeService.getMissionTypes().subscribe({
      next: (data) => (this.missionTypes = data),
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
}
