import { SelectValue } from './../beans/SelectValue';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Dropdown, HunterComboboxInput } from './shared/hunter-combobox-input';
import { FormGroup, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Constituency } from '../beans/regions';
import { HunterUtil } from '../utils/hunter-util';

@Component({
  selector: 'app-hunter-combobox',
  templateUrl: './hunter-combobox.component.html',
  styleUrls: ['./hunter-combobox.component.css']
})
export class HunterComboboxComponent implements OnInit, OnDestroy {

  public comboboxInput: HunterComboboxInput;
  public formGroup: FormGroup;
  public updatingDropdowns = false;
  public dropChangeInProg = false;

  @Output('onChangeDropdown') public onChangeDropdown: EventEmitter<Dropdown> = new EventEmitter<Dropdown>();
  @Input('widthPercent') public widthPercent = 80;

  constructor( private formBuilder: FormBuilder ) { }

  public ngOnInit() {
    const controls = {};
    this.createSampleInputs();
    this.comboboxInput.dropdowns.forEach( (d: Dropdown) => controls[d.name] = this.createControl(d) );
    this.formGroup = this.formBuilder.group( controls );
  }

  public ngOnDestroy() {
  }

  public createControl( dropdown: Dropdown ): AbstractControl {
    const control: FormControl = new FormControl(dropdown.defaultVal.value);
    if ( dropdown.required ) {
      control.setValidators( Validators.required );
    }
    return control;
  }

  public createSampleInputs(): void {
    this.comboboxInput = new HunterComboboxInput();
    this.comboboxInput.direction = 'horizontal';
    const  countries: Dropdown = {
        name: 'Country',
        selVals: [ new SelectValue('1', 'Kenya'), new SelectValue('2', 'Uganda') ],
        selVal: undefined,
        defaultVal: new SelectValue('1', 'Kenya'),
        placeholder: 'Select Country',
        level: 0,
        required: true,
        requiredMessage: 'Country is required',
        disabled: false
    };
    const  counties: Dropdown = {
      name: 'County',
      selVals: [],
      selVal: undefined,
      defaultVal: new SelectValue('1', 'Bomet'),
      placeholder: 'Select County',
      level: 1,
      required: true,
      requiredMessage: 'County is required',
      disabled: true
    };
    const constituencies: Dropdown = {
      name: 'Constituency',
      selVals: [],
      selVal: undefined,
      defaultVal: new SelectValue('1', 'Bomet Central'),
      placeholder: 'Select Constituency',
      level: 2,
      required: true,
      requiredMessage: 'Constituency is required',
      disabled: true
    };
    const wards: Dropdown = {
      name: 'Ward',
      selVals: [],
      selVal: undefined,
      defaultVal: new SelectValue('1', 'Silibwet'),
      placeholder: 'Select Ward',
      level: 3,
      required: true,
      requiredMessage: 'Ward is required',
      disabled: true
    };
    this.comboboxInput.dropdowns = [countries, counties, wards, constituencies].sort((d: Dropdown, a: Dropdown) => d.level - a.level);
  }

  public resetAllDescendants( parent: Dropdown ): boolean {
    const children = this.comboboxInput.dropdowns.filter( (d: Dropdown) => d.level > parent.level + 1 );
    if (HunterUtil.isNotEmpty(children)) {
      children.forEach((c: Dropdown) => {
        c.disabled = true;
        c.selVals = [];
        c.selVal = undefined;
      });
    }
    return HunterUtil.isNotEmpty(children);
  }

  public setValsOnDropdownChange( name: string, vals: SelectValue[] ) {
    const parent: Dropdown = this.comboboxInput.dropdowns.find( (d: Dropdown) => d.name === name );
    if ( parent ) {
      const child: Dropdown = this.comboboxInput.dropdowns.find( (d: Dropdown) => d.level === parent.level + 1 );
      if ( child ) {
        child.selVals = vals;
        child.disabled = false;
      }
    }
    this.dropChangeInProg = false;
  }

  public _onChangeDropdown( selVal: any, dropdown: Dropdown ): void {
    this.resetAllDescendants( dropdown );
    const child: Dropdown = this.comboboxInput.dropdowns.find( (d: Dropdown) => d.level === dropdown.level + 1 );
    if ( !child ) {
      return;
    }
    console.log(dropdown.selVals)
    dropdown.selVal = dropdown.selVals.find((s: SelectValue) => Number(s.value) === Number(selVal.value));
    this.comboboxInput.dropdowns
        .filter((k: Dropdown) => k.level > dropdown.level)
        .forEach( (k: Dropdown) => k.selVals = [] )
    this.dropChangeInProg = true;
    this.onChangeDropdown.emit(dropdown);
  }

}
