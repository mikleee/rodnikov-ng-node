import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  url$?: Subscription;
  categoriesLinkInteractive: boolean = false;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.url$ = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(value => {
        this.categoriesLinkInteractive = (value as NavigationEnd).url !== '/';
      });

  }

  ngOnDestroy(): void {
    this.url$?.unsubscribe();
  }


}
