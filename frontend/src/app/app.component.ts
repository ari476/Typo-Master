import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from "./login-page/login-page.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, LoginPageComponent]
})
export class AppComponent {
  title = 'frontend';
}
