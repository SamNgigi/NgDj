import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../connect/connect.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  // Stores txts from our api call.
  // txts=[];
  public texts;
  constructor(private connectService:ConnectService) { }

  ngOnInit() {

    this.getTxt();
  }

  getTxt(){
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
      error => console.log(error),
      // the first argument is a function which runs on commpletion
      () => console.log('done loading txts')
     );
  }

}
