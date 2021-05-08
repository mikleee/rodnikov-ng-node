import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pagination} from "../model/pagination.model";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pagination: Pagination = new Pagination();
  @Output() onPagination: EventEmitter<Pagination> = new EventEmitter<Pagination>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onPageChange(pageNo: any) {
    this.pagination.pageNo = pageNo;
    this.onPagination.emit(this.pagination);
  }

  onPageSizeChange() {
    this.pagination.pageNo = 1;
    this.onPagination.emit(this.pagination);
  }

}
