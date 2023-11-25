import { Observable } from 'rxjs';
import { buttonText } from './button-text';

export interface TaskModel {
  id: number;
  name: string;
  timer: Observable<number>;
  buttonText: buttonText;
}
