export default function x() {
    const scale = d3
        .scaleBand()
        .domain(d3.range(-3, 4))
        .range([this.settings.margin.left, this.settings.width - this.settings.margin.left - this.settings.margin.right]);

    return scale;
}
