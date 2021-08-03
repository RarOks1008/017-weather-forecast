import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CityService } from 'src/app/services/city.service';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  private citySubscription: Subscription = new Subscription();
  private temperatureSubscription: Subscription = new Subscription();
  public toggle = true;
  public cityItem;
  public cityItemDate;
  public typeSelected = 'chart';

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Temperature' },
  ];
  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.20)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  tableData = [];

  public toggleDo(toggle: boolean) {
    this.toggle = toggle;
  }

  constructor(private route: ActivatedRoute, private router: Router, private cityService: CityService) {
    this.route.params.subscribe(() => {
      this.getCity();
    });
  }

  ngOnInit(): void { }

  private getCity():void {
    const city = this.route.snapshot.paramMap.get('name');
    this.citySubscription.add(this.cityService.geCity(city).subscribe(
      response => {
        this.cityItem = response;
        if (!this.cityItem || !this.cityItem.dt || !this.cityItem.coord) {
          this.router.navigate(['home']);
        }
        this.getDailyTemperature(this.cityItem.coord.lon, this.cityItem.coord.lat);
        this.cityItemDate = new Date(this.cityItem.dt * 1000);
        this.cityService.check_city(this.cityItem.name, this.cityItemDate);
      },
      () => {
        this.router.navigate(['home']);
      }
    ));
  }

  private getDailyTemperature(lon: Number, lat: Number) {
    this.temperatureSubscription.add(this.cityService.getTemperatures(lon, lat).subscribe(
      response => {
        if (!response || !response.daily) return;
        response.daily.forEach((day) => {
          const dayFullDate = new Date(day.dt * 1000),
            monthDate = dayFullDate.getUTCMonth() + 1,
            dayDate = dayFullDate.getUTCDate(),
            chartData = Number((day.temp.day - 273.15).toFixed(2)),
            chartLabel = dayDate + '.' + monthDate + '.';
          this.lineChartData[0].data.push(chartData);
          this.lineChartLabels.push(chartLabel);
          this.tableData.push({temp: chartData, day: chartLabel});
        });
      },
      () => {
        this.router.navigate(['home']);
      }
    ));
  }

  public selectData(type: string) {
    this.typeSelected = type;
  }
}
