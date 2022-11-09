import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "@pages/tasks/task-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Collaborator, Task, TaskStatus} from "@pages/tasks/task";
import {NzMessageService} from "ng-zorro-antd/message";
import {Subscription} from "rxjs";

@Component({
  selector: 'todo-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  taskForm!: FormGroup
  task = new Task()
  title = 'New Task'
  selectedEmoji?: string
  collaborators: Collaborator[] = [
    {name: 'Angela', avatar: 'assets/images/avatar1.png', background: '#E8E8FF', color: '#5051F9'},
    {name: 'Chris', avatar: 'assets/images/avatar2.png', background: '#E6F5FF', color: '#1EA7FF'}
  ]
  selectedCollaborators: Collaborator[] = []
  loading = false
  isEdit = false
  obs?: Subscription

  constructor(private readonly taskService: TaskService,
              private readonly fb: FormBuilder,
              private readonly messageService: NzMessageService) { }

  ngOnInit(): void {
    this._initForm()
    this._busListener()
  }

  _busListener() {
    this.obs = this.taskService.getTaskForEdit().subscribe(value => {
      this.task = value

      if (this.task.id) {
        this.isEdit = true
        this.title = 'Edit Task'
        this._initForm()
        this.selectedEmoji = this.task.emoji!
        this.selectedCollaborators = this.task.collaborators!
      }
    })
  }

  _initForm() {
    this.taskForm = this.fb.group({
      id: [this.task.id],
      title: [this.task.title, [Validators.required]],
      emoji: [this.task.emoji, [Validators.required]],
      collaborators: [this.task.collaborators, [Validators.required]],
      startDate: [this.task.startDate, [Validators.required]],
      endDate: [this.task.endDate, [Validators.required]],
      progress: [this.task.progress ?? 60, [Validators.required]],
      hours: [this.task.hours, [Validators.required]],
    })
  }

  onEmojiSelected(emoji: string) {
    this.selectedEmoji = emoji
    this.taskForm.get('emoji')?.setValue(emoji)
  }

  addCollaborator(col: Collaborator) {
    if (this.selectedCollaborators.length > 0) {
      const index = this.selectedCollaborators.findIndex(c => c.name === col.name);

      if (index == -1) {
        this.selectedCollaborators.push(col)
      }
      this.taskForm.get('collaborators')?.setValue(this.selectedCollaborators)
      return
    }
    this.selectedCollaborators = [col]
    this.taskForm.get('collaborators')?.setValue(this.selectedCollaborators)
  }

  removeCollaborator(col: Collaborator) {
    const index = this.selectedCollaborators.findIndex(c => c.name === col.name);
    this.selectedCollaborators.splice(index, 1)
    this.taskForm.get('collaborators')?.setValue(this.selectedCollaborators)
  }

  submit() {
    this.loading = true
    this.task = this.taskForm.value
    this.task.createdDate = new Date()
    this.task.id = `${Math.floor(Date.now() * Math.random())}`

    if (this.task.startDate! > this.task.endDate!) {
      this.messageService.warning('Start date must not be greater than end date')
      return
    }

    const status = this.taskService.add(this.task)
    this.loading = false

    if (TaskStatus.EXISTS === status) {
      this.messageService.error('Task already exists')
      return
    }
    this.messageService.success('Task saved successfully')
    this.resetForm()
  }

  update() {
    this.loading = true
    this.task = this.taskForm.value

    if (this.task.startDate! > this.task.endDate!) {
      this.messageService.warning('Start date must not be greater than end date')
      return
    }

    const status = this.taskService.update(this.task)
    this.loading = false

    if (TaskStatus.EXISTS === status) {
      this.messageService.error('Task already exists')
      return
    }

    if (TaskStatus.NOT_FOUND === status) {
      this.messageService.error(`Task ${this.task.title} not found`)
      return
    }
    this.editDone()
  }

  editDone() {
    this.messageService.success('Task updated successfully')
    this.isEdit = false
    this.title = 'New Task'
    this.resetForm()
    this.taskService.setForEdit(new Task())
  }

  resetForm() {
    this.taskForm.reset()
    this.selectedCollaborators = []
    this.selectedEmoji = undefined
  }

  ngOnDestroy() {
    if (this.obs) {
      this.obs.unsubscribe()
    }
  }
}
