import { Component, inject, OnInit, signal } from '@angular/core';
import {MissionService} from '@/app/services/mission.service';
import {Mission} from '@/app/interfaces/mission';
import {MissionsTableComponent} from '@/app/missions/missions-table/missions-table.component';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {SidenavComponent} from '@/app/components/sidenav/sidenav.component';
import { MatDialog } from '@angular/material/dialog';
import { Transport } from '@/app/interfaces/transport';
import { MissionType } from '@/app/interfaces/mission-type';
import { TransportService } from '@/app/services/transport.service';
import { MissionTypeService } from '@/app/services/mission-type.service';
import { MissionModalComponent } from '@/app/missions/mission-modal/mission-modal.component';

@Component({
  selector: 'app-missions',
  imports: [MissionsTableComponent, MatIcon, MatMiniFabButton, SidenavComponent],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.scss',
})
export class MissionsComponent implements OnInit {
  missions = signal<Mission[]>([]);
  transports = signal<Transport[]>([]);
  missionTypes = signal<Pick<MissionType, "id" | "label">[]>([]);

  dialog = inject(MatDialog);

  constructor(
    private missionService: MissionService,
    private transportService: TransportService,
    private missionTypeService: MissionTypeService,
  ) { }

  ngOnInit() {
    this.missionService.getMissions().subscribe((missions) => {
      this.missions.set(missions);
    });

    this.transportService.getTransports().subscribe((transports => {
      this.transports.set(transports);
    }));

    this.missionTypeService.getMissionTypes().subscribe((missionTypes) => {
      this.missionTypes.set(missionTypes.map(({id, label}) => ({id, label})));
    });
  }

  addMission() {
    const dialogRef = this.dialog.open(MissionModalComponent, {
      data: {title: 'Create une demande de mission', transports: this.transports(), missionTypes: this.missionTypes()},
    });
  }
}
