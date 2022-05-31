import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  tweets: any[] = [];
  tnformdata: any;
  imgformdata: any;
  handleName: string = '';
  tweet: string = '';
  tnfilename: string = '';
  imgfilename: string = '';

  constructor(private ts: TweetService, private router: Router, private param:ActivatedRoute) { }
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

  updatetweet() {
    let id: any = this.param.snapshot.paramMap.get('id');
    this.ts.updateTweet(id, this.handleName, this.tnfilename, this.tweet, this.imgfilename).subscribe(updatetweet => {
      console.log(updatetweet);
      this.ts.uploadFile(this.tnformdata).subscribe(tnuploadMessage => {
        console.log(tnuploadMessage);
        this.ts.uploadFile(this.imgformdata).subscribe(imguploadMeddage => {
          console.log(imguploadMeddage);
          // this.ts.deleteTweetimgOnlyFromFolder(id).subscribe(deleteMessage => {
          //   console.log(deleteMessage);
            this.router.navigate(['/']);
          // })
        })
      })
    })
   }

  
  ngOnInit(): void {
    let id: any = this.param.snapshot.paramMap.get('id');
    this.ts.gettweetByID(id).subscribe(tweetdata => {
      console.log(tweetdata);
      this.handleName = tweetdata.tweetdata[0].handle_name;
      this.tweet = tweetdata.tweetdata[0].description;
      this.tnfilename = tweetdata.tweetdata[0].thumbnail;
      this.imgfilename = tweetdata.tweetdata[0].image;
    })
  }

}
