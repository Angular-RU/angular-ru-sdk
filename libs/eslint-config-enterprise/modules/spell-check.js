const { cosmiconfigSync } = require('cosmiconfig');

const baseSkipWords = [
    'utf-8',
    'enqueue',
    'dict',
    'esm',
    'aff',
    'hunspellchecker',
    'hunspell',
    'upsert',
    'ctx',
    'rehydrate',
    'utils',
    'md',
    'ngxs',
    'sha',
    'ttl',
    'null',
    'nullable',
    'debounce',
    'deserializing',
    'undecorated',
    'schemas',
    'aot',
    'matcher',
    'matchers',
    'redeclare',
    'cyrillic',
    'unicode',
    'patcher',
    'rxjs',
    'mantisa',
    'tsconfig',
    'impl',
    'darkorange',
    'gauss',
    'edg',
    'serializable',
    'accessors',
    'comparator',
    'initialised',
    'sonarjs',
    'noinspection',
    'invoker',
    'todos',
    'dom',
    'mousemove',
    'mouseover',
    'mouseleave',
    'mjs',
    'dragover',
    'mouseout',
    'cdk',
    'unpatch',
    'mouseenter',
    'mousewheel',
    'mouseup',
    'keyup',
    'keydown',
    'nowrap',
    'scrollbar',
    'sanitizer',
    'pos',
    'str',
    'lang',
    'radix',
    'guid',
    'gzip',
    'nbsp',
    'brotli',
    'uint',
    'len',
    'replacer',
    'parsererror',
    'textarea',
    'xml',
    'php',
    'html',
    'css',
    'reconnection',
    'readonly',
    'calc',
    'acc',
    'ngx',
    'tbody',
    'thead',
    'rect',
    'contextmenu',
    'resizable',
    'tooltip',
    'keydown',
    'resize',
    'urls',
    'enum',
    'don’t',
    "don't",
    'dont',
    'idx',
    'validators',
    'memoized',
    'repo',
    'decrement',
    'uid',
    'bootrapping',
    'iss',
    'deserializer',
    'resizing',
    'svg',
    'xhtml',
    'href',
    'renderer',
    'pojo',
    'num',
    'Ivanov',
    'Petrov',
    'Petr',
    'Sidorov',
    'dataset',
    'jsdom',
    'req',
    'willem',
    'cancelled',
    'localhost',
    'paginator',
    'minify',
    'tdf',
    'dto',
    'sidenav',
    'checkbox',
    'hljs',
    'licences',
    'toastr',
    'globals',
    'abc',
    'ast',
    'junit',
    'bezier',
    'callee',
    'unobserve',
    'datetime',
    'lightgreen',
    'monospace',
    'configurator',
    'typeof',
    'charset',
    'arial',
    'xls',
    'vnd',
    'typings',
    'builtins',
    'unix',
    'enums',
    'keyframes',
    'accessor',
    'datepicker',
    'serno',
    'whitespaces',
    'dialogs',
    'snackbar',
    'beforeunload',
    'esc',
    'daterange',
    'dragleave',
    'redis',
    'mdc',
    'mandator',
    'ipv4',
    'tokenize',
    'formatter',
    'keyborder',
    'geo',
    'mon',
    'tue',
    'thu',
    'fri',
    'vip',
    'mcc',
    'miscoding',
    'crimea',
    'siebel',
    'non3ds',
    '3ds',
    'submerchant',
    'aggregator',
    'mastercard',
    'dpan',
    'serno',
    'rrn',
    'trxn',
    'msg',
    'ucid',
    'otb',
    'uplog',
    'integrations',
    'dsn',
    'atm',
    'acq',
    'masterdata',
    'ipsilon',
    'vrol',
    'liab',
    'chargeback',
    'supercell',
    'ica',
    'arb',
    'telecom',
    'badged',
    'sms',
    'unlinked',
    'cancelable',
    'autoselect',
    'sla',
    'untrusted',
    'vid',
    'systemtime',
    'ips',
    'csv',
    'mandators',
    'responder',
    'uploader'
];

const { config: spellCheckerClientConfig } = cosmiconfigSync('spellchecker').search() || { config: {} };
const clientSkipWordList = spellCheckerClientConfig.skipWords || [];
const skipWords = [...baseSkipWords, ...clientSkipWordList];

const lang = 'en_US';
const skipIfMatch = ['http://[^s]*', 'https://[^s]*', '^[-\\w]+/[-\\w\\.]+$', '#', 'eslint-disable'];
const skipWordIfMatch = ['^foobar.*$', '.*iss.*'];
const minLength = 3;

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    plugins: ['spellcheck'],
    overrides: [
        {
            files: ['*.ts'],
            rules: {
                'spellcheck/spell-checker': [
                    'error',
                    {
                        comments: true,
                        strings: true,
                        identifiers: true,
                        templates: true,
                        // common
                        lang,
                        skipWords,
                        skipIfMatch,
                        skipWordIfMatch,
                        minLength
                    }
                ]
            }
        },
        {
            files: ['*.spec.ts'],
            rules: {
                'spellcheck/spell-checker': [
                    'error',
                    {
                        comments: false,
                        strings: false,
                        identifiers: true,
                        templates: false,
                        // common
                        lang,
                        skipWords,
                        skipIfMatch,
                        skipWordIfMatch,
                        minLength
                    }
                ]
            }
        }
    ]
};
