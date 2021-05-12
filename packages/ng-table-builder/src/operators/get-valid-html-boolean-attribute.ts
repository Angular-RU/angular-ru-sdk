export function getValidHtmlBooleanAttribute(attribute: boolean | string | null | undefined): boolean {
    return typeof attribute === 'string' ? true : !!attribute;
}
