import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Mission, MissionSummary} from '@/app/interfaces/mission';
import {MissionStatus} from '@/app/interfaces/mission-status';
import {environment} from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  constructor(private http: HttpClient) {
  }

  getMissions = (): Observable<Mission[]> => {
    return this.http.get<Mission[]>(`${environment.apiURL}/missions`)
  }

  getMissionById = (id: number): Observable<Mission> => {
    return this.http.get<Mission>(`${environment.apiURL}/missions/${id}`)
  }

  getMissionSummaryById = (id: number): Observable<MissionSummary> => {
    return this.http.get<MissionSummary>(`${environment.apiURL}/missions/${id}`)
  }

  createMission = (mission: Mission): Observable<Mission> => {
    return this.http.post<Mission>(`${environment.apiURL}/missions`, mission)
  }

  updateMission = (mission: Mission): Observable<Mission> => {
    return this.http.put<Mission>(`${environment.apiURL}/missions/${mission.id}`, mission)
  }

  deleteMissionById = (id: number): Observable<void> => {
    return this.http.delete<void>(`${environment.apiURL}/missions/${id}`)
  }
}
