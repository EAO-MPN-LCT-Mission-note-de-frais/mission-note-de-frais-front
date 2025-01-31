import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission, MissionSummary } from '@/app/interfaces/mission';
import { MissionStatus } from '@/app/interfaces/mission-status';
import { environment } from '@/environments/environment';
import { z } from 'zod';

export type MissionResponse = Omit<Mission, 'status'> & {
  status: MissionStatus;
}

/**
 * Schema of the request body to create a mission.
 */
const CreateMissionSchema = z.object({
  startDate: z.string().min(1, {message: 'Start date is required'}).refine(value => !isNaN(Date.parse(value)), {
    message: 'Invalid start date format',
  }),
  endDate: z.string().min(1, {message: 'End date is required'}).refine(value => !isNaN(Date.parse(value)), {
    message: 'Invalid end date format',
  }),
  startTown: z.string().min(1, {message: 'Start town is required'}),
  endTown: z.string().min(1, {message: 'End town is required'}),
  missionTypeId: z.number().min(1, {message: 'Mission type ID is required'}),
  transportIds: z.array(z.number()).nonempty({message: 'At least one transport ID is required'}),
});

/**
 * Type of the request body to create a mission.
 */
export type CreateMissionOptions = z.infer<typeof CreateMissionSchema>;

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

  createMission = (options: CreateMissionOptions): Observable<Mission> => {
    return this.http.post<Mission>(`${environment.apiURL}/missions`, CreateMissionSchema.parse(options))
  }

  updateMission = (mission: Mission): Observable<Mission> => {
    return this.http.put<Mission>(`${environment.apiURL}/missions/${mission.id}`, mission)
  }

  deleteMissionById = (id: number): Observable<void> => {
    return this.http.delete<void>(`${environment.apiURL}/missions/${id}`)
  }
}
