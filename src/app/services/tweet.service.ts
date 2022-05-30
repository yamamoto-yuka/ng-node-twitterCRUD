import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tweet } from '../interfaces/tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private URL = "http://localhost:4400/tweets";
  private fileuploadURL = 'http://localhost:4400/upload';
  constructor(private http: HttpClient) { }

  getAlltweets() {
  return this.http.get<{'tweets':[Tweet[]], 'message':string}>(this.URL);
  }

  uploadFile(formadata: any) {
    return this.http.post(this.fileuploadURL, formadata);
  }

  addNewTweet(handleName:string,thumbnail:string, description:string, image:string) {
    let newtweetbody = {
      "handleName": handleName,
      "thumbnail": thumbnail,
      "description": description,
      "image":image
    }
    return this.http.post<{newtweet:[Tweet],message:any}>(this.URL, newtweetbody);
  }

}
