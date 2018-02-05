export class GridFieldUserInput {
    public fieldName: string;
    public userInput: string;
    public operation: 'gt' | 'lt' | 'equals' | 'before' | 'after' | 'contains' | 'begins' | 'ends' | undefined;
    public dir: 'asc' | 'desc';
}

