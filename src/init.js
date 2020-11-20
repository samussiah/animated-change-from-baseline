import scale from './data/scale';
import legend from './init/legend';
import xAxis from './init/xAxis';
import yAxis from './init/yAxis';
import timepoint from './init/timepoint';
import nodes from './init/nodes';
import simulation from './init/simulation';
import distribution from './init/distribution';
import interval from './init/interval';

export default function init() {
    this.measure = this.set.measure[Math.floor(Math.random() * this.set.measure.length)];
    this.measure_id = this.group.measure_id.find((d) => d[0] === this.measure)[1];
    this.subset = this.data.filter((d) => d.measure === this.measure);
    this.scale = scale.call(this);
    //this.legend = legend.call(this);
    this.layout.legend.node().appendChild(
        legend({
            color: this.scale.color,
            title: 'Result',
            width: 275,
        })
    );

    this.xAxis = xAxis.call(this);
    this.yAxis = yAxis.call(this);
    this.timepoint = timepoint.call(this);
    this.nodes = nodes.call(this);
    this.simulation = simulation.call(this);
    this.distribution = distribution.call(this);
    if (this.settings.play) this.interval = interval.call(this);
}
