
export class Alert {
    public id: number;
    public type: AlertType;
    public message: string;
    public constructor() {
        this.id = new Date().getTime();
    }
}


export enum AlertType {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    INFO = 'INFO',
    WARNING = 'WARNING'
}

