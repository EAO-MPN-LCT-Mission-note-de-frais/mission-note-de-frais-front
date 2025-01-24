import {Component, OnInit, signal} from '@angular/core';
import {MissionService} from '@/app/services/mission.service';
import {Mission} from '@/app/interfaces/mission';
import {MissionsTableComponent} from '@/app/components/missions-table/missions-table.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-missions',
  imports: [MissionsTableComponent, MatIcon, MatIconButton, MatButton, MatFabButton, MatMiniFabButton, MatCard],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.scss',
})
export class MissionsComponent implements OnInit {
  missions = signal<Mission[]>([]);

  constructor(private missionService: MissionService) {
  }

  ngOnInit() {
    this.missionService.getMissions().subscribe((missions) => {
      this.missions.set(missions);
    });
  }
}
