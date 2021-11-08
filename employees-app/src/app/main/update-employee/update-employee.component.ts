import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models';
import { AgeService } from 'src/app/services/age.service';
import { PositionsService } from 'src/app/services/positions.service';



@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee;
  age: number[] | any;
  positions: string[] | any;
  employeeForm: FormGroup | any;
  error: string | any;
  constructor(
    private positionsService: PositionsService,
    private collegeYearsService: AgeService,
    private snackBar: MatSnackBar,

    private dialogRef: MatDialogRef<UpdateEmployeeComponent>
  ) {
    this.employee = {
      id: '',
      name: '',
      position: '',
      age: 0,
    };
  }

  ngOnInit(): void {
    this.positions = this.positionsService.getPositions();
    this.age = this.collegeYearsService.getAge();
    this.employeeForm = new FormGroup({
      name: new FormControl(this.employee.name, Validators.required),
     
      position: new FormControl(this.employee.position, Validators.required),
      age: new FormControl(
        this.employee.age,
        Validators.required
      ),
    });
  }
  openSnackBar() {
    this.snackBar.open(this.error, 'Ok', {
      duration: 3000,
    });
  }

  saveEmployee(): void {
    if (this.employeeForm.valid) {
      this.employee.name = this.employeeForm.get('name').value;
      this.employee.position = this.employeeForm.get('position').value;
      this.employee.age = Number(
        this.employeeForm.get('age').value
      );
      this.dialogRef.close({ employee: this.employee });
    }
  }

  check(age: number): boolean {
    return age === this.employee.age;
  }
}
