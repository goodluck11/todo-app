import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'todo-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {
  @Input()
  avatar!: string
  @Input()
  name!: string
  @Input()
  background?: string
  @Input()
  color?: string
  @Input()
  canRemove = true
  @Output()
  remove = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
