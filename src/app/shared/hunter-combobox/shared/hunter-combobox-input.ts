import { SelectValue } from '../../beans/SelectValue';
export class HunterComboboxInput {
    dropdowns: Dropdown[];
    direction: 'vertical' | 'horizontal';
    defaultVal: SelectValue;
}

export interface Dropdown {
    name: string;
    selVals: SelectValue[];
    placeholder: string;
}
