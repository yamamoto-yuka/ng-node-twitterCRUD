import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tweet } from '../interfaces/tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private URL = "http://localhost:4400/tweets";
  private deleteFromFolderURL = "http://localhost:4400/tweet";
  private fileuploadURL = 'http://localhost:4400/upload';
  private multifileuploadURL = 'http://localhost:4400/multiplefiles'
  constructor(private http: HttpClient) { }

  getAlltweets() {
  return this.http.get<{'tweets':[Tweet[]], 'message':string}>(this.URL);
  }

  uploadFile(formadata: any) {
    return this.http.post(this.fileuploadURL, formadata);
  }
  mltipleUpload(formdata:any){
    return this.http.post(this.multifileuploadURL, formdata);
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

  deleteTweet(id: number) {
    return this.http.delete<{deleteStatus:number, message:string}>(this.URL + '/' + id);
  }

  deleteTweetimgOnlyFromFolder(id:number) {
    return this.http.delete(this.deleteFromFolderURL + '/' + id);
  }

  updateTweet(ID: number, handleName: string, thumbnail: string, description: string, image: string) {
    let updatetweetbody = {
      "ID": ID,
      "handleName": handleName,
      "thumbnail": thumbnail,
      "description": description,
      "image": image
    }
    return this.http.put<{ updatedtweet: [Tweet], message: any }>(this.URL, updatetweetbody);
  }

  gettweetByID(id: number) {
    return this.http.get<{tweetid:boolean, message:string, tweetdata:[Tweet]}>(this.URL + '/' + id);
  }
}
