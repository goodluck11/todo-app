import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'todo-metric-box',
  templateUrl: './metric-box.component.html',
  styleUrls: ['./metric-box.component.scss']
})
export class MetricBoxComponent implements OnInit {
  @Input()
  title!: string
  @Input()
  count!: string

  constructor() { }

  ngOnInit(): void {
  }

}
