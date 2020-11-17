export default function percentChange() {
    const maxChange = d3.max(this.subset, (d) => Math.abs(d.percent_change));
    const scale = d3
        .scaleLinear()
        .nice()
        .domain([-maxChange, maxChange])
        .range([0, this.settings.width]);

    return scale;
}
