import { Component, OnInit } from '@angular/core';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.css'],
})
export class AllVideosComponent implements OnInit {
  public videos = [];
  public cssClass = 'limit';
  public isClicked = false;
  public readText = 'Read more ...';
  constructor(private fetch: FetchService) {}

  ngOnInit(): void {
    this.fetch.getAllVideos().subscribe((res: any) => {
      this.videos = res.result.videoLinks;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.videos.length; i++) {
        this.videos[i].read = 'limit';
        this.videos[i].text = 'Read more ...';
      }
    });
  }

  changeCSS(videoLinkID, event) {
    // this.isClicked = true;
    // this.readText = 'Read Less';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.videos.length; i++) {
      if (this.videos[i]._id === videoLinkID) {
        this.videos[i].read = 'none';
        this.videos[i].text = '';
      }
    }
  }
}
