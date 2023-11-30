import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaskPresenterComponent } from './task-presenter.component';
import { Pipe, PipeTransform, SimpleChanges } from '@angular/core';
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

  it('should convert name to uppercase', () => {
    component.task = {
      id: 1,
      name: 'some name',
      buttonText: 'pause',
      timer: of(10),
    };

    component.ngOnChanges({ task: true } as unknown as SimpleChanges);

    expect(component.task.name).toBe('SOME NAME');
  });

  it('should emit task in clicked event', () => {
    component.task = {
      id: 1,
      name: 'some name',
      buttonText: 'pause',
      timer: of(10),
    };
    const spy = jest.spyOn(component.clicked, 'emit');

    component.click();

    expect(spy).toHaveBeenCalledWith(component.task);
  });
});
