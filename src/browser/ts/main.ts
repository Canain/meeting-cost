import '../css/style.css';
import 'core-js';
import 'reflect-metadata';

require('zone.js');

import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, enableProdMode } from '@angular/core';
import { MdInput } from '@angular2-material/input';
import { MdButton } from '@angular2-material/button';
import * as numeral from 'numeral';

@Component({
	selector: 'meeting-cost',
	template: `
		<h1>{{numeral((millisecondly * elapsed) || 0).format('$0,0.00')}}</h1>
		<p>Elapsed Time: {{numeral((elapsed / 1000) || 0).format('00:00:00')}}</p>
		<div>
			<button md-raised-button (click)="start()">Start</button>
			<button md-raised-button (click)="reset()">Reset</button>
		</div>
		<form>
			<md-input type="number" [(ngModel)]="salary" (ngModelChange)="update()" placeholder="Average Yearly Salary">
				<span md-prefix>$</span>
			</md-input>
			<md-input type="number" [(ngModel)]="people" (ngModelChange)="update()" placeholder="People in Meeting"></md-input>
		</form>
		<p>{{numeral(hourly || 0).format('$0,0.00')}}/hour</p>
	`,
	directives: [ MdInput, MdButton ],
	styles: [`
		h1 {
			font-size: 10vw;
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

	salary = 100000;
	people = 10;

	time = -1;

	numeral = numeral;

	constructor() {
		window['app'] = this;

		this.update();
		this.refresh();
	}

	refresh() {
		this.elapsed = this.time < 0 ? 0 : Date.now() - this.time;

		requestAnimationFrame(this.refresh.bind(this));
	}

	update() {
		this.hourly = this.salary * this.people / this.days / this.hours;
		this.millisecondly =  this.hourly / 60 / 60 / 1000;
	}

	start() {
		this.time = Date.now();
	}

	reset() {
		this.time = -1;
	}
}

enableProdMode();
bootstrap(MeetingCost);