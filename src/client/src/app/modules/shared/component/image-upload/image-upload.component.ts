import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input() subject$?: Subject<File[]>
  @Input() id: string = Math.random().toString();
  @Input() multiple: boolean = false;
  @Input("upload-title") title: string = 'Upload image';

  constructor() {
  }

  ngOnInit(): void {
  }


}
