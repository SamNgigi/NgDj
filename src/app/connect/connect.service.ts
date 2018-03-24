import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Text } from '../Text';

// Defining our httpOptions
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ConnectService {
  private apiTextUrl = 'https://api-ex.herokuapp.com/';

  constructor(private httpClient:HttpClient) { }

  getTxt(): Observable<Text[]>{
    /*
      Lets use this for now without the map function.
      Our service makes the HTTP request and returns the Observable object.

      We use httpClient.get() to load data from a singel API endpoint.
    */
    return this.httpClient.get<Text[]>(this.apiTextUrl)
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
  createTxt(text: Text): Observable<Text> {
    return this.httpClient.post<Text>("https://api-ex.herokuapp.com", text, httpOptions);
  }
  // Update txt function
  updateTxt(text: Text): Observable<any>{
    return this.httpClient.put(this.apiTextUrl+ text.id + "/", text, httpOptions);
  }
  // Delete txt function
  deleteTxt(text: Text | number): Observable<Text> {
    // We create a const id of the specified text's id and pass it into the url
    const id = typeof text === 'number' ? text : text.id
    const url = `${this.apiTextUrl}/${id}/`;


    return this.httpClient.delete<Text>(url);
  }



}
