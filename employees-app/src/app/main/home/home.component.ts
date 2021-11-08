import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  filter: number | undefined;
  constructor() {}
  onFilterChange(event: number): void {
    this.filter = event;
    console.log(this.filter);
  }
  ngOnInit(): void {}
}
