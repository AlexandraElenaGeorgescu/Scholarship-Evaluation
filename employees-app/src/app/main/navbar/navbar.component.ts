import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AgeService } from 'src/app/services/age.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() emitSelectedFilter = new EventEmitter<number>();
  selectedFilter: number | any;
  age: number[];

  constructor(private router: Router, ageService: AgeService) {
    this.age = ageService.getAge();
  }

  ngOnInit(): void {}

  onFilterPressed(): void {
    this.emitSelectedFilter.emit(this.selectedFilter);
    console.log(this.selectedFilter);
  }

  onShowAllPressed(): void {
    this.emitSelectedFilter.emit(0);
  }
  navigateToAdd(): void {
    this.router.navigate(['/add-employee']);
  }
}
