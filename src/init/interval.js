import timepoint from './timepoint';
import nodes from './nodes';
import restartSimulation from './interval/simulation';
import updateDistribution from './interval/distribution';

export function iterate() {
    this.settings.timepoint++;
    if (this.settings.timepoint >= this.set.visit.length) this.settings.timepoint = 0;
    this.timepoint = timepoint.call(this);

    // Update stratum count.
    //this.layout.yAxis
    //    .select('tspan.acfb-stratum-count')
    //    .text((d) => `n=${new Set(this.measure_id.group.stratum.get(d).map((d) => d.id)).size}`);

    // Update tooltips.
    this.nodes = nodes.call(this);

    // Update y-axis labels.
    this.layout.yAxis
        .selectAll('tspan.acfb-stratum-count')
        .text((d) => `n=${this.measure_id.filter((di) => di.stratum === d).length}`);

    // Reheat simulation.
    restartSimulation.call(this);

    // Transition distribution.
    updateDistribution.call(this);
}

export default function interval() {
    const interval = d3.interval(() => {
        iterate.call(this);
    }, this.settings.speed);

    return interval;
}
