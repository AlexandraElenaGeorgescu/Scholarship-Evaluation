import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models';
import { AgeService } from 'src/app/services/age.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PositionsService } from 'src/app/services/positions.service';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee;
  age: number[] | any;
  positions: string[] | any;
  employeeForm: FormGroup | any;
  error: string | any;
  constructor(
    private route: ActivatedRoute,
    private service: EmployeeService,
    private positionsService: PositionsService,
    private ageService: AgeService,
    private snackBar: MatSnackBar,
    private router: Router
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
    this.age = this.ageService.getAge();
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
  private handleError(error: HttpErrorResponse): void {
    if (error.status == 0) this.error = 'Connection refused :(';
    else this.error = error.error + ', ' + error.status + ':(';
    this.openSnackBar();
  }

  saveEmployee(): void {
    if (this.employeeForm.valid) {
      this.employee.name = this.employeeForm.get('name').value;
      this.employee.position = this.employeeForm.get('position').value;
      this.employee.age = Number(
        this.employeeForm.get('age').value
      );
      console.log(this.employee);

      this.service.addEmployee(this.employee).subscribe(
        (_) => this.router.navigate(['']),
        (error) => this.handleError(error)
      );
    }
  }
}
