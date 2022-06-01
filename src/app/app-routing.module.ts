import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { HomeComponent } from './home/home.component';
import { TweetComponent } from './tweet/tweet.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tweet', component: TweetComponent },
  { path: 'account', component: AccountComponent },
  { path: 'update/:id', component:UpdateComponent},
  {path:'upload',component:FileuploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
