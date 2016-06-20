'use strict';

require('../css/style.css');

require('core-js');

require('zone.js');
require('reflect-metadata');

import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, enableProdMode } from '@angular/core';
import { MdInput } from '@angular2-material/input';
import { MdSlideToggle } from '@angular2-material/slide-toggle';
import { MdButton } from '@angular2-material/button';

@Component({
	selector: 'meeting-cost',
	template: `
		<h1>{{formatted}}</h1>
		<p>Elapsed Time: {{(diff / 1000).toFixed(0)}} seconds</p>
		<div>
			<button md-raised-button (click)="start()">Start</button>
			<button md-raised-button (click)="stop()">Stop</button>
		</div>
		<form>
			<md-input [(ngModel)]="salary" placeholder="Average Yearly Salary">
				<span md-prefix>$&nbsp;</span>
			</md-input>
			<md-input [(ngModel)]="people" placeholder="People in Meeting"></md-input>
		</form>
		<p>Hourly Usage: {{money.format(hourly)}}</p>
	`,
	directives: [ MdInput, MdSlideToggle, MdButton ],
	styles: [`
		h1 {
			font-size: 15em;
		}
		form {
			margin-top: 20px;
		}
	`]
})
export class MeetingCost {

	days = 260;
	hours = 8;
	
	formatted: string;
	hourly: number;
	diff: number;

	salary = 100000;
	people = 10;

	time = -1;

	money = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});

	constructor() {
		setInterval(this.update.bind(this), 50);
		this.update();
	}

	update() {
		this.diff = this.time < 0 ? 0 : performance.now() - this.time;

		this.hourly = this.salary * this.people / this.days / this.hours;

		const milisecondly = this.hourly / 60 / 60 / 1000;

		this.formatted = this.money.format(this.diff * milisecondly);
	}

	start() {
		this.time = performance.now();
	}

	stop() {
		this.time = -1;
	}
}

enableProdMode();
bootstrap(MeetingCost);