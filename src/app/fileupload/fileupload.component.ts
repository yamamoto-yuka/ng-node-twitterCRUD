import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss'],
})
export class FileuploadComponent implements OnInit {


  // The @ViewChild() can be also be used for template reference variable with ElementRef or TemplateRef
  // We use the ViewChild to get the ElementRef of an HTML element in the component class.
  @ViewChild('multipleInput', { static: false })
  multipleInput!: ElementRef;

  displayMultipleImages!: Boolean;
  multipleImages = [];
  mlutipleformdata:any;

  constructor(private ts:TweetService) {
    this.displayMultipleImages = false;
  }

  ngOnInit(): void {}



  selectMultipleImage(event:any){
   if(event.target.files.length >0){
    let multipleImages = event.target.files;
    const formdata = new FormData();
    for(let img of this.multipleImages){
      formdata.append('files',img);
    }
    this.mlutipleformdata = formdata;
   } 
  }
  onMultiopleSubmit(){
    this.ts.mltipleUpload(this.mlutipleformdata).subscribe(res =>{
      console.log(res);
    })
  }

}
