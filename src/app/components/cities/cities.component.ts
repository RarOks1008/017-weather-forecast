import { Component, OnInit, Input } from '@angular/core';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  @Input() cities: number;
  public cityList = [];

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.cityList = this.cityService.getCities();
  }

}
