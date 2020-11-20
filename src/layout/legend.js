export default function legend(main) {
    const legend = this.util
        .addElement('legend', main)
        .style('position', 'absolute')
        .style('top', 0)
        .style('right', 0);

    return legend;
}
