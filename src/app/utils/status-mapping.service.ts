import { Injectable } from '@angular/core';
import { Status } from '@/app/interfaces/status';

@Injectable({
  providedIn: 'root'
})
export class StatusMappingService {
  private statusMap: { [key in Status]: number } = {
    [Status.INITIALE]: 1,
    [Status.EN_ATTENTE_VALIDATION]: 2,
    [Status.VALIDEE]: 3,
    [Status.REJETEE]: 4,
    [Status.ANNULEE]: 5
  };

  getStatusIdByName(statusName: Status): number {
    return this.statusMap[statusName];
  }
}
