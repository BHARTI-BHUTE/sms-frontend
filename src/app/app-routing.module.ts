import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsListComponent } from './components/students/students-list.component';
import { StudentFormComponent } from './components/students/student-form.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { MarksComponent } from './components/marks/marks.component';
import { FeesComponent } from './components/fees/fees.component';
import { NoticesComponent } from './components/notices/notices.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard',         component: DashboardComponent,   canActivate: [AuthGuard] },
  { path: 'students',          component: StudentsListComponent, canActivate: [AuthGuard] },
  { path: 'students/add',      component: StudentFormComponent,  canActivate: [AuthGuard] },
  { path: 'students/edit/:id', component: StudentFormComponent,  canActivate: [AuthGuard] },
  { path: 'courses',           component: CoursesComponent,      canActivate: [AuthGuard] },
  { path: 'attendance',        component: AttendanceComponent,   canActivate: [AuthGuard] },
  { path: 'marks',             component: MarksComponent,        canActivate: [AuthGuard] },
  { path: 'fees',              component: FeesComponent,         canActivate: [AuthGuard] },
  { path: 'notices',           component: NoticesComponent,      canActivate: [AuthGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
