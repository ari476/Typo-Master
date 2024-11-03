import { Component, Inject } from '@angular/core'
import { MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar'
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'

@Component({
  selector: 'app-pop-bar',
  standalone: true,
  imports: [MatSnackBarLabel],
  templateUrl: './pop-bar.component.html',
  styleUrl: './pop-bar.component.scss'
})
export class PopBarComponent {
  constructor (
    public snackBarRef: MatSnackBarRef<PopBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}
}
