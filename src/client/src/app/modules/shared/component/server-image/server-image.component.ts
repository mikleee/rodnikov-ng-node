import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-server-image',
  templateUrl: './server-image.component.html',
  styleUrls: ['./server-image.component.scss']
})
export class ServerImageComponent implements OnInit {
  @Input() imageId?: string;
  @Input() alt?: string;
  @Input() cssClass?: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
