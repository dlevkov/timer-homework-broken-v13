import { BehaviorSubject } from "rxjs";

export interface TimerModel {
    id: number;
    subj$: BehaviorSubject<number>;
    isRunning: boolean;
}