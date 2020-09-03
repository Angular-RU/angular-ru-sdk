export function parseXmlFromString(xml: string, type: SupportedType = 'application/xml'): Document | never {
    const parser: DOMParser = new DOMParser();
    const dom: Document = parser.parseFromString(xml, type);

    if (dom.documentElement.nodeName === 'parsererror') {
        console.error(dom);
        throw new Error('error while parsing');
    }

    return dom;
}
