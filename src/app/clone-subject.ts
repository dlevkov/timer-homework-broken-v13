import { BehaviorSubject } from 'rxjs';
import { TaskModel } from './models/task-model';
export class CloneSubject extends BehaviorSubject<TaskModel[]> {}
