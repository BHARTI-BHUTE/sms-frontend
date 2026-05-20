// sidebar.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({ selector: 'app-sidebar', templateUrl: './sidebar.component.html' })
export class SidebarComponent {
  constructor(private auth: AuthService) {}
  logout() { this.auth.logout(); }
}
