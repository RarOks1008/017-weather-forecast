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
        console.log(this.cityItem);
        if (!this.cityItem) {
          this.router.navigate(['home']);
        }
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
  //TODO smisliti kako najbolje cuvati 9 poslednje trazenih gradova
  //TODO treba nakon 3 sekunde da se vrati na home jer nema tog grada
}
