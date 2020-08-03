import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AddService } from '../../../services/add.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [MessageService],
})
export class QuestionsComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private add: AddService,
    private sanitizer: DomSanitizer
  ) {}
  public imageText: '';
  public loading = false;
  fileUrl;
  gotResponse = false;
  public questions;
  public isupload = false;
  public qarray: any = [];

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

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  submit(text) {
    this.loading = true;
    // add api here -- not available at backend now
    // this.add.questions(data)
    this.add.questionGen({ text }).subscribe((res: any) => {
      let question = '';
      this.questions = res.questions;
      for (let i = 0; i < res.questions.length; i++) {
        question = `Q${i + 1}.  ${res.questions[i][0]}\n`;
        this.qarray.push(question);
      }
      this.questions = this.qarray.filter(this.onlyUnique);
      console.log(this.qarray);
      this.gotResponse = true;
      this.loading = false;
      const fileData = question;
      const blob = new Blob([fileData], { type: 'pdf' });
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        window.URL.createObjectURL(blob)
      );
    });
  }
}
