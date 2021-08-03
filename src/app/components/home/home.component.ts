import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public toggle = false;
  public cityName = '';

  public toggleDo(toggle: boolean) {
    this.toggle = toggle;
  }

  public onKeyDown(event) {
    if (event.key === "Enter") {
      this.router.navigate(['/city/' + this.cityName]);
    }
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
