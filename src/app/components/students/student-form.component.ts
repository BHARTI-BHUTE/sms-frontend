// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-student-form',
//   templateUrl: './student-form.component.html',
//   styleUrls: ['./student-form.component.css']
// })
// export class StudentFormComponent implements OnInit {

//   form!: FormGroup;
//   saving = false;
//   error = '';
//   isEdit = false;

//   departments = [
//     { id: 1, name: 'Computer Science' },
//     { id: 2, name: 'Information Technology' },
//     { id: 3, name: 'Electronics' }
//   ];

//   constructor(
//     private fb: FormBuilder,
//     private router: Router
//   ) { }

//   ngOnInit(): void {

//     this.form = this.fb.group({
//       first_name: ['', Validators.required],
//       last_name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: [''],
//       phone: [''],
//       gender: ['Male'],
//       date_of_birth: [''],
//       department_id: [''],
//       current_semester: [''],
//       enrollment_year: [''],
//       address: ['']
//     });

//   }

//   submit(): void {

//     if (this.form.invalid) {
//       return;
//     }

//     console.log(this.form.value);

//     alert('Student Saved Successfully');

//     this.router.navigate(['/students']);

//   }

// }

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { StudentService } from '../../services/api.service';

// @Component({
//   selector: 'app-student-form',
//   templateUrl: './student-form.component.html',
//   styleUrls: ['./student-form.component.css']
// })
// export class StudentFormComponent implements OnInit {

//   form!: FormGroup;
//   saving = false;
//   error = '';
//   isEdit = false;

//   departments = [
//     { id: 1, name: 'Computer Science' },
//     { id: 2, name: 'Information Technology' },
//     { id: 3, name: 'Electronics' }
//   ];

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private svc: StudentService
//   ) { }

//   ngOnInit(): void {

//     this.form = this.fb.group({
//       first_name: ['', Validators.required],
//       last_name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['Student@123'],
//       phone: [''],
//       gender: ['Male'],
//       date_of_birth: [''],
//       department_id: ['', Validators.required],
//       current_semester: ['1'],
//       enrollment_year: [new Date().getFullYear()],
//       address: ['']
//     });

//   }

//   submit(): void {

//     if (this.form.invalid) {

//       this.error = 'Please fill all required fields';

//       return;
//     }

//     console.log(this.form.value);

//     this.saving = true;

//     this.svc.create(this.form.value).subscribe({

//       next: (res: any) => {

//         console.log('Student Created Successfully', res);

//         alert('Student Added Successfully');

//         this.saving = false;

//         this.router.navigate(['/students']);

//       },

//       error: (err) => {

//         console.log(err);

//         this.error = err.error?.message || 'API Error';

//         this.saving = false;

//       }

//     });

//   }

// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/api.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  form!: FormGroup;

  saving = false;
  loading = false;
  error = '';

  isEdit = false;

  studentId: number = 0;

  departments = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Information Technology' },
    { id: 3, name: 'Electronics' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private svc: StudentService
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['Student@123'],
      phone: [''],
      gender: ['Male'],
      date_of_birth: [''],
      department_id: ['', Validators.required],
      current_semester: ['1'],
      enrollment_year: [new Date().getFullYear()],
      address: ['']
    });

    // CHECK EDIT MODE
    this.route.params.subscribe(params => {

      if (params['id']) {

        this.isEdit = true;

        this.studentId = +params['id'];

        this.loadStudent();

      }

    });

  }

  // LOAD SINGLE STUDENT
  loadStudent(): void {

    this.loading = true;

    this.svc.getOne(this.studentId).subscribe({

      next: (res: any) => {

        console.log(res);

        const student = res.data || res;

        this.form.patchValue(student);

        this.loading = false;

      },

      error: (err) => {

        console.log(err);

        this.error = 'Failed to load student';

        this.loading = false;

      }

    });

  }

  // SUBMIT FORM
  submit(): void {

    if (this.form.invalid) {

      this.error = 'Please fill all required fields';

      return;

    }

    this.saving = true;

    console.log(this.form.value);

    // UPDATE
    if (this.isEdit) {

      this.svc.update(this.studentId, this.form.value).subscribe({

        next: (res: any) => {

          console.log('Student Updated', res);

          alert('Student Updated Successfully');

          this.saving = false;

          this.router.navigate(['/students']);

        },

        error: (err) => {

          console.log(err);

          this.error = err.error?.message || 'Update Failed';

          this.saving = false;

        }

      });

    }

    // CREATE
    else {

      this.svc.create(this.form.value).subscribe({

        next: (res: any) => {

          console.log('Student Created', res);

          alert('Student Added Successfully');

          this.saving = false;

          this.router.navigate(['/students']);

        },

        error: (err) => {

          console.log(err);

          this.error = err.error?.message || 'Create Failed';

          this.saving = false;

        }

      });

    }

  }

}