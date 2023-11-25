import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { LogicService } from '../logic.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
})
export class TaskAddComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private service: LogicService) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      text: [
        null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
        this.validateNameExists.bind(this),
      ],
    });
  }
  submitHandler(text: string) {
    this.service.addTask(text);
    this.resetForm();
  }
  private resetForm() {
    this.form.reset();
  }

  validateNameExists(control: AbstractControl) {
    return this.service
      .nameExists(control.value)
      .pipe(map((x) => (!x ? null : { nameTaken: true })));
  }
}
