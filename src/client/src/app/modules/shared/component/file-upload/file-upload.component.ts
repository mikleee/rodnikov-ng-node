import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() subject$?: Subject<FileList>
  @Input() id: string = Math.random().toString();
  @Input() multiple: boolean = false;
  @Input() accept?: string;


  constructor() {
  }

  ngOnInit(): void {

  }

  onInputChange(event: Event) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.subject$?.next(input.files as FileList);
  }


}
