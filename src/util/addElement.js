export default function addElement(name, parent, tagName = 'div') {
    const element = parent
        .append(tagName)
        .classed(`acfb-${name} afcb-${tagName}`, true);

    return element;
}
