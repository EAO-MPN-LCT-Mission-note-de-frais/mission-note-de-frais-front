import {Component, effect, input, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MissionSummary} from '../../interfaces/mission';

@Component({
  selector: 'app-mission-summary',
  imports: [CommonModule],
  templateUrl: './mission-summary.component.html',
  styleUrl: './mission-summary.component.css'
})
export class MissionSummaryComponent {
  mission = input<MissionSummary>(undefined as unknown as MissionSummary);
  transports = signal<string[]>([])

  constructor() {
    effect(() => {
      const mission = this.mission();
      if (mission && mission.transports) {
        this.transports.set(mission.transports.map(transport => transport.name));
      }
    });
  }
}
