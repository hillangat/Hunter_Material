import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatSidenav } from '@angular/material';
import { Router,  ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'RXJS';
import { Title } from '@angular/platform-browser';
import { HunterConstants } from 'app/shared/constants/HunterConstants';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  public windowHeight: number = window.innerHeight;
  public reason = '';
  private isSideNavOpen = false;

  public constructor( private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title ) {}

  public close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  public closeOpenSideName() {
    if ( !this.isSideNavOpen ) {
      this.sidenav.open();
      this.isSideNavOpen = true;
    } else {
      this.sidenav.close();
    }
  }

  public ngOnInit() {
    this.sidenav.onClose.subscribe( () => this.isSideNavOpen = !this.isSideNavOpen );
  }

  public ngOnDestroy() {
    this.sidenav = undefined;
  }

  private subsToOnNavEnd(): void {
    this.router.events
        .filter((event) => event instanceof NavigationEnd)
        .map(() => this.activatedRoute)
        .map((route) => {
          while ( route.firstChild ) {
            route = route.firstChild
          }
          return route;
        })
        .filter((route) => route.outlet === 'primary')
        .mergeMap((route) => route.data)
        .subscribe((event) =>  this.titleService.setTitle( event['title'] ? event['title'] : HunterConstants.APP_DEFAULT_TITLE ) );
  }

  public ngAfterViewInit(): void {
    this.subsToOnNavEnd();
  }

}

