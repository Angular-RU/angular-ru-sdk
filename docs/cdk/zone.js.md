#### `@angular-ru/cdk/zone.js`

- `improve performance`

```typescript
// polyfills.ts
import '@angular-ru/cdk/zone.js/unpatch-zone';
import 'zone.js/dist/zone';
```

**Unpatch methods**: scroll, mouseenter, mouseleave, mousemove, mouseover, mouseout, mousewheel, message **for
targets**: window, Document, HTMLBodyElement, HTMLElement, document.body, WebSocket
