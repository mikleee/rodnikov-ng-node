import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {randomString} from "../../utils";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input() subject$?: Subject<File[]>
  @Input() id: string = randomString();
  @Input() multiple: boolean = false;
  @Input("upload-title") title: string = 'Upload image';

  constructor() {
  }

  ngOnInit(): void {
  }


}
