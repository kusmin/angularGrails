import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { IndexService } from '../core/index/index.service';
import { NavService } from '../nav/nav.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  controllers: Array<any>;
  serverUrl: string;
  statusList: Array<string>;


  constructor(private navService: NavService, private router: Router, private indexService: IndexService) { }

  ngOnInit(): void {
    this.serverUrl = environment.serverUrl;
    this.navService.getNavData().subscribe(applicationData => {
      this.controllers = applicationData.controllers.sort((a: any, b: any) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
    });

    // this.statusList = this.indexService.status(statusList => this.statusList = statusList);
  }

  hasRoute(controllerName: string): boolean {
    return this.router.config.some((route: Route) => {
      if (route.path === controllerName) {
        return true;
      }
    });

  }


}
