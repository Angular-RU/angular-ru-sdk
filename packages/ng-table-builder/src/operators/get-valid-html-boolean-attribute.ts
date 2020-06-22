export function getValidHtmlBooleanAttribute(attribute: boolean | string | null): boolean {
    return typeof attribute === 'string' ? true : !!attribute;
}
