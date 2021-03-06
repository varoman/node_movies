import { Component, OnInit , ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [RestApiService, ]
})
export class MainComponent implements OnInit {

  @ViewChild('mainForm') mainForm: NgForm;

  private movies;
  private input = {
    varoMovie: '',
    lusoMovie:  '',
    winner: ''
  };
  private lusoWincSount: number;
  private varoWinsCount: number;

  constructor(private restApiService: RestApiService) { }

  ngOnInit() {
    this.getMoviesData();
	}

  getMoviesData() {
  	this.restApiService.getMovies().subscribe((res) => {
  		this.movies = res.json();
      this.winsCounter(this.movies);
  	});
  }

  submitForm() {
    if (!this.mainForm.valid) return;
    const postData = {
      varo: this.input.varoMovie,
      luso: this.input.lusoMovie,
      winner: (() => {
        if (+this.input.winner === 0) {
          return 'varo';
        } else if (+this.input.winner === 1) {
          return 'luso';
        }
          return 'draw';
      })(),
    };

    this.restApiService.addMovies(postData).subscribe((res) => {
      this.movies.push(postData);
      this.winsCounter(this.movies);
      for (const x in this.input) {
        this.input[x] = '';
      }
    });
  }

  winsCounter(movies: any) {
    const varoWins = movies.filter((item) => {
        return item.winner === 'varo';
    });

    const lusoWins = movies.filter((item) => {
        return item.winner === 'luso';
    });

    this.varoWinsCount = varoWins.length;
    this.lusoWincSount = lusoWins.length;
  }

  setClass (movieObj: any, winner: string) {
    if (movieObj.winner === 'draw') {
      return '';
    }

    if (movieObj.winner === winner) {
      return 'win';
    }

    return 'lose';
  }
}
