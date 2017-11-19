import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http'

@Injectable()
export class RestApiService {

  constructor(private http: Http) { }

  getMovies () {
  	return this.http.get('http://localhost:4201/getMovies');
  }

  addMovies (movieData) {
  	console.log(movieData)
  	return this.http.post('http://localhost:4201/addMovies', movieData);
  }

}
