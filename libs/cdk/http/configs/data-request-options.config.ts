import {DataClientRequestOptions} from '@angular-ru/cdk/http/typings';

export const DATA_REQUEST_OPTIONS_CONFIG: DataClientRequestOptions = {
    baseUrl: null,
    hostUrl: null,
    body: null,
    headers: {},
    queryParams: {},
    pathVariables: {},
    emitSuccess: false,
    emitFailure: true,
    responseType: 'json',
    reportProgress: true,
    additionalOptions: {},
    nullInsteadEmpty: true,
    limitConcurrency: 255,
};
