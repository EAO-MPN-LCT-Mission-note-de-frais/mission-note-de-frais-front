import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MissionType} from '../interfaces/mission-type';
import {environment} from '@/environments/environment';
import {AuthService} from '@/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MissionTypeService {
  private apiUrl = environment.apiURL + '/mission-types';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getHttpOptions() {
    return {
      headers: {
        'Authorization': 'Bearer ' + this.authService.getToken()
      }
    }
  }

  /**
   * Récupère la liste des types de mission.
   * @returns Observable<MissionType[]>
   */
  getMissionTypes(): Observable<MissionType[]> {
    return this.http.get<MissionType[]>(this.apiUrl, this.getHttpOptions());
  }

  /**
   * Récupère un type de mission par son ID.
   * @param id ID du type de mission
   * @returns Observable<MissionType>
   */
  getMissionTypeById(id: number): Observable<MissionType> {
    return this.http.get<MissionType>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crée un nouveau type de mission.
   * @param missionType Données du type de mission à créer
   * @returns Observable<MissionType>
   */
  createMissionType(missionType: MissionType): Observable<MissionType> {
    return this.http.post<MissionType>(this.apiUrl, missionType);
  }

  /**
   * Met à jour un type de mission existant.
   * @param id ID du type de mission
   * @param missionType Données mises à jour
   * @returns Observable<MissionType>
   */
  updateMissionType(id: number, missionType: MissionType): Observable<MissionType> {
    return this.http.put<MissionType>(`${this.apiUrl}/${id}`, missionType);
  }

  /**
   * Supprime un type de mission par son ID.
   * @param id ID du type de mission
   * @returns Observable<void>
   */
  deleteMissionType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
