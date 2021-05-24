import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginPopupComponent} from "./modules/auth/login/login-popup.component";
import {ViewState} from "./modules/shared/model/view-state.model";
import {Session} from "./modules/auth/auth.models";
import {AppStateService} from "./app-state.service";
import {AuthService} from "./modules/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  state: ViewState = new ViewState();
  session: Session = {} as Session;
  url$?: Subscription;
  categoriesLinkInteractive: boolean = false;

  constructor(private router: Router,
              private appStateService: AppStateService,
              private authService: AuthService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.state.inProgress();
    this.appStateService.initAppState()
      .subscribe(
        value => {
          this.session = value.session;
          this.state.ready()
        },
        error => this.state.error(error.message),
      )
    this.url$ = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(value => {
        this.categoriesLinkInteractive = (value as NavigationEnd).url !== '/';
      });

  }

  openLoginPopup(): void {
    let ngbModalRef = this.modalService.open(LoginPopupComponent, {centered: true});
  }

  logout(): void {
    this.state.inProgress();
    this.authService.logout()
      .subscribe(
        value => this.state.ready(),
        error => this.state.error(error.message),
      )
  }

  ngOnDestroy(): void {
    this.url$?.unsubscribe();
  }


}
