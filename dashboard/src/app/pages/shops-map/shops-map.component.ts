import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../layouts/shared.service';

@Component({
  selector: 'page-shops-map',
  templateUrl: './shops-map.component.html',
  styleUrls: ['./shops-map.component.scss']
})
export class PageShopsMapComponent implements OnInit {
  pageTitle: string = 'מפת חנויות ארצית';
  lat: number = 32.176;
  lng: number = 34.894;

  // Constractor
  constructor( private _sharedService: SharedService) {
    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit(): void {}

}
