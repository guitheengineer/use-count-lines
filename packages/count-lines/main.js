/**
 * An util to count the lines of a dom node
 * @param domNode - Dom node
 * @returns Quantity of lines
 */
export const countLines = (domNode) => {
    const divHeight = domNode.offsetHeight;
    const offset = 3;
    const lineHeight =
        Number(
            window
                .getComputedStyle(domNode)
                .getPropertyValue('line-height')
                .replace('px', '')
        ) + offset;

    return Math.ceil(divHeight / lineHeight);
};
