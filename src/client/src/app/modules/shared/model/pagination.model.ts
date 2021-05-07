export class Pagination {
  total: number = 0;
  pageSize: number = 10;
  pageNo: number = 1;
  pageSizeOptions: number[] = [10, 30, 50];

  getPage<T>(all: T[], pageNo: any = this.pageNo): T[] {
    let page: T[] = [];
    this.pageNo = pageNo;
    this.total = all.length;
    for (let i = (this.pageNo - 1) * this.pageSize; page.length < this.pageSize && i < this.total; i++) {
      page.push(all[i]);
    }
    return page;
  }

}
