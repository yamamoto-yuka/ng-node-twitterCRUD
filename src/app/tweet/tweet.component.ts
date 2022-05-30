import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  tweets: any[] = [];
  tnformdata: any;
  imgformdata: any;
  handleName: string = '';
  tweet: string = '';
  tnfilename: string = '';
  imgfilename: string = '';

  constructor(private ts:TweetService, private router:Router) { }

 

  tnFile(event: any) {
    let myfile = event.target.files[0];
    this.tnfilename = myfile.name;
    const formdata = new FormData();
    formdata.append("file", myfile, myfile.name);
    this.tnformdata = formdata;
  }

  imgFile(event:any) {
    let myfile = event.target.files[0];
    this.imgfilename = myfile.name;
    const formdata = new FormData();
    formdata.append("file", myfile, myfile.name);
    this.imgformdata = formdata;
  }

  addNewtweet() {
    this.ts.addNewTweet(this.handleName, this.tnfilename, this.tweet, this.imgfilename).subscribe(newtweet => {
      console.log(newtweet);
      this.ts.uploadFile(this.tnformdata).subscribe(tnuploadMessage => {
        console.log(tnuploadMessage);
        this.ts.uploadFile(this.imgformdata).subscribe(imguploadmessage => {
          console.log(imguploadmessage);
          this.tweets.unshift(newtweet.newtweet[0]);
          this.router.navigate(['/']);
        })
      })
    })
  }

   ngOnInit(): void {
  }

}
