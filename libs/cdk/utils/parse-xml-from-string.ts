type XmlSupportedType =
    | 'application/xhtml+xml'
    | 'application/xml'
    | 'image/svg+xml'
    | 'text/html'
    | 'text/xml';

export function parseXmlFromString(
    xml: string,
    type: XmlSupportedType = 'application/xml',
): Document | never {
    const parser: DOMParser = new DOMParser();
    const dom: Document = parser.parseFromString(xml, type);

    if (dom.documentElement.nodeName === 'parsererror') {
        console.error(dom);
        throw new Error('error while parsing');
    }

    return dom;
}
