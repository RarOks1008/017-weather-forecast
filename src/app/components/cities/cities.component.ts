import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  @Input() cities: number;
  public cityList = [];

  constructor(private cityService: CityService, private router: Router) { }

  ngOnInit(): void {
    var searched = this.cityService.getCities();
    for (var i = searched.length - 1; i >= 0; i--) {
      if (this.cities > 0) {
        this.cityList.push(searched[i]);
        this.cities--;
      }
    }
    console.log(this.cityList);
  }

  public selected(name: string) {
    this.router.navigate(['../city/' + name]);
  }
}
