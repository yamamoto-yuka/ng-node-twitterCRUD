import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { Tweet } from '../interfaces/tweet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tweets: any[] = [];
  constructor(private ts: TweetService, private router:ActivatedRoute) { }

  deleteTweet(id:number, tweetcard:HTMLElement) {
    if (confirm("Are you sure you want to delete?")) {
      this.ts.deleteTweet(id).subscribe(deleteSuccessMessage => {
        if (deleteSuccessMessage.deleteStatus === 1) {
            console.log(tweetcard);
            tweetcard.className = 'fadeout';
            console.log(id);
            let index = this.tweets.findIndex(tweetid => tweetid.ID === id)
            console.log(index);
            setTimeout(() => {
              this.tweets.splice(index, 1);
            }, 2000)
          }
      })
    }
  }

  ngOnInit(): void {
    this.ts.getAlltweets().subscribe(tweets => {
      this.tweets = tweets.tweets;
      console.log(tweets);
    })
  }

}
