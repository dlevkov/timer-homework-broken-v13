import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task-model';
import { LogicService } from '../logic.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskContainerComponent implements OnInit {
  public tasks$: Observable<TaskModel[]>;
  public totalTime$: Observable<number>;
  constructor(private service: LogicService) {}

  ngOnInit() {
    this.tasks$ = this.service.tasks$;
    this.totalTime$ = this.service.totalTime$;
  }

  public onClick(evt: TaskModel) {
    this.service.updateTask(evt);
  }
}
