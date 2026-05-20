// notices.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoticeService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html'
})
export class NoticesComponent implements OnInit {
  notices: any[] = [];
  form: FormGroup;
  showModal = false; loading = false; saving = false;

  constructor(private svc: NoticeService, public auth: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      title:       ['', Validators.required],
      content:     ['', Validators.required],
      target_role: ['all']
    });
  }

  ngOnInit() { this.load(); }
  load() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: r => { this.notices = r.data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  save() {
    if (this.form.invalid) return;
    this.saving = true;
    this.svc.create(this.form.value).subscribe({
      next: () => { this.showModal = false; this.saving = false; this.form.reset({ target_role: 'all' }); this.load(); },
      error: () => this.saving = false
    });
  }

  roleClass(r: string) {
    return r === 'student' ? 'bg-info-subtle text-info' : r === 'faculty' ? 'bg-warning-subtle text-warning' : 'bg-success-subtle text-success';
  }
}
