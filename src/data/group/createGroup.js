export default function createGroup(variable) {
    let group;

    switch (variable) {
        default:
            group = d3.group(
                this.data,
                d => d[variable]
            );
            break;
    }

    return group;
}
