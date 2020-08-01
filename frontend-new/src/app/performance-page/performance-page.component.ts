import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-page',
  templateUrl: './performance-page.component.html',
  styleUrls: ['./performance-page.component.css']
})
export class PerformancePageComponent implements OnInit {
  data: any;

  constructor() {
    this.data = {
      labels: ['Memory', 'Global Cognitive', 'Attention', 'Information processing', 'Verbal Function', 'Motor Skills', 'Visuopatial'],
      datasets: [
        {
          label: 'Study Mode',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: 'Learning Mode',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    };
  }
  public display = false;

  ngOnInit(): void {

  }

  public displayChange() {
    this.display = !this.display;
  }
}
