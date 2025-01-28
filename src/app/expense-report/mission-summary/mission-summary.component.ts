import {Component, input} from '@angular/core';
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
}
