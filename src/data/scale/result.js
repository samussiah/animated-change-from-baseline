export default function result() {
    const scale = d3
        .scaleLinear()
        .nice()
        .domain(d3.extent(this.subset, (d) => d.result))
        .range([0, this.settings.width]);

    return scale;
}
