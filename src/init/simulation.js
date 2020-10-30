import tick from './simulation/tick';

export default function simulation() {
    const simulation = d3.forceSimulation()
        .nodes(this.measure_id)
        //.force('center', d3.forceCenter()
        //    .x(d => this.scale.x(d.chg))
        //    .y(d => this.scale.y(d.stratum) + this.scale.y.bandwidth() / 2)
        //)
        .force('x', d3.forceX(d => this.scale.x(d.chg)))
        .force('y', d3.forceY(d => this.scale.y(d.stratum) + this.scale.y.bandwidth() / 2))
        .force('collide', d3.forceCollide().radius(this.settings.radius + 1))
        //.force('charge', d3.forceManyBody())
        .on('tick', tick.bind(this));

    return simulation;
}
