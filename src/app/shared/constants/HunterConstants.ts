export class HunterConstants {

    public static readonly APP_DEFAULT_TITLE = 'Hunter Master';
    public static readonly HUNTER_BASE_URL = 'http://localhost:8080/Hunter/';
    public static readonly TASK_GRID_END_POINT_URL: string = HunterConstants.HUNTER_BASE_URL + '/task/read';
    public static readonly REFRESH_CACHE_URL = HunterConstants.HUNTER_BASE_URL + 'cache/action/refreshCaches';
    public static readonly CACHE_REFRESH_URL = HunterConstants.HUNTER_BASE_URL + 'cache/action/read';
    public static readonly ALL_CLIENT_SEL_URL = HunterConstants.HUNTER_BASE_URL + 'client/action/angular/selVals'
    public static readonly TASK_APPROVERS_SEL_URL = HunterConstants.HUNTER_BASE_URL + 'restful/users/approvers/selValues'
    public static readonly GATEWAY_CLIENTS_SEL_URL = HunterConstants.HUNTER_BASE_URL + 'restful/gateway/clients/selValues/'

}
