import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { AddService } from '../../../services/add.service';
// import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [MessageService],
})
export class VideoComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private addService: AddService
  ) {}
  uploadedFiles: any[] = [];
  public loading = false;
  public audioFileName;
  public currTime;
  public videoLink;
  public imageText: '';
  public isupload = false;

  public brokenLines = [];
  public languages = [
    { name: 'Hindi', code: 'hi' },
    { name: 'Russian', code: 'ru' },
    { name: 'English', code: 'en' },
  ];
  public toLang = 'en';
  ngOnInit(): void {}
  onUpload(event: any) {
    this.isupload = true;
    const ocrForm = new FormData();
    ocrForm.append('image', event.target.files[0]);
    // apply OCR api here
    this.addService.ocr(ocrForm).subscribe((res: any) => {
      this.imageText = res.result;
      this.isupload = false;
    });
  }
  submit(speechText) {
    this.toLang = this.toLang['code'];
    this.loading = true;
    this.currTime = Date.now();
    this.addService
      .translate({ text: speechText, toLang: this.toLang })
      .subscribe((res0: any) => {
        let textToSpeech = speechText;
        if (this.toLang === 'hi') {
          textToSpeech = res0.result.text;
        } else if (this.toLang === 'ru') {
          textToSpeech = res0.result.text;
        }
        this.addService
          .textToSpeech({ text: textToSpeech, toLang: this.toLang })
          .subscribe((res1: any) => {
            this.audioFileName = res1.fileName;
            this.addService
              .getPos({ text: speechText })
              .subscribe((res2: any) => {
                const imageSearch = [];
                Object.keys(res2).forEach((key) => {
                  this.brokenLines.push(key);
                  imageSearch.push(res2[key]);
                });
                const imageSearchString = imageSearch.join();
                // const imageSearchString = this.brokenLines.join();
                this.addService
                  .imageSearch({ text: imageSearchString })
                  .subscribe((res3: any) => {
                    this.addService
                      .videoGen({
                        ...res2,
                        audioFile: this.audioFileName,
                        text: speechText,
                      })
                      .subscribe((res4: any) => {
                        this.videoLink = res4.s3link;
                        this.loading = false;
                      });
                  });
              });
          });
      });
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(VPopUpComponent);
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
}
