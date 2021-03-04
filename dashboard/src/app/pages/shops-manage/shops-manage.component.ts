import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../layouts/shared.service';

@Component({
  selector: 'page-shops-manage',
  templateUrl: './shops-manage.component.html',
  styleUrls: ['./shops-manage.component.scss']
})

export class PageShopsManageComponent implements OnInit {
  pageTitle: string = 'ניהול חנויות';

  // Constractor
  constructor( private _sharedService: SharedService) {
    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit(): void {
  }

}
