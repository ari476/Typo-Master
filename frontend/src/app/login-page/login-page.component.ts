import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms'
import { Component } from '@angular/core'
import { UserService } from '../firebase/services/user.service'
import { TranslateService } from '../firebase/services/translate.service'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { merge } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { usernameExistsValidator } from '../validators/username-exist'
import { MatCardModule } from '@angular/material/card'
import { ToastService } from '../toast.service'
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  isLoginMode: boolean = false
  errorMessage = ''
  usernameCtrl = new FormControl<string>('', {
    validators: [Validators.required],
    asyncValidators: [usernameExistsValidator(this.userService)]
  })
  constructor (
    private userService: UserService,
    private translateService: TranslateService,
    private toastService: ToastService,
    private router: Router
  ) {
    merge(this.usernameCtrl.statusChanges, this.usernameCtrl.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage())
  }

  async ngOnInit () {
    // this.userService.isUserExists('ari').then(result => {
    //   console.log(result)
    // })
    //  let matchesTranslations = await this.apiTr.translateEnToHe('current');
    // await this.apiTr.translateHeToEn('לאבחן')

    let username: string | null = localStorage.getItem('username')
    if (username) {
      this.userService.isUserExists(username).then(result => {
        console.log(result)
        this.toastService.openSnackBar(`${username}, Welcome back!`)
        this.navigateToHome()
      })
    }
  }

  onSubmit () {
    if (this.usernameCtrl.valid) {
      let username = this.usernameCtrl.value!
      if (this.isLoginMode) {
        this.login(username)
      } else {
        this.signUp(username)
      }
    }
  }

  login (username: string) {
    this.userService.isUserExists(username).then(result => {
      this.toastService.openSnackBar(`${username}, Welcome back!`)
      localStorage.setItem('username', username)
      this.navigateToHome()
    })
  }
  signUp (username: string) {
    this.userService.addNewUser(username).then(data => {
      this.toastService.openSnackBar(`${username}, Welcome!!!`)
      localStorage.setItem('username', username)
      this.navigateToHome()
    })
  }

  logout () {
    localStorage.removeItem('username')
    this.navigateToLogin()
  }
  updateErrorMessage () {
    if (this.usernameCtrl.hasError('required')) {
      this.errorMessage = 'You must enter a value'
    } else if (this.usernameCtrl.hasError('usernameExists')) {
      this.errorMessage = 'Username is already exists'
    }
  }

  toggleMode () {
    this.isLoginMode = !this.isLoginMode

    if (this.isLoginMode) {
      this.usernameCtrl.clearAsyncValidators()
    } else {
      this.usernameCtrl.setAsyncValidators([
        usernameExistsValidator(this.userService)
      ])
    }
    this.usernameCtrl.updateValueAndValidity()
  }

  navigateToHome () {
    this.router.navigate(['/home'])
  }
  navigateToLogin () {
    this.router.navigate(['/login'])
  }
}
