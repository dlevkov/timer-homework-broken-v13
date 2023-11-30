import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TaskModel } from '../models/task-model';

@Component({
  selector: 'app-task-presenter',
  templateUrl: './task-presenter.component.html',
  styleUrls: ['./task-presenter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPresenterComponent implements OnChanges {
  @Input() task: TaskModel;
  @Output() clicked = new EventEmitter<TaskModel>();

  constructor() {}

  // Solution for uppercase name, use ngOnChanges to change the name on each cycle
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      this.task.name = this.task.name.toUpperCase();
    }
  }

  public click() {
    this.clicked.emit(this.task);
  }
}
