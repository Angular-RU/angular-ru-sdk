import {removeInternalNgxsRootElement} from './internal/remove-internal-ngxs-root-element';

export function resetPlatformAfterBootstrapping(): void {
    removeInternalNgxsRootElement();
}
