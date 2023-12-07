import {Component, OnInit} from '@angular/core';
import {delay, Observable, of} from "rxjs";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
    private BARS_COUNT: number = 13;

    progressBarVisible: boolean;
    progressBarBars: boolean[];
    firstParagraph: string;
    secondParagraph: string;

    constructor() {
        this.progressBarVisible = false;
        this.progressBarBars = [];
        [...Array(this.BARS_COUNT)].forEach(() => this.progressBarBars.push(false));
        this.firstParagraph = '';
        this.secondParagraph = '';
    }

    async ngOnInit() {
        const time = 2000;
        this.displayProgressBar(2000 / 13);
        await this.setFirstParagraph("This is the first text", time);
        this.setSecondParagraph("This is the second text");
    }

    async setFirstParagraph(value: string, time: number) {
        this.firstParagraph = await this.buildValueSlowly(value, time);
    }

    buildValueSlowly(value: string, time: number): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(value);
            }, time);
        });
    }

    setSecondParagraph(value: string) {
        this.secondParagraph = value;
    }

    displayProgressBar(ticker: number): void {
        this.progressBarVisible = true;
        let barIndex: number = 0;
        const _interval = setInterval(() => {
            if (barIndex === this.BARS_COUNT - 1) {
                clearInterval(_interval);
            }
            this.progressBarBars[barIndex] = true;
            barIndex++;
        }, ticker)
    }
}
