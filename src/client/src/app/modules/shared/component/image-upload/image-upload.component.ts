import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input() subject$?: Subject<FileList>
  @Input() id: string = Math.random().toString();
  @Input() multiple: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }


}
