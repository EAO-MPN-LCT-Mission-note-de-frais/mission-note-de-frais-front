import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Mission} from '../../interfaces/mission';

@Component({
  selector: 'app-mission-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mission-summary.component.html',
  styleUrl: './mission-summary.component.css'
})
export class MissionSummaryComponent {
  @Input() mission!: Mission;
}
