import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../layouts/shared.service';
import { Brand } from '../../models/brands';
import { RealtimeService } from '../../services/realtime.service';

import { BrandsService } from 'src/app/services/brands.service';
import { CurrentBrandService } from 'src/app/services/current-brand.service';
import { ManageUsersService } from '../../services/manage-users.service';
import { ManageCouponsService } from 'src/app/services/manage-coupons.service';
import { ManageBranchesService } from 'src/app/services/manage-branches.service';
import { ManageOrdersService } from 'src/app/services/manage-orders.service';
import { ManageShopsService } from 'src/app/services/manage-shops.service';


import { Orders } from '../../models/orders';
import { Users } from '../../models/users';
import { Shops } from 'src/app/models/shops';

@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})
export class PageDashboardComponent implements OnInit {
  pageTitle: string = 'עמוד ראשי';

  // Amount of users connected
  counter: Number;
  countOfUsers: Number;
  countOfBranches: Number;
  countIsOpenBranches: Number;
  countLastDayUsersAccount: Number;
  countCoupons: Number;
  countValidCoupons: Number;
  users: Users[] = [];
  orders: Orders[] = [];
  ordersCheck: Orders[] = [];
  shops: Shops[] = [];
  chartBar: any[] = [];
  
  

  // Constractor
  constructor(private _sharedService: SharedService,
    private _realtime: RealtimeService,
    private _manageusers: ManageUsersService,
    private _managebranches: ManageBranchesService,
    private _managecoupons: ManageCouponsService,
    private _manageorders: ManageOrdersService,
    private _manageshops: ManageShopsService) {
    this.countOfBranches = 0;
    this._sharedService.emitChange(this.pageTitle);
    this._realtime.listen('count').subscribe((res: any) => {
      this.counter = res
    });
    this._manageusers.getCountUsers().subscribe(countOfUsers => this.countOfUsers = countOfUsers);
    this._managebranches.getCountBranches().subscribe(countOfBranches => this.countOfBranches = countOfBranches);
    this._managebranches.getCountIsOpenBranches().subscribe(countIsOpenBranches => this.countIsOpenBranches = countIsOpenBranches);
    //this._manageusers.getCountLasvtUsers().subscribe(countLastDayUsersAccount => this.countLastDayUsersAccount = countLastDayUsersAccount);
    this._managebranches.getCountCoupons().subscribe(countCoupons => this.countCoupons = countCoupons);
    this._managebranches.getCountValidCoupons().subscribe(countValidCoupons => this.countValidCoupons = countValidCoupons);

  }

  ngOnInit() {
    this.showUsers();
    this.showOrders();
    this.showShops();
    this.drawChart();
  }

  showUsers() {
    this._manageusers.getLastUsers().subscribe((users) => {
      this.users = users;
    })
  }

  showShops(){
    this._manageshops.getAllShops().subscribe((shops) => {
      this.shops = shops;
      //console.log(this.shops);
      this.barChartLabels = this.shops.map((shop) => shop.shopName);
      this.barChartShopId = this.shops.map((shop) => shop._id);
      //console.log(this.barChartLabels)
      //console.log(this.barChartShopId)
    })
  }




  public ChartLabels: string[] = [];
  public ChartData: string[] = [];
  shopOrder: any[] = [];

  showOrders() {
    this._manageorders.getAllOrders().subscribe((orders) => {
      this.orders = orders.filter(order => {
        return order.coupon != null
      });
      this.chartBar = this.orders.map(order => {
        return order.coupon
     })
      //console.log(this.chartBar);
      //console.log(this.orders);
      this.shopOrder = this.chartBar
     .map(z => {return { shopName: z.shop['shopName'], price: z.newPrice }})
     .reduce(function(obj, shopc){
        if(!obj[shopc.shopName]){
          obj[shopc.shopName] = 1;
        } else {
          obj[shopc.shopName] += shopc.price
        }
        return obj;
      }, [])

      console.log(this.barChartLabels);
      console.log(this.shopOrder);

    
      
    });
  }

  drawChart(){

    
  }
  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    responsiveAnimationDuration: 500
  };

  // All shops
  public barChartLabels: string[] = [];

  public barChartShopId: string[] = [];

  public barChartType: string = 'bar';

  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {
      data: [59, 80, 81, 56, 55, 40],
      label: 'מכירת קופונים ב48 שעות אחרונות',
      /*borderWidth: 2,
      pointRadius: 1*/
    },
    {
      data: [48, 40, 19, 86, 27, 90],
      label: 'מכירת קופונים ב24 שעות אחרונות',
      /*borderWidth: 1,
      pointRadius: 1*/
    }
  ];

  // CHART CLICK EVENT.
  onChartClick(event) {
    //console.log(event);
  }

  updateChartData(chart, data, dataSetIndex) {
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
  }


}