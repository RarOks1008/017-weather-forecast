import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {
  @Input() toggle: boolean;
  @Output() toggleEvent = new EventEmitter<boolean>();

  toggleChange(value: boolean) {
    this.toggleEvent.emit(!value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
