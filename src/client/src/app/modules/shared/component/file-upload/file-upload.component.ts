import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {randomString} from "../../utils";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() id: string = randomString();
  @Input() multiple: boolean = false;
  @Input() accept?: string;
  @Input("upload-title") title?: string;
  @Output() onFilesChange: EventEmitter<File[]> = new EventEmitter<File[]>();
  files: File[] = [];
  label: string = '';


  constructor() {
  }

  ngOnInit(): void {

  }

  onInputChange(event: Event) {
    const input: HTMLInputElement = event.target as HTMLInputElement;

    this.files = Array.from(input.files || []);
    this.label = this.files.map(f => f.name).join(', ');
    this.onFilesChange.emit(this.files);
  }


}
