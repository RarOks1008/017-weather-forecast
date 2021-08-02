import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  public geCity(name: string): Observable<any> {
    var city = this.service.get("http://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=4152eee46fd8589d2938d11f52504872");
    return city;
  }

  constructor(private service: HttpClient) { }
}
