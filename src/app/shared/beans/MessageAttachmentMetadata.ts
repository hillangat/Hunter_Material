import { JsonProperty } from 'json2typescript/src/json2typescript/json-convert-decorators';
import { JsonObject } from 'json2typescript';

@JsonObject
export class MessageAttachmentMetadata {
    @JsonProperty( 'mDataId', Number )
    public mDataId: number;
    @JsonProperty( 'embedded', Boolean )
    public embedded: boolean;
    @JsonProperty( 'msgAttchmentBnId', Number )
    public msgAttchmentBnId: number;
    @JsonProperty( 'msgId', Number )
    public msgId: number;
    @JsonProperty( 'url', String )
    public url: string;
    @JsonProperty( 'key', String )
    public key: string;
    @JsonProperty( 'desc', String )
    public desc: string;
    @JsonProperty( 'msgCid', String )
    public msgCid: string;
    @JsonProperty( 'originalFileName', String )
    public originalFileName: string;
    @JsonProperty( 'fileFormat', String )
    public fileFormat: string;
    @JsonProperty( 'templateName', String )
    public templateName: string;
}
