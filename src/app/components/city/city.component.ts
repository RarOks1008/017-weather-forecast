import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public toggle = false;
  private waitTime = 3000;
  public cityItem;
  public cityItemDate;

  public toggleDo(toggle: boolean) {
    this.toggle = toggle;
  }

  constructor(private route: ActivatedRoute, private router: Router,private toastr: ToastrService, private cityService: CityService) { }

  ngOnInit(): void {
    this.getCity();
  }

  private getCity():void {
    const city = this.route.snapshot.paramMap.get('name');
    this.subscription.add(this.cityService.geCity(city).subscribe(
      response => {
        this.cityItem = response;
        if (!this.cityItem) {
          this.router.navigate(['home']);
        }
        if (!this.cityItem.dt) {
          this.router.navigate(['home']);
        }
        this.cityItemDate = new Date(this.cityItem.dt * 1000);
        this.cityService.check_city(this.cityItem.name, this.cityItemDate);
      },
      () => { this.errorFunc("Error", "Unexpected error occured. Please try again later."); }
    ));
  }

  errorFunc(title, message) {
    this.toastr.error(message, title , {
      timeOut :  this.waitTime
    });
  }
  

  //TODO treba se i dodati neki filter za datume
  //TODO treba nakon 3 sekunde da se vrati na home jer nema tog grada
  // |date: 'dd-MM-yyyy HH-mm' za kraci datum, ide bez sekunde!
  //Skini sve konzol logove
  // koristi One call api za dohvatanje temperature za 7 dana preko https://api.openweathermap.org/data/2.5/onecall?lat={latitude}&lon={longitude}&exclude=hourly,minutely&appid={onaj_moj_kljuc}
}
