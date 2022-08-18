import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  taskForm!: FormGroup;

  tasks: ITask[] = [];
  inProgress: ITask[] = [];
  done: ITask[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      item: ['', Validators.required],
    });
  }
  addTask() {
    this.tasks.push({
      description: this.taskForm.value.item,
      done: false,
    });
  }
  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }
  deleteInProgressTask(i: number) {
    this.inProgress.splice(i, 1);
  }
  editTask(i: number) {
    console.log('oii');
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
