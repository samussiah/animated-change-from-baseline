import data from './interval/data';

export default function nodes() {
    data.call(this);

    const nodes = this.layout.canvas
        .selectAll('circle')
        .data(this.measure_id, d => d[1])
        .join('circle')
        .attr('r', this.settings.radius)
        .attr('fill', d => this.scale.color(d.stratum))
        .attr('fill-opacity', .5)
        .attr('stroke', d => this.scale.color(d.stratum))
        .attr('stroke-opacity', 1);

    return nodes;
}
