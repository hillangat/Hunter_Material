import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MatSidenav;

  public windowHeight: number = window.innerHeight;
  public reason = '';
  private isSideNavOpen = false;

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

}

