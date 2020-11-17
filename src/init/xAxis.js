export default function xAxis() {
    const axis = this.layout.xAxis
        .call(d3.axisTop(this.scale.x).tickSize(-this.settings.height))
        //.call(g => g.select('.domain').remove())
        .call((g) =>
            g.selectAll('.tick line').attr('stroke-opacity', 0.5).attr('stroke-dasharray', '2,2')
        );

    // TODO: move styles to index.css
    this.layout.xAxis
        .append('text')
        .classed('achb-axis-label achb-axis-label--x', true)
        .attr('text-anchor', 'middle')
        .attr('x', this.settings.width / 2)
        .attr('y', -this.settings.margin.top / 2)
        .style('font-size', '1.5rem')
        .style('fill', 'black')
        .text(this.measure);

    return axis;
}
