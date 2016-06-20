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
import numeral = require('numeral');

@Component({
	selector: 'meeting-cost',
	template: `
		<h1>{{numeral(millisecondly * elapsed).format('$0,0.00')}}</h1>
		<p>Elapsed Time: {{numeral(elapsed / 1000).format('00:00:00')}}</p>
		<div>
			<button md-raised-button (click)="start()">Start</button>
			<button md-raised-button (click)="stop()">Stop</button>
		</div>
		<form>
			<md-input [(ngModel)]="salary" placeholder="Average Yearly Salary">
				<span md-prefix>$</span>
			</md-input>
			<md-input [(ngModel)]="people" placeholder="People in Meeting"></md-input>
		</form>
		<p>{{numeral(hourly).format('$0,0.00')}}/hour</p>
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
	
	hourly = 0;
	millisecondly = 0;
	elapsed = 0;

	private _salary: number;

	people = 10;

	time = -1;

	numeral = numeral;

	constructor() {
		window['app'] = this;

		this.salary = 100000;

		setInterval(this.update.bind(this), 50);
		this.update();
	}

	update() {
		this.elapsed = this.time < 0 ? 0 : Date.now() - this.time;
	}

	get salary() {
		return this._salary;
	}

	set salary(value: number) {
		this._salary = value;

		this.hourly = this._salary * this.people / this.days / this.hours;
		this.millisecondly =  this.hourly / 60 / 60 / 1000;
	}

	start() {
		this.time = Date.now();
	}

	stop() {
		this.time = -1;
	}
}

enableProdMode();
bootstrap(MeetingCost);