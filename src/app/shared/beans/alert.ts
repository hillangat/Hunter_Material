
export class Alert {
    public id: number;
    public status: AlertStatusEnum;
    public type: AlertTypeEnum;
    public message: string;
    public constructor() {
        this.id = new Date().getTime();
    }
}


export enum AlertStatusEnum {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    INFO = 'INFO',
    WARNING = 'WARNING'
}

export enum AlertTypeEnum {
    DIALOG = 'DIALOG',
    STICKY = 'STICKY',
    FLEETING = 'FLEETING',
}

