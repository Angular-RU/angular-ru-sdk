import { unpatchEvents } from '@angular-ru/common/zone.js/unpatch-zone';

/**
 * @deprecated: use `import "@angular-ru/common/zone.js/unpatch-zone" before import "zone.js"`
 */
// eslint-disable-next-line max-lines-per-function
export function unpatchZoneJsEvents(): void {
    unpatchEvents();
}
