import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaskPresenterComponent } from './task-presenter.component';
import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

describe('TaskPresenterComponent', () => {
  let component: TaskPresenterComponent;
  let fixture: ComponentFixture<TaskPresenterComponent>;
  @Pipe({ name: 'minuteSeconds' })
  class MockPipe implements PipeTransform {
    transform(value: number): number {
      return value;
    }
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskPresenterComponent, MockPipe],
      imports: [MatIconModule, MatCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPresenterComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render task', () => {
    // Arrange
    component.task = {
      id: 1,
      name: 'some name',
      buttonText: 'pause',
      timer: of(10),
    };
    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
