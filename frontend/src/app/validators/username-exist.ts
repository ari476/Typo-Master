import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from '@angular/forms'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { UserService } from '../firebase/services/user.service'
import { from } from 'rxjs'

export function usernameExistsValidator (
  userService: UserService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return from(userService.isUserExists(control.value)).pipe(
      map(exists => (exists ? { usernameExists: true } : null)),
      catchError(() => of(null))
    )
  }
}
