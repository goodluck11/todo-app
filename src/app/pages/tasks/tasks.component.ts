import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from "rxjs";
import {TaskService} from "@pages/tasks/task-service";
import {Task} from "@pages/tasks/task";

@Component({
  selector: 'todo-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TasksComponent implements OnInit, OnDestroy {
  selected = 'Last 7 days'
  obs?: Subscription
  tasks: Task[] = []

  constructor(private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.allTasks()
  }

  editTask(task: Task) {
    this.taskService.setForEdit(task)
  }

  selectedAction(value: string) {
    this.selected = value
  }

  completeTask(task: Task) {
    task.progress = 100
    this.taskService.update(task)
  }

  deleteTask(task: Task) {
    this.taskService.delete(task)
  }


  allTasks() {
    this.obs = this.taskService.getTasks().subscribe(value => {
      this.tasks = value
    })
  }

  trackByFn(index: number, d: Task) {
    return d.id;
  }

  ngOnDestroy() {
    if (this.obs) {
      this.obs.unsubscribe()
    }
  }
}
