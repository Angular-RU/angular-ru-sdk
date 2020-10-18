import { DataRequestOptions } from '@angular-ru/http/typings';

export const DATA_REQUEST_OPTIONS_CONFIG: DataRequestOptions = {
    nullInsteadEmpty: true,
    baseUrl: null,
    hostUrl: null,
    body: null,
    lock: true,
    headers: {},
    queryParams: {},
    showOk: false,
    showError: true,
    responseType: 'json',
    reportProgress: true
};
