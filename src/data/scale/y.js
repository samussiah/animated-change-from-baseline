export default function y() {
    const scale = d3
        .scaleBand()
        .domain(this.group.stratum)
        .range([this.settings.margin.top, this.settings.height - this.settings.margin.top - this.settings.margin.bottom])

    return scale;
}
