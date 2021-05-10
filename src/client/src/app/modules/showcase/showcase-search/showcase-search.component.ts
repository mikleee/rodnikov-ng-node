import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-showcase-search',
  templateUrl: './showcase-search.component.html',
  styleUrls: ['./showcase-search.component.scss']
})
export class ShowcaseSearchComponent implements OnInit {
  fm: FormGroup = new FormGroup({
    keyword: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(first())
      .subscribe(params => {
        this.fm.setValue({keyword: params['keyword']});
      })
  }

  onSubmit(): void {
    if (this.fm.valid) {
      this.router.navigate(['/products'], {queryParams: {keyword: this.fm.controls.keyword.value}});
    }
  }

}
