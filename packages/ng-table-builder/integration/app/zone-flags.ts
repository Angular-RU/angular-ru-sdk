import { Any } from '../../src/interfaces/table-builder.internal';

(window as Any)['__zone_symbol__UNPATCHED_EVENTS'] = [
    'scroll',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseover',
    'mouseout',
    'mousewheel'
];

// black list scroll event handler for onProp
const targets: Any[] = [window, Document.prototype, HTMLBodyElement.prototype, HTMLElement.prototype];

(window as Any)['__Zone_ignore_on_properties'] = [];

targets.forEach((target: Any): void => {
    (window as Any)['__Zone_ignore_on_properties'].push({
        target,
        ignoreProperties: ['scroll', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mousewheel']
    });
});
