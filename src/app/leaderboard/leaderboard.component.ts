import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import {leaders} from '../services/servicios';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LeaderboardComponent]
})

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  leaderboard = [];
  constructor(private router: Router, private ionLoader: LoaderService) { }

  ngOnInit() {
    this.upLeaderboards();
  }
  ionViewDidEnter = async() => {
    await this.ionLoader.showLoader();
    await this.upLeaderboards();
    await this.ionLoader.hideLoader();
  }

  cancelar = (event) => {
    event.preventDefault();
    this.router.navigate(["/home"]);
  }

  upLeaderboards = async() => {
    this.leaderboard = await leaders();
  }
}
