import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Text } from '../Text';
import { ConnectService } from '../connect/connect.service';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  // Stores txts from our api call.
  // txts=[];
   texts: Text[];
   selectedText: string = ''

  constructor(private connectService:ConnectService) { }

  ngOnInit() {
    this.getTxt();
  }

  getTxt(): void{
    /*
      The .subscribe() method takes three arguments which are event handlers.
      They are the,
        1. onNext - recieves the HTTP response data.
        2. onError - called if the HTTP request returns an error code such as a
                     404
        3. onCompleted - executes after an observable has returned all its data.
                         This is less useful in the case of a Http.get() call
                         because all the data is passed into the   onNext handler.

      When using Http.get() and the Observable.forkJoin together, the onNext handler will execute only once and after all the Http requests complete successfully.
      The request will recieve an array containing the combined response data from all requests. Eg book data will be stored in data[0] and our movie data will be stored in data[1]

      The onError handler here will run if either of the HTTP requests return an error code.

    */

    this.connectService.getTxt().subscribe(
      // the first argument is a function which runs on success
      response => {
        console.log(response);
        this.texts = response;
      },
      // the second argument is a function which runs on error
      error => console.error(error),
      // the first argument is a function which runs on commpletion
      () => console.log('done loading txts')
     );
  }

  // Remember that our class property var here has to be similar to our api property
  add(txt: string): void {
    txt = txt.trim();
    if (!txt){ return; }
    this.connectService.createTxt({ txt } as Text).subscribe(
      data => {
        // This refreshes the list with out new txt
        console.log(data)
        this.texts.push(data)
        this.getTxt();
      }
    );
  }

  updateTxt(txt: Text): void{
    // Logs the id of the one we want to edit.
    console.log(txt.id)
    // removes the one we want to edit from displays list.
    this.texts = this.texts.filter(h => h !== txt)
    // displays the one we want to edit in input.
    this.selectedText = txt.txt

  }

  deleteTxt(txt: Text): void {
    if(confirm("Are you sure you want to delete " + txt.id + "?")){
      // This removes specified txt from out front-end texts list in hopoe that the rest of the function will remove it from the server
      this.texts = this.texts.filter(h => h !== txt)
      this.connectService.deleteTxt(txt).subscribe(
        data => {
          // refreshes the list
          console.log(data)
          this.getTxt();
          return true
        },
        error => {
          console.error("Error deleting txt");
          return Observable.throw(error);
        }
      );
    }
  }

}
