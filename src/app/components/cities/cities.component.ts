import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  @Input() cities: number;

  constructor() { }

  ngOnInit(): void {
  }

}
