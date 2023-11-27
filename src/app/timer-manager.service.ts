import { Injectable } from '@angular/core';
import { Observable, timer, BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TimerModel } from './models/timer-model';

@Injectable({
  providedIn: 'root',
})
export class TimerManagerService {
  readonly initialValue = 0;

  private timerSubscription: Subscription | undefined;
  private timers: TimerModel[] = [];

  constructor() { }

  getTimer(id: number): Observable<number> {
    const newTimer = this.createTimer();
    this.timers.push({ id, subj$: newTimer, isRunning: false });
    return newTimer.asObservable();
  }

  private createTimer() {
    return new BehaviorSubject<number>(this.initialValue);
  }

  public playTimer(id: number): void {
    const timer = this.timers.find((x) => x.id === id);
    if (timer) {
      timer.isRunning = true;

      // Solution for the timers issue: start timer only when it's needed
      this.startTimer(timer);
    }
  }

  public pauseTimer(id: number): void {
    const timer = this.timers.find((x) => x.id === id);
    if (timer) {
      timer.isRunning = false;
    }

    // Solution for the timers issue: stop timer when pause is clicked
    this.stopTimer();
  }

  // Solution for the timers issue: new timer managing methods
  private startTimer(tmr: TimerModel): void {
    if (!this.timerSubscription) {
      this.timerSubscription = timer(0, 1000)
        .pipe(
          tap(() => this.updateTimer(tmr)),
        )
        .subscribe();
    }
  }

  private stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  private updateTimer(tmr: TimerModel): void {
    tmr.subj$.next(tmr.subj$.value + 1);
  }
}
