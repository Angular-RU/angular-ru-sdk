// Note: without export the current library is not compiled
import { unpatchEvents } from './unpatch-events';

// Note: we should invoke before running zone.js
unpatchEvents();

export { unpatchEvents } from './unpatch-events';
