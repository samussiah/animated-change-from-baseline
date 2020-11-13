import timepoint from './timepoint';
import updateData from './interval/data';
import restartSimulation from './interval/simulation';
import distribution from './interval/distribution';

export function iterate() {
    this.settings.timepoint++;
    if (this.settings.timepoint >= this.set.visit.length) this.settings.timepoint = 0;
    this.timepoint = timepoint.call(this);
    updateData.call(this);
    restartSimulation.call(this);
    distribution.call(this);
}

export default function interval() {
    const interval = d3.interval(() => {
        iterate.call(this);
    }, this.settings.speed);

    return interval;
}
