import { SelectValue } from '../../beans/SelectValue';
import { Validators } from '@angular/forms';

export class HunterComboboxInput {
    dropdowns: Dropdown[];
    direction: 'vertical' | 'horizontal';
}

export interface Dropdown {
    name: string;
    selVals: SelectValue[];
    selVal: SelectValue,
    defaultVal: SelectValue;
    placeholder: string;
    level: number;
    required: boolean;
    requiredMessage: string;
    disabled: boolean;
}
