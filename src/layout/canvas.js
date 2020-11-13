export default function canvas(main) {
    const svg = this.util
        .addElement('svg', main, 'svg')
        .attr('width', this.settings.width + this.settings.margin.left + this.settings.margin.right)
        .attr(
            'height',
            this.settings.height + this.settings.margin.top + this.settings.margin.bottom
        );
    const canvas = this.util
        .addElement('canvas', svg, 'g')
        .attr('transform', `translate(${this.settings.margin.left},${this.settings.margin.top})`);
    const timepoint = this.util
        .addElement('timepoint', canvas, 'text')
        //.attr('x', this.settings.margin.left)
        .attr('y', -this.settings.margin.top / 2);
    const xAxis = this.util.addElement('x-axis', canvas, 'g');
    //.attr('transform', `translate(0,${this.settings.margin.top})`);
    const yAxis = this.util.addElement('y-axis', canvas, 'g');
    //.attr('transform', `translate(${this.settings.margin.left},0)`);
    const violins = this.util.addElement('violins', canvas, 'g');
    const bubbles = this.util.addElement('bubbles', canvas, 'g');

    return {
        svg,
        canvas,
        timepoint,
        xAxis,
        yAxis,
        violins,
        bubbles,
    };
}
