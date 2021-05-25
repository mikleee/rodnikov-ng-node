import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {randomString} from "../../utils";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input() id: string = randomString();
  @Input() multiple: boolean = false;
  @Input("upload-title") title?: string;
  @Output() public onFilesChange: EventEmitter<File[]> = new EventEmitter<File[]>();

  constructor() {
  }

  ngOnInit(): void {
  }


}
