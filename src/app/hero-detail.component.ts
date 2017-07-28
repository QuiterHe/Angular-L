import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})

export class HeroDetailComponent implements OnInit {
    constructor(
	  private heroService: HeroService,
	  private route: ActivatedRoute,
	  private location: Location
    ) {}
    ngOnInit(): void {
  		this.route.params
    	.switchMap((params: Params) => this.heroService.getHero(+params['id']))
    	.subscribe(hero => this.hero = hero);
	}
	goBack(): void {
  		this.location.back();
	}
	save(): void {
		this.heroService.update(this.hero)
		  .then(() => this.goBack());
	}
}