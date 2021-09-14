/* eslint-disable no-restricted-syntax */

/**
 * @deprecated: use HttpStatusCode from `@angular/common/http`
 */
export enum HttpStatusCode {
    // 1×× Informational
    CONTINUE = 100,
    // ..
    // 2×× Success
    OK = 200,
    CREATED = 201,
    // ..
    // 3×× Redirection
    MOVE_PERMANENTLY = 301,
    // 4×× Client Error
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    // ..
    METHOD_NOT_ALLOWED = 405,
    // 5×× Server Error
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504
    // ..
}
