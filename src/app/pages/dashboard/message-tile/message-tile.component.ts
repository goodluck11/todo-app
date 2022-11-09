import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'todo-message-tile',
  templateUrl: './message-tile.component.html',
  styleUrls: ['./message-tile.component.scss']
})
export class MessageTileComponent implements OnInit {
  @Input()
  image!: string
  @Input()
  name!: string
  @Input()
  message!: string


  constructor() { }

  ngOnInit(): void {
  }

}
