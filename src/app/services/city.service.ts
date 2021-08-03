import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private cities = [];
  private wT = '4152eee46fd8589d2938d11f52504872';

  public geCity(name: string): Observable<any> {
    var city = this.service.get("http://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=" + this.wT);
    return city;
  }

  public check_city(name: string, date: Date) {
    if (!name) return;
    if (!date) return;
    var exists = false;
    this.cities.forEach((c) => {
      if (exists) return;
      if (c.name == name) exists = true;
    });
    if (exists) return;
    this.cities.push({name: name, date: date});
  }

  public getCities() {
    return this.cities;
  }

  constructor(private service: HttpClient) { }
}
