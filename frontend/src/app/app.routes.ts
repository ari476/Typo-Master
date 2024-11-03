import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { LoginPageComponent } from './login-page/login-page.component'

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginPageComponent }
]
