import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoginComponent } from './components/auth/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/shared/sidebar.component';
import { NavbarComponent } from './components/shared/navbar.component';
import { StudentsListComponent } from './components/students/students-list.component';
import { StudentFormComponent } from './components/students/student-form.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { MarksComponent } from './components/marks/marks.component';
import { FeesComponent } from './components/fees/fees.component';
import { NoticesComponent } from './components/notices/notices.component';


@NgModule({
  declarations: [
    AppComponent, LoginComponent, DashboardComponent,
    SidebarComponent, NavbarComponent,
    StudentsListComponent, StudentFormComponent,
    CoursesComponent, AttendanceComponent,
    MarksComponent, FeesComponent, NoticesComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
