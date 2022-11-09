import {Injectable} from "@angular/core";
import {StorageKey, StorageService} from "@core/service/ storage.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Task, TaskStatus} from "@pages/tasks/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  $taskObs = new BehaviorSubject<Task[]>([]);
  $taskBusObs = new Subject<Task>();

  constructor(private readonly storageService: StorageService) {
  }

  setForEdit(task: Task) {
    this.$taskBusObs.next(task)
  }

  getTaskForEdit(): Observable<Task> {
    return this.$taskBusObs.asObservable()
  }

  add(task: Task): TaskStatus {
    const tasks: Task[] = this.storageService.get(StorageKey.tasks)

    if (!tasks) {
      this.storageService.save({key: StorageKey.tasks, data: [task]})
      this.$taskObs.next([task])
      return TaskStatus.SUCCESS
    }

    const exists = this.exists(tasks, task)

    if (exists) {
      return TaskStatus.EXISTS
    }

    const data = [task, ...tasks]
    this.storageService.save({key: StorageKey.tasks, data})
    this.$taskObs.next(data)

    return TaskStatus.SUCCESS
  }

  update(task: Task): TaskStatus {
    const tasks: Task[] = this.storageService.get(StorageKey.tasks)
    if (!tasks) {
      return TaskStatus.NOT_FOUND
    }
    const exists = this.exists(tasks, task)
    if (exists) {
      return TaskStatus.EXISTS
    }

    const index = tasks.findIndex(t => t.id === task.id)
    if (index === -1) {
      return TaskStatus.NOT_FOUND
    }
    tasks[index] = task
    this.storageService.save({key: StorageKey.tasks, data: tasks})
    this.$taskObs.next(tasks)

    return TaskStatus.SUCCESS
  }

  delete(task: Task) {
    const tasks: Task[] = this.storageService.get(StorageKey.tasks) ?? []
    const index = tasks.findIndex(t => t.id === task.id)
    if (index === -1) return

    tasks.splice(index, 1)
    if (tasks.length > 0) {
      this.storageService.save({key: StorageKey.tasks, data: tasks})
      this.$taskObs.next(tasks)
      return
    }
    this.storageService.remove(StorageKey.tasks)
    this.$taskObs.next(tasks)
  }

  private exists(tasks: Task[], task: Task): boolean {
    if (!task.id) {
      const index = tasks.findIndex(t => t.title?.toLowerCase() === task.title?.toLowerCase())
      return index > -1
    }
    const index = tasks.findIndex(t => t.title?.toLowerCase() === task.title?.toLowerCase() && t.id !== task.id)
    return index > -1
  }

  getTasks(): Observable<Task[]> {
    const tasks: Task[] = this.storageService.get(StorageKey.tasks) ?? []
    this.$taskObs.next(tasks)
    return this.$taskObs.asObservable()
  }
}
