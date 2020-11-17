import data from './nodes/data';
import mouseover from './nodes/mouseover';
import click from './nodes/click';
import mouseout from './nodes/mouseout';

export default function nodes() {
    const main = this;

    data.call(this);

    const nodes = this.util
        .addElement('node', this.layout.bubbles, 'circle', this.measure_id, (d) => d[1])
        .attr('r', this.settings.radius)
        .attr('fill', (d) => this.scale.color(d.stratum))
        .attr('stroke', (d) => this.scale.color(d.stratum));

    // Add tooltip.
    nodes.append('title').text((d) => d.tooltip);

    // Add event listeners.
    nodes.on('mouseover', function (event, d) {
        mouseover.call(main, this, event, d);
    });
    nodes.on('click', function (event, d) {
        click.call(main, this, event, d);
    });
    nodes.on('mouseout', function (event, d) {
        mouseout.call(main, this, event, d);
    });

    return nodes;
}
