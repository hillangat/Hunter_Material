import { JsonObject, JsonProperty } from 'json2typescript';

export enum CacheKeysEnum {
    ALL = 'allXMLService',
    QUERY = 'queryXML',
    UI_MESSAGE = 'uiMsgXML',
    CLIENT_CONFIGS = 'clientConfigs',
    RESPONSE_CONFIGS = 'responseConfigs',
    EMAIL_TEMPLATES = 'emailTemplates',
    EMAIL_CONFIGS = 'emailConfigs',
    TASK_PROCESS_TEMPLATES = 'taskProcessTemplates',
    EXISTING_TEMPLATE_NAME = 'existingTemplateNames',
    QUERY_TO_BEAN_MAPPER = 'queryToBeanMapper',
    GRID_HEADERS = 'gridHeaders'
}

@JsonObject
export class CacheRefresh {
    @JsonProperty( 'name', String )
    public name: string;
    @JsonProperty( 'refreshing', Boolean )
    public refreshing: boolean;
    @JsonProperty( 'selected', Boolean )
    public selected: boolean;
    @JsonProperty( 'disabled', Boolean )
    public disabled: boolean;
    @JsonProperty( 'retired', Boolean )
    public retired: boolean;
    @JsonProperty( 'key', CacheRefresh )
    public key: CacheKeysEnum;
}


export const availCaches: CacheRefresh[] = [
    { name: 'All', key: CacheKeysEnum.ALL, refreshing: false, selected: true },
    { name: 'Query', key: CacheKeysEnum.QUERY, refreshing: false, selected: false },
    { name: 'UI Message', key: CacheKeysEnum.UI_MESSAGE, refreshing: false, selected: false },
    { name: 'Client Configs', key: CacheKeysEnum.CLIENT_CONFIGS, refreshing: false, selected: true },
    { name: 'Response Configurations', key: CacheKeysEnum.RESPONSE_CONFIGS, refreshing: false, selected: true },
    { name: 'Email Templates', key: CacheKeysEnum.EMAIL_TEMPLATES, refreshing: false , selected: false},
    { name: 'Email configs', key: CacheKeysEnum.EMAIL_CONFIGS, refreshing: false, selected: false },
    { name: 'Task Process Templates', key: CacheKeysEnum.TASK_PROCESS_TEMPLATES, refreshing: false, selected: false },
    { name: 'Existing Template Name', key: CacheKeysEnum.EXISTING_TEMPLATE_NAME, refreshing: false, selected: false },
    { name: 'Query To Bean Mapper', key: CacheKeysEnum.QUERY_TO_BEAN_MAPPER, refreshing: false, selected: false },
    { name: 'Grid Headers', key: CacheKeysEnum.GRID_HEADERS, refreshing: false, selected: false }
] as CacheRefresh[];
