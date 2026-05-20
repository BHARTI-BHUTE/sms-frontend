import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="auth.isLoggedIn(); else loginView">
      <div class="d-flex">
        <app-sidebar></app-sidebar>
        <div class="flex-grow-1 d-flex flex-column" style="min-height:100vh">
          <app-navbar></app-navbar>
          <main class="p-4 flex-grow-1"><router-outlet></router-outlet></main>
        </div>
      </div>
    </ng-container>
    <ng-template #loginView><router-outlet></router-outlet></ng-template>`
})
export class AppComponent { constructor(public auth: AuthService) {} }
