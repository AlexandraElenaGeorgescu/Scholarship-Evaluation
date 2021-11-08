import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeService } from '../services/employee.service';
import { AgeService } from '../services/age.service';
import { PositionsService } from '../services/positions.service';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PositionDirective } from '../directives/position.directice';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  schemas:[
   NO_ERRORS_SCHEMA,
   CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    HomeComponent,
    EmployeeComponent,
    EmployeesComponent,
    PositionDirective,
    DeleteEmployeeComponent,
    NavbarComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [HomeComponent],
  providers: [EmployeeService, PositionsService, AgeService],
})
export class MainModule {}
