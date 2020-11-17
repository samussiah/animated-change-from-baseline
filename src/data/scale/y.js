export default function y() {
    const scale = d3.scaleBand().domain(this.set.stratum).range([this.settings.height, 0]);

    return scale;
}
