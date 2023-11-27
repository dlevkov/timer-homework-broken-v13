import { Injectable } from '@angular/core';
import { TaskModel } from './models/task-model';
import { Observable, combineLatest, Subject, of } from 'rxjs';
import { TaskFactoryService } from './task-factory.service';
import { map, switchMap } from 'rxjs/operators';
import { CloneSubject } from './clone-subject';

@Injectable({
  providedIn: 'root',
})
export class LogicService {
  readonly initialState: TaskModel[] = [];
  private state: TaskModel[] = [...this.initialState];
  private logicSubj$ = new CloneSubject(this.state);

  constructor(private taskService: TaskFactoryService) { }
  
  public get tasks$(): Observable<TaskModel[]> {
    return this.logicSubj$.asObservable();
  }

  public addTask(tskName: string) {
    const newTask = this.taskService.createTask(tskName);
    this.state.push(newTask);
    this.doNext();
  }

  public updateTask(evt: TaskModel): void {
    const index = this.state.findIndex((tsk) => tsk.id === evt.id);
    this.state = this.toggleAllButtonTexts(this.state, index);
    this.doNext();
  }

  public get totalTime$(): Observable<number> {
    // Solution: use switchMap to switch to a new stream that returns from combineLatest with the array of timers
    return this.tasks$.pipe(
      switchMap((tasks) => combineLatest(tasks.map((task) => task.timer))),
      map((timersArr: number[]) => timersArr.reduce((acc, curr) => acc + curr, 0))
    );
  }

  public nameExists(value: string): Observable<boolean> {
    return of(this.state.find((x) => x.name.toLocaleLowerCase() === value) !== undefined);
  }

  private toggleAllButtonTexts(
    tasks: TaskModel[],
    selectedId: number
  ): TaskModel[] {
    tasks
      .filter((tsk) => tsk.id !== selectedId)
      .forEach((tsk) => this.inactivateButtons(tsk));
    this.toggleText(tasks[selectedId]);
    return tasks;
  }

  private inactivateButtons(tsk: TaskModel): void {
    if (tsk.buttonText === 'pause') {
      this.setPlay(tsk);
    }
  }

  private toggleText(tsk: TaskModel): void {
    if (tsk.buttonText === 'pause') {
      this.setPlay(tsk);
    } else {
      this.setPause(tsk);
    }
  }

  private setPlay(tsk: TaskModel) {
    tsk.buttonText = 'play_arrow';
    this.taskService.pause(tsk.id);
  }

  private setPause(tsk: TaskModel) {
    tsk.buttonText = 'pause';
    this.taskService.play(tsk.id);
  }

  private doNext() {
    // Solution: use reduce to create a new array of tasks
    // can be replaced with proper state management
    const newState = this.state.reduce((acc, curr) => {
      return [
        ...acc,
        {
          id: curr.id,
          name: curr.name,
          timer: curr.timer,
          buttonText: curr.buttonText,
        }
      ]
    }, []);

    this.logicSubj$.next(newState);
  }
}
