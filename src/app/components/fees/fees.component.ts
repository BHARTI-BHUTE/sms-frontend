import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeesService, StudentService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
@Component({ selector: 'app-fees', templateUrl: './fees.component.html' })
export class FeesComponent implements OnInit {
  fees: any[] = []; students: any[] = []; summary: any = {};
  form: FormGroup; payForm: FormGroup;
  showAddModal = false; showPayModal = false; payId: number | null = null;
  loading = false; saving = false; filterStatus = '';
  feeTypes = ['tuition','hostel','library','lab','exam','other'];
  constructor(private svc: FeesService, private stuSvc: StudentService, public auth: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({ student_id: ['', Validators.required], fee_type: ['tuition', Validators.required], amount: ['', Validators.required], due_date: ['', Validators.required], semester: [1], year: [new Date().getFullYear()] });
    this.payForm = this.fb.group({ payment_method: ['cash', Validators.required], transaction_id: [''] });
  }
  ngOnInit() { this.stuSvc.getAll({ limit: 100 }).subscribe((r: any) => this.students = r.data || []); this.loadSummary(); this.load(); }
  load() { this.loading = true; this.svc.getAll({ status: this.filterStatus }).subscribe({ next: (r: any) => { this.fees = r.data || []; this.loading = false; }, error: () => this.loading = false }); }
  loadSummary() { this.svc.getSummary().subscribe((r: any) => this.summary = r.data || {}); }
  add() {
    if (this.form.invalid) return; this.saving = true;
    this.svc.add(this.form.value).subscribe({ next: () => { this.showAddModal = false; this.saving = false; this.load(); this.loadSummary(); }, error: () => this.saving = false });
  }
  openPay(id: number) { this.payId = id; this.payForm.reset({ payment_method: 'cash' }); this.showPayModal = true; }
  pay() {
    if (!this.payForm.valid || !this.payId) return; this.saving = true;
    this.svc.pay(this.payId!, this.payForm.value).subscribe({ next: () => { this.showPayModal = false; this.saving = false; this.load(); this.loadSummary(); }, error: () => this.saving = false });
  }
  statusClass(s: string) { return { 'bg-success': s==='paid', 'bg-danger': s==='overdue', 'bg-warning text-dark': s==='pending', 'bg-info': s==='partial' }; }
}
