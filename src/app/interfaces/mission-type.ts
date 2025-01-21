export interface MissionType {
    id: number;                     // Identifiant unique du type de mission
    label: string;                  // Nom du type de mission
    isCharged: boolean;             // Indique si le type de mission est facturable
    isBonus: boolean;               // Indique si une prime est incluse
    averageDailyRate?: number;      // Taux journalier moyen (facultatif)
    bonusPercentage?: number;       // Pourcentage de la prime (facultatif)
    startDate: string;              // Date de début de validité (au format ISO : 'YYYY-MM-DD')
    endDate?: string;               // Date de fin de validité (facultatif, au format ISO)
    missionIds?: number[];          // Liste des identifiants des missions associées (facultatif)
  }
  