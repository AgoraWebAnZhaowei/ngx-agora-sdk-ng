import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-round-tranparent-icon-button',
  templateUrl: './round-tranparent-icon-button.component.html',
  styleUrls: ['./round-tranparent-icon-button.component.css'],
  host: {
    '(click)': 'click()'
  }
})
export class RoundTranparentIconButtonComponent implements OnInit {

  @Input() activeColor: string = 'red';
  @Input() type: 'toggle' | 'normal' = 'normal';
  @Input() activeIcon: any;
  @Input() inactiveIcon: any;
  @Output() onClick = new EventEmitter<boolean>();
  @Input() isActive: boolean = false;

  buttonStyle = {
    active: {
      backgroundColor: this.activeColor,
    }
  }

  constructor() { }

  ngOnInit(): void { }

  click() {
    if (this.type === 'toggle') {
      this.isActive = !this.isActive;
    }
    this.onClick.emit(this.isActive);
  }

}
