export class HunterConstants {

    public static readonly APP_DEFAULT_TITLE = 'Hunter Master';
    public static readonly HUNTER_LOCAL_HOST = 'http://localhost:8080/Hunter/';
    public static readonly HUNTER_BASE_URL: string = '/Hunter/Rest/';
    public static readonly TASK_GRID_END_POINT_URL: string = HunterConstants.HUNTER_BASE_URL + '/task/read';
    public static readonly REFRESH_CACHE_URL = HunterConstants.HUNTER_LOCAL_HOST + 'cache/action/refreshCaches';
    public static readonly CACHE_REFRESH_URL = HunterConstants.HUNTER_LOCAL_HOST + 'cache/action/read';

}
