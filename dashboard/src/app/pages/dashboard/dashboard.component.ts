import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../layouts/shared.service';
import { Brand } from '../../models/brands';
import { latLng, tileLayer, circle, polygon, marker } from 'leaflet';
import { RealtimeService } from '../../services/realtime.service';

import { BrandsService } from 'src/app/services/brands.service';
import { CurrentBrandService } from 'src/app/services/current-brand.service';

// To do list -----> DB-Mongodb ההזמנות האחרונות- להביא מבסיס הנתונים
const folders: any[] = [
  {
    icon: 'android',
    badge: false,
    name: 'Android app',
    updated: 'March 21, 2017'
  },
  {
    icon: 'update',
    badge: false,
    name: 'Update plugins',
    updated: 'March 19, 2017'
  },
  {
    icon: 'bug_report',
    badge: false,
    name: 'Fix bugs',
    updated: 'March 22, 2017'
  },
  {
    icon: 'unarchive',
    badge: false,
    name: 'Create app design',
    updated: 'March 25, 2017'
  },
  {
    icon: 'content_copy',
    badge: 8,
    name: 'Create widgets',
    updated: 'March 16, 2017'
  },
  {
    icon: 'folder_open',
    badge: false,
    name: 'Documentation',
    updated: 'March 28, 2017'
  }
];

// Time line -------> עדיין בתכנון
const timelineData: any[] = [
  {
    'timeline': [
      {
        'content': `Aenean lacinia bibendum nulla sed consectetur.`,
        'pointColor': '#ea8080'
      },
      {
        'content': `Aenean lacinia bibendum nulla.`,
        'pointColor': '#915035'
      },
      {
        'content': `Lorem ipsum dolor sit amet.`,
        'pointColor': '#B925FF'
      },
      {
        'content': `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
        'pointColor': '#C5CAE9'
      },
      {
        'content': `Lorem ipsum dolor sit.`,
        'pointColor': '#FF8A65'
      }
    ]
  }
];

@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})
export class PageDashboardComponent implements OnInit {
  pageTitle: string = 'עמוד ראשי';
  folders: any[] = folders;
  timelineData: any[] = timelineData;

  // Amount of users connected
  counter : Number;
  

  // Constractor
  constructor( private _sharedService: SharedService,  private _realtime: RealtimeService) {
    this._sharedService.emitChange(this.pageTitle);
    this._realtime.currentCounter.subscribe(counter => this.counter = counter);
  
  
  }
  ngOnInit() {
  
  }


  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    responsiveAnimationDuration: 500
  };

  // get all the Shops -- עמודה לכל חנות/רשת חנויות
  public barChartLabels: string[] = [
    '2012', '2013', '2014', '2015', '2016', '2017'
  ];

  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {
      data: [59, 80, 81, 56, 55, 40],
      label: 'Angular JS',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [48, 40, 19, 86, 27, 90],
      label: 'React JS',
      borderWidth: 1,
      pointRadius: 1
    }
  ];

  // צריך לבדוק מה הפונקציה הזאת עושה והיכן היא מוצגת על המסך
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/table-data.json');

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  /*
  // Pie
  public pieChartLabels: string[] = [
    'Angular',
    'PHP',
    'HTML'
  ];
  public pieChartData: any[] = [
    300,
    500,
    100
  ];
  public pieChartColors: any[] = [
    {
      backgroundColor: [
        "#778391",
        "#5dade0",
        "#3c4e62"
      ],
    }
  ];
  public pieChartType: string = 'pie';
  public pieChartOptions: any = {
    elements: {
      arc : {
        borderWidth: 0
      }
    },
    tooltips: false
  };

  //Doughnut
  public doughnutChartLabels: string[] = [
    'Angular',
    'PHP',
    'HTML'
  ];
  public doughnutChartData: number[] = [
    350,
    450,
    100
  ];
  public doughnutChartColors: any[] = [
    {
      backgroundColor: [
        "#778391",
        "#ff8c00",
        "#3c4e62"
      ],
    }
  ];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartOptions: any = {
    elements: {
      arc : {
        borderWidth: 0
      }
    },
    tooltips: false
  };

  // PolarArea
  public polarAreaChartLabels: string[] = [
    'Angular',
    'PHP',
    'HTML'
  ];
  public polarAreaChartData: number[] = [
    300,
    400,
    500
  ];
  public polarAreaChartColors: any[] = [
    {
      backgroundColor: [
        "#778391",
        "#dc143c",
        "#3c4e62"
      ],
    }
  ];
  public polarAreaChartType: string = 'polarArea';
  public polarAreaChartOptions: any = {
    elements: {
      arc : {
        borderWidth: 0
      }
    },
    tooltips: false
  };*/
}