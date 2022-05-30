import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { Tweet } from '../interfaces/tweet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tweets: any[] = [];
  constructor(private ts:TweetService) { }

  ngOnInit(): void {
    this.ts.getAlltweets().subscribe(tweets => {
      this.tweets = tweets.tweets;
      console.log(tweets);
    })
  }

}
