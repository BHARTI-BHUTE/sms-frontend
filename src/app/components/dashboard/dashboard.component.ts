import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/api.service';
@Component({ selector: 'app-dashboard', templateUrl: './dashboard.component.html' })
export class DashboardComponent implements OnInit {
  stats: any = {};
  loading = true;
  constructor(private dash: DashboardService) {}
  ngOnInit() {
    this.dash.getStats().subscribe({
      next: (r: any) => { this.stats = r.data || {}; this.loading = false; },
      error: () => this.loading = false
    });
  }
}
