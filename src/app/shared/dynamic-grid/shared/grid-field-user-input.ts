import { OperationEnum } from '../enums/operation.enum';

export class GridFieldUserInput {
    public fieldName: string;
    public userInput: string;
    public operation: OperationEnum;
    public dir: 'asc' | 'desc';
}

