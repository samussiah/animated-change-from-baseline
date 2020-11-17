export default function addElement(name, parent, tagName = 'div', data = null, id = (d, i) => i) {
    return data
        ? parent
              .selectAll(`${tagName}.acfb-${name}.acfb-${tagName}`)
              .data(data, id)
              .join(tagName)
              .classed(`acfb-${name} acfb-${tagName}`, true) // multiple elements
        : parent.append(tagName).classed(`acfb-${name} acfb-${tagName}`, true); // single element
}
