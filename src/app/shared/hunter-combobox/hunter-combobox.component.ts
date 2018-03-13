import { Component, OnInit, Input } from '@angular/core';
import { HunterComboboxInput } from './shared/hunter-combobox-input';

@Component({
  selector: 'app-hunter-combobox',
  templateUrl: './hunter-combobox.component.html',
  styleUrls: ['./hunter-combobox.component.css']
})
export class HunterComboboxComponent implements OnInit {

  @Input('comboboxInput') comboboxInput: HunterComboboxInput;

  constructor() { }

  ngOnInit() {
  }

}
