import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { PopBarComponent } from '../pop-bar/pop-bar.component'

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor (private _snackBar: MatSnackBar) {}

  openSnackBar (message: string) {
    let seconds = 3
    this._snackBar.openFromComponent(PopBarComponent, {
      duration: seconds * 1000,
      data: {
        message: message
      }
    })
  }
}
