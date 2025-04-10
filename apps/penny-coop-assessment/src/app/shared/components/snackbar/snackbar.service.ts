import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration = 3000) {
    this.snackBar.open(message, '', {
      duration,
      panelClass: ['bg-green-500', 'text-white', 'rounded-xl'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  error(message: string, duration = 3000) {
    this.snackBar.open(message, '', {
      duration,
      panelClass: ['bg-red-500', 'text-white', 'rounded-xl'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
      politeness: 'assertive',
      data: {
        buttonClass: 'text-white hover:text-gray-200 font-medium',
      },
    });
  }

  info(message: string, duration = 3000) {
    this.snackBar.open(message, '', {
      duration,
      panelClass: ['bg-orange-500', 'text-white', 'rounded-xl'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
