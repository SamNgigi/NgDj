import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ApiComponent } from './api/api.component';
import { ConnectService } from './connect/connect.service';

@NgModule({
  declarations: [
    AppComponent,
    ApiComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ConnectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
