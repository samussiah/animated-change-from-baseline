export default function color() {
    const scale = d3
        .scaleOrdinal()
        .domain(this.set.stratum)
        .range(d3.schemeCategory10);

    return scale;
}
