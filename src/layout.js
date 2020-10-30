export default function layout() {
    const main = this.util.addElement('main', d3.select(this.element));
    this.settings.width = (this.settings.width || main.node().clientWidth) - this.settings.margin.left - this.settings.margin.right;
    this.settings.height = (this.settings.height || main.node().clientHeight) - this.settings.margin.top - this.settings.margin.bottom;
    const svg = this.util.addElement('svg', main, 'svg')
        .attr('width', this.settings.width + this.settings.margin.left + this.settings.margin.right)
        .attr('height', this.settings.height + this.settings.margin.top + this.settings.margin.bottom);
    const canvas = this.util.addElement('canvas', svg, 'g')
        .attr('transform', `translate(${this.settings.margin.left},${this.settings.margin.top})`);
    const xAxis = this.util.addElement('x-axis', canvas, 'g')
        //.attr('transform', `translate(0,${this.settings.margin.top})`);
    const yAxis = this.util.addElement('y-axis', canvas, 'g')
        //.attr('transform', `translate(${this.settings.margin.left},0)`);
    const timepoint = this.util.addElement('timepoint', canvas, 'text')
        //.attr('x', this.settings.margin.left)
        .attr('dx', 4)
        //.attr('y', this.settings.margin.top)
        .attr('dy', 4)
        .attr('alignment-baseline', 'hanging');

    return {
        main,
        svg,
        xAxis,
        yAxis,
        canvas,
        timepoint,
    };
}
