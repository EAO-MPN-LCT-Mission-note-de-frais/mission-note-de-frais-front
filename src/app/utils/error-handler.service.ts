import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar) {} // Injecter MatSnackBar

  handleError(error: any, defaultErrorMessage: string) {

    // Message par défaut
    let errorMessage = defaultErrorMessage;

    // Gérer spécifiquement HttpErrorResponse
    if (error instanceof HttpErrorResponse) {
      const serverError = error.error;
      if (serverError && serverError.message) {
        errorMessage = serverError.message;
      } else if (error.status === 0) {
        errorMessage = "Erreur réseau: Impossible de contacter le serveur.";
      }
    }

    // Affiche le message d'erreur dans le snackbar
    this.snackBar.open(errorMessage, 'Fermer', {
      duration: 5000,
      panelClass: ['error-snackbar'] });

    // Affiche dans la console l'heure, le type d'erreur, et le message
    if (error.error && error.error.errorType) {
      const errorType = error.error.errorType;
      const timestamp = error.error.timestamp;
      const message = error.error.message;
      console.error(`[${timestamp}] ${errorType}: ${message}`);
    }
  }
}
