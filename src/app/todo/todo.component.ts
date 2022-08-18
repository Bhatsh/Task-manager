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
  updateIndex!: any;
  isEditEnabled: boolean = false;

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
    this.taskForm.reset();
  }
  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }
  deleteInProgressTask(i: number) {
    this.inProgress.splice(i, 1);
  }
  deleteDoneTask(i:number) {
    this.done.splice(i, 1);
  }
  editTask(item: ITask, i: number) {
    this.taskForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }
  updateTask() {
    this.tasks[this.updateIndex].description = this.taskForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.taskForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
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
