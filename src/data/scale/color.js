export default function color() {
    //const scale = d3.scaleOrdinal().domain(this.set.stratum).range(d3.schemeCategory10);
    const scale = d3.scaleSequential(d3.interpolateViridis)
        .domain(d3.extent(this.subset, (d) => d.result));

    return scale;
}
