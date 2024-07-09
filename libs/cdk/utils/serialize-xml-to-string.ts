export function serializeXmlToString(xml: Document): string {
    return new XMLSerializer().serializeToString(xml);
}
