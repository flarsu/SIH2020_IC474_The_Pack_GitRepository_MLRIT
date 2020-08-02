import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AddService } from '../../../services/add.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers: [MessageService],
})
export class SummaryComponent implements OnInit {
  @ViewChild('summary') htmlData: ElementRef;

  uploadedFiles: any[] = [];
  public imageText = '';
  public loading = false;
  public summary;
  fileUrl;
  public isupload = false;

  constructor(
    private messageService: MessageService,
    private add: AddService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  onUpload(event: any) {
    this.isupload = true;
    const ocrForm = new FormData();
    ocrForm.append('image', event.target.files[0]);
    // apply OCR api here
    this.add.ocr(ocrForm).subscribe((res: any) => {
      this.imageText = res.result;
      this.isupload = false;
    });
  }

  submit(speechText) {
    this.loading = true;
    const data = {
      text: speechText,
    };
    this.add.summary(data).subscribe((res: any) => {
      this.summary = res.summary;
      this.loading = false;
      const fileData = this.summary;
      const blob = new Blob([fileData], { type: 'pdf' });
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        window.URL.createObjectURL(blob)
      );
    });
  }
}
