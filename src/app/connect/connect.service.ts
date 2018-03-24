import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Defining our httpOptions
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ConnectService {

  getTxt(){
    /*
      Lets use this for now without the map function.
      Our service makes the HTTP request and returns the Observable object.

      We use httpClient.get() to load data from a singel API endpoint.
    */
    return this.httpClient.get("https://api-ex.herokuapp.com")
    /*
      We can use Observable.forkJoin() to run multiple concurrent httpClient.get() requests.

      for example;
            getBooksAndMovies() {
      +        return Observable.forkJoin(
      +        this.http.get('/api/books'),
      +        this.http.get('/api/movies')
      +        );
      +    }

      The entire operation will result in an error if any single request fails.
      The forkJoin() can take .get() or any other request functions.

    */

    // return this.httpClient.get("https://api-ex.herokuapp.com").map(response => response);
  }

  // Create txts function
  createTxt(text){
    let txt = JSON.stringify(text);
    return this.httpClient.post("https://api-ex.herokuapp.com", text, httpOptions)
  }
  // Update txt function
  updateTxt(text){
    let txt = JSON.stringify(text);
    return this.httpClient.put("https://api-ex.herokuapp.com"+ text.id, text, httpOptions)
  }
  // Delete txt function
  deleteTxt(text){
    let txt = JSON.stringify(text);
    return this.httpClient.delete("https://api-ex.herokuapp.com"+ text.id)
  }

  constructor(private httpClient:HttpClient) { }

}
